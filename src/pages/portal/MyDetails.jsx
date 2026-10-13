import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { CreditCard, LogOut } from 'lucide-react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { changeStudentPassword, updateStudentProfile } from '../../service/studentApi';
import { clearPortalCache, fullName } from '../../lib/portalData.js';
import { Avatar, Card, PageTitle } from '../../components/Portal/ui.jsx';
import { buttonClass } from '../../components/Portal/styles.js';

const contactSchema = yup.object({
    email: yup.string().trim().email('Enter a valid email address, like name@example.com').nullable(),
    phone_number: yup.string().trim()
        .matches(/^$|^\+?[0-9 ]{10,15}$/, 'Enter a phone number with 10 to 15 digits, like 0803 123 4567')
        .nullable(),
    address: yup.string().trim().max(250, 'Keep the address under 250 characters').nullable(),
});
const passwordSchema = yup.object({
    old_password: yup.string().required('Enter your current password'),
    new_password: yup.string().required('Enter a new password')
        .min(8, 'Use at least 8 characters')
        .notOneOf([yup.ref('old_password')], 'Choose a password different from your current one'),
    confirm_password: yup.string().required('Type the new password again')
        .oneOf([yup.ref('new_password')], 'The two new passwords do not match'),
});

const fieldClass = (err) => `mt-1 w-full min-h-12 rounded-xl border-2 ${err ? 'border-red-700' : 'border-gray-300'} bg-white px-4 py-2.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B]`;

const TextField = ({ id, label, hint, error, registration, type = 'text', autoComplete, as }) => {
    const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
    const Tag = as === 'textarea' ? 'textarea' : 'input';
    return (
        <div>
            <label htmlFor={id} className="block font-semibold">{label}</label>
            {hint && <p id={`${id}-hint`} className="text-gray-600 text-base">{hint}</p>}
            <Tag id={id} type={as ? undefined : type} autoComplete={autoComplete} rows={as ? 3 : undefined}
                aria-invalid={Boolean(error)} aria-describedby={describedBy} className={fieldClass(error)} {...registration} />
            {error && <p id={`${id}-error`} role="alert" className="mt-1 font-semibold text-red-700">{error}</p>}
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div><dt className="text-gray-600">{label}</dt><dd className="font-semibold break-words">{value || '—'}</dd></div>
);

const MyDetails = () => {
    const { student, refreshStudent, logout } = useStudentAuth();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [photoError, setPhotoError] = useState('');
    const name = fullName(student);

    const contact = useForm({
        resolver: yupResolver(contactSchema),
        defaultValues: { email: student?.email || '', phone_number: student?.phone_number || '', address: student?.address || '' },
    });
    const password = useForm({ resolver: yupResolver(passwordSchema) });

    const saveContact = async (values) => {
        const form = new FormData();
        if (values.email !== (student?.email || '')) form.append('email', values.email);
        if (values.phone_number !== (student?.phone_number || '')) form.append('phone_number', values.phone_number);
        if (values.address !== (student?.address || '')) form.append('address', values.address);
        if (photo) form.append('passport', photo);
        if (![...form.keys()].length) { toast.info('Nothing to save: no details were changed.'); return; }
        try {
            await updateStudentProfile(form);
            await refreshStudent().catch(() => {});
            clearPortalCache('profile');
            setPhoto(null);
            toast.success('Your details are saved.');
        } catch (err) {
            contact.setError('root', { message: err?.message || 'Your details could not be saved. Please try again.' });
        }
    };

    const savePassword = async ({ old_password, new_password }) => {
        try {
            await changeStudentPassword(old_password, new_password);
            password.reset();
            toast.success('Your password is changed. Use the new one next time you sign in.');
        } catch (err) {
            const msg = err?.message || '';
            if (/incorrect/i.test(msg)) password.setError('old_password', { message: 'That is not your current password' });
            else password.setError('root', { message: msg || 'Your password could not be changed. Please try again.' });
        }
    };

    const choosePhoto = (e) => {
        const file = e.target.files?.[0];
        setPhotoError('');
        if (!file) { setPhoto(null); return; }
        if (!file.type.startsWith('image/')) { setPhotoError('Choose a photo (JPG or PNG).'); return; }
        if (file.size > 2 * 1024 * 1024) { setPhotoError('Choose a photo smaller than 2 MB.'); return; }
        setPhoto(file);
    };

    const signOut = () => { logout(); clearPortalCache(); navigate('/student/login', { replace: true }); };
    const ce = contact.formState.errors;
    const pe = password.formState.errors;

    return (
        <>
            <PageTitle title="My details" subtitle="Check your information, update your contact details and change your password." />
            <div className="space-y-6">
                <Card>
                    <div className="flex items-center gap-4">
                        <Avatar src={student?.passport_url} name={name} size={72} />
                        <div>
                            <p className="text-xl font-bold">{name}</p>
                            <p className="text-gray-600">{student?.admission_number} · {student?.class_level_name || 'Class not set'}</p>
                        </div>
                    </div>
                    <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Detail label="Date of birth" value={student?.date_of_birth} />
                        <Detail label="Gender" value={student?.gender === 'M' ? 'Male' : student?.gender === 'F' ? 'Female' : student?.gender} />
                        <Detail label="State of origin" value={student?.state_of_origin} />
                        <Detail label="Local government area" value={student?.local_govt_area} />
                        <Detail label="Parent or guardian" value={student?.parent_name} />
                        <Detail label="Parent's phone" value={student?.parent_phone} />
                        <Detail label="Parent's email" value={student?.parent_email} />
                    </dl>
                    <p className="mt-4 text-gray-600">Something wrong here, like a misspelt name? Call the school office on{' '}
                        <a href="tel:+2347066277945" className="text-[#2563EB] underline underline-offset-2">0706 627 7945</a> to correct it.</p>
                </Card>

                <Card>
                    <h2 className="text-xl font-bold text-[#1F3B6B]">Contact details and photo</h2>
                    <form noValidate onSubmit={contact.handleSubmit(saveContact)} className="mt-4 space-y-4">
                        <TextField id="email" label="Email address" type="email" autoComplete="email" error={ce.email?.message} registration={contact.register('email')} />
                        <TextField id="phone_number" label="Phone number" type="tel" autoComplete="tel" hint="For example 0803 123 4567" error={ce.phone_number?.message} registration={contact.register('phone_number')} />
                        <TextField id="address" label="Home address" as="textarea" autoComplete="street-address" error={ce.address?.message} registration={contact.register('address')} />
                        <div>
                            <label htmlFor="passport" className="block font-semibold">Passport photograph</label>
                            <p id="passport-hint" className="text-gray-600 text-base">A clear photo of the student's face, JPG or PNG, under 2 MB.</p>
                            <input id="passport" type="file" accept="image/*" onChange={choosePhoto} aria-describedby="passport-hint"
                                className="mt-1 block w-full text-base file:mr-4 file:min-h-12 file:rounded-full file:border-0 file:bg-[#1F3B6B] file:px-5 file:font-semibold file:text-white" />
                            {photoError && <p role="alert" className="mt-1 font-semibold text-red-700">{photoError}</p>}
                        </div>
                        {ce.root && <p role="alert" className="font-semibold text-red-700">{ce.root.message}</p>}
                        <button type="submit" disabled={contact.formState.isSubmitting} className={buttonClass.primary}>
                            {contact.formState.isSubmitting ? 'Saving...' : 'Save details'}
                        </button>
                    </form>
                </Card>

                <Card>
                    <h2 className="text-xl font-bold text-[#1F3B6B]">Change password</h2>
                    <form noValidate onSubmit={password.handleSubmit(savePassword)} className="mt-4 space-y-4">
                        <TextField id="old_password" label="Current password" type="password" autoComplete="current-password" error={pe.old_password?.message} registration={password.register('old_password')} />
                        <TextField id="new_password" label="New password" type="password" autoComplete="new-password" hint="At least 8 characters" error={pe.new_password?.message} registration={password.register('new_password')} />
                        <TextField id="confirm_password" label="Type the new password again" type="password" autoComplete="new-password" error={pe.confirm_password?.message} registration={password.register('confirm_password')} />
                        {pe.root && <p role="alert" className="font-semibold text-red-700">{pe.root.message}</p>}
                        <button type="submit" disabled={password.formState.isSubmitting} className={buttonClass.primary}>
                            {password.formState.isSubmitting ? 'Changing...' : 'Change password'}
                        </button>
                    </form>
                </Card>

                <Card>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link to="/student/payment" className={buttonClass.secondary}>
                            <CreditCard aria-hidden="true" className="h-5 w-5" /> School fees (online payment coming soon)
                        </Link>
                        <button type="button" onClick={signOut} className={buttonClass.secondary}>
                            <LogOut aria-hidden="true" className="h-5 w-5" /> Sign out
                        </button>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default MyDetails;

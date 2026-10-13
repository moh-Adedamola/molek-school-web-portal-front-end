import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Calendar, MapPin, Phone } from 'lucide-react';
import { useStudentAuth } from '../context/StudentAuthContext';
import { getUpcomingEvents } from '../service/studentApi';
import { friendlyLoginError } from '../lib/loginErrors.js';
import logo from '/logo.webp';

// The server decides whether a password is right; we only check the boxes are filled.
const schema = yup.object({
    admission_number: yup.string().trim().required('Enter the admission number, for example MOL/2024/015'),
    password: yup.string().required('Enter the password'),
});


const StudentLogin = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useStudentAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [events, setEvents] = useState([]);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        getUpcomingEvents().then((d) => setEvents(d.results || [])).catch(() => setEvents([]));
    }, []);

    if (isAuthenticated) return <Navigate to="/student" replace />;

    const onSubmit = async ({ admission_number, password }) => {
        try {
            await login(admission_number.trim().toUpperCase(), password);
            navigate('/student', { replace: true });
        } catch (err) {
            setError('root', { message: friendlyLoginError(err) });
        }
    };

    const field = (err) => `w-full min-h-12 rounded-xl border-2 ${err ? 'border-red-700' : 'border-gray-300'} px-4 py-3 text-[17px] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B]`;

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#2D2D2D] flex flex-col items-center justify-center p-4 py-8 text-[17px]">
            <main className="w-full max-w-md flex flex-col items-center gap-6">
                <div className="bg-white rounded-3xl border border-gray-200 w-full overflow-hidden">
                    <div className="bg-[#1F3B6B] p-8 text-white text-center">
                        <Link to="/" className="inline-block mb-3 rounded-xl bg-white p-2">
                            <img src={logo} alt="MOLEK Schools home" className="h-20 w-auto object-contain" />
                        </Link>
                        <h1 className="text-2xl font-bold">Student portal</h1>
                        <p className="mt-1 text-white/90">Sign in to see results and report cards</p>
                    </div>

                    <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5">
                        {errors.root && (
                            <p role="alert" className="rounded-xl border-2 border-red-700 bg-red-50 p-4 font-semibold text-red-800">{errors.root.message}</p>
                        )}
                        <div>
                            <label htmlFor="admission_number" className="block font-semibold mb-1">Admission number</label>
                            <input id="admission_number" type="text" autoComplete="username" autoCapitalize="characters" spellCheck="false"
                                placeholder="MOL/2024/015" aria-invalid={Boolean(errors.admission_number)}
                                aria-describedby={errors.admission_number ? 'admission_number-error' : undefined}
                                className={`${field(errors.admission_number)} uppercase`} {...register('admission_number')} />
                            {errors.admission_number && <p id="admission_number-error" className="mt-1 font-semibold text-red-700">{errors.admission_number.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                            <div className="relative">
                                <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password"
                                    aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined}
                                    className={`${field(errors.password)} pr-14`} {...register('password')} />
                                <button type="button" onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 inline-flex items-center justify-center rounded-lg text-[#1F3B6B] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B]">
                                    {showPassword ? <EyeOff aria-hidden="true" className="h-5 w-5" /> : <Eye aria-hidden="true" className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && <p id="password-error" className="mt-1 font-semibold text-red-700">{errors.password.message}</p>}
                        </div>
                        <button type="submit" disabled={isSubmitting}
                            className="w-full min-h-12 rounded-full bg-[#1F3B6B] py-3 font-semibold text-white hover:bg-[#2D2D2D] disabled:opacity-60 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]">
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                        <p className="text-center">
                            Forgotten your password?{' '}
                            <a href="tel:+2347066277945" className="inline-flex items-center gap-1 font-semibold text-[#2563EB] underline underline-offset-2">
                                <Phone aria-hidden="true" className="h-4 w-4" /> Call the school office
                            </a>
                        </p>
                        <p className="text-center"><Link to="/" className="text-[#2563EB] underline underline-offset-2">Back to the school website</Link></p>
                    </form>
                </div>

                {events.length > 0 && (
                    <section className="bg-white rounded-3xl border border-gray-200 w-full overflow-hidden" aria-labelledby="events-heading">
                        <h2 id="events-heading" className="flex items-center gap-2 px-6 pt-5 font-bold text-[#1F3B6B]">
                            <Calendar aria-hidden="true" className="h-5 w-5" /> Upcoming events
                        </h2>
                        <ul className="divide-y divide-gray-100 mt-2">
                            {events.slice(0, 4).map((event) => {
                                const dt = new Date(event.event_date);
                                return (
                                    <li key={event.id} className="px-6 py-4 flex gap-4">
                                        <div className="w-14 text-center" aria-hidden="true">
                                            <div className="text-sm font-semibold uppercase text-[#1F3B6B]">{dt.toLocaleString('en-NG', { month: 'short' })}</div>
                                            <div className="text-2xl font-bold">{dt.getDate()}</div>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold">{event.title}</p>
                                            <p className="text-gray-600">{dt.toLocaleString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</p>
                                            {event.location && <p className="text-gray-600 flex items-center gap-1"><MapPin aria-hidden="true" className="h-4 w-4" /> {event.location}</p>}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </main>
        </div>
    );
};

export default StudentLogin;

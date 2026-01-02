import { useState } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { updateStudentProfile, changeStudentPassword, exportStudentData } from '../../service/studentApi';

const Settings = () => {
    const { student, updateProfile } = useStudentAuth();
    const [imageFile, setImageFile] = useState(null);
    const [parentEmail, setParentEmail] = useState(student?.parent_guardian_email || '');
    const [parentPhone, setParentPhone] = useState(student?.parent_guardian_phone || '');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // 🖼️ Handle Profile Update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const formData = new FormData();
        if (imageFile) formData.append('passport_url', imageFile);
        if (parentEmail) formData.append('parent_guardian_email', parentEmail);
        if (parentPhone) formData.append('parent_guardian_phone', parentPhone);

        try {
            const updatedStudent = await updateStudentProfile(formData);
            updateProfile(updatedStudent);
            setMessage('✅ Profile updated successfully!');
            setImageFile(null);
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 🔐 Change Password
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (newPassword !== confirmPassword) {
            setMessage("❌ New passwords don't match");
            setLoading(false);
            return;
        }

        if (newPassword.length < 8) {
            setMessage("❌ Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        try {
            await changeStudentPassword(oldPassword, newPassword);
            setMessage('✅ Password changed successfully!');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // 💾 Export Student Data
    const handleExportData = async () => {
        setMessage('');
        setLoading(true);

        try {
            await exportStudentData();
            setMessage('📥 Data downloaded successfully!');
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fullName = student?.first_name && student?.last_name
        ? `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()
        : student?.full_name || 'Student';

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Settings</h1>
            <p className="mb-8 text-gray-700">
                Welcome back, <span className="font-medium">{fullName}</span> — manage your account below.
            </p>

            {/* Feedback Message */}
            {message && (
                <div
                    className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-2 ${
                        message.startsWith('✅') || message.startsWith('📥')
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                >
                    <span className="text-lg">{message.charAt(0)}</span>
                    <span>{message.substring(2)}</span>
                </div>
            )}

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* 🖼️ PROFILE PICTURE + CONTACT */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Update Profile
                    </h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={student?.passport_url || '/logo.webp'}
                                alt="Current"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
                                onError={(e) => e.target.src = '/logo.webp'}
                            />
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Update Profile Picture
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>

                            <div className="w-full space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent/Guardian Email
                                    </label>
                                    <input
                                        type="email"
                                        value={parentEmail}
                                        onChange={(e) => setParentEmail(e.target.value)}
                                        placeholder="parent@example.com"
                                        className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Parent/Guardian Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={parentPhone}
                                        onChange={(e) => setParentPhone(e.target.value)}
                                        placeholder="+234..."
                                        className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 🔐 CHANGE PASSWORD */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Change Password
                    </h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                minLength="8"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm px-4 py-3 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed"
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>

                {/* 💾 DOWNLOAD DATA */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export Your Data
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Download all your student information including academic records, personal details, and grades in JSON format for your records.
                    </p>
                    <button
                        onClick={handleExportData}
                        disabled={loading}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:cursor-not-allowed font-semibold"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {loading ? 'Downloading...' : 'Download My Data'}
                    </button>
                </div>

                {/* Student Info Display */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md border border-blue-100 p-6 rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-600">Admission Number:</p>
                            <p className="font-semibold text-gray-800">{student?.admission_number}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Current Class:</p>
                            <p className="font-semibold text-gray-800">{student?.current_class?.name || 'Not Assigned'}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Date of Birth:</p>
                            <p className="font-semibold text-gray-800">
                                {student?.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Status:</p>
                            <p className={`font-semibold ${student?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                {student?.is_active ? '✓ Active' : '✗ Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
import { useState } from 'react';


const Settings = () => {
    const [imageFile, setImageFile] = useState(null);
    const [email, setEmail] = useState(getUser()?.parent_email || '');
    const [phone, setPhone] = useState(getUser()?.parent_phone || '');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const user = getUser();

    // 🖼️ Handle Image & Contact Info Update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const formData = new FormData();
        if (imageFile) formData.append('passport_url', imageFile);
        if (email) formData.append('parent_email', email);
        if (phone) formData.append('parent_phone', phone);

        try {
            await apiUpdateProfile(formData);
            setMessage('✅ Profile updated successfully!');
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

        try {
            await apiChangePassword(oldPassword, newPassword);
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
            await apiExportStudentData();
            setMessage('📥 Data downloaded!');
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Account Settings</h1>
            <p className="mb-8 text-gray-700">
                Welcome back, <span className="font-medium">{user?.full_name}</span> — manage your account below.
            </p>

            {/* Feedback Message */}
            {message && (
                <div
                    className={`mb-6 p-3 rounded text-sm ${
                        message.startsWith('✅') || message.startsWith('📥')
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                    }`}
                >
                    {message}
                </div>
            )}

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* 🖼️ PROFILE PICTURE + CONTACT */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        📷 Update Profile
                    </h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={user?.passport_url || '/default-avatar.png'}
                                alt="Current"
                                className="w-24 h-24 md:w-32 md:h-32 rounded object-cover border-4 border-blue-100"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                            />
                            <div className="w-full space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Parent Email"
                                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Parent Phone (+234...)"
                                    className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition-colors"
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* 🔐 CHANGE PASSWORD */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">🔐 Change Password</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                minLength="8"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>

                {/* 💾 DOWNLOAD DATA */}
                <div className="bg-white shadow-md border border-gray-100 p-6 rounded-xl lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">💾 Export Your Data</h2>
                    <p className="text-gray-600 mb-4">
                        You can download all your student information at any time for personal records or transfer purposes.
                    </p>
                    <button
                        onClick={handleExportData}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5A2 2 0 0 1 14 14H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L6.354 9.146a.5.5 0 1 0-.708.708l3 3z"/>
                        </svg>
                        {loading ? 'Downloading...' : 'Download My Data'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
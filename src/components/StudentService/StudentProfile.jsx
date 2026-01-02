import { motion } from 'framer-motion';
import { useStudentAuth } from '../../context/StudentAuthContext';
import logo from '/logo.webp';

const StudentProfile = () => {
    const { student } = useStudentAuth();

    const fullName = student?.first_name && student?.last_name
        ? `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()
        : student?.full_name || 'Student';

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen bg-gray-50 p-4 md:p-6"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={student?.passport_url || logo}
                    alt={fullName}
                    className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    onError={(e) => (e.target.src = logo)}
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                    <p className="text-sm text-gray-600">View your complete student information</p>
                </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Card */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-blue-500 flex items-center gap-2">
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name</label>
                                <p className="text-lg font-medium text-gray-800">{fullName}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Admission Number</label>
                                <p className="text-lg font-medium text-blue-600">{student?.admission_number || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Date of Birth</label>
                                <p className="text-lg font-medium text-gray-800">{formatDate(student?.date_of_birth)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Gender</label>
                                <p className="text-lg font-medium text-gray-800">
                                    {student?.gender === 'M' ? '👨 Male' : '👩 Female'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Current Class</label>
                                <p className="text-lg font-medium text-gray-800">{student?.current_class?.name || 'Not Assigned'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Status</label>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                    student?.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                  {student?.is_active ? '✓ Active' : '✗ Inactive'}
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-green-500 flex items-center gap-2">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Contact Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Address</label>
                                <p className="text-base text-gray-800">{student?.address || 'Not Provided'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">State of Origin</label>
                                <p className="text-base text-gray-800">{student?.state_of_origin || 'Not Provided'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Local Government Area</label>
                                <p className="text-base text-gray-800">{student?.lga || 'Not Provided'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Parent/Guardian Information */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-purple-500 flex items-center gap-2">
                            <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Parent/Guardian Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Name</label>
                                <p className="text-base text-gray-800">{student?.parent_guardian_name || 'Not Provided'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Phone Number</label>
                                <p className="text-base text-gray-800">{student?.parent_guardian_phone || 'Not Provided'}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                                <p className="text-base text-gray-800">{student?.parent_guardian_email || 'Not Provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Profile Picture Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
                        <img
                            src={student?.passport_url || logo}
                            alt={fullName}
                            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-md mb-4"
                            onError={(e) => (e.target.src = logo)}
                        />
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{fullName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{student?.admission_number}</p>
                        <p className="text-sm font-medium text-blue-600">{student?.current_class?.name || 'No Class'}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span className="text-sm text-gray-600">Academic Level</span>
                                <span className="text-lg font-bold text-blue-600">{student?.current_class?.level || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span className="text-sm text-gray-600">Enrollment Status</span>
                                <span className={`text-sm font-semibold ${student?.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  {student?.is_active ? 'Active' : 'Inactive'}
                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                <span className="text-sm text-gray-600">Academic Year</span>
                                <span className="text-sm font-medium text-gray-800">2024/2025</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Profile Actions</h3>
                        <div className="space-y-3">
                            <a
                                href="/student/settings"
                                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                                Edit Profile
                            </a>
                            <a
                                href="/student/grades"
                                className="block w-full text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                            >
                                View Grades
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default StudentProfile;
/**
 * Student Profile Component
 * Displays complete student information with recent results
 * Mobile-responsive design
 */

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getStudentGrades } from '../../service/studentApi';
import logo from '/logo.webp';

const StudentProfile = () => {
    const { student } = useStudentAuth();
    const [recentGrades, setRecentGrades] = useState([]);
    const [loadingGrades, setLoadingGrades] = useState(true);

    // Fetch recent grades
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                setLoadingGrades(true);
                const data = await getStudentGrades();
                const grades = data.grades || data.results || [];
                // Get most recent 5 grades
                setRecentGrades(grades.slice(0, 5));
            } catch (error) {
                console.error('Failed to fetch grades:', error);
            } finally {
                setLoadingGrades(false);
            }
        };
        fetchGrades();
    }, []);

    // Memoized student info
    const studentInfo = useMemo(() => ({
        fullName: student?.first_name && student?.last_name
            ? `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()
            : student?.full_name || 'Student',
        admissionNumber: student?.admission_number || 'N/A',
        dateOfBirth: student?.date_of_birth,
        gender: student?.gender,
        email: student?.email,
        phoneNumber: student?.phone_number,
        address: student?.address,
        stateOfOrigin: student?.state_of_origin,
        localGovtArea: student?.local_govt_area,
        className: student?.class_level_name || 'Not Assigned',
        enrollmentSession: student?.enrollment_session_name || 'N/A',
        isActive: student?.is_active,
        parentName: student?.parent_name,
        parentPhone: student?.parent_phone,
        parentEmail: student?.parent_email,
        passport: student?.passport || student?.passport_url,
    }), [student]);

    // Format date helper
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Grade badge class
    const getGradeBadgeClass = (score) => {
        const numScore = parseFloat(score) || 0;
        if (numScore >= 75) return 'bg-green-100 text-green-800';
        if (numScore >= 70) return 'bg-blue-100 text-blue-800';
        if (numScore >= 60) return 'bg-cyan-100 text-cyan-800';
        if (numScore >= 50) return 'bg-yellow-100 text-yellow-800';
        if (numScore >= 45) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    // Info card component
    const InfoItem = ({ label, value }) => (
        <div className="min-w-0">
            <label className="block text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">{label}</label>
            <p className="text-sm sm:text-base font-medium text-gray-800 truncate">{value || 'Not Provided'}</p>
        </div>
    );

    // Section header component
    const SectionHeader = ({ title, icon, colorClass }) => (
        <h2 className={`text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 ${colorClass} flex items-center gap-2`}>
            {icon}
            <span className="truncate">{title}</span>
        </h2>
    );

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 max-w-full overflow-x-hidden"
        >
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <img
                    src={studentInfo.passport || logo}
                    alt={studentInfo.fullName}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-blue-100 flex-shrink-0"
                    onError={(e) => { e.target.src = logo; }}
                />
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">My Profile</h1>
                    <p className="text-xs sm:text-sm text-gray-600">View your complete student information</p>
                </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Main Profile Card */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <SectionHeader
                            title="Personal Information"
                            colorClass="border-blue-500"
                            icon={
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <InfoItem label="Full Name" value={studentInfo.fullName} />
                            <div className="min-w-0">
                                <label className="block text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">Admission Number</label>
                                <p className="text-sm sm:text-base font-medium text-blue-600 truncate">{studentInfo.admissionNumber}</p>
                            </div>
                            <InfoItem label="Date of Birth" value={formatDate(studentInfo.dateOfBirth)} />
                            <div className="min-w-0">
                                <label className="block text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">Gender</label>
                                <p className="text-sm sm:text-base font-medium text-gray-800">
                                    {studentInfo.gender === 'M' ? '👨 Male' : studentInfo.gender === 'F' ? '👩 Female' : 'Not Specified'}
                                </p>
                            </div>
                            <InfoItem label="Current Class" value={studentInfo.className} />
                            <div className="min-w-0">
                                <label className="block text-xs sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1">Status</label>
                                <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                    studentInfo.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {studentInfo.isActive ? '✓ Active' : '✗ Inactive'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <SectionHeader
                            title="Contact Information"
                            colorClass="border-green-500"
                            icon={
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            }
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <InfoItem label="Email" value={studentInfo.email} />
                            <InfoItem label="Phone Number" value={studentInfo.phoneNumber} />
                            <div className="sm:col-span-2">
                                <InfoItem label="Address" value={studentInfo.address} />
                            </div>
                            <InfoItem label="State of Origin" value={studentInfo.stateOfOrigin} />
                            <InfoItem label="Local Government Area" value={studentInfo.localGovtArea} />
                        </div>
                    </div>

                    {/* Parent/Guardian Information */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <SectionHeader
                            title="Parent/Guardian Information"
                            colorClass="border-purple-500"
                            icon={
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <InfoItem label="Parent/Guardian Name" value={studentInfo.parentName} />
                            <InfoItem label="Phone Number" value={studentInfo.parentPhone} />
                            <InfoItem label="Email Address" value={studentInfo.parentEmail} />
                        </div>
                    </div>

                    {/* Recent Results - NEW SECTION */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <SectionHeader
                            title="Recent Results"
                            colorClass="border-orange-500"
                            icon={
                                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            }
                        />

                        {loadingGrades ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                        ) : recentGrades.length === 0 ? (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-gray-500 text-sm">No results available yet</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentGrades.map((grade, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-800 text-sm truncate">{grade.subject_name}</p>
                                            <p className="text-xs text-gray-500">{grade.session_name} - {grade.term_name}</p>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-2">
                                            <span className="text-sm font-bold text-blue-600">{grade.total_score}</span>
                                            <span className={`${getGradeBadgeClass(grade.total_score)} px-2 py-1 rounded-full text-xs font-medium`}>
                                                {grade.grade}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                
                                <a
                                    href="/student/grades"
                                    className="block w-full text-center mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    View All Results →
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4 sm:space-y-6">
                    {/* Profile Picture Card */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 text-center">
                        <img
                            src={studentInfo.passport || logo}
                            alt={studentInfo.fullName}
                            className="w-28 h-28 sm:w-40 sm:h-40 mx-auto rounded-full object-cover border-4 border-blue-100 shadow-md mb-4"
                            onError={(e) => { e.target.src = logo; }}
                        />
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 truncate px-2">{studentInfo.fullName}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{studentInfo.admissionNumber}</p>
                        <p className="text-xs sm:text-sm font-medium text-blue-600">{studentInfo.className}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Quick Stats</h3>
                        <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg">
                                <span className="text-xs sm:text-sm text-gray-600">Current Class</span>
                                <span className="text-sm sm:text-base font-bold text-blue-600 truncate ml-2">{studentInfo.className}</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg">
                                <span className="text-xs sm:text-sm text-gray-600">Status</span>
                                <span className={`text-xs sm:text-sm font-semibold ${studentInfo.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                    {studentInfo.isActive ? '✓ Active' : '✗ Inactive'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg">
                                <span className="text-xs sm:text-sm text-gray-600">Enrollment</span>
                                <span className="text-xs sm:text-sm font-medium text-gray-800 truncate ml-2">{studentInfo.enrollmentSession}</span>
                            </div>
                            {recentGrades.length > 0 && (
                                <div className="flex items-center justify-between p-2.5 sm:p-3 bg-white rounded-lg">
                                    <span className="text-xs sm:text-sm text-gray-600">Recent Results</span>
                                    <span className="text-sm sm:text-base font-bold text-orange-600">{recentGrades.length}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Quick Actions</h3>
                        <div className="space-y-2 sm:space-y-3">
                            <a
                                href="/student/settings"
                                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                            >
                                ✏️ Edit Profile
                            </a>
                            <a
                                href="/student/grades"
                                className="block w-full text-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                            >
                                📊 View All Grades
                            </a>
                            <a
                                href="/student/payments"
                                className="block w-full text-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2.5 sm:py-3 px-4 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                            >
                                💳 Payment History
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default StudentProfile;
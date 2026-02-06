/**
 * Student Dashboard Component
 * Displays welcome message, profile info, events, calendar, and academic stats
 * Updated for Nigerian School Grading System
 */

import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo from '/logo.webp';
import { useEffect, useState, useMemo } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getSchoolEvents, getDashboardStats } from '../../service/studentApi';

const Dashboard = () => {
    const { student } = useStudentAuth();
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);

    // Formatted current date
    const formattedDate = useMemo(() => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }, []);

    // Student display info
    const studentInfo = useMemo(() => ({
        fullName: student?.first_name && student?.last_name
            ? `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()
            : student?.full_name || 'Student',
        admissionNumber: student?.admission_number || 'N/A',
        currentClass: student?.class_level_name || student?.class_level?.name || 'Not Assigned',
        passportUrl: student?.passport || student?.passport_url || null,
        gender: student?.gender,
        isActive: student?.is_active,
        enrollmentSession: student?.enrollment_session_name || 'N/A'
    }), [student]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getSchoolEvents();
                setEvents(Array.isArray(data) ? data : data.results || []);
            } catch (err) {
                console.error('Failed to load events:', err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (err) {
                console.error('Failed to load stats:', err);
                setStats(null);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, []);

    /**
     * Nigerian Secondary School Grading Scale
     * A: 75-100 (Excellent)
     * B: 70-74 (Very Good)
     * C: 60-69 (Good)
     * D: 50-59 (Pass)
     * E: 45-49 (Fair)
     * F: 0-44 (Fail)
     */
    const getGradeInfo = (average) => {
        if (average >= 75) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100', remark: 'Excellent' };
        if (average >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100', remark: 'Very Good' };
        if (average >= 60) return { grade: 'C', color: 'text-cyan-600', bg: 'bg-cyan-100', remark: 'Good' };
        if (average >= 50) return { grade: 'D', color: 'text-yellow-600', bg: 'bg-yellow-100', remark: 'Pass' };
        if (average >= 45) return { grade: 'E', color: 'text-orange-600', bg: 'bg-orange-100', remark: 'Fair' };
        return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100', remark: 'Fail' };
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen bg-gray-50"
        >
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <p className="text-sm opacity-90">{formattedDate}</p>
                        <h1 className="text-2xl md:text-3xl font-bold mt-2">
                            Welcome back, <span className="text-yellow-300">{studentInfo.fullName}</span>!
                        </h1>
                        <p className="mt-2 text-sm opacity-90">Always stay updated in your student portal</p>
                    </div>
                    <img src="/school-stuff.png" alt="School" className="w-37 md:w-45 h-auto self-center" />
                </div>
            </div>

            {/* Profile Card + Upcoming Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col items-center text-center">
                    <div className="mb-6">
                        {studentInfo.passportUrl ? (
                            <img
                                src={studentInfo.passportUrl}
                                alt={`${studentInfo.fullName}'s profile`}
                                className="w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded"
                                onError={(e) => { e.target.src = logo; }}
                            />
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-blue-200 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-20 md:w-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{studentInfo.fullName}</h2>

                    <div className="flex items-center justify-center gap-3 mb-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm md:text-base font-medium text-blue-700 bg-blue-50 px-4 py-2 rounded-full shadow-sm">
                            {studentInfo.admissionNumber}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-3 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-indigo-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm md:text-base font-medium text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full shadow-sm">
                            {studentInfo.currentClass}
                        </span>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📅</span> Upcoming Events
                    </h2>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                            {events.length > 0 ? (
                                events.slice(0, 5).map((event, idx) => (
                                    <li key={idx} className="py-3 flex items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-800 truncate">{event.title}</p>
                                            <p className="text-sm text-gray-500">{event.content_type || 'Event'}</p>
                                        </div>
                                        {event.media_url && (
                                            <img
                                                src={event.media_url}
                                                alt={event.title}
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-200"
                                                onError={(e) => { e.target.src = logo; }}
                                            />
                                        )}
                                    </li>
                                ))
                            ) : (
                                <li className="py-8 text-center text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p>No upcoming events</p>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {/* Calendar + Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Calendar</h2>
                    <Calendar
                        value={calendarDate}
                        onChange={setCalendarDate}
                        className="react-calendar w-full text-sm md:text-base border-none"
                        tileClassName={({ date }) =>
                            date.getDate() === new Date().getDate() &&
                            date.getMonth() === new Date().getMonth() &&
                            date.getFullYear() === new Date().getFullYear()
                                ? 'bg-blue-500 text-white rounded-full font-bold'
                                : 'hover:bg-blue-50 rounded-full'
                        }
                    />
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Quick Overview</h2>

                    {statsLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {/* Current Class */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {studentInfo.currentClass}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Current Class</p>
                            </div>

                            {/* Average Score */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                                <div className={`text-2xl font-bold ${stats?.averageScore >= 45 ? 'text-green-600' : 'text-red-600'}`}>
                                    {stats?.averageScore || 0}%
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Average Score</p>
                            </div>

                            {/* Total Exams Taken */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {stats?.totalExams || 0}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Exams Taken</p>
                            </div>

                            {/* Subjects Passed */}
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {stats?.passedSubjects || 0}/{stats?.totalExams || 0}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">Subjects Passed</p>
                            </div>

                            {/* Enrollment Status */}
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl text-center col-span-2">
                                <div className={`text-lg font-bold ${studentInfo.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                    {studentInfo.isActive ? '✓ Active Student' : '✗ Inactive'}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {studentInfo.gender === 'M' ? '👨 Male' : '👩 Female'} • Enrolled: {studentInfo.enrollmentSession}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Performance */}
            {!statsLoading && stats?.grades?.length > 0 && (
                <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-5">Recent Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {stats.grades.slice(0, 4).map((grade, idx) => {
                            const gradeInfo = getGradeInfo(grade.total_score || 0);
                            return (
                                <div
                                    key={idx}
                                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                                >
                                    <h3 className="font-semibold text-gray-800 text-sm truncate">{grade.subject_name}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-2xl font-bold text-blue-600">{grade.total_score || 0}</span>
                                        <span className={`${gradeInfo.bg} ${gradeInfo.color} px-3 py-1 rounded-full text-sm font-medium`}>
                                            {grade.grade || gradeInfo.grade}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{gradeInfo.remark}</p>
                                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${grade.total_score >= 45 ? 'bg-green-500' : 'bg-red-500'}`}
                                            style={{ width: `${Math.min(grade.total_score || 0, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {stats.grades.length > 4 && (
                        <div className="mt-4 text-center">
                            <a
                                href="/student/grades"
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                                View all {stats.grades.length} results →
                            </a>
                        </div>
                    )}
                </div>
            )}
        </motion.main>
    );
};

export default Dashboard;
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo from '/logo.webp';
import { useEffect, useState } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getSchoolEvents } from '../../service/studentApi';

const Dashboard = () => {
    const { student } = useStudentAuth();
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getSchoolEvents();
                setEvents(data.results || data || []);
            } catch (err) {
                console.error('Failed to load events:', err);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const fullName = student?.first_name && student?.last_name
        ? `${student.first_name} ${student.middle_name || ''} ${student.last_name}`.trim()
        : student?.full_name || 'Student';

    const admissionNumber = student?.admission_number || 'N/A';
    const currentClass = student?.current_class?.name || 'Not Assigned';
    const passportUrl = student?.passport_url;

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
                            Welcome back, <span className="text-yellow-300">{fullName}</span>!
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
                        {passportUrl ? (
                            <img
                                src={passportUrl}
                                alt={`${fullName}'s profile`}
                                className="w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded"
                                onError={(e) => e.target.src = logo}
                            />
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-blue-200 shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-20 md:w-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Student Info */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{fullName}</h2>

                    {/* Admission Number */}
                    <div className="flex items-center justify-center gap-3 mb-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <span className="text-sm md:text-base font-medium text-blue-700 bg-blue-50 px-4 py-2 rounded-full shadow-sm">
              {admissionNumber}
            </span>
                    </div>

                    {/* Current Class */}
                    <div className="flex items-center justify-center gap-3 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                        </svg>
                        <span className="text-sm md:text-base font-medium text-green-700 bg-green-50 px-4 py-2 rounded-full shadow-sm">
              {currentClass}
            </span>
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Upcoming Events</h2>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                            {events.length > 0 ? (
                                events.filter(event => event.published).slice(0, 5).map(event => (
                                    <li
                                        key={event.id}
                                        className="flex items-start gap-4 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm"
                                    >
                                        <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap flex-shrink-0 pt-1">
                                            <div>{new Date(event.publish_date || event.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-800 text-sm md:text-base">{event.title}</h4>
                                            <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                                        </div>
                                        {event.media_url && (
                                            <img
                                                src={event.media_url}
                                                alt={event.title}
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-200"
                                                onError={(e) => e.target.src = logo}
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

            {/* Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-blue-600">
                                {student?.current_class?.level || 'N/A'}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Year Level</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                            <div className="text-3xl font-bold text-green-600">
                                {student?.gender === 'M' ? '👨' : '👩'}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{student?.gender === 'M' ? 'Male' : 'Female'}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center col-span-2">
                            <div className="text-lg font-bold text-purple-600">
                                {student?.is_active ? '✓ Active Student' : '✗ Inactive'}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Enrollment Status</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default Dashboard;
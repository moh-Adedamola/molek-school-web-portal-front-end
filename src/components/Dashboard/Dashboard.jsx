import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo from '/logo.webp';
import { useState } from 'react';
import { getUser } from '../../service/auth';

const attendanceData = [
    { month: 'May', rate: 85 },
    { month: 'Jun', rate: 90 },
    { month: 'Jul', rate: 95 },
    { month: 'Aug', rate: 88 },
    { month: 'Sep', rate: 92 },
    { month: 'Oct', rate: 87 },
    { month: 'Nov', rate: 98 },
];

const upcomingEvents = [
    {
        date: '22 Nov',
        time: '16:00',
        title: 'Python Lesson 12',
        teacher: 'Nickolas Flamel',
        avatar: logo,
    },
    {
        date: '23 Nov',
        time: '17:00',
        title: 'Extra Webinar',
        teacher: 'Ginevra Potter',
        avatar: logo,
    },
    {
        date: '24 Nov',
        time: '17:00',
        title: 'C++ Lesson 10',
        teacher: 'Tom Black',
        avatar: logo,
    },
];

const Dashboard = () => {
    console.log('✅ DASHBOARD COMPONENT IS LOADED!');

    const [calendarDate, setCalendarDate] = useState(new Date());

    // ✅ GET STUDENT DATA FROM AUTH SERVICE
    const user = getUser();
    const fullName = user?.full_name || 'Student';
    const admissionNumber = user?.admission_number || 'N/A';
    const role = user?.role || 'Student';
    const passportUrl = user?.passport_url || null;

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen p-4 md:p-6 bg-gray-50"
        >
            {/* ✅ WELCOME HEADER — BOLDER, MORE PROMINENT */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                Welcome back, <span className="text-blue-700">{fullName}</span>!
            </h1>

            <div className="p-6 md:p-8 text-center mx-auto max-w-md md:max-w-lg mb-8">
                {/* Profile Photo — BOLDER, LARGER, WITH SHADOW */}
                <div className="flex justify-center mb-6">
                    {passportUrl ? (
                        <img
                            src={passportUrl}
                            alt={`${fullName}'s profile`}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        />
                    ) : (
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 md:h-20 md:w-20 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Admission Number — BIG, BOLD, BLUE, WITH ICON */}
                <div className="flex items-center justify-center gap-3 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-7 md:w-7 text-blue-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span className="text-lg md:text-xl font-bold text-blue-800 bg-blue-50 px-4 py-2 rounded-full shadow-sm">
            {admissionNumber}
          </span>
                </div>

                {/* Role — BIG, BOLD, GREEN, WITH ICON */}
                <div className="flex items-center justify-center gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 md:h-7 md:w-7 text-green-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.738 4h-13.738a2 2 0 01-2 2v4a2 2 0 012 2h13.738a2 2 0 012-2v-4a2 2 0 01-2-2z"
                        />
                    </svg>
                    <span className="text-lg md:text-xl font-bold text-green-800 bg-green-50 px-4 py-2 rounded-full shadow-sm">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
                </div>
            </div>

            {/* ✅ CALENDAR + ATTENDANCE — MOBILE-FRIENDLY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Calendar */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Calendar</h2>
                    <Calendar
                        value={calendarDate}
                        onChange={setCalendarDate}
                        className="react-calendar w-full text-sm md:text-base"
                        tileClassName={({ date }) =>
                            date.getDate() === new Date().getDate() &&
                            date.getMonth() === new Date().getMonth()
                                ? 'bg-blue-100 text-blue-800 rounded-full'
                                : ''
                        }
                    />
                </div>

                {/* Attendance */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Attendance Rate</h2>
                    <div className="relative h-48 flex items-end justify-between gap-1">
                        {attendanceData.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center group flex-1 min-w-[50px]"
                                title={`${item.month}: ${item.rate}%`}
                            >
                                <div
                                    className={`w-full rounded-t transition-all duration-700 ease-out ${
                                        item.rate > 90 ? 'bg-green-500' :
                                            item.rate > 80 ? 'bg-blue-500' :
                                                'bg-pink-500'
                                    }`}
                                    style={{ height: `${item.rate}%` }}
                                ></div>
                                <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 text-center w-full truncate">
                  {item.month}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ✅ UPCOMING EVENTS — MOBILE-FRIENDLY, SPACED OUT */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">Upcoming Events</h2>
                <ul className="space-y-3">
                    {upcomingEvents.map((event, idx) => (
                        <li
                            key={idx}
                            className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm"
                        >
                            <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap flex-shrink-0 pt-1">
                                <div>{event.date}</div>
                                <div>{event.time}</div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-800 text-sm md:text-base">{event.title}</h4>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">Teacher: {event.teacher}</p>
                            </div>
                            <img
                                src={event.avatar}
                                alt={event.teacher}
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-200"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </motion.main>
    );
};

export default Dashboard;
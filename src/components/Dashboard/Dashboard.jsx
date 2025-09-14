import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo from '/logo.webp';
import { useState } from 'react';

const latestResults = [
    { subject: 'Python. Unit 5', score: 90, max: 100 },
    { subject: 'C++. Unit 4', score: 95, max: 100 },
    { subject: 'Robotics. Unit 2', score: 85, max: 100 },
    { subject: 'HTML. Unit 10', score: 95, max: 100 },
];

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
    console.log('✅ DASHBOARD COMPONENT IS LOADED!');

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-4 md:p-6"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome back, Emilia!</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Latest Results */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Latest Results</h2>
                    <ul className="space-y-3">
                        {latestResults.map((result, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <span className="text-sm text-gray-700 flex-1 min-w-0">{result.subject}</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-700 ease-out"
                                        style={{ width: `${Math.min((result.score / result.max) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 min-w-[50px] text-right">
                                    {result.score}/{result.max}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Calendar */}
                <div className="bg-blue-300 rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Calendar</h2>
                    <Calendar
                        value={calendarDate}
                        onChange={setCalendarDate}
                        className="react-calendar w-full text-sm"
                        tileClassName={({ date }) =>
                            date.getDate() === new Date().getDate() &&
                            date.getMonth() === new Date().getMonth()
                                ? 'bg-blue-100 text-blue-800 rounded-full'
                                : ''
                        }
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Attendance */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Attendance Rate</h2>
                    <div className="relative h-48 flex items-end justify-between gap-1">
                        {attendanceData.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center group flex-1"
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
                                <span className="mt-2 text-xs text-gray-600 text-center w-full truncate">
                                    {item.month}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Events</h2>
                    <ul className="space-y-3">
                        {upcomingEvents.map((event, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                            >
                                <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                                    <div>{event.date}</div>
                                    <div>{event.time}</div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-800 text-sm">{event.title}</h4>
                                    <p className="text-xs text-gray-600 mt-1">Teacher: {event.teacher}</p>
                                </div>
                                <img
                                    src={event.avatar}
                                    alt={event.teacher}
                                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.main>
    );
};

export default Dashboard;
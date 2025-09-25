import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaBook, FaUserGraduate, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '/logo.webp';
import { motion } from 'framer-motion';

const DashboardHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', icon: <FaChartBar />, path: '/dashboard' },
        { name: 'Payment', icon: <FaBook />, path: '/dashboard/payment' },
        { name: 'Grades', icon: <FaUserGraduate />, path: '/dashboard/grades' },
        { name: 'Settings', icon: <FaCog />, path: '/dashboard/settings' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            {/* ===== MOBILE HEADER (Top Bar) ===== */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Molek Schools" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-xl font-bold tracking-wide">Molek</span>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none"
                        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                    >
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* ===== MOBILE SIDEBAR (Slide In From Right) ===== */}
            {isSidebarOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="md:hidden fixed inset-0 z-50 flex"
                >
                    {/* Backdrop */}
                    <div
                        className="flex-1 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <div className="w-72 bg-gradient-to-br from-blue-300 to-indigo-800 text-white p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <img src={logo} alt="Molek Schools" className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-xl font-bold">Molek Schools</span>
                        </div>

                        <nav className="space-y-2 flex-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                        location.pathname === item.path
                                            ? 'bg-white/20 shadow-md'
                                            : 'hover:bg-white/10'
                                    }`}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </nav>

                        <hr className="border-white/20 my-4" />

                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 text-red-100 hover:text-red-200 hover:bg-red-700 rounded-xl transition-colors"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <FaSignOutAlt />
                            <span className="font-medium">Logout</span>
                        </Link>
                    </div>
                </motion.div>
            )}

            {/* ===== DESKTOP SIDEBAR (Fixed Left) ===== */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 lg:w-64 bg-gradient-to-b from-blue-500 to-indigo-800 text-white shadow-xl z-40">
                <div className="flex flex-col w-full h-full p-6">
                    {/* Logo & Title */}
                    <div className="flex items-center gap-3 mb-8">
                        <img src={logo} alt="Molek Schools" className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-xl font-bold">Molek</span>
                    </div>

                    {/* Nav Items */}
                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    location.pathname === item.path
                                        ? 'bg-white/20 shadow-md'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="pt-4 border-t border-white/20 mt-auto">
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-3 text-red-100 hover:text-red-200 hover:bg-red-700 rounded-xl transition-colors"
                        >
                            <FaSignOutAlt />
                            <span className="font-medium">Logout</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardHeader;
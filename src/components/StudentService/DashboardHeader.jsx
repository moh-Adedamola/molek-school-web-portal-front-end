import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartBar, FaBook, FaUserGraduate, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '/logo.webp';
import { motion } from 'framer-motion';
import { useStudentAuth } from '../../context/StudentAuthContext';

const DashboardHeader = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { student, logout } = useStudentAuth();

    const navItems = [
        { name: 'Dashboard', icon: <FaChartBar />, path: '/student/dashboard' },
        { name: 'Profile', icon: <FaUser />, path: '/student/profile' },
        { name: 'Grades', icon: <FaUserGraduate />, path: '/student/grades' },
        { name: 'Payment', icon: <FaBook />, path: '/student/payment' },
        { name: 'Settings', icon: <FaCog />, path: '/student/settings' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = () => {
        logout();
        navigate('/student/login');
    };

    const fullName = student?.first_name && student?.last_name
        ? `${student.first_name} ${student.last_name}`
        : student?.full_name || 'Student';

    return (
        <>
            {/* ===== MOBILE HEADER (Top Bar) ===== */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={student?.passport_url || logo} alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30" onError={(e) => e.target.src = logo} />
                        <span className="text-lg font-bold tracking-wide">{fullName}</span>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none"
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
                    <div className="w-72 bg-gradient-to-br from-blue-500 to-indigo-800 text-white p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <img src={student?.passport_url || logo} alt="Profile" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30" onError={(e) => e.target.src = logo} />
                            <div>
                                <span className="text-lg font-bold block">{fullName}</span>
                                <span className="text-xs text-blue-100">{student?.admission_number}</span>
                            </div>
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

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-100 hover:text-red-200 hover:bg-red-600/30 rounded-xl transition-colors"
                        >
                            <FaSignOutAlt />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </motion.div>
            )}

            {/* ===== DESKTOP SIDEBAR (Fixed Left) ===== */}
            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-60 lg:w-64 bg-gradient-to-b from-blue-500 to-indigo-800 text-white shadow-xl z-40">
                <div className="flex flex-col w-full h-full p-6">
                    {/* Logo & Student Info */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <img src={logo} alt="Molek Schools" className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-xl font-bold">MOLEK</span>
                        </div>
                        <div className="flex items-center gap-3 mt-4 p-3 bg-white/10 rounded-xl">
                            <img
                                src={student?.passport_url || logo}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-white/30"
                                onError={(e) => e.target.src = logo}
                            />
                            <div>
                                <p className="font-semibold text-sm">{fullName}</p>
                                <p className="text-xs text-blue-100">{student?.admission_number}</p>
                            </div>
                        </div>
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
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-100 hover:text-red-200 hover:bg-red-600/30 rounded-xl transition-colors w-full"
                        >
                            <FaSignOutAlt />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default DashboardHeader;
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChartBar, FaBook, FaUserGraduate, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from '/logo.webp';
import { motion } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', icon: <FaChartBar />, path: '/dashboard' },
        { name: 'Payment', icon: <FaBook />, path: '/dashboard/payment' },
        { name: 'Grades', icon: <FaUserGraduate />, path: '/dashboard/grades' },
        { name: 'Settings', icon: <FaCog />, path: '/dashboard/settings' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            {/* Floating Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Molek Schools" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-xl font-bold tracking-wide">Molek Schools</span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                                    location.pathname === item.path
                                        ? 'bg-blue-700 shadow-md'
                                        : 'hover:bg-blue-700 hover:shadow-sm'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Button (Desktop) */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link
                            to="/login"
                            className="flex items-center gap-1 px-3 py-2 text-red-100 hover:text-red-200 hover:bg-red-600 rounded-lg transition-colors"
                        >
                            <FaSignOutAlt />
                            <span className="font-medium">Logout</span>
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-blue-700 shadow-xl border-t border-blue-800 z-40"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                                    onClick={toggleMenu}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                            <hr className="border-blue-600" />
                            <Link
                                to="/login"
                                className="flex items-center gap-3 px-4 py-3 text-red-100 hover:text-red-200 hover:bg-red-700 rounded-lg transition-colors"
                                onClick={toggleMenu}
                            >
                                <FaSignOutAlt />
                                <span className="font-medium">Logout</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </header>

            {/* Spacer to prevent content from hiding behind fixed header */}
            <div className="h-16 md:h-20"></div>
        </>
    );
};

export default Header;
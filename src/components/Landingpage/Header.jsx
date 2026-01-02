import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    AcademicCapIcon,
    UserGroupIcon,
    NewspaperIcon,
    PhotoIcon,
    PhoneIcon,
    InformationCircleIcon,
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
    { href: '/about', label: 'About Us', icon: InformationCircleIcon },
    { href: '/admissions', label: 'Admissions', icon: UserGroupIcon },
    { href: '/academics', label: 'Academics', icon: AcademicCapIcon },
    { href: '/news', label: 'News & Events', icon: NewspaperIcon },
    { href: '/gallery', label: 'Gallery', icon: PhotoIcon },
    { href: '/contact', label: 'Contact', icon: PhoneIcon },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    // Close on Escape key
    const onKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
            }
        },
        [menuOpen]
    );

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    return (
        <>
            {/* Fixed Header */}
            <header
                className={`w-full fixed top-0 z-50 bg-white transition-all duration-300 ${
                    isScrolled ? 'shadow-xl' : 'shadow-md'
                }`}
            >
                {/* Marquee Banner */}
                <div className="bg-gradient-to-r from-[#E85D5D] via-[#d44a4a] to-[#E85D5D] text-white text-xs sm:text-sm py-2.5 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap px-4">
            <span className="inline-flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">📍</span>
                <span>10 Haliru Muhammed Street, Ofatedo, Osun State</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">📅</span>
                <span>Academic Year 2025/2026</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">📧</span>
                <span>info@molekschool.com</span>
              </span>
            </span>
                    </div>
                </div>

                {/* Main Navigation Bar */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo + Brand */}
                        <motion.a
                            href="/"
                            className="flex items-center gap-2 sm:gap-3 group"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-[#3B82F6]/20 group-hover:ring-[#3B82F6] transition-all duration-300 shadow-md">
                                <img src="/logo.webp" alt="Molek Schools Logo" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1F3B6B] group-hover:text-[#3B82F6] transition-colors">
                  MOLEK Schools
                </span>
                                <span className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:block">
                  Excellence in Islamic Education
                </span>
                            </div>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
                            {navLinks.map(({ href, label, icon: Icon }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    className="flex items-center gap-2 text-[#1F3B6B] hover:text-[#3B82F6] transition-all duration-200 px-3 xl:px-4 py-2 rounded-full hover:bg-blue-50 font-medium text-sm xl:text-base group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon className="h-4 w-4 xl:h-5 xl:w-5 group-hover:scale-110 transition-transform" />
                                    <span>{label}</span>
                                </motion.a>
                            ))}

                            {/* Student Login Button */}
                            <Link to="/student/login">
                                <motion.button
                                    className="ml-4 flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] hover:from-[#1F3B6B] hover:to-[#3B82F6] text-white px-5 py-2.5 rounded-full font-semibold text-sm xl:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span>Student Portal</span>
                                </motion.button>
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <motion.button
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            className="lg:hidden text-[#3B82F6] p-2 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-colors"
                            onClick={() => setMenuOpen((s) => !s)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={menuOpen ? 'close' : 'open'}
                                    initial={{ rotate: 0, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {menuOpen ? (
                                        <XMarkIcon className="h-6 w-6" />
                                    ) : (
                                        <Bars3Icon className="h-6 w-6" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-[88px] sm:h-[92px]" aria-hidden="true" />

            {/* Mobile Menu Overlay + Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl z-50 flex flex-col"
                            aria-label="Mobile navigation"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B]">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/30">
                                        <img src="/logo.webp" alt="Logo" className="h-full w-full object-cover" />
                                    </div>
                                    <span className="text-lg font-bold text-white">Menu</span>
                                </div>
                                <motion.button
                                    aria-label="Close menu"
                                    onClick={() => setMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </motion.button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 overflow-y-auto px-4 py-6">
                                <div className="space-y-2">
                                    {navLinks.map(({ href, label, icon: Icon }, index) => (
                                        <motion.a
                                            key={href}
                                            href={href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center gap-3 px-4 py-3 text-[#1F3B6B] rounded-xl hover:bg-blue-50 hover:text-[#3B82F6] transition-all duration-200 font-medium group"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-[#3B82F6] transition-colors">
                                                <Icon className="h-5 w-5 text-[#3B82F6] group-hover:text-white transition-colors" />
                                            </div>
                                            <span>{label}</span>
                                        </motion.a>
                                    ))}

                                    {/* Mobile Student Login */}
                                    <Link to="/student/login" onClick={() => setMenuOpen(false)}>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: navLinks.length * 0.05 }}
                                            className="flex items-center gap-3 px-4 py-3 mt-4 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white rounded-xl font-semibold shadow-md"
                                        >
                                            <div className="p-2 rounded-lg bg-white/20">
                                                <UserCircleIcon className="h-5 w-5" />
                                            </div>
                                            <span>Student Portal</span>
                                        </motion.div>
                                    </Link>
                                </div>
                            </nav>

                            {/* Footer Info */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-xs text-gray-600 text-center">
                                    © 2025 MOLEK Schools
                                </p>
                                <p className="text-xs text-gray-500 text-center mt-1">
                                    Excellence in Islamic Education
                                </p>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </>
    );
};

export default Header;
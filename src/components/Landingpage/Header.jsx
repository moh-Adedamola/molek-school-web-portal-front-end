import { useState, useEffect } from 'react';
import {
    AcademicCapIcon,
    UserGroupIcon,
    NewspaperIcon,
    PhotoIcon,
    PhoneIcon,
    InformationCircleIcon,
    ArrowRightCircleIcon,
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
    { href: '/about', label: 'About Us', icon: InformationCircleIcon },
    { href: '#admissions', label: 'Admissions', icon: UserGroupIcon },
    { href: '/academics', label: 'Academics', icon: AcademicCapIcon },
    { href: '#news', label: 'News & Events', icon: NewspaperIcon },
    { href: '#gallery', label: 'Gallery', icon: PhotoIcon },
    { href: '#contact', label: 'Contact', icon: PhoneIcon },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuOpen || showModal ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen, showModal]);

    return (
        <>
            <header className="w-full fixed top-0 z-50 bg-white shadow-md">
                {/* Top Info Bar */}
                <div className="bg-blue-900 text-white text-sm py-2 overflow-hidden">
                    <div className="animate-marquee">
                        10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State | Academic Year 2024/2025 | info@molekschools.edu.ng
                    </div>
                </div>

                {/* Main Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="text-xl font-bold text-blue-900">Molek Schools</div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a
                                key={href}
                                href={href}
                                className="flex items-center gap-1 text-blue-900 hover:text-blue-700 transition-colors duration-200"
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </a>
                        ))}
                        <button
                            className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-200"
                            onClick={() => setShowModal(true)}
                        >
                            <ArrowRightCircleIcon className="w-5 h-5" />
                            Get Started
                        </button>
                    </nav>

                    {/* Hamburger Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>

                {/* Backdrop Overlay */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10 transition-opacity duration-300"
                        onClick={() => setMenuOpen(false)}
                    />
                )}

                {/* Sidebar Menu */}
                <div
                    className={`fixed top-0 left-0 h-full w-1/2 bg-white z-50 transform ${
                        menuOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out shadow-lg`}
                >
                    <div className="p-6 space-y-4">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors duration-200"
                            >
                                <Icon className="w-5 h-5" />
                                {label}
                            </a>
                        ))}
                        <button
                            className="flex items-center gap-2 w-full bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-200"
                            onClick={() => {
                                setMenuOpen(false);
                                setShowModal(true);
                            }}
                        >
                            <ArrowRightCircleIcon className="w-5 h-5" />
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* Login Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold text-blue-900 mb-4">Login to Your Portal</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {/*<div>*/}
                            {/*    <label className="block text-sm font-medium text-gray-700">Admission Number</label>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"*/}
                            {/*        placeholder="e.g. 2024/SSS/001"*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors duration-200"
                            >
                                Login
                            </button>
                        </form>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 text-sm text-blue-700 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

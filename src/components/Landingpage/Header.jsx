import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { CircleUserRound, GraduationCap, Image, Info, Menu, Newspaper, Phone, Users, X } from 'lucide-react';

const navLinks = [
    { href: '/about', label: 'About Us', icon: Info },
    { href: '/admissions', label: 'Admissions', icon: Users },
    { href: '/academics', label: 'Academics', icon: GraduationCap },
    { href: '/news', label: 'News & Events', icon: Newspaper },
    { href: '/gallery', label: 'Gallery', icon: Image },
    { href: '/contact', label: 'Contact', icon: Phone },
];

const focusRing = 'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full bg-white shadow-md">
            {/* Same details as before, now still (moving text is hard to read) */}
            <div className="bg-[#F9D89C] text-[#1F3B6B] text-sm py-2 px-4">
                <p className="container mx-auto flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-center">
                    <span>10 Haliru Muhammed Street, Ofatedo, Osun State</span>
                    <span aria-hidden="true">•</span>
                    <span>Academic Year 2025/2026</span>
                    <span aria-hidden="true" className="hidden sm:inline">•</span>
                    <a href="mailto:info@molekschools.com" className="hidden sm:inline underline underline-offset-2">info@molekschools.com</a>
                </p>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-3 h-16 lg:h-20">
                    <Link to="/" className={`flex items-center gap-2 sm:gap-3 rounded-lg ${focusRing}`}>
                        <img src="/logo.webp" alt="" width="474" height="600" className="h-11 sm:h-14 w-auto object-contain" />
                        <span className="flex flex-col">
                            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1F3B6B]">MOLEK Schools</span>
                            <span className="text-xs text-gray-600 font-medium hidden sm:block">Excellence in Islamic Education</span>
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <NavLink key={href} to={href}
                                className={({ isActive }) => `flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full font-semibold text-[#1F3B6B] hover:bg-[#FAFAFA] ${focusRing} ${isActive ? 'bg-[#F9D89C]' : ''}`}>
                                <Icon aria-hidden="true" className="h-4 w-4 xl:h-5 xl:w-5" />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        {/* Always visible, phones included: the way into results */}
                        <Link to="/student/login"
                            className={`flex items-center gap-2 rounded-full bg-[#1F3B6B] px-4 py-2.5 min-h-11 font-semibold text-white hover:bg-[#2D2D2D] ${focusRing}`}>
                            <CircleUserRound aria-hidden="true" className="h-5 w-5" />
                            <span>Student Portal</span>
                        </Link>
                        <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"
                            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#1F3B6B] hover:bg-[#FAFAFA] ${focusRing}`}>
                            <Menu aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Phone menu: Headless UI Dialog (focus stays inside, Escape closes, page doesn't scroll behind) */}
            <Dialog open={menuOpen} onClose={setMenuOpen} className="relative z-50 lg:hidden">
                <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                <DialogPanel className="fixed inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white shadow-2xl">
                    <div className="flex items-center justify-between bg-[#1F3B6B] px-5 py-4">
                        <span className="flex items-center gap-3">
                            <img src="/logo.webp" alt="" width="474" height="600" className="h-10 w-auto object-contain bg-white rounded-md p-0.5" />
                            <DialogTitle className="text-lg font-bold text-white">Menu</DialogTitle>
                        </span>
                        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white">
                            <X aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <nav aria-label="Main" className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                        <NavLink to="/" end onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-[#1F3B6B] ${focusRing} ${isActive ? 'bg-[#F9D89C]' : 'hover:bg-[#FAFAFA]'}`}>
                            Home
                        </NavLink>
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <NavLink key={href} to={href} onClick={() => setMenuOpen(false)}
                                className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-[#1F3B6B] ${focusRing} ${isActive ? 'bg-[#F9D89C]' : 'hover:bg-[#FAFAFA]'}`}>
                                <Icon aria-hidden="true" className="h-5 w-5" />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                        <Link to="/student/login" onClick={() => setMenuOpen(false)}
                            className={`mt-4 flex items-center gap-3 rounded-xl bg-[#1F3B6B] px-4 py-3 font-semibold text-white ${focusRing}`}>
                            <CircleUserRound aria-hidden="true" className="h-5 w-5" />
                            <span>Student Portal</span>
                        </Link>
                    </nav>
                    <div className="border-t border-gray-200 bg-[#FAFAFA] px-6 py-4 text-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} MOLEK Schools</p>
                        <p className="mt-1">Excellence in Islamic Education</p>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;

import { useState, useEffect } from 'react';
import {
    AcademicCapIcon,
    UserGroupIcon,
    NewspaperIcon,
    PhotoIcon,
    PhoneIcon,
    InformationCircleIcon,
    Bars3Icon,
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

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    return (
        <>
            <header className="w-full fixed top-0 z-50 bg-white shadow-md">
                {/* Marquee Banner with Coral Red */}
                <div className="bg-[#E85D5D] text-white text-sm py-2 overflow-hidden">
                    <div className="animate-marquee">
                        📍 10 Haliru Muhammed Street, Ofatedo, Osogbo, Osun State | 📅 Academic Year 2025/2026 | 📧 info@molekschool.com
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="flex items-center justify-between px-6 py-4">
                    <a href={'/'}>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img src="/logo.webp" alt="Molek Schools Logo" className="h-full w-full object-cover" />
                            </div>
                            <span className="text-xl font-bold  text-[#3B82F6]">Molek Schools</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a 
                                key={href} 
                                href={href} 
                                className="flex items-center gap-1  text-[#3B82F6] hover:text-[#3B82F6] transition-colors duration-200 px-3 py-2 rounded-full hover:bg-blue-50"
                            >
                                <Icon className="h-5 w-5" />
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden  text-[#3B82F6]" onClick={() => setMenuOpen(!menuOpen)}>
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <nav className="md:hidden bg-white shadow-lg px-6 py-4 rounded-b-2xl">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a 
                                key={href} 
                                href={href} 
                                className="flex items-center gap-2 py-2  text-[#3B82F6] hover:text-[#3B82F6] hover:bg-blue-50 rounded-lg px-3 transition-colors"
                            >
                                <Icon className="h-5 w-5" />
                                {label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>
        </>
    );
};

export default Header;
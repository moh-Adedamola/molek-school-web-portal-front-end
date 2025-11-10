import { useState, useEffect, useCallback } from 'react';
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
    <header className="w-full fixed top-0 z-50 bg-white shadow-md">
      {/* Marquee Banner with Coral Red */}
      <div className="bg-[#E85D5D] text-white text-sm py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          📍 10 Haliru Muhammed Street, Ofatedo, Osogbo, Osun State | 📅 Academic Year 2025/2026 | 📧 info@molekschool.com
        </div>
      </div>

      {/* Main Navigation Bar - Left logo, Right nav, center spacer for balance on wide screens */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo + Brand */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src="/logo.webp" alt="Molek Schools Logo" className="h-full w-full object-cover" />
          </div>
          <span className="text-xl font-bold text-[#1c73fe]">Molek Schools</span>
        </a>

        {/* Center spacer to create space in the middle on wide displays (optional visual balance) */}
        <div className="flex-1" aria-hidden="true" />

        {/* Desktop Navigation (right-aligned) */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Main">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-1 text-[#2269da] hover:text-[#2677f9] transition-colors duration-200 px-3 py-2 rounded-full hover:bg-blue-50"
            >
              <Icon className="h-5 w-5" />
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden text-[#3B82F6] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setMenuOpen((s) => !s)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Drawer + Overlay */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer Panel (slides in from left) */}
          <aside
            className="fixed top-0 left-0 w-72 max-w-full h-full bg-white shadow-xl z-50 transform transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <span className="text-lg font-semibold">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Bars3Icon className="h-5 w-5 rotate-90" />
              </button>
            </div>
            <nav className="flex flex-col px-4 py-2 space-y-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 text-[#3B82F6] rounded-md hover:bg-blue-50 hover:text-[#1e40af] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
};

export default Header;
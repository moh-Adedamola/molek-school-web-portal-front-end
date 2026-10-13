import { Suspense } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Home, FileText, UserRound, LogOut } from 'lucide-react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { clearPortalCache, fullName } from '../../lib/portalData.js';
import { Avatar } from './ui.jsx';
import logo from '/logo.webp';

const NAV = [
    { to: '/student', label: 'Home', icon: Home, end: true },
    { to: '/student/results', label: 'Results', icon: FileText },
    { to: '/student/details', label: 'My details', icon: UserRound },
];

const PortalLayout = () => {
    const { student, logout } = useStudentAuth();
    const navigate = useNavigate();
    const signOut = () => {
        logout();
        clearPortalCache();
        navigate('/student/login', { replace: true });
    };
    const name = fullName(student);

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#2D2D2D] text-[17px] leading-relaxed">
            <a href="#portal-main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-[#1F3B6B]">
                Skip to content
            </a>

            {/* Desktop sidebar */}
            <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-[#1F3B6B] text-white">
                <div className="flex items-center gap-3 px-5 py-5 border-b border-white/15">
                    <img src={logo} alt="MOLEK Schools" className="h-12 w-auto object-contain bg-white rounded-md p-1" />
                    <div>
                        <p className="font-bold leading-tight">MOLEK Schools</p>
                        <p className="text-sm text-white/80">Student portal</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-4">
                    <Avatar src={student?.passport_url} name={name} size={44} />
                    <div className="min-w-0">
                        <p className="font-semibold truncate">{name}</p>
                        <p className="text-sm text-white/80">{student?.admission_number}</p>
                    </div>
                </div>
                <nav aria-label="Portal" className="flex-1 px-3 space-y-1">
                    {NAV.map(({ to, label, icon: Icon, end }) => (
                        <NavLink key={to} to={to} end={end}
                            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 font-semibold focus-visible:outline focus-visible:outline-3 focus-visible:outline-white ${isActive ? 'bg-[#F9D89C] text-[#1F3B6B]' : 'text-white hover:bg-white/10'}`}>
                            <Icon aria-hidden="true" className="h-5 w-5" /> {label}
                        </NavLink>
                    ))}
                </nav>
                <button type="button" onClick={signOut}
                    className="m-3 flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-3 focus-visible:outline-white">
                    <LogOut aria-hidden="true" className="h-5 w-5" /> Sign out
                </button>
            </aside>

            {/* Phone top bar */}
            <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 bg-[#1F3B6B] px-4 py-3 text-white">
                <img src={logo} alt="MOLEK Schools" className="h-10 w-auto object-contain bg-white rounded-md p-0.5" />
                <p className="font-bold flex-1 truncate">{name}</p>
                <Avatar src={student?.passport_url} name={name} size={36} />
            </header>

            <main id="portal-main" className="md:ml-64 px-4 sm:px-8 py-6 sm:py-8 pb-28 md:pb-10 max-w-6xl">
                {/* Menu stays put while a page's code loads */}
                <Suspense fallback={<p role="status" className="py-16 text-center">Loading…</p>}>
                    <Outlet />
                </Suspense>
            </main>

            {/* Phone bottom tab bar */}
            <nav aria-label="Portal" className="md:hidden fixed bottom-0 inset-x-0 z-30 grid grid-cols-3 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
                {NAV.map(({ to, label, icon: Icon, end }) => (
                    <NavLink key={to} to={to} end={end}
                        className={({ isActive }) => `flex flex-col items-center gap-1 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B] ${isActive ? 'text-[#1F3B6B] bg-[#F9D89C]/60' : 'text-gray-600'}`}>
                        <Icon aria-hidden="true" className="h-6 w-6" /> {label}
                    </NavLink>
                ))}
            </nav>

            <ToastContainer position="bottom-center" autoClose={7000} newestOnTop={false} closeOnClick={false}
                pauseOnFocusLoss pauseOnHover theme="light" toastClassName="!text-[16px]" style={{ marginBottom: '4.5rem' }} />
        </div>
    );
};

export default PortalLayout;

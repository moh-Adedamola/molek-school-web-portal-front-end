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
import { useNavigate } from 'react-router-dom';
import { loginByAdmission } from '../../service/auth';

const navLinks = [
    { href: '/about', label: 'About Us', icon: InformationCircleIcon },
    { href: '/admissions', label: 'Admissions', icon: UserGroupIcon },
    { href: '/academics', label: 'Academics', icon: AcademicCapIcon },
    { href: '#news', label: 'News & Events', icon: NewspaperIcon },
    { href: '#gallery', label: 'Gallery', icon: PhotoIcon },
    { href: '/contact', label: 'Contact', icon: PhoneIcon },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [admissionNumber, setAdmissionNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = menuOpen || showModal ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen, showModal]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            console.log('Attempting login with:', { admissionNumber, password });
            const result = await loginByAdmission(admissionNumber, password);
            console.log('Login response:', result);
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('access_token', result.access);
            navigate('/dashboard');
            setShowModal(false);
            setAdmissionNumber('');
            setPassword('');
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            setShowModal(false);
        }
    };

    return (
        <>
            <header className="w-full fixed top-0 z-50 bg-white shadow-md">
                <div className="bg-red-700 text-white text-sm py-2 overflow-hidden">
                    <div className="animate-marquee">
                        10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State | Academic Year 2025/2026 | info@molekschools.com
                    </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                    <a href={'/'}>
                        <div className="flex items-center gap-2">
                            <img src="/logo.webp" alt="Molek Schools Logo" className="h-10 w-auto" />
                            <span className="text-xl font-bold text-blue-700">Molek Schools</span>
                        </div>
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a key={href} href={href} className="flex items-center gap-1 text-blue-700 hover:text-blue-300 transition-colors duration-200">
                                <Icon className="h-5 w-5" />
                                {label}
                            </a>
                        ))}
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-1 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            <ArrowRightCircleIcon className="h-5 w-5" />
                            Login
                        </button>
                    </nav>
                    <button className="md:hidden text-blue-700" onClick={() => setMenuOpen(!menuOpen)}>
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                </div>
                {menuOpen && (
                    <nav className="md:hidden bg-white shadow-md px-6 py-4">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <a key={href} href={href} className="flex items-center gap-2 py-2 text-blue-700 hover:text-blue-300">
                                <Icon className="h-5 w-5" />
                                {label}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                setMenuOpen(false);
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 py-2 text-blue-700 hover:text-blue-300"
                        >
                            <ArrowRightCircleIcon className="h-5 w-5" />
                            Login
                        </button>
                    </nav>
                )}
            </header>
            {showModal && (
                <div id="modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleBackdropClick}>
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 transition-colors"
                            aria-label="Close modal"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">Login to Your Portal</h2>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Admission Number</label>
                                <input
                                    type="text"
                                    value={admissionNumber}
                                    onChange={(e) => setAdmissionNumber(e.target.value.toUpperCase())}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 2025/SS1/001"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Format: YYYY/CLASS-SN/GEN-SN</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value.toLowerCase())}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-700 hover:bg-blue-500 text-white py-3 rounded-md focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Signing in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>Need help? Contact: <strong>info@molekschools.edu.ng</strong></p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
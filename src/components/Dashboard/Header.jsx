// import { useState, useEffect } from 'react';
// import {
//     AcademicCapIcon,
//     UserGroupIcon,
//     NewspaperIcon,
//     PhotoIcon,
//     PhoneIcon,
//     InformationCircleIcon,
//     ArrowRightCircleIcon,
//     Bars3Icon,
//     XMarkIcon,
// } from '@heroicons/react/24/outline';
// import { useNavigate } from 'react-router-dom';
// import { loginByAdmission } from '../../service/auth';
//
// const navLinks = [
//     { href: '/about', label: 'About Us', icon: InformationCircleIcon },
//     { href: '/admissions', label: 'Admissions', icon: UserGroupIcon },
//     { href: '/academics', label: 'Academics', icon: AcademicCapIcon },
//     { href: '#news', label: 'News & Events', icon: NewspaperIcon },
//     { href: '#gallery', label: 'Gallery', icon: PhotoIcon },
//     { href: '/contact', label: 'Contact', icon: PhoneIcon },
// ];
//
// const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [admissionNumber, setAdmissionNumber] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         document.body.style.overflow = menuOpen || showModal ? 'hidden' : 'auto';
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [menuOpen, showModal]);
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);
//
//         try {
//             const result = await loginByAdmission(admissionNumber, password);
//             localStorage.setItem('user', JSON.stringify(result.user));
//             localStorage.setItem('access_token', result.access);
//             navigate('/dashboard');
//             setShowModal(false);
//             setAdmissionNumber('');
//             setPassword('');
//         } catch (err) {
//             setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // ✅ Close modal when clicking outside (backdrop)
//     const handleBackdropClick = (e) => {
//         if (e.target.id === 'modal-backdrop') {
//             setShowModal(false);
//         }
//     };
//
//     return (
//         <>
//             <header className="w-full fixed top-0 z-50 bg-white shadow-md">
//                 {/* Top Info Bar */}
//                 <div className="bg-green-900 text-white text-sm py-2 overflow-hidden">
//                     <div className="animate-marquee">
//                         10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State | Academic Year 2024/2025 | info@molekschools.edu.ng
//                     </div>
//                 </div>
//
//                 {/* Main Header */}
//                 <div className="flex items-center justify-between px-6 py-4">
//                     {/* Logo + School Name */}
//                     <div className="flex items-center gap-2">
//                         <img
//                             src="/logo.webp"
//                             alt="Molek Schools Logo"
//                             className="h-10 w-auto"
//                         />
//                         <span className="text-xl font-bold text-blue-900">
//               Molek Schools
//             </span>
//                     </div>
//
//                     {/* Desktop Nav */}
//                     <nav className="hidden md:flex items-center space-x-6">
//                         {navLinks.map(({ href, label, icon: Icon }) => (
//                             <a
//                                 key={href}
//                                 href={href}
//                                 className="flex items-center gap-1 text-blue-900 hover:text-blue-700 transition-colors duration-200"
//                             >
//                                 <Icon className="w-5 h-5" />
//                                 {label}
//                             </a>
//                         ))}
//                         <button
//                             className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-200"
//                             onClick={() => setShowModal(true)}
//                         >
//                             <ArrowRightCircleIcon className="w-5 h-5" />
//                             Get Started
//                         </button>
//                     </nav>
//
//                     {/* Hamburger Toggle */}
//                     <button
//                         onClick={() => setMenuOpen(!menuOpen)}
//                         className="md:hidden text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded"
//                         aria-label={menuOpen ? 'Close menu' : 'Open menu'}
//                         aria-expanded={menuOpen}
//                     >
//                         {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
//                     </button>
//                 </div>
//
//                 {/* Backdrop Overlay */}
//                 {menuOpen && (
//                     <div
//                         className="fixed inset-0 z-40 backdrop-blur-sm bg-black/10 transition-opacity duration-300"
//                         onClick={() => setMenuOpen(false)}
//                     />
//                 )}
//
//                 {/* Sidebar Menu */}
//                 <div
//                     className={`fixed top-0 left-0 h-full w-1/2 bg-white z-50 transform ${
//                         menuOpen ? 'translate-x-0' : '-translate-x-full'
//                     } transition-transform duration-300 ease-in-out shadow-lg`}
//                 >
//                     <div className="p-6 space-y-4">
//                         {navLinks.map(({ href, label, icon: Icon }) => (
//                             <a
//                                 key={href}
//                                 href={href}
//                                 onClick={() => setMenuOpen(false)}
//                                 className="flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors duration-200"
//                             >
//                                 <Icon className="w-5 h-5" />
//                                 {label}
//                             </a>
//                         ))}
//                         <button
//                             className="flex items-center gap-2 w-full bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-200"
//                             onClick={() => {
//                                 setMenuOpen(false);
//                                 setShowModal(true);
//                             }}
//                         >
//                             <ArrowRightCircleIcon className="w-5 h-5" />
//                             Get Started
//                         </button>
//                     </div>
//                 </div>
//             </header>
//
//             {/* ✅ LOGIN MODAL — WITH CLOSE ICON + BACKDROP CLICK */}
//             {showModal && (
//                 <div
//                     id="modal-backdrop" // ✅ This is key for backdrop click
//                     onClick={handleBackdropClick} // ✅ Handles click outside
//                     className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//                 >
//                     {/* Modal Content — with close button */}
//                     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
//                         {/* ✅ CLOSE BUTTON — Top right */}
//                         <button
//                             onClick={() => setShowModal(false)} // ✅ Click to close
//                             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1 transition-colors"
//                             aria-label="Close modal"
//                         >
//                             <XMarkIcon className="h-6 w-6" />
//                         </button>
//
//                         <h2 className="text-xl font-bold text-blue-900 mb-4">Login to Your Portal</h2>
//
//                         {error && (
//                             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4 text-sm">
//                                 {error}
//                             </div>
//                         )}
//
//                         <form onSubmit={handleLogin} className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Admission Number</label>
//                                 <input
//                                     type="text"
//                                     value={admissionNumber}
//                                     onChange={(e) => setAdmissionNumber(e.target.value.toUpperCase())}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="e.g., 2025/SS1/001"
//                                     required
//                                 />
//                                 <p className="text-xs text-gray-500 mt-1">Format: YYYY/CLASS-SN/GEN-SN</p>
//                             </div>
//
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                                 <input
//                                     type="password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="••••••"
//                                     required
//                                 />
//                             </div>
//
//                             <div>
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full disabled:opacity-50"
//                                 >
//                                     {loading ? 'Signing in...' : 'Login'}
//                                 </button>
//                             </div>
//                         </form>
//
//                         <div className="mt-6 text-center text-sm text-gray-500">
//                             <p>Need help? Contact: <strong>info@molekschools.edu.ng</strong></p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
//
// export default Header;
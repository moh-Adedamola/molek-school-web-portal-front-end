import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Calendar, MapPin } from 'lucide-react';
import { useStudentAuth } from '../context/StudentAuthContext';
import { getUpcomingEvents } from '../service/studentApi';

const StudentLogin = () => {
    const navigate = useNavigate();
    const { login } = useStudentAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        admission_number: '',
        password: '',
    });

    useEffect(() => {
        getUpcomingEvents()
            .then((data) => setEvents(data.results || []))
            .catch(() => setEvents([]));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.admission_number || !formData.password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        try {
            await login(formData.admission_number, formData.password);
            navigate('/student/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid admission number or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 py-8">
            <div className="w-full max-w-md flex flex-col items-center gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white text-center">
                    <Link to="/" className="inline-block mb-4">
                        <img
                            src="/logo.webp"
                            alt="Molek Schools"
                            className="h-20 w-20 mx-auto rounded-full ring-4 ring-white/30 object-cover"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold mb-2">MOLEK Schools</h1>
                    <p className="text-blue-100 text-sm">Student Portal Login</p>
                </div>

                {/* Login Form */}
                <div className="p-8">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start gap-2"
                        >
                            <svg className="h-5 w-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Admission Number
                            </label>
                            <input
                                type="text"
                                value={formData.admission_number}
                                onChange={(e) => setFormData({ ...formData, admission_number: e.target.value.toUpperCase() })}
                                placeholder="Enter your admission number"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <span>Sign In to Portal</span>
                            )}
                        </button>
                    </form>

                    {/* Help Links */}
                    <div className="mt-6 text-center space-y-2">
                        <p className="text-sm text-gray-600">
                            Forgot your password? Contact the school office.
                        </p>
                        <Link
                            to="/"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 group"
                        >
                            <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Back to Homepage</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        © 2025 MOLEK Schools • Excellence in Islamic Education
                    </p>
                </div>
            </motion.div>

            {events.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <Calendar size={18} /> Upcoming Events
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {events.slice(0, 4).map((event) => {
                            const dt = new Date(event.event_date);
                            return (
                                <div key={event.id} className="p-4 flex gap-3 hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0 w-14 text-center">
                                        <div className="text-xs text-purple-600 font-semibold uppercase">
                                            {dt.toLocaleString('en-NG', { month: 'short' })}
                                        </div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {dt.getDate()}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{event.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {dt.toLocaleString('en-NG', { weekday: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        {event.location && (
                                            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                <MapPin size={11} /> {event.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
            </div>
        </div>
    );
};

export default StudentLogin;
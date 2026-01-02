import { motion } from 'framer-motion';
import logo from '/logo.webp';
import { useState, useEffect } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getStudentGrades, getAcademicSessions, getTerms } from '../../service/studentApi';

const Grade = () => {
    const { student } = useStudentAuth();
    const [activeTab, setActiveTab] = useState('current');
    const [loading, setLoading] = useState(true);
    const [grades, setGrades] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedSession && selectedTerm) {
            fetchGrades();
        }
    }, [selectedSession, selectedTerm]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [sessionsData, termsData] = await Promise.all([
                getAcademicSessions(),
                getTerms(),
            ]);

            // ✅ FIXED: Extract arrays from response objects
            setSessions(sessionsData.sessions || sessionsData.results || []);
            setTerms(termsData.terms || termsData.results || []);

            // Auto-select active session and term
            const activeSessions = sessionsData.sessions || sessionsData.results || [];
            const activeTerms = termsData.terms || termsData.results || [];

            // ✅ FIXED: Check for is_current instead of is_active
            const activeSession = activeSessions.find(s => s.is_current) || activeSessions[0];
            const activeTerm = activeTerms.find(t => t.is_current) || activeTerms[0];

            setSelectedSession(activeSession);
            setSelectedTerm(activeTerm);
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }
    };

    const fetchGrades = async () => {
        try {
            setLoading(true);
            const gradesData = await getStudentGrades();

            // ✅ FIXED: Extract grades array from response
            const allGrades = gradesData.grades || gradesData.results || [];

            // Filter grades by selected session and term
            const filtered = allGrades.filter(
                grade =>
                    grade.session?.id === selectedSession?.id &&
                    grade.term?.id === selectedTerm?.id
            );

            setGrades(filtered);
        } catch (error) {
            console.error('Failed to fetch grades:', error);
            setGrades([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper: Get grade color
    const getGradeColor = (totalScore) => {
        if (totalScore >= 70) return 'bg-green-500';
        if (totalScore >= 60) return 'bg-blue-500';
        if (totalScore >= 50) return 'bg-yellow-500';
        if (totalScore >= 45) return 'bg-orange-500';
        return 'bg-red-500';
    };

    // Helper: Get grade letter
    const getGradeLetter = (totalScore) => {
        if (totalScore >= 70) return 'A';
        if (totalScore >= 60) return 'B';
        if (totalScore >= 50) return 'C';
        if (totalScore >= 45) return 'D';
        if (totalScore >= 40) return 'E';
        return 'F';
    };

    // Calculate overall average
    const calculateAverage = () => {
        if (grades.length === 0) return 0;
        const sum = grades.reduce((acc, g) => acc + (g.total_score || 0), 0);
        return Math.round(sum / grades.length);
    };

    // Group grades by term for all-round view
    const groupGradesByTerm = () => {
        const grouped = {};

        sessions.forEach(session => {
            terms.forEach(term => {
                const key = `${session.name}-${term.name}`;
                grouped[key] = {
                    session: session.name,
                    term: term.name,
                    grades: grades.filter(
                        g => g.session?.name === session.name && g.term?.name === term.name
                    ),
                };
            });
        });

        return Object.values(grouped).filter(g => g.grades.length > 0);
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-4 md:p-6 bg-gray-50 min-h-screen"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <img
                    src={student?.passport_url || logo}
                    alt={student?.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => e.target.src = logo}
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Academic Grades</h1>
                    <p className="text-sm text-gray-600">View your academic performance</p>
                </div>
            </div>

            {/* Session & Term Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Academic Session</label>
                        <select
                            value={selectedSession?.id || ''}
                            onChange={(e) => {
                                const session = sessions.find(s => s.id === parseInt(e.target.value));
                                setSelectedSession(session);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            {sessions.map(session => (
                                <option key={session.id} value={session.id}>
                                    {session.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
                        <select
                            value={selectedTerm?.id || ''}
                            onChange={(e) => {
                                const term = terms.find(t => t.id === parseInt(e.target.value));
                                setSelectedTerm(term);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            {terms.map(term => (
                                <option key={term.id} value={term.id}>
                                    {term.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('current')}
                        className={`flex-1 py-3 px-6 font-medium transition-colors ${
                            activeTab === 'current'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        Current Results
                    </button>
                    <button
                        onClick={() => setActiveTab('all-round')}
                        className={`flex-1 py-3 px-6 font-medium transition-colors ${
                            activeTab === 'all-round'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-blue-600'
                        }`}
                    >
                        All Results
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {/* Current Results Tab */}
                    {activeTab === 'current' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {selectedSession?.name} - {selectedTerm?.name}
                            </h2>

                            {grades.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center">
                                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No grades available for this term</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {grades.map((result, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="font-medium text-gray-800">{result.subject?.name}</h3>
                                                    <span className={`${
                                                        result.total_score >= 70 ? 'bg-green-100 text-green-800' :
                                                            result.total_score >= 60 ? 'bg-blue-100 text-blue-800' :
                                                                result.total_score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                    } text-xs px-2 py-1 rounded-full font-medium`}>
                                                        {result.grade}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">CA Score:</span>
                                                        <span className="font-medium">{result.ca_score || 0}/40</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Exam Score:</span>
                                                        <span className="font-medium">{result.exam_score || 0}/60</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm font-semibold border-t pt-2">
                                                        <span className="text-gray-800">Total:</span>
                                                        <span className="text-blue-600">{result.total_score}/100</span>
                                                    </div>
                                                </div>

                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${getGradeColor(result.total_score)} transition-all duration-700 ease-out`}
                                                        style={{ width: `${result.total_score}%` }}
                                                    ></div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Overall Average */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Overall Average</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl font-bold text-blue-600">
                                                {calculateAverage()}/100
                                            </div>
                                            <div className="flex-1">
                                                <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 transition-all duration-700 ease-out"
                                                        style={{ width: `${calculateAverage()}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">Grade: {getGradeLetter(calculateAverage())}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* All Results Tab */}
                    {activeTab === 'all-round' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800">Performance History</h2>

                            {grades.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center">
                                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No historical data available</p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                                                <th className="text-center py-3 px-4 font-semibold text-gray-700">CA</th>
                                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Exam</th>
                                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
                                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {grades.map((grade, idx) => (
                                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium text-gray-800">{grade.subject?.name}</td>
                                                    <td className="py-3 px-4 text-center">{grade.ca_score || 0}</td>
                                                    <td className="py-3 px-4 text-center">{grade.exam_score || 0}</td>
                                                    <td className="py-3 px-4 text-center font-semibold text-blue-600">{grade.total_score}</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className={`${
                                                            grade.total_score >= 70 ? 'bg-green-100 text-green-800' :
                                                                grade.total_score >= 60 ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-red-100 text-red-800'
                                                        } px-3 py-1 rounded-full text-sm font-medium`}>
                                                            {grade.grade}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </motion.main>
    );
};

export default Grade;
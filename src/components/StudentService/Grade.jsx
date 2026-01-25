/**
 * Student Grades Component
 * Displays academic grades with current term view and all-round history
 */

import { motion } from 'framer-motion';
import logo from '/logo.webp';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getStudentGrades, getAcademicSessions, getTerms } from '../../service/studentApi';

const Grade = () => {
    const { student } = useStudentAuth();
    const [activeTab, setActiveTab] = useState('current');
    const [loading, setLoading] = useState(true);
    const [allGrades, setAllGrades] = useState([]); // Store ALL grades
    const [sessions, setSessions] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);

    // Fetch initial data on mount
    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [sessionsData, termsData, gradesData] = await Promise.all([
                getAcademicSessions(),
                getTerms(),
                getStudentGrades(),
            ]);

            // Extract arrays from response objects
            const sessionsArray = sessionsData.sessions || sessionsData.results || [];
            const termsArray = termsData.terms || termsData.results || [];
            const gradesArray = gradesData.grades || gradesData.results || [];

            setSessions(sessionsArray);
            setTerms(termsArray);
            setAllGrades(gradesArray);

            // Auto-select current session and term
            const activeSession = sessionsArray.find(s => s.is_current) || sessionsArray[0];
            const activeTerm = termsArray.find(t => t.is_current) || termsArray[0];

            setSelectedSession(activeSession);
            setSelectedTerm(activeTerm);
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter grades for current term view
    const currentTermGrades = useMemo(() => {
        if (!selectedSession || !selectedTerm) return [];
        return allGrades.filter(
            grade => grade.session === selectedSession.id && grade.term === selectedTerm.id
        );
    }, [allGrades, selectedSession, selectedTerm]);

    // Group grades by session/term for all-round view
    const groupedGrades = useMemo(() => {
        const grouped = {};

        allGrades.forEach(grade => {
            const key = `${grade.session_name}-${grade.term_name}`;
            if (!grouped[key]) {
                grouped[key] = {
                    sessionName: grade.session_name,
                    termName: grade.term_name,
                    sessionId: grade.session,
                    termId: grade.term,
                    grades: [],
                };
            }
            grouped[key].grades.push(grade);
        });

        // Sort by session and term
        return Object.values(grouped).sort((a, b) => {
            if (a.sessionName !== b.sessionName) {
                return b.sessionName.localeCompare(a.sessionName);
            }
            const termOrder = { 'First Term': 1, 'Second Term': 2, 'Third Term': 3 };
            return (termOrder[a.termName] || 0) - (termOrder[b.termName] || 0);
        });
    }, [allGrades]);

    // Get terms for selected session
    const filteredTerms = useMemo(() => {
        if (!selectedSession) return terms;
        return terms.filter(t => t.session === selectedSession.id);
    }, [terms, selectedSession]);

    // Handle session change
    const handleSessionChange = useCallback((sessionId) => {
        const session = sessions.find(s => s.id === parseInt(sessionId));
        setSelectedSession(session);

        // Auto-select first term of this session
        const sessionTerms = terms.filter(t => t.session === session?.id);
        setSelectedTerm(sessionTerms[0] || null);
    }, [sessions, terms]);

    // Handle term change
    const handleTermChange = useCallback((termId) => {
        const term = terms.find(t => t.id === parseInt(termId));
        setSelectedTerm(term);
    }, [terms]);

    // Calculate overall average
    const calculateAverage = useCallback((gradesArray) => {
        if (!gradesArray || gradesArray.length === 0) return 0;
        const sum = gradesArray.reduce((acc, g) => acc + (g.total_score || 0), 0);
        return Math.round(sum / gradesArray.length);
    }, []);

    // Get grade color
    const getGradeColor = (score) => {
        if (score >= 70) return 'bg-green-500';
        if (score >= 60) return 'bg-blue-500';
        if (score >= 50) return 'bg-yellow-500';
        if (score >= 40) return 'bg-orange-500';
        return 'bg-red-500';
    };

    // Get grade badge color
    const getGradeBadgeClass = (score) => {
        if (score >= 70) return 'bg-green-100 text-green-800';
        if (score >= 60) return 'bg-blue-100 text-blue-800';
        if (score >= 50) return 'bg-yellow-100 text-yellow-800';
        if (score >= 40) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    // Get grade letter
    const getGradeLetter = (score) => {
        if (score >= 70) return 'A';
        if (score >= 60) return 'B';
        if (score >= 50) return 'C';
        if (score >= 40) return 'D';
        return 'F';
    };

    // Student passport URL - using correct field name
    const passportUrl = student?.passport || student?.passport_url || null;

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
                    src={passportUrl || logo}
                    alt={student?.full_name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => { e.target.src = logo; }}
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Academic Grades</h1>
                    <p className="text-sm text-gray-600">View your academic performance</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-6 inline-flex">
                <button
                    onClick={() => setActiveTab('current')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        activeTab === 'current'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    Current Term
                </button>
                <button
                    onClick={() => setActiveTab('all-round')}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        activeTab === 'all-round'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    All Results
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading grades...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Current Term View */}
                    {activeTab === 'current' && (
                        <div className="space-y-6">
                            {/* Session/Term Selectors */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Academic Session
                                        </label>
                                        <select
                                            value={selectedSession?.id || ''}
                                            onChange={(e) => handleSessionChange(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {sessions.map(session => (
                                                <option key={session.id} value={session.id}>
                                                    {session.name} {session.is_current && '(Current)'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Term
                                        </label>
                                        <select
                                            value={selectedTerm?.id || ''}
                                            onChange={(e) => handleTermChange(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {filteredTerms.map(term => (
                                                <option key={term.id} value={term.id}>
                                                    {term.name} {term.is_current && '(Current)'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-gray-800">
                                {selectedSession?.name} - {selectedTerm?.name}
                            </h2>

                            {currentTermGrades.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center">
                                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No grades available for this term</p>
                                    <p className="text-gray-400 text-sm mt-2">Results will appear here after exams are graded</p>
                                </div>
                            ) : (
                                <>
                                    {/* Grade Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {currentTermGrades.map((result, idx) => (
                                            <motion.div
                                                key={result.id || idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="font-medium text-gray-800">{result.subject_name}</h3>
                                                    <span className={`${getGradeBadgeClass(result.total_score)} text-xs px-2 py-1 rounded-full font-medium`}>
                                                        {result.grade}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">CA Score:</span>
                                                        <span className="font-medium">{result.ca_score || 0}/30</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Exam Score:</span>
                                                        <span className="font-medium">{result.exam_score || 0}/70</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm font-semibold border-t pt-2">
                                                        <span className="text-gray-800">Total:</span>
                                                        <span className="text-blue-600">{result.total_score}/100</span>
                                                    </div>
                                                </div>

                                                {/* Additional stats if available */}
                                                {result.position && (
                                                    <div className="text-xs text-gray-500 border-t pt-2 mt-2">
                                                        Position: {result.position}/{result.total_students} • Class Avg: {result.class_average}
                                                    </div>
                                                )}

                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                                                    <div
                                                        className={`h-full ${getGradeColor(result.total_score)} transition-all duration-700 ease-out`}
                                                        style={{ width: `${Math.min(result.total_score, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Overall Average */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Term Summary</h3>
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="text-center md:text-left">
                                                <div className="text-4xl font-bold text-blue-600">
                                                    {calculateAverage(currentTermGrades)}/100
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Average Score • Grade: {getGradeLetter(calculateAverage(currentTermGrades))}
                                                </p>
                                            </div>
                                            <div className="flex-1 w-full">
                                                <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 transition-all duration-700 ease-out"
                                                        style={{ width: `${calculateAverage(currentTermGrades)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                    <span>{currentTermGrades.length} subjects</span>
                                                    <span>{currentTermGrades.filter(g => g.total_score >= 40).length} passed</span>
                                                </div>
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

                            {allGrades.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center">
                                    <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500 text-lg">No historical data available</p>
                                    <p className="text-gray-400 text-sm mt-2">Your results will appear here after each term</p>
                                </div>
                            ) : (
                                <>
                                    {/* Grouped by Session/Term */}
                                    {groupedGrades.map((group, groupIdx) => (
                                        <div key={groupIdx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                            {/* Group Header */}
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-800">
                                                        {group.sessionName} - {group.termName}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-gray-600">
                                                            {group.grades.length} subjects
                                                        </span>
                                                        <span className={`px-3 py-1 rounded-full font-medium ${getGradeBadgeClass(calculateAverage(group.grades))}`}>
                                                            Avg: {calculateAverage(group.grades)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Results Table */}
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                    <tr className="border-b border-gray-200 bg-gray-50">
                                                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700">CA</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Exam</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Total</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                                                        <th className="text-center py-3 px-4 font-semibold text-gray-700 hidden md:table-cell">Position</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {group.grades.map((grade, idx) => (
                                                        <tr key={grade.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                            <td className="py-3 px-4 font-medium text-gray-800">{grade.subject_name}</td>
                                                            <td className="py-3 px-4 text-center">{grade.ca_score || 0}</td>
                                                            <td className="py-3 px-4 text-center">{grade.exam_score || 0}</td>
                                                            <td className="py-3 px-4 text-center font-semibold text-blue-600">{grade.total_score}</td>
                                                            <td className="py-3 px-4 text-center">
                                                                    <span className={`${getGradeBadgeClass(grade.total_score)} px-3 py-1 rounded-full text-sm font-medium`}>
                                                                        {grade.grade}
                                                                    </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-center text-gray-600 hidden md:table-cell">
                                                                {grade.position ? `${grade.position}/${grade.total_students}` : '-'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Overall Statistics */}
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Statistics</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="bg-white rounded-xl p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-600">{allGrades.length}</div>
                                                <p className="text-sm text-gray-600">Total Results</p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 text-center">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {calculateAverage(allGrades)}%
                                                </div>
                                                <p className="text-sm text-gray-600">Overall Average</p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 text-center">
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {allGrades.filter(g => g.total_score >= 40).length}
                                                </div>
                                                <p className="text-sm text-gray-600">Subjects Passed</p>
                                            </div>
                                            <div className="bg-white rounded-xl p-4 text-center">
                                                <div className="text-2xl font-bold text-orange-600">
                                                    {groupedGrades.length}
                                                </div>
                                                <p className="text-sm text-gray-600">Terms Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
        </motion.main>
    );
};

export default Grade;
/**
 * Student Grades Component
 * Displays academic grades with Nigerian School Grading Format
 * 
 * Score Structure:
 * - CA1: Flexible marks
 * - CA2: Flexible marks
 * - OBJ/CBT: RAW score (no max limit)
 * - Theory: Flexible marks
 * - Total: Sum of all components
 * 
 * Grading Scale:
 * - A: 75-100 (Excellent)
 * - B: 70-74 (Very Good)
 * - C: 60-69 (Good)
 * - D: 50-59 (Pass)
 * - E: 45-49 (Fair)
 * - F: 0-44 (Fail)
 */

import { motion } from 'framer-motion';
import logo from '/logo.webp';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getStudentGrades, getAcademicSessions, getTerms } from '../../service/studentApi';

const Grade = () => {
    const { student } = useStudentAuth();
    const [activeTab, setActiveTab] = useState('current');
    const [loading, setLoading] = useState(true);
    const [allGrades, setAllGrades] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const printRef = useRef();

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

            const sessionsArray = sessionsData.sessions || sessionsData.results || [];
            const termsArray = termsData.terms || termsData.results || [];
            const gradesArray = gradesData.grades || gradesData.results || [];

            setSessions(sessionsArray);
            setTerms(termsArray);
            setAllGrades(gradesArray);

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

    const handleSessionChange = useCallback((sessionId) => {
        const session = sessions.find(s => s.id === parseInt(sessionId));
        setSelectedSession(session);
        const sessionTerms = terms.filter(t => t.session === session?.id);
        setSelectedTerm(sessionTerms[0] || null);
    }, [sessions, terms]);

    const handleTermChange = useCallback((termId) => {
        const term = terms.find(t => t.id === parseInt(termId));
        setSelectedTerm(term);
    }, [terms]);

    // Calculate overall average
    const calculateAverage = useCallback((gradesArray) => {
        if (!gradesArray || gradesArray.length === 0) return 0;
        const validGrades = gradesArray.filter(g => {
            const score = parseFloat(g.total_score);
            return !isNaN(score);
        });
        if (validGrades.length === 0) return 0;
        const sum = validGrades.reduce((acc, g) => acc + parseFloat(g.total_score), 0);
        return Math.round(sum / validGrades.length);
    }, []);

    // Nigerian grading scale colors
    const getGradeColor = (score) => {
        const numScore = parseFloat(score) || 0;
        if (numScore >= 75) return 'bg-green-500';
        if (numScore >= 70) return 'bg-blue-500';
        if (numScore >= 60) return 'bg-cyan-500';
        if (numScore >= 50) return 'bg-yellow-500';
        if (numScore >= 45) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getGradeBadgeClass = (score) => {
        const numScore = parseFloat(score) || 0;
        if (numScore >= 75) return 'bg-green-100 text-green-800';
        if (numScore >= 70) return 'bg-blue-100 text-blue-800';
        if (numScore >= 60) return 'bg-cyan-100 text-cyan-800';
        if (numScore >= 50) return 'bg-yellow-100 text-yellow-800';
        if (numScore >= 45) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    const getGradeLetter = (score) => {
        const numScore = parseFloat(score) || 0;
        if (numScore >= 75) return 'A';
        if (numScore >= 70) return 'B';
        if (numScore >= 60) return 'C';
        if (numScore >= 50) return 'D';
        if (numScore >= 45) return 'E';
        return 'F';
    };

    const passportUrl = student?.passport || student?.passport_url || null;

    // Print report card
    const handlePrint = () => {
        window.print();
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen max-w-full overflow-x-hidden"
        >
            {/* Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <img
                    src={passportUrl || logo}
                    alt={student?.full_name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    onError={(e) => { e.target.src = logo; }}
                />
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">Academic Grades</h1>
                    <p className="text-xs sm:text-sm text-gray-600">Nigerian Grading System</p>
                </div>
            </div>

            {/* Grading Scale Info - Mobile Optimized */}
            <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">📊 Score Structure</h3>
                <div className="grid grid-cols-4 gap-1 sm:gap-2 text-xs">
                    <div className="bg-white/50 p-1.5 sm:p-2 rounded text-center">
                        <span className="font-bold block">CA1</span>
                        <span className="text-gray-600">15</span>
                    </div>
                    <div className="bg-white/50 p-1.5 sm:p-2 rounded text-center">
                        <span className="font-bold block">CA2</span>
                        <span className="text-gray-600">15</span>
                    </div>
                    <div className="bg-white/50 p-1.5 sm:p-2 rounded text-center">
                        <span className="font-bold block">OBJ</span>
                        <span className="text-gray-600">30</span>
                    </div>
                    <div className="bg-white/50 p-1.5 sm:p-2 rounded text-center">
                        <span className="font-bold block">Theory</span>
                        <span className="text-gray-600">40</span>
                    </div>
                </div>
                <p className="text-xs text-blue-600 mt-2 text-center">
                    A(75+) • B(70-74) • C(60-69) • D(50-59) • E(45-49) • F(&lt;45)
                </p>
            </div>

            {/* Tabs - Mobile Optimized */}
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <button
                    onClick={() => setActiveTab('current')}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                        activeTab === 'current'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    Current Term
                </button>
                <button
                    onClick={() => setActiveTab('all-round')}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                        activeTab === 'all-round'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    All Results
                </button>
                <button
                    onClick={() => setActiveTab('report')}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                        activeTab === 'report'
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    📄 Report Card
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
                        <div className="space-y-4 sm:space-y-6">
                            {/* Session/Term Selectors - Mobile Optimized */}
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Session</label>
                                        <select
                                            value={selectedSession?.id || ''}
                                            onChange={(e) => handleSessionChange(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            {sessions.map(session => (
                                                <option key={session.id} value={session.id}>
                                                    {session.name} {session.is_current && '(Current)'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Term</label>
                                        <select
                                            value={selectedTerm?.id || ''}
                                            onChange={(e) => handleTermChange(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
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

                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                {selectedSession?.name} - {selectedTerm?.name}
                            </h2>

                            {currentTermGrades.length === 0 ? (
                                <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
                                    <svg className="mx-auto h-12 sm:h-16 w-12 sm:w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-500 text-base sm:text-lg">No grades available for this term</p>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Results will appear here after exams are graded</p>
                                </div>
                            ) : (
                                <>
                                    {/* Grade Cards - Mobile Optimized */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                                        {currentTermGrades.map((result, idx) => (
                                            <motion.div
                                                key={result.id || idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate pr-2">{result.subject_name}</h3>
                                                    <span className={`${getGradeBadgeClass(result.total_score)} text-xs px-2 py-1 rounded-full font-medium flex-shrink-0`}>
                                                        {result.grade}
                                                    </span>
                                                </div>

                                                {/* Score Breakdown - Compact */}
                                                <div className="space-y-1.5 mb-3 text-xs sm:text-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex justify-between bg-gray-50 rounded px-2 py-1">
                                                            <span className="text-gray-600">CA1:</span>
                                                            <span className="font-medium">{result.ca1_score || 0}</span>
                                                        </div>
                                                        <div className="flex justify-between bg-gray-50 rounded px-2 py-1">
                                                            <span className="text-gray-600">CA2:</span>
                                                            <span className="font-medium">{result.ca2_score || 0}</span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex justify-between bg-gray-50 rounded px-2 py-1">
                                                            <span className="text-gray-600">OBJ:</span>
                                                            <span className="font-medium">{result.obj_score || 0}</span>
                                                        </div>
                                                        <div className="flex justify-between bg-gray-50 rounded px-2 py-1">
                                                            <span className="text-gray-600">Theory:</span>
                                                            <span className="font-medium">{result.theory_score || 0}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                                                        <span className="text-gray-800">Total:</span>
                                                        <span className="text-blue-600">{result.total_score}</span>
                                                    </div>
                                                </div>

                                                {/* Position */}
                                                {result.position && (
                                                    <div className="text-xs text-gray-500 border-t pt-2">
                                                        Position: {result.position}/{result.total_students}
                                                    </div>
                                                )}

                                                <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                                                    <div
                                                        className={`h-full ${getGradeColor(result.total_score)} transition-all duration-700 ease-out`}
                                                        style={{ width: `${Math.min(result.total_score, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Term Summary - Mobile Optimized */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Term Summary</h3>
                                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                                            <div className="text-center sm:text-left">
                                                <div className="text-3xl sm:text-4xl font-bold text-blue-600">
                                                    {calculateAverage(currentTermGrades)}%
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                                    Average • Grade: {getGradeLetter(calculateAverage(currentTermGrades))}
                                                </p>
                                            </div>
                                            <div className="flex-1 w-full">
                                                <div className="h-2 sm:h-3 bg-blue-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 transition-all duration-700 ease-out"
                                                        style={{ width: `${calculateAverage(currentTermGrades)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                    <span>{currentTermGrades.length} subjects</span>
                                                    <span>{currentTermGrades.filter(g => parseFloat(g.total_score) >= 45).length} passed</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* All Results Tab - Mobile Optimized */}
                    {activeTab === 'all-round' && (
                        <div className="space-y-4 sm:space-y-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Performance History</h2>

                            {allGrades.length === 0 ? (
                                <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center">
                                    <svg className="mx-auto h-12 sm:h-16 w-12 sm:w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500 text-base sm:text-lg">No historical data available</p>
                                    <p className="text-gray-400 text-xs sm:text-sm mt-2">Your results will appear here after each term</p>
                                </div>
                            ) : (
                                <>
                                    {/* Grouped by Session/Term */}
                                    {groupedGrades.map((group, groupIdx) => (
                                        <div key={groupIdx} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                            {/* Group Header */}
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                                                        {group.sessionName} - {group.termName}
                                                    </h3>
                                                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                                        <span className="text-gray-600">
                                                            {group.grades.length} subjects
                                                        </span>
                                                        <span className={`px-2 sm:px-3 py-1 rounded-full font-medium ${getGradeBadgeClass(calculateAverage(group.grades))}`}>
                                                            Avg: {calculateAverage(group.grades)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Results - Mobile Card View / Desktop Table */}
                                            <div className="hidden sm:block overflow-x-auto">
                                                <table className="w-full min-w-[600px]">
                                                    <thead>
                                                        <tr className="border-b border-gray-200 bg-gray-50">
                                                            <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Subject</th>
                                                            <th className="text-center py-2 sm:py-3 px-2 font-semibold text-gray-700 text-xs">CA1</th>
                                                            <th className="text-center py-2 sm:py-3 px-2 font-semibold text-gray-700 text-xs">CA2</th>
                                                            <th className="text-center py-2 sm:py-3 px-2 font-semibold text-gray-700 text-xs">OBJ</th>
                                                            <th className="text-center py-2 sm:py-3 px-2 font-semibold text-gray-700 text-xs">Theory</th>
                                                            <th className="text-center py-2 sm:py-3 px-2 font-semibold text-gray-700 text-xs">Total</th>
                                                            <th className="text-center py-2 sm:py-3 px-3 font-semibold text-gray-700 text-xs">Grade</th>
                                                            <th className="text-center py-2 sm:py-3 px-3 font-semibold text-gray-700 text-xs">Pos</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {group.grades.map((grade, idx) => (
                                                            <tr key={grade.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                                <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium text-gray-800 text-xs sm:text-sm">{grade.subject_name}</td>
                                                                <td className="py-2 sm:py-3 px-2 text-center text-xs sm:text-sm">{grade.ca1_score || 0}</td>
                                                                <td className="py-2 sm:py-3 px-2 text-center text-xs sm:text-sm">{grade.ca2_score || 0}</td>
                                                                <td className="py-2 sm:py-3 px-2 text-center text-xs sm:text-sm">{grade.obj_score || 0}</td>
                                                                <td className="py-2 sm:py-3 px-2 text-center text-xs sm:text-sm">{grade.theory_score || 0}</td>
                                                                <td className="py-2 sm:py-3 px-2 text-center font-semibold text-blue-600 text-xs sm:text-sm">{grade.total_score}</td>
                                                                <td className="py-2 sm:py-3 px-3 text-center">
                                                                    <span className={`${getGradeBadgeClass(grade.total_score)} px-2 py-0.5 rounded-full text-xs font-medium`}>
                                                                        {grade.grade}
                                                                    </span>
                                                                </td>
                                                                <td className="py-2 sm:py-3 px-3 text-center text-gray-600 text-xs sm:text-sm">
                                                                    {grade.position ? `${grade.position}/${grade.total_students}` : '-'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Mobile Card View */}
                                            <div className="sm:hidden divide-y divide-gray-100">
                                                {group.grades.map((grade, idx) => (
                                                    <div key={grade.id || idx} className="p-3">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="font-medium text-gray-800 text-sm">{grade.subject_name}</span>
                                                            <span className={`${getGradeBadgeClass(grade.total_score)} px-2 py-0.5 rounded-full text-xs font-medium`}>
                                                                {grade.grade}
                                                            </span>
                                                        </div>
                                                        <div className="grid grid-cols-5 gap-1 text-xs text-center">
                                                            <div className="bg-gray-50 rounded p-1">
                                                                <div className="text-gray-500">CA1</div>
                                                                <div className="font-medium">{grade.ca1_score || 0}</div>
                                                            </div>
                                                            <div className="bg-gray-50 rounded p-1">
                                                                <div className="text-gray-500">CA2</div>
                                                                <div className="font-medium">{grade.ca2_score || 0}</div>
                                                            </div>
                                                            <div className="bg-gray-50 rounded p-1">
                                                                <div className="text-gray-500">OBJ</div>
                                                                <div className="font-medium">{grade.obj_score || 0}</div>
                                                            </div>
                                                            <div className="bg-gray-50 rounded p-1">
                                                                <div className="text-gray-500">Theory</div>
                                                                <div className="font-medium">{grade.theory_score || 0}</div>
                                                            </div>
                                                            <div className="bg-blue-50 rounded p-1">
                                                                <div className="text-blue-600">Total</div>
                                                                <div className="font-bold text-blue-700">{grade.total_score}</div>
                                                            </div>
                                                        </div>
                                                        {grade.position && (
                                                            <div className="text-xs text-gray-500 mt-2 text-right">
                                                                Position: {grade.position}/{grade.total_students}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Overall Statistics - Mobile Optimized */}
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-100">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Overall Statistics</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                                                <div className="text-xl sm:text-2xl font-bold text-blue-600">{allGrades.length}</div>
                                                <p className="text-xs sm:text-sm text-gray-600">Total Results</p>
                                            </div>
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                                                <div className="text-xl sm:text-2xl font-bold text-green-600">
                                                    {calculateAverage(allGrades)}%
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600">Overall Average</p>
                                            </div>
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                                                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                                                    {allGrades.filter(g => parseFloat(g.total_score) >= 45).length}
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600">Subjects Passed</p>
                                            </div>
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                                                <div className="text-xl sm:text-2xl font-bold text-orange-600">
                                                    {groupedGrades.length}
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600">Terms Completed</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Report Card Tab */}
                    {activeTab === 'report' && (
                        <div className="space-y-4">
                            {/* Print Button */}
                            <div className="flex justify-end print:hidden">
                                <button
                                    onClick={handlePrint}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Print Report Card
                                </button>
                            </div>

                            {/* Report Card */}
                            <div ref={printRef} className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
                                {/* School Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sm:p-6 text-center print:bg-blue-600">
                                    <img src={logo} alt="School Logo" className="w-16 h-16 mx-auto mb-2 rounded-full bg-white p-1" />
                                    <h1 className="text-xl sm:text-2xl font-bold">MOLEK SCHOOLS</h1>
                                    <p className="text-xs sm:text-sm opacity-90">Excellence in Education</p>
                                    <p className="text-sm sm:text-base font-semibold mt-2">STUDENT REPORT CARD</p>
                                </div>

                                {/* Student Info */}
                                <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500 text-xs">Name:</span>
                                            <p className="font-semibold">{student?.full_name || `${student?.first_name} ${student?.last_name}`}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">Admission No:</span>
                                            <p className="font-semibold">{student?.admission_number}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">Class:</span>
                                            <p className="font-semibold">{student?.class_level_name}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs">Term:</span>
                                            <p className="font-semibold">{selectedSession?.name} - {selectedTerm?.name}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Results Table */}
                                <div className="p-4 sm:p-6">
                                    {currentTermGrades.length === 0 ? (
                                        <p className="text-center text-gray-500 py-8">No results available for this term</p>
                                    ) : (
                                        <>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm border-collapse">
                                                    <thead>
                                                        <tr className="bg-gray-100">
                                                            <th className="border border-gray-300 px-2 py-2 text-left font-semibold">Subject</th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">CA1<br/><span className="font-normal text-xs">(15)</span></th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">CA2<br/><span className="font-normal text-xs">(15)</span></th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">OBJ<br/><span className="font-normal text-xs">(30)</span></th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">Theory<br/><span className="font-normal text-xs">(40)</span></th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">Total<br/><span className="font-normal text-xs">(100)</span></th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">Grade</th>
                                                            <th className="border border-gray-300 px-2 py-2 text-center font-semibold">Remark</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentTermGrades.map((grade, idx) => (
                                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                                <td className="border border-gray-300 px-2 py-2 font-medium">{grade.subject_name}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center">{grade.ca1_score || 0}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center">{grade.ca2_score || 0}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center">{grade.obj_score || 0}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center">{grade.theory_score || 0}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center font-bold">{grade.total_score}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center font-bold">{grade.grade}</td>
                                                                <td className="border border-gray-300 px-2 py-2 text-center text-xs">{grade.remark}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Summary */}
                                            <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                                <div className="bg-blue-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">Total Subjects</p>
                                                    <p className="text-lg sm:text-xl font-bold text-blue-700">{currentTermGrades.length}</p>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">Average Score</p>
                                                    <p className="text-lg sm:text-xl font-bold text-green-700">{calculateAverage(currentTermGrades)}%</p>
                                                </div>
                                                <div className="bg-purple-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">Overall Grade</p>
                                                    <p className="text-lg sm:text-xl font-bold text-purple-700">{getGradeLetter(calculateAverage(currentTermGrades))}</p>
                                                </div>
                                                <div className="bg-orange-50 rounded-lg p-3 text-center">
                                                    <p className="text-xs text-gray-600">Subjects Passed</p>
                                                    <p className="text-lg sm:text-xl font-bold text-orange-700">
                                                        {currentTermGrades.filter(g => parseFloat(g.total_score) >= 45).length}/{currentTermGrades.length}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Grading Key */}
                                            <div className="mt-4 sm:mt-6 p-3 bg-gray-50 rounded-lg text-xs">
                                                <p className="font-semibold mb-1">Grading Key:</p>
                                                <p>A (75-100) Excellent • B (70-74) Very Good • C (60-69) Good • D (50-59) Pass • E (45-49) Fair • F (0-44) Fail</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500">
                                    <p>Generated on {new Date().toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </motion.main>
    );
};

export default Grade;
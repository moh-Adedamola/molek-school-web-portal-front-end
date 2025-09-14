import { motion } from 'framer-motion';
import logo from '/logo.webp';
import { useState } from 'react';

const Grade = () => {
    const [activeTab, setActiveTab] = useState('current'); // 'current' | 'all-round'

    // Current Term Results (e.g., Term 2)
    const currentResults = [
        { subject: 'Python', score: 92, max: 100, grade: 'A+', teacher: 'Nickolas Flamel' },
        { subject: 'C++', score: 87, max: 100, grade: 'A', teacher: 'Tom Black' },
        { subject: 'Robotics', score: 95, max: 100, grade: 'A+', teacher: 'Ginevra Potter' },
        { subject: 'HTML/CSS', score: 89, max: 100, grade: 'A', teacher: 'Emilia Molek' },
        { subject: 'Mathematics', score: 94, max: 100, grade: 'A+', teacher: 'Dr. Watson' },
    ];

    // All-Round Results (Historical Terms)
    const allRoundResults = [
        {
            term: 'Term 1',
            average: 86,
            subjects: [
                { subject: 'Python', score: 84, max: 100 },
                { subject: 'C++', score: 82, max: 100 },
                { subject: 'Robotics', score: 90, max: 100 },
                { subject: 'HTML/CSS', score: 85, max: 100 },
                { subject: 'Mathematics', score: 89, max: 100 },
            ],
        },
        {
            term: 'Term 2',
            average: 91,
            subjects: [
                { subject: 'Python', score: 92, max: 100 },
                { subject: 'C++', score: 87, max: 100 },
                { subject: 'Robotics', score: 95, max: 100 },
                { subject: 'HTML/CSS', score: 89, max: 100 },
                { subject: 'Mathematics', score: 94, max: 100 },
            ],
        },
        {
            term: 'Term 3',
            average: 93,
            subjects: [
                { subject: 'Python', score: 95, max: 100 },
                { subject: 'C++', score: 90, max: 100 },
                { subject: 'Robotics', score: 97, max: 100 },
                { subject: 'HTML/CSS', score: 92, max: 100 },
                { subject: 'Mathematics', score: 96, max: 100 },
            ],
        },
    ];

    // Helper: Get grade color
    const getGradeColor = (score, max) => {
        const percent = (score / max) * 100;
        if (percent >= 90) return 'bg-green-500';
        if (percent >= 80) return 'bg-blue-500';
        if (percent >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // Helper: Get grade letter
    const getGradeLetter = (score, max) => {
        const percent = (score / max) * 100;
        if (percent >= 95) return 'A+';
        if (percent >= 90) return 'A';
        if (percent >= 85) return 'A-';
        if (percent >= 80) return 'B+';
        if (percent >= 75) return 'B';
        if (percent >= 70) return 'B-';
        return 'C';
    };

    return (
        <motion.main
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-4 md:p-6 bg-gray-50"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <img src={logo} alt="Emilia Molek" className="w-10 h-10 rounded-full object-cover" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Grades</h1>
                    <p className="text-sm text-gray-600">View academic performance across terms</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('current')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'current'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Current Results
                </button>
                <button
                    onClick={() => setActiveTab('all-round')}
                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === 'all-round'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    All Round Results
                </button>
            </div>

            {/* Current Results Tab */}
            {activeTab === 'current' && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">Current Term: Term 2</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentResults.map((result, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-medium text-gray-800">{result.subject}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {result.grade}
                  </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Teacher: {result.teacher}</p>
                                <div className="mb-3">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>{result.score}/{result.max}</span>
                                        <span>{Math.round((result.score / result.max) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${getGradeColor(result.score, result.max)} transition-all duration-700 ease-out`}
                                            style={{ width: `${(result.score / result.max) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Overall Average */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Overall Average</h3>
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-blue-600">
                                {Math.round(
                                    currentResults.reduce((sum, r) => sum + r.score, 0) / currentResults.length
                                )}
                                /100
                            </div>
                            <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-700 ease-out"
                                    style={{
                                        width: `${
                                            (currentResults.reduce((sum, r) => sum + r.score, 0) / currentResults.length / 100) * 100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* All-Round Results Tab */}
            {activeTab === 'all-round' && (
                <div className="space-y-8">
                    <h2 className="text-xl font-semibold text-gray-800">Performance Across Terms</h2>

                    {allRoundResults.map((term, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">{term.term}</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">Average:</span>
                                    <span className="text-2xl font-bold text-blue-600">{term.average}/100</span>
                                    <div className="flex-1 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-700 ease-out"
                                            style={{ width: `${term.average}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {term.subjects.map((subject, subIdx) => (
                                    <div key={subIdx} className="bg-gray-50 rounded-lg p-3 text-center">
                                        <p className="text-xs font-medium text-gray-700 mb-1">{subject.subject}</p>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-sm font-medium text-gray-800">{subject.score}</span>
                                            <span className="text-xs text-gray-500">/{subject.max}</span>
                                        </div>
                                        <div className="h-1 bg-gray-200 rounded-full mt-1">
                                            <div
                                                className={`h-full ${getGradeColor(subject.score, subject.max)}`}
                                                style={{ width: `${(subject.score / subject.max) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* Summary Card */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress Summary</h3>
                        <p className="text-gray-700 mb-4">
                            Your average has improved from <strong>86%</strong> in Term 1 to <strong>93%</strong> in Term 3.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 transition-all duration-1000 ease-out"
                                    style={{ width: '93%' }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600">📈 Steady improvement</span>
                        </div>
                    </div>
                </div>
            )}
        </motion.main>
    );
};

export default Grade;
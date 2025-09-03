// File location: src/pages/teacher/SubjectReports.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, BarChart3, TrendingUp, Download, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SubjectReports = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('first');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data
  const subjects = ['Mathematics', 'English Language', 'Basic Science', 'Civic Education'];
  const classes = ['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B'];

  const mockReportData = {
    subject: 'Mathematics',
    class: 'JSS 1A',
    term: 'First Term 2024',
    summary: {
      totalStudents: 25,
      averageScore: 68.4,
      highestScore: 95,
      lowestScore: 32,
      passRate: 76
    },
    gradeDistribution: [
      { grade: 'A', count: 4, percentage: 16 },
      { grade: 'B', count: 6, percentage: 24 },
      { grade: 'C', count: 9, percentage: 36 },
      { grade: 'D', count: 4, percentage: 16 },
      { grade: 'F', count: 2, percentage: 8 }
    ],
    assessmentPerformance: [
      { assessment: '1st Test', average: 7.2, maxScore: 10 },
      { assessment: '2nd Test', average: 6.8, maxScore: 10 },
      { assessment: 'Assignment', average: 8.1, maxScore: 10 },
      { assessment: 'Examination', average: 46.3, maxScore: 70 }
    ],
    topPerformers: [
      { name: 'Fatima Mohammed', score: 95, grade: 'A' },
      { name: 'Adebayo John', score: 88, grade: 'A' },
      { name: 'Chinyere Okafor', score: 85, grade: 'A' }
    ],
    strugglingStudents: [
      { name: 'Ibrahim Sani', score: 42, grade: 'D' },
      { name: 'Grace Emeka', score: 38, grade: 'F' },
      { name: 'Kemi Adeyemi', score: 32, grade: 'F' }
    ],
    recommendations: [
      'Consider additional tutorials for students scoring below 50%',
      'Focus more on practical problem-solving in future lessons',
      'Increase assignment frequency to improve continuous assessment scores',
      'Organize peer tutoring sessions for struggling students'
    ]
  };

  useEffect(() => {
    if (selectedSubject && selectedClass) {
      setLoading(true);
      setTimeout(() => {
        setReportData(mockReportData);
        setLoading(false);
      }, 800);
    }
  }, [selectedSubject, selectedClass, selectedTerm]);

  const getGradeColor = (grade) => {
    const colors = {
      A: '#059669',
      B: '#2563eb', 
      C: '#2563eb',
      D: '#d97706',
      F: '#dc2626'
    };
    return colors[grade] || '#6b7280';
  };

  const handleExportReport = () => {
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="container-max py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Subject Reports</h1>
        <p className="text-neutral-600">Analyze subject-wise performance and generate insights</p>
      </div>

      {/* Selection Form */}
      <div className="card-base mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <BookOpen className="inline h-4 w-4 mr-1" />
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input-base w-full"
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-base w-full"
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="input-base w-full"
            >
              <option value="first">First Term</option>
              <option value="second">Second Term</option>
              <option value="third">Third Term</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}

      {reportData && !loading && (
        <>
          {/* Report Header */}
          <div className="card-base mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-neutral-800">
                  {reportData.subject} - {reportData.class}
                </h2>
                <p className="text-neutral-600">{reportData.term}</p>
              </div>
              <button
                onClick={handleExportReport}
                className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-primary-600">{reportData.summary.totalStudents}</p>
              <p className="text-sm text-neutral-600">Total Students</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-secondary-600">{reportData.summary.averageScore}%</p>
              <p className="text-sm text-neutral-600">Class Average</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-accent-600">{reportData.summary.highestScore}%</p>
              <p className="text-sm text-neutral-600">Highest Score</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-neutral-600">{reportData.summary.lowestScore}%</p>
              <p className="text-sm text-neutral-600">Lowest Score</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-secondary-600">{reportData.summary.passRate}%</p>
              <p className="text-sm text-neutral-600">Pass Rate</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Grade Distribution */}
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary-600" />
                Grade Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportData.gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                    >
                      {reportData.gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getGradeColor(entry.grade)} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Assessment Performance */}
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary-600" />
                Assessment Performance
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.assessmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assessment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Performance Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Top Performers */}
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Top Performers</h3>
              <div className="space-y-3">
                {reportData.topPerformers.map((student, index) => (
                  <div key={student.name} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-neutral-800">{student.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-800">{student.score}%</span>
                      <span className="grade-excellent px-2 py-1 rounded text-white text-xs font-medium">
                        {student.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Struggling Students */}
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Students Needing Support</h3>
              <div className="space-y-3">
                {reportData.strugglingStudents.map((student, index) => (
                  <div key={student.name} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        !
                      </div>
                      <span className="font-medium text-neutral-800">{student.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-800">{student.score}%</span>
                      <span className="grade-poor px-2 py-1 rounded text-white text-xs font-medium">
                        {student.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="card-base">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Teaching Recommendations</h3>
            <div className="space-y-3">
              {reportData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-accent-50 rounded-lg">
                  <div className="w-6 h-6 bg-accent-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-neutral-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {(!selectedSubject || !selectedClass) && (
        <div className="card-base text-center py-12">
          <BarChart3 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">Select Subject & Class</h3>
          <p className="text-neutral-500">Choose a subject and class to generate performance reports</p>
        </div>
      )}
    </div>
  );
};

export default SubjectReports;
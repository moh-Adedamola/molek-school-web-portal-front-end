// File location: src/pages/teacher/StudentProgress.jsx
import React, { useState, useEffect } from 'react';
import { TrendingUp, User, Calendar, BookOpen, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const StudentProgress = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock students data
  const students = [
    { id: 1, name: 'Adebayo John', class: 'JSS 1A' },
    { id: 2, name: 'Fatima Mohammed', class: 'JSS 1A' },
    { id: 3, name: 'Chinyere Okafor', class: 'JSS 2B' }
  ];

  const subjects = ['Mathematics', 'English Language', 'Basic Science'];

  // Mock progress data
  const mockProgressData = {
    student: { name: 'Adebayo John', class: 'JSS 1A', admissionNumber: 'SCH/2024/001' },
    subject: 'Mathematics',
    currentTerm: 'First Term 2024',
    overallGrade: 72,
    attendance: 85,
    assessments: [
      { name: '1st Test', score: 8, maxScore: 10, date: '2024-02-15' },
      { name: '2nd Test', score: 7, maxScore: 10, date: '2024-03-01' },
      { name: 'Assignment', score: 9, maxScore: 10, date: '2024-03-10' },
      { name: 'Examination', score: 48, maxScore: 70, date: '2024-03-20' }
    ],
    termProgress: [
      { term: 'Term 1', grade: 68 },
      { term: 'Term 2', grade: 72 },
      { term: 'Term 3', grade: 75 }
    ],
    monthlyAttendance: [
      { month: 'Jan', attendance: 90 },
      { month: 'Feb', attendance: 85 },
      { month: 'Mar', attendance: 88 }
    ]
  };

  useEffect(() => {
    if (selectedStudent && selectedSubject) {
      setLoading(true);
      setTimeout(() => {
        setProgressData(mockProgressData);
        setLoading(false);
      }, 800);
    }
  }, [selectedStudent, selectedSubject]);

  const getGradeClass = (score) => {
    if (score >= 80) return 'grade-excellent';
    if (score >= 70) return 'grade-good';
    if (score >= 60) return 'grade-good';
    if (score >= 50) return 'grade-average';
    return 'grade-poor';
  };

  const getAttendanceClass = (attendance) => {
    if (attendance >= 90) return 'status-present';
    if (attendance >= 75) return 'badge-warning';
    return 'badge-error';
  };

  return (
    <div className="container-max py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Student Progress</h1>
        <p className="text-neutral-600">Track individual student academic performance and attendance</p>
      </div>

      {/* Selection Form */}
      <div className="card-base mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="input-base w-full"
            >
              <option value="">Select Student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.class}
                </option>
              ))}
            </select>
          </div>

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
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}

      {progressData && !loading && (
        <>
          {/* Student Summary */}
          <div className="card-base mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-neutral-800">{progressData.student.name}</h2>
                <p className="text-neutral-600">{progressData.student.class} | {progressData.student.admissionNumber}</p>
                <p className="text-sm text-neutral-500 mt-1">{progressData.subject} - {progressData.currentTerm}</p>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center">
                  <p className={`text-2xl font-bold ${getGradeClass(progressData.overallGrade)} inline-block px-3 py-1 rounded-full text-white`}>
                    {progressData.overallGrade}%
                  </p>
                  <p className="text-xs text-neutral-600 mt-1">Overall Grade</p>
                </div>
                <div className="text-center">
                  <p className={`text-2xl font-bold ${getAttendanceClass(progressData.attendance)} inline-block px-3 py-1 rounded-full text-white`}>
                    {progressData.attendance}%
                  </p>
                  <p className="text-xs text-neutral-600 mt-1">Attendance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Term Progress */}
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                Academic Progress
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData.termProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="term" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="grade" stroke="#1e40af" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Chart */}
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary-600" />
                Monthly Attendance
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData.monthlyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Assessment Breakdown */}
          <div className="card-base">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent-600" />
              Assessment Breakdown
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="table-header">
                    <th className="px-4 py-3 text-left text-sm font-medium">Assessment</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Score</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Percentage</th>
                    <th className="px-4 py-3 text-left text-sm font-medium mobile-hidden">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium mobile-hidden">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {progressData.assessments.map((assessment, index) => {
                    const percentage = ((assessment.score / assessment.maxScore) * 100).toFixed(1);
                    const grade = percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F';
                    
                    return (
                      <tr 
                        key={assessment.name} 
                        className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-neutral-800">{assessment.name}</p>
                            <p className="text-sm text-neutral-600 md:hidden">{assessment.date}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium">{assessment.score}/{assessment.maxScore}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-neutral-200 rounded-full h-2">
                              <div 
                                className="bg-primary-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 mobile-hidden">
                          <span className="text-sm text-neutral-600">{assessment.date}</span>
                        </td>
                        <td className="px-4 py-3 mobile-hidden">
                          <span className={`${getGradeClass(percentage)} px-2 py-1 rounded-full text-xs font-medium text-white`}>
                            {grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!selectedStudent || !selectedSubject ? (
        <div className="card-base text-center py-12">
          <User className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">Select Student & Subject</h3>
          <p className="text-neutral-500">Choose a student and subject to view their progress details</p>
        </div>
      ) : null}
    </div>
  );
};

export default StudentProgress;
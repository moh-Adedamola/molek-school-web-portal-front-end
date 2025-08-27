import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const GradeAnalytics = () => {
  const [selectedClass, setSelectedClass] = useState('sss3');
  const [selectedTerm, setSelectedTerm] = useState('1st');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentSession = '2024/2025';

  const classes = [
    { id: 'sss1', name: 'SSS 1' },
    { id: 'sss2', name: 'SSS 2' },
    { id: 'sss3', name: 'SSS 3' }
  ];

  const terms = [
    { id: '1st', name: '1st Term' },
    { id: '2nd', name: '2nd Term' },
    { id: '3rd', name: '3rd Term' }
  ];

  // WAEC core subjects
  const waecSubjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'english', name: 'English Language' },
    { id: 'biology', name: 'Biology' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'physics', name: 'Physics' },
    { id: 'economics', name: 'Economics' },
    { id: 'government', name: 'Government' },
    { id: 'literature', name: 'Literature in English' },
    { id: 'geography', name: 'Geography' },
    { id: 'history', name: 'History' }
  ];

  // WAEC grade colors
  const gradeColors = {
    A: '#059669',  // Excellent - Green
    B: '#2563eb',  // Very Good - Blue
    C: '#d97706',  // Good - Orange
    D: '#dc2626',  // Pass - Red
    E: '#991b1b',  // Poor - Dark Red
    F: '#7f1d1d'   // Fail - Darker Red
  };

  // Mock analytics data
  const mockAnalyticsData = {
    overview: {
      totalStudents: 25,
      averageScore: 73.2,
      waecReadiness: 84,
      passingRate: 88,
      excellentPerformers: 8
    },
    gradeDistribution: [
      { grade: 'A', count: 8, percentage: 32, color: gradeColors.A },
      { grade: 'B', count: 7, percentage: 28, color: gradeColors.B },
      { grade: 'C', count: 5, percentage: 20, color: gradeColors.C },
      { grade: 'D', count: 3, percentage: 12, color: gradeColors.D },
      { grade: 'E', count: 2, percentage: 8, color: gradeColors.E },
      { grade: 'F', count: 0, percentage: 0, color: gradeColors.F }
    ],
    subjectPerformance: [
      { subject: 'Mathematics', averageScore: 68.5, gradeA: 6, gradeB: 8, gradeC: 7, gradeD: 3, gradeE: 1, gradeF: 0 },
      { subject: 'English Language', averageScore: 71.3, gradeA: 7, gradeB: 9, gradeC: 6, gradeD: 2, gradeE: 1, gradeF: 0 },
      { subject: 'Biology', averageScore: 76.8, gradeA: 10, gradeB: 8, gradeC: 5, gradeD: 2, gradeE: 0, gradeF: 0 },
      { subject: 'Chemistry', averageScore: 69.4, gradeA: 5, gradeB: 9, gradeC: 8, gradeD: 2, gradeE: 1, gradeF: 0 },
      { subject: 'Physics', averageScore: 72.1, gradeA: 8, gradeB: 7, gradeC: 6, gradeD: 3, gradeE: 1, gradeF: 0 },
      { subject: 'Economics', averageScore: 74.6, gradeA: 9, gradeB: 8, gradeC: 5, gradeD: 2, gradeE: 1, gradeF: 0 }
    ],
    waecReadinessRadar: [
      { subject: 'Mathematics', score: 68.5, waecTarget: 75 },
      { subject: 'English', score: 71.3, waecTarget: 75 },
      { subject: 'Biology', score: 76.8, waecTarget: 75 },
      { subject: 'Chemistry', score: 69.4, waecTarget: 75 },
      { subject: 'Physics', score: 72.1, waecTarget: 75 },
      { subject: 'Economics', score: 74.6, waecTarget: 75 }
    ],
    termProgression: [
      { term: '1st Term', averageScore: 69.2, passRate: 82 },
      { term: '2nd Term', averageScore: 71.8, passRate: 86 },
      { term: '3rd Term', averageScore: 73.2, passRate: 88 }
    ],
    topPerformers: [
      { name: 'Kemi Oyebode', admissionNo: 'SSS3/001', averageScore: 89.5, grade: 'A', subjects: 6 },
      { name: 'Abdullahi Hassan', admissionNo: 'SSS3/002', averageScore: 86.2, grade: 'A', subjects: 6 },
      { name: 'Ngozi Okello', admissionNo: 'SSS3/003', averageScore: 82.7, grade: 'A', subjects: 6 }
    ],
    improvementNeeded: [
      { name: 'Student A', admissionNo: 'SSS3/015', averageScore: 58.3, grade: 'D', weakSubjects: ['Mathematics', 'Chemistry'] },
      { name: 'Student B', admissionNo: 'SSS3/018', averageScore: 62.1, grade: 'C', weakSubjects: ['Physics', 'Mathematics'] },
      { name: 'Student C', admissionNo: 'SSS3/022', averageScore: 55.8, grade: 'D', weakSubjects: ['English Language', 'Economics'] }
    ]
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    }, 1000);
  }, [selectedClass, selectedTerm, selectedSubject]);

  const getGradeColor = (grade) => {
    return gradeColors[grade] || '#6b7280';
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-secondary-600 bg-secondary-100';
    if (score >= 70) return 'text-primary-600 bg-primary-100';
    if (score >= 60) return 'text-accent-600 bg-accent-100';
    if (score >= 50) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getWaecReadinessStatus = (readiness) => {
    if (readiness >= 90) return { text: 'Excellent', color: 'text-secondary-600 bg-secondary-100' };
    if (readiness >= 80) return { text: 'Good', color: 'text-primary-600 bg-primary-100' };
    if (readiness >= 70) return { text: 'Fair', color: 'text-accent-600 bg-accent-100' };
    return { text: 'Needs Improvement', color: 'text-red-600 bg-red-100' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
        <div className="container-max section-padding">
          <Card className="text-center py-12">
            <Card.Content>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading WAEC analytics...</p>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-2">
            WAEC Performance Analytics
          </h1>
          <p className="text-neutral-600">
            Track student readiness for West African Examinations Council (WAEC) - {currentSession}
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Class
                </label>
                <div className="flex space-x-2">
                  {classes.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClass(cls.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedClass === cls.id
                          ? 'bg-primary-100 text-primary-800 border border-primary-300'
                          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {cls.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Term Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Term
                </label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {terms.map((term) => (
                    <option key={term.id} value={term.id}>
                      {term.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  WAEC Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {waecSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* WAEC Readiness Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {analyticsData.overview.totalStudents}
              </div>
              <div className="text-sm text-neutral-600">Total Students</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(analyticsData.overview.averageScore).split(' ')[0]}`}>
                {analyticsData.overview.averageScore}%
              </div>
              <div className="text-sm text-neutral-600">Average Score</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className={`text-2xl font-bold mb-1 px-3 py-1 rounded-lg ${getWaecReadinessStatus(analyticsData.overview.waecReadiness).color}`}>
                {analyticsData.overview.waecReadiness}%
              </div>
              <div className="text-sm text-neutral-600">WAEC Readiness</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-secondary-600 mb-1">
                {analyticsData.overview.passingRate}%
              </div>
              <div className="text-sm text-neutral-600">Passing Rate</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {analyticsData.overview.excellentPerformers}
              </div>
              <div className="text-sm text-neutral-600">A Grade Students</div>
            </Card.Content>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grade Distribution */}
          <Card>
            <Card.Header>
              <Card.Title className="text-primary-800">WAEC Grade Distribution</Card.Title>
            </Card.Header>
            <Card.Content>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="count"
                    label={({ grade, count, percentage }) => `${grade}: ${count} (${percentage}%)`}
                  >
                    {analyticsData.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>

          {/* WAEC Readiness Radar */}
          <Card>
            <Card.Header>
              <Card.Title className="text-primary-800">Subject Readiness vs WAEC Target</Card.Title>
            </Card.Header>
            <Card.Content>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={analyticsData.waecReadinessRadar}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current Score" dataKey="score" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="WAEC Target" dataKey="waecTarget" stroke="#dc2626" fill="#ef4444" fillOpacity={0.1} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>
        </div>

        {/* Term Progression */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title className="text-primary-800">Performance Progression Throughout the Year</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.termProgression}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="term" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="averageScore" stroke="#2563eb" strokeWidth={3} name="Average Score" />
                <Line type="monotone" dataKey="passRate" stroke="#059669" strokeWidth={3} name="Pass Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Subject Performance Analysis */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title className="text-primary-800">WAEC Subject Performance Analysis</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50 border-b border-primary-200">
                    <th className="text-left p-3 font-semibold text-primary-800">Subject</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Avg Score</th>
                    <th className="text-center p-3 font-semibold text-secondary-800">A</th>
                    <th className="text-center p-3 font-semibold text-primary-800">B</th>
                    <th className="text-center p-3 font-semibold text-accent-800">C</th>
                    <th className="text-center p-3 font-semibold text-orange-800">D</th>
                    <th className="text-center p-3 font-semibold text-red-800">E</th>
                    <th className="text-center p-3 font-semibold text-red-800">F</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.subjectPerformance.map((subject, index) => (
                    <tr key={subject.subject} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                      <td className="p-3 font-medium">{subject.subject}</td>
                      <td className={`p-3 text-center font-semibold ${getPerformanceColor(subject.averageScore).split(' ')[0]}`}>
                        {subject.averageScore}%
                      </td>
                      <td className="p-3 text-center text-secondary-600 font-semibold">{subject.gradeA}</td>
                      <td className="p-3 text-center text-primary-600 font-semibold">{subject.gradeB}</td>
                      <td className="p-3 text-center text-accent-600 font-semibold">{subject.gradeC}</td>
                      <td className="p-3 text-center text-orange-600 font-semibold">{subject.gradeD}</td>
                      <td className="p-3 text-center text-red-600 font-semibold">{subject.gradeE}</td>
                      <td className="p-3 text-center text-red-700 font-semibold">{subject.gradeF}</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(subject.averageScore)}`}>
                          {subject.averageScore >= 75 ? 'WAEC Ready' : subject.averageScore >= 65 ? 'Nearly Ready' : 'Needs Work'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performers */}
          <Card>
            <Card.Header>
              <Card.Title className="text-primary-800">Top WAEC Performers</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {analyticsData.topPerformers.map((student, index) => (
                  <div key={student.admissionNo} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-600 text-white flex items-center justify-center font-bold text-sm">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{student.name}</p>
                        <p className="text-xs text-neutral-600">{student.admissionNo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-secondary-600">{student.averageScore}%</div>
                      <div className="text-xs text-neutral-600">{student.subjects} subjects</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Students Needing Improvement */}
          <Card>
            <Card.Header>
              <Card.Title className="text-primary-800">Students Needing Support</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                {analyticsData.improvementNeeded.map((student) => (
                  <div key={student.admissionNo} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-neutral-900">{student.name}</p>
                        <p className="text-xs text-neutral-600">{student.admissionNo}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">{student.averageScore}%</div>
                        <div className="text-xs text-neutral-600">Grade {student.grade}</div>
                      </div>
                    </div>
                    <div className="text-xs text-red-700">
                      <span className="font-medium">Weak subjects:</span> {student.weakSubjects.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">
            Generate WAEC Readiness Report
          </Button>
          <Button variant="secondary">
            Export Performance Data
          </Button>
          <Button variant="accent">
            Create Improvement Plans
          </Button>
          <Button variant="outline">
            Schedule Parent Meetings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GradeAnalytics;
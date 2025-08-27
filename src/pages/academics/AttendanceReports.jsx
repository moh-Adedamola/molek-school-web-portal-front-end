import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AttendanceReports = () => {
  const [selectedTerm, setSelectedTerm] = useState('1st');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentSession = '2024/2025';

  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: 'jss1', name: 'JSS 1' },
    { id: 'jss2', name: 'JSS 2' },
    { id: 'jss3', name: 'JSS 3' },
    { id: 'sss1', name: 'SSS 1' },
    { id: 'sss2', name: 'SSS 2' },
    { id: 'sss3', name: 'SSS 3' }
  ];

  const terms = [
    { id: '1st', name: '1st Term' },
    { id: '2nd', name: '2nd Term' },
    { id: '3rd', name: '3rd Term' }
  ];

  // Mock students for individual reports
  const students = [
    { id: 1, name: 'Adebayo Johnson', class: 'JSS 1', admissionNo: 'JSS1/001' },
    { id: 2, name: 'Fatima Mohammed', class: 'JSS 1', admissionNo: 'JSS1/002' },
    { id: 11, name: 'Temitope Alabi', class: 'SSS 1', admissionNo: 'SSS1/001' },
    { id: 22, name: 'Kemi Oyebode', class: 'SSS 3', admissionNo: 'SSS3/001' }
  ];

  // Mock attendance data
  const mockReportData = {
    termSummary: {
      totalDays: 65,
      schoolDays: 63,
      publicHolidays: 2,
      attendanceRate: 87.3,
      totalStudents: 156
    },
    monthlyBreakdown: [
      { month: 'Sep', present: 18, late: 2, absent: 2, total: 22, rate: 81.8 },
      { month: 'Oct', present: 20, late: 1, absent: 1, total: 22, rate: 90.9 },
      { month: 'Nov', present: 19, late: 2, absent: 1, total: 22, rate: 86.4 },
      { month: 'Dec', present: 15, late: 1, absent: 1, total: 17, rate: 88.2 }
    ],
    classComparison: [
      { class: 'JSS 1', present: 720, late: 45, absent: 35, total: 800, rate: 90.0 },
      { class: 'JSS 2', present: 680, late: 38, absent: 42, total: 760, rate: 89.5 },
      { class: 'JSS 3', present: 665, late: 35, absent: 40, total: 740, rate: 89.9 },
      { class: 'SSS 1', present: 745, late: 28, absent: 27, total: 800, rate: 93.1 },
      { class: 'SSS 2', present: 710, late: 32, absent: 38, total: 780, rate: 91.0 },
      { class: 'SSS 3', present: 720, late: 18, absent: 22, total: 760, rate: 94.7 }
    ],
    studentTrends: [
      { week: 'Week 1', present: 142, late: 8, absent: 6 },
      { week: 'Week 2', present: 145, late: 6, absent: 5 },
      { week: 'Week 3', present: 138, late: 12, absent: 6 },
      { week: 'Week 4', present: 148, late: 4, absent: 4 },
      { week: 'Week 5', present: 140, late: 10, absent: 6 },
      { week: 'Week 6', present: 144, late: 7, absent: 5 }
    ],
    individualReport: {
      studentName: 'Adebayo Johnson',
      class: 'JSS 1',
      admissionNo: 'JSS1/001',
      totalDays: 63,
      present: 54,
      late: 4,
      absent: 5,
      attendanceRate: 85.7,
      monthlyData: [
        { month: 'Sep', present: 14, late: 2, absent: 1, days: 17 },
        { month: 'Oct', present: 16, late: 1, absent: 2, days: 19 },
        { month: 'Nov', present: 12, late: 1, absent: 1, days: 14 },
        { month: 'Dec', present: 12, late: 0, absent: 1, days: 13 }
      ]
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setReportData(mockReportData);
      setLoading(false);
    }, 1000);
  }, [selectedTerm, selectedClass]);

  const getAttendanceColor = (rate) => {
    if (rate >= 95) return 'text-secondary-600 bg-secondary-100';
    if (rate >= 85) return 'text-primary-600 bg-primary-100';
    if (rate >= 75) return 'text-accent-600 bg-accent-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'text-secondary-600';
      case 'late':
        return 'text-accent-600';
      case 'absent':
        return 'text-red-600';
      default:
        return 'text-neutral-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
        <div className="container-max section-padding">
          <Card className="text-center py-12">
            <Card.Content>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Generating attendance reports...</p>
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
            Attendance Reports
          </h1>
          <p className="text-neutral-600">
            Comprehensive attendance analysis for {currentSession} academic session
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Term Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Term
                </label>
                <div className="flex space-x-2">
                  {terms.map((term) => (
                    <button
                      key={term.id}
                      onClick={() => setSelectedTerm(term.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedTerm === term.id
                          ? 'bg-primary-100 text-primary-800 border border-primary-300'
                          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {term.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student Selection for Individual Report */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Individual Student Report
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select student (optional)</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.class}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Term Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {reportData.termSummary.totalDays}
              </div>
              <div className="text-sm text-neutral-600">Total Days</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-secondary-600 mb-1">
                {reportData.termSummary.schoolDays}
              </div>
              <div className="text-sm text-neutral-600">School Days</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {reportData.termSummary.publicHolidays}
              </div>
              <div className="text-sm text-neutral-600">Holidays</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-neutral-600 mb-1">
                {reportData.termSummary.totalStudents}
              </div>
              <div className="text-sm text-neutral-600">Total Students</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className={`text-2xl font-bold mb-1 ${getAttendanceColor(reportData.termSummary.attendanceRate).split(' ')[0]}`}>
                {reportData.termSummary.attendanceRate}%
              </div>
              <div className="text-sm text-neutral-600">Overall Rate</div>
            </Card.Content>
          </Card>
        </div>

        {/* Individual Student Report */}
        {selectedStudent && (
          <Card className="mb-8">
            <Card.Header>
              <Card.Title className="text-primary-800">Individual Attendance Report</Card.Title>
              <div className="mt-2 text-sm text-neutral-600">
                {reportData.individualReport.studentName} • {reportData.individualReport.class} • {reportData.individualReport.admissionNo}
              </div>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary-600">
                    {reportData.individualReport.present}
                  </div>
                  <div className="text-sm text-neutral-600">Days Present</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-600">
                    {reportData.individualReport.late}
                  </div>
                  <div className="text-sm text-neutral-600">Days Late</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {reportData.individualReport.absent}
                  </div>
                  <div className="text-sm text-neutral-600">Days Absent</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-neutral-600">
                    {reportData.individualReport.totalDays}
                  </div>
                  <div className="text-sm text-neutral-600">Total Days</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold px-3 py-1 rounded-lg ${getAttendanceColor(reportData.individualReport.attendanceRate)}`}>
                    {reportData.individualReport.attendanceRate}%
                  </div>
                  <div className="text-sm text-neutral-600">Attendance Rate</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-50 border-b border-primary-200">
                      <th className="text-left p-3 font-semibold text-primary-800">Month</th>
                      <th className="text-center p-3 font-semibold text-primary-800">School Days</th>
                      <th className="text-center p-3 font-semibold text-secondary-800">Present</th>
                      <th className="text-center p-3 font-semibold text-accent-800">Late</th>
                      <th className="text-center p-3 font-semibold text-red-800">Absent</th>
                      <th className="text-center p-3 font-semibold text-primary-800">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.individualReport.monthlyData.map((month, index) => (
                      <tr key={month.month} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                        <td className="p-3 font-medium">{month.month}</td>
                        <td className="p-3 text-center">{month.days}</td>
                        <td className="p-3 text-center text-secondary-600 font-semibold">{month.present}</td>
                        <td className="p-3 text-center text-accent-600 font-semibold">{month.late}</td>
                        <td className="p-3 text-center text-red-600 font-semibold">{month.absent}</td>
                        <td className={`p-3 text-center font-semibold ${getAttendanceColor(((month.present / month.days) * 100)).split(' ')[0]}`}>
                          {((month.present / month.days) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Content>
          </Card>
        )}

        {/* Monthly Breakdown Chart */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title className="text-primary-800">Monthly Attendance Breakdown - {selectedTerm} Term</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.monthlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#059669" name="Present" />
                <Bar dataKey="late" fill="#d97706" name="Late" />
                <Bar dataKey="absent" fill="#dc2626" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Attendance Trends */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title className="text-primary-800">Weekly Attendance Trends</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.studentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#059669" strokeWidth={3} name="Present" />
                <Line type="monotone" dataKey="late" stroke="#d97706" strokeWidth={2} name="Late" />
                <Line type="monotone" dataKey="absent" stroke="#dc2626" strokeWidth={2} name="Absent" />
              </LineChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Class Comparison Table */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title className="text-primary-800">Class-wise Attendance Comparison</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50 border-b border-primary-200">
                    <th className="text-left p-3 font-semibold text-primary-800">Class</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Total Records</th>
                    <th className="text-center p-3 font-semibold text-secondary-800">Present</th>
                    <th className="text-center p-3 font-semibold text-accent-800">Late</th>
                    <th className="text-center p-3 font-semibold text-red-800">Absent</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Attendance Rate</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.classComparison.map((cls, index) => (
                    <tr key={cls.class} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                      <td className="p-3 font-medium">{cls.class}</td>
                      <td className="p-3 text-center">{cls.total}</td>
                      <td className="p-3 text-center text-secondary-600 font-semibold">{cls.present}</td>
                      <td className="p-3 text-center text-accent-600 font-semibold">{cls.late}</td>
                      <td className="p-3 text-center text-red-600 font-semibold">{cls.absent}</td>
                      <td className={`p-3 text-center font-semibold ${getAttendanceColor(cls.rate).split(' ')[0]}`}>
                        {cls.rate}%
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(cls.rate)}`}>
                          {cls.rate >= 95 ? 'Excellent' : cls.rate >= 85 ? 'Good' : cls.rate >= 75 ? 'Fair' : 'Poor'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">
            Download PDF Report
          </Button>
          <Button variant="secondary">
            Export to Excel
          </Button>
          <Button variant="accent">
            Email Reports to Parents
          </Button>
          <Button variant="outline">
            Print Class Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
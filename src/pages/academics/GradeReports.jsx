import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const GradeReports = () => {
  const [selectedClass, setSelectedClass] = useState('sss3');
  const [selectedTerm, setSelectedTerm] = useState('1st');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentSession = '2024/2025';

  const classes = [
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

  // Nigerian grading system
  const gradeRanges = [
    { min: 70, max: 100, grade: 'A', color: 'secondary', label: 'Excellent', gpa: 4.0 },
    { min: 60, max: 69, grade: 'B', color: 'primary', label: 'Very Good', gpa: 3.0 },
    { min: 50, max: 59, grade: 'C', color: 'accent', label: 'Good', gpa: 2.0 },
    { min: 45, max: 49, grade: 'D', color: 'orange', label: 'Pass', gpa: 1.0 },
    { min: 40, max: 44, grade: 'E', color: 'red', label: 'Poor', gpa: 0.5 },
    { min: 0, max: 39, grade: 'F', color: 'red', label: 'Fail', gpa: 0.0 }
  ];

  // Mock students data
  const students = {
    sss3: [
      { id: 22, name: 'Kemi Oyebode', admissionNo: 'SSS3/001' },
      { id: 23, name: 'Abdullahi Hassan', admissionNo: 'SSS3/002' },
      { id: 24, name: 'Ngozi Okello', admissionNo: 'SSS3/003' }
    ],
    sss2: [
      { id: 19, name: 'Folake Adebisi', admissionNo: 'SSS2/001' },
      { id: 20, name: 'Uche Okonkwo', admissionNo: 'SSS2/002' }
    ],
    sss1: [
      { id: 11, name: 'Temitope Alabi', admissionNo: 'SSS1/001' },
      { id: 12, name: 'Amina Garba', admissionNo: 'SSS1/002' }
    ]
  };

  // Mock report card data
  const mockReportData = {
    student: {
      name: 'Kemi Oyebode',
      admissionNo: 'SSS3/001',
      class: 'SSS 3',
      session: '2024/2025',
      term: '1st Term',
      dateOfBirth: '2007-03-15',
      gender: 'Female'
    },
    subjects: [
      { 
        name: 'Mathematics', 
        ca: 18, 
        exam: 72, 
        total: 90, 
        grade: 'A', 
        remark: 'Excellent performance in all areas',
        position: 1,
        teacherComment: 'Outstanding mathematical skills'
      },
      { 
        name: 'English Language', 
        ca: 16, 
        exam: 68, 
        total: 84, 
        grade: 'A', 
        remark: 'Very good command of language',
        position: 2,
        teacherComment: 'Strong writing and comprehension'
      },
      { 
        name: 'Biology', 
        ca: 19, 
        exam: 74, 
        total: 93, 
        grade: 'A', 
        remark: 'Exceptional understanding of concepts',
        position: 1,
        teacherComment: 'Shows great interest in life sciences'
      },
      { 
        name: 'Chemistry', 
        ca: 15, 
        exam: 65, 
        total: 80, 
        grade: 'A', 
        remark: 'Good grasp of chemical principles',
        position: 3,
        teacherComment: 'Improved practical skills needed'
      },
      { 
        name: 'Physics', 
        ca: 17, 
        exam: 70, 
        total: 87, 
        grade: 'A', 
        remark: 'Strong analytical thinking',
        position: 2,
        teacherComment: 'Excellent problem-solving abilities'
      },
      { 
        name: 'Economics', 
        ca: 16, 
        exam: 69, 
        total: 85, 
        grade: 'A', 
        remark: 'Good understanding of economic theory',
        position: 2,
        teacherComment: 'Shows practical application skills'
      },
      { 
        name: 'Government', 
        ca: 18, 
        exam: 73, 
        total: 91, 
        grade: 'A', 
        remark: 'Excellent knowledge of civic duties',
        position: 1,
        teacherComment: 'Active participation in discussions'
      }
    ],
    summary: {
      totalSubjects: 7,
      totalMarks: 620,
      averageScore: 88.6,
      overallGrade: 'A',
      classPosition: 1,
      totalInClass: 25,
      gpa: 4.0,
      promoted: true
    },
    attendance: {
      daysInTerm: 65,
      daysPresent: 63,
      daysAbsent: 2,
      daysLate: 3,
      attendanceRate: 96.9
    },
    termDates: {
      resumption: '2024-09-09',
      vacation: '2024-12-20',
      nextResumption: '2025-01-13'
    },
    principalComment: 'An exceptional student with outstanding academic performance. Continue with the excellent work.',
    classTeacherComment: 'Kemi is a dedicated and hardworking student. Her leadership qualities are commendable.',
    parentComment: ''
  };

  useEffect(() => {
    if (selectedStudent) {
      setLoading(true);
      setTimeout(() => {
        setReportData(mockReportData);
        setLoading(false);
      }, 1000);
    }
  }, [selectedClass, selectedTerm, selectedStudent]);

  const calculateGrade = (score) => {
    return gradeRanges.find(range => score >= range.min && score <= range.max);
  };

  const getGradeColor = (grade) => {
    const gradeInfo = gradeRanges.find(g => g.grade === grade);
    if (!gradeInfo) return 'text-neutral-600 bg-neutral-100';
    
    switch (gradeInfo.color) {
      case 'secondary':
        return 'text-secondary-600 bg-secondary-100 border-secondary-200';
      case 'primary':
        return 'text-primary-600 bg-primary-100 border-primary-200';
      case 'accent':
        return 'text-accent-600 bg-accent-100 border-accent-200';
      case 'orange':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'red':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-neutral-600 bg-neutral-100 border-neutral-200';
    }
  };

  const getPositionSuffix = (position) => {
    if (position === 1) return 'st';
    if (position === 2) return 'nd';
    if (position === 3) return 'rd';
    return 'th';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
        <div className="container-max section-padding">
          <Card className="text-center py-12">
            <Card.Content>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Generating report card...</p>
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
            Student Report Cards
          </h1>
          <p className="text-neutral-600">
            Generate comprehensive academic reports with color-coded grade bands
          </p>
        </div>

        {/* Selection Filters */}
        <Card className="mb-6">
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setSelectedStudent(''); // Reset student selection
                  }}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
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

              {/* Student Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Select Student
                </label>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Choose a student</option>
                  {students[selectedClass]?.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.admissionNo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* No Student Selected */}
        {!selectedStudent && (
          <Card className="text-center py-12">
            <Card.Content>
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Select a Student
              </h3>
              <p className="text-neutral-600">
                Choose a student from the dropdown above to generate their report card
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Report Card */}
        {selectedStudent && reportData && (
          <div className="space-y-6">
            {/* Report Card Header */}
            <Card>
              <Card.Content>
                <div className="text-center border-b border-neutral-200 pb-6 mb-6">
                  <h1 className="text-2xl font-bold text-primary-800 mb-2">
                    ACADEMIC REPORT CARD
                  </h1>
                  <p className="text-lg text-neutral-700">
                    {reportData.student.session} Academic Session
                  </p>
                  <p className="text-neutral-600">
                    {reportData.student.term} • {reportData.student.class}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-3">Student Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Name:</span>
                        <span className="font-medium">{reportData.student.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Admission No:</span>
                        <span className="font-medium">{reportData.student.admissionNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Class:</span>
                        <span className="font-medium">{reportData.student.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Gender:</span>
                        <span className="font-medium">{reportData.student.gender}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-3">Term Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Session:</span>
                        <span className="font-medium">{reportData.student.session}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Term:</span>
                        <span className="font-medium">{reportData.student.term}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Resumption:</span>
                        <span className="font-medium">{new Date(reportData.termDates.resumption).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Vacation:</span>
                        <span className="font-medium">{new Date(reportData.termDates.vacation).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Academic Performance Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="text-center">
                <Card.Content>
                  <div className={`text-2xl font-bold mb-1 px-3 py-1 rounded-lg ${getGradeColor(reportData.summary.overallGrade)}`}>
                    {reportData.summary.overallGrade}
                  </div>
                  <div className="text-sm text-neutral-600">Overall Grade</div>
                </Card.Content>
              </Card>

              <Card className="text-center">
                <Card.Content>
                  <div className="text-2xl font-bold text-primary-600 mb-1">
                    {reportData.summary.averageScore}%
                  </div>
                  <div className="text-sm text-neutral-600">Average Score</div>
                </Card.Content>
              </Card>

              <Card className="text-center">
                <Card.Content>
                  <div className="text-2xl font-bold text-secondary-600 mb-1">
                    {reportData.summary.classPosition}{getPositionSuffix(reportData.summary.classPosition)}
                  </div>
                  <div className="text-sm text-neutral-600">Class Position</div>
                </Card.Content>
              </Card>

              <Card className="text-center">
                <Card.Content>
                  <div className="text-2xl font-bold text-accent-600 mb-1">
                    {reportData.summary.gpa}
                  </div>
                  <div className="text-sm text-neutral-600">GPA</div>
                </Card.Content>
              </Card>
            </div>

            {/* Subject Performance */}
            <Card>
              <Card.Header>
                <Card.Title className="text-primary-800">Subject Performance</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary-50 border-b border-primary-200">
                        <th className="text-left p-3 font-semibold text-primary-800">Subject</th>
                        <th className="text-center p-3 font-semibold text-primary-800">CA (20)</th>
                        <th className="text-center p-3 font-semibold text-primary-800">Exam (80)</th>
                        <th className="text-center p-3 font-semibold text-primary-800">Total (100)</th>
                        <th className="text-center p-3 font-semibold text-primary-800">Grade</th>
                        <th className="text-center p-3 font-semibold text-primary-800">Position</th>
                        <th className="text-left p-3 font-semibold text-primary-800">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.subjects.map((subject, index) => (
                        <tr key={subject.name} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                          <td className="p-3 font-medium">{subject.name}</td>
                          <td className="p-3 text-center">{subject.ca}</td>
                          <td className="p-3 text-center">{subject.exam}</td>
                          <td className="p-3 text-center font-semibold">{subject.total}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-1 rounded border font-medium ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                          <td className="p-3 text-center font-semibold">
                            {subject.position}{getPositionSuffix(subject.position)}
                          </td>
                          <td className="p-3 text-xs">{subject.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Performance Chart */}
                <div className="mt-6">
                  <h4 className="font-medium text-neutral-800 mb-3">Subject Performance Chart</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={reportData.subjects}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ca" fill="#d97706" name="CA (20)" />
                      <Bar dataKey="exam" fill="#2563eb" name="Exam (80)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Content>
            </Card>

            {/* Grade Distribution */}
            <Card>
              <Card.Header>
                <Card.Title className="text-primary-800">Grade Distribution & Key</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {gradeRanges.map((range) => {
                    const subjectCount = reportData.subjects.filter(s => s.grade === range.grade).length;
                    return (
                      <div key={range.grade} className="text-center">
                        <div className={`text-lg font-bold mb-1 px-3 py-2 rounded-lg border ${getGradeColor(range.grade)}`}>
                          {range.grade}
                        </div>
                        <div className="text-xs text-neutral-600">{range.min}-{range.max}%</div>
                        <div className="text-xs text-neutral-600">{range.label}</div>
                        <div className="text-sm font-semibold text-primary-600">{subjectCount} subjects</div>
                      </div>
                    );
                  })}
                </div>
              </Card.Content>
            </Card>

            {/* Attendance Record */}
            <Card>
              <Card.Header>
                <Card.Title className="text-primary-800">Attendance Record</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary-600">{reportData.attendance.daysInTerm}</div>
                    <div className="text-sm text-neutral-600">Days in Term</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary-600">{reportData.attendance.daysPresent}</div>
                    <div className="text-sm text-neutral-600">Days Present</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-accent-600">{reportData.attendance.daysLate}</div>
                    <div className="text-sm text-neutral-600">Days Late</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">{reportData.attendance.daysAbsent}</div>
                    <div className="text-sm text-neutral-600">Days Absent</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-600">{reportData.attendance.attendanceRate}%</div>
                    <div className="text-sm text-neutral-600">Attendance Rate</div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Comments Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Card.Header>
                  <Card.Title className="text-primary-800">Class Teacher's Comment</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-neutral-700 italic">
                      "{reportData.classTeacherComment}"
                    </p>
                  </div>
                  <div className="mt-3 text-right">
                    <div className="text-sm font-medium text-neutral-800">Mrs. Adunni Oladele</div>
                    <div className="text-xs text-neutral-600">Class Teacher</div>
                  </div>
                </Card.Content>
              </Card>

              <Card>
                <Card.Header>
                  <Card.Title className="text-primary-800">Principal's Comment</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-sm text-neutral-700 italic">
                      "{reportData.principalComment}"
                    </p>
                  </div>
                  <div className="mt-3 text-right">
                    <div className="text-sm font-medium text-neutral-800">Dr. Olumide Bakare</div>
                    <div className="text-xs text-neutral-600">Principal</div>
                  </div>
                </Card.Content>
              </Card>
            </div>

            {/* Promotion Status */}
            <Card>
              <Card.Content>
                <div className="text-center">
                  <div className={`inline-block px-6 py-3 rounded-lg text-lg font-bold ${
                    reportData.summary.promoted 
                      ? 'bg-secondary-100 text-secondary-800 border border-secondary-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {reportData.summary.promoted ? 'PROMOTED TO NEXT CLASS' : 'REPEAT CLASS'}
                  </div>
                  <div className="mt-4 text-sm text-neutral-600">
                    Next Term Resumes: <span className="font-semibold">{new Date(reportData.termDates.nextResumption).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-neutral-200">
              <Button variant="primary">
                Download PDF Report
              </Button>
              <Button variant="secondary">
                Print Report Card
              </Button>
              <Button variant="accent">
                Email to Parent
              </Button>
              <Button variant="outline">
                Generate Batch Reports
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeReports;
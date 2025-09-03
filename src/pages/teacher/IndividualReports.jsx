// File location: src/pages/teacher/IndividualReports.jsx
import React, { useState, useEffect } from 'react';
import { FileText, Download, User, Printer, Calendar } from 'lucide-react';

const IndividualReports = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('first');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock students data
  const students = [
    { id: 1, name: 'Adebayo John', class: 'JSS 1A', admissionNumber: 'SCH/2024/001' },
    { id: 2, name: 'Fatima Mohammed', class: 'JSS 1A', admissionNumber: 'SCH/2024/002' },
    { id: 3, name: 'Chinyere Okafor', class: 'JSS 2B', admissionNumber: 'SCH/2024/003' }
  ];

  // Mock report data
  const mockReportData = {
    student: { name: 'Adebayo John', class: 'JSS 1A', admissionNumber: 'SCH/2024/001' },
    term: 'First Term 2024',
    academic_year: '2024/2025',
    subjects: [
      {
        name: 'Mathematics',
        test1: 8,
        test2: 7,
        assignment: 9,
        exam: 48,
        total: 72,
        grade: 'B',
        position: 5,
        teacher: 'Mr. Johnson',
        remarks: 'Good performance. Shows understanding of concepts.'
      },
      {
        name: 'English Language',
        test1: 9,
        test2: 8,
        assignment: 10,
        exam: 52,
        total: 79,
        grade: 'B',
        position: 3,
        teacher: 'Mrs. Adebayo',
        remarks: 'Excellent written expression. Continue reading widely.'
      },
      {
        name: 'Basic Science',
        test1: 6,
        test2: 7,
        assignment: 8,
        exam: 42,
        total: 63,
        grade: 'C',
        position: 8,
        teacher: 'Dr. Okonkwo',
        remarks: 'Needs more practice in practical applications.'
      }
    ],
    attendance: {
      days_present: 45,
      days_absent: 5,
      total_days: 50,
      percentage: 90
    },
    overall: {
      total_marks: 214,
      average: 71.3,
      grade: 'B',
      position: '5th out of 25',
      next_term_begins: '2024-04-15'
    },
    teacher_comment: 'John is a dedicated student who shows consistent effort across all subjects. He should focus more on practical applications in science subjects.',
    principal_comment: 'A good student with potential for excellence. Keep up the good work.'
  };

  useEffect(() => {
    if (selectedStudent) {
      setLoading(true);
      setTimeout(() => {
        setReportData(mockReportData);
        setLoading(false);
      }, 800);
    }
  }, [selectedStudent, selectedTerm]);

  const handlePrintReport = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    // Mock download functionality
    alert('Report download functionality would be implemented here');
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'grade-excellent';
      case 'B': return 'grade-good';
      case 'C': return 'grade-good';
      case 'D': return 'grade-average';
      default: return 'grade-poor';
    }
  };

  return (
    <div className="container-max py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Individual Reports</h1>
        <p className="text-neutral-600">Generate and view comprehensive student academic reports</p>
      </div>

      {/* Selection Form */}
      <div className="card-base mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Select Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="input-base w-full"
            >
              <option value="">Choose a student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} - {student.class}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Term
            </label>
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
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm">
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-800">Academic Report</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrintReport}
                className="btn-outline flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button
                onClick={handleDownloadReport}
                className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Report Content */}
          <div className="p-6">
            {/* School Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-primary-800 mb-1">NIGERIAN SECONDARY SCHOOL</h1>
              <p className="text-neutral-600">Excellence in Education</p>
              <p className="text-sm text-neutral-500">Academic Report Card</p>
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">Name:</span>
                  <span>{reportData.student.name}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">Class:</span>
                  <span>{reportData.student.class}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">Admission No:</span>
                  <span>{reportData.student.admissionNumber}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">Term:</span>
                  <span>{reportData.term}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">Session:</span>
                  <span>{reportData.academic_year}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-neutral-700 w-32">Next Term:</span>
                  <span>{reportData.overall.next_term_begins}</span>
                </div>
              </div>
            </div>

            {/* Academic Performance */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Academic Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary-600 text-white">
                      <th className="px-3 py-2 text-left">Subject</th>
                      <th className="px-3 py-2 text-center">1st Test (10)</th>
                      <th className="px-3 py-2 text-center">2nd Test (10)</th>
                      <th className="px-3 py-2 text-center">Assignment (10)</th>
                      <th className="px-3 py-2 text-center">Exam (70)</th>
                      <th className="px-3 py-2 text-center">Total (100)</th>
                      <th className="px-3 py-2 text-center">Grade</th>
                      <th className="px-3 py-2 text-center mobile-hidden">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.subjects.map((subject, index) => (
                      <tr key={subject.name} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                        <td className="px-3 py-2 font-medium">{subject.name}</td>
                        <td className="px-3 py-2 text-center">{subject.test1}</td>
                        <td className="px-3 py-2 text-center">{subject.test2}</td>
                        <td className="px-3 py-2 text-center">{subject.assignment}</td>
                        <td className="px-3 py-2 text-center">{subject.exam}</td>
                        <td className="px-3 py-2 text-center font-semibold">{subject.total}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`${getGradeColor(subject.grade)} px-2 py-1 rounded text-white text-xs font-medium`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center mobile-hidden">{subject.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-800">Overall Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Marks:</span>
                    <span className="font-medium">{reportData.overall.total_marks}/300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average:</span>
                    <span className="font-medium">{reportData.overall.average}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overall Grade:</span>
                    <span className={`${getGradeColor(reportData.overall.grade)} px-2 py-1 rounded text-white text-sm font-medium`}>
                      {reportData.overall.grade}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Class Position:</span>
                    <span className="font-medium">{reportData.overall.position}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-neutral-800">Attendance Record</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Days Present:</span>
                    <span className="font-medium text-secondary-600">{reportData.attendance.days_present}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Absent:</span>
                    <span className="font-medium text-red-600">{reportData.attendance.days_absent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total School Days:</span>
                    <span className="font-medium">{reportData.attendance.total_days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance Rate:</span>
                    <span className="font-medium text-secondary-600">{reportData.attendance.percentage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Remarks */}
            <div className="mb-8">
              <h4 className="font-semibold text-neutral-800 mb-4">Subject Teachers' Remarks</h4>
              <div className="space-y-3">
                {reportData.subjects.map(subject => (
                  <div key={subject.name} className="bg-neutral-50 p-3 rounded-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div>
                        <span className="font-medium text-neutral-800">{subject.name}</span>
                        <span className="text-sm text-neutral-600 ml-2">- {subject.teacher}</span>
                      </div>
                      <p className="text-sm text-neutral-700">{subject.remarks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-neutral-800 mb-3">Class Teacher's Comment</h4>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-700">{reportData.teacher_comment}</p>
                  <div className="mt-3 pt-3 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500">Signature: ________________</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-800 mb-3">Principal's Comment</h4>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-700">{reportData.principal_comment}</p>
                  <div className="mt-3 pt-3 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500">Signature: ________________</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grading System */}
            <div className="border-t border-neutral-200 pt-6">
              <h4 className="font-semibold text-neutral-800 mb-3">Grading System</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                <div className="text-center">
                  <div className="grade-excellent px-2 py-1 rounded text-white font-medium mb-1">A</div>
                  <p className="text-xs">80-100</p>
                </div>
                <div className="text-center">
                  <div className="grade-good px-2 py-1 rounded text-white font-medium mb-1">B</div>
                  <p className="text-xs">70-79</p>
                </div>
                <div className="text-center">
                  <div className="grade-good px-2 py-1 rounded text-white font-medium mb-1">C</div>
                  <p className="text-xs">60-69</p>
                </div>
                <div className="text-center">
                  <div className="grade-average px-2 py-1 rounded text-white font-medium mb-1">D</div>
                  <p className="text-xs">50-59</p>
                </div>
                <div className="text-center">
                  <div className="grade-poor px-2 py-1 rounded text-white font-medium mb-1">F</div>
                  <p className="text-xs">0-49</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedStudent && (
        <div className="card-base text-center py-12">
          <FileText className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">Select Student</h3>
          <p className="text-neutral-500">Choose a student to generate their individual academic report</p>
        </div>
      )}
    </div>
  );
};

export default IndividualReports;
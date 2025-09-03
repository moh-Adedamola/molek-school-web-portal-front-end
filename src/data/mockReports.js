// File Location: src/data/mockReports.js
// Pre-generated reports for different user roles

// Report templates and configurations
export const reportTypes = {
  STUDENT_PROGRESS: 'student_progress',
  CLASS_PERFORMANCE: 'class_performance',
  ATTENDANCE_SUMMARY: 'attendance_summary',
  ACADEMIC_ANALYTICS: 'academic_analytics',
  PARENT_SUMMARY: 'parent_summary',
  TEACHER_PERFORMANCE: 'teacher_performance',
  SCHOOL_OVERVIEW: 'school_overview'
};

// Super Admin Reports
export const superAdminReports = [
  {
    id: 'report_sa_001',
    title: 'School Performance Overview',
    type: reportTypes.SCHOOL_OVERVIEW,
    generatedBy: 'System',
    generatedAt: '2024-12-10T09:00:00Z',
    period: 'First Term 2024/2025',
    data: {
      totalStudents: 847,
      totalTeachers: 42,
      totalParents: 623,
      overallAttendance: 91.2,
      overallPerformance: 73.8,
      classDistribution: {
        JSS: 456,
        SSS: 391
      },
      topPerformingClasses: ['SSS3A', 'JSS1B', 'SSS2A'],
      concernAreas: ['JSS3C', 'SSS1D']
    },
    charts: {
      attendanceTrend: [89, 91, 90, 93, 92, 91, 88, 91],
      performanceTrend: [71, 72, 74, 73, 75, 74, 73, 72]
    },
    accessLevel: 'super_admin'
  },
  {
    id: 'report_sa_002',
    title: 'Teacher Performance Analytics',
    type: reportTypes.TEACHER_PERFORMANCE,
    generatedBy: 'System',
    generatedAt: '2024-12-09T14:30:00Z',
    period: 'First Term 2024/2025',
    data: {
      totalTeachers: 42,
      avgClassPerformance: 73.8,
      topTeachers: [
        { id: 'T001', name: 'Mrs. Adebayo', avgScore: 82.1, subjects: ['English'] },
        { id: 'T005', name: 'Mr. Okafor', avgScore: 79.8, subjects: ['Physics'] }
      ],
      attendanceMarking: {
        compliant: 38,
        delayed: 4,
        percentage: 90.5
      }
    },
    accessLevel: 'super_admin'
  }
];

// Admin Reports
export const adminReports = [
  {
    id: 'report_admin_001',
    title: 'Academic Performance Summary',
    type: reportTypes.ACADEMIC_ANALYTICS,
    generatedBy: 'A001',
    generatedAt: '2024-12-10T11:15:00Z',
    period: 'First Term 2024/2025',
    data: {
      totalClasses: 24,
      avgClassSize: 35.3,
      overallGPA: 2.8,
      subjectPerformance: {
        'Mathematics': { avg: 71.2, pass: 78, fail: 22 },
        'English Language': { avg: 78.5, pass: 85, fail: 15 },
        'Physics': { avg: 68.3, pass: 72, fail: 28 }
      },
      waecPrediction: {
        'A1-C6': 68,
        'D7-E8': 23,
        'F9': 9
      }
    },
    accessLevel: 'admin'
  },
  {
    id: 'report_admin_002',
    title: 'Student Enrollment & Demographics',
    type: reportTypes.SCHOOL_OVERVIEW,
    generatedBy: 'A001',
    generatedAt: '2024-12-09T16:20:00Z',
    period: 'Academic Year 2024/2025',
    data: {
      enrollment: {
        JSS1: 142, JSS2: 156, JSS3: 158,
        SSS1: 131, SSS2: 128, SSS3: 132
      },
      genderDistribution: { male: 52, female: 48 },
      streamDistribution: {
        sciences: 45, arts: 32, commercial: 23
      }
    },
    accessLevel: 'admin'
  }
];

// Teacher Reports
export const teacherReports = [
  {
    id: 'report_teacher_001',
    title: 'My Classes Performance',
    type: reportTypes.CLASS_PERFORMANCE,
    generatedBy: 'T001',
    generatedAt: '2024-12-10T08:45:00Z',
    period: 'First Term 2024/2025',
    teacherId: 'T001',
    data: {
      assignedClasses: ['JSS1A', 'JSS2A', 'JSS3A'],
      subject: 'English Language',
      classAverages: {
        'JSS1A': 75.8,
        'JSS2A': 78.5,
        'JSS3A': 82.1
      },
      topStudents: [
        { id: 'S001', name: 'Adebayo Johnson', score: 92 },
        { id: 'S015', name: 'Grace Okafor', score: 89 }
      ],
      strugglingStudents: [
        { id: 'S023', name: 'Musa Ibrahim', score: 45 },
        { id: 'S031', name: 'Kemi Adeyemi', score: 48 }
      ]
    },
    accessLevel: 'teacher'
  },
  {
    id: 'report_teacher_002',
    title: 'Attendance Summary - My Classes',
    type: reportTypes.ATTENDANCE_SUMMARY,
    generatedBy: 'T001',
    generatedAt: '2024-12-09T15:30:00Z',
    period: 'First Term 2024/2025',
    teacherId: 'T001',
    data: {
      overallAttendance: 91.5,
      classAttendance: {
        'JSS1A': 94.2,
        'JSS2A': 89.8,
        'JSS3A': 90.5
      },
      chronicAbsentees: [
        { studentId: 'S012', name: 'Ahmed Hassan', days: 12 },
        { studentId: 'S028', name: 'Blessing Okoro', days: 8 }
      ]
    },
    accessLevel: 'teacher'
  }
];

// Parent Reports
export const parentReports = [
  {
    id: 'report_parent_001',
    title: 'Adebayo Johnson - Progress Report',
    type: reportTypes.STUDENT_PROGRESS,
    generatedBy: 'System',
    generatedAt: '2024-12-10T12:00:00Z',
    period: 'First Term 2024/2025',
    parentId: 'P001',
    studentId: 'S001',
    data: {
      student: {
        name: 'Adebayo Johnson',
        class: 'JSS2A',
        position: 5,
        outOf: 35
      },
      subjects: [
        {
          name: 'English Language',
          score: 82,
          grade: 'A',
          teacher: 'Mrs. Adebayo',
          remarks: 'Excellent comprehension skills'
        },
        {
          name: 'Mathematics',
          score: 76,
          grade: 'B',
          teacher: 'Mr. Okonkwo',
          remarks: 'Good improvement in algebra'
        }
      ],
      attendance: {
        rate: 94.4,
        present: 68,
        absent: 3,
        late: 1
      },
      nextTermFees: 85000,
      parentMeeting: '2024-12-18T14:00:00Z'
    },
    accessLevel: 'parent'
  }
];

// Report generation queue
export const reportQueue = [
  {
    id: 'queue_001',
    type: reportTypes.ACADEMIC_ANALYTICS,
    requestedBy: 'A001',
    requestedAt: '2024-12-10T13:30:00Z',
    status: 'processing',
    estimatedCompletion: '2024-12-10T14:00:00Z',
    parameters: {
      period: 'First Term 2024/2025',
      includeCharts: true,
      format: 'PDF'
    }
  },
  {
    id: 'queue_002',
    type: reportTypes.PARENT_SUMMARY,
    requestedBy: 'P001',
    requestedAt: '2024-12-10T13:25:00Z',
    status: 'completed',
    completedAt: '2024-12-10T13:28:00Z',
    downloadUrl: '/reports/parent_summary_P001.pdf'
  }
];

export default {
  superAdminReports,
  adminReports,
  teacherReports,
  parentReports,
  reportQueue
};
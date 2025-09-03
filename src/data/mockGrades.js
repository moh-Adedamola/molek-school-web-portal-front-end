// File Location: src/data/mockGrades.js
// WAEC/NECO-focused grading with teacher and parent visibility

// Nigerian grading system standards
export const gradingSystem = {
  waec: {
    'A1': { min: 75, max: 100, grade: 'A1', interpretation: 'Excellent', points: 6 },
    'B2': { min: 70, max: 74, grade: 'B2', interpretation: 'Very Good', points: 5 },
    'B3': { min: 65, max: 69, grade: 'B3', interpretation: 'Good', points: 4 },
    'C4': { min: 60, max: 64, grade: 'C4', interpretation: 'Credit', points: 3 },
    'C5': { min: 55, max: 59, grade: 'C5', interpretation: 'Credit', points: 2 },
    'C6': { min: 50, max: 54, grade: 'C6', interpretation: 'Credit', points: 1 },
    'D7': { min: 45, max: 49, grade: 'D7', interpretation: 'Pass', points: 1 },
    'E8': { min: 40, max: 44, grade: 'E8', interpretation: 'Pass', points: 1 },
    'F9': { min: 0, max: 39, grade: 'F9', interpretation: 'Fail', points: 0 }
  },
  school: {
    'A': { min: 80, max: 100, grade: 'A', interpretation: 'Excellent' },
    'B': { min: 70, max: 79, grade: 'B', interpretation: 'Very Good' },
    'C': { min: 60, max: 69, grade: 'C', interpretation: 'Good' },
    'D': { min: 50, max: 59, grade: 'D', interpretation: 'Pass' },
    'F': { min: 0, max: 49, grade: 'F', interpretation: 'Fail' }
  }
};

// Assessment types
export const assessmentTypes = {
  CA1: { name: 'Continuous Assessment 1', weight: 10, maxScore: 10 },
  CA2: { name: 'Continuous Assessment 2', weight: 10, maxScore: 10 },
  CA3: { name: 'Continuous Assessment 3', weight: 10, maxScore: 10 },
  EXAM: { name: 'Terminal Examination', weight: 70, maxScore: 70 }
};

// Mock grades data
export const mockGrades = {
  // Student grade records
  'S001': {
    studentId: 'S001',
    name: 'Adebayo Johnson',
    class: 'JSS2A',
    term: 'First Term',
    year: '2024/2025',
    subjects: [
      {
        subjectId: 'eng',
        subjectName: 'English Language',
        teacherId: 'T001',
        assessments: {
          CA1: { score: 8, maxScore: 10, date: '2024-10-15' },
          CA2: { score: 7, maxScore: 10, date: '2024-11-12' },
          CA3: { score: 9, maxScore: 10, date: '2024-11-26' },
          EXAM: { score: 58, maxScore: 70, date: '2024-12-10' }
        },
        totalScore: 82,
        grade: 'A',
        position: 3,
        classAverage: 78.5,
        remarks: 'Excellent performance in comprehension'
      },
      {
        subjectId: 'math',
        subjectName: 'Mathematics',
        teacherId: 'T003',
        assessments: {
          CA1: { score: 9, maxScore: 10, date: '2024-10-16' },
          CA2: { score: 8, maxScore: 10, date: '2024-11-13' },
          CA3: { score: 7, maxScore: 10, date: '2024-11-27' },
          EXAM: { score: 52, maxScore: 70, date: '2024-12-11' }
        },
        totalScore: 76,
        grade: 'B',
        position: 8,
        classAverage: 71.2,
        remarks: 'Good improvement in algebra'
      }
    ],
    termSummary: {
      totalSubjects: 10,
      totalScore: 742,
      averageScore: 74.2,
      position: 5,
      outOf: 35,
      promoted: true
    }
  },
  'S002': {
    studentId: 'S002',
    name: 'Fatima Ibrahim',
    class: 'SSS1B',
    term: 'First Term',
    year: '2024/2025',
    subjects: [
      {
        subjectId: 'phy',
        subjectName: 'Physics',
        teacherId: 'T005',
        assessments: {
          CA1: { score: 9, maxScore: 10, date: '2024-10-15' },
          CA2: { score: 10, maxScore: 10, date: '2024-11-12' },
          CA3: { score: 8, maxScore: 10, date: '2024-11-26' },
          EXAM: { score: 61, maxScore: 70, date: '2024-12-10' }
        },
        totalScore: 88,
        grade: 'A',
        position: 1,
        classAverage: 68.3,
        remarks: 'Outstanding performance in mechanics'
      },
      {
        subjectId: 'che',
        subjectName: 'Chemistry',
        teacherId: 'T006',
        assessments: {
          CA1: { score: 7, maxScore: 10, date: '2024-10-16' },
          CA2: { score: 8, maxScore: 10, date: '2024-11-13' },
          CA3: { score: 9, maxScore: 10, date: '2024-11-27' },
          EXAM: { score: 55, maxScore: 70, date: '2024-12-11' }
        },
        totalScore: 79,
        grade: 'B',
        position: 4,
        classAverage: 74.1,
        remarks: 'Strong understanding of organic chemistry'
      }
    ],
    termSummary: {
      totalSubjects: 9,
      totalScore: 721,
      averageScore: 80.1,
      position: 2,
      outOf: 32,
      promoted: true
    }
  }
};

// Teacher grade entry interface
export const teacherGradeView = {
  'T001': {
    teacherId: 'T001',
    subjects: ['English Language'],
    classes: ['JSS1A', 'JSS2A', 'JSS3A'],
    currentAssignment: {
      type: 'CA2',
      dueDate: '2024-11-15',
      completed: 75,
      total: 105,
      pending: ['JSS3A']
    },
    recentEntries: [
      {
        studentId: 'S001',
        studentName: 'Adebayo Johnson',
        subject: 'English Language',
        assessment: 'CA1',
        score: 8,
        enteredAt: '2024-10-15T10:30:00Z'
      }
    ]
  },
  'T005': {
    teacherId: 'T005',
    subjects: ['Physics'],
    classes: ['SSS1A', 'SSS1B', 'SSS2A'],
    currentAssignment: {
      type: 'EXAM',
      dueDate: '2024-12-15',
      completed: 42,
      total: 89,
      pending: ['SSS2A']
    },
    recentEntries: [
      {
        studentId: 'S002',
        studentName: 'Fatima Ibrahim',
        subject: 'Physics',
        assessment: 'CA3',
        score: 8,
        enteredAt: '2024-11-26T14:15:00Z'
      }
    ]
  }
};

// Parent grade view (children only)
export const parentGradeView = {
  'P001': {
    parentId: 'P001',
    children: [
      {
        studentId: 'S001',
        name: 'Adebayo Johnson',
        class: 'JSS2A',
        currentTerm: 'First Term',
        overallAverage: 74.2,
        position: 5,
        totalStudents: 35,
        recentGrades: [
          {
            subject: 'English Language',
            lastAssessment: 'CA3',
            score: 9,
            grade: 'A',
            date: '2024-11-26'
          },
          {
            subject: 'Mathematics',
            lastAssessment: 'CA3',
            score: 7,
            grade: 'B',
            date: '2024-11-27'
          }
        ],
        alerts: [
          {
            type: 'improvement',
            subject: 'Mathematics',
            message: 'Score improved by 15% from last term'
          }
        ]
      }
    ]
  }
};

// Grade analytics and reports
export const gradeAnalytics = {
  classPerformance: {
    'JSS2A': {
      classId: 'JSS2A',
      totalStudents: 35,
      averageScore: 72.8,
      topPerformers: ['S003', 'S001', 'S007'],
      needsAttention: ['S012', 'S018', 'S024'],
      subjectAnalysis: {
        'English Language': { average: 78.5, highest: 92, lowest: 45 },
        'Mathematics': { average: 71.2, highest: 89, lowest: 38 }
      }
    }
  },
  termComparison: {
    'S001': {
      firstTerm: 74.2,
      secondTerm: null,
      thirdTerm: null,
      trend: 'stable',
      improvement: '+2.8%'
    }
  },
  waecPreparation: {
    'SSS3A': {
      predictedGrades: {
        'English Language': 'B3',
        'Mathematics': 'C4',
        'Physics': 'B2',
        'Chemistry': 'C5',
        'Biology': 'C4'
      },
      readinessLevel: 72,
      recommendedActions: [
        'Focus on Mathematics weak areas',
        'Increase Chemistry practical sessions'
      ]
    }
  }
};

// Grade alerts and notifications
export const gradeAlerts = [
  {
    id: 'grade_alert_001',
    type: 'poor_performance',
    studentId: 'S012',
    studentName: 'Emeka Okonkwo',
    class: 'JSS2A',
    subject: 'Mathematics',
    currentScore: 38,
    threshold: 50,
    message: 'Student scoring below pass mark',
    severity: 'high',
    parentNotified: true,
    teacherAction: 'Extra tutorial recommended'
  },
  {
    id: 'grade_alert_002',
    type: 'declining_performance',
    studentId: 'S018',
    studentName: 'Aisha Mohammed',
    class: 'SSS1B',
    trend: 'downward',
    previousAverage: 78.5,
    currentAverage: 65.2,
    message: 'Student performance declining over term',
    severity: 'medium',
    parentNotified: false
  }
];

export default mockGrades;
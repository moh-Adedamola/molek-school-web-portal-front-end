// Mock Grades Data - Nigerian WAEC/NECO Focused System
export const mockGrades = [
  // JSS 1A Student Grades - First Term
  {
    id: 'grade_001',
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    className: 'JSS 1A',
    subject: 'Mathematics',
    subjectCode: 'MTH',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 32,
    midTermExam: 18,
    finalExam: 35,
    totalScore: 85,
    grade: 'A',
    gradePoint: 5,
    remarks: 'Excellent',
    position: 2,
    classSize: 32,
    teacherId: 'teacher_001',
    teacherName: 'Mrs. Adunni Olatunja',
    enteredAt: '2024-08-20T15:30:00Z'
  },
  {
    id: 'grade_002',
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    className: 'JSS 1A',
    subject: 'English Language',
    subjectCode: 'ENG',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 28,
    midTermExam: 16,
    finalExam: 32,
    totalScore: 76,
    grade: 'B',
    gradePoint: 4,
    remarks: 'Very Good',
    position: 5,
    classSize: 32,
    teacherId: 'teacher_002',
    teacherName: 'Mr. Ibrahim Hassan',
    enteredAt: '2024-08-20T15:30:00Z'
  },
  {
    id: 'grade_003',
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    className: 'JSS 1A',
    subject: 'Basic Science',
    subjectCode: 'BSC',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 35,
    midTermExam: 19,
    finalExam: 38,
    totalScore: 92,
    grade: 'A',
    gradePoint: 5,
    remarks: 'Excellent',
    position: 1,
    classSize: 32,
    teacherId: 'teacher_003',
    teacherName: 'Mrs. Chioma Okafor',
    enteredAt: '2024-08-20T15:30:00Z'
  },

  // SSS 1 Science Student Grades - First Term
  {
    id: 'grade_004',
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    subject: 'Physics',
    subjectCode: 'PHY',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 30,
    midTermExam: 17,
    finalExam: 36,
    totalScore: 83,
    grade: 'A',
    gradePoint: 5,
    remarks: 'Excellent',
    position: 3,
    classSize: 38,
    teacherId: 'teacher_005',
    teacherName: 'Dr. Fatima Mohammed',
    enteredAt: '2024-08-21T14:15:00Z'
  },
  {
    id: 'grade_005',
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    subject: 'Chemistry',
    subjectCode: 'CHE',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 34,
    midTermExam: 18,
    finalExam: 39,
    totalScore: 91,
    grade: 'A',
    gradePoint: 5,
    remarks: 'Excellent',
    position: 1,
    classSize: 38,
    teacherId: 'teacher_006',
    teacherName: 'Mr. Yusuf Abdullahi',
    enteredAt: '2024-08-21T14:15:00Z'
  },
  {
    id: 'grade_006',
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    subject: 'Biology',
    subjectCode: 'BIO',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 29,
    midTermExam: 16,
    finalExam: 33,
    totalScore: 78,
    grade: 'B',
    gradePoint: 4,
    remarks: 'Very Good',
    position: 4,
    classSize: 38,
    teacherId: 'teacher_003',
    teacherName: 'Mrs. Chioma Okafor',
    enteredAt: '2024-08-21T14:15:00Z'
  },
  {
    id: 'grade_007',
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    subject: 'Mathematics',
    subjectCode: 'MTH',
    term: '1st Term',
    academicYear: '2024/2025',
    continuousAssessment: 33,
    midTermExam: 19,
    finalExam: 37,
    totalScore: 89,
    grade: 'A',
    gradePoint: 5,
    remarks: 'Excellent',
    position: 2,
    classSize: 38,
    teacherId: 'teacher_001',
    teacherName: 'Mrs. Adunni Olatunja',
    enteredAt: '2024-08-21T14:15:00Z'
  }
];

// Student Grade Summary
export const mockGradeSummary = [
  {
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    className: 'JSS 1A',
    term: '1st Term',
    academicYear: '2024/2025',
    totalSubjects: 10,
    averageScore: 81.2,
    totalPoints: 44,
    gpa: 4.4,
    classPosition: 3,
    classSize: 32,
    gradeCounts: {
      A: 6,
      B: 3,
      C: 1,
      D: 0,
      F: 0
    },
    performanceLevel: 'excellent'
  },
  {
    studentId: 'student_002',
    studentName: 'Tunde Johnson',
    classId: 'jss1a',
    className: 'JSS 1A',
    term: '1st Term',
    academicYear: '2024/2025',
    totalSubjects: 10,
    averageScore: 74.5,
    totalPoints: 38,
    gpa: 3.8,
    classPosition: 8,
    classSize: 32,
    gradeCounts: {
      A: 3,
      B: 5,
      C: 2,
      D: 0,
      F: 0
    },
    performanceLevel: 'good'
  },
  {
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    term: '1st Term',
    academicYear: '2024/2025',
    totalSubjects: 10,
    averageScore: 86.7,
    totalPoints: 47,
    gpa: 4.7,
    classPosition: 2,
    classSize: 38,
    gradeCounts: {
      A: 8,
      B: 2,
      C: 0,
      D: 0,
      F: 0
    },
    performanceLevel: 'excellent'
  },
  {
    studentId: 'student_004',
    studentName: 'Fatima Nwosu',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    term: '1st Term',
    academicYear: '2024/2025',
    totalSubjects: 10,
    averageScore: 79.3,
    totalPoints: 42,
    gpa: 4.2,
    classPosition: 5,
    classSize: 38,
    gradeCounts: {
      A: 5,
      B: 4,
      C: 1,
      D: 0,
      F: 0
    },
    performanceLevel: 'good'
  }
];

// Nigerian Grading System Configuration
export const nigerianGradingSystem = {
  gradeScale: [
    { grade: 'A', range: '80-100', points: 5, description: 'Excellent', color: 'green' },
    { grade: 'B', range: '70-79', points: 4, description: 'Very Good', color: 'blue' },
    { grade: 'C', range: '60-69', points: 3, description: 'Good', color: 'yellow' },
    { grade: 'D', range: '50-59', points: 2, description: 'Pass', color: 'orange' },
    { grade: 'F', range: '0-49', points: 1, description: 'Fail', color: 'red' }
  ],
  
  assessmentStructure: {
    continuousAssessment: { weight: 40, description: 'Class work, assignments, quizzes' },
    midTermExam: { weight: 20, description: 'Mid-term examination' },
    finalExam: { weight: 40, description: 'End of term examination' }
  },

  performanceLevels: [
    { level: 'excellent', range: '80-100', description: 'Outstanding performance', color: 'green' },
    { level: 'good', range: '70-79', description: 'Good performance', color: 'blue' },
    { level: 'average', range: '60-69', description: 'Satisfactory performance', color: 'yellow' },
    { level: 'below_average', range: '50-59', description: 'Needs improvement', color: 'orange' },
    { level: 'poor', range: '0-49', description: 'Requires serious attention', color: 'red' }
  ]
};

// Grade helper functions
export const getGradesByStudent = (studentId, term = null) => {
  let grades = mockGrades.filter(grade => grade.studentId === studentId);
  if (term) {
    grades = grades.filter(grade => grade.term === term);
  }
  return grades;
};

export const getGradesByClass = (classId, subject = null, term = null) => {
  let grades = mockGrades.filter(grade => grade.classId === classId);
  if (subject) {
    grades = grades.filter(grade => grade.subject === subject);
  }
  if (term) {
    grades = grades.filter(grade => grade.term === term);
  }
  return grades;
};

export const calculateGrade = (totalScore) => {
  const gradeScale = nigerianGradingSystem.gradeScale;
  
  if (totalScore >= 80) return gradeScale.find(g => g.grade === 'A');
  if (totalScore >= 70) return gradeScale.find(g => g.grade === 'B');
  if (totalScore >= 60) return gradeScale.find(g => g.grade === 'C');
  if (totalScore >= 50) return gradeScale.find(g => g.grade === 'D');
  return gradeScale.find(g => g.grade === 'F');
};

export const calculateGPA = (grades) => {
  if (!grades.length) return 0;
  
  const totalPoints = grades.reduce((sum, grade) => sum + grade.gradePoint, 0);
  return Math.round((totalPoints / grades.length) * 100) / 100;
};

export const getStudentGradeSummary = (studentId, term = '1st Term') => {
  return mockGradeSummary.find(summary => 
    summary.studentId === studentId && summary.term === term
  );
};

export const getClassGradeAnalytics = (classId, term = '1st Term') => {
  const classGrades = mockGrades.filter(grade => 
    grade.classId === classId && grade.term === term
  );
  
  if (!classGrades.length) return null;
  
  const totalScores = classGrades.map(g => g.totalScore);
  const averageScore = totalScores.reduce((sum, score) => sum + score, 0) / totalScores.length;
  
  const gradeCounts = classGrades.reduce((acc, grade) => {
    acc[grade.grade] = (acc[grade.grade] || 0) + 1;
    return acc;
  }, {});
  
  return {
    totalRecords: classGrades.length,
    averageScore: Math.round(averageScore * 10) / 10,
    highestScore: Math.max(...totalScores),
    lowestScore: Math.min(...totalScores),
    gradeCounts,
    passRate: Math.round(((classGrades.filter(g => g.totalScore >= 50).length / classGrades.length) * 100))
  };
};

export const getSubjectPerformance = (subject, term = '1st Term') => {
  const subjectGrades = mockGrades.filter(grade => 
    grade.subject === subject && grade.term === term
  );
  
  if (!subjectGrades.length) return null;
  
  const scores = subjectGrades.map(g => g.totalScore);
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  return {
    subject,
    totalStudents: subjectGrades.length,
    averageScore: Math.round(average * 10) / 10,
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores),
    passRate: Math.round(((subjectGrades.filter(g => g.totalScore >= 50).length / subjectGrades.length) * 100))
  };
};

export const getPerformanceLevel = (averageScore) => {
  const levels = nigerianGradingSystem.performanceLevels;
  
  if (averageScore >= 80) return levels.find(l => l.level === 'excellent');
  if (averageScore >= 70) return levels.find(l => l.level === 'good');
  if (averageScore >= 60) return levels.find(l => l.level === 'average');
  if (averageScore >= 50) return levels.find(l => l.level === 'below_average');
  return levels.find(l => l.level === 'poor');
};

export const getGradeColor = (grade) => {
  const gradeInfo = nigerianGradingSystem.gradeScale.find(g => g.grade === grade);
  return gradeInfo ? gradeInfo.color : 'gray';
};

// WAEC Subject Mapping for SSS students
export const waecSubjects = {
  core: [
    { name: 'Mathematics', code: 'MTH', required: true },
    { name: 'English Language', code: 'ENG', required: true }
  ],
  science: [
    { name: 'Physics', code: 'PHY' },
    { name: 'Chemistry', code: 'CHE' },
    { name: 'Biology', code: 'BIO' },
    { name: 'Further Mathematics', code: 'F/MTH' },
    { name: 'Agricultural Science', code: 'AGR' }
  ],
  arts: [
    { name: 'Literature in English', code: 'LIT' },
    { name: 'History', code: 'HIS' },
    { name: 'Government', code: 'GOV' },
    { name: 'Economics', code: 'ECO' },
    { name: 'Geography', code: 'GEO' }
  ],
  commercial: [
    { name: 'Accounting', code: 'ACC' },
    { name: 'Economics', code: 'ECO' },
    { name: 'Commerce', code: 'COM' },
    { name: 'Business Studies', code: 'BUS' }
  ]
};

export default mockGrades;
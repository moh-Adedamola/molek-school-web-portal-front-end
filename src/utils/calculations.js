// utils/calculations.js - Grade calculations for Nigerian secondary school system

// Nigerian grading system constants
export const NIGERIAN_GRADING_SYSTEM = {
  // Grade boundaries (0-100 scale)
  GRADES: [
    { min: 80, max: 100, letter: 'A1', grade: 'Excellent', points: 6, color: 'green' },
    { min: 75, max: 79, letter: 'A2', grade: 'Very Good', points: 5, color: 'green' },
    { min: 70, max: 74, letter: 'B1', grade: 'Good', points: 4, color: 'blue' },
    { min: 65, max: 69, letter: 'B2', grade: 'Good', points: 3, color: 'blue' },
    { min: 60, max: 64, letter: 'C1', grade: 'Credit', points: 2, color: 'gold' },
    { min: 55, max: 59, letter: 'C2', grade: 'Credit', points: 1, color: 'gold' },
    { min: 50, max: 54, letter: 'D', grade: 'Pass', points: 0, color: 'orange' },
    { min: 0, max: 49, letter: 'F', grade: 'Fail', points: 0, color: 'red' },
  ],

  // Assessment weightings
  WEIGHTINGS: {
    CONTINUOUS_ASSESSMENT_1: 0.15, // 15%
    CONTINUOUS_ASSESSMENT_2: 0.15, // 15%
    EXAM: 0.70, // 70%
  },

  // Minimum pass scores
  PASS_MARKS: {
    GENERAL: 50,
    WAEC: 50,
    NECO: 50,
  },

  // Subject categories
  SUBJECT_CATEGORIES: {
    CORE: ['English Language', 'Mathematics', 'Civic Education', 'Basic Science', 'Basic Technology'],
    ARTS: ['Literature in English', 'Government', 'History', 'Christian Religious Studies', 'Islamic Religious Studies'],
    SCIENCES: ['Physics', 'Chemistry', 'Biology', 'Further Mathematics', 'Computer Science'],
    COMMERCIAL: ['Economics', 'Commerce', 'Accounting', 'Marketing', 'Business Studies'],
    VOCATIONAL: ['Home Economics', 'Agricultural Science', 'Technical Drawing', 'Visual Arts'],
  },
};

// ==================== GRADE CALCULATION FUNCTIONS ====================

/**
 * Calculate total score from assessment components
 * @param {Object} scores - Assessment scores
 * @param {number} scores.ca1 - First Continuous Assessment
 * @param {number} scores.ca2 - Second Continuous Assessment
 * @param {number} scores.exam - Exam score
 * @returns {number} Total weighted score
 */
export const calculateTotalScore = ({ ca1, ca2, exam }) => {
  const { WEIGHTINGS } = NIGERIAN_GRADING_SYSTEM;
  
  // Validate inputs
  if (ca1 < 0 || ca1 > 100 || ca2 < 0 || ca2 > 100 || exam < 0 || exam > 100) {
    throw new Error('All scores must be between 0 and 100');
  }

  const totalScore = (
    (ca1 * WEIGHTINGS.CONTINUOUS_ASSESSMENT_1) +
    (ca2 * WEIGHTINGS.CONTINUOUS_ASSESSMENT_2) +
    (exam * WEIGHTINGS.EXAM)
  );

  return Math.round(totalScore * 100) / 100; // Round to 2 decimal places
};

/**
 * Get grade information based on total score
 * @param {number} totalScore - Total calculated score
 * @returns {Object} Grade information
 */
export const getGradeInfo = (totalScore) => {
  const { GRADES } = NIGERIAN_GRADING_SYSTEM;
  
  const gradeInfo = GRADES.find(grade => 
    totalScore >= grade.min && totalScore <= grade.max
  );

  if (!gradeInfo) {
    throw new Error('Invalid score provided');
  }

  return {
    ...gradeInfo,
    score: totalScore,
    passed: totalScore >= NIGERIAN_GRADING_SYSTEM.PASS_MARKS.GENERAL,
  };
};

/**
 * Calculate complete grade information
 * @param {Object} assessments - All assessment scores
 * @returns {Object} Complete grade calculation
 */
export const calculateCompleteGrade = (assessments) => {
  const totalScore = calculateTotalScore(assessments);
  const gradeInfo = getGradeInfo(totalScore);

  return {
    assessments,
    totalScore,
    ...gradeInfo,
    breakdown: {
      ca1Weighted: assessments.ca1 * NIGERIAN_GRADING_SYSTEM.WEIGHTINGS.CONTINUOUS_ASSESSMENT_1,
      ca2Weighted: assessments.ca2 * NIGERIAN_GRADING_SYSTEM.WEIGHTINGS.CONTINUOUS_ASSESSMENT_2,
      examWeighted: assessments.exam * NIGERIAN_GRADING_SYSTEM.WEIGHTINGS.EXAM,
    },
  };
};

// ==================== STUDENT PERFORMANCE CALCULATIONS ====================

/**
 * Calculate student's overall performance for a term
 * @param {Array} subjects - Array of subject grades
 * @returns {Object} Overall performance metrics
 */
export const calculateTermPerformance = (subjects) => {
  if (!subjects || subjects.length === 0) {
    throw new Error('No subjects provided');
  }

  const totalSubjects = subjects.length;
  const totalPoints = subjects.reduce((sum, subject) => sum + (subject.points || 0), 0);
  const totalScores = subjects.reduce((sum, subject) => sum + (subject.totalScore || 0), 0);
  
  const averageScore = totalScores / totalSubjects;
  const averagePoints = totalPoints / totalSubjects;
  
  const passedSubjects = subjects.filter(subject => subject.passed).length;
  const failedSubjects = totalSubjects - passedSubjects;
  
  // Grade the overall performance
  const overallGrade = getGradeInfo(averageScore);

  return {
    totalSubjects,
    passedSubjects,
    failedSubjects,
    averageScore: Math.round(averageScore * 100) / 100,
    averagePoints: Math.round(averagePoints * 100) / 100,
    overallGrade,
    passRate: Math.round((passedSubjects / totalSubjects) * 100),
    performance: {
      excellent: subjects.filter(s => s.letter?.startsWith('A')).length,
      good: subjects.filter(s => s.letter?.startsWith('B')).length,
      credit: subjects.filter(s => s.letter?.startsWith('C')).length,
      pass: subjects.filter(s => s.letter === 'D').length,
      fail: subjects.filter(s => s.letter === 'F').length,
    },
  };
};

/**
 * Calculate class average for a subject
 * @param {Array} studentGrades - Array of student grades for a subject
 * @returns {Object} Class performance metrics
 */
export const calculateClassAverage = (studentGrades) => {
  if (!studentGrades || studentGrades.length === 0) {
    return {
      average: 0,
      highest: 0,
      lowest: 0,
      totalStudents: 0,
      passRate: 0,
      gradeDistribution: {},
    };
  }

  const scores = studentGrades.map(grade => grade.totalScore || 0);
  const totalStudents = scores.length;
  const average = scores.reduce((sum, score) => sum + score, 0) / totalStudents;
  const highest = Math.max(...scores);
  const lowest = Math.min(...scores);
  const passedStudents = studentGrades.filter(grade => grade.passed).length;
  
  // Grade distribution
  const gradeDistribution = {};
  NIGERIAN_GRADING_SYSTEM.GRADES.forEach(grade => {
    gradeDistribution[grade.letter] = studentGrades.filter(
      student => student.letter === grade.letter
    ).length;
  });

  return {
    average: Math.round(average * 100) / 100,
    highest,
    lowest,
    totalStudents,
    passedStudents,
    passRate: Math.round((passedStudents / totalStudents) * 100),
    gradeDistribution,
    averageGrade: getGradeInfo(average),
  };
};

// ==================== WAEC/NECO SPECIFIC CALCULATIONS ====================

/**
 * Calculate WAEC eligibility based on O'Level results
 * @param {Array} subjects - Array of WAEC subjects with grades
 * @returns {Object} WAEC eligibility status
 */
export const calculateWAECEligibility = (subjects) => {
  const coreSubjects = ['English Language', 'Mathematics'];
  const requiredPasses = 5; // Minimum 5 credits including English and Math
  
  const credits = subjects.filter(subject => 
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(subject.letter)
  );
  
  const coreSubjectsPassed = coreSubjects.every(coreSubject =>
    subjects.some(subject => 
      subject.name === coreSubject && 
      ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(subject.letter)
    )
  );

  const eligible = credits.length >= requiredPasses && coreSubjectsPassed;

  return {
    eligible,
    totalCredits: credits.length,
    requiredCredits: requiredPasses,
    coreSubjectsPassed,
    missingRequirements: !eligible ? {
      needMoreCredits: credits.length < requiredPasses,
      needCoreSubjects: !coreSubjectsPassed,
    } : null,
  };
};

/**
 * Calculate University admission eligibility
 * @param {Array} jamb - JAMB subjects and scores
 * @param {Array} waec - WAEC/NECO O'Level results
 * @returns {Object} University eligibility status
 */
export const calculateUniversityEligibility = (jamb, waec) => {
  const minJambScore = 180; // Minimum JAMB score for most universities
  const jambScore = jamb.reduce((sum, subject) => sum + subject.score, 0);
  
  const waecEligibility = calculateWAECEligibility(waec);
  const jambEligible = jambScore >= minJambScore;
  
  return {
    eligible: waecEligibility.eligible && jambEligible,
    jambScore,
    jambEligible,
    waecEligible: waecEligibility.eligible,
    requirements: {
      jamb: {
        score: jambScore,
        required: minJambScore,
        passed: jambEligible,
      },
      waec: waecEligibility,
    },
  };
};

// ==================== REPORT CARD CALCULATIONS ====================

/**
 * Generate comprehensive report card data
 * @param {Object} student - Student information
 * @param {Array} subjects - Term subjects with grades
 * @param {Object} attendance - Attendance data
 * @returns {Object} Complete report card data
 */
export const generateReportCard = (student, subjects, attendance = {}) => {
  const academicPerformance = calculateTermPerformance(subjects);
  
  // Calculate position in class (mock implementation)
  const position = Math.floor(Math.random() * 30) + 1; // This would be calculated from actual class data
  const totalInClass = 35; // This would come from actual class size
  
  // Attendance summary
  const attendanceRate = attendance.totalDays ? 
    Math.round((attendance.presentDays / attendance.totalDays) * 100) : 0;

  // Teacher's comments based on performance
  const getTeacherComment = (average) => {
    if (average >= 80) return "Excellent performance. Keep up the good work!";
    if (average >= 70) return "Very good performance. Continue to work hard.";
    if (average >= 60) return "Good performance. There's room for improvement.";
    if (average >= 50) return "Fair performance. Please work harder in weak subjects.";
    return "Poor performance. Needs serious improvement and extra attention.";
  };

  return {
    student,
    academic: {
      ...academicPerformance,
      position,
      totalInClass,
      positionSuffix: getPositionSuffix(position),
    },
    attendance: {
      rate: attendanceRate,
      present: attendance.presentDays || 0,
      absent: attendance.absentDays || 0,
      late: attendance.lateDays || 0,
      total: attendance.totalDays || 0,
    },
    subjects: subjects.map(subject => ({
      ...subject,
      improvement: subject.previousScore ? 
        subject.totalScore - subject.previousScore : null,
    })),
    comments: {
      teacher: getTeacherComment(academicPerformance.averageScore),
      principal: academicPerformance.averageScore >= 70 ? 
        "Commendable performance." : 
        "More effort is required.",
    },
    nextTermResumes: getNextTermDate(), // Utility function for term dates
  };
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get position suffix (1st, 2nd, 3rd, etc.)
 */
const getPositionSuffix = (position) => {
  const lastDigit = position % 10;
  const lastTwoDigits = position % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return `${position}th`;
  if (lastDigit === 1) return `${position}st`;
  if (lastDigit === 2) return `${position}nd`;
  if (lastDigit === 3) return `${position}rd`;
  return `${position}th`;
};

/**
 * Get next term resumption date (mock implementation)
 */
const getNextTermDate = () => {
  const today = new Date();
  const nextTerm = new Date(today);
  nextTerm.setMonth(nextTerm.getMonth() + 1);
  return nextTerm.toISOString().split('T')[0];
};

/**
 * Format grade for display
 * @param {Object} grade - Grade object
 * @returns {string} Formatted grade string
 */
export const formatGrade = (grade) => {
  return `${grade.letter} (${grade.totalScore}%) - ${grade.grade}`;
};

/**
 * Get grade color for UI styling
 * @param {string} letter - Grade letter
 * @returns {string} Color class or hex code
 */
export const getGradeColor = (letter) => {
  const grade = NIGERIAN_GRADING_SYSTEM.GRADES.find(g => g.letter === letter);
  return grade ? grade.color : 'gray';
};

/**
 * Validate assessment scores
 * @param {Object} scores - Assessment scores to validate
 * @returns {boolean} Validation result
 */
export const validateAssessmentScores = (scores) => {
  const { ca1, ca2, exam } = scores;
  
  return (
    ca1 >= 0 && ca1 <= 100 &&
    ca2 >= 0 && ca2 <= 100 &&
    exam >= 0 && exam <= 100
  );
};

// Export all calculation functions and constants
export default {
  NIGERIAN_GRADING_SYSTEM,
  calculateTotalScore,
  getGradeInfo,
  calculateCompleteGrade,
  calculateTermPerformance,
  calculateClassAverage,
  calculateWAECEligibility,
  calculateUniversityEligibility,
  generateReportCard,
  formatGrade,
  getGradeColor,
  validateAssessmentScores,
};
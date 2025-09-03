// File Location: src/utils/reportGenerator.js

import { 
  GRADING_SYSTEM, 
  ACADEMIC_TERMS, 
  SCHOOL_CONFIG,
  getCurrentTerm,
  getCurrentAcademicYear,
  getGradeDescription 
} from './nigerianEducationSystem.js';

/**
 * Report Generation Utilities for All User Roles
 * Generates role-specific reports with Nigerian education context
 */

// Student Report Card Generator
export const generateStudentReportCard = (student, grades, attendance, term = getCurrentTerm()) => {
  const totalSubjects = grades.length;
  const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0);
  const averageScore = totalScore / totalSubjects;
  const attendancePercentage = calculateAttendancePercentage(attendance);
  
  return {
    studentInfo: {
      name: student.name,
      admissionNumber: student.admissionNumber,
      class: student.class,
      stream: student.stream,
      term,
      academicYear: getCurrentAcademicYear()
    },
    academicPerformance: {
      totalSubjects,
      totalScore,
      averageScore: Math.round(averageScore * 100) / 100,
      overallGrade: getGradeDescription(averageScore),
      position: calculatePosition(student.id, grades),
      subjects: grades.map(grade => ({
        subject: grade.subject,
        score: grade.score,
        grade: getGradeDescription(grade.score),
        remark: getSubjectRemark(grade.score)
      }))
    },
    attendance: {
      totalDays: attendance.totalDays,
      daysPresent: attendance.daysPresent,
      daysAbsent: attendance.daysAbsent,
      percentage: attendancePercentage,
      status: getAttendanceStatus(attendancePercentage)
    },
    teacherComments: generateTeacherComments(averageScore, attendancePercentage),
    nextTermBegins: getNextTermDate(),
    generatedAt: new Date().toISOString()
  };
};

// Class Performance Report (Teacher/Admin)
export const generateClassPerformanceReport = (className, students, grades, attendance) => {
  const classSize = students.length;
  const subjectAverages = calculateSubjectAverages(grades);
  const classAverage = calculateClassAverage(grades);
  const attendanceStats = calculateClassAttendance(attendance);
  
  return {
    classInfo: {
      name: className,
      size: classSize,
      term: getCurrentTerm(),
      academicYear: getCurrentAcademicYear()
    },
    performance: {
      classAverage: Math.round(classAverage * 100) / 100,
      highestScore: Math.max(...grades.map(g => g.score)),
      lowestScore: Math.min(...grades.map(g => g.score)),
      passingStudents: grades.filter(g => g.score >= 50).length,
      failingStudents: grades.filter(g => g.score < 50).length,
      subjectAverages
    },
    attendance: attendanceStats,
    recommendations: generateClassRecommendations(classAverage, attendanceStats.percentage),
    generatedAt: new Date().toISOString()
  };
};

// School-wide Analytics Report (Admin/Super Admin)
export const generateSchoolAnalyticsReport = (allStudents, allGrades, allAttendance) => {
  const totalStudents = allStudents.length;
  const jssStudents = allStudents.filter(s => s.class.startsWith('JSS')).length;
  const sssStudents = allStudents.filter(s => s.class.startsWith('SSS')).length;
  
  return {
    schoolOverview: {
      totalStudents,
      jssStudents,
      sssStudents,
      academicYear: getCurrentAcademicYear(),
      term: getCurrentTerm()
    },
    academicPerformance: {
      schoolAverage: calculateSchoolAverage(allGrades),
      topPerformingClasses: getTopPerformingClasses(allGrades),
      subjectPerformance: calculateSubjectPerformance(allGrades),
      waecReadiness: calculateWAECReadiness(allGrades, allStudents)
    },
    attendance: {
      schoolAttendanceRate: calculateSchoolAttendance(allAttendance),
      classAttendanceRates: calculateClassAttendanceRates(allAttendance),
      monthlyTrends: calculateMonthlyAttendanceTrends(allAttendance)
    },
    insights: generateSchoolInsights(allStudents, allGrades, allAttendance),
    generatedAt: new Date().toISOString()
  };
};

// Parent Progress Report
export const generateParentProgressReport = (children, grades, attendance) => {
  return children.map(child => {
    const childGrades = grades.filter(g => g.studentId === child.id);
    const childAttendance = attendance.find(a => a.studentId === child.id);
    
    return {
      childInfo: {
        name: child.name,
        class: child.class,
        admissionNumber: child.admissionNumber
      },
      currentPerformance: {
        averageScore: calculateAverageScore(childGrades),
        recentGrades: childGrades.slice(-5),
        attendanceRate: calculateAttendancePercentage(childAttendance),
        concerns: identifyAcademicConcerns(childGrades, childAttendance)
      },
      recommendations: generateParentRecommendations(childGrades, childAttendance),
      nextSteps: getNextStepsForParent(child, childGrades)
    };
  });
};

// Teacher Subject Report
export const generateTeacherSubjectReport = (teacherId, subject, students, grades, attendance) => {
  const subjectGrades = grades.filter(g => g.subject === subject && g.teacherId === teacherId);
  const subjectStudents = students.filter(s => subjectGrades.some(g => g.studentId === s.id));
  
  return {
    subjectInfo: {
      name: subject,
      teacher: teacherId,
      totalStudents: subjectStudents.length,
      term: getCurrentTerm()
    },
    performance: {
      average: calculateAverageScore(subjectGrades),
      distribution: calculateGradeDistribution(subjectGrades),
      topPerformers: getTopPerformers(subjectGrades, 5),
      needsAttention: getStudentsNeedingAttention(subjectGrades, 3)
    },
    trends: {
      improvementRate: calculateImprovementRate(subjectGrades),
      attendanceImpact: correlateAttendanceWithGrades(subjectGrades, attendance)
    },
    actionItems: generateTeacherActionItems(subjectGrades, attendance),
    generatedAt: new Date().toISOString()
  };
};

// Utility Functions
const calculateAttendancePercentage = (attendance) => {
  if (!attendance || attendance.totalDays === 0) return 0;
  return Math.round((attendance.daysPresent / attendance.totalDays) * 100);
};

const calculatePosition = (studentId, allGrades) => {
  // Simple position calculation - in real app would be more complex
  const averages = allGrades.map(g => ({
    studentId: g.studentId,
    average: g.score
  })).sort((a, b) => b.average - a.average);
  
  return averages.findIndex(a => a.studentId === studentId) + 1;
};

const getSubjectRemark = (score) => {
  if (score >= 80) return 'Excellent performance';
  if (score >= 70) return 'Very good work';
  if (score >= 60) return 'Good effort';
  if (score >= 50) return 'Fair performance';
  return 'Needs improvement';
};

const getAttendanceStatus = (percentage) => {
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 80) return 'Good';
  if (percentage >= 70) return 'Fair';
  return 'Poor';
};

const generateTeacherComments = (average, attendance) => {
  let comment = '';
  
  if (average >= 80 && attendance >= 90) {
    comment = 'Outstanding student with excellent academic performance and attendance.';
  } else if (average >= 70) {
    comment = 'Good academic performance. ';
    comment += attendance < 80 ? 'Needs to improve attendance.' : 'Keep up the good work.';
  } else if (average >= 50) {
    comment = 'Fair performance. Needs more effort in studies. ';
    comment += attendance < 80 ? 'Regular attendance is crucial for improvement.' : '';
  } else {
    comment = 'Needs significant improvement in academic performance. ';
    comment += 'Extra attention and support required.';
  }
  
  return comment.trim();
};

const getNextTermDate = () => {
  const currentTerm = getCurrentTerm();
  const year = new Date().getFullYear();
  
  switch (currentTerm) {
    case 'FIRST': return `January ${year + 1}`;
    case 'SECOND': return `May ${year}`;
    case 'THIRD': return `September ${year}`;
    default: return `September ${year}`;
  }
};

const calculateSubjectAverages = (grades) => {
  const subjects = [...new Set(grades.map(g => g.subject))];
  return subjects.map(subject => {
    const subjectGrades = grades.filter(g => g.subject === subject);
    const average = subjectGrades.reduce((sum, g) => sum + g.score, 0) / subjectGrades.length;
    return { subject, average: Math.round(average * 100) / 100 };
  });
};

const calculateClassAverage = (grades) => {
  return grades.reduce((sum, g) => sum + g.score, 0) / grades.length;
};

const calculateClassAttendance = (attendance) => {
  const totalDays = attendance.reduce((sum, a) => sum + a.totalDays, 0);
  const totalPresent = attendance.reduce((sum, a) => sum + a.daysPresent, 0);
  
  return {
    totalDays,
    totalPresent,
    percentage: Math.round((totalPresent / totalDays) * 100)
  };
};

const generateClassRecommendations = (average, attendanceRate) => {
  const recommendations = [];
  
  if (average < 60) {
    recommendations.push('Consider additional tutorial sessions for struggling students');
    recommendations.push('Review teaching methodology and materials');
  }
  
  if (attendanceRate < 80) {
    recommendations.push('Implement attendance improvement strategies');
    recommendations.push('Engage parents on attendance importance');
  }
  
  if (average >= 80 && attendanceRate >= 90) {
    recommendations.push('Maintain current excellence standards');
    recommendations.push('Consider advanced enrichment activities');
  }
  
  return recommendations;
};

// Export all generator functions
export const REPORT_GENERATORS = {
  STUDENT_REPORT: generateStudentReportCard,
  CLASS_PERFORMANCE: generateClassPerformanceReport,
  SCHOOL_ANALYTICS: generateSchoolAnalyticsReport,
  PARENT_PROGRESS: generateParentProgressReport,
  TEACHER_SUBJECT: generateTeacherSubjectReport
};
// src/utils/index.js
// Re-export all utility functions from a single index file

// Date helpers
export {
  getToday,
  formatDate,
  getCurrentMonthDates,
  getMonthDates,
  getCurrentAcademicYear,
  getDaysDifference,
  getDateRange,
  isWeekend,
  getWeekNumber,
  formatTime,
  getRelativeTime,
  isValidDate,
  getSchoolCalendar
} from './dateHelpers.js';

// Calculations
export {
  getLetterGrade,
  getGPAPoints,
  calculateFinalGrade,
  calculateClassAverage,
  calculateGPA,
  calculateAttendancePercentage,
  getAttendanceStatus,
  calculateAttendanceSummary,
  calculateStandardDeviation,
  calculateGradeDistribution,
  calculatePercentileRank,
  formatGrade,
  validateGrade,
  getClassPerformanceStats,
  getAttendanceStats,
  GRADE_SCALES,
  ASSESSMENT_WEIGHTS
} from './calculations.js';
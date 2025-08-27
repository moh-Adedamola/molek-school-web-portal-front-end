// utils/dateHelpers.js - Nigerian school calendar and date helper functions

// Nigerian academic calendar structure (September to July)
export const NIGERIAN_ACADEMIC_CALENDAR = {
  // Academic year typically runs from September to July
  ACADEMIC_YEAR_START_MONTH: 8, // September (0-indexed)
  ACADEMIC_YEAR_END_MONTH: 6,   // July (0-indexed)
  
  // Three terms structure
  TERMS: {
    FIRST: {
      name: 'First Term',
      startMonth: 8,  // September
      endMonth: 11,   // December
      breakName: 'Christmas/New Year Holiday',
      breakWeeks: 3,
    },
    SECOND: {
      name: 'Second Term',
      startMonth: 0,  // January
      endMonth: 3,    // April
      breakName: 'Easter Holiday',
      breakWeeks: 2,
    },
    THIRD: {
      name: 'Third Term',
      startMonth: 4,  // May
      endMonth: 6,    // July
      breakName: 'Long Holiday',
      breakWeeks: 8,
    },
  },

  // Nigerian public holidays that affect school calendar
  PUBLIC_HOLIDAYS: [
    { name: 'New Year Day', date: '01-01', type: 'fixed' },
    { name: 'Independence Day', date: '10-01', type: 'fixed' },
    { name: 'Christmas Day', date: '12-25', type: 'fixed' },
    { name: 'Boxing Day', date: '12-26', type: 'fixed' },
    { name: 'Workers Day', date: '05-01', type: 'fixed' },
    { name: 'Children Day', date: '05-27', type: 'fixed' },
    { name: 'Democracy Day', date: '06-12', type: 'fixed' },
    // Variable dates (Islamic and Christian holidays)
    { name: 'Eid-ul-Fitr', type: 'variable' },
    { name: 'Eid-ul-Adha', type: 'variable' },
    { name: 'Good Friday', type: 'variable' },
    { name: 'Easter Monday', type: 'variable' },
  ],

  // Typical school hours
  SCHOOL_HOURS: {
    MORNING_ASSEMBLY: '07:30',
    FIRST_PERIOD: '08:00',
    BREAK_TIME: '10:30',
    LUNCH_TIME: '12:30',
    CLOSING_TIME: '15:30',
    PREP_TIME: '19:00', // Evening prep for boarding schools
  },

  // Age requirements for different levels
  AGE_REQUIREMENTS: {
    JSS1: { min: 10, max: 13 },
    JSS2: { min: 11, max: 14 },
    JSS3: { min: 12, max: 15 },
    SSS1: { min: 13, max: 16 },
    SSS2: { min: 14, max: 17 },
    SSS3: { min: 15, max: 18 },
  },
};

// ==================== DATE UTILITY FUNCTIONS ====================

/**
 * Get current academic year in Nigerian format (e.g., "2024/2025")
 * @param {Date} date - Reference date (defaults to current date)
 * @returns {string} Academic year string
 */
export const getCurrentAcademicYear = (date = new Date()) => {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  
  // If current month is August or later, we're in the new academic year
  if (currentMonth >= NIGERIAN_ACADEMIC_CALENDAR.ACADEMIC_YEAR_START_MONTH) {
    return `${currentYear}/${currentYear + 1}`;
  } else {
    return `${currentYear - 1}/${currentYear}`;
  }
};

/**
 * Get current term based on date
 * @param {Date} date - Reference date (defaults to current date)
 * @returns {Object} Current term information
 */
export const getCurrentTerm = (date = new Date()) => {
  const month = date.getMonth();
  const { TERMS } = NIGERIAN_ACADEMIC_CALENDAR;
  
  if (month >= TERMS.FIRST.startMonth || month <= TERMS.FIRST.endMonth) {
    return { ...TERMS.FIRST, number: 1 };
  } else if (month >= TERMS.SECOND.startMonth && month <= TERMS.SECOND.endMonth) {
    return { ...TERMS.SECOND, number: 2 };
  } else if (month >= TERMS.THIRD.startMonth && month <= TERMS.THIRD.endMonth) {
    return { ...TERMS.THIRD, number: 3 };
  } else {
    // Holiday period
    return { name: 'Holiday', number: 0, isHoliday: true };
  }
};

/**
 * Get term dates for a specific academic year
 * @param {string} academicYear - Academic year (e.g., "2024/2025")
 * @returns {Object} Term dates
 */
export const getTermDates = (academicYear) => {
  const [startYear, endYear] = academicYear.split('/').map(Number);
  const { TERMS } = NIGERIAN_ACADEMIC_CALENDAR;
  
  return {
    firstTerm: {
      start: new Date(startYear, TERMS.FIRST.startMonth, 1),
      end: new Date(startYear, TERMS.FIRST.endMonth, 31),
      name: TERMS.FIRST.name,
    },
    secondTerm: {
      start: new Date(endYear, TERMS.SECOND.startMonth, 1),
      end: new Date(endYear, TERMS.SECOND.endMonth, 30),
      name: TERMS.SECOND.name,
    },
    thirdTerm: {
      start: new Date(endYear, TERMS.THIRD.startMonth, 1),
      end: new Date(endYear, TERMS.THIRD.endMonth, 31),
      name: TERMS.THIRD.name,
    },
  };
};

/**
 * Calculate school days in a term (excluding weekends and holidays)
 * @param {Date} startDate - Term start date
 * @param {Date} endDate - Term end date
 * @returns {number} Number of school days
 */
export const calculateSchoolDays = (startDate, endDate) => {
  let schoolDays = 0;
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Skip public holidays (simplified check)
      if (!isPublicHoliday(currentDate)) {
        schoolDays++;
      }
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return schoolDays;
};

/**
 * Check if a date is a public holiday in Nigeria
 * @param {Date} date - Date to check
 * @returns {boolean} Whether the date is a public holiday
 */
export const isPublicHoliday = (date) => {
  const { PUBLIC_HOLIDAYS } = NIGERIAN_ACADEMIC_CALENDAR;
  const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  return PUBLIC_HOLIDAYS.some(holiday => 
    holiday.type === 'fixed' && holiday.date === monthDay
  );
};

/**
 * Get age of student at a specific date
 * @param {Date} birthDate - Student's birth date
 * @param {Date} referenceDate - Reference date (defaults to current date)
 * @returns {number} Age in years
 */
export const getAge = (birthDate, referenceDate = new Date()) => {
  const birth = new Date(birthDate);
  const reference = new Date(referenceDate);
  
  let age = reference.getFullYear() - birth.getFullYear();
  const monthDiff = reference.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Check if student age is appropriate for class level
 * @param {Date} birthDate - Student's birth date
 * @param {string} classLevel - Class level (e.g., "JSS1", "SSS3")
 * @returns {Object} Age validation result
 */
export const validateStudentAge = (birthDate, classLevel) => {
  const age = getAge(birthDate);
  const ageReq = NIGERIAN_ACADEMIC_CALENDAR.AGE_REQUIREMENTS[classLevel];
  
  if (!ageReq) {
    return { valid: false, message: 'Invalid class level' };
  }
  
  const valid = age >= ageReq.min && age <= ageReq.max;
  
  return {
    valid,
    age,
    message: valid 
      ? 'Age is appropriate for class level' 
      : `Age should be between ${ageReq.min} and ${ageReq.max} for ${classLevel}`,
    recommendation: !valid && age < ageReq.min 
      ? 'Consider lower class level'
      : !valid && age > ageReq.max 
        ? 'Consider higher class level'
        : null,
  };
};

/**
 * Format date for Nigerian locale
 * @param {Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'full')
 * @returns {string} Formatted date string
 */
export const formatNigerianDate = (date, format = 'short') => {
  const options = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  };
  
  return new Intl.DateTimeFormat('en-NG', options[format]).format(date);
};

/**
 * Get next school day (excluding weekends and holidays)
 * @param {Date} date - Starting date
 * @returns {Date} Next school day
 */
export const getNextSchoolDay = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  
  // Skip weekends and holidays
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6 || isPublicHoliday(nextDay)) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  
  return nextDay;
};

/**
 * Calculate attendance percentage for a period
 * @param {number} present - Days present
 * @param {number} total - Total school days
 * @returns {Object} Attendance statistics
 */
export const calculateAttendancePercentage = (present, total) => {
  if (total === 0) return { percentage: 0, status: 'No Data', color: 'gray' };
  
  const percentage = Math.round((present / total) * 100);
  
  let status, color;
  if (percentage >= 95) {
    status = 'Excellent';
    color = 'green';
  } else if (percentage >= 85) {
    status = 'Good';
    color = 'blue';
  } else if (percentage >= 75) {
    status = 'Fair';
    color = 'gold';
  } else if (percentage >= 65) {
    status = 'Poor';
    color = 'orange';
  } else {
    status = 'Critical';
    color = 'red';
  }
  
  return {
    percentage,
    status,
    color,
    present,
    absent: total - present,
    total,
  };
};

/**
 * Get term progress percentage
 * @param {string} academicYear - Academic year
 * @param {string} term - Term name
 * @returns {number} Progress percentage (0-100)
 */
export const getTermProgress = (academicYear, term) => {
  const termDates = getTermDates(academicYear);
  const currentDate = new Date();
  
  let termStart, termEnd;
  switch (term) {
    case 'First Term':
      termStart = termDates.firstTerm.start;
      termEnd = termDates.firstTerm.end;
      break;
    case 'Second Term':
      termStart = termDates.secondTerm.start;
      termEnd = termDates.secondTerm.end;
      break;
    case 'Third Term':
      termStart = termDates.thirdTerm.start;
      termEnd = termDates.thirdTerm.end;
      break;
    default:
      return 0;
  }
  
  if (currentDate < termStart) return 0;
  if (currentDate > termEnd) return 100;
  
  const totalDays = (termEnd - termStart) / (1000 * 60 * 60 * 24);
  const elapsedDays = (currentDate - termStart) / (1000 * 60 * 60 * 24);
  
  return Math.round((elapsedDays / totalDays) * 100);
};

/**
 * Generate academic calendar events for a year
 * @param {string} academicYear - Academic year
 * @returns {Array} Calendar events
 */
export const generateAcademicCalendarEvents = (academicYear) => {
  const termDates = getTermDates(academicYear);
  const events = [];
  
  // Term start and end dates
  Object.entries(termDates).forEach(([termKey, termData]) => {
    events.push({
      id: `${termKey}-start`,
      title: `${termData.name} Begins`,
      date: termData.start,
      type: 'term-start',
      color: 'blue',
    });
    
    events.push({
      id: `${termKey}-end`,
      title: `${termData.name} Ends`,
      date: termData.end,
      type: 'term-end',
      color: 'blue',
    });
  });
  
  // Add public holidays
  const [startYear, endYear] = academicYear.split('/').map(Number);
  NIGERIAN_ACADEMIC_CALENDAR.PUBLIC_HOLIDAYS
    .filter(holiday => holiday.type === 'fixed')
    .forEach(holiday => {
      const [month, day] = holiday.date.split('-').map(Number);
      
      // Add holiday for both years of academic year if within term periods
      [startYear, endYear].forEach(year => {
        const holidayDate = new Date(year, month - 1, day);
        events.push({
          id: `${holiday.name}-${year}`,
          title: holiday.name,
          date: holidayDate,
          type: 'public-holiday',
          color: 'red',
        });
      });
    });
  
  return events.sort((a, b) => a.date - b.date);
};

/**
 * Check if current time is within school hours
 * @param {Date} time - Time to check (defaults to current time)
 * @returns {Object} School hours status
 */
export const isWithinSchoolHours = (time = new Date()) => {
  const { SCHOOL_HOURS } = NIGERIAN_ACADEMIC_CALENDAR;
  const currentHour = time.getHours();
  const currentMinute = time.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;
  
  const [startHour, startMinute] = SCHOOL_HOURS.FIRST_PERIOD.split(':').map(Number);
  const [endHour, endMinute] = SCHOOL_HOURS.CLOSING_TIME.split(':').map(Number);
  
  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;
  
  const withinHours = currentTime >= startTime && currentTime <= endTime;
  
  return {
    withinHours,
    currentTime: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
    schoolStart: SCHOOL_HOURS.FIRST_PERIOD,
    schoolEnd: SCHOOL_HOURS.CLOSING_TIME,
    status: withinHours ? 'School Hours' : 'After Hours',
  };
};

/**
 * Calculate days until next term starts
 * @param {string} academicYear - Academic year
 * @returns {Object} Next term information
 */
export const getDaysUntilNextTerm = (academicYear) => {
  const currentDate = new Date();
  const termDates = getTermDates(academicYear);
  const currentTerm = getCurrentTerm();
  
  let nextTermStart;
  let nextTermName;
  
  if (currentTerm.number === 1 || currentTerm.isHoliday) {
    nextTermStart = termDates.secondTerm.start;
    nextTermName = 'Second Term';
  } else if (currentTerm.number === 2) {
    nextTermStart = termDates.thirdTerm.start;
    nextTermName = 'Third Term';
  } else {
    // After third term, calculate next academic year first term
    const nextAcademicYear = `${parseInt(academicYear.split('/')[1])}/${parseInt(academicYear.split('/')[1]) + 1}`;
    const nextYearTerms = getTermDates(nextAcademicYear);
    nextTermStart = nextYearTerms.firstTerm.start;
    nextTermName = 'First Term';
  }
  
  const daysUntil = Math.ceil((nextTermStart - currentDate) / (1000 * 60 * 60 * 24));
  
  return {
    nextTermName,
    nextTermStart,
    daysUntil: Math.max(0, daysUntil),
    isCurrentTerm: daysUntil <= 0,
  };
};

// Export all date helper functions and constants
export default {
  NIGERIAN_ACADEMIC_CALENDAR,
  getCurrentAcademicYear,
  getCurrentTerm,
  getTermDates,
  calculateSchoolDays,
  isPublicHoliday,
  getAge,
  validateStudentAge,
  formatNigerianDate,
  getNextSchoolDay,
  calculateAttendancePercentage,
  getTermProgress,
  generateAcademicCalendarEvents,
  isWithinSchoolHours,
  getDaysUntilNextTerm,
};
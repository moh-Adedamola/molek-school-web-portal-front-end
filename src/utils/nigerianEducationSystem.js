// File Location: src/utils/nigerianEducationSystem.js

/**
 * Nigerian Secondary School Education System Configuration
 * Supports JSS 1-3 and SSS 1-3 structure with WAEC/NECO integration
 */

export const EDUCATION_LEVELS = {
  JSS: {
    name: 'Junior Secondary School',
    levels: ['JSS 1', 'JSS 2', 'JSS 3'],
    ageRange: '10-13 years',
    description: 'Foundation secondary education',
    subjects: 'core_subjects'
  },
  SSS: {
    name: 'Senior Secondary School', 
    levels: ['SSS 1', 'SSS 2', 'SSS 3'],
    ageRange: '13-16 years',
    description: 'Specialized secondary education',
    subjects: 'stream_subjects'
  }
};

export const ACADEMIC_STREAMS = {
  SCIENCE: {
    name: 'Science Stream',
    code: 'SCI',
    description: 'Mathematics, Physics, Chemistry, Biology focus',
    examPrep: ['WAEC', 'NECO', 'JAMB']
  },
  ARTS: {
    name: 'Arts/Humanities Stream',
    code: 'ART',
    description: 'Literature, History, Government, Languages focus',
    examPrep: ['WAEC', 'NECO', 'JAMB']
  },
  COMMERCIAL: {
    name: 'Commercial Stream',
    code: 'COM',
    description: 'Accounting, Economics, Commerce focus',
    examPrep: ['WAEC', 'NECO', 'JAMB']
  }
};

export const EXAMINATION_BODIES = {
  WAEC: {
    name: 'West African Examinations Council',
    fullName: 'West African Senior School Certificate Examination',
    code: 'WASSCE',
    gradingScale: ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']
  },
  NECO: {
    name: 'National Examinations Council',
    fullName: 'Senior Secondary Certificate Examination',
    code: 'SSCE',
    gradingScale: ['A', 'B', 'C', 'D', 'E', 'F']
  },
  JAMB: {
    name: 'Joint Admissions and Matriculation Board',
    fullName: 'Unified Tertiary Matriculation Examination',
    code: 'UTME',
    maxScore: 400
  }
};

export const ACADEMIC_TERMS = {
  FIRST: {
    name: 'First Term',
    months: ['September', 'October', 'November', 'December'],
    startMonth: 9,
    endMonth: 12
  },
  SECOND: {
    name: 'Second Term', 
    months: ['January', 'February', 'March', 'April'],
    startMonth: 1,
    endMonth: 4
  },
  THIRD: {
    name: 'Third Term',
    months: ['May', 'June', 'July'],
    startMonth: 5,
    endMonth: 7
  }
};

export const GRADING_SYSTEM = {
  PRIMARY: {
    scale: ['A', 'B', 'C', 'D', 'E', 'F'],
    descriptions: {
      'A': 'Excellent (80-100)',
      'B': 'Very Good (70-79)', 
      'C': 'Good (60-69)',
      'D': 'Pass (50-59)',
      'E': 'Poor (40-49)',
      'F': 'Fail (0-39)'
    }
  },
  WAEC: {
    scale: ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'],
    descriptions: {
      'A1': 'Excellent (75-100)',
      'B2': 'Very Good (70-74)',
      'B3': 'Good (65-69)', 
      'C4': 'Credit (60-64)',
      'C5': 'Credit (55-59)',
      'C6': 'Credit (50-54)',
      'D7': 'Pass (45-49)',
      'E8': 'Pass (40-44)',
      'F9': 'Fail (0-39)'
    }
  }
};

export const CORE_SUBJECTS = [
  'Mathematics',
  'English Language',
  'Basic Science',
  'Basic Technology',
  'Social Studies',
  'Civic Education',
  'Physical and Health Education',
  'Cultural and Creative Arts',
  'Computer Studies',
  'French Language'
];

export const SCIENCE_SUBJECTS = [
  'Mathematics',
  'English Language', 
  'Physics',
  'Chemistry',
  'Biology',
  'Further Mathematics',
  'Computer Science',
  'Geography',
  'Agricultural Science'
];

export const ARTS_SUBJECTS = [
  'Mathematics',
  'English Language',
  'Literature in English',
  'Government',
  'History',
  'Geography',
  'Economics',
  'French Language',
  'Fine Arts',
  'Music'
];

export const COMMERCIAL_SUBJECTS = [
  'Mathematics',
  'English Language',
  'Accounting',
  'Economics', 
  'Commerce',
  'Government',
  'Geography',
  'Computer Studies',
  'Office Practice',
  'Data Processing'
];

export const CLASS_STRUCTURE = {
  'JSS 1': { level: 'JSS', grade: 1, subjects: CORE_SUBJECTS },
  'JSS 2': { level: 'JSS', grade: 2, subjects: CORE_SUBJECTS },
  'JSS 3': { level: 'JSS', grade: 3, subjects: CORE_SUBJECTS },
  'SSS 1': { level: 'SSS', grade: 1, hasStreams: true },
  'SSS 2': { level: 'SSS', grade: 2, hasStreams: true },
  'SSS 3': { level: 'SSS', grade: 3, hasStreams: true }
};

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
  'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna',
  'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
  'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
];

export const SCHOOL_ACTIVITIES = [
  'Morning Assembly',
  'Inter-house Sports',
  'Cultural Day',
  'Science Exhibition',
  'Literary and Debating Society',
  'Mathematics Competition',
  'Career Day',
  'Parents Meeting',
  'End of Term Examination',
  'Graduation Ceremony'
];

// Utility functions for Nigerian education system
export const getSubjectsByStream = (stream) => {
  const streamMap = {
    'SCIENCE': SCIENCE_SUBJECTS,
    'ARTS': ARTS_SUBJECTS, 
    'COMMERCIAL': COMMERCIAL_SUBJECTS
  };
  return streamMap[stream] || CORE_SUBJECTS;
};

export const getGradeDescription = (score, system = 'PRIMARY') => {
  const grading = GRADING_SYSTEM[system];
  
  if (system === 'WAEC') {
    if (score >= 75) return 'A1';
    if (score >= 70) return 'B2';
    if (score >= 65) return 'B3';
    if (score >= 60) return 'C4';
    if (score >= 55) return 'C5';
    if (score >= 50) return 'C6';
    if (score >= 45) return 'D7';
    if (score >= 40) return 'E8';
    return 'F9';
  }
  
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  if (score >= 40) return 'E';
  return 'F';
};

export const getCurrentTerm = () => {
  const month = new Date().getMonth() + 1;
  if (month >= 9 || month <= 12) return 'FIRST';
  if (month >= 1 && month <= 4) return 'SECOND';
  return 'THIRD';
};

export const getCurrentAcademicYear = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  
  if (month >= 9) {
    return `${year}/${year + 1}`;
  }
  return `${year - 1}/${year}`;
};
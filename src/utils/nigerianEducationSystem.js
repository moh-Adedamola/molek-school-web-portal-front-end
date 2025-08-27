// utils/nigerianEducationSystem.js
// Nigerian Secondary School Education System Configuration

export const EDUCATION_LEVELS = {
  JSS1: 'JSS 1',
  JSS2: 'JSS 2', 
  JSS3: 'JSS 3',
  SSS1: 'SSS 1',
  SSS2: 'SSS 2',
  SSS3: 'SSS 3'
};

export const ACADEMIC_STREAMS = {
  SCIENCES: 'Sciences',
  ARTS: 'Arts/Humanities', 
  COMMERCIAL: 'Commercial'
};

export const SCHOOL_TERMS = {
  FIRST: { id: 1, name: '1st Term', months: 'Sep - Dec' },
  SECOND: { id: 2, name: '2nd Term', months: 'Jan - Apr' },
  THIRD: { id: 3, name: '3rd Term', months: 'May - Jul' }
};

export const EXAMINATION_BODIES = {
  WAEC: 'West African Examinations Council',
  NECO: 'National Examinations Council',
  JAMB: 'Joint Admissions and Matriculation Board'
};

export const GRADING_SYSTEM = {
  WAEC: {
    A1: { grade: 'A1', points: 6, description: 'Excellent', min: 75, max: 100 },
    B2: { grade: 'B2', points: 5, description: 'Very Good', min: 70, max: 74 },
    B3: { grade: 'B3', points: 4, description: 'Good', min: 65, max: 69 },
    C4: { grade: 'C4', points: 3, description: 'Credit', min: 60, max: 64 },
    C5: { grade: 'C5', points: 2, description: 'Credit', min: 55, max: 59 },
    C6: { grade: 'C6', points: 1, description: 'Credit', min: 50, max: 54 },
    D7: { grade: 'D7', points: 1, description: 'Pass', min: 45, max: 49 },
    E8: { grade: 'E8', points: 0, description: 'Pass', min: 40, max: 44 },
    F9: { grade: 'F9', points: 0, description: 'Fail', min: 0, max: 39 }
  }
};

export const CORE_SUBJECTS = [
  'Mathematics',
  'English Language', 
  'Basic Science',
  'Basic Technology',
  'Civic Education',
  'Cultural & Creative Arts',
  'Physical & Health Education',
  'Social Studies'
];

export const SSS_SCIENCE_SUBJECTS = [
  'Physics',
  'Chemistry', 
  'Biology',
  'Mathematics',
  'Further Mathematics',
  'Computer Science',
  'Geography'
];

export const SSS_ARTS_SUBJECTS = [
  'Literature in English',
  'Government',
  'History',
  'Christian Religious Studies',
  'Islamic Studies',
  'Fine Arts',
  'Music',
  'French'
];

export const SSS_COMMERCIAL_SUBJECTS = [
  'Economics',
  'Commerce',
  'Accounting',
  'Office Practice',
  'Store Management',
  'Insurance',
  'Marketing'
];

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
  'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo',
  'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  'FCT Abuja'
];

export const HOUSE_SYSTEMS = [
  { name: 'Red House', color: '#dc2626', motto: 'Courage and Strength' },
  { name: 'Blue House', color: '#2563eb', motto: 'Wisdom and Truth' },
  { name: 'Green House', color: '#059669', motto: 'Growth and Prosperity' },
  { name: 'Yellow House', color: '#d97706', motto: 'Excellence and Glory' }
];

export const SCHOOL_ACTIVITIES = [
  'Inter-House Sports',
  'Debate Competition', 
  'Science Fair',
  'Cultural Day',
  'Speech & Prize Giving Day',
  'Graduation Ceremony',
  'Parent-Teacher Conference',
  'Morning Assembly'
];

// Helper Functions
export const getGradeFromScore = (score) => {
  const grades = Object.values(GRADING_SYSTEM.WAEC);
  return grades.find(grade => score >= grade.min && score <= grade.max) || GRADING_SYSTEM.WAEC.F9;
};

export const getSubjectsByStream = (stream) => {
  const baseSubjects = ['Mathematics', 'English Language', 'Civic Education'];
  
  switch(stream) {
    case ACADEMIC_STREAMS.SCIENCES:
      return [...baseSubjects, ...SSS_SCIENCE_SUBJECTS];
    case ACADEMIC_STREAMS.ARTS:
      return [...baseSubjects, ...SSS_ARTS_SUBJECTS];
    case ACADEMIC_STREAMS.COMMERCIAL:
      return [...baseSubjects, ...SSS_COMMERCIAL_SUBJECTS];
    default:
      return CORE_SUBJECTS;
  }
};

export const getCurrentAcademicYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  
  // Nigerian academic year typically starts in September
  if (currentMonth >= 9) {
    return `${currentYear}/${currentYear + 1}`;
  } else {
    return `${currentYear - 1}/${currentYear}`;
  }
};

export const getCurrentTerm = () => {
  const currentMonth = new Date().getMonth() + 1;
  
  if (currentMonth >= 9 || currentMonth <= 12) return SCHOOL_TERMS.FIRST;
  if (currentMonth >= 1 && currentMonth <= 4) return SCHOOL_TERMS.SECOND;
  if (currentMonth >= 5 && currentMonth <= 8) return SCHOOL_TERMS.THIRD;
  
  return SCHOOL_TERMS.FIRST; // Default fallback
};
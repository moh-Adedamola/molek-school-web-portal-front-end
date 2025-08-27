// data/mockSubjects.js
// Nigerian curriculum subjects for JSS and SSS levels

import { EDUCATION_LEVELS, ACADEMIC_STREAMS } from '../utils/nigerianEducationSystem';

export const mockSubjects = [
  // CORE JSS SUBJECTS (Mandatory for all JSS students)
  {
    id: 'subject-001',
    code: 'MATH001',
    name: 'Mathematics',
    category: 'Core',
    description: 'Fundamental mathematical concepts and problem-solving skills',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 6, // per week
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-002', 
    code: 'ENG001',
    name: 'English Language',
    category: 'Core',
    description: 'Language skills, communication, and literature appreciation',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 5,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-003',
    code: 'BSC001', 
    name: 'Basic Science',
    category: 'Core',
    description: 'Introduction to Physics, Chemistry, and Biology concepts',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-004',
    code: 'BTH001',
    name: 'Basic Technology',
    category: 'Core',
    description: 'Introduction to technology and technical drawing',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 3,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-005',
    code: 'CIV001',
    name: 'Civic Education',
    category: 'Core',
    description: 'Citizenship education and civic responsibility',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-019',
    code: 'SOS001',
    name: 'Social Studies',
    category: 'Core',
    description: 'Study of society, culture, and human relationships',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-020',
    code: 'PHE001',
    name: 'Physical and Health Education',
    category: 'Core',
    description: 'Physical fitness, sports, and health education',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-021',
    code: 'CCA001',
    name: 'Cultural and Creative Arts',
    category: 'Core',
    description: 'Arts, crafts, music, and cultural appreciation',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-022',
    code: 'ICT001',
    name: 'Information and Communication Technology',
    category: 'Core',
    description: 'Basic computer skills and digital literacy',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-023',
    code: 'AGR001',
    name: 'Agricultural Science',
    category: 'Core',
    description: 'Basic agricultural practices and farming techniques',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  // SSS CORE SUBJECTS (Mandatory for all SSS students)
  {
    id: 'subject-024',
    code: 'SMATH001',
    name: 'Mathematics',
    category: 'Core',
    description: 'Advanced mathematical concepts for SSS level',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 5,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-025',
    code: 'SENG001',
    name: 'English Language',
    category: 'Core',
    description: 'Advanced English language skills for SSS level',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: null,
    isCore: true,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // SSS SCIENCE STREAM SUBJECTS
  {
    id: 'subject-006',
    code: 'PHY001',
    name: 'Physics',
    category: 'Science',
    description: 'Study of matter, energy, motion, and forces',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES],
    isCore: false,
    isMandatory: true, // for science stream
    teachingHours: 4,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-007',
    code: 'CHE001', 
    name: 'Chemistry',
    category: 'Science',
    description: 'Study of matter, its properties, and chemical reactions',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-008',
    code: 'BIO001',
    name: 'Biology',
    category: 'Science',
    description: 'Study of living organisms and life processes',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-009',
    code: 'FMATH001',
    name: 'Further Mathematics',
    category: 'Science',
    description: 'Advanced mathematical concepts and applications',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES],
    isCore: false,
    isMandatory: false,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-026',
    code: 'SAGR001',
    name: 'Agricultural Science',
    category: 'Science',
    description: 'Advanced agricultural science and biotechnology',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // SSS ARTS/HUMANITIES STREAM SUBJECTS
  {
    id: 'subject-010',
    code: 'LIT001',
    name: 'Literature in English',
    category: 'Arts',
    description: 'Study of prose, poetry, and drama',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-011',
    code: 'GOV001',
    name: 'Government',
    category: 'Arts',
    description: 'Political systems, governance, and civic institutions',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-012',
    code: 'HIS001',
    name: 'History',
    category: 'Arts',
    description: 'Nigerian and world history',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-027',
    code: 'FRE001',
    name: 'French',
    category: 'Arts',
    description: 'French language and culture',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-028',
    code: 'HAU001',
    name: 'Hausa',
    category: 'Arts',
    description: 'Hausa language and literature',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-029',
    code: 'IGB001',
    name: 'Igbo',
    category: 'Arts',
    description: 'Igbo language and literature',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-030',
    code: 'YOR001',
    name: 'Yoruba',
    category: 'Arts',
    description: 'Yoruba language and literature',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // SSS COMMERCIAL STREAM SUBJECTS
  {
    id: 'subject-013',
    code: 'ECO001',
    name: 'Economics',
    category: 'Commercial',
    description: 'Economic principles and market systems',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-014',
    code: 'COM001',
    name: 'Commerce',
    category: 'Commercial', 
    description: 'Business principles and commercial activities',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-015',
    code: 'ACC001',
    name: 'Accounting',
    category: 'Commercial',
    description: 'Financial record keeping and analysis',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: true,
    teachingHours: 4,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-031',
    code: 'BUS001',
    name: 'Business Studies',
    category: 'Commercial',
    description: 'Business management and entrepreneurship',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-032',
    code: 'TYP001',
    name: 'Typewriting',
    category: 'Commercial',
    description: 'Typing skills and office procedures',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // TECHNICAL SUBJECTS
  {
    id: 'subject-033',
    code: 'TDR001',
    name: 'Technical Drawing',
    category: 'Technical',
    description: 'Engineering drawing and design principles',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES, ACADEMIC_STREAMS.TECHNICAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-034',
    code: 'WOO001',
    name: 'Woodwork',
    category: 'Technical',
    description: 'Woodworking techniques and carpentry',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.TECHNICAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-035',
    code: 'MET001',
    name: 'Metalwork',
    category: 'Technical',
    description: 'Metalworking and fabrication techniques',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.TECHNICAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-036',
    code: 'ELE001',
    name: 'Electrical Installation',
    category: 'Technical',
    description: 'Electrical wiring and installation techniques',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.TECHNICAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-037',
    code: 'AUT001',
    name: 'Auto Mechanics',
    category: 'Technical',
    description: 'Automotive repair and maintenance',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.TECHNICAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // HOME ECONOMICS AND RELATED SUBJECTS
  {
    id: 'subject-038',
    code: 'HEC001',
    name: 'Home Economics',
    category: 'Vocational',
    description: 'Home management, nutrition, and family living',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS, ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-039',
    code: 'FOO001',
    name: 'Food and Nutrition',
    category: 'Vocational',
    description: 'Food science, nutrition, and culinary skills',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS, ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-040',
    code: 'CLO001',
    name: 'Clothing and Textile',
    category: 'Vocational',
    description: 'Fashion design, tailoring, and textile studies',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS, ACADEMIC_STREAMS.COMMERCIAL],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // ARTS AND CREATIVE SUBJECTS
  {
    id: 'subject-041',
    code: 'ART001',
    name: 'Fine Arts',
    category: 'Arts',
    description: 'Visual arts, painting, and sculpture',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 3,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-042',
    code: 'MUS001',
    name: 'Music',
    category: 'Arts',
    description: 'Music theory, performance, and composition',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  // ADDITIONAL SUBJECTS (Available across streams)
  {
    id: 'subject-016',
    code: 'GEO001',
    name: 'Geography',
    category: 'General',
    description: 'Physical and human geography',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: [ACADEMIC_STREAMS.SCIENCES, ACADEMIC_STREAMS.ARTS],
    isCore: false,
    isMandatory: false,
    teachingHours: 3,
    practicalHours: 1,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-017',
    code: 'CRS001',
    name: 'Christian Religious Studies',
    category: 'Religious',
    description: 'Christian teachings and moral values',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3, 
             EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: null,
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-018',
    code: 'IRS001',
    name: 'Islamic Religious Studies',
    category: 'Religious',
    description: 'Islamic teachings and moral values',
    levels: [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3,
             EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: null,
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 0,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  },

  {
    id: 'subject-043',
    code: 'SPHE001',
    name: 'Physical and Health Education',
    category: 'General',
    description: 'Advanced physical education and health studies for SSS',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: null,
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: false,
    necoRequired: false
  },

  {
    id: 'subject-044',
    code: 'SICT001',
    name: 'Computer Studies',
    category: 'General',
    description: 'Advanced computer studies and programming for SSS',
    levels: [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3],
    streams: null,
    isCore: false,
    isMandatory: false,
    teachingHours: 2,
    practicalHours: 2,
    totalMarks: 100,
    passMarks: 50,
    waecRequired: true,
    necoRequired: true
  }
];

// Helper functions for subject management
export const getCoreSubjects = () => {
  return mockSubjectsData.filter(subject => subject.isCore === true);
};

export const getSubjectsByLevel = (level) => {
  return mockSubjectsData.filter(subject => subject.levels.includes(level));
};

export const getSubjectsByStream = (stream) => {
  return mockSubjectsData.filter(subject => 
    subject.streams === null || subject.streams.includes(stream)
  );
};

export const getWAECSubjects = () => {
  return mockSubjectsData.filter(subject => subject.waecRequired === true);
};

export const getNECOSubjects = () => {
  return mockSubjectsData.filter(subject => subject.necoRequired === true);
};

export const getMandatorySubjects = (level, stream = null) => {
  return mockSubjectsData.filter(subject => {
    const levelMatch = subject.levels.includes(level);
    const streamMatch = !subject.streams || !stream || subject.streams.includes(stream);
    const mandatory = subject.isMandatory || subject.isCore;
    return levelMatch && streamMatch && mandatory;
  });
};

export const getElectiveSubjects = (level, stream = null) => {
  return mockSubjectsData.filter(subject => {
    const levelMatch = subject.levels.includes(level);
    const streamMatch = !subject.streams || !stream || subject.streams.includes(stream);
    const elective = !subject.isMandatory && !subject.isCore;
    return levelMatch && streamMatch && elective;
  });
};

export const getSubjectsByCategory = (category) => {
  return mockSubjectsData.filter(subject => subject.category === category);
};

export const getTotalTeachingHours = (subjectIds) => {
  return mockSubjectsData
    .filter(subject => subjectIds.includes(subject.id))
    .reduce((total, subject) => total + subject.teachingHours, 0);
};

export const getTotalPracticalHours = (subjectIds) => {
  return mockSubjectsData
    .filter(subject => subjectIds.includes(subject.id))
    .reduce((total, subject) => total + subject.practicalHours, 0);
};

export const getSubjectByCode = (code) => {
  return mockSubjectsData.find(subject => subject.code === code);
};

export const getSubjectById = (id) => {
  return mockSubjectsData.find(subject => subject.id === id);
};

export const getSubjectsByName = (name) => {
  return mockSubjectsData.filter(subject => 
    subject.name.toLowerCase().includes(name.toLowerCase())
  );
};

// Additional utility functions
export const getJSSCoreSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.isCore && 
    subject.levels.some(level => 
      [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3].includes(level)
    )
  );
};

export const getSSSCoreSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.isCore && 
    subject.levels.some(level => 
      [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3].includes(level)
    )
  );
};

export const getStreamSubjects = (stream) => {
  return mockSubjectsData.filter(subject => 
    subject.streams && subject.streams.includes(stream)
  );
};

export const getVocationalSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.category === 'Vocational' || subject.category === 'Technical'
  );
};

export const getLanguageSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.name.includes('Language') || 
    subject.code.includes('ENG') || 
    subject.code.includes('FRE') ||
    subject.code.includes('HAU') ||
    subject.code.includes('IGB') ||
    subject.code.includes('YOR')
  );
};

export const getScienceSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.category === 'Science' || subject.name === 'Basic Science'
  );
};

export const getArtsSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.category === 'Arts'
  );
};

export const getCommercialSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.category === 'Commercial'
  );
};

export const getReligiousSubjects = () => {
  return mockSubjectsData.filter(subject => 
    subject.category === 'Religious'
  );
};

export const getSubjectStatistics = () => {
  const stats = {
    total: mockSubjectsData.length,
    core: mockSubjectsData.filter(s => s.isCore).length,
    mandatory: mockSubjectsData.filter(s => s.isMandatory).length,
    elective: mockSubjectsData.filter(s => !s.isMandatory && !s.isCore).length,
    waecRequired: mockSubjectsData.filter(s => s.waecRequired).length,
    necoRequired: mockSubjectsData.filter(s => s.necoRequired).length,
    byCategory: {
      core: mockSubjectsData.filter(s => s.category === 'Core').length,
      science: mockSubjectsData.filter(s => s.category === 'Science').length,
      arts: mockSubjectsData.filter(s => s.category === 'Arts').length,
      commercial: mockSubjectsData.filter(s => s.category === 'Commercial').length,
      technical: mockSubjectsData.filter(s => s.category === 'Technical').length,
      vocational: mockSubjectsData.filter(s => s.category === 'Vocational').length,
      religious: mockSubjectsData.filter(s => s.category === 'Religious').length,
      general: mockSubjectsData.filter(s => s.category === 'General').length
    },
    byLevel: {
      jss: mockSubjectsData.filter(s => 
        s.levels.some(level => 
          [EDUCATION_LEVELS.JSS1, EDUCATION_LEVELS.JSS2, EDUCATION_LEVELS.JSS3].includes(level)
        )
      ).length,
      sss: mockSubjectsData.filter(s => 
        s.levels.some(level => 
          [EDUCATION_LEVELS.SSS1, EDUCATION_LEVELS.SSS2, EDUCATION_LEVELS.SSS3].includes(level)
        )
      ).length
    }
  };
  
  return stats;
};

export const validateSubjectCombination = (subjectIds, level, stream = null) => {
  const subjects = mockSubjectsData.filter(subject => subjectIds.includes(subject.id));
  const errors = [];
  
  // Check if all subjects are valid for the level
  subjects.forEach(subject => {
    if (!subject.levels.includes(level)) {
      errors.push(`${subject.name} is not available for ${level}`);
    }
    
    // Check stream compatibility
    if (stream && subject.streams && !subject.streams.includes(stream)) {
      errors.push(`${subject.name} is not available for ${stream} stream`);
    }
  });
  
  // Check for mandatory subjects
  const mandatorySubjects = getMandatorySubjects(level, stream);
  const selectedMandatory = subjects.filter(s => s.isMandatory || s.isCore);
  
  mandatorySubjects.forEach(mandatory => {
    if (!selectedMandatory.some(s => s.id === mandatory.id)) {
      errors.push(`${mandatory.name} is mandatory and must be selected`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
};

export default mockSubjects;
// Mock Classes Data - Nigerian JSS/SSS Structure
export const mockClasses = [
  // Junior Secondary School (JSS) Classes
  {
    id: 'jss1a',
    name: 'JSS 1A',
    level: 'JSS',
    grade: 1,
    section: 'A',
    capacity: 35,
    currentStudents: 32,
    classTeacher: 'Mrs. Adunni Olatunji',
    classTeacherId: 'teacher_001',
    subjects: [
      'Mathematics', 'English Language', 'Basic Science', 'Social Studies',
      'Computer Studies', 'Christian Religious Studies', 'Physical Education',
      'Fine Arts', 'Music', 'French Language'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 45000,
    isActive: true
  },
  {
    id: 'jss1b',
    name: 'JSS 1B',
    level: 'JSS',
    grade: 1,
    section: 'B',
    capacity: 35,
    currentStudents: 34,
    classTeacher: 'Mr. Ibrahim Hassan',
    classTeacherId: 'teacher_002',
    subjects: [
      'Mathematics', 'English Language', 'Basic Science', 'Social Studies',
      'Computer Studies', 'Islamic Religious Studies', 'Physical Education',
      'Fine Arts', 'Music', 'French Language'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 45000,
    isActive: true
  },
  {
    id: 'jss2a',
    name: 'JSS 2A',
    level: 'JSS',
    grade: 2,
    section: 'A',
    capacity: 35,
    currentStudents: 33,
    classTeacher: 'Mrs. Chioma Okafor',
    classTeacherId: 'teacher_003',
    subjects: [
      'Mathematics', 'English Language', 'Basic Science', 'Social Studies',
      'Computer Studies', 'Christian Religious Studies', 'Physical Education',
      'Fine Arts', 'Music', 'French Language', 'Yoruba Language'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 48000,
    isActive: true
  },
  {
    id: 'jss3a',
    name: 'JSS 3A',
    level: 'JSS',
    grade: 3,
    section: 'A',
    capacity: 35,
    currentStudents: 30,
    classTeacher: 'Mr. Emeka Nwosu',
    classTeacherId: 'teacher_004',
    subjects: [
      'Mathematics', 'English Language', 'Basic Science', 'Social Studies',
      'Computer Studies', 'Christian Religious Studies', 'Physical Education',
      'Fine Arts', 'Music', 'French Language', 'Basic Technology'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 50000,
    isActive: true
  },

  // Senior Secondary School (SSS) Classes - Science Stream
  {
    id: 'sss1_science',
    name: 'SSS 1 Science',
    level: 'SSS',
    grade: 1,
    section: 'Science',
    capacity: 40,
    currentStudents: 38,
    classTeacher: 'Dr. Fatima Mohammed',
    classTeacherId: 'teacher_005',
    subjects: [
      'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
      'Computer Science', 'Further Mathematics', 'Agricultural Science',
      'Christian Religious Studies', 'Physical Education'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 75000,
    isActive: true
  },
  {
    id: 'sss2_science',
    name: 'SSS 2 Science',
    level: 'SSS',
    grade: 2,
    section: 'Science',
    capacity: 40,
    currentStudents: 35,
    classTeacher: 'Mr. Yusuf Abdullahi',
    classTeacherId: 'teacher_006',
    subjects: [
      'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
      'Computer Science', 'Further Mathematics', 'Agricultural Science',
      'Islamic Religious Studies', 'Physical Education'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 78000,
    isActive: true
  },

  // Senior Secondary School (SSS) Classes - Arts Stream
  {
    id: 'sss1_arts',
    name: 'SSS 1 Arts',
    level: 'SSS',
    grade: 1,
    section: 'Arts',
    capacity: 35,
    currentStudents: 32,
    classTeacher: 'Mrs. Grace Okoro',
    classTeacherId: 'teacher_007',
    subjects: [
      'Mathematics', 'English Language', 'Literature in English', 'History',
      'Government', 'Economics', 'Geography', 'Christian Religious Studies',
      'Fine Arts', 'Music', 'French Language'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 65000,
    isActive: true
  },

  // Senior Secondary School (SSS) Classes - Commercial Stream
  {
    id: 'sss2_commercial',
    name: 'SSS 2 Commercial',
    level: 'SSS',
    grade: 2,
    section: 'Commercial',
    capacity: 35,
    currentStudents: 28,
    classTeacher: 'Mr. Adeolu Adebayo',
    classTeacherId: 'teacher_008',
    subjects: [
      'Mathematics', 'English Language', 'Accounting', 'Economics',
      'Commerce', 'Business Studies', 'Computer Studies', 'Marketing',
      'Office Practice', 'Government'
    ],
    academicYear: '2024/2025',
    term: '1st Term',
    fees: 68000,
    isActive: true
  }
];

// Helper functions for class management
export const getClassesByLevel = (level) => {
  return mockClasses.filter(cls => cls.level === level);
};

export const getClassById = (classId) => {
  return mockClasses.find(cls => cls.id === classId);
};

export const getClassesByTeacher = (teacherId) => {
  return mockClasses.filter(cls => cls.classTeacherId === teacherId);
};

export const getTotalStudents = () => {
  return mockClasses.reduce((total, cls) => total + cls.currentStudents, 0);
};

export const getClassCapacityUtilization = (classId) => {
  const cls = getClassById(classId);
  if (!cls) return 0;
  return Math.round((cls.currentStudents / cls.capacity) * 100);
};

export default mockClasses;
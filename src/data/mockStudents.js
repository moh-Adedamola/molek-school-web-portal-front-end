// File Location: src/data/mockStudents.js

/**
 * Mock Students Data for Nigerian Secondary School
 * JSS 1-3 and SSS 1-3 with parent relationships and Nigerian context
 */

export const mockStudents = [
  // JSS 1 Students
  {
    id: 'S001',
    admissionNumber: 'GVS/2024/001',
    firstName: 'Adebayo',
    lastName: 'Williams',
    fullName: 'Adebayo Williams',
    class: 'JSS 1A',
    level: 'JSS',
    grade: 1,
    stream: null, // No streams for JSS
    dateOfBirth: '2012-03-15',
    age: 12,
    gender: 'Male',
    parentId: 'P001',
    parentName: 'Mrs. Adunni Williams',
    address: 'Lekki Phase 1, Lagos',
    phone: '+2348089012345',
    emergencyContact: '+2348123456789',
    bloodGroup: 'O+',
    medicalConditions: [],
    enrollmentDate: '2024-09-05',
    isActive: true,
    profileImage: '/images/students/adebayo-williams.jpg'
  },
  {
    id: 'S002',
    admissionNumber: 'GVS/2024/002',
    firstName: 'Chinyere',
    lastName: 'Okonkwo',
    fullName: 'Chinyere Okonkwo',
    class: 'JSS 1A',
    level: 'JSS',
    grade: 1,
    stream: null,
    dateOfBirth: '2012-07-22',
    age: 12,
    gender: 'Female',
    parentId: 'P002',
    parentName: 'Mrs. Chioma Okonkwo',
    address: 'Surulere, Lagos',
    phone: '+2348090123456',
    emergencyContact: '+2348134567890',
    bloodGroup: 'A+',
    medicalConditions: ['Asthma'],
    enrollmentDate: '2024-09-05',
    isActive: true,
    profileImage: '/images/students/chinyere-okonkwo.jpg'
  },
  {
    id: 'S003',
    admissionNumber: 'GVS/2024/003',
    firstName: 'Muhammad',
    lastName: 'Abdullahi',
    fullName: 'Muhammad Abdullahi',
    class: 'JSS 1B',
    level: 'JSS',
    grade: 1,
    stream: null,
    dateOfBirth: '2012-01-10',
    age: 12,
    gender: 'Male',
    parentId: 'P005',
    parentName: 'Alhaji Sule Abdullahi',
    address: 'Agege, Lagos',
    phone: '+2348123456789',
    emergencyContact: '+2348167890123',
    bloodGroup: 'B+',
    medicalConditions: [],
    enrollmentDate: '2024-09-05',
    isActive: true,
    profileImage: '/images/students/muhammad-abdullahi.jpg'
  },

  // JSS 2 Students
  {
    id: 'S004',
    admissionNumber: 'GVS/2023/015',
    firstName: 'Folake',
    lastName: 'Johnson',
    fullName: 'Folake Johnson',
    class: 'JSS 2A',
    level: 'JSS',
    grade: 2,
    stream: null,
    dateOfBirth: '2011-05-18',
    age: 13,
    gender: 'Female',
    parentId: 'P006',
    parentName: 'Mr. Tunde Johnson',
    address: 'Maryland, Lagos',
    phone: '+2348145678901',
    emergencyContact: '+2348178901234',
    bloodGroup: 'O-',
    medicalConditions: [],
    enrollmentDate: '2023-09-04',
    isActive: true,
    profileImage: '/images/students/folake-johnson.jpg'
  },
  {
    id: 'S005',
    admissionNumber: 'GVS/2023/020',
    firstName: 'Emeka',
    lastName: 'Adebisi',
    fullName: 'Emeka Adebisi',
    class: 'JSS 2A',
    level: 'JSS',
    grade: 2,
    stream: null,
    dateOfBirth: '2011-11-03',
    age: 12,
    gender: 'Male',
    parentId: 'P003',
    parentName: 'Mrs. Kemi Adebisi',
    address: 'Ikoyi, Lagos',
    phone: '+2348101234567',
    emergencyContact: '+2348145678901',
    bloodGroup: 'AB+',
    medicalConditions: [],
    enrollmentDate: '2023-09-04',
    isActive: true,
    profileImage: '/images/students/emeka-adebisi.jpg'
  },

  // JSS 3 Students
  {
    id: 'S006',
    admissionNumber: 'GVS/2022/008',
    firstName: 'Aisha',
    lastName: 'Usman',
    fullName: 'Aisha Usman',
    class: 'JSS 3A',
    level: 'JSS',
    grade: 3,
    stream: null,
    dateOfBirth: '2010-09-12',
    age: 14,
    gender: 'Female',
    parentId: 'P007',
    parentName: 'Dr. Fatima Usman',
    address: 'Victoria Island, Lagos',
    phone: '+2348156789012',
    emergencyContact: '+2348189012345',
    bloodGroup: 'A-',
    medicalConditions: [],
    enrollmentDate: '2022-09-03',
    isActive: true,
    profileImage: '/images/students/aisha-usman.jpg'
  },
  {
    id: 'S007',
    admissionNumber: 'GVS/2022/012',
    firstName: 'Kelechi',
    lastName: 'Eze',
    fullName: 'Kelechi Eze',
    class: 'JSS 3B',
    level: 'JSS',
    grade: 3,
    stream: null,
    dateOfBirth: '2010-04-25',
    age: 14,
    gender: 'Male',
    parentId: 'P008',
    parentName: 'Chief Chidi Eze',
    address: 'Ajah, Lagos',
    phone: '+2348167890123',
    emergencyContact: '+2348190123456',
    bloodGroup: 'O+',
    medicalConditions: [],
    enrollmentDate: '2022-09-03',
    isActive: true,
    profileImage: '/images/students/kelechi-eze.jpg'
  },

  // SSS 1 Students (with streams)
  {
    id: 'S008',
    admissionNumber: 'GVS/2024/025',
    firstName: 'Fatima',
    lastName: 'Ibrahim',
    fullName: 'Fatima Ibrahim',
    class: 'SSS 1A',
    level: 'SSS',
    grade: 1,
    stream: 'SCIENCE',
    dateOfBirth: '2009-12-08',
    age: 14,
    gender: 'Female',
    parentId: 'P004',
    parentName: 'Alhaji Musa Ibrahim',
    address: 'Ikotun, Lagos',
    phone: '+2348112345678',
    emergencyContact: '+2348156789012',
    bloodGroup: 'B-',
    medicalConditions: [],
    enrollmentDate: '2024-09-05',
    isActive: true,
    profileImage: '/images/students/fatima-ibrahim.jpg'
  },
  {
    id: 'S009',
    admissionNumber: 'GVS/2024/030',
    firstName: 'Samuel',
    lastName: 'Okafor',
    fullName: 'Samuel Okafor',
    class: 'SSS 1B',
    level: 'SSS',
    grade: 1,
    stream: 'COMMERCIAL',
    dateOfBirth: '2009-06-14',
    age: 15,
    gender: 'Male',
    parentId: 'P009',
    parentName: 'Mrs. Grace Okafor',
    address: 'Mushin, Lagos',
    phone: '+2348178901234',
    emergencyContact: '+2348101234567',
    bloodGroup: 'A+',
    medicalConditions: [],
    enrollmentDate: '2024-09-05',
    isActive: true,
    profileImage: '/images/students/samuel-okafor.jpg'
  },

  // SSS 2 Students
  {
    id: 'S010',
    admissionNumber: 'GVS/2023/041',
    firstName: 'Blessing',
    lastName: 'Nkomo',
    fullName: 'Blessing Nkomo',
    class: 'SSS 2A',
    level: 'SSS',
    grade: 2,
    stream: 'SCIENCE',
    dateOfBirth: '2008-10-30',
    age: 15,
    gender: 'Female',
    parentId: 'P010',
    parentName: 'Rev. Peter Nkomo',
    address: 'Yaba, Lagos',
    phone: '+2348189012345',
    emergencyContact: '+2348123456789',
    bloodGroup: 'AB-',
    medicalConditions: [],
    enrollmentDate: '2023-09-04',
    isActive: true,
    profileImage: '/images/students/blessing-nkomo.jpg'
  },

  // SSS 3 Students (WAEC candidates)
  {
    id: 'S011',
    admissionNumber: 'GVS/2022/055',
    firstName: 'David',
    lastName: 'Onikoyi',
    fullName: 'David Onikoyi',
    class: 'SSS 3A',
    level: 'SSS',
    grade: 3,
    stream: 'SCIENCE',
    dateOfBirth: '2007-08-17',
    age: 17,
    gender: 'Male',
    parentId: 'P011',
    parentName: 'Dr. Helen Onikoyi',
    address: 'Gbagada, Lagos',
    phone: '+2348190123456',
    emergencyContact: '+2348134567890',
    bloodGroup: 'O+',
    medicalConditions: [],
    waecCandidate: true,
    waecSubjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Language', 'Further Mathematics', 'Geography', 'Computer Science', 'Civic Education'],
    enrollmentDate: '2022-09-03',
    isActive: true,
    profileImage: '/images/students/david-onikoyi.jpg'
  },

  // Additional students for different classes and scenarios
  {
    id: 'S015',
    admissionNumber: 'GVS/2023/078',
    firstName: 'Funmi',
    lastName: 'Williams',
    fullName: 'Funmi Williams',
    class: 'JSS 2B',
    level: 'JSS',
    grade: 2,
    stream: null,
    dateOfBirth: '2011-02-28',
    age: 13,
    gender: 'Female',
    parentId: 'P001', // Same parent as Adebayo (siblings)
    parentName: 'Mrs. Adunni Williams',
    address: 'Lekki Phase 1, Lagos',
    phone: '+2348089012345',
    emergencyContact: '+2348123456789',
    bloodGroup: 'O+',
    medicalConditions: [],
    enrollmentDate: '2023-09-04',
    isActive: true,
    profileImage: '/images/students/funmi-williams.jpg'
  },
  {
    id: 'S018',
    admissionNumber: 'GVS/2022/095',
    firstName: 'Chidera',
    lastName: 'Okonkwo',
    fullName: 'Chidera Okonkwo',
    class: 'SSS 2B',
    level: 'SSS',
    grade: 2,
    stream: 'ARTS',
    dateOfBirth: '2008-12-05',
    age: 15,
    gender: 'Male',
    parentId: 'P002', // Same parent as Chinyere (siblings)
    parentName: 'Mrs. Chioma Okonkwo',
    address: 'Surulere, Lagos',
    phone: '+2348090123456',
    emergencyContact: '+2348134567890',
    bloodGroup: 'A+',
    medicalConditions: [],
    enrollmentDate: '2022-09-03',
    isActive: true,
    profileImage: '/images/students/chidera-okonkwo.jpg'
  },
  {
    id: 'S022',
    admissionNumber: 'GVS/2024/105',
    firstName: 'Amina',
    lastName: 'Ibrahim',
    fullName: 'Amina Ibrahim',
    class: 'JSS 1A',
    level: 'JSS',
    grade: 1,
    stream: null,
    dateOfBirth: '2012-11-20',
    age: 11,
    gender: 'Female',
    parentId: 'P004', // Same parent as Fatima (siblings)
    parentName: 'Alhaji Musa Ibrahim',
    address: 'Ikotun, Lagos',
    phone: '+2348112345678',
    emergencyContact: '+2348156789012',
    bloodGroup: 'B+',
    medicalConditions: [],
    enrollmentDate: '2024-09-05',
    isActive: true,
    profileImage: '/images/students/amina-ibrahim.jpg'
  }
];

// Helper functions for student data
export const getStudentsByClass = (className) => {
  return mockStudents.filter(student => student.class === className);
};

export const getStudentsByParent = (parentId) => {
  return mockStudents.filter(student => student.parentId === parentId);
};

export const getStudentsByLevel = (level) => {
  return mockStudents.filter(student => student.level === level);
};

export const getStudentsByStream = (stream) => {
  return mockStudents.filter(student => student.stream === stream);
};

export const getWAECCandidates = () => {
  return mockStudents.filter(student => student.waecCandidate);
};

export const getStudentById = (studentId) => {
  return mockStudents.find(student => student.id === studentId);
};

// Get all unique classes
export const getAllClasses = () => {
  const classes = [...new Set(mockStudents.map(student => student.class))];
  return classes.sort((a, b) => {
    const [levelA, gradeA] = a.split(' ');
    const [levelB, gradeB] = b.split(' ');
    
    // Sort by level first (JSS before SSS), then by grade
    if (levelA !== levelB) {
      return levelA === 'JSS' ? -1 : 1;
    }
    return gradeA.localeCompare(gradeB);
  });
};

// Statistics helper
export const getStudentStatistics = () => {
  const total = mockStudents.length;
  const jss = mockStudents.filter(s => s.level === 'JSS').length;
  const sss = mockStudents.filter(s => s.level === 'SSS').length;
  const males = mockStudents.filter(s => s.gender === 'Male').length;
  const females = mockStudents.filter(s => s.gender === 'Female').length;
  
  return {
    total,
    jss,
    sss,
    males,
    females,
    waecCandidates: mockStudents.filter(s => s.waecCandidate).length
  };
};
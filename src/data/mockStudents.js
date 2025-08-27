// data/mockStudents.js
// Nigerian secondary school students across JSS 1-3 and SSS 1-3

import { generateAvatar } from '../utils/imageHelpers';
import { EDUCATION_LEVELS, ACADEMIC_STREAMS, HOUSE_SYSTEMS } from '../utils/nigerianEducationSystem';

export const mockStudents = [
  // JSS 1 STUDENTS
  {
    id: 'student-001',
    studentId: 'MOL/JSS1/2024/001',
    firstName: 'Adewale',
    lastName: 'Akinola',
    middleName: 'Temidayo',
    fullName: 'Adewale Temidayo Akinola',
    class: 'JSS 1A',
    level: EDUCATION_LEVELS.JSS1,
    stream: null, // No streams in JSS
    dateOfBirth: '2010-03-15',
    age: 14,
    gender: 'Male',
    address: '23 Adeniran Ogunsanya Street, Surulere, Lagos',
    parentName: 'Mr. Bamidele Akinola',
    parentPhone: '+234 803 123 4567',
    parentEmail: 'b.akinola@email.com',
    stateOfOrigin: 'Lagos',
    house: HOUSE_SYSTEMS[0], // Red House
    dateOfAdmission: '2024-09-01',
    avatar: generateAvatar('Adewale Akinola', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 120000,
      paid: 120000,
      balance: 0,
      status: 'paid'
    }
  },
  
  {
    id: 'student-002', 
    studentId: 'MOL/JSS1/2024/002',
    firstName: 'Chioma',
    lastName: 'Okwu',
    middleName: 'Blessing',
    fullName: 'Chioma Blessing Okwu',
    class: 'JSS 1A',
    level: EDUCATION_LEVELS.JSS1,
    stream: null,
    dateOfBirth: '2010-07-22',
    age: 14,
    gender: 'Female',
    address: '45 Herbert Macaulay Way, Yaba, Lagos',
    parentName: 'Mrs. Ngozi Okwu',
    parentPhone: '+234 803 234 5678',
    parentEmail: 'n.okwu@email.com',
    stateOfOrigin: 'Anambra',
    house: HOUSE_SYSTEMS[1], // Blue House
    dateOfAdmission: '2024-09-01',
    avatar: generateAvatar('Chioma Okwu', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 120000,
      paid: 80000,
      balance: 40000,
      status: 'partial'
    }
  },

  {
    id: 'student-003',
    studentId: 'MOL/JSS1/2024/003',
    firstName: 'Muhammad',
    lastName: 'Ibrahim',
    middleName: 'Sani',
    fullName: 'Muhammad Sani Ibrahim',
    class: 'JSS 1B',
    level: EDUCATION_LEVELS.JSS1,
    stream: null,
    dateOfBirth: '2010-11-08',
    age: 13,
    gender: 'Male',
    address: '12 Murtala Mohammed Way, Kano',
    parentName: 'Alhaji Sani Ibrahim',
    parentPhone: '+234 803 345 6789',
    parentEmail: 's.ibrahim@email.com',
    stateOfOrigin: 'Kano',
    house: HOUSE_SYSTEMS[2], // Green House
    dateOfAdmission: '2024-09-01',
    avatar: generateAvatar('Muhammad Ibrahim', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 120000,
      paid: 120000,
      balance: 0,
      status: 'paid'
    }
  },

  // JSS 2 STUDENTS
  {
    id: 'student-004',
    studentId: 'MOL/JSS2/2023/015',
    firstName: 'Funmilayo',
    lastName: 'Adebisi',
    middleName: 'Oluwatobi',
    fullName: 'Funmilayo Oluwatobi Adebisi',
    class: 'JSS 2A',
    level: EDUCATION_LEVELS.JSS2,
    stream: null,
    dateOfBirth: '2009-05-30',
    age: 15,
    gender: 'Female',
    address: '78 Ikorodu Road, Maryland, Lagos',
    parentName: 'Dr. Folake Adebisi',
    parentPhone: '+234 803 456 7890',
    parentEmail: 'f.adebisi@email.com',
    stateOfOrigin: 'Ogun',
    house: HOUSE_SYSTEMS[3], // Yellow House
    dateOfAdmission: '2023-09-01',
    avatar: generateAvatar('Funmilayo Adebisi', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 130000,
      paid: 130000,
      balance: 0,
      status: 'paid'
    }
  },

  // JSS 3 STUDENTS
  {
    id: 'student-005',
    studentId: 'MOL/JSS3/2022/025',
    firstName: 'Emeka',
    lastName: 'Nwosu',
    middleName: 'Chibuike',
    fullName: 'Emeka Chibuike Nwosu',
    class: 'JSS 3A',
    level: EDUCATION_LEVELS.JSS3,
    stream: null,
    dateOfBirth: '2008-12-12',
    age: 15,
    gender: 'Male',
    address: '90 Awolowo Road, Ikoyi, Lagos',
    parentName: 'Engr. Chukwuma Nwosu',
    parentPhone: '+234 803 567 8901',
    parentEmail: 'c.nwosu@email.com',
    stateOfOrigin: 'Imo',
    house: HOUSE_SYSTEMS[0], // Red House
    dateOfAdmission: '2022-09-01',
    avatar: generateAvatar('Emeka Nwosu', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 140000,
      paid: 90000,
      balance: 50000,
      status: 'partial'
    }
  },

  // SSS 1 STUDENTS (with streams)
  {
    id: 'student-006',
    studentId: 'MOL/SSS1/2024/008',
    firstName: 'Kemi',
    lastName: 'Ogundimu',
    middleName: 'Adunni',
    fullName: 'Kemi Adunni Ogundimu',
    class: 'SSS 1A',
    level: EDUCATION_LEVELS.SSS1,
    stream: ACADEMIC_STREAMS.SCIENCES,
    dateOfBirth: '2007-02-18',
    age: 17,
    gender: 'Female',
    address: '34 Allen Avenue, Ikeja, Lagos',
    parentName: 'Mr. Tunde Ogundimu',
    parentPhone: '+234 803 678 9012',
    parentEmail: 't.ogundimu@email.com',
    stateOfOrigin: 'Osun',
    house: HOUSE_SYSTEMS[1], // Blue House
    dateOfAdmission: '2024-09-01',
    avatar: generateAvatar('Kemi Ogundimu', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 180000,
      paid: 180000,
      balance: 0,
      status: 'paid'
    }
  },

  {
    id: 'student-007',
    studentId: 'MOL/SSS1/2024/012',
    firstName: 'Yakubu',
    lastName: 'Garba',
    middleName: 'Musa',
    fullName: 'Yakubu Musa Garba',
    class: 'SSS 1B',
    level: EDUCATION_LEVELS.SSS1,
    stream: ACADEMIC_STREAMS.COMMERCIAL,
    dateOfBirth: '2007-09-25',
    age: 17,
    gender: 'Male',
    address: '67 Ahmadu Bello Way, Kaduna',
    parentName: 'Alhaji Musa Garba',
    parentPhone: '+234 803 789 0123',
    parentEmail: 'm.garba@email.com',
    stateOfOrigin: 'Kaduna',
    house: HOUSE_SYSTEMS[2], // Green House
    dateOfAdmission: '2024-09-01',
    avatar: generateAvatar('Yakubu Garba', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 180000,
      paid: 50000,
      balance: 130000,
      status: 'pending'
    }
  },

  // SSS 2 STUDENTS
  {
    id: 'student-008',
    studentId: 'MOL/SSS2/2023/003',
    firstName: 'Blessing',
    lastName: 'Eze',
    middleName: 'Chiamaka',
    fullName: 'Blessing Chiamaka Eze',
    class: 'SSS 2A',
    level: EDUCATION_LEVELS.SSS2,
    stream: ACADEMIC_STREAMS.ARTS,
    dateOfBirth: '2006-06-14',
    age: 18,
    gender: 'Female',
    address: '56 Independence Layout, Enugu',
    parentName: 'Prof. Chukwuma Eze',
    parentPhone: '+234 803 890 1234',
    parentEmail: 'c.eze@email.com',
    stateOfOrigin: 'Enugu',
    house: HOUSE_SYSTEMS[3], // Yellow House
    dateOfAdmission: '2023-09-01',
    avatar: generateAvatar('Blessing Eze', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 200000,
      paid: 200000,
      balance: 0,
      status: 'paid'
    }
  },

  // SSS 3 STUDENTS (WAEC candidates)
  {
    id: 'student-009',
    studentId: 'MOL/SSS3/2022/001',
    firstName: 'David',
    lastName: 'Adeyemi',
    middleName: 'Olumide',
    fullName: 'David Olumide Adeyemi',
    class: 'SSS 3A',
    level: EDUCATION_LEVELS.SSS3,
    stream: ACADEMIC_STREAMS.SCIENCES,
    dateOfBirth: '2005-04-03',
    age: 19,
    gender: 'Male',
    address: '89 Ojuelegba Road, Surulere, Lagos',
    parentName: 'Dr. Funmi Adeyemi',
    parentPhone: '+234 803 901 2345',
    parentEmail: 'f.adeyemi@email.com',
    stateOfOrigin: 'Ekiti',
    house: HOUSE_SYSTEMS[0], // Red House
    dateOfAdmission: '2022-09-01',
    avatar: generateAvatar('David Adeyemi', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 220000,
      paid: 220000,
      balance: 0,
      status: 'paid'
    },
    waecCandidate: true,
    waecRegistrationNumber: 'WAE2024001234567'
  },

  {
    id: 'student-010',
    studentId: 'MOL/SSS3/2022/005',
    firstName: 'Aminat',
    lastName: 'Bello',
    middleName: 'Rukayya',
    fullName: 'Aminat Rukayya Bello',
    class: 'SSS 3B',
    level: EDUCATION_LEVELS.SSS3,
    stream: ACADEMIC_STREAMS.COMMERCIAL,
    dateOfBirth: '2005-10-28',
    age: 18,
    gender: 'Female',
    address: '123 Zoo Road, Kano State',
    parentName: 'Alhaji Usman Bello',
    parentPhone: '+234 803 012 3456',
    parentEmail: 'u.bello@email.com',
    stateOfOrigin: 'Kano',
    house: HOUSE_SYSTEMS[1], // Blue House
    dateOfAdmission: '2022-09-01',
    avatar: generateAvatar('Aminat Bello', 'student'),
    isActive: true,
    academicYear: '2024/2025',
    fees: {
      total: 220000,
      paid: 170000,
      balance: 50000,
      status: 'partial'
    },
    waecCandidate: true,
    waecRegistrationNumber: 'WAE2024001234568'
  }
];

// Helper functions for student management
export const getStudentsByClass = (className) => {
  return mockStudentsData.filter(student => student.class === className);
};

export const getStudentsByLevel = (level) => {
  return mockStudentsData.filter(student => student.level === level);
};

export const getStudentsByStream = (stream) => {
  return mockStudentsData.filter(student => student.stream === stream);
};

export const getStudentsByHouse = (houseName) => {
  return mockStudentsData.filter(student => student.house.name === houseName);
};

export const getWAECCandidates = () => {
  return mockStudentsData.filter(student => student.waecCandidate === true);
};

export const getStudentsByFeeStatus = (status) => {
  return mockStudentsData.filter(student => student.fees.status === status);
};

export const getTotalStudentCount = () => mockStudentsData.length;

export const getJSSStudents = () => {
  return mockStudentsData.filter(student => 
    student.level.includes('JSS')
  );
};

export const getSSSStudents = () => {
  return mockStudentsData.filter(student => 
    student.level.includes('SSS')
  );
};

export const getOutstandingFees = () => {
  return mockStudentsData.reduce((total, student) => 
    total + student.fees.balance, 0
  );
};

export default mockStudents;
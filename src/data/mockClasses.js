// File Location: src/data/mockClasses.js

import { CLASS_STRUCTURE, SCIENCE_SUBJECTS, ARTS_SUBJECTS, COMMERCIAL_SUBJECTS, CORE_SUBJECTS } from '../utils/nigerianEducationSystem.js';

/**
 * Mock Classes Data for Nigerian Secondary School
 * JSS/SSS class structure with assigned teachers and students
 */

export const mockClasses = [
  // JSS 1 Classes
  {
    id: 'CLS001',
    name: 'JSS 1A',
    level: 'JSS',
    grade: 1,
    stream: null,
    capacity: 40,
    currentEnrollment: 35,
    classTeacher: 'T001', // Mrs. Amaka Nwosu
    classTeacherName: 'Mrs. Amaka Nwosu',
    subjects: CORE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block A, Room 101',
    timetable: {
      monday: [
        { period: 1, subject: 'Mathematics', teacher: 'T001', time: '8:00-8:40' },
        { period: 2, subject: 'English Language', teacher: 'T002', time: '8:40-9:20' },
        { period: 3, subject: 'Basic Science', teacher: 'T003', time: '9:20-10:00' },
        { period: 4, subject: 'Break', teacher: null, time: '10:00-10:30' },
        { period: 5, subject: 'Social Studies', teacher: 'T004', time: '10:30-11:10' },
        { period: 6, subject: 'Basic Technology', teacher: 'T005', time: '11:10-11:50' },
        { period: 7, subject: 'French Language', teacher: 'T006', time: '11:50-12:30' },
        { period: 8, subject: 'Lunch Break', teacher: null, time: '12:30-13:00' },
        { period: 9, subject: 'Physical Education', teacher: 'T007', time: '13:00-13:40' }
      ]
    },
    isActive: true
  },
  {
    id: 'CLS002',
    name: 'JSS 1B',
    level: 'JSS',
    grade: 1,
    stream: null,
    capacity: 40,
    currentEnrollment: 32,
    classTeacher: 'T002',
    classTeacherName: 'Mr. Ibrahim Yusuf',
    subjects: CORE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block A, Room 102',
    isActive: true
  },

  // JSS 2 Classes
  {
    id: 'CLS003',
    name: 'JSS 2A',
    level: 'JSS',
    grade: 2,
    stream: null,
    capacity: 40,
    currentEnrollment: 38,
    classTeacher: 'T003',
    classTeacherName: 'Miss Blessing Okoro',
    subjects: CORE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block A, Room 201',
    isActive: true
  },
  {
    id: 'CLS004',
    name: 'JSS 2B',
    level: 'JSS',
    grade: 2,
    stream: null,
    capacity: 40,
    currentEnrollment: 33,
    classTeacher: 'T004',
    classTeacherName: 'Mallam Ahmed Bello',
    subjects: CORE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block A, Room 202',
    isActive: true
  },

  // JSS 3 Classes
  {
    id: 'CLS005',
    name: 'JSS 3A',
    level: 'JSS',
    grade: 3,
    stream: null,
    capacity: 40,
    currentEnrollment: 36,
    classTeacher: 'T005',
    classTeacherName: 'Dr. Kemi Adeoye',
    subjects: CORE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block B, Room 101',
    specialNote: 'Preparing for BECE (Basic Education Certificate Examination)',
    isActive: true
  },
  {
    id: 'CLS006',
    name: 'JSS 3B',
    level: 'JSS',
    grade: 3,
    stream: null,
    capacity: 40,
    currentEnrollment: 34,
    classTeacher: 'T006',
    classTeacherName: 'Mr. Tunde Bakare',
    subjects: CORE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block B, Room 102',
    specialNote: 'Preparing for BECE (Basic Education Certificate Examination)',
    isActive: true
  },

  // SSS 1 Classes (with streams)
  {
    id: 'CLS007',
    name: 'SSS 1A',
    level: 'SSS',
    grade: 1,
    stream: 'SCIENCE',
    capacity: 35,
    currentEnrollment: 30,
    classTeacher: 'T001',
    classTeacherName: 'Mrs. Amaka Nwosu',
    subjects: SCIENCE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block C, Room 101',
    streamDescription: 'Science Stream - Mathematics, Physics, Chemistry, Biology focus',
    isActive: true
  },
  {
    id: 'CLS008',
    name: 'SSS 1B',
    level: 'SSS',
    grade: 1,
    stream: 'COMMERCIAL',
    capacity: 35,
    currentEnrollment: 28,
    classTeacher: 'T007',
    classTeacherName: 'Mrs. Grace Okafor',
    subjects: COMMERCIAL_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block C, Room 102',
    streamDescription: 'Commercial Stream - Accounting, Economics, Commerce focus',
    isActive: true
  },
  {
    id: 'CLS009',
    name: 'SSS 1C',
    level: 'SSS',
    grade: 1,
    stream: 'ARTS',
    capacity: 35,
    currentEnrollment: 25,
    classTeacher: 'T002',
    classTeacherName: 'Mr. Ibrahim Yusuf',
    subjects: ARTS_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block C, Room 103',
    streamDescription: 'Arts Stream - Literature, History, Government, Languages focus',
    isActive: true
  },

  // SSS 2 Classes
  {
    id: 'CLS010',
    name: 'SSS 2A',
    level: 'SSS',
    grade: 2,
    stream: 'SCIENCE',
    capacity: 35,
    currentEnrollment: 32,
    classTeacher: 'T003',
    classTeacherName: 'Miss Blessing Okoro',
    subjects: SCIENCE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block C, Room 201',
    specialNote: 'Focus on WAEC preparation and practical work',
    isActive: true
  },
  {
    id: 'CLS011',
    name: 'SSS 2B',
    level: 'SSS',
    grade: 2,
    stream: 'COMMERCIAL',
    capacity: 35,
    currentEnrollment: 29,
    classTeacher: 'T007',
    classTeacherName: 'Mrs. Grace Okafor',
    subjects: COMMERCIAL_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block C, Room 202',
    specialNote: 'Advanced accounting and business studies',
    isActive: true
  },
  {
    id: 'CLS012',
    name: 'SSS 2C',
    level: 'SSS',
    grade: 2,
    stream: 'ARTS',
    capacity: 35,
    currentEnrollment: 26,
    classTeacher: 'T004',
    classTeacherName: 'Mallam Ahmed Bello',
    subjects: ARTS_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block C, Room 203',
    specialNote: 'Advanced literature and social sciences',
    isActive: true
  },

  // SSS 3 Classes (WAEC Candidates)
  {
    id: 'CLS013',
    name: 'SSS 3A',
    level: 'SSS',
    grade: 3,
    stream: 'SCIENCE',
    capacity: 35,
    currentEnrollment: 31,
    classTeacher: 'T001',
    classTeacherName: 'Mrs. Amaka Nwosu',
    subjects: SCIENCE_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block D, Room 101',
    specialNote: 'WAEC/NECO Candidates - Final year preparations',
    examPreparation: ['WAEC', 'NECO', 'JAMB'],
    isWAECClass: true,
    isActive: true
  },
  {
    id: 'CLS014',
    name: 'SSS 3B',
    level: 'SSS',
    grade: 3,
    stream: 'COMMERCIAL',
    capacity: 35,
    currentEnrollment: 27,
    classTeacher: 'T007',
    classTeacherName: 'Mrs. Grace Okafor',
    subjects: COMMERCIAL_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block D, Room 102',
    specialNote: 'WAEC/NECO Candidates - Business/Commercial focus',
    examPreparation: ['WAEC', 'NECO', 'JAMB'],
    isWAECClass: true,
    isActive: true
  },
  {
    id: 'CLS015',
    name: 'SSS 3C',
    level: 'SSS',
    grade: 3,
    stream: 'ARTS',
    capacity: 35,
    currentEnrollment: 24,
    classTeacher: 'T002',
    classTeacherName: 'Mr. Ibrahim Yusuf',
    subjects: ARTS_SUBJECTS,
    academicYear: '2024/2025',
    term: 'First Term',
    classroom: 'Block D, Room 103',
    specialNote: 'WAEC/NECO Candidates - Humanities focus',
    examPreparation: ['WAEC', 'NECO', 'JAMB'],
    isWAECClass: true,
    isActive: true
  }
];

// Helper functions for class data
export const getClassesByLevel = (level) => {
  return mockClasses.filter(cls => cls.level === level);
};

export const getClassesByGrade = (grade) => {
  return mockClasses.filter(cls => cls.grade === grade);
};

export const getClassesByStream = (stream) => {
  return mockClasses.filter(cls => cls.stream === stream);
};

export const getClassesByTeacher = (teacherId) => {
  return mockClasses.filter(cls => cls.classTeacher === teacherId);
};

export const getWAECClasses = () => {
  return mockClasses.filter(cls => cls.isWAECClass);
};

export const getClassById = (classId) => {
  return mockClasses.find(cls => cls.id === classId);
};

export const getClassByName = (className) => {
  return mockClasses.find(cls => cls.name === className);
};

// Get all unique levels
export const getAllLevels = () => {
  return [...new Set(mockClasses.map(cls => cls.level))];
};

// Get all unique streams (excluding null)
export const getAllStreams = () => {
  return [...new Set(mockClasses.map(cls => cls.stream).filter(Boolean))];
};

// Class statistics
export const getClassStatistics = () => {
  const totalClasses = mockClasses.length;
  const jssClasses = mockClasses.filter(c => c.level === 'JSS').length;
  const sssClasses = mockClasses.filter(c => c.level === 'SSS').length;
  const waecClasses = mockClasses.filter(c => c.isWAECClass).length;
  
  const totalCapacity = mockClasses.reduce((sum, c) => sum + c.capacity, 0);
  const totalEnrollment = mockClasses.reduce((sum, c) => sum + c.currentEnrollment, 0);
  const utilizationRate = Math.round((totalEnrollment / totalCapacity) * 100);

  return {
    totalClasses,
    jssClasses,
    sssClasses,
    waecClasses,
    totalCapacity,
    totalEnrollment,
    utilizationRate,
    streams: {
      science: mockClasses.filter(c => c.stream === 'SCIENCE').length,
      arts: mockClasses.filter(c => c.stream === 'ARTS').length,
      commercial: mockClasses.filter(c => c.stream === 'COMMERCIAL').length
    }
  };
};

// Get class capacity status
export const getClassCapacityStatus = (className) => {
  const cls = getClassByName(className);
  if (!cls) return null;
  
  const utilizationRate = (cls.currentEnrollment / cls.capacity) * 100;
  let status = 'normal';
  
  if (utilizationRate >= 95) status = 'full';
  else if (utilizationRate >= 85) status = 'near_full';
  else if (utilizationRate <= 60) status = 'under_utilized';
  
  return {
    className: cls.name,
    capacity: cls.capacity,
    enrollment: cls.currentEnrollment,
    available: cls.capacity - cls.currentEnrollment,
    utilizationRate: Math.round(utilizationRate),
    status
  };
};
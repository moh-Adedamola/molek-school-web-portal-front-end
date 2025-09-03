// File Location: src/data/mockUsers.js

import { USER_ROLES } from '../utils/constants.js';

/**
 * Mock Users for Nigerian Secondary School Management System
 * Includes Super Admin, Admin, Teacher, and Parent users
 */

export const mockUsers = [
  // Super Admin User
  {
    id: 'SA001',
    role: USER_ROLES.SUPER_ADMIN,
    email: 'superadmin@education.gov.ng',
    password: 'SuperAdmin123!',
    firstName: 'Emmanuel',
    lastName: 'Adebayo',
    fullName: 'Emmanuel Adebayo',
    phone: '+2348012345678',
    isActive: true,
    createdAt: '2024-01-15T08:00:00Z',
    lastLogin: '2024-08-30T14:30:00Z',
    profileImage: '/images/profiles/super-admin.jpg'
  },

  // Admin Users
  {
    id: 'A001',
    role: USER_ROLES.ADMIN,
    email: 'principal@greenviewsecondary.edu.ng',
    password: 'Principal123!',
    firstName: 'Dr. Funmilayo',
    lastName: 'Okafor',
    fullName: 'Dr. Funmilayo Okafor',
    title: 'Principal',
    phone: '+2348023456789',
    address: 'Victoria Island, Lagos',
    isActive: true,
    createdAt: '2024-01-20T09:00:00Z',
    lastLogin: '2024-08-31T07:45:00Z',
    profileImage: '/images/profiles/principal.jpg'
  },
  {
    id: 'A002', 
    role: USER_ROLES.ADMIN,
    email: 'vp.academic@greenviewsecondary.edu.ng',
    password: 'ViceP123!',
    firstName: 'Prof. Chukwuemeka',
    lastName: 'Igwe',
    fullName: 'Prof. Chukwuemeka Igwe',
    title: 'Vice Principal (Academic)',
    phone: '+2348034567890',
    address: 'Ikeja, Lagos',
    isActive: true,
    createdAt: '2024-01-22T10:00:00Z',
    lastLogin: '2024-08-30T16:20:00Z',
    profileImage: '/images/profiles/vp-academic.jpg'
  },

  // Teacher Users
  {
    id: 'T001',
    role: USER_ROLES.TEACHER,
    email: 'amaka.nwosu@greenviewsecondary.edu.ng',
    password: 'Teacher123!',
    firstName: 'Amaka',
    lastName: 'Nwosu',
    fullName: 'Mrs. Amaka Nwosu',
    title: 'Mathematics Teacher',
    phone: '+2348045678901',
    subjects: ['Mathematics', 'Further Mathematics'],
    classes: ['SSS 1A', 'SSS 2A', 'SSS 3A'],
    qualification: 'B.Sc Mathematics, M.Ed',
    yearsExperience: 8,
    isActive: true,
    createdAt: '2024-02-01T08:30:00Z',
    lastLogin: '2024-08-31T06:30:00Z',
    profileImage: '/images/profiles/teacher-amaka.jpg'
  },
  {
    id: 'T002',
    role: USER_ROLES.TEACHER,
    email: 'ibrahim.yusuf@greenviewsecondary.edu.ng',
    password: 'Teacher123!',
    firstName: 'Ibrahim',
    lastName: 'Yusuf',
    fullName: 'Mr. Ibrahim Yusuf',
    title: 'English Language Teacher',
    phone: '+2348056789012',
    subjects: ['English Language', 'Literature in English'],
    classes: ['JSS 1A', 'JSS 2A', 'SSS 1B'],
    qualification: 'B.A English, PGDE',
    yearsExperience: 12,
    isActive: true,
    createdAt: '2024-02-05T09:00:00Z',
    lastLogin: '2024-08-30T15:45:00Z',
    profileImage: '/images/profiles/teacher-ibrahim.jpg'
  },
  {
    id: 'T003',
    role: USER_ROLES.TEACHER,
    email: 'blessing.okoro@greenviewsecondary.edu.ng',
    password: 'Teacher123!',
    firstName: 'Blessing',
    lastName: 'Okoro',
    fullName: 'Miss Blessing Okoro',
    title: 'Physics Teacher',
    phone: '+2348067890123',
    subjects: ['Physics', 'Basic Science'],
    classes: ['JSS 3A', 'SSS 2A', 'SSS 3A'],
    qualification: 'B.Sc Physics, B.Ed',
    yearsExperience: 5,
    isActive: true,
    createdAt: '2024-02-10T08:00:00Z',
    lastLogin: '2024-08-31T07:00:00Z',
    profileImage: '/images/profiles/teacher-blessing.jpg'
  },
  {
    id: 'T004',
    role: USER_ROLES.TEACHER,
    email: 'ahmed.bello@greenviewsecondary.edu.ng',
    password: 'Teacher123!',
    firstName: 'Ahmed',
    lastName: 'Bello',
    fullName: 'Mallam Ahmed Bello',
    title: 'Government Teacher',
    phone: '+2348078901234',
    subjects: ['Government', 'History', 'Civic Education'],
    classes: ['JSS 2B', 'SSS 1C', 'SSS 2B'],
    qualification: 'B.Sc Political Science, PGDE',
    yearsExperience: 10,
    isActive: true,
    createdAt: '2024-02-12T09:30:00Z',
    lastLogin: '2024-08-30T14:15:00Z',
    profileImage: '/images/profiles/teacher-ahmed.jpg'
  },

  // Parent Users
  {
    id: 'P001',
    role: USER_ROLES.PARENT,
    email: 'adunni.williams@gmail.com',
    password: 'Parent123!',
    firstName: 'Adunni',
    lastName: 'Williams',
    fullName: 'Mrs. Adunni Williams',
    phone: '+2348089012345',
    address: 'Lekki Phase 1, Lagos',
    occupation: 'Banker',
    children: ['S001', 'S015'], // Student IDs
    emergencyContact: '+2348123456789',
    isActive: true,
    createdAt: '2024-02-15T10:00:00Z',
    lastLogin: '2024-08-31T06:45:00Z',
    profileImage: '/images/profiles/parent-adunni.jpg'
  },
  {
    id: 'P002',
    role: USER_ROLES.PARENT,
    email: 'chioma.okonkwo@yahoo.com',
    password: 'Parent123!',
    firstName: 'Chioma',
    lastName: 'Okonkwo',
    fullName: 'Mrs. Chioma Okonkwo',
    phone: '+2348090123456',
    address: 'Surulere, Lagos',
    occupation: 'Nurse',
    children: ['S002', 'S018'],
    emergencyContact: '+2348134567890',
    isActive: true,
    createdAt: '2024-02-18T11:00:00Z',
    lastLogin: '2024-08-30T19:30:00Z',
    profileImage: '/images/profiles/parent-chioma.jpg'
  },
  {
    id: 'P003',
    role: USER_ROLES.PARENT,
    email: 'kemi.adebisi@outlook.com',
    password: 'Parent123!',
    firstName: 'Kemi',
    lastName: 'Adebisi',
    fullName: 'Mrs. Kemi Adebisi',
    phone: '+2348101234567',
    address: 'Ikoyi, Lagos',
    occupation: 'Lawyer',
    children: ['S005'],
    emergencyContact: '+2348145678901',
    isActive: true,
    createdAt: '2024-02-20T12:00:00Z',
    lastLogin: '2024-08-31T08:15:00Z',
    profileImage: '/images/profiles/parent-kemi.jpg'
  },
  {
    id: 'P004',
    role: USER_ROLES.PARENT,
    email: 'musa.ibrahim@gmail.com',
    password: 'Parent123!',
    firstName: 'Musa',
    lastName: 'Ibrahim',
    fullName: 'Alhaji Musa Ibrahim',
    phone: '+2348112345678',
    address: 'Ikotun, Lagos',
    occupation: 'Engineer',
    children: ['S008', 'S022'],
    emergencyContact: '+2348156789012',
    isActive: true,
    createdAt: '2024-02-22T13:00:00Z',
    lastLogin: '2024-08-30T17:00:00Z',
    profileImage: '/images/profiles/parent-musa.jpg'
  }
];

// Login credentials for easy testing
export const DEFAULT_CREDENTIALS = {
  SUPER_ADMIN: {
    email: 'superadmin@education.gov.ng',
    password: 'SuperAdmin123!'
  },
  ADMIN: {
    email: 'principal@greenviewsecondary.edu.ng',
    password: 'Principal123!'
  },
  TEACHER: {
    email: 'amaka.nwosu@greenviewsecondary.edu.ng',
    password: 'Teacher123!'
  },
  PARENT: {
    email: 'adunni.williams@gmail.com',
    password: 'Parent123!'
  }
};

// Helper function to get user by email
export const getUserByEmail = (email) => {
  return mockUsers.find(user => user.email === email);
};

// Helper function to get users by role
export const getUsersByRole = (role) => {
  return mockUsers.filter(user => user.role === role);
};

// Helper function to authenticate user
export const authenticateUser = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user && user.isActive) {
    return {
      ...user,
      password: undefined // Remove password from returned data
    };
  }
  return null;
};
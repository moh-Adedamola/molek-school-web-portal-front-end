// data/mockStaff.js
// Nigerian school staff directory with authentic names and positions

import { generateAvatar } from '../utils/imageHelpers';

export const STAFF_DEPARTMENTS = {
  ADMINISTRATION: 'Administration',
  TEACHING: 'Teaching Staff',
  NON_TEACHING: 'Non-Teaching Staff',
  SECURITY: 'Security',
  SUPPORT: 'Support Staff'
};

export const mockStaffData = [
  // ADMINISTRATION
  {
    id: 'staff-001',
    employeeId: 'MOL/ADM/001',
    firstName: 'Adebayo',
    lastName: 'Olumide',
    middleName: 'Kehinde',
    fullName: 'Dr. Adebayo Kehinde Olumide',
    position: 'Principal',
    department: STAFF_DEPARTMENTS.ADMINISTRATION,
    qualification: 'Ph.D. Educational Administration',
    email: 'principal@molekschool.edu.ng',
    phone: '+234 803 123 4567',
    address: '23 Victoria Avenue, Lagos State',
    dateOfBirth: '1975-08-15',
    dateOfEmployment: '2010-09-01',
    gender: 'Male',
    maritalStatus: 'Married',
    stateOfOrigin: 'Lagos',
    salary: 850000,
    avatar: generateAvatar('Adebayo Olumide', 'admin'),
    bio: 'Experienced educator with over 15 years in school administration.',
    subjects: [],
    classes: [],
    isActive: true
  },
  
  {
    id: 'staff-002', 
    employeeId: 'MOL/ADM/002',
    firstName: 'Chinelo',
    lastName: 'Okafor',
    middleName: 'Ngozi',
    fullName: 'Mrs. Chinelo Ngozi Okafor',
    position: 'Vice Principal (Academics)',
    department: STAFF_DEPARTMENTS.ADMINISTRATION,
    qualification: 'M.Ed. Curriculum Studies',
    email: 'vp.academics@molekschool.edu.ng',
    phone: '+234 803 234 5678',
    address: '45 Allen Avenue, Ikeja, Lagos',
    dateOfBirth: '1978-12-03',
    dateOfEmployment: '2012-01-15',
    gender: 'Female',
    maritalStatus: 'Married',
    stateOfOrigin: 'Anambra',
    salary: 720000,
    avatar: generateAvatar('Chinelo Okafor', 'admin'),
    bio: 'Passionate about curriculum development and academic excellence.',
    subjects: [],
    classes: [],
    isActive: true
  },

  {
    id: 'staff-003',
    employeeId: 'MOL/ADM/003', 
    firstName: 'Ibrahim',
    lastName: 'Musa',
    middleName: 'Sani',
    fullName: 'Mr. Ibrahim Sani Musa',
    position: 'Vice Principal (Administration)',
    department: STAFF_DEPARTMENTS.ADMINISTRATION,
    qualification: 'M.Sc. Educational Management',
    email: 'vp.admin@molekschool.edu.ng',
    phone: '+234 803 345 6789',
    address: '12 Ahmadu Bello Way, Lagos',
    dateOfBirth: '1980-05-22',
    dateOfEmployment: '2013-08-01',
    gender: 'Male',
    maritalStatus: 'Married',
    stateOfOrigin: 'Kaduna',
    salary: 720000,
    avatar: generateAvatar('Ibrahim Musa', 'admin'),
    bio: 'Expert in school administration and student welfare management.',
    subjects: [],
    classes: [],
    isActive: true
  },

  // SENIOR TEACHING STAFF
  {
    id: 'staff-004',
    employeeId: 'MOL/TCH/001',
    firstName: 'Folakemi',
    lastName: 'Adebisi',
    middleName: 'Oluwatoyin',
    fullName: 'Mrs. Folakemi Oluwatoyin Adebisi',
    position: 'HOD Mathematics',
    department: STAFF_DEPARTMENTS.TEACHING,
    qualification: 'M.Sc. Mathematics Education',
    email: 'f.adebisi@molekschool.edu.ng',
    phone: '+234 803 456 7890',
    address: '8 Ikorodu Road, Maryland, Lagos',
    dateOfBirth: '1982-03-18',
    dateOfEmployment: '2014-09-01',
    gender: 'Female',
    maritalStatus: 'Married',
    stateOfOrigin: 'Ogun',
    salary: 450000,
    avatar: generateAvatar('Folakemi Adebisi', 'teacher'),
    bio: 'Mathematics specialist with passion for problem-solving skills.',
    subjects: ['Mathematics', 'Further Mathematics'],
    classes: ['SSS 3A', 'SSS 3B'],
    isActive: true
  },

  {
    id: 'staff-005',
    employeeId: 'MOL/TCH/002',
    firstName: 'Emeka',
    lastName: 'Okwu',
    middleName: 'Chinedu',
    fullName: 'Mr. Emeka Chinedu Okwu',
    position: 'HOD Sciences',
    department: STAFF_DEPARTMENTS.TEACHING,
    qualification: 'M.Sc. Physics Education',
    email: 'e.okwu@molekschool.edu.ng',
    phone: '+234 803 567 8901',
    address: '34 Surulere Street, Lagos',
    dateOfBirth: '1979-11-12',
    dateOfEmployment: '2011-01-10',
    gender: 'Male',
    maritalStatus: 'Married',
    stateOfOrigin: 'Imo',
    salary: 480000,
    avatar: generateAvatar('Emeka Okwu', 'teacher'),
    bio: 'Physics teacher dedicated to making science accessible to all students.',
    subjects: ['Physics', 'Basic Science'],
    classes: ['SSS 2A', 'JSS 3B'],
    isActive: true
  },

  {
    id: 'staff-006',
    employeeId: 'MOL/TCH/003',
    firstName: 'Aisha',
    lastName: 'Bello',
    middleName: 'Fatima',
    fullName: 'Mrs. Aisha Fatima Bello',
    position: 'English Language Teacher',
    department: STAFF_DEPARTMENTS.TEACHING,
    qualification: 'B.A. English Language',
    email: 'a.bello@molekschool.edu.ng',
    phone: '+234 803 678 9012',
    address: '56 Festac Town, Lagos',
    dateOfBirth: '1985-07-25',
    dateOfEmployment: '2016-09-01',
    gender: 'Female',
    maritalStatus: 'Single',
    stateOfOrigin: 'Kano',
    salary: 380000,
    avatar: generateAvatar('Aisha Bello', 'teacher'),
    bio: 'English language enthusiast focused on communication skills development.',
    subjects: ['English Language', 'Literature in English'],
    classes: ['JSS 2A', 'SSS 1C'],
    isActive: true
  },

  {
    id: 'staff-007',
    employeeId: 'MOL/TCH/004',
    firstName: 'Adunni',
    lastName: 'Ogundimu',
    middleName: 'Bukola',
    fullName: 'Miss Adunni Bukola Ogundimu',
    position: 'Biology Teacher',
    department: STAFF_DEPARTMENTS.TEACHING,
    qualification: 'B.Sc. Biology Education',
    email: 'a.ogundimu@molekschool.edu.ng',
    phone: '+234 803 789 0123',
    address: '22 Agege Motor Road, Lagos',
    dateOfBirth: '1988-01-14',
    dateOfEmployment: '2018-01-08',
    gender: 'Female',
    maritalStatus: 'Single',
    stateOfOrigin: 'Osun',
    salary: 350000,
    avatar: generateAvatar('Adunni Ogundimu', 'teacher'),
    bio: 'Young and dynamic biology teacher passionate about life sciences.',
    subjects: ['Biology', 'Agricultural Science'],
    classes: ['SSS 1A', 'SSS 2B'],
    isActive: true
  },

  {
    id: 'staff-008',
    employeeId: 'MOL/TCH/005',
    firstName: 'Yakubu',
    lastName: 'Garba',
    middleName: 'Ahmed',
    fullName: 'Malam Yakubu Ahmed Garba',
    position: 'Chemistry Teacher',
    department: STAFF_DEPARTMENTS.TEACHING,
    qualification: 'B.Sc. Chemistry',
    email: 'y.garba@molekschool.edu.ng',
    phone: '+234 803 890 1234',
    address: '67 Dopemu Road, Agege, Lagos',
    dateOfBirth: '1983-09-30',
    dateOfEmployment: '2015-09-01',
    gender: 'Male',
    maritalStatus: 'Married',
    stateOfOrigin: 'Sokoto',
    salary: 420000,
    avatar: generateAvatar('Yakubu Garba', 'teacher'),
    bio: 'Chemistry expert with focus on practical laboratory work.',
    subjects: ['Chemistry', 'Basic Science'],
    classes: ['SSS 3C', 'JSS 1A'],
    isActive: true
  },

  // NON-TEACHING STAFF
  {
    id: 'staff-009',
    employeeId: 'MOL/NTS/001',
    firstName: 'Funmi',
    lastName: 'Adeyemi',
    middleName: 'Opeyemi',
    fullName: 'Mrs. Funmi Opeyemi Adeyemi',
    position: 'School Secretary',
    department: STAFF_DEPARTMENTS.NON_TEACHING,
    qualification: 'HND Business Administration',
    email: 'secretary@molekschool.edu.ng',
    phone: '+234 803 901 2345',
    address: '15 Palmgrove Estate, Lagos',
    dateOfBirth: '1986-04-12',
    dateOfEmployment: '2017-03-01',
    gender: 'Female',
    maritalStatus: 'Married',
    stateOfOrigin: 'Ekiti',
    salary: 280000,
    avatar: generateAvatar('Funmi Adeyemi', 'admin'),
    bio: 'Efficient administrative support with excellent organizational skills.',
    subjects: [],
    classes: [],
    isActive: true
  },

  {
    id: 'staff-010',
    employeeId: 'MOL/NTS/002',
    firstName: 'Chukwuma',
    lastName: 'Eze',
    middleName: 'Patrick',
    fullName: 'Mr. Chukwuma Patrick Eze',
    position: 'Librarian',
    department: STAFF_DEPARTMENTS.NON_TEACHING,
    qualification: 'B.Sc. Library and Information Science',
    email: 'librarian@molekschool.edu.ng',
    phone: '+234 803 012 3456',
    address: '78 Oshodi Road, Lagos',
    dateOfBirth: '1984-02-28',
    dateOfEmployment: '2016-06-01',
    gender: 'Male',
    maritalStatus: 'Married',
    stateOfOrigin: 'Enugu',
    salary: 320000,
    avatar: generateAvatar('Chukwuma Eze', 'admin'),
    bio: 'Dedicated librarian promoting reading culture among students.',
    subjects: [],
    classes: [],
    isActive: true
  },

  {
    id: 'staff-011',
    employeeId: 'MOL/SEC/001',
    firstName: 'Bello',
    lastName: 'Mohammed',
    middleName: 'Usman',
    fullName: 'Mr. Bello Usman Mohammed',
    position: 'Head of Security',
    department: STAFF_DEPARTMENTS.SECURITY,
    qualification: 'SSCE',
    email: 'security@molekschool.edu.ng',
    phone: '+234 803 123 4567',
    address: '45 Alakuko Area, Lagos',
    dateOfBirth: '1972-06-10',
    dateOfEmployment: '2008-01-15',
    gender: 'Male',
    maritalStatus: 'Married',
    stateOfOrigin: 'Niger',
    salary: 180000,
    avatar: generateAvatar('Bello Mohammed', 'admin'),
    bio: 'Experienced security officer ensuring safe learning environment.',
    subjects: [],
    classes: [],
    isActive: true
  }
];

// Helper functions for staff management
export const getStaffByDepartment = (department) => {
  return mockStaffData.filter(staff => staff.department === department);
};

export const getTeachingStaff = () => {
  return mockStaffData.filter(staff => staff.department === STAFF_DEPARTMENTS.TEACHING);
};

export const getAdministrativeStaff = () => {
  return mockStaffData.filter(staff => staff.department === STAFF_DEPARTMENTS.ADMINISTRATION);
};

export const getStaffBySubject = (subject) => {
  return mockStaffData.filter(staff => staff.subjects.includes(subject));
};

export const getStaffByClass = (className) => {
  return mockStaffData.filter(staff => staff.classes.includes(className));
};

export const getTotalStaffCount = () => mockStaffData.length;

export const getActiveStaffCount = () => {
  return mockStaffData.filter(staff => staff.isActive).length;
};

export default mockStaffData;
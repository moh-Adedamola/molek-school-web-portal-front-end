// File Location: src/data/mockStaff.js

/**
 * Mock Staff Data for Nigerian Secondary School
 * Teaching and non-teaching staff with roles and subject assignments
 */

export const mockStaff = [
  // Senior Management
  {
    id: 'ST001',
    staffNumber: 'GVS/STAFF/001',
    firstName: 'Dr. Funmilayo',
    lastName: 'Okafor',
    fullName: 'Dr. Funmilayo Okafor',
    title: 'Principal',
    department: 'Management',
    category: 'Management',
    isTeaching: false,
    email: 'principal@greenviewsecondary.edu.ng',
    phone: '+2348023456789',
    qualification: 'Ph.D Educational Administration, M.Ed, B.Ed',
    yearsExperience: 20,
    dateJoined: '2020-01-15',
    address: 'Victoria Island, Lagos',
    profileImage: '/images/staff/principal-okafor.jpg',
    isActive: true
  },
  {
    id: 'ST002',
    staffNumber: 'GVS/STAFF/002',
    firstName: 'Prof. Chukwuemeka',
    lastName: 'Igwe',
    fullName: 'Prof. Chukwuemeka Igwe',
    title: 'Vice Principal (Academic)',
    department: 'Management',
    category: 'Management',
    isTeaching: true,
    subjects: ['Mathematics'],
    classes: ['SSS 3A'],
    email: 'vp.academic@greenviewsecondary.edu.ng',
    phone: '+2348034567890',
    qualification: 'Ph.D Mathematics, M.Sc, B.Sc',
    yearsExperience: 18,
    dateJoined: '2020-02-01',
    address: 'Ikeja, Lagos',
    profileImage: '/images/staff/vp-igwe.jpg',
    isActive: true
  },
  {
    id: 'ST003',
    staffNumber: 'GVS/STAFF/003',
    firstName: 'Mrs. Folake',
    lastName: 'Adeya',
    fullName: 'Mrs. Folake Adeya',
    title: 'Vice Principal (Administration)',
    department: 'Management',
    category: 'Management',
    isTeaching: false,
    email: 'vp.admin@greenviewsecondary.edu.ng',
    phone: '+2348045678901',
    qualification: 'M.Ed Educational Administration, B.Ed',
    yearsExperience: 15,
    dateJoined: '2021-01-10',
    address: 'Surulere, Lagos',
    profileImage: '/images/staff/vp-adeya.jpg',
    isActive: true
  },

  // Teaching Staff - Mathematics Department
  {
    id: 'ST004',
    staffNumber: 'GVS/STAFF/004',
    firstName: 'Mrs. Amaka',
    lastName: 'Nwosu',
    fullName: 'Mrs. Amaka Nwosu',
    title: 'Mathematics Teacher/HOD',
    department: 'Mathematics',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Mathematics', 'Further Mathematics'],
    classes: ['SSS 1A', 'SSS 2A', 'SSS 3A'],
    email: 'amaka.nwosu@greenviewsecondary.edu.ng',
    phone: '+2348045678901',
    qualification: 'B.Sc Mathematics, M.Ed, PGDE',
    yearsExperience: 8,
    dateJoined: '2022-02-01',
    address: 'Ikeja, Lagos',
    profileImage: '/images/staff/teacher-amaka.jpg',
    isActive: true
  },
  {
    id: 'ST005',
    staffNumber: 'GVS/STAFF/005',
    firstName: 'Mr. Segun',
    lastName: 'Alabi',
    fullName: 'Mr. Segun Alabi',
    title: 'Mathematics Teacher',
    department: 'Mathematics',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Mathematics', 'Basic Science'],
    classes: ['JSS 1A', 'JSS 2A', 'JSS 3A'],
    email: 'segun.alabi@greenviewsecondary.edu.ng',
    phone: '+2348056789012',
    qualification: 'B.Sc Mathematics, B.Ed',
    yearsExperience: 6,
    dateJoined: '2023-01-15',
    address: 'Agege, Lagos',
    profileImage: '/images/staff/teacher-segun.jpg',
    isActive: true
  },

  // English Department
  {
    id: 'ST006',
    staffNumber: 'GVS/STAFF/006',
    firstName: 'Mr. Ibrahim',
    lastName: 'Yusuf',
    fullName: 'Mr. Ibrahim Yusuf',
    title: 'English Language Teacher/HOD',
    department: 'English',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['English Language', 'Literature in English'],
    classes: ['JSS 1A', 'JSS 2A', 'SSS 1B'],
    email: 'ibrahim.yusuf@greenviewsecondary.edu.ng',
    phone: '+2348056789012',
    qualification: 'B.A English Language, M.A Literature, PGDE',
    yearsExperience: 12,
    dateJoined: '2021-02-05',
    address: 'Mushin, Lagos',
    profileImage: '/images/staff/teacher-ibrahim.jpg',
    isActive: true
  },

  // Sciences Department
  {
    id: 'ST007',
    staffNumber: 'GVS/STAFF/007',
    firstName: 'Miss Blessing',
    lastName: 'Okoro',
    fullName: 'Miss Blessing Okoro',
    title: 'Physics Teacher/Science HOD',
    department: 'Sciences',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Physics', 'Basic Science'],
    classes: ['JSS 3A', 'SSS 2A', 'SSS 3A'],
    email: 'blessing.okoro@greenviewsecondary.edu.ng',
    phone: '+2348067890123',
    qualification: 'B.Sc Physics, B.Ed, M.Sc Physics',
    yearsExperience: 5,
    dateJoined: '2023-02-10',
    address: 'Yaba, Lagos',
    profileImage: '/images/staff/teacher-blessing.jpg',
    isActive: true
  },
  {
    id: 'ST008',
    staffNumber: 'GVS/STAFF/008',
    firstName: 'Dr. Kemi',
    lastName: 'Adeoye',
    fullName: 'Dr. Kemi Adeoye',
    title: 'Chemistry Teacher',
    department: 'Sciences',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Chemistry', 'Basic Science'],
    classes: ['SSS 1A', 'SSS 2A', 'SSS 3A'],
    email: 'kemi.adeoye@greenviewsecondary.edu.ng',
    phone: '+2348078901234',
    qualification: 'Ph.D Chemistry, B.Sc Chemistry, B.Ed',
    yearsExperience: 10,
    dateJoined: '2022-03-01',
    address: 'Maryland, Lagos',
    profileImage: '/images/staff/teacher-kemi.jpg',
    isActive: true
  },
  {
    id: 'ST009',
    staffNumber: 'GVS/STAFF/009',
    firstName: 'Mr. Tunde',
    lastName: 'Bakare',
    fullName: 'Mr. Tunde Bakare',
    title: 'Biology Teacher',
    department: 'Sciences',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Biology', 'Agricultural Science'],
    classes: ['SSS 1A', 'SSS 2A', 'SSS 3A'],
    email: 'tunde.bakare@greenviewsecondary.edu.ng',
    phone: '+2348089012345',
    qualification: 'B.Sc Biology, M.Sc Botany, PGDE',
    yearsExperience: 7,
    dateJoined: '2022-08-15',
    address: 'Gbagada, Lagos',
    profileImage: '/images/staff/teacher-tunde.jpg',
    isActive: true
  },

  // Social Sciences Department
  {
    id: 'ST010',
    staffNumber: 'GVS/STAFF/010',
    firstName: 'Mallam Ahmed',
    lastName: 'Bello',
    fullName: 'Mallam Ahmed Bello',
    title: 'Government Teacher/Social Sciences HOD',
    department: 'Social Sciences',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Government', 'History', 'Civic Education'],
    classes: ['JSS 2B', 'SSS 1C', 'SSS 2B'],
    email: 'ahmed.bello@greenviewsecondary.edu.ng',
    phone: '+2348078901234',
    qualification: 'B.Sc Political Science, M.Sc International Relations, PGDE',
    yearsExperience: 10,
    dateJoined: '2021-02-12',
    address: 'Ikorodu, Lagos',
    profileImage: '/images/staff/teacher-ahmed.jpg',
    isActive: true
  },

  // Commercial Department
  {
    id: 'ST011',
    staffNumber: 'GVS/STAFF/011',
    firstName: 'Mrs. Grace',
    lastName: 'Okafor',
    fullName: 'Mrs. Grace Okafor',
    title: 'Accounting Teacher/Commercial HOD',
    department: 'Commercial',
    category: 'Teaching',
    isTeaching: true,
    subjects: ['Accounting', 'Economics', 'Commerce'],
    classes: ['SSS 1B', 'SSS 2B', 'SSS 3B'],
    email: 'grace.okafor@greenviewsecondary.edu.ng',
    phone: '+2348090123456',
    qualification: 'B.Sc Accounting, M.Sc Economics, PGDE',
    yearsExperience: 9,
    dateJoined: '2022-01-20',
    address: 'Ojodu, Lagos',
    profileImage: '/images/staff/teacher-grace.jpg',
    isActive: true
  },

  // Non-Teaching Staff
  {
    id: 'ST012',
    staffNumber: 'GVS/STAFF/012',
    firstName: 'Mr. Sunday',
    lastName: 'Ogundimu',
    fullName: 'Mr. Sunday Ogundimu',
    title: 'School Secretary',
    department: 'Administration',
    category: 'Non-Teaching',
    isTeaching: false,
    email: 'secretary@greenviewsecondary.edu.ng',
    phone: '+2348101234567',
    qualification: 'HND Business Administration',
    yearsExperience: 12,
    dateJoined: '2020-03-01',
    address: 'Ketu, Lagos',
    profileImage: '/images/staff/secretary-sunday.jpg',
    isActive: true
  },
  {
    id: 'ST013',
    staffNumber: 'GVS/STAFF/013',
    firstName: 'Mrs. Ngozi',
    lastName: 'Okpara',
    fullName: 'Mrs. Ngozi Okpara',
    title: 'School Nurse',
    department: 'Health Services',
    category: 'Non-Teaching',
    isTeaching: false,
    email: 'nurse@greenviewsecondary.edu.ng',
    phone: '+2348112345678',
    qualification: 'B.Sc Nursing, RN',
    yearsExperience: 8,
    dateJoined: '2021-05-15',
    address: 'Bariga, Lagos',
    profileImage: '/images/staff/nurse-ngozi.jpg',
    isActive: true
  },
  {
    id: 'ST014',
    staffNumber: 'GVS/STAFF/014',
    firstName: 'Mr. Joseph',
    lastName: 'Adamu',
    fullName: 'Mr. Joseph Adamu',
    title: 'Laboratory Technician',
    department: 'Sciences',
    category: 'Non-Teaching',
    isTeaching: false,
    email: 'lab.tech@greenviewsecondary.edu.ng',
    phone: '+2348123456789',
    qualification: 'OND Science Laboratory Technology',
    yearsExperience: 6,
    dateJoined: '2022-06-01',
    address: 'Palmgrove, Lagos',
    profileImage: '/images/staff/lab-tech-joseph.jpg',
    isActive: true
  },
  {
    id: 'ST015',
    staffNumber: 'GVS/STAFF/015',
    firstName: 'Mr. Emeka',
    lastName: 'Chijioke',
    fullName: 'Mr. Emeka Chijioke',
    title: 'ICT Coordinator',
    department: 'ICT',
    category: 'Non-Teaching',
    isTeaching: false,
    email: 'ict@greenviewsecondary.edu.ng',
    phone: '+2348134567890',
    qualification: 'B.Sc Computer Science',
    yearsExperience: 4,
    dateJoined: '2023-03-15',
    address: 'Alimosho, Lagos',
    profileImage: '/images/staff/ict-emeka.jpg',
    isActive: true
  }
];

// Helper functions for staff data
export const getTeachingStaff = () => {
  return mockStaff.filter(staff => staff.isTeaching);
};

export const getNonTeachingStaff = () => {
  return mockStaff.filter(staff => !staff.isTeaching);
};

export const getStaffByDepartment = (department) => {
  return mockStaff.filter(staff => staff.department === department);
};

export const getTeachersBySubject = (subject) => {
  return mockStaff.filter(staff => 
    staff.isTeaching && staff.subjects?.includes(subject)
  );
};

export const getTeachersByClass = (className) => {
  return mockStaff.filter(staff => 
    staff.isTeaching && staff.classes?.includes(className)
  );
};

export const getStaffById = (staffId) => {
  return mockStaff.find(staff => staff.id === staffId);
};

// Get all departments
export const getAllDepartments = () => {
  return [...new Set(mockStaff.map(staff => staff.department))];
};

// Get all subjects taught
export const getAllSubjectsTaught = () => {
  const subjects = mockStaff
    .filter(staff => staff.subjects)
    .flatMap(staff => staff.subjects);
  return [...new Set(subjects)].sort();
};

// Staff statistics
export const getStaffStatistics = () => {
  const total = mockStaff.length;
  const teaching = mockStaff.filter(s => s.isTeaching).length;
  const nonTeaching = mockStaff.filter(s => !s.isTeaching).length;
  const management = mockStaff.filter(s => s.category === 'Management').length;
  
  return {
    total,
    teaching,
    nonTeaching,
    management,
    departments: getAllDepartments().length
  };
};
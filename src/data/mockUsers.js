// Enhanced Mock Users Data - Nigerian Context
export const mockUsers = [
  // Super Admin
  {
    id: 'user_001',
    username: 'superadmin',
    email: 'admin@molekschool.edu.ng',
    password: 'admin123', // In production, this would be hashed
    firstName: 'Adebisi',
    lastName: 'Ogundimu',
    fullName: 'Mrs. Adebisi Ogundimu',
    role: 'super_admin',
    phone: '+234-801-234-5678',
    avatar: '/images/staff/principal.jpg',
    department: 'Administration',
    position: 'Principal',
    isActive: true,
    lastLogin: '2024-08-25T08:30:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    permissions: ['all']
  },

  // Admin Users
  {
    id: 'user_002',
    username: 'admin.tunde',
    email: 'tunde.adeyemi@molekschool.edu.ng',
    password: 'admin123',
    firstName: 'Tunde',
    lastName: 'Adeyemi',
    fullName: 'Mr. Tunde Adeyemi',
    role: 'admin',
    phone: '+234-809-876-5432',
    avatar: '/images/staff/academic-director.jpg',
    department: 'Academics',
    position: 'Academic Director',
    isActive: true,
    lastLogin: '2024-08-24T16:45:00Z',
    createdAt: '2023-02-01T00:00:00Z',
    permissions: ['student_management', 'teacher_management', 'academic_reports']
  },
  {
    id: 'user_003',
    username: 'admin.funmi',
    email: 'funmi.adebayo@molekschool.edu.ng',
    password: 'admin123',
    firstName: 'Funmi',
    lastName: 'Adebayo',
    fullName: 'Mrs. Funmi Adebayo',
    role: 'admin',
    phone: '+234-807-123-4567',
    avatar: '/images/staff/student-affairs.jpg',
    department: 'Student Affairs',
    position: 'Student Affairs Director',
    isActive: true,
    lastLogin: '2024-08-25T09:15:00Z',
    createdAt: '2023-02-15T00:00:00Z',
    permissions: ['student_management', 'parent_communication', 'disciplinary_actions']
  },

  // Teachers
  {
    id: 'user_004',
    username: 'teacher.adunni',
    email: 'adunni.olatunji@molekschool.edu.ng',
    password: 'teacher123',
    firstName: 'Adunni',
    lastName: 'Olatunji',
    fullName: 'Mrs. Adunni Olatunja',
    role: 'teacher',
    phone: '+234-803-456-7890',
    avatar: '/images/staff/teacher-adunni.jpg',
    department: 'Mathematics',
    position: 'Senior Teacher - Mathematics',
    subjects: ['Mathematics', 'Further Mathematics'],
    classes: ['jss1a', 'sss1_science'],
    isActive: true,
    lastLogin: '2024-08-24T14:20:00Z',
    createdAt: '2023-03-01T00:00:00Z',
    permissions: ['attendance_marking', 'grade_entry', 'student_reports']
  },
  {
    id: 'user_005',
    username: 'teacher.ibrahim',
    email: 'ibrahim.hassan@molekschool.edu.ng',
    password: 'teacher123',
    firstName: 'Ibrahim',
    lastName: 'Hassan',
    fullName: 'Mr. Ibrahim Hassan',
    role: 'teacher',
    phone: '+234-805-678-9012',
    avatar: '/images/staff/teacher-ibrahim.jpg',
    department: 'English',
    position: 'Head of English Department',
    subjects: ['English Language', 'Literature in English'],
    classes: ['jss1b', 'sss1_arts'],
    isActive: true,
    lastLogin: '2024-08-25T07:30:00Z',
    createdAt: '2023-03-15T00:00:00Z',
    permissions: ['attendance_marking', 'grade_entry', 'student_reports']
  },
  {
    id: 'user_006',
    username: 'teacher.chioma',
    email: 'chioma.okafor@molekschool.edu.ng',
    password: 'teacher123',
    firstName: 'Chioma',
    lastName: 'Okafor',
    fullName: 'Mrs. Chioma Okafor',
    role: 'teacher',
    phone: '+234-807-890-1234',
    avatar: '/images/staff/teacher-chioma.jpg',
    department: 'Sciences',
    position: 'Science Teacher',
    subjects: ['Basic Science', 'Biology', 'Chemistry'],
    classes: ['jss2a', 'sss2_science'],
    isActive: true,
    lastLogin: '2024-08-24T13:45:00Z',
    createdAt: '2023-04-01T00:00:00Z',
    permissions: ['attendance_marking', 'grade_entry', 'student_reports']
  },

  // Parents
  {
    id: 'user_007',
    username: 'parent.adebayo',
    email: 'adebayo.johnson@email.com',
    password: 'parent123',
    firstName: 'Adebayo',
    lastName: 'Johnson',
    fullName: 'Mr. Adebayo Johnson',
    role: 'parent',
    phone: '+234-802-345-6789',
    avatar: '/images/parents/parent-adebayo.jpg',
    occupation: 'Engineer',
    address: {
      street: '25 Victoria Island Road',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria'
    },
    children: ['student_001', 'student_002'],
    isActive: true,
    lastLogin: '2024-08-24T19:30:00Z',
    createdAt: '2023-05-01T00:00:00Z',
    permissions: ['view_child_progress', 'view_attendance', 'view_grades']
  },
  {
    id: 'user_008',
    username: 'parent.blessing',
    email: 'blessing.okonkwo@email.com',
    password: 'parent123',
    firstName: 'Blessing',
    lastName: 'Okonkwo',
    fullName: 'Mrs. Blessing Okonkwo',
    role: 'parent',
    phone: '+234-804-567-8901',
    avatar: '/images/parents/parent-blessing.jpg',
    occupation: 'Business Woman',
    address: {
      street: '12 Surulere Street',
      city: 'Lagos', 
      state: 'Lagos State',
      country: 'Nigeria'
    },
    children: ['student_003'],
    isActive: true,
    lastLogin: '2024-08-25T06:45:00Z',
    createdAt: '2023-05-15T00:00:00Z',
    permissions: ['view_child_progress', 'view_attendance', 'view_grades']
  },
  {
    id: 'user_009',
    username: 'parent.emeka',
    email: 'emeka.nwosu@email.com',
    password: 'parent123',
    firstName: 'Emeka',
    lastName: 'Nwosu',
    fullName: 'Mr. Emeka Nwosu',
    role: 'parent',
    phone: '+234-806-789-0123',
    avatar: '/images/parents/parent-emeka.jpg',
    occupation: 'Doctor',
    address: {
      street: '8 Ikoyi Crescent',
      city: 'Lagos',
      state: 'Lagos State', 
      country: 'Nigeria'
    },
    children: ['student_004'],
    isActive: true,
    lastLogin: '2024-08-23T20:15:00Z',
    createdAt: '2023-06-01T00:00:00Z',
    permissions: ['view_child_progress', 'view_attendance', 'view_grades']
  }
];

// User helper functions
export const getUserById = (userId) => {
  return mockUsers.find(user => user.id === userId);
};

export const getUserByEmail = (email) => {
  return mockUsers.find(user => user.email === email);
};

export const getUsersByRole = (role) => {
  return mockUsers.filter(user => user.role === role);
};

export const getActiveUsers = () => {
  return mockUsers.filter(user => user.isActive);
};

export const getTeachers = () => {
  return mockUsers.filter(user => user.role === 'teacher' && user.isActive);
};

export const getParents = () => {
  return mockUsers.filter(user => user.role === 'parent' && user.isActive);
};

export const getAdmins = () => {
  return mockUsers.filter(user => 
    (user.role === 'admin' || user.role === 'super_admin') && user.isActive
  );
};

export const authenticateUser = (email, password) => {
  const user = mockUsers.find(u => 
    u.email === email && u.password === password && u.isActive
  );
  
  if (user) {
    // Update last login (in real app, this would be handled by backend)
    user.lastLogin = new Date().toISOString();
    return { ...user, password: undefined }; // Don't return password
  }
  
  return null;
};

export const getUserPermissions = (userId) => {
  const user = getUserById(userId);
  return user ? user.permissions : [];
};

export const hasPermission = (userId, permission) => {
  const permissions = getUserPermissions(userId);
  return permissions.includes('all') || permissions.includes(permission);
};

// Nigerian specific data
export const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
  'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

export const commonNigerianOccupations = [
  'Engineer', 'Doctor', 'Lawyer', 'Teacher', 'Business Owner', 'Banker',
  'Civil Servant', 'Trader', 'Accountant', 'Nurse', 'Pharmacist', 'Architect',
  'Pastor/Imam', 'Farmer', 'Driver', 'Artisan', 'IT Professional'
];

export default mockUsers;
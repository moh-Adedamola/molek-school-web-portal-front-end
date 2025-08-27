// src/data/index.js
// Export all mock data and utilities

// Users
export {
  mockUsers,
  USER_ROLES,
  getUsersByRole,
  getUserById
} from './mockUsers';

// Students
export {
  mockStudents,
  allMockStudents,
  getStudentById,
  getStudentsByClass,
  getStudentsByParent,
  getActiveStudents
} from './mockStudents';

// Classes and Subjects
export {
  mockClasses,
  getClassById,
  getClassesByTeacher
} from './mockClasses';

export {
  mockSubjects,
  getSubjectById,
  getSubjectsByTeacher
} from './mockClasses';

// Attendance
export {
  mockAttendance,
  ATTENDANCE_STATUS,
  getAttendanceByStudent,
  getAttendanceByDate,
  getAttendanceByClass,
  calculateAttendanceStats
} from './mockAttendance';

// Grades
export {
  mockGrades,
  GRADE_SCALES,
  getGradesByStudent,
  getGradesBySubject,
  getGradesByClass,
  calculateGPA,
  getLetterGrade,
  calculateSubjectAverage
} from './mockGrades';

// Website Content (for future use)
export const mockContent = {
  homepage: {
    hero: {
      title: "Excellence in Education",
      subtitle: "Nurturing minds, building futures",
      image: "/images/hero-bg.jpg"
    },
    features: [
      {
        title: "Academic Excellence",
        description: "Comprehensive curriculum designed for student success",
        icon: "BookOpen"
      },
      {
        title: "Modern Facilities",
        description: "State-of-the-art classrooms and laboratories",
        icon: "Building"
      },
      {
        title: "Expert Faculty",
        description: "Dedicated teachers committed to student growth",
        icon: "Users"
      }
    ]
  },
  about: {
    mission: "To provide quality education that prepares students for global challenges",
    vision: "To be a leading educational institution fostering innovation and excellence",
    history: "Established in 1995, our school has been a cornerstone of educational excellence in the community.",
    achievements: [
      "100% college acceptance rate",
      "National academic awards",
      "Outstanding community service programs"
    ]
  },
  news: [
    {
      id: 1,
      title: "Annual Science Fair Success",
      date: "2024-08-15",
      content: "Students showcase innovative projects at the annual science fair.",
      image: "/images/science-fair.jpg"
    },
    {
      id: 2,
      title: "New Computer Lab Opening",
      date: "2024-08-10",
      content: "State-of-the-art computer lab opens with latest technology.",
      image: "/images/computer-lab.jpg"
    }
  ]
};

// Application Constants
export const APP_CONFIG = {
  ITEMS_PER_PAGE: 10,
  DEFAULT_AVATAR: '/images/default-avatar.png',
  SCHOOL_NAME: 'Greenwood International School',
  ACADEMIC_YEAR: '2024-2025',
  TERMS: ['Term 1', 'Term 2', 'Mid-term', 'Final'],
  BLOOD_GROUPS: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  GENDERS: ['Male', 'Female', 'Other'],
  ASSESSMENT_TYPES: ['Quiz', 'Assignment', 'Test', 'Project', 'Final Exam'],
  ATTENDANCE_STATUSES: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']
};

// Navigation Routes by Role
export const ROLE_ROUTES = {
  SUPER_ADMIN: [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/users', label: 'User Management', icon: 'Users' },
    { path: '/students', label: 'Students', icon: 'GraduationCap' },
    { path: '/teachers', label: 'Teachers', icon: 'UserCheck' },
    { path: '/classes', label: 'Classes', icon: 'School' },
    { path: '/subjects', label: 'Subjects', icon: 'BookOpen' },
    { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
    { path: '/website', label: 'Website CMS', icon: 'Globe' }
  ],
  ADMIN: [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/students', label: 'Students', icon: 'GraduationCap' },
    { path: '/teachers', label: 'Teachers', icon: 'UserCheck' },
    { path: '/parents', label: 'Parents', icon: 'Users' },
    { path: '/classes', label: 'Classes', icon: 'School' },
    { path: '/subjects', label: 'Subjects', icon: 'BookOpen' },
    { path: '/attendance', label: 'Attendance', icon: 'Calendar' },
    { path: '/grades', label: 'Grades', icon: 'Award' },
    { path: '/reports', label: 'Reports', icon: 'FileText' }
  ],
  TEACHER: [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/my-classes', label: 'My Classes', icon: 'School' },
    { path: '/attendance', label: 'Attendance', icon: 'Calendar' },
    { path: '/grades', label: 'Grades', icon: 'Award' },
    { path: '/students', label: 'Students', icon: 'GraduationCap' },
    { path: '/schedule', label: 'Schedule', icon: 'Clock' }
  ],
  PARENT: [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/children', label: 'My Children', icon: 'Heart' },
    { path: '/attendance', label: 'Attendance', icon: 'Calendar' },
    { path: '/grades', label: 'Grades', icon: 'Award' },
    { path: '/messages', label: 'Messages', icon: 'MessageCircle' },
    { path: '/events', label: 'School Events', icon: 'CalendarDays' }
  ]
};

// Permission system
export const PERMISSIONS = {
  // User management
  CREATE_USER: ['SUPER_ADMIN', 'ADMIN'],
  EDIT_USER: ['SUPER_ADMIN', 'ADMIN'],
  DELETE_USER: ['SUPER_ADMIN'],
  VIEW_USERS: ['SUPER_ADMIN', 'ADMIN'],

  // Student management
  CREATE_STUDENT: ['SUPER_ADMIN', 'ADMIN'],
  EDIT_STUDENT: ['SUPER_ADMIN', 'ADMIN'],
  DELETE_STUDENT: ['SUPER_ADMIN', 'ADMIN'],
  VIEW_STUDENTS: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'],

  // Attendance
  MARK_ATTENDANCE: ['ADMIN', 'TEACHER'],
  VIEW_ATTENDANCE: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'PARENT'],
  EDIT_ATTENDANCE: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'],

  // Grades
  CREATE_GRADE: ['ADMIN', 'TEACHER'],
  EDIT_GRADE: ['ADMIN', 'TEACHER'],
  DELETE_GRADE: ['ADMIN', 'TEACHER'],
  PUBLISH_GRADE: ['ADMIN', 'TEACHER'],
  VIEW_GRADES: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'PARENT'],

  // Classes and Subjects
  MANAGE_CLASSES: ['SUPER_ADMIN', 'ADMIN'],
  MANAGE_SUBJECTS: ['SUPER_ADMIN', 'ADMIN'],
  VIEW_CLASSES: ['SUPER_ADMIN', 'ADMIN', 'TEACHER'],

  // Website CMS
  MANAGE_WEBSITE: ['SUPER_ADMIN', 'ADMIN'],

  // Analytics
  VIEW_ANALYTICS: ['SUPER_ADMIN', 'ADMIN'],
  VIEW_REPORTS: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
};

// Helper function to check permissions
export const hasPermission = (userRole, permission) => {
  return PERMISSIONS[permission]?.includes(userRole) || false;
};

// Data validation helpers
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone) => {
  return /^[\+]?[1-9][\d]{0,15}$/.test(phone);
};

export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Date formatting helpers
export const formatDate = (date, format = 'MM/DD/YYYY') => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  switch (format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
    default:
      return `${month}/${day}/${year}`;
  }
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInMs = now - targetDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  return formatDate(date);
};
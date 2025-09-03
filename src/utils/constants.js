// File Location: src/utils/constants.js

/**
 * Nigerian School Management System Constants
 * Role permissions and system-wide configuration
 */

// User Role Definitions
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin', 
  TEACHER: 'teacher',
  PARENT: 'parent'
};

// Role Permissions Matrix
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: {
    canManageUsers: true,
    canManageSchoolSettings: true,
    canViewSystemReports: true,
    canBackupRestore: true,
    canAccessAllData: true,
    canDeleteData: true,
    dashboardRoute: '/super-admin/dashboard'
  },
  [USER_ROLES.ADMIN]: {
    canManageWebsite: true,
    canManageStudents: true,
    canManageTeachers: true,
    canManageParents: true,
    canManageClasses: true,
    canViewReports: true,
    canExportData: true,
    dashboardRoute: '/admin/dashboard'
  },
  [USER_ROLES.TEACHER]: {
    canMarkAttendance: true,
    canEnterGrades: true,
    canViewStudents: true,
    canGenerateReports: true,
    canCommunicateParents: true,
    dashboardRoute: '/teacher/dashboard'
  },
  [USER_ROLES.PARENT]: {
    canViewChildren: true,
    canViewAttendance: true,
    canViewGrades: true,
    canCommunicateTeachers: true,
    dashboardRoute: '/parent/dashboard'
  }
};

// Nigerian School Configuration
export const SCHOOL_CONFIG = {
  ACADEMIC_YEAR_START: 'September',
  ACADEMIC_YEAR_END: 'July',
  TERMS_PER_YEAR: 3,
  WEEKS_PER_TERM: 13,
  CURRENCY: '₦',
  CURRENCY_SYMBOL: '₦',
  COUNTRY: 'Nigeria',
  EDUCATION_SYSTEM: 'Nigerian 6-3-3-4 System'
};

// Class Size Limits
export const CLASS_LIMITS = {
  JSS: {
    MIN_STUDENTS: 25,
    MAX_STUDENTS: 40,
    RECOMMENDED: 35
  },
  SSS: {
    MIN_STUDENTS: 20,
    MAX_STUDENTS: 35,
    RECOMMENDED: 30
  }
};

// Attendance Status
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused'
};

// Grade Status for Progress Tracking
export const GRADE_STATUS = {
  EXCELLENT: 'excellent', // 80-100
  GOOD: 'good',          // 70-79
  AVERAGE: 'average',    // 60-69
  BELOW_AVERAGE: 'below_average', // 50-59
  POOR: 'poor'           // 0-49
};

// Payment Status
export const PAYMENT_STATUS = {
  PAID: 'paid',
  PENDING: 'pending',
  OVERDUE: 'overdue',
  PARTIAL: 'partial'
};

// School Fee Structure (in Naira)
export const SCHOOL_FEES = {
  JSS: {
    TUITION: 50000,
    BOOKS: 15000,
    UNIFORM: 12000,
    FEEDING: 25000,
    TOTAL_PER_TERM: 102000
  },
  SSS: {
    TUITION: 65000,
    BOOKS: 20000,
    UNIFORM: 15000,
    FEEDING: 30000,
    WAEC_FEE: 45000,
    TOTAL_PER_TERM: 175000
  }
};

// Nigerian Public Holidays
export const NIGERIAN_HOLIDAYS = [
  { date: '2024-01-01', name: 'New Year Day' },
  { date: '2024-04-01', name: 'Easter Monday' },
  { date: '2024-05-01', name: 'Workers Day' },
  { date: '2024-06-12', name: 'Democracy Day' },
  { date: '2024-10-01', name: 'Independence Day' },
  { date: '2024-12-25', name: 'Christmas Day' },
  { date: '2024-12-26', name: 'Boxing Day' }
];

// School Schedule
export const SCHOOL_SCHEDULE = {
  START_TIME: '08:00',
  END_TIME: '14:30',
  BREAK_TIME: '10:30',
  LUNCH_TIME: '12:30',
  PERIODS_PER_DAY: 8,
  PERIOD_DURATION: 40, // minutes
  DAYS_PER_WEEK: 5
};

// Report Card Configuration
export const REPORT_CONFIG = {
  MIN_GRADE_FOR_PROMOTION: 50,
  SUBJECTS_REQUIRED_FOR_PROMOTION: 5,
  ATTENDANCE_THRESHOLD: 75, // percentage
  CONDUCT_GRADES: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
};

// Website Content Types
export const CONTENT_TYPES = {
  NEWS: 'news',
  EVENT: 'event',
  ANNOUNCEMENT: 'announcement',
  GALLERY: 'gallery',
  STAFF_PROFILE: 'staff_profile',
  ACADEMIC_INFO: 'academic_info'
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Dashboard Widget Configuration
export const DASHBOARD_WIDGETS = {
  [USER_ROLES.SUPER_ADMIN]: [
    'total_schools',
    'total_users', 
    'system_performance',
    'recent_activities'
  ],
  [USER_ROLES.ADMIN]: [
    'total_students',
    'total_teachers',
    'attendance_summary',
    'recent_grades',
    'fee_collection'
  ],
  [USER_ROLES.TEACHER]: [
    'my_classes',
    'pending_attendance',
    'pending_grades',
    'student_performance'
  ],
  [USER_ROLES.PARENT]: [
    'my_children',
    'attendance_alerts',
    'grade_updates',
    'school_announcements'
  ]
};

// API Endpoints Configuration
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  STUDENTS: '/students',
  TEACHERS: '/teachers',
  PARENTS: '/parents',
  CLASSES: '/classes',
  SUBJECTS: '/subjects',
  ATTENDANCE: '/attendance',
  GRADES: '/grades',
  REPORTS: '/reports',
  CONTENT: '/content'
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+234|0)[0-9]{10}$/, // Nigerian phone format
  STUDENT_ID_LENGTH: 8
};

// Export utility function to check permissions
export const checkPermission = (userRole, permission) => {
  return ROLE_PERMISSIONS[userRole]?.[permission] || false;
};

export const getDashboardRoute = (userRole) => {
  return ROLE_PERMISSIONS[userRole]?.dashboardRoute || '/';
};
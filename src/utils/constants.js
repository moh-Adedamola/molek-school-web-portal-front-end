// utils/constants.js
// Nigerian School Management System Constants

export const SCHOOL_INFO = {
  NAME: 'Molek Secondary School',
  MOTTO: 'Excellence Through Knowledge',
  ESTABLISHED: '1995',
  LOCATION: 'Lagos, Nigeria',
  PHONE: '+234 803 123 4567',
  EMAIL: 'info@molekschool.edu.ng',
  ADDRESS: '15 Education Avenue, Victoria Island, Lagos State',
  PRINCIPAL: 'Dr. Adebayo Olumide',
  VICE_PRINCIPAL: 'Mrs. Chinelo Okafor'
};

// Professional Color System
export const COLORS = {
  // Primary Colors - Deep Academic Blue
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe', 
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', // Main primary
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },
  
  // Secondary Colors - Forest Green
  SECONDARY: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0', 
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669', // Main secondary
    700: '#047857',
    800: '#065f46',
    900: '#064e3b'
  },
  
  // Accent Colors - Warm Gold/Orange
  ACCENT: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d', 
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706', // Main accent
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },
  
  // Status Colors
  STATUS: {
    SUCCESS: '#059669',
    WARNING: '#d97706', 
    ERROR: '#dc2626',
    INFO: '#2563eb'
  }
};

// Grade Performance Color Coding
export const GRADE_COLORS = {
  EXCELLENT: COLORS.SECONDARY[600], // Green
  GOOD: COLORS.PRIMARY[600],        // Blue  
  AVERAGE: COLORS.ACCENT[600],      // Gold
  POOR: COLORS.STATUS.ERROR,        // Red
  FAIL: '#7f1d1d'                   // Dark red
};

// Attendance Status Colors
export const ATTENDANCE_COLORS = {
  PRESENT: COLORS.SECONDARY[600],   // Green
  ABSENT: COLORS.STATUS.ERROR,      // Red
  LATE: COLORS.ACCENT[600],         // Gold
  EXCUSED: COLORS.PRIMARY[600]      // Blue
};

// User Roles & Permissions
export const USER_ROLES = {
  SUPER_ADMIN: { 
    id: 'super_admin', 
    name: 'Super Administrator',
    color: COLORS.PRIMARY[800],
    permissions: ['all']
  },
  ADMIN: { 
    id: 'admin', 
    name: 'Administrator',
    color: COLORS.PRIMARY[600],
    permissions: ['manage_users', 'manage_content', 'view_reports']
  },
  TEACHER: { 
    id: 'teacher', 
    name: 'Teacher',
    color: COLORS.SECONDARY[600], 
    permissions: ['manage_grades', 'mark_attendance', 'view_students']
  },
  PARENT: { 
    id: 'parent', 
    name: 'Parent/Guardian',
    color: COLORS.ACCENT[600],
    permissions: ['view_child_progress', 'receive_notifications']
  }
};

// Academic Year Settings
export const ACADEMIC_SETTINGS = {
  CURRENT_YEAR: '2024/2025',
  NEXT_YEAR: '2025/2026',
  TERM_DURATION_WEEKS: 12,
  HOLIDAY_WEEKS: 2,
  SUBJECTS_PER_TERM: 9,
  MAX_STUDENTS_PER_CLASS: 35
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: { color: COLORS.STATUS.SUCCESS, icon: '✅' },
  ERROR: { color: COLORS.STATUS.ERROR, icon: '❌' },
  WARNING: { color: COLORS.STATUS.WARNING, icon: '⚠️' },
  INFO: { color: COLORS.STATUS.INFO, icon: 'ℹ️' },
  ANNOUNCEMENT: { color: COLORS.PRIMARY[600], icon: '📢' }
};

// Payment Status
export const PAYMENT_STATUS = {
  PAID: { 
    status: 'paid', 
    color: COLORS.SECONDARY[600], 
    text: 'Paid',
    bgColor: 'bg-secondary-50'
  },
  PENDING: { 
    status: 'pending', 
    color: COLORS.ACCENT[600], 
    text: 'Pending',
    bgColor: 'bg-accent-50'
  },
  OVERDUE: { 
    status: 'overdue', 
    color: COLORS.STATUS.ERROR, 
    text: 'Overdue',
    bgColor: 'bg-red-50'
  },
  PARTIAL: { 
    status: 'partial', 
    color: COLORS.PRIMARY[600], 
    text: 'Partial',
    bgColor: 'bg-primary-50'
  }
};

// Table Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_PAGE_BUTTONS: 5
};

// File Upload Settings  
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf']
};

// Dashboard Card Types
export const DASHBOARD_CARDS = {
  STATS: { icon: '📊', color: COLORS.PRIMARY[600] },
  STUDENTS: { icon: '👥', color: COLORS.SECONDARY[600] },
  TEACHERS: { icon: '👨‍🏫', color: COLORS.ACCENT[600] },
  CLASSES: { icon: '🏫', color: COLORS.PRIMARY[700] },
  ATTENDANCE: { icon: '📝', color: COLORS.SECONDARY[700] },
  GRADES: { icon: '🎓', color: COLORS.ACCENT[700] }
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 200, 
  SLOW: 300,
  VERY_SLOW: 500
};

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px', 
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px'
};

// Nigerian Specific Settings
export const NIGERIAN_CONTEXT = {
  CURRENCY: '₦',
  PHONE_FORMAT: '+234',
  TIME_ZONE: 'Africa/Lagos',
  LANGUAGE: 'English',
  LOCAL_LANGUAGES: ['Yoruba', 'Hausa', 'Igbo'],
  WORKING_DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  SCHOOL_HOURS: {
    START: '7:30 AM',
    END: '3:00 PM', 
    BREAK_START: '10:30 AM',
    BREAK_END: '11:00 AM',
    LUNCH_START: '1:00 PM',
    LUNCH_END: '2:00 PM'
  }
};

// Export default configuration
export default {
  SCHOOL_INFO,
  COLORS,
  GRADE_COLORS,
  ATTENDANCE_COLORS,
  USER_ROLES,
  ACADEMIC_SETTINGS,
  NOTIFICATION_TYPES,
  PAYMENT_STATUS,
  PAGINATION,
  FILE_UPLOAD,
  DASHBOARD_CARDS,
  ANIMATIONS,
  BREAKPOINTS,
  NIGERIAN_CONTEXT
};
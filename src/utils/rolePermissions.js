// Nigerian School Management System - Role Permissions Matrix

export const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  PARENT: 'parent'
};

export const PERMISSIONS = {
  // User Management
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  VIEW_ALL_USERS: 'view_all_users',

  // Student Management
  CREATE_STUDENTS: 'create_students',
  EDIT_STUDENTS: 'edit_students',
  DELETE_STUDENTS: 'delete_students',
  VIEW_ALL_STUDENTS: 'view_all_students',
  VIEW_ASSIGNED_STUDENTS: 'view_assigned_students',
  VIEW_OWN_CHILDREN: 'view_own_children',

  // Academic Management
  MANAGE_ATTENDANCE: 'manage_attendance',
  VIEW_ATTENDANCE: 'view_attendance',
  MANAGE_GRADES: 'manage_grades',
  VIEW_GRADES: 'view_grades',
  GENERATE_REPORTS: 'generate_reports',
  VIEW_REPORTS: 'view_reports',

  // Website Management
  MANAGE_WEBSITE: 'manage_website',
  EDIT_CONTENT: 'edit_content',
  MANAGE_GALLERY: 'manage_gallery',

  // System Management
  SYSTEM_SETTINGS: 'system_settings',
  BACKUP_RESTORE: 'backup_restore',
  VIEW_ANALYTICS: 'view_analytics'
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    // Complete system access
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.VIEW_ALL_USERS,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.BACKUP_RESTORE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.VIEW_REPORTS
  ],

  [ROLES.ADMIN]: [
    // School management access
    PERMISSIONS.CREATE_STUDENTS,
    PERMISSIONS.EDIT_STUDENTS,
    PERMISSIONS.DELETE_STUDENTS,
    PERMISSIONS.VIEW_ALL_STUDENTS,
    PERMISSIONS.MANAGE_WEBSITE,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.MANAGE_GALLERY,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_ANALYTICS
  ],

  [ROLES.TEACHER]: [
    // Academic focused access
    PERMISSIONS.VIEW_ASSIGNED_STUDENTS,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.MANAGE_GRADES,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.VIEW_REPORTS
  ],

  [ROLES.PARENT]: [
    // Child monitoring access
    PERMISSIONS.VIEW_OWN_CHILDREN,
    PERMISSIONS.VIEW_ATTENDANCE,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_REPORTS
  ]
};

export const checkPermission = (userRole, permission) => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const getDashboardRoute = (role) => {
  const routes = {
    [ROLES.SUPER_ADMIN]: '/super-admin',
    [ROLES.ADMIN]: '/admin',
    [ROLES.TEACHER]: '/teacher',
    [ROLES.PARENT]: '/parent'
  };
  return routes[role] || '/';
};

export const getAvailableRoutes = (role) => {
  const routesByRole = {
    [ROLES.SUPER_ADMIN]: [
      { path: '/super-admin', label: 'Dashboard' },
      { path: '/super-admin/users', label: 'User Management' },
      { path: '/super-admin/settings', label: 'School Settings' },
      { path: '/super-admin/reports', label: 'System Reports' },
      { path: '/super-admin/backup', label: 'Backup & Restore' }
    ],
    [ROLES.ADMIN]: [
      { path: '/admin', label: 'Dashboard' },
      { path: '/admin/students', label: 'Students' },
      { path: '/admin/teachers', label: 'Teachers' },
      { path: '/admin/parents', label: 'Parents' },
      { path: '/admin/website', label: 'Website CMS' },
      { path: '/admin/reports', label: 'Reports' }
    ],
    [ROLES.TEACHER]: [
      { path: '/teacher', label: 'Dashboard' },
      { path: '/teacher/students', label: 'My Students' },
      { path: '/teacher/attendance', label: 'Attendance' },
      { path: '/teacher/grades', label: 'Grades' },
      { path: '/teacher/reports', label: 'Reports' }
    ],
    [ROLES.PARENT]: [
      { path: '/parent', label: 'Dashboard' },
      { path: '/parent/children', label: 'My Children' },
      { path: '/parent/attendance', label: 'Attendance' },
      { path: '/parent/grades', label: 'Academic Reports' },
      { path: '/parent/communication', label: 'Communication' }
    ]
  };
  
  return routesByRole[role] || [];
};
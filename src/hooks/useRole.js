// File: src/hooks/useRole.js
// Role-specific functionality and permissions hook

import { useAuth } from './useAuth';

// Role permissions matrix
const ROLE_PERMISSIONS = {
  super_admin: {
    canManageUsers: true,
    canManageSystem: true,
    canViewAllReports: true,
    canBackupRestore: true,
    canAccessAllData: true,
    canManageSchoolSettings: true
  },
  admin: {
    canManageUsers: false,
    canManageSystem: false,
    canViewAllReports: true,
    canBackupRestore: false,
    canAccessAllData: true,
    canManageSchoolSettings: false,
    canManageStudents: true,
    canManageTeachers: true,
    canManageParents: true,
    canManageWebsite: true,
    canViewAcademicReports: true
  },
  teacher: {
    canManageUsers: false,
    canManageSystem: false,
    canViewAllReports: false,
    canBackupRestore: false,
    canAccessAllData: false,
    canManageSchoolSettings: false,
    canManageStudents: false,
    canManageTeachers: false,
    canManageParents: false,
    canManageWebsite: false,
    canViewAcademicReports: false,
    canMarkAttendance: true,
    canEnterGrades: true,
    canViewAssignedStudents: true,
    canGenerateReports: true
  },
  parent: {
    canManageUsers: false,
    canManageSystem: false,
    canViewAllReports: false,
    canBackupRestore: false,
    canAccessAllData: false,
    canManageSchoolSettings: false,
    canManageStudents: false,
    canManageTeachers: false,
    canManageParents: false,
    canManageWebsite: false,
    canViewAcademicReports: false,
    canMarkAttendance: false,
    canEnterGrades: false,
    canViewAssignedStudents: false,
    canGenerateReports: false,
    canViewChildrenData: true,
    canContactTeachers: true,
    canViewAttendance: true,
    canViewGrades: true
  }
};

// Navigation items by role
const ROLE_NAVIGATION = {
  super_admin: [
    { name: 'Dashboard', path: '/dashboard/super-admin', icon: 'LayoutDashboard' },
    { name: 'User Management', path: '/dashboard/super-admin/users', icon: 'Users' },
    { name: 'School Settings', path: '/dashboard/super-admin/settings', icon: 'Settings' },
    { name: 'System Reports', path: '/dashboard/super-admin/reports', icon: 'BarChart3' },
    { name: 'Backup & Restore', path: '/dashboard/super-admin/backup', icon: 'Database' }
  ],
  admin: [
    { name: 'Dashboard', path: '/dashboard/admin', icon: 'LayoutDashboard' },
    { name: 'Website CMS', path: '/dashboard/admin/website', icon: 'Globe' },
    { name: 'Students', path: '/dashboard/admin/students', icon: 'GraduationCap' },
    { name: 'Teachers', path: '/dashboard/admin/teachers', icon: 'Users' },
    { name: 'Parents', path: '/dashboard/admin/parents', icon: 'UserCheck' },
    { name: 'Classes', path: '/dashboard/admin/classes', icon: 'School' },
    { name: 'Reports', path: '/dashboard/admin/reports', icon: 'BarChart3' }
  ],
  teacher: [
    { name: 'Dashboard', path: '/dashboard/teacher', icon: 'LayoutDashboard' },
    { name: 'My Students', path: '/dashboard/teacher/students', icon: 'GraduationCap' },
    { name: 'Attendance', path: '/dashboard/teacher/attendance', icon: 'Calendar' },
    { name: 'Grades', path: '/dashboard/teacher/grades', icon: 'FileText' },
    { name: 'Reports', path: '/dashboard/teacher/reports', icon: 'BarChart3' }
  ],
  parent: [
    { name: 'Dashboard', path: '/dashboard/parent', icon: 'LayoutDashboard' },
    { name: 'My Children', path: '/dashboard/parent/children', icon: 'Heart' },
    { name: 'Attendance', path: '/dashboard/parent/attendance', icon: 'Calendar' },
    { name: 'Academic Reports', path: '/dashboard/parent/reports', icon: 'FileText' },
    { name: 'Communication', path: '/dashboard/parent/messages', icon: 'MessageSquare' }
  ]
};

export const useRole = () => {
  const { user, hasRole, hasAnyRole } = useAuth();

  // Get user permissions
  const getPermissions = () => {
    if (!user) return {};
    return ROLE_PERMISSIONS[user.role] || {};
  };

  // Check specific permission
  const hasPermission = (permission) => {
    const permissions = getPermissions();
    return permissions[permission] === true;
  };

  // Get navigation items for current user role
  const getNavigation = () => {
    if (!user) return [];
    return ROLE_NAVIGATION[user.role] || [];
  };

  // Get role display name
  const getRoleDisplayName = () => {
    if (!user) return '';
    
    const roleNames = {
      super_admin: 'Super Administrator',
      admin: 'Administrator',
      teacher: 'Teacher',
      parent: 'Parent'
    };
    
    return roleNames[user.role] || user.role;
  };

  // Get role-specific welcome message
  const getWelcomeMessage = () => {
    if (!user) return '';
    
    const messages = {
      super_admin: 'System Overview & Management',
      admin: 'School Management Dashboard',
      teacher: 'Teaching & Class Management',
      parent: 'Your Children\'s Academic Progress'
    };
    
    return messages[user.role] || 'Dashboard';
  };

  // Get role-specific color theme
  const getRoleTheme = () => {
    if (!user) return 'primary';
    
    const themes = {
      super_admin: 'primary', // Deep blue
      admin: 'secondary', // Green
      teacher: 'accent', // Gold/Orange
      parent: 'info' // Light blue
    };
    
    return themes[user.role] || 'primary';
  };

  // Check if user can access specific data
  const canAccessData = (dataType, dataId = null) => {
    const permissions = getPermissions();
    
    switch (dataType) {
      case 'student':
        if (permissions.canAccessAllData) return true;
        if (user.role === 'teacher' && user.classes) {
          // Teacher can access students in their classes
          return true; // In real app, check if student is in teacher's class
        }
        if (user.role === 'parent' && user.children) {
          // Parent can access only their children
          return true; // In real app, check if student is user's child
        }
        return false;
      
      case 'teacher':
        return permissions.canAccessAllData;
      
      case 'parent':
        return permissions.canAccessAllData;
      
      case 'class':
        if (permissions.canAccessAllData) return true;
        if (user.role === 'teacher' && user.classes) {
          return user.classes.includes(dataId);
        }
        return false;
      
      default:
        return false;
    }
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    hasPermission,
    getPermissions,
    getNavigation,
    getRoleDisplayName,
    getWelcomeMessage,
    getRoleTheme,
    canAccessData
  };
};

export default useRole;
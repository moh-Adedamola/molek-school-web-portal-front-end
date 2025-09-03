import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { ROLE_PERMISSIONS } from '../utils/rolePermissions';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();

  const hasPermission = (permission) => {
    if (!user || !user.role) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
  };

  const canAccess = (resource) => {
    if (!user) return false;
    
    const roleAccess = {
      'super-admin': ['all'],
      'admin': ['website', 'students', 'teachers', 'parents', 'reports'],
      'teacher': ['students', 'attendance', 'grades', 'reports'],
      'parent': ['children', 'attendance-view', 'grades-view']
    };

    const userPermissions = roleAccess[user.role] || [];
    return userPermissions.includes('all') || userPermissions.includes(resource);
  };

  const getRoleColor = (role = user?.role) => {
    const colors = {
      'super-admin': 'purple',
      'admin': 'blue',
      'teacher': 'emerald',
      'parent': 'indigo'
    };
    return colors[role] || 'gray';
  };

  const getRoleDisplayName = (role = user?.role) => {
    const names = {
      'super-admin': 'Super Administrator',
      'admin': 'School Administrator',
      'teacher': 'Teacher',
      'parent': 'Parent'
    };
    return names[role] || 'User';
  };

  const value = {
    user,
    hasPermission,
    canAccess,
    getRoleColor,
    getRoleDisplayName,
    isLoggedIn: !!user
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
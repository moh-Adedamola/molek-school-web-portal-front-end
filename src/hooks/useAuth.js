// File: src/hooks/useAuth.js
// Authentication hook with role management and dashboard routing

import { useState, useEffect, createContext, useContext, createElement } from 'react';

// Mock users for demonstration
const MOCK_USERS = {
  'superadmin@school.com': {
    id: 1,
    email: 'superadmin@school.com',
    password: 'admin123',
    role: 'super_admin',
    name: 'System Administrator',
    avatar: null
  },
  'admin@school.com': {
    id: 2,
    email: 'admin@school.com',
    password: 'admin123',
    role: 'admin',
    name: 'School Administrator',
    avatar: null
  },
  'teacher@school.com': {
    id: 3,
    email: 'teacher@school.com',
    password: 'teacher123',
    role: 'teacher',
    name: 'Mrs. Sarah Johnson',
    subjects: ['Mathematics', 'Physics'],
    classes: ['SSS 1A', 'SSS 2B'],
    avatar: null
  },
  'parent@school.com': {
    id: 4,
    email: 'parent@school.com',
    password: 'parent123',
    role: 'parent',
    name: 'Mr. John Adebayo',
    children: ['Mary Adebayo', 'David Adebayo'],
    avatar: null
  }
};

// Role-based dashboard routes
const DASHBOARD_ROUTES = {
  super_admin: '/dashboard/super-admin',
  admin: '/dashboard/admin',
  teacher: '/dashboard/teacher',
  parent: '/dashboard/parent'
};

// Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Authentication Provider Component (without JSX)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('school_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('school_user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = MOCK_USERS[email];
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object
      const { password: _, ...safeUser } = user;
      
      setUser(safeUser);
      localStorage.setItem('school_user', JSON.stringify(safeUser));
      
      return {
        success: true,
        user: safeUser,
        redirectTo: DASHBOARD_ROUTES[safeUser.role]
      };
    } catch (err) {
      setError(err.message);
      return {
        success: false,
        error: err.message
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('school_user');
    setError(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role);
  };

  // Get dashboard route for current user
  const getDashboardRoute = () => {
    return user ? DASHBOARD_ROUTES[user.role] : '/login';
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasRole,
    hasAnyRole,
    getDashboardRoute,
    isAuthenticated: !!user
  };

  // Use React.createElement instead of JSX
  return createElement(AuthContext.Provider, { value }, children);
};

export default useAuth;
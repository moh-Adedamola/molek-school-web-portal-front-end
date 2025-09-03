// File Location: src/utils/api.js
// Axios configuration with role-based interceptors

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - Add auth token and role-based headers
api.interceptors.request.use(
  (config) => {
    // Get auth data from localStorage (in real app, use secure storage)
    const authData = localStorage.getItem('auth');
    
    if (authData) {
      const { token, role } = JSON.parse(authData);
      
      // Add authorization header
      config.headers.Authorization = `Bearer ${token}`;
      
      // Add role-based headers
      config.headers['X-User-Role'] = role;
      
      // Add timestamp for request tracking
      config.headers['X-Request-Time'] = new Date().toISOString();
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle role-based responses and errors
api.interceptors.response.use(
  (response) => {
    // Log successful requests in development
    if (import.meta.env.NODE_ENV === 'development') {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem('auth');
          window.location.href = '/login';
          break;
          
        case 403:
          // Forbidden - insufficient role permissions
          console.error('Access denied: Insufficient permissions');
          break;
          
        case 429:
          // Rate limiting
          console.error('Too many requests. Please try again later.');
          break;
          
        default:
          console.error(`API Error ${status}:`, data?.message || error.message);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - please check your connection');
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Role-based API endpoints
export const endpoints = {
  // Authentication endpoints
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password'
  },
  
  // Super Admin endpoints
  superAdmin: {
    users: '/super-admin/users',
    schools: '/super-admin/schools', 
    systemReports: '/super-admin/reports',
    backup: '/super-admin/backup',
    settings: '/super-admin/settings'
  },
  
  // Admin endpoints
  admin: {
    students: '/admin/students',
    teachers: '/admin/teachers', 
    parents: '/admin/parents',
    classes: '/admin/classes',
    subjects: '/admin/subjects',
    reports: '/admin/reports',
    cms: '/admin/cms'
  },
  
  // Teacher endpoints
  teacher: {
    myStudents: '/teacher/students',
    attendance: '/teacher/attendance',
    grades: '/teacher/grades',
    reports: '/teacher/reports'
  },
  
  // Parent endpoints
  parent: {
    myChildren: '/parent/children',
    attendance: '/parent/attendance',
    grades: '/parent/grades',
    reports: '/parent/reports'
  },
  
  // Public endpoints (no auth required)
  public: {
    website: '/public/website',
    contact: '/public/contact',
    admissions: '/public/admissions'
  }
};

// Role-based request validation
export const validateRoleAccess = (userRole, endpoint) => {
  const roleEndpoints = {
    super_admin: Object.values(endpoints).flat(),
    admin: [...Object.values(endpoints.admin), ...Object.values(endpoints.public)],
    teacher: [...Object.values(endpoints.teacher), ...Object.values(endpoints.public)],
    parent: [...Object.values(endpoints.parent), ...Object.values(endpoints.public)]
  };
  
  return roleEndpoints[userRole]?.includes(endpoint) || false;
};

// Export configured axios instance
export default api;
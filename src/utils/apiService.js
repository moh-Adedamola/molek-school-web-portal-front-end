// File Location: src/utils/apiService.js
// CRUD operations with role-based permissions

import api, { endpoints } from './api.js';

// Generic API service class with role-based access control
class ApiService {
  constructor(userRole = 'guest') {
    this.userRole = userRole;
  }

  // Generic GET request with role validation
  async get(endpoint, params = {}) {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic POST request with role validation  
  async post(endpoint, data = {}) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic PUT request with role validation
  async put(endpoint, data = {}) {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Generic DELETE request with role validation
  async delete(endpoint) {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle API errors with user-friendly messages
  handleError(error) {
    if (error.response?.status === 403) {
      return new Error('You do not have permission to perform this action');
    }
    return error;
  }
}

// Super Admin API Service
export class SuperAdminService extends ApiService {
  constructor() {
    super('super_admin');
  }

  // User management
  async getAllUsers(params = {}) {
    return this.get(endpoints.superAdmin.users, params);
  }

  async createUser(userData) {
    return this.post(endpoints.superAdmin.users, userData);
  }

  async updateUser(userId, userData) {
    return this.put(`${endpoints.superAdmin.users}/${userId}`, userData);
  }

  async deleteUser(userId) {
    return this.delete(`${endpoints.superAdmin.users}/${userId}`);
  }

  // System reports
  async getSystemReports(reportType) {
    return this.get(`${endpoints.superAdmin.systemReports}/${reportType}`);
  }

  // Backup operations
  async createBackup() {
    return this.post(endpoints.superAdmin.backup);
  }

  async restoreBackup(backupId) {
    return this.post(`${endpoints.superAdmin.backup}/restore`, { backupId });
  }
}

// Admin API Service
export class AdminService extends ApiService {
  constructor() {
    super('admin');
  }

  // Student management
  async getStudents(params = {}) {
    return this.get(endpoints.admin.students, params);
  }

  async createStudent(studentData) {
    return this.post(endpoints.admin.students, studentData);
  }

  async updateStudent(studentId, studentData) {
    return this.put(`${endpoints.admin.students}/${studentId}`, studentData);
  }

  async deleteStudent(studentId) {
    return this.delete(`${endpoints.admin.students}/${studentId}`);
  }

  // Teacher management
  async getTeachers(params = {}) {
    return this.get(endpoints.admin.teachers, params);
  }

  async createTeacher(teacherData) {
    return this.post(endpoints.admin.teachers, teacherData);
  }

  async updateTeacher(teacherId, teacherData) {
    return this.put(`${endpoints.admin.teachers}/${teacherId}`, teacherData);
  }

  // Parent management
  async getParents(params = {}) {
    return this.get(endpoints.admin.parents, params);
  }

  async createParent(parentData) {
    return this.post(endpoints.admin.parents, parentData);
  }

  // Class and subject management
  async getClasses(params = {}) {
    return this.get(endpoints.admin.classes, params);
  }

  async createClass(classData) {
    return this.post(endpoints.admin.classes, classData);
  }

  async getSubjects(params = {}) {
    return this.get(endpoints.admin.subjects, params);
  }

  // Website CMS
  async getWebsiteContent(section) {
    return this.get(`${endpoints.admin.cms}/${section}`);
  }

  async updateWebsiteContent(section, contentData) {
    return this.put(`${endpoints.admin.cms}/${section}`, contentData);
  }

  // Reports
  async generateReport(reportType, params = {}) {
    return this.post(`${endpoints.admin.reports}/${reportType}`, params);
  }
}

// Teacher API Service
export class TeacherService extends ApiService {
  constructor() {
    super('teacher');
  }

  // Student management (assigned classes only)
  async getMyStudents(params = {}) {
    return this.get(endpoints.teacher.myStudents, params);
  }

  async getStudentDetails(studentId) {
    return this.get(`${endpoints.teacher.myStudents}/${studentId}`);
  }

  // Attendance management
  async markAttendance(attendanceData) {
    return this.post(endpoints.teacher.attendance, attendanceData);
  }

  async getAttendanceHistory(classId, date) {
    return this.get(`${endpoints.teacher.attendance}/${classId}`, { date });
  }

  async updateAttendance(attendanceId, attendanceData) {
    return this.put(`${endpoints.teacher.attendance}/${attendanceId}`, attendanceData);
  }

  // Grade management
  async enterGrades(gradeData) {
    return this.post(endpoints.teacher.grades, gradeData);
  }

  async updateGrade(gradeId, gradeData) {
    return this.put(`${endpoints.teacher.grades}/${gradeId}`, gradeData);
  }

  async getClassGrades(classId, subject) {
    return this.get(`${endpoints.teacher.grades}/${classId}`, { subject });
  }

  // Reports
  async generateClassReport(classId, params = {}) {
    return this.post(`${endpoints.teacher.reports}/class/${classId}`, params);
  }

  async generateStudentReport(studentId, params = {}) {
    return this.post(`${endpoints.teacher.reports}/student/${studentId}`, params);
  }
}

// Parent API Service  
export class ParentService extends ApiService {
  constructor() {
    super('parent');
  }

  // Children information (own children only)
  async getMyChildren(params = {}) {
    return this.get(endpoints.parent.myChildren, params);
  }

  async getChildDetails(childId) {
    return this.get(`${endpoints.parent.myChildren}/${childId}`);
  }

  // Attendance records (children only)
  async getChildAttendance(childId, params = {}) {
    return this.get(`${endpoints.parent.attendance}/${childId}`, params);
  }

  async getAttendanceSummary(childId, term) {
    return this.get(`${endpoints.parent.attendance}/${childId}/summary`, { term });
  }

  // Grade records (children only)
  async getChildGrades(childId, params = {}) {
    return this.get(`${endpoints.parent.grades}/${childId}`, params);
  }

  async getGradeSummary(childId, term) {
    return this.get(`${endpoints.parent.grades}/${childId}/summary`, { term });
  }

  // Reports (children only)
  async getChildReport(childId, reportType, params = {}) {
    return this.get(`${endpoints.parent.reports}/${childId}/${reportType}`, params);
  }

  // Communication
  async sendMessage(teacherId, message) {
    return this.post(`${endpoints.parent.communication}/message`, {
      teacherId,
      message
    });
  }
}

// Public API Service (no authentication required)
export class PublicService extends ApiService {
  constructor() {
    super('public');
  }

  // Website content
  async getWebsiteContent(section) {
    return this.get(`${endpoints.public.website}/${section}`);
  }

  async getAllNews(params = {}) {
    return this.get(`${endpoints.public.website}/news`, params);
  }

  async getNewsById(newsId) {
    return this.get(`${endpoints.public.website}/news/${newsId}`);
  }

  async getAllEvents(params = {}) {
    return this.get(`${endpoints.public.website}/events`, params);
  }

  // Contact and admissions
  async submitContactForm(formData) {
    return this.post(endpoints.public.contact, formData);
  }

  async submitAdmissionInquiry(inquiryData) {
    return this.post(endpoints.public.admissions, inquiryData);
  }
}

// Authentication Service
export class AuthService {
  async login(credentials) {
    try {
      const response = await api.post(endpoints.auth.login, credentials);
      
      if (response.data.token) {
        // Store auth data in localStorage
        localStorage.setItem('auth', JSON.stringify({
          token: response.data.token,
          user: response.data.user,
          role: response.data.user.role,
          permissions: response.data.permissions
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await api.post(endpoints.auth.logout);
      localStorage.removeItem('auth');
      return true;
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem('auth');
      return true;
    }
  }

  async refreshToken() {
    try {
      const response = await api.post(endpoints.auth.refresh);
      
      if (response.data.token) {
        const currentAuth = JSON.parse(localStorage.getItem('auth') || '{}');
        localStorage.setItem('auth', JSON.stringify({
          ...currentAuth,
          token: response.data.token
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await api.post(endpoints.auth.forgotPassword, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get current user from storage
  getCurrentUser() {
    const authData = localStorage.getItem('auth');
    return authData ? JSON.parse(authData) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const authData = this.getCurrentUser();
    return !!(authData && authData.token);
  }

  // Check user role
  hasRole(requiredRole) {
    const authData = this.getCurrentUser();
    return authData?.role === requiredRole;
  }

  // Check specific permission
  hasPermission(permission) {
    const authData = this.getCurrentUser();
    return authData?.permissions?.includes(permission) || false;
  }
}

// Factory function to create appropriate service based on user role
export const createApiService = (role) => {
  switch (role) {
    case 'super_admin':
      return new SuperAdminService();
    case 'admin':
      return new AdminService();
    case 'teacher':
      return new TeacherService();
    case 'parent':
      return new ParentService();
    default:
      return new PublicService();
  }
};

// Export all services
export {
  SuperAdminService,
  AdminService,
  TeacherService,
  ParentService,
  PublicService,
  AuthService
};

// Default export for convenience
export default ApiService;
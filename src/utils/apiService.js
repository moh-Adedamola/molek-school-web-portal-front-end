// utils/apiService.js - All CRUD operations with mock implementations

import api, { mockDelay, apiHelpers } from './api';

// Mock data storage (in real app, this would be database)
let mockStorage = {
  users: [],
  students: [],
  teachers: [],
  parents: [],
  classes: [],
  subjects: [],
  attendance: [],
  grades: [],
  announcements: [],
  events: [],
};

// Generate mock ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Generic CRUD operations
class ApiService {
  constructor() {
    this.mockMode = apiHelpers.isMockMode();
  }

  // ==================== AUTHENTICATION ====================
  
  async login(credentials) {
    if (this.mockMode) {
      await mockDelay(800);
      
      // Mock authentication logic
      const { email, password } = credentials;
      
      // Default test accounts for Nigerian school
      const testAccounts = [
        { email: 'admin@molekschool.ng', password: 'admin123', role: 'admin', name: 'Adebayo Johnson' },
        { email: 'teacher@molekschool.ng', password: 'teacher123', role: 'teacher', name: 'Fatima Abdullahi' },
        { email: 'parent@molekschool.ng', password: 'parent123', role: 'parent', name: 'Chidimma Okafor' },
      ];
      
      const user = testAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (user) {
        const token = `mock_token_${generateId()}`;
        return {
          token,
          user: { ...user, id: generateId() },
          expires_in: 3600 // 1 hour
        };
      } else {
        throw new Error('Invalid credentials');
      }
    }

    const response = await api.post('/auth/login', credentials);
    return response.data;
  }

  async logout() {
    if (this.mockMode) {
      await mockDelay(300);
      return { message: 'Logged out successfully' };
    }

    const response = await api.post('/auth/logout');
    return response.data;
  }

  async refreshToken() {
    if (this.mockMode) {
      await mockDelay(500);
      return { token: `mock_refresh_${generateId()}`, expires_in: 3600 };
    }

    const response = await api.post('/auth/refresh');
    return response.data;
  }

  // ==================== STUDENTS MANAGEMENT ====================

  async getStudents(filters = {}) {
    if (this.mockMode) {
      await mockDelay(600);
      
      let students = mockStorage.students;
      
      // Apply filters
      if (filters.class) {
        students = students.filter(s => s.class === filters.class);
      }
      if (filters.term) {
        students = students.filter(s => s.term === filters.term);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        students = students.filter(s => 
          s.name.toLowerCase().includes(search) ||
          s.admission_number.toLowerCase().includes(search)
        );
      }

      return {
        students,
        total: students.length,
        page: filters.page || 1,
        per_page: filters.per_page || 10,
      };
    }

    const response = await api.get('/students', { params: filters });
    return response.data;
  }

  async getStudent(id) {
    if (this.mockMode) {
      await mockDelay(400);
      const student = mockStorage.students.find(s => s.id === id);
      if (!student) throw new Error('Student not found');
      return student;
    }

    const response = await api.get(`/students/${id}`);
    return response.data;
  }

  async createStudent(studentData) {
    if (this.mockMode) {
      await mockDelay(800);
      
      const newStudent = {
        id: generateId(),
        admission_number: `MOL/${new Date().getFullYear()}/${String(mockStorage.students.length + 1).padStart(4, '0')}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...studentData,
      };
      
      mockStorage.students.push(newStudent);
      return newStudent;
    }

    const response = await api.post('/students', studentData);
    return response.data;
  }

  async updateStudent(id, studentData) {
    if (this.mockMode) {
      await mockDelay(600);
      
      const index = mockStorage.students.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Student not found');
      
      mockStorage.students[index] = {
        ...mockStorage.students[index],
        ...studentData,
        updated_at: new Date().toISOString(),
      };
      
      return mockStorage.students[index];
    }

    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  }

  async deleteStudent(id) {
    if (this.mockMode) {
      await mockDelay(500);
      
      const index = mockStorage.students.findIndex(s => s.id === id);
      if (index === -1) throw new Error('Student not found');
      
      mockStorage.students.splice(index, 1);
      return { message: 'Student deleted successfully' };
    }

    const response = await api.delete(`/students/${id}`);
    return response.data;
  }

  // ==================== TEACHERS MANAGEMENT ====================

  async getTeachers(filters = {}) {
    if (this.mockMode) {
      await mockDelay(500);
      return { teachers: mockStorage.teachers, total: mockStorage.teachers.length };
    }

    const response = await api.get('/teachers', { params: filters });
    return response.data;
  }

  async createTeacher(teacherData) {
    if (this.mockMode) {
      await mockDelay(700);
      
      const newTeacher = {
        id: generateId(),
        staff_id: `TCH/${new Date().getFullYear()}/${String(mockStorage.teachers.length + 1).padStart(3, '0')}`,
        created_at: new Date().toISOString(),
        ...teacherData,
      };
      
      mockStorage.teachers.push(newTeacher);
      return newTeacher;
    }

    const response = await api.post('/teachers', teacherData);
    return response.data;
  }

  // ==================== ATTENDANCE MANAGEMENT ====================

  async getAttendance(filters = {}) {
    if (this.mockMode) {
      await mockDelay(600);
      
      let attendance = mockStorage.attendance;
      
      if (filters.class_id) {
        attendance = attendance.filter(a => a.class_id === filters.class_id);
      }
      if (filters.date) {
        attendance = attendance.filter(a => a.date === filters.date);
      }
      if (filters.term) {
        attendance = attendance.filter(a => a.term === filters.term);
      }

      return { attendance, total: attendance.length };
    }

    const response = await api.get('/attendance', { params: filters });
    return response.data;
  }

  async markAttendance(attendanceData) {
    if (this.mockMode) {
      await mockDelay(800);
      
      const attendanceRecord = {
        id: generateId(),
        date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        ...attendanceData,
      };
      
      mockStorage.attendance.push(attendanceRecord);
      return attendanceRecord;
    }

    const response = await api.post('/attendance', attendanceData);
    return response.data;
  }

  // ==================== GRADES MANAGEMENT ====================

  async getGrades(filters = {}) {
    if (this.mockMode) {
      await mockDelay(500);
      
      let grades = mockStorage.grades;
      
      if (filters.student_id) {
        grades = grades.filter(g => g.student_id === filters.student_id);
      }
      if (filters.subject_id) {
        grades = grades.filter(g => g.subject_id === filters.subject_id);
      }
      if (filters.term) {
        grades = grades.filter(g => g.term === filters.term);
      }

      return { grades, total: grades.length };
    }

    const response = await api.get('/grades', { params: filters });
    return response.data;
  }

  async enterGrades(gradesData) {
    if (this.mockMode) {
      await mockDelay(900);
      
      const gradeRecords = gradesData.map(grade => ({
        id: generateId(),
        created_at: new Date().toISOString(),
        ...grade,
      }));
      
      mockStorage.grades.push(...gradeRecords);
      return gradeRecords;
    }

    const response = await api.post('/grades/bulk', { grades: gradesData });
    return response.data;
  }

  // ==================== CLASSES & SUBJECTS ====================

  async getClasses() {
    if (this.mockMode) {
      await mockDelay(400);
      return mockStorage.classes;
    }

    const response = await api.get('/classes');
    return response.data;
  }

  async getSubjects(filters = {}) {
    if (this.mockMode) {
      await mockDelay(400);
      
      let subjects = mockStorage.subjects;
      
      if (filters.level) {
        subjects = subjects.filter(s => s.level === filters.level);
      }

      return subjects;
    }

    const response = await api.get('/subjects', { params: filters });
    return response.data;
  }

  // ==================== SCHOOL ANNOUNCEMENTS ====================

  async getAnnouncements(filters = {}) {
    if (this.mockMode) {
      await mockDelay(400);
      
      let announcements = mockStorage.announcements;
      
      if (filters.type) {
        announcements = announcements.filter(a => a.type === filters.type);
      }

      return { announcements, total: announcements.length };
    }

    const response = await api.get('/announcements', { params: filters });
    return response.data;
  }

  async createAnnouncement(announcementData) {
    if (this.mockMode) {
      await mockDelay(600);
      
      const newAnnouncement = {
        id: generateId(),
        created_at: new Date().toISOString(),
        status: 'active',
        ...announcementData,
      };
      
      mockStorage.announcements.push(newAnnouncement);
      return newAnnouncement;
    }

    const response = await api.post('/announcements', announcementData);
    return response.data;
  }

  // ==================== REPORTS ====================

  async generateReport(reportType, filters = {}) {
    if (this.mockMode) {
      await mockDelay(1200); // Reports take longer
      
      const reportData = {
        id: generateId(),
        type: reportType,
        generated_at: new Date().toISOString(),
        filters,
        // Mock report data would be generated here
        data: { message: `Mock ${reportType} report generated successfully` }
      };
      
      return reportData;
    }

    const response = await api.post('/reports/generate', { type: reportType, filters });
    return response.data;
  }
}

// Create and export singleton instance
const apiService = new ApiService();
export default apiService;
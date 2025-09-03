// File Location: src/data/mockAttendance.js
// Term-based attendance data linked to teachers and parents

// Current academic year and term
export const currentAcademicYear = '2024/2025';
export const currentTerm = 'First Term';
export const currentWeek = 12;

// Attendance status types
export const attendanceStatus = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused'
};

// Generate attendance data for a date range
const generateAttendanceRecord = (studentId, date, status = 'present') => ({
  id: `att_${studentId}_${date.replace(/-/g, '')}`,
  studentId,
  date,
  status,
  markedBy: getTeacherForDate(date),
  markedAt: `${date}T08:30:00Z`,
  remarks: status === 'absent' ? 'No reason provided' : null
});

// Mock function to assign teacher to date (simplified)
const getTeacherForDate = (date) => {
  const teachers = ['T001', 'T002', 'T003', 'T004'];
  const dayIndex = new Date(date).getDay();
  return teachers[dayIndex % teachers.length];
};

// Generate mock attendance for date range
const generateTermAttendance = (studentIds, startDate, endDate) => {
  const attendance = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const dateString = date.toISOString().split('T')[0];
    
    studentIds.forEach(studentId => {
      // 90% attendance rate simulation
      const isPresent = Math.random() > 0.1;
      let status = isPresent ? attendanceStatus.PRESENT : attendanceStatus.ABSENT;
      
      // 5% chance of being late when present
      if (isPresent && Math.random() < 0.05) {
        status = attendanceStatus.LATE;
      }
      
      attendance.push(generateAttendanceRecord(studentId, dateString, status));
    });
  }
  
  return attendance;
};

// Mock attendance data for current term
export const mockAttendance = {
  // First Term 2024/2025 (September - December)
  firstTerm: generateTermAttendance(
    ['S001', 'S002', 'S003', 'S004', 'S005', 'S006', 'S007', 'S008', 'S009', 'S010'],
    '2024-09-02',
    '2024-12-13'
  )
};

// Attendance summary by student
export const attendanceSummary = {
  'S001': {
    studentId: 'S001',
    term: 'First Term',
    totalDays: 72,
    present: 68,
    absent: 3,
    late: 1,
    excused: 0,
    attendanceRate: 94.4
  },
  'S002': {
    studentId: 'S002',
    term: 'First Term',
    totalDays: 72,
    present: 65,
    absent: 5,
    late: 2,
    excused: 0,
    attendanceRate: 90.3
  },
  'S003': {
    studentId: 'S003',
    term: 'First Term',
    totalDays: 72,
    present: 70,
    absent: 1,
    late: 1,
    excused: 0,
    attendanceRate: 97.2
  }
};

// Class attendance statistics
export const classAttendanceStats = {
  'JSS1A': {
    classId: 'JSS1A',
    totalStudents: 35,
    averageAttendance: 92.8,
    todayPresent: 33,
    todayAbsent: 2,
    weeklyTrend: [89, 91, 94, 88, 92, 95, 93]
  },
  'JSS2B': {
    classId: 'JSS2B',
    totalStudents: 38,
    averageAttendance: 89.5,
    todayPresent: 35,
    todayAbsent: 3,
    weeklyTrend: [87, 89, 91, 85, 90, 92, 88]
  }
};

// Teacher attendance marking interface
export const teacherAttendanceView = {
  'T001': {
    teacherId: 'T001',
    assignedClasses: ['JSS1A', 'JSS2A'],
    canMarkAttendance: true,
    todayMarked: false,
    pendingClasses: ['JSS1A'],
    markedClasses: ['JSS2A']
  },
  'T002': {
    teacherId: 'T002',
    assignedClasses: ['JSS3B', 'SSS1A'],
    canMarkAttendance: true,
    todayMarked: true,
    pendingClasses: [],
    markedClasses: ['JSS3B', 'SSS1A']
  }
};

// Parent attendance view (children only)
export const parentAttendanceView = {
  'P001': {
    parentId: 'P001',
    children: [
      {
        studentId: 'S001',
        name: 'Adebayo Johnson',
        class: 'JSS2A',
        todayStatus: 'present',
        weekAttendance: ['present', 'present', 'present', 'late', 'present'],
        monthlyRate: 94.4
      }
    ]
  },
  'P002': {
    parentId: 'P002',
    children: [
      {
        studentId: 'S002',
        name: 'Fatima Ibrahim',
        class: 'SSS1B',
        todayStatus: 'absent',
        weekAttendance: ['present', 'present', 'absent', 'present', 'absent'],
        monthlyRate: 88.2
      },
      {
        studentId: 'S003',
        name: 'Ibrahim Ibrahim',
        class: 'JSS1A',
        todayStatus: 'present',
        weekAttendance: ['present', 'present', 'present', 'present', 'present'],
        monthlyRate: 97.1
      }
    ]
  }
};

// Attendance alerts for admin/parents
export const attendanceAlerts = [
  {
    id: 'alert_001',
    type: 'chronic_absence',
    studentId: 'S004',
    studentName: 'Chioma Okafor',
    class: 'JSS3A',
    message: 'Student has been absent for 3 consecutive days',
    severity: 'high',
    createdAt: '2024-12-10T09:00:00Z',
    parentNotified: true
  },
  {
    id: 'alert_002',
    type: 'attendance_drop',
    studentId: 'S005',
    studentName: 'Musa Abdullahi',
    class: 'SSS2C',
    message: 'Attendance rate dropped below 85% this month',
    severity: 'medium',
    createdAt: '2024-12-09T14:30:00Z',
    parentNotified: false
  }
];

export default mockAttendance;
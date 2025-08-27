// Mock Attendance Data - Nigerian 3-Term System
export const mockAttendance = [
  // JSS 1A Attendance Records
  {
    id: 'att_001',
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    className: 'JSS 1A',
    date: '2024-08-20',
    status: 'present',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_001',
    markedAt: '2024-08-20T08:00:00Z',
    notes: ''
  },
  {
    id: 'att_002',
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    className: 'JSS 1A',
    date: '2024-08-21',
    status: 'late',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_001',
    markedAt: '2024-08-21T08:30:00Z',
    notes: 'Arrived 30 minutes late - traffic'
  },
  {
    id: 'att_003',
    studentId: 'student_002',
    studentName: 'Tunde Johnson',
    classId: 'jss1a',
    className: 'JSS 1A',
    date: '2024-08-20',
    status: 'present',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_001',
    markedAt: '2024-08-20T08:00:00Z',
    notes: ''
  },
  {
    id: 'att_004',
    studentId: 'student_002',
    studentName: 'Tunde Johnson',
    classId: 'jss1a',
    className: 'JSS 1A',
    date: '2024-08-21',
    status: 'absent',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_001',
    markedAt: '2024-08-21T08:00:00Z',
    notes: 'Sick - parent called to inform'
  },

  // SSS 1 Science Attendance Records
  {
    id: 'att_005',
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    date: '2024-08-20',
    status: 'present',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_005',
    markedAt: '2024-08-20T08:00:00Z',
    notes: ''
  },
  {
    id: 'att_006',
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    date: '2024-08-21',
    status: 'present',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_005',
    markedAt: '2024-08-21T08:00:00Z',
    notes: ''
  },
  {
    id: 'att_007',
    studentId: 'student_004',
    studentName: 'Fatima Nwosu',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    date: '2024-08-20',
    status: 'late',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_005',
    markedAt: '2024-08-20T08:15:00Z',
    notes: 'Arrived 15 minutes late'
  },
  {
    id: 'att_008',
    studentId: 'student_004',
    studentName: 'Fatima Nwosu',
    classId: 'sss1_science',
    className: 'SSS 1 Science',
    date: '2024-08-21',
    status: 'present',
    term: '1st Term',
    academicYear: '2024/2025',
    markedBy: 'teacher_005',
    markedAt: '2024-08-21T08:00:00Z',
    notes: ''
  }
];

// Attendance summary data for analytics
export const mockAttendanceSummary = [
  {
    studentId: 'student_001',
    studentName: 'Kemi Adebayo',
    classId: 'jss1a',
    term: '1st Term',
    academicYear: '2024/2025',
    totalDays: 65,
    presentDays: 60,
    absentDays: 3,
    lateDays: 2,
    attendancePercentage: 92.3,
    status: 'excellent' // excellent, good, average, poor
  },
  {
    studentId: 'student_002',
    studentName: 'Tunde Johnson',
    classId: 'jss1a',
    term: '1st Term',
    academicYear: '2024/2025',
    totalDays: 65,
    presentDays: 58,
    absentDays: 5,
    lateDays: 2,
    attendancePercentage: 89.2,
    status: 'good'
  },
  {
    studentId: 'student_003',
    studentName: 'Chidera Okonkwo',
    classId: 'sss1_science',
    term: '1st Term',
    academicYear: '2024/2025',
    totalDays: 65,
    presentDays: 63,
    absentDays: 1,
    lateDays: 1,
    attendancePercentage: 96.9,
    status: 'excellent'
  },
  {
    studentId: 'student_004',
    studentName: 'Fatima Nwosu',
    classId: 'sss1_science',
    term: '1st Term',
    academicYear: '2024/2025',
    totalDays: 65,
    presentDays: 61,
    absentDays: 2,
    lateDays: 2,
    attendancePercentage: 93.8,
    status: 'excellent'
  }
];

// Attendance helper functions
export const getAttendanceByStudent = (studentId) => {
  return mockAttendance.filter(record => record.studentId === studentId);
};

export const getAttendanceByClass = (classId, date = null) => {
  if (date) {
    return mockAttendance.filter(record => 
      record.classId === classId && record.date === date
    );
  }
  return mockAttendance.filter(record => record.classId === classId);
};

export const getAttendanceByDate = (date) => {
  return mockAttendance.filter(record => record.date === date);
};

export const getAttendanceSummary = (studentId) => {
  return mockAttendanceSummary.find(summary => summary.studentId === studentId);
};

export const getClassAttendanceSummary = (classId, term = '1st Term') => {
  return mockAttendanceSummary.filter(summary => 
    summary.classId === classId && summary.term === term
  );
};

export const calculateAttendancePercentage = (presentDays, totalDays) => {
  if (totalDays === 0) return 0;
  return Math.round((presentDays / totalDays) * 100 * 10) / 10;
};

export const getAttendanceStatus = (percentage) => {
  if (percentage >= 95) return 'excellent';
  if (percentage >= 85) return 'good';
  if (percentage >= 75) return 'average';
  return 'poor';
};

export const getAttendanceStatusColor = (status) => {
  const colors = {
    excellent: 'green',
    good: 'blue', 
    average: 'yellow',
    poor: 'red'
  };
  return colors[status] || 'gray';
};

export const getAttendanceColorByStatus = (attendanceStatus) => {
  const statusColors = {
    present: 'green',
    absent: 'red',
    late: 'orange',
    excused: 'blue'
  };
  return statusColors[attendanceStatus] || 'gray';
};

// Nigerian school calendar terms
export const nigerianTerms = [
  {
    name: '1st Term',
    startDate: '2024-09-16',
    endDate: '2024-12-20',
    totalWeeks: 14,
    totalDays: 70,
    holidays: ['Independence Day', 'Christmas Break']
  },
  {
    name: '2nd Term',
    startDate: '2025-01-08',
    endDate: '2025-04-04',
    totalWeeks: 13,
    totalDays: 65,
    holidays: ['New Year', 'Easter Break']
  },
  {
    name: '3rd Term',
    startDate: '2025-04-29',
    endDate: '2025-07-25',
    totalWeeks: 13,
    totalDays: 65,
    holidays: ['Children\'s Day', 'Democracy Day']
  }
];

// Attendance analytics functions
export const getTermAttendanceAnalytics = (term, academicYear) => {
  const termRecords = mockAttendance.filter(record => 
    record.term === term && record.academicYear === academicYear
  );
  
  const totalRecords = termRecords.length;
  const presentCount = termRecords.filter(r => r.status === 'present').length;
  const absentCount = termRecords.filter(r => r.status === 'absent').length;
  const lateCount = termRecords.filter(r => r.status === 'late').length;
  
  return {
    totalRecords,
    presentCount,
    absentCount, 
    lateCount,
    presentPercentage: totalRecords ? Math.round((presentCount / totalRecords) * 100) : 0,
    absentPercentage: totalRecords ? Math.round((absentCount / totalRecords) * 100) : 0,
    latePercentage: totalRecords ? Math.round((lateCount / totalRecords) * 100) : 0
  };
};

export const getWeeklyAttendancePattern = (classId, weekStartDate) => {
  const weekDays = [];
  const startDate = new Date(weekStartDate);
  
  for (let i = 0; i < 5; i++) { // Monday to Friday
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    const dayRecords = mockAttendance.filter(record => 
      record.classId === classId && record.date === dateStr
    );
    
    weekDays.push({
      date: dateStr,
      dayName: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
      totalStudents: dayRecords.length,
      present: dayRecords.filter(r => r.status === 'present').length,
      absent: dayRecords.filter(r => r.status === 'absent').length,
      late: dayRecords.filter(r => r.status === 'late').length
    });
  }
  
  return weekDays;
};

export default mockAttendance;
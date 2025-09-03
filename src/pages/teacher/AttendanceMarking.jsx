// File location: src/pages/teacher/AttendanceMarking.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Save, RotateCcw } from 'lucide-react';

const AttendanceMarking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Mock classes data
  const teacherClasses = [
    { id: 'jss1a', name: 'JSS 1A', subject: 'Mathematics' },
    { id: 'jss1b', name: 'JSS 1B', subject: 'Mathematics' },
    { id: 'jss2a', name: 'JSS 2A', subject: 'English Language' }
  ];

  // Mock students data
  const mockStudents = {
    jss1a: [
      { id: 1, name: 'Adebayo John', admissionNumber: 'SCH/2024/001' },
      { id: 2, name: 'Fatima Mohammed', admissionNumber: 'SCH/2024/002' },
      { id: 3, name: 'Chinyere Okafor', admissionNumber: 'SCH/2024/003' }
    ],
    jss1b: [
      { id: 4, name: 'Ibrahim Sani', admissionNumber: 'SCH/2024/004' },
      { id: 5, name: 'Grace Emeka', admissionNumber: 'SCH/2024/005' }
    ],
    jss2a: [
      { id: 6, name: 'Kemi Adeyemi', admissionNumber: 'SCH/2024/006' },
      { id: 7, name: 'Musa Aliyu', admissionNumber: 'SCH/2024/007' }
    ]
  };

  // Load students when class is selected
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      setTimeout(() => {
        const classStudents = mockStudents[selectedClass] || [];
        setStudents(classStudents);
        
        // Initialize attendance state
        const initialAttendance = {};
        classStudents.forEach(student => {
          initialAttendance[student.id] = 'present';
        });
        setAttendance(initialAttendance);
        setLoading(false);
      }, 500);
    }
  }, [selectedClass]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    // Mock API call
    setTimeout(() => {
      alert('Attendance saved successfully!');
      setSaving(false);
    }, 1000);
  };

  const handleResetAttendance = () => {
    const resetAttendance = {};
    students.forEach(student => {
      resetAttendance[student.id] = 'present';
    });
    setAttendance(resetAttendance);
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <div className="container-max py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">Mark Attendance</h1>
        <p className="text-neutral-600">Record daily attendance for your classes</p>
      </div>

      {/* Date and Class Selection */}
      <div className="card-base mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-base w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-base w-full"
            >
              <option value="">Select a class</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} - {cls.subject}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedClass && (
        <>
          {/* Attendance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-neutral-800">{stats.total}</p>
              <p className="text-sm text-neutral-600">Total</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-secondary-600">{stats.present}</p>
              <p className="text-sm text-neutral-600">Present</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-accent-600">{stats.late}</p>
              <p className="text-sm text-neutral-600">Late</p>
            </div>
            <div className="card-base text-center">
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-neutral-600">Absent</p>
            </div>
          </div>

          {/* Attendance Form */}
          <div className="card-base">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h3 className="text-lg font-semibold text-neutral-800">
                    Class: {teacherClasses.find(c => c.id === selectedClass)?.name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetAttendance}
                      className="btn-outline flex items-center gap-2 px-4 py-2 text-sm"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset All
                    </button>
                    <button
                      onClick={handleSaveAttendance}
                      disabled={saving}
                      className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
                    >
                      <Save className="h-4 w-4" />
                      {saving ? 'Saving...' : 'Save Attendance'}
                    </button>
                  </div>
                </div>

                {/* Students List */}
                <div className="space-y-4">
                  {students.map(student => (
                    <div key={student.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="mb-3 md:mb-0">
                        <h4 className="font-medium text-neutral-800">{student.name}</h4>
                        <p className="text-sm text-neutral-600">{student.admissionNumber}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="present"
                            checked={attendance[student.id] === 'present'}
                            onChange={() => handleAttendanceChange(student.id, 'present')}
                            className="text-secondary-600 focus:ring-secondary-600"
                          />
                          <span className="status-present px-3 py-1 rounded-full text-sm font-medium">
                            Present
                          </span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="late"
                            checked={attendance[student.id] === 'late'}
                            onChange={() => handleAttendanceChange(student.id, 'late')}
                            className="text-accent-600 focus:ring-accent-600"
                          />
                          <span className="status-late px-3 py-1 rounded-full text-sm font-medium">
                            Late
                          </span>
                        </label>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`attendance-${student.id}`}
                            value="absent"
                            checked={attendance[student.id] === 'absent'}
                            onChange={() => handleAttendanceChange(student.id, 'absent')}
                            className="text-red-600 focus:ring-red-600"
                          />
                          <span className="status-absent px-3 py-1 rounded-full text-sm font-medium">
                            Absent
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {students.length === 0 && (
                  <div className="text-center py-8 text-neutral-500">
                    No students found for this class
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {!selectedClass && (
        <div className="card-base text-center py-12">
          <Clock className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-700 mb-2">Select a Class</h3>
          <p className="text-neutral-500">Choose a class and date to start marking attendance</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceMarking;
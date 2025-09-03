// File location: src/components/forms/AttendanceForm.jsx
import React, { useState } from 'react';
import { Calendar, Clock, Users, Save, X } from 'lucide-react';

const AttendanceForm = ({ 
  students = [], 
  onSubmit, 
  onCancel, 
  initialData = {},
  className = '',
  subject = '' 
}) => {
  const [formData, setFormData] = useState({
    date: initialData.date || new Date().toISOString().split('T')[0],
    period: initialData.period || '',
    subject: initialData.subject || subject,
    attendance: initialData.attendance || {}
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const periods = [
    { value: '1', label: '1st Period (8:00 - 9:00 AM)' },
    { value: '2', label: '2nd Period (9:00 - 10:00 AM)' },
    { value: '3', label: '3rd Period (10:30 - 11:30 AM)' },
    { value: '4', label: '4th Period (11:30 - 12:30 PM)' },
    { value: '5', label: '5th Period (1:30 - 2:30 PM)' },
    { value: '6', label: '6th Period (2:30 - 3:30 PM)' }
  ];

  // Initialize attendance for all students
  React.useEffect(() => {
    if (students.length > 0 && Object.keys(formData.attendance).length === 0) {
      const initialAttendance = {};
      students.forEach(student => {
        initialAttendance[student.id] = initialData.attendance?.[student.id] || 'present';
      });
      setFormData(prev => ({ ...prev, attendance: initialAttendance }));
    }
  }, [students, initialData.attendance]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAttendanceChange = (studentId, status) => {
    setFormData(prev => ({
      ...prev,
      attendance: { ...prev.attendance, [studentId]: status }
    }));
  };

  const markAllAttendance = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setFormData(prev => ({ ...prev, attendance: newAttendance }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.date || !formData.period || !formData.subject) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting attendance:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAttendanceStats = () => {
    const attendance = formData.attendance;
    const total = students.length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Form Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-lg font-semibold text-neutral-800">Mark Attendance</h3>
        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline flex items-center gap-2 px-4 py-2 text-sm"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || students.length === 0}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Attendance'}
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="input-base w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Clock className="inline h-4 w-4 mr-1" />
            Period *
          </label>
          <select
            value={formData.period}
            onChange={(e) => handleInputChange('period', e.target.value)}
            className="input-base w-full"
            required
          >
            <option value="">Select Period</option>
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="input-base w-full"
            placeholder="Enter subject name"
            required
          />
        </div>
      </div>

      {/* Attendance Stats */}
      {students.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-neutral-100 rounded-lg">
            <p className="text-xl font-bold text-neutral-800">{stats.total}</p>
            <p className="text-sm text-neutral-600">Total</p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-xl font-bold text-secondary-600">{stats.present}</p>
            <p className="text-sm text-neutral-600">Present</p>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <p className="text-xl font-bold text-accent-600">{stats.late}</p>
            <p className="text-sm text-neutral-600">Late</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-xl font-bold text-red-600">{stats.absent}</p>
            <p className="text-sm text-neutral-600">Absent</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {students.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => markAllAttendance('present')}
            className="btn-secondary text-sm px-3 py-1"
          >
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => markAllAttendance('absent')}
            className="btn-danger text-sm px-3 py-1"
          >
            Mark All Absent
          </button>
          <button
            type="button"
            onClick={() => markAllAttendance('late')}
            className="bg-accent-600 hover:bg-accent-700 text-white text-sm px-3 py-1 rounded transition-colors"
          >
            Mark All Late
          </button>
        </div>
      )}

      {/* Students Attendance List */}
      {students.length > 0 ? (
        <div className="space-y-3">
          <h4 className="font-medium text-neutral-800 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students ({students.length})
          </h4>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map(student => (
              <div 
                key={student.id} 
                className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-neutral-50 rounded-lg gap-3"
              >
                <div className="flex-1">
                  <h5 className="font-medium text-neutral-800">{student.name}</h5>
                  <p className="text-sm text-neutral-600">
                    {student.admissionNumber} {student.class && `• ${student.class}`}
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="present"
                      checked={formData.attendance[student.id] === 'present'}
                      onChange={() => handleAttendanceChange(student.id, 'present')}
                      className="text-secondary-600 focus:ring-secondary-600"
                    />
                    <span className="status-present px-2 py-1 rounded-full text-xs font-medium">
                      Present
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="late"
                      checked={formData.attendance[student.id] === 'late'}
                      onChange={() => handleAttendanceChange(student.id, 'late')}
                      className="text-accent-600 focus:ring-accent-600"
                    />
                    <span className="status-late px-2 py-1 rounded-full text-xs font-medium">
                      Late
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="absent"
                      checked={formData.attendance[student.id] === 'absent'}
                      onChange={() => handleAttendanceChange(student.id, 'absent')}
                      className="text-red-600 focus:ring-red-600"
                    />
                    <span className="status-absent px-2 py-1 rounded-full text-xs font-medium">
                      Absent
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-neutral-50 rounded-lg">
          <Users className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-600">No students available</p>
          <p className="text-sm text-neutral-500">Students will appear here when a class is selected</p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-ghost px-6 py-2"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || students.length === 0}
          className="btn-primary px-6 py-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving Attendance...' : 'Save Attendance'}
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm;
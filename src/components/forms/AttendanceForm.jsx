import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const AttendanceForm = ({ students = [], onSubmit, loading = false }) => {
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  // Handle attendance status change
  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const attendanceData = {
      date: selectedDate,
      records: Object.entries(attendance).map(([studentId, status]) => ({
        studentId: parseInt(studentId),
        status,
        markedAt: new Date().toISOString()
      }))
    };

    onSubmit(attendanceData);
  };

  // Get status color classes
  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'absent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'late':
        return 'bg-accent-100 text-accent-800 border-accent-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <Card.Header>
        <Card.Title className="text-primary-800">Mark Daily Attendance</Card.Title>
      </Card.Header>

      <form onSubmit={handleSubmit}>
        <Card.Content>
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Attendance Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Students List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary-800 mb-4">
              Students ({students.length})
            </h3>
            
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{student.name}</p>
                    <p className="text-sm text-neutral-600">
                      {student.class} • ID: {student.id}
                    </p>
                  </div>
                </div>

                {/* Attendance Buttons */}
                <div className="flex space-x-2">
                  {['present', 'late', 'absent'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(student.id, status)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium capitalize transition-colors ${
                        attendance[student.id] === status
                          ? getStatusColor(status)
                          : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {Object.keys(attendance).length > 0 && (
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-800 mb-2">Attendance Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold text-secondary-600">
                    {Object.values(attendance).filter(s => s === 'present').length}
                  </div>
                  <div className="text-neutral-600">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-600">
                    {Object.values(attendance).filter(s => s === 'late').length}
                  </div>
                  <div className="text-neutral-600">Late</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {Object.values(attendance).filter(s => s === 'absent').length}
                  </div>
                  <div className="text-neutral-600">Absent</div>
                </div>
              </div>
            </div>
          )}
        </Card.Content>

        <Card.Footer className="flex justify-between">
          <Button variant="secondary" type="button">
            Clear All
          </Button>
          <Button 
            type="submit" 
            disabled={Object.keys(attendance).length === 0 || loading}
          >
            {loading ? 'Saving...' : 'Save Attendance'}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
};

export default AttendanceForm;
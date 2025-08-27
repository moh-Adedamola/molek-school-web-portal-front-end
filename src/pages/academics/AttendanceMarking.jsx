import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AttendanceForm from '../../components/forms/AttendanceForm';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AttendanceMarking = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock classes data - Nigerian school structure
  const mockClasses = [
    { id: 'jss1', name: 'JSS 1', level: 'junior' },
    { id: 'jss2', name: 'JSS 2', level: 'junior' },
    { id: 'jss3', name: 'JSS 3', level: 'junior' },
    { id: 'sss1', name: 'SSS 1', level: 'senior' },
    { id: 'sss2', name: 'SSS 2', level: 'senior' },
    { id: 'sss3', name: 'SSS 3', level: 'senior' }
  ];

  // Mock students data
  const mockStudentsData = {
    jss1: [
      { id: 1, name: 'Adebayo Johnson', class: 'JSS 1' },
      { id: 2, name: 'Fatima Mohammed', class: 'JSS 1' },
      { id: 3, name: 'Chidimma Okafor', class: 'JSS 1' },
      { id: 4, name: 'Ibrahim Yusuf', class: 'JSS 1' },
      { id: 5, name: 'Grace Emenike', class: 'JSS 1' }
    ],
    jss2: [
      { id: 6, name: 'Olumide Adeyemi', class: 'JSS 2' },
      { id: 7, name: 'Aisha Bello', class: 'JSS 2' },
      { id: 8, name: 'Kenneth Ugwu', class: 'JSS 2' },
      { id: 9, name: 'Zainab Hassan', class: 'JSS 2' },
      { id: 10, name: 'David Ekpo', class: 'JSS 2' }
    ],
    sss1: [
      { id: 11, name: 'Temitope Alabi', class: 'SSS 1' },
      { id: 12, name: 'Amina Garba', class: 'SSS 1' },
      { id: 13, name: 'Emeka Nwankwo', class: 'SSS 1' },
      { id: 14, name: 'Hauwa Abdullahi', class: 'SSS 1' },
      { id: 15, name: 'Samuel Osei', class: 'SSS 1' }
    ]
  };

  // Load classes on component mount
  useEffect(() => {
    setClasses(mockClasses);
  }, []);

  // Load students when class is selected
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStudents(mockStudentsData[selectedClass] || []);
        setLoading(false);
      }, 500);
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  // Handle attendance submission
  const handleAttendanceSubmit = async (attendanceData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Attendance Data:', attendanceData);
      
      toast.success(`Attendance saved for ${attendanceData.records.length} students`);
      
      // Optional: Reset form or redirect
      
    } catch (error) {
      toast.error('Failed to save attendance. Please try again.');
      console.error('Attendance Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-2">
            Daily Attendance Marking
          </h1>
          <p className="text-neutral-600">
            Mark student attendance for today's classes
          </p>
        </div>

        {/* Class Selection */}
        <Card className="mb-6">
          <Card.Header>
            <Card.Title className="text-primary-800">Select Class</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`p-3 rounded-lg text-center border transition-all duration-200 ${
                    selectedClass === cls.id
                      ? 'bg-primary-100 border-primary-300 text-primary-800'
                      : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="font-semibold">{cls.name}</div>
                  <div className="text-xs capitalize text-neutral-600">
                    {cls.level}
                  </div>
                </button>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Loading State */}
        {loading && selectedClass && (
          <Card className="text-center py-12">
            <Card.Content>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading students...</p>
            </Card.Content>
          </Card>
        )}

        {/* No Class Selected */}
        {!selectedClass && !loading && (
          <Card className="text-center py-12">
            <Card.Content>
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Select a Class
              </h3>
              <p className="text-neutral-600">
                Choose a class from above to start marking attendance
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Attendance Form */}
        {selectedClass && !loading && students.length > 0 && (
          <AttendanceForm
            students={students}
            onSubmit={handleAttendanceSubmit}
            loading={loading}
          />
        )}

        {/* No Students */}
        {selectedClass && !loading && students.length === 0 && (
          <Card className="text-center py-12">
            <Card.Content>
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                No Students Found
              </h3>
              <p className="text-neutral-600">
                This class doesn't have any students enrolled yet.
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="secondary">
            View Attendance History
          </Button>
          <Button variant="accent">
            Generate Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMarking;
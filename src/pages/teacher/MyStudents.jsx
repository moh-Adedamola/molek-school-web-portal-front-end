// File location: src/pages/teacher/MyStudents.jsx
import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, BookOpen, Calendar } from 'lucide-react';

const MyStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      const mockStudents = [
        {
          id: 1,
          name: 'Adebayo John',
          class: 'JSS 1A',
          admissionNumber: 'SCH/2024/001',
          subjects: ['Mathematics', 'English'],
          attendance: 85,
          lastSeen: '2024-03-15'
        },
        {
          id: 2,
          name: 'Fatima Mohammed',
          class: 'JSS 1A',
          admissionNumber: 'SCH/2024/002',
          subjects: ['Mathematics', 'Basic Science'],
          attendance: 92,
          lastSeen: '2024-03-15'
        },
        {
          id: 3,
          name: 'Chinyere Okafor',
          class: 'JSS 2B',
          admissionNumber: 'SCH/2024/003',
          subjects: ['Mathematics'],
          attendance: 78,
          lastSeen: '2024-03-14'
        }
      ];
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter students based on search and class filter
  useEffect(() => {
    let filtered = students;
    
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterClass !== 'all') {
      filtered = filtered.filter(student => student.class === filterClass);
    }
    
    setFilteredStudents(filtered);
  }, [searchTerm, filterClass, students]);

  const getAttendanceStatus = (attendance) => {
    if (attendance >= 90) return 'status-present';
    if (attendance >= 75) return 'badge-warning';
    return 'badge-error';
  };

  const uniqueClasses = [...new Set(students.map(student => student.class))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container-max py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">My Students</h1>
        <p className="text-neutral-600">Manage and view all students assigned to your classes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="card-base">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <p className="text-sm text-neutral-600">Total Students</p>
              <p className="text-xl font-bold text-neutral-800">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-secondary-600 mr-3" />
            <div>
              <p className="text-sm text-neutral-600">Classes Teaching</p>
              <p className="text-xl font-bold text-neutral-800">{uniqueClasses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card-base">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-accent-600 mr-3" />
            <div>
              <p className="text-sm text-neutral-600">Avg Attendance</p>
              <p className="text-xl font-bold text-neutral-800">
                {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length || 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card-base mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name or admission number..."
              className="input-base pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <select
              className="input-base pl-10 pr-8 appearance-none"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="all">All Classes</option>
              {uniqueClasses.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="card-base">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                <th className="px-4 py-3 text-left text-sm font-medium mobile-hidden">Class</th>
                <th className="px-4 py-3 text-left text-sm font-medium mobile-hidden">Subjects</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Attendance</th>
                <th className="px-4 py-3 text-left text-sm font-medium mobile-hidden">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr 
                  key={student.id} 
                  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-neutral-800">{student.name}</p>
                      <p className="text-sm text-neutral-600">{student.admissionNumber}</p>
                      <p className="text-sm text-neutral-600 md:hidden">{student.class}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 mobile-hidden">
                    <span className="badge-info">{student.class}</span>
                  </td>
                  <td className="px-4 py-3 mobile-hidden">
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.slice(0, 2).map(subject => (
                        <span key={subject} className="text-xs bg-neutral-100 px-2 py-1 rounded">
                          {subject}
                        </span>
                      ))}
                      {student.subjects.length > 2 && (
                        <span className="text-xs text-neutral-500">+{student.subjects.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${getAttendanceStatus(student.attendance)} px-2 py-1 rounded-full text-xs font-medium`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3 mobile-hidden">
                    <p className="text-sm text-neutral-600">{student.lastSeen}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-neutral-500">
              No students found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStudents;
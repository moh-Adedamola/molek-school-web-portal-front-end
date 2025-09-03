// File location: src/pages/teacher/GradeEntry.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Save, Calculator, AlertCircle } from 'lucide-react';

const GradeEntry = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('first');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Mock data
  const teacherClasses = [
    { id: 'jss1a', name: 'JSS 1A' },
    { id: 'jss2b', name: 'JSS 2B' },
    { id: 'sss1a', name: 'SSS 1A' }
  ];

  const subjects = {
    jss1a: ['Mathematics', 'English Language', 'Basic Science'],
    jss2b: ['Mathematics', 'English Language', 'Civic Education'],
    sss1a: ['Mathematics', 'Physics', 'Chemistry']
  };

  const assessmentTypes = [
    { value: 'test1', label: '1st Test (10 marks)' },
    { value: 'test2', label: '2nd Test (10 marks)' },
    { value: 'assignment', label: 'Assignment (10 marks)' },
    { value: 'exam', label: 'Examination (70 marks)' }
  ];

  const mockStudents = [
    { id: 1, name: 'Adebayo John', admissionNumber: 'SCH/2024/001' },
    { id: 2, name: 'Fatima Mohammed', admissionNumber: 'SCH/2024/002' },
    { id: 3, name: 'Chinyere Okafor', admissionNumber: 'SCH/2024/003' },
    { id: 4, name: 'Emeka Okwu', admissionNumber: 'SCH/2024/004' },
    { id: 5, name: 'Aisha Bello', admissionNumber: 'SCH/2024/005' }
  ];

  // Load students when class is selected
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      setTimeout(() => {
        setStudents(mockStudents);
        // Initialize grades
        const initialGrades = {};
        mockStudents.forEach(student => {
          initialGrades[student.id] = '';
        });
        setGrades(initialGrades);
        setLoading(false);
      }, 500);
    }
  }, [selectedClass]);

  const handleGradeChange = (studentId, grade) => {
    // Validate grade based on assessment type
    const maxMarks = getMaxMarks();
    if (grade === '' || (grade >= 0 && grade <= maxMarks)) {
      setGrades(prev => ({
        ...prev,
        [studentId]: grade
      }));
    }
  };

  const getMaxMarks = () => {
    switch (selectedAssessment) {
      case 'test1':
      case 'test2':
      case 'assignment':
        return 10;
      case 'exam':
        return 70;
      default:
        return 100;
    }
  };

  const getGrade = (score) => {
    if (score >= 80) return { grade: 'A', class: 'text-green-600' };
    if (score >= 70) return { grade: 'B', class: 'text-blue-600' };
    if (score >= 60) return { grade: 'C', class: 'text-yellow-600' };
    if (score >= 50) return { grade: 'D', class: 'text-orange-600' };
    if (score >= 40) return { grade: 'E', class: 'text-red-400' };
    return { grade: 'F', class: 'text-red-600' };
  };

  const calculateStats = () => {
    const validGrades = Object.values(grades).filter(g => g !== '' && !isNaN(g));
    if (validGrades.length === 0) return { average: 0, highest: 0, lowest: 0 };
    
    const numbers = validGrades.map(Number);
    return {
      average: (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1),
      highest: Math.max(...numbers),
      lowest: Math.min(...numbers)
    };
  };

  const handleSaveGrades = async () => {
    setSaving(true);
    // Mock API call
    setTimeout(() => {
      alert('Grades saved successfully!');
      setSaving(false);
    }, 1000);
  };

  const isFormValid = () => {
    return selectedClass && selectedSubject && selectedAssessment && Object.values(grades).some(g => g !== '');
  };

  const stats = calculateStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Grade Entry</h1>
        <p className="text-gray-600">Enter and manage student grades for assessments</p>
      </div>

      {/* Selection Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline h-4 w-4 mr-1" />
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="inline h-4 w-4 mr-1" />
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              disabled={!selectedClass}
            >
              <option value="">Select Subject</option>
              {selectedClass && subjects[selectedClass]?.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="first">First Term</option>
              <option value="second">Second Term</option>
              <option value="third">Third Term</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assessment</label>
            <select
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Assessment</option>
              {assessmentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selectedClass && selectedSubject && selectedAssessment && (
        <>
          {/* Assessment Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Entering grades for: {selectedSubject} - {assessmentTypes.find(t => t.value === selectedAssessment)?.label}
                </p>
                <p className="text-sm text-blue-600">
                  Maximum marks: {getMaxMarks()} | Class: {teacherClasses.find(c => c.id === selectedClass)?.name} | Term: {selectedTerm.charAt(0).toUpperCase() + selectedTerm.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.average}</p>
              <p className="text-sm text-gray-600">Class Average</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.highest}</p>
              <p className="text-sm text-gray-600">Highest Score</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.lowest}</p>
              <p className="text-sm text-gray-600">Lowest Score</p>
            </div>
          </div>

          {/* Grade Entry Form */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Student Grades</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          S/N
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Admission Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Score ({getMaxMarks()} marks)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Grade
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student, index) => {
                        const score = grades[student.id];
                        const gradeInfo = score && !isNaN(score) ? getGrade(Number(score)) : null;
                        
                        return (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.admissionNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                max={getMaxMarks()}
                                value={grades[student.id] || ''}
                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {gradeInfo && (
                                <span className={`text-sm font-medium ${gradeInfo.class}`}>
                                  {gradeInfo.grade}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {Object.values(grades).filter(g => g !== '').length} of {students.length} students graded
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        const newGrades = {};
                        students.forEach(student => {
                          newGrades[student.id] = '';
                        });
                        setGrades(newGrades);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Clear All
                    </button>
                    
                    <button
                      onClick={handleSaveGrades}
                      disabled={!isFormValid() || saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : 'Save Grades'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Instructions */}
      {!selectedClass && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex">
            <Calculator className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Getting Started</h3>
              <p className="mt-1 text-sm text-yellow-700">
                Select a class, subject, and assessment type to begin entering grades for your students.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeEntry;
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import GradeForm from '../../components/forms/GradeForm';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const GradeEntry = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - Nigerian school structure
  const mockClasses = [
    { id: 'jss1', name: 'JSS 1', level: 'junior' },
    { id: 'jss2', name: 'JSS 2', level: 'junior' },
    { id: 'jss3', name: 'JSS 3', level: 'junior' },
    { id: 'sss1', name: 'SSS 1', level: 'senior' },
    { id: 'sss2', name: 'SSS 2', level: 'senior' },
    { id: 'sss3', name: 'SSS 3', level: 'senior' }
  ];

  const mockSubjects = [
    'Mathematics', 'English Language', 'Basic Science', 'Basic Technology',
    'Social Studies', 'French', 'Civic Education', 'Christian Religious Studies',
    'Islamic Religious Studies', 'Physical & Health Education', 'Computer Studies',
    'Creative & Cultural Arts', 'Business Studies', 'Home Economics',
    'Agricultural Science'
  ];

  const mockTerms = [
    { id: '1st', name: '1st Term' },
    { id: '2nd', name: '2nd Term' },
    { id: '3rd', name: '3rd Term' }
  ];

  const currentSession = '2024/2025';

  // Mock students data
  const mockStudentsData = {
    jss1: [
      { id: 1, name: 'Adebayo Johnson', class: 'JSS 1', admissionNo: 'JSS1/001' },
      { id: 2, name: 'Fatima Mohammed', class: 'JSS 1', admissionNo: 'JSS1/002' },
      { id: 3, name: 'Chidimma Okafor', class: 'JSS 1', admissionNo: 'JSS1/003' },
      { id: 4, name: 'Ibrahim Yusuf', class: 'JSS 1', admissionNo: 'JSS1/004' },
      { id: 5, name: 'Grace Emenike', class: 'JSS 1', admissionNo: 'JSS1/005' }
    ],
    jss2: [
      { id: 6, name: 'Olumide Adeyemi', class: 'JSS 2', admissionNo: 'JSS2/001' },
      { id: 7, name: 'Aisha Bello', class: 'JSS 2', admissionNo: 'JSS2/002' },
      { id: 8, name: 'Kenneth Ugwu', class: 'JSS 2', admissionNo: 'JSS2/003' },
      { id: 9, name: 'Zainab Hassan', class: 'JSS 2', admissionNo: 'JSS2/004' },
      { id: 10, name: 'David Ekpo', class: 'JSS 2', admissionNo: 'JSS2/005' }
    ],
    jss3: [
      { id: 16, name: 'Blessing Okoro', class: 'JSS 3', admissionNo: 'JSS3/001' },
      { id: 17, name: 'Musa Ahmad', class: 'JSS 3', admissionNo: 'JSS3/002' },
      { id: 18, name: 'Chioma Okonkwo', class: 'JSS 3', admissionNo: 'JSS3/003' }
    ],
    sss1: [
      { id: 11, name: 'Temitope Alabi', class: 'SSS 1', admissionNo: 'SSS1/001' },
      { id: 12, name: 'Amina Garba', class: 'SSS 1', admissionNo: 'SSS1/002' },
      { id: 13, name: 'Emeka Nwankwo', class: 'SSS 1', admissionNo: 'SSS1/003' },
      { id: 14, name: 'Hauwa Abdullahi', class: 'SSS 1', admissionNo: 'SSS1/004' },
      { id: 15, name: 'Samuel Osei', class: 'SSS 1', admissionNo: 'SSS1/005' }
    ],
    sss2: [
      { id: 19, name: 'Folake Adebisi', class: 'SSS 2', admissionNo: 'SSS2/001' },
      { id: 20, name: 'Uche Okonkwo', class: 'SSS 2', admissionNo: 'SSS2/002' },
      { id: 21, name: 'Rasheed Ibrahim', class: 'SSS 2', admissionNo: 'SSS2/003' }
    ],
    sss3: [
      { id: 22, name: 'Kemi Oyebode', class: 'SSS 3', admissionNo: 'SSS3/001' },
      { id: 23, name: 'Abdullahi Hassan', class: 'SSS 3', admissionNo: 'SSS3/002' },
      { id: 24, name: 'Ngozi Okello', class: 'SSS 3', admissionNo: 'SSS3/003' }
    ]
  };

  // Load static data on component mount
  useEffect(() => {
    setClasses(mockClasses);
    setSubjects(mockSubjects);
    setTerms(mockTerms);
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

  // Handle grade submission
  const handleGradeSubmit = async (gradeData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Grade Data:', gradeData);
      
      toast.success(`Grades saved for ${gradeData.records.length} students in ${selectedSubject}`);
      
      // Optional: Reset form or redirect
      
    } catch (error) {
      toast.error('Failed to save grades. Please try again.');
      console.error('Grade Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if all selections are made and students are loaded
  const canShowGradeForm = selectedClass && selectedSubject && selectedTerm && !loading && students.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-2">
            Grade Entry System
          </h1>
          <p className="text-neutral-600">
            Enter student grades for the {currentSession} academic session
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

        {/* Subject & Term Selection */}
        {selectedClass && (
          <Card className="mb-6">
            <Card.Header>
              <Card.Title className="text-primary-800">Select Subject & Term</Card.Title>
            </Card.Header>
            <Card.Content className="space-y-6">
              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Term Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Term
                </label>
                <div className="flex flex-wrap gap-3">
                  {terms.map((term) => (
                    <button
                      key={term.id}
                      onClick={() => setSelectedTerm(term.id)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedTerm === term.id
                          ? 'bg-secondary-100 border-secondary-300 text-secondary-800'
                          : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {term.name}
                    </button>
                  ))}
                </div>
              </div>
            </Card.Content>
          </Card>
        )}

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
                Choose a class from above to start entering grades
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Incomplete Selection State */}
        {selectedClass && (!selectedSubject || !selectedTerm) && !loading && (
          <Card className="text-center py-12">
            <Card.Content>
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Complete Your Selection
              </h3>
              <p className="text-neutral-600">
                {!selectedSubject && !selectedTerm 
                  ? 'Please select both a subject and term to continue'
                  : !selectedSubject 
                  ? 'Please select a subject to continue'
                  : 'Please select a term to continue'
                }
              </p>
            </Card.Content>
          </Card>
        )}

        {/* Grade Entry Form */}
        {canShowGradeForm && (
          <GradeForm
            students={students}
            selectedClass={classes.find(c => c.id === selectedClass)?.name}
            selectedSubject={selectedSubject}
            selectedTerm={terms.find(t => t.id === selectedTerm)?.name}
            currentSession={currentSession}
            onSubmit={handleGradeSubmit}
            loading={loading}
          />
        )}

        {/* No Students */}
        {selectedClass && selectedSubject && selectedTerm && !loading && students.length === 0 && (
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
            View Grade History
          </Button>
          <Button variant="accent">
            Generate Report Cards
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GradeEntry;
import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const GradeForm = ({ 
  students = [], 
  subject = '', 
  term = '', 
  session = '', 
  onSubmit, 
  loading = false 
}) => {
  const [grades, setGrades] = useState({});
  const [assessmentType, setAssessmentType] = useState('CA'); // CA, Exam, Total

  // Nigerian grading system
  const gradeRanges = [
    { min: 70, max: 100, grade: 'A', color: 'secondary', label: 'Excellent' },
    { min: 60, max: 69, grade: 'B', color: 'primary', label: 'Very Good' },
    { min: 50, max: 59, grade: 'C', color: 'accent', label: 'Good' },
    { min: 45, max: 49, grade: 'D', color: 'accent', label: 'Pass' },
    { min: 40, max: 44, grade: 'E', color: 'red', label: 'Poor' },
    { min: 0, max: 39, grade: 'F', color: 'red', label: 'Fail' }
  ];

  // Calculate grade from score
  const calculateGrade = (score) => {
    if (!score || isNaN(score)) return null;
    const numScore = parseFloat(score);
    return gradeRanges.find(range => numScore >= range.min && numScore <= range.max);
  };

  // Handle score input
  const handleScoreChange = (studentId, score) => {
    const numScore = parseFloat(score) || 0;
    
    // Validate score range
    if (numScore < 0 || numScore > 100) return;

    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        score: numScore,
        grade: calculateGrade(numScore)
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const gradeData = {
      subject,
      term,
      session,
      assessmentType,
      records: Object.entries(grades).map(([studentId, data]) => ({
        studentId: parseInt(studentId),
        score: data.score,
        grade: data.grade?.grade,
        enteredAt: new Date().toISOString()
      }))
    };

    onSubmit(gradeData);
  };

  // Get grade color classes
  const getGradeColor = (gradeInfo) => {
    if (!gradeInfo) return 'text-neutral-400';
    
    switch (gradeInfo.color) {
      case 'secondary':
        return 'text-secondary-600 bg-secondary-100';
      case 'primary':
        return 'text-primary-600 bg-primary-100';
      case 'accent':
        return 'text-accent-600 bg-accent-100';
      case 'red':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <Card.Header>
        <Card.Title className="text-primary-800">Enter Grades</Card.Title>
        <div className="mt-2 text-sm text-neutral-600">
          {subject} • {term} Term • {session} Session
        </div>
      </Card.Header>

      <form onSubmit={handleSubmit}>
        <Card.Content>
          {/* Assessment Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Assessment Type
            </label>
            <div className="flex space-x-4">
              {['CA', 'Exam', 'Total'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAssessmentType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    assessmentType === type
                      ? 'bg-primary-100 text-primary-800 border border-primary-200'
                      : 'bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {type === 'CA' ? 'Continuous Assessment' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Grading Scale Reference */}
          <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
            <h4 className="font-medium text-neutral-800 mb-3">Grading Scale</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {gradeRanges.map((range, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded font-medium ${getGradeColor(range)}`}>
                    {range.grade}
                  </span>
                  <span className="text-neutral-600">
                    {range.min}-{range.max}% ({range.label})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Students Grade Entry */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary-800 mb-4">
              Students ({students.length})
            </h3>

            {students.map((student) => {
              const gradeInfo = grades[student.id]?.grade;
              return (
                <div key={student.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
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

                  <div className="flex items-center space-x-4">
                    {/* Score Input */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Score"
                        value={grades[student.id]?.score || ''}
                        onChange={(e) => handleScoreChange(student.id, e.target.value)}
                        className="w-20 px-3 py-2 border border-neutral-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <span className="text-neutral-600">%</span>
                    </div>

                    {/* Grade Display */}
                    <div className="w-16 text-center">
                      {gradeInfo ? (
                        <span className={`px-3 py-1 rounded-lg font-bold ${getGradeColor(gradeInfo)}`}>
                          {gradeInfo.grade}
                        </span>
                      ) : (
                        <span className="text-neutral-400 text-sm">-</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grade Summary */}
          {Object.keys(grades).length > 0 && (
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
              <h4 className="font-medium text-neutral-800 mb-3">Grade Distribution</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                {gradeRanges.map((range) => {
                  const count = Object.values(grades).filter(
                    g => g.grade?.grade === range.grade
                  ).length;
                  
                  return (
                    <div key={range.grade} className="text-center">
                      <div className={`text-lg font-bold ${getGradeColor(range).replace('bg-', 'text-').replace('-100', '-600')}`}>
                        {count}
                      </div>
                      <div className="text-neutral-600">Grade {range.grade}</div>
                    </div>
                  );
                })}
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
            disabled={Object.keys(grades).length === 0 || loading}
          >
            {loading ? 'Saving...' : 'Save Grades'}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
};

export default GradeForm;
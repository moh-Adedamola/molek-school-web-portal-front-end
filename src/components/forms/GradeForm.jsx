// File location: src/components/forms/GradeForm.jsx
import React, { useState, useEffect } from 'react';
import { BookOpen, Calculator, Save, X, AlertCircle, Users } from 'lucide-react';

const GradeForm = ({ 
  students = [], 
  onSubmit, 
  onCancel, 
  initialData = {},
  className = '',
  subject = '',
  classInfo = '' 
}) => {
  const [formData, setFormData] = useState({
    subject: initialData.subject || subject,
    class: initialData.class || classInfo,
    term: initialData.term || 'first',
    assessment_type: initialData.assessment_type || '',
    date: initialData.date || new Date().toISOString().split('T')[0],
    grades: initialData.grades || {}
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const assessmentTypes = [
    { value: 'test1', label: '1st Test', maxScore: 10 },
    { value: 'test2', label: '2nd Test', maxScore: 10 },
    { value: 'assignment', label: 'Assignment', maxScore: 10 },
    { value: 'project', label: 'Project', maxScore: 20 },
    { value: 'exam', label: 'Examination', maxScore: 70 }
  ];

  const nigerianGradeScale = [
    { min: 80, max: 100, grade: 'A', description: 'Excellent', class: 'grade-excellent' },
    { min: 70, max: 79, grade: 'B', description: 'Very Good', class: 'grade-good' },
    { min: 60, max: 69, grade: 'C', description: 'Good', class: 'grade-good' },
    { min: 50, max: 59, grade: 'D', description: 'Pass', class: 'grade-average' },
    { min: 40, max: 49, grade: 'E', description: 'Poor', class: 'grade-average' },
    { min: 0, max: 39, grade: 'F', description: 'Fail', class: 'grade-poor' }
  ];

  // Initialize grades for all students
  useEffect(() => {
    if (students.length > 0 && Object.keys(formData.grades).length === 0) {
      const initialGrades = {};
      students.forEach(student => {
        initialGrades[student.id] = initialData.grades?.[student.id] || '';
      });
      setFormData(prev => ({ ...prev, grades: initialGrades }));
    }
  }, [students, initialData.grades]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear related errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleGradeChange = (studentId, score) => {
    const maxScore = getMaxScore();
    
    // Validate score
    if (score === '' || (score >= 0 && score <= maxScore && !isNaN(score))) {
      setFormData(prev => ({
        ...prev,
        grades: { ...prev.grades, [studentId]: score }
      }));
      
      // Clear error for this student
      if (errors[`grade_${studentId}`]) {
        setErrors(prev => ({ ...prev, [`grade_${studentId}`]: null }));
      }
    }
  };

  const getMaxScore = () => {
    const assessmentType = assessmentTypes.find(type => type.value === formData.assessment_type);
    return assessmentType ? assessmentType.maxScore : 100;
  };

  const getNigerianGrade = (score) => {
    if (score === '' || isNaN(score)) return null;
    const numScore = Number(score);
    const percentage = (numScore / getMaxScore()) * 100;
    return nigerianGradeScale.find(grade => percentage >= grade.min && percentage <= grade.max);
  };

  const calculateStats = () => {
    const validGrades = Object.values(formData.grades).filter(g => g !== '' && !isNaN(g));
    if (validGrades.length === 0) return { average: 0, highest: 0, lowest: 0, count: 0 };
    
    const numbers = validGrades.map(Number);
    return {
      average: (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1),
      highest: Math.max(...numbers),
      lowest: Math.min(...numbers),
      count: numbers.length
    };
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.class.trim()) newErrors.class = 'Class is required';
    if (!formData.assessment_type) newErrors.assessment_type = 'Assessment type is required';
    if (!formData.date) newErrors.date = 'Date is required';

    // Validate grades
    const maxScore = getMaxScore();
    Object.entries(formData.grades).forEach(([studentId, grade]) => {
      if (grade !== '' && (isNaN(grade) || grade < 0 || grade > maxScore)) {
        newErrors[`grade_${studentId}`] = `Score must be between 0 and ${maxScore}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting grades:', error);
      alert('Error saving grades. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = calculateStats();

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Form Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h3 className="text-lg font-semibold text-neutral-800">Grade Entry</h3>
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
            {isSubmitting ? 'Saving...' : 'Save Grades'}
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <BookOpen className="inline h-4 w-4 mr-1" />
            Subject *
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className={`input-base w-full ${errors.subject ? 'input-error' : ''}`}
            placeholder="Enter subject name"
          />
          {errors.subject && <p className="text-red-600 text-xs mt-1">{errors.subject}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <Users className="inline h-4 w-4 mr-1" />
            Class *
          </label>
          <input
            type="text"
            value={formData.class}
            onChange={(e) => handleInputChange('class', e.target.value)}
            className={`input-base w-full ${errors.class ? 'input-error' : ''}`}
            placeholder="e.g., JSS 1A"
          />
          {errors.class && <p className="text-red-600 text-xs mt-1">{errors.class}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Term *
          </label>
          <select
            value={formData.term}
            onChange={(e) => handleInputChange('term', e.target.value)}
            className="input-base w-full"
          >
            <option value="first">First Term</option>
            <option value="second">Second Term</option>
            <option value="third">Third Term</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Assessment *
          </label>
          <select
            value={formData.assessment_type}
            onChange={(e) => handleInputChange('assessment_type', e.target.value)}
            className={`input-base w-full ${errors.assessment_type ? 'input-error' : ''}`}
          >
            <option value="">Select Assessment</option>
            {assessmentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label} ({type.maxScore} marks)
              </option>
            ))}
          </select>
          {errors.assessment_type && <p className="text-red-600 text-xs mt-1">{errors.assessment_type}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={`input-base w-full ${errors.date ? 'input-error' : ''}`}
          />
          {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
        </div>
      </div>

      {/* Assessment Info */}
      {formData.assessment_type && (
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-accent-800">
              {assessmentTypes.find(t => t.value === formData.assessment_type)?.label} - Maximum Score: {getMaxScore()} marks
            </p>
            <p className="text-xs text-accent-700 mt-1">
              Enter scores between 0 and {getMaxScore()}. Leave blank if student was absent.
            </p>
          </div>
        </div>
      )}

      {/* Statistics */}
      {formData.assessment_type && students.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-neutral-100 rounded-lg">
            <p className="text-xl font-bold text-neutral-800">{stats.count}/{students.length}</p>
            <p className="text-sm text-neutral-600">Graded</p>
          </div>
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <p className="text-xl font-bold text-primary-600">{stats.average}</p>
            <p className="text-sm text-neutral-600">Average</p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-xl font-bold text-secondary-600">{stats.highest}</p>
            <p className="text-sm text-neutral-600">Highest</p>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <p className="text-xl font-bold text-accent-600">{stats.lowest}</p>
            <p className="text-sm text-neutral-600">Lowest</p>
          </div>
        </div>
      )}

      {/* Students Grade Entry */}
      {students.length > 0 && formData.assessment_type ? (
        <div className="space-y-3">
          <h4 className="font-medium text-neutral-800 flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Student Grades ({students.length})
          </h4>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {students.map(student => {
              const grade = formData.grades[student.id];
              const nigerianGrade = getNigerianGrade(grade);
              const hasError = errors[`grade_${student.id}`];
              
              return (
                <div 
                  key={student.id} 
                  className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg gap-3 ${
                    hasError ? 'bg-red-50 border border-red-200' : 'bg-neutral-50'
                  }`}
                >
                  <div className="flex-1">
                    <h5 className="font-medium text-neutral-800">{student.name}</h5>
                    <p className="text-sm text-neutral-600">
                      {student.admissionNumber} {student.class && `• ${student.class}`}
                    </p>
                    {hasError && (
                      <p className="text-red-600 text-xs mt-1">{hasError}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max={getMaxScore()}
                        step="0.5"
                        value={grade}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        className={`input-base w-20 text-center ${hasError ? 'input-error' : ''}`}
                        placeholder="0"
                      />
                      <span className="text-sm text-neutral-600">/ {getMaxScore()}</span>
                    </div>
                    
                    {nigerianGrade && (
                      <div className="flex items-center gap-2">
                        <span className={`${nigerianGrade.class} px-2 py-1 rounded-full text-xs font-medium text-white`}>
                          {nigerianGrade.grade}
                        </span>
                        <span className="text-xs text-neutral-500 mobile-hidden">
                          {nigerianGrade.description}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-neutral-50 rounded-lg">
          <Calculator className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
          <p className="text-neutral-600">
            {students.length === 0 ? 'No students available' : 'Select assessment type to begin grading'}
          </p>
          <p className="text-sm text-neutral-500">
            {students.length === 0 
              ? 'Students will appear here when a class is selected'
              : 'Choose an assessment type from the dropdown above'
            }
          </p>
        </div>
      )}

      {/* Nigerian Grading Scale Reference */}
      {formData.assessment_type && (
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h5 className="font-medium text-neutral-800 mb-3">Nigerian Grading Scale</h5>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
            {nigerianGradeScale.map(gradeInfo => (
              <div key={gradeInfo.grade} className="text-center">
                <div className={`${gradeInfo.class} px-2 py-1 rounded text-white font-medium mb-1`}>
                  {gradeInfo.grade}
                </div>
                <p className="text-xs text-neutral-600">{gradeInfo.min}-{gradeInfo.max}%</p>
                <p className="text-xs text-neutral-500">{gradeInfo.description}</p>
              </div>
            ))}
          </div>
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
          disabled={isSubmitting || students.length === 0 || !formData.assessment_type}
          className="btn-primary px-6 py-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving Grades...' : 'Save Grades'}
        </button>
      </div>
    </form>
  );
};

export default GradeForm;
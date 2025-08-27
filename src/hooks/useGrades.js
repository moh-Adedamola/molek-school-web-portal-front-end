// src/hooks/useGrades.js
import { useState, useEffect, useCallback } from 'react';
import { mockGrades } from '../data/mockGrades';

const useGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setGrades(mockGrades);
  }, []);

  const getGradesByStudent = useCallback((studentId, filters = {}) => {
    let studentGrades = grades.filter(grade => grade.studentId === studentId);
    
    if (filters.subjectId) {
      studentGrades = studentGrades.filter(grade => grade.subjectId === filters.subjectId);
    }
    if (filters.term) {
      studentGrades = studentGrades.filter(grade => grade.term === filters.term);
    }
    if (filters.year) {
      studentGrades = studentGrades.filter(grade => grade.academicYear === filters.year);
    }
    
    return studentGrades;
  }, [grades]);

  const getGradesByClass = useCallback((classId, subjectId, term) => {
    return grades.filter(grade => 
      grade.classId === classId && 
      grade.subjectId === subjectId && 
      grade.term === term
    );
  }, [grades]);

  const addGrade = useCallback(async (gradeData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const newGrade = {
        id: Date.now().toString(),
        ...gradeData,
        createdAt: new Date().toISOString()
      };
      
      setGrades(prev => [...prev, newGrade]);
      return newGrade;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateGrade = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      setGrades(prev => 
        prev.map(grade => 
          grade.id === id 
            ? { ...grade, ...updates, updatedAt: new Date().toISOString() }
            : grade
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkAddGrades = useCallback(async (gradesData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newGrades = gradesData.map(grade => ({
        id: `${Date.now()}-${Math.random()}`,
        ...grade,
        createdAt: new Date().toISOString()
      }));
      
      setGrades(prev => [...prev, ...newGrades]);
      return newGrades;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateGPA = useCallback((studentId, term, year) => {
    const studentGrades = getGradesByStudent(studentId, { term, year });
    
    if (studentGrades.length === 0) return 0;
    
    const totalScore = studentGrades.reduce((sum, grade) => sum + grade.score, 0);
    const gpa = totalScore / studentGrades.length;
    
    return Math.round(gpa * 100) / 100; // Round to 2 decimal places
  }, [getGradesByStudent]);

  const getGradeDistribution = useCallback((classId, subjectId, term) => {
    const classGrades = getGradesByClass(classId, subjectId, term);
    
    const distribution = {
      A: 0, B: 0, C: 0, D: 0, F: 0
    };
    
    classGrades.forEach(grade => {
      if (grade.score >= 90) distribution.A++;
      else if (grade.score >= 80) distribution.B++;
      else if (grade.score >= 70) distribution.C++;
      else if (grade.score >= 60) distribution.D++;
      else distribution.F++;
    });
    
    return distribution;
  }, [getGradesByClass]);

  const getStudentRanking = useCallback((studentId, classId, term, year) => {
    const classStudents = [...new Set(grades
      .filter(g => g.classId === classId && g.term === term && g.academicYear === year)
      .map(g => g.studentId))];
    
    const studentGPAs = classStudents.map(sId => ({
      studentId: sId,
      gpa: calculateGPA(sId, term, year)
    })).sort((a, b) => b.gpa - a.gpa);
    
    const rank = studentGPAs.findIndex(s => s.studentId === studentId) + 1;
    const total = studentGPAs.length;
    
    return { rank, total };
  }, [grades, calculateGPA]);

  return {
    grades,
    loading,
    error,
    getGradesByStudent,
    getGradesByClass,
    addGrade,
    updateGrade,
    bulkAddGrades,
    calculateGPA,
    getGradeDistribution,
    getStudentRanking
  };
};

export default useGrades;
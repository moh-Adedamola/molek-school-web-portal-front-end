// src/hooks/useStudents.js
import { useState, useEffect, useCallback } from 'react';
import { mockStudents } from '../data/mockStudents';
import { mockClasses } from '../data/mockClasses';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load students data
  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  const getStudentById = useCallback((id) => {
    return students.find(student => student.id === id);
  }, [students]);

  const getStudentsByClass = useCallback((classId) => {
    return students.filter(student => student.classId === classId);
  }, [students]);

  const getStudentsByParent = useCallback((parentId) => {
    return students.filter(student => student.parentId === parentId);
  }, [students]);

  const addStudent = useCallback(async (studentData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newStudent = {
        id: Date.now().toString(),
        ...studentData,
        createdAt: new Date().toISOString()
      };
      
      setStudents(prev => [...prev, newStudent]);
      return newStudent;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStudent = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStudents(prev => 
        prev.map(student => 
          student.id === id 
            ? { ...student, ...updates, updatedAt: new Date().toISOString() }
            : student
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteStudent = useCallback(async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStudents(prev => prev.filter(student => student.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchStudents = useCallback((query) => {
    if (!query.trim()) return students;
    
    const searchLower = query.toLowerCase();
    return students.filter(student => 
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.studentId.toLowerCase().includes(searchLower)
    );
  }, [students]);

  return {
    students,
    loading,
    error,
    getStudentById,
    getStudentsByClass,
    getStudentsByParent,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents
  };
};

export default useStudents;
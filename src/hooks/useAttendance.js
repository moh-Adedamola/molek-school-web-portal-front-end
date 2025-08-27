// src/hooks/useAttendance.js
import { useState, useEffect, useCallback } from 'react';
import { mockAttendance } from '../data/mockAttendance';

const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAttendance(mockAttendance);
  }, []);

  const getAttendanceByStudent = useCallback((studentId, dateRange = {}) => {
    let records = attendance.filter(record => record.studentId === studentId);
    
    if (dateRange.start) {
      records = records.filter(record => new Date(record.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      records = records.filter(record => new Date(record.date) <= new Date(dateRange.end));
    }
    
    return records;
  }, [attendance]);

  const getAttendanceByClass = useCallback((classId, date) => {
    return attendance.filter(record => 
      record.classId === classId && record.date === date
    );
  }, [attendance]);

  const markAttendance = useCallback(async (attendanceData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newRecord = {
        id: Date.now().toString(),
        ...attendanceData,
        markedAt: new Date().toISOString()
      };
      
      setAttendance(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkMarkAttendance = useCallback(async (attendanceRecords) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newRecords = attendanceRecords.map(record => ({
        id: `${Date.now()}-${Math.random()}`,
        ...record,
        markedAt: new Date().toISOString()
      }));
      
      setAttendance(prev => [...prev, ...newRecords]);
      return newRecords;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceStats = useCallback((studentId, dateRange = {}) => {
    const records = getAttendanceByStudent(studentId, dateRange);
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === 'present').length;
    const absentDays = records.filter(r => r.status === 'absent').length;
    const lateDays = records.filter(r => r.status === 'late').length;
    
    return {
      totalDays,
      presentDays,
      absentDays,
      lateDays,
      attendanceRate: totalDays > 0 ? (presentDays / totalDays * 100).toFixed(1) : 0
    };
  }, [getAttendanceByStudent]);

  const updateAttendance = useCallback(async (id, updates) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setAttendance(prev => 
        prev.map(record => 
          record.id === id 
            ? { ...record, ...updates, updatedAt: new Date().toISOString() }
            : record
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    attendance,
    loading,
    error,
    getAttendanceByStudent,
    getAttendanceByClass,
    markAttendance,
    bulkMarkAttendance,
    getAttendanceStats,
    updateAttendance
  };
};

export default useAttendance;
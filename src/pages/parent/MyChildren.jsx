// File: src/pages/parent/MyChildren.jsx
import React, { useState, useEffect } from 'react';
import { User, Calendar, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';

const MyChildren = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  useEffect(() => {
    const mockChildren = [
      {
        id: 1,
        name: 'Adunni Olatunji',
        class: 'JSS 2A',
        rollNumber: 'JSS2A/001',
        profilePhoto: '/images/student-placeholder.jpg',
        attendance: { present: 85, total: 100 },
        averageGrade: 78,
        term: 'Second Term 2024/2025',
        subjects: 12,
        alerts: 2
      },
      {
        id: 2,
        name: 'Kunle Olatunji',
        class: 'SSS 1B',
        rollNumber: 'SSS1B/015',
        profilePhoto: '/images/student-placeholder.jpg',
        attendance: { present: 92, total: 100 },
        averageGrade: 85,
        term: 'Second Term 2024/2025',
        subjects: 14,
        alerts: 0
      }
    ];

    setTimeout(() => {
      setChildren(mockChildren);
      setLoading(false);
    }, 1000);
  }, []);

  const getAttendanceStatus = (attendance) => {
    const percentage = (attendance.present / attendance.total) * 100;
    if (percentage >= 90) return 'status-present';
    if (percentage >= 75) return 'grade-good';
    return 'status-absent';
  };

  const getGradeStatus = (grade) => {
    if (grade >= 80) return 'grade-excellent';
    if (grade >= 70) return 'grade-good';
    if (grade >= 60) return 'grade-average';
    return 'grade-poor';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 p-4">
        <div className="container-max">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">My Children</h1>
          <p className="text-neutral-600">Overview of your children's academic progress</p>
        </div>

        {/* Children Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {children.map((child) => (
            <div key={child.id} className="card-base">
              {/* Child Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-1">
                    {child.name}
                  </h3>
                  <p className="text-neutral-600 mb-1">{child.class}</p>
                  <p className="text-sm text-neutral-500">Roll No: {child.rollNumber}</p>
                  {child.alerts > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span className="text-sm text-warning font-medium">
                        {child.alerts} Alert{child.alerts > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Attendance */}
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-700">Attendance</span>
                  </div>
                  <div className="text-2xl font-bold text-neutral-800 mb-1">
                    {((child.attendance.present / child.attendance.total) * 100).toFixed(0)}%
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ${getAttendanceStatus(child.attendance)}`}>
                    {child.attendance.present}/{child.attendance.total} days
                  </div>
                </div>

                {/* Average Grade */}
                <div className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-secondary-600" />
                    <span className="text-sm font-medium text-neutral-700">Average</span>
                  </div>
                  <div className="text-2xl font-bold text-neutral-800 mb-1">
                    {child.averageGrade}%
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full inline-block ${getGradeStatus(child.averageGrade)}`}>
                    {child.subjects} subjects
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline px-4 py-2 text-sm rounded-lg">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Progress
                </button>
                <button className="btn-primary px-4 py-2 text-sm rounded-lg">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Academic Report
                </button>
              </div>

              {/* Term Info */}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <p className="text-xs text-neutral-500 text-center">
                  Current Term: {child.term}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn-secondary p-4 rounded-lg text-left">
              <Calendar className="w-5 h-5 mb-2" />
              <div className="font-medium">Check Attendance</div>
              <div className="text-sm opacity-80">View daily attendance records</div>
            </button>
            <button className="btn-accent p-4 rounded-lg text-left">
              <BookOpen className="w-5 h-5 mb-2" />
              <div className="font-medium">Academic Reports</div>
              <div className="text-sm opacity-80">Download term reports</div>
            </button>
            <button className="btn-outline p-4 rounded-lg text-left">
              <TrendingUp className="w-5 h-5 mb-2" />
              <div className="font-medium">Progress Analytics</div>
              <div className="text-sm opacity-80">View detailed progress</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChildren;
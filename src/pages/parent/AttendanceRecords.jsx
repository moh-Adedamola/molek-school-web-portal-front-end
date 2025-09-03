// File: src/pages/parent/AttendanceRecords.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Filter, Download, ChevronDown } from 'lucide-react';

const AttendanceRecords = () => {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('current');
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const children = [
    { id: 1, name: 'Adunni Olatunji', class: 'JSS 2A' },
    { id: 2, name: 'Kunle Olatunji', class: 'SSS 1B' }
  ];

  const months = [
    { value: 'current', label: 'Current Month - February 2025' },
    { value: 'january', label: 'January 2025' },
    { value: 'december', label: 'December 2024' },
    { value: 'november', label: 'November 2024' }
  ];

  // Mock attendance data
  useEffect(() => {
    const mockAttendance = [
      {
        date: '2025-02-01',
        childName: 'Adunni Olatunji',
        childId: 1,
        status: 'Present',
        timeIn: '07:45 AM',
        timeOut: '02:30 PM',
        day: 'Monday'
      },
      {
        date: '2025-02-02',
        childName: 'Adunni Olatunji',
        childId: 1,
        status: 'Late',
        timeIn: '08:15 AM',
        timeOut: '02:30 PM',
        day: 'Tuesday'
      },
      {
        date: '2025-02-03',
        childName: 'Adunni Olatunji',
        childId: 1,
        status: 'Absent',
        timeIn: '-',
        timeOut: '-',
        day: 'Wednesday'
      },
      {
        date: '2025-02-01',
        childName: 'Kunle Olatunji',
        childId: 2,
        status: 'Present',
        timeIn: '07:30 AM',
        timeOut: '03:00 PM',
        day: 'Monday'
      },
      {
        date: '2025-02-02',
        childName: 'Kunle Olatunji',
        childId: 2,
        status: 'Present',
        timeIn: '07:35 AM',
        timeOut: '03:00 PM',
        day: 'Tuesday'
      }
    ];

    const mockSummary = {
      totalDays: 20,
      presentDays: 17,
      absentDays: 2,
      lateDays: 1,
      attendanceRate: 85
    };

    setTimeout(() => {
      setAttendanceData(mockAttendance);
      setSummary(mockSummary);
      setLoading(false);
    }, 1000);
  }, [selectedChild, selectedMonth]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return 'status-present';
      case 'Absent':
        return 'status-absent';
      case 'Late':
        return 'status-late';
      default:
        return 'badge-info';
    }
  };

  const filteredAttendance = attendanceData.filter(record => {
    if (selectedChild === 'all') return true;
    return record.childId === parseInt(selectedChild);
  });

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
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Attendance Records</h1>
          <p className="text-neutral-600">Track your children's daily attendance</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Child Filter */}
              <div className="relative">
                <select
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                  className="input-base pr-10 appearance-none bg-white"
                >
                  <option value="all">All Children</option>
                  {children.map(child => (
                    <option key={child.id} value={child.id}>
                      {child.name} ({child.class})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>

              {/* Month Filter */}
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="input-base pr-10 appearance-none bg-white"
                >
                  {months.map(month => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            <button className="btn-outline px-4 py-2 rounded-lg">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">Total Days</span>
            </div>
            <div className="text-2xl font-bold text-neutral-800">{summary.totalDays}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-neutral-700">Present</span>
            </div>
            <div className="text-2xl font-bold text-success">{summary.presentDays}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-neutral-700">Late</span>
            </div>
            <div className="text-2xl font-bold text-warning">{summary.lateDays}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-error" />
              <span className="text-sm font-medium text-neutral-700">Absent</span>
            </div>
            <div className="text-2xl font-bold text-error">{summary.absentDays}</div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800">Daily Attendance Records</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="table-header">
                <tr>
                  <th className="text-left py-3 px-6 font-medium">Date</th>
                  <th className="text-left py-3 px-6 font-medium">Day</th>
                  <th className="text-left py-3 px-6 font-medium">Child</th>
                  <th className="text-left py-3 px-6 font-medium">Status</th>
                  <th className="text-left py-3 px-6 font-medium">Time In</th>
                  <th className="text-left py-3 px-6 font-medium">Time Out</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.map((record, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    <td className="py-3 px-6">
                      {new Date(record.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-6 text-neutral-600">{record.day}</td>
                    <td className="py-3 px-6 font-medium">{record.childName}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-neutral-600">{record.timeIn}</td>
                    <td className="py-3 px-6 text-neutral-600">{record.timeOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAttendance.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600">No attendance records found for the selected period.</p>
            </div>
          )}
        </div>

        {/* Attendance Rate */}
        <div className="mt-6 bg-white rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-800">Overall Attendance Rate</h3>
            <span className="text-2xl font-bold text-primary-600">{summary.attendanceRate}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${summary.attendanceRate}%` }}
            ></div>
          </div>
          <p className="text-sm text-neutral-600 mt-2">
            Based on {summary.presentDays} present days out of {summary.totalDays} school days
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecords;
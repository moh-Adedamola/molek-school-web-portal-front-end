// File: src/pages/admin/AttendanceReports.jsx
import React, { useState } from 'react';
import { Calendar, Download, Filter, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AttendanceReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisWeek');
  const [selectedClass, setSelectedClass] = useState('all');

  const weeklyData = [
    { day: 'Mon', present: 298, absent: 22, late: 8 },
    { day: 'Tue', present: 305, absent: 15, late: 10 },
    { day: 'Wed', present: 290, absent: 30, late: 5 },
    { day: 'Thu', present: 312, absent: 8, late: 12 },
    { day: 'Fri', present: 285, absent: 35, late: 15 }
  ];

  const monthlyTrend = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 89 },
    { month: 'Mar', rate: 94 },
    { month: 'Apr', rate: 91 },
    { month: 'May', rate: 88 }
  ];

  const classData = [
    { class: 'JSS 1A', present: 32, absent: 3, rate: 91 },
    { class: 'JSS 1B', present: 28, absent: 4, rate: 88 },
    { class: 'JSS 2A', present: 35, absent: 3, rate: 92 },
    { class: 'JSS 2B', present: 27, absent: 3, rate: 90 },
    { class: 'SSS 1A', present: 26, absent: 2, rate: 93 },
    { class: 'SSS 1B', present: 23, absent: 2, rate: 92 }
  ];

  const getAttendanceStatus = (rate) => {
    if (rate >= 95) return 'text-green-600 bg-green-50';
    if (rate >= 85) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Attendance Reports</h1>
          <p className="text-neutral-600 mt-1">School-wide attendance analytics and insights</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-outline flex items-center gap-2 px-4 py-2">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn-secondary flex items-center gap-2 px-4 py-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">91%</div>
          <div className="text-sm text-neutral-600">Overall Attendance</div>
        </div>
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">298</div>
          <div className="text-sm text-neutral-600">Present Today</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">22</div>
          <div className="text-sm text-neutral-600">Absent Today</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">8</div>
          <div className="text-sm text-neutral-600">Late Today</div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['thisWeek', 'thisMonth', 'thisTerm'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedPeriod === period ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            {period === 'thisWeek' && 'This Week'}
            {period === 'thisMonth' && 'This Month'} 
            {period === 'thisTerm' && 'This Term'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Attendance Chart */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Daily Attendance This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="present" fill="#059669" name="Present" />
              <Bar dataKey="absent" fill="#dc2626" name="Absent" />
              <Bar dataKey="late" fill="#d97706" name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trend */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Attendance Trend (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class-wise Attendance */}
      <div className="card-base">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-lg font-semibold text-neutral-800">Class-wise Attendance Today</h3>
          <select 
            className="input-base"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">All Classes</option>
            <option value="JSS">JSS Only</option>
            <option value="SSS">SSS Only</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Class</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Present</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Absent</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Attendance Rate</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((cls, index) => (
                <tr key={cls.class} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                  <td className="px-4 py-3 font-medium text-neutral-900">{cls.class}</td>
                  <td className="px-4 py-3 text-center text-secondary-600 font-medium">{cls.present}</td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">{cls.absent}</td>
                  <td className="px-4 py-3 text-center font-medium">{cls.rate}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getAttendanceStatus(cls.rate)}`}>
                      {cls.rate >= 95 ? 'Excellent' : cls.rate >= 85 ? 'Good' : 'Needs Attention'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
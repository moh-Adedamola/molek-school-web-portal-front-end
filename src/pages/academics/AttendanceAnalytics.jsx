import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AttendanceAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedClass, setSelectedClass] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Color scheme for charts
  const colors = {
    present: '#059669',    // secondary-600 (green)
    late: '#d97706',       // accent-600 (orange/gold)
    absent: '#dc2626',     // red-600
    primary: '#2563eb'     // primary-600 (blue)
  };

  const classes = [
    { id: 'all', name: 'All Classes' },
    { id: 'jss1', name: 'JSS 1' },
    { id: 'jss2', name: 'JSS 2' },
    { id: 'jss3', name: 'JSS 3' },
    { id: 'sss1', name: 'SSS 1' },
    { id: 'sss2', name: 'SSS 2' },
    { id: 'sss3', name: 'SSS 3' }
  ];

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'term', name: 'This Term' }
  ];

  // Mock analytics data
  const mockData = {
    overview: {
      totalStudents: 156,
      presentToday: 142,
      lateToday: 8,
      absentToday: 6,
      attendanceRate: 91.0
    },
    weeklyTrend: [
      { day: 'Mon', present: 145, late: 6, absent: 5, total: 156 },
      { day: 'Tue', present: 148, late: 4, absent: 4, total: 156 },
      { day: 'Wed', present: 142, late: 8, absent: 6, total: 156 },
      { day: 'Thu', present: 150, late: 3, absent: 3, total: 156 },
      { day: 'Fri', present: 138, late: 12, absent: 6, total: 156 }
    ],
    classBreakdown: [
      { class: 'JSS 1', present: 24, late: 2, absent: 1, total: 27 },
      { class: 'JSS 2', present: 22, late: 1, absent: 2, total: 25 },
      { class: 'JSS 3', present: 23, late: 1, absent: 1, total: 25 },
      { class: 'SSS 1', present: 25, late: 2, absent: 1, total: 28 },
      { class: 'SSS 2', present: 24, late: 1, absent: 1, total: 26 },
      { class: 'SSS 3', present: 24, late: 1, absent: 0, total: 25 }
    ],
    pieData: [
      { name: 'Present', value: 142, color: colors.present },
      { name: 'Late', value: 8, color: colors.late },
      { name: 'Absent', value: 6, color: colors.absent }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod, selectedClass]);

  // Calculate attendance rate
  const calculateRate = (present, total) => {
    return total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  };

  // Get status color for rate
  const getRateColor = (rate) => {
    if (rate >= 95) return 'text-secondary-600';
    if (rate >= 85) return 'text-primary-600';
    if (rate >= 75) return 'text-accent-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
        <div className="container-max section-padding">
          <Card className="text-center py-12">
            <Card.Content>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading attendance analytics...</p>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-100">
      <div className="container-max section-padding">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-2">
            Attendance Analytics
          </h1>
          <p className="text-neutral-600">
            Track attendance patterns and trends across classes
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <Card.Content>
            <div className="flex flex-wrap gap-4">
              {/* Period Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Time Period
                </label>
                <div className="flex space-x-2">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedPeriod === period.id
                          ? 'bg-primary-100 text-primary-800 border border-primary-300'
                          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {period.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Class Filter
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {analyticsData.overview.totalStudents}
              </div>
              <div className="text-sm text-neutral-600">Total Students</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-secondary-600 mb-1">
                {analyticsData.overview.presentToday}
              </div>
              <div className="text-sm text-neutral-600">Present Today</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-accent-600 mb-1">
                {analyticsData.overview.lateToday}
              </div>
              <div className="text-sm text-neutral-600">Late Today</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {analyticsData.overview.absentToday}
              </div>
              <div className="text-sm text-neutral-600">Absent Today</div>
            </Card.Content>
          </Card>

          <Card className="text-center">
            <Card.Content>
              <div className={`text-2xl font-bold mb-1 ${getRateColor(analyticsData.overview.attendanceRate)}`}>
                {analyticsData.overview.attendanceRate}%
              </div>
              <div className="text-sm text-neutral-600">Attendance Rate</div>
            </Card.Content>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Trend Chart */}
          <Card>
            <Card.Header>
              <Card.Title className="text-primary-800">Weekly Attendance Trend</Card.Title>
            </Card.Header>
            <Card.Content>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="present" stroke={colors.present} strokeWidth={3} name="Present" />
                  <Line type="monotone" dataKey="late" stroke={colors.late} strokeWidth={2} name="Late" />
                  <Line type="monotone" dataKey="absent" stroke={colors.absent} strokeWidth={2} name="Absent" />
                </LineChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>

          {/* Today's Distribution */}
          <Card>
            <Card.Header>
              <Card.Title className="text-primary-800">Today's Attendance Distribution</Card.Title>
            </Card.Header>
            <Card.Content>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {analyticsData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Content>
          </Card>
        </div>

        {/* Class Breakdown */}
        <Card className="mb-8">
          <Card.Header>
            <Card.Title className="text-primary-800">Attendance by Class</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={analyticsData.classBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill={colors.present} name="Present" />
                <Bar dataKey="late" fill={colors.late} name="Late" />
                <Bar dataKey="absent" fill={colors.absent} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Class Performance Table */}
        <Card>
          <Card.Header>
            <Card.Title className="text-primary-800">Class Performance Summary</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary-50 border-b border-primary-200">
                    <th className="text-left p-3 font-semibold text-primary-800">Class</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Total</th>
                    <th className="text-center p-3 font-semibold text-secondary-800">Present</th>
                    <th className="text-center p-3 font-semibold text-accent-800">Late</th>
                    <th className="text-center p-3 font-semibold text-red-800">Absent</th>
                    <th className="text-center p-3 font-semibold text-primary-800">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.classBreakdown.map((cls, index) => (
                    <tr key={cls.class} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                      <td className="p-3 font-medium">{cls.class}</td>
                      <td className="p-3 text-center">{cls.total}</td>
                      <td className="p-3 text-center text-secondary-600 font-semibold">{cls.present}</td>
                      <td className="p-3 text-center text-accent-600 font-semibold">{cls.late}</td>
                      <td className="p-3 text-center text-red-600 font-semibold">{cls.absent}</td>
                      <td className={`p-3 text-center font-semibold ${getRateColor(calculateRate(cls.present, cls.total))}`}>
                        {calculateRate(cls.present, cls.total)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="primary">
            Generate Report
          </Button>
          <Button variant="secondary">
            Export Data
          </Button>
          <Button variant="accent">
            Send Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;
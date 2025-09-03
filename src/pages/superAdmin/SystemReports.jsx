// File: pages/super-admin/SystemReports.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Users, GraduationCap, DollarSign, Activity } from 'lucide-react';

const SystemReports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');

  // Mock data for different reports
  const overviewStats = [
    { title: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Active Teachers', value: '156', change: '+5%', icon: GraduationCap, color: 'green' },
    { title: 'System Revenue', value: '₦45.2M', change: '+18%', icon: DollarSign, color: 'yellow' },
    { title: 'Active Schools', value: '12', change: '+2%', icon: Activity, color: 'purple' },
  ];

  const studentEnrollmentData = [
    { month: 'Jan', students: 2400 },
    { month: 'Feb', students: 2450 },
    { month: 'Mar', students: 2520 },
    { month: 'Apr', students: 2580 },
    { month: 'May', students: 2650 },
    { month: 'Jun', students: 2720 },
    { month: 'Jul', students: 2780 },
    { month: 'Aug', students: 2847 },
  ];

  const roleDistribution = [
    { name: 'Students', value: 2847, color: '#3b82f6' },
    { name: 'Teachers', value: 156, color: '#10b981' },
    { name: 'Parents', value: 1923, color: '#f59e0b' },
    { name: 'Admins', value: 24, color: '#8b5cf6' },
  ];

  const academicPerformance = [
    { subject: 'Mathematics', average: 78, students: 847 },
    { subject: 'English', average: 82, students: 847 },
    { subject: 'Physics', average: 74, students: 456 },
    { subject: 'Chemistry', average: 79, students: 456 },
    { subject: 'Biology', average: 81, students: 456 },
    { subject: 'Geography', average: 83, students: 391 },
  ];

  const revenueData = [
    { month: 'Jan', amount: 4200000 },
    { month: 'Feb', amount: 4350000 },
    { month: 'Mar', amount: 4180000 },
    { month: 'Apr', amount: 4520000 },
    { month: 'May', amount: 4680000 },
    { month: 'Jun', amount: 4750000 },
    { month: 'Jul', amount: 4920000 },
    { month: 'Aug', amount: 5100000 },
  ];

  const reports = [
    { id: 'overview', label: 'System Overview', icon: TrendingUp },
    { id: 'users', label: 'User Analytics', icon: Users },
    { id: 'academic', label: 'Academic Performance', icon: GraduationCap },
    { id: 'financial', label: 'Financial Reports', icon: DollarSign },
  ];

  const handleExport = (format) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
  };

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Role Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderAcademicReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance Overview</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={academicPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="average" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Subjects</h3>
          <div className="space-y-3">
            {academicPerformance
              .sort((a, b) => b.average - a.average)
              .slice(0, 3)
              .map((subject, index) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{subject.subject}</p>
                      <p className="text-sm text-gray-500">{subject.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{subject.average}%</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-green-800 font-medium">Students Above 80%</span>
              <span className="text-green-600 font-bold">1,247 (44%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-yellow-800 font-medium">Students 60-80%</span>
              <span className="text-yellow-600 font-bold">1,089 (38%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-red-800 font-medium">Students Below 60%</span>
              <span className="text-red-600 font-bold">511 (18%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend (₦ Millions)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₦${(value / 1000000).toFixed(1)}M`, 'Revenue']} />
            <Bar dataKey="amount" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Paid</span>
              <span className="text-green-600 font-semibold">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="text-yellow-600 font-semibold">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overdue</span>
              <span className="text-red-600 font-semibold">7%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Sources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tuition Fees</span>
              <span className="font-semibold">₦38.5M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Registration</span>
              <span className="font-semibold">₦4.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Extras</span>
              <span className="font-semibold">₦2.5M</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">+18.5%</p>
            <p className="text-gray-600">vs last month</p>
            <p className="text-sm text-gray-500 mt-2">₦7.2M increase</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Reports & Analytics</h1>
        <p className="text-gray-600">Comprehensive system-wide analytics and reporting</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Report Selection */}
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedReport === report.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {report.label}
                </button>
              );
            })}
          </div>

          {/* Date Range & Export */}
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-base"
            >
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 3 months</option>
              <option value="lastyear">Last year</option>
            </select>

            <div className="relative">
              <button className="btn-outline flex items-center gap-2 px-4 py-2 rounded-lg">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {selectedReport === 'overview' && renderOverviewReport()}
        {selectedReport === 'users' && renderOverviewReport()} {/* Simplified for demo */}
        {selectedReport === 'academic' && renderAcademicReport()}
        {selectedReport === 'financial' && renderFinancialReport()}
      </div>
    </div>
  );
};

export default SystemReports;
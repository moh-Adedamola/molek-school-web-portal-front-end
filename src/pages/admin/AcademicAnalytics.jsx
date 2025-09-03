// File: src/pages/admin/AcademicAnalytics.jsx
import React, { useState } from 'react';
import { TrendingUp, Users, BookOpen, Calendar, Download, Filter } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AcademicAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const performanceTrend = [
    { term: 'Term 1', JSS: 74, SSS: 78, overall: 76 },
    { term: 'Term 2', JSS: 76, SSS: 80, overall: 78 },
    { term: 'Term 3', JSS: 78, SSS: 82, overall: 80 },
    { term: 'Term 1 (Current)', JSS: 75, SSS: 79, overall: 77 }
  ];

  const attendanceTrend = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 89 },
    { month: 'Mar', rate: 94 },
    { month: 'Apr', rate: 91 },
    { month: 'May', rate: 88 },
    { month: 'Jun', rate: 93 }
  ];

  const classComparison = [
    { class: 'JSS 1A', performance: 82, attendance: 94 },
    { class: 'JSS 1B', performance: 78, attendance: 91 },
    { class: 'JSS 2A', performance: 85, attendance: 96 },
    { class: 'JSS 2B', performance: 79, attendance: 89 },
    { class: 'SSS 1A', performance: 88, attendance: 95 },
    { class: 'SSS 1B', performance: 84, attendance: 92 }
  ];

  const metrics = [
    { id: 'performance', label: 'Academic Performance', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance Trends', icon: Users },
    { id: 'subjects', label: 'Subject Analysis', icon: BookOpen },
    { id: 'comparison', label: 'Class Comparison', icon: Calendar }
  ];

  const getPerformanceColor = (score) => {
    if (score >= 85) return '#059669';
    if (score >= 75) return '#2563eb';
    if (score >= 65) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Academic Analytics</h1>
          <p className="text-neutral-600 mt-1">Comprehensive academic performance insights</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-outline flex items-center gap-2 px-4 py-2">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn-secondary flex items-center gap-2 px-4 py-2">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">77%</div>
          <div className="text-sm text-neutral-600">Overall Performance</div>
        </div>
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">91%</div>
          <div className="text-sm text-neutral-600">Attendance Rate</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">+3%</div>
          <div className="text-sm text-neutral-600">Performance Growth</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">12</div>
          <div className="text-sm text-neutral-600">Active Classes</div>
        </div>
      </div>

      {/* Metric Selection Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                selectedMetric === metric.id ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              <Icon size={16} />
              {metric.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Based on Selected Metric */}
      <div className="space-y-6">
        {selectedMetric === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="term" />
                  <YAxis domain={[60, 90]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="JSS" stroke="#059669" strokeWidth={2} name="JSS Average" />
                  <Line type="monotone" dataKey="SSS" stroke="#2563eb" strokeWidth={2} name="SSS Average" />
                  <Line type="monotone" dataKey="overall" stroke="#d97706" strokeWidth={2} name="Overall" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card-base">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                  <p className="text-sm font-medium text-green-700">Strong Performance</p>
                  <p className="text-sm text-green-600">SSS classes showing consistent improvement</p>
                </div>
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm font-medium text-yellow-700">Attention Needed</p>
                  <p className="text-sm text-yellow-600">JSS 2B performance below target</p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <p className="text-sm font-medium text-blue-700">Recommendation</p>
                  <p className="text-sm text-blue-600">Focus on Mathematics and Science subjects</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'attendance' && (
          <div className="card-base">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Attendance Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedMetric === 'comparison' && (
          <div className="card-base">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Class Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={classComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#2563eb" name="Performance %" />
                <Bar dataKey="attendance" fill="#059669" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {selectedMetric === 'subjects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { subject: 'Mathematics', score: 72, trend: '+2%' },
              { subject: 'English', score: 78, trend: '+1%' },
              { subject: 'Physics', score: 69, trend: '-1%' },
              { subject: 'Chemistry', score: 74, trend: '+3%' },
              { subject: 'Biology', score: 81, trend: '+5%' },
              { subject: 'Geography', score: 76, trend: '+2%' }
            ].map((subject) => (
              <div key={subject.subject} className="card-base text-center">
                <h4 className="font-semibold text-neutral-800 mb-2">{subject.subject}</h4>
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: getPerformanceColor(subject.score) }}
                >
                  {subject.score}%
                </div>
                <div className={`text-sm ${
                  subject.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subject.trend} from last term
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicAnalytics;
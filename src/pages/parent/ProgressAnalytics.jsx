// File: src/pages/parent/ProgressAnalytics.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, BookOpen, Target, Award, ChevronDown } from 'lucide-react';

const ProgressAnalytics = () => {
  const [selectedChild, setSelectedChild] = useState('1');
  const [selectedPeriod, setSelectedPeriod] = useState('term');
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);

  const children = [
    { id: '1', name: 'Adunni Olatunji', class: 'JSS 2A' },
    { id: '2', name: 'Kunle Olatunji', class: 'SSS 1B' }
  ];

  const periods = [
    { value: 'term', label: 'Current Term' },
    { value: 'session', label: 'Academic Session' },
    { value: 'monthly', label: 'Monthly Progress' }
  ];

  useEffect(() => {
    // Mock analytics data
    const mockData = {
      progressTrend: [
        { period: 'Week 1', average: 65, attendance: 90 },
        { period: 'Week 2', average: 68, attendance: 85 },
        { period: 'Week 3', average: 72, attendance: 95 },
        { period: 'Week 4', average: 75, attendance: 80 },
        { period: 'Week 5', average: 78, attendance: 90 },
        { period: 'Week 6', average: 80, attendance: 95 },
      ],
      subjectPerformance: [
        { subject: 'Math', score: 85, improvement: 8 },
        { subject: 'English', score: 78, improvement: -2 },
        { subject: 'Biology', score: 72, improvement: 5 },
        { subject: 'Chemistry', score: 69, improvement: 3 },
        { subject: 'Physics', score: 75, improvement: 7 },
        { subject: 'Civic Ed', score: 88, improvement: 2 }
      ],
      attendanceBreakdown: [
        { name: 'Present', value: 85, color: '#059669' },
        { name: 'Late', value: 10, color: '#d97706' },
        { name: 'Absent', value: 5, color: '#dc2626' }
      ],
      keyMetrics: {
        currentAverage: 78,
        previousAverage: 75,
        attendanceRate: 85,
        classPosition: 12,
        totalStudents: 45,
        improvingSubjects: 5,
        decliningSubjects: 1
      }
    };

    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, [selectedChild, selectedPeriod]);

  const selectedChildData = children.find(child => child.id === selectedChild);
  const { progressTrend, subjectPerformance, attendanceBreakdown, keyMetrics } = analyticsData;

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp className="w-4 h-4 text-success" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-error" />;
    return <Target className="w-4 h-4 text-neutral-500" />;
  };

  const getImprovementColor = (improvement) => {
    if (improvement > 0) return 'text-success';
    if (improvement < 0) return 'text-error';
    return 'text-neutral-500';
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
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Progress Analytics</h1>
          <p className="text-neutral-600">Detailed insights into your children's academic progress</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="input-base pr-10 appearance-none bg-white w-full"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.class})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>

            <div className="relative flex-1">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="input-base pr-10 appearance-none bg-white w-full"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-700">Current Average</span>
              {getTrendIcon(keyMetrics?.currentAverage, keyMetrics?.previousAverage)}
            </div>
            <div className="text-2xl font-bold text-neutral-800">{keyMetrics?.currentAverage}%</div>
            <div className="text-sm text-neutral-500">
              {keyMetrics?.currentAverage > keyMetrics?.previousAverage ? '+' : ''}
              {keyMetrics?.currentAverage - keyMetrics?.previousAverage}% from last period
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-neutral-700">Attendance</span>
            </div>
            <div className="text-2xl font-bold text-success">{keyMetrics?.attendanceRate}%</div>
            <div className="text-sm text-neutral-500">This term</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-700">Class Position</span>
            </div>
            <div className="text-2xl font-bold text-primary-600">{keyMetrics?.classPosition}</div>
            <div className="text-sm text-neutral-500">out of {keyMetrics?.totalStudents}</div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-medium text-neutral-700">Improving</span>
            </div>
            <div className="text-2xl font-bold text-accent-600">{keyMetrics?.improvingSubjects}</div>
            <div className="text-sm text-neutral-500">subjects trending up</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Academic Progress Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="period" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                  name="Average Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Attendance Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={attendanceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center gap-6 mt-4">
              {attendanceBreakdown?.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-neutral-700">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-8">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Subject Performance Analysis</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Scores Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis dataKey="subject" type="category" stroke="#6b7280" fontSize={12} width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* Subject Details */}
            <div className="space-y-3">
              {subjectPerformance?.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-800">{subject.subject}</h4>
                    <p className="text-sm text-neutral-600">Current Score: {subject.score}%</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getImprovementColor(subject.improvement)}`}>
                      {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                    </div>
                    <div className="text-xs text-neutral-500">vs last period</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Insights & Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-800 mb-3">Strengths</h4>
              <ul className="space-y-2 text-sm text-secondary-700">
                <li>• Consistent improvement in Mathematics (+8%)</li>
                <li>• Strong performance in Civic Education (88%)</li>
                <li>• Good attendance rate trending upward</li>
                <li>• Overall academic average above class median</li>
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-accent-50 rounded-lg p-4">
              <h4 className="font-semibold text-accent-800 mb-3">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm text-accent-700">
                <li>• Focus on English Language (slight decline)</li>
                <li>• Chemistry needs additional attention</li>
                <li>• Reduce late arrivals to improve punctuality</li>
                <li>• Consider extra practice in Science subjects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
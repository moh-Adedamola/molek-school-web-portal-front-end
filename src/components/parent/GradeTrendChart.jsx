// File: src/components/parent/GradeTrendChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3, Award } from 'lucide-react';
import { useState } from 'react';

const GradeTrendChart = ({ selectedChild, selectedTerm }) => {
  const [viewType, setViewType] = useState('line'); // 'line' or 'bar'

  // Mock grade trend data
  const gradeData = [
    { month: 'Sep', math: 85, english: 78, physics: 88, chemistry: 82, average: 83.25 },
    { month: 'Oct', math: 88, english: 80, physics: 85, chemistry: 84, average: 84.25 },
    { month: 'Nov', math: 90, english: 82, physics: 87, chemistry: 86, average: 86.25 },
    { month: 'Dec', math: 92, english: 85, physics: 89, chemistry: 88, average: 88.5 }
  ];

  // Subject performance data
  const subjectPerformance = [
    { subject: 'Mathematics', current: 92, previous: 85, grade: 'A', trend: 7 },
    { subject: 'English Language', current: 85, previous: 78, grade: 'B+', trend: 7 },
    { subject: 'Physics', current: 89, previous: 88, grade: 'A-', trend: 1 },
    { subject: 'Chemistry', current: 88, previous: 82, grade: 'A-', trend: 6 }
  ];

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': '#059669', 'A-': '#059669',
      'B+': '#2563eb', 'B': '#2563eb', 'B-': '#2563eb',
      'C+': '#d97706', 'C': '#d97706', 'C-': '#d97706',
      'D': '#dc2626', 'F': '#dc2626'
    };
    return gradeColors[grade] || '#6b7280';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return <TrendingUp size={14} className="text-secondary-600" />;
    if (trend < 0) return <TrendingUp size={14} className="text-error rotate-180" />;
    return <div className="w-3 h-3 bg-neutral-400 rounded-full" />;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-neutral-200">
          <p className="text-sm font-medium text-neutral-800 mb-2">{`${label} 2024`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <BarChart3 size={20} className="text-primary-600" />
          Grade Trends
        </h3>
        
        <div className="flex items-center gap-2 mt-3 sm:mt-0">
          <button
            onClick={() => setViewType('line')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              viewType === 'line' 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setViewType('bar')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              viewType === 'bar' 
                ? 'bg-primary-600 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Bar Chart
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'line' ? (
            <LineChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="math" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="english" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="physics" 
                stroke="#d97706" 
                strokeWidth={2}
                dot={{ fill: '#d97706', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="chemistry" 
                stroke="#7c3aed" 
                strokeWidth={2}
                dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#1f2937" 
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#1f2937', strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          ) : (
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="math" fill="#059669" />
              <Bar dataKey="english" fill="#2563eb" />
              <Bar dataKey="physics" fill="#d97706" />
              <Bar dataKey="chemistry" fill="#7c3aed" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary-600 rounded"></div>
          <span className="text-xs text-neutral-600">Mathematics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-600 rounded"></div>
          <span className="text-xs text-neutral-600">English</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-600 rounded"></div>
          <span className="text-xs text-neutral-600">Physics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-600 rounded"></div>
          <span className="text-xs text-neutral-600">Chemistry</span>
        </div>
        {viewType === 'line' && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-neutral-800 rounded"></div>
            <span className="text-xs text-neutral-600">Average</span>
          </div>
        )}
      </div>

      {/* Subject Performance Summary */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
          <Award size={16} />
          Current Subject Performance
        </h4>
        
        <div className="space-y-3">
          {subjectPerformance.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-neutral-800">
                  {subject.subject}
                </div>
                <div 
                  className="px-2 py-1 rounded text-xs font-medium text-white"
                  style={{ backgroundColor: getGradeColor(subject.grade) }}
                >
                  {subject.grade}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-neutral-600">
                  {subject.current}%
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(subject.trend)}
                  <span className="text-xs text-neutral-500">
                    {subject.trend > 0 ? '+' : ''}{subject.trend}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <h4 className="text-sm font-semibold text-neutral-800 mb-3">Performance Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-secondary-50 rounded-lg">
            <div className="text-sm font-medium text-secondary-800 mb-1">Best Improving Subject</div>
            <div className="text-xs text-secondary-700">Mathematics (+7% this term)</div>
          </div>
          <div className="p-3 bg-primary-50 rounded-lg">
            <div className="text-sm font-medium text-primary-800 mb-1">Overall Trend</div>
            <div className="text-xs text-primary-700">Consistent upward improvement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeTrendChart;
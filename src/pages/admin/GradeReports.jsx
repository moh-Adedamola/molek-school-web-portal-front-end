// File: src/pages/admin/GradeReports.jsx
import React, { useState } from 'react';
import { Download, Filter, TrendingUp, Award, BookOpen } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const GradeReports = () => {
  const [selectedTerm, setSelectedTerm] = useState('currentTerm');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const subjectPerformance = [
    { subject: 'Mathematics', average: 72, pass: 85, fail: 15 },
    { subject: 'English', average: 78, pass: 92, fail: 8 },
    { subject: 'Physics', average: 69, pass: 78, fail: 22 },
    { subject: 'Chemistry', average: 74, pass: 88, fail: 12 },
    { subject: 'Biology', average: 81, pass: 95, fail: 5 },
    { subject: 'Geography', average: 76, pass: 90, fail: 10 }
  ];

  const gradeDistribution = [
    { grade: 'A (70-100)', count: 45, color: '#059669' },
    { grade: 'B (60-69)', count: 78, color: '#2563eb' },
    { grade: 'C (50-59)', count: 112, color: '#d97706' },
    { grade: 'D (40-49)', count: 67, color: '#dc2626' },
    { grade: 'F (0-39)', count: 18, color: '#6b7280' }
  ];

  const topPerformers = [
    { name: 'Adebayo Olumide', class: 'JSS 1A', average: 94, position: 1 },
    { name: 'Chioma Okafor', class: 'JSS 2B', average: 92, position: 2 },
    { name: 'Ibrahim Musa', class: 'SSS 1A', average: 90, position: 3 },
    { name: 'Blessing Akpan', class: 'SSS 3B', average: 88, position: 4 }
  ];

  const getGradeColor = (average) => {
    if (average >= 70) return 'text-green-600 bg-green-50';
    if (average >= 60) return 'text-blue-600 bg-blue-50';
    if (average >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Grade Reports</h1>
          <p className="text-neutral-600 mt-1">Academic performance analytics and reports</p>
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

      {/* Performance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">76%</div>
          <div className="text-sm text-neutral-600">School Average</div>
        </div>
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">87%</div>
          <div className="text-sm text-neutral-600">Pass Rate</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">45</div>
          <div className="text-sm text-neutral-600">A Grades</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">18</div>
          <div className="text-sm text-neutral-600">Failed Students</div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['currentTerm', 'previousTerm', 'yearlyReport'].map(term => (
          <button
            key={term}
            onClick={() => setSelectedTerm(term)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTerm === term ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            {term === 'currentTerm' && 'Current Term'}
            {term === 'previousTerm' && 'Previous Term'} 
            {term === 'yearlyReport' && 'Yearly Report'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Subject Performance */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Subject Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" fill="#2563eb" name="Average Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                label={({ grade, count }) => `${grade}: ${count}`}
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="card-base">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-500" size={20} />
            <h3 className="text-lg font-semibold text-neutral-800">Top Performers</h3>
          </div>
          <div className="space-y-3">
            {topPerformers.map((student) => (
              <div key={student.name} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-700">{student.position}</span>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">{student.name}</p>
                    <p className="text-sm text-neutral-600">{student.class}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(student.average)}`}>
                  {student.average}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Analysis */}
        <div className="card-base">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-primary-600" size={20} />
            <h3 className="text-lg font-semibold text-neutral-800">Subject Analysis</h3>
          </div>
          <div className="space-y-4">
            {subjectPerformance.slice(0, 4).map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-neutral-800">{subject.subject}</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${getGradeColor(subject.average)}`}>
                    {subject.average}%
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600">Pass: {subject.pass}%</span>
                  <span className="text-red-600">Fail: {subject.fail}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-primary-600"
                    style={{ width: `${subject.average}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeReports;
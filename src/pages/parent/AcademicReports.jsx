// File: src/pages/parent/AcademicReports.jsx
import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Award, Download, Filter } from 'lucide-react';
import ChildProgressWidget from '../../components/parent/ChildProgressWidget';
import AttendanceSummaryCard from '../../components/parent/AttendanceSummaryCard';
import GradeTrendChart from '../../components/parent/GradeTrendChart';
import SubjectPerformanceCard from '../../components/parent/SubjectPerformanceCard';

const AcademicReports = () => {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [reportType, setReportType] = useState('overview');

  // Mock children data
  const children = [
    { id: 1, name: 'Kemi Adebayo', class: 'JSS 2A', photo: '/api/placeholder/40/40' },
    { id: 2, name: 'Tunde Adebayo', class: 'SSS 1B', photo: '/api/placeholder/40/40' }
  ];

  const terms = [
    { value: 'current', label: '2024/2025 - 1st Term' },
    { value: 'previous', label: '2023/2024 - 3rd Term' },
    { value: 'all', label: 'All Terms' }
  ];

  const reportTypes = [
    { value: 'overview', label: 'Academic Overview' },
    { value: 'detailed', label: 'Detailed Report' },
    { value: 'comparison', label: 'Term Comparison' }
  ];

  const overallStats = {
    averageGrade: 'B+',
    totalSubjects: 12,
    attendanceRate: '94%',
    classRank: '5th'
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 bg-neutral-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">
              Academic Reports
            </h1>
            <p className="text-neutral-600 mt-1">
              Comprehensive academic performance tracking for your children
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2">
              <Download size={18} />
              <span className="hidden sm:inline">Download Report</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-200">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Select Child
            </label>
            <select 
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="input-base w-full"
            >
              <option value="all">All Children</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>{child.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Academic Term
            </label>
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="input-base w-full"
            >
              {terms.map(term => (
                <option key={term.value} value={term.value}>{term.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Report Type
            </label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="input-base w-full"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-secondary-600">{overallStats.averageGrade}</div>
          <div className="text-sm text-neutral-600 mt-1">Average Grade</div>
        </div>
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">{overallStats.totalSubjects}</div>
          <div className="text-sm text-neutral-600 mt-1">Total Subjects</div>
        </div>
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-accent-600">{overallStats.attendanceRate}</div>
          <div className="text-sm text-neutral-600 mt-1">Attendance</div>
        </div>
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-info">{overallStats.classRank}</div>
          <div className="text-sm text-neutral-600 mt-1">Class Position</div>
        </div>
      </div>

      {/* Children Progress Widgets */}
      <div className="space-y-6">
        {children.map(child => (
          <ChildProgressWidget
            key={child.id}
            childData={child}
            selectedTerm={selectedTerm}
            reportType={reportType}
          />
        ))}
      </div>

      {/* Academic Performance Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GradeTrendChart 
          selectedChild={selectedChild}
          selectedTerm={selectedTerm}
        />
        
        <div className="space-y-4">
          <AttendanceSummaryCard 
            selectedChild={selectedChild}
            selectedTerm={selectedTerm}
          />
          
          <SubjectPerformanceCard 
            selectedChild={selectedChild}
            selectedTerm={selectedTerm}
          />
        </div>
      </div>

      {/* Detailed Reports Section */}
      {reportType === 'detailed' && (
        <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <Award size={20} className="text-primary-600" />
            Detailed Academic Analysis
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary-50 rounded-lg">
                <h4 className="font-medium text-secondary-800 mb-2">Strengths</h4>
                <ul className="text-sm text-secondary-700 space-y-1">
                  <li>• Excellent performance in Mathematics</li>
                  <li>• Consistent attendance record</li>
                  <li>• Active class participation</li>
                </ul>
              </div>
              
              <div className="p-4 bg-accent-50 rounded-lg">
                <h4 className="font-medium text-accent-800 mb-2">Areas for Improvement</h4>
                <ul className="text-sm text-accent-700 space-y-1">
                  <li>• English Language writing skills</li>
                  <li>• Time management during exams</li>
                  <li>• Study habits development</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-primary-50 rounded-lg">
              <h4 className="font-medium text-primary-800 mb-2">Recommendations</h4>
              <p className="text-sm text-primary-700">
                Continue supporting strong mathematical abilities while providing additional 
                resources for English Language improvement. Consider enrolling in weekend 
                tutorial sessions for enhanced learning support.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicReports;
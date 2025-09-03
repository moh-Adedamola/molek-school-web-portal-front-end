// File: src/components/parent/ChildProgressWidget.jsx
import { TrendingUp, TrendingDown, Calendar, BookOpen } from 'lucide-react';

const ChildProgressWidget = ({ childData, selectedTerm, reportType }) => {
  // Mock data for child progress
  const progressData = {
    currentGrade: 'B+',
    previousGrade: 'B',
    trend: 'up',
    subjectsCount: 12,
    attendanceRate: 96,
    totalTests: 8,
    assignments: {
      completed: 24,
      total: 26
    },
    recentPerformance: [
      { subject: 'Mathematics', grade: 'A', trend: 'up' },
      { subject: 'English Language', grade: 'B+', trend: 'stable' },
      { subject: 'Physics', grade: 'A-', trend: 'up' },
      { subject: 'Chemistry', grade: 'B', trend: 'down' }
    ]
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-secondary-600" />;
      case 'down':
        return <TrendingDown size={16} className="text-error" />;
      default:
        return <div className="w-4 h-4 bg-neutral-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-secondary-600';
      case 'down':
        return 'text-error';
      default:
        return 'text-neutral-500';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card">
      {/* Child Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <img 
            src={childData.photo} 
            alt={childData.name}
            className="w-12 h-12 rounded-full object-cover bg-neutral-200"
          />
          <div>
            <h3 className="text-lg font-semibold text-neutral-800">{childData.name}</h3>
            <p className="text-sm text-neutral-600">{childData.class}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:ml-auto">
          <div className={`flex items-center gap-1 ${getTrendColor(progressData.trend)}`}>
            {getTrendIcon(progressData.trend)}
            <span className="text-sm font-medium">
              {progressData.currentGrade}
            </span>
          </div>
          {progressData.previousGrade && (
            <span className="text-xs text-neutral-500">
              from {progressData.previousGrade}
            </span>
          )}
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-primary-600">
            {progressData.attendanceRate}%
          </div>
          <div className="text-xs text-neutral-600">Attendance</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-secondary-600">
            {progressData.assignments.completed}/{progressData.assignments.total}
          </div>
          <div className="text-xs text-neutral-600">Assignments</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-accent-600">
            {progressData.totalTests}
          </div>
          <div className="text-xs text-neutral-600">Tests Taken</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-info">
            {progressData.subjectsCount}
          </div>
          <div className="text-xs text-neutral-600">Subjects</div>
        </div>
      </div>

      {/* Recent Subject Performance */}
      <div>
        <h4 className="text-sm font-semibold text-neutral-800 mb-3 flex items-center gap-2">
          <BookOpen size={16} />
          Recent Subject Performance
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {progressData.recentPerformance.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-neutral-800">
                  {subject.subject}
                </div>
                <div className="text-lg font-bold text-primary-600">
                  {subject.grade}
                </div>
              </div>
              <div className="flex items-center">
                {getTrendIcon(subject.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      {reportType === 'detailed' && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-secondary-50 rounded-lg">
              <h5 className="text-sm font-medium text-secondary-800 mb-2">Strengths</h5>
              <ul className="text-xs text-secondary-700 space-y-1">
                <li>• Strong analytical skills</li>
                <li>• Consistent homework completion</li>
              </ul>
            </div>
            
            <div className="p-3 bg-accent-50 rounded-lg">
              <h5 className="text-sm font-medium text-accent-800 mb-2">Focus Areas</h5>
              <ul className="text-xs text-accent-700 space-y-1">
                <li>• Reading comprehension</li>
                <li>• Time management</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildProgressWidget;
// File: src/components/parent/SubjectPerformanceCard.jsx
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';

const SubjectPerformanceCard = ({ selectedChild, selectedTerm }) => {
  // Mock subject performance data
  const subjectData = [
    {
      subject: 'Mathematics',
      teacher: 'Mr. Adebayo',
      currentGrade: 'A',
      percentage: 92,
      classAverage: 78,
      position: 2,
      totalStudents: 35,
      trend: 'up',
      lastAssignment: { title: 'Algebra Test', score: 94, date: '2024-11-20' },
      nextAssessment: { title: 'Geometry Quiz', date: '2024-12-05' }
    },
    {
      subject: 'English Language',
      teacher: 'Mrs. Okafor',
      currentGrade: 'B+',
      percentage: 85,
      classAverage: 73,
      position: 8,
      totalStudents: 35,
      trend: 'up',
      lastAssignment: { title: 'Essay Writing', score: 82, date: '2024-11-18' },
      nextAssessment: { title: 'Literature Analysis', date: '2024-12-03' }
    },
    {
      subject: 'Physics',
      teacher: 'Dr. Bakare',
      currentGrade: 'A-',
      percentage: 89,
      classAverage: 75,
      position: 4,
      totalStudents: 32,
      trend: 'stable',
      lastAssignment: { title: 'Mechanics Lab', score: 88, date: '2024-11-22' },
      nextAssessment: { title: 'Wave Theory Test', date: '2024-12-08' }
    }
  ];

  const getGradeColor = (grade) => {
    const gradeMap = {
      'A': 'bg-secondary-600',
      'A-': 'bg-secondary-500',
      'B+': 'bg-primary-600',
      'B': 'bg-primary-500',
      'B-': 'bg-primary-400',
      'C+': 'bg-accent-600',
      'C': 'bg-accent-500',
      'C-': 'bg-accent-400',
      'D': 'bg-error',
      'F': 'bg-red-700'
    };
    return gradeMap[grade] || 'bg-neutral-500';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} className="text-secondary-600" />;
      case 'down':
        return <TrendingUp size={14} className="text-error rotate-180" />;
      default:
        return <div className="w-3 h-3 bg-neutral-400 rounded-full" />;
    }
  };

  const getPerformanceStatus = (percentage, classAverage) => {
    const diff = percentage - classAverage;
    if (diff >= 15) return { text: 'Excellent', color: 'text-secondary-600' };
    if (diff >= 5) return { text: 'Above Average', color: 'text-primary-600' };
    if (diff >= -5) return { text: 'Average', color: 'text-accent-600' };
    return { text: 'Below Average', color: 'text-error' };
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <BookOpen size={20} className="text-primary-600" />
          Subject Performance
        </h3>
        <div className="text-sm text-neutral-500">
          {selectedTerm === 'current' ? 'Current Term' : 'All Terms'}
        </div>
      </div>

      <div className="space-y-4">
        {subjectData.map((subject, index) => {
          const status = getPerformanceStatus(subject.percentage, subject.classAverage);
          
          return (
            <div key={index} className="border border-neutral-200 rounded-lg p-4">
              {/* Subject Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium text-neutral-800">{subject.subject}</h4>
                  <div className={`px-2 py-1 rounded text-xs font-medium text-white ${getGradeColor(subject.currentGrade)}`}>
                    {subject.currentGrade}
                  </div>
                  {getTrendIcon(subject.trend)}
                </div>
                <div className="text-sm text-neutral-600">
                  Teacher: {subject.teacher}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-600">
                    {subject.percentage}%
                  </div>
                  <div className="text-xs text-neutral-600">Current Score</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-neutral-600">
                    {subject.classAverage}%
                  </div>
                  <div className="text-xs text-neutral-600">Class Average</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-600">
                    {subject.position}
                  </div>
                  <div className="text-xs text-neutral-600">Position</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-sm font-medium ${status.color}`}>
                    {status.text}
                  </div>
                  <div className="text-xs text-neutral-600">Status</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-neutral-600">Progress</span>
                  <span className="text-xs text-neutral-600">
                    {subject.position}/{subject.totalStudents} in class
                  </span>
                </div>
                <div className="bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Assignment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-2 bg-secondary-50 rounded">
                  <div className="flex items-center gap-1 mb-1">
                    <Award size={12} className="text-secondary-600" />
                    <span className="text-xs font-medium text-secondary-800">Last Assessment</span>
                  </div>
                  <div className="text-neutral-700">{subject.lastAssignment.title}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-secondary-600 font-medium">{subject.lastAssignment.score}%</span>
                    <span className="text-xs text-neutral-500">
                      {new Date(subject.lastAssignment.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="p-2 bg-primary-50 rounded">
                  <div className="flex items-center gap-1 mb-1">
                    <Target size={12} className="text-primary-600" />
                    <span className="text-xs font-medium text-primary-800">Upcoming Assessment</span>
                  </div>
                  <div className="text-neutral-700">{subject.nextAssessment.title}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Due: {new Date(subject.nextAssessment.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="mt-6 pt-4 border-t border-neutral-200">
        <h4 className="text-sm font-semibold text-neutral-800 mb-3">Term Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <div className="text-lg font-bold text-secondary-600">2</div>
            <div className="text-xs text-secondary-700">Subjects with A grades</div>
          </div>
          
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <div className="text-lg font-bold text-primary-600">88.7%</div>
            <div className="text-xs text-primary-700">Overall Average</div>
          </div>
          
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <div className="text-lg font-bold text-accent-600">5th</div>
            <div className="text-xs text-accent-700">Overall Class Position</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPerformanceCard;
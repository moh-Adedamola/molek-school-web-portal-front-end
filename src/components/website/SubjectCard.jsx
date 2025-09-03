// File: src/components/website/SubjectCard.jsx
import React from 'react';
import { BookOpen, Clock, Users, Award } from 'lucide-react';

const SubjectCard = ({ subject }) => {
  const {
    name,
    code,
    description,
    level, // JSS or SSS
    category, // Core, Elective, etc.
    duration,
    classSize,
    teacher,
    prerequisites,
    examBoard, // WAEC, NECO
    icon
  } = subject;

  const levelColor = {
    'JSS': 'bg-secondary-100 text-secondary-700',
    'SSS': 'bg-primary-100 text-primary-700',
    'Both': 'bg-accent-100 text-accent-700'
  };

  const categoryColor = {
    'Core': 'badge-info',
    'Elective': 'badge-success',
    'Vocational': 'badge-warning'
  };

  return (
    <div className="feature-card h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-800 mb-1">
              {name}
            </h3>
            {code && (
              <p className="text-sm text-neutral-500 font-medium">
                {code}
              </p>
            )}
          </div>
        </div>
        
        {level && (
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${levelColor[level] || levelColor['Both']}`}>
            {level}
          </span>
        )}
      </div>

      {/* Category Badge */}
      {category && (
        <div className="mb-3">
          <span className={`${categoryColor[category] || 'badge-info'} text-xs`}>
            {category} Subject
          </span>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
          {description}
        </p>
      )}

      {/* Subject Details */}
      <div className="space-y-2 mb-4">
        {duration && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span>{duration} hours/week</span>
          </div>
        )}
        
        {classSize && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Users className="w-4 h-4 text-neutral-400" />
            <span>Max {classSize} students</span>
          </div>
        )}
        
        {teacher && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <BookOpen className="w-4 h-4 text-neutral-400" />
            <span>By {teacher}</span>
          </div>
        )}
        
        {examBoard && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Award className="w-4 h-4 text-neutral-400" />
            <span>{examBoard} Examination</span>
          </div>
        )}
      </div>

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <div className="border-t border-neutral-200 pt-3">
          <h4 className="text-xs font-medium text-neutral-700 mb-2">
            Prerequisites:
          </h4>
          <div className="flex flex-wrap gap-1">
            {prerequisites.map((prereq, index) => (
              <span
                key={index}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
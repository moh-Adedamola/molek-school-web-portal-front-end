// File: src/components/dashboards/ParentWidgets.jsx
import React from 'react';
import { TrendingUp, TrendingDown, BookOpen, Calendar, Award, AlertTriangle } from 'lucide-react';

export const ChildProgressWidget = ({ childData }) => {
  const { name, class: childClass, currentAverage, previousAverage, attendanceRate, alerts } = childData;
  
  const progressTrend = currentAverage > previousAverage ? 'up' : 
                       currentAverage < previousAverage ? 'down' : 'stable';
  
  const getTrendColor = () => {
    switch (progressTrend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-neutral-500';
    }
  };

  const getTrendIcon = () => {
    switch (progressTrend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">{name}</h3>
          <p className="text-sm text-neutral-600">{childClass}</p>
        </div>
        {alerts > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-warning-50 rounded-full">
            <AlertTriangle className="w-3 h-3 text-warning" />
            <span className="text-xs text-warning font-medium">{alerts}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className={`flex items-center justify-center gap-1 mb-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-2xl font-bold">{currentAverage}%</span>
          </div>
          <p className="text-xs text-neutral-500">Current Average</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar className="w-4 h-4 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">{attendanceRate}%</span>
          </div>
          <p className="text-xs text-neutral-500">Attendance</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>
          {progressTrend === 'up' ? '+' : progressTrend === 'down' ? '' : '±'}
          {Math.abs(currentAverage - previousAverage)}% from last term
        </span>
        <span>Updated today</span>
      </div>
    </div>
  );
};

export const AttendanceSummaryWidget = ({ attendanceData }) => {
  const { present, late, absent, totalDays } = attendanceData;
  const attendanceRate = ((present + late) / totalDays * 100).toFixed(1);

  return (
    <div className="card-base">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-neutral-800">Attendance Summary</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Present Days</span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${(present / totalDays) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-neutral-800">{present}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Late Days</span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full" 
                style={{ width: `${(late / totalDays) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-neutral-800">{late}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Absent Days</span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-neutral-200 rounded-full h-2">
              <div 
                className="bg-error h-2 rounded-full" 
                style={{ width: `${(absent / totalDays) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-neutral-800">{absent}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700">Overall Rate</span>
          <span className={`text-lg font-bold ${
            attendanceRate >= 90 ? 'text-success' :
            attendanceRate >= 75 ? 'text-warning' : 'text-error'
          }`}>
            {attendanceRate}%
          </span>
        </div>
      </div>
    </div>
  );
};

export const GradeTrendWidget = ({ gradeData, subjectName = "Overall" }) => {
  const { currentGrade, previousGrade, trend, position, totalStudents } = gradeData;
  
  const trendValue = currentGrade - previousGrade;
  const trendColor = trendValue > 0 ? 'text-success' : 
                     trendValue < 0 ? 'text-error' : 'text-neutral-500';

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800">{subjectName}</h3>
          <p className="text-sm text-neutral-600">Academic Performance</p>
        </div>
        <Award className="w-5 h-5 text-accent-600" />
      </div>

      <div className="text-center mb-4">
        <div className={`text-3xl font-bold mb-1 ${
          currentGrade >= 80 ? 'text-success' :
          currentGrade >= 70 ? 'text-primary-600' :
          currentGrade >= 60 ? 'text-warning' : 'text-error'
        }`}>
          {currentGrade}%
        </div>
        <p className="text-sm text-neutral-600">Current Grade</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-lg font-semibold ${trendColor}`}>
            {trendValue > 0 ? '+' : ''}{trendValue}%
          </div>
          <p className="text-xs text-neutral-500">vs Last Term</p>
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold text-neutral-800">
            {position}/{totalStudents}
          </div>
          <p className="text-xs text-neutral-500">Class Rank</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {trendValue > 0 ? (
          <TrendingUp className="w-4 h-4 text-success" />
        ) : trendValue < 0 ? (
          <TrendingDown className="w-4 h-4 text-error" />
        ) : (
          <BookOpen className="w-4 h-4 text-neutral-500" />
        )}
        <span className={`text-sm font-medium ${trendColor}`}>
          {trendValue > 0 ? 'Improving' : 
           trendValue < 0 ? 'Needs attention' : 'Stable'}
        </span>
      </div>
    </div>
  );
};

// Quick Stats Component
export const QuickStatsWidget = ({ children }) => {
  const totalChildren = children.length;
  const avgAttendance = children.reduce((sum, child) => sum + child.attendanceRate, 0) / totalChildren;
  const avgGrade = children.reduce((sum, child) => sum + child.currentAverage, 0) / totalChildren;
  const totalAlerts = children.reduce((sum, child) => sum + child.alerts, 0);

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Family Overview</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-2xl font-bold text-primary-600">{totalChildren}</div>
          <div className="text-sm text-primary-700">Children</div>
        </div>

        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <div className="text-2xl font-bold text-secondary-600">{avgGrade.toFixed(0)}%</div>
          <div className="text-sm text-secondary-700">Avg Grade</div>
        </div>

        <div className="text-center p-3 bg-accent-50 rounded-lg">
          <div className="text-2xl font-bold text-accent-600">{avgAttendance.toFixed(0)}%</div>
          <div className="text-sm text-accent-700">Avg Attendance</div>
        </div>

        <div className="text-center p-3 bg-neutral-50 rounded-lg">
          <div className={`text-2xl font-bold ${totalAlerts > 0 ? 'text-warning' : 'text-success'}`}>
            {totalAlerts}
          </div>
          <div className="text-sm text-neutral-700">Active Alerts</div>
        </div>
      </div>
    </div>
  );
};
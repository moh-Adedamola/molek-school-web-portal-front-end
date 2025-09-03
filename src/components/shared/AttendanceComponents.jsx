// File: src/components/shared/AttendanceComponents.jsx
import React from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const AttendanceStatusCard = ({ status, count, percentage, color, icon }) => {
  const iconComponents = {
    present: CheckCircle,
    absent: XCircle,
    late: AlertCircle,
    calendar: Calendar
  };
  
  const IconComponent = iconComponents[icon] || Calendar;

  return (
    <div className="bg-white rounded-lg p-4 border border-neutral-200">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-full ${color}-50`}>
          <IconComponent className={`w-4 h-4 ${color}-600`} />
        </div>
        <div>
          <h3 className="font-medium text-neutral-800 capitalize">{status}</h3>
          <p className="text-sm text-neutral-600">{percentage}% of days</p>
        </div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className={`text-2xl font-bold ${color}-600`}>{count}</span>
        <span className="text-sm text-neutral-500 mb-1">days</span>
      </div>
    </div>
  );
};

export const WeeklyAttendanceBar = ({ weekData, childName }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-success';
      case 'late': return 'bg-warning';
      case 'absent': return 'bg-error';
      default: return 'bg-neutral-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return '✓';
      case 'late': return '⚠';
      case 'absent': return '✗';
      default: return '?';
    }
  };

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        {childName} - This Week
      </h3>
      
      <div className="grid grid-cols-5 gap-2">
        {days.map((day, index) => {
          const dayData = weekData[index] || { status: 'unknown', date: '' };
          
          return (
            <div key={day} className="text-center">
              <div className="text-xs text-neutral-600 mb-2">{day}</div>
              <div 
                className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold ${getStatusColor(dayData.status)}`}
                title={`${day}: ${dayData.status} ${dayData.date ? `(${dayData.date})` : ''}`}
              >
                {getStatusIcon(dayData.status)}
              </div>
              {dayData.date && (
                <div className="text-xs text-neutral-500 mt-1">{dayData.date}</div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="text-neutral-600">Present</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-warning rounded-full"></div>
          <span className="text-neutral-600">Late</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-error rounded-full"></div>
          <span className="text-neutral-600">Absent</span>
        </div>
      </div>
    </div>
  );
};

export const MonthlyAttendanceCalendar = ({ monthData, currentMonth, currentYear }) => {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getDateStatus = (day) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return monthData[dateKey] || null;
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-neutral-100 text-neutral-400';
    switch (status) {
      case 'present': return 'bg-success text-white';
      case 'late': return 'bg-warning text-white';
      case 'absent': return 'bg-error text-white';
      default: return 'bg-neutral-200 text-neutral-600';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        {monthNames[currentMonth]} {currentYear} - Attendance Calendar
      </h3>
      
      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-xs font-medium text-neutral-600 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Body */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {emptyDays.map(day => (
          <div key={`empty-${day}`} className="h-8"></div>
        ))}
        
        {/* Days of the month */}
        {daysArray.map(day => {
          const status = getDateStatus(day);
          const isToday = day === new Date().getDate() && 
                         currentMonth === new Date().getMonth() && 
                         currentYear === new Date().getFullYear();
          
          return (
            <div
              key={day}
              className={`h-8 rounded flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${getStatusColor(status)} ${
                isToday ? 'ring-2 ring-primary-600' : ''
              }`}
              title={status ? `${day}: ${status}` : `${day}: No school`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AttendanceTrendChart = ({ trendData, timeframe = 'weekly' }) => {
  const maxValue = Math.max(...trendData.map(d => d.percentage));
  
  return (
    <div className="card-base">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">
        Attendance Trend ({timeframe})
      </h3>
      
      <div className="space-y-3">
        {trendData.map((period, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-16 text-sm text-neutral-600 font-medium">
              {period.period}
            </div>
            
            <div className="flex-1 relative">
              <div className="w-full bg-neutral-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    period.percentage >= 90 ? 'bg-success' :
                    period.percentage >= 75 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${(period.percentage / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="absolute right-0 top-0 text-xs font-medium text-neutral-700 -mt-5">
                {period.percentage}%
              </span>
            </div>
            
            <div className="w-12 text-right text-sm text-neutral-600">
              {period.days}d
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <div className="flex justify-between text-xs text-neutral-500">
          <span>Excellent (90%+)</span>
          <span>Good (75-89%)</span>
          <span>Needs Improvement (&lt;75%)</span>
        </div>
      </div>
    </div>
  );
};

export const AttendanceAlert = ({ alertType, message, actionRequired = false }) => {
  const alertStyles = {
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    error: 'bg-error-50 border-error-200 text-error-800',
    info: 'bg-info-50 border-info-200 text-info-800'
  };

  const iconMap = {
    warning: AlertCircle,
    error: XCircle,
    info: Calendar
  };

  const IconComponent = iconMap[alertType] || AlertCircle;

  return (
    <div className={`border rounded-lg p-4 ${alertStyles[alertType]}`}>
      <div className="flex items-start gap-3">
        <IconComponent className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium mb-1">
            {alertType === 'warning' && 'Attendance Warning'}
            {alertType === 'error' && 'Attendance Alert'}
            {alertType === 'info' && 'Attendance Notice'}
          </p>
          <p className="text-sm">{message}</p>
          
          {actionRequired && (
            <div className="mt-3">
              <button className="btn-primary text-xs px-3 py-1 rounded">
                Contact School
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
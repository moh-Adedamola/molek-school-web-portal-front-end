// File: src/pages/dashboards/ParentDashboard.jsx
// Children overview, recent attendance, academic alerts

import { useState } from 'react';
import { 
  Heart,
  Calendar,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare
} from 'lucide-react';
import { useRole } from '../../hooks/useRole';

const ParentDashboard = () => {
  const { user, getWelcomeMessage } = useRole();
  const [selectedChild, setSelectedChild] = useState('all');

  // Mock children data
  const children = [
    {
      id: 1,
      name: 'Mary Adebayo',
      class: 'SSS 2A',
      age: 16,
      studentId: 'STD001',
      avatar: null,
      overallGrade: 'B+',
      attendanceRate: 96.2,
      recentGrades: [
        { subject: 'Mathematics', score: 85, grade: 'B+' },
        { subject: 'English', score: 78, grade: 'B' },
        { subject: 'Physics', score: 88, grade: 'A-' },
        { subject: 'Chemistry', score: 82, grade: 'B+' }
      ]
    },
    {
      id: 2,
      name: 'David Adebayo',
      class: 'JSS 3B',
      age: 14,
      studentId: 'STD002',
      avatar: null,
      overallGrade: 'A-',
      attendanceRate: 94.8,
      recentGrades: [
        { subject: 'Mathematics', score: 92, grade: 'A' },
        { subject: 'English', score: 86, grade: 'B+' },
        { subject: 'Basic Science', score: 89, grade: 'A-' },
        { subject: 'Social Studies', score: 84, grade: 'B+' }
      ]
    }
  ];

  const overviewStats = [
    {
      title: 'My Children',
      value: children.length.toString(),
      subtitle: 'Enrolled students',
      icon: Heart,
      color: 'primary'
    },
    {
      title: 'Avg Attendance',
      value: '95.5%',
      subtitle: 'This term',
      icon: Calendar,
      color: 'secondary'
    },
    {
      title: 'Academic Alerts',
      value: '2',
      subtitle: 'Requires attention',
      icon: AlertTriangle,
      color: 'warning'
    },
    {
      title: 'Upcoming Events',
      value: '3',
      subtitle: 'This week',
      icon: Clock,
      color: 'info'
    }
  ];

  const recentAttendance = [
    { date: 'Today', child: 'Mary Adebayo', status: 'Present', time: '7:45 AM' },
    { date: 'Today', child: 'David Adebayo', status: 'Present', time: '7:50 AM' },
    { date: 'Yesterday', child: 'Mary Adebayo', status: 'Present', time: '7:45 AM' },
    { date: 'Yesterday', child: 'David Adebayo', status: 'Late', time: '8:15 AM' },
    { date: 'Mon, Oct 28', child: 'Mary Adebayo', status: 'Present', time: '7:40 AM' }
  ];

  const academicAlerts = [
    {
      id: 1,
      child: 'Mary Adebayo',
      type: 'grade_drop',
      message: 'Mathematics grade dropped to C+ in recent test',
      severity: 'medium',
      date: '2 days ago',
      action: 'Schedule parent-teacher meeting'
    },
    {
      id: 2,
      child: 'David Adebayo',
      type: 'attendance',
      message: 'Late arrival pattern noticed this week',
      severity: 'low',
      date: '1 day ago',
      action: 'Monitor morning routine'
    }
  ];

  const upcomingEvents = [
    { date: 'Tomorrow', event: 'Parent-Teacher Meeting', time: '2:00 PM', child: 'Mary Adebayo' },
    { date: 'Friday', event: 'Mathematics Quiz', time: '10:00 AM', child: 'David Adebayo' },
    { date: 'Next Week', event: 'Inter-house Sports', time: 'All Day', child: 'Both Children' }
  ];

  const getStatIcon = (color) => {
    const baseClasses = "p-3 rounded-lg w-fit";
    const colorMap = {
      primary: `${baseClasses} bg-primary-100`,
      secondary: `${baseClasses} bg-secondary-100`,
      warning: `${baseClasses} bg-yellow-100`,
      info: `${baseClasses} bg-blue-100`
    };
    return colorMap[color] || colorMap.primary;
  };

  const getStatIconColor = (color) => {
    const colorMap = {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getAttendanceStatusStyle = (status) => {
    const styles = {
      'Present': 'bg-green-100 text-green-700',
      'Absent': 'bg-red-100 text-red-700',
      'Late': 'bg-yellow-100 text-yellow-700'
    };
    return styles[status] || styles.Present;
  };

  const getGradeColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    return colors[severity] || colors.medium;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Welcome back, {user?.name?.split(' ')[1] || user?.name}
          </h1>
          <p className="text-neutral-600 mt-1">{getWelcomeMessage()}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="input-base text-sm w-full sm:w-auto"
          >
            <option value="all">All Children</option>
            {children.map(child => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          
          <button className="btn-primary text-sm py-2 px-4 rounded-lg w-full sm:w-auto">
            Contact Teacher
          </button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => (
          <div key={index} className="card-base">
            <div className="flex items-start justify-between mb-3">
              <div className={getStatIcon(stat.color)}>
                <stat.icon className={`h-6 w-6 ${getStatIconColor(stat.color)}`} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-neutral-700 mb-1">{stat.title}</p>
              <p className="text-xs text-neutral-500">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Children Overview Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {children.map((child) => (
          <div key={child.id} className="card-base">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-primary-600">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900">{child.name}</h3>
                  <p className="text-sm text-neutral-600">{child.class} • Age {child.age}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-neutral-900">{child.overallGrade}</div>
                <div className="text-xs text-neutral-500">Overall Grade</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-lg font-semibold text-neutral-900">{child.attendanceRate}%</div>
                <div className="text-xs text-neutral-600">Attendance</div>
              </div>
              <div className="text-center p-3 bg-neutral-50 rounded-lg">
                <div className="text-lg font-semibold text-neutral-900">{child.recentGrades.length}</div>
                <div className="text-xs text-neutral-600">Subjects</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-700 mb-3">Recent Grades</h4>
              <div className="space-y-2">
                {child.recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700">{grade.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getGradeColor(grade.score)}`}>
                        {grade.score}%
                      </span>
                      <span className="badge-info text-xs">{grade.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Attendance */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Recent Attendance</h3>
          
          <div className="space-y-3">
            {recentAttendance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{item.child}</p>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getAttendanceStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                  <p className="text-xs text-neutral-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn-ghost text-sm py-2 px-4 rounded-lg w-full mt-4">
            View Full Attendance
          </button>
        </div>

        {/* Academic Alerts */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Academic Alerts</h3>
          
          <div className="space-y-3">
            {academicAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{alert.child}</p>
                  </div>
                  <span className="text-xs">{alert.date}</span>
                </div>
                <p className="text-sm mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Action: {alert.action}</span>
                  <button className="text-xs font-medium hover:underline">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {academicAlerts.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-sm text-neutral-600">No alerts at this time</p>
              <p className="text-xs text-neutral-500">Great work!</p>
            </div>
          )}
          
          <button className="btn-ghost text-sm py-2 px-4 rounded-lg w-full mt-4">
            View All Alerts
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Upcoming Events</h3>
          
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg">
                  <Calendar className="h-4 w-4 text-neutral-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {event.event}
                  </p>
                  <p className="text-xs text-neutral-600 mb-1">{event.child}</p>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Clock className="h-3 w-3" />
                    <span>{event.date} at {event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn-ghost text-sm py-2 px-4 rounded-lg w-full mt-4">
            View School Calendar
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-base">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <MessageSquare className="h-5 w-5 text-neutral-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900">Message Teacher</p>
              <p className="text-xs text-neutral-500">Send a message</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <FileText className="h-5 w-5 text-neutral-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900">View Reports</p>
              <p className="text-xs text-neutral-500">Academic reports</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Calendar className="h-5 w-5 text-neutral-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900">Schedule Meeting</p>
              <p className="text-xs text-neutral-500">Parent-teacher meeting</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <TrendingUp className="h-5 w-5 text-neutral-600" />
            <div className="text-left">
              <p className="text-sm font-medium text-neutral-900">Progress Tracking</p>
              <p className="text-xs text-neutral-500">View progress</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
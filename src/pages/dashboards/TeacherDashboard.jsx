// File: src/pages/dashboards/TeacherDashboard.jsx
// Class overview, recent attendance, pending grades

import { useState } from 'react';
import { 
  GraduationCap,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  BookOpen
} from 'lucide-react';
import { useRole } from '../../hooks/useRole';

const TeacherDashboard = () => {
  const { user, getWelcomeMessage } = useRole();
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock teacher's classes and subjects
  const teacherClasses = [
    { class: 'SSS 1A', subject: 'Mathematics', students: 35, attendance: 94.3 },
    { class: 'SSS 2B', subject: 'Mathematics', students: 33, attendance: 91.7 },
    { class: 'JSS 3A', subject: 'Physics', students: 38, attendance: 96.1 }
  ];

  const teachingStats = [
    {
      title: 'My Students',
      value: '106',
      subtitle: 'Total enrolled',
      icon: GraduationCap,
      color: 'primary'
    },
    {
      title: 'Today\'s Classes',
      value: '5',
      subtitle: 'Scheduled periods',
      icon: Calendar,
      color: 'secondary'
    },
    {
      title: 'Pending Grades',
      value: '23',
      subtitle: 'To be entered',
      icon: FileText,
      color: 'accent'
    },
    {
      title: 'Attendance Rate',
      value: '94.1%',
      subtitle: 'This week average',
      icon: CheckCircle,
      color: 'success'
    }
  ];

  const todaySchedule = [
    { time: '8:00 AM', class: 'SSS 1A', subject: 'Mathematics', topic: 'Quadratic Equations', status: 'completed' },
    { time: '9:30 AM', class: 'JSS 3A', subject: 'Physics', topic: 'Forces and Motion', status: 'completed' },
    { time: '11:00 AM', class: 'SSS 2B', subject: 'Mathematics', topic: 'Trigonometry', status: 'current' },
    { time: '1:00 PM', class: 'SSS 1A', subject: 'Mathematics', topic: 'Problem Solving', status: 'upcoming' },
    { time: '2:30 PM', class: 'JSS 3A', subject: 'Physics', topic: 'Laboratory Practical', status: 'upcoming' }
  ];

  const recentAttendance = [
    { date: 'Today', class: 'SSS 1A', present: 33, absent: 2, late: 0 },
    { date: 'Yesterday', class: 'SSS 2B', present: 31, absent: 2, late: 1 },
    { date: 'Yesterday', class: 'JSS 3A', present: 36, absent: 1, late: 1 },
    { date: 'Mon, Oct 28', class: 'SSS 1A', present: 34, absent: 1, late: 0 },
    { date: 'Mon, Oct 28', class: 'SSS 2B', present: 32, absent: 1, late: 0 }
  ];

  const pendingTasks = [
    { id: 1, task: 'Submit SSS 2B Mathematics test scores', priority: 'high', dueDate: 'Today' },
    { id: 2, task: 'Prepare JSS 3A Physics practical report', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, task: 'Update lesson plans for next week', priority: 'low', dueDate: 'Friday' },
    { id: 4, task: 'Parent meeting - Mary Adebayo (SSS 1A)', priority: 'high', dueDate: 'Tomorrow' }
  ];

  const getStatIcon = (color) => {
    const baseClasses = "p-3 rounded-lg w-fit";
    const colorMap = {
      primary: `${baseClasses} bg-primary-100`,
      secondary: `${baseClasses} bg-secondary-100`,
      accent: `${baseClasses} bg-accent-100`,
      success: `${baseClasses} bg-green-100`
    };
    return colorMap[color] || colorMap.primary;
  };

  const getStatIconColor = (color) => {
    const colorMap = {
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
      accent: 'text-accent-600',
      success: 'text-green-600'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getStatusStyle = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-700 border-green-200',
      current: 'bg-blue-100 text-blue-700 border-blue-200',
      upcoming: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return styles[status] || styles.upcoming;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[priority] || colors.medium;
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
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-neutral-500">Subjects:</span>
            {user?.subjects?.map((subject, index) => (
              <span key={index} className="badge-info text-xs">{subject}</span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="input-base text-sm w-full sm:w-auto"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
          </select>
          
          <button className="btn-primary text-sm py-2 px-4 rounded-lg w-full sm:w-auto">
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Teaching Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {teachingStats.map((stat, index) => (
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

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="card-base">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Today's Schedule</h3>
              <Clock className="h-5 w-5 text-neutral-400" />
            </div>
            
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className={`p-4 border rounded-lg ${getStatusStyle(item.status)}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{item.time}</span>
                        <span className="text-sm font-semibold">{item.class}</span>
                        <span className="text-sm text-neutral-600">- {item.subject}</span>
                      </div>
                      <p className="text-sm mt-1 font-medium">{item.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.status === 'completed' && <CheckCircle className="h-4 w-4" />}
                      {item.status === 'current' && <Clock className="h-4 w-4" />}
                      {item.status === 'upcoming' && <Calendar className="h-4 w-4" />}
                      <span className="text-xs font-medium capitalize">{item.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Pending Tasks</h3>
          
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-neutral-900 flex-1">{task.task}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-neutral-500">Due: {task.dueDate}</p>
              </div>
            ))}
          </div>
          
          <button className="btn-ghost text-sm py-2 px-4 rounded-lg w-full mt-4">
            View All Tasks
          </button>
        </div>
      </div>

      {/* My Classes & Recent Attendance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">My Classes</h3>
          
          <div className="space-y-4">
            {teacherClasses.map((item, index) => (
              <div key={index} className="p-4 bg-neutral-50 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-neutral-900">{item.class}</h4>
                    <p className="text-sm text-neutral-600">{item.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">{item.students} students</p>
                    <p className="text-xs text-neutral-500">Enrolled</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Attendance Rate</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.attendance >= 95 ? 'bg-green-100 text-green-700' :
                    item.attendance >= 90 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.attendance}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Recent Attendance</h3>
          
          <div className="space-y-3">
            {recentAttendance.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{item.class}</p>
                  <p className="text-xs text-neutral-500">{item.date}</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{item.present}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>{item.absent}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>{item.late}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="btn-ghost text-sm py-2 px-4 rounded-lg w-full mt-4">
            View Full Attendance
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-primary-100 rounded-lg w-fit mb-3">
            <Calendar className="h-6 w-6 text-primary-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Mark Attendance</h4>
          <p className="text-sm text-neutral-600">Record student attendance for today</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-secondary-100 rounded-lg w-fit mb-3">
            <FileText className="h-6 w-6 text-secondary-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Enter Grades</h4>
          <p className="text-sm text-neutral-600">Submit test and assignment scores</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-accent-100 rounded-lg w-fit mb-3">
            <Users className="h-6 w-6 text-accent-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Student Progress</h4>
          <p className="text-sm text-neutral-600">View individual student reports</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-green-100 rounded-lg w-fit mb-3">
            <BookOpen className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Lesson Plans</h4>
          <p className="text-sm text-neutral-600">Create and manage lesson plans</p>
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
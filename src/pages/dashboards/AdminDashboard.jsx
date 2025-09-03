// File: src/pages/dashboards/AdminDashboard.jsx
// School management overview, recent activities

import { useState } from 'react';
import { 
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Globe
} from 'lucide-react';
import { useRole } from '../../hooks/useRole';

const AdminDashboard = () => {
  const { user, getWelcomeMessage } = useRole();
  const [selectedTerm, setSelectedTerm] = useState('current');

  // Mock school statistics
  const schoolStats = [
    {
      title: 'Total Students',
      value: '650',
      change: '+15',
      trend: 'up',
      icon: GraduationCap,
      color: 'primary',
      subtitle: 'This term'
    },
    {
      title: 'Active Teachers',
      value: '45',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'secondary',
      subtitle: 'Teaching staff'
    },
    {
      title: 'Subjects Offered',
      value: '24',
      change: '+2',
      trend: 'up',
      icon: BookOpen,
      color: 'accent',
      subtitle: 'JSS & SSS'
    },
    {
      title: 'Attendance Rate',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Calendar,
      color: 'success',
      subtitle: 'This week'
    }
  ];

  const classOverview = [
    { level: 'JSS 1', students: 110, classes: 3, avgAttendance: 95.2 },
    { level: 'JSS 2', students: 108, classes: 3, avgAttendance: 93.8 },
    { level: 'JSS 3', students: 105, classes: 3, avgAttendance: 96.1 },
    { level: 'SSS 1', students: 102, classes: 3, avgAttendance: 94.5 },
    { level: 'SSS 2', students: 98, classes: 3, avgAttendance: 92.7 },
    { level: 'SSS 3', students: 75, classes: 2, avgAttendance: 97.3 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'student_enrollment',
      message: 'New student enrolled in SSS 1A',
      details: 'Blessing Okonkwo - Transfer student',
      timestamp: '30 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'website_update',
      message: 'News article published',
      details: 'Inter-house sports competition announcement',
      timestamp: '2 hours ago',
      status: 'info'
    },
    {
      id: 3,
      type: 'grade_submission',
      message: 'Mathematics grades submitted',
      details: 'SSS 2B - First Term Examination',
      timestamp: '4 hours ago',
      status: 'success'
    },
    {
      id: 4,
      type: 'parent_meeting',
      message: 'Parent-Teacher meeting scheduled',
      details: 'JSS 3 Parents - Academic discussion',
      timestamp: '6 hours ago',
      status: 'warning'
    }
  ];

  const pendingTasks = [
    { id: 1, task: 'Review teacher leave applications', urgency: 'high', dueDate: 'Today' },
    { id: 2, task: 'Approve new curriculum changes', urgency: 'medium', dueDate: 'Tomorrow' },
    { id: 3, task: 'Update school calendar', urgency: 'low', dueDate: 'This week' },
    { id: 4, task: 'Process fee payment records', urgency: 'high', dueDate: 'Today' }
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

  const getActivityIcon = (status) => {
    const iconMap = {
      success: CheckCircle,
      warning: AlertCircle,
      info: Globe
    };
    return iconMap[status] || Globe;
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return colors[urgency] || colors.medium;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900">
            Welcome back, {user?.name}
          </h1>
          <p className="text-neutral-600 mt-1">{getWelcomeMessage()}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="input-base text-sm w-full sm:w-auto"
          >
            <option value="current">Current Term</option>
            <option value="previous">Previous Term</option>
            <option value="annual">Annual View</option>
          </select>
          
          <button className="btn-primary text-sm py-2 px-4 rounded-lg w-full sm:w-auto">
            Generate Report
          </button>
        </div>
      </div>

      {/* School Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {schoolStats.map((stat, index) => (
          <div key={index} className="card-base">
            <div className="flex items-start justify-between mb-3">
              <div className={getStatIcon(stat.color)}>
                <stat.icon className={`h-6 w-6 ${getStatIconColor(stat.color)}`} />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {stat.change}
              </span>
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
        {/* Class Overview */}
        <div className="lg:col-span-2">
          <div className="card-base">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Class Overview</h3>
              <TrendingUp className="h-5 w-5 text-neutral-400" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 text-sm font-medium text-neutral-600">Level</th>
                    <th className="text-left py-3 text-sm font-medium text-neutral-600">Students</th>
                    <th className="text-left py-3 text-sm font-medium text-neutral-600">Classes</th>
                    <th className="text-left py-3 text-sm font-medium text-neutral-600">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {classOverview.map((item, index) => (
                    <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3">
                        <span className="font-medium text-neutral-900">{item.level}</span>
                      </td>
                      <td className="py-3 text-neutral-700">{item.students}</td>
                      <td className="py-3 text-neutral-700">{item.classes}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.avgAttendance >= 95 ? 'bg-green-100 text-green-700' :
                          item.avgAttendance >= 90 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.avgAttendance}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(task.urgency)}`}>
                    {task.urgency}
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

      {/* Recent Activities */}
      <div className="card-base">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Recent Activities</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {recentActivities.map((activity) => {
            const ActivityIcon = getActivityIcon(activity.status);
            return (
              <div key={activity.id} className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <ActivityIcon className={`h-4 w-4 ${
                    activity.status === 'success' ? 'text-green-600' :
                    activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 mb-1">{activity.message}</p>
                  <p className="text-sm text-neutral-600 mb-2">{activity.details}</p>
                  <p className="text-xs text-neutral-400">{activity.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-primary-100 rounded-lg w-fit mb-3">
            <GraduationCap className="h-6 w-6 text-primary-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Manage Students</h4>
          <p className="text-sm text-neutral-600">Enroll, edit, or view student records</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-secondary-100 rounded-lg w-fit mb-3">
            <Users className="h-6 w-6 text-secondary-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Manage Staff</h4>
          <p className="text-sm text-neutral-600">Teacher assignments and records</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-accent-100 rounded-lg w-fit mb-3">
            <Globe className="h-6 w-6 text-accent-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Website CMS</h4>
          <p className="text-sm text-neutral-600">Update school website content</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-green-100 rounded-lg w-fit mb-3">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Academic Calendar</h4>
          <p className="text-sm text-neutral-600">Manage terms and events</p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
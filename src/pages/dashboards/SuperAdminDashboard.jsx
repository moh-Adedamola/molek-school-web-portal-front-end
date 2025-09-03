// File: src/pages/dashboards/SuperAdminDashboard.jsx
// System overview, user statistics, school metrics

import { useState } from 'react';
import { 
  Users, 
  School, 
  Database, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { useRole } from '../../hooks/useRole';

const SuperAdminDashboard = () => {
  const { user, getWelcomeMessage } = useRole();
  const [timeframe, setTimeframe] = useState('month');

  // Mock system statistics
  const systemStats = [
    {
      title: 'Total Schools',
      value: '1',
      change: '+0%',
      trend: 'stable',
      icon: School,
      color: 'primary'
    },
    {
      title: 'Total Users',
      value: '847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'secondary'
    },
    {
      title: 'Active Sessions',
      value: '234',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'accent'
    },
    {
      title: 'System Health',
      value: '98.5%',
      change: '+1.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'success'
    }
  ];

  const userBreakdown = [
    { role: 'Students', count: 650, percentage: 76.7 },
    { role: 'Parents', count: 120, percentage: 14.2 },
    { role: 'Teachers', count: 45, percentage: 5.3 },
    { role: 'Administrators', count: 32, percentage: 3.8 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_created',
      message: 'New teacher account created',
      user: 'Mrs. Grace Okafor',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'system_backup',
      message: 'Daily system backup completed',
      user: 'System',
      timestamp: '6 hours ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'login_attempt',
      message: 'Multiple failed login attempts detected',
      user: 'Security Alert',
      timestamp: '8 hours ago',
      status: 'warning'
    },
    {
      id: 4,
      type: 'data_export',
      message: 'Student records exported',
      user: 'Admin User',
      timestamp: '1 day ago',
      status: 'info'
    }
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
      warning: AlertTriangle,
      info: Clock
    };
    return iconMap[status] || Clock;
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
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="input-base text-sm w-full sm:w-auto"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          
          <button className="btn-primary text-sm py-2 px-4 rounded-lg w-full sm:w-auto">
            System Report
          </button>
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <div key={index} className="card-base">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <p className={`text-sm mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-neutral-500'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={getStatIcon(stat.color)}>
                <stat.icon className={`h-6 w-6 ${getStatIconColor(stat.color)}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Breakdown Chart */}
        <div className="lg:col-span-2">
          <div className="card-base">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">User Distribution</h3>
              <BarChart3 className="h-5 w-5 text-neutral-400" />
            </div>
            
            <div className="space-y-4">
              {userBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-neutral-700">{item.role}</span>
                    <span className="text-neutral-600">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card-base">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Recent Activities</h3>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.status);
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className={`p-1 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <ActivityIcon className={`h-3 w-3 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">{activity.message}</p>
                    <p className="text-xs text-neutral-600">{activity.user}</p>
                    <p className="text-xs text-neutral-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="btn-ghost text-sm py-2 px-4 rounded-lg w-full mt-4">
            View All Activities
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-primary-100 rounded-lg w-fit mb-3">
            <Users className="h-6 w-6 text-primary-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">Manage Users</h4>
          <p className="text-sm text-neutral-600">Add, edit, or remove user accounts</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-secondary-100 rounded-lg w-fit mb-3">
            <Database className="h-6 w-6 text-secondary-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">System Backup</h4>
          <p className="text-sm text-neutral-600">Backup and restore system data</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-accent-100 rounded-lg w-fit mb-3">
            <BarChart3 className="h-6 w-6 text-accent-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">System Reports</h4>
          <p className="text-sm text-neutral-600">Generate comprehensive reports</p>
        </button>
        
        <button className="card-base text-left hover:shadow-lg transition-shadow">
          <div className="p-3 bg-green-100 rounded-lg w-fit mb-3">
            <School className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">School Settings</h4>
          <p className="text-sm text-neutral-600">Configure school information</p>
        </button>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
import { useState } from 'react';
import { Shield, Users, School, Database, Activity, TrendingUp, AlertTriangle, Server } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const SuperAdminDashboard = () => {
  const [systemHealth, setSystemHealth] = useState('optimal');
  
  // System-wide statistics
  const systemStats = [
    {
      label: 'Total Schools',
      value: '12',
      change: '+2 this month',
      color: 'primary',
      icon: School
    },
    {
      label: 'Total Users',
      value: '15,847',
      change: '+234 this week',
      color: 'secondary', 
      icon: Users
    },
    {
      label: 'System Uptime',
      value: '99.8%',
      change: 'Last 30 days',
      color: 'success',
      icon: Activity
    },
    {
      label: 'Storage Used',
      value: '2.4TB',
      change: '68% of total',
      color: 'accent',
      icon: Database
    }
  ];

  const schoolStats = [
    {
      name: 'Lagos State Model College',
      students: 1247,
      teachers: 78,
      status: 'active',
      lastSync: '5 min ago',
      performance: 'excellent'
    },
    {
      name: 'Federal Government College Abuja',
      students: 2156,
      teachers: 124,
      status: 'active',
      lastSync: '12 min ago', 
      performance: 'good'
    },
    {
      name: 'Unity Secondary School Port Harcourt',
      students: 987,
      teachers: 65,
      status: 'active',
      lastSync: '1 hour ago',
      performance: 'average'
    },
    {
      name: 'Government Secondary School Kano',
      students: 1534,
      teachers: 89,
      status: 'maintenance',
      lastSync: '2 hours ago',
      performance: 'needs_attention'
    }
  ];

  const systemAlerts = [
    {
      type: 'critical',
      message: 'Database backup failed for GSS Kano',
      time: '15 minutes ago',
      action: 'Retry backup'
    },
    {
      type: 'warning',
      message: 'High CPU usage on server cluster 2',
      time: '1 hour ago',
      action: 'Scale resources'
    },
    {
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      time: '3 hours ago',
      action: 'View report'
    },
    {
      type: 'warning',
      message: 'SSL certificate expires in 7 days',
      time: '6 hours ago',
      action: 'Renew certificate'
    }
  ];

  const recentActivities = [
    {
      type: 'school_added',
      message: 'New school registration: St. Agnes Secondary School',
      user: 'System',
      time: '2 hours ago'
    },
    {
      type: 'user_management',
      message: 'Bulk user import completed - 45 new teacher accounts',
      user: 'admin@system.com',
      time: '4 hours ago'
    },
    {
      type: 'system_update',
      message: 'System update deployed - v2.4.1',
      user: 'System',
      time: '1 day ago'
    },
    {
      type: 'backup',
      message: 'Weekly backup completed successfully',
      user: 'System',
      time: '2 days ago'
    }
  ];

  const performanceMetrics = {
    totalRequests: '1.2M',
    avgResponseTime: '245ms',
    errorRate: '0.02%',
    activeConnections: '2,847'
  };

  const quickActions = [
    { label: 'Add New School', action: 'add_school', color: 'primary', icon: School },
    { label: 'System Backup', action: 'backup', color: 'secondary', icon: Database },
    { label: 'User Management', action: 'users', color: 'accent', icon: Users },
    { label: 'System Reports', action: 'reports', color: 'success', icon: TrendingUp }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-secondary-600 bg-secondary-100';
      case 'maintenance': return 'text-accent-600 bg-accent-100'; 
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'excellent': return 'text-secondary-600';
      case 'good': return 'text-primary-600';
      case 'average': return 'text-accent-600';
      case 'needs_attention': return 'text-red-600';
      default: return 'text-neutral-600';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'border-l-4 border-red-500 bg-red-50';
      case 'warning': return 'border-l-4 border-accent-500 bg-accent-50';
      case 'info': return 'border-l-4 border-primary-500 bg-primary-50';
      default: return 'border-l-4 border-neutral-500 bg-neutral-50';
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Execute ${action}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-800">Super Admin Dashboard</h1>
              <p className="text-neutral-600">System-wide Management & Monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                systemHealth === 'optimal' ? 'bg-secondary-100 text-secondary-800' :
                systemHealth === 'warning' ? 'bg-accent-100 text-accent-800' :
                'bg-red-100 text-red-800'
              }`}>
                <Activity className="w-4 h-4 inline mr-1" />
                System {systemHealth}
              </div>
              <Button variant="primary" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Security Center
              </Button>
            </div>
          </div>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${
                      stat.color === 'primary' ? 'text-primary-600' :
                      stat.color === 'secondary' ? 'text-secondary-600' :
                      stat.color === 'accent' ? 'text-accent-600' :
                      stat.color === 'success' ? 'text-secondary-600' : 'text-primary-600'
                    }`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    stat.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                    stat.color === 'secondary' ? 'bg-secondary-100 text-secondary-600' :
                    stat.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                    stat.color === 'success' ? 'bg-secondary-100 text-secondary-600' : 'bg-primary-100 text-primary-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schools Overview */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Schools Overview</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {schoolStats.map((school, index) => (
                    <div key={index} className="p-4 rounded-lg border border-neutral-200 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-neutral-800">{school.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(school.status)}`}>
                          {school.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-neutral-600">Students</p>
                          <p className="font-medium">{school.students.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-neutral-600">Teachers</p>
                          <p className="font-medium">{school.teachers}</p>
                        </div>
                        <div>
                          <p className="text-neutral-600">Performance</p>
                          <p className={`font-medium ${getPerformanceColor(school.performance)}`}>
                            {school.performance.replace('_', ' ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-neutral-600">Last Sync</p>
                          <p className="font-medium">{school.lastSync}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* System Resources */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title className="text-primary-800">System Resources</Card.Title>
                  <Server className="w-5 h-5 text-primary-600" />
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-neutral-600">CPU Usage</span>
                      <span className="text-sm font-medium">64%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-accent-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-neutral-600">Memory</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-neutral-600">Storage</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">System Performance</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{performanceMetrics.totalRequests}</p>
                    <p className="text-sm text-neutral-600">Total Requests</p>
                    <p className="text-xs text-neutral-500">Last 24 hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary-600">{performanceMetrics.avgResponseTime}</p>
                    <p className="text-sm text-neutral-600">Avg Response Time</p>
                    <p className="text-xs text-neutral-500">Last hour</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-600">{performanceMetrics.errorRate}</p>
                    <p className="text-sm text-neutral-600">Error Rate</p>
                    <p className="text-xs text-neutral-500">Last 24 hours</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{performanceMetrics.activeConnections}</p>
                    <p className="text-sm text-neutral-600">Active Connections</p>
                    <p className="text-xs text-neutral-500">Right now</p>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Quick Actions</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        variant={action.color}
                        size="sm"
                        onClick={() => handleQuickAction(action.action)}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <IconComponent className="w-5 h-5 mb-2" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title className="text-primary-800">System Alerts</Card.Title>
                  <AlertTriangle className="w-5 h-5 text-accent-600" />
                </div>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg ${getAlertColor(alert.type)}`}>
                      <p className="text-sm font-medium text-neutral-800">{alert.message}</p>
                      <p className="text-xs text-neutral-600 mt-1">{alert.time}</p>
                      <Button 
                        variant="secondary" 
                        size="xs"
                        className="mt-2"
                      >
                        {alert.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Recent Activities</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-800">{activity.message}</p>
                        <p className="text-xs text-neutral-500">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
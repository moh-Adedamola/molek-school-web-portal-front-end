import { useState } from 'react';
import { Calendar, Users, BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [selectedTerm, setSelectedTerm] = useState('2024/2025 - 1st Term');

  // Mock dashboard data
  const stats = [
    { 
      label: 'Total Students', 
      value: '1,247', 
      change: '+12 this month',
      color: 'primary',
      icon: Users 
    },
    { 
      label: 'Active Teachers', 
      value: '78', 
      change: '+3 new hires',
      color: 'secondary',
      icon: Users 
    },
    { 
      label: 'Classes', 
      value: '36', 
      change: '6 levels (JSS 1-3, SSS 1-3)',
      color: 'accent',
      icon: BookOpen 
    },
    { 
      label: 'Fee Collection', 
      value: '89.5%', 
      change: 'This term',
      color: 'success',
      icon: DollarSign 
    }
  ];

  const recentActivities = [
    {
      type: 'enrollment',
      message: '15 new students enrolled in JSS 1',
      time: '2 hours ago',
      status: 'success'
    },
    {
      type: 'attendance',
      message: 'Daily attendance report generated',
      time: '4 hours ago',
      status: 'info'
    },
    {
      type: 'payment',
      message: '23 fee payments received today',
      time: '6 hours ago',
      status: 'success'
    },
    {
      type: 'alert',
      message: 'Low attendance alert for SSS 2B',
      time: '8 hours ago',
      status: 'warning'
    }
  ];

  const quickActions = [
    { label: 'Add New Student', action: 'student', color: 'primary' },
    { label: 'Manage Teachers', action: 'teacher', color: 'secondary' },
    { label: 'View Reports', action: 'reports', color: 'accent' },
    { label: 'Fee Management', action: 'fees', color: 'success' }
  ];

  const upcomingEvents = [
    { date: '15 Jan', event: 'Mid-term Examinations Begin', type: 'academic' },
    { date: '22 Jan', event: 'PTA Meeting', type: 'meeting' },
    { date: '30 Jan', event: 'Inter-house Sports', type: 'sports' },
    { date: '5 Feb', event: 'Report Card Distribution', type: 'academic' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-secondary-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-accent-600" />;
      default: return <Clock className="w-4 h-4 text-primary-600" />;
    }
  };

  const handleQuickAction = (action) => {
    // Navigation logic will be added when management pages are implemented
    console.log(`Navigate to ${action} management`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-800">Admin Dashboard</h1>
              <p className="text-neutral-600">School Management Overview</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="2024/2025 - 1st Term">2024/2025 - 1st Term</option>
                <option value="2024/2025 - 2nd Term">2024/2025 - 2nd Term</option>
                <option value="2024/2025 - 3rd Term">2024/2025 - 3rd Term</option>
              </select>
              <Button variant="primary" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
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
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Recent Activities</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-neutral-50">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <p className="text-sm text-neutral-800">{activity.message}</p>
                        <p className="text-xs text-neutral-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white mt-6" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Quick Actions</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.color}
                      size="sm"
                      onClick={() => handleQuickAction(action.action)}
                      className="text-center"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Upcoming Events</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-50">
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs text-neutral-500">JAN</p>
                        <p className="text-lg font-bold text-primary-600">{event.date.split(' ')[0]}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-800">{event.event}</p>
                        <p className={`text-xs ${
                          event.type === 'academic' ? 'text-primary-600' :
                          event.type === 'meeting' ? 'text-secondary-600' :
                          event.type === 'sports' ? 'text-accent-600' : 'text-neutral-500'
                        }`}>
                          {event.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Performance Summary */}
            <Card className="bg-white mt-6" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Performance Summary</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Overall Attendance</span>
                    <span className="text-sm font-medium text-secondary-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Average Grade</span>
                    <span className="text-sm font-medium text-primary-600">B+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Parent Engagement</span>
                    <span className="text-sm font-medium text-accent-600">87.5%</span>
                  </div>
                  <div className="pt-4">
                    <Button variant="secondary" size="sm" className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Detailed Reports
                    </Button>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
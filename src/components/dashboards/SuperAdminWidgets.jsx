// File: src/components/dashboards/SuperAdminWidgets.jsx
import { 
  Users, 
  Shield, 
  Server, 
  Activity,
  Database,
  AlertTriangle
} from 'lucide-react';
import { StatCard, QuickActionCard, RecentActivityWidget } from './CommonWidgets';

const SuperAdminWidgets = () => {
  const systemStats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: 12,
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Active Schools',
      value: '1',
      change: 0,
      icon: Shield,
      color: 'secondary'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: 0.1,
      icon: Server,
      color: 'success'
    },
    {
      title: 'Data Storage',
      value: '2.4 GB',
      change: 8,
      icon: Database,
      color: 'accent'
    }
  ];

  const quickActions = [
    {
      title: 'Create New User',
      description: 'Add admin, teacher, or parent account',
      icon: Users,
      color: 'primary',
      action: () => console.log('Create user')
    },
    {
      title: 'System Backup',
      description: 'Create full system backup',
      icon: Database,
      color: 'secondary',
      action: () => console.log('System backup')
    },
    {
      title: 'View Reports',
      description: 'System-wide analytics and reports',
      icon: Activity,
      color: 'accent',
      action: () => console.log('View reports')
    }
  ];

  const systemActivities = [
    {
      message: 'New admin user "Jane Smith" created',
      time: '2 hours ago'
    },
    {
      message: 'System backup completed successfully',
      time: '1 day ago'
    },
    {
      message: 'Database maintenance performed',
      time: '2 days ago'
    },
    {
      message: 'Security update applied',
      time: '3 days ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* System Health Alert */}
      <div className="card-base border-l-4 border-secondary-600 bg-secondary-50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-secondary-600 mt-1" />
          <div>
            <h3 className="font-semibold text-secondary-800">System Status: Healthy</h3>
            <p className="text-sm text-secondary-700 mt-1">
              All systems operational. Last security scan: 24 hours ago.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">System Controls</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent System Activity */}
        <RecentActivityWidget activities={systemActivities} />
      </div>
    </div>
  );
};

export default SuperAdminWidgets;
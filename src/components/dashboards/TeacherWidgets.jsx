// File: src/components/dashboards/TeacherWidgets.jsx
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  TrendingUp,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { StatCard, QuickActionCard, RecentActivityWidget, ProgressWidget } from './CommonWidgets';

const TeacherWidgets = () => {
  const classStats = [
    {
      title: 'My Students',
      value: '156',
      change: 3,
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Classes Today',
      value: '5',
      change: 0,
      icon: BookOpen,
      color: 'secondary'
    },
    {
      title: 'Attendance Rate',
      value: '94%',
      change: 2,
      icon: Calendar,
      color: 'success'
    },
    {
      title: 'Pending Grades',
      value: '12',
      change: -25,
      icon: ClipboardCheck,
      color: 'accent'
    }
  ];

  const quickActions = [
    {
      title: 'Mark Attendance',
      description: 'Record today\'s class attendance',
      icon: Calendar,
      color: 'primary',
      action: () => console.log('Mark attendance')
    },
    {
      title: 'Enter Grades',
      description: 'Update student assessment scores',
      icon: ClipboardCheck,
      color: 'secondary',
      action: () => console.log('Enter grades')
    },
    {
      title: 'View Progress',
      description: 'Check student performance trends',
      icon: TrendingUp,
      color: 'accent',
      action: () => console.log('View progress')
    }
  ];

  const teachingActivities = [
    {
      message: 'Attendance marked for Mathematics JSS 2A',
      time: '30 minutes ago'
    },
    {
      message: 'Test scores entered for Chemistry SSS 1',
      time: '2 hours ago'
    },
    {
      message: 'Progress report generated for Kemi Adebayo',
      time: '1 day ago'
    },
    {
      message: 'Parent meeting scheduled with Mr. Okonkwo',
      time: '2 days ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Teaching Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {classStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Today's Schedule Alert */}
      <div className="card-base border-l-4 border-accent-600 bg-accent-50">
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-accent-600 mt-1" />
          <div>
            <h3 className="font-semibold text-accent-800">Today's Schedule</h3>
            <p className="text-sm text-accent-700 mt-1">
              5 classes scheduled • Next: Mathematics JSS 2A at 10:30 AM
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Teaching Tools</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Teaching Activity */}
        <RecentActivityWidget activities={teachingActivities} />
      </div>

      {/* Class Performance Overview */}
      <div className="card-base">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Class Performance Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <ProgressWidget 
              title="JSS 2A Mathematics" 
              current={28} 
              total={35} 
              color="secondary"
            />
            <ProgressWidget 
              title="SSS 1 Chemistry" 
              current={32} 
              total={38} 
              color="primary"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-800">Top Performing</span>
              </div>
              <span className="text-sm text-secondary-600">JSS 2A</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-accent-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-accent-600" />
                <span className="text-sm font-medium text-accent-800">Needs Attention</span>
              </div>
              <span className="text-sm text-accent-600">SSS 1 Chemistry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherWidgets;
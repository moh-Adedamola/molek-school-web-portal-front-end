// File: src/components/dashboards/AdminWidgets.jsx
import { 
  GraduationCap, 
  UserCheck, 
  Users, 
  BookOpen,
  Calendar,
  Globe,
  TrendingUp,
  FileText
} from 'lucide-react';
import { StatCard, QuickActionCard, RecentActivityWidget, ProgressWidget } from './CommonWidgets';

const AdminWidgets = () => {
  const schoolStats = [
    {
      title: 'Total Students',
      value: '847',
      change: 5,
      icon: GraduationCap,
      color: 'primary'
    },
    {
      title: 'Teaching Staff',
      value: '42',
      change: 2,
      icon: UserCheck,
      color: 'secondary'
    },
    {
      title: 'Parent Accounts',
      value: '623',
      change: 8,
      icon: Users,
      color: 'accent'
    },
    {
      title: 'Active Classes',
      value: '24',
      change: 0,
      icon: BookOpen,
      color: 'success'
    }
  ];

  const quickActions = [
    {
      title: 'Enroll New Student',
      description: 'Add student to JSS/SSS classes',
      icon: GraduationCap,
      color: 'primary',
      action: () => console.log('Enroll student')
    },
    {
      title: 'Update Website',
      description: 'Manage school website content',
      icon: Globe,
      color: 'secondary',
      action: () => console.log('Update website')
    },
    {
      title: 'Generate Reports',
      description: 'Academic and attendance reports',
      icon: FileText,
      color: 'accent',
      action: () => console.log('Generate reports')
    }
  ];

  const schoolActivities = [
    {
      message: 'New student "Adebayo Michael" enrolled in SSS 2',
      time: '1 hour ago'
    },
    {
      message: 'Teacher "Mrs. Okafor" assigned to Mathematics JSS 1',
      time: '3 hours ago'
    },
    {
      message: 'School fees payment received from 15 students',
      time: '5 hours ago'
    },
    {
      message: 'Website news article published',
      time: '1 day ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* School Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {schoolStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Academic Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ProgressWidget 
          title="Term Attendance" 
          current={92} 
          total={100} 
          color="secondary"
        />
        <ProgressWidget 
          title="Fee Collection" 
          current={735} 
          total={847} 
          color="accent"
        />
        <ProgressWidget 
          title="Grade Entry Progress" 
          current={18} 
          total={24} 
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">School Management</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent School Activity */}
        <RecentActivityWidget activities={schoolActivities} />
      </div>

      {/* Academic Calendar Widget */}
      <div className="card-base">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Academic Calendar</h3>
          <Calendar className="h-5 w-5 text-primary-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-primary-50 rounded-lg">
            <p className="text-sm font-medium text-primary-800">Current Term</p>
            <p className="text-lg font-bold text-primary-600">2nd Term</p>
            <p className="text-xs text-primary-600">Jan - Apr 2025</p>
          </div>
          <div className="text-center p-3 bg-secondary-50 rounded-lg">
            <p className="text-sm font-medium text-secondary-800">Days Remaining</p>
            <p className="text-lg font-bold text-secondary-600">42 Days</p>
            <p className="text-xs text-secondary-600">Until term end</p>
          </div>
          <div className="text-center p-3 bg-accent-50 rounded-lg">
            <p className="text-sm font-medium text-accent-800">Next Event</p>
            <p className="text-lg font-bold text-accent-600">WAEC Exam</p>
            <p className="text-xs text-accent-600">SSS 3 Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWidgets;
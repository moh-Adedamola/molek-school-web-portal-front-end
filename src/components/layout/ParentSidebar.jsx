// File: src/components/layout/ParentSidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  Heart, 
  Calendar, 
  FileText, 
  TrendingUp,
  MessageSquare,
  User,
  Baby
} from 'lucide-react';

const ParentSidebar = () => {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/parent/dashboard',
      icon: TrendingUp
    },
    {
      label: 'My Children',
      path: '/parent/children',
      icon: Baby
    },
    {
      label: 'Attendance Records',
      path: '/parent/attendance',
      icon: Calendar
    },
    {
      label: 'Academic Reports',
      path: '/parent/reports',
      icon: FileText
    },
    {
      label: 'Progress Analytics',
      path: '/parent/analytics',
      icon: TrendingUp
    },
    {
      label: 'Communication',
      path: '/parent/communication',
      icon: MessageSquare
    }
  ];

  return (
    <div className="h-full bg-primary-600 text-white flex flex-col">
      {/* Logo section */}
      <div className="p-4 border-b border-primary-500">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-secondary-400" />
          <div>
            <h2 className="font-semibold text-lg">Parent Portal</h2>
            <p className="text-primary-200 text-sm">Child Progress</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-secondary-600 text-white'
                        : 'text-primary-100 hover:bg-primary-500 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-500">
        <div className="flex items-center space-x-2 text-primary-200">
          <User className="h-4 w-4" />
          <span className="text-sm">Parent Account</span>
        </div>
      </div>
    </div>
  );
};

export default ParentSidebar;
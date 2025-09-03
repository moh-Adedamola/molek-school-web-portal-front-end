// File: src/components/layout/SuperAdminSidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Database,
  School,
  Shield
} from 'lucide-react';

const SuperAdminSidebar = () => {
  const navItems = [
    {
      label: 'System Overview',
      path: '/super-admin/dashboard',
      icon: BarChart3
    },
    {
      label: 'User Management',
      path: '/super-admin/users',
      icon: Users
    },
    {
      label: 'School Settings',
      path: '/super-admin/settings',
      icon: Settings
    },
    {
      label: 'System Reports',
      path: '/super-admin/reports',
      icon: BarChart3
    },
    {
      label: 'Backup & Restore',
      path: '/super-admin/backup',
      icon: Database
    }
  ];

  return (
    <div className="h-full bg-primary-800 text-white flex flex-col">
      {/* Logo section */}
      <div className="p-4 border-b border-primary-700">
        <div className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-accent-400" />
          <div>
            <h2 className="font-semibold text-lg">Super Admin</h2>
            <p className="text-primary-200 text-sm">System Control</p>
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
                        ? 'bg-accent-600 text-white'
                        : 'text-primary-100 hover:bg-primary-700 hover:text-white'
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
      <div className="p-4 border-t border-primary-700">
        <div className="flex items-center space-x-2 text-primary-200">
          <School className="h-4 w-4" />
          <span className="text-sm">System Administrator</span>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
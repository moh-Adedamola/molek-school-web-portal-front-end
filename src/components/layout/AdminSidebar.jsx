// File: src/components/layout/AdminSidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  Globe, 
  Users, 
  GraduationCap, 
  UserCheck,
  BookOpen,
  Calendar,
  BarChart3,
  School
} from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: BarChart3
    },
    {
      label: 'Website CMS',
      path: '/admin/website',
      icon: Globe
    },
    {
      label: 'Student Management',
      path: '/admin/students',
      icon: GraduationCap
    },
    {
      label: 'Teacher Management',
      path: '/admin/teachers',
      icon: UserCheck
    },
    {
      label: 'Parent Management',
      path: '/admin/parents',
      icon: Users
    },
    {
      label: 'Class Management',
      path: '/admin/classes',
      icon: BookOpen
    },
    {
      label: 'Academic Reports',
      path: '/admin/reports',
      icon: Calendar
    }
  ];

  return (
    <div className="h-full bg-primary-700 text-white flex flex-col">
      {/* Logo section */}
      <div className="p-4 border-b border-primary-600">
        <div className="flex items-center space-x-3">
          <School className="h-8 w-8 text-secondary-400" />
          <div>
            <h2 className="font-semibold text-lg">School Admin</h2>
            <p className="text-primary-200 text-sm">Management Portal</p>
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
                        : 'text-primary-100 hover:bg-primary-600 hover:text-white'
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
      <div className="p-4 border-t border-primary-600">
        <div className="flex items-center space-x-2 text-primary-200">
          <School className="h-4 w-4" />
          <span className="text-sm">School Administrator</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
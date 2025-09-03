// File: src/components/layout/TeacherSidebar.jsx
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  TrendingUp,
  FileText,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const TeacherSidebar = () => {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/teacher/dashboard',
      icon: TrendingUp
    },
    {
      label: 'My Students',
      path: '/teacher/students',
      icon: Users
    },
    {
      label: 'Mark Attendance',
      path: '/teacher/attendance',
      icon: Calendar
    },
    {
      label: 'Grade Entry',
      path: '/teacher/grades',
      icon: ClipboardCheck
    },
    {
      label: 'Student Progress',
      path: '/teacher/progress',
      icon: TrendingUp
    },
    {
      label: 'Individual Reports',
      path: '/teacher/individual-reports',
      icon: FileText
    },
    {
      label: 'Subject Reports',
      path: '/teacher/subject-reports',
      icon: BookOpen
    }
  ];

  return (
    <div className="h-full bg-primary-600 text-white flex flex-col">
      {/* Logo section */}
      <div className="p-4 border-b border-primary-500">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-8 w-8 text-secondary-400" />
          <div>
            <h2 className="font-semibold text-lg">Teacher Portal</h2>
            <p className="text-primary-200 text-sm">Academic Tools</p>
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
          <BookOpen className="h-4 w-4" />
          <span className="text-sm">Academic Year 2024/25</span>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;
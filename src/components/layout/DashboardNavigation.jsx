import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  X, 
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  UserCheck,
  ClipboardList,
  Award,
  Globe,
  UserCog,
  Home
} from 'lucide-react';

const DashboardNavigation = ({ onCloseSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(['dashboard']);

  const navigationSections = [
    {
      id: 'main',
      name: 'Main Menu',
      items: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          name: 'Website',
          href: '/',
          icon: Home,
          badge: null,
          external: true,
        },
      ]
    },
    {
      id: 'management',
      name: 'Management',
      items: [
        {
          name: 'Student Management',
          href: '/management/students',
          icon: Users,
          badge: '245',
          submenu: [
            { name: 'All Students', href: '/management/students' },
            { name: 'JSS Students', href: '/management/students?level=jss' },
            { name: 'SSS Students', href: '/management/students?level=sss' },
            { name: 'Add New Student', href: '/management/students/add' },
          ]
        },
        {
          name: 'Teacher Management',
          href: '/management/teachers',
          icon: UserCog,
          badge: '24',
          submenu: [
            { name: 'All Teachers', href: '/management/teachers' },
            { name: 'Subject Teachers', href: '/management/teachers?type=subject' },
            { name: 'Form Teachers', href: '/management/teachers?type=form' },
            { name: 'Add New Teacher', href: '/management/teachers/add' },
          ]
        },
        {
          name: 'Parent Management',
          href: '/management/parents',
          icon: Users,
          badge: '198',
        },
        {
          name: 'Admin Management',
          href: '/management/admins',
          icon: UserCog,
          badge: '5',
        },
        {
          name: 'Class Management',
          href: '/management/classes',
          icon: BookOpen,
          badge: '12',
          submenu: [
            { name: 'JSS Classes', href: '/management/classes?level=jss' },
            { name: 'SSS Classes', href: '/management/classes?level=sss' },
            { name: 'Class Assignments', href: '/management/classes/assignments' },
          ]
        },
        {
          name: 'Subject Management',
          href: '/management/subjects',
          icon: BookOpen,
          badge: '18',
        },
      ]
    },
    {
      id: 'academics',
      name: 'Academics',
      items: [
        {
          name: 'Attendance',
          href: '/academics/attendance',
          icon: UserCheck,
          submenu: [
            { name: 'Mark Attendance', href: '/academics/attendance/mark' },
            { name: 'Attendance Reports', href: '/academics/attendance/reports' },
            { name: 'Attendance Analytics', href: '/academics/attendance/analytics' },
          ]
        },
        {
          name: 'Grades & Results',
          href: '/academics/grades',
          icon: Award,
          submenu: [
            { name: 'Grade Entry', href: '/academics/grades/entry' },
            { name: 'Grade Reports', href: '/academics/grades/reports' },
            { name: 'Grade Analytics', href: '/academics/grades/analytics' },
            { name: 'WAEC Results', href: '/academics/grades/waec' },
          ]
        },
        {
          name: 'Academic Calendar',
          href: '/academics/calendar',
          icon: Calendar,
        },
        {
          name: 'Examinations',
          href: '/academics/examinations',
          icon: ClipboardList,
          submenu: [
            { name: 'Exam Schedule', href: '/academics/examinations/schedule' },
            { name: 'Exam Results', href: '/academics/examinations/results' },
            { name: 'WAEC Registration', href: '/academics/examinations/waec' },
          ]
        },
      ]
    },
    {
      id: 'reports',
      name: 'Reports & Analytics',
      items: [
        {
          name: 'Analytics Dashboard',
          href: '/reports/analytics',
          icon: BarChart3,
        },
        {
          name: 'Academic Reports',
          href: '/reports/academic',
          icon: ClipboardList,
        },
        {
          name: 'Financial Reports',
          href: '/reports/financial',
          icon: BarChart3,
        },
      ]
    },
    {
      id: 'website',
      name: 'Website Management',
      items: [
        {
          name: 'Website CMS',
          href: '/management/website',
          icon: Globe,
          submenu: [
            { name: 'Content Management', href: '/management/website/content' },
            { name: 'News & Events', href: '/management/website/news' },
            { name: 'Gallery Management', href: '/management/website/gallery' },
            { name: 'Staff Directory', href: '/management/website/staff' },
          ]
        },
      ]
    }
  ];

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const hasActiveSubmenu = (item) => {
    if (!item.submenu) return false;
    return item.submenu.some(subItem => isActive(subItem.href));
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/auth/login');
  };

  return (
    <div className="h-full flex flex-col bg-primary-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-800">
        <Link to="/" className="flex items-center space-x-3">
          <div className="p-2 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Molek School</h1>
            <p className="text-xs text-primary-200 -mt-1">Admin Portal</p>
          </div>
        </Link>
        
        {/* Close button for mobile */}
        <button
          onClick={onCloseSidebar}
          className="lg:hidden p-2 rounded-lg text-primary-200 hover:text-white hover:bg-primary-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-6">
          {navigationSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between text-xs font-semibold text-primary-300 uppercase tracking-wider mb-3 hover:text-primary-200"
              >
                {section.name}
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedSections.includes(section.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections.includes(section.id) && (
                <div className="space-y-1 mb-6">
                  {section.items.map((item) => (
                    <div key={item.name}>
                      {/* Main item */}
                      <Link
                        to={item.external ? item.href : item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive(item.href) || hasActiveSubmenu(item)
                            ? 'bg-primary-700 text-white shadow-lg'
                            : 'text-primary-200 hover:bg-primary-800 hover:text-white'
                        }`}
                        onClick={() => {
                          if (item.submenu) {
                            toggleSection(`${section.id}-${item.name}`);
                          } else if (onCloseSidebar) {
                            onCloseSidebar();
                          }
                        }}
                      >
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.badge && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-600 text-white">
                              {item.badge}
                            </span>
                          )}
                          {item.submenu && (
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform duration-200 ${
                                expandedSections.includes(`${section.id}-${item.name}`) ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </div>
                      </Link>

                      {/* Submenu */}
                      {item.submenu && expandedSections.includes(`${section.id}-${item.name}`) && (
                        <div className="ml-8 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                isActive(subItem.href)
                                  ? 'bg-primary-600 text-white'
                                  : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                              }`}
                              onClick={onCloseSidebar}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-800">
        <div className="space-y-2">
          <Link
            to="/settings"
            className="flex items-center px-3 py-2 text-sm font-medium text-primary-200 rounded-lg hover:bg-primary-800 hover:text-white transition-colors duration-200"
            onClick={onCloseSidebar}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
          <Link
            to="/help"
            className="flex items-center px-3 py-2 text-sm font-medium text-primary-200 rounded-lg hover:bg-primary-800 hover:text-white transition-colors duration-200"
            onClick={onCloseSidebar}
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            Help & Support
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-400 rounded-lg hover:bg-red-900 hover:bg-opacity-20 hover:text-red-300 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>

        {/* User info */}
        <div className="mt-4 pt-4 border-t border-primary-800">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-primary-300 truncate">Super Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;
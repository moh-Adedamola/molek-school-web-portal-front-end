import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  User,
  ChevronDown,
  UserCheck,
  ClipboardList,
  Award,
  FileText,
  Shield,
  Globe
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: `/portal/${user?.role === 'super_admin' ? '' : user?.role}`,
        icon: Home,
        exact: true
      }
    ];

    switch (user?.role) {
      case 'super_admin':
        return [
          ...baseItems,
          {
            name: 'System Overview',
            href: '/portal',
            icon: BarChart3,
            exact: true
          },
          {
            name: 'Admin Management',
            href: '/portal/admin/users',
            icon: Shield
          },
          {
            name: 'School Management',
            icon: Settings,
            children: [
              { name: 'Students', href: '/portal/admin/students' },
              { name: 'Teachers', href: '/portal/admin/teachers' },
              { name: 'Parents', href: '/portal/admin/parents' },
              { name: 'Classes', href: '/portal/admin/classes' },
              { name: 'Subjects', href: '/portal/admin/subjects' }
            ]
          },
          {
            name: 'Website CMS',
            href: '/portal/admin/website',
            icon: Globe
          }
        ];

      case 'admin':
        return [
          ...baseItems,
          {
            name: 'Students',
            href: '/portal/admin/students',
            icon: GraduationCap
          },
          {
            name: 'Teachers',
            href: '/portal/admin/teachers',
            icon: Users
          },
          {
            name: 'Parents',
            href: '/portal/admin/parents',
            icon: User
          },
          {
            name: 'Academic Management',
            icon: BookOpen,
            children: [
              { name: 'Classes', href: '/portal/admin/classes' },
              { name: 'Subjects', href: '/portal/admin/subjects' },
              { name: 'Attendance Reports', href: '/portal/teacher/attendance/reports' },
              { name: 'Grade Reports', href: '/portal/teacher/grades/reports' }
            ]
          },
          {
            name: 'Website CMS',
            href: '/portal/admin/website',
            icon: Globe
          }
        ];

      case 'teacher':
        return [
          ...baseItems,
          {
            name: 'Attendance',
            icon: UserCheck,
            children: [
              { name: 'Mark Attendance', href: '/portal/teacher/attendance' },
              { name: 'Analytics', href: '/portal/teacher/attendance/analytics' },
              { name: 'Reports', href: '/portal/teacher/attendance/reports' }
            ]
          },
          {
            name: 'Grades',
            icon: Award,
            children: [
              { name: 'Enter Grades', href: '/portal/teacher/grades' },
              { name: 'Analytics', href: '/portal/teacher/grades/analytics' },
              { name: 'Reports', href: '/portal/teacher/grades/reports' }
            ]
          },
          {
            name: 'My Classes',
            href: '/portal/teacher/classes',
            icon: BookOpen
          }
        ];

      case 'parent':
        return [
          ...baseItems,
          {
            name: 'My Children',
            href: '/portal/parent/children',
            icon: Users
          },
          {
            name: 'Attendance',
            href: '/portal/parent/attendance',
            icon: Calendar
          },
          {
            name: 'Grades',
            href: '/portal/parent/grades',
            icon: Award
          },
          {
            name: 'Reports',
            href: '/portal/parent/reports',
            icon: FileText
          }
        ];

      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const isActiveLink = (href, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const NavItem = ({ item, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;

    useEffect(() => {
      if (hasChildren) {
        const isChildActive = item.children.some(child => 
          location.pathname.startsWith(child.href)
        );
        setIsOpen(isChildActive);
      }
    }, [location.pathname, hasChildren, item.children]);

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg
              transition-colors duration-200 group
              ${depth > 0 ? 'pl-6' : ''}
              text-gray-300 hover:bg-blue-800 hover:text-white
            `}
          >
            <div className="flex items-center">
              {item.icon && <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />}
              <span className="truncate">{item.name}</span>
            </div>
            <ChevronDown 
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          {isOpen && (
            <div className="space-y-1 ml-4">
              {item.children.map((child) => (
                <NavItem key={child.href} item={child} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        to={item.href}
        className={`
          flex items-center px-3 py-2 text-sm font-medium rounded-lg
          transition-colors duration-200 group
          ${depth > 0 ? 'pl-6' : ''}
          ${isActiveLink(item.href, item.exact)
            ? 'bg-blue-800 text-white'
            : 'text-gray-300 hover:bg-blue-800 hover:text-white'
          }
        `}
      >
        {item.icon && <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />}
        <span className="truncate">{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center justify-between h-16 px-4 bg-blue-800">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2">
                <GraduationCap className="w-5 h-5 text-blue-900" />
              </div>
              <span className="text-white font-bold text-lg truncate">
                School Portal
              </span>
            </Link>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-white hover:bg-blue-700 rounded-lg lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* User info */}
          <div className="p-4 border-b border-blue-800">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-white font-medium text-sm truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-blue-200 text-xs capitalize truncate">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavItem key={item.href || item.name} item={item} />
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-blue-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className={`flex-1 ${isMobile ? '' : 'lg:ml-64'}`}>
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden mr-2"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              {/* Breadcrumb or page title */}
              <h1 className="text-xl font-semibold text-gray-800 truncate">
                {location.pathname === '/portal' || location.pathname === `/portal/${user?.role}` 
                  ? 'Dashboard' 
                  : location.pathname.split('/').pop()?.replace('-', ' ')?.replace(/\b\w/g, l => l.toUpperCase())
                }
              </h1>
            </div>

            {/* Right side - notifications and user menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium truncate max-w-32">
                    {user?.firstName}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role?.replace('_', ' ')}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  Image, 
  Phone,
  LogIn
} from 'lucide-react';

const WebsiteNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'About Us',
      href: '/about',
      icon: Users,
      dropdown: [
        { name: 'About Our School', href: '/about', icon: BookOpen },
        { name: 'Vision & Mission', href: '/about/vision-mission', icon: FileText },
        { name: 'School History', href: '/about/history', icon: Calendar },
        { name: 'Leadership Team', href: '/about/leadership', icon: Users },
        { name: 'Staff Directory', href: '/about/staff', icon: Users },
      ]
    },
    {
      name: 'Academics',
      href: '/academics',
      icon: BookOpen,
      dropdown: [
        { name: 'Academic Programs', href: '/academics', icon: BookOpen },
        { name: 'Subjects Offered', href: '/academics/subjects', icon: BookOpen },
        { name: 'Curriculum', href: '/academics/curriculum', icon: FileText },
        { name: 'Academic Calendar', href: '/academics/calendar', icon: Calendar },
      ]
    },
    {
      name: 'Admissions',
      href: '/admissions',
      icon: FileText,
      dropdown: [
        { name: 'Admission Process', href: '/admissions', icon: FileText },
        { name: 'Requirements', href: '/admissions/requirements', icon: FileText },
        { name: 'How to Apply', href: '/admissions/how-to-apply', icon: FileText },
        { name: 'Tuition & Fees', href: '/admissions/tuition-fees', icon: FileText },
      ]
    },
    {
      name: 'News & Events',
      href: '/news-events',
      icon: Calendar,
      dropdown: [
        { name: 'Latest News', href: '/news-events', icon: Calendar },
        { name: 'Announcements', href: '/news-events/announcements', icon: FileText },
        { name: 'Events Calendar', href: '/news-events/calendar', icon: Calendar },
        { name: 'Newsletter', href: '/news-events/newsletter', icon: FileText },
      ]
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: Image,
      dropdown: [
        { name: 'Photo Gallery', href: '/gallery', icon: Image },
        { name: 'Photos & Videos', href: '/gallery/photos-videos', icon: Image },
      ]
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: Phone,
      dropdown: [
        { name: 'Contact Us', href: '/contact', icon: Phone },
        { name: 'Contact Information', href: '/contact/information', icon: Phone },
      ]
    },
  ];

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary-800 shadow-lg border-b border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Molek School</h1>
              <p className="text-xs text-primary-200 -mt-1">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative">
                <button
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }`}
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === index && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 ${
                          isActive(dropdownItem.href)
                            ? 'bg-primary-50 text-primary-800 border-r-2 border-primary-600'
                            : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-800'
                        }`}
                      >
                        <dropdownItem.icon className="h-4 w-4 mr-3 text-primary-600" />
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Portal Access Button */}
          <div className="hidden lg:flex lg:items-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Portal Access
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-primary-100 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary-900 border-t border-primary-700">
          <div className="px-4 pt-4 pb-6 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() => handleDropdownToggle(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Mobile Dropdown */}
                {activeDropdown === item.name && (
                  <div className="mt-2 ml-4 space-y-1">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${
                          isActive(dropdownItem.href)
                            ? 'bg-primary-600 text-white'
                            : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <dropdownItem.icon className="h-4 w-4 mr-3" />
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Portal Access */}
            <div className="pt-4 mt-4 border-t border-primary-700">
              <Link
                to="/auth/login"
                className="flex items-center justify-center w-full px-4 py-3 bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Portal Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default WebsiteNavigation;
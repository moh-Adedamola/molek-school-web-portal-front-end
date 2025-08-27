import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

const WebsiteLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  // Navigation structure
  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      exact: true
    },
    {
      name: 'About Us',
      href: '/about',
      children: [
        { name: 'About Our School', href: '/about' },
        { name: 'Leadership Team', href: '/about/leadership' },
        { name: 'Staff Directory', href: '/about/staff' },
        { name: 'Vision & Mission', href: '/about/vision-mission' },
        { name: 'School History', href: '/about/history' }
      ]
    },
    {
      name: 'Academics',
      href: '/academics',
      children: [
        { name: 'Academic Programs', href: '/academics' },
        { name: 'Subjects Offered', href: '/academics/subjects' },
        { name: 'Curriculum', href: '/academics/curriculum' },
        { name: 'Academic Calendar', href: '/academics/calendar' }
      ]
    },
    {
      name: 'Admissions',
      href: '/admissions',
      children: [
        { name: 'Admission Process', href: '/admissions' },
        { name: 'Requirements', href: '/admissions/requirements' },
        { name: 'How to Apply', href: '/admissions/how-to-apply' },
        { name: 'Tuition & Fees', href: '/admissions/fees' }
      ]
    },
    {
      name: 'News & Events',
      href: '/news-events',
      children: [
        { name: 'Latest News', href: '/news-events' },
        { name: 'Events Calendar', href: '/news-events/calendar' },
        { name: 'Newsletter', href: '/news-events/newsletter' },
        { name: 'Announcements', href: '/news-events/announcements' }
      ]
    },
    {
      name: 'Gallery',
      href: '/gallery',
      children: [
        { name: 'Photo Gallery', href: '/gallery' },
        { name: 'Photos', href: '/gallery/photos' },
        { name: 'Videos', href: '/gallery/videos' }
      ]
    },
    {
      name: 'Contact',
      href: '/contact',
      children: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Contact Information', href: '/contact/information' }
      ]
    }
  ];

  const isActiveLink = (href, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const handleDropdownToggle = (e, itemName) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top info bar */}
      <div className="bg-blue-800 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              <span>+234 123 456 7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              <span>info@schoolname.edu.ng</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-blue-200">Follow us:</span>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                <GraduationCap className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                  Nigerian Secondary School
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">
                  Excellence in Education
                </p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <div className="relative">
                      <button
                        onClick={(e) => handleDropdownToggle(e, item.name)}
                        className={`
                          flex items-center px-3 py-2 text-sm font-medium rounded-lg
                          transition-colors duration-200
                          ${isActiveLink(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                          }
                        `}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`
                          ml-1 w-4 h-4 transition-transform duration-200
                          ${activeDropdown === item.name ? 'rotate-180' : ''}
                        `} />
                      </button>
                      
                      {/* Dropdown menu */}
                      {activeDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={`
                                block px-4 py-2 text-sm transition-colors duration-200
                                ${isActiveLink(child.href)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }
                              `}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`
                        block px-3 py-2 text-sm font-medium rounded-lg
                        transition-colors duration-200
                        ${isActiveLink(item.href, item.exact)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Portal login button */}
              <Link
                to="/auth/login"
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                Portal Login
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={(e) => handleDropdownToggle(e, item.name)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg
                          transition-colors duration-200
                          ${isActiveLink(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                          }
                        `}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`
                          w-4 h-4 transition-transform duration-200
                          ${activeDropdown === item.name ? 'rotate-180' : ''}
                        `} />
                      </button>
                      
                      {/* Mobile dropdown items */}
                      {activeDropdown === item.name && (
                        <div className="mt-1 ml-4 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={`
                                block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                                ${isActiveLink(child.href)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }
                              `}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`
                        block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        ${isActiveLink(item.href, item.exact)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }
                      `}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile portal login */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Portal Login
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* School info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Nigerian Secondary School</h3>
                  <p className="text-sm text-gray-400">Excellence in Education</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Empowering students with quality education and character development 
                for over 25 years in Lagos, Nigeria.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><Link to="/academics" className="text-gray-400 hover:text-white transition-colors text-sm">Academics</Link></li>
                <li><Link to="/admissions" className="text-gray-400 hover:text-white transition-colors text-sm">Admissions</Link></li>
                <li><Link to="/news-events" className="text-gray-400 hover:text-white transition-colors text-sm">News & Events</Link></li>
                <li><Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">Gallery</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Academic programs */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Academic Programs</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm">Junior Secondary (JSS 1-3)</li>
                <li className="text-gray-400 text-sm">Senior Secondary (SSS 1-3)</li>
                <li className="text-gray-400 text-sm">Science Stream</li>
                <li className="text-gray-400 text-sm">Arts Stream</li>
                <li className="text-gray-400 text-sm">Commercial Stream</li>
                <li><Link to="/academics/subjects" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">View All Subjects</Link></li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <p>123 Education Avenue,</p>
                    <p>Victoria Island, Lagos,</p>
                    <p>Nigeria</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-400 text-sm">+234 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-400 text-sm">info@schoolname.edu.ng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Nigerian Secondary School. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteLayout;
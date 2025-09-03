// File: src/components/layout/PublicNavigation.jsx
// Main navigation component for public website

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const PublicNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navigationItems = [
    { name: 'Home', href: '/', hasDropdown: false },
    { 
      name: 'About Us', 
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About Us', href: '/about' },
        { name: 'Staff Directory', href: '/about/staff' },
        { name: 'Leadership', href: '/about/leadership' },
        { name: 'Vision & Mission', href: '/about/vision-mission' },
        { name: 'History', href: '/about/history' }
      ]
    },
    { 
      name: 'Academics', 
      href: '/academics',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Overview', href: '/academics' },
        { name: 'Subjects', href: '/academics/subjects' },
        { name: 'Academic Calendar', href: '/academics/calendar' },
        { name: 'Curriculum', href: '/academics/curriculum' },
        { name: 'Tuition Fees', href: '/academics/fees' },
        { name: 'Requirements', href: '/academics/requirements' }
      ]
    },
    { 
      name: 'Admissions', 
      href: '/admissions',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Admissions', href: '/admissions' },
        { name: 'How to Apply', href: '/admissions/how-to-apply' }
      ]
    },
    { 
      name: 'News & Events', 
      href: '/news-events',
      hasDropdown: true,
      dropdownItems: [
        { name: 'News & Events', href: '/news-events' },
        { name: 'Newsletter', href: '/news-events/newsletter' },
        { name: 'Events Calendar', href: '/news-events/calendar' },
        { name: 'Announcements', href: '/news-events/announcements' }
      ]
    },
    { 
      name: 'Gallery', 
      href: '/gallery',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Gallery', href: '/gallery' },
        { name: 'Photos & Videos', href: '/gallery/photos-videos' }
      ]
    },
    { name: 'Contact', href: '/contact', hasDropdown: false }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="website-nav shadow-lg relative z-50">
      <div className="container-max">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative">
                {/* Main Navigation Item */}
                <Link
                  to={item.href}
                  className={`website-nav-link flex items-center space-x-1 ${
                    isActivePath(item.href) ? 'active' : ''
                  }`}
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
                  onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === index && (
                  <div
                    className="absolute top-full left-0 w-56 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 mt-1"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden lg:block">
            <Link
              to="/auth/login"
              className="btn-accent px-6 py-2 rounded-lg font-medium"
            >
              Staff Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-neutral-200 hover:text-white hover:bg-primary-700 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary-700">
            <div className="space-y-2">
              {navigationItems.map((item, index) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className={`website-nav-link flex-1 ${
                        isActivePath(item.href) ? 'active' : ''
                      }`}
                      onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="p-2 text-neutral-200 hover:text-white"
                      >
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === index && (
                    <div className="pl-4 mt-2 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className="block py-2 px-4 text-primary-100 hover:text-white hover:bg-primary-700 rounded-md transition-colors text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Login Button */}
              <div className="pt-4 border-t border-primary-700">
                <Link
                  to="/auth/login"
                  className="block w-full text-center bg-accent-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-accent-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Staff Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavigation;
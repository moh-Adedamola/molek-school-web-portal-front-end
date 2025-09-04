// File: src/components/layout/Header.jsx
// Website header with school branding and navigation

import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin } from 'lucide-react';
import PublicNavigation from './PublicNavigation';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top Info Bar - Scrolling */}
      <div className="bg-primary-800 text-white py-2 overflow-hidden">
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap">
            <div className="inline-flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>[PHONE_NUMBER_NEEDED]</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>[EMAIL_ADDRESS_NEEDED]</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>NO 10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State</span>
              </div>
              <div className="text-primary-200">
                Academic Year 2024/2025
              </div>
              {/* Duplicate content for seamless scrolling */}
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>[PHONE_NUMBER_NEEDED]</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>[EMAIL_ADDRESS_NEEDED]</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State</span>
              </div>
              <div className="text-primary-200">
                Academic Year 2024/2025
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-max">
          <div className="flex items-center justify-between h-20">
            {/* School Logo and Name */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="bg-primary-600 p-3 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-primary-800">
                  Molek Schools
                </h1>
                <p className="text-secondary-600 text-sm font-medium">
                  Excellence • Integrity • Innovation
                </p>
              </div>
            </Link>

            {/* Quick Actions - Desktop Only */}
            <div className="hidden xl:flex items-center space-x-4">
              <Link
                to="/admissions"
                className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="btn-outline px-4 py-2 rounded-lg text-sm font-medium"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile School Name */}
            <div className="sm:hidden flex-1 text-center">
              <h1 className="text-lg font-bold text-primary-800">
                Molek Schools
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <PublicNavigation />
    </header>
  );
};

export default Header;
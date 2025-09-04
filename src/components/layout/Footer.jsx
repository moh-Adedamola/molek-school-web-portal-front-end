// File: src/components/layout/Footer.jsx
// Website footer with Nigerian school context and comprehensive links

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Academics', href: '/academics' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'News & Events', href: '/news-events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' }
  ];

  const academicLinks = [
    { name: 'JSS 1-3 Programs', href: '/academics/subjects' },
    { name: 'SSS 1-3 Programs', href: '/academics/subjects' },
    { name: 'WAEC Preparation', href: '/academics/curriculum' },
    { name: 'NECO Preparation', href: '/academics/curriculum' },
    { name: 'Academic Calendar', href: '/academics/calendar' },
    { name: 'Tuition Fees', href: '/academics/fees' }
  ];

  const importantLinks = [
    { name: 'Admission Process', href: '/admissions/how-to-apply' },
    { name: 'Staff Directory', href: '/about/staff' },
    { name: 'School Handbook', href: '#' },
    { name: 'Parent Portal', href: '/auth/login' },
    { name: 'Teacher Portal', href: '/auth/login' },
    { name: 'Emergency Contacts', href: '/contact/information' }
  ];

  return (
    <footer className="bg-primary-800 text-white">
      {/* Main Footer Content */}
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Information */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Molek Schools</h3>
                <p className="text-primary-200 text-sm">Excellence in Education</p>
              </div>
            </div>
            <p className="text-primary-100 text-sm mb-6 leading-relaxed">
              Committed to providing quality secondary education following the Nigerian 
              curriculum with focus on academic excellence, character development, and 
              preparation for WAEC and NECO examinations.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-primary-700 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-primary-700 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-primary-700 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-primary-700 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Academic Programs</h4>
            <ul className="space-y-3">
              {academicLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Important Links</h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-100 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information Bar */}
      <div className="border-t border-primary-700 py-6">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Phone className="h-4 w-4 text-primary-300" />
              <span className="text-primary-100 text-sm">+234 803 123 4567</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail className="h-4 w-4 text-primary-300" />
              <span className="text-primary-100 text-sm">info@molekschools.edu.ng</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <MapPin className="h-4 w-4 text-primary-300" />
              <span className="text-primary-100 text-sm">10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-primary-900 py-4">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-primary-200 text-sm">
              © {currentYear} Nigerian Secondary School. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/privacy-policy" 
                className="text-primary-200 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-primary-200 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/accessibility" 
                className="text-primary-200 hover:text-white text-sm transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
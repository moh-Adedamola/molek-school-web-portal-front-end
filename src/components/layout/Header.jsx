import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Header = () => {
  return (
    <header>
      {/* Top Header Bar */}
      <div className="bg-primary-900 text-primary-100 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            {/* Contact Information */}
            <div className="flex flex-wrap items-center space-x-6 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+234 803 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@molekschool.edu.ng</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social Media & Quick Links */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon - Fri: 7:00 AM - 4:00 PM</span>
              </div>
              
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-primary-700">
                <Link
                  to="#"
                  className="text-primary-200 hover:text-white transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  to="#"
                  className="text-primary-200 hover:text-white transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  to="#"
                  className="text-primary-200 hover:text-white transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link
                  to="#"
                  className="text-primary-200 hover:text-white transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Alert Banner (conditionally shown) */}
      <div className="bg-accent-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-center">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <p className="text-sm font-medium">
                📢 New Term Resumption: Monday, September 16th, 2024 | 
                <Link 
                  to="/news-events/announcements" 
                  className="underline ml-1 hover:text-accent-200"
                >
                  View Details
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Header with Quick Actions */}
      <div className="bg-white border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Academic Year Info */}
            <div className="flex items-center space-x-6">
              <div className="text-sm text-neutral-600">
                <span className="font-medium text-primary-800">Academic Year:</span>
                <span className="ml-1">2024/2025</span>
              </div>
              <div className="text-sm text-neutral-600">
                <span className="font-medium text-primary-800">Current Term:</span>
                <span className="ml-1">First Term</span>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/admissions"
                className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors duration-200"
              >
                Apply Now
              </Link>
              <div className="w-px h-4 bg-neutral-300"></div>
              <Link
                to="/academics/calendar"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                Academic Calendar
              </Link>
              <div className="w-px h-4 bg-neutral-300"></div>
              <Link
                to="/contact"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
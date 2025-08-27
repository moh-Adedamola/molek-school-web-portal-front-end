import { Link } from 'react-router-dom';
import { 
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Award,
  BookOpen,
  Users,
  Calendar,
  ExternalLink,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm mr-3">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Molek School</h3>
                <p className="text-primary-200 text-sm">Excellence in Nigerian Education</p>
              </div>
            </div>
            
            <p className="text-primary-200 mb-6 text-sm leading-relaxed">
              Dedicated to nurturing young minds and preparing students for success in their 
              academic journey. We combine traditional Nigerian values with modern educational 
              approaches to create well-rounded individuals ready for the challenges of tomorrow.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white bg-opacity-5 rounded-lg p-3">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-secondary-400 mr-2" />
                  <div>
                    <p className="text-lg font-semibold text-white">245+</p>
                    <p className="text-xs text-primary-300">Students</p>
                  </div>
                </div>
              </div>
              <div className="bg-white bg-opacity-5 rounded-lg p-3">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-accent-400 mr-2" />
                  <div>
                    <p className="text-lg font-semibold text-white">15+</p>
                    <p className="text-xs text-primary-300">Years Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-primary-200">
                  123 Education Avenue, Victoria Island, Lagos State, Nigeria
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-primary-200">+234 803 123 4567, +234 806 789 0123</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-primary-200">info@molekschool.edu.ng</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-primary-200">Mon - Fri: 7:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  <BookOpen className="h-3 w-3 mr-2" />
                  About Our School
                </Link>
              </li>
              <li>
                <Link 
                  to="/academics" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  <Award className="h-3 w-3 mr-2" />
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link 
                  to="/admissions" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  <Users className="h-3 w-3 mr-2" />
                  Admissions
                </Link>
              </li>
              <li>
                <Link 
                  to="/news-events" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  <Calendar className="h-3 w-3 mr-2" />
                  News & Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  <Phone className="h-3 w-3 mr-2" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Academic Excellence</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/academics/subjects" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  JSS & SSS Programs
                </Link>
              </li>
              <li>
                <Link 
                  to="/academics/curriculum" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Nigerian Curriculum
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.waec.org.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  WAEC Preparation
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.neco.gov.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm flex items-center"
                >
                  NECO Integration
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <Link 
                  to="/academics/calendar" 
                  className="text-primary-200 hover:text-white transition-colors duration-200 text-sm"
                >
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth/login" 
                  className="text-accent-400 hover:text-accent-300 transition-colors duration-200 text-sm font-medium"
                >
                  Portal Access
                </Link>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <Link
                  to="#"
                  className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 text-primary-200" />
                </Link>
                <Link
                  to="#"
                  className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4 text-primary-200" />
                </Link>
                <Link
                  to="#"
                  className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 text-primary-200" />
                </Link>
                <Link
                  to="#"
                  className="p-2 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4 text-primary-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center text-primary-300 mb-2 sm:mb-0">
              <span>© {currentYear} Molek School Management System.</span>
              <span className="ml-1">Built with</span>
              <Heart className="h-3 w-3 mx-1 text-red-400" />
              <span>for Nigerian Educational Excellence.</span>
            </div>
            
            <div className="flex items-center space-x-4 text-primary-300">
              <Link 
                to="/privacy-policy" 
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <div className="w-px h-3 bg-primary-700"></div>
              <Link 
                to="/terms-of-service" 
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <div className="w-px h-3 bg-primary-700"></div>
              <span>Made in Nigeria 🇳🇬</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
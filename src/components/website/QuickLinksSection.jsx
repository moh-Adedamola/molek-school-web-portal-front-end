// File: src/components/website/QuickLinksSection.jsx
// Quick access links for key sections and important school resources

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Phone, 
  UserPlus, 
  Image, 
  Newspaper,
  DollarSign,
  Award,
  Mail
} from 'lucide-react';

const QuickLinksSection = () => {
  const quickLinks = [
    {
      title: 'Apply for Admission',
      description: 'Start your application process for JSS/SSS',
      icon: UserPlus,
      href: '/admissions',
      color: 'accent',
      featured: true
    },
    {
      title: 'Academic Programs',
      description: 'Explore JSS & SSS curriculum',
      icon: BookOpen,
      href: '/academics/subjects',
      color: 'primary'
    },
    {
      title: 'Staff Directory',
      description: 'Meet our qualified educators',
      icon: Users,
      href: '/about/staff',
      color: 'secondary'
    },
    {
      title: 'Academic Calendar',
      description: 'View term dates and holidays',
      icon: Calendar,
      href: '/academics/calendar',
      color: 'primary'
    },
    {
      title: 'Tuition Fees',
      description: 'View fee structure by level',
      icon: DollarSign,
      href: '/academics/fees',
      color: 'accent'
    },
    {
      title: 'WAEC/NECO Results',
      description: 'Our examination achievements',
      icon: Award,
      href: '/academics/curriculum',
      color: 'secondary'
    },
    {
      title: 'School News',
      description: 'Latest updates and announcements',
      icon: Newspaper,
      href: '/news-events',
      color: 'primary'
    },
    {
      title: 'Photo Gallery',
      description: 'School life and activities',
      icon: Image,
      href: '/gallery',
      color: 'secondary'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with us',
      icon: Phone,
      href: '/contact',
      color: 'accent'
    },
    {
      title: 'School Handbook',
      description: 'Download student handbook',
      icon: FileText,
      href: '#',
      color: 'primary',
      external: true
    }
  ];

  const getColorClasses = (color, featured = false) => {
    const baseClasses = 'group relative bg-white border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:transform hover:scale-105';
    
    if (featured) {
      return `${baseClasses} border-accent-200 bg-gradient-to-br from-accent-50 to-white`;
    }

    switch (color) {
      case 'primary':
        return `${baseClasses} border-primary-200 hover:border-primary-300`;
      case 'secondary':
        return `${baseClasses} border-secondary-200 hover:border-secondary-300`;
      case 'accent':
        return `${baseClasses} border-accent-200 hover:border-accent-300`;
      default:
        return `${baseClasses} border-neutral-200 hover:border-neutral-300`;
    }
  };

  const getIconClasses = (color, featured = false) => {
    if (featured) {
      return 'h-8 w-8 text-accent-600 group-hover:text-accent-700';
    }

    switch (color) {
      case 'primary':
        return 'h-8 w-8 text-primary-600 group-hover:text-primary-700';
      case 'secondary':
        return 'h-8 w-8 text-secondary-600 group-hover:text-secondary-700';
      case 'accent':
        return 'h-8 w-8 text-accent-600 group-hover:text-accent-700';
      default:
        return 'h-8 w-8 text-neutral-600 group-hover:text-neutral-700';
    }
  };

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Quick Access
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find what you need quickly with our easy navigation links to important 
            school information and resources.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickLinks.map((link, index) => {
            const IconComponent = link.icon;
            
            return (
              <Link
                key={index}
                to={link.href}
                className={getColorClasses(link.color, link.featured)}
                {...(link.external && { 
                  target: '_blank', 
                  rel: 'noopener noreferrer' 
                })}
              >
                {/* Featured Badge */}
                {link.featured && (
                  <div className="absolute -top-3 -right-3 bg-accent-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-neutral-50 mb-4 group-hover:bg-white transition-colors">
                  <IconComponent className={getIconClasses(link.color, link.featured)} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-neutral-900">
                  {link.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {link.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 text-sm">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Emergency Contact Box */}
        <div className="mt-12 bg-white border-2 border-error/20 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            Emergency Contact
          </h3>
          <p className="text-neutral-600 mb-4">
            For urgent school matters outside office hours
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+2348031234567" 
              className="flex items-center space-x-2 text-error font-medium hover:underline"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency: +234 803 123 4567</span>
            </a>
            <a 
              href="mailto:emergency@nigerianschool.edu.ng" 
              className="flex items-center space-x-2 text-error font-medium hover:underline"
            >
              <Mail className="h-4 w-4" />
              <span>emergency@nigerianschool.edu.ng</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;
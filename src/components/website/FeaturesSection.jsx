// File: src/components/website/FeaturesSection.jsx
// School highlights and key features with responsive design

import React from 'react';
import { Link } from 'react-router-dom'; // Added this import
import { 
  Award, 
  Users, 
  BookOpen, 
  Microscope, 
  Calculator, 
  Globe, 
  Trophy, 
  Heart,
  Zap,
  Shield
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Award,
      title: 'WAEC Excellence',
      description: 'Consistent 95%+ pass rates in WAEC and NECO examinations with dedicated preparation programs.',
      color: 'secondary',
      stats: '95% Pass Rate'
    },
    {
      icon: Users,
      title: 'Qualified Educators',
      description: 'Experienced teachers with Nigerian Teaching Council certification and subject expertise.',
      color: 'primary',
      stats: '30+ Teachers'
    },
    {
      icon: BookOpen,
      title: 'Nigerian Curriculum',
      description: 'Comprehensive JSS and SSS programs aligned with Federal Ministry of Education standards.',
      color: 'accent',
      stats: 'JSS 1-3 & SSS 1-3'
    },
    {
      icon: Microscope,
      title: 'Science Excellence',
      description: 'Well-equipped laboratories for Physics, Chemistry, and Biology practical sessions.',
      color: 'secondary',
      stats: '3 Lab Facilities'
    },
    {
      icon: Calculator,
      title: 'Mathematics Focus',
      description: 'Strong foundation in mathematics with additional support for further mathematics students.',
      color: 'primary',
      stats: 'Advanced Math'
    },
    {
      icon: Globe,
      title: 'Holistic Development',
      description: 'Character building, leadership training, and extracurricular activities for well-rounded education.',
      color: 'accent',
      stats: '10+ Clubs'
    },
    {
      icon: Trophy,
      title: 'Academic Competitions',
      description: 'Regular participation in inter-school competitions, quiz competitions, and academic olympiads.',
      color: 'secondary',
      stats: 'Multiple Awards'
    },
    {
      icon: Heart,
      title: 'Pastoral Care',
      description: 'Dedicated guidance counselors and pastoral care system for student wellbeing.',
      color: 'primary',
      stats: '24/7 Support'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          icon: 'bg-primary-100 text-primary-600',
          title: 'text-primary-700',
          stats: 'text-primary-600 bg-primary-50'
        };
      case 'secondary':
        return {
          icon: 'bg-secondary-100 text-secondary-600',
          title: 'text-secondary-700',
          stats: 'text-secondary-600 bg-secondary-50'
        };
      case 'accent':
        return {
          icon: 'bg-accent-100 text-accent-600',
          title: 'text-accent-700',
          stats: 'text-accent-600 bg-accent-50'
        };
      default:
        return {
          icon: 'bg-neutral-100 text-neutral-600',
          title: 'text-neutral-700',
          stats: 'text-neutral-600 bg-neutral-50'
        };
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full mb-4">
            <Zap className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-medium text-sm">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6 text-balance">
            Building Tomorrow's Leaders
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto text-balance">
            We provide comprehensive secondary education that prepares students for 
            academic success and lifelong learning in the 21st century.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colors = getColorClasses(feature.color);
            
            return (
              <div
                key={index}
                className="feature-card group"
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl ${colors.icon} mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className={`text-lg font-semibold mb-3 ${colors.title}`}>
                  {feature.title}
                </h3>
                
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.stats}`}>
                  {feature.stats}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary-600 mr-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-800">
                Trusted by Nigerian Families
              </h3>
            </div>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of families who have trusted us with their children's education. 
              Our proven track record speaks for itself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about/staff"
                className="btn-primary px-6 py-3 rounded-lg font-medium"
              >
                Meet Our Teachers
              </Link>
              <Link
                to="/academics"
                className="btn-secondary px-6 py-3 rounded-lg font-medium"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
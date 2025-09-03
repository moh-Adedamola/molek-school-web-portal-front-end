// File: src/pages/website/about/AboutUs.jsx
import React from 'react';
import { Users, Award, BookOpen, Target } from 'lucide-react';
import StatsCard from '../../../components/shared/StatsCard';

const AboutUs = () => {
  const schoolStats = [
    {
      title: 'Students Enrolled',
      value: '850',
      icon: <Users className="w-5 h-5" />,
      color: 'primary'
    },
    {
      title: 'Teaching Staff',
      value: '45',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'secondary'
    },
    {
      title: 'Years of Excellence',
      value: '15',
      icon: <Award className="w-5 h-5" />,
      color: 'accent'
    },
    {
      title: 'WAEC Pass Rate',
      value: '95',
      unit: '%',
      icon: <Target className="w-5 h-5" />,
      color: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              About Our School
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 text-balance">
              Building tomorrow's leaders through academic excellence and character development
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="card-base mb-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                    Welcome to Our Institution
                  </h2>
                  <p className="text-neutral-600 mb-4 text-balance">
                    For over 15 years, we have been committed to providing quality education 
                    that prepares students for success in both WAEC and NECO examinations, 
                    while nurturing their character and leadership potential.
                  </p>
                  <p className="text-neutral-600 mb-6 text-balance">
                    Our comprehensive JSS and SSS programs follow the Nigerian curriculum, 
                    with experienced teachers who are passionate about student success 
                    and holistic development.
                  </p>
                  <div className="flex gap-4">
                    <button className="btn-primary px-6 py-3 rounded-lg font-medium">
                      Learn More
                    </button>
                    <button className="btn-outline px-6 py-3 rounded-lg font-medium">
                      Contact Us
                    </button>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-2xl p-6 text-center">
                  <div className="w-32 h-32 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-16 h-16 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-primary-700 text-balance">
                    To provide quality education that develops academic excellence, 
                    moral character, and leadership skills in every student.
                  </p>
                </div>
              </div>
            </div>

            {/* School Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {schoolStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  unit={stat.unit}
                  icon={stat.icon}
                  color={stat.color}
                  size="sm"
                />
              ))}
            </div>

            {/* Core Values */}
            <div className="card-base">
              <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
                Our Core Values
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-secondary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    Excellence
                  </h3>
                  <p className="text-neutral-600 text-sm text-balance">
                    We strive for the highest standards in academics, character, 
                    and all aspects of school life.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    Integrity
                  </h3>
                  <p className="text-neutral-600 text-sm text-balance">
                    We uphold honesty, transparency, and moral principles in 
                    all our interactions and decisions.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    Innovation
                  </h3>
                  <p className="text-neutral-600 text-sm text-balance">
                    We embrace modern teaching methods and technology to 
                    enhance learning and prepare students for the future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
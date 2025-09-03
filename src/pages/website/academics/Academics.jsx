// File: src/pages/website/academics/Academics.jsx
import React from 'react';
import { BookOpen, Award, Users, Target, Clock, CheckCircle } from 'lucide-react';
import StatsCard from '../../../components/shared/StatsCard';

const Academics = () => {
  const academicStats = [
    {
      title: 'WAEC Pass Rate',
      value: '95',
      unit: '%',
      icon: <Award className="w-5 h-5" />,
      color: 'success',
      description: 'Students with 5 credits and above'
    },
    {
      title: 'Subjects Offered',
      value: '18',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'primary',
      description: 'Core and elective subjects'
    },
    {
      title: 'Average Class Size',
      value: '25',
      icon: <Users className="w-5 h-5" />,
      color: 'secondary',
      description: 'Students per class for optimal learning'
    },
    {
      title: 'Teaching Hours',
      value: '40',
      unit: 'hrs/week',
      icon: <Clock className="w-5 h-5" />,
      color: 'accent',
      description: 'Comprehensive curriculum delivery'
    }
  ];

  const programs = [
    {
      title: 'Junior Secondary School (JSS)',
      levels: 'JSS 1 - JSS 3',
      duration: '3 Years',
      ageRange: '10-13 years',
      description: 'Foundation program covering basic subjects in sciences, arts, and vocational studies to prepare students for senior secondary education.',
      subjects: [
        'Mathematics', 'English Language', 'Basic Science', 'Social Studies',
        'Nigerian Languages', 'French', 'Creative Arts', 'Physical Education',
        'Computer Studies', 'Agricultural Science'
      ],
      color: 'secondary'
    },
    {
      title: 'Senior Secondary School (SSS)',
      levels: 'SSS 1 - SSS 3',
      duration: '3 Years',
      ageRange: '13-16 years',
      description: 'Specialized program with three streams (Science, Arts, Commercial) preparing students for WAEC, NECO, and university admission.',
      subjects: [
        'Core: Mathematics, English, Civic Education, Trade/Entrepreneurship',
        'Science Stream: Physics, Chemistry, Biology, Further Math',
        'Arts Stream: Literature, History, Government, Economics',
        'Commercial Stream: Accounting, Commerce, Economics, Marketing'
      ],
      color: 'primary'
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Nigerian Curriculum Alignment',
      description: 'Full compliance with National Educational Research and Development Council (NERDC) standards'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'WAEC & NECO Preparation',
      description: 'Comprehensive exam preparation with mock tests and intensive revision programs'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Qualified Teachers',
      description: 'Experienced educators with relevant qualifications and continuous professional development'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Small Class Sizes',
      description: 'Optimal teacher-student ratio for personalized attention and effective learning'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Modern Learning Resources',
      description: 'Well-equipped laboratories, library, and digital learning platforms'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexible Learning Paths',
      description: 'Multiple subject combinations to match student interests and career goals'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Academic Programs
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 text-balance">
              Comprehensive education aligned with Nigerian curriculum standards
            </p>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-max">
          
          {/* Academic Statistics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
              Academic Excellence by the Numbers
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {academicStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  unit={stat.unit}
                  icon={stat.icon}
                  color={stat.color}
                  description={stat.description}
                  size="sm"
                />
              ))}
            </div>
          </div>

          {/* Academic Programs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
              Our Academic Programs
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {programs.map((program, index) => {
                const colorClasses = {
                  primary: 'border-primary-200 bg-primary-50',
                  secondary: 'border-secondary-200 bg-secondary-50'
                };

                return (
                  <div key={index} className={`card-base border-2 ${colorClasses[program.color]}`}>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-neutral-800 mb-2">
                        {program.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-4">
                        <span className="font-medium">{program.levels}</span>
                        <span>{program.duration}</span>
                        <span>{program.ageRange}</span>
                      </div>
                    </div>

                    <p className="text-neutral-700 mb-6 text-balance">
                      {program.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-3">
                        Core Subjects:
                      </h4>
                      <div className="space-y-2">
                        {program.subjects.map((subject, subIndex) => (
                          <div key={subIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-neutral-600">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Academic Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
              Why Choose Our Academic Program?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="card-base text-center hover:shadow-md transition-shadow duration-200">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600 text-balance">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="card-base text-center">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Ready to Start Your Academic Journey?
            </h2>
            <p className="text-lg text-neutral-600 mb-6 text-balance">
              Join our community of learners and experience academic excellence 
              with character development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 rounded-lg font-medium">
                Apply for Admission
              </button>
              <button className="btn-outline px-8 py-3 rounded-lg font-medium">
                Schedule a Visit
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Academics;
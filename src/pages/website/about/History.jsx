// File: src/pages/website/about/History.jsx
import React from 'react';
import { Calendar, Award, Users, Building, BookOpen } from 'lucide-react';

const History = () => {
  const milestones = [
    {
      year: '2009',
      title: 'School Foundation',
      description: 'Founded with a vision to provide quality secondary education in Lagos State, starting with 120 students and 12 teaching staff.',
      icon: <Building className="w-5 h-5" />,
      color: 'primary'
    },
    {
      year: '2011',
      title: 'First WAEC Results',
      description: 'Achieved 85% pass rate in our first WAEC examination, establishing our reputation for academic excellence.',
      icon: <Award className="w-5 h-5" />,
      color: 'secondary'
    },
    {
      year: '2013',
      title: 'Infrastructure Expansion',
      description: 'Opened new science laboratories, computer lab, and library to enhance learning facilities.',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'accent'
    },
    {
      year: '2015',
      title: 'Student Population Growth',
      description: 'Reached 400 students across JSS and SSS levels, requiring additional classrooms and teaching staff.',
      icon: <Users className="w-5 h-5" />,
      color: 'primary'
    },
    {
      year: '2017',
      title: 'Excellence Recognition',
      description: 'Awarded "Best Secondary School in Lagos State" for outstanding academic performance and character development.',
      icon: <Award className="w-5 h-5" />,
      color: 'secondary'
    },
    {
      year: '2019',
      title: 'Digital Learning Initiative',
      description: 'Introduced e-learning platforms and smart classroom technology to enhance teaching and learning.',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'accent'
    },
    {
      year: '2021',
      title: 'COVID-19 Adaptation',
      description: 'Successfully transitioned to online learning during the pandemic, maintaining educational continuity.',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'primary'
    },
    {
      year: '2023',
      title: '95% WAEC Pass Rate',
      description: 'Achieved our highest WAEC pass rate, with 95% of students obtaining five credits and above.',
      icon: <Award className="w-5 h-5" />,
      color: 'secondary'
    },
    {
      year: '2024',
      title: '15 Years of Excellence',
      description: 'Celebrating 15 years of educational excellence with over 2,000 graduates making positive impacts in society.',
      icon: <Calendar className="w-5 h-5" />,
      color: 'accent'
    }
  ];

  const achievements = [
    {
      metric: '2,000+',
      label: 'Graduates',
      description: 'Alumni making positive contributions to society'
    },
    {
      metric: '95%',
      label: 'WAEC Pass Rate',
      description: 'Students achieving 5 credits and above'
    },
    {
      metric: '850',
      label: 'Current Students',
      description: 'Across JSS and SSS levels'
    },
    {
      metric: '45',
      label: 'Teaching Staff',
      description: 'Qualified and experienced educators'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Our History
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 text-balance">
              15 years of educational excellence and community impact
            </p>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-max">
          
          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card-base text-center">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                Our Journey of Excellence
              </h2>
              <p className="text-lg text-neutral-700 text-balance">
                Since our establishment in 2009, we have been committed to providing quality 
                secondary education that transforms lives and builds character. Our journey 
                has been marked by continuous growth, innovation, and unwavering dedication 
                to academic excellence.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
              Major Milestones
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-300"></div>
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => {
                  const colorClasses = {
                    primary: 'bg-primary-100 text-primary-600',
                    secondary: 'bg-secondary-100 text-secondary-600',
                    accent: 'bg-accent-100 text-accent-600'
                  };

                  return (
                    <div key={index} className="relative flex gap-6 items-start">
                      {/* Timeline Dot */}
                      <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${colorClasses[milestone.color]} flex-shrink-0`}>
                        {milestone.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="card-base flex-1 ml-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <h3 className="text-xl font-semibold text-neutral-800">
                            {milestone.title}
                          </h3>
                          <span className="text-lg font-bold text-neutral-600 mt-1 sm:mt-0">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-neutral-700 text-balance">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Achievements Summary */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card-base">
              <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
                Our Achievements
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                      {achievement.metric}
                    </div>
                    <div className="text-lg font-semibold text-neutral-800 mb-1">
                      {achievement.label}
                    </div>
                    <div className="text-sm text-neutral-600 text-balance">
                      {achievement.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legacy & Future */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-base">
                <h3 className="text-xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-secondary-600" />
                  Our Legacy
                </h3>
                <p className="text-neutral-700 mb-4 text-balance">
                  Over the past 15 years, we have educated over 2,000 students who have 
                  gone on to excel in universities, professional careers, and leadership 
                  positions across Nigeria and internationally.
                </p>
                <p className="text-neutral-700 text-balance">
                  Our alumni serve as doctors, engineers, teachers, business leaders, 
                  and public servants, carrying forward the values and excellence 
                  instilled during their time at our school.
                </p>
              </div>
              
              <div className="card-base">
                <h3 className="text-xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  Looking Forward
                </h3>
                <p className="text-neutral-700 mb-4 text-balance">
                  As we move into our next chapter, we remain committed to innovation 
                  in education, embracing new technologies and teaching methods while 
                  maintaining our core values and academic standards.
                </p>
                <p className="text-neutral-700 text-balance">
                  We continue to invest in infrastructure, technology, and professional 
                  development to ensure our students are prepared for the challenges 
                  and opportunities of the 21st century.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default History;
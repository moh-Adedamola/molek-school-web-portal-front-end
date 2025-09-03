// File: src/pages/website/about/VisionMission.jsx
import React from 'react';
import { Eye, Target, Heart, Star, BookOpen, Users } from 'lucide-react';

const VisionMission = () => {
  const coreValues = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in academic achievement, character development, and all school activities.',
      color: 'primary'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Integrity',
      description: 'We uphold honesty, transparency, and moral principles in all our interactions and decisions.',
      color: 'secondary'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Respect',
      description: 'We value diversity, treat everyone with dignity, and foster an inclusive learning environment.',
      color: 'accent'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Innovation',
      description: 'We embrace modern teaching methods and technology to enhance learning experiences.',
      color: 'primary'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Responsibility',
      description: 'We encourage accountability, civic duty, and environmental stewardship among our students.',
      color: 'secondary'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Leadership',
      description: 'We develop confident leaders who can positively impact their communities and nation.',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Vision, Mission & Values
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 text-balance">
              Our guiding principles for educational excellence and character development
            </p>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Vision Statement */}
            <div className="card-base text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed text-balance">
                To be the premier secondary school in Nigeria, recognized for academic excellence, 
                character development, and producing well-rounded graduates who become leaders 
                and change-makers in their communities and the nation at large.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="card-base text-center">
              <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-secondary-600" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6 text-balance">
                To provide quality, holistic education that develops academic excellence, 
                strong moral character, and leadership skills in every student, preparing 
                them for success in higher education and meaningful contribution to society.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-primary-800 mb-2">Academic Excellence</h3>
                  <p className="text-sm text-primary-700">
                    Preparing students for outstanding performance in WAEC, NECO, and beyond
                  </p>
                </div>
                
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <Heart className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-secondary-800 mb-2">Character Development</h3>
                  <p className="text-sm text-secondary-700">
                    Building strong moral foundations and ethical decision-making skills
                  </p>
                </div>
                
                <div className="bg-accent-50 p-4 rounded-lg">
                  <Users className="w-8 h-8 text-accent-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-accent-800 mb-2">Leadership Skills</h3>
                  <p className="text-sm text-accent-700">
                    Developing confident leaders ready to serve their communities
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="card-base">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                  Our Core Values
                </h2>
                <p className="text-lg text-neutral-600 text-balance">
                  The fundamental principles that guide everything we do
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, index) => {
                  const colorClasses = {
                    primary: 'bg-primary-100 text-primary-600',
                    secondary: 'bg-secondary-100 text-secondary-600',
                    accent: 'bg-accent-100 text-accent-600'
                  };

                  return (
                    <div key={index} className="text-center p-4 hover:shadow-md transition-shadow duration-200 rounded-lg">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[value.color]}`}>
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-sm text-neutral-600 text-balance">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Educational Philosophy */}
            <div className="card-base">
              <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
                Our Educational Philosophy
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                    Holistic Development Approach
                  </h3>
                  <p className="text-neutral-700 mb-4 text-balance">
                    We believe that true education goes beyond academic achievement. 
                    Our approach focuses on developing the whole child - intellectually, 
                    emotionally, socially, and morally.
                  </p>
                  <p className="text-neutral-700 text-balance">
                    Through our comprehensive programs, we ensure that every student 
                    develops critical thinking skills, emotional intelligence, social 
                    responsibility, and strong ethical foundations.
                  </p>
                </div>
                
                <div className="bg-neutral-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-neutral-800 mb-4">We Focus On:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-sm text-neutral-700">Critical thinking and problem-solving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
                      <span className="text-sm text-neutral-700">Effective communication skills</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                      <span className="text-sm text-neutral-700">Collaborative teamwork abilities</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-sm text-neutral-700">Cultural awareness and global citizenship</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
                      <span className="text-sm text-neutral-700">Innovation and adaptability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
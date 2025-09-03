// File: src/pages/website/about/Leadership.jsx
import React from 'react';
import { Award, BookOpen, Users, Target } from 'lucide-react';

const Leadership = () => {
  const leadershipTeam = [
    {
      id: 1,
      name: 'Mrs. Adunni Olatunji',
      position: 'Principal',
      qualification: 'M.Ed Educational Administration, B.Ed Mathematics',
      experience: '20 years in Education Leadership',
      bio: 'Mrs. Olatunji brings over two decades of educational excellence to our institution. Her visionary leadership has transformed our school into one of Lagos State\'s premier secondary schools. She is passionate about creating an environment where every student can achieve their full potential.',
      achievements: [
        'Led school to 95% WAEC pass rate',
        'Awarded Best Principal Lagos State 2023',
        'Implemented digital learning systems',
        'Established scholarship program for underprivileged students'
      ],
      image: null
    },
    {
      id: 2,
      name: 'Mr. Chike Okonkwo',
      position: 'Vice Principal (Academics)',
      qualification: 'M.Sc Physics, B.Ed Physics, Advanced Diploma in Educational Leadership',
      experience: '15 years in Academic Leadership',
      bio: 'Mr. Okonkwo oversees our academic programs and curriculum development. His expertise in sciences and commitment to academic excellence has helped establish our reputation for outstanding WAEC and NECO results. He works closely with teachers to ensure quality instruction across all subjects.',
      achievements: [
        'Developed comprehensive WAEC preparation program',
        'Increased science subjects pass rate to 98%',
        'Introduced peer tutoring system',
        'Led curriculum alignment with national standards'
      ],
      image: null
    },
    {
      id: 3,
      name: 'Mrs. Blessing Nwosu',
      position: 'Vice Principal (Administration)',
      qualification: 'MBA Human Resources, B.Sc Business Administration',
      experience: '12 years in Educational Administration',
      bio: 'Mrs. Nwosu manages the administrative operations of the school, ensuring smooth day-to-day functioning. Her background in business administration brings efficiency and modern management practices to our institution, creating an environment conducive to learning.',
      achievements: [
        'Streamlined student enrollment process',
        'Implemented parent communication system',
        'Established partnership with local businesses',
        'Led school safety and security improvements'
      ],
      image: null
    },
    {
      id: 4,
      name: 'Mr. Olumide Adeyemi',
      position: 'Dean of Students',
      qualification: 'B.Ed Guidance & Counseling, M.A Psychology',
      experience: '10 years in Student Affairs',
      bio: 'Mr. Adeyemi is responsible for student welfare, discipline, and counseling services. His approach combines firmness with compassion, helping students develop strong character while providing support for their personal and academic challenges.',
      achievements: [
        'Established student mentorship program',
        'Reduced disciplinary issues by 60%',
        'Introduced career guidance workshops',
        'Created peer support networks'
      ],
      image: null
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              School Leadership
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 text-balance">
              Meet the dedicated leaders guiding our educational mission
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="section-padding">
        <div className="container-max">
          <div className="space-y-8">
            {leadershipTeam.map((leader, index) => (
              <div key={leader.id} className="card-base">
                <div className={`grid lg:grid-cols-${index === 0 ? '3' : '2'} gap-8 items-start`}>
                  {/* Photo */}
                  <div className="flex justify-center lg:justify-start">
                    <div className={`${index === 0 ? 'w-48 h-48' : 'w-32 h-32'} rounded-full overflow-hidden bg-neutral-200`}>
                      {leader.image ? (
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-bold text-3xl">
                          {leader.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Information */}
                  <div className={`${index === 0 ? 'lg:col-span-2' : ''} space-y-4`}>
                    <div>
                      <h2 className={`${index === 0 ? 'text-3xl' : 'text-2xl'} font-bold text-neutral-800 mb-2`}>
                        {leader.name}
                      </h2>
                      <p className="text-primary-600 font-semibold text-lg mb-2">
                        {leader.position}
                      </p>
                      <p className="text-neutral-600 text-sm mb-2">
                        {leader.qualification}
                      </p>
                      <p className="text-neutral-600 text-sm font-medium">
                        {leader.experience}
                      </p>
                    </div>

                    <p className="text-neutral-700 leading-relaxed text-balance">
                      {leader.bio}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h3 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent-600" />
                        Key Achievements
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {leader.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-neutral-600">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leadership Philosophy */}
          <div className="card-base mt-12">
            <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
              Our Leadership Philosophy
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                  Collaborative Leadership
                </h3>
                <p className="text-neutral-600 text-sm text-balance">
                  We believe in shared leadership that involves teachers, 
                  students, and parents in decision-making processes.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                  Academic Excellence
                </h3>
                <p className="text-neutral-600 text-sm text-balance">
                  Our leadership is committed to maintaining the highest 
                  academic standards while supporting every student's journey.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                  Continuous Improvement
                </h3>
                <p className="text-neutral-600 text-sm text-balance">
                  We are committed to ongoing professional development 
                  and innovation in educational practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
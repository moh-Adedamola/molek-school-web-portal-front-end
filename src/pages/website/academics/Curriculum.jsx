// File: src/pages/website/academics/Curriculum.jsx
import React, { useState } from 'react';
import { BookOpen, CheckCircle, Target, Award, Users, Clock } from 'lucide-react';

const Curriculum = () => {
  const [selectedLevel, setSelectedLevel] = useState('jss');

  const curriculumData = {
    jss: {
      title: 'Junior Secondary School Curriculum',
      subtitle: 'JSS 1 - JSS 3 (Ages 10-13)',
      overview: 'Our JSS curriculum provides a solid foundation across all subject areas, following the National Educational Research and Development Council (NERDC) guidelines. Students develop critical thinking, communication skills, and character while exploring diverse academic disciplines.',
      objectives: [
        'Build strong foundation in core subjects (Mathematics, English, Basic Science)',
        'Develop critical thinking and problem-solving skills',
        'Foster creativity through arts and practical subjects',
        'Instill moral values and good citizenship',
        'Prepare students for Senior Secondary education'
      ],
      subjectGroups: [
        {
          category: 'Core Subjects',
          subjects: [
            'Mathematics - Number operations, algebra basics, geometry fundamentals',
            'English Language - Reading, writing, speaking, listening skills',
            'Basic Science - Introduction to physics, chemistry, and biology concepts',
            'Social Studies - Geography, history, and civic education',
            'Nigerian Language - Indigenous language development'
          ]
        },
        {
          category: 'Practical Subjects',
          subjects: [
            'Computer Studies - Basic computer literacy and digital skills',
            'Creative Arts - Visual arts, music, and cultural expression',
            'Physical Education - Sports, fitness, and health education',
            'Agricultural Science - Basic farming and environmental awareness'
          ]
        },
        {
          category: 'Language Development',
          subjects: [
            'French Language - Introduction to foreign language',
            'Arabic Studies - Religious and cultural studies (optional)',
            'Literature - Introduction to creative writing and comprehension'
          ]
        }
      ],
      assessment: {
        continuous: '60%',
        examination: '40%',
        description: 'Continuous assessment includes class work, assignments, projects, and mid-term tests. Final examinations are conducted at the end of each term.'
      }
    },
    sss: {
      title: 'Senior Secondary School Curriculum',
      subtitle: 'SSS 1 - SSS 3 (Ages 13-16)',
      overview: 'Our SSS curriculum offers specialized streams (Science, Arts, Commercial) aligned with WAEC and NECO syllabi. Students focus on specific subject combinations while maintaining core requirements for well-rounded education.',
      objectives: [
        'Provide specialized knowledge in chosen stream',
        'Prepare students for WAEC and NECO examinations',
        'Develop research and analytical skills',
        'Foster leadership and entrepreneurial skills',
        'Prepare students for higher education and careers'
      ],
      subjectGroups: [
        {
          category: 'Core Subjects (All Streams)',
          subjects: [
            'Mathematics - Advanced mathematics including calculus and statistics',
            'English Language - Advanced communication and literature analysis',
            'Civic Education - Citizenship, democracy, and national values',
            'Trade/Entrepreneurship - Business skills and vocational training'
          ]
        },
        {
          category: 'Science Stream',
          subjects: [
            'Physics - Mechanics, thermodynamics, optics, and modern physics',
            'Chemistry - Organic, inorganic, and physical chemistry',
            'Biology - Cell biology, genetics, ecology, and human physiology',
            'Further Mathematics - Advanced mathematical concepts and applications'
          ]
        },
        {
          category: 'Arts Stream',
          subjects: [
            'Literature in English - Poetry, prose, and drama analysis',
            'History - Nigerian and world history',
            'Government - Political science and governance',
            'Economics - Micro and macroeconomic principles'
          ]
        },
        {
          category: 'Commercial Stream',
          subjects: [
            'Accounting - Financial accounting and business analysis',
            'Commerce - Trade, industry, and business operations',
            'Economics - Economic principles and market systems',
            'Marketing - Consumer behavior and business strategy'
          ]
        }
      ],
      assessment: {
        continuous: '40%',
        examination: '60%',
        description: 'Assessment includes internal examinations, practical work, and external examinations (WAEC/NECO). Greater emphasis on examination performance for university admission.'
      }
    }
  };

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'NERDC Compliance',
      description: 'Full alignment with National Educational Research and Development Council standards'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Exam Preparation',
      description: 'Comprehensive preparation for WAEC, NECO, and university entrance examinations'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Qualified Teachers',
      description: 'Subject specialists with proven track records in their respective fields'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Holistic Development',
      description: 'Balance of academic excellence with character and leadership development'
    }
  ];

  const currentCurriculum = curriculumData[selectedLevel];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-max py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Curriculum Framework
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
              Comprehensive academic programs aligned with Nigerian education standards
            </p>
          </div>

          {/* Level Selector */}
          <div className="flex justify-center gap-2 max-w-md mx-auto">
            <button
              onClick={() => setSelectedLevel('jss')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedLevel === 'jss'
                  ? 'btn-primary text-white'
                  : 'btn-outline text-primary-600'
              }`}
            >
              JSS Curriculum
            </button>
            <button
              onClick={() => setSelectedLevel('sss')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedLevel === 'sss'
                  ? 'btn-primary text-white'
                  : 'btn-outline text-primary-600'
              }`}
            >
              SSS Curriculum
            </button>
          </div>
        </div>
      </div>

      {/* Curriculum Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            
            {/* Curriculum Overview */}
            <div className="card-base mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                  {currentCurriculum.title}
                </h2>
                <p className="text-lg text-primary-600 font-medium mb-4">
                  {currentCurriculum.subtitle}
                </p>
              </div>
              
              <p className="text-neutral-700 text-center leading-relaxed text-balance">
                {currentCurriculum.overview}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="card-base mb-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-600" />
                Learning Objectives
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {currentCurriculum.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 bg-secondary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-neutral-700">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Groups */}
            <div className="space-y-6 mb-8">
              {currentCurriculum.subjectGroups.map((group, index) => (
                <div key={index} className="card-base">
                  <h3 className="text-lg font-bold text-neutral-800 mb-4">
                    {group.category}
                  </h3>
                  
                  <div className="space-y-3">
                    {group.subjects.map((subject, subIndex) => (
                      <div key={subIndex} className="flex gap-3 p-3 bg-neutral-50 rounded-lg">
                        <BookOpen className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-neutral-700">{subject}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment Structure */}
            <div className="card-base mb-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-600" />
                Assessment Structure
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {currentCurriculum.assessment.continuous}
                  </div>
                  <div className="font-semibold text-primary-800 mb-2">
                    Continuous Assessment
                  </div>
                  <div className="text-sm text-primary-700">
                    Class work, assignments, projects, tests
                  </div>
                </div>
                
                <div className="text-center p-4 bg-accent-50 rounded-lg">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    {currentCurriculum.assessment.examination}
                  </div>
                  <div className="font-semibold text-accent-800 mb-2">
                    Examinations
                  </div>
                  <div className="text-sm text-accent-700">
                    End of term examinations
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-neutral-600 text-center">
                {currentCurriculum.assessment.description}
              </p>
            </div>

            {/* Curriculum Features */}
            <div className="card-base">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 text-center">
                Curriculum Features
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
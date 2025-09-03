// File: src/pages/website/academics/Requirements.jsx
import React, { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, BookOpen, Award, Users } from 'lucide-react';

const Requirements = () => {
  const [selectedLevel, setSelectedLevel] = useState('jss1');

  const requirements = {
    jss1: {
      title: 'JSS 1 Admission Requirements',
      subtitle: 'Entry into Junior Secondary School',
      description: 'Requirements for students transitioning from primary school to junior secondary education.',
      academic: [
        'Primary Six Leaving Certificate with passes in English and Mathematics',
        'Common Entrance Examination pass (if applicable)',
        'Minimum age of 10 years at the time of admission',
        'Basic literacy and numeracy skills assessment'
      ],
      documents: [
        'Completed admission application form',
        'Original and photocopy of birth certificate',
        'Primary school leaving certificate',
        'Immunization certificate',
        'Recent passport photographs (4 copies)',
        'Medical certificate of fitness',
        'Parent/guardian identification documents',
        'Proof of residence'
      ],
      additional: [
        'Entrance examination and interview',
        'Payment of admission and first term fees',
        'Purchase of prescribed school uniform',
        'Parent/guardian orientation meeting attendance'
      ]
    },
    sss1: {
      title: 'SSS 1 Admission Requirements', 
      subtitle: 'Entry into Senior Secondary School',
      description: 'Requirements for students advancing from JSS 3 to senior secondary education.',
      academic: [
        'JSS 3 certificate with minimum of 5 passes including English and Mathematics',
        'Basic Education Certificate Examination (BECE) results',
        'Minimum age of 13 years at the time of admission',
        'Subject-specific requirements for chosen stream (Science/Arts/Commercial)'
      ],
      documents: [
        'Completed admission application form',
        'Original and photocopy of JSS 3 certificate',
        'BECE results slip (original and photocopy)',
        'Birth certificate (original and photocopy)',
        'Recent passport photographs (6 copies)',
        'Medical certificate of fitness',
        'Transfer certificate (for external students)',
        'Parent/guardian identification documents'
      ],
      additional: [
        'Subject stream selection and counseling',
        'Academic placement examination',
        'Payment of admission and first term fees',
        'Purchase of prescribed school uniform and textbooks',
        'Parent/guardian orientation meeting attendance'
      ]
    },
    transfer: {
      title: 'Transfer Student Requirements',
      subtitle: 'For Students Joining from Other Schools',
      description: 'Additional requirements for students transferring from other secondary schools.',
      academic: [
        'Academic transcripts from previous school',
        'Proof of current grade level and academic standing',
        'Subject compatibility assessment for SSS students',
        'Evidence of satisfactory academic progress'
      ],
      documents: [
        'All standard admission documents',
        'Official transfer certificate from previous school',
        'Academic records and report cards from previous school',
        'Certificate of good conduct from previous school',
        'Reason for transfer documentation',
        'Previous school contact information for verification'
      ],
      additional: [
        'Academic assessment and placement test',
        'Counseling session for academic and social integration',
        'Subject stream realignment if necessary',
        'Probationary period of one term',
        'Integration support program participation'
      ]
    }
  };

  const subjectStreamRequirements = {
    science: {
      title: 'Science Stream Requirements (SSS)',
      subjects: ['Mathematics (Credit)', 'English Language (Credit)', 'Basic Science (Pass)'],
      career: 'Prepares students for medicine, engineering, pharmacy, and other science-related fields',
      icon: <Award className="w-5 h-5" />
    },
    arts: {
      title: 'Arts Stream Requirements (SSS)',
      subjects: ['Mathematics (Pass)', 'English Language (Credit)', 'Social Studies (Pass)'],
      career: 'Prepares students for law, education, journalism, and humanities fields',
      icon: <BookOpen className="w-5 h-5" />
    },
    commercial: {
      title: 'Commercial Stream Requirements (SSS)',
      subjects: ['Mathematics (Credit)', 'English Language (Credit)', 'Basic Science or Social Studies (Pass)'],
      career: 'Prepares students for business, accounting, banking, and commerce fields',
      icon: <Users className="w-5 h-5" />
    }
  };

  const currentRequirement = requirements[selectedLevel];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-max py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Admission Requirements
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
              Academic and documentation requirements for admission to our school
            </p>
          </div>

          {/* Level Selector */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedLevel('jss1')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedLevel === 'jss1'
                  ? 'btn-primary text-white'
                  : 'btn-outline text-primary-600'
              }`}
            >
              JSS 1 Entry
            </button>
            <button
              onClick={() => setSelectedLevel('sss1')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedLevel === 'sss1'
                  ? 'btn-primary text-white'
                  : 'btn-outline text-primary-600'
              }`}
            >
              SSS 1 Entry
            </button>
            <button
              onClick={() => setSelectedLevel('transfer')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                selectedLevel === 'transfer'
                  ? 'btn-primary text-white'
                  : 'btn-outline text-primary-600'
              }`}
            >
              Transfer Students
            </button>
          </div>
        </div>
      </div>

      {/* Requirements Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            
            {/* Overview */}
            <div className="card-base mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                  {currentRequirement.title}
                </h2>
                <p className="text-lg text-primary-600 font-medium mb-4">
                  {currentRequirement.subtitle}
                </p>
              </div>
              
              <p className="text-neutral-700 text-center leading-relaxed text-balance">
                {currentRequirement.description}
              </p>
            </div>

            {/* Academic Requirements */}
            <div className="card-base mb-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                Academic Requirements
              </h3>
              
              <div className="space-y-3">
                {currentRequirement.academic.map((req, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-primary-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-neutral-700">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="card-base mb-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-600" />
                Required Documents
              </h3>
              
              <div className="grid md:grid-cols-2 gap-3">
                {currentRequirement.documents.map((doc, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-accent-50 rounded-lg">
                    <FileText className="w-4 h-4 text-accent-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-neutral-700">{doc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="card-base mb-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary-600" />
                Additional Requirements
              </h3>
              
              <div className="space-y-3">
                {currentRequirement.additional.map((req, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-secondary-50 rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-secondary-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-neutral-700">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SSS Stream Requirements - Only show for SSS1 */}
            {selectedLevel === 'sss1' && (
              <div className="card-base mb-8">
                <h3 className="text-xl font-bold text-neutral-800 mb-6 text-center">
                  SSS Subject Stream Requirements
                </h3>
                
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                  {Object.values(subjectStreamRequirements).map((stream, index) => (
                    <div key={index} className="border-2 border-neutral-200 rounded-lg p-6">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-600">
                          {stream.icon}
                        </div>
                        <h4 className="font-bold text-neutral-800 mb-2">
                          {stream.title}
                        </h4>
                      </div>
                      
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-neutral-700 mb-2">
                          Minimum JSS Requirements:
                        </h5>
                        <div className="space-y-1">
                          {stream.subjects.map((subject, sIndex) => (
                            <div key={sIndex} className="text-xs text-neutral-600 flex items-center gap-2">
                              <div className="w-1 h-1 bg-neutral-400 rounded-full"></div>
                              {subject}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-xs text-neutral-600 text-center">
                        {stream.career}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Notes */}
            <div className="card-base mb-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent-600" />
                Important Notes
              </h3>
              
              <div className="space-y-4 text-sm text-neutral-700">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    All certificates and documents must be original with photocopies for verification. 
                    Documents will be returned after verification.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Admission is competitive and meeting minimum requirements does not guarantee acceptance. 
                    Early application is strongly recommended.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Students with special needs should contact the admissions office for individualized 
                    assessment and support planning.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    International students may be required to provide additional documentation 
                    including English proficiency certification.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="card-base text-center">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">
                Ready to Apply?
              </h2>
              <p className="text-neutral-600 mb-6 text-balance">
                Start your academic journey with us. Contact our admissions office 
                for guidance through the application process.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary px-8 py-3 rounded-lg font-medium">
                  Download Application Form
                </button>
                <button className="btn-outline px-8 py-3 rounded-lg font-medium">
                  Contact Admissions Office
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
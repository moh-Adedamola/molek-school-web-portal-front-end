// File: src/pages/website/academics/Subjects.jsx
import React, { useState } from 'react';
import { BookOpen, Beaker, Calculator, Globe, Palette, Dumbbell } from 'lucide-react';
import SubjectCard from '../../../components/website/SubjectCard';

const Subjects = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const subjects = [
    // JSS Core Subjects
    {
      name: 'Mathematics',
      code: 'MTH',
      level: 'Both',
      category: 'Core',
      description: 'Foundation in arithmetic, algebra, geometry, and basic statistics. Essential for logical thinking and problem-solving skills.',
      duration: 6,
      teacher: 'Mrs. F. Ibrahim',
      examBoard: 'WAEC/NECO',
      icon: <Calculator className="w-6 h-6" />
    },
    {
      name: 'English Language',
      code: 'ENG',
      level: 'Both',
      category: 'Core',
      description: 'Comprehensive language skills including reading, writing, speaking, and listening. Critical for communication and academic success.',
      duration: 6,
      teacher: 'Mr. E. Bassey',
      examBoard: 'WAEC/NECO',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      name: 'Basic Science',
      code: 'BSC',
      level: 'JSS',
      category: 'Core',
      description: 'Introduction to physics, chemistry, and biology concepts. Foundation for advanced science subjects in SSS.',
      duration: 4,
      classSize: 30,
      teacher: 'Dr. K. Adebayo',
      examBoard: 'BECE',
      icon: <Beaker className="w-6 h-6" />
    },
    
    // SSS Science Subjects
    {
      name: 'Physics',
      code: 'PHY',
      level: 'SSS',
      category: 'Elective',
      description: 'Study of matter, energy, and their interactions. Covers mechanics, thermodynamics, optics, and modern physics.',
      duration: 4,
      classSize: 25,
      teacher: 'Mr. C. Okonkwo',
      examBoard: 'WAEC/NECO',
      prerequisites: ['Mathematics', 'Basic Science'],
      icon: <Beaker className="w-6 h-6" />
    },
    {
      name: 'Chemistry',
      code: 'CHE',
      level: 'SSS',
      category: 'Elective',
      description: 'Comprehensive study of chemical principles, reactions, and applications in daily life and industry.',
      duration: 4,
      classSize: 25,
      teacher: 'Mrs. G. Okoro',
      examBoard: 'WAEC/NECO',
      prerequisites: ['Mathematics', 'Basic Science'],
      icon: <Beaker className="w-6 h-6" />
    },
    {
      name: 'Biology',
      code: 'BIO',
      level: 'SSS',
      category: 'Elective',
      description: 'Study of living organisms, their structure, function, growth, and evolution. Includes practical laboratory work.',
      duration: 4,
      classSize: 25,
      teacher: 'Dr. K. Adebayo',
      examBoard: 'WAEC/NECO',
      prerequisites: ['Basic Science'],
      icon: <BookOpen className="w-6 h-6" />
    },
    
    // Arts Subjects
    {
      name: 'Literature in English',
      code: 'LIT',
      level: 'SSS',
      category: 'Elective',
      description: 'Study of prose, poetry, and drama from various cultures. Develops critical thinking and appreciation for literature.',
      duration: 4,
      classSize: 30,
      teacher: 'Mr. E. Bassey',
      examBoard: 'WAEC/NECO',
      prerequisites: ['English Language'],
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      name: 'Government',
      code: 'GOV',
      level: 'SSS',
      category: 'Elective',
      description: 'Study of political systems, governance, and civic responsibilities. Essential for understanding democracy and citizenship.',
      duration: 4,
      classSize: 35,
      teacher: 'Mr. B. Ajayi',
      examBoard: 'WAEC/NECO',
      icon: <Globe className="w-6 h-6" />
    },
    {
      name: 'History',
      code: 'HIS',
      level: 'SSS',
      category: 'Elective',
      description: 'Comprehensive study of Nigerian and world history, covering political, social, and economic developments.',
      duration: 4,
      classSize: 30,
      teacher: 'Mr. B. Ajayi',
      examBoard: 'WAEC/NECO',
      icon: <Globe className="w-6 h-6" />
    },
    
    // Commercial Subjects
    {
      name: 'Economics',
      code: 'ECO',
      level: 'SSS',
      category: 'Elective',
      description: 'Study of production, distribution, and consumption of goods and services. Includes microeconomics and macroeconomics.',
      duration: 4,
      classSize: 35,
      teacher: 'Mrs. A. Tijani',
      examBoard: 'WAEC/NECO',
      icon: <Calculator className="w-6 h-6" />
    },
    {
      name: 'Accounting',
      code: 'ACC',
      level: 'SSS',
      category: 'Elective',
      description: 'Principles of financial accounting, including bookkeeping, financial statements, and business analysis.',
      duration: 4,
      classSize: 30,
      teacher: 'Mr. J. Okafor',
      examBoard: 'WAEC/NECO',
      icon: <Calculator className="w-6 h-6" />
    },
    
    // Other Subjects
    {
      name: 'Computer Studies',
      code: 'CMP',
      level: 'Both',
      category: 'Core',
      description: 'Introduction to computer literacy, programming basics, and digital skills essential for the modern world.',
      duration: 3,
      classSize: 20,
      teacher: 'Mrs. H. Mohammed',
      examBoard: 'WAEC/NECO',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      name: 'Creative Arts',
      code: 'CRA',
      level: 'JSS',
      category: 'Core',
      description: 'Visual arts, music, and drama. Develops creativity, cultural awareness, and artistic expression.',
      duration: 2,
      classSize: 25,
      teacher: 'Mrs. M. Adamu',
      examBoard: 'BECE',
      icon: <Palette className="w-6 h-6" />
    },
    {
      name: 'Physical Education',
      code: 'PHE',
      level: 'Both',
      category: 'Core',
      description: 'Physical fitness, sports, and health education. Promotes healthy lifestyle and teamwork skills.',
      duration: 2,
      classSize: 40,
      teacher: 'Mr. S. Ogbonna',
      examBoard: 'WAEC/NECO',
      icon: <Dumbbell className="w-6 h-6" />
    }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const levelMatch = selectedLevel === 'all' || subject.level === selectedLevel || subject.level === 'Both';
    const categoryMatch = selectedCategory === 'all' || subject.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-max py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Subject Offerings
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
              Comprehensive curriculum aligned with Nigerian education standards
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Education Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="input-base w-full"
              >
                <option value="all">All Levels</option>
                <option value="JSS">Junior Secondary (JSS)</option>
                <option value="SSS">Senior Secondary (SSS)</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Subject Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-base w-full"
              >
                <option value="all">All Categories</option>
                <option value="Core">Core Subjects</option>
                <option value="Elective">Elective Subjects</option>
                <option value="Vocational">Vocational Subjects</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="section-padding">
        <div className="container-max">
          {filteredSubjects.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-neutral-600" />
                <span className="text-neutral-600">
                  Showing {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map((subject, index) => (
                  <SubjectCard key={index} subject={subject} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                No subjects found
              </h3>
              <p className="text-neutral-500">
                Try adjusting your filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Subject Streams Info */}
      <div className="bg-white border-t border-neutral-200">
        <div className="container-max py-12">
          <h2 className="text-2xl font-bold text-center text-neutral-800 mb-8">
            Senior Secondary Subject Streams
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-base text-center border-l-4 border-secondary-600">
              <Beaker className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Science Stream
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                For students interested in medicine, engineering, and science-related careers
              </p>
              <div className="text-xs text-neutral-500">
                Core + Physics, Chemistry, Biology, Further Mathematics
              </div>
            </div>
            
            <div className="card-base text-center border-l-4 border-primary-600">
              <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Arts Stream
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                For students interested in law, education, and humanities careers
              </p>
              <div className="text-xs text-neutral-500">
                Core + Literature, History, Government, Economics
              </div>
            </div>
            
            <div className="card-base text-center border-l-4 border-accent-600">
              <Calculator className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                Commercial Stream
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                For students interested in business, accounting, and commerce careers
              </p>
              <div className="text-xs text-neutral-500">
                Core + Accounting, Economics, Commerce, Marketing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
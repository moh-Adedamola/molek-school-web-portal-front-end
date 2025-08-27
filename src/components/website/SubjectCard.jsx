import { BookOpen, Users, Clock, Award, ChevronRight } from 'lucide-react';

const SubjectCard = ({ 
  subject = {
    name: "Mathematics",
    level: "JSS & SSS",
    teacher: "Mr. Adewale Ogundimu",
    students: 45,
    duration: "3 years",
    description: "Comprehensive mathematics program covering algebra, geometry, and statistics",
    category: "Core",
    examType: "WAEC/NECO",
    image: null
  },
  onClick,
  variant = "default" // "default", "compact", "featured"
}) => {
  const categoryColors = {
    Core: "bg-primary-100 text-primary-800 border-primary-200",
    Elective: "bg-secondary-100 text-secondary-800 border-secondary-200",
    Vocational: "bg-accent-100 text-accent-800 border-accent-200",
    Arts: "bg-purple-100 text-purple-800 border-purple-200",
    Science: "bg-blue-100 text-blue-800 border-blue-200",
    Commercial: "bg-green-100 text-green-800 border-green-200"
  };

  const levelColors = {
    JSS: "bg-blue-50 text-blue-700",
    SSS: "bg-indigo-50 text-indigo-700",
    "JSS & SSS": "bg-primary-50 text-primary-700"
  };

  if (variant === "compact") {
    return (
      <div 
        className="bg-white rounded-xl border border-neutral-200 hover:border-primary-300 p-4 transition-all duration-300 hover:shadow-lg cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 group-hover:text-primary-800 transition-colors duration-200">
                {subject.name}
              </h3>
              <p className="text-xs text-neutral-500">{subject.level}</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 transition-colors duration-200" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[subject.category] || categoryColors.Core}`}>
            {subject.category}
          </span>
          <div className="flex items-center text-xs text-neutral-500">
            <Users className="h-3 w-3 mr-1" />
            {subject.students}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[subject.category] || categoryColors.Core}`}>
            {subject.category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-primary-800 mb-2 group-hover:text-primary-900 transition-colors duration-200">
          {subject.name}
        </h3>
        
        <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
          {subject.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Users className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-neutral-700">Students</span>
            </div>
            <p className="text-lg font-bold text-primary-800">{subject.students}</p>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-neutral-700">Duration</span>
            </div>
            <p className="text-lg font-bold text-primary-800">{subject.duration}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-primary-200">
          <div>
            <p className="text-xs text-neutral-500 mb-1">Teacher</p>
            <p className="font-medium text-neutral-800">{subject.teacher}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500 mb-1">Level</p>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${levelColors[subject.level] || levelColors["JSS & SSS"]}`}>
              {subject.level}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-primary-200">
          <button 
            onClick={onClick}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg"
          >
            <span>View Details</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className="bg-white rounded-xl border border-neutral-200 hover:border-primary-300 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-800 group-hover:text-primary-800 transition-colors duration-200">
                {subject.name}
              </h3>
              <p className="text-sm text-neutral-500">{subject.examType}</p>
            </div>
          </div>
          
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[subject.category] || categoryColors.Core}`}>
            {subject.category}
          </span>
        </div>

        <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
          {subject.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-neutral-50 rounded-lg">
            <Users className="h-5 w-5 text-primary-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-neutral-800">{subject.students}</p>
            <p className="text-xs text-neutral-500">Students</p>
          </div>
          <div className="text-center p-3 bg-neutral-50 rounded-lg">
            <Clock className="h-5 w-5 text-secondary-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-neutral-800">{subject.duration}</p>
            <p className="text-xs text-neutral-500">Duration</p>
          </div>
          <div className="text-center p-3 bg-neutral-50 rounded-lg">
            <Award className="h-5 w-5 text-accent-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-neutral-800">A+</p>
            <p className="text-xs text-neutral-500">Grade</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {subject.teacher.split(' ').map(name => name[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-800">{subject.teacher}</p>
              <p className="text-xs text-neutral-500">Subject Teacher</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${levelColors[subject.level] || levelColors["JSS & SSS"]}`}>
              {subject.level}
            </span>
            <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-600 transition-colors duration-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
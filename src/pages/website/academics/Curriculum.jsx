// pages/website/academics/Curriculum.jsx
import { Target, BookOpen, Users, Award } from 'lucide-react';

const Curriculum = () => {
  const curriculumFeatures = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Outcome-Based Learning",
      description: "Focus on measurable student outcomes and competency development",
      color: "blue"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Nigerian Curriculum",
      description: "Aligned with Federal Ministry of Education standards",
      color: "green"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Interactive Teaching",
      description: "Student-centered learning with practical applications",
      color: "orange"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Assessment Methods",
      description: "Continuous assessment and standardized examinations",
      color: "purple"
    }
  ];

  const learningAreas = [
    {
      level: "JSS 1-3",
      focus: "Foundation & Exploration",
      objectives: [
        "Develop basic literacy and numeracy skills",
        "Introduction to science and technology concepts",
        "Cultural and social awareness building",
        "Creative and physical development"
      ],
      color: "primary"
    },
    {
      level: "SSS 1-3", 
      focus: "Specialization & Preparation",
      objectives: [
        "Deep subject specialization in chosen stream",
        "Critical thinking and problem-solving skills",
        "WAEC/NECO examination preparation",
        "University and career readiness"
      ],
      color: "secondary"
    }
  ];

  const assessmentStructure = [
    { type: "Continuous Assessment", weight: "40%", color: "blue", description: "Tests, assignments, projects" },
    { type: "Mid-term Examinations", weight: "20%", color: "green", description: "Formal mid-term tests" },
    { type: "Terminal Examinations", weight: "40%", color: "orange", description: "End of term exams" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Curriculum</h1>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Comprehensive educational framework designed to nurture well-rounded students ready for higher education and life challenges
          </p>
        </div>
      </div>

      {/* Curriculum Features */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Curriculum Approach</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {curriculumFeatures.map((feature, index) => (
              <div key={index} className={`text-center p-6 bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-xl shadow-lg`}>
                <div className={`text-${feature.color}-600 mb-4 flex justify-center`}>
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-bold text-${feature.color}-800 mb-3`}>{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Areas by Level */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Learning Objectives by Level</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {learningAreas.map((area, index) => (
              <div key={index} className={`bg-gradient-to-br from-${area.color}-50 to-${area.color}-100 p-8 rounded-2xl shadow-lg`}>
                <div className={`bg-${area.color}-600 text-white px-4 py-2 rounded-lg inline-block mb-4`}>
                  {area.level}
                </div>
                <h3 className={`text-2xl font-bold text-${area.color}-800 mb-4`}>{area.focus}</h3>
                <ul className="space-y-3">
                  {area.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`w-2 h-2 bg-${area.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></span>
                      <span className="text-neutral-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment Structure */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Assessment Structure</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {assessmentStructure.map((assessment, index) => (
              <div key={index} className="text-center">
                <div className={`bg-${assessment.color}-100 p-8 rounded-2xl shadow-lg mb-4`}>
                  <div className={`text-4xl font-bold text-${assessment.color}-600 mb-2`}>
                    {assessment.weight}
                  </div>
                  <h3 className={`text-xl font-bold text-${assessment.color}-800 mb-3`}>
                    {assessment.type}
                  </h3>
                  <p className="text-neutral-600">{assessment.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Standards */}
      <div className="py-16 bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Academic Standards & Recognition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-2xl font-bold mb-2">NERDC</div>
              <div className="text-sm text-primary-200">Nigerian Educational Research & Development Council Approved</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-2xl font-bold mb-2">WAEC</div>
              <div className="text-sm text-primary-200">West African Examinations Council Recognized</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-2xl font-bold mb-2">NECO</div>
              <div className="text-sm text-primary-200">National Examinations Council Accredited</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="text-2xl font-bold mb-2">FME</div>
              <div className="text-sm text-primary-200">Federal Ministry of Education Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
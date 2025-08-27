// pages/website/academics/Academics.jsx
import { BookOpen, Users, Trophy, Clock } from 'lucide-react';

const Academics = () => {
  const programs = [
    {
      title: "Junior Secondary School (JSS 1-3)",
      description: "Foundation years focusing on core subjects and skill development",
      duration: "3 Years",
      students: "450+",
      color: "primary"
    },
    {
      title: "Senior Secondary School (SSS 1-3)", 
      description: "Specialized streams: Sciences, Arts, and Commercial",
      duration: "3 Years",
      students: "380+",
      color: "secondary"
    }
  ];

  const streams = [
    { name: "Sciences", subjects: "Mathematics, Physics, Chemistry, Biology", icon: "🔬", color: "blue" },
    { name: "Arts", subjects: "Literature, History, Government, CRS", icon: "📚", color: "green" },
    { name: "Commercial", subjects: "Accounting, Economics, Commerce, Marketing", icon: "💼", color: "orange" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="bg-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Academic Programs</h1>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Excellence in education through comprehensive Nigerian curriculum and modern teaching methods
          </p>
        </div>
      </div>

      {/* Programs Overview */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div key={index} className={`bg-gradient-to-br from-${program.color}-50 to-${program.color}-100 p-8 rounded-2xl shadow-lg`}>
                <BookOpen className={`w-12 h-12 text-${program.color}-600 mb-4`} />
                <h3 className={`text-2xl font-bold text-${program.color}-800 mb-4`}>{program.title}</h3>
                <p className="text-neutral-600 mb-6">{program.description}</p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-neutral-500" />
                    <span className="text-sm">{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-neutral-500" />
                    <span className="text-sm">{program.students} Students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SSS Streams */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">SSS Specialization Streams</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {streams.map((stream, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4 text-center">{stream.icon}</div>
                <h3 className={`text-xl font-bold text-${stream.color}-600 text-center mb-4`}>{stream.name}</h3>
                <p className="text-neutral-600 text-center text-sm">{stream.subjects}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Stats */}
      <div className="py-16 bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">98%</div>
              <div className="text-primary-200">WAEC Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-400 mb-2">45+</div>
              <div className="text-primary-200">Qualified Teachers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent-400 mb-2">830+</div>
              <div className="text-primary-200">Total Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-400 mb-2">15+</div>
              <div className="text-primary-200">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;
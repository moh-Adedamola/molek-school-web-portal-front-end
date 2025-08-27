// pages/website/admissions/Admissions.jsx
import { CheckCircle, FileText, Users, Calendar } from 'lucide-react';

const Admissions = () => {
  const steps = [
    { title: "Application", desc: "Complete online form", icon: <FileText className="w-8 h-8" />, color: "blue" },
    { title: "Assessment", desc: "Entrance examination", icon: <BookOpen className="w-8 h-8" />, color: "green" },
    { title: "Interview", desc: "Student and parent meeting", icon: <Users className="w-8 h-8" />, color: "orange" },
    { title: "Admission", desc: "Confirmation and enrollment", icon: <CheckCircle className="w-8 h-8" />, color: "purple" }
  ];

  const levels = [
    {
      title: "JSS 1 Admission",
      age: "Ages 10-11",
      requirements: ["Primary 6 certificate", "Entrance exam", "Interview"],
      color: "blue",
      available: 150
    },
    {
      title: "JSS 2-3 Transfer", 
      age: "Ages 11-13",
      requirements: ["Previous school records", "Transfer certificate", "Assessment test"],
      color: "green", 
      available: 30
    },
    {
      title: "SSS 1 Admission",
      age: "Ages 13-14", 
      requirements: ["JSS 3 certificate", "BECE results", "Stream selection"],
      color: "orange",
      available: 120
    }
  ];

  const timeline = [
    { period: "Jan - Mar", activity: "Application Period", status: "open", color: "green" },
    { period: "Apr", activity: "Entrance Examinations", status: "upcoming", color: "blue" },
    { period: "May", activity: "Interviews & Results", status: "upcoming", color: "orange" },
    { period: "Jun - Jul", activity: "Registration & Payment", status: "upcoming", color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero */}
      <div className="bg-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Admissions</h1>
          <p className="text-xl text-primary-200 mb-8">Join our community of academic excellence</p>
          <button className="btn-accent px-8 py-4 rounded-lg font-semibold text-lg">
            Start Application
          </button>
        </div>
      </div>

      {/* Admission Process */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className={`bg-${step.color}-100 p-6 rounded-2xl shadow-lg mb-4`}>
                  <div className={`text-${step.color}-600 mb-4 flex justify-center`}>{step.icon}</div>
                  <div className={`w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold`}>
                    {i + 1}
                  </div>
                  <h3 className={`font-bold text-${step.color}-800 mb-2`}>{step.title}</h3>
                  <p className="text-neutral-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admission Levels */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Admission Levels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {levels.map((level, i) => (
              <div key={i} className={`bg-white p-6 rounded-xl shadow-lg border-t-4 border-${level.color}-500`}>
                <h3 className={`text-xl font-bold text-${level.color}-800 mb-2`}>{level.title}</h3>
                <p className="text-neutral-600 mb-4">{level.age}</p>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Requirements:</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {level.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-${level.color}-50 p-3 rounded text-center`}>
                  <span className="text-sm text-neutral-600">Available Spaces: </span>
                  <span className={`font-bold text-${level.color}-600`}>{level.available}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Admission Timeline 2025</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((time, i) => (
              <div key={i} className="text-center">
                <div className={`bg-white/10 p-6 rounded-xl border-2 ${time.status === 'open' ? 'border-green-400' : 'border-white/20'}`}>
                  <div className="text-xl font-bold mb-2">{time.period}</div>
                  <div className="text-primary-200 mb-3">{time.activity}</div>
                  <span className={`px-3 py-1 text-xs bg-${time.color}-500 text-white rounded-full capitalize`}>
                    {time.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;
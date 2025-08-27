// pages/website/admissions/HowToApply.jsx
import { User, FileText, CreditCard, CheckCircle, Clock, Phone } from 'lucide-react';

const HowToApply = () => {
  const steps = [
    {
      step: 1,
      title: "Create Account",
      desc: "Register online with parent/guardian email",
      icon: <User className="w-8 h-8" />,
      color: "blue",
      details: ["Valid email address", "Phone number", "Basic information"]
    },
    {
      step: 2, 
      title: "Complete Application",
      desc: "Fill out student information and upload documents",
      icon: <FileText className="w-8 h-8" />,
      color: "green",
      details: ["Student personal details", "Academic history", "Document uploads", "Stream preference (SSS only)"]
    },
    {
      step: 3,
      title: "Pay Application Fee", 
      desc: "Secure online payment or bank transfer",
      icon: <CreditCard className="w-8 h-8" />,
      color: "orange",
      details: ["JSS 1: ₦5,000", "JSS 2-3: ₦7,500", "SSS 1: ₦8,000", "Payment confirmation"]
    },
    {
      step: 4,
      title: "Schedule Examination",
      desc: "Book entrance exam and interview slots",
      icon: <Clock className="w-8 h-8" />,
      color: "purple", 
      details: ["Choose exam date", "Select time slot", "Interview appointment", "Receive confirmation"]
    },
    {
      step: 5,
      title: "Attend Assessment",
      desc: "Take entrance exam and interview",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "red",
      details: ["Arrive 30 minutes early", "Bring required documents", "Complete written test", "Parent-student interview"]
    },
    {
      step: 6,
      title: "Await Results",
      desc: "Results notification within 2 weeks",
      icon: <Phone className="w-8 h-8" />,
      color: "teal",
      details: ["Email notification", "SMS alert", "Online portal update", "Admission letter download"]
    }
  ];

  const tips = [
    { title: "Early Application", desc: "Apply early for better chances", color: "blue" },
    { title: "Document Quality", desc: "Ensure all documents are clear and complete", color: "green" },
    { title: "Exam Preparation", desc: "Review basic concepts for your level", color: "orange" },
    { title: "Interview Readiness", desc: "Prepare student for friendly interview", color: "purple" }
  ];

  const timeline = [
    { period: "January - February", activity: "Application Opens", color: "green" },
    { period: "March", activity: "Application Deadline", color: "orange" },
    { period: "April", activity: "Entrance Examinations", color: "blue" },
    { period: "May", activity: "Results & Admission", color: "purple" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero */}
      <div className="bg-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">How to Apply</h1>
          <p className="text-xl text-primary-200 mb-8">Simple steps to join our school community</p>
          <button className="btn-accent px-8 py-4 rounded-lg font-semibold text-lg">
            Start Application Now
          </button>
        </div>
      </div>

      {/* Application Steps */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Application Process</h2>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className={`bg-${step.color}-50 p-6 rounded-2xl shadow-lg border-l-4 border-${step.color}-500`}>
                <div className="grid md:grid-cols-4 gap-6 items-start">
                  <div className="text-center md:text-left">
                    <div className={`bg-${step.color}-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4`}>
                      <span className="text-2xl font-bold">{step.step}</span>
                    </div>
                    <div className={`text-${step.color}-600 mb-2 flex justify-center md:justify-start`}>
                      {step.icon}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className={`text-xl font-bold text-${step.color}-800 mb-2`}>{step.title}</h3>
                    <p className="text-neutral-600 mb-4">{step.desc}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className={`w-2 h-2 bg-${step.color}-500 rounded-full mt-2 mr-2 flex-shrink-0`}></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Timeline */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Application Timeline 2025</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((time, i) => (
              <div key={i} className="text-center">
                <div className={`bg-${time.color}-100 p-6 rounded-xl shadow-lg mb-4`}>
                  <div className={`text-lg font-bold text-${time.color}-800 mb-2`}>{time.period}</div>
                  <div className="text-neutral-600">{time.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful Tips */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Application Tips</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {tips.map((tip, i) => (
              <div key={i} className={`bg-${tip.color}-50 p-6 rounded-xl shadow-lg text-center border-t-4 border-${tip.color}-500`}>
                <h3 className={`font-bold text-${tip.color}-800 mb-3`}>{tip.title}</h3>
                <p className="text-neutral-600 text-sm">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="py-16 bg-primary-800 text-white text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Need Support?</h2>
          <p className="text-primary-200 mb-8">Our admissions team is here to help</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <div className="font-bold">Call Us</div>
              <div className="text-sm text-primary-200">+234-XXX-XXXX</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <FileText className="w-8 h-8 mx-auto mb-3" />
              <div className="font-bold">Email</div>
              <div className="text-sm text-primary-200">admissions@school.com</div>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <Clock className="w-8 h-8 mx-auto mb-3" />
              <div className="font-bold">Office Hours</div>
              <div className="text-sm text-primary-200">Mon-Fri: 8AM-4PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToApply;
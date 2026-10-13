import { Banknote, FileText, GraduationCap, Heart, ShieldCheck, Star, Trophy, Wrench } from 'lucide-react';

const teachingQualities = ["Professionalism", "Academic Excellence", "Subject Mastery", "Punctuality", "Obedience", "Dedication", "Good Behaviour", "Self-Control", "Discipline"];
const nonTeachingRoles = ["Secretary", "Cleaner", "Gardener", "Library Assistant", "Laboratory Attendant", "Account Assistant", "Crèche Attendant/Assistant", "Gate Keeper"];
const codeOfConductAreas = ["Discipline Standards", "Attendance Requirements", "Professional Dressing", "Inter-personal Relationships", "Staff Collaboration", "Parent Communication", "Student Interaction", "Teacher-Specific Rules"];
const welfareIncentives = ["Competitive Remuneration", "Regular Payment Schedule", "Annual Performance Increment", "Staff Development Training", "Welfare Incentives", "Professional Growth Support"];

const StaffQualityWelfare = () => {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#FAFAFA]">
      <header className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2563EB] mb-4">
          Staff Quality & Welfare
        </h2>
        <p className="text-[#2D2D2D] mt-4 max-w-3xl mx-auto text-lg">
          At MOLEK Schools, we believe that quality education begins with quality educators. 
          Our comprehensive staffing approach ensures excellence at every level.
        </p>
      </header>

      <article className="bg-[#1F3B6B] text-white p-8 rounded-2xl shadow-lg mb-16">
        <div className="flex items-center gap-4 mb-6">
          <GraduationCap className="w-10 h-10" />
          <h3 className="text-2xl font-bold">Teaching Staff Excellence</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-200">
              <Trophy className="w-6 h-6" /> Rigorous Selection Process
            </h4>
            <ul className="space-y-2 text-gray-200">
              {["Highly competitive recruitment process", "Comprehensive oral interviews", "Written subject assessments", "Micro-teaching demonstrations", "Subject-specific expertise evaluation"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Star fill="currentColor" className="w-4 h-4 mt-1 flex-shrink-0 text-[#2563EB]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-200">
              <Trophy className="w-6 h-6" /> Professional Qualifications
            </h4>
            <ul className="space-y-2 text-gray-200">
              {["Minimum: Nigerian Certificate in Education (NCE)", "HND and Bachelor's degree holders", "Post Graduate Diploma in Education (PGDE)", "Continuous professional development"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Star fill="currentColor" className="w-4 h-4 mt-1 flex-shrink-0 text-[#2563EB]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-white text-opacity-90 mb-6 text-lg">
          Our dedicated non-teaching staff provide essential support services with necessary competence and experience.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nonTeachingRoles.map((role, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm p-3 rounded-xl text-center hover:scale-105 transition-transform">
              <p className="font-medium text-white text-sm">{role}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <article className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#E85D5D]">
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-8 h-8 text-red-700" />
            <h3 className="text-2xl font-bold text-[#2563EB]">Staff Welfare</h3>
          </div>
          <p className="text-[#2D2D2D] mb-6">
            We prioritize our staff's wellbeing with comprehensive welfare packages and growth opportunities.
          </p>
          <div className="space-y-3">
            {welfareIncentives.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#3B82F6]/10 p-3 rounded-xl">
                <Banknote className="w-5 h-5 text-[#2563EB]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#F9D89C]">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-8 h-8 text-[#F9D89C]" />
            <h3 className="text-2xl font-bold text-[#2563EB]">Code of Conduct</h3>
          </div>
          <p className="text-[#2D2D2D] mb-6">
            Our documented Code of Conduct ensures professional standards and maintains our institutional excellence.
          </p>
          <div className="space-y-3">
            {codeOfConductAreas.map((area, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#F9D89C]/30 p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                <span className="font-medium">{area}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#F9D89C]/40 rounded-xl">
            <p className="text-sm font-medium">
              <strong>Note:</strong> All staff receive the Code of Conduct upon assumption of duty. Breach of conduct attracts appropriate sanctions.
            </p>
          </div>
        </article>
      </div>

      <aside className="mt-12 bg-white p-6 rounded-2xl border-l-4 border-[#1F3B6B] shadow-md">
        <div className="flex items-start gap-4">
          <Wrench className="w-6 h-6 text-[#2563EB] mt-1" />
          <div>
            <h4 className="font-semibold text-[#2563EB] mb-2">Class Assistants & Support</h4>
            <p className="text-[#2D2D2D]">
              Class Assistants/Helpers support teachers in lower Nursery classes. These dedicated professionals are Senior Secondary School Certificate holders who provide essential classroom support for our youngest learners.
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default StaffQualityWelfare;
import { Target, Eye, Sparkles } from "lucide-react";
import { Star, Shield, Users, Lightbulb, Heart, UserCheck } from "lucide-react";

const principles = [
  { label: "Excellence", icon: Star, color: "#3B82F6" },
  { label: "Integrity", icon: Shield, color: "#E85D5D" },
  { label: "Respect", icon: Users, color: "#1F3B6B" },
  { label: "Innovation", icon: Lightbulb, color: "#F9D89C" },
  { label: "Responsibility", icon: Heart, color: "#3B82F6" },
  { label: "Leadership", icon: UserCheck, color: "#1F3B6B" },
];

const GuidingPrinciples = () => {
  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <Target className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
              Our Foundation
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F3B6B] mb-4">
            Vision, Mission & Values
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The guiding principles that shape our educational philosophy
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <article className="bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
            <Eye className="w-12 h-12 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Vision</h3>
            <p className="text-blue-100 relative z-10 leading-relaxed">
              To be among the foremost privately-owned educational institutions in Nigeria, operating in line with esteemed expectations of parents, society, and government guidelines.
            </p>
          </article>

          <article className="bg-gradient-to-br from-[#E85D5D] to-[#d44a4a] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
            <Target className="w-12 h-12 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Mission</h3>
            <p className="text-red-100 relative z-10 leading-relaxed">
              To provide qualitative, functional and moral education with sound Islamic values at affordable cost, employing Montessori Method of teaching.
            </p>
          </article>

          <article className="bg-gradient-to-br from-[#F9D89C] to-[#f0c97a] text-[#1F3B6B] p-8 rounded-3xl shadow-xl relative overflow-hidden group">
            <Sparkles className="w-12 h-12 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Philosophy</h3>
            <p className="text-[#1F3B6B]/80 relative z-10 leading-relaxed">
              We develop the whole child—intellectually, emotionally, socially, and morally—nurturing well-rounded individuals.
            </p>
          </article>
        </section>

        <section className="bg-gradient-to-b from-[#FAFAFA] to-white rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center text-[#1F3B6B] mb-12">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-2"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <span className="block text-center font-bold text-[#1F3B6B] text-sm">
                    {item.label}
                  </span>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default GuidingPrinciples;
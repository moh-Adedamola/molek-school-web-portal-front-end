import { motion } from "framer-motion";
import { Star, Shield, Users, Lightbulb, Heart, UserCheck, Target, Eye, Sparkles } from "lucide-react";

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
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <Eye className="w-12 h-12 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Vision</h3>
            <p className="text-blue-100 relative z-10 leading-relaxed">
              To be among the foremost privately-owned educational institutions in Nigeria, operating in line with esteemed expectations of parents, society, and government guidelines.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#E85D5D] to-[#d44a4a] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <Target className="w-12 h-12 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Mission</h3>
            <p className="text-red-100 relative z-10 leading-relaxed">
              To provide qualitative, functional and moral education with sound Islamic values at affordable cost, employing Montessori Method of teaching.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#F9D89C] to-[#f0c97a] text-[#1F3B6B] p-8 rounded-3xl shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <Sparkles className="w-12 h-12 mb-4 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Philosophy</h3>
            <p className="text-[#1F3B6B]/80 relative z-10 leading-relaxed">
              We develop the whole child—intellectually, emotionally, socially, and morally—nurturing well-rounded individuals.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-b from-[#FAFAFA] to-white rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold text-center text-[#1F3B6B] mb-12">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
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
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuidingPrinciples;
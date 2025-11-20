import { motion } from "framer-motion";
import { School, BookOpen, Users, Award } from "lucide-react";

const AboutSchool = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <School className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F3B6B] mb-6">
            Welcome to MOLEK Schools
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] mx-auto rounded-full" />
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100"
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
            MOLEK Schools are a group of schools offering both <span className="font-semibold text-[#3B82F6]">Western and Islamic education</span> from Pre-Nursery through Primary to the Secondary Classes. The school is co-educational, and admits children of all religious faiths, who are ready to abide by the school Rules and Regulations in line with Islamic way of life.
          </p>
          
          <div className="mt-8 bg-[#F9D89C]/20 border-l-4 border-[#3B82F6] p-6 rounded-r-2xl">
            <p className="text-gray-700 italic">
              <span className="font-bold text-[#1F3B6B]">"There is no compulsion in religion"</span> - No child is compelled or induced to embrace Islam.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: BookOpen,
              title: "Dual Curriculum",
              description: "Comprehensive Western & Islamic education",
              color: "#3B82F6"
            },
            {
              icon: Users,
              title: "Inclusive Environment",
              description: "All faiths welcome in our community",
              color: "#1F3B6B"
            },
            {
              icon: Award,
              title: "Excellence Driven",
              description: "Committed to academic & moral growth",
              color: "#E85D5D"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#1F3B6B] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSchool;
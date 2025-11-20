import { motion } from "framer-motion";
import {
  School, GraduationCap, Users, Award,
  TrendingUp, Book, Sprout, HandHeart, Clock,
  AwardIcon
} from "lucide-react";

const milestones = [
  {
    year: "2007",
    title: "Foundation & First Day",
    desc: "MOLEK Schools commenced operation on September 3rd with 2 pupils and 6 staff members.",
    icon: Sprout,
    color: "#1F3B6B"
  },
  {
    year: "2008",
    title: "Government Recognition",
    desc: "Nursery School officially recognized and approved by Osun State government in April.",
    icon: AwardIcon,
    color: "#3B82F6"
  },
  {
    year: "2008",
    title: "Early Growth",
    desc: "Student population grew from 2 to 19 pupils by end of first academic session.",
    icon: TrendingUp,
    color: "#E85D5D"
  },
  {
    year: "2010",
    title: "First Graduate",
    desc: "Master Ismail Oyelude became the first pupil to graduate from MOLEK Primary School.",
    icon: GraduationCap,
    color: "#F9D89C"
  },
  {
    year: "2012",
    title: "Primary School Recognition",
    desc: "Primary School section officially recognized and approved by Osun State government.",
    icon: School,
    color: "#1F3B6B"
  },
  {
    year: "2013",
    title: "Secondary School & First BECE",
    desc: "Secondary School approved by government. First JSS3 students achieved 100% pass rate in BECE.",
    icon: Award,
    color: "#3B82F6"
  },
  {
    year: "2016",
    title: "WAEC & NECO Success",
    desc: "First SS3 students sat for WAEC and NECO examinations with excellent results.",
    icon: AwardIcon,
    color: "#E85D5D"
  },
  {
    year: "2016",
    title: "NECO BECE Achievement",
    desc: "100% pass rate achieved in NECO Basic Education Certificate Examination.",
    icon: Book,
    color: "#F9D89C"
  },
  {
    year: "2019",
    title: "Major Expansion",
    desc: "Student population reached nearly 900 with 78 staff members (61 teaching, 17 non-teaching).",
    icon: Users,
    color: "#1F3B6B"
  }
];

const SchoolHistory = () => {
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
            <Clock className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
              Our Journey
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F3B6B] mb-6">
            Our History
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From humble beginnings to educational excellence
          </p>
        </motion.div>

        {/* Foundation Story */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#F9D89C] via-[#f9e4b3] to-[#F9D89C] rounded-3xl p-8 md:p-12 mb-16 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#3B82F6] rounded-2xl">
                <HandHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F3B6B]">Foundation Story</h3>
            </div>
            <p className="text-gray-800 text-lg mb-4 leading-relaxed">
              <span className="font-bold text-[#3B82F6]">MOLEK Schools</span> - derived from ADEMOLA and AYANLEKAN (the Proprietors). 
              The journey began with a special prayer on Sunday, September 2nd, 2007, followed by the 
              official commencement on Monday, September 3rd, 2007.
            </p>
            <p className="text-gray-700">
              Our first students were <span className="font-semibold">Raji Abdul-Samad Ayodeji</span> (Primary 1) and <span className="font-semibold">Raji AbdulBasit Ayomide</span> (Primary 3), 
              supported by our founding team of dedicated educators.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B82F6] via-[#1F3B6B] to-[#E85D5D] rounded-full hidden md:block" />

          <div className="space-y-8">
            {milestones.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4" style={{ borderColor: item.color }}>
                      <div className="flex items-center gap-3 mb-3" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
                        <span className="text-2xl font-bold" style={{ color: item.color }}>{item.year}</span>
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                          <Icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-[#1F3B6B] mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>

                  {/* Center Icon (Desktop) */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: item.color }}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white px-8 py-4 rounded-full shadow-xl">
            <p className="text-lg font-semibold">
              "Alhamdulillah - Glory be to God for the growth from 2 students to nearly 900!"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SchoolHistory;
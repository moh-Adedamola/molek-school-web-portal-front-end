import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  TrophyIcon,
  SparklesIcon,
  BookOpenIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const Excellence = () => {
    const stats = [
        { value: "17+", label: "Years of Excellence", color: "#1F3B6B", icon: SparklesIcon },
        { value: "900+", label: "Active Students", color: "#3B82F6", icon: UserGroupIcon },
        { value: "95%", label: "WAEC/NECO Pass Rate", color: "#E85D5D", icon: TrophyIcon },
    ];

    const features = [
        {
            title: "95% Exam Success",
            desc: "Consistent excellent pass rate in WAEC, NECO, and BECE examinations since our first students in 2013-2016.",
            color: "#1F3B6B",
            icon: TrophyIcon
        },
        {
            title: "Montessori-Inspired Learning",
            desc: "We identify young talents, develop and modify them through active participation and discovery-based learning.",
            color: "#3B82F6",
            icon: BookOpenIcon
        },
        {
            title: "Holistic Islamic Education",
            desc: "Complete curriculum including Arabic Studies, Islamic Studies, Tahafeez (Quran Memorization), and conventional subjects.",
            color: "#E85D5D",
            icon: HeartIcon
        },
    ];

    return (
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E85D5D]/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
                    {/* Image */}
                    <motion.div
                        className="relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img
                                src="/excel.webp"
                                alt="MOLEK Schools Excellence"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1F3B6B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {/* Floating Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="absolute -top-4 -right-4 bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white px-6 py-3 rounded-2xl shadow-xl"
                        >
                            <p className="text-sm font-semibold">Est. 2007</p>
                        </motion.div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="order-1 lg:order-2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-2 rounded-full mb-4">
                            <AcademicCapIcon className="w-5 h-5 text-[#3B82F6]" />
                            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
                                Our Mission
                            </span>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3B6B] mb-6 leading-tight">
                            Excellence in{" "}
                            <span className="text-[#3B82F6]">Holistic Education</span>
                        </h2>
                        
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                            Building <span className="font-semibold text-[#1F3B6B]">GOD-FEARING</span> future leaders through quality education that combines Islamic values 
                            with modern academic excellence. From Creche to Senior Secondary, we nurture the <span className="font-semibold text-[#3B82F6]">TOTAL CHILD</span> with Montessori Method of Teaching.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/admissions" className="flex-1 sm:flex-initial">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all shadow-lg font-semibold"
                                >
                                    Apply for Admission
                                </motion.button>
                            </Link>
                            <Link to="/about" className="flex-1 sm:flex-initial">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto border-2 border-[#3B82F6] text-[#3B82F6] px-8 py-4 rounded-full hover:bg-[#3B82F6] hover:text-white transition-all font-semibold"
                                >
                                    Learn More
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 lg:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100"
                            style={{ borderTop: `4px solid ${stat.color}` }}
                        >
                            <div className="flex justify-center mb-4">
                                <div 
                                    className="p-3 rounded-full"
                                    style={{ backgroundColor: `${stat.color}15` }}
                                >
                                    <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                                </div>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                                {stat.value}
                            </h3>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    viewport={{ once: true }}
                >
                    {features.map((card, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                            variants={{ 
                                hidden: { opacity: 0, y: 30 }, 
                                visible: { opacity: 1, y: 0 } 
                            }}
                            whileHover={{ y: -8 }}
                            style={{ borderTop: `4px solid ${card.color}` }}
                        >
                            <div 
                                className="p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${card.color}15` }}
                            >
                                <card.icon className="w-8 h-8" style={{ color: card.color }} />
                            </div>
                            <h4 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: card.color }}>
                                {card.title}
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{card.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Recognition Banner */}
                <motion.div
                    className="relative bg-gradient-to-r from-[#F9D89C]/30 via-[#F9D89C]/20 to-[#F9D89C]/30 rounded-3xl p-8 lg:p-12 overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-2xl" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#E85D5D]/10 rounded-full blur-2xl" />
                    
                    <div className="relative text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-4"
                        >
                            <div className="bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white px-6 py-2 rounded-full text-sm font-bold">
                                Alhamdulillah - Glory be to Allah
                            </div>
                        </motion.div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold text-[#1F3B6B] mb-4">
                            From 19 Pupils to Nearly 900 Students
                        </h3>
                        
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                            Recognized and approved by <span className="font-semibold text-[#3B82F6]">Osun State Government</span> across all three sections: 
                            Nursery (2008), Primary (2012), and Secondary (2013). A testament to our commitment to excellence in Islamic education.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Excellence;
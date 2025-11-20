import { motion } from "framer-motion";
import {
    AcademicCapIcon,
    CheckCircleIcon,
    UserGroupIcon,
    BookOpenIcon,
    BeakerIcon,
    CalculatorIcon,
    SparklesIcon,
    TrophyIcon,
    HeartIcon,
    BuildingLibraryIcon,
    HandRaisedIcon,
    CogIcon,
    StarIcon,
    GlobeAltIcon,
    AcademicCapIcon as GraduationIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: "Complete Education Journey",
        description: "From Nursery to SSS - comprehensive programs covering ages 2-16 with seamless transitions between levels.",
        icon: AcademicCapIcon,
        color: "#1F3B6B"
    },
    {
        title: "WAEC & NECO Excellence", 
        description: "Consistent 95%+ pass rates with dedicated examination preparation and proven academic track record.",
        icon: CheckCircleIcon,
        color: "#3B82F6"
    },
    {
        title: "Islamic & Moral Foundation",
        description: "Strong emphasis on Islamic values, moral development, and character building alongside academic excellence.",
        icon: HeartIcon,
        color: "#E85D5D"
    },
    {
        title: "MOLEK Tradition",
        description: "Established tradition of qualitative, participatory education fostering cooperation and positive competition.",
        icon: BuildingLibraryIcon,
        color: "#F9D89C"
    },
    {
        title: "Multi-Stream Specialization",
        description: "Science, Arts/Humanity, and Commercial streams with Arabic, French, and specialized subject offerings.",
        icon: BookOpenIcon,
        color: "#1F3B6B"
    },
    {
        title: "Practical Skills Development",
        description: "Vocational training in Catering, Dress Making, Hair Dressing, and Soap Making for entrepreneurship.",
        icon: CogIcon,
        color: "#3B82F6"
    },
    {
        title: "Science Excellence",
        description: "Well-equipped laboratories for Physics, Chemistry, and Biology with hands-on practical sessions.",
        icon: BeakerIcon,
        color: "#E85D5D"
    },
    {
        title: "Small Class Advantage",
        description: "20-25 students in Secondary, under 20 in Nursery/Primary, ensuring personalized attention and quality interaction.",
        icon: UserGroupIcon,
        color: "#F9D89C"
    },
    {
        title: "Early Childhood Care",
        description: "Quality nursery and kindergarten programs supporting working parents with comprehensive child development.",
        icon: SparklesIcon,
        color: "#1F3B6B"
    },
    {
        title: "Examination Preparation",
        description: "Specialized preparation for National Common Entrance, WAEC, NECO and other external examinations.",
        icon: CalculatorIcon,
        color: "#3B82F6"
    },
    {
        title: "Self-Employment Focus",
        description: "Vocational programs designed to create future entrepreneurs and employers of labour in various industries.",
        icon: HandRaisedIcon,
        color: "#E85D5D"
    },
    {
        title: "Holistic Achievement",
        description: "40 hours weekly of comprehensive education including academics, sports, religious studies, and character development.",
        icon: TrophyIcon,
        color: "#F9D89C"
    },
];

const successStories = [
    {
        icon: TrophyIcon,
        title: "Outstanding Results",
        description: "Consistently recording excellent results with many distinction grades in all certificate examinations.",
        color: "#3B82F6"
    },
    {
        icon: GlobeAltIcon,
        title: "Tertiary Success",
        description: "Students gaining admission to top institutions within and outside Nigeria, many with scholarships.",
        color: "#1F3B6B"
    },
    {
        icon: GraduationIcon,
        title: "Professional Excellence",
        description: "Graduates excelling in Engineering, Medicine, Law, Accounting, Education, Nursing, and more.",
        color: "#E85D5D"
    },
    {
        icon: StarIcon,
        title: "Competition Champions",
        description: "Multiple medals and certificates in various inter-school competitions, demonstrating total excellence.",
        color: "#F9D89C"
    }
];

const WhyChooseUs = () => {
    return (
        <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#E85D5D]/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-2 rounded-full mb-4">
                        <StarIcon className="w-5 h-5 text-[#3B82F6]" />
                        <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
                            Our Advantages
                        </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3B6B] mb-6">
                        Why Choose <span className="text-[#3B82F6]">MOLEK Schools?</span>
                    </h2>
                    
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        Experience comprehensive education from nursery to secondary level with Islamic values, 
                        academic excellence, and practical skills development for the 21st century.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08 }
                        }
                    }}
                >
                    {features.map(({ title, description, icon: Icon, color }, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ y: -8 }}
                        >
                            <div 
                                className="mb-5 p-4 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${color}15` }}
                            >
                                <Icon className="w-8 h-8" style={{ color }} />
                            </div>
                            <h3 className="text-xl font-bold text-[#1F3B6B] mb-3 group-hover:text-[#3B82F6] transition-colors">
                                {title}
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Success Stories Section */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* Success Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-3 mb-6">
                                <TrophyIcon className="w-10 h-10 text-[#3B82F6]" />
                                <h2 className="text-3xl sm:text-4xl font-bold text-[#1F3B6B]">
                                    Our <span className="text-[#3B82F6]">Success Story</span>
                                </h2>
                            </div>
                            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                                Decades of proven excellence in nurturing future leaders and professionals
                            </p>
                        </motion.div>
                    </div>

                    {/* Success Cards */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.12 }
                            }
                        }}
                    >
                        {successStories.map((story, index) => (
                            <motion.div
                                key={index}
                                className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                whileHover={{ y: -10 }}
                            >
                                {/* Top Color Bar */}
                                <div 
                                    className="absolute top-0 left-0 right-0 h-1.5"
                                    style={{ backgroundColor: story.color }}
                                />
                                
                                <div 
                                    className="p-4 rounded-full w-fit mb-5 shadow-md group-hover:scale-110 transition-transform duration-300"
                                    style={{ backgroundColor: `${story.color}15` }}
                                >
                                    <story.icon className="w-8 h-8" style={{ color: story.color }} />
                                </div>
                                
                                <h3 className="text-xl font-bold text-[#1F3B6B] mb-3 group-hover:text-[#3B82F6] transition-colors">
                                    {story.title}
                                </h3>
                                
                                <p className="text-gray-700 leading-relaxed">
                                    {story.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* CTA Section */}
                <motion.div 
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="relative bg-gradient-to-r from-[#1F3B6B] via-[#3B82F6] to-[#1F3B6B] text-white rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        
                        <div className="relative">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                                Ready to Join the MOLEK Family?
                            </h3>
                            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                                Give your child the foundation they deserve with our proven educational excellence, 
                                Islamic values, and comprehensive development programs.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 bg-white text-[#3B82F6] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                            >
                                <span>Start Your Journey Today</span>
                                <GraduationIcon className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
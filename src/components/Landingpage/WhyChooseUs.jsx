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
    CogIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        title: "Complete Education Journey",
        description: "From Nursery to SSS - comprehensive programs covering ages 2-16 with seamless transitions between levels.",
        icon: AcademicCapIcon,
        color: "text-blue-900",
        gradient: "from-blue-50 to-indigo-50"
    },
    {
        title: "WAEC & NECO Excellence", 
        description: "Consistent 95%+ pass rates with dedicated examination preparation and proven academic track record.",
        icon: CheckCircleIcon,
        color: "text-green-700",
        gradient: "from-green-50 to-emerald-50"
    },
    {
        title: "Islamic & Moral Foundation",
        description: "Strong emphasis on Islamic values, moral development, and character building alongside academic excellence.",
        icon: HeartIcon,
        color: "text-purple-700",
        gradient: "from-purple-50 to-pink-50"
    },
    {
        title: "MOLEK Tradition",
        description: "Established tradition of qualitative, participatory education fostering cooperation and positive competition.",
        icon: BuildingLibraryIcon,
        color: "text-orange-600",
        gradient: "from-orange-50 to-yellow-50"
    },
    {
        title: "Multi-Stream Specialization",
        description: "Science, Arts/Humanity, and Commercial streams with Arabic, French, and specialized subject offerings.",
        icon: BookOpenIcon,
        color: "text-teal-600",
        gradient: "from-teal-50 to-cyan-50"
    },
    {
        title: "Practical Skills Development",
        description: "Vocational training in Catering, Dress Making, Hair Dressing, and Soap Making for entrepreneurship.",
        icon: CogIcon,
        color: "text-indigo-600",
        gradient: "from-indigo-50 to-blue-50"
    },
    {
        title: "Science Excellence",
        description: "Well-equipped laboratories for Physics, Chemistry, and Biology with hands-on practical sessions.",
        icon: BeakerIcon,
        color: "text-blue-900",
        gradient: "from-blue-50 to-slate-50"
    },
    {
        title: "Small Class Advantage",
        description: "Average class size of 25 students ensuring personalized attention and quality teacher-student interaction.",
        icon: UserGroupIcon,
        color: "text-green-700",
        gradient: "from-green-50 to-lime-50"
    },
    {
        title: "Early Childhood Care",
        description: "Quality nursery and kindergarten programs supporting working parents with comprehensive child development.",
        icon: SparklesIcon,
        color: "text-pink-600",
        gradient: "from-pink-50 to-rose-50"
    },
    {
        title: "Examination Preparation",
        description: "Specialized preparation for National Common Entrance, WAEC, NECO and other external examinations.",
        icon: CalculatorIcon,
        color: "text-emerald-600",
        gradient: "from-emerald-50 to-green-50"
    },
    {
        title: "Self-Employment Focus",
        description: "Vocational programs designed to create future entrepreneurs and employers of labour in various industries.",
        icon: HandRaisedIcon,
        color: "text-violet-600",
        gradient: "from-violet-50 to-purple-50"
    },
    {
        title: "Holistic Achievement",
        description: "40 hours weekly of comprehensive education including academics, sports, religious studies, and character development.",
        icon: TrophyIcon,
        color: "text-amber-600",
        gradient: "from-amber-50 to-orange-50"
    },
];

const WhyChooseUs = () => {
    return (
        <section className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                    Why Choose MOLEK Schools?
                </h2>
                <p className="text-gray-700 mt-4 max-w-3xl mx-auto text-lg">
                    Experience comprehensive education from nursery to secondary level with Islamic values, 
                    academic excellence, and practical skills development for the 21st century.
                </p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
            >
                {features.map(({ title, description, icon: Icon, color, gradient }, index) => (
                    <motion.div
                        key={index}
                        className={`bg-gradient-to-br ${gradient} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50`}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className={`mb-4 ${color} bg-white/80 p-3 rounded-lg w-fit`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                        <p className="text-gray-700 leading-relaxed">{description}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Ready to Join the MOLEK Family?</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Give your child the foundation they deserve with our proven educational excellence, 
                        Islamic values, and comprehensive development programs.
                    </p>
                    <motion.button 
                        className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your Journey Today
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default WhyChooseUs;
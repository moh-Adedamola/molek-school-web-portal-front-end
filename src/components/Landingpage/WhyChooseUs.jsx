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
        description: "Between 20 - 25 Students in our Secondary classes and under 20 Students in Nursery and Primary Sections, ensuring personalized attention and quality teacher-student interaction.",
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
        title: "Outstanding Examination Results",
        description: "Consistently recording excellent results with many distinction grades in Basic Education Certificate Examinations of Osun State and NECO, as well as WAEC and NECO Senior Secondary Certificate Examinations.",
        color: "#3B82F6"
    },
    {
        icon: GlobeAltIcon,
        title: "Tertiary Institution Success",
        description: "Our students consistently gain admission to tertiary institutions of their choice within and outside Nigeria, with many securing scholarships based on their exceptional performance.",
        color: "#1F3B6B"
    },
    {
        icon: GraduationIcon,
        title: "Professional Excellence",
        description: "Produced numerous university and polytechnic graduates excelling in Engineering, Medicine, Law, Accounting, Education, Nursing, and various other prestigious professions.",
        color: "#E85D5D"
    },
    {
        icon: StarIcon,
        title: "Competition Champions",
        description: "Our students have won multiple medals and certificates in various inter-school competitions, demonstrating excellence beyond the classroom.",
        color: "#F9D89C"
    }
];

const WhyChooseUs = () => {
    return (
        <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#FAFAFA]">
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold  text-[#3B82F6] mb-4">
                    Why Choose MOLEK Schools?
                </h2>
                <p className="text-[#2D2D2D] mt-4 max-w-3xl mx-auto text-lg">
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
                {features.map(({ title, description, icon: Icon, color }, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ y: -5 }}
                    >
                        <div 
                            className="mb-4 p-3 rounded-xl w-fit"
                            style={{ backgroundColor: `${color}20` }}
                        >
                            <Icon className="w-8 h-8" style={{ color }} />
                        </div>
                        <h3 className="text-xl font-semibold  text-[#3B82F6] mb-3">{title}</h3>
                        <p className="text-[#2D2D2D] leading-relaxed">{description}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Success Story Section */}
            <motion.div
                className="mt-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold  text-[#3B82F6] mb-4 flex items-center justify-center gap-3">
                            <TrophyIcon className="w-10 h-10 text-[#3B82F6]" />
                            Our Success Story
                        </h2>
                        <p className="text-[#2D2D2D] text-lg max-w-3xl mx-auto">
                            Decades of proven excellence in nurturing future leaders and professionals
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                >
                    {successStories.map((story, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            variants={{
                                hidden: { opacity: 0, x: -30 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            whileHover={{ scale: 1.03, y: -5 }}
                        >
                            <div 
                                className="p-4 rounded-full w-fit mb-4 shadow-md"
                                style={{ backgroundColor: `${story.color}20` }}
                            >
                                <story.icon className="w-8 h-8" style={{ color: story.color }} />
                            </div>
                            <h3 className="text-xl font-bold  text-[#3B82F6] mb-3">
                                {story.title}
                            </h3>
                            <p className="text-[#2D2D2D] leading-relaxed">
                                {story.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div className="bg-[#1F3B6B] text-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Ready to Join the MOLEK Family?</h3>
                    <p className=" text-blue-300 max-w-2xl mx-auto mb-6">
                        Give your child the foundation they deserve with our proven educational excellence, 
                        Islamic values, and comprehensive development programs.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#3B82F6] text-white px-8 py-3 rounded-full font-medium transition-all shadow-md hover:bg-[#2563EB]"
                    >
                        Start Your Journey Today
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default WhyChooseUs;
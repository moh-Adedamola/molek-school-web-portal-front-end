import { motion } from "framer-motion";
import { 
    FaSchool, 
    FaUserGraduate, 
    FaBookOpen, 
    FaClock,
    FaBaby,
    FaChild,
    FaGraduationCap,
    FaTools,
    FaUsers,
    FaChartLine
} from "react-icons/fa";
import { 
    AcademicCapIcon,
    SparklesIcon,
    TrophyIcon,
    BeakerIcon
} from '@heroicons/react/24/outline';

const AcademicOverview = () => {
    const stats = [
        { icon: FaUserGraduate, value: "95%", label: "WAEC Pass Rate", color: "#1F3B6B" },
        { icon: FaBookOpen, value: "18+", label: "Subjects Offered", color: "#3B82F6" },
        { icon: FaSchool, value: "20-25", label: "Class Size", color: "#E85D5D" },
        { icon: FaClock, value: "40hrs", label: "Weekly Hours", color: "#F9D89C" },
    ];

    const programs = [
        {
            id: "kindergarten",
            icon: FaChild,
            title: "Kindergarten Programme",
            duration: "Ages 2-5",
            color: "#F9D89C",
            description: "Well-rounded programme integrating pupils into the MOLEK Schools tradition.",
            objectives: [
                "Integrate pupils into the school system",
                "Complete transition from home to school environment",
                "Create MOLEK Schools tradition of qualitative education",
                "Instill high moral and religious values",
                "Foster cooperation and positive academic competition"
            ]
        },
        {
            id: "nursery",
            icon: FaBaby,
            title: "Nursery Programme",
            duration: "Ages 2-4",
            color: "#E85D5D",
            description: "Quality early childhood care with foundational learning.",
            objectives: [
                "Create smooth transition from home to school environment",
                "Provide quality care for children with working parents",
                "Expose young pupils to other children and school environment",
                "Teach basic skills and foundational learning",
                "Introduce alphabet, numbers, and environmental awareness"
            ]
        },
        {
            id: "primary",
            icon: FaGraduationCap,
            title: "Primary School",
            duration: "Primary 1-5 | Ages 6-11",
            color: "#1F3B6B",
            description: "Five-year system with solid intellectual, Islamic and moral foundations.",
            objectives: [
                "Instill spirit of excellence and develop innate potential",
                "Create skills for social interaction and teamwork",
                "Prepare pupils for positive competition and cooperation",
                "Prepare for excellent performance in external examinations"
            ],
            features: [
                "Preparation for National Common Entrance Examination",
                "Academic work teams and sports integration",
                "Religious and moral consolidation",
                "Excellence in termly and sessional examinations"
            ]
        },
        {
            id: "jss",
            icon: FaSchool,
            title: "Junior Secondary School (JSS)",
            duration: "JSS 1-3 | Ages 10-13",
            color: "#3B82F6",
            description: "Foundation program covering basic subjects in sciences, arts, and vocational studies.",
            subjects: [
                "Mathematics", "English Language", "Basic Science", "Social Studies",
                "Nigerian Languages", "French", "Creative Arts", "Physical Education",
                "Computer Studies", "Agricultural Science"
            ]
        },
        {
            id: "sss",
            icon: FaUserGraduate,
            title: "Senior Secondary School (SSS)",
            duration: "SSS 1-3 | Ages 13-16",
            color: "#E85D5D",
            description: "WAEC and NECO approved specialized program with three main streams.",
            streams: [
                {
                    name: "Science Stream",
                    subjects: ["Physics", "Chemistry", "Biology", "Further Mathematics"],
                    color: "#1F3B6B"
                },
                {
                    name: "Arts/Humanity",
                    subjects: ["Literature", "History", "Government", "Economics"],
                    color: "#3B82F6"
                },
                {
                    name: "Commercial",
                    subjects: ["Accounting", "Economics", "Commerce", "Marketing"],
                    color: "#E85D5D"
                }
            ],
            additional: ["Islamic Studies", "Religious Studies", "Arabic Language", "French Language"]
        },
        {
            id: "vocational",
            icon: FaTools,
            title: "Vocational/Skill Acquisition",
            duration: "Ongoing Program",
            color: "#F9D89C",
            description: "Specialized training for young persons to become self-employed and employers of labour.",
            programs: ["Catering", "Dress Making", "Hair Dressing", "Soap Making"],
            goals: [
                "Enable students to become self-employed",
                "Develop future employers of labour",
                "Complement academic education with practical skills",
                "Foster entrepreneurial mindset"
            ]
        }
    ];

    return (
        <section className="relative bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#E85D5D]/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-2 rounded-full mb-4">
                        <AcademicCapIcon className="w-5 h-5 text-[#3B82F6]" />
                        <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
                            Our Programs
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3B6B] mb-4">
                        Academic <span className="text-[#3B82F6]">Excellence</span>
                    </h1>
                    
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        Comprehensive education from Creche to Senior Secondary with proven track record of excellence
                    </p>
                </motion.div>

                {/* Stats Grid - Reduced margin */}
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
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
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100"
                            style={{ borderTop: `4px solid ${stat.color}` }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ y: -5 }}
                        >
                            <div 
                                className="inline-flex p-3 rounded-full mb-4"
                                style={{ backgroundColor: `${stat.color}15` }}
                            >
                                <stat.icon className="text-3xl" style={{ color: stat.color }} />
                            </div>
                            <h3 className="text-3xl font-bold mb-2" style={{ color: stat.color }}>
                                {stat.value}
                            </h3>
                            <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Programs - Reduced spacing */}
                <div className="space-y-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            style={{ borderTop: `4px solid ${program.color}` }}
                        >
                            {/* Program Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div 
                                    className="p-4 rounded-xl flex-shrink-0"
                                    style={{ backgroundColor: `${program.color}15` }}
                                >
                                    <program.icon className="text-3xl" style={{ color: program.color }} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: program.color }}>
                                        {program.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-600 mb-2">{program.duration}</p>
                                    <p className="text-gray-700 leading-relaxed">{program.description}</p>
                                </div>
                            </div>

                            {/* Program Content */}
                            <div className="space-y-6">
                                {/* Objectives */}
                                {program.objectives && (
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                            <SparklesIcon className="w-5 h-5 text-[#3B82F6]" />
                                            Programme Objectives
                                        </h4>
                                        <ul className="space-y-2">
                                            {program.objectives.map((obj, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                                    <span className="text-[#3B82F6] mt-1">✓</span>
                                                    <span>{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Features */}
                                {program.features && (
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                            <TrophyIcon className="w-5 h-5 text-[#3B82F6]" />
                                            Key Features
                                        </h4>
                                        <ul className="space-y-2">
                                            {program.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                                    <span className="text-[#3B82F6] mt-1">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Subjects */}
                                {program.subjects && (
                                    <div className="bg-gray-50 rounded-2xl p-6">
                                        <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                            <BeakerIcon className="w-5 h-5 text-[#3B82F6]" />
                                            Subjects Offered
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                            {program.subjects.map((subject, i) => (
                                                <div key={i} className="flex items-center gap-2 text-gray-700">
                                                    <span className="text-[#3B82F6]">•</span>
                                                    <span className="text-sm">{subject}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Streams (for SSS) */}
                                {program.streams && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {program.streams.map((stream, i) => (
                                            <div 
                                                key={i}
                                                className="bg-white rounded-2xl p-6 border-2 hover:shadow-lg transition-all"
                                                style={{ borderColor: stream.color }}
                                            >
                                                <h4 className="font-bold mb-4" style={{ color: stream.color }}>
                                                    {stream.name}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {stream.subjects.map((subj, j) => (
                                                        <li key={j} className="flex items-center gap-2 text-gray-700 text-sm">
                                                            <span style={{ color: stream.color }}>•</span>
                                                            <span>{subj}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Additional Studies */}
                                {program.additional && (
                                    <div className="bg-blue-50 rounded-2xl p-6 border-2 border-[#3B82F6]">
                                        <h4 className="font-bold text-[#3B82F6] mb-4">Additional Studies</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {program.additional.map((study, i) => (
                                                <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                                    <span className="text-[#3B82F6]">•</span>
                                                    <span>{study}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Vocational Programs & Goals */}
                                {program.programs && program.goals && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                                <FaUsers className="text-[#3B82F6]" />
                                                Programme Goals
                                            </h4>
                                            <ul className="space-y-2">
                                                {program.goals.map((goal, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                                        <span className="text-[#3B82F6] mt-1">✓</span>
                                                        <span>{goal}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-6">
                                            <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                                <FaChartLine className="text-[#3B82F6]" />
                                                Available Programs
                                            </h4>
                                            <ul className="space-y-2">
                                                {program.programs.map((prog, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                                                        <span className="text-[#3B82F6]">•</span>
                                                        <span>{prog}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicOverview;
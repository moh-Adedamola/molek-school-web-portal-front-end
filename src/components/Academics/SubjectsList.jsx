import { motion } from "framer-motion";
import {
    FaCalculator, FaPenFancy, FaFlask, FaMicroscope, FaLaptop, FaPalette,
    FaRunning, FaGlobeAfrica, FaBook, FaBalanceScale, FaHistory, FaMoneyBill,
    FaFileAlt, FaLanguage, FaSeedling
} from "react-icons/fa";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const subjectData = [
    {
        name: "Mathematics",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: FaCalculator,
        color: "#E85D5D"
    },
    {
        name: "English Language",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: FaPenFancy,
        color: "#1F3B6B"
    },
    {
        name: "Basic Science",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: FaMicroscope,
        color: "#3B82F6"
    },
    {
        name: "Physics",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaMicroscope,
        color: "#F9D89C"
    },
    {
        name: "Chemistry",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaFlask,
        color: "#E85D5D"
    },
    {
        name: "Biology",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaGlobeAfrica,
        color: "#1F3B6B"
    },
    {
        name: "Literature in English",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaBook,
        color: "#3B82F6"
    },
    {
        name: "Government",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaBalanceScale,
        color: "#F9D89C"
    },
    {
        name: "History",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaHistory,
        color: "#E85D5D"
    },
    {
        name: "Economics",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaMoneyBill,
        color: "#1F3B6B"
    },
    {
        name: "Accounting",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: FaFileAlt,
        color: "#3B82F6"
    },
    {
        name: "Computer Studies",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: FaLaptop,
        color: "#F9D89C"
    },
    {
        name: "Creative Arts",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: FaPalette,
        color: "#E85D5D"
    },
    {
        name: "Physical Education",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: FaRunning,
        color: "#1F3B6B"
    },
    {
        name: "Nigerian Languages",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: FaLanguage,
        color: "#3B82F6"
    },
    {
        name: "Agricultural Science",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: FaSeedling,
        color: "#F9D89C"
    },
];

const SubjectsList = () => {
    return (
        <section className="relative bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E85D5D]/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-2 rounded-full mb-4">
                        <BookOpenIcon className="w-5 h-5 text-[#3B82F6]" />
                        <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">
                            Curriculum
                        </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3B6B] mb-4">
                        Subjects <span className="text-[#3B82F6]">Offered</span>
                    </h2>
                    
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        Comprehensive curriculum covering core and elective subjects for JSS and SSS levels
                    </p>
                </motion.div>

                {/* Subjects Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.05 }
                        }
                    }}
                >
                    {subjectData.map((subject, index) => (
                        <motion.div
                            key={index}
                            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            style={{ borderTop: `4px solid ${subject.color}` }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Icon & Title */}
                            <div className="flex items-start gap-4 mb-4">
                                <div 
                                    className="p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                                    style={{ backgroundColor: `${subject.color}15` }}
                                >
                                    <subject.icon 
                                        className="text-2xl" 
                                        style={{ color: subject.color }} 
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-[#1F3B6B] group-hover:text-[#3B82F6] transition-colors leading-tight">
                                        {subject.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-medium">Level:</span>
                                    <span 
                                        className="px-3 py-1 rounded-full text-xs font-bold"
                                        style={{ 
                                            backgroundColor: `${subject.color}15`,
                                            color: subject.color 
                                        }}
                                    >
                                        {subject.level}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-medium">Type:</span>
                                    <span className="text-gray-800 font-semibold">{subject.type}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-medium">Exam:</span>
                                    <span className="text-gray-800 font-semibold text-xs">{subject.exam}</span>
                                </div>
                            </div>

                            {/* Hover Indicator */}
                            <div 
                                className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <p 
                                    className="text-xs font-semibold text-center"
                                    style={{ color: subject.color }}
                                >
                                    {subject.type} Subject
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-gradient-to-br from-[#1F3B6B] to-[#3B82F6] text-white rounded-2xl p-6 text-center">
                        <AcademicCapIcon className="w-12 h-12 mx-auto mb-3" />
                        <h4 className="text-2xl font-bold mb-2">16+</h4>
                        <p className="text-sm text-blue-100">Total Subjects</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#3B82F6] to-[#E85D5D] text-white rounded-2xl p-6 text-center">
                        <BookOpenIcon className="w-12 h-12 mx-auto mb-3" />
                        <h4 className="text-2xl font-bold mb-2">Core + Elective</h4>
                        <p className="text-sm text-blue-100">Subject Types</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#E85D5D] to-[#F9D89C] text-white rounded-2xl p-6 text-center">
                        <FaCalculator className="text-5xl mx-auto mb-3" />
                        <h4 className="text-2xl font-bold mb-2">WAEC/NECO</h4>
                        <p className="text-sm text-red-100">Approved Exams</p>
                    </div>
                </motion.div>

                {/* Legend */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                    <h4 className="font-bold text-[#1F3B6B] mb-4 text-center">Subject Levels Guide</h4>
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                            <span className="text-gray-700"><strong>Both:</strong> JSS & SSS</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#E85D5D]"></span>
                            <span className="text-gray-700"><strong>JSS:</strong> Junior Secondary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#F9D89C]"></span>
                            <span className="text-gray-700"><strong>SSS:</strong> Senior Secondary</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SubjectsList;
import { motion } from "framer-motion";
import {
    FaCalculator, FaPenFancy, FaFlask, FaMicroscope, FaLaptop, FaPalette,
    FaRunning, FaGlobeAfrica, FaBook, FaBalanceScale, FaHistory, FaMoneyBill,
    FaFileAlt, FaLanguage, FaSeedling
} from "react-icons/fa";

const subjectData = [
    {
        name: "Mathematics",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaCalculator className="text-2xl" />,
        color: "#E85D5D"
    },
    {
        name: "English Language",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaPenFancy className="text-2xl" />,
        color: "#1F3B6B"
    },
    {
        name: "Basic Science",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaMicroscope className="text-2xl" />,
        color: "#3B82F6"
    },
    {
        name: "Physics",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaMicroscope className="text-2xl" />,
        color: "#F9D89C"
    },
    {
        name: "Chemistry",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaFlask className="text-2xl" />,
        color: "#E85D5D"
    },
    {
        name: "Biology",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaGlobeAfrica className="text-2xl" />,
        color: "#1F3B6B"
    },
    {
        name: "Literature in English",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaBook className="text-2xl" />,
        color: "#3B82F6"
    },
    {
        name: "Government",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaBalanceScale className="text-2xl" />,
        color: "#F9D89C"
    },
    {
        name: "History",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaHistory className="text-2xl" />,
        color: "#E85D5D"
    },
    {
        name: "Economics",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaMoneyBill className="text-2xl" />,
        color: "#1F3B6B"
    },
    {
        name: "Accounting",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaFileAlt className="text-2xl" />,
        color: "#3B82F6"
    },
    {
        name: "Computer Studies",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaLaptop className="text-2xl" />,
        color: "#F9D89C"
    },
    {
        name: "Creative Arts",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaPalette className="text-2xl" />,
        color: "#E85D5D"
    },
    {
        name: "Physical Education",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaRunning className="text-2xl" />,
        color: "#1F3B6B"
    },
    {
        name: "Nigerian Languages",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaLanguage className="text-2xl" />,
        color: "#3B82F6"
    },
    {
        name: "Agricultural Science",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaSeedling className="text-2xl" />,
        color: "#F9D89C"
    },
];

const SubjectsList = () => {
    return (
        <section className="bg-[#FAFAFA]  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-12">
            <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                📚 Subjects Offered
            </motion.h2>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.1 },
                    },
                }}
            >
                {subjectData.map((subject, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                        style={{ borderTop: `4px solid ${subject.color}` }}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div 
                                className="p-3 rounded-xl"
                                style={{ 
                                    backgroundColor: `${subject.color}20`,
                                    color: subject.color
                                }}
                            >
                                {subject.icon}
                            </div>
                            <h3 className="text-xl font-semibold  text-[#3B82F6]">{subject.name}</h3>
                        </div>
                        <p className="text-sm text-[#2D2D2D]"><strong>Level:</strong> {subject.level}</p>
                        <p className="text-sm text-[#2D2D2D]"><strong>Type:</strong> {subject.type} Subject</p>
                        <p className="text-sm text-[#2D2D2D]"><strong>Exam:</strong> {subject.exam}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default SubjectsList;
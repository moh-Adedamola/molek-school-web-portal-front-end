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
        icon: <FaCalculator className="text-red-500 text-2xl" />,
    },
    {
        name: "English Language",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaPenFancy className="text-blue-500 text-2xl" />,
    },
    {
        name: "Basic Science",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaMicroscope className="text-green-500 text-2xl" />,
    },
    {
        name: "Physics",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaMicroscope className="text-purple-500 text-2xl" />,
    },
    {
        name: "Chemistry",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaFlask className="text-pink-500 text-2xl" />,
    },
    {
        name: "Biology",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaGlobeAfrica className="text-teal-500 text-2xl" />,
    },
    {
        name: "Literature in English",
        level: "SSS",
        type: "Elective",

        exam: "WAEC/NECO",
        icon: <FaBook className="text-indigo-500 text-2xl" />,
    },
    {
        name: "Government",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaBalanceScale className="text-cyan-500 text-2xl" />,
    },
    {
        name: "History",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaHistory className="text-lime-500 text-2xl" />,
    },
    {
        name: "Economics",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaMoneyBill className="text-amber-500 text-2xl" />,
    },
    {
        name: "Accounting",
        level: "SSS",
        type: "Elective",
        exam: "WAEC/NECO",
        icon: <FaFileAlt className="text-orange-500 text-2xl" />,
    },
    {
        name: "Computer Studies",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaLaptop className="text-gray-600 text-2xl" />,
    },
    {
        name: "Creative Arts",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaPalette className="text-pink-600 text-2xl" />,
    },
    {
        name: "Physical Education",
        level: "Both",
        type: "Core",
        exam: "WAEC/NECO",
        icon: <FaRunning className="text-yellow-500 text-2xl" />,
    },
    {
        name: "Nigerian Languages",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaLanguage className="text-green-600 text-2xl" />,
    },
    {
        name: "Agricultural Science",
        level: "JSS",
        type: "Core",
        exam: "BECE",
        icon: <FaSeedling className="text-green-700 text-2xl" />,
    },
];

const SubjectsList = () => {
    return (
        <section className="bg-blue-50 text-blue-900 px-6 md:px-12 lg:px-24 py-12">
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
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                {subjectData.map((subject, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded shadow hover:shadow-lg transition"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {subject.icon}
                            <h3 className="text-xl font-semibold">{subject.name}</h3>
                        </div>
                        <p className="text-sm"><strong>Level:</strong> {subject.level}</p>
                        <p className="text-sm"><strong>Type:</strong> {subject.type} Subject</p>
                        <p className="text-sm"><strong>Exam:</strong> {subject.exam}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default SubjectsList;

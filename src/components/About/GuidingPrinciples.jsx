import { motion } from "framer-motion";
import {
    FaStar, FaShieldAlt, FaUsers, FaLightbulb,
    FaHandHoldingHeart, FaUserTie
} from "react-icons/fa";

const principles = [
    { label: "Excellence", icon: <FaStar className="text-[#3B82F6] text-2xl" /> },
    { label: "Integrity", icon: <FaShieldAlt className="text-[#E85D5D] text-2xl" /> },
    { label: "Respect", icon: <FaUsers className=" text-[#3B82F6] text-2xl" /> },
    { label: "Innovation", icon: <FaLightbulb className=" text-blue-300 text-2xl" /> },
    { label: "Responsibility", icon: <FaHandHoldingHeart className="text-[#3B82F6] text-2xl" /> },
    { label: "Leadership", icon: <FaUserTie className=" text-[#3B82F6] text-2xl" /> },
];

const GuidingPrinciples = () => {
    return (
        <section className="bg-[#FAFAFA]  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-16">
            {/* Header */}
            <motion.h2
                className="text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                🎯 Vision, Mission & Values
            </motion.h2>

            {/* Vision & Mission */}
            <motion.div
                className="max-w-4xl mx-auto text-center space-y-6 text-lg font-semibold text-[#2D2D2D]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="mb-4">
                        <strong className="text-[#3B82F6]">Mission:</strong> 
                        <span className="font-normal ml-2">
                            To provide qualitative, functional and moral education with sound Islamic values at affordable cost, employing Montessori Method of teaching.
                        </span>
                    </p>
                    <p className="mb-4">
                        <strong className="text-[#3B82F6]">Vision:</strong> 
                        <span className="font-normal ml-2">
                            To be among the foremost privately-owned educational institutions in Nigeria, operating in line with the esteemed expectation of parents, the society, as well as statutory and administrative (government) guidelines.
                        </span>
                    </p>
                    <p>
                        <strong className="text-[#3B82F6]">Philosophy:</strong> 
                        <span className="font-normal ml-2">
                            We develop the whole child—intellectually, emotionally, socially, and morally.
                        </span>
                    </p>
                </div>
            </motion.div>

            {/* Core Values */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mt-12 text-center"
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
                {principles.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        whileHover={{ y: -5 }}
                    >
                        {item.icon}
                        <span className="font-bold text-lg  text-[#3B82F6]">{item.label}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default GuidingPrinciples;
import { motion } from "framer-motion";
import {
    FaStar, FaShieldAlt, FaUsers, FaLightbulb,
    FaHandHoldingHeart, FaUserTie
} from "react-icons/fa";

const principles = [
    { label: "Excellence", icon: <FaStar className="text-yellow-500 text-2xl" /> },
    { label: "Integrity", icon: <FaShieldAlt className="text-red-500 text-2xl" /> },
    { label: "Respect", icon: <FaUsers className="text-green-500 text-2xl" /> },
    { label: "Innovation", icon: <FaLightbulb className="text-purple-500 text-2xl" /> },
    { label: "Responsibility", icon: <FaHandHoldingHeart className="text-pink-500 text-2xl" /> },
    { label: "Leadership", icon: <FaUserTie className="text-blue-500 text-2xl" /> },
];

const GuidingPrinciples = () => {
    return (
        <section className="bg-blue-50 text-blue-900 px-6 md:px-12 lg:px-24 py-16">
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
                className="max-w-4xl mx-auto text-center space-y-6 text-lg font-semibold text-gray-800"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p><strong>Mission:</strong> 
                    To provide qualitative, functional and moral education with sound Islamic values at affordable cost, employing Montessori Method of teaching.</p>
                <p><strong>Vision:</strong> To be among the foremost privately-owned educational institutions in Nigeria, operating in line with the esteemed expectation of parents, the society, as well as statutory and administrative (government) guidelines.</p>

                <p><strong>Philosophy:</strong> We develop the whole child—intellectually, emotionally, socially, and morally.</p>
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
                        className="flex flex-col items-center gap-2"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    >
                        {item.icon}
                        <span className="font-bold text-lg">{item.label}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default GuidingPrinciples;

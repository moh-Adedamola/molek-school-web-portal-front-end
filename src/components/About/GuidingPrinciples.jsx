import { motion } from "framer-motion";
import {
    FaStar, FaShieldAlt, FaUsers, FaLightbulb, FaHandHoldingHeart, FaUserTie
} from "react-icons/fa";

const values = [
    { title: "Excellence", icon: <FaStar className="text-yellow-500 text-xl" /> },
    { title: "Integrity", icon: <FaShieldAlt className="text-red-500 text-xl" /> },
    { title: "Respect", icon: <FaUsers className="text-green-500 text-xl" /> },
    { title: "Innovation", icon: <FaLightbulb className="text-purple-500 text-xl" /> },
    { title: "Responsibility", icon: <FaHandHoldingHeart className="text-pink-500 text-xl" /> },
    { title: "Leadership", icon: <FaUserTie className="text-blue-500 text-xl" /> },
];

const GuidingPrinciples = () => {
    return (
        <section className="bg-blue-50 text-blue-900 px-6 md:px-12 lg:px-24 py-16">
            <motion.h2
                className="text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                🎯 Vision, Mission & Values
            </motion.h2>

            <motion.div
                className="max-w-4xl mx-auto text-center space-y-4 text-gray-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p><strong>Vision:</strong> To be Nigeria’s leading secondary school known for excellence and leadership.</p>
                <p><strong>Mission:</strong> To provide holistic education that builds academic strength, character, and leadership.</p>
                <p><strong>Philosophy:</strong> We develop the whole child—intellectually, emotionally, socially, and morally.</p>
            </motion.div>

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
                {values.map((value, index) => (
                    <motion.div key={index} className="bg-white p-4 rounded shadow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                        <div className="mb-2">{value.icon}</div>
                        <p className="text-sm font-semibold">{value.title}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default GuidingPrinciples;

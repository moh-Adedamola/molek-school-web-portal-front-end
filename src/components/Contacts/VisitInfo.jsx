import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";

const VisitInfo = () => {
    return (
        <motion.section
            className="bg-white text-blue-900 px-6 md:px-12 lg:px-24 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center">Visit During School Hours</h2>
            <div className="max-w-3xl mx-auto text-center text-gray-700 space-y-4">
                <p>We welcome visitors during our office hours. For the safety and security of our students, all visitors must report to the main office upon arrival.</p>
                <p className="flex justify-center items-center gap-2">
                    <FaClock className="text-blue-600" /> Weekdays: 8:00 AM – 5:00 PM
                </p>
                <p className="flex justify-center items-center gap-2">
                    <FaClock className="text-green-600" /> Saturdays: 9:00 AM – 2:00 PM
                </p>
            </div>
        </motion.section>
    );
};

export default VisitInfo;

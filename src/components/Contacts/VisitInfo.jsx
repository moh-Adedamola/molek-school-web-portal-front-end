import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";

const VisitInfo = () => {
    return (
        <motion.section
            className="bg-white  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center">Visit During School Hours</h2>
            <div className="max-w-3xl mx-auto text-center text-[#2D2D2D] space-y-6">
                <p className="text-lg">
                    We welcome visitors during our office hours. For the safety and security of our students, 
                    all visitors must report to the main office upon arrival.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-[#cbdaf4] bg-opacity-10 p-6 rounded-2xl border-2 border-[#1F3B6B]"
                    >
                        <FaClock className=" text-[#3B82F6] text-3xl mx-auto mb-3" />
                        <p className="font-bold  text-[#3B82F6] text-lg mb-2">Weekdays</p>
                        <p className="text-[#2D2D2D] font-medium">9:00 AM – 3:00 PM</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-[#c0d5f6] bg-opacity-10 p-6 rounded-2xl border-2 border-[#3B82F6]"
                    >
                        <FaClock className="text-[#3B82F6] text-3xl mx-auto mb-3" />
                        <p className="font-bold text-[#3B82F6] text-lg mb-2">Saturdays</p>
                        <p className="text-[#2D2D2D] font-medium">9:00 AM – 1:00 PM</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-8 bg-[#F9D89C] bg-opacity-40 p-6 rounded-2xl"
                >
                    <p className=" text-[#3B82F6] font-medium">
                        📋 <strong>Note:</strong> Please bring a valid ID and inform the security at the gate about your visit purpose.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default VisitInfo;
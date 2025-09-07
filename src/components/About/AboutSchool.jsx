import { motion } from "framer-motion";
import { FaSchool } from "react-icons/fa";

const AboutSchool = () => {
    return (
        <section className="bg-white text-blue-900 px-6 md:px-12 lg:px-24 py-16 pt-[150px]">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
                    <FaSchool className="text-blue-600" /> About Our School
                </h2>
            </motion.div>

            <motion.p
                className="text-lg text-gray-700 max-w-3xl mx-auto text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Welcome to Our Institution. For over 15 years, we’ve provided quality education that prepares students for WAEC and NECO success, while nurturing character and leadership. Our JSS and SSS programs follow the Nigerian curriculum, taught by passionate and experienced educators.
            </motion.p>
        </section>
    );
};

export default AboutSchool;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Excellence = () => {
    return (
        <section className="mt-[120px] px-6 md:px-12 lg:px-24 py-12 bg-gray-50">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Placeholder */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="/excel.webp"
                        alt="Excellence in Education"
                        className="rounded-lg shadow-md w-full h-auto object-cover"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                        Excellence in Secondary Education
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Preparing students for WAEC, NECO, and university success with quality education rooted in Nigerian values and global standards.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition"
                        >
                            Apply for Admission
                        </motion.button>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="border border-blue-900 text-blue-900 px-6 py-2 rounded hover:bg-blue-100 transition"
                            >
                                Learn More About Us
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
                className="grid grid-cols-3 gap-4 text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                {[
                    { value: "15+", label: "Years of Excellence" },
                    { value: "500+", label: "Active Students" },
                    { value: "95%", label: "WAEC Pass Rate" },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="transition"
                    >
                        <h3 className="text-3xl font-bold text-blue-900">{stat.value}</h3>
                        <p className="text-gray-600">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Feature Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                initial="hidden"
                whileInView="visible"
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
                viewport={{ once: true }}
            >
                {[
                    {
                        title: "WAEC Excellence",
                        desc: "Consistent high performance in WAEC and NECO examinations with dedicated preparation programs.",
                    },
                    {
                        title: "Qualified Teachers",
                        desc: "Highly qualified teaching staff committed to academic excellence and character development.",
                    },
                    {
                        title: "Modern Curriculum",
                        desc: "Comprehensive curriculum aligned with Nigerian educational standards and global best practices.",
                    },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <h4 className="text-xl font-semibold text-blue-900 mb-2">{card.title}</h4>
                        <p className="text-gray-600">{card.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Excellence;

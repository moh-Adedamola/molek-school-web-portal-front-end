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
                        alt="MOLEK Schools Excellence"
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
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
                        Excellence in Holistic Education
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Building GOD-FEARING future leaders through quality education that combines Islamic values 
                        with modern academic excellence. From Creche to Senior Secondary, we nurture the TOTAL CHILD 
                        with Montessori-inspired teaching methods.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <Link to="/admissions">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-500 transition"
                            >
                                Apply for Admission
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="border border-blue-700 text-blue-700 px-6 py-2 rounded hover:bg-blue-100 transition"
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
                    { value: "17+", label: "Years of Excellence" },
                    { value: "900+", label: "Active Students" },
                    { value: "95%", label: "WAEC/NECO Pass Rate" },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="transition"
                    >
                        <h3 className="text-3xl font-bold text-blue-700">{stat.value}</h3>
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
                        title: "95% Exam Success",
                        desc: "Consistent 100% pass rate in WAEC, NECO, and BECE examinations since our first students in 2013-2016.",
                    },
                    {
                        title: "Montessori-Inspired Learning",
                        desc: "We identify young talents, develop and modify them through active participation and discovery-based learning.",
                    },
                    {
                        title: "Holistic Islamic Education",
                        desc: "Complete curriculum including Arabic Studies, Islamic Studies, Tahafeez (Quran Memorization), and conventional subjects.",
                    },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <h4 className="text-xl font-semibold text-blue-700 mb-2">{card.title}</h4>
                        <p className="text-gray-600">{card.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Additional Recognition */}
            <motion.div
                className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                        "Alhamdulillah - Glory be to Allah"
                    </h3>
                    <p className="text-green-700">
                        From 2 students in 2007 to nearly 900 students in 2019, recognized and approved 
                        by Osun State Government across all three sections: Nursery (2008), Primary (2012), 
                        and Secondary (2013).
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Excellence;
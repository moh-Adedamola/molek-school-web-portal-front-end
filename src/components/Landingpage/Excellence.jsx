import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Excellence = () => {
    return (
        <section className="mt-[120px] px-6 md:px-12 lg:px-24 py-12 bg-[#FAFAFA]">
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
                        className="rounded-2xl shadow-lg w-full h-auto object-cover"
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
                    <h2 className="text-3xl md:text-4xl font-bold  text-[#3B82F6] mb-4">
                        Excellence in Holistic Education
                    </h2>
                    <p className="text-[#2D2D2D] mb-6">
                        Building GOD-FEARING future leaders through quality education that combines Islamic values 
                        with modern academic excellence. From Creche to Senior Secondary, we nurture the TOTAL CHILD 
                        with Montessori Method of Teaching.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <Link to="/admissions">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#3B82F6] text-white px-6 py-3 rounded-full hover:bg-[#2563EB] transition shadow-md font-medium"
                            >
                                Apply for Admission
                            </motion.button>
                        </Link>
                        <Link to="/about">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="border-2 border-[#1f4ea0]  text-[#3B82F6] px-6 py-3 rounded-full hover:bg-[#F9D89C] hover:bg-opacity-20 transition font-medium"
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
                    { value: "17+", label: "Years of Excellence", color: "#1F3B6B" },
                    { value: "900+", label: "Active Students", color: "#3B82F6" },
                    { value: "95%", label: "WAEC/NECO Pass Rate", color: "#E85D5D" },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="transition bg-white rounded-2xl p-6 shadow-md hover:shadow-lg"
                    >
                        <h3 className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</h3>
                        <p className="text-gray-600 mt-2">{stat.label}</p>
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
                        color: "#1F3B6B"
                    },
                    {
                        title: "Montessori-Inspired Learning",
                        desc: "We identify young talents, develop and modify them through active participation and discovery-based learning.",
                        color: "#3B82F6"
                    },
                    {
                        title: "Holistic Islamic Education",
                        desc: "Complete curriculum including Arabic Studies, Islamic Studies, Tahafeez (Quran Memorization), and conventional subjects.",
                        color: "#E85D5D"
                    },
                ].map((card, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        style={{ borderTop: `4px solid ${card.color}` }}
                    >
                        <h4 className="text-xl font-semibold mb-2" style={{ color: card.color }}>{card.title}</h4>
                        <p className="text-[#2D2D2D]">{card.desc}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Additional Recognition */}
            <motion.div
                className="bg-[#F9D89C] bg-opacity-40 border-l-4 border-[#3B82F6] p-6 rounded-r-2xl mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold  text-[#3B82F6] mb-2">
                        "Alhamdulillah - Glory be to Allah"
                    </h3>
                    <p className="text-[#2D2D2D]">
                        From 19 pupils in 2007 to nearly 900 Students in 2025, recognized and approved 
                        by Osun State Government across all three sections: Nursery (2008), Primary (2012), 
                        and Secondary (2013).
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Excellence;
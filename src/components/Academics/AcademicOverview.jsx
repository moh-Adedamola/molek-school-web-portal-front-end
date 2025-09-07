import { motion } from "framer-motion";
import { FaSchool, FaUserGraduate, FaBookOpen, FaClock } from "react-icons/fa";

const AcademicOverview = () => {
    return (
        <section className="bg-white text-blue-900 px-6 md:px-12 lg:px-24 py-12 pt-[150px]">
            <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                📊 Academic Excellence by the Numbers
            </motion.h2>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12"
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
                <motion.div className="bg-blue-50 p-6 rounded shadow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <FaUserGraduate className="text-green-600 text-3xl mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">95%</h3>
                    <p className="text-sm mt-2">WAEC Pass Rate</p>
                </motion.div>
                <motion.div className="bg-blue-50 p-6 rounded shadow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <FaBookOpen className="text-purple-600 text-3xl mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">18</h3>
                    <p className="text-sm mt-2">Subjects Offered</p>
                </motion.div>
                <motion.div className="bg-blue-50 p-6 rounded shadow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <FaSchool className="text-pink-600 text-3xl mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">25</h3>
                    <p className="text-sm mt-2">Average Class Size</p>
                </motion.div>
                <motion.div className="bg-blue-50 p-6 rounded shadow" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <FaClock className="text-yellow-500 text-3xl mx-auto mb-2" />
                    <h3 className="text-2xl font-bold">40hrs/week</h3>
                    <p className="text-sm mt-2">Teaching Hours</p>
                </motion.div>
            </motion.div>

            {/* JSS & SSS */}
            <div className="space-y-12">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaSchool className="text-blue-600" /> Junior Secondary School (JSS)
                    </h3>
                    <p className="mb-2">JSS 1 - JSS 3 | 3 Years | Ages 10–13</p>
                    <p className="text-gray-700 mb-4">
                        Foundation program covering basic subjects in sciences, arts, and vocational studies.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {[
                            "Mathematics", "English Language", "Basic Science", "Social Studies",
                            "Nigerian Languages", "French", "Creative Arts", "Physical Education",
                            "Computer Studies", "Agricultural Science"
                        ].map((subject, i) => (
                            <li key={i}>{subject}</li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaUserGraduate className="text-blue-600" /> Senior Secondary School (SSS)
                    </h3>
                    <p className="mb-2">SSS 1 - SSS 3 | 3 Years | Ages 13–16</p>
                    <p className="text-gray-700 mb-4">
                        Specialized program with three streams (Science, Arts, Commercial).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
                        {[
                            { title: "Science Stream", subjects: ["Physics", "Chemistry", "Biology", "Further Mathematics"] },
                            { title: "Arts Stream", subjects: ["Literature", "History", "Government", "Economics"] },
                            { title: "Commercial Stream", subjects: ["Accounting", "Economics", "Commerce", "Marketing"] },
                        ].map((stream, i) => (
                            <div key={i}>
                                <h4 className="font-semibold text-blue-900 mb-2">{stream.title}</h4>
                                <ul className="list-disc list-inside">
                                    {stream.subjects.map((subj, j) => <li key={j}>{subj}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AcademicOverview;

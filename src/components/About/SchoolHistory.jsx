import { motion } from "framer-motion";
import {
    FaSchool, FaChartLine, FaFlask, FaUsers, FaAward,
    FaLaptop, FaVirus, FaCheckCircle, FaBirthdayCake
} from "react-icons/fa";

const milestones = [
    { year: "2009", title: "School Foundation", desc: "Started with 120 students and 12 staff.", icon: FaSchool },
    { year: "2011", title: "First WAEC Results", desc: "85% pass rate in our first WAEC.", icon: FaChartLine },
    { year: "2013", title: "Infrastructure Expansion", desc: "New labs and library opened.", icon: FaFlask },
    { year: "2015", title: "Student Population Growth", desc: "Reached 400 students across JSS and SSS.", icon: FaUsers },
    { year: "2017", title: "Excellence Recognition", desc: "Best Secondary School in Lagos State.", icon: FaAward },
    { year: "2019", title: "Digital Learning Initiative", desc: "Smart classrooms and e-learning launched.", icon: FaLaptop },
    { year: "2021", title: "COVID-19 Adaptation", desc: "Seamless transition to online learning.", icon: FaVirus },
    { year: "2023", title: "95% WAEC Pass Rate", desc: "Record-breaking performance.", icon: FaCheckCircle },
    { year: "2024", title: "15 Years of Excellence", desc: "Celebrating 2,000+ graduates.", icon: FaBirthdayCake },
];

const SchoolHistory = () => {
    return (
        <section className="bg-white text-blue-900 px-6 md:px-12 lg:px-24 py-16">
            <motion.h2
                className="text-3xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                🕰️ Our History
            </motion.h2>

            <div className="space-y-10">
                {milestones.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={index}
                            className="bg-blue-50 p-6 rounded shadow hover:shadow-md transition"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                                {item.year} <Icon className="text-red-600" />
                            </h3>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-700 mt-1">{item.desc}</p>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                className="mt-16 text-center space-y-4 text-gray-700 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p><strong>Legacy:</strong> Over 2,000 alumni excelling in careers and leadership roles.</p>
                <p><strong>Looking Forward:</strong> We continue to innovate and invest in education for the future.</p>
            </motion.div>
        </section>
    );
};

export default SchoolHistory;

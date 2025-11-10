import { motion } from "framer-motion";
import {
    FaSchool, FaUserGraduate, FaCertificate, FaUsers, FaAward,
    FaChartLine, FaBook, FaSeedling, FaPray
} from "react-icons/fa";

const milestones = [
    { 
        year: "2007", 
        title: "Foundation & First Day", 
        desc: "MOLEK Schools commenced operation on September 3rd with 2 pupils and 6 staff members.", 
        icon: FaSeedling,
        color: "#1F3B6B"
    },
    { 
        year: "2008", 
        title: "Government Recognition", 
        desc: "Nursery School officially recognized and approved by Osun State government in April.", 
        icon: FaCertificate,
        color: "#3B82F6"
    },
    { 
        year: "2008", 
        title: "Early Growth", 
        desc: "Student population grew from 2 to 19 pupils by end of first academic session.", 
        icon: FaChartLine,
        color: "#E85D5D"
    },
    { 
        year: "2010", 
        title: "First Graduate", 
        desc: "Master Ismail Oyelude became the first pupil to graduate from MOLEK Primary School.", 
        icon: FaUserGraduate,
        color: "#F9D89C"
    },
    { 
        year: "2012", 
        title: "Primary School Recognition", 
        desc: "Primary School section officially recognized and approved by Osun State government.", 
        icon: FaSchool,
        color: "#1F3B6B"
    },
    { 
        year: "2013", 
        title: "Secondary School & First BECE", 
        desc: "Secondary School approved by government. First JSS3 students achieved 100% pass rate in BECE.", 
        icon: FaAward,
        color: "#3B82F6"
    },
    { 
        year: "2016", 
        title: "WAEC & NECO Success", 
        desc: "First SS3 students sat for WAEC and NECO examinations with excellent results.", 
        icon: FaCertificate,
        color: "#E85D5D"
    },
    { 
        year: "2016", 
        title: "NECO BECE Achievement", 
        desc: "100% pass rate achieved in NECO Basic Education Certificate Examination.", 
        icon: FaBook,
        color: "#F9D89C"
    },
    { 
        year: "2019", 
        title: "Major Expansion", 
        desc: "Student population reached nearly 900 with 78 staff members (61 teaching, 17 non-teaching).", 
        icon: FaUsers,
        color: "#1F3B6B"
    }
];

const SchoolHistory = () => {
    return (
        <section className="bg-white  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-16">
            <motion.h2
                className="text-3xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                🕰️ Our History
            </motion.h2>

            {/* Foundation Story */}
            <motion.div
                className="bg-[#F9D89C] bg-opacity-40 border-l-4 border-[#3B82F6] p-6 rounded-r-2xl mb-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-2 mb-3">
                    <FaPray className="text-[#3B82F6] text-xl" />
                    <h3 className="text-lg font-bold  text-[#3B82F6]">Foundation Story</h3>
                </div>
                <p className="text-[#2D2D2D] mb-2">
                    <strong>MOLEK Schools</strong> - derived from ADEMOLA and AYANLEKAN (the Proprietors). 
                    The journey began with a special prayer on Sunday, September 2nd, 2007, followed by the 
                    official commencement on Monday, September 3rd, 2007.
                </p>
                <p className="text-[#2D2D2D] text-sm">
                    Our first students were Raji Abdul-Samad Ayodeji (Primary 1) and Raji AbdulBasit Ayomide (Primary 3), 
                    supported by our founding team of dedicated educators.
                </p>
            </motion.div>

            <div className="space-y-6">
                {milestones.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                            style={{ borderTop: `4px solid ${item.color}` }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-bold flex items-center gap-2 mb-2" style={{ color: item.color }}>
                                {item.year} <Icon />
                            </h3>
                            <p className="font-semibold  text-[#3B82F6]">{item.title}</p>
                            <p className="text-sm text-[#2D2D2D] mt-1">{item.desc}</p>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                className="mt-16 text-center space-y-4 text-[#2D2D2D] max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p className="text-sm italic bg-[#F9D89C] bg-opacity-40 p-4 rounded-2xl">
                    "Alhamdulillah - Glory be to God for the growth from 2 students to nearly 900!"
                </p>
            </motion.div>
        </section>
    );
};

export default SchoolHistory;
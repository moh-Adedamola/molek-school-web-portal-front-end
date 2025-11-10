import { motion } from "framer-motion";
import { 
    FaSchool, 
    FaUserGraduate, 
    FaBookOpen, 
    FaClock,
    FaBaby,
    FaChild,
    FaGraduationCap,
    FaTools,
    FaUsers,
    FaChartLine
} from "react-icons/fa";

const AcademicOverview = () => {
    const nurseryObjectives = [
        "Create smooth transition from home to school environment",
        "Provide quality care for children with working parents",
        "Expose young pupils to other children and school environment",
        "Teach basic skills and foundational learning",
        "Introduce alphabet, numbers, and environmental awareness"
    ];

    const kindergartenObjectives = [
        "Integrate pupils into the school system",
        "Complete transition from home to school environment",
        "Create MOLEK Schools tradition of qualitative education",
        "Instill high moral and religious values",
        "Foster cooperation and positive academic competition"
    ];

    const primaryObjectives = [
        "Instill spirit of excellence and develop innate potential",
        "Create skills for social interaction and teamwork",
        "Prepare pupils for positive competition and cooperation",
        "Prepare for excellent performance in external examinations"
    ];

    const vocationalPrograms = [
        "Catering",
        "Dress Making", 
        "Hair Dressing",
        "Soap Making"
    ];

    // Rotating colors for cards
    const cardColors = ['#1F3B6B', '#3B82F6', '#E85D5D', '#F9D89C'];

    return (
        <section className="bg-white  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-12 pt-[150px]">
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
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-md" 
                    style={{ borderTop: `4px solid ${cardColors[0]}` }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                    <FaUserGraduate className="text-3xl mx-auto mb-2" style={{ color: cardColors[0] }} />
                    <h3 className="text-2xl font-bold" style={{ color: cardColors[0] }}>95%</h3>
                    <p className="text-sm mt-2 text-[#2D2D2D]">WAEC Pass Rate</p>
                </motion.div>
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-md" 
                    style={{ borderTop: `4px solid ${cardColors[1]}` }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                    <FaBookOpen className="text-3xl mx-auto mb-2" style={{ color: cardColors[1] }} />
                    <h3 className="text-2xl font-bold" style={{ color: cardColors[1] }}>18</h3>
                    <p className="text-sm mt-2 text-[#2D2D2D]">Subjects Offered</p>
                </motion.div>
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-md" 
                    style={{ borderTop: `4px solid ${cardColors[2]}` }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                    <FaSchool className="text-3xl mx-auto mb-2" style={{ color: cardColors[2] }} />
                    <h3 className="text-2xl font-bold" style={{ color: cardColors[2] }}>25</h3>
                    <p className="text-sm mt-2 text-[#2D2D2D]">Average Class Size</p>
                </motion.div>
                <motion.div 
                    className="bg-white p-6 rounded-2xl shadow-md" 
                    style={{ borderTop: `4px solid ${cardColors[3]}` }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                    <FaClock className="text-3xl mx-auto mb-2" style={{ color: cardColors[3] }} />
                    <h3 className="text-2xl font-bold" style={{ color: cardColors[3] }}>40hrs/week</h3>
                    <p className="text-sm mt-2 text-[#2D2D2D]">Teaching Hours</p>
                </motion.div>
            </motion.div>

            {/* All Programs */}
            <div className="space-y-8">

                {/* Kindergarten Programme */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                    style={{ borderTop: `4px solid ${cardColors[3]}` }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: cardColors[3] }}>
                        <FaChild /> Kindergarten Programme
                    </h3>
                    <p className="text-[#2D2D2D] mb-4">
                        Well-rounded programme integrating pupils into the MOLEK Schools tradition.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold  text-[#3B82F6] mb-2">Programme Objectives:</h4>
                            <ul className="list-disc list-inside text-sm text-[#2D2D2D] space-y-1">
                                {kindergartenObjectives.map((objective, i) => (
                                    <li key={i}>{objective}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
                
                {/* Nursery Programme */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                    style={{ borderTop: `4px solid ${cardColors[2]}` }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: cardColors[2] }}>
                        <FaBaby /> Nursery Programme
                    </h3>
                    <p className="text-[#2D2D2D] mb-4">
                        Early childhood foundation program designed for smooth transition and quality care.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold  text-[#3B82F6] mb-2">Programme Objectives:</h4>
                            <ul className="list-disc list-inside text-sm text-[#2D2D2D] space-y-1">
                                {nurseryObjectives.map((objective, i) => (
                                    <li key={i}>{objective}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Primary School Programme */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                    style={{ borderTop: `4px solid ${cardColors[0]}` }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: cardColors[0] }}>
                        <FaGraduationCap /> Primary School Programme
                    </h3>
                    <p className="mb-2 text-[#2D2D2D]">
                        <span className="font-semibold">Primary 1 - Primary 5</span> | 5 Years | Ages 6–11
                    </p>
                    <p className="text-[#2D2D2D] mb-4">
                        Five-year system with solid intellectual, Islamic and moral foundations.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold  text-[#3B82F6] mb-2">Programme Objectives:</h4>
                            <ul className="list-disc list-inside text-sm text-[#2D2D2D] space-y-1">
                                {primaryObjectives.map((objective, i) => (
                                    <li key={i}>{objective}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold  text-[#3B82F6] mb-2">Key Features:</h4>
                            <ul className="list-disc list-inside text-sm text-[#2D2D2D] space-y-1">
                                <li>Preparation for National Common Entrance Examination</li>
                                <li>Academic work teams and sports integration</li>
                                <li>Religious and moral consolidation</li>
                                <li>Excellence in termly and sessional examinations</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* JSS Programme */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                    style={{ borderTop: `4px solid ${cardColors[1]}` }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: cardColors[1] }}>
                        <FaSchool /> Junior Secondary School (JSS)
                    </h3>
                    <p className="mb-2 text-[#2D2D2D]">
                        <span className="font-semibold">JSS 1 - JSS 3</span> | 3 Years | Ages 10–13
                    </p>
                    <p className="text-[#2D2D2D] mb-4">
                        Foundation program covering basic subjects in sciences, arts, and vocational studies.
                    </p>
                    <div>
                        <h4 className="font-semibold  text-[#3B82F6] mb-2">Subjects Offered:</h4>
                        <ul className="list-disc list-inside text-sm text-[#2D2D2D] grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[
                                "Mathematics", "English Language", "Basic Science", "Social Studies",
                                "Nigerian Languages", "French", "Creative Arts", "Physical Education",
                                "Computer Studies", "Agricultural Science"
                            ].map((subject, i) => (
                                <li key={i}>{subject}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* SSS Programme */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                    style={{ borderTop: `4px solid ${cardColors[2]}` }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: cardColors[2] }}>
                        <FaUserGraduate /> Senior Secondary School (SSS)
                    </h3>
                    <p className="mb-2 text-[#2D2D2D]">
                        <span className="font-semibold">SSS 1 - SSS 3</span> | 3 Years | Ages 13–16
                    </p>
                    <p className="text-[#2D2D2D] mb-4">
                        WAEC and NECO approved specialized program with three main streams plus language studies.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#2D2D2D]">
                        {[
                            { title: "Science Stream", subjects: ["Physics", "Chemistry", "Biology", "Further Mathematics"], color: cardColors[0] },
                            { title: "Arts/Humanity Stream", subjects: ["Literature", "History", "Government", "Economics"], color: cardColors[1] },
                            { title: "Trade/Commercial Stream", subjects: ["Accounting", "Economics", "Commerce", "Marketing"], color: cardColors[2] },
                        ].map((stream, i) => (
                            <div key={i} className="bg-[#FAFAFA] p-4 rounded-2xl border-2" style={{ borderColor: stream.color }}>
                                <h4 className="font-semibold mb-2" style={{ color: stream.color }}>{stream.title}</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    {stream.subjects.map((subj, j) => <li key={j}>{subj}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 bg-[#FAFAFA] p-4 rounded-2xl border-2 border-[#3B82F6]">
                        <h4 className="font-semibold text-[#3B82F6] mb-2">Additional Studies</h4>
                        <ul className="list-disc list-inside text-sm text-[#2D2D2D] grid grid-cols-2 md:grid-cols-4 gap-2">
                            <li>Islamic Studies</li>
                            <li>Religious Studies</li>
                            <li>Arabic Language</li>
                            <li>French Language</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Vocational/Skill Acquisition Programme */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-2xl shadow-md"
                    style={{ borderTop: `4px solid ${cardColors[3]}` }}
                >
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: cardColors[3] }}>
                        <FaTools /> Vocational/Skill Acquisition Programme
                    </h3>
                    <p className="text-[#2D2D2D] mb-4">
                        Specialized training program for young persons who desire vocational skills alongside academic programs 
                        to become self-employed and employers of labour.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold  text-[#3B82F6] mb-2 flex items-center gap-2">
                                <FaUsers className="text-sm" /> Programme Goals:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-[#2D2D2D] space-y-1">
                                <li>Enable students to become self-employed</li>
                                <li>Develop future employers of labour</li>
                                <li>Complement academic education with practical skills</li>
                                <li>Foster entrepreneurial mindset</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold  text-[#3B82F6] mb-2 flex items-center gap-2">
                                <FaChartLine className="text-sm" /> Available Programs:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-[#2D2D2D] space-y-1">
                                {vocationalPrograms.map((program, i) => (
                                    <li key={i}>{program}</li>
                                ))}
                                <li>And more specialized skills</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AcademicOverview;
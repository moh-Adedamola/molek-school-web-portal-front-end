import { motion } from "framer-motion";
import {
    UserGroupIcon,
    AcademicCapIcon,
    ClipboardDocumentCheckIcon,
    TrophyIcon,
    DocumentTextIcon,
    UsersIcon,
    WrenchScrewdriverIcon,
    HeartIcon,
    StarIcon,
    ShieldCheckIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const StaffQualityWelfare = () => {
    const teachingQualities = [
        "Professionalism",
        "Academic Excellence", 
        "Subject Mastery",
        "Punctuality",
        "Obedience",
        "Dedication",
        "Good Behaviour",
        "Self-Control",
        "Discipline"
    ];

    const nonTeachingRoles = [
        "Secretary", 
        "Cleaner",
        "Gardener",
        "Library Assistant",
        "Laboratory Attendant",
        "Account Assistant",
        "Crèche Attendant/Assistant",
        "Gate Keeper"
    ];

    const codeOfConductAreas = [
        "Discipline Standards",
        "Attendance Requirements",
        "Professional Dressing",
        "Inter-personal Relationships",
        "Staff Collaboration",
        "Parent Communication",
        "Student Interaction",
        "Teacher-Specific Rules"
    ];

    const welfareIncentives = [
        "Competitive Remuneration",
        "Regular Payment Schedule",
        "Annual Performance Increment",
        "Staff Development Training",
        "Welfare Incentives",
        "Professional Growth Support"
    ];

    // Rotating colors
    const qualityColors = ['#1F3B6B', '#3B82F6', '#E85D5D', '#F9D89C'];

    return (
        <section className="px-6 md:px-12 lg:px-24 py-16 bg-[#FAFAFA]">
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-bold  text-[#3B82F6] mb-4">
                    Staff Quality & Welfare
                </h2>
                <p className="text-[#2D2D2D] mt-4 max-w-3xl mx-auto text-lg">
                    At MOLEK Schools, we believe that quality education begins with quality educators. 
                    Our comprehensive staffing approach ensures excellence at every level.
                </p>
            </motion.div>

            {/* Teaching Staff Section */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="bg-[#1F3B6B] text-white p-8 rounded-2xl shadow-lg mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <AcademicCapIcon className="w-10 h-10" />
                        <h3 className="text-2xl font-bold">Teaching Staff Excellence</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recruitment Process */}
                        <div>
                            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2  text-blue-300">
                                <ClipboardDocumentCheckIcon className="w-6 h-6" />
                                Rigorous Selection Process
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Highly competitive recruitment process
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Comprehensive oral interviews
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Written subject assessments
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Micro-teaching demonstrations
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Subject-specific expertise evaluation
                                </li>
                            </ul>
                        </div>

                        {/* Qualifications */}
                        <div>
                            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2  text-blue-300">
                                <TrophyIcon className="w-6 h-6" />
                                Professional Qualifications
                            </h4>
                            <ul className="space-y-2 text-gray-300">
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Minimum: Nigerian Certificate in Education (NCE)
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    HND and Bachelor's degree holders
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Post Graduate Diploma in Education (PGDE)
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Continuous professional development
                                </li>
                                <li className="flex items-start gap-2">
                                    <StarIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#3B82F6]" />
                                    Regular training and skill enhancement
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Teacher Qualities Grid */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-xl font-semibold  text-[#3B82F6] mb-6 text-center">
                        MOLEK Teachers Are Known For:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {teachingQualities.map((quality, index) => (
                            <motion.div
                                key={index}
                                className="p-4 rounded-2xl text-center"
                                style={{ 
                                    backgroundColor: `${qualityColors[index % qualityColors.length]}20`,
                                    borderTop: `3px solid ${qualityColors[index % qualityColors.length]}`
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p 
                                    className="font-medium text-sm"
                                    style={{ color: qualityColors[index % qualityColors.length] }}
                                >
                                    {quality}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Non-Teaching Staff Section */}
            <motion.div
                className="mb-16"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="bg-[#3B82F6] text-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <UsersIcon className="w-10 h-10" />
                        <h3 className="text-2xl font-bold">Non-Teaching Staff Support</h3>
                    </div>
                    
                    <p className="text-white text-opacity-90 mb-6 text-lg">
                        Our dedicated non-teaching staff provide essential support services with necessary competence and experience.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {nonTeachingRoles.map((role, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#ff2626] text-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <p className="font-medium text-white text-sm">{role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Staff Welfare and Code of Conduct */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Staff Welfare */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#E85D5D]"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <HeartIcon className="w-8 h-8 text-[#E85D5D]" />
                        <h3 className="text-2xl font-bold  text-[#3B82F6]">Staff Welfare</h3>
                    </div>
                    
                    <p className="text-[#2D2D2D] mb-6">
                        We prioritize our staff's wellbeing with comprehensive welfare packages and growth opportunities.
                    </p>

                    <div className="space-y-3">
                        {welfareIncentives.map((incentive, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3 bg-[#1c27a2] bg-opacity-10 p-3 rounded-xl"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CurrencyDollarIcon className="w-5 h-5 text-[#ff0000]" />
                                <span className="font-medium  text-[#ffffff]">{incentive}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Code of Conduct */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#F9D89C]"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <DocumentTextIcon className="w-8 h-8 text-[#3B82F6]" />
                        <h3 className="text-2xl font-bold  text-[#3B82F6]">Code of Conduct</h3>
                    </div>
                    
                    <p className="text-[#2D2D2D] mb-6">
                        Our documented Code of Conduct ensures professional standards and maintains our institutional excellence.
                    </p>

                    <div className="space-y-3">
                        {codeOfConductAreas.map((area, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3 bg-[#F9D89C] bg-opacity-30 p-3 rounded-xl"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ShieldCheckIcon className="w-5 h-5 text-[#3B82F6]" />
                                <span className="font-medium  text-[#3B82F6]">{area}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-[#F9D89C] bg-opacity-40 rounded-xl">
                        <p className="text-sm text-[#2D2D2D] font-medium">
                            <strong>Note:</strong> All staff receive the Code of Conduct upon assumption of duty. 
                            Breach of conduct attracts appropriate sanctions.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Additional Support Staff Note */}
            <motion.div
                className="mt-12 bg-white p-6 rounded-2xl border-l-4 border-[#1F3B6B] shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="flex items-start gap-4">
                    <WrenchScrewdriverIcon className="w-6 h-6  text-[#3B82F6] mt-1" />
                    <div>
                        <h4 className="font-semibold  text-[#3B82F6] mb-2">Class Assistants & Support</h4>
                        <p className="text-[#2D2D2D]">
                            Class Assistants/Helpers support teachers in lower Nursery classes. 
                            These dedicated professionals are Senior Secondary School Certificate holders 
                            who provide essential classroom support for our youngest learners.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default StaffQualityWelfare;
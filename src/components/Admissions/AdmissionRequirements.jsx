import { motion } from "framer-motion";
import { 
    FaBaby, FaChild, FaBookOpen, FaGraduationCap, 
    FaExclamationTriangle, FaClipboardCheck, FaUserCheck,
    FaFileAlt, FaPencilAlt
} from "react-icons/fa";

const AdmissionRequirements = () => {
    const sections = [
        {
            title: "Nursery Section",
            icon: FaBaby,
            color: "#E85D5D",
            classes: [
                {
                    name: "Creche",
                    age: "Below 2 years",
                    requirement: "For babies below two years of age",
                    admissionBy: "Age only"
                },
                {
                    name: "Play Class",
                    age: "2-3 years",
                    requirement: "For children aged between two and three years",
                    admissionBy: "Age only"
                },
                {
                    name: "Preparatory Class",
                    age: "3-5 years",
                    requirement: "For children between 3 and 5 years of age",
                    admissionBy: "Test of ability to make and understand basic statements and write some figures and letters"
                }
            ]
        },
        {
            title: "Primary Section",
            icon: FaBookOpen,
            color: "#1F3B6B",
            classes: [
                {
                    name: "Primary 1-4",
                    age: "5+ years for Primary 1",
                    requirement: "Only children who have attained the age of 5 years are considered for Primary 1",
                    admissionBy: "Competitive written test"
                }
            ],
            restrictions: ["No admission into Primary 5 (terminal class)"]
        },
        {
            title: "Secondary Section",
            icon: FaGraduationCap,
            color: "#3B82F6",
            classes: [
                {
                    name: "JSS 1-2",
                    requirement: "Open for admission",
                    admissionBy: "Highly competitive written test"
                },
                {
                    name: "SSS 1",
                    requirement: "Evidence of successful completion of JSS 3 required",
                    admissionBy: "Highly competitive written test"
                },
                {
                    name: "SSS 2",
                    requirement: "Special conditions/considerations only",
                    admissionBy: "Conditional admission with special consideration"
                }
            ],
            restrictions: ["No admission into JSS 3 and SSS 3 classes", "Conditional admission for SSS 2 only"]
        }
    ];

    const generalPolicies = [
        {
            icon: FaExclamationTriangle,
            title: "No Examination Classes",
            description: "Students are NOT admitted into examination classes: Primary 5, JSS 3, and SSS 3.",
            color: "#E85D5D"
        },
        {
            icon: FaFileAlt,
            title: "Application Process",
            description: "Admission into all classes requires an Application form which attracts a fee.",
            color: "#1F3B6B"
        },
        {
            icon: FaUserCheck,
            title: "Class Suitability",
            description: "A child found unsuitable for the applied class may be considered for a lower class in consultation with parents.",
            color: "#3B82F6"
        },
        {
            icon: FaClipboardCheck,
            title: "Admission Completion",
            description: "A formal admission letter is issued after the process, followed by an Admission Acceptance form.",
            color: "#F9D89C"
        }
    ];

    return (
        <section className="bg-white  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-16 pt-[150px]">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold mb-4">Admission Requirements</h2>
                <p className="text-[#2D2D2D] max-w-3xl mx-auto">
                    Pupils/Students are admitted into all sections of MOLEK Schools - Nursery, Primary and Secondary. 
                    Each section has specific requirements and procedures.
                </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
                {sections.map((section, sectionIndex) => {
                    const SectionIcon = section.icon;
                    return (
                        <motion.div
                            key={sectionIndex}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white border-l-4 p-6 rounded-r-2xl shadow-md"
                            style={{ borderColor: section.color }}
                        >
                            <h3 className="text-2xl font-bold flex items-center gap-3 mb-6" style={{ color: section.color }}>
                                <SectionIcon />
                                {section.title}
                            </h3>

                            <div className="space-y-4">
                                {section.classes.map((classItem, classIndex) => (
                                    <div 
                                        key={classIndex} 
                                        className="bg-[#FAFAFA] p-4 rounded-xl border-2"
                                        style={{ borderColor: `${section.color}40` }}
                                    >
                                        <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                                            <h4 className="font-semibold text-lg  text-[#3B82F6]">{classItem.name}</h4>
                                            {classItem.age && (
                                                <span 
                                                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                                    style={{ backgroundColor: section.color }}
                                                >
                                                    Age: {classItem.age}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[#2D2D2D] text-sm mb-2">{classItem.requirement}</p>
                                        <div className="flex items-center gap-2">
                                            <FaPencilAlt className="text-xs" style={{ color: section.color }} />
                                            <span className="text-xs font-medium" style={{ color: section.color }}>
                                                Admission by: {classItem.admissionBy}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {section.restrictions && (
                                <div className="mt-4 bg-[#E85D5D] bg-opacity-10 border-2 border-[#E85D5D] p-4 rounded-xl">
                                    <h5 className="font-semibold text-[#E85D5D] mb-2 flex items-center gap-2">
                                        <FaExclamationTriangle />
                                        Restrictions
                                    </h5>
                                    <ul className="text-sm text-[#2D2D2D] space-y-1">
                                        {section.restrictions.map((restriction, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-[#E85D5D] mt-1">•</span>
                                                {restriction}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* General Policies */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16"
            >
                <h3 className="text-2xl font-bold text-center mb-8">General Admission Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generalPolicies.map((policy, index) => {
                        const PolicyIcon = policy.icon;
                        return (
                            <div 
                                key={index} 
                                className="bg-white p-5 rounded-2xl shadow-md border-2"
                                style={{ borderColor: `${policy.color}40` }}
                            >
                                <div className="flex items-start gap-3">
                                    <div 
                                        className="p-3 rounded-xl flex-shrink-0"
                                        style={{ 
                                            backgroundColor: `${policy.color}20`,
                                            color: policy.color
                                        }}
                                    >
                                        <PolicyIcon className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold  text-[#3B82F6] mb-2">{policy.title}</h4>
                                        <p className="text-sm text-[#2D2D2D]">{policy.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-12 text-center bg-[#1F3B6B] text-white p-8 rounded-2xl shadow-lg"
            >
                <h4 className="text-xl font-bold mb-2">Ready to Apply?</h4>
                <p className="mb-4  text-blue-300">Contact us for application forms and detailed admission procedures.</p>
                <button className="bg-[#3B82F6] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2563EB] transition-colors shadow-md">
                    Get Application Form
                </button>
            </motion.div>
        </section>
    );
};

export default AdmissionRequirements;
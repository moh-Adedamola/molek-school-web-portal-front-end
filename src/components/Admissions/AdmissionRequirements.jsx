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
            color: "pink",
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
            color: "blue",
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
            color: "green",
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
            description: "Students are NOT admitted into examination classes: Primary 5, JSS 3, and SSS 3."
        },
        {
            icon: FaFileAlt,
            title: "Application Process",
            description: "Admission into all classes requires an Application form which attracts a fee."
        },
        {
            icon: FaUserCheck,
            title: "Class Suitability",
            description: "A child found unsuitable for the applied class may be considered for a lower class in consultation with parents."
        },
        {
            icon: FaClipboardCheck,
            title: "Admission Completion",
            description: "A formal admission letter is issued after the process, followed by an Admission Acceptance form."
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            pink: "bg-pink-50 border-pink-200 text-pink-800",
            blue: "bg-blue-50 border-blue-200 text-blue-800",
            green: "bg-green-50 border-green-200 text-green-800"
        };
        return colors[color] || colors.blue;
    };

    const getIconColor = (color) => {
        const colors = {
            pink: "text-pink-600",
            blue: "text-blue-600",
            green: "text-green-600"
        };
        return colors[color] || colors.blue;
    };

    return (
        <section className="bg-white text-blue-900 px-6 md:px-12 lg:px-24 py-16">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl font-bold mb-4">Admission Requirements</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Pupils/Students are admitted into all sections of MOLEK Schools - Nursery, Primary and Secondary. 
                    Each section has specific requirements and procedures.
                </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
                {sections.map((section, sectionIndex) => {
                    const SectionIcon = section.icon;
                    return (
                        <motion.div
                            key={sectionIndex}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                            viewport={{ once: true }}
                            className={`${getColorClasses(section.color)} border-l-4 p-6 rounded-r-lg`}
                        >
                            <h3 className="text-2xl font-bold flex items-center gap-3 mb-6">
                                <SectionIcon className={`${getIconColor(section.color)} text-2xl`} />
                                {section.title}
                            </h3>

                            <div className="space-y-4">
                                {section.classes.map((classItem, classIndex) => (
                                    <div key={classIndex} className="bg-white p-4 rounded border border-gray-200">
                                        <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                                            <h4 className="font-semibold text-lg text-gray-800">{classItem.name}</h4>
                                            {classItem.age && (
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                                                    Age: {classItem.age}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-700 text-sm mb-2">{classItem.requirement}</p>
                                        <div className="flex items-center gap-2">
                                            <FaPencilAlt className="text-gray-500 text-xs" />
                                            <span className="text-xs text-gray-600 font-medium">
                                                Admission by: {classItem.admissionBy}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {section.restrictions && (
                                <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded">
                                    <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                        <FaExclamationTriangle className="text-red-600" />
                                        Restrictions
                                    </h5>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {section.restrictions.map((restriction, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-red-600 mt-1">•</span>
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
                            <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                                <div className="flex items-start gap-3">
                                    <PolicyIcon className="text-blue-600 text-xl mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-2">{policy.title}</h4>
                                        <p className="text-sm text-gray-700">{policy.description}</p>
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
                className="mt-12 text-center bg-blue-600 text-white p-6 rounded-lg"
            >
                <h4 className="text-xl font-bold mb-2">Ready to Apply?</h4>
                <p className="mb-4">Contact us for application forms and detailed admission procedures.</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                    Get Application Form
                </button>
            </motion.div>
        </section>
    );
};

export default AdmissionRequirements;
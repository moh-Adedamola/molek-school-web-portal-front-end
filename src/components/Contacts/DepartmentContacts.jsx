import { motion } from "framer-motion";
import {
    FaUserTie, FaUniversity, FaUsers
} from "react-icons/fa";

const departments = [
    { label: "Principal's Office", phone: "+234 803 123 4567", email: "principal@nss.edu.ng", icon: FaUserTie, color: "#1F3B6B" },
    { label: "Vice Principal Academic", phone: "+234 806 789 0123", email: "vpacademic@nss.edu.ng", icon: FaUniversity, color: "#3B82F6" },
    { label: "Vice Principal Admin", phone: "+234 809 456 7890", email: "vpadmin@nss.edu.ng", icon: FaUniversity, color: "#E85D5D" },
    { label: "Admissions Office", phone: "+234 803 654 3210", email: "admissions@nss.edu.ng", icon: FaUsers, color: "#F9D89C" },
    { label: "Accounts/Bursary", phone: "+234 806 321 0987", email: "accounts@nss.edu.ng", icon: FaUsers, color: "#1F3B6B" },
    { label: "Student Affairs", phone: "+234 809 876 5432", email: "students@nss.edu.ng", icon: FaUsers, color: "#3B82F6" },
];

const DepartmentContacts = () => {
    return (
        <motion.section
            className="bg-[#FAFAFA]  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.15 },
                },
            }}
        >
            <h2 className="text-3xl font-bold mb-8 text-center">Department Contacts</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {departments.map((dept, index) => {
                    const Icon = dept.icon;
                    return (
                        <motion.div
                            key={index}
                            className="flex flex-col gap-2 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                            style={{ borderTop: `4px solid ${dept.color}` }}
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center gap-2 font-bold text-lg  text-[#3B82F6] mb-2">
                                <div 
                                    className="p-2 rounded-xl"
                                    style={{ 
                                        backgroundColor: `${dept.color}20`,
                                        color: dept.color
                                    }}
                                >
                                    <Icon />
                                </div>
                                {dept.label}
                            </div>
                            <p className="text-sm text-[#2D2D2D]">
                                <strong>Phone:</strong> {dept.phone}
                            </p>
                            <p className="text-sm text-[#2D2D2D]">
                                <strong>Email:</strong> {dept.email}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default DepartmentContacts;
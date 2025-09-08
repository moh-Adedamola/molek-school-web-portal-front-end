import { motion } from "framer-motion";
import {
    FaUserTie, FaUniversity, FaUsers
} from "react-icons/fa";

const departments = [
    { label: "Principal's Office", phone: "+234 803 123 4567", email: "principal@nss.edu.ng", icon: FaUserTie },
    { label: "Vice Principal Academic", phone: "+234 806 789 0123", email: "vpacademic@nss.edu.ng", icon: FaUniversity },
    { label: "Vice Principal Admin", phone: "+234 809 456 7890", email: "vpadmin@nss.edu.ng", icon: FaUniversity },
    { label: "Admissions Office", phone: "+234 803 654 3210", email: "admissions@nss.edu.ng", icon: FaUsers },
    { label: "Accounts/Bursary", phone: "+234 806 321 0987", email: "accounts@nss.edu.ng", icon: FaUsers },
    { label: "Student Affairs", phone: "+234 809 876 5432", email: "students@nss.edu.ng", icon: FaUsers },
];

const DepartmentContacts = () => {
    return (
        <motion.section
            className="bg-blue-50 text-blue-900 px-6 md:px-12 lg:px-24 py-16"
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
            <h2 className="text-3xl font-bold mb-8 text-center">Department Contacts</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {departments.map((dept, index) => {
                    const Icon = dept.icon;
                    return (
                        <motion.div
                            key={index}
                            className="flex flex-col gap-2 bg-white p-4 rounded shadow"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        >
                            <div className="flex items-center gap-2 font-bold text-lg">
                                <Icon className="text-green-600" />
                                {dept.label}
                            </div>
                            <p className="text-sm">Phone: {dept.phone}</p>
                            <p className="text-sm">Email: {dept.email}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default DepartmentContacts;

import { FaUserTie, FaUniversity, FaUsers } from "react-icons/fa";

const departments = [
    { label: "Principal's Office", phone: "+234 803 123 4567", email: "principal@molekschools.com", icon: FaUserTie, color: "#1F3B6B" },
    { label: "Vice Principal Academic", phone: "+234 806 789 0123", email: "vpacademic@molekschools.com", icon: FaUniversity, color: "#3B82F6" },
    { label: "Vice Principal Admin", phone: "+234 809 456 7890", email: "vpadmin@molekschools.com", icon: FaUniversity, color: "#E85D5D" },
    { label: "Admissions Office", phone: "+234 803 654 3210", email: "admissions@molekschools.com", icon: FaUsers, color: "#F9D89C" },
    { label: "Accounts/Bursary", phone: "+234 806 321 0987", email: "accounts@molekschools.com", icon: FaUsers, color: "#1F3B6B" },
    { label: "Student Affairs", phone: "+234 809 876 5432", email: "students@molekschools.com", icon: FaUsers, color: "#3B82F6" },
];

const DepartmentContacts = () => {
    return (
        <section className="bg-[#FAFAFA] px-6 md:px-12 lg:px-24 py-16">
            <header className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#3B82F6]">Department Contacts</h2>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {departments.map((dept, i) => {
                    const Icon = dept.icon;
                    return (
                        <article
                            key={i}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-2"
                            style={{ borderTop: `4px solid ${dept.color}` }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: `${dept.color}20`, color: dept.color }}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-[#1F3B6B] text-lg">{dept.label}</h3>
                            </div>
                            <p className="text-sm text-[#2D2D2D] mb-1"><strong>Phone:</strong> {dept.phone}</p>
                            <p className="text-sm text-[#2D2D2D]"><strong>Email:</strong> {dept.email}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default DepartmentContacts;
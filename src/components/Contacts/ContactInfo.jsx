import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactInfo = () => {
    return (
        <motion.section
            className="bg-white text-blue-900 px-6 md:px-12 lg:px-24 py-16 pt-[150px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                        <FaMapMarkerAlt className="text-green-600" /> School Address
                    </h3>
                    <p>10 Haliru Mohammed Street</p>
                    <p>Ofatedo, Osogbo, Osun State</p>
                    <p>Nigeria</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                        <FaPhoneAlt className="text-blue-600" /> Phone Numbers
                    </h3>
                    <p>Main Office: +234 803 123 4567</p>
                    <p>Admissions: +234 806 789 0123</p>
                    <p>Emergency: +234 809 456 7890</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                        <FaEnvelope className="text-green-600" /> Email Addresses
                    </h3>
                    <p>info@nigeriansecondarschool.edu.ng</p>
                    <p>admissions@nss.edu.ng</p>
                    <p>principal@nss.edu.ng</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
                        <FaClock className="text-blue-600" /> School Hours
                    </h3>
                    <p>Monday – Thursday: 8:00 AM – 3:45 PM</p>
                    <p>Friday: 8:00 AM – 1:20 PM</p>
                    <p>Sunday: Closed</p>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;

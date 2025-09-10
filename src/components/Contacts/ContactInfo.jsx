import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";
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
            <h2 className="text-3xl font-bold mb-4 text-center">Contact Information</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Any enquiry about MOLEK Schools? Contact us via any of the below channels or Fill our Contact Form.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Details */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                            <FaMapMarkerAlt className="text-green-600" /> School Location
                        </h3>
                        <div className="text-sm space-y-1 text-gray-700">
                            <p>Haliru Muhammed Street,</p>
                            <p>Off Old Osogbo-Ede Road,</p>
                            <p>Ofatedo, Osun State</p>
                            <p className="font-medium">P.O.Box 3302, Osogbo</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                            <FaPhoneAlt className="text-blue-600" /> Phone Numbers
                        </h3>
                        <div className="text-sm space-y-1 text-gray-700">
                            <p>07066277945</p>
                            <p>08035063693</p>
                            <p>08063025416</p>
                            <p>08034042329</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
                            <FaEnvelope className="text-green-600" /> Email Address
                        </h3>
                        <p className="text-sm text-gray-700">info@molekschools.com</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                        <FaPaperPlane className="text-blue-600" /> Send Us a Message
                    </h3>
                    
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                                Your Full Name *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                                Your Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Enter your message or enquiry"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane className="text-sm" />
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;
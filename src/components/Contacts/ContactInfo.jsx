import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactInfo = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});

    const WHATSAPP_NUMBER = "+2347066277945"; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }
        
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Format the message for WhatsApp
        let whatsappMessage = `*New Enquiry from MOLEK Schools Website*\n\n`;
        whatsappMessage += `*Name:* ${formData.fullName}\n`;
        whatsappMessage += `*Phone:* ${formData.phoneNumber}\n`;
        if (formData.email) {
            whatsappMessage += `*Email:* ${formData.email}\n`;
        }
        whatsappMessage += `\n*Message:*\n${formData.message}`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Optional: Reset form after submission
        setFormData({
            fullName: "",
            phoneNumber: "",
            email: "",
            message: ""
        });
    };

    return (
        <motion.section
            className="bg-white  text-[#3B82F6] px-6 md:px-12 lg:px-24 py-16 pt-[150px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold mb-4 text-center">Contact Information</h2>
            <p className="text-center text-[#2D2D2D] mb-8 max-w-2xl mx-auto">
                Any enquiry about MOLEK Schools? Contact us via any of the below channels or Fill our Contact Form.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Details */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#3B82F6]"
                    >
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 text-[#3B82F6]">
                            <FaMapMarkerAlt /> School Location
                        </h3>
                        <div className="text-sm space-y-1 text-[#2D2D2D]">
                            <p>Haliru Muhammed Street,</p>
                            <p>Off Old Osogbo-Ede Road,</p>
                            <p>Ofatedo, Osun State</p>
                            <p className="font-medium">P.O.Box 3302, Osogbo</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#1F3B6B]"
                    >
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3  text-[#3B82F6]">
                            <FaPhoneAlt /> Phone Numbers
                        </h3>
                        <div className="text-sm space-y-1 text-[#2D2D2D]">
                            <p>07066277945</p>
                            <p>08035063693</p>
                            <p>08063025416</p>
                            <p>08034042329</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#E85D5D]"
                    >
                        <h3 className="text-xl font-semibold flex items-center gap-2 mb-3 text-[#E85D5D]">
                            <FaEnvelope /> Email Address
                        </h3>
                        <p className="text-sm text-[#2D2D2D]">info@molekschool.com</p>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-[#f2f5f9] bg-opacity-30 p-6 rounded-2xl shadow-md"
                >
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-6  text-[#3B82F6]">
                        <FaWhatsapp className="text-[#25D366]" /> Send Us a Message via WhatsApp
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1  text-[#3B82F6]">
                                Your Full Name *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.fullName ? 'border-[#E85D5D]' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white`}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                                <p className="text-[#E85D5D] text-xs mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1  text-[#3B82F6]">
                                Your Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-[#E85D5D]' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white`}
                                placeholder="Enter your phone number"
                            />
                            {errors.phoneNumber && (
                                <p className="text-[#E85D5D] text-xs mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1  text-[#3B82F6]">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.email ? 'border-[#E85D5D]' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && (
                                <p className="text-[#E85D5D] text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1  text-[#3B82F6]">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full px-3 py-2 border ${errors.message ? 'border-[#E85D5D]' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none bg-white`}
                                placeholder="Enter your message or enquiry"
                            />
                            {errors.message && (
                                <p className="text-[#E85D5D] text-xs mt-1">{errors.message}</p>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#25D366] text-white py-3 px-4 rounded-full font-medium hover:bg-[#1EBE57] transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                        >
                            <FaWhatsapp className="text-lg" />
                            Send via WhatsApp
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;
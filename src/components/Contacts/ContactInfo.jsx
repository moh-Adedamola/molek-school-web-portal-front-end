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

    // Primary WhatsApp number (you can change this to your preferred number)
    const WHATSAPP_NUMBER = "2347066277945"; // Format: country code + number (no + or spaces)

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
                        <FaWhatsapp className="text-green-600" /> Send Us a Message via WhatsApp
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                                Your Full Name *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                                Your Phone Number *
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter your phone number"
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Enter your email address"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-1">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full px-3 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                                placeholder="Enter your message or enquiry"
                            />
                            {errors.message && (
                                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <FaWhatsapp className="text-lg" />
                            Send via WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ContactInfo;
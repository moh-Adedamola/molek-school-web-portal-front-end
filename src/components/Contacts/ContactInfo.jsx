import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let whatsappMessage = `*New Enquiry from MOLEK Schools Website*\n\n`;
    whatsappMessage += `*Name:* ${formData.fullName}\n`;
    whatsappMessage += `*Phone:* ${formData.phoneNumber}\n`;
    if (formData.email) whatsappMessage += `*Email:* ${formData.email}\n`;
    whatsappMessage += `\n*Message:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setFormData({ fullName: "", phoneNumber: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <MessageCircle className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F3B6B] mb-4">Contact Information</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out through any of our contact channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl border-l-4 border-[#3B82F6] hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#3B82F6]/10 rounded-2xl">
                  <MapPin className="w-8 h-8 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F3B6B] mb-3">School Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Haliru Muhammed Street,<br />
                    Off Old Osogbo-Ede Road,<br />
                    Ofatedo, Osun State<br />
                    <span className="font-semibold">P.O.Box 3302, Osogbo</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-xl border-l-4 border-[#1F3B6B] hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#1F3B6B]/10 rounded-2xl">
                  <Phone className="w-8 h-8 text-[#1F3B6B]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F3B6B] mb-3">Phone Numbers</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="hover:text-[#3B82F6] transition-colors cursor-pointer">07066277945</p>
                    <p className="hover:text-[#3B82F6] transition-colors cursor-pointer">08035063693</p>
                    <p className="hover:text-[#3B82F6] transition-colors cursor-pointer">08063025416</p>
                    <p className="hover:text-[#3B82F6] transition-colors cursor-pointer">08034042329</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-3xl shadow-xl border-l-4 border-[#E85D5D] hover:shadow-2xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#E85D5D]/10 rounded-2xl">
                  <Mail className="w-8 h-8 text-[#E85D5D]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F3B6B] mb-3">Email Address</h3>
                  <p className="text-gray-600 hover:text-[#3B82F6] transition-colors cursor-pointer">
                    info@molekschool.com
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#F9D89C] to-[#f0c97a] p-8 rounded-3xl shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-4 bg-white/40 rounded-2xl">
                  <Clock className="w-8 h-8 text-[#1F3B6B]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F3B6B] mb-3">Visit Hours</h3>
                  <div className="space-y-2 text-[#1F3B6B]/80">
                    <p><span className="font-semibold">Weekdays:</span> 9:00 AM – 3:00 PM</p>
                    <p><span className="font-semibold">Saturdays:</span> 9:00 AM – 1:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#25D366]/10 rounded-2xl">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1F3B6B]">Send via WhatsApp</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 ${errors.fullName ? 'border-[#E85D5D]' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-[#E85D5D] text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 ${errors.phoneNumber ? 'border-[#E85D5D]' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && <p className="text-[#E85D5D] text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 ${errors.email ? 'border-[#E85D5D]' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-[#E85D5D] text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border-2 ${errors.message ? 'border-[#E85D5D]' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors resize-none`}
                  placeholder="Enter your message or enquiry"
                />
                {errors.message && <p className="text-[#E85D5D] text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1EBE57] text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
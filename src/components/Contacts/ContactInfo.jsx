import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    fullName: "", phoneNumber: "", email: "", message: ""
  });
  const [errors, setErrors] = useState({});

  const WHATSAPP_NUMBER = "+2347066277945";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
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

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <MessageCircle className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F3B6B] mb-4">Contact Information</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out through any of our contact channels.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <aside className="space-y-8">
            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#3B82F6]/10">
                        <MapPin className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Address</h3>
                </div>
                <p className="text-gray-700">KM 2, Osogbo-Iwo Road, Opposite Sawmill, Osogbo, Osun State, Nigeria</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#E85D5D]/10">
                        <Phone className="w-6 h-6 text-[#E85D5D]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Phone</h3>
                </div>
                <p className="text-gray-700">+234 706 627 7945</p>
                <p className="text-gray-700">+234 803 359 7945</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#F9D89C]/20">
                        <Mail className="w-6 h-6 text-[#F9D89C]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Email</h3>
                </div>
                <p className="text-gray-700">info@molekschools.com</p>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#3B82F6]/10">
                        <Clock className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <h3 className="font-bold text-[#1F3B6B]">Office Hours</h3>
                </div>
                <p className="text-gray-700">Monday – Friday: 8:00 AM – 4:00 PM</p>
                <p className="text-gray-700">Saturday: 9:00 AM – 1:00 PM</p>
            </article>
          </aside>

          <section>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-[#1F3B6B] mb-6">Send us a Message</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors ${errors.fullName ? 'border-[#E85D5D]' : 'border-gray-200'}`}
                            placeholder="Enter your full name" />
                        {errors.fullName && <p className="text-[#E85D5D] text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors ${errors.phoneNumber ? 'border-[#E85D5D]' : 'border-gray-200'}`}
                            placeholder="Enter your phone number" />
                        {errors.phoneNumber && <p className="text-[#E85D5D] text-xs mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors ${errors.email ? 'border-[#E85D5D]' : 'border-gray-200'}`}
                            placeholder="Enter your email" />
                        {errors.email && <p className="text-[#E85D5D] text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows={5}
                            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-[#3B82F6] transition-colors resize-none ${errors.message ? 'border-[#E85D5D]' : 'border-gray-200'}`}
                            placeholder="Enter your message or enquiry"></textarea>
                        {errors.message && <p className="text-[#E85D5D] text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button type="submit"
                        className="w-full bg-[#25D366] hover:bg-[#1EBE57] text-white py-4 px-6 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group">
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send via WhatsApp
                    </button>
                </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
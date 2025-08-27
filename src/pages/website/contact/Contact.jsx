// pages/website/contact/Contact.jsx
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted:', formData);
    // Reset form or show success message
  };

  const contactInfo = [
    {
      icon: <Phone className="text-primary-600" size={24} />,
      title: "Phone Numbers",
      details: [
        "Main Office: +234 806 123 4567",
        "Admissions: +234 806 123 4568",
        "Emergency: +234 806 123 4569"
      ]
    },
    {
      icon: <Mail className="text-secondary-600" size={24} />,
      title: "Email Addresses",
      details: [
        "info@molekschool.edu.ng",
        "admissions@molekschool.edu.ng",
        "principal@molekschool.edu.ng"
      ]
    },
    {
      icon: <MapPin className="text-accent-600" size={24} />,
      title: "School Address",
      details: [
        "123 Education Avenue",
        "GRA Phase 2, Lagos",
        "Lagos State, Nigeria"
      ]
    },
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 7:00 AM - 4:00 PM",
        "Saturday: 8:00 AM - 12:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'admissions', label: 'Admissions' },
    { value: 'academic', label: 'Academic Affairs' },
    { value: 'fees', label: 'School Fees' },
    { value: 'transport', label: 'Transportation' },
    { value: 'complaint', label: 'Complaint/Feedback' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              We're here to help! Get in touch with us for any questions, concerns, or information about our school
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex items-center space-x-3 mb-3">
                      {info.icon}
                      <h3 className="font-semibold text-neutral-800">{info.title}</h3>
                    </div>
                    <div className="space-y-1 text-sm text-neutral-600">
                      {info.details.map((detail, idx) => (
                        <div key={idx}>{detail}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6">
              <h3 className="font-semibold text-neutral-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary py-2 rounded-lg text-sm">
                  Schedule a Visit
                </button>
                <button className="w-full btn-secondary py-2 rounded-lg text-sm">
                  Download Brochure
                </button>
                <button className="w-full btn-accent py-2 rounded-lg text-sm">
                  Apply for Admission
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Inquiry Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-vertical"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-neutral-600">
                    * Required fields
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Send size={16} />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-2xl font-bold text-neutral-800">Find Us</h2>
              <p className="text-neutral-600 mt-2">
                Located in the heart of Lagos, easily accessible by public and private transportation
              </p>
            </div>
            
            {/* Map Placeholder */}
            <div className="h-64 bg-neutral-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto text-neutral-400 mb-2" size={48} />
                <p className="text-neutral-600">Interactive map will be displayed here</p>
                <p className="text-sm text-neutral-500">123 Education Avenue, GRA Phase 2, Lagos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">Response Time</h3>
            <p className="text-neutral-600">
              We aim to respond to all inquiries within <span className="font-semibold text-primary-600">24 hours</span> during business days.
              For urgent matters, please call our main office directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
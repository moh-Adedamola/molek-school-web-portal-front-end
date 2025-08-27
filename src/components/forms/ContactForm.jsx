import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     transition-colors"
            placeholder="+234 xxx xxx xxxx"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Subject *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     transition-colors"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="admissions">Admissions</option>
            <option value="academics">Academic Programs</option>
            <option value="fees">School Fees</option>
            <option value="facilities">School Facilities</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                     transition-colors resize-none"
            placeholder="Please describe your inquiry in detail..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg 
                   font-medium hover:bg-primary-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
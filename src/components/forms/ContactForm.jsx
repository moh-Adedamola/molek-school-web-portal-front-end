// File location: src/components/forms/ContactForm.jsx

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'academic', label: 'Academic Information' },
    { value: 'admission', label: 'Admissions' },
    { value: 'fees', label: 'School Fees' },
    { value: 'facilities', label: 'School Facilities' },
    { value: 'complaints', label: 'Complaints/Feedback' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+234|0)[789]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Nigerian phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      console.log('Contact form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: ''
      });
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="card-base text-center">
        <CheckCircle className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-neutral-800 mb-4">Message Sent Successfully!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus(null)}
          className="btn-primary px-6 py-2 rounded-lg"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="card-base">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-base pl-10 w-full ${errors.name ? 'input-error' : ''}`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <div className="flex items-center mt-2 text-sm text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-base pl-10 w-full ${errors.email ? 'input-error' : ''}`}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-2 text-sm text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input-base pl-10 w-full ${errors.phone ? 'input-error' : ''}`}
                placeholder="+234 803 123 4567"
              />
            </div>
            {errors.phone && (
              <div className="flex items-center mt-2 text-sm text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
              Inquiry Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-base w-full"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`input-base w-full ${errors.subject ? 'input-error' : ''}`}
            placeholder="Brief subject of your message"
          />
          {errors.subject && (
            <div className="flex items-center mt-2 text-sm text-error">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.subject}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`input-base pl-10 w-full resize-none ${errors.message ? 'input-error' : ''}`}
              placeholder="Please describe your inquiry in detail..."
            />
          </div>
          {errors.message && (
            <div className="flex items-center mt-2 text-sm text-error">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </div>
          )}
          <div className="text-right text-sm text-neutral-500 mt-1">
            {formData.message.length}/500 characters
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center text-error">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Failed to send message</span>
            </div>
            <p className="text-sm text-error mt-1">
              Please try again or contact us directly by phone.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-neutral-600">
            * Required fields. We'll respond within 24 hours during business days.
          </p>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
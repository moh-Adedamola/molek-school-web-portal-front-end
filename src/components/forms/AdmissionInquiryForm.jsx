// File location: src/components/forms/AdmissionInquiryForm.jsx

import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Calendar, GraduationCap } from 'lucide-react';

const AdmissionInquiryForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    currentClass: '',
    intendedClass: '',
    currentSchool: '',
    academicYear: '2024/2025',
    inquiryType: 'new_admission',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const inquiryTypes = [
    { value: 'new_admission', label: 'New Student Admission' },
    { value: 'transfer', label: 'Transfer from Another School' },
    { value: 'class_upgrade', label: 'JSS to SSS Transition' },
    { value: 'information', label: 'General Admission Information' },
    { value: 'requirements', label: 'Admission Requirements' },
    { value: 'fees', label: 'School Fees Inquiry' }
  ];

  const classOptions = [
    'Pre-JSS (Primary 6 Graduate)',
    'JSS 1', 'JSS 2', 'JSS 3',
    'SSS 1', 'SSS 2', 'SSS 3'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent/Guardian name is required';
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

    if (!formData.intendedClass) {
      newErrors.intendedClass = 'Please select intended class';
    }

    if (formData.inquiryType === 'transfer' && !formData.currentSchool.trim()) {
      newErrors.currentSchool = 'Current school is required for transfer students';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide additional information';
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
      console.log('Admission inquiry submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({
        studentName: '',
        parentName: '',
        email: '',
        phone: '',
        currentClass: '',
        intendedClass: '',
        currentSchool: '',
        academicYear: '2024/2025',
        inquiryType: 'new_admission',
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
        <h3 className="text-2xl font-bold text-neutral-800 mb-4">Inquiry Submitted Successfully!</h3>
        <p className="text-neutral-600 mb-6">
          Thank you for your admission inquiry. Our admissions team will contact you within 24 hours 
          to discuss next steps and provide detailed information.
        </p>
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-primary-800">
            <strong>Reference Number:</strong> ADM-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-sm text-primary-700 mt-1">
            Please keep this reference number for your records.
          </p>
        </div>
        <button
          onClick={() => setSubmitStatus(null)}
          className="btn-primary px-6 py-2 rounded-lg"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="card-base">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">Admission Inquiry Form</h3>
        <p className="text-neutral-600">
          Get personalized information about our admission process and requirements.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Information */}
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-primary-800 mb-3">Student Information</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-neutral-700 mb-2">
                Student Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`input-base pl-10 w-full ${errors.studentName ? 'input-error' : ''}`}
                  placeholder="Enter student's full name"
                />
              </div>
              {errors.studentName && (
                <div className="flex items-center mt-2 text-sm text-error">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.studentName}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="currentClass" className="block text-sm font-medium text-neutral-700 mb-2">
                Current Class/Level
              </label>
              <select
                id="currentClass"
                name="currentClass"
                value={formData.currentClass}
                onChange={handleChange}
                className="input-base w-full"
              >
                <option value="">Select current class</option>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="intendedClass" className="block text-sm font-medium text-neutral-700 mb-2">
                Intended Class for Admission *
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <select
                  id="intendedClass"
                  name="intendedClass"
                  value={formData.intendedClass}
                  onChange={handleChange}
                  className={`input-base pl-10 w-full ${errors.intendedClass ? 'input-error' : ''}`}
                >
                  <option value="">Select intended class</option>
                  {classOptions.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              {errors.intendedClass && (
                <div className="flex items-center mt-2 text-sm text-error">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.intendedClass}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-neutral-700 mb-2">
                Academic Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <select
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="input-base pl-10 w-full"
                >
                  <option value="2024/2025">2024/2025</option>
                  <option value="2025/2026">2025/2026</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="bg-secondary-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-secondary-800 mb-3">Parent/Guardian Information</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="parentName" className="block text-sm font-medium text-neutral-700 mb-2">
                Parent/Guardian Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className={`input-base pl-10 w-full ${errors.parentName ? 'input-error' : ''}`}
                  placeholder="Enter parent/guardian name"
                />
              </div>
              {errors.parentName && (
                <div className="flex items-center mt-2 text-sm text-error">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.parentName}
                </div>
              )}
            </div>

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
          </div>

          <div className="mt-4">
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

        {/* Inquiry Details */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inquiryType" className="block text-sm font-medium text-neutral-700 mb-2">
                Type of Inquiry
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="input-base w-full"
              >
                {inquiryTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {formData.inquiryType === 'transfer' && (
              <div>
                <label htmlFor="currentSchool" className="block text-sm font-medium text-neutral-700 mb-2">
                  Current School *
                </label>
                <input
                  type="text"
                  id="currentSchool"
                  name="currentSchool"
                  value={formData.currentSchool}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.currentSchool ? 'input-error' : ''}`}
                  placeholder="Enter current school name"
                />
                {errors.currentSchool && (
                  <div className="flex items-center mt-2 text-sm text-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.currentSchool}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
              Additional Information *
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`input-base w-full resize-none ${errors.message ? 'input-error' : ''}`}
              placeholder="Please provide any specific questions or additional information about the student..."
            />
            {errors.message && (
              <div className="flex items-center mt-2 text-sm text-error">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </div>
            )}
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="bg-error/10 border border-error/20 rounded-lg p-4">
            <div className="flex items-center text-error">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Failed to submit inquiry</span>
            </div>
            <p className="text-sm text-error mt-1">
              Please try again or contact us directly at +234 806 789 0123.
            </p>
          </div>
        )}

        <div className="bg-accent-50 rounded-lg p-4">
          <h4 className="font-semibold text-accent-800 mb-2">What happens next?</h4>
          <ul className="text-sm text-accent-700 space-y-1">
            <li>• Our admissions team will review your inquiry</li>
            <li>• You'll receive a phone call within 24 hours</li>
            <li>• We'll schedule a convenient time to discuss admission details</li>
            <li>• You'll receive detailed information about our programs and fees</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
          <p className="text-sm text-neutral-600">
            * Required fields. All information is kept confidential.
          </p>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Inquiry
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionInquiryForm;
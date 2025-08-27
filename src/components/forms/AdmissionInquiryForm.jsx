import { useState } from 'react';

const AdmissionInquiryForm = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    studentAge: '',
    currentClass: '',
    intendedLevel: '',
    previousSchool: '',
    inquiryType: '',
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
      alert('Admission inquiry submitted successfully! We will contact you soon.');
      setFormData({
        parentName: '',
        studentName: '',
        email: '',
        phone: '',
        studentAge: '',
        currentClass: '',
        intendedLevel: '',
        previousSchool: '',
        inquiryType: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-2">Admission Inquiry</h2>
        <p className="text-neutral-600">Begin your child's academic journey with us</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Parent/Guardian Information */}
        <div className="bg-primary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-800 mb-4">Parent/Guardian Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Parent/Guardian Name *
              </label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                         transition-colors"
                placeholder="Enter parent/guardian name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                         transition-colors"
                placeholder="+234 xxx xxx xxxx"
              />
            </div>
          </div>

          <div className="mt-4">
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
        </div>

        {/* Student Information */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-secondary-800 mb-4">Student Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 
                         transition-colors"
                placeholder="Enter student's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Student Age *
              </label>
              <input
                type="number"
                name="studentAge"
                value={formData.studentAge}
                onChange={handleChange}
                required
                min="10"
                max="18"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 
                         transition-colors"
                placeholder="Age in years"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Current Class/Level
              </label>
              <input
                type="text"
                name="currentClass"
                value={formData.currentClass}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 
                         transition-colors"
                placeholder="e.g., Primary 6, JSS 2, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Intended Level *
              </label>
              <select
                name="intendedLevel"
                value={formData.intendedLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 
                         transition-colors"
              >
                <option value="">Select intended level</option>
                <option value="JSS1">JSS 1 (Junior Secondary 1)</option>
                <option value="JSS2">JSS 2 (Junior Secondary 2)</option>
                <option value="JSS3">JSS 3 (Junior Secondary 3)</option>
                <option value="SSS1">SSS 1 (Senior Secondary 1)</option>
                <option value="SSS2">SSS 2 (Senior Secondary 2)</option>
                <option value="SSS3">SSS 3 (Senior Secondary 3)</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Previous School
            </label>
            <input
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                       focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 
                       transition-colors"
              placeholder="Name of previous school (if any)"
            />
          </div>
        </div>

        {/* Inquiry Details */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Type of Inquiry *
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                     transition-colors"
          >
            <option value="">Select inquiry type</option>
            <option value="admission-process">Admission Process</option>
            <option value="school-fees">School Fees Information</option>
            <option value="academic-programs">Academic Programs</option>
            <option value="school-facilities">School Facilities</option>
            <option value="school-visit">Schedule School Visit</option>
            <option value="transfer-student">Transfer Student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg 
                     focus:ring-2 focus:ring-accent-500 focus:border-accent-500 
                     transition-colors resize-none"
            placeholder="Any additional questions or information you'd like to share..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg 
                   font-medium text-lg hover:bg-primary-700 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting Inquiry...' : 'Submit Admission Inquiry'}
        </button>

        <div className="text-center text-sm text-neutral-600">
          <p>We typically respond to inquiries within 24-48 hours</p>
        </div>
      </form>
    </div>
  );
};

export default AdmissionInquiryForm;
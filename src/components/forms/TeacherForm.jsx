// File: src/components/forms/TeacherForm.jsx
import React, { useState } from 'react';
import { Save, X, User, BookOpen, Award } from 'lucide-react';

const TeacherForm = ({ teacher = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: teacher?.firstName || '',
    lastName: teacher?.lastName || '',
    email: teacher?.email || '',
    phone: teacher?.phone || '',
    dateOfBirth: teacher?.dateOfBirth || '',
    gender: teacher?.gender || '',
    qualification: teacher?.qualification || '',
    experience: teacher?.experience || '',
    subjects: teacher?.subjects || [],
    classes: teacher?.classes || [],
    employeeId: teacher?.employeeId || '',
    address: teacher?.address || '',
    emergencyContact: teacher?.emergencyContact || ''
  });

  const [errors, setErrors] = useState({});

  const availableSubjects = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'Geography', 'History', 'Economics', 'Government', 'Literature',
    'Hausa Language', 'French', 'Agricultural Science', 'Technical Drawing',
    'Home Economics', 'Music', 'Fine Arts', 'Physical Education'
  ];

  const availableClasses = ['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 
                            'SSS 1A', 'SSS 1B', 'SSS 2A', 'SSS 2B', 'SSS 3A', 'SSS 3B'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value) 
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-base">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">
            {teacher ? 'Edit Teacher' : 'Add New Teacher'}
          </h2>
          <button onClick={onCancel} className="text-neutral-400 hover:text-neutral-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="text-primary-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.firstName ? 'input-error' : ''}`}
                />
                {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.lastName ? 'input-error' : ''}`}
                />
                {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.email ? 'input-error' : ''}`}
                  placeholder="teacher@nss.edu.ng"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.phone ? 'input-error' : ''}`}
                  placeholder="08123456789"
                />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="input-base w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-base w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="Auto-generated if empty"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Emergency Contact</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Home Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="input-base w-full resize-none"
                placeholder="Enter full home address"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-secondary-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Professional Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Highest Qualification *</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.qualification ? 'input-error' : ''}`}
                >
                  <option value="">Select Qualification</option>
                  <option value="NCE">NCE (Nigeria Certificate in Education)</option>
                  <option value="B.Ed">B.Ed (Bachelor of Education)</option>
                  <option value="B.Sc/B.A">B.Sc/B.A + PGDE</option>
                  <option value="M.Ed">M.Ed (Master of Education)</option>
                  <option value="M.Sc/M.A">M.Sc/M.A</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.qualification && <p className="text-sm text-red-600 mt-1">{errors.qualification}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Subject & Class Assignments */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-accent-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Teaching Assignments</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Subjects *</label>
                <div className="max-h-48 overflow-y-auto border border-neutral-200 rounded-lg p-3">
                  {availableSubjects.map(subject => (
                    <label key={subject} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => handleMultiSelect('subjects', subject)}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">{subject}</span>
                    </label>
                  ))}
                </div>
                {errors.subjects && <p className="text-sm text-red-600 mt-1">{errors.subjects}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Classes (Optional)</label>
                <div className="max-h-48 overflow-y-auto border border-neutral-200 rounded-lg p-3">
                  {availableClasses.map(cls => (
                    <label key={cls} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        checked={formData.classes.includes(cls)}
                        onChange={() => handleMultiSelect('classes', cls)}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">{cls}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-2"
            >
              <Save size={16} />
              {teacher ? 'Update Teacher' : 'Add Teacher'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline flex items-center justify-center gap-2 px-6 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
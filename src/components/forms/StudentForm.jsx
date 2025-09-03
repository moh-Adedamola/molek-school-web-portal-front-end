// File: src/components/forms/StudentForm.jsx
import React, { useState } from 'react';
import { Save, X, User, Users, Phone, Mail, MapPin } from 'lucide-react';

const StudentForm = ({ student = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: student?.firstName || '',
    lastName: student?.lastName || '',
    dateOfBirth: student?.dateOfBirth || '',
    gender: student?.gender || '',
    admissionNumber: student?.admissionNumber || '',
    class: student?.class || '',
    address: student?.address || '',
    parentName: student?.parentName || '',
    parentPhone: student?.parentPhone || '',
    parentEmail: student?.parentEmail || '',
    emergencyContact: student?.emergencyContact || '',
    medicalInfo: student?.medicalInfo || ''
  });

  const [errors, setErrors] = useState({});

  const classes = ['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 
                  'SSS 1A', 'SSS 1B', 'SSS 2A', 'SSS 2B', 'SSS 3A', 'SSS 3B'];

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent name is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';

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
            {student ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button onClick={onCancel} className="text-neutral-400 hover:text-neutral-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <User className="text-primary-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Student Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.firstName ? 'input-error' : ''}`}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.lastName ? 'input-error' : ''}`}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.dateOfBirth ? 'input-error' : ''}`}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.gender ? 'input-error' : ''}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Admission Number
                </label>
                <input
                  type="text"
                  name="admissionNumber"
                  value={formData.admissionNumber}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="Auto-generated if empty"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Class *
                </label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.class ? 'input-error' : ''}`}
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-sm text-red-600 mt-1">{errors.class}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Home Address
              </label>
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

          {/* Parent Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-secondary-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Parent/Guardian Information</h3>
            </div>
            
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
                  className={`input-base w-full ${errors.parentName ? 'input-error' : ''}`}
                />
                {errors.parentName && (
                  <p className="text-sm text-red-600 mt-1">{errors.parentName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.parentPhone ? 'input-error' : ''}`}
                  placeholder="08123456789"
                />
                {errors.parentPhone && (
                  <p className="text-sm text-red-600 mt-1">{errors.parentPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="parent@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="Alternative contact number"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-accent-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Additional Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Medical Information / Allergies
              </label>
              <textarea
                name="medicalInfo"
                value={formData.medicalInfo}
                onChange={handleChange}
                rows="3"
                className="input-base w-full resize-none"
                placeholder="Any medical conditions, allergies, or special needs..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-2"
            >
              <Save size={16} />
              {student ? 'Update Student' : 'Add Student'}
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

export default StudentForm;
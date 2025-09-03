// File: src/components/forms/ParentForm.jsx
import React, { useState } from 'react';
import { Save, X, User, Users, Briefcase } from 'lucide-react';

const ParentForm = ({ parent = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: parent?.firstName || '',
    lastName: parent?.lastName || '',
    email: parent?.email || '',
    phone: parent?.phone || '',
    alternatePhone: parent?.alternatePhone || '',
    occupation: parent?.occupation || '',
    workplace: parent?.workplace || '',
    relationship: parent?.relationship || 'Parent',
    address: parent?.address || '',
    selectedChildren: parent?.selectedChildren || []
  });

  const [errors, setErrors] = useState({});

  // Mock available students for linking
  const availableStudents = [
    { id: 1, name: 'Adebayo Olumide', class: 'JSS 1A', admissionNo: 'NSS001' },
    { id: 2, name: 'Chioma Okafor', class: 'JSS 2B', admissionNo: 'NSS002' },
    { id: 3, name: 'Ibrahim Musa', class: 'SSS 1A', admissionNo: 'NSS003' },
    { id: 4, name: 'Blessing Akpan', class: 'SSS 3B', admissionNo: 'NSS004' }
  ];

  const relationships = ['Parent', 'Guardian', 'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleChildSelection = (studentId) => {
    setFormData(prev => ({
      ...prev,
      selectedChildren: prev.selectedChildren.includes(studentId)
        ? prev.selectedChildren.filter(id => id !== studentId)
        : [...prev.selectedChildren, studentId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (formData.selectedChildren.length === 0) newErrors.selectedChildren = 'Please select at least one child';

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
            {parent ? 'Edit Parent' : 'Add New Parent'}
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
                  placeholder="parent@email.com"
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
                <label className="block text-sm font-medium text-neutral-700 mb-2">Alternate Phone</label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={formData.alternatePhone}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="Alternative contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Relationship to Student</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="input-base w-full"
                >
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
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
              <Briefcase className="text-secondary-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Professional Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="e.g., Engineer, Doctor, Teacher"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Workplace/Organization</label>
                <input
                  type="text"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="Company or organization name"
                />
              </div>
            </div>
          </div>

          {/* Child Linking */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-accent-600" size={20} />
              <h3 className="text-lg font-medium text-neutral-800">Link Children *</h3>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600 mb-3">Select the children this parent/guardian is responsible for:</p>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableStudents.map(student => (
                  <label key={student.id} className="flex items-center gap-3 p-3 border border-neutral-100 rounded-lg hover:bg-neutral-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedChildren.includes(student.id)}
                      onChange={() => handleChildSelection(student.id)}
                      className="rounded border-neutral-300"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-neutral-800">{student.name}</div>
                      <div className="text-sm text-neutral-600">{student.class} • {student.admissionNo}</div>
                    </div>
                  </label>
                ))}
              </div>
              
              {errors.selectedChildren && (
                <p className="text-sm text-red-600 mt-2">{errors.selectedChildren}</p>
              )}
              
              {formData.selectedChildren.length > 0 && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-700">
                    Selected: {formData.selectedChildren.length} child{formData.selectedChildren.length > 1 ? 'ren' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-2"
            >
              <Save size={16} />
              {parent ? 'Update Parent' : 'Add Parent'}
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

export default ParentForm;
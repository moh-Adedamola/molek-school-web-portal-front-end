// File: components/forms/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Mail, Phone, MapPin, Shield } from 'lucide-react';

const UserForm = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'teacher',
    status: 'active',
    address: '',
    dateOfBirth: '',
    gender: '',
    employeeId: '',
    subjects: [],
    classes: [],
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const roles = [
    { value: 'admin', label: 'Administrator', description: 'Full school management access' },
    { value: 'teacher', label: 'Teacher', description: 'Classroom and student management' },
    { value: 'parent', label: 'Parent', description: 'Access to own children\'s data' }
  ];

  const subjects = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'Geography', 'History', 'Economics', 'Government', 'Literature',
    'Further Mathematics', 'Agricultural Science', 'Technical Drawing'
  ];

  const classes = [
    'JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B',
    'SSS 1A', 'SSS 1B', 'SSS 2A', 'SSS 2B', 'SSS 3A', 'SSS 3B'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'teacher',
        status: user.status || 'active',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        employeeId: user.employeeId || '',
        subjects: user.subjects || [],
        classes: user.classes || [],
        password: '',
        confirmPassword: ''
      });
    } else {
      // Reset form for new user
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: 'teacher',
        status: 'active',
        address: '',
        dateOfBirth: '',
        gender: '',
        employeeId: '',
        subjects: [],
        classes: [],
        password: '',
        confirmPassword: ''
      });
    }
    setErrors({});
  }, [user, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email format is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Password validation for new users
    if (!user) {
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (formData.role === 'teacher') {
      if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required';
      if (formData.classes.length === 0) newErrors.classes = 'At least one class is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        ...formData,
        id: user?.id || Date.now(),
        fullName: `${formData.firstName} ${formData.lastName}`,
        createdAt: user?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      onSave(userData);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSubjectChange = (subject) => {
    const newSubjects = formData.subjects.includes(subject)
      ? formData.subjects.filter(s => s !== subject)
      : [...formData.subjects, subject];
    handleInputChange('subjects', newSubjects);
  };

  const handleClassChange = (className) => {
    const newClasses = formData.classes.includes(className)
      ? formData.classes.filter(c => c !== className)
      : [...formData.classes, className];
    handleInputChange('classes', newClasses);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user ? 'Edit User' : 'Create New User'}
            </h2>
            <p className="text-gray-600 mt-1">
              {user ? 'Update user information and permissions' : 'Add a new user to the system'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`input-base w-full ${errors.firstName ? 'input-error' : ''}`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`input-base w-full ${errors.lastName ? 'input-error' : ''}`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`input-base w-full ${errors.email ? 'input-error' : ''}`}
                    placeholder="user@school.edu.ng"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`input-base w-full ${errors.phone ? 'input-error' : ''}`}
                    placeholder="+234 XXX XXX XXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="input-base w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="input-base w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Role & Permissions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Role & Permissions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="input-base w-full"
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    {roles.find(r => r.value === formData.role)?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="input-base w-full"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                {formData.role === 'teacher' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      className="input-base w-full"
                      placeholder="TCH001"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Teacher Specific Fields */}
            {formData.role === 'teacher' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Teaching Assignment</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjects *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {subjects.map(subject => (
                        <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.subjects.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{subject}</span>
                        </label>
                      ))}
                    </div>
                    {errors.subjects && <p className="text-red-500 text-sm mt-1">{errors.subjects}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Classes *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {classes.map(className => (
                        <label key={className} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.classes.includes(className)}
                            onChange={() => handleClassChange(className)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{className}</span>
                        </label>
                      ))}
                    </div>
                    {errors.classes && <p className="text-red-500 text-sm mt-1">{errors.classes}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Password Section */}
            {!user && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`input-base w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                        placeholder="Enter password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`input-base w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Contact Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="input-base w-full h-24 resize-none"
                  placeholder="Enter complete address"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {saving ? 'Saving...' : user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
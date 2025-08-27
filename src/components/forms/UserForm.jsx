import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Phone, MapPin, BookOpen, Users } from 'lucide-react';

const UserForm = ({ 
  user = null, 
  userType = 'student', 
  onSubmit, 
  onCancel, 
  isOpen = false,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    gender: '',
    role: userType,
    
    // Student specific
    studentId: '',
    classId: '',
    parentId: '',
    admissionDate: '',
    
    // Teacher specific
    employeeId: '',
    subjects: [],
    classes: [],
    qualification: '',
    experience: '',
    
    // Parent specific
    occupation: '',
    children: [],
    
    // Admin specific
    department: '',
    permissions: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, ...user });
    } else {
      // Reset form for new user
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        gender: '',
        role: userType,
        studentId: '',
        classId: '',
        parentId: '',
        admissionDate: '',
        employeeId: '',
        subjects: [],
        classes: [],
        qualification: '',
        experience: '',
        occupation: '',
        children: [],
        department: '',
        permissions: []
      });
    }
  }, [user, userType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'subjects' || name === 'classes' || name === 'permissions') {
        const currentArray = formData[name] || [];
        if (checked) {
          setFormData({ ...formData, [name]: [...currentArray, value] });
        } else {
          setFormData({ ...formData, [name]: currentArray.filter(item => item !== value) });
        }
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Role-specific validations
    if (userType === 'student') {
      if (!formData.classId) newErrors.classId = 'Class is required';
      if (!formData.admissionDate) newErrors.admissionDate = 'Admission date is required';
    }
    
    if (userType === 'teacher') {
      if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
      if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required';
    }

    if (userType === 'admin') {
      if (!formData.department.trim()) newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  const renderBasicFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.gender ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full address"
        />
      </div>
    </>
  );

  const renderStudentFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-generated"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class *
          </label>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.classId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select class</option>
            <option value="1">Grade 1-A</option>
            <option value="2">Grade 2-B</option>
            <option value="3">Grade 3-A</option>
          </select>
          {errors.classId && <p className="text-red-500 text-xs mt-1">{errors.classId}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian
          </label>
          <select
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select parent</option>
            <option value="1">John Smith</option>
            <option value="2">Mary Johnson</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admission Date *
          </label>
          <input
            type="date"
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.admissionDate ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.admissionDate && <p className="text-red-500 text-xs mt-1">{errors.admissionDate}</p>}
        </div>
      </div>
    </>
  );

  const renderTeacherFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Auto-generated"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Qualification *
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.qualification ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="e.g., M.Ed, B.A"
          />
          {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience (years)
        </label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Years of experience"
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects *
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Mathematics', 'English', 'Science', 'History', 'Geography', 'Art'].map(subject => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="subjects"
                value={subject}
                checked={formData.subjects.includes(subject)}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{subject}</span>
            </label>
          ))}
        </div>
        {errors.subjects && <p className="text-red-500 text-xs mt-1">{errors.subjects}</p>}
      </div>
    </>
  );

  const renderParentFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occupation
        </label>
        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter occupation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Children (Students)
        </label>
        <div className="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto">
          {['Alice Johnson', 'Bob Johnson', 'Charlie Smith'].map(child => (
            <label key={child} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                name="children"
                value={child}
                checked={formData.children.includes(child)}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{child}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderAdminFields = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Department *
        </label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.department ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select department</option>
          <option value="academics">Academics</option>
          <option value="administration">Administration</option>
          <option value="finance">Finance</option>
          <option value="hr">Human Resources</option>
        </select>
        {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permissions
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['Manage Users', 'Manage Classes', 'View Reports', 'Manage Content', 'System Settings', 'Billing'].map(permission => (
            <label key={permission} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="permissions"
                value={permission}
                checked={formData.permissions.includes(permission)}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{permission}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">
              {user ? `Edit ${userType}` : `Add New ${userType}`}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Basic Information
              </h4>
              {renderBasicFields()}
            </div>

            {/* Role-specific fields */}
            {userType === 'student' && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Student Information
                </h4>
                {renderStudentFields()}
              </div>
            )}

            {userType === 'teacher' && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Teacher Information
                </h4>
                {renderTeacherFields()}
              </div>
            )}

            {userType === 'parent' && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Parent Information
                </h4>
                {renderParentFields()}
              </div>
            )}

            {userType === 'admin' && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Admin Information
                </h4>
                {renderAdminFields()}
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {user ? 'Update' : 'Create'} {userType}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
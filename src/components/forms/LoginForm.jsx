// File: src/components/forms/LoginForm.jsx
// Reusable login component with validation and role-based routing

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LoginForm = ({ onSuccess, showDemoCredentials = false }) => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Demo credentials for testing
  const demoCredentials = [
    { role: 'Super Admin', email: 'superadmin@school.com', password: 'admin123' },
    { role: 'Admin', email: 'admin@school.com', password: 'admin123' },
    { role: 'Teacher', email: 'teacher@school.com', password: 'teacher123' },
    { role: 'Parent', email: 'parent@school.com', password: 'parent123' }
  ];

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await login(formData.email, formData.password);
    
    if (result.success && onSuccess) {
      onSuccess(result);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password });
    setFieldErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Global Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`
                input-base w-full pl-10
                ${fieldErrors.email ? 'input-error' : ''}
              `}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          {fieldErrors.email && (
            <p className="text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`
                input-base w-full pl-10 pr-10
                ${fieldErrors.password ? 'input-error' : ''}
              `}
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-sm text-red-600">{fieldErrors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            btn-primary w-full py-3 px-4 text-sm font-medium rounded-lg
            transition-all duration-200
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Demo Credentials Section */}
      {showDemoCredentials && (
        <div className="mt-8 p-4 bg-neutral-50 rounded-lg border">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">
            Demo Credentials (Click to fill)
          </h3>
          <div className="grid gap-2">
            {demoCredentials.map((cred, index) => (
              <button
                key={index}
                type="button"
                onClick={() => fillDemoCredentials(cred.email, cred.password)}
                className="text-left p-2 text-xs bg-white border border-neutral-200 rounded hover:bg-neutral-50 transition-colors"
                disabled={loading}
              >
                <div className="font-medium text-neutral-700">{cred.role}</div>
                <div className="text-neutral-500">{cred.email}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Click any role above to auto-fill credentials for testing
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
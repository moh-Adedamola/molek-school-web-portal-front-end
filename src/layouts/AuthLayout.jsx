// File: src/layouts/AuthLayout.jsx
// Layout for authentication pages (login, forgot password)

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* School Logo and Branding */}
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center space-x-3 mb-6 group">
            <div className="bg-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <GraduationCap className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">
                Nigerian Secondary School
              </h1>
              <p className="text-primary-100 text-sm">
                Excellence in Education
              </p>
            </div>
          </Link>
        </div>

        {/* Auth Form Container */}
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10">
          <Outlet />
        </div>

        {/* Back to Website Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-primary-100 hover:text-white transition-colors text-sm"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
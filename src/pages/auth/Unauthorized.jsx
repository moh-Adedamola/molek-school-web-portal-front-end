// File: src/pages/auth/Unauthorized.jsx
// Access denied page for insufficient permissions

import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Home, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, getDashboardRoute } = useAuth();
  const { getRoleDisplayName } = useRole();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToDashboard = () => {
    if (user) {
      navigate(getDashboardRoute());
    } else {
      navigate('/login');
    }
  };

  const handleContactAdmin = () => {
    // In real app, this could open a contact form or email client
    alert('Contact Administrator: admin@school.com');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Error Card */}
        <div className="card-base text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 p-4 bg-red-100 rounded-full w-fit">
            <Shield className="h-12 w-12 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-neutral-900 mb-3">
            Access Denied
          </h1>

          {/* Message */}
          <div className="space-y-3 mb-8">
            <p className="text-neutral-600">
              You don't have permission to access this page or resource.
            </p>
            
            {user ? (
              <div className="p-3 bg-neutral-50 rounded-lg border">
                <p className="text-sm text-neutral-700">
                  <span className="font-medium">Current Role:</span> {getRoleDisplayName()}
                </p>
                <p className="text-sm text-neutral-700 mt-1">
                  <span className="font-medium">User:</span> {user.name}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  You are not currently signed in. Please log in to access this resource.
                </p>
              </div>
            )}

            <p className="text-sm text-neutral-500">
              If you believe this is an error, please contact your school administrator.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoBack}
                className="btn-outline flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </button>
              
              <button
                onClick={handleGoToDashboard}
                className="btn-primary flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all"
              >
                <Home className="h-4 w-4" />
                {user ? 'My Dashboard' : 'Sign In'}
              </button>
            </div>

            <button
              onClick={handleContactAdmin}
              className="btn-ghost flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all w-full"
            >
              <Mail className="h-4 w-4" />
              Contact Administrator
            </button>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <div className="p-4 bg-white rounded-lg border border-neutral-200">
            <h3 className="font-medium text-neutral-900 mb-2">Need Help?</h3>
            <div className="text-sm text-neutral-600 space-y-1">
              <p>• Check with your school administrator for access permissions</p>
              <p>• Ensure you're using the correct user account</p>
              <p>• Contact technical support if the issue persists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
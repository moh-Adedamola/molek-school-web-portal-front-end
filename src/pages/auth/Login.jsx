// File: src/pages/auth/Login.jsx
// Login page with role-based dashboard routing

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, BookOpen, Users, Calendar } from 'lucide-react';
import LoginForm from '../../components/forms/LoginForm';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getDashboardRoute } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(getDashboardRoute());
    }
  }, [isAuthenticated, user, navigate, getDashboardRoute]);

  const handleLoginSuccess = (result) => {
    // Navigate to role-specific dashboard
    navigate(result.redirectTo);
  };

  const features = [
    {
      icon: School,
      title: 'Academic Excellence',
      description: 'Comprehensive student management and progress tracking'
    },
    {
      icon: Users,
      title: 'Multi-Role Access',
      description: 'Tailored dashboards for administrators, teachers, and parents'
    },
    {
      icon: BookOpen,
      title: 'Nigerian Curriculum',
      description: 'Aligned with JSS/SSS structure and WAEC/NECO standards'
    },
    {
      icon: Calendar,
      title: 'Real-Time Updates',
      description: 'Live attendance tracking and instant grade notifications'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation Header */}
      <nav className="bg-primary-800 text-white">
        <div className="container-max">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-700 rounded-lg">
                <School className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Nigerian Secondary School</h1>
                <p className="text-primary-200 text-sm">Management System</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="btn-ghost text-white hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features & Info */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Welcome Back to Your
                <span className="text-primary-600 block">School Dashboard</span>
              </h1>
              <p className="text-lg text-neutral-600">
                Access your personalized dashboard to manage academic activities, 
                track progress, and stay connected with the school community.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="p-3 bg-primary-100 rounded-lg w-fit mb-3">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="card-base max-w-md mx-auto lg:mx-0">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Sign In
                </h2>
                <p className="text-neutral-600">
                  Enter your credentials to access your dashboard
                </p>
              </div>

              <LoginForm 
                onSuccess={handleLoginSuccess}
                showDemoCredentials={true}
              />

              {/* Additional Links */}
              <div className="mt-6 text-center space-y-3">
                <div className="text-sm text-neutral-500">
                  Need help accessing your account?
                </div>
                <div className="flex flex-col sm:flex-row gap-3 text-sm">
                  <button className="text-primary-600 hover:text-primary-700 transition-colors">
                    Contact Administrator
                  </button>
                  <span className="hidden sm:block text-neutral-300">|</span>
                  <button className="text-primary-600 hover:text-primary-700 transition-colors">
                    Technical Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-8 mt-12">
        <div className="container-max">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-primary-600 rounded">
                <School className="h-4 w-4" />
              </div>
              <span className="text-sm">© 2024 Nigerian Secondary School Management System</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <span>Academic Year 2024/2025</span>
              <span>•</span>
              <span>Version 1.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
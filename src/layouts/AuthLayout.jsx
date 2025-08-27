import { Outlet, Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative min-h-screen flex">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-primary-800 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-900"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-600 rounded-full translate-y-32 -translate-x-32 opacity-20"></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="p-3 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold">Molek School</h1>
                <p className="text-primary-200">Management System</p>
              </div>
            </div>
            
            {/* Description */}
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-semibold mb-4">
                Excellence in Nigerian Education
              </h2>
              <p className="text-primary-200 text-lg leading-relaxed">
                Empowering students, teachers, and parents through innovative 
                technology and comprehensive educational management solutions.
              </p>
            </div>
            
            {/* Features */}
            <div className="mt-12 grid gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
                <span>JSS & SSS Academic Management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent-400 rounded-full mr-3"></div>
                <span>WAEC & NECO Integration</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-secondary-400 rounded-full mr-3"></div>
                <span>Real-time Progress Tracking</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Auth Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center">
              <div className="p-2 bg-primary-600 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-primary-800">Molek School</h1>
                <p className="text-sm text-primary-600">Management System</p>
              </div>
            </Link>
          </div>
          
          {/* Back to Website Link */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Website
            </Link>
          </div>
          
          {/* Auth Content */}
          <div className="max-w-md w-full mx-auto">
            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-neutral-200">
              <Outlet />
            </div>
            
            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-500">
                © 2024 Molek School Management System. 
                <br />
                Built for Nigerian Educational Excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
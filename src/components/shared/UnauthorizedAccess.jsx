import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Home } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const UnauthorizedAccess = ({ 
  message = "You don't have permission to access this page.", 
  userRole 
}) => {
  const navigate = useNavigate();

  const getDashboardPath = () => {
    const paths = {
      'super-admin': '/super-admin',
      'admin': '/admin',
      'teacher': '/teacher',
      'parent': '/parent'
    };
    return paths[userRole] || '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Access Denied
          </h1>
          
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
          
          {userRole && (
            <Button 
              variant="primary" 
              onClick={() => navigate(getDashboardPath())}
              className="flex items-center"
            >
              <Home size={16} className="mr-2" />
              Dashboard
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UnauthorizedAccess;
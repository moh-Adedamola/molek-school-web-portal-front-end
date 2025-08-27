import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if user doesn't have permission
    switch (user.role) {
      case 'super_admin':
        return <Navigate to="/portal" replace />;
      case 'admin':
        return <Navigate to="/portal/admin" replace />;
      case 'teacher':
        return <Navigate to="/portal/teacher" replace />;
      case 'parent':
        return <Navigate to="/portal/parent" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default RoleBasedRoute;
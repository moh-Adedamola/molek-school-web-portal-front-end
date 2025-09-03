import { useAuth } from '../../context/AuthContext';
import UnauthorizedAccess from './UnauthorizedAccess';

const RoleBasedRoute = ({ allowedRoles = [], children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <UnauthorizedAccess message="Please log in to access this page." />;
  }

  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(user.role);

  if (!hasAccess) {
    return (
      <UnauthorizedAccess 
        message="You don't have permission to access this page."
        userRole={user.role}
      />
    );
  }

  return children;
};

export default RoleBasedRoute;
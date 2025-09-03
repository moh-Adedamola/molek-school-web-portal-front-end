import { useAuth } from '../../hooks/useAuth';

const RoleBasedComponent = ({ 
  allowedRoles = [], 
  children, 
  fallback = null 
}) => {
  const { user } = useAuth();

  if (!user) {
    return fallback;
  }

  const hasPermission = allowedRoles.length === 0 || allowedRoles.includes(user.role);

  if (!hasPermission) {
    return fallback;
  }

  return children;
};

export default RoleBasedComponent;
import { useAuth as useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

export const useAuth = () => {
  const auth = useAuthContext();

  // Check for existing session on mount
  useEffect(() => {
    auth.checkAuth();
  }, []);

  return auth;
};

export default useAuth;
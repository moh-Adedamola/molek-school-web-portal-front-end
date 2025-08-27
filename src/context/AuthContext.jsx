import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Mock users for testing
const mockUsers = [
  { id: 1, email: 'admin@school.ng', password: 'admin123', role: 'admin', name: 'School Administrator' },
  { id: 2, email: 'teacher@school.ng', password: 'teacher123', role: 'teacher', name: 'John Adebayo' },
  { id: 3, email: 'parent@school.ng', password: 'parent123', role: 'parent', name: 'Mrs. Okonkwo' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = { ...foundUser };
      delete userSession.password; // Remove password from session
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      setLoading(false);
      return { success: true };
    }
    
    setLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      return true;
    }
    return false;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
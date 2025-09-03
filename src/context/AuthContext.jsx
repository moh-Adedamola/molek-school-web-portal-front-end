import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, error: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: JSON.parse(savedUser) 
      });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Mock authentication - replace with actual API call
      const mockUsers = {
        'superadmin@school.ng': { id: 1, name: 'Super Admin', role: 'super-admin', email: 'superadmin@school.ng' },
        'admin@school.ng': { id: 2, name: 'School Admin', role: 'admin', email: 'admin@school.ng' },
        'teacher@school.ng': { id: 3, name: 'John Teacher', role: 'teacher', email: 'teacher@school.ng' },
        'parent@school.ng': { id: 4, name: 'Mary Parent', role: 'parent', email: 'parent@school.ng' }
      };

      const user = mockUsers[email];
      
      if (user && password === 'password123') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', 'mock-jwt-token');
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for the context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const authStatus = localStorage.getItem('is_authenticated');
    setIsAuthenticated(!!token && authStatus === 'true');
  }, []);
  
  // Login function
  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('is_authenticated', 'true');
    setIsAuthenticated(true);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_authenticated');
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

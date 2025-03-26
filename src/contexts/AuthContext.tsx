
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user profile type
interface UserProfile {
  name?: string;
  email?: string;
  picture?: string;
}

// Define types for the context
interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (token: string, profile?: UserProfile) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userProfile: null,
  login: () => {},
  logout: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const authStatus = localStorage.getItem('is_authenticated');
    
    if (token && authStatus === 'true') {
      setIsAuthenticated(true);
      
      // Try to retrieve user profile from localStorage
      const storedProfile = localStorage.getItem('user_profile');
      if (storedProfile) {
        try {
          setUserProfile(JSON.parse(storedProfile));
        } catch (e) {
          console.error('Failed to parse user profile:', e);
        }
      }
    }
  }, []);
  
  // Login function
  const login = (token: string, profile?: UserProfile) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('is_authenticated', 'true');
    
    if (profile) {
      localStorage.setItem('user_profile', JSON.stringify(profile));
      setUserProfile(profile);
    }
    
    setIsAuthenticated(true);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('user_profile');
    setIsAuthenticated(false);
    setUserProfile(null);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

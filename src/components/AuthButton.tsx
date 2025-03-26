
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AuthButton = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return isAuthenticated ? (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout}
      className="gap-2 text-sm border-border/30 shadow-md"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  ) : (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogin}
      className="gap-2 text-sm border-border/30 shadow-md"
    >
      <LogIn className="h-4 w-4" />
      Sign In
    </Button>
  );
};

export default AuthButton;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from './ThemeToggle';

const AuthButton = () => {
  const { isAuthenticated, logout, userProfile } = useAuth();
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

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <ThemeToggle />
      
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 border border-border/40 shadow-md"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage 
                  src={userProfile?.picture || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} 
                  alt={userProfile?.name || "User"} 
                />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-border/30 bg-muted/30 backdrop-blur-md">
            <DropdownMenuLabel className="text-center py-2">
              {userProfile?.name || "My Account"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userProfile?.email && (
              <DropdownMenuItem className="cursor-default opacity-70 focus:opacity-70">
                {userProfile.email}
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogin}
          className="gap-2 text-sm border-border/30 shadow-md hover:bg-primary/10 hover:text-primary"
        >
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      )}
    </div>
  );
};

export default AuthButton;


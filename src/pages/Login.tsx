
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import ThemeToggle from '@/components/ThemeToggle';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse: any) => {
    console.log('Google login success:', credentialResponse);
    
    // Here you would typically validate the token with your backend
    // For demo purposes, we'll just simulate a successful login
    
    // Store the token in localStorage (in a real app, consider more secure storage)
    localStorage.setItem('auth_token', credentialResponse.credential);
    localStorage.setItem('is_authenticated', 'true');
    
    toast({
      title: "Login successful",
      description: "You have been successfully logged in with Google.",
      duration: 3000,
    });
    
    // Redirect to the main page
    navigate('/');
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    toast({
      title: "Login failed",
      description: "Google authentication was unsuccessful. Please try again.",
      variant: "destructive",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/10 to-background">
      <ThemeToggle />
      
      {/* Background Elements (simplified from Index page) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-grow flex justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border border-border/30 shadow-xl backdrop-blur-sm bg-muted/30">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to continue to Summarize-matic
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="filled_blue"
                  size="large"
                  type="standard"
                  shape="rectangular"
                  locale="en"
                  text="signin_with"
                  logo_alignment="left"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <div className="text-center text-sm text-muted-foreground mt-4">
                By signing in, you agree to our 
                <a href="#" className="text-primary hover:underline ml-1">Terms of Service</a> and 
                <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-4 glass-bg border-t border-primary/10">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            Designed with precision and care
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;

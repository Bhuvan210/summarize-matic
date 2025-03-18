
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <motion.div 
      className="flex items-center gap-2 fixed top-4 right-4 z-50 bg-muted/30 backdrop-blur-md p-2 rounded-full border border-border/30 shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Sun className="h-4 w-4 text-foreground" />
      <Switch 
        checked={isDark}
        onCheckedChange={handleToggle}
      />
      <Moon className="h-4 w-4 text-foreground" />
    </motion.div>
  );
};

export default ThemeToggle;

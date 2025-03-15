
import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.div 
      className="flex items-center gap-2 fixed top-4 right-4 z-50 bg-background/70 backdrop-blur-md p-2 rounded-full border border-[#74bcf4]/30 shadow-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Sun className="h-4 w-4 text-[#e0cab8] dark:text-[#74bcf4]" />
      <Switch 
        checked={isDark}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-[#0474ea] data-[state=unchecked]:bg-[#b49577]"
      />
      <Moon className="h-4 w-4 text-[#024082] dark:text-[#e0cab8]" />
    </motion.div>
  );
};

export default ThemeToggle;

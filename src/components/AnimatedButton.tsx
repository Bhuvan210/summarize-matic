
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'gradient' | 'glass' | 'colorful' | 'highlight';
  loading?: boolean;
  icon?: React.ReactNode;
  glowEffect?: boolean;
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  className, 
  variant = 'default',
  loading = false,
  icon,
  glowEffect = false,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-full text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  // Use class-variance-authority for consistent styling with shadcn/ui
  const variantStyles = {
    default: buttonVariants({ variant: "default" }),
    outline: buttonVariants({ variant: "outline" }),
    ghost: buttonVariants({ variant: "ghost" }),
    gradient: "bg-gradient-to-r from-primary/90 via-secondary to-accent/70 text-primary-foreground shadow-md hover:shadow-lg px-6 py-3",
    glass: "backdrop-blur-md bg-white/10 border border-white/20 text-primary-foreground shadow-md hover:shadow-lg px-6 py-3",
    colorful: "bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg px-6 py-3 hover:scale-105",
    highlight: buttonVariants({ variant: "highlight" })
  };
  
  // Motion props that are compatible with the component
  const buttonMotionProps = {
    whileTap: { scale: 0.98 },
    whileHover: { scale: 1.02 },
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { 
      type: "spring", 
      stiffness: 500, 
      damping: 30,
      opacity: { duration: 0.2 }
    }
  };
  
  return (
    <div className={`relative ${glowEffect ? 'group' : ''}`}>
      {glowEffect && variant === 'highlight' ? (
        <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      ) : glowEffect ? (
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      ) : null}
      
      <motion.button
        className={cn(baseStyles, variant in variantStyles ? variantStyles[variant] : "", className)}
        {...buttonMotionProps}
        disabled={loading || props.disabled}
        // Using type assertion to ensure HTML button props are compatible with motion.button
        {...props as any}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing
          </span>
        ) : (
          <>
            {children}
            {icon && <span className="ml-2">{icon}</span>}
          </>
        )}
      </motion.button>
    </div>
  );
};

export default AnimatedButton;

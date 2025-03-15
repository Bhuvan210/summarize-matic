
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import AnimatedButton from '@/components/AnimatedButton';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Enhanced badge with softer colors */}
      <motion.div 
        className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full border border-primary/20 shadow-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-base">Powered by AI</span>
      </motion.div>
      
      {/* Heading with softer gradient */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight drop-shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/80">
          Distill <span className="animated-gradient-text font-extrabold">clarity</span> from complexity
        </span>
      </motion.h1>
      
      {/* Description with softer background */}
      <motion.p 
        className="text-lg md:text-xl font-medium text-foreground/90 max-w-3xl mx-auto mb-8 bg-background/60 backdrop-blur-sm py-2 px-4 rounded-lg border border-border/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Transform lengthy content into concise, meaningful summaries with our 
        sophisticated AI text summarization tool.
      </motion.p>
      
      {/* Call-to-action button with softer colors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mb-8"
      >
        <AnimatedButton 
          variant="outline" 
          glowEffect={true}
          icon={<ArrowRight className="ml-1" />}
          className="text-lg py-3 px-8 border-primary/30 hover:bg-primary/5"
          onClick={() => document.getElementById('text-input')?.focus()}
        >
          Try it now
        </AnimatedButton>
      </motion.div>
      
      {/* Feature badges with softer colors */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Badge variant="outline" className="py-2 px-4 text-sm font-semibold text-primary bg-primary/5 border border-primary/20 shadow-sm">
          AI-Powered
        </Badge>
        <Badge variant="outline" className="py-2 px-4 text-sm font-semibold text-secondary-foreground bg-secondary/10 border border-secondary/20 shadow-sm">
          Accurate
        </Badge>
        <Badge variant="outline" className="py-2 px-4 text-sm font-semibold text-accent-foreground bg-accent/10 border border-accent/20 shadow-sm">
          Fast
        </Badge>
        <Badge variant="outline" className="py-2 px-4 text-sm font-semibold text-purple-700 bg-purple-50 border border-purple-200 shadow-sm">
          Intuitive
        </Badge>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

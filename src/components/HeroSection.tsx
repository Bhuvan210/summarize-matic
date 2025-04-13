
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

const HeroSection: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center pt-10 pb-6 md:pt-16 md:pb-10 px-4 text-center max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Badge with subtle styling */}
      <motion.div 
        className="inline-flex items-center justify-center mb-5 px-3 py-1 bg-primary/10 text-foreground rounded-full border border-primary/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-30"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-sm font-medium">Powered by AI</span>
      </motion.div>
      
      {/* Heading with softer styling */}
      <motion.h1 
        className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span className="text-foreground">
          Distill clarity <span className="text-primary">from complexity</span>
        </span>
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Transform lengthy content into concise, meaningful summaries with our 
        sophisticated AI text summarization tool.
      </motion.p>
      
      {/* Call-to-action button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mb-8"
      >
        <AnimatedButton 
          variant="outline" 
          icon={<ArrowRight className="w-4 h-4" />}
          className="text-sm py-2 px-6 rounded-full bg-primary/10 text-foreground border-primary/20 hover:bg-primary/20"
          onClick={() => document.getElementById('text-input')?.focus()}
        >
          Try it now
        </AnimatedButton>
      </motion.div>
      
      {/* Feature badges with more subtle styling */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mt-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="feature-badge">
          AI-Powered
        </div>
        <div className="feature-badge">
          Accurate
        </div>
        <div className="feature-badge">
          Fast
        </div>
        <div className="feature-badge">
          Intuitive
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

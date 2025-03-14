
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 md:py-24 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div 
        className="inline-flex items-center justify-center mb-6 px-4 py-1.5 bg-primary/15 text-primary text-sm font-medium rounded-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        Powered by AI
      </motion.div>
      
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Distill <span className="animated-gradient-text">clarity</span> from complexity
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Transform lengthy content into concise, meaningful summaries with our 
        sophisticated AI text summarization tool.
      </motion.p>
      
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
          AI-Powered
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
          Accurate
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
          Fast
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-700 dark:text-purple-300">
          Intuitive
        </span>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

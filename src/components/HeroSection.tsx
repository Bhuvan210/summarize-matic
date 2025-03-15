
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
      {/* Enhanced badge with stronger colors and border */}
      <motion.div 
        className="inline-flex items-center justify-center mb-6 px-4 py-2 bg-primary/20 text-primary font-semibold rounded-full border-2 border-primary/30 shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-base">Powered by AI</span>
      </motion.div>
      
      {/* Enhanced heading with stronger gradient and outline */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight drop-shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Distill <span className="animated-gradient-text font-extrabold">clarity</span> from complexity
        </span>
      </motion.h1>
      
      {/* Enhanced description with better contrast */}
      <motion.p 
        className="text-lg md:text-xl font-medium text-foreground max-w-3xl mx-auto mb-8 shadow-sm bg-background/80 backdrop-blur-sm py-2 px-4 rounded-lg"
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
          variant="colorful" 
          glowEffect={true}
          icon={<ArrowRight className="ml-1" />}
          className="text-lg py-3 px-8"
          onClick={() => document.getElementById('text-input')?.focus()}
        >
          Try it now
        </AnimatedButton>
      </motion.div>
      
      {/* Enhanced feature badges with stronger colors and borders */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Badge variant="default" className="py-2 px-4 text-sm font-bold uppercase shadow-md bg-primary border-2 border-primary/50">
          AI-Powered
        </Badge>
        <Badge className="py-2 px-4 text-sm font-bold uppercase shadow-md bg-secondary text-secondary-foreground border-2 border-secondary/50">
          Accurate
        </Badge>
        <Badge className="py-2 px-4 text-sm font-bold uppercase shadow-md bg-accent text-accent-foreground border-2 border-accent/50">
          Fast
        </Badge>
        <Badge className="py-2 px-4 text-sm font-bold uppercase shadow-md bg-purple-500 text-white border-2 border-purple-500/50">
          Intuitive
        </Badge>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;


import React from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

interface SummaryResultProps {
  summary: string;
  onReset: () => void;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ summary, onReset }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    // You could add a toast notification here
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="glass-card rounded-2xl p-6 shadow-lg"
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          delay: 0.1 
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <div className="flex space-x-2">
            <AnimatedButton 
              variant="ghost" 
              onClick={copyToClipboard}
              className="text-sm px-3 py-1.5"
            >
              <svg 
                className="w-4 h-4 mr-1.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy
            </AnimatedButton>
            
            <AnimatedButton 
              variant="ghost" 
              onClick={onReset}
              className="text-sm px-3 py-1.5"
            >
              <svg 
                className="w-4 h-4 mr-1.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              </svg>
              New Text
            </AnimatedButton>
          </div>
        </div>
        
        <motion.div 
          className="prose prose-gray dark:prose-invert max-w-none summary-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="leading-relaxed text-base">{summary}</p>
        </motion.div>
        
        <motion.div 
          className="mt-6 pt-4 border-t border-border flex justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-muted-foreground">
            AI-generated summaries may miss nuances or context. Review for accuracy.
          </p>
          
          <div className="flex items-center space-x-4">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="flex justify-center mt-8">
        <AnimatedButton onClick={onReset} variant="outline">
          Summarize Another Text
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default SummaryResult;

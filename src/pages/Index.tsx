import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import TextInput from '@/components/TextInput';
import SummaryResult from '@/components/SummaryResult';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SummarizerResponse } from '@/services/summarizer';
import { apiService } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SummarizerResponse | null>(null);
  const [processingType, setProcessingType] = useState<'text' | 'file' | 'url'>('text');

  const handleTextSubmit = async (text: string) => {
    setInputText(text);
    setIsProcessing(true);
    setProcessingType('text');
    
    try {
      const response = await apiService.summarizeText(text);
      
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: "Summary generated",
          description: "Your text has been successfully summarized.",
          duration: 3000,
        });
      } else {
        throw new Error(response.error || 'Failed to generate summary');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSubmit = async (file: File) => {
    setIsProcessing(true);
    setProcessingType('file');
    
    try {
      const response = await apiService.summarizeFile(file);
      
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: "File processed",
          description: `"${file.name}" has been successfully summarized.`,
          duration: 3000,
        });
      } else {
        throw new Error(response.error || 'Failed to process file');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error",
        description: "Failed to process file. Please try a different format.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlSubmit = async (url: string) => {
    setIsProcessing(true);
    setProcessingType('url');
    
    try {
      const response = await apiService.summarizeUrl(url);
      
      if (response.success && response.data) {
        setResult(response.data);
        toast({
          title: "URL processed",
          description: "Content from the URL has been successfully summarized.",
          duration: 3000,
        });
      } else {
        throw new Error(response.error || 'Failed to process URL');
      }
    } catch (error) {
      console.error('Error processing URL:', error);
      toast({
        title: "Error",
        description: "Failed to process URL. Please check the URL and try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputText('');
  };

  // Enhanced background particles animation config
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 5,
    duration: Math.random() * 25 + 15,
    color: i % 5 === 0 ? 'primary' : 
           i % 5 === 1 ? 'secondary' : 
           i % 5 === 2 ? 'accent' : 
           i % 5 === 3 ? 'purple-500' : 'pink-400'
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/10 to-background">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
        
        {/* Colorful particles */}
        {particles.map(particle => (
          <motion.div 
            key={particle.id}
            className={`absolute rounded-full bg-${particle.color}/20 blur-3xl`}
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{ 
              x: [0, Math.random() * 40 - 20, 0], 
              y: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, Math.random() * 0.4 + 0.2, 0.2]
            }}
            transition={{ 
              duration: particle.duration, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        ))}
        
        <motion.div 
          className="absolute top-48 -left-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, -25, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            x: [0, 25, 0], 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Content */}
      <main className="flex-grow container mx-auto px-4 pb-20">
        <HeroSection />
        
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TextInput 
                onSubmit={handleTextSubmit} 
                onFileSubmit={handleFileSubmit}
                onUrlSubmit={handleUrlSubmit}
                isProcessing={isProcessing} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SummaryResult summary={result} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>

        {isProcessing && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingSpinner 
              text={
                processingType === 'text' ? "Analyzing and summarizing text..." :
                processingType === 'file' ? "Processing file content..." :
                "Fetching and analyzing URL content..."
              } 
            />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 glass-bg border-t border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Designed with precision and care
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

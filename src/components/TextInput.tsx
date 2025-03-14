
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isProcessing: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, isProcessing }) => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(200, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isProcessing) {
      onSubmit(text);
    }
  };

  const handleSampleText = () => {
    const sampleText = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to intelligence displayed by humans or other animals. Example tasks in which this is done include speech recognition, computer vision, translation between languages, and decision-making. AI applications include advanced web search engines, recommendation systems (used by platforms such as YouTube, Amazon, and Netflix), understanding human speech (such as Google Assistant, Apple's Siri, and Amazon Alexa), self-driving cars, generative or creative tools, and AI medical diagnosis systems which could potentially assist or replace clinicians in various types of medical settings.

    AI development and deployment involves a diverse array of technologies, tools, approaches, methods, research fields, and disciplines that practitioners leverage to create systems capable of human-like simulation. It has been observed that AI-generated content, especially text, can be hard to distinguish from that created by humans, which raises questions around the validity of scientific knowledge when AI text is passed off as human-written and integrated into scientific literature. Furthermore, AI technologies have been shown to employ the Internet and social media to learn and subsequently perpetuate prejudice, racism, misogyny, and harmful stereotypes.`;
    setText(sampleText);
    setCharCount(sampleText.length);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(200, textareaRef.current.scrollHeight)}px`;
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div 
          className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
            isFocused ? 'shadow-lg ring-2 ring-primary/20' : 'shadow-md'
          }`}
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste your text here to summarize..."
            className="w-full p-6 text-input text-base resize-none bg-card text-card-foreground focus:outline-none"
            rows={8}
            disabled={isProcessing}
          />
          
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card to-transparent h-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{charCount} characters</span>
            <span className="mx-2">•</span>
            <button 
              type="button" 
              onClick={handleSampleText}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Try sample text
            </button>
          </div>
          
          <AnimatedButton 
            type="submit" 
            disabled={!text.trim() || isProcessing} 
            loading={isProcessing}
          >
            {isProcessing ? 'Summarizing...' : 'Summarize Text'}
          </AnimatedButton>
        </div>
      </form>
    </motion.div>
  );
};

export default TextInput;

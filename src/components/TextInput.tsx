
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { File, Link, X, UploadCloud, FileText, FileImage, FileArchive, FileAudio, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AnimatedButton from './AnimatedButton';

interface TextInputProps {
  onSubmit: (text: string) => void;
  onFileSubmit: (file: File) => void;
  onUrlSubmit: (url: string) => void;
  isProcessing: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onSubmit, onFileSubmit, onUrlSubmit, isProcessing }) => {
  const [text, setText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState<string>('text');
  const [url, setUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'text' && text.trim() && !isProcessing) {
      onSubmit(text);
    } else if (activeTab === 'file' && selectedFile && !isProcessing) {
      onFileSubmit(selectedFile);
    } else if (activeTab === 'url' && url.trim() && !isProcessing) {
      onUrlSubmit(url);
    }
  };

  const handleSampleText = () => {
    const sampleText = `Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to intelligence displayed by humans or other animals. Example tasks in which this is done include speech recognition, computer vision, translation between languages, and decision-making. AI applications include advanced web search engines, recommendation systems (used by platforms such as YouTube, Amazon, and Netflix), understanding human speech (such as Google Assistant, Apple's Siri, and Amazon Alexa), self-driving cars, generative or creative tools, and AI medical diagnosis systems which could potentially assist or replace clinicians in various types of medical settings.

    AI development and deployment involves a diverse array of technologies, tools, approaches, methods, research fields, and disciplines that practitioners leverage to create systems capable of human-like simulation. It has been observed that AI-generated content, especially text, can be hard to distinguish from that created by humans, which raises questions around the validity of scientific knowledge when AI text is passed off as human-written and integrated into scientific literature. Furthermore, AI technologies have been shown to employ the Internet and social media to learn and subsequently perpetuate prejudice, racism, misogyny, and harmful stereotypes.`;
    setText(sampleText);
    setCharCount(sampleText.length);
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(120, textareaRef.current.scrollHeight)}px`;
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <FileImage className="w-5 h-5" />;
    if (mimeType.startsWith('audio/')) return <FileAudio className="w-5 h-5" />;
    if (mimeType.startsWith('application/pdf')) return <FileText className="w-5 h-5" />;
    if (mimeType.includes('zip') || mimeType.includes('compressed')) return <FileArchive className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-4">
            <TabsList className="grid grid-cols-3 w-full max-w-xs bg-[#171F2F]/80 p-0.5">
              <TabsTrigger value="text" className="flex items-center gap-2 py-2">
                <FileText className="w-4 h-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2 py-2">
                <File className="w-4 h-4" />
                File
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2 py-2">
                <Link className="w-4 h-4" />
                URL
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="text" className="mt-0">
            <div className="bg-[#171F2F]/50 border border-white/5 rounded-lg p-4">
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                placeholder="Paste your text here to summarize..."
                className="bg-transparent border-0 p-0 focus-visible:ring-0 placeholder:text-white/40"
                id="text-input"
                disabled={isProcessing}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <div className="flex items-center text-sm text-white/60">
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
                loading={isProcessing && activeTab === 'text'}
                className="bg-primary text-white text-sm font-medium px-8 py-2.5 rounded-full shadow-lg"
                icon={<Sparkles className="w-4 h-4" />}
              >
                {isProcessing && activeTab === 'text' ? 'Summarizing...' : 'Summarize Text'}
              </AnimatedButton>
            </div>
          </TabsContent>

          <TabsContent value="file" className="mt-0">
            <div 
              className={`border border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
                dragActive ? 'border-primary bg-primary/5' : 'border-white/20 bg-[#171F2F]/50'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="flex flex-col items-center justify-center gap-4">
                  <motion.div 
                    className="p-3 rounded-full bg-primary/10 text-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UploadCloud className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-medium mb-1">Drop your file here</h3>
                    <p className="text-sm text-white/60 mb-4">
                      Supports TXT, PDF, DOCX, and images (for OCR)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileInputChange}
                      className="hidden"
                      accept=".txt,.pdf,.docx,.doc,.png,.jpg,.jpeg"
                      disabled={isProcessing}
                    />
                    <AnimatedButton
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/15 border-white/20 text-white text-sm"
                    >
                      Browse Files
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <motion.div 
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-lg w-full max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {getFileIcon(selectedFile.type)}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium truncate" style={{ maxWidth: '200px' }}>
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-white/60">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleFileClear}
                      className="p-1.5 hover:bg-white/10 rounded-full"
                      disabled={isProcessing}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                  
                  <AnimatedButton 
                    type="submit" 
                    disabled={isProcessing} 
                    loading={isProcessing && activeTab === 'file'}
                    className="bg-primary text-white text-sm font-medium px-8 py-2.5 rounded-full shadow-lg"
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    {isProcessing && activeTab === 'file' ? 'Processing...' : 'Summarize File'}
                  </AnimatedButton>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-0">
            <div className="bg-[#171F2F]/50 border border-white/5 rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="url-input" className="text-sm font-medium text-white/80">
                  Enter URL to Summarize
                </label>
                <Input
                  id="url-input"
                  type="url"
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-10 bg-transparent border-white/20 focus-visible:ring-primary/40"
                  disabled={isProcessing}
                />
                <p className="text-xs text-white/60">
                  Paste a URL to an article, blog post, or any web page
                </p>
              </div>
              
              <div className="flex justify-end">
                <AnimatedButton 
                  type="submit" 
                  disabled={!url.trim() || isProcessing} 
                  loading={isProcessing && activeTab === 'url'}
                  className="bg-primary text-white text-sm font-medium px-8 py-2.5 rounded-full shadow-lg"
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  {isProcessing && activeTab === 'url' ? 'Processing...' : 'Summarize URL'}
                </AnimatedButton>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </motion.div>
  );
};

export default TextInput;

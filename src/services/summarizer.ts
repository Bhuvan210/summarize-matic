
// This service would ideally connect to a real API
// For demo purposes, we're mocking the summarization
import { extractTextFromFile, ParsedFileContent } from './fileService';

export interface SummarizerResponse {
  summary: string;
  keyPoints?: string[];
  sentiment?: string;
  sourceType?: 'text' | 'file' | 'url';
  fileName?: string;
  fileType?: string;
  wordCount?: number;
  readingTime?: string;
  metadata?: Record<string, any>;
}

// Calculate reading time based on words
const calculateReadingTime = (text: string): string => {
  const words = text.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(words / 200); // Average reading speed: 200 words per minute
  return `${readingTimeMinutes} min read`;
};

export const summarizeText = async (text: string): Promise<SummarizerResponse> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // For demo purposes, we'll create a simple summary
  // In a real app, this would call an external API
  
  // Simple algorithm to extract important sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  
  // Take first sentence, one from middle, and last sentence for a crude summary
  let summaryText = '';
  
  if (sentences.length > 0) {
    // Always include the first sentence
    summaryText += sentences[0].trim() + ' ';
    
    // If more than 3 sentences, add a middle sentence
    if (sentences.length > 3) {
      const middleIndex = Math.floor(sentences.length / 2);
      summaryText += sentences[middleIndex].trim() + ' ';
    }
    
    // If more than 1 sentence, add the last sentence
    if (sentences.length > 1) {
      summaryText += sentences[sentences.length - 1].trim();
    }
    
    // If too long (over 300 chars), truncate and indicate there's more
    if (summaryText.length > 300) {
      summaryText = summaryText.substring(0, 300).trim() + '...';
    }
  } else {
    summaryText = "Unable to summarize this text. Please try a longer passage.";
  }
  
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = calculateReadingTime(text);
  
  // Extract potential key points (using simple heuristics for demo)
  const keyPoints = sentences
    .filter(s => {
      const lowercaseSentence = s.toLowerCase();
      return (
        lowercaseSentence.includes('important') || 
        lowercaseSentence.includes('key') || 
        lowercaseSentence.includes('significant') ||
        lowercaseSentence.includes('primary') ||
        lowercaseSentence.includes('essential')
      );
    })
    .map(s => s.trim())
    .slice(0, 3);
  
  // If no key points found based on keywords, take a few short sentences
  if (keyPoints.length === 0 && sentences.length > 0) {
    const shortSentences = sentences
      .filter(s => s.length < 100)
      .slice(0, 3)
      .map(s => s.trim());
    
    if (shortSentences.length > 0) {
      keyPoints.push(...shortSentences);
    } else {
      keyPoints.push("No distinct key points identified.");
    }
  }
  
  // Simple sentiment analysis (for demo purposes)
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'amazing', 'wonderful', 'best'];
  const negativeWords = ['bad', 'terrible', 'negative', 'awful', 'worst', 'horrible', 'poor'];
  
  const words = text.toLowerCase().split(/\W+/);
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  let sentiment;
  if (positiveCount > negativeCount * 2) sentiment = "very positive";
  else if (positiveCount > negativeCount) sentiment = "positive";
  else if (negativeCount > positiveCount * 2) sentiment = "very negative";
  else if (negativeCount > positiveCount) sentiment = "negative";
  else sentiment = "neutral";
  
  return {
    summary: summaryText,
    keyPoints,
    sentiment,
    sourceType: 'text',
    wordCount,
    readingTime
  };
};

export const summarizeFile = async (file: File): Promise<SummarizerResponse> => {
  try {
    const parsedFile = await extractTextFromFile(file);
    const result = await summarizeText(parsedFile.text);
    
    return {
      ...result,
      sourceType: 'file',
      fileName: parsedFile.fileName,
      fileType: parsedFile.fileType,
      metadata: parsedFile.metadata
    };
  } catch (error) {
    console.error('Error processing file:', error);
    return {
      summary: "There was an error processing this file. Please try a different file or format.",
      sentiment: "neutral",
      sourceType: 'file',
      fileName: file.name,
      fileType: file.type
    };
  }
};

export const summarizeUrl = async (url: string): Promise<SummarizerResponse> => {
  // In a real app, this would fetch the content of the URL on the server
  // For demo purposes, we'll simulate it
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Simulate extracted content from URL
  const simulatedContent = `This is simulated content extracted from the URL "${url}". In a production environment, we would use server-side code to fetch and extract content from the provided URL. This simulated content is being used to demonstrate how URL summarization would work. The system would fetch the URL, extract the main content, and then apply the summarization algorithm to provide you with a concise summary of the content found at the URL.`;
  
  const result = await summarizeText(simulatedContent);
  
  return {
    ...result,
    sourceType: 'url',
    metadata: {
      url,
      siteName: new URL(url).hostname,
      fetchDate: new Date().toISOString()
    }
  };
};

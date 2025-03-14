
// This service would ideally connect to a real API
// For demo purposes, we're mocking the summarization

export interface SummarizerResponse {
  summary: string;
  keyPoints?: string[];
  sentiment?: string;
  sourceType?: 'text' | 'file' | 'url';
  fileName?: string;
  fileType?: string;
  wordCount?: number;
  readingTime?: string;
}

type FileParsingResult = {
  text: string;
  fileType: string;
  fileName: string;
};

// Helper function to extract text from different file types
const extractTextFromFile = async (file: File): Promise<FileParsingResult> => {
  const fileName = file.name;
  const fileType = file.type;
  
  // Text files
  if (fileType.includes('text/plain')) {
    const text = await file.text();
    return { text, fileType, fileName };
  }
  
  // PDF files
  if (fileType.includes('application/pdf')) {
    // For demo purposes, we're simulating PDF parsing
    // In a real app, you would use a library like pdf.js
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { 
      text: `This is simulated text extracted from the PDF file "${fileName}". In a production environment, we would use proper PDF parsing libraries to extract the text content accurately.`,
      fileType, 
      fileName 
    };
  }
  
  // Word documents
  if (fileType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') || 
      fileType.includes('application/msword')) {
    // For demo, simulate Word document parsing
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { 
      text: `This is simulated text extracted from the Word document "${fileName}". In a production environment, we would use proper document parsing libraries to extract the text content accurately.`,
      fileType, 
      fileName 
    };
  }
  
  // Images (OCR simulation)
  if (fileType.includes('image/')) {
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { 
      text: `This is simulated text extracted via OCR from the image "${fileName}". In a production environment, we would use proper OCR services or libraries to extract the text content from the image.`,
      fileType, 
      fileName 
    };
  }
  
  // Default fallback
  return { 
    text: `Unable to extract text from this file type (${fileType}). Please try a supported file format.`,
    fileType, 
    fileName 
  };
};

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
    .filter(s => 
      s.includes('important') || 
      s.includes('key') || 
      s.includes('significant') ||
      s.includes('primary') ||
      s.includes('essential')
    )
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
    const { text, fileType, fileName } = await extractTextFromFile(file);
    const result = await summarizeText(text);
    
    return {
      ...result,
      sourceType: 'file',
      fileName,
      fileType
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
    sourceType: 'url'
  };
};

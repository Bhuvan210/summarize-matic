
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
  console.log(`Summarizing text of length: ${text.length} characters`);
  
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // For demo purposes, we'll create a simple summary
  // In a real app, this would call an external API
  
  // Simple algorithm to extract important sentences
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  console.log(`Found ${sentences.length} sentences in the text`);
  
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
  
  // Extract key points from the content
  const keyPoints = extractKeyPoints(sentences);
  
  // Analyze sentiment
  const sentiment = analyzeSentiment(text);
  
  return {
    summary: summaryText,
    keyPoints,
    sentiment,
    sourceType: 'text',
    wordCount,
    readingTime
  };
};

// Extract key points
const extractKeyPoints = (sentences: string[]): string[] => {
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
  
  return keyPoints;
};

// Analyze sentiment
const analyzeSentiment = (text: string): string => {
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
  
  return sentiment;
};

export const summarizeFile = async (file: File): Promise<SummarizerResponse> => {
  console.log(`Summarizing file: ${file.name} (${file.type})`);
  try {
    const parsedFile = await extractTextFromFile(file);
    console.log(`Successfully extracted text from file, length: ${parsedFile.text.length} characters`);
    
    // Use the same summarization logic for the extracted text
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
  const simulatedContent = `
  Latest Research on Climate Change Adaptation Strategies
  
  Global temperatures have risen by an average of 1.1°C since pre-industrial times, with significant regional variations. This warming has led to measurable impacts on ecosystems, agriculture, and human health worldwide. As climate change accelerates, communities and governments are increasingly focusing on adaptation strategies to reduce vulnerability to climate impacts.
  
  A recent meta-analysis of adaptation initiatives across 40 countries identified several best practices emerging from successful programs. Projects that integrated traditional ecological knowledge with scientific data showed particular promise, especially in agricultural and water management contexts. Community-led initiatives demonstrated higher rates of long-term sustainability compared to top-down approaches.
  
  Coastal regions face particular challenges from sea level rise and increasing storm intensity. Nature-based solutions such as mangrove restoration and living shorelines have proven cost-effective in many contexts, often providing co-benefits for biodiversity and carbon sequestration. However, implementation barriers remain, including funding constraints and regulatory hurdles.
  
  Urban areas are implementing innovative approaches to address heat island effects and flooding risks. Green infrastructure investments such as permeable pavements, urban forests, and green roofs show promising results in reducing temperatures and managing stormwater. These solutions often provide additional benefits including improved air quality and enhanced quality of life for residents.
  
  As climate impacts intensify, the economic case for proactive adaptation grows stronger. Cost-benefit analyses consistently demonstrate that early investments in resilience yield substantial long-term savings by reducing disaster recovery costs and minimizing economic disruption. Nevertheless, securing upfront financing remains a significant challenge, particularly for lower-income communities and countries.
  `;
  
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

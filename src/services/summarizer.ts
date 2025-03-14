
// This service would ideally connect to a real API
// For demo purposes, we're mocking the summarization

export interface SummarizerResponse {
  summary: string;
  keyPoints?: string[];
  sentiment?: string;
}

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
  
  return {
    summary: summaryText,
    keyPoints: ["This is a key point", "This is another key point"],
    sentiment: "neutral"
  };
};

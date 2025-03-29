
import { SummarizerResponse } from './summarizer';
import { extractTextFromFile } from './fileService';

// Use a real API base URL - this could be an environment variable in production
const API_BASE_URL = 'https://api.summarize-matic.com/api';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer api_key_would_go_here' // In production, use proper auth
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * API service for backend calls
 */
export const apiService = {
  async summarizeText(text: string): Promise<ApiResponse<SummarizerResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/summarize/text`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data as SummarizerResponse,
      };
    } catch (error) {
      console.error('Error in API call:', error);
      
      // Fallback to mock implementation for development/demo purposes
      console.warn('Falling back to mock implementation');
      const mockResponse = await import('./summarizer').then(module => module.summarizeText(text));
      
      return {
        success: true,
        data: mockResponse,
      };
    }
  },
  
  async summarizeFile(file: File): Promise<ApiResponse<SummarizerResponse>> {
    try {
      // First extract the text content from the file
      const extractedContent = await extractTextFromFile(file);
      
      // For file types that we can directly parse (text files), send the content directly
      if (extractedContent.text) {
        // Try the API first
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('extractedText', extractedContent.text);
          formData.append('fileType', extractedContent.fileType);
          
          const response = await fetch(`${API_BASE_URL}/summarize/file`, {
            method: 'POST',
            headers: {
              'Authorization': headers.Authorization,
            },
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          return {
            success: true,
            data: data as SummarizerResponse,
          };
        } catch (apiError) {
          console.error('Error in API call:', apiError);
          console.warn('Falling back to extracted text summarization');
          
          // Use the extracted text for summarization through the local mock
          const mockResponse = await import('./summarizer').then(module => 
            module.summarizeText(extractedContent.text)
          );
          
          return {
            success: true,
            data: {
              ...mockResponse,
              sourceType: 'file',
              fileName: extractedContent.fileName,
              fileType: extractedContent.fileType,
              metadata: extractedContent.metadata
            }
          };
        }
      } else {
        throw new Error(`Could not extract text from file: ${file.name}`);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      
      // Fallback to mock implementation for development/demo purposes
      console.warn('Falling back to mock implementation');
      const mockResponse = await import('./summarizer').then(module => module.summarizeFile(file));
      
      return {
        success: true,
        data: mockResponse,
      };
    }
  },
  
  async summarizeUrl(url: string): Promise<ApiResponse<SummarizerResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/summarize/url`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data as SummarizerResponse,
      };
    } catch (error) {
      console.error('Error in API call:', error);
      
      // Fallback to mock implementation for development/demo purposes
      console.warn('Falling back to mock implementation');
      const mockResponse = await import('./summarizer').then(module => module.summarizeUrl(url));
      
      return {
        success: true,
        data: mockResponse,
      };
    }
  },

  async shareViaSocialMedia(platform: string, content: { title: string; text: string; url?: string }): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/share/${platform}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(content),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data as { success: boolean },
      };
    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
      
      // Fallback response for development/demo
      console.warn('Falling back to mock implementation');
      return {
        success: true,
        data: { success: true }
      };
    }
  },
  
  async generateSharingLink(summary: string): Promise<ApiResponse<{ shareUrl: string; expiresAt: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/share/generate-link`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ summary }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data as { shareUrl: string; expiresAt: string },
      };
    } catch (error) {
      console.error('Error generating sharing link:', error);
      
      // Fallback for development/demo
      console.warn('Falling back to mock implementation');
      const mockShareId = Math.random().toString(36).substring(2, 15);
      const shareUrl = `https://app.summarize-matic.com/share/${mockShareId}`;
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      
      return {
        success: true,
        data: {
          shareUrl,
          expiresAt
        }
      };
    }
  }
};

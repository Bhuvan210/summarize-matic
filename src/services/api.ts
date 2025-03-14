
import { SummarizerResponse } from './summarizer';

const API_BASE_URL = '/api';

const headers = {
  'Content-Type': 'application/json',
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Mock API service that simulates backend calls
 * In a real application, this would connect to an actual backend
 */
export const apiService = {
  async summarizeText(text: string): Promise<ApiResponse<SummarizerResponse>> {
    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a fetch call to a backend endpoint
      const response = await fetch(`${API_BASE_URL}/summarize/text`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ text }),
      });
      
      // Mock implementation - would be replaced with actual API response
      const mockResponse = await import('./summarizer').then(module => module.summarizeText(text));
      
      return {
        success: true,
        data: mockResponse,
      };
    } catch (error) {
      console.error('Error in API call:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  },
  
  async summarizeFile(file: File): Promise<ApiResponse<SummarizerResponse>> {
    try {
      // Simulate network latency for file upload and processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be a fetch with FormData
      // const formData = new FormData();
      // formData.append('file', file);
      // const response = await fetch(`${API_BASE_URL}/summarize/file`, {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // Mock implementation
      const mockResponse = await import('./summarizer').then(module => module.summarizeFile(file));
      
      return {
        success: true,
        data: mockResponse,
      };
    } catch (error) {
      console.error('Error in API call:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  },
  
  async summarizeUrl(url: string): Promise<ApiResponse<SummarizerResponse>> {
    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // In a real app, this would be a fetch call
      // const response = await fetch(`${API_BASE_URL}/summarize/url`, {
      //   method: 'POST',
      //   headers,
      //   body: JSON.stringify({ url }),
      // });
      
      // Mock implementation
      const mockResponse = await import('./summarizer').then(module => module.summarizeUrl(url));
      
      return {
        success: true,
        data: mockResponse,
      };
    } catch (error) {
      console.error('Error in API call:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }
};

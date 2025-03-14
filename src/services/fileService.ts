
/**
 * File service to handle various file operations
 */

export interface ParsedFileContent {
  text: string;
  fileType: string;
  fileName: string;
  metadata?: Record<string, any>;
}

/**
 * Extracts text content from various file types
 */
export const extractTextFromFile = async (file: File): Promise<ParsedFileContent> => {
  const fileName = file.name;
  const fileType = file.type;
  
  // Text files
  if (fileType.includes('text/plain')) {
    const text = await file.text();
    return { text, fileType, fileName };
  }
  
  // PDF files
  if (fileType.includes('application/pdf')) {
    // In a real implementation, we would use a library like pdf.js
    // Here's a simulation of PDF parsing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return { 
      text: `This is simulated text extracted from the PDF file "${fileName}". In a production environment, we would use proper PDF parsing libraries to extract the text content accurately.`,
      fileType, 
      fileName,
      metadata: {
        // Mock metadata that would be extracted from a real PDF
        pageCount: Math.floor(Math.random() * 10) + 1,
        author: 'Document Author',
        creationDate: new Date().toISOString(),
      } 
    };
  }
  
  // Word documents
  if (fileType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') || 
      fileType.includes('application/msword')) {
    // Simulate Word document parsing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return { 
      text: `This is simulated text extracted from the Word document "${fileName}". In a production environment, we would use proper document parsing libraries to extract the text content accurately.`,
      fileType, 
      fileName,
      metadata: {
        // Mock metadata that would be extracted from a real Word document
        pageCount: Math.floor(Math.random() * 10) + 1,
        author: 'Document Author',
        creationDate: new Date().toISOString(),
      } 
    };
  }
  
  // Images (OCR simulation)
  if (fileType.includes('image/')) {
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { 
      text: `This is simulated text extracted via OCR from the image "${fileName}". In a production environment, we would use proper OCR services or libraries to extract the text content from the image.`,
      fileType, 
      fileName,
      metadata: {
        dimensions: `${Math.floor(Math.random() * 1000) + 500}x${Math.floor(Math.random() * 1000) + 500}`,
        colorSpace: 'RGB',
      }
    };
  }
  
  // Default fallback
  return { 
    text: `Unable to extract text from this file type (${fileType}). Please try a supported file format.`,
    fileType, 
    fileName 
  };
};

/**
 * Validates file size and type
 */
export const validateFile = (file: File, maxSizeMB = 10): { valid: boolean; message?: string } => {
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: `File size exceeds the maximum allowed size of ${maxSizeMB}MB.`
    };
  }
  
  // Check file type
  const supportedTypes = [
    'text/plain',                                          // TXT
    'application/pdf',                                     // PDF
    'application/msword',                                  // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'image/jpeg',                                          // JPEG
    'image/png',                                           // PNG
    'image/gif',                                           // GIF
    'image/webp'                                           // WEBP
  ];
  
  if (!supportedTypes.some(type => file.type.includes(type))) {
    return {
      valid: false,
      message: 'File type not supported. Please upload a TXT, PDF, DOC, DOCX, or image file.'
    };
  }
  
  return { valid: true };
};

/**
 * Gets a user-friendly file type name
 */
export const getFileTypeName = (fileType: string): string => {
  if (fileType.includes('text/plain')) return 'Text';
  if (fileType.includes('application/pdf')) return 'PDF';
  if (fileType.includes('application/msword') || 
      fileType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) return 'Word';
  if (fileType.includes('image/')) return 'Image';
  return 'Unknown';
};

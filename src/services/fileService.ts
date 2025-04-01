
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
  console.log(`Starting text extraction from file: ${file.name} (${file.type})`);
  const fileName = file.name;
  const fileType = file.type;
  
  // Text files
  if (fileType.includes('text/plain')) {
    console.log('Processing text file...');
    const text = await file.text();
    console.log(`Extracted ${text.length} characters from text file`);
    return { text, fileType, fileName };
  }
  
  // PDF files
  if (fileType.includes('application/pdf')) {
    try {
      console.log('Processing PDF file...');
      // In a real implementation, we would use a library like pdf.js
      // Here we'll try to extract text directly, but in a production app
      // you would want to use a proper PDF parsing library
      const arrayBuffer = await file.arrayBuffer();
      const text = await extractTextFromPDF(arrayBuffer);
      
      console.log(`Extracted ${text.length} characters from PDF`);
      
      return { 
        text: text || `This is simulated text extracted from the PDF file "${fileName}". In a production environment, we would use proper PDF parsing libraries to extract the text content accurately.`,
        fileType, 
        fileName,
        metadata: {
          // Mock metadata that would be extracted from a real PDF
          pageCount: Math.floor(Math.random() * 10) + 1,
          author: 'Document Author',
          creationDate: new Date().toISOString(),
        } 
      };
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      return { 
        text: `Error extracting text from the PDF file "${fileName}". ${error}`,
        fileType, 
        fileName
      };
    }
  }
  
  // Word documents
  if (fileType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document') || 
      fileType.includes('application/msword')) {
    try {
      console.log('Processing Word document...');
      // In a real implementation, we would use a library for Word documents
      // Simulate Word document parsing
      const arrayBuffer = await file.arrayBuffer();
      const text = await extractTextFromDOC(arrayBuffer, fileType);
      
      console.log(`Extracted ${text.length} characters from Word document`);
      
      return { 
        text: text || `This is simulated text extracted from the Word document "${fileName}". In a production environment, we would use proper document parsing libraries to extract the text content accurately.`,
        fileType, 
        fileName,
        metadata: {
          // Mock metadata that would be extracted from a real Word document
          pageCount: Math.floor(Math.random() * 10) + 1,
          author: 'Document Author',
          creationDate: new Date().toISOString(),
        } 
      };
    } catch (error) {
      console.error('Error extracting text from Word document:', error);
      return { 
        text: `Error extracting text from the Word document "${fileName}". ${error}`,
        fileType, 
        fileName
      };
    }
  }
  
  // Images (OCR simulation)
  if (fileType.includes('image/')) {
    try {
      console.log('Processing image with OCR...');
      // In a real implementation, we would use an OCR service
      // Simulate OCR processing
      const arrayBuffer = await file.arrayBuffer();
      const text = await extractTextFromImage(arrayBuffer, fileType);
      
      console.log(`Extracted ${text.length} characters from image via OCR`);
      
      return { 
        text: text || `This is simulated text extracted via OCR from the image "${fileName}". In a production environment, we would use proper OCR services or libraries to extract the text content from the image.`,
        fileType, 
        fileName,
        metadata: {
          dimensions: `${Math.floor(Math.random() * 1000) + 500}x${Math.floor(Math.random() * 1000) + 500}`,
          colorSpace: 'RGB',
        }
      };
    } catch (error) {
      console.error('Error extracting text from image:', error);
      return { 
        text: `Error extracting text from the image "${fileName}". ${error}`,
        fileType, 
        fileName
      };
    }
  }
  
  // Default fallback
  console.warn(`Unsupported file type: ${fileType}`);
  return { 
    text: `Unable to extract text from this file type (${fileType}). Please try a supported file format.`,
    fileType, 
    fileName 
  };
};

/**
 * Extract text from PDF (simulated)
 */
const extractTextFromPDF = async (buffer: ArrayBuffer): Promise<string> => {
  // In a real implementation, use pdf.js or similar library
  // Simulating PDF text extraction with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return `
    Document Title: Sample PDF Document
    
    Chapter 1: Introduction
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
    
    Chapter 2: Main Content
    
    Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt.
    
    Chapter 3: Conclusion
    
    Fusce consectetur, risus eget pretium consectetur, elit lacus mattis enim, ut placerat nulla sapien nec sem. Pellentesque nec risus sem. Integer consequat ultrices nisi nec tempus. Nulla facilisi. Proin porttitor sagittis orci eget interdum. Donec eget nibh erat, at hendrerit magna.
  `;
};

/**
 * Extract text from Word document (simulated)
 */
const extractTextFromDOC = async (buffer: ArrayBuffer, fileType: string): Promise<string> => {
  // In a real implementation, use appropriate library based on file type
  // Simulating document text extraction with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return `
    QUARTERLY REPORT
    
    EXECUTIVE SUMMARY
    
    This quarterly report summarizes the key performance indicators and achievements during Q3 2023. Overall, the company has seen a 15% growth in revenue compared to the previous quarter, with significant improvements in customer retention and market share.
    
    FINANCIAL PERFORMANCE
    
    Revenue: $4.5M (up 15% QoQ)
    Expenses: $2.8M (up 7% QoQ)
    Net Profit: $1.7M (up 31% QoQ)
    
    KEY ACHIEVEMENTS
    
    1. Launched two new product features
    2. Expanded to three new markets
    3. Reduced customer churn by 5%
    4. Completed migration to new cloud infrastructure
    
    CHALLENGES & NEXT STEPS
    
    The main challenges this quarter were related to supply chain disruptions and increasing competition. For Q4, we plan to focus on strengthening our supplier relationships and accelerating our product development roadmap.
  `;
};

/**
 * Extract text from image using OCR (simulated)
 */
const extractTextFromImage = async (buffer: ArrayBuffer, fileType: string): Promise<string> => {
  // In a real implementation, use an OCR service
  // Simulating OCR with a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return `
    MEETING AGENDA
    March 15, 2023
    
    1. Review previous meeting minutes
    2. Project status updates
       a. Website redesign
       b. Mobile app development
       c. Marketing campaign
    3. Budget review
    4. New business
    5. Action items
    
    Next meeting: April 1, 2023
  `;
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

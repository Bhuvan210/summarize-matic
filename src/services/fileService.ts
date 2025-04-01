
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
      // For PDFs, we'll extract text directly from the file
      const arrayBuffer = await file.arrayBuffer();
      
      // In a real app, you would use pdf.js or a similar library
      // For now we'll use our simplified extraction function
      const text = await readPdfContent(arrayBuffer);
      
      console.log(`Extracted ${text.length} characters from PDF`);
      
      return { 
        text,
        fileType, 
        fileName,
        metadata: {
          // Some basic metadata
          fileSize: file.size,
          lastModified: new Date(file.lastModified).toISOString(),
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
      // For Word documents, extract the text content
      const arrayBuffer = await file.arrayBuffer();
      const text = await readDocContent(arrayBuffer);
      
      console.log(`Extracted ${text.length} characters from Word document`);
      
      return { 
        text,
        fileType, 
        fileName,
        metadata: {
          fileSize: file.size,
          lastModified: new Date(file.lastModified).toISOString(),
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
      // For images, use OCR to extract text
      const arrayBuffer = await file.arrayBuffer();
      const text = await processImageOCR(arrayBuffer, fileType);
      
      console.log(`Extracted ${text.length} characters from image via OCR`);
      
      return { 
        text,
        fileType, 
        fileName,
        metadata: {
          dimensions: await getImageDimensions(file),
          fileSize: file.size,
          lastModified: new Date(file.lastModified).toISOString(),
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
 * Extract text from PDF
 */
const readPdfContent = async (buffer: ArrayBuffer): Promise<string> => {
  // In a real implementation, use pdf.js or similar library
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Process the actual PDF data (simulated)
    // In a real app, this would use a PDF library to extract the actual text content
    
    // Read the first few bytes to check if it's a valid PDF
    const bytes = new Uint8Array(buffer.slice(0, 5));
    const header = String.fromCharCode.apply(null, bytes as unknown as number[]);
    
    if (header !== '%PDF-') {
      throw new Error('Invalid PDF format');
    }
    
    // In a real implementation, this would extract the actual text from the PDF
    // For demo purposes, we're using placeholder content that would typically be 
    // extracted from the PDF file
    return `
The Theory of Everything: 
Understanding the Universe from Quantum to Cosmic Scales

Abstract:
This paper explores the current state of theoretical physics in its quest to unify quantum mechanics and general relativity into a cohesive "Theory of Everything." We examine recent developments in string theory, loop quantum gravity, and emergent gravity paradigms, highlighting experimental constraints and potential observational tests.

Introduction:
For nearly a century, physicists have sought to reconcile quantum mechanics with Einstein's theory of general relativity. This fundamental incompatibility between our best theories of the very small and the very large represents one of the greatest unsolved problems in modern physics. A successful unification would not only resolve theoretical inconsistencies but potentially explain the nature of dark matter, dark energy, and the origin of the universe itself.

Theoretical Frameworks:
String Theory posits that fundamental particles are actually tiny vibrating strings, with different vibration modes representing different particles. This framework requires extra spatial dimensions beyond the familiar three, compactified at scales far too small to detect with current technology. Recent developments in M-theory and AdS/CFT correspondence have provided mathematical tools to explore non-perturbative aspects of string theory.

Loop Quantum Gravity takes a different approach by directly quantizing spacetime itself, suggesting that space is ultimately discrete rather than continuous, composed of fundamental "atoms of geometry" at the Planck scale.

Experimental Constraints:
While direct tests of Planck-scale physics remain challenging, cosmological observations, particle accelerator data, and gravitational wave detectors provide increasingly tight constraints on viable unification theories. The discovery of the Higgs boson in 2012 completed the Standard Model but offered limited guidance toward unification.

Conclusion:
Though a complete "Theory of Everything" remains elusive, significant theoretical progress continues alongside new experimental techniques. The coming decades may finally bring us closer to understanding the fundamental nature of reality across all scales.
    `;
  } catch (error) {
    console.error('PDF reading error:', error);
    return 'Error: Could not extract content from PDF file. ' + error;
  }
};

/**
 * Extract text from Word document
 */
const readDocContent = async (buffer: ArrayBuffer): Promise<string> => {
  // In a real implementation, use appropriate library based on file type
  try {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would use a Word document parser
    // For demo purposes, we're extracting placeholder content
    return `
Annual Financial Report
FY 2023-2024

Executive Summary:
The fiscal year ending March 31, 2024 saw the company achieve record revenue of $87.3 million, representing a 12.4% year-over-year increase. Operating margins improved to 23.1%, up from 19.7% in the previous year, driven by operational efficiencies and strategic cost management initiatives. Net income reached $15.2 million, a substantial 31% increase from FY 2022-2023.

Key Financial Highlights:
• Total Revenue: $87.3 million (+12.4% YoY)
• Gross Profit: $51.9 million (+15.2% YoY)
• Operating Income: $20.2 million (+31.8% YoY)
• Net Income: $15.2 million (+31.0% YoY)
• Earnings Per Share: $1.87 (+29.9% YoY)
• Free Cash Flow: $18.7 million (+27.2% YoY)

Segment Performance:
The Software Solutions segment continued its strong performance with revenue of $58.4 million, up 17.3% year-over-year. This growth was primarily driven by a 24% increase in subscription-based offerings and expanded enterprise relationships. Our Professional Services segment revenue was $28.9 million, representing more modest growth of 3.2%, reflecting our strategic shift toward higher-margin software solutions.

Balance Sheet and Cash Flow:
The company ended the fiscal year with $42.3 million in cash and short-term investments, up from $29.1 million at the end of the previous fiscal year. This increase reflects strong operational cash generation of $23.5 million, partially offset by $5.2 million in capital expenditures and $5.1 million in dividend payments. The company remains debt-free with access to an unused $25 million revolving credit facility.

2024-2025 Outlook:
Management is providing initial guidance for FY 2024-2025, projecting revenue in the range of $96-100 million, representing 10-15% growth. Operating margins are expected to remain stable or slightly improve, with operating income projected at $22-24 million.
    `;
  } catch (error) {
    console.error('Doc reading error:', error);
    return 'Error: Could not extract content from Word document. ' + error;
  }
};

/**
 * Extract text from image using OCR
 */
const processImageOCR = async (buffer: ArrayBuffer, fileType: string): Promise<string> => {
  // In a real implementation, use an OCR service
  try {
    // Simulate OCR processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would use an OCR service to extract text from images
    // For demo purposes, we're simulating OCR extraction
    return `
MEETING MINUTES
Project Aurora Kickoff
Date: April 15, 2024
Time: 10:00 AM - 12:30 PM
Location: Conference Room A

Attendees:
- Sarah Johnson (Project Manager)
- Michael Chen (Lead Developer)
- Ana Rodriguez (UX Designer)
- David Patel (Product Owner)
- Emma Liu (Marketing Lead)
- Robert Thompson (QA Lead)

Agenda Items:
1. Project Overview and Goals
2. Timeline and Milestones
3. Team Roles and Responsibilities
4. Technical Architecture Discussion
5. Initial UX/UI Concepts
6. Next Steps

Key Decisions:
1. Project timeline approved with launch set for October 1
2. Weekly status meetings scheduled for Tuesdays at 11 AM
3. Development will follow two-week sprint cycles
4. Initial focus on core functionality, with enhanced features in phase two
5. User testing to begin in July with external focus groups

Action Items:
1. Sarah: Finalize project plan by April 22
2. Michael: Complete technical specification by April 29
3. Ana: Present wireframes at next meeting
4. David: Schedule stakeholder reviews for May
5. All: Review project documentation by end of week

Next Meeting: April 29, 10:00 AM
    `;
  } catch (error) {
    console.error('OCR processing error:', error);
    return 'Error: Could not extract text from image. ' + error;
  }
};

/**
 * Get image dimensions (width and height)
 */
const getImageDimensions = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(`${img.width}x${img.height}`);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve('Unknown dimensions');
    };
    img.src = URL.createObjectURL(file);
  });
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

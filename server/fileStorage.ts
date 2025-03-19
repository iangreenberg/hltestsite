import fs from 'fs';
import path from 'path';

// Ensure application directory exists
const ensureAppDirExists = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const dirPath = path.resolve('applicationInfo');
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err && err.code !== 'EEXIST') {
        console.error('Error creating applicationInfo directory:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Check if application directory is empty and create test files if needed
export async function createTestFilesIfEmpty(): Promise<void> {
  try {
    await ensureAppDirExists();
    
    const files = await getApplicationFiles();
    if (files.length === 0) {
      console.log('No application files found. Creating test files...');
      
      // Create a couple of test application files
      const testData1 = {
        fullName: "Test Applicant 1",
        email: "test1@example.com",
        phone: "555-123-4567",
        businessName: "Texas Hemp Solutions",
        cityState: "Dallas, TX",
        businessSituation: "new",
        packageInterest: "starter",
        businessBasics: "partial",
        timeframe: "within30",
        notes: "This is a test application submission"
      };
      
      const testData2 = {
        fullName: "Test Applicant 2",
        email: "test2@example.com",
        phone: "555-987-6543",
        businessName: "Austin Hemp Collective",
        cityState: "Austin, TX",
        businessSituation: "existing",
        packageInterest: "growth",
        businessBasics: "complete",
        timeframe: "immediate",
        notes: "This is another test application submission"
      };
      
      await saveApplicationToFile(testData1, testData1.fullName);
      await saveApplicationToFile(testData2, testData2.fullName);
      
      console.log('Test files created successfully');
    }
  } catch (error) {
    console.error('Error creating test files:', error);
  }
}

/**
 * Saves application data to a text file in the applicationInfo directory
 * @param data Application data to save
 * @param name Name of applicant (used in filename)
 * @returns The filepath where the data was saved
 */
export function saveApplicationToFile(data: any, name: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure directory exists first
      await ensureAppDirExists();
      
      // Sanitize inputs
      const sanitizedName = (name || 'anonymous').toLowerCase().replace(/[^a-z0-9]/g, '_');
      const timestamp = Date.now();
      const filename = `application_${timestamp}_${sanitizedName}.txt`;
      const filepath = path.join('applicationInfo', filename);
      
      // Format the data as JSON for better storage and readability
      const fileContent = JSON.stringify(data, null, 2);
      
      // Write to file
      fs.writeFile(filepath, fileContent, 'utf8', (err) => {
        if (err) {
          console.error('Error saving application file:', err);
          reject(err);
        } else {
          console.log(`Application saved to ${filepath}`);
          resolve(filepath);
        }
      });
    } catch (error) {
      console.error('Error in saveApplicationToFile:', error);
      reject(error);
    }
  });
}

/**
 * Retrieves all application files
 * @returns Array of application filenames
 */
export function getApplicationFiles(): Promise<string[]> {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure directory exists first
      await ensureAppDirExists();
      
      fs.readdir('applicationInfo', (err, files) => {
        if (err) {
          console.error('Error reading application directory:', err);
          reject(err);
        } else {
          // Filter out non-application files
          const applicationFiles = files.filter(file => 
            file.startsWith('application_') && file.endsWith('.txt')
          );
          resolve(applicationFiles);
        }
      });
    } catch (error) {
      console.error('Error in getApplicationFiles:', error);
      reject(error);
    }
  });
}

/**
 * Reads a specific application file
 * @param filename Name of the file to read
 * @returns Content of the application file
 */
export function readApplicationFile(filename: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure directory exists first
      await ensureAppDirExists();
      
      // Validate filename to prevent path traversal
      if (filename.includes('..') || !filename.startsWith('application_') || !filename.endsWith('.txt')) {
        return reject(new Error('Invalid filename'));
      }
      
      const filepath = path.join('applicationInfo', filename);
      fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading application file ${filename}:`, err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      console.error('Error in readApplicationFile:', error);
      reject(error);
    }
  });
}
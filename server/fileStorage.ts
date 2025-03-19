import fs from 'fs';
import path from 'path';

/**
 * Saves application data to a text file in the applicationInfo directory
 * @param data Application data to save
 * @param name Name of applicant (used in filename)
 * @returns The filepath where the data was saved
 */
export function saveApplicationToFile(data: any, name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Create a sanitized filename from the name
      const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const timestamp = Date.now();
      const filename = `application_${timestamp}_${sanitizedName}.txt`;
      const filepath = path.join('applicationInfo', filename);
      
      // Format the data as readable text
      let fileContent = `Application Submission - ${new Date().toLocaleString()}\n`;
      fileContent += `=============================================\n\n`;
      
      // Add all data fields
      Object.entries(data).forEach(([key, value]) => {
        fileContent += `${key}: ${value}\n`;
      });
      
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
  return new Promise((resolve, reject) => {
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
  });
}

/**
 * Reads a specific application file
 * @param filename Name of the file to read
 * @returns Content of the application file
 */
export function readApplicationFile(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const filepath = path.join('applicationInfo', filename);
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading application file ${filename}:`, err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
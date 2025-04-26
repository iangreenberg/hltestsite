/**
 * Simple logger utility for the application
 */

interface Logger {
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}

/**
 * Creates a logger with a specific source identifier
 * @param source Name of the source/module using the logger
 * @returns Logger instance
 */
export function createLogger(source: string): Logger {
  const getTimeStamp = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  // Format: [TIME] [LEVEL] [SOURCE] Message
  const format = (level: string, message: string) => 
    `${getTimeStamp()} [${level}] [${source}] ${message}`;
  
  return {
    info: (message: string, ...args: any[]) => {
      console.info(format('INFO', message), ...args);
    },
    
    warn: (message: string, ...args: any[]) => {
      console.warn(format('WARN', message), ...args);
    },
    
    error: (message: string, ...args: any[]) => {
      console.error(format('ERROR', message), ...args);
    },
    
    debug: (message: string, ...args: any[]) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(format('DEBUG', message), ...args);
      }
    }
  };
}
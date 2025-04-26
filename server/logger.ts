/**
 * Simple logging utility for the application
 */

// Simple logger implementation with different log levels and module prefixes
export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

// Log levels
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

// Environment-based log level
const LOG_LEVEL = process.env.NODE_ENV === 'production' 
  ? LogLevel.INFO 
  : LogLevel.DEBUG;

/**
 * Create a logger instance for a specific module
 */
export function createLogger(moduleName: string): Logger {
  return {
    debug(message: string, ...args: any[]) {
      if (LOG_LEVEL <= LogLevel.DEBUG) {
        console.debug(`[${moduleName}] ${message}`, ...args);
      }
    },
    
    info(message: string, ...args: any[]) {
      if (LOG_LEVEL <= LogLevel.INFO) {
        console.info(`[${moduleName}] ${message}`, ...args);
      }
    },
    
    warn(message: string, ...args: any[]) {
      if (LOG_LEVEL <= LogLevel.WARN) {
        console.warn(`[${moduleName}] ${message}`, ...args);
      }
    },
    
    error(message: string, ...args: any[]) {
      if (LOG_LEVEL <= LogLevel.ERROR) {
        console.error(`[${moduleName}] ${message}`, ...args);
      }
    }
  };
}

// Default logger
export const logger = createLogger('app');
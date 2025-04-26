/**
 * Simple logger utility
 */
export function createLogger(module: string) {
  return {
    info: (message: string, ...args: any[]) => {
      console.log(`[${new Date().toISOString()}] [INFO] [${module}] ${message}`, ...args);
    },
    warn: (message: string, ...args: any[]) => {
      console.warn(`[${new Date().toISOString()}] [WARN] [${module}] ${message}`, ...args);
    },
    error: (message: string, ...args: any[]) => {
      console.error(`[${new Date().toISOString()}] [ERROR] [${module}] ${message}`, ...args);
    },
    debug: (message: string, ...args: any[]) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug(`[${new Date().toISOString()}] [DEBUG] [${module}] ${message}`, ...args);
      }
    }
  };
}
import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Helper to determine if we're in production mode
const isProduction = typeof window !== 'undefined' && 
  window.location.hostname !== 'localhost' && 
  !window.location.hostname.includes('replit');

// Helper to get the base URL for API requests
// This ensures API calls work in all environments
const getBaseUrl = () => {
  // For Vercel deployments or any production environment
  if (isProduction) {
    // If we're on a specific environment or subdomain, handle it here
    // This handles different domains for API and frontend in production
    if (window.location.hostname.includes('vercel.app') || 
        window.location.hostname.includes('hemplaunch.co') ||
        window.location.hostname.includes('hemplaunch.com')) {
      return window.location.origin;
    }
    return window.location.origin;
  }
  // In development, use the local server (empty string means same origin)
  return "";
};

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Function to get an auth token from storage for token-based auth
const getAuthToken = () => {
  // Try to get token from localStorage (for environments where cookies don't work)
  return localStorage.getItem('auth_token'); 
};

// Function to store auth token in case cookies fail
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Function to remove auth token
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Prepend the base URL if needed
  const fullUrl = url.startsWith('/') ? `${getBaseUrl()}${url}` : url;
  
  // Set up headers with content type if needed
  const headers: Record<string, string> = data 
    ? { "Content-Type": "application/json" } 
    : {};
  
  // Add authorization header if we have a token (for environments where cookies don't work)
  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(fullUrl, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // Always include credentials for cookie-based auth
  });

  // For login/register endpoints, check if we can extract a token from the response
  if (res.ok && (url === '/api/login' || url === '/api/register')) {
    try {
      // Clone the response so we can read it twice
      const resClone = res.clone();
      const data = await resClone.json();
      
      // If the response has a token field, store it as a fallback
      if (data && (data.token || data.authToken)) {
        const token = data.token || data.authToken;
        setAuthToken(token);
      }
    } catch (error) {
      // Ignore errors here, the original response will still be returned
      console.warn('Could not extract token from login response:', error);
    }
  }
  
  // For logout endpoint, clear the auth token
  if (res.ok && url === '/api/logout') {
    removeAuthToken();
  }

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const key = queryKey[0] as string;
    // Prepend the base URL if needed
    const fullUrl = key.startsWith('/') ? `${getBaseUrl()}${key}` : key;
    
    // Set up headers for authorization
    const headers: Record<string, string> = {};
    
    // Add authorization header if we have a token (for environments where cookies don't work)
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const res = await fetch(fullUrl, {
      headers,
      credentials: "include", // Always include credentials for cookie-based auth
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

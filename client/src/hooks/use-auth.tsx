import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "./use-toast";
import type { User, InsertUser, LoginData } from "../lib/schema";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, InsertUser>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Store token in localStorage if available (for environments where cookies don't work)
      if (data && data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      return data as User;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      refetch();
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.username}!`,
      });
      
      // Redirect admin users to admin dashboard, regular users to home page
      // Use setTimeout to ensure the redirect happens after state updates
      setTimeout(() => {
        // Check if we're in production/Vercel environment
        const isVercel = window.location.hostname.includes('vercel.app') || 
                        window.location.hostname.includes('hemplaunch.co') ||
                        window.location.hostname.includes('hemplaunch.com');
        
        // For Vercel deployments, use absolute URLs
        if (user.isAdmin) {
          console.log("Redirecting admin to dashboard...");
          if (isVercel) {
            // For Vercel, construct the full URL with origin
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/admin/dashboard`;
            console.log("Vercel redirect to:", `${baseUrl}/admin/dashboard`);
          } else {
            // For local development
            window.location.href = "/admin/dashboard";
          }
        } else {
          console.log("Redirecting user to home...");
          if (isVercel) {
            const baseUrl = window.location.origin;
            window.location.href = baseUrl;
          } else {
            window.location.href = "/";
          }
        }
      }, 500); // Increased timeout for Vercel
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      
      // Store token in localStorage if available (for environments where cookies don't work)
      if (data && data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      return data as User;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      refetch();
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.username}!`,
      });
      
      // Redirect admin users to admin dashboard, regular users to home page
      // Use setTimeout to ensure the redirect happens after state updates
      setTimeout(() => {
        // Check if we're in production/Vercel environment
        const isVercel = window.location.hostname.includes('vercel.app') || 
                        window.location.hostname.includes('hemplaunch.co') ||
                        window.location.hostname.includes('hemplaunch.com');
        
        if (user.isAdmin) {
          console.log("Redirecting admin to dashboard...");
          if (isVercel) {
            // For Vercel, construct the full URL with origin
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/admin/dashboard`;
            console.log("Vercel redirect to:", `${baseUrl}/admin/dashboard`);
          } else {
            // For local development
            window.location.href = "/admin/dashboard";
          }
        } else {
          console.log("Redirecting user to home...");
          if (isVercel) {
            const baseUrl = window.location.origin;
            window.location.href = baseUrl;
          } else {
            window.location.href = "/";
          }
        }
      }, 500); // Increased timeout for Vercel
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/logout");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }
      
      // Clear token from localStorage regardless of response
      localStorage.removeItem('auth_token');
    },
    onSuccess: () => {
      // Clear all auth-related data
      queryClient.setQueryData(["/api/user"], null);
      queryClient.invalidateQueries({queryKey: ["/api/user"]});
      
      // Clear token from localStorage again to ensure it's removed
      localStorage.removeItem('auth_token');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      // Redirect to login page after logout using direct window location
      // Use setTimeout to ensure the redirect happens after state updates
      setTimeout(() => {
        // Check if we're in production/Vercel environment
        const isVercel = window.location.hostname.includes('vercel.app') || 
                        window.location.hostname.includes('hemplaunch.co') ||
                        window.location.hostname.includes('hemplaunch.com');
                        
        console.log("Redirecting to auth page...");
        if (isVercel) {
          // For Vercel, construct the full URL with origin
          const baseUrl = window.location.origin;
          window.location.href = `${baseUrl}/auth`;
          console.log("Vercel redirect to:", `${baseUrl}/auth`);
        } else {
          window.location.href = "/auth";
        }
      }, 500); // Increased timeout for Vercel
    },
    onError: (error: Error) => {
      // If server-side logout fails, still clear client-side auth
      localStorage.removeItem('auth_token');
      queryClient.setQueryData(["/api/user"], null);
      
      toast({
        title: "Logout had issues",
        description: "You've been logged out locally, but there was a server issue: " + error.message,
        variant: "destructive",
      });
      
      // Still redirect to auth page using direct window location
      setTimeout(() => {
        // Check if we're in production/Vercel environment
        const isVercel = window.location.hostname.includes('vercel.app') || 
                        window.location.hostname.includes('hemplaunch.co') ||
                        window.location.hostname.includes('hemplaunch.com');
                        
        console.log("Redirecting to auth page after error...");
        if (isVercel) {
          // For Vercel, construct the full URL with origin
          const baseUrl = window.location.origin;
          window.location.href = `${baseUrl}/auth`;
          console.log("Vercel redirect to:", `${baseUrl}/auth`);
        } else {
          window.location.href = "/auth";
        }
      }, 500); // Increased timeout for Vercel
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
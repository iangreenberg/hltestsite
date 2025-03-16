import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User, InsertUser } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

type AuthResponse = {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  isAuthenticated?: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: InsertUser) => Promise<void>;
};

// Create context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('auth-token')
  );

  // Persist token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('auth-token', token);
    } else {
      localStorage.removeItem('auth-token');
    }
  }, [token]);

  // Auth status query
  const {
    data: authData,
    error,
    isLoading,
    refetch: refetchAuth,
  } = useQuery<AuthResponse>({
    queryKey: ["/api/auth/status"],
    queryFn: async () => {
      const headers: HeadersInit = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const res = await fetch("/api/auth/status", { headers });
      if (!res.ok && res.status !== 401) {
        throw new Error('Auth check failed');
      }
      return res.json();
    },
  });

  const user = authData?.user || null;

  // Login function
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      
      if (!res.ok) {
        throw new Error("Login failed");
      }
      
      const data = await res.json();
      
      if (data.success && data.token) {
        setToken(data.token);
        toast({
          title: "Success",
          description: "Login successful",
        });
        refetchAuth();
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const headers: HeadersInit = { 
        "Content-Type": "application/json" 
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers
      });
      
      if (!res.ok) {
        throw new Error("Logout failed");
      }
      
      setToken(null);
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      refetchAuth();
    } catch (error) {
      toast({
        title: "Logout failed",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  };
  
  // Register function
  const register = async (userData: InsertUser) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully"
      });
      refetchAuth();
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Create the context value object with all required properties
  const value = {
    user,
    isLoading,
    error,
    token,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
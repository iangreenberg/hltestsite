import { useAuth } from "../hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

interface ProtectedRouteProps {
  path: string;
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
}

export function ProtectedRoute({
  path,
  component: Component,
  children
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  // Always render a Route component for the path
  return (
    <Route path={path}>
      {(params) => {
        // Show loading state while checking auth
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }

        // Redirect to auth page if not logged in
        if (!user) {
          return <Redirect to="/auth" />;
        }
        
        // Check admin permission for admin paths
        if (path.startsWith("/admin") && !user.isAdmin) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
              <p className="text-gray-600">You don't have permission to access this page.</p>
            </div>
          );
        }

        // Render the protected component or children
        return Component ? <Component {...params} /> : children;
      }}
    </Route>
  );
}
import { useAuth } from "@/hooks/use-auth";
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

  if (isLoading) {
    return (
      <Route path={path}>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </Route>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <Route path={path}>
        {() => <Redirect to="/admin/login" />}
      </Route>
    );
  }
  
  // For admin paths, check if user has admin role
  if (path.startsWith("/admin") && !user.isAdmin) {
    return (
      <Route path={path}>
        {() => (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        )}
      </Route>
    );
  }

  return (
    <Route path={path}>
      {(params) => (
        Component ? <Component {...params} /> : children
      )}
    </Route>
  );
}
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";

export default function AuthTest() {
  const { user, loginMutation, logoutMutation, isLoading } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [adminTestResult, setAdminTestResult] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoginStatus("Logging in...");
      await loginMutation.mutateAsync({ username, password });
      setLoginStatus("Login successful");
    } catch (error) {
      setLoginStatus(`Login failed: ${(error as Error).message}`);
    }
  };

  const handleLogout = async () => {
    try {
      setLoginStatus("Logging out...");
      await logoutMutation.mutateAsync();
      setLoginStatus("Logout successful");
    } catch (error) {
      setLoginStatus(`Logout failed: ${(error as Error).message}`);
    }
  };
  
  const testAdminAccess = async () => {
    try {
      setAdminTestResult("Testing admin access...");
      const response = await apiRequest("GET", "/api/admin-test");
      const data = await response.json();
      setAdminTestResult(`Success: ${JSON.stringify(data)}`);
    } catch (error) {
      setAdminTestResult(`Failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>Current authentication state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
            </div>
            <div>
              <strong>Authenticated:</strong> {user ? "Yes" : "No"}
            </div>
            {user && (
              <>
                <div>
                  <strong>Username:</strong> {user.username}
                </div>
                <div>
                  <strong>Is Admin:</strong> {user.isAdmin ? "Yes" : "No"}
                </div>
              </>
            )}
            {/* We don't use tokens anymore with Passport.js */}
            <div>
              <strong>Session Auth:</strong> {user ? "Active" : "None"}
            </div>
            {loginStatus && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <strong>Status:</strong> {loginStatus}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Controls</CardTitle>
            <CardDescription>Login and logout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={isLoading || !username || !password}
            >
              Login
            </Button>
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={handleLogout}
              disabled={isLoading || !user}
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Admin Role Test</CardTitle>
            <CardDescription>Test admin-only API endpoint</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Use this to test if your current login has admin privileges</p>
            {adminTestResult && (
              <div className="mt-4 p-2 bg-gray-100 rounded">
                <strong>Result:</strong> {adminTestResult}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={testAdminAccess}
              disabled={!user}
              className="w-full"
            >
              Test Admin Access
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
import { Link } from "wouter";
import { useAuth } from "../hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, HomeIcon, Database, User, BarChart4, Search } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function AdminNav() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2F5D50]">Hemp Launch Admin</h1>
          <p className="text-gray-500">
            {user ? `Logged in as ${user.username}` : 'Not logged in'}
          </p>
        </div>
        
        {user && (
          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-[#2F5D50]" />
              Admin Dashboard
            </CardTitle>
            <CardDescription>
              View waitlist entries and email subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/dashboard">
              <Button className="w-full bg-[#2F5D50] hover:bg-[#234840]">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <BarChart4 className="mr-2 h-5 w-5 text-[#2F5D50]" />
              SEO Dashboard
            </CardTitle>
            <CardDescription>
              Manage SEO settings and improvements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/seo-dashboard">
              <Button className="w-full bg-[#2F5D50] hover:bg-[#234840]">
                SEO Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-[#2F5D50]" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage admin and regular users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/users">
              <Button className="w-full bg-[#2F5D50] hover:bg-[#234840]">
                Manage Users
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center">
              <HomeIcon className="mr-2 h-5 w-5 text-[#2F5D50]" />
              Main Website
            </CardTitle>
            <CardDescription>
              Return to the main website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full" variant="outline">
                View Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="login">Admin Login</TabsTrigger>
          <TabsTrigger value="auth">Auth Page</TabsTrigger>
          <TabsTrigger value="other">Other Links</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Direct login to the admin area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/login">
                  <Button className="w-full">Regular Admin Login</Button>
                </Link>
                <Link href="/admin-quick-login.html">
                  <Button className="w-full" variant="outline">Quick Login (HTML)</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="auth" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Various auth-related pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/auth">
                  <Button className="w-full">Main Auth Page</Button>
                </Link>
                <Link href="/auth-test">
                  <Button className="w-full" variant="outline">Auth Test Page</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="other" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Tools</CardTitle>
              <CardDescription>
                Helper pages for development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin-nav.html">
                  <Button className="w-full">Admin Navigation</Button>
                </Link>
                <Link href="/api-auth-test.js">
                  <Button className="w-full" variant="outline">Run Auth API Tests</Button>
                </Link>
                <Link href="/admin/seo-test">
                  <Button className="w-full">Test SEO API Endpoints</Button>
                </Link>
                <Link href="/admin/seo-dashboard">
                  <Button className="w-full" variant="outline">SEO Dashboard (Simple)</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
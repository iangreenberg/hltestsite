import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, FileText } from "lucide-react";
import { Waitlist, EmailSubscription } from "@shared/schema";
import { Link } from "wouter";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  
  // Fetch dashboard data
  const {
    data: dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError
  } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: async () => {
      const res = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        credentials: 'include'
      });
      
      if (!res.ok) {
        throw new Error('Failed to load dashboard data');
      }
      
      const result = await res.json();
      return result.data;
    }
  });
  
  // Placeholder for data
  const waitlistEntries: Waitlist[] = [];
  const emailSubscriptions: EmailSubscription[] = [];
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const isLoading = dashboardLoading || logoutMutation.isPending;
  const hasError = dashboardError;
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome, {user?.username || 'Admin'}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link href="/admin/applications">
            <Button variant="secondary">
              <FileText className="mr-2 h-4 w-4" />
              Applications
            </Button>
          </Link>
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
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : hasError ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
            <CardDescription>
              There was an error loading the data. Please try again later.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : dashboardData ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#2F5D50]">{dashboardData.applications}</div>
                <p className="text-xs text-gray-500 mt-1">Total business applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Waitlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#2F5D50]">{dashboardData.waitlist}</div>
                <p className="text-xs text-gray-500 mt-1">Total waitlist sign-ups</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#2F5D50]">{dashboardData.emailSubscriptions}</div>
                <p className="text-xs text-gray-500 mt-1">Total email subscribers</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions taken on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dashboardData.recentActivity && dashboardData.recentActivity.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="capitalize">{activity.type}</TableCell>
                      <TableCell className="font-medium">{activity.name}</TableCell>
                      <TableCell>{new Date(activity.date).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-600">No Data Available</CardTitle>
            <CardDescription>
              There is no dashboard data to display at this time.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
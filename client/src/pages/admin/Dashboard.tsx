import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { Waitlist, EmailSubscription } from "@shared/schema";
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
  
  // Fetch waitlist entries
  const { 
    data: waitlistEntries = [], 
    isLoading: waitlistLoading,
    error: waitlistError
  } = useQuery<Waitlist[]>({
    queryKey: ["/api/waitlist"],
  });
  
  // Fetch email subscriptions
  const { 
    data: emailSubscriptions = [], 
    isLoading: emailLoading,
    error: emailError
  } = useQuery<EmailSubscription[]>({
    queryKey: ["/api/subscribe"],
  });
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const isLoading = waitlistLoading || emailLoading;
  const hasError = waitlistError || emailError;
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome, {user?.username || 'Admin'}
          </p>
        </div>
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
      ) : (
        <Tabs defaultValue="waitlist">
          <TabsList className="mb-6">
            <TabsTrigger value="waitlist">
              Waitlist Entries ({waitlistEntries.length})
            </TabsTrigger>
            <TabsTrigger value="emails">
              Email Subscriptions ({emailSubscriptions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="waitlist">
            <Card>
              <CardHeader>
                <CardTitle>Waitlist Entries</CardTitle>
                <CardDescription>
                  View all waitlist form submissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {waitlistEntries.length === 0 ? (
                  <p className="text-center py-6 text-gray-500">No waitlist entries yet.</p>
                ) : (
                  <Table>
                    <TableCaption>A list of all waitlist entries.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Business</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {waitlistEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">
                            {entry.firstName} {entry.lastName}
                          </TableCell>
                          <TableCell>{entry.business}</TableCell>
                          <TableCell>{entry.email}</TableCell>
                          <TableCell>{entry.phone}</TableCell>
                          <TableCell>{entry.message || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>Email Subscriptions</CardTitle>
                <CardDescription>
                  View all newsletter subscribers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emailSubscriptions.length === 0 ? (
                  <p className="text-center py-6 text-gray-500">No email subscriptions yet.</p>
                ) : (
                  <Table>
                    <TableCaption>A list of all email subscriptions.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date Subscribed</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emailSubscriptions.map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell>{subscription.id}</TableCell>
                          <TableCell className="font-medium">{subscription.email}</TableCell>
                          <TableCell>
                            {new Date().toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
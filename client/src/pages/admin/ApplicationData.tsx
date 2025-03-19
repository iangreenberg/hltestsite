import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Download, RefreshCw, Trash2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ApplicationData() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  // Function to load applications from localStorage
  const loadApplications = () => {
    setLoading(true);
    try {
      const storedApplications = localStorage.getItem('hemplaunch_applications');
      if (storedApplications) {
        const parsedApplications = JSON.parse(storedApplications);
        setApplications(parsedApplications);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to clear all applications
  const clearApplications = () => {
    if (window.confirm("Are you sure you want to delete all application data? This cannot be undone.")) {
      localStorage.removeItem('hemplaunch_applications');
      setApplications([]);
    }
  };

  // Function to download applications as JSON
  const downloadApplications = () => {
    try {
      const dataStr = JSON.stringify(applications, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `hemplaunch_applications_${new Date().toISOString()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Error downloading applications:", error);
      alert("Failed to download applications data.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Application Data | HempLaunch Admin</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2F5D50] mb-2">Application Data</h1>
          <p className="text-gray-600">View and manage application submissions</p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={loadApplications} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={downloadApplications} disabled={applications.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="destructive" onClick={clearApplications} disabled={applications.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {applications.length === 0 ? (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Applications Found</AlertTitle>
          <AlertDescription>
            There are no application submissions available. Application data is stored in the browser's 
            localStorage and will only show submissions made on this device and browser.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Showing {applications.length} application(s). Data is stored in the browser's localStorage.
          </p>

          {applications.map((app, index) => (
            <Card key={index} className="mb-6">
              <CardHeader>
                <CardTitle>Application #{index + 1}</CardTitle>
                <CardDescription>
                  Submitted: {new Date(app.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <ul className="space-y-1">
                      <li><span className="font-medium">Name:</span> {app.data.fullName}</li>
                      <li><span className="font-medium">Email:</span> {app.data.email}</li>
                      <li><span className="font-medium">Phone:</span> {app.data.phone}</li>
                      <li><span className="font-medium">Business:</span> {app.data.businessName || 'N/A'}</li>
                      <li><span className="font-medium">Location:</span> {app.data.cityState}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Business Details</h3>
                    <ul className="space-y-1">
                      <li><span className="font-medium">Situation:</span> {app.data.businessSituation === 'other' ? 
                        `Other: ${app.data.businessSituationOther || 'Not specified'}` : 
                        app.data.businessSituation === 'new' ? 'New hemp business' : 
                        'Existing hemp business'}</li>
                      <li><span className="font-medium">Package Interest:</span> {
                        app.data.packageInterest === 'starter' ? 'Ecom Starter' :
                        app.data.packageInterest === 'growth' ? 'Growth Package' :
                        app.data.packageInterest === 'accelerator' ? 'Accelerator Program' :
                        'Not sure, needs guidance'
                      }</li>
                      <li><span className="font-medium">Business Basics:</span> {
                        app.data.businessBasics === 'complete' ? 'Has LLC, EIN, and bank account' :
                        app.data.businessBasics === 'partial' ? 'Has some, needs help completing' :
                        'Needs assistance with all'
                      }</li>
                      <li><span className="font-medium">Timeframe:</span> {
                        app.data.timeframe === 'immediate' ? 'Immediately' :
                        app.data.timeframe === 'within30' ? 'Within 30 days' :
                        app.data.timeframe === 'within90' ? 'Within 90 days' :
                        app.data.timeframe === 'later' ? 'More than 90 days' : 'Unknown'
                      }</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm" disabled={true}>
                  Application was redirected to Calendly
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
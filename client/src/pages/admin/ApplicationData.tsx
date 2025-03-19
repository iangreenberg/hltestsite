import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, FileText, Download, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Helmet } from "react-helmet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";

// Define application file type
interface ApplicationFile {
  filename: string;
  path: string;
  timestamp: string;
}

// Define application data type
interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  cityState?: string;
  businessSituation: string;
  businessSituationOther?: string;
  packageInterest: string;
  businessBasics: string;
  timeframe: string;
  [key: string]: any; // For other potential fields
}

export default function ApplicationData() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<ApplicationData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Fetch applications from server API
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['/api/applications'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/applications');
      const data = await res.json();
      return data.data as ApplicationFile[];
    },
  });

  // Function to view application details
  const viewApplication = async (filename: string) => {
    setSelectedFile(filename);
    setViewDialogOpen(true);
    
    try {
      const res = await apiRequest('GET', `/api/applications/${filename}`);
      const data = await res.json();
      if (data.success) {
        setFileContent(JSON.parse(data.data));
      } else {
        console.error("Error fetching application:", data.message);
        setFileContent(null);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      setFileContent(null);
    }
  };

  // Function to download applications as JSON
  const downloadApplications = () => {
    if (!data) return;
    
    try {
      const dataStr = JSON.stringify(data, null, 2);
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
          <Button variant="outline" onClick={() => refetch()} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            Refresh
          </Button>
          <Button variant="outline" onClick={downloadApplications} disabled={!data || data.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#2F5D50]" />
        </div>
      ) : isError ? (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Applications</AlertTitle>
          <AlertDescription>
            There was an error loading application data. Please ensure you're logged in as an admin.
          </AlertDescription>
        </Alert>
      ) : !data || data.length === 0 ? (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Applications Found</AlertTitle>
          <AlertDescription>
            There are no application submissions available. Applications are stored on the server.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Showing {data.length} application(s). Data is stored on the server.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((app, index) => (
              <Card key={index} className="mb-2">
                <CardHeader>
                  <CardTitle className="text-lg">Application #{index + 1}</CardTitle>
                  <CardDescription className="text-sm">
                    Timestamp: {new Date(parseInt(app.timestamp)).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1 text-sm">
                    <li><span className="font-medium">File:</span> {app.filename}</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="secondary" size="sm" onClick={() => viewApplication(app.filename)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Application Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          
          {selectedFile && !fileContent ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#2F5D50]" />
            </div>
          ) : fileContent ? (
            <div className="overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Full Name</label>
                      <p className="font-medium">{fileContent.fullName}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Email</label>
                      <p className="font-medium">{fileContent.email}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Phone</label>
                      <p className="font-medium">{fileContent.phone}</p>
                    </div>
                    {fileContent.businessName && (
                      <div>
                        <label className="text-xs text-gray-500">Business Name</label>
                        <p className="font-medium">{fileContent.businessName}</p>
                      </div>
                    )}
                    {fileContent.cityState && (
                      <div>
                        <label className="text-xs text-gray-500">Location</label>
                        <p className="font-medium">{fileContent.cityState}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Business Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Business Situation</label>
                      <p className="font-medium">
                        {fileContent.businessSituation === 'new' ? 'New hemp business' : 
                         fileContent.businessSituation === 'existing' ? 'Existing hemp business' :
                         fileContent.businessSituation === 'other' ? `Other: ${fileContent.businessSituationOther || 'Not specified'}` :
                         fileContent.businessSituation || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Package Interest</label>
                      <p className="font-medium">
                        {fileContent.packageInterest === 'starter' ? 'Ecom Starter' :
                         fileContent.packageInterest === 'growth' ? 'Growth Package' :
                         fileContent.packageInterest === 'accelerator' ? 'Accelerator Program' :
                         fileContent.packageInterest === 'unsure' ? 'Not sure, needs guidance' :
                         fileContent.packageInterest || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Business Basics</label>
                      <p className="font-medium">
                        {fileContent.businessBasics === 'complete' ? 'Has LLC, EIN, and bank account' :
                         fileContent.businessBasics === 'partial' ? 'Has some, needs help completing' :
                         fileContent.businessBasics === 'none' ? 'Needs assistance with all' :
                         fileContent.businessBasics || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Timeframe</label>
                      <p className="font-medium">
                        {fileContent.timeframe === 'immediate' ? 'Immediately' :
                         fileContent.timeframe === 'within30' ? 'Within 30 days' :
                         fileContent.timeframe === 'within90' ? 'Within 90 days' :
                         fileContent.timeframe === 'later' ? 'More than 90 days' :
                         fileContent.timeframe || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Display any additional fields */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-lg">Additional Information</h3>
                <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
                  {JSON.stringify(fileContent, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load application details. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
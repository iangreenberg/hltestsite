import TestForm from "@/components/common/TestForm";
import { Toaster } from "@/components/ui/toaster";

export default function TestFormPage() {
  return (
    <div className="container py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Test Application Form</h1>
      <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
        This is a simplified test form that bypasses authentication and Notion integration. 
        Use this to test the basic form submission functionality.
      </p>
      
      <div className="max-w-md mx-auto">
        <TestForm />
      </div>
      
      <Toaster />
    </div>
  );
}
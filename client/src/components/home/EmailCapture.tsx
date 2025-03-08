import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    // In a real implementation, this would send the email to your server
    console.log('Email submitted:', email);
    
    toast({
      title: "Success!",
      description: "Your guide has been sent to your email.",
    });
    
    setEmail('');
  };

  return (
    <div className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 flex-1">
            <h3 className="text-[#2F5D50] font-semibold text-lg">
              Download Our Free Guide: "5 Steps to Launching Your Hemp-Derived THC Brand"
            </h3>
          </div>
          <form className="flex w-full md:w-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#2F5D50] flex-1 min-w-0"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold px-4 py-2 rounded-r-md whitespace-nowrap"
            >
              Get Guide
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

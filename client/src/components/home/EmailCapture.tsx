import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest('POST', '/api/subscribe', { email });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your guide has been sent to your email.",
      });
      setEmail('');
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message === "Email already subscribed" 
          ? "You're already subscribed! The guide will be in your inbox shortly." 
          : "Something went wrong. Please try again.",
        variant: error.message === "Email already subscribed" ? "default" : "destructive",
      });
      setIsLoading(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    mutate(email);
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
              disabled={isLoading}
              className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold px-4 py-2 rounded-r-md whitespace-nowrap disabled:opacity-70"
            >
              {isLoading ? 'Sending...' : 'Get Guide'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

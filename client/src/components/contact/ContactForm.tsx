import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  business: string;
  message: string;
  consent: boolean;
}

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    business: '',
    message: '',
    consent: false
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest('POST', '/api/waitlist', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your information has been submitted. We'll contact you shortly.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        business: '',
        message: '',
        consent: false
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2F5D50] focus:border-[#2F5D50]"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2F5D50] focus:border-[#2F5D50]"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2F5D50] focus:border-[#2F5D50]"
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2F5D50] focus:border-[#2F5D50]"
          required
        />
      </div>
      
      <div>
        <label htmlFor="business" className="block text-gray-700 font-medium mb-2">Business Stage</label>
        <select
          id="business"
          name="business"
          value={formData.business}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2F5D50] focus:border-[#2F5D50]"
          required
        >
          <option value="" disabled>Select your current stage</option>
          <option value="idea">Just an idea</option>
          <option value="planning">Planning phase</option>
          <option value="started">Recently started</option>
          <option value="established">Established business</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Additional Information</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2F5D50] focus:border-[#2F5D50]"
          placeholder="Tell us more about your business goals..."
        ></textarea>
      </div>
      
      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleCheckboxChange}
          className="mt-1 h-4 w-4 text-[#2F5D50] focus:ring-[#2F5D50] border-gray-300 rounded"
          required
        />
        <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
          I agree to receive communications about my hemp-derived THC business launch. See our 
          <a href="#" className="text-[#2F5D50] hover:text-[#C8A951]"> Privacy Policy</a>.
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-3 px-4 rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-70"
      >
        {isPending ? 'Submitting...' : 'Submit & Join Waitlist'}
      </button>
    </form>
  );
}

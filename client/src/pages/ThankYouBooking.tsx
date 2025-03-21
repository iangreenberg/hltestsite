import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Add Facebook Pixel to window interface
declare global {
  interface Window {
    fbq?: (eventType: string, eventName: string, params?: any) => void;
  }
}

export default function ThankYouBooking() {
  // Scroll to top on page load and set up event tracking
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add event listener for contact button clicks
    const handleContactClick = () => {
      if (window.fbq) {
        window.fbq('track', 'Contact', {
          content_name: 'Post-Booking Contact',
          status: 'inquiry'
        });
      }
    };
    
    // Get the contact button
    const contactButton = document.querySelector('a[href="/contact"]');
    if (contactButton) {
      contactButton.addEventListener('click', handleContactClick);
    }
    
    // Cleanup function
    return () => {
      if (contactButton) {
        contactButton.removeEventListener('click', handleContactClick);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Thank You for Booking Your Consultation | HempLaunch</title>
        <meta
          name="description"
          content="Thank you for scheduling your consultation with HempLaunch. We look forward to helping you launch your hemp business."
        />
        {/* Meta Pixel Code */}
        <script type="text/javascript">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '628995636411694');
            fbq('track', 'PageView');
            fbq('track', 'CompleteRegistration', {
              content_name: 'Booking Confirmation',
              status: 'confirmed'
            });
          `}
        </script>
        <noscript>
          {`
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=628995636411694&ev=PageView&noscript=1"
            />
          `}
        </noscript>
        {/* End Meta Pixel Code */}
      </Helmet>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#f0f9f6] to-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#2F5D50] flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2F5D50]">
              Your Consultation is Confirmed!
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Thank you for taking the first step toward launching your hemp business. We're excited to speak with you and discuss how we can help you achieve your business goals.
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-[#2F5D50]">What's Next?</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-4">
                    <span className="font-bold text-[#2F5D50]">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2F5D50] text-lg">Check Your Email</h3>
                    <p className="text-gray-600">You'll receive a confirmation email with the details of your appointment and a calendar invitation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-4">
                    <span className="font-bold text-[#2F5D50]">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2F5D50] text-lg">Prepare for Your Call</h3>
                    <p className="text-gray-600">Think about your business goals, budget, and timeline so we can make the most of our conversation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-4">
                    <span className="font-bold text-[#2F5D50]">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2F5D50] text-lg">Join Your Meeting</h3>
                    <p className="text-gray-600">Click the link in your calendar invitation at the scheduled time to join the video call.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#2F5D50]">While You Wait</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Explore these resources to learn more about the hemp industry and how HempLaunch can help you succeed.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">Industry Insights</h3>
                <p className="text-gray-600 mb-4">
                  Get the latest insights and trends in the hemp industry to better understand the market opportunity.
                </p>
                <Link href="/blog" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Read our blog
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">FAQs</h3>
                <p className="text-gray-600 mb-4">
                  Browse our frequently asked questions to learn more about starting and running a hemp business.
                </p>
                <Link href="/how-it-works" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Explore FAQs
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">Service Details</h3>
                <p className="text-gray-600 mb-4">
                  Learn more about our comprehensive services and how we can help you launch your hemp business.
                </p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  View services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-[#2F5D50] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Have Questions Before Your Call?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              If you have any questions or need to reschedule, please don't hesitate to contact us.
            </p>
            <Link href="/contact" className="inline-block bg-white text-[#2F5D50] font-bold py-3 px-8 rounded-md shadow-md hover:bg-[#f0f9f6] transition-colors">
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
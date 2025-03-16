import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Helmet } from "react-helmet";
import TimelineQualifier from "@/components/common/TimelineQualifier";
import { Link } from "wouter";
import { ArrowRight, Check, X, AlertTriangle, Shield, Clock, TrendingUp, Building } from "lucide-react";

export default function LandingPage() {
  const [showQualifier, setShowQualifier] = useState(false);

  return (
    <>
      <Helmet>
        <title>Launch Your Hemp THC Business in 30 Days for Under $3,000 | HempLaunch</title>
        <meta 
          name="description" 
          content="Our turnkey system handles everything - legal formation, compliance, branding, manufacturing, and e-commerce. Start your hemp business in 30 days for under $3,000."
        />
      </Helmet>
      
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#2F5D50] to-[#1A3C33] text-white py-16 md:py-24">
          <div className="absolute inset-0 opacity-20 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Launch Your Hemp-Derived THC Business in 30 Days for Under $3,000
              </h1>
              <p className="text-lg md:text-xl text-[#C8A951] font-semibold mb-6">
                Unlock a Turnkey System That Handles Everything – Legal Formation, Compliance, Branding, Manufacturing, and E-Commerce
              </p>
              <p className="text-lg mb-8 text-gray-200">
                So You Can Focus on Growing Your Brand and Achieving Financial Freedom
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                <Button 
                  onClick={() => setShowQualifier(true)}
                  className="w-full md:w-auto bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 text-lg border-2 border-[#C8A951]"
                >
                  Apply For Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="/how-it-works">
                  <Button variant="outline" className="w-full md:w-auto border-white text-white hover:bg-white hover:text-[#2F5D50] font-medium py-3 text-lg">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Problem Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2F5D50] mb-4">
                  Why Traditional Solutions Fail
                </h2>
                <p className="text-gray-600">
                  Many aspiring entrepreneurs face the same overwhelming obstacles when trying to break into the hemp industry
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Regulatory Overload</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Navigating the maze of federal and state regulations can be a nightmare. Most DIY attempts or piecemeal solutions fail because they overlook critical compliance details.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Fragmented Service Providers</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Hiring separate vendors for legal, branding, website, and manufacturing creates communication gaps and inconsistent quality. This patchwork approach increases costs and frustration.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Uncertain Time-to-Market</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Traditional methods often result in unpredictable launch timelines. In a rapidly growing market, every delay means losing market share to competitors who act faster.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">High Upfront Investment</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Initial costs can range from $10,000 to $50,000 or more. For first-time business owners, such a large financial burden often prevents them from ever getting started.
                  </p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <div className="inline-block bg-amber-100 text-amber-800 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <p className="font-medium">These challenges create a perfect storm of complexity and risk, leaving many hopeful entrepreneurs paralyzed and unable to take advantage of a booming market opportunity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solution Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">THE SOLUTION</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  The HempLaunch Turnkey System
                </h2>
                <p className="text-lg text-gray-600 mt-4">
                  What if you could bypass all of these obstacles and launch a fully compliant, high-quality hemp-derived THC business in just 30 days—and for less than $3,000?
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-2 rounded-full mr-4">
                      <Shield className="h-5 w-5 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2F5D50]">Integrated, End-to-End Service</h3>
                      <p className="text-gray-600 mt-2">
                        An all-in-one system covering legal formation, regulatory compliance, branding, e-commerce, and manufacturing partnerships.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-2 rounded-full mr-4">
                      <Check className="h-5 w-5 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2F5D50]">Hemp Compliance Framework</h3>
                      <p className="text-gray-600 mt-2">
                        Our proprietary system guarantees 100% compliance with federal and state regulations, including proper licenses and lab-tested COAs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-2 rounded-full mr-4">
                      <Clock className="h-5 w-5 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2F5D50]">Speed to Market</h3>
                      <p className="text-gray-600 mt-2">
                        Our streamlined process gets your business up and running in as little as 30 days, allowing you to start generating revenue quickly.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-2 rounded-full mr-4">
                      <TrendingUp className="h-5 w-5 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#2F5D50]">Cost-Effective & Scalable</h3>
                      <p className="text-gray-600 mt-2">
                        Launch for under $3,000 without sacrificing quality or compliance. Scalable packages support your business as it grows.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">YOUR ROADMAP</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  The HempLaunch Journey
                </h2>
                <p className="text-lg text-gray-600 mt-4">
                  Let's walk through the step-by-step process that transforms your vision into a thriving hemp business
                </p>
              </div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-2">1</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2F5D50] mb-4">Consultation & Qualification</h3>
                    <p className="text-gray-600 mb-4">
                      Your journey begins with a simple, no-obligation consultation. We assess your business background, investment readiness, and overall vision to ensure HempLaunch is the right fit for your ambitions.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-2">2</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2F5D50] mb-4">Legal & Compliance Setup</h3>
                    <p className="text-gray-600 mb-4">
                      We handle LLC formation, secure your EIN & Sales Tax ID, and implement our proprietary Hemp Compliance Framework to ensure your business meets all regulatory requirements.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-2">3</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2F5D50] mb-4">Digital Presence & Branding</h3>
                    <p className="text-gray-600 mb-4">
                      We build a professional e-commerce website with your unique brand identity, including logo design, optimized for conversions and mobile responsiveness.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-2">4</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2F5D50] mb-4">Product Integration & Fulfillment</h3>
                    <p className="text-gray-600 mb-4">
                      We connect you with trusted manufacturing partners for white-labeled products and establish reliable fulfillment channels for efficient order processing.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold mb-2">5</div>
                  </div>
                  <div className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-[#2F5D50] mb-4">Marketing & Launch Support</h3>
                    <p className="text-gray-600 mb-4">
                      We provide a tailored marketing strategy and ongoing support to ensure your business not only launches successfully but continues to grow and adapt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">SUCCESS STORIES</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  What Our Clients Say
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-[#C8A951]">
                  <p className="italic text-gray-600 mb-4">
                    "Working with HempLaunch was a game-changer. They took care of every detail—from legal setup to branding—so I could focus on my vision. In just 30 days, I launched a fully compliant hemp business that's already gaining traction."
                  </p>
                  <div className="font-semibold text-[#2F5D50]">Sarah T.</div>
                  <div className="text-sm text-gray-500">CBD Wellness Co.</div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-[#C8A951]">
                  <p className="italic text-gray-600 mb-4">
                    "As a first-time entrepreneur, I needed a partner who could guide me through the maze of regulations and market challenges. HempLaunch exceeded my expectations—launching my brand in just one month and at a fraction of the cost I anticipated."
                  </p>
                  <div className="font-semibold text-[#2F5D50]">Jessica B.</div>
                  <div className="text-sm text-gray-500">Elevate Extracts</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-[#2F5D50] to-[#1A3C33] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Your Invitation to Success</h2>
              <p className="text-lg mb-8">
                Now is the time to take control of your future and tap into one of the fastest-growing markets in America. Every day you wait is another day your competitors gain ground.
              </p>
              
              <div className="bg-white text-[#2F5D50] p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Start Your Hemp Business Journey Today</h3>
                <p className="mb-6">Complete your application now and secure your free consultation</p>
                
                {showQualifier ? (
                  <div className="max-w-md mx-auto">
                    <TimelineQualifier
                      buttonText="Apply Now"
                      buttonClassName="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 text-lg"
                    />
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowQualifier(true)}
                    className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 px-8 text-lg"
                  >
                    Complete Your Application Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                
                <p className="text-gray-500 text-sm mt-4">
                  No obligation. Limited spots available for serious entrepreneurs only.
                </p>
              </div>
              
              <p className="mt-8 text-sm text-gray-300">
                To your success,<br />
                The HempLaunch Team
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
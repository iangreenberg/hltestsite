import { Link } from "wouter";
import { Check } from "lucide-react";

export default function FeaturedSection() {
  const features = [
    {
      title: "Expert Team with Proven Results",
      description: "Our specialists have launched multiple successful hemp brands from scratch."
    },
    {
      title: "Compliance & Quality First",
      description: "All our services ensure legal compliance and top product quality standards."
    },
    {
      title: "All-in-One Solution",
      description: "We handle everything from legal formation to product fulfillment—no need to juggle multiple vendors."
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#C8A951] font-semibold">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 mb-6 text-[#2F5D50]">
              Fast-Track Your Hemp Business Launch
            </h2>
            <p className="text-gray-700 mb-6">
              Our turnkey solution eliminates the complexity and guesswork from launching your hemp business. We've helped entrepreneurs like you successfully enter the market with professionally established brands.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-[#C8A951] mt-1">
                    <Check className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold font-montserrat text-[#2F5D50]">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/contact" className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-3 px-8 rounded-md shadow inline-flex items-center hover:shadow-lg transition-all">
              Schedule Your Free Consultation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Hemp industry professionals in meeting" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

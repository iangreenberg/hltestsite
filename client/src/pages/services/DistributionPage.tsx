import { Helmet } from "react-helmet";
import { 
  TruckIcon, 
  BarChart4, 
  Store, 
  ShoppingCart, 
  TrendingUp, 
  Globe 
} from "lucide-react";
import { Link } from "wouter";

export default function DistributionPage() {
  const distributionServices = [
    {
      title: "Retail Distribution",
      description: "Gain access to our network of over 500 brick-and-mortar retailers across the United States. We handle all retail relationships, store placement, and merchandising needs.",
      icon: <Store className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "E-commerce Solutions",
      description: "Launch your products online through our established e-commerce channels including specialized hemp marketplaces and major platforms like Amazon and Shopify.",
      icon: <ShoppingCart className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Logistics Management",
      description: "Our team handles all aspects of fulfillment, shipping, and inventory management to ensure products arrive safely and on time to your customers.",
      icon: <TruckIcon className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Sales Strategy",
      description: "Develop comprehensive sales plans including channel selection, pricing strategy, sales collateral, and revenue forecasting.",
      icon: <BarChart4 className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Growth Planning",
      description: "Create scalable distribution frameworks that grow with your business, from initial launch to national expansion.",
      icon: <TrendingUp className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "International Expansion",
      description: "Tap into global markets with our international distribution partners and expertise navigating cross-border hemp regulations.",
      icon: <Globe className="h-8 w-8 text-[#2F5D50]" />
    }
  ];

  const keyBenefits = [
    "Immediate access to established retail and online sales channels",
    "Experienced account managers working directly with retail buyers",
    "Turnkey logistics and fulfillment infrastructure",
    "Transparent inventory management and sales reporting",
    "Professionally designed sales collateral and product presentations",
    "Ongoing pricing and competitive market analysis"
  ];

  return (
    <>
      <Helmet>
        <title>Sales & Distribution Services | HempLaunch</title>
        <meta 
          name="description" 
          content="Get your hemp products to market quickly with our comprehensive distribution network of retailers and e-commerce channels."
        />
      </Helmet>

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <span className="text-[#C8A951] font-semibold">SALES & DISTRIBUTION</span>
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
              Get Your Products To Market, Fast
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Our established distribution network gives you immediate access to retailers, e-commerce channels, and direct-to-consumer sales platforms.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
              Our Distribution Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {distributionServices.map((service, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2F5D50] mb-3">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-6 text-center">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 bg-[#2F5D50] rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] text-white p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Your Products to Market?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our distribution team is ready to help you launch your hemp products in retail stores and online marketplaces.
            </p>
            <button 
              onClick={() => window.open('https://form.jotform.com/250775888697180', '_blank')}
              className="bg-white text-[#2F5D50] font-semibold py-3 px-8 rounded-md shadow inline-block hover:bg-gray-100 transition-colors"
            >
              Schedule Free Consultation
            </button>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/services/compliance" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              ← Compliance Services
            </Link>
            <Link href="/services" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              All Services
            </Link>
            <Link href="/services/marketing" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              Marketing Strategy →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
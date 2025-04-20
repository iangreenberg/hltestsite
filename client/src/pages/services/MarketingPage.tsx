import { Helmet } from "react-helmet";
import { 
  PieChart, 
  BarChart, 
  LayoutGrid, 
  MessageSquare, 
  Mail, 
  Search 
} from "lucide-react";
import { Link } from "wouter";

export default function MarketingPage() {
  const marketingServices = [
    {
      title: "Digital Advertising",
      description: "Strategic ad campaigns across Google, Facebook, Instagram and other platforms. We navigate the complexities of hemp advertising to maximize ROI.",
      icon: <BarChart className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Content Marketing",
      description: "Develop educational blog posts, videos, and social media content that establishes your brand as an industry authority while driving organic traffic.",
      icon: <LayoutGrid className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Social Media Management",
      description: "Full-service social media strategy, content creation, community management, and growth tactics tailored to the hemp industry.",
      icon: <MessageSquare className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Email Marketing",
      description: "Build and nurture your customer database with targeted email campaigns that drive retention, repeat purchases, and referrals.",
      icon: <Mail className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "SEO Optimization",
      description: "Improve your visibility in search engines with our specialized hemp industry SEO services, targeting relevant keywords and building authority.",
      icon: <Search className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive data tracking and analysis to measure marketing effectiveness and continuously optimize your campaigns.",
      icon: <PieChart className="h-8 w-8 text-[#2F5D50]" />
    }
  ];

  const marketingProcess = [
    {
      step: 1,
      title: "Research & Strategy",
      description: "We analyze your target audience, competition, and market position to create a customized marketing plan."
    },
    {
      step: 2,
      title: "Campaign Development",
      description: "Our creative team develops compelling messaging, visuals, and content tailored to your brand."
    },
    {
      step: 3,
      title: "Implementation",
      description: "We execute campaigns across multiple channels, navigating hemp-specific advertising restrictions."
    },
    {
      step: 4,
      title: "Optimization",
      description: "Continuous testing and refinement ensures maximum performance and ROI from your marketing budget."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Marketing Strategy Services | HempLaunch</title>
        <meta 
          name="description" 
          content="Grow your hemp business with our specialized marketing services, including digital advertising, content creation, and SEO optimization."
        />
      </Helmet>

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <span className="text-[#C8A951] font-semibold">MARKETING STRATEGY</span>
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
              Grow Your Hemp Brand
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Our specialized marketing services navigate the unique challenges of hemp advertising to build brand awareness and drive sales.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
              Our Marketing Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {marketingServices.map((service, index) => (
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

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
              Our Marketing Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {marketingProcess.map((process) => (
                <div key={process.step} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-[#2F5D50] mb-3">{process.title}</h3>
                  <p className="text-gray-700">{process.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Compliance */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-[#2F5D50] mb-4">
              Hemp-Specific Marketing Expertise
            </h2>
            <p className="text-gray-700 mb-6">
              Marketing hemp products comes with unique challenges and restrictions. Our team specializes in:</p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-[#2F5D50] rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Navigating platform-specific hemp advertising policies</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-[#2F5D50] rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Creating compliant marketing copy and visuals</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-[#2F5D50] rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Alternative marketing channels when traditional methods are restricted</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-[#2F5D50] rounded-full flex items-center justify-center mt-0.5 mr-3">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Educational content strategies that build trust and drive sales</p>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] text-white p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ready to Grow Your Hemp Business?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Our marketing team is ready to help you develop a customized strategy that drives awareness and sales.
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
            <Link href="/services/distribution" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              ← Sales & Distribution
            </Link>
            <Link href="/services" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              All Services
            </Link>
            <Link href="/services/support" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              Ongoing Support →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
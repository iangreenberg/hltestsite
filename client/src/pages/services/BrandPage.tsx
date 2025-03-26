import { Link } from "wouter";
import { Palette, Lightbulb, CheckCircle, PenTool, Smartphone, ShoppingBag, Globe } from "lucide-react";
import CalendlyButton from "@/components/common/CalendlyButton";

export default function BrandPage() {
  // Branding services
  const brandingServices = [
    {
      title: "Brand Strategy",
      description: "Develop a clear brand strategy that defines your unique position in the hemp market, target audience, and core messaging.",
      icon: <Lightbulb className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Logo & Identity",
      description: "Create a professional visual identity with a distinctive logo, color palette, typography, and brand guidelines.",
      icon: <PenTool className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Packaging Design",
      description: "Design eye-catching, compliant packaging that communicates your brand story and stands out on shelves.",
      icon: <ShoppingBag className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Website Development",
      description: "Build a conversion-focused website that presents your brand professionally and drives sales.",
      icon: <Globe className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Digital Marketing Assets",
      description: "Create cohesive marketing materials for social media, email, and advertising campaigns.",
      icon: <Smartphone className="h-10 w-10 text-[#2F5D50]" />
    }
  ];

  // Brand identity elements
  const brandElements = [
    {
      name: "Logo Design",
      description: "Professional logo design with multiple concepts, revisions, and final files in all necessary formats."
    },
    {
      name: "Color Palette",
      description: "Strategic color selection to express your brand personality and stand out in the hemp market."
    },
    {
      name: "Typography",
      description: "Font selection and typographic hierarchy to ensure consistent brand communication."
    },
    {
      name: "Brand Guidelines",
      description: "Comprehensive brand style guide documenting proper usage of all visual elements."
    },
    {
      name: "Brand Messaging",
      description: "Consistent voice, tone, and messaging strategy aligned with your brand values."
    },
    {
      name: "Brand Positioning",
      description: "Defining your unique market position and competitive advantage in the hemp industry."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hemp Brand Development
              </h1>
              <p className="text-xl mb-8">
                Stand out in the competitive hemp market with a distinctive brand identity that resonates with your target audience and builds customer trust.
              </p>
              <CalendlyButton
                text="Discuss Your Brand Vision"
                size="lg"
                className="bg-[#C8A951] hover:bg-[#D9BA62] text-white"
              />
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-full shadow-xl">
                <Palette className="h-32 w-32 text-[#2F5D50]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl py-16 px-4">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-6 text-center">
            Why Brand Development Matters in Hemp
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-12">
            In the rapidly growing hemp industry, a strong brand is essential for differentiation, customer loyalty, and premium pricing. We create brands that convey quality, professionalism, and compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#2F5D50] rounded-full flex items-center justify-center">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Differentiation</h3>
              <p className="text-gray-700">
                Stand out in a crowded marketplace with a distinctive brand identity that communicates your unique value proposition.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#2F5D50] rounded-full flex items-center justify-center">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Premium Pricing</h3>
              <p className="text-gray-700">
                A professional brand allows you to command higher prices and maintain better margins in a competitive market.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#2F5D50] rounded-full flex items-center justify-center">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Trust & Credibility</h3>
              <p className="text-gray-700">
                Establish trust with customers, retailers, and partners through a consistent, professional brand presence.
              </p>
            </div>
          </div>
        </div>

        {/* Branding Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
            Our Branding Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandingServices.map((service, index) => (
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

        {/* Brand Elements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
            Essential Brand Identity Elements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandElements.map((element, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#2F5D50] mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  {element.name}
                </h3>
                <p className="text-gray-700 pl-7">{element.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Web Design Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
            Hemp Website Development
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Custom Website Design</h3>
                <p className="text-gray-700 mb-6">
                  We create custom-designed websites that capture your brand identity and drive conversions. Our hemp industry websites include:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Age verification gates for compliance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mobile-responsive design for all devices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>E-commerce functionality with secure checkout</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SEO-optimized structure and content</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Email capture and lead generation systems</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Compliance-verified product descriptions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Digital Marketing Assets</h3>
                <p className="text-gray-700 mb-6">
                  Beyond your website, we create all the digital assets you need to market your hemp brand effectively:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Social media profile design and graphics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Email newsletter templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Digital ad creatives for multiple platforms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Product photography guidance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Video content templates and storyboards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Sales presentation and pitch materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-4">
            Ready to Build Your Hemp Brand?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Our brand development team will help you create a distinctive, professional identity that resonates with your target audience and drives business growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalendlyButton
              text="Schedule a Brand Consultation"
              size="lg"
              className="bg-[#2F5D50] hover:bg-[#264A40] text-white"
            />
            <Link href="/packages" className="inline-flex items-center justify-center px-6 py-3 border border-[#2F5D50] text-[#2F5D50] font-medium rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F5D50]">
              View Our Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Link } from "wouter";
import { Shield, Palette, Package, PieChart, Users, HeadphonesIcon } from "lucide-react";

export default function ServiceOverview() {
  const services = [
    {
      title: "Complete Compliance",
      description: "We ensure your business meets all legal requirements with proper entity formation, licensing, and ongoing compliance monitoring.",
      icon: <Shield className="h-8 w-8 text-white" />,
      link: "/services#compliance-section",
      sectionId: "compliance-section"
    },
    {
      title: "Brand Development",
      description: "Create a compelling brand identity with professional logo design, packaging, website development, and marketing materials.",
      icon: <Palette className="h-8 w-8 text-white" />,
      link: "/services#brand-section",
      sectionId: "brand-section"
    },
    {
      title: "Product Development",
      description: "From formulation to manufacturing and packaging, we create premium hemp products that stand out in the market.",
      icon: <Package className="h-8 w-8 text-white" />,
      link: "/services#product-section",
      sectionId: "product-section"
    },
    {
      title: "Sales & Distribution",
      description: "Gain access to our established network of retailers and distributors to get your products on shelves quickly and efficiently.",
      icon: <Users className="h-8 w-8 text-white" />,
      link: "/services#distribution-section",
      sectionId: "distribution-section"
    },
    {
      title: "Marketing Strategy",
      description: "Develop comprehensive marketing plans including digital advertising, social media management, and content creation.",
      icon: <PieChart className="h-8 w-8 text-white" />,
      link: "/services#marketing-section",
      sectionId: "marketing-section"
    },
    {
      title: "Ongoing Support",
      description: "Receive continuous business support including inventory management, regulatory compliance updates, and operational guidance.",
      icon: <HeadphonesIcon className="h-8 w-8 text-white" />,
      link: "/services#support-section",
      sectionId: "support-section"
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C8A951] font-semibold">OUR SERVICES</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
            All-in-One Solution for Hemp Entrepreneurs
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            We handle everything you need to launch and grow your hemp business — from legal formation to marketing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-100 rounded-lg p-6 transition-all hover:shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#2F5D50] rounded-full flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-montserrat mb-2 text-[#2F5D50]">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href={service.link} className="text-[#C8A951] font-semibold hover:underline inline-flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/contact" className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
}

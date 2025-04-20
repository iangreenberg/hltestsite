import { Helmet } from "react-helmet";
import { 
  HeadphonesIcon, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  Scale 
} from "lucide-react";
import { Link } from "wouter";

export default function SupportPage() {
  const supportServices = [
    {
      title: "Inventory Management",
      description: "Optimize your inventory levels, track products efficiently, and implement systems to prevent stockouts or overstock situations.",
      icon: <Briefcase className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Compliance Monitoring",
      description: "Stay up-to-date with changing hemp regulations at federal and state levels, with quarterly compliance reviews and updates.",
      icon: <Scale className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Financial Reporting",
      description: "Receive detailed monthly reports on sales, expenses, profit margins, and key financial metrics for your hemp business.",
      icon: <BarChart3 className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Documentation Support",
      description: "We help maintain all necessary business records, lab testing documentation, certificates of analysis, and other required paperwork.",
      icon: <FileText className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Education & Training",
      description: "Access to our hemp business training library, with resources for training your staff on compliance, sales, and product knowledge.",
      icon: <BookOpen className="h-8 w-8 text-[#2F5D50]" />
    },
    {
      title: "Dedicated Support",
      description: "Your assigned business advisor provides ongoing personalized guidance with regular check-ins and immediate assistance when needed.",
      icon: <HeadphonesIcon className="h-8 w-8 text-[#2F5D50]" />
    }
  ];

  const supportPlans = [
    {
      name: "Standard Support",
      features: [
        "Monthly business advisor check-ins",
        "Quarterly compliance updates",
        "Basic inventory management tools",
        "Email support with 48-hour response time",
        "Access to knowledge base resources"
      ]
    },
    {
      name: "Premium Support",
      features: [
        "Weekly business advisor check-ins",
        "Monthly compliance reviews and updates",
        "Advanced inventory & financial management",
        "Priority email/phone support with 24-hour response time",
        "Full access to training library and resources",
        "Quarterly business strategy sessions"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ongoing Support Services | HempLaunch</title>
        <meta 
          name="description" 
          content="Receive continuous business support including inventory management, regulatory compliance updates, and operational guidance for your hemp business."
        />
      </Helmet>

      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <span className="text-[#C8A951] font-semibold">ONGOING SUPPORT</span>
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
              We're With You Every Step of the Way
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              Our commitment to your success extends beyond launch with comprehensive support services designed for long-term business growth.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
              Our Support Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {supportServices.map((service, index) => (
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

          {/* Support Plans */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
              Support Plans
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {supportPlans.map((plan, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-[#2F5D50] mb-6 text-center">{plan.name}</h3>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 bg-[#2F5D50] rounded-full flex items-center justify-center mt-0.5 mr-3">
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-[#2F5D50] mb-8 text-center">What Our Clients Say</h2>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-6">
                "The ongoing support from HempLaunch has been invaluable to our business. Their team helps us navigate regulatory changes, optimize our operations, and continue to grow month after month. Having dedicated experts just a call away has made all the difference."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold">JM</div>
                <div className="ml-4">
                  <p className="font-bold text-[#2F5D50]">James Miller</p>
                  <p className="text-gray-600 text-sm">CEO, GreenLeaf Wellness</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] text-white p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ready for Expert Support?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Let our team of hemp business experts help you navigate the challenges and grow your business with confidence.
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
            <Link href="/services/marketing" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              ← Marketing Strategy
            </Link>
            <Link href="/services" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              All Services
            </Link>
            <Link href="/packages" className="text-[#2F5D50] hover:text-[#C8A951] font-semibold">
              View Packages →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
import { Link } from "wouter";
import { Shield, CheckCircle, XCircle } from "lucide-react";
import CalendlyButton from "@/components/common/CalendlyButton";

export default function CompliancePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hemp Business Compliance
              </h1>
              <p className="text-xl mb-8">
                Navigate complex regulations with confidence. Our compliance experts ensure your hemp business operates fully within legal requirements.
              </p>
              <CalendlyButton
                text="Schedule a Compliance Consultation"
                size="lg"
                className="bg-[#C8A951] hover:bg-[#D9BA62] text-white"
              />
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-full shadow-xl">
                <Shield className="h-32 w-32 text-[#2F5D50]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl py-16 px-4">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-6 text-center">
            Why Compliance Matters in Hemp
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-12">
            The hemp industry operates under strict regulatory requirements. Proper compliance is the foundation of a successful, sustainable business that avoids costly penalties and legal issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-red-50 p-8 rounded-lg border border-red-200">
              <div className="flex items-center mb-4">
                <XCircle className="h-8 w-8 text-red-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Common Compliance Mistakes</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Improper business entity structure exposing personal assets</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Missing required licenses and permits</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Inadequate product testing and documentation</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Non-compliant product labels and marketing claims</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Failure to maintain proper record-keeping</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Our Compliance Solutions</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Properly structured business entity with liability protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete licensing package for your jurisdiction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive COA (Certificate of Analysis) management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Legally compliant product labels and marketing review</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete record-keeping systems and compliance training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
            Our Compliance Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Business Formation</h3>
              <p className="text-gray-700 mb-4">
                We handle LLC formation, EIN registration, and banking setup to establish the proper legal foundation for your hemp business.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>LLC or Corporation filing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>EIN registration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Operating agreements</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Licensing & Permits</h3>
              <p className="text-gray-700 mb-4">
                We identify and obtain all necessary permits and licenses required for your hemp business in your specific state and locality.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>State hemp licenses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Business permits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Tax registrations</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Ongoing Compliance</h3>
              <p className="text-gray-700 mb-4">
                We provide continuous compliance monitoring, updates on regulatory changes, and annual reporting assistance.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Regulatory monitoring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>License renewals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Annual reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-4">
            Ready to Build a Compliant Hemp Business?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Our compliance experts will guide you through every step of the process, ensuring your hemp business is set up correctly from day one.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalendlyButton
              text="Schedule a Consultation"
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
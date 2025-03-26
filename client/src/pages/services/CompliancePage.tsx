import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CompliancePage() {
  const handleScheduleConsultation = () => {
    window.open('https://form.jotform.com/250775888697180', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-[#f2f7f6] to-[#e6f0ee]">
        <div className="absolute inset-0 bg-cover bg-center opacity-5 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6">Complete Compliance Solutions</h1>
            <p className="text-xl text-gray-700 mb-8">
              Navigate the complex regulatory landscape of the hemp industry with confidence. 
              Our comprehensive compliance services ensure your business meets all legal requirements.
            </p>
            <Button
              onClick={handleScheduleConsultation}
              className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white px-8 py-3 text-lg"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-16 mx-auto">
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-6">Comprehensive Hemp Business Compliance</h2>
          <p className="text-lg text-gray-700 mb-6">
            The hemp industry is subject to a complex web of regulations that vary by state and are constantly evolving. 
            Our compliance experts stay on top of these changes to ensure your business remains fully compliant at all times.
          </p>
          <p className="text-lg text-gray-700">
            From initial business formation to ongoing regulatory monitoring, we provide the guidance and support 
            you need to operate legally and with confidence in this rapidly growing industry.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Service 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Business Entity Formation</h3>
            <p className="text-gray-600 mb-4">
              We'll help you select and establish the optimal business structure (LLC, corporation, etc.) for your hemp operation, 
              ensuring you have the right foundation for your business.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>LLC or Corporation setup</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>EIN registration</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Operating agreements</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>State registration</span>
              </li>
            </ul>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Licensing & Permits</h3>
            <p className="text-gray-600 mb-4">
              Navigate the complex world of hemp business licensing with our expert guidance, ensuring you have all necessary permits to operate legally.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Hemp cultivation licenses</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Processing permits</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Retail & distribution authorizations</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Local business permits</span>
              </li>
            </ul>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Product Testing & COAs</h3>
            <p className="text-gray-600 mb-4">
              Ensure your products meet all legal requirements and build consumer trust through comprehensive testing and documentation.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Lab testing coordination</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Certificate of Analysis (COA) management</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Potency and purity verification</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>QR code system for consumer access</span>
              </li>
            </ul>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Regulatory Monitoring</h3>
            <p className="text-gray-600 mb-4">
              Stay ahead of changing regulations with our continuous monitoring services, ensuring your business remains compliant.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Regular regulatory updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Compliance assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Adaptation strategies</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Risk mitigation</span>
              </li>
            </ul>
          </div>

          {/* Service 5 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sales Tax Compliance</h3>
            <p className="text-gray-600 mb-4">
              Manage the complex world of sales tax for hemp products with our expert guidance and systems.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Sales tax ID registration</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Multi-state tax management</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Filing system setup</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Tax planning strategies</span>
              </li>
            </ul>
          </div>

          {/* Service 6 */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Compliant Marketing</h3>
            <p className="text-gray-600 mb-4">
              Develop marketing strategies that effectively promote your products while adhering to advertising regulations.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Compliant website content</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Social media policy development</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>FDA-compliant claim review</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2F5D50] mr-2">✓</span>
                <span>Packaging & labeling compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-[#f2f7f6] p-8 md:p-12 rounded-2xl mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-6">Why Choose Our Compliance Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Knowledge</h3>
                <p className="text-gray-700">
                  Our team stays current with all hemp regulations across all 50 states, ensuring your business 
                  is always operating within legal boundaries.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Proactive Approach</h3>
                <p className="text-gray-700">
                  We don't just react to regulatory changes—we anticipate them, helping you adapt your business 
                  before new regulations impact your operations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Comprehensive Solutions</h3>
                <p className="text-gray-700">
                  From initial setup to ongoing monitoring, we provide end-to-end compliance services tailored to 
                  your specific business needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Risk Reduction</h3>
                <p className="text-gray-700">
                  Our compliance protocols help protect your business from costly penalties, legal challenges, 
                  and reputational damage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ensure Your Hemp Business is Fully Compliant?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Take the first step toward a legally sound hemp business. Schedule a consultation with our compliance experts today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleScheduleConsultation}
              className="bg-white text-[#2F5D50] hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Schedule a Consultation
            </Button>
            <Link href="/packages">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                View Our Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
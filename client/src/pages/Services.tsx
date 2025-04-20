import { Helmet } from "react-helmet";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services | HempLaunch</title>
        <meta 
          name="description" 
          content="Comprehensive services for hemp businesses including legal setup, branding, manufacturing, fulfillment, and marketing."
        />
      </Helmet>
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C8A951] font-semibold">OUR SERVICES</span>
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
              All-in-One Solution for Hemp Entrepreneurs
            </h1>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              We handle everything you need to launch and grow your hemp business — from legal formation to marketing.
            </p>
          </div>
          
          <div id="compliance-section" className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-[#2F5D50]">
              Entity & Legal Setup
            </h2>
            <p className="text-gray-700 mb-6">
              Our comprehensive legal setup services ensure your hemp business starts on solid legal ground:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>LLC formation and documentation</li>
              <li>EIN application assistance</li>
              <li>Bank account setup guidance</li>
              <li>Compliance review and risk assessment</li>
              <li>Initial business licensing support</li>
            </ul>

            <div className="flex justify-center">
              <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Get Started
              </a>
            </div>
          </div>

          <div id="brand-section" className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-[#2F5D50]">
              Branding & Web Development
            </h2>
            <p className="text-gray-700 mb-6">
              Create a professional, memorable brand identity and online presence:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>Brand strategy and positioning</li>
              <li>Logo design and visual identity</li>
              <li>Packaging design for compliance and appeal</li>
              <li>Responsive website development</li>
              <li>Content creation and copywriting</li>
            </ul>

            <div className="flex justify-center">
              <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Get Started
              </a>
            </div>
          </div>

          <div id="product-section" className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-[#2F5D50]">
              Manufacturing & Fulfillment
            </h2>
            <p className="text-gray-700 mb-6">
              From product development to customer delivery, we handle the entire supply chain:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>Manufacturer sourcing and vetting</li>
              <li>Product development and samples</li>
              <li>Quality assurance and testing</li>
              <li>Inventory management</li>
              <li>Order fulfillment and shipping logistics</li>
            </ul>

            <div className="flex justify-center">
              <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Get Started
              </a>
            </div>
          </div>

          <div id="marketing-section" className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-[#2F5D50]">
              Marketing & Meta Ads
            </h2>
            <p className="text-gray-700 mb-6">
              Drive traffic and sales with compliant, effective digital marketing:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>Compliant Meta/Facebook ad campaigns</li>
              <li>Target audience development</li>
              <li>Content marketing strategy</li>
              <li>Email marketing setup</li>
              <li>Performance tracking and optimization</li>
            </ul>

            <div className="flex justify-center">
              <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Get Started
              </a>
            </div>
          </div>
          
          <div id="distribution-section" className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-[#2F5D50]">
              Sales & Distribution
            </h2>
            <p className="text-gray-700 mb-6">
              Get your products into retailers' hands and in front of customers:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>Retail partnership development</li>
              <li>Wholesale account management</li>
              <li>Distribution channel strategies</li>
              <li>Pricing structure optimization</li>
              <li>Sales team training and resources</li>
            </ul>

            <div className="flex justify-center">
              <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Get Started
              </a>
            </div>
          </div>
          
          <div id="support-section" className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-[#2F5D50]">
              Ongoing Support
            </h2>
            <p className="text-gray-700 mb-6">
              Receive continuous assistance to keep your business running smoothly:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
              <li>Regulatory compliance updates</li>
              <li>Inventory management guidance</li>
              <li>Business strategy consulting</li>
              <li>Scaling and growth planning</li>
              <li>Technical support for systems</li>
            </ul>

            <div className="flex justify-center">
              <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

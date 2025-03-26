import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function BrandPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6">Strategic Brand Development</h1>
            <p className="text-xl text-gray-700 mb-8">
              Build a distinctive, memorable hemp brand that resonates with your target audience and 
              stands out in a competitive marketplace.
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
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-6">Building Memorable Hemp Brands</h2>
          <p className="text-lg text-gray-700 mb-6">
            In the rapidly growing hemp industry, a strong brand is essential for cutting through the noise and building customer loyalty. 
            Our comprehensive brand development services help you create a compelling identity that communicates your unique value proposition.
          </p>
          <p className="text-lg text-gray-700">
            We combine strategic thinking, creative design, and industry knowledge to develop brands that not only look great 
            but also connect with your target audience and drive business growth.
          </p>
        </div>

        {/* Our Brand Development Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-10 text-center">Our Brand Development Process</h2>
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#2F5D50]/20 transform -translate-x-1/2"></div>
            
            {/* Step 1 */}
            <div className="relative mb-16">
              <div className="md:w-1/2 md:pr-12 md:float-left">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <div className="hidden md:block absolute right-0 top-1/2 w-10 h-10 bg-[#2F5D50] rounded-full transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold">1</div>
                  <div className="md:hidden w-10 h-10 bg-[#2F5D50] rounded-full mb-4 flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Brand Discovery</h3>
                  <p className="text-gray-600 mb-4">
                    We start by understanding your vision, values, target audience, and business goals to establish the foundation for your brand strategy.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Stakeholder interviews</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Market research and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Competitive landscape assessment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Target audience definition</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clear-both"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative mb-16">
              <div className="md:w-1/2 md:pl-12 md:float-right">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <div className="hidden md:block absolute left-0 top-1/2 w-10 h-10 bg-[#2F5D50] rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold">2</div>
                  <div className="md:hidden w-10 h-10 bg-[#2F5D50] rounded-full mb-4 flex items-center justify-center text-white font-bold">2</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Brand Strategy</h3>
                  <p className="text-gray-600 mb-4">
                    We develop a comprehensive strategy that defines your brand's positioning, messaging, and key differentiators.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Brand positioning statement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Value proposition development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Brand narrative and storytelling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Brand voice and messaging framework</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clear-both"></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative mb-16">
              <div className="md:w-1/2 md:pr-12 md:float-left">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <div className="hidden md:block absolute right-0 top-1/2 w-10 h-10 bg-[#2F5D50] rounded-full transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold">3</div>
                  <div className="md:hidden w-10 h-10 bg-[#2F5D50] rounded-full mb-4 flex items-center justify-center text-white font-bold">3</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Visual Identity</h3>
                  <p className="text-gray-600 mb-4">
                    We create a distinctive visual identity that captures your brand essence and appeals to your target audience.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Logo design and variations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Color palette development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Typography selection</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Imagery and graphic elements</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clear-both"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <div className="md:w-1/2 md:pl-12 md:float-right">
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                  <div className="hidden md:block absolute left-0 top-1/2 w-10 h-10 bg-[#2F5D50] rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold">4</div>
                  <div className="md:hidden w-10 h-10 bg-[#2F5D50] rounded-full mb-4 flex items-center justify-center text-white font-bold">4</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Brand Implementation</h3>
                  <p className="text-gray-600 mb-4">
                    We bring your brand to life across all customer touchpoints, ensuring consistency and maximum impact.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Packaging and product design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Website and digital presence</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Marketing materials and collateral</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#2F5D50] mr-2">✓</span>
                      <span>Brand guidelines documentation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clear-both"></div>
            </div>
          </div>
        </div>

        {/* Brand Development Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-10 text-center">Our Brand Development Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Logo & Identity Design</h3>
              <p className="text-gray-600 mb-4">
                Create a distinctive visual mark and identity system that captures your brand essence and resonates with customers.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Primary logo and variations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Brand color system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Typography hierarchy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Supporting graphic elements</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Packaging Design</h3>
              <p className="text-gray-600 mb-4">
                Develop packaging that protects your product, attracts attention, and communicates your brand story.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Retail packaging design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Label design and production</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Compliance-friendly solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Sustainable packaging options</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Website Development</h3>
              <p className="text-gray-600 mb-4">
                Create a compelling online presence that drives conversions and showcases your brand effectively.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Custom website design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>E-commerce functionality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Mobile-optimized experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Content strategy and development</span>
                </li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Brand Messaging</h3>
              <p className="text-gray-600 mb-4">
                Develop clear, compelling language that articulates your brand's value and connects with your audience.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Tagline and slogan development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Brand voice guidelines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Key messaging framework</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Product description development</span>
                </li>
              </ul>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Brand Photography</h3>
              <p className="text-gray-600 mb-4">
                Create a visual library of high-quality images that showcase your products and brand personality.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Product photography</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Lifestyle imagery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Team and culture photography</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Social media-optimized visuals</span>
                </li>
              </ul>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Brand Guidelines</h3>
              <p className="text-gray-600 mb-4">
                Develop comprehensive documentation to ensure consistent application of your brand across all touchpoints.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Logo usage guidelines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Color and typography specifications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Photography and imagery style guide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Voice and tone documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-[#f2f7f6] p-8 md:p-12 rounded-2xl mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-6">Why Choose Our Brand Development Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Hemp Industry Expertise</h3>
                <p className="text-gray-700">
                  We understand the unique challenges and opportunities in the hemp space, allowing us to create 
                  brands that resonate with your specific audience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Strategic Approach</h3>
                <p className="text-gray-700">
                  Our brand development is grounded in research and strategy, ensuring that every design decision 
                  supports your business objectives.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Compliance-Friendly</h3>
                <p className="text-gray-700">
                  We create distinctive brands that stand out while navigating the complex regulatory environment 
                  surrounding hemp products.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Integrated Solutions</h3>
                <p className="text-gray-700">
                  Our brand development services integrate seamlessly with our other offerings, ensuring consistency 
                  across your entire hemp business.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Hemp Brand?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Take the first step toward creating a distinctive brand that will set your hemp business apart 
            from the competition and connect with your ideal customers.
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
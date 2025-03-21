import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import SimpleQualifier from '@/components/common/SimpleQualifier';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  ArrowRight, 
  Leaf, 
  Award, 
  TrendingUp, 
  UserCheck, 
  ShieldCheck
} from 'lucide-react';

export default function OptimizedLanding() {
  return (
    <>
      <Helmet>
        <title>HempLaunch Pro | Start Your Hemp Business</title>
        <meta 
          name="description" 
          content="Get qualified for our turnkey Hemp Business Solutions. Schedule a consultation today to start your profitable hemp brand with expert guidance."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#2F5D50] text-white py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 bg-cover bg-center opacity-20 bg-[url('/hemp-pattern.png')] bg-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          ></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center md:text-left mb-10 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A951] text-[#2F5D50] font-semibold text-xs md:text-sm mb-4 md:mb-6">
                <Leaf size={16} />
                <span>LIMITED SPOTS AVAILABLE</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
                  Launch Your Hemp Business <span className="text-[#C8A951]">Without The Hassle</span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 leading-relaxed">
                  We handle everything from entity formation to product launch so you can focus on building your brand and growing your business.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-6 md:mb-8">
                  <SimpleQualifier 
                    buttonText="Get Started Today"
                    buttonClassName="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-base md:text-lg px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto border-2 border-[#C8A951]"
                  />
                  
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-[#2F5D50] font-semibold text-base md:text-lg px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/how-it-works">
                      How It Works
                    </Link>
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 md:gap-6 text-sm">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C8A951]" />
                    <span>100% Compliance Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C8A951]" />
                    <span>Industry Experts</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C8A951]" />
                    <span>End-to-End Support</span>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-3 gap-2 text-center md:hidden">
                  <div className="bg-[#C8A951] text-[#2F5D50] px-2 py-1 rounded font-medium text-sm">
                    30 Days
                  </div>
                  <div className="bg-[#C8A951] text-[#2F5D50] px-2 py-1 rounded font-medium text-sm">
                    Under $3,000
                  </div>
                  <div className="bg-[#C8A951] text-[#2F5D50] px-2 py-1 rounded font-medium text-sm">
                    $8B Market
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-2xl hidden lg:block">
                <div className="bg-[#2F5D50] text-white text-center p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold">Qualify for Your Free Consultation</h3>
                  <p className="text-sm opacity-80">Answer a few quick questions to see if you qualify</p>
                </div>
                <div className="space-y-6">
                  {/* Pre-qualification teaser */}
                  <div className="flex items-start gap-3">
                    <div className="bg-[#f0f9f6] p-2 rounded-full">
                      <UserCheck className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2F5D50]">Business Experience</h4>
                      <p className="text-sm text-gray-600">We'll assess your business background</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#f0f9f6] p-2 rounded-full">
                      <TrendingUp className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2F5D50]">Investment Readiness</h4>
                      <p className="text-sm text-gray-600">Determine your financial preparation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-[#f0f9f6] p-2 rounded-full">
                      <ShieldCheck className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#2F5D50]">Timeline Expectations</h4>
                      <p className="text-sm text-gray-600">Plan your launch timeline</p>
                    </div>
                  </div>
                  
                  <SimpleQualifier
                    buttonText="Start Qualification Process"
                    buttonClassName="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 border-2 border-[#C8A951]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-[#2F5D50] mb-2">TRUSTED BY BRANDS ACROSS THE INDUSTRY</h3>
              <div className="w-20 h-1 bg-[#C8A951] mx-auto"></div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
              {/* Brand Placeholders - styled with real-looking names */}
              <div className="flex flex-col items-center">
                <div className="h-16 w-48 bg-white rounded-lg border border-gray-300 flex items-center justify-center p-2">
                  <div className="text-center">
                    <span className="font-bold text-[#2F5D50] text-xl tracking-tight">Green<span className="text-[#C8A951]">Leaf</span></span>
                    <span className="block text-xs font-light">WELLNESS</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Premium Partner</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-48 bg-white rounded-lg border border-gray-300 flex items-center justify-center p-2">
                  <div className="text-center">
                    <span className="font-bold text-gray-700 text-lg">ALTITUDE</span>
                    <span className="block text-xs font-semibold tracking-widest text-[#C8A951]">EXTRACTS</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Featured Client</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-48 bg-white rounded-lg border border-gray-300 flex items-center justify-center p-2">
                  <div className="text-center">
                    <span className="font-bold text-gray-800 tracking-tight">Harmony <span className="text-[#C8A951]">&</span> Hemp</span>
                    <span className="block text-xs italic">SINCE 2020</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Industry Leader</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-48 bg-white rounded-lg border border-gray-300 flex items-center justify-center p-2">
                  <div className="text-center">
                    <span className="font-bold text-gray-700 text-xl">NATURA</span>
                    <span className="block text-xs text-[#2F5D50] font-semibold">DISTRIBUTION CO.</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Major Distributor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0f9f6] text-[#2F5D50] font-semibold text-sm mb-4">
                <Award size={16} />
                <span>ALL-IN-ONE SOLUTION</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F5D50]">Everything You Need to Launch Your Hemp Business</h2>
              <p className="text-lg text-gray-600">We've streamlined the entire process so you can focus on what matters most: growing a successful brand in this booming industry.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Complete Compliance</h3>
                <p className="text-gray-600 mb-4">We ensure your business meets all legal requirements with proper entity formation, licensing, and ongoing compliance monitoring.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Product Development</h3>
                <p className="text-gray-600 mb-4">From formulation to manufacturing and packaging, we create premium hemp products that stand out in the market.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Brand Development</h3>
                <p className="text-gray-600 mb-4">Create a compelling brand identity with professional logo design, packaging, website development, and marketing materials.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Sales & Distribution</h3>
                <p className="text-gray-600 mb-4">Gain access to our established network of retailers and distributors to get your products on shelves quickly and efficiently.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Marketing Strategy</h3>
                <p className="text-gray-600 mb-4">Develop comprehensive marketing plans including digital advertising, social media management, and content creation.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Ongoing Support</h3>
                <p className="text-gray-600 mb-4">Receive continuous business support including inventory management, regulatory compliance updates, and operational guidance.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2F5D50] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch Your Hemp Business?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto">
              Join the growing hemp industry with expert guidance every step of the way.
            </p>
            <div className="flex justify-center">
              <SimpleQualifier
                buttonText="Schedule Your Consultation"
                buttonClassName="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-lg px-8 py-4 border-2 border-[#C8A951]"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">What Our Clients Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear from entrepreneurs who've successfully launched their hemp businesses with our help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[#2F5D50]">Sarah T.</h4>
                    <p className="text-gray-600 text-sm">CBD Wellness Co.</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Working with HempLaunch made getting into the hemp business easy. Their expertise in compliance and regulatory matters saved us countless hours and potential legal issues."
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[#2F5D50]">Michael R.</h4>
                    <p className="text-gray-600 text-sm">Green Peak Products</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "From concept to launch in just 3 months. The HempLaunch team provided end-to-end support, helping us develop products that now sell in over 50 stores nationwide."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    J
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[#2F5D50]">Jessica B.</h4>
                    <p className="text-gray-600 text-sm">Elevate Extracts</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "As someone new to the hemp industry, I needed guidance at every step. HempLaunch delivered exceptional service, helping us build a successful product line with ongoing support."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about starting your hemp business.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Is hemp legal?</h3>
                <p className="text-gray-700">
                  Hemp products containing less than 0.3% Delta-9 THC are federally legal under the 2018 Farm Bill. However, state regulations vary. Our team ensures your business complies with all applicable laws.
                </p>
              </div>
              
              {/* FAQ Item 2 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">How much investment is required to start a hemp business?</h3>
                <p className="text-gray-700">
                  Initial investments typically range from $10,000 to $50,000 depending on your business scale and goals. During our consultation, we'll provide detailed estimates based on your specific business plan.
                </p>
              </div>
              
              {/* FAQ Item 3 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">How long does it take to launch a hemp business?</h3>
                <p className="text-gray-700">
                  With our streamlined process, most clients can launch within 2-4 months. This includes entity formation, product development, compliance, and initial marketing setup.
                </p>
              </div>
              
              {/* FAQ Item 4 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Do I need prior experience in the hemp industry?</h3>
                <p className="text-gray-700">
                  No prior experience is required. Our experts will guide you through every aspect of the business, from understanding the market to operational best practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="py-16 bg-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2F5D50] text-white font-semibold text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>ENTERPRISE-GRADE TECHNOLOGY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F5D50]">Built on a Rock-Solid Technical Foundation</h2>
              <p className="text-lg text-gray-600">Our platform leverages modern technologies to provide a seamless, secure, and scalable experience for your hemp business.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-[#2F5D50] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8A951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Performance Optimization
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2F5D50]">Code Minification</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#2F5D50] h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2F5D50]">CDN Caching</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#2F5D50] h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3">
                      <svg className="h-5 w-5 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#2F5D50]">Image Optimization</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#2F5D50] h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  Our platform uses advanced build tools like Terser and ESBuild to deliver optimized assets, resulting in faster page loads and better user experience for your customers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-[#2F5D50] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#C8A951]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Security & Compliance
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-100 rounded p-3 flex flex-col items-center">
                    <svg className="h-8 w-8 text-[#2F5D50] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-sm font-medium">HTTPS Encryption</span>
                  </div>
                  <div className="bg-gray-100 rounded p-3 flex flex-col items-center">
                    <svg className="h-8 w-8 text-[#2F5D50] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">GDPR Compliant</span>
                  </div>
                  <div className="bg-gray-100 rounded p-3 flex flex-col items-center">
                    <svg className="h-8 w-8 text-[#2F5D50] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    <span className="text-sm font-medium">Secure Auth</span>
                  </div>
                  <div className="bg-gray-100 rounded p-3 flex flex-col items-center">
                    <svg className="h-8 w-8 text-[#2F5D50] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span className="text-sm font-medium">DDoS Protection</span>
                  </div>
                </div>
                <p className="text-gray-600">
                  We implement industry-leading security practices to protect your data and ensure compliance with all relevant regulations for the hemp industry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-[#C8A951]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#2F5D50]">Start Your Hemp Business Journey Today</h2>
            <p className="text-xl mb-8 text-[#2F5D50] max-w-2xl mx-auto">
              Don't miss the opportunity to enter this rapidly growing market with expert guidance every step of the way.
            </p>
            <SimpleQualifier
              buttonText="Get Your Free Consultation"
              buttonClassName="bg-[#2F5D50] hover:bg-[#264A40] text-white font-bold text-lg px-8 py-4 border-2 border-[#2F5D50]"
            />
          </div>
        </section>
      </div>
    </>
  );
}
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import CalendlyQualifier from '@/components/common/CalendlyQualifier';
import { Button } from '@/components/ui/button';
import { motion, useAnimation } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Leaf, 
  Award, 
  TrendingUp, 
  UserCheck, 
  ShieldCheck,
  Mail
} from 'lucide-react';

export default function OptimizedLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    });
  }, [controls]);

  return (
    <>
      <Helmet>
        <title>HempLaunch Pro | Start Your Hemp-Derived THC Business</title>
        <meta 
          name="description" 
          content="Get qualified for our turnkey Hemp-Derived THC Business Solutions. Schedule a consultation today to start your profitable cannabis brand with expert guidance."
        />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#2F5D50] text-white py-20 md:py-32">
          <div className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={controls}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8A951] text-[#2F5D50] font-semibold text-sm mb-6">
                  <Leaf size={16} />
                  <span>LIMITED SPOTS AVAILABLE</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Launch Your Hemp-Derived THC Business <span className="text-[#C8A951]">Without The Hassle</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                  We handle everything from entity formation to product launch so you can focus on building your brand and growing your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <CalendlyQualifier 
                    buttonText="Get Started Today" 
                    buttonClassName="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-lg px-8 py-4"
                  />
                  <Link href="/services">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#2F5D50] font-semibold text-lg px-8 py-4">
                      Explore Services
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C8A951]" />
                    <span>100% Compliance Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C8A951]" />
                    <span>Industry Experts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#C8A951]" />
                    <span>End-to-End Support</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="bg-white rounded-xl p-6 shadow-2xl hidden lg:block"
              >
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
                  
                  <CalendlyQualifier 
                    buttonText="Start Qualification Process" 
                    buttonClassName="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <p className="text-gray-500 font-medium">TRUSTED BY BRANDS ACROSS THE INDUSTRY</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {/* Replace with actual logos */}
              <div className="h-8 w-32 bg-gray-200 rounded opacity-60"></div>
              <div className="h-8 w-36 bg-gray-300 rounded opacity-60"></div>
              <div className="h-8 w-28 bg-gray-200 rounded opacity-60"></div>
              <div className="h-8 w-40 bg-gray-300 rounded opacity-60"></div>
              <div className="h-8 w-32 bg-gray-200 rounded opacity-60"></div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F5D50]">Everything You Need to Launch Your THC Business</h2>
              <p className="text-lg text-gray-600">We've streamlined the entire process so you can focus on what matters most: growing a successful brand in this booming industry.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
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
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Product Development</h3>
                <p className="text-gray-600 mb-4">From formulation to manufacturing and packaging, we create premium hemp-derived THC products that stand out in the market.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
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
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
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
              </motion.div>
              
              {/* Feature 5 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
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
              </motion.div>
              
              {/* Feature 6 */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#f0f9f6] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Ongoing Support</h3>
                <p className="text-gray-600 mb-4">Receive continuous business guidance, compliance updates, and growth strategies from our experienced team of industry experts.</p>
                <Link href="/services" className="inline-flex items-center text-[#2F5D50] font-semibold hover:text-[#C8A951]">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#2F5D50] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Hemp Business Journey?</h2>
                <p className="text-lg mb-0 md:mb-0 opacity-90">Take the first step by completing our quick qualification process to see if you're ready to launch.</p>
              </div>
              <div>
                <CalendlyQualifier 
                  buttonText="Get Qualified Now" 
                  buttonClassName="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-lg px-8 py-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer Opt-in */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="h-10 w-10 text-[#2F5D50] mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2F5D50]">Stay Updated on Industry Trends</h2>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest hemp-derived THC business insights and opportunities.</p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
                />
                <Button className="bg-[#2F5D50] hover:bg-[#264a40]">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">By subscribing, you agree to receive marketing communications from us.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
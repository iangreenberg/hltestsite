import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import TimelineQualifier from "../components/common/TimelineQualifier";
import { Link } from "wouter";
import { 
  ArrowRight, Check, TrendingUp, DollarSign, Rocket, ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";

// Animation variants for framer-motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export default function NewLandingPage() {
  const [showQualifier, setShowQualifier] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    market: false,
    problem: false,
    solution: false,
    packages: false,
    testimonials: false
  });

  // Intersection Observer setup for animations
  useEffect(() => {
    type ObserverItem = {
      observer: IntersectionObserver;
      element: Element;
    };
    
    const observers: ObserverItem[] = [];
    
    const sections = [
      { id: 'hero', el: document.getElementById('hero-section') },
      { id: 'market', el: document.getElementById('market-section') },
      { id: 'problem', el: document.getElementById('problem-section') },
      { id: 'solution', el: document.getElementById('solution-section') },
      { id: 'packages', el: document.getElementById('packages-section') },
      { id: 'testimonials', el: document.getElementById('testimonials-section') }
    ];
    
    sections.forEach(section => {
      if (section.el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [section.id]: true }));
            }
          },
          { threshold: 0.1 }
        );
        
        observer.observe(section.el);
        observers.push({ observer, element: section.el });
      }
    });
    
    // Cleanup
    return () => {
      observers.forEach(({ observer, element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Launch Your Hemp THC Business in 30 Days | $8 Billion Texas Market | HempLaunch</title>
        <meta 
          name="description" 
          content="Tap into Texas' $8 billion hemp market with our turnkey system. Launch in 30 days for under $3,000 with full legal compliance, branding, and manufacturing."
        />
      </Helmet>
      
      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section 
          id="hero-section"
          className="relative bg-gradient-to-b from-[#2F5D50] to-[#1A3C33] text-white py-16 md:py-28"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
          <motion.div 
            initial="hidden"
            animate={isVisible.hero ? "visible" : "hidden"}
            variants={staggerContainer}
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="max-w-5xl mx-auto text-center">
              <motion.div variants={fadeIn} className="mb-3 inline-block">
                <span className="bg-[#C8A951] text-[#2F5D50] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                  Turnkey Hemp Business Solution
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                <span className="text-[#C8A951]">Build & Scale</span> Your Hemp Business with Confidence
              </motion.h1>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-8"
              >
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl shadow">
                  <Rocket className="h-5 w-5 text-[#C8A951] mr-2" />
                  <span className="text-xl font-medium">Launch in 30 Days</span>
                </div>
                
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl shadow">
                  <DollarSign className="h-5 w-5 text-[#C8A951] mr-2" />
                  <span className="text-xl font-medium">Under $3,000</span>
                </div>
                
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl shadow">
                  <TrendingUp className="h-5 w-5 text-[#C8A951] mr-2" />
                  <span className="text-xl font-medium">$8 Billion Market</span>
                </div>
              </motion.div>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed"
              >
                Imagine launching a fully legal hemp-derived THC business in just 30 days with our all-in-one, turnkey solution. HempLaunch handles everything—from legal formation and compliance to branding, manufacturing, and e-commerce—so you can focus on <span className="font-bold underline decoration-[#C8A951]">growing your brand and dominating your market</span>.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    transition: { 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse" as const
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={() => setShowQualifier(true)}
                    className="w-full md:w-auto bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-5 px-10 text-lg border-2 border-[#C8A951] rounded-xl shadow-lg"
                    size="lg"
                  >
                    Apply For Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                
                <Link href="/how-it-works">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto border-white text-white hover:bg-white hover:text-[#2F5D50] font-medium py-5 px-8 text-lg rounded-xl"
                    size="lg"
                  >
                    See How It Works
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                className="mt-12 flex justify-center"
              >
                <div className="animate-bounce bg-white/20 p-2 w-10 h-10 ring-1 ring-white/20 shadow-lg rounded-full flex items-center justify-center">
                  <ChevronDown className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Market Opportunity Section */}
        <section 
          id="market-section" 
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              animate={isVisible.market ? "visible" : "hidden"}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeIn} className="text-center mb-8">
                <span className="text-[#C8A951] font-semibold">MARKET OPPORTUNITY</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">The Hemp Revolution</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  The time to enter the hemp industry has never been better. Here's why:
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="mb-12">
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-br from-[#f0f9f6] to-white p-6 rounded-xl shadow border border-gray-100">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Explosive Growth</h3>
                    <p className="text-gray-700">
                      The hemp industry is outpacing traditional markets, offering <span className="font-semibold">first-movers a competitive edge</span> in this rapidly expanding space.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#f0f9f6] to-white p-6 rounded-xl shadow border border-gray-100">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Favorable Regulations</h3>
                    <p className="text-gray-700">
                      Thanks to the <span className="font-semibold">2018 Farm Bill</span>, hemp-derived THC products (with less than 0.3% Delta-9 THC) are federally legal.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#f0f9f6] to-white p-6 rounded-xl shadow border border-gray-100">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Texas Market Boom</h3>
                    <p className="text-gray-700">
                      With one of the largest consumer bases in the U.S., Texas offers <span className="font-semibold">unmatched business potential</span> for hemp entrepreneurs.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} className="bg-gray-50 p-8 rounded-xl shadow mb-8">
                <h3 className="text-2xl font-bold text-[#2F5D50] mb-4 text-center">Why Traditional Solutions Fail</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">❌</span>
                    <div>
                      <span className="font-semibold text-[#2F5D50]">Regulatory Complexity:</span>
                      <span className="text-gray-700"> Navigating legal, compliance, and tax hurdles alone is risky and time-consuming.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">❌</span>
                    <div>
                      <span className="font-semibold text-[#2F5D50]">Fragmented Services:</span>
                      <span className="text-gray-700"> Most entrepreneurs struggle to piece together vendors for legal work, branding, website development, and fulfillment.</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 font-bold mr-2">❌</span>
                    <div>
                      <span className="font-semibold text-[#2F5D50]">High Upfront Investment:</span>
                      <span className="text-gray-700"> Traditional launches cost <span className="font-semibold">$10,000 to $50,000+</span>, with long, unpredictable timelines.</span>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div variants={fadeIn} className="text-center">
                <h3 className="text-2xl font-bold text-[#2F5D50] mb-4">The HempLaunch Solution</h3>
                <p className="text-lg text-gray-700">
                  HempLaunch <span className="font-semibold">eliminates these obstacles</span> with an integrated, fast-track approach to launching your business legally and profitably.
                </p>
                <div className="mt-8">
                  <Button 
                    onClick={() => setShowQualifier(true)}
                    className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 px-8 rounded-lg"
                  >
                    Learn How We Help You Succeed
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Service Packages Section */}
        <section 
          id="packages-section" 
          className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial="hidden"
                animate={isVisible.packages ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center mb-16"
              >
                <motion.div 
                  variants={fadeIn} 
                  className="inline-block bg-[#2F5D50]/10 text-[#C8A951] font-semibold px-4 py-1 rounded-full mb-3"
                >
                  TAILORED SERVICE PACKAGES
                </motion.div>
                <motion.h2 
                  variants={fadeIn}
                  className="text-4xl font-bold text-[#2F5D50] mt-2"
                >
                  Choose Your Path to Success
                </motion.h2>
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto"
                >
                  Select from our three comprehensive service tiers, each designed to provide everything you need 
                  based on your business stage and growth objectives.
                </motion.p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-10">
                {/* Ecom Starter Package */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.packages ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 h-full flex flex-col"
                >
                  <div className="bg-[#2F5D50] text-white p-8 text-center relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4">Ecom Starter</h3>
                      <div className="mt-2 flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#C8A951]/20 flex items-center justify-center">
                          <Rocket className="h-8 w-8 text-[#C8A951]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <p className="text-gray-600 text-lg mb-6 font-medium">Perfect for new businesses looking for a strong foundation.</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Business formation (LLC, EIN, Sales Tax ID)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Compliance essentials (COA verification, legal framework)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">E-commerce website setup with age verification</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Financial setup (Bank account, merchant processor)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Starter branding package (logo, product design)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Free sample & example product costs included</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => setShowQualifier(true)}
                          className="w-full bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-4 px-6 rounded-xl shadow-md"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#f0f9f6] to-[#e6f5f0] p-4 text-center">
                    <p className="text-[#2F5D50] font-bold text-lg">Ideal for: First-time business owners</p>
                  </div>
                </motion.div>

                {/* Growth Package */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.packages ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 relative z-10 h-full flex flex-col"
                >
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="bg-[#C8A951] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      Most Popular
                    </span>
                  </div>
                  <div className="bg-[#2F5D50] text-white p-8 text-center relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4">Growth Package</h3>
                      <div className="mt-2 flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#C8A951]/20 flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-[#C8A951]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <p className="text-gray-600 text-lg mb-6 font-medium">For brands ready to scale with expert marketing & automation.</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700"><span className="font-semibold text-[#2F5D50]">Everything in Ecom Starter PLUS:</span></span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">High-converting e-commerce website with expert design</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Custom subdomain landing page for targeted marketing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">SMS/email marketing automation consultation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Wholesale login portal for bulk orders</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Advanced compliance (sales tax strategy, MSO consultation)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Financial consulting (tax & accounting guidance)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Full branding package (logo, product design, brand book)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Affiliate marketing setup for influencers & brand ambassadors</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-[#C8A951] blur-sm rounded-xl"></div>
                        <Button
                          onClick={() => setShowQualifier(true)}
                          className="relative w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-4 px-6 rounded-xl shadow-md border-2 border-[#C8A951]"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#f0f9f6] to-[#e6f5f0] p-4 text-center">
                    <p className="text-[#2F5D50] font-bold text-lg">Ideal for: Growing brands & established businesses</p>
                  </div>
                </motion.div>

                {/* Accelerator Program */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.packages ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 h-full flex flex-col"
                >
                  <div className="absolute -right-3 -top-3">
                    <div className="bg-[#C8A951] text-white text-sm font-bold px-4 py-1 rounded-full rotate-12 shadow-lg">
                      Elite
                    </div>
                  </div>
                  <div className="bg-[#2F5D50] text-white p-8 text-center relative">
                    <div className="absolute inset-0 opacity-10 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-4">Accelerator Program</h3>
                      <div className="mt-2 flex justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#C8A951]/20 flex items-center justify-center">
                          <DollarSign className="h-8 w-8 text-[#C8A951]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <p className="text-gray-600 text-lg mb-6 font-medium">For businesses that want an all-in-one solution with advanced automation.</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700"><span className="font-semibold text-[#2F5D50]">Everything in Growth Package PLUS:</span></span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Full CRM backend setup & integration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Business formation for tax optimization (S-Corp, stock, bylaws)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">State-specific MSO setup & ongoing compliance support</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Payroll & accounting automation (QuickBooks integration)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Dedicated design expert (company merch, premium branding)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">Expert-level marketing: Social media ads, brand ambassador recruitment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700">UGC content creation, static ads, video ads</span>
                      </li>
                    </ul>
                    <div className="mt-auto">
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => setShowQualifier(true)}
                          className="w-full bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-4 px-6 rounded-xl shadow-md"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#f0f9f6] to-[#e6f5f0] p-4 text-center">
                    <p className="text-[#2F5D50] font-bold text-lg">Ideal for: Scaling brands ready for enterprise-level operations</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials-section"
          className="py-16 bg-gradient-to-b from-white to-gray-100"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="text-[#C8A951] font-semibold">SUCCESS STORIES</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2 mb-4">
                  What Our Clients Say
                </h2>
                <p className="text-gray-600">Hear from entrepreneurs who have successfully launched with HempLaunch</p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="text-[#C8A951] text-4xl mb-4">"</div>
                  <p className="text-gray-700 mb-6">
                    Working with HempLaunch was a game-changer. Their comprehensive support took all the guesswork out of launching my hemp business. In just 30 days, I was up and running, and my products are already generating buzz!
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#2F5D50]/20 flex items-center justify-center text-[#2F5D50] font-bold">ST</div>
                    <div className="ml-3">
                      <p className="font-medium text-[#2F5D50]">Sarah T.</p>
                      <p className="text-gray-500 text-sm">CBD Wellness Co.</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="text-[#C8A951] text-4xl mb-4">"</div>
                  <p className="text-gray-700 mb-6">
                    HempLaunch's HCF system ensured that our products met every regulatory requirement. The seamless process allowed us to launch quickly and confidently, and our sales are booming!
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#2F5D50]/20 flex items-center justify-center text-[#2F5D50] font-bold">MR</div>
                    <div className="ml-3">
                      <p className="font-medium text-[#2F5D50]">Michael R.</p>
                      <p className="text-gray-500 text-sm">Green Peak Products</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                >
                  <div className="text-[#C8A951] text-4xl mb-4">"</div>
                  <p className="text-gray-700 mb-6">
                    As a first-time entrepreneur, I was overwhelmed by the complexities of the hemp industry. HempLaunch guided me through every step, from legal setup to marketing. Now, my brand is thriving, and I couldn't be happier.
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#2F5D50]/20 flex items-center justify-center text-[#2F5D50] font-bold">JB</div>
                    <div className="ml-3">
                      <p className="font-medium text-[#2F5D50]">Jessica B.</p>
                      <p className="text-gray-500 text-sm">Elevate Extracts</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section 
          id="cta-section"
          className="py-20 bg-gradient-to-b from-[#2F5D50] to-[#1A3C33] text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-[#C8A951]/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-12 bg-gradient-to-l from-[#C8A951]/20 to-transparent"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Future?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Don't let the complexities of launching a hemp business hold you back. With HempLaunch, you can secure your spot in Texas's <span className="text-[#C8A951] font-bold">$8 billion market</span> and be operational in just <span className="text-[#C8A951] font-bold">30 days</span>.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-[#C8A951] text-4xl font-bold mb-2">30</div>
                  <div className="text-white">Day Launch</div>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-[#C8A951] text-4xl font-bold mb-2">100%</div>
                  <div className="text-white">Legal Compliance</div>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-5 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="text-[#C8A951] text-4xl font-bold mb-2">$3K</div>
                  <div className="text-white">Entry Point</div>
                </motion.div>
              </div>
              
              <motion.div 
                className="bg-white text-[#2F5D50] p-10 rounded-xl shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Capture Your Share of the Texas Hemp Market</h3>
                <p className="mb-8 text-lg">Our exclusive launch slots are limited—act now to start your journey</p>
                
                {showQualifier ? (
                  <div className="max-w-md mx-auto">
                    <TimelineQualifier
                      buttonText="Apply Now"
                      buttonClassName="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-4 text-lg rounded-lg"
                    />
                  </div>
                ) : (
                  <Button 
                    onClick={() => setShowQualifier(true)}
                    className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-4 px-10 text-lg rounded-lg"
                  >
                    Complete Your Application Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                
                <p className="text-gray-600 text-sm mt-6 max-w-md mx-auto">
                  By applying, you'll secure a free consultation with one of our hemp business experts who will assess your readiness and explain how HempLaunch can transform your entrepreneurial vision into reality.
                </p>
              </motion.div>
              
              <p className="mt-12 text-gray-300">
                Launching a legal hemp-derived THC business in Texas is a monumental opportunity—one that promises freedom, growth, and a chance to be at the forefront of a booming market. HempLaunch is your trusted partner, offering an integrated solution that covers every detail so you can focus on building your brand and achieving financial independence.
              </p>
              
              <p className="mt-6 text-lg text-[#C8A951] font-semibold">
                To your success,<br />
                The HempLaunch Team
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq-section"
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="text-[#C8A951] font-semibold">FREQUENTLY ASKED QUESTIONS</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2 mb-4">
                  Common Questions About Hemp Business
                </h2>
                <p className="text-gray-600">Everything you need to know before getting started</p>
              </motion.div>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Is hemp-derived THC legal in Texas?</h3>
                  <p className="text-gray-700">
                    Yes! Our products contain less than 0.3% Delta-9 THC and are fully compliant with federal and Texas state regulations under the 2018 Farm Bill.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-[#2F5D50] mb-3">How long does it take to launch with HempLaunch?</h3>
                  <p className="text-gray-700">
                    Our streamlined process means you can launch in as little as 30 days, compared to the industry standard of 3-6 months when attempting to launch independently.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-[#2F5D50] mb-3">What is included in the turnkey service?</h3>
                  <p className="text-gray-700">
                    We cover everything—business formation, compliance, branding, e-commerce, product integration, and marketing strategy. Our packages are designed to provide everything you need to get started and scale.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-[#2F5D50] mb-3">Can I scale my business after launching?</h3>
                  <p className="text-gray-700">
                    Absolutely! Our tiered solutions allow you to expand branding, product lines, and marketing campaigns as you grow. We've designed our packages to support your business at every stage of growth.
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <Button 
                  onClick={() => setShowQualifier(true)}
                  className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-4 px-8 rounded-lg"
                >
                  Ready to Get Started? Apply Now
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
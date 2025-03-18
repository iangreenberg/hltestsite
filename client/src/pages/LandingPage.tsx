import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import TimelineQualifier from "../components/common/TimelineQualifier";
import { Link } from "wouter";
import { 
  ArrowRight, Check, X, Shield, Clock, TrendingUp, DollarSign, 
  PieChart, FileCheck, Map, Rocket, ChevronDown
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

export default function LandingPage() {
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">MARKET OPPORTUNITY</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  The Texas Hemp Revolution
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  The window to capture market share in the exploding hemp-derived THC industry is wide open—but only for those who act quickly.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-start mb-6">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <DollarSign className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">$8 Billion+ Industry</h3>
                      <p className="text-gray-600 mt-2">
                        The Texas hemp-derived THC market is valued at over $8 billion with projections for exponential growth in the next 5 years.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 rounded-lg">
                    <p className="text-sm text-gray-500 italic">
                      "Early market entrants can secure up to 30% more revenue compared to businesses that launch later."
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-start mb-6">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <Map className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">Texas: The Perfect Market</h3>
                      <p className="text-gray-600 mt-2">
                        With its robust economy, pro-business environment, and massive consumer base, Texas offers unprecedented opportunity for hemp entrepreneurs.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 rounded-lg">
                    <p className="text-sm text-gray-500 italic">
                      "Texas isn't just any market—it's one of the largest consumer bases in the country with an ever-expanding retail network."
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-start mb-6">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <PieChart className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">Explosive Growth Trajectory</h3>
                      <p className="text-gray-600 mt-2">
                        The hemp industry is outpacing traditional markets, driven by innovation and shifting consumer preferences toward natural alternatives.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 rounded-lg">
                    <p className="text-sm text-gray-500 italic">
                      "Consumer demand is surging as retailers across Texas rapidly expand their hemp-derived product offerings."
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-start mb-6">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <FileCheck className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">Clear Legal Framework</h3>
                      <p className="text-gray-600 mt-2">
                        Thanks to the 2018 Farm Bill and supportive Texas regulations, hemp-derived THC products now enjoy a favorable regulatory environment.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 rounded-lg">
                    <p className="text-sm text-gray-500 italic">
                      "Products with less than 0.3% Delta-9 THC operate within a clear legal framework, reducing barriers for new entrepreneurs."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <div className="inline-block bg-[#f0f9f6] border border-[#2F5D50] text-[#2F5D50] p-5 rounded-xl">
                  <p className="font-bold text-lg">This isn't just an opportunity—it's a revolution.</p>
                  <p className="mt-2">
                    The Texas hemp market is ripe for disruption, and now is your moment to step in, innovate, and reap the rewards of a market that's only just beginning to explode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Problem Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">THE CHALLENGE</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  Why Traditional Solutions Fail
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  Despite the massive opportunity, launching a hemp business independently comes with significant hurdles that prevent most entrepreneurs from succeeding.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Complexity & Risk</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Navigating the maze of regulatory hurdles—from forming your legal entity (LLC, EIN, Sales Tax ID) to ensuring product compliance with state and federal regulations.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Fragmented Services</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Piecing together multiple vendors for legal work, branding, website development, manufacturing, and fulfillment creates a disjointed, slow process that delays your time-to-market.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Unpredictable Timelines</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Traditional approaches often result in launch timelines stretching to six months or more. In Texas's rapidly growing market, every day of delay means lost revenue and competitive advantage.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">High Upfront Investment</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Launching independently requires $10,000 to $50,000+ with no guarantee of regulatory compliance or market readiness—a prohibitive financial barrier for most entrepreneurs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solution Section */}
        <section 
          id="solution-section"
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial="hidden"
                animate={isVisible.solution ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center mb-12"
              >
                <motion.span variants={fadeIn} className="text-[#C8A951] font-semibold">THE SOLUTION</motion.span>
                <motion.h2 
                  variants={fadeIn}
                  className="text-3xl font-bold text-[#2F5D50] mt-2"
                >
                  The HempLaunch Turnkey System
                </motion.h2>
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
                >
                  HempLaunch transforms a complex, fragmented process into a seamless, streamlined journey that gets you to market fast and at a fraction of the cost.
                </motion.p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#2F5D50] hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <Shield className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">All-in-One Expertise</h3>
                      <p className="text-gray-600 mt-3">
                        We manage everything—from legal formation (LLC, EIN, Sales Tax ID) and compliance to custom branding, e-commerce development, and manufacturing partnerships.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#2F5D50] hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <Check className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">Proprietary Hemp Compliance Framework</h3>
                      <p className="text-gray-600 mt-3">
                        Our HCF system ensures every product meets strict state and federal regulations, backed by rigorous lab testing and proper documentation.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#2F5D50] hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">Rapid Time-to-Market</h3>
                      <p className="text-gray-600 mt-3">
                        Launch in as little as 30 days, giving you a crucial first-mover advantage in Texas's growing market and allowing you to start generating revenue immediately.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#2F5D50] hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="bg-[#f0f9f6] p-3 rounded-full mr-4">
                      <TrendingUp className="h-6 w-6 text-[#2F5D50]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2F5D50]">Cost-Effective & Scalable</h3>
                      <p className="text-gray-600 mt-3">
                        For under $3,000, get a fully operational business with tiered solutions designed to scale as your brand grows in the Texas market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Packages Section */}
        <section 
          id="packages-section" 
          className="py-16 bg-gradient-to-r from-gray-100 to-gray-200"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                initial="hidden"
                animate={isVisible.packages ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center mb-12"
              >
                <motion.span variants={fadeIn} className="text-[#C8A951] font-semibold">SERVICE PACKAGES</motion.span>
                <motion.h2 
                  variants={fadeIn}
                  className="text-3xl font-bold text-[#2F5D50] mt-2"
                >
                  Tailored Solutions for Your Business
                </motion.h2>
                <motion.p 
                  variants={fadeIn}
                  className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto"
                >
                  We offer three comprehensive service packages designed to fit your specific business needs and growth goals.
                </motion.p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Ecom Starter Package */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.packages ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-[#2F5D50] text-white p-6 text-center">
                    <h3 className="text-2xl font-bold">Ecom Starter</h3>
                    <div className="mt-2 flex justify-center">
                      <Rocket className="h-12 w-12 text-[#C8A951]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">Perfect for new businesses looking for a strong foundation.</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Business formation (LLC, EIN, Sales Tax ID)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Compliance essentials (COA verification, legal framework)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">E-commerce website setup with age verification and compliance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Financial setup (Bank account, merchant processor)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Starter branding package (logo, product design)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Free sample & example product costs included</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setShowQualifier(true)}
                          className="w-full bg-[#2F5D50] hover:bg-[#234840] font-semibold py-3 px-6"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="bg-[#f0f9f6] p-4 text-center">
                    <p className="text-[#2F5D50] font-bold">Ideal for: First-time business owners</p>
                  </div>
                </motion.div>

                {/* Growth Package */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.packages ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative z-10 md:-mt-4 md:mb-4"
                >
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="bg-[#C8A951] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      Most Popular
                    </span>
                  </div>
                  <div className="bg-[#2F5D50] text-white p-8 text-center">
                    <h3 className="text-2xl font-bold">Growth Package</h3>
                    <div className="mt-2 flex justify-center">
                      <TrendingUp className="h-12 w-12 text-[#C8A951]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">For brands ready to scale with expert marketing & automation.</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><span className="font-semibold">Everything in Ecom Starter PLUS:</span></span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">High-converting e-commerce website with expert design</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Custom subdomain landing page for targeted marketing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">SMS/email marketing automation consultation</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Wholesale login portal for bulk orders</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Advanced compliance (sales tax strategy, MSO consultation)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Full branding package (complete brand book)</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setShowQualifier(true)}
                          className="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 px-6 border-2 border-[#C8A951]"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="bg-[#f0f9f6] p-4 text-center">
                    <p className="text-[#2F5D50] font-bold">Ideal for: Growing brands & established businesses</p>
                  </div>
                </motion.div>

                {/* Accelerator Program */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.packages ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="bg-[#2F5D50] text-white p-6 text-center">
                    <h3 className="text-2xl font-bold">Accelerator Program</h3>
                    <div className="mt-2 flex justify-center">
                      <div className="relative">
                        <Rocket className="h-12 w-12 text-[#C8A951]" />
                        <Rocket className="h-12 w-12 text-[#C8A951] absolute -top-1 -left-1" />
                        <Rocket className="h-12 w-12 text-[#C8A951] absolute -top-2 -left-2" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">For businesses that want an all-in-one solution with advanced automation.</p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600"><span className="font-semibold">Everything in Growth Package PLUS:</span></span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Full CRM backend setup & integration</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Business formation for tax optimization (S-Corp, bylaws)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">State-specific MSO setup & ongoing compliance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Payroll & accounting automation (QuickBooks integration)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Dedicated design expert (company merch, premium branding)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Expert-level marketing campaigns and brand ambassador recruitment</span>
                      </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => setShowQualifier(true)}
                          className="w-full bg-[#2F5D50] hover:bg-[#234840] font-semibold py-3 px-6"
                          size="lg"
                        >
                          Apply Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <div className="bg-[#f0f9f6] p-4 text-center">
                    <p className="text-[#2F5D50] font-bold">Ideal for: Scaling brands ready for enterprise-level operations</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section 
          id="process-section"
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">YOUR ROADMAP</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  The HempLaunch Journey
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  Our proven 5-step process transforms your vision into a thriving hemp business in the Texas market
                </p>
              </div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-2">1</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Consultation & Qualification</h3>
                    <p className="text-gray-600 mb-4">
                      Your journey begins with a free consultation where we assess your business background, investment readiness, and vision for entering the Texas hemp market. We explain the immense opportunity and show how HempLaunch mitigates risk and accelerates your launch.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-2">2</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Legal & Compliance Setup</h3>
                    <p className="text-gray-600 mb-4">
                      Our expert team handles every legal detail—LLC formation, EIN, Sales Tax ID, and full regulatory compliance through our proprietary HCF system. This ensures your hemp products are fully legal under Texas and federal law, giving you and your customers complete peace of mind.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-2">3</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Digital Presence & Branding</h3>
                    <p className="text-gray-600 mb-4">
                      We build a modern, high-converting e-commerce website tailored to your brand. Our design includes essential features like age verification, compliance pages (COA, Privacy, Accessibility), and a sleek user interface. Simultaneously, our branding experts create a memorable logo and visual identity that will stand out in Texas's competitive market.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-2">4</div>
                    <div className="hidden md:block w-1 bg-[#2F5D50] flex-grow"></div>
                  </div>
                  <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Product Integration & Fulfillment</h3>
                    <p className="text-gray-600 mb-4">
                      We connect you with trusted manufacturing partners for white-label product integration, with a minimum order quantity (MOQ) of 250 units per product. We handle sample orders and initial inventory, ensuring your products—whether hemp shots, infused lemonade, or gummies—are ready for the Texas retail market.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex flex-col items-center">
                    <div className="bg-[#2F5D50] text-white h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-2">5</div>
                  </div>
                  <div className="md:w-3/4 bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Marketing & Launch Support</h3>
                    <p className="text-gray-600 mb-4">
                      We provide a tailored marketing strategy specially designed for the Texas market, driving traffic and sales from day one. Our comprehensive support includes digital advertising targeting Texas consumers, email and SMS campaigns, social media setup, and ongoing consultation to ensure your business scales efficiently across the state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">SUCCESS STORIES</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  What Our Clients Say
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg shadow-md border-t-4 border-[#C8A951]">
                  <p className="italic text-gray-600 mb-6">
                    "Working with HempLaunch was a game-changer. Their comprehensive support took all the guesswork out of launching my hemp business. In just 30 days, I was up and running, and my products are already generating buzz!"
                  </p>
                  <div className="font-bold text-[#2F5D50]">Sarah T.</div>
                  <div className="text-sm text-gray-500">CBD Wellness Co.</div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg shadow-md border-t-4 border-[#C8A951]">
                  <p className="italic text-gray-600 mb-6">
                    "HempLaunch's HCF system ensured that our products met every regulatory requirement. The seamless process allowed us to launch quickly and confidently, and our sales are booming!"
                  </p>
                  <div className="font-bold text-[#2F5D50]">Michael R.</div>
                  <div className="text-sm text-gray-500">Green Peak Products</div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-lg shadow-md border-t-4 border-[#C8A951]">
                  <p className="italic text-gray-600 mb-6">
                    "As a first-time entrepreneur, I was overwhelmed by the complexities of the hemp industry. HempLaunch guided me through every step, from legal setup to marketing. Now, my brand is thriving, and I couldn't be happier."
                  </p>
                  <div className="font-bold text-[#2F5D50]">Jessica B.</div>
                  <div className="text-sm text-gray-500">Elevate Extracts</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">FAQs</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-2">Is hemp-derived THC legal in Texas?</h3>
                  <p className="text-gray-600">
                    Absolutely. Our products contain less than 0.3% Delta-9 THC and are fully compliant with federal and Texas state regulations.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-2">How long does it take to launch with HempLaunch?</h3>
                  <p className="text-gray-600">
                    Our streamlined process means you can launch in as little as 30 days from your initial consultation.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-2">What is included in the turnkey service?</h3>
                  <p className="text-gray-600">
                    We cover everything from legal formation (LLC, EIN, Sales Tax ID) and compliance (COAs, lab testing) to custom branding, e-commerce website development, product integration with trusted manufacturing partners, and marketing strategy.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-2">Can I scale my business after launching?</h3>
                  <p className="text-gray-600">
                    Yes! Our tiered solutions are designed to grow with your business, allowing you to add advanced features and multiple product lines as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-[#2F5D50] to-[#1A3C33] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Future?</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Don't let the complexities of launching a hemp business hold you back. With HempLaunch, you can secure your spot in Texas's $8 billion market and be operational in just 30 days.
              </p>
              
              <div className="bg-white text-[#2F5D50] p-10 rounded-xl shadow-2xl">
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
              </div>
              
              <p className="mt-12 text-gray-300">
                Launching a legal hemp-derived THC business in Texas is a monumental opportunity—one that promises freedom, growth, and a chance to be at the forefront of a booming market. HempLaunch is your trusted partner, offering an integrated solution that covers every detail so you can focus on building your brand and achieving financial independence.
              </p>
              
              <p className="mt-6 text-lg text-[#C8A951] font-semibold">
                To your success,<br />
                The HempLaunch Team
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
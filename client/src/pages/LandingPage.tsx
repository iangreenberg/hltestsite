import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { 
  ArrowRight, Check, X, Shield, Clock, TrendingUp, DollarSign, 
  PieChart, FileCheck, Map, Rocket, ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

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
  // Direct JotForm opening function for application buttons
  const openJotForm = () => {
    window.open('https://form.jotform.com/250775888697180', '_blank');
  };
  
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
        <title>Launch Your Hemp Business in 30 Days | $8 Billion Texas Market | HempLaunch</title>
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
                Imagine launching a fully legal hemp business in just 30 days with our all-in-one, turnkey solution. HempLaunch handles everything—from legal formation and compliance to branding, manufacturing, and e-commerce—so you can focus on <span className="font-bold underline decoration-[#C8A951]">growing your brand and dominating your market</span>.
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
                    onClick={openJotForm}
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
                  The window to capture market share in the exploding hemp industry is wide open—but only for those who act quickly.
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
                        The Texas hemp market is valued at over $8 billion with projections for exponential growth in the next 5 years.
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
                        Thanks to the 2018 Farm Bill and supportive Texas regulations, hemp products now enjoy a favorable regulatory environment.
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#f9f9f9] p-3 rounded-lg">
                    <p className="text-sm text-gray-500 italic">
                      "Hemp products operate within a clear legal framework, reducing barriers for new entrepreneurs."
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
                    Coordinating between multiple service providers—lawyers, manufacturers, branding agencies, and more—is time-consuming, expensive, and often results in disjointed execution.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Cost & Time Drain</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Traditional launch methods can cost upwards of $50,000 and take 6+ months to execute, draining both your finances and valuable market entry time.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Industry Knowledge Gap</h3>
                    <span className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-500" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Without deep industry-specific knowledge, entrepreneurs make critical mistakes in product formulation, consumer targeting, and retail partnerships.
                  </p>
                </div>
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-lg font-medium text-[#2F5D50]">
                  The result?
                </p>
                <p className="text-xl font-bold text-red-600 mt-2">
                  Over 80% of independent hemp business startups fail within their first year.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Solution Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">THE SOLUTION</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  HempLaunch: Your Complete Business System
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  Introducing a revolutionary turnkey solution that transforms the complex process of launching a hemp business into a simple, streamlined system.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Proven Business System</h3>
                    <span className="bg-[#f0f9f6] p-2 rounded-full">
                      <Check className="h-5 w-5 text-[#2F5D50]" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    A complete, ready-to-deploy business framework including legal entity formation, compliance documentation, standard operating procedures, and business development roadmap.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">All-In-One Integration</h3>
                    <span className="bg-[#f0f9f6] p-2 rounded-full">
                      <Check className="h-5 w-5 text-[#2F5D50]" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    One team handles everything: legal structure, business registration, product development, manufacturing partnerships, branding, e-commerce, and growth strategy.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Speed & Affordability</h3>
                    <span className="bg-[#f0f9f6] p-2 rounded-full">
                      <Clock className="h-5 w-5 text-[#2F5D50]" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Launch in as little as 30 days for under $3,000, compared to traditional methods that cost 15x more and take 6+ months to implement.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2F5D50]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[#2F5D50]">Expert-Guided Process</h3>
                    <span className="bg-[#f0f9f6] p-2 rounded-full">
                      <Shield className="h-5 w-5 text-[#2F5D50]" />
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Backed by industry veterans with proven success in the Texas hemp market who guide you through every step of the process to ensure your success.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Button 
                  onClick={openJotForm}
                  className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-4 px-8 text-lg rounded-lg shadow-lg"
                >
                  Discover How We Can Help You Launch <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Packages Section */}
        <section 
          id="packages-section"
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">OUR PACKAGES</span>
                <h2 className="text-3xl font-bold text-[#2F5D50] mt-2">
                  Choose Your Path to Success
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  Whether you're starting from scratch or scaling an existing operation, we have a comprehensive solution designed for your specific needs.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Starter Package */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105">
                  <div className="bg-[#2F5D50] text-white p-6 text-center">
                    <h3 className="text-2xl font-bold">Starter Package</h3>
                    <p className="mt-2 text-white/80">The essentials to get your business legally established</p>
                    <div className="mt-4 text-3xl font-bold text-[#C8A951]">$2,497</div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>LLC Formation & Registration</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>EIN Registration</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Sales Tax Permit</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Basic Brand Identity Design</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Manufacturing Partner Connections</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>30-Day Launch Plan</span>
                      </li>
                    </ul>
                    <div className="mt-8">
                      <Button 
                        onClick={openJotForm}
                        className="w-full bg-[#2F5D50] hover:bg-[#234840] font-semibold py-3 px-6"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Growth Package */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-[#C8A951] transform scale-105 z-10">
                  <div className="bg-gradient-to-r from-[#2F5D50] to-[#1A3C33] text-white p-6 text-center relative">
                    <div className="absolute top-0 right-0 bg-[#C8A951] text-[#2F5D50] font-bold text-xs px-4 py-1 transform translate-y-0 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                    <h3 className="text-2xl font-bold">Growth Package</h3>
                    <p className="mt-2 text-white/80">Complete business system with marketing & sales</p>
                    <div className="mt-4 text-3xl font-bold text-[#C8A951]">$4,997</div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span><strong>Everything in Starter Package +</strong></span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Premium Brand Identity & Packaging</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>E-Commerce Website Setup</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Product Development (3 SKUs)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Marketing & Launch Strategy</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Retail Distribution Guidance</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>60-Day Growth Roadmap</span>
                      </li>
                    </ul>
                    <div className="mt-8">
                      <Button 
                        onClick={openJotForm}
                        className="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 px-6"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Scale Package */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105">
                  <div className="bg-[#2F5D50] text-white p-6 text-center">
                    <h3 className="text-2xl font-bold">Scale Package</h3>
                    <p className="mt-2 text-white/80">Enterprise-level solution for serious entrepreneurs</p>
                    <div className="mt-4 text-3xl font-bold text-[#C8A951]">$9,997</div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span><strong>Everything in Growth Package +</strong></span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Expanded Product Line (6+ SKUs)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Advanced Business Systems & SOPs</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Sales Team Development</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>Statewide Distribution Network</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#2F5D50] mt-0.5 mr-2 flex-shrink-0" />
                        <span>12-Month Growth Strategy</span>
                      </li>
                    </ul>
                    <div className="mt-8">
                      <Button 
                        onClick={openJotForm}
                        className="w-full bg-[#2F5D50] hover:bg-[#234840] font-semibold py-3 px-6"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Not sure which package is right for you? Schedule a free consultation with one of our hemp business experts who will assess your specific situation and recommend the perfect solution.
                </p>
                <div className="mt-8">
                  <Button 
                    onClick={openJotForm}
                    className="bg-[#2F5D50] hover:bg-[#234840] text-white font-semibold py-4 px-8 text-lg rounded-lg"
                  >
                    Book Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section
          id="testimonials-section"
          className="py-16 bg-gradient-to-b from-[#2F5D50] to-[#1A3C33] text-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#C8A951] font-semibold">SUCCESS STORIES</span>
                <h2 className="text-3xl font-bold text-white mt-2">
                  Join Our Growing List of Success Stories
                </h2>
                <p className="text-lg text-white/80 mt-4 max-w-3xl mx-auto">
                  Hear from entrepreneurs who transformed their hemp business dreams into thriving reality with HempLaunch.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#C8A951] flex items-center justify-center text-[#2F5D50] text-xl font-bold mr-4">
                      JT
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">James T.</h4>
                      <p className="text-white/80">Austin, TX</p>
                    </div>
                  </div>
                  <p className="text-lg italic">
                    "Before HempLaunch, I spent over $25,000 trying to get my hemp business off the ground with little success. Their system had me up and running in 28 days, and I'm now in 15 retail locations across central Texas. Best business decision I've ever made."
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#C8A951] flex items-center justify-center text-[#2F5D50] text-xl font-bold mr-4">
                      SM
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Sarah M.</h4>
                      <p className="text-white/80">Houston, TX</p>
                    </div>
                  </div>
                  <p className="text-lg italic">
                    "As someone with zero experience in the hemp industry, I was intimidated by the complexity. HempLaunch simplified everything, providing me with a clear roadmap and handling all the complicated legal and regulatory hurdles. Six months in, and we're generating $40K/month in revenue."
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#C8A951] flex items-center justify-center text-[#2F5D50] text-xl font-bold mr-4">
                      RK
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Robert K.</h4>
                      <p className="text-white/80">Dallas, TX</p>
                    </div>
                  </div>
                  <p className="text-lg italic">
                    "If you're serious about building a hemp business in Texas, there is simply no better option than HempLaunch. Their industry knowledge, manufacturing connections, and turnkey approach gave me a 6-month head start over my competition."
                  </p>
                </div>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button 
                  onClick={openJotForm}
                  className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-4 px-8 text-lg rounded-lg shadow-lg"
                >
                  Join Our Success Stories <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                initial="hidden"
                animate={isVisible.testimonials ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.div variants={fadeIn}>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2F5D50] mb-6">
                    Unlock Your Share of the $8 Billion Texas Hemp Market
                  </h2>
                  <p className="text-xl text-gray-700 mb-10 max-w-4xl mx-auto">
                    The opportunity is massive, but the window to act is closing fast. Our exclusive slots for March/April are filling quickly.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={fadeIn}
                  className="bg-gray-50 p-8 md:p-12 rounded-xl max-w-3xl mx-auto"
                >
                  <h3 className="text-2xl font-bold mb-4">Capture Your Share of the Texas Hemp Market</h3>
                  <p className="mb-8 text-lg">Our exclusive launch slots are limited—act now to start your journey</p>
                  
                  <div className="flex justify-center">
                    <div className="w-full max-w-md">
                      <Button
                        onClick={openJotForm}
                        className="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-4 text-lg rounded-lg"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-6 max-w-md mx-auto">
                    By applying, you'll secure a free consultation with one of our hemp business experts who will assess your readiness and explain how HempLaunch can transform your entrepreneurial vision into reality.
                  </p>
                </motion.div>
                
                <p className="mt-12 text-gray-300">
                  Launching a legal hemp business in Texas is a monumental opportunity—one that promises freedom, growth, and a chance to be at the forefront of a booming market. HempLaunch is your trusted partner, offering an integrated solution that covers every detail so you can focus on building your brand and achieving financial independence.
                </p>
                
                <p className="mt-6 text-lg text-[#C8A951] font-semibold">
                  To your success,<br />
                  The HempLaunch Team
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
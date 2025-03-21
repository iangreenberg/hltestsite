import { CheckCircle, TrendingUp, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function FBLandingPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const openJotForm = () => {
    window.open('https://form.jotform.com/250775888697180', '_blank');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-28 bg-[#2F5D50] text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn}>
              <div className="inline-block mb-3 md:mb-5 px-3 py-1 bg-[#C8A951] rounded-full text-[#2F5D50] font-semibold text-sm md:text-base">
                Limited Time Opportunity
              </div>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8"
            >
              Launch Your Hemp Empire in 30 Days—Risk-Free!
            </motion.h1>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-8"
            >
              <div className="bg-[#C8A951]/20 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center font-semibold text-sm md:text-base">
                🚀 Live in 30 Days
              </div>
              <div className="bg-[#C8A951]/20 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center font-semibold text-sm md:text-base">
                💸 Under $3,000
              </div>
              <div className="bg-[#C8A951]/20 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg flex items-center font-semibold text-sm md:text-base">
                📈 Tap a $8B Market
              </div>
            </motion.div>
            
            <motion.p 
              variants={fadeIn}
              className="text-base md:text-xl mb-6 md:mb-10 max-w-4xl mx-auto leading-relaxed"
            >
              <strong>Your All-in-One Hemp Solution:</strong> HempLaunch builds your fully legal Hemp business—from compliance and branding to e-commerce and marketing—so you can start profiting fast. Join 50+ hemp brands who've scaled with us!
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="pt-6 md:pt-16 flex justify-center"
            >
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  transition: { 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse" as const
                  }
                }}
                className="cursor-pointer"
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                  });
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-1 md:mb-2">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-xs md:text-sm">Scroll to learn more</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-[#2F5D50]">Join the Hemp Gold Rush—Now's Your Moment!</h2>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-600">
              The hemp industry is booming, and HempLaunch gives you the perfect entry point. Here's why you can't afford to wait:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-14 w-14 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-[#2F5D50]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2F5D50]">Explosive Market Growth</h3>
              <h4 className="text-lg font-semibold mb-3 text-[#C8A951]">A $5B Industry and Growing Fast</h4>
              <p className="text-gray-600">
                The hemp market is projected to hit $8 billion by 2026, with demand for hemp products skyrocketing. Early movers are claiming their share—don't get left behind in this green rush.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-14 w-14 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-[#2F5D50]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2F5D50]">Clear Legal Path</h3>
              <h4 className="text-lg font-semibold mb-3 text-[#C8A951]">Backed by the 2018 Farm Bill</h4>
              <p className="text-gray-600">
                Hemp-derived THC (under 0.3% Delta 9) is federally legal, and more states are embracing it every year. HempLaunch ensures you're fully compliant, so you can sell with confidence anywhere.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-14 w-14 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-6">
                <UserCheck className="h-7 w-7 text-[#2F5D50]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2F5D50]">Massive Consumer Demand</h3>
              <h4 className="text-lg font-semibold mb-3 text-[#C8A951]">Millions Are Hungry for Hemp</h4>
              <p className="text-gray-600">
                Over 30% of U.S. adults have tried hemp THC products, and the number is climbing. From wellness seekers to recreational users, your customer base is ready—and HempLaunch helps you reach them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Traditional Solutions Fail */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-[#2F5D50]">Why Traditional Solutions Fail</h2>
          </div>
          
          <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">✕</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">Regulatory Confusion</h3>
                <p className="text-gray-600">
                  Hemp-derived THC is legal under the 2018 Farm Bill, but state laws vary widely, and advertising platforms often restrict THC-related ads, even if compliant.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">✕</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">Market Access & Logistics</h3>
                <p className="text-gray-600">
                  Sourcing reliable, compliant products and setting up a supply chain is overwhelming for beginners.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">✕</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">Marketing Barriers</h3>
                <p className="text-gray-600">
                  Standing out in a crowded market and navigating ad restrictions make customer acquisition tough.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">✕</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">High Costs & Risk</h3>
                <p className="text-gray-600">
                  Building a store, stocking inventory, and ensuring compliance can be expensive, with no guarantee of success.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm">
              <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold">✕</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#2F5D50]">Lack of Expertise</h3>
                <p className="text-gray-600">
                  Many new entrepreneurs don't know how to run an e-commerce hemp business, from product selection to customer education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The HempLaunch Solution */}
      <section className="py-12 md:py-20 bg-[#2F5D50] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">The HempLaunch Solution</h2>
          </div>
          
          <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4 bg-[#234840] p-6 rounded-lg shadow-md border border-[#C8A951]/30">
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Compliance Made Simple</h3>
                <p className="text-white/90">
                  We handle the legal heavy lifting—ensuring all products meet federal and state standards—so you can launch confidently without the guesswork.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-[#234840] p-6 rounded-lg shadow-md border border-[#C8A951]/30">
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ready-to-Sell Supply Chain</h3>
                <p className="text-white/90">
                  Get instant access to premium, lab-certified hemp THC products and a streamlined logistics system—no sourcing headaches or inventory risks required.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-[#234840] p-6 rounded-lg shadow-md border border-[#C8A951]/30">
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Marketing That Works</h3>
                <p className="text-white/90">
                  Our proven, THC-friendly strategies cut through restrictions to drive traffic and sales fast.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-[#234840] p-6 rounded-lg shadow-md border border-[#C8A951]/30">
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Low-Cost, Low-Risk Entry</h3>
                <p className="text-white/90">
                  With HempLaunch, you get a fully built e-commerce store and expert support for a fraction of the traditional cost.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 bg-[#234840] p-6 rounded-lg shadow-md border border-[#C8A951]/30">
              <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Expert Guidance, Step-by-Step</h3>
                <p className="text-white/90">
                  From product selection to customer education, our team equips you with the tools and know-how to succeed, even if you're starting from scratch.
                </p>
              </div>
            </div>
          </div>
          

        </div>
      </section>

      {/* Packages */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-[#2F5D50]">Choose Your Path to Success</h2>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-600">
              Select the package that fits your goals and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Ecom Starter */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-[#2F5D50]">Ecom Starter</h3>
              <p className="text-lg font-semibold mb-6 text-[#C8A951]">Launch Your Hemp Empire for Pennies on the Dollar</p>
              <p className="text-gray-600 mb-8">Perfect for newbies who want a rock-solid start without the overwhelm.</p>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Business Formation Done Right</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Compliance Confidence</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">E-Commerce Ready</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Money Flow Unlocked</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Branding That Pops</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Free Samples Included</span>
                </div>
              </div>
              
              <Button 
                onClick={openJotForm}
                className="w-full bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-3 rounded-lg"
              >
                Get Started
              </Button>
            </div>
            
            {/* Growth Package */}
            <div className="bg-[#2F5D50] p-8 rounded-xl shadow-xl border-2 border-[#C8A951] flex flex-col relative transform scale-105 z-10">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-[#C8A951] text-[#2F5D50] px-4 py-1 rounded-full font-bold text-sm">
                  MOST POPULAR
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-white">Growth Package</h3>
              <p className="text-lg font-semibold mb-6 text-[#C8A951]">Skyrocket Sales with Pro-Level Tools</p>
              <p className="text-white/80 mb-8">For brands ready to dominate with marketing muscle and automation magic.</p>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">Everything in Ecom Starter, PLUS:</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">High-Octane Website</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">Laser-Focused Marketing</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">Automation Edge</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">Wholesale Power</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">Compliance Mastery</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-white">Branding That Stands Out</span>
                </div>
              </div>
              
              <Button 
                onClick={openJotForm}
                className="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 rounded-lg"
              >
                Get Started
              </Button>
            </div>
            
            {/* Elite Accelerator */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-bold mb-2 text-[#2F5D50]">Elite Accelerator</h3>
              <p className="text-lg font-semibold mb-6 text-[#C8A951]">The Ultimate All-in-One Powerhouse</p>
              <p className="text-gray-600 mb-8">For ambitious brands craving enterprise-level success with zero limits.</p>
              
              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Everything in Growth Package, PLUS:</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">CRM Command Center</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Tax-Smart Structure</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">State-Specific Mastery</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Money on Autopilot</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Design Domination</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-[#C8A951] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Marketing Firepower</span>
                </div>
              </div>
              
              <Button 
                onClick={openJotForm}
                className="w-full bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-3 rounded-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Your Roadmap to Success */}
      <section className="py-12 md:py-20 bg-[#2F5D50] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6">Your Step-by-Step Path to Hemp Success—From Day 1 to Domination</h2>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-white/80">
              Here's exactly what happens when you join HempLaunch, starting the moment you sign up:
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="relative pl-12 pb-12 border-l-2 border-[#C8A951]">
              <div className="absolute left-[-15px] top-0">
                <div className="h-7 w-7 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Kickoff & Strategy (Day 1–3)</h3>
                <p className="font-semibold text-[#C8A951] mb-2">What Happens:</p>
                <p className="mb-2 text-white/80">
                  We start with a 1:1 strategy session to understand your goals, target market, and vision.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">What You Get:</p>
                <p className="mb-2 text-white/80">
                  A custom roadmap tailored to your hemp business, plus clarity on your next steps.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">Outcome:</p>
                <p className="text-white/80">
                  You'll feel confident and aligned, knowing your hemp empire is off to the perfect start.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative pl-12 pb-12 border-l-2 border-[#C8A951]">
              <div className="absolute left-[-15px] top-0">
                <div className="h-7 w-7 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Legal & Compliance Foundation (Day 4–10)</h3>
                <p className="font-semibold text-[#C8A951] mb-2">What Happens:</p>
                <p className="mb-2 text-white/80">
                  We handle your LLC formation, EIN, Sales Tax ID, and full compliance setup using our proprietary Hemp Compliance Framework (HCF).
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">What You Get:</p>
                <p className="mb-2 text-white/80">
                  A fully legal business entity, ready to operate without risk, plus all compliance documentation.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">Outcome:</p>
                <p className="text-white/80">
                  You're 100% legit and protected—ready to sell with peace of mind.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative pl-12 pb-12 border-l-2 border-[#C8A951]">
              <div className="absolute left-[-15px] top-0">
                <div className="h-7 w-7 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Branding & Digital Launch (Day 11–20)</h3>
                <p className="font-semibold text-[#C8A951] mb-2">What Happens:</p>
                <p className="mb-2 text-white/80">
                  Our team builds your high-converting e-commerce website (with age verification), designs your logo, and creates marketing assets tailored to the hemp market.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">What You Get:</p>
                <p className="mb-2 text-white/80">
                  A professional, branded online store that's live and ready to attract customers, plus a starter branding package.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">Outcome:</p>
                <p className="text-white/80">
                  Your hemp business looks pro and is open for sales in under 3 weeks.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative pl-12 pb-12 border-l-2 border-[#C8A951]">
              <div className="absolute left-[-15px] top-0">
                <div className="h-7 w-7 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold">4</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Product Setup & Fulfillment (Day 21–25)</h3>
                <p className="font-semibold text-[#C8A951] mb-2">What Happens:</p>
                <p className="mb-2 text-white/80">
                  We integrate premium, lab-tested hemp THC products through our white-label manufacturing partners and set up your inventory and fulfillment system.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">What You Get:</p>
                <p className="mb-2 text-white/80">
                  A ready-to-sell product catalog with minimal upfront investment, plus a streamlined shipping process.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">Outcome:</p>
                <p className="text-white/80">
                  You're stocked and shipping—hassle-free and at a fraction of the cost of traditional inventory models.
                </p>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="relative pl-12">
              <div className="absolute left-[-15px] top-0">
                <div className="h-7 w-7 bg-[#C8A951] rounded-full flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold">5</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Marketing Launch & Growth (Day 26–30 and Beyond)</h3>
                <p className="font-semibold text-[#C8A951] mb-2">What Happens:</p>
                <p className="mb-2 text-white/80">
                  We launch your digital marketing campaigns, set up affiliate programs, and provide scaling strategies.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">What You Get:</p>
                <p className="mb-2 text-white/80">
                  A steady flow of traffic and sales, plus ongoing support to grow your brand.
                </p>
                <p className="font-semibold text-[#C8A951] mb-2">Outcome:</p>
                <p className="text-white/80">
                  Your hemp business is live, selling, and positioned to dominate the market.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={openJotForm}
              className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 px-8 text-lg rounded-xl"
            >
              Launch Your Hemp Business Today
            </Button>
          </div>
        </div>
      </section>

      {/* Set Up for Success */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-[#2F5D50]">Set Up for Success with HempLaunch</h2>
            <p className="text-base md:text-xl max-w-3xl mx-auto text-gray-600">
              Here's why entrepreneurs trust us to launch their hemp businesses—and why you'll thrive too:
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-14 w-14 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-6">
                <UserCheck className="h-7 w-7 text-[#2F5D50]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2F5D50]">Built by Hemp Experts</h3>
              <p className="text-gray-600">
                Our team, led by a founder with a Bachelor's in Cannabis Biology and Chemistry, has deep expertise in hemp compliance, e-commerce, and scaling. We've designed a proven system to get you from zero to selling in just 30 days.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-14 w-14 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-[#2F5D50]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2F5D50]">A Process That Works</h3>
              <p className="text-gray-600">
                Our 5-step HempLaunch Journey—backed by our proprietary Hemp Compliance Framework (HCF)—ensures every detail is handled, from legal setup to marketing. You're not just launching; you're launching with a plan that's built to succeed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="h-14 w-14 bg-[#f0f9f6] rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-7 w-7 text-[#2F5D50]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2F5D50]">Tapping a Booming Market</h3>
              <p className="text-gray-600">
                The hemp-derived THC market is projected to hit $8B by 2026, with demand soaring. With HempLaunch, you're not just entering the market—you're positioned to dominate it with premium products and expert marketing.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={openJotForm}
              className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-3 px-8 text-lg rounded-xl"
            >
              Start Your Hemp Business Now
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-16 bg-[#C8A951]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 text-[#2F5D50]">Launch Your Hemp Empire and Secure Your Future—Today!</h2>
          <p className="text-base md:text-xl mb-5 md:mb-8 text-[#2F5D50] max-w-3xl mx-auto">
            Don't let the $5B hemp market pass you by. With HempLaunch, you'll be selling in just 30 days—fully compliant and ready to dominate.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6 md:mb-10">
            <div className="bg-white/20 text-[#2F5D50] font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base">
              30 Days to Launch
            </div>
            <div className="bg-white/20 text-[#2F5D50] font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base">
              100% Legal Compliance
            </div>
            <div className="bg-white/20 text-[#2F5D50] font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base">
              $3K to Start
            </div>
          </div>
          
          <div className="max-w-xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#2F5D50]">Claim Your Spot in the Hemp Revolution</h3>
            <p className="text-sm md:text-base text-[#2F5D50] mb-4 md:mb-6">
              Only 10 Launch Slots Left—Act Now to Start Your Journey!
            </p>
            <Button 
              onClick={openJotForm}
              className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-3 md:py-4 px-4 md:px-8 text-sm md:text-lg rounded-xl w-full md:w-auto"
            >
              Get Your Free Strategy Call
            </Button>
            <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
              By signing up, you'll get a free 1:1 consultation with our hemp experts to kickstart your business.
            </p>
          </div>
          
          <p className="text-[#2F5D50] mt-10 max-w-3xl mx-auto text-sm">
            The hemp market is booming—projected to hit $5B by 2026—and HempLaunch is your trusted partner to capture your share. We'll guide you to success, step by step.
          </p>
          <p className="text-[#2F5D50] mt-4 font-semibold">
            To your hemp empire,<br />
            The HempLaunch Team
          </p>
        </div>
      </section>
    </div>
  );
}
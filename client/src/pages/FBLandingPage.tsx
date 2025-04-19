import { CheckCircle, TrendingUp, UserCheck, Rocket, DollarSign, Check, BarChart4, Calendar, Building, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';

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
    <>
      <Helmet>
        <title>Launch Your Hemp Brand in 30 Days | HempLaunch</title>
        <meta 
          name="description" 
          content="Launch your hemp brand in 30 days, legally & profitably. Everything you need to start selling products online, done-for-you. One flat fee of $2,999."
        />
      </Helmet>
    
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-[#2F5D50] text-white overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
            style={{
              backgroundImage: `url('/images/hemp-products.png')`
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="max-w-5xl mx-auto text-center"
            >
              <motion.span variants={fadeIn} className="inline-block px-4 py-1 mb-4 bg-[#C8A951] text-[#2F5D50] font-bold text-sm rounded-full">
                TURNKEY SOLUTION
              </motion.span>
              
              <motion.h1 
                variants={fadeIn}
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              >
                Launch Your Hemp Brand in 30 Days <span className="text-[#C8A951]">Legally & Profitably</span>
              </motion.h1>
              
              <motion.p
                variants={fadeIn}
                className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto"
              >
                Everything you need to start selling products online, done-for-you.
              </motion.p>
              
              <motion.div
                variants={fadeIn}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-[#C8A951] mr-2" />
                  <span className="font-medium">Launch in 30 Days</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-[#C8A951] mr-2" />
                  <span className="font-medium">One Flat Fee: $2,999</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-[#C8A951] mr-2" />
                  <span className="font-medium">First Order ROI</span>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Button 
                  onClick={openJotForm}
                  className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-lg px-8 py-6 rounded-lg shadow-lg"
                >
                  Apply for Your Brand Launch
                </Button>
                <p className="text-white/80 mt-3 text-sm">Limited time offer: Save $1,500 today</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Built by Experts Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">Built by Hemp Experts</h2>
              <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-[#f0f9f6] p-8 rounded-xl text-center">
                <div className="mx-auto w-16 h-16 bg-[#2F5D50] rounded-full flex items-center justify-center mb-4">
                  <UserCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Cannabis Expert Leadership</h3>
                <p className="text-gray-700">
                  Our team is led by hemp experts with degrees in cannabis biology & chemistry.
                </p>
              </div>
              
              <div className="bg-[#f0f9f6] p-8 rounded-xl text-center">
                <div className="mx-auto w-16 h-16 bg-[#2F5D50] rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Nationwide Production & Distribution</h3>
                <p className="text-gray-700">
                  We work with partners from coast to coast to get your products to market quickly.
                </p>
              </div>
              
              <div className="bg-[#f0f9f6] p-8 rounded-xl text-center">
                <div className="mx-auto w-16 h-16 bg-[#2F5D50] rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#2F5D50]">Partnered with Leaders</h3>
                <p className="text-gray-700">
                  We work closely with top brands like Cheech & Chong, Varin, and CBD Pros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Everything Done For You Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">Everything Done For You for One Flat Fee</h2>
              <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3 flex-shrink-0">
                    <ShoppingBag className="h-5 w-5 text-[#2F5D50]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F5D50]">E-Commerce Website Setup</h3>
                </div>
                <p className="text-gray-600 ml-13">
                  Age verification, COA page, privacy/accessibility compliance, high-converting landing page
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3 flex-shrink-0">
                    <Building className="h-5 w-5 text-[#2F5D50]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F5D50]">Business Formation</h3>
                </div>
                <p className="text-gray-600 ml-13">
                  LLC, EIN, Articles of Organization, Operating Agreement
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-[#2F5D50]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F5D50]">Compliance Support</h3>
                </div>
                <p className="text-gray-600 ml-13">
                  COAs, Sales Tax ID, regulatory documentation
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3 flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-[#2F5D50]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F5D50]">Finance Setup</h3>
                </div>
                <p className="text-gray-600 ml-13">
                  Cannabis-friendly bank account setup, merchant processor setup
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3 flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-[#2F5D50]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F5D50]">Starter Design Package</h3>
                </div>
                <p className="text-gray-600 ml-13">
                  Logo design, product labels, brand guidelines
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9f6] flex items-center justify-center mr-3 flex-shrink-0">
                    <ShoppingBag className="h-5 w-5 text-[#2F5D50]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F5D50]">Free Product Sample</h3>
                </div>
                <p className="text-gray-600 ml-13">
                  Hero products using proprietary supply-chain data
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={openJotForm}
                className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold px-8 py-3"
              >
                Get Everything You Need for $2,999
              </Button>
            </div>
          </div>
        </section>

        {/* We Handle the Heavy Lifting */}
        <section className="py-16 bg-[#2F5D50] text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">We Handle the Heavy Lifting</h2>
              <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              <div className="bg-white/10 p-8 rounded-xl border border-white/20">
                <div className="mx-auto w-16 h-16 bg-[#C8A951] rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-8 w-8 text-[#2F5D50]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">We Build Your Compliant Business in 30 Days</h3>
                <p className="text-white/80 text-center">
                  Our team handles all the technical, legal, and design work.
                </p>
              </div>
              
              <div className="bg-white/10 p-8 rounded-xl border border-white/20">
                <div className="mx-auto w-16 h-16 bg-[#C8A951] rounded-full flex items-center justify-center mb-6">
                  <Truck className="h-8 w-8 text-[#2F5D50]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Done-for-you Manufacturing & Fulfillment</h3>
                <p className="text-white/80 text-center">
                  Tap into our nationwide manufacturing & distribution network.
                </p>
              </div>
              
              <div className="bg-white/10 p-8 rounded-xl border border-white/20">
                <div className="mx-auto w-16 h-16 bg-[#C8A951] rounded-full flex items-center justify-center mb-6">
                  <BarChart4 className="h-8 w-8 text-[#2F5D50]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Marketing & Wholesale Distribution</h3>
                <p className="text-white/80 text-center">
                  Proven cannabis-friendly marketing strategies that won't get you banned.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">What It Would Cost to Do This Yourself</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Launching a hemp brand involves several key components. Doing it yourself can be costly and time-consuming:
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
                  <h3 className="text-xl font-bold mb-6 text-[#2F5D50]">DIY Approach Costs</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Compliant Cannabis Website</span>
                      <span className="font-bold">$5,000</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Business Formation (LLC, EIN)</span>
                      <span className="font-bold">$600</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Legal & Compliance Setup</span>
                      <span className="font-bold">$3,000</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Banking & Merchant Setup</span>
                      <span className="font-bold">$500</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Basic Branding & Design</span>
                      <span className="font-bold">$3,000</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-700">Product Sample + Consultation</span>
                      <span className="font-bold">$200</span>
                    </li>
                    <li className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-bold text-lg">Total DIY Cost</span>
                      <span className="font-bold text-red-600 text-lg">$12,300+</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-8 bg-[#f0f9f6]">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-[#2F5D50]">Hemp Launch E-com Starter Package</h3>
                    <div className="mt-4 mb-2">
                      <span className="text-gray-500 line-through text-lg">$4,500</span>
                      <div className="text-4xl font-bold text-[#2F5D50]">$2,999</div>
                      <div className="text-sm text-gray-600">(one-time payment)</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg mb-6">
                    <div className="text-center text-green-600 font-bold mb-2">Save over $9,301</div>
                    <p className="text-gray-700 text-center">And skip all the headaches of doing it yourself</p>
                  </div>
                  
                  <Button 
                    onClick={openJotForm}
                    className="bg-[#C8A951] hover:bg-[#B89841] text-white font-bold w-full"
                  >
                    Get Started Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ROI Calculator Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">One Order Pays for Your Entire Business Launch</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                See how your investment quickly pays for itself with your very first order
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#2F5D50] text-white p-6">
                <h3 className="text-xl font-bold text-center">ROI Example: White-label 101 mg Hemp Lemonade</h3>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold mb-4 text-[#2F5D50] border-b pb-2">Investment</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">HempLaunch Setup:</span>
                        <span className="font-bold">$2,999</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">MOQ (250 units):</span>
                        <span className="font-bold">$1,250</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Cost per Unit:</span>
                        <span className="font-bold">$5.00</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-bold mb-4 text-[#2F5D50] border-b pb-2">Revenue</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Retail Price:</span>
                        <span className="font-bold">$30.00</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Units Sold:</span>
                        <span className="font-bold">250</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Total Revenue:</span>
                        <span className="font-bold">$7,500</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[#f0f9f6] p-6 rounded-lg">
                    <h4 className="font-bold mb-4 text-[#2F5D50] border-b pb-2">Profit</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Gross Profit:</span>
                        <span className="font-bold">$6,250</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">1st Run Net:</span>
                        <span className="font-bold text-green-600">$3,251</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">2nd Run Net:</span>
                        <span className="font-bold text-green-600">$6,250</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-[#f0f9f6] rounded-lg text-center">
                  <p className="text-gray-700">
                    With Klarna or Afterpay, you can start selling before your payments are even finished.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quality Guarantee Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">Worried About Product Quality?</h2>
              <div className="w-20 h-1 bg-[#C8A951] mx-auto mb-8"></div>
            </div>
            
            <div className="max-w-4xl mx-auto bg-[#f0f9f6] rounded-xl p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-16 w-16 bg-white shadow-md rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F5D50]">Free Product Sample</h3>
                  <p className="text-gray-600">
                    Try before you commit to ensure you're satisfied with the quality
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 bg-white shadow-md rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F5D50]">Additional Samples If Needed</h3>
                  <p className="text-gray-600">
                    We'll cover additional samples from our distributor network until you're happy
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="h-16 w-16 bg-white shadow-md rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F5D50]">GUARANTEED</h3>
                  <p className="text-gray-600">
                    "We don't move forward until you love what you're selling."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Payment Options Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#2F5D50]">Launch Now, Pay Later</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Get started today and pay later with our flexible payment options. Launch your hemp brand without breaking the bank.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="h-12 w-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-[#2F5D50]">1</span>
                </div>
                <h3 className="font-bold text-[#2F5D50] mb-2">Flexible Payments</h3>
                <p className="text-gray-600 text-sm">
                  Split your payment into 4 interest-free installments, or finance over 6 to 12 months.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="h-12 w-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-[#2F5D50]">2</span>
                </div>
                <h3 className="font-bold text-[#2F5D50] mb-2">Start Building Now</h3>
                <p className="text-gray-600 text-sm">
                  Launch your hemp business while paying over time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="h-12 w-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-[#2F5D50]">3</span>
                </div>
                <h3 className="font-bold text-[#2F5D50] mb-2">Easy Checkout</h3>
                <p className="text-gray-600 text-sm">
                  Simple and secure process via Stripe.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="h-12 w-12 bg-[#f0f9f6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-[#2F5D50]">4</span>
                </div>
                <h3 className="font-bold text-[#2F5D50] mb-2">Klarna & Afterpay</h3>
                <p className="text-gray-600 text-sm">
                  Multiple payment options available.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Limited Time Offer Section */}
        <section className="py-16 bg-[#2F5D50] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 bg-red-500 text-white font-bold text-sm rounded-full mb-4">
                LIMITED TIME OFFER
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Only Available During This Call</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#C8A951] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Offer expires when this call ends</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#C8A951] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Limited-time opportunity</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#C8A951] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Payment plan available—flexible options</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white text-[#2F5D50] p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-gray-500 line-through mb-1">Regular Price</div>
                    <div className="text-2xl font-bold mb-3">$4,500</div>
                    
                    <div className="text-green-600 font-semibold">Today Only</div>
                    <div className="text-4xl font-bold">$2,999</div>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={openJotForm}
                className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-xl px-10 py-4 shadow-lg"
              >
                Apply Now and Save $1,501
              </Button>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2F5D50]">Let's Launch Your Brand</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#f0f9f6] p-6 rounded-lg">
                  <div className="h-14 w-14 mx-auto bg-[#2F5D50] rounded-full flex items-center justify-center mb-4">
                    <Rocket className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F5D50]">Done-for-you Setup</h3>
                  <p className="text-gray-600">Hassle-free launch</p>
                </div>
                
                <div className="bg-[#f0f9f6] p-6 rounded-lg">
                  <div className="h-14 w-14 mx-auto bg-[#2F5D50] rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F5D50]">Compliant Online Store</h3>
                  <p className="text-gray-600">Attract customers</p>
                </div>
                
                <div className="bg-[#f0f9f6] p-6 rounded-lg">
                  <div className="h-14 w-14 mx-auto bg-[#2F5D50] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#2F5D50]">Guarantee</h3>
                  <p className="text-gray-600">Peace of mind</p>
                </div>
              </div>
              
              <div className="bg-[#2F5D50] text-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Start your hemp business today!</h3>
                <p className="mb-6">
                  Take advantage of this limited-time offer and launch your profitable hemp brand in just 30 days.
                </p>
                
                <Button 
                  onClick={openJotForm}
                  className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold text-lg px-8 py-3"
                >
                  Apply For Your Brand Launch
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleScheduleConsultation = () => {
    window.open('https://form.jotform.com/250775888697180', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5 bg-[url('/hemp-pattern.png')] bg-repeat"></div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2F5D50] mb-6">
              Ready-to-Launch Hemp Business Packages
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Choose the perfect package to start and scale your hemp business with confidence.
              Our all-inclusive solutions handle everything from legal compliance to marketing.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 mx-auto pb-24">
        <Tabs defaultValue="cards" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="cards">Package Cards</TabsTrigger>
              <TabsTrigger value="compare">Compare Features</TabsTrigger>
            </TabsList>
          </div>

          {/* Package Cards View */}
          <TabsContent value="cards" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ecom Starter Package */}
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${selectedPackage === 'ecom' ? 'border-[#2F5D50] ring-4 ring-[#2F5D50]/20' : 'border-transparent'}`}
                onClick={() => setSelectedPackage('ecom')}
              >
                <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-6 text-white">
                  <Badge className="bg-white text-[#2F5D50] mb-3">STARTER</Badge>
                  <h3 className="text-2xl font-bold">Ecom Starter</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">$3,000</span>
                  </div>
                  <p className="mt-3 text-sm text-white/80">
                    Everything you need to start selling hemp products online
                  </p>
                </div>
                <div className="p-6">
                  <ScrollArea className="h-64 pr-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800">E-commerce Website Setup</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            High-converting landing page
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Age verification
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            COA page
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Privacy & accessibility compliance
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Business Formation</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            LLC formation
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Articles of Organization
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            EIN registration
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Operating Agreement
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Compliance & Finance</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Basic potency-only COA
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Sales Tax ID
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Business bank account assistance
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Merchant processor setup
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Starter Design Package</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Logo
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Basic product label design
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#2F5D50]">✓</span>
                            Free product sample
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                <div className="p-6 pt-0">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="w-full bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859]"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              
              {/* Growth Package */}
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${selectedPackage === 'growth' ? 'border-[#C8A951] ring-4 ring-[#C8A951]/20' : 'border-transparent'}`}
                onClick={() => setSelectedPackage('growth')}
              >
                <div className="bg-gradient-to-r from-[#C8A951] to-[#E0C169] p-6 text-white">
                  <Badge className="bg-white text-[#C8A951] mb-3">RECOMMENDED</Badge>
                  <h3 className="text-2xl font-bold">Growth</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">$7,500</span>
                  </div>
                  <p className="mt-3 text-sm text-white/80">
                    Advanced marketing tools + entry into wholesale retail strategies
                  </p>
                </div>
                <div className="p-6">
                  <ScrollArea className="h-64 pr-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-[#C8A951]">Everything in Ecom Starter, PLUS:</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Advanced E-Commerce Setup</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Expert-level website optimization
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Meta-compliant subdomain landing page
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Email & SMS automation
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Wholesale login portal
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Enhanced Compliance</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Full-panel, company-branded COA
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Sales tax planning
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            MSO consultation
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Nationwide compliance guidance
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Upgraded Design & Marketing</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Advanced logo & product packaging design
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Brand book (colors, fonts, guidelines)
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Multiple free samples
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Affiliate marketing system setup
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Meta advertising best practices
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#C8A951]">✓</span>
                            Social media guidance
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                <div className="p-6 pt-0">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="w-full bg-gradient-to-r from-[#C8A951] to-[#E0C169] hover:from-[#B69942] hover:to-[#D1B25A] text-white"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
              
              {/* Accelerator Package */}
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${selectedPackage === 'accelerator' ? 'border-[#3A3A3A] ring-4 ring-[#3A3A3A]/20' : 'border-transparent'}`}
                onClick={() => setSelectedPackage('accelerator')}
              >
                <div className="bg-gradient-to-r from-[#3A3A3A] to-[#555555] p-6 text-white">
                  <Badge className="bg-white text-[#3A3A3A] mb-3">ENTERPRISE</Badge>
                  <h3 className="text-2xl font-bold">Accelerator</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">$19,999</span>
                  </div>
                  <p className="mt-3 text-sm text-white/80">
                    Built to scale your hemp business into a national-level distributor
                  </p>
                </div>
                <div className="p-6">
                  <ScrollArea className="h-64 pr-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-[#3A3A3A]">Everything in Growth, PLUS:</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Backend CRM & Automation</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Custom CRM setup
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Site integration for automation & analytics
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Advanced Business Formation</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            S-Corp setup for tax efficiency
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Form 2553 filing
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Stock issuance
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Custom bylaws
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Enterprise Compliance & Finance</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            State-by-state MSO setup & product verification
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Post-launch compliance support
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            QuickBooks setup (bank integration)
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Payroll system setup
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Full-Service Brand & Marketing</h4>
                        <ul className="mt-2 text-sm text-gray-600 space-y-1">
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Dedicated design expert
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Branded company merchandise
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Brand ambassador recruitment
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Social media ad campaign setup (3 platforms)
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            30-day strategy & lead management
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            2 UGC videos & 6 static creatives
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2 text-[#3A3A3A]">✓</span>
                            Distribution strategy for national networks
                          </li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
                <div className="p-6 pt-0">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="w-full bg-gradient-to-r from-[#3A3A3A] to-[#555555] hover:from-[#2B2B2B] hover:to-[#464646]"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Comparison Table View */}
          <TabsContent value="compare" className="w-full">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="py-4 px-6 text-left text-lg font-medium text-gray-800 border-b">Features</th>
                      <th className="py-4 px-6 text-center border-b bg-[#f3f9f8]">
                        <div className="text-[#2F5D50] font-bold">Ecom Starter</div>
                        <div className="text-lg font-bold">$3,000</div>
                      </th>
                      <th className="py-4 px-6 text-center border-b bg-[#fcf9ef]">
                        <div className="text-[#C8A951] font-bold">Growth</div>
                        <div className="text-lg font-bold">$7,500</div>
                      </th>
                      <th className="py-4 px-6 text-center border-b bg-[#f4f4f4]">
                        <div className="text-[#3A3A3A] font-bold">Accelerator</div>
                        <div className="text-lg font-bold">$19,999</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Website & E-commerce</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">High-converting landing page</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Age verification</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Expert-level website optimization</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Meta-compliant subdomain</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Wholesale portal</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Custom CRM integration</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Business Formation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">LLC formation</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">S-Corp setup</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Compliance</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">COA setup</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">Basic</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Full-panel</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Full-panel</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Multi-state operation</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Consultation</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Full setup</td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Design & Marketing</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Logo design</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">Basic</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Advanced</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Premium</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Product samples</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">1</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Multiple</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Multiple</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Social media campaigns</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Guidance</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Full setup</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Video content</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#2F5D50] mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How long does it take to launch my hemp business?</h3>
              <p className="text-gray-600">With our Ecom Starter package, you can expect to launch within 30 days. The Growth and Accelerator packages may take 45-60 days depending on the complexity of your specific requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Do I need to provide my own products?</h3>
              <p className="text-gray-600">No, we'll help you source high-quality hemp products from our network of trusted manufacturers. Each package includes product samples to help you make informed decisions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What ongoing support do you provide?</h3>
              <p className="text-gray-600">All packages include initial launch support. The Growth package adds ongoing compliance guidance, while the Accelerator package includes comprehensive post-launch support for compliance, marketing, and business operations.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-10 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Hemp Empire?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to discuss which package is right for your business goals. Our hemp industry experts will guide you through every step of the process.
            </p>
            <Button 
              onClick={handleScheduleConsultation}
              className="bg-white text-[#2F5D50] hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            >
              Schedule Your Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
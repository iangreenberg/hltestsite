import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleScheduleConsultation = () => {
    window.open('https://form.jotform.com/250775888697180', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Centered */}
      <div className="bg-white shadow-sm">
        <div className="container px-4 py-8 mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2F5D50]">
              Hemp Business Packages
            </h1>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
              Turnkey solutions for launching and scaling your hemp business
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 mx-auto py-8">
        <Tabs defaultValue="cards" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-0">
              <TabsTrigger value="cards">Package Cards</TabsTrigger>
              <TabsTrigger value="compare">Compare Features</TabsTrigger>
            </TabsList>
          </div>

          {/* Package Cards View */}
          <TabsContent value="cards" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Ecom Starter Package */}
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${selectedPackage === 'ecom' ? 'border-[#2F5D50] ring-4 ring-[#2F5D50]/20' : 'border-transparent'}`}
                onClick={() => setSelectedPackage('ecom')}
              >
                <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-4 text-white">
                  <Badge className="bg-white text-[#2F5D50] mb-2">STARTER</Badge>
                  <h3 className="text-xl font-bold">Ecom Starter</h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-bold">$4,500</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    Everything needed to start selling hemp products online
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">All Features</h4>
                      <ul className="mt-1 text-base font-medium text-gray-700 space-y-4">
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Ecommerce Website</p>
                            <p>Complete with age verification</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Lab Results Page</p>
                            <p>Basic template for COAs</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Privacy Policies</p>
                            <p>Legally compliant documents</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">3PL Services Guidance</p>
                            <p>Fulfillment options & setup</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">LLC Formation</p>
                            <p>Complete business structure</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">EIN Setup</p>
                            <p>Federal tax ID registration</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Business Documents</p>
                            <p>Articles & Operating Agreement</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Basic Compliance</p>
                            <p>Lab results, Sales Tax ID</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Banking Setup</p>
                            <p>Account & processor integration</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#2F5D50] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Starter Branding</p>
                            <p>Logo + product label design</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-2">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="w-full bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              
              {/* Growth Package */}
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${selectedPackage === 'growth' ? 'border-[#C8A951] ring-4 ring-[#C8A951]/20' : 'border-transparent'}`}
                onClick={() => setSelectedPackage('growth')}
              >
                <div className="bg-gradient-to-r from-[#C8A951] to-[#E0C169] p-4 text-white">
                  <Badge className="bg-white text-[#C8A951] mb-2">RECOMMENDED</Badge>
                  <h3 className="text-xl font-bold">Growth</h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-bold">$9,999</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    Advanced tools for marketing and wholesale readiness
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#C8A951]">Everything in Ecom Starter, PLUS:</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">All Features</h4>
                      <ul className="mt-1 text-base font-medium text-gray-700 space-y-4">
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Pro Website Optimization</p>
                            <p>With ad-compliant landing page</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Email & SMS Automation</p>
                            <p>Complete marketing flows</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Wholesale Portal</p>
                            <p>B2B sales system for retailers</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Affiliate Program</p>
                            <p>Setup + Meta ad best practices</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Full-Panel Lab Results</p>
                            <p>Branded laboratory certificates</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Tax Strategy</p>
                            <p>Multi-state operation consultation</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Accounting Consultation</p>
                            <p>Income tax planning & strategy</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#C8A951] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Enhanced Branding</p>
                            <p>Brand book + premium packaging</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-2">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="w-full bg-gradient-to-r from-[#C8A951] to-[#E0C169] hover:from-[#B69942] hover:to-[#D1B25A] text-white"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              
              {/* Accelerator Package */}
              <div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${selectedPackage === 'accelerator' ? 'border-[#3A3A3A] ring-4 ring-[#3A3A3A]/20' : 'border-transparent'}`}
                onClick={() => setSelectedPackage('accelerator')}
              >
                <div className="bg-gradient-to-r from-[#3A3A3A] to-[#555555] p-4 text-white">
                  <Badge className="bg-white text-[#3A3A3A] mb-2">ENTERPRISE</Badge>
                  <h3 className="text-xl font-bold">Accelerator</h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-2xl font-bold">$19,999</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    Built to scale into a national-level distributor
                  </p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-[#3A3A3A]">Everything in Growth, PLUS:</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">All Features</h4>
                      <ul className="mt-1 text-base font-medium text-gray-700 space-y-4">
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Custom CRM System</p>
                            <p>Advanced automation workflows</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">S-Corporation Setup</p>
                            <p>Stock issuance & corporate bylaws</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Multi-State Operations</p>
                            <p>Complete MSO setup & verification</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Financial Systems</p>
                            <p>QuickBooks + payroll integration</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Dedicated Design Expert</p>
                            <p>Custom merchandise & packaging</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Complete Marketing System</p>
                            <p>30-day launch: UGC & campaigns</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Brand Ambassador Program</p>
                            <p>Influencer outreach & management</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-[#3A3A3A] font-bold">•</span>
                          <div>
                            <p className="font-semibold">Distribution Strategy</p>
                            <p>National-level growth planning</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-2">
                  <Button 
                    onClick={handleScheduleConsultation}
                    className="w-full bg-gradient-to-r from-[#3A3A3A] to-[#555555] hover:from-[#2B2B2B] hover:to-[#464646] text-white"
                  >
                    Get Started
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
                        <div className="text-lg font-bold">$4,500</div>
                      </th>
                      <th className="py-4 px-6 text-center border-b bg-[#fcf9ef]">
                        <div className="text-[#C8A951] font-bold">Growth</div>
                        <div className="text-lg font-bold">$9,999</div>
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
                      <td className="py-3 px-6 border-b">Ecommerce website with age gate</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8] font-bold text-green-600">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef] font-bold text-green-600">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4] font-bold text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Lab results page</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">Basic</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Full-panel</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Full-panel</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Website optimization</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">Basic</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Expert</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Premium</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Ad-compliant landing page</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef] font-bold text-green-600">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4] font-bold text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Email & automation</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Email + SMS</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4] font-bold text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Wholesale/CRM features</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Portal</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Custom CRM</td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Business Formation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Business formation</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">LLC + EIN</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">LLC + EIN</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">S-Corp</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Accounting setup</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Consult</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">QB + Payroll</td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Compliance</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Bank account & processor setup</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8] font-bold text-green-600">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef] font-bold text-green-600">✓</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4] font-bold text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Multi-state compliance</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">MSO consult</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Full setup</td>
                    </tr>
                    
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="py-3 px-6 font-medium text-gray-800">Design & Marketing</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Branding package</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">Basic</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Brand book</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Premium</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Product samples</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">1 design</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Multiple</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Multiple + merch</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Marketing system</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">Affiliate setup</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4]">Full 30-day</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-6 border-b">Ambassador program</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f3f9f8]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#fcf9ef]">-</td>
                      <td className="py-3 px-6 text-center border-b bg-[#f4f4f4] font-bold text-green-600">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-6 md:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to Start Your Hemp Empire?</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Schedule a free consultation to discuss which package is right for your business goals.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={handleScheduleConsultation}
                className="bg-white text-[#2F5D50] hover:bg-gray-100 px-3 py-2 sm:px-6 text-sm sm:text-lg font-semibold max-w-[300px] mx-auto w-full"
              >
                Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
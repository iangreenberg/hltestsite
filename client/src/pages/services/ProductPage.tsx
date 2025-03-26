import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ProductPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6">Premium Hemp Product Development</h1>
            <p className="text-xl text-gray-700 mb-8">
              From concept to shelf-ready products, we handle every step of creating distinctive, 
              high-quality hemp products that consumers love and trust.
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
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-6">Creating Exceptional Hemp Products</h2>
          <p className="text-lg text-gray-700 mb-6">
            The success of your hemp business starts with exceptional products. We combine scientific expertise, 
            market knowledge, and production experience to create premium hemp products that stand out in a competitive marketplace.
          </p>
          <p className="text-lg text-gray-700">
            Our end-to-end product development services cover everything from initial formulation to packaging design, 
            ensuring that every aspect of your product meets the highest standards of quality, compliance, and consumer appeal.
          </p>
        </div>

        {/* Product Development Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-10 text-center">Our Product Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-4">Concept & Strategy</h3>
                <p className="text-gray-600 mb-4">
                  We begin by understanding your vision and target market to develop a product strategy that aligns with your business goals.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Market research and trend analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Target customer profiling</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Competitive landscape assessment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Product positioning strategy</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="#2F5D50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-4">Formulation & Prototyping</h3>
                <p className="text-gray-600 mb-4">
                  Our expert formulators develop and refine product formulations that deliver the desired experience and efficacy.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Custom formulation development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Ingredient sourcing and evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Prototype creation and testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Stability and shelf-life testing</span>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 z-10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="#2F5D50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#2F5D50] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-4">Production & Packaging</h3>
                <p className="text-gray-600 mb-4">
                  We manage the manufacturing process and create packaging that protects your product and attracts consumers.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Manufacturing partner selection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Quality control protocols</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Packaging design and production</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2F5D50] mr-2">✓</span>
                    <span>Compliance and testing verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Our Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-10 text-center">Product Categories We Develop</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Tinctures & Oils</h3>
              <p className="text-gray-600 mb-4">
                Premium sublingual products designed for precise dosing and rapid absorption.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Full-spectrum, broad-spectrum, and isolate formulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Flavored and unflavored options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Various potency levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Organic and natural ingredient options</span>
                </li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Edibles & Gummies</h3>
              <p className="text-gray-600 mb-4">
                Delicious, precisely dosed edible products that combine enjoyment with effectiveness.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Gummies in various shapes and flavors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Specialty chocolates and confections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Baked goods and snacks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Specialty formulations (sleep, energy, etc.)</span>
                </li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Topicals & Skincare</h3>
              <p className="text-gray-600 mb-4">
                Targeted relief and skincare solutions that combine hemp extracts with effective ingredients.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Relief balms and salves</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Luxurious lotions and creams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Facial serums and treatments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Bath and body products</span>
                </li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Capsules & Tablets</h3>
              <p className="text-gray-600 mb-4">
                Convenient, precise formulations for those who prefer traditional supplement formats.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Soft gels and capsules</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Tablets and compressed formulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Specialty blends with supporting ingredients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Extended-release formulations</span>
                </li>
              </ul>
            </div>

            {/* Category 5 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Beverages & Drink Mixes</h3>
              <p className="text-gray-600 mb-4">
                Innovative hemp-infused beverage solutions for the rapidly growing functional drink market.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Ready-to-drink beverages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Powdered drink mixes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Flavor concentrates and syrups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Functional beverages with added benefits</span>
                </li>
              </ul>
            </div>

            {/* Category 6 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#f2f7f6] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pet Products</h3>
              <p className="text-gray-600 mb-4">
                Specially formulated products to support the health and wellness of pets.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Pet tinctures and oils</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Treats and chews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Topical pet formulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#2F5D50] mr-2">✓</span>
                  <span>Age and breed-specific formulations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-[#f2f7f6] p-8 md:p-12 rounded-2xl mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2F5D50] mb-6">Our Quality Commitment</h2>
            <p className="text-lg text-gray-700 mb-8">
              We maintain rigorous quality standards throughout the product development process to ensure that every product 
              we create is safe, effective, and consistent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Ingredient Sourcing</h3>
                <p className="text-gray-700">
                  We use only premium, traceable ingredients and hemp extracts that meet our strict quality criteria.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Testing Protocols</h3>
                <p className="text-gray-700">
                  Multiple testing stages ensure purity, potency, and safety of all formulations and finished products.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Manufacturing Standards</h3>
                <p className="text-gray-700">
                  All production facilities adhere to cGMP standards and are regularly audited for compliance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Continuous Improvement</h3>
                <p className="text-gray-700">
                  We continuously evaluate and refine our formulations based on new research and customer feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Develop Your Hemp Products?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Whether you have a specific product in mind or need guidance on what would work best for your brand, 
            our product development team is ready to help.
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
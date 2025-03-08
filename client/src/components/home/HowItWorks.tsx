import { Link } from "wouter";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Free Consultation & Business Strategy",
      description: "We'll discuss your vision, goals, and timeline to create a customized roadmap for your hemp-derived THC business launch."
    },
    {
      number: 2,
      title: "Legal Formation & Compliance",
      description: "We handle your LLC formation, EIN registration, and bank account setup while ensuring full compliance with current regulations."
    },
    {
      number: 3,
      title: "Brand Development & Web Design",
      description: "Our creative team develops your brand identity, logo, packaging design, and professional website to establish market presence."
    },
    {
      number: 4,
      title: "Product Manufacturing & Samples",
      description: "We connect you with vetted manufacturers, guide product development, and create samples with your branding applied."
    },
    {
      number: 5,
      title: "Launch & Ongoing Support",
      description: "We manage fulfillment logistics, implement targeted Meta Ads campaigns, and provide ongoing business support to ensure success."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C8A951] font-semibold">OUR PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">How It Works</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our streamlined process takes you from initial concept to market-ready business with expert guidance every step of the way.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#2F5D50] bg-opacity-20"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:even:flex-row-reverse items-center md:space-x-4 ${index % 2 === 0 ? '' : 'md:even:space-x-reverse'} mb-12`}>
                <div className={`md:w-5/12 mb-6 md:mb-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} md:even:text-left`}>
                  <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <span className="text-[#C8A951] font-bold">STEP {step.number}</span>
                    <h3 className="text-xl font-bold font-montserrat mt-2 mb-3 text-[#2F5D50]">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-center z-10 w-12 h-12 rounded-full bg-[#2F5D50] text-white font-bold">
                  {step.number}
                </div>
                
                <div className="md:w-5/12"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/contact" className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
              Start Your Journey Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

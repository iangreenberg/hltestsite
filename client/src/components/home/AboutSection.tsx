import { Link } from "wouter";

export default function AboutSection() {
  const stats = [
    { value: "100+", label: "Successful brand launches" },
    { value: "8 weeks", label: "Average time to market" },
    { value: "10+", label: "Years of industry experience" },
    { value: "96%", label: "Client satisfaction rate" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Our team collaborating" 
              className="rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <span className="text-[#C8A951] font-semibold">ABOUT US</span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 mb-6 text-[#2F5D50]">
              We're Your Partners in Hemp Business Success
            </h2>
            <p className="text-gray-700 mb-6">
              HempLaunch was founded by a team of industry experts who recognized the challenges entrepreneurs face when entering the hemp-derived THC market. Our mission is to simplify the business launch process by providing comprehensive, done-for-you services that handle every aspect of building a successful brand.
            </p>
            <p className="text-gray-700 mb-8">
              With backgrounds in legal compliance, branding, manufacturing, and digital marketing specifically for the hemp industry, our team offers unparalleled expertise to guide you through every step of your business journey.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#2F5D50] mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/contact" className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                Work With Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

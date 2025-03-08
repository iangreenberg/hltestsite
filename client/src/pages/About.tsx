import { Helmet } from "react-helmet";

export default function About() {
  const teamMembers = [
    {
      name: "John Martinez",
      position: "Legal & Compliance Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Emily Wilson",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
    },
    {
      name: "Daniel Chen",
      position: "Manufacturing Specialist",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Alexandra Park",
      position: "Marketing Strategist",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | HempLaunch</title>
        <meta 
          name="description" 
          content="Meet our team of industry experts who help entrepreneurs successfully launch and grow hemp-derived THC businesses."
        />
      </Helmet>
      <main>
        <section className="py-20 bg-white">
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
                <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 mb-6 text-[#2F5D50]">
                  We're Your Partners in Hemp Business Success
                </h1>
                <p className="text-gray-700 mb-6">
                  HempLaunch was founded by a team of industry experts who recognized the challenges entrepreneurs face when entering the hemp-derived THC market. Our mission is to simplify the business launch process by providing comprehensive, done-for-you services that handle every aspect of building a successful brand.
                </p>
                <p className="text-gray-700 mb-8">
                  With backgrounds in legal compliance, branding, manufacturing, and digital marketing specifically for the hemp industry, our team offers unparalleled expertise to guide you through every step of your business journey.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2F5D50] mb-2">100+</div>
                    <p className="text-gray-600">Successful brand launches</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2F5D50] mb-2">8 weeks</div>
                    <p className="text-gray-600">Average time to market</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2F5D50] mb-2">10+</div>
                    <p className="text-gray-600">Years of industry experience</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2F5D50] mb-2">96%</div>
                    <p className="text-gray-600">Client satisfaction rate</p>
                  </div>
                </div>
                
                <a href="/contact" className="bg-[#2F5D50] hover:bg-[#264A40] text-white font-semibold py-3 px-8 rounded-md shadow inline-block hover:shadow-lg transition-all">
                  Work With Our Team
                </a>
              </div>
            </div>
            
            <div className="mt-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold font-montserrat text-[#2F5D50]">Meet Our Experts</h2>
                <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                  Our specialized team brings together all the skills needed to launch and grow your hemp-derived THC business.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-4 relative rounded-lg overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={`${member.name} portrait`}
                        className="w-full h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-[#2F5D50] bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex space-x-4">
                          <a href="#" className="text-white hover:text-[#C8A951]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                          <a href="#" className="text-white hover:text-[#C8A951]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat text-[#2F5D50]">{member.name}</h3>
                    <p className="text-[#C8A951] font-medium">{member.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

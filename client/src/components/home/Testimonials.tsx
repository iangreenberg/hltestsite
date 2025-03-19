import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Working with HempLaunch was the best business decision I've made. They handled everything from legal setup to manufacturing connections, and I was able to launch my brand in just 8 weeks. Their expertise saved me countless hours and potential mistakes.",
      name: "Michael J.",
      position: "Founder, Green Elevation",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      quote: "The branding and website they created for my hemp business exceeded my expectations. Their Meta Ads expertise helped us reach our target audience effectively. I went from concept to selling products in under 3 months. Highly recommend their all-in-one solution.",
      name: "Sarah L.",
      position: "CEO, Calm Collective",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
    },
    {
      quote: "As someone with no prior experience in the hemp industry, I was overwhelmed by all the moving parts. HempLaunch simplified everything and guided me through each step. Their manufacturer connections and fulfillment solutions saved me countless headaches.",
      name: "David R.",
      position: "Owner, Sunrise Hemp Co.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C8A951] font-semibold">SUCCESS STORIES</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">What Our Clients Say</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Hear from entrepreneurs who have successfully launched their hemp businesses with our help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#C8A951] fill-current" />
                ))}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} portrait`} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold font-montserrat text-[#2F5D50]">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

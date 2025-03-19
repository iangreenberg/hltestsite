import { Link } from "wouter";
import CalendlyQualifier from "@/components/common/CalendlyQualifier";

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(47, 93, 80, 0.9), rgba(47, 93, 80, 0.8)), url('https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-3 py-1 bg-[#C8A951] rounded-full text-[#2F5D50] text-sm font-semibold">
            Limited Spots Available
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight mb-6">
            Turnkey Hemp Business Solutions
          </h1>
          <p className="text-xl md:text-2xl font-opensans mb-8 max-w-2xl">
            From entity formation to product launch—start your brand with zero hassle. We handle everything so you can focus on growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CalendlyQualifier 
              buttonText="Schedule Your Free Consultation" 
              buttonClassName="bg-gradient-to-r from-[#C8A951] to-[#D9BC6A] text-[#2F5D50] font-bold"
            />
            <Link href="/services" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-8 rounded-md transition-all text-center">
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

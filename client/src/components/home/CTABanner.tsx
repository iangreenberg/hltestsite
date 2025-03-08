import { Link } from "wouter";

export default function CTABanner() {
  return (
    <section className="py-16 bg-[#2F5D50]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-6">
          Ready to Launch Your Hemp-Derived THC Brand?
        </h2>
        <p className="text-white text-lg mb-8 max-w-3xl mx-auto">
          Join the waitlist today for our all-in-one business launch service. Limited spots available for our next cohort of entrepreneurs.
        </p>
        <Link href="/contact" className="bg-gradient-to-r from-[#C8A951] to-[#D9BC6A] text-[#2F5D50] font-bold py-3 px-8 rounded-md shadow-md hover:shadow-lg transition-all inline-block">
          Join the Waitlist Now
        </Link>
        <p className="text-white text-sm mt-4 opacity-80">
          No obligation. Free consultation call to discuss your business goals.
        </p>
      </div>
    </section>
  );
}

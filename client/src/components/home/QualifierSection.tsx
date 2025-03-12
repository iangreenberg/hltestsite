import TimelineQualifier from "../common/TimelineQualifier";

export default function QualifierSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#C8A951] font-semibold">START YOUR JOURNEY</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
            Qualify for a Free Consultation
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            See if you're a good fit for our all-in-one hemp-derived THC business solutions.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <TimelineQualifier
            buttonText="Start Qualification Process"
            buttonClassName="w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 border-2 border-[#C8A951]"
          />
        </div>
      </div>
    </section>
  );
}
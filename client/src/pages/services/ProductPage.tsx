import { Link } from "wouter";
import { Package, Beaker, CheckCircle, ArrowRightLeft, Tag, Box } from "lucide-react";
import CalendlyButton from "@/components/common/CalendlyButton";

export default function ProductPage() {
  // Product development process steps
  const processSteps = [
    {
      title: "Formulation",
      description: "Working with labs to create unique product formulas with specific cannabinoid profiles and effects.",
      icon: <Beaker className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Testing",
      description: "Comprehensive product testing for potency, safety, stability, and compliance with regulations.",
      icon: <CheckCircle className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Production",
      description: "Scaling your formula with trusted manufacturing partners for consistent, high-quality products.",
      icon: <ArrowRightLeft className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Packaging",
      description: "Creating compliant, branded packaging that stands out on shelves and protects product integrity.",
      icon: <Box className="h-10 w-10 text-[#2F5D50]" />
    },
    {
      title: "Labeling",
      description: "Designing legally compliant labels with proper disclosures, ingredients, and usage instructions.",
      icon: <Tag className="h-10 w-10 text-[#2F5D50]" />
    }
  ];

  // Product categories
  const productCategories = [
    {
      name: "Tinctures & Oils",
      features: ["Custom formulations", "Various carrier oils", "Multiple potency options", "Flavor development"]
    },
    {
      name: "Edibles",
      features: ["Gummies", "Chocolates", "Baked goods", "Beverages"]
    },
    {
      name: "Topicals",
      features: ["Creams", "Lotions", "Balms", "Roll-ons"]
    },
    {
      name: "Capsules & Tablets",
      features: ["Softgels", "Capsules", "Tablets", "Time-release formulas"]
    },
    {
      name: "Flower & Pre-rolls",
      features: ["Multiple strains", "Custom blends", "Various sizes", "Premium packaging"]
    },
    {
      name: "Vape Products",
      features: ["Cartridges", "Disposables", "Custom hardware", "Specialized formulas"]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hemp Product Development
              </h1>
              <p className="text-xl mb-8">
                From concept to shelf-ready products, we develop premium hemp formulations tailored to your brand vision and market demands.
              </p>
              <CalendlyButton
                text="Discuss Your Product Ideas"
                size="lg"
                className="bg-[#C8A951] hover:bg-[#D9BA62] text-white"
              />
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-full shadow-xl">
                <Package className="h-32 w-32 text-[#2F5D50]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl py-16 px-4">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-6 text-center">
            Our Product Development Process
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-12">
            We handle every aspect of creating market-ready hemp products, from initial formulation through production and packaging.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2F5D50] mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
            Product Categories We Develop
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-[#2F5D50] mb-4">{category.name}</h3>
                <ul className="space-y-2">
                  {category.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-8 text-center">
            Why Choose Our Product Development Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Expert Formulation</h3>
              <p className="text-gray-700 mb-4">
                Our team includes experienced chemists and formulators who specialize in hemp-derived products, ensuring your products are effective and differentiated in the market.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Proprietary formulations unique to your brand</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Terpene profiles for targeted effects</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Stability and shelf-life optimization</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Compliant Manufacturing</h3>
              <p className="text-gray-700 mb-4">
                All products are manufactured in cGMP-compliant facilities with strict quality control procedures and full regulatory compliance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>cGMP certified manufacturing partners</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive COA testing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Batch tracking and quality assurance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Scalable Production</h3>
              <p className="text-gray-700 mb-4">
                Start with small production runs and scale up as your business grows, with manufacturing partners capable of meeting increased demand.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Flexible minimum order quantities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consistent product quality at any scale</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Supply chain management</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-[#2F5D50] mb-4">Branded Packaging</h3>
              <p className="text-gray-700 mb-4">
                Create packaging that enhances your brand identity while ensuring product protection, compliance, and shelf appeal.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Custom packaging design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Child-resistant options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Eco-friendly packaging solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-xl border border-gray-200 text-center">
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-4">
            Ready to Develop Your Hemp Product Line?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            Our product development team will help you create unique, high-quality hemp products that align with your brand vision and attract customers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CalendlyButton
              text="Schedule a Product Development Consultation"
              size="lg"
              className="bg-[#2F5D50] hover:bg-[#264A40] text-white"
            />
            <Link href="/packages" className="inline-flex items-center justify-center px-6 py-3 border border-[#2F5D50] text-[#2F5D50] font-medium rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F5D50]">
              View Our Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
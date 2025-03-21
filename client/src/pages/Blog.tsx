import { Helmet } from "react-helmet";

export default function Blog() {
  const blogPosts = [
    {
      title: "2023 Farm Bill Updates: What Hemp Businesses Need to Know",
      excerpt: "The latest regulatory changes in the 2023 Farm Bill and how they impact the legal landscape for hemp products across state lines.",
      category: "Compliance",
      date: "March 2, 2024",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "5 Effective Meta Ads Strategies That Work for Hemp Products",
      excerpt: "Detailed case studies and proven approaches to navigating Meta's advertising policies while creating compliant, high-converting campaigns for your hemp business.",
      category: "Marketing",
      date: "February 15, 2024",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "LLC vs. Corporation: Choosing the Right Legal Structure for Hemp Businesses",
      excerpt: "A comprehensive analysis of liability protection, tax implications, and operational flexibility for different business entities in the hemp industry.",
      category: "Business Setup",
      date: "January 28, 2024",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Quality Control: Vetting Hemp Product Manufacturers",
      excerpt: "Step-by-step guidance on evaluating manufacturing partners, understanding COAs, and implementing quality control processes to ensure consistent product standards.",
      category: "Manufacturing",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Brand Differentiation Strategies in the Competitive Hemp Market",
      excerpt: "How successful hemp brands are creating unique positioning, storytelling, and visual identities to stand out in an increasingly saturated marketplace.",
      category: "Branding",
      date: "December 15, 2023",
      image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Navigating Payment Processing for Hemp Ecommerce",
      excerpt: "The latest solutions for reliable payment processing, shipping strategies, and platform recommendations specifically designed for hemp product businesses.",
      category: "Ecommerce",
      date: "November 28, 2023",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];
  
  const categories = ["All", "Compliance", "Marketing", "Business Setup", "Manufacturing", "Branding", "Ecommerce"];

  return (
    <>
      <Helmet>
        <title>Blog | HempLaunch</title>
        <meta 
          name="description" 
          content="Industry insights, tips, and guidance for hemp business owners and entrepreneurs."
        />
      </Helmet>
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#C8A951] font-semibold">OUR BLOG</span>
              <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">
                Latest Industry Insights
              </h1>
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                Stay informed with our expert guidance on hemp business trends, compliance updates, and marketing strategies.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${index === 0 ? 'bg-[#2F5D50] text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <a href="#" className="group" key={index}>
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                    <img 
                      src={post.image} 
                      alt={`${post.title} featured image`}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="bg-[#2F5D50] text-white text-xs font-semibold px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold font-montserrat text-[#2F5D50] mb-2 group-hover:text-[#C8A951] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-[#C8A951] font-semibold">
                        Read More 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-1">
                <a href="#" className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
                  Previous
                </a>
                <a href="#" className="px-4 py-2 rounded bg-[#2F5D50] text-white">
                  1
                </a>
                <a href="#" className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
                  2
                </a>
                <a href="#" className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
                  3
                </a>
                <a href="#" className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
                  Next
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import { Helmet } from "react-helmet";

export default function Blog() {
  const blogPosts = [
    {
      title: "2023 Regulatory Updates for Hemp-Derived THC Products",
      excerpt: "Stay compliant with the latest federal and state regulations affecting the hemp-derived THC industry.",
      category: "Compliance",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "5 Effective Meta Ads Strategies for Hemp-Derived Products",
      excerpt: "Learn how to navigate ad policies and create compliant, high-converting campaigns for your products.",
      category: "Marketing",
      date: "May 28, 2023",
      image: "https://images.unsplash.com/photo-1606636660801-c061598d4386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Choosing the Right Legal Structure for Your Hemp THC Business",
      excerpt: "Explore the pros and cons of different business entities when setting up your hemp-derived THC company.",
      category: "Business Setup",
      date: "May 10, 2023",
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "How to Source Quality Hemp-Derived THC Products for Your Brand",
      excerpt: "A comprehensive guide to finding reliable manufacturers and ensuring product quality.",
      category: "Manufacturing",
      date: "April 22, 2023",
      image: "https://images.unsplash.com/photo-1523246224990-496e9a87113e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Building a Memorable Brand in the Crowded Hemp Market",
      excerpt: "Differentiation strategies to help your hemp-derived THC brand stand out from competitors.",
      category: "Branding",
      date: "April 5, 2023",
      image: "https://images.unsplash.com/photo-1606636660195-3ce53ba54019?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Understanding Ecommerce Options for Hemp-Derived THC Products",
      excerpt: "Navigate payment processing, shipping logistics, and platform selection for your online store.",
      category: "Ecommerce",
      date: "March 18, 2023",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];
  
  const categories = ["All", "Compliance", "Marketing", "Business Setup", "Manufacturing", "Branding", "Ecommerce"];

  return (
    <>
      <Helmet>
        <title>Blog | HempLaunch</title>
        <meta 
          name="description" 
          content="Industry insights, tips, and guidance for hemp-derived THC business owners and entrepreneurs."
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
                Stay informed with our expert guidance on hemp-derived THC business trends, compliance updates, and marketing strategies.
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

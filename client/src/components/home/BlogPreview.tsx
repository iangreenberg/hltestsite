import { Link } from "wouter";

export default function BlogPreview() {
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
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#C8A951] font-semibold">OUR BLOG</span>
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mt-2 text-[#2F5D50]">Latest Industry Insights</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Stay informed with our expert guidance on hemp business trends, compliance updates, and marketing strategies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Link href="/blog" key={index} className="group">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                <img 
                  src={post.image} 
                  alt={`${post.title} featured image`} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-[#2F5D50] text-white text-xs font-semibold px-2 py-1 rounded">{post.category}</span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-[#2F5D50] mb-2 group-hover:text-[#C8A951] transition-colors">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-[#C8A951] font-semibold">
                    Read More 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/blog" className="text-[#2F5D50] font-semibold border-2 border-[#2F5D50] py-3 px-8 rounded-md inline-block hover:bg-[#2F5D50] hover:text-white transition-colors">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

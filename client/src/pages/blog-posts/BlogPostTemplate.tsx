import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { useEffect } from "react";

interface BlogPostTemplateProps {
  title: string;
  date: string;
  category: string;
  coverImage: string;
  content: React.ReactNode;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  tags?: string[];
  relatedPosts?: {
    title: string;
    slug: string;
    image: string;
    date: string;
  }[];
}

export default function BlogPostTemplate({
  title,
  date,
  category,
  coverImage,
  content,
  authorName = "HempLaunch Team",
  authorTitle = "Hemp Industry Experts",
  authorImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  tags = ["Hemp", "Business"],
  relatedPosts = []
}: BlogPostTemplateProps) {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{title} | HempLaunch Blog</title>
        <meta 
          name="description" 
          content={`${title} - Get expert insights and guidance on hemp business topics from HempLaunch.`}
        />
      </Helmet>
      <main className="bg-white">
        {/* Hero Section */}
        <div className="w-full h-96 relative bg-gradient-to-r from-gray-900 to-gray-700">
          <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${coverImage})` }}></div>
          <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
            <div className="text-center max-w-3xl">
              <div className="mb-4">
                <Link href="/blog">
                  <span className="inline-flex items-center text-white hover:text-[#C8A951] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                  </span>
                </Link>
              </div>
              <span className="bg-[#2F5D50] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 font-montserrat">
                {title}
              </h1>
              <div className="mt-6 text-gray-100 flex items-center justify-center">
                <span>{date}</span>
                <span className="mx-2">•</span>
                <span>10 min read</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <img 
                src={authorImage} 
                alt={authorName}
                className="h-12 w-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900">{authorName}</div>
                <div className="text-sm text-gray-600">{authorTitle}</div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {content}
            </div>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post, index) => (
                  <Link href={post.slug} key={index}>
                    <a className="group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-[#2F5D50] mb-2 group-hover:text-[#C8A951] transition-colors">
                            {post.title}
                          </h3>
                          <div className="text-sm text-gray-500">{post.date}</div>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] rounded-xl p-8 md:p-12 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Launch Your Hemp Business?</h3>
              <p className="mb-6 text-gray-100">Get personalized guidance on compliance, product development, and marketing with our expert team.</p>
              <button 
                onClick={() => window.open('https://form.jotform.com/250775888697180', '_blank')}
                className="bg-white text-[#2F5D50] px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Schedule a Free Consultation
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-[#2F5D50] text-xl font-bold font-montserrat">Hemp<span className="text-[#C8A951]">Launch</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-8">
            <Link 
              href="/" 
              className={`${isActive('/') ? 'text-[#2F5D50]' : 'text-gray-800'} font-semibold font-opensans hover:text-[#C8A951] transition-colors`}
            >
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative inline-block" ref={servicesMenuRef}>
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`${isActive('/services') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors inline-flex items-center`}
              >
                Services
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={servicesOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white z-10 py-2">
                  <Link 
                    href="/services/compliance" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2F5D50]"
                  >
                    Compliance Services
                  </Link>
                  <Link 
                    href="/services/product-development" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2F5D50]"
                  >
                    Product Development
                  </Link>
                  <Link 
                    href="/services/brand-development" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2F5D50]"
                  >
                    Brand Development
                  </Link>
                  <div className="border-t my-1 border-gray-200"></div>
                  <Link 
                    href="/services" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#2F5D50]"
                  >
                    All Services
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/packages" 
              className={`${isActive('/packages') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors`}
            >
              Packages
            </Link>
            <Link 
              href="/how-it-works" 
              className={`${isActive('/how-it-works') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors`}
            >
              How It Works
            </Link>
            <Link 
              href="/about" 
              className={`${isActive('/about') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors`}
            >
              About Us
            </Link>
            <Link 
              href="/blog" 
              className={`${isActive('/blog') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive('/contact') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors`}
            >
              Contact
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden xl:block">
            <button 
              onClick={() => window.open('https://form.jotform.com/250775888697180', '_blank')}
              className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold text-sm py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all whitespace-nowrap"
            >
              Schedule Free Consultation
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-gray-800 hover:text-[#2F5D50]" 
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`xl:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <Link href="/" className="block py-2 text-gray-800 hover:text-[#2F5D50]">Home</Link>
          
          {/* Mobile Services Menu */}
          <div>
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`flex items-center justify-between w-full py-2 ${isActive('/services') ? 'text-[#2F5D50]' : 'text-gray-800'} hover:text-[#2F5D50]`}
            >
              <span>Services</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileServicesOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            
            {mobileServicesOpen && (
              <div className="pl-4 border-l-2 border-gray-200 ml-2 mt-1 mb-2">
                <Link 
                  href="/services/compliance" 
                  className="block py-2 text-gray-700 hover:text-[#2F5D50]"
                >
                  Compliance Services
                </Link>
                <Link 
                  href="/services/product-development" 
                  className="block py-2 text-gray-700 hover:text-[#2F5D50]"
                >
                  Product Development
                </Link>
                <Link 
                  href="/services/brand-development" 
                  className="block py-2 text-gray-700 hover:text-[#2F5D50]"
                >
                  Brand Development
                </Link>
                <Link 
                  href="/services" 
                  className="block py-2 text-gray-700 hover:text-[#2F5D50]"
                >
                  All Services
                </Link>
              </div>
            )}
          </div>
          
          <Link href="/packages" className="block py-2 text-gray-800 hover:text-[#2F5D50]">Packages</Link>
          <Link href="/how-it-works" className="block py-2 text-gray-800 hover:text-[#2F5D50]">How It Works</Link>
          <Link href="/about" className="block py-2 text-gray-800 hover:text-[#2F5D50]">About Us</Link>
          <Link href="/blog" className="block py-2 text-gray-800 hover:text-[#2F5D50]">Blog</Link>
          <Link href="/contact" className="block py-2 text-gray-800 hover:text-[#2F5D50]">Contact</Link>
          <button 
            onClick={() => window.open('https://form.jotform.com/250775888697180', '_blank')}
            className="block w-full mt-4 bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-2 px-4 rounded-md text-center"
          >
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </header>
  );
}

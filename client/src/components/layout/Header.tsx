import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

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
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`${isActive('/') ? 'text-[#2F5D50]' : 'text-gray-800'} font-semibold font-opensans hover:text-[#C8A951] transition-colors`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className={`${isActive('/services') ? 'text-[#2F5D50]' : 'text-gray-800'} font-opensans hover:text-[#C8A951] transition-colors flex items-center`}>
                Services
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Entity & Legal Setup</Link>
                <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Branding & Web</Link>
                <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Manufacturing & Fulfillment</Link>
                <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Marketing & Ads</Link>
              </div>
            </div>
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
          <div className="hidden md:block">
            <button 
              onClick={() => window.open('https://form.jotform.com/250775888697180', '_blank')}
              className="bg-gradient-to-r from-[#2F5D50] to-[#3A7A6A] hover:from-[#264A40] hover:to-[#326859] text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:shadow-md transition-all"
            >
              Schedule Free Consultation
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} pb-4`}>
          <Link href="/" className="block py-2 text-[#2F5D50] font-semibold">Home</Link>
          <div className="py-2">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full"
            >
              <span>Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`${mobileServicesOpen ? 'block' : 'hidden'} pl-4 mt-2 space-y-2`}>
              <Link href="/services" className="block py-1 text-gray-700">Entity & Legal Setup</Link>
              <Link href="/services" className="block py-1 text-gray-700">Branding & Web</Link>
              <Link href="/services" className="block py-1 text-gray-700">Manufacturing & Fulfillment</Link>
              <Link href="/services" className="block py-1 text-gray-700">Marketing & Ads</Link>
            </div>
          </div>
          <Link href="/how-it-works" className="block py-2 text-gray-800">How It Works</Link>
          <Link href="/about" className="block py-2 text-gray-800">About Us</Link>
          <Link href="/blog" className="block py-2 text-gray-800">Blog</Link>
          <Link href="/contact" className="block py-2 text-gray-800">Contact</Link>
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

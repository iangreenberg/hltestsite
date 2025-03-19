import Hero from "@/components/home/Hero";
import EmailCapture from "@/components/home/EmailCapture";
import ServiceOverview from "@/components/home/ServiceOverview";
import FeaturedSection from "@/components/home/FeaturedSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import AboutSection from "@/components/home/AboutSection";
import CTABanner from "@/components/home/CTABanner";
import BlogPreview from "@/components/home/BlogPreview";
import QualifierSection from "@/components/home/QualifierSection";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>HempLaunch | All-in-One Hemp Business Solutions</title>
        <meta 
          name="description" 
          content="Turnkey Hemp Business Solutions - From entity formation to product launch, start your brand with zero hassle."
        />
      </Helmet>
      <main>
        <Hero />
        <EmailCapture />
        <ServiceOverview />
        <FeaturedSection />
        <QualifierSection />
        <HowItWorks />
        <Testimonials />
        <AboutSection />
        <CTABanner />
        <BlogPreview />
      </main>
    </>
  );
}

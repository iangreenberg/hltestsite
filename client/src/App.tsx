import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { MetaPixelTracker } from "./components/tracking/MetaPixel";
import { GoogleAnalyticsTracker } from "./components/tracking/GoogleAnalytics";
import { MicrosoftClarityTracker } from "./components/tracking/MicrosoftClarity";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import OptimizedLanding from "./pages/OptimizedLanding";
import NewLandingPage from "./pages/NewLandingPage";
import FBLandingPage from "./pages/FBLandingPage";
import ApplicationPage from "./pages/ApplicationPage";
import TestApplicationForm from "./pages/TestApplicationForm";
import ThankYouBooking from "./pages/ThankYouBooking";
import LoadingDemo from "./pages/LoadingDemo";

import TestForm from "./pages/TestForm";
import Packages from "./pages/Packages";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ApplicationData from "./pages/admin/ApplicationData";
import SEODashboard from "./pages/admin/SEODashboardUpdated";
import AdminNav from "./pages/AdminNav";
import AuthPage from "./pages/auth-page";
import AuthTest from "./pages/auth-test";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

// Service pages
import CompliancePage from "./pages/services/CompliancePage";
import ProductPage from "./pages/services/ProductPage";
import BrandPage from "./pages/services/BrandPage";
import DistributionPage from "./pages/services/DistributionPage";
import MarketingPage from "./pages/services/MarketingPage";
import SupportPage from "./pages/services/SupportPage";

// Blog posts
import FarmBillUpdates from "./pages/blog-posts/FarmBillUpdates";
import MetaAdsStrategies from "./pages/blog-posts/MetaAdsStrategies";
import LegalStructure from "./pages/blog-posts/LegalStructure";
import VettingManufacturers from "./pages/blog-posts/VettingManufacturers";
import BrandDifferentiation from "./pages/blog-posts/BrandDifferentiation";
import PaymentProcessing from "./pages/blog-posts/PaymentProcessing";

// Layout components
function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin and Authentication Routes */}
      {/* Use function instead of component prop to ensure fresh rendering */}
      <Route path="/admin/login">
        {() => (
          <AdminLayout>
            <AdminLogin />
          </AdminLayout>
        )}
      </Route>
      
      {/* Protected admin dashboard route */}
      <Route path="/admin/dashboard">
        {() => {
          return (
            <ProtectedRoute path="/admin/dashboard" component={() => (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            )} />
          );
        }}
      </Route>
      
      {/* Applications data route - protected admin route */}
      <Route path="/admin/applications">
        {() => {
          return (
            <ProtectedRoute path="/admin/applications" component={() => (
              <AdminLayout>
                <ApplicationData />
              </AdminLayout>
            )} />
          );
        }}
      </Route>
      
      {/* SEO Dashboard - publicly accessible */}
      <Route path="/admin/seo">
        {() => (
          <AdminLayout>
            <SEODashboard />
          </AdminLayout>
        )}
      </Route>
      
      {/* Admin Navigation Menu */}
      <Route path="/admin-nav">
        {() => (
          <AdminLayout>
            <AdminNav />
          </AdminLayout>
        )}
      </Route>
      
      {/* Redirect /admin to dashboard for convenience */}
      <Route path="/admin">
        {() => <Redirect to="/admin/dashboard" />}
      </Route>
      
      <Route path="/auth">
        {() => (
          <AdminLayout>
            <AuthPage />
          </AdminLayout>
        )}
      </Route>
      
      <Route path="/auth-test">
        {() => (
          <AdminLayout>
            <AuthTest />
          </AdminLayout>
        )}
      </Route>
      
      <Route path="/test-application">
        {() => (
          <MainLayout>
            <TestApplicationForm />
          </MainLayout>
        )}
      </Route>
      
      {/* Main site routes */}
      <Route path="/">
        {() => (
          <MainLayout>
            <OptimizedLanding />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/home">
        {() => (
          <MainLayout>
            <Home />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/packages">
        {() => (
          <MainLayout>
            <Packages />
          </MainLayout>
        )}
      </Route>
      
      {/* Service Overview Page */}
      <Route path="/services">
        {() => (
          <MainLayout>
            <Packages />
          </MainLayout>
        )}
      </Route>

      {/* Individual Service Pages */}
      <Route path="/services/compliance">
        {() => (
          <MainLayout>
            <CompliancePage />
          </MainLayout>
        )}
      </Route>

      <Route path="/services/product-development">
        {() => (
          <MainLayout>
            <ProductPage />
          </MainLayout>
        )}
      </Route>

      <Route path="/services/brand-development">
        {() => (
          <MainLayout>
            <BrandPage />
          </MainLayout>
        )}
      </Route>

      <Route path="/services/distribution">
        {() => (
          <MainLayout>
            <DistributionPage />
          </MainLayout>
        )}
      </Route>

      <Route path="/services/marketing">
        {() => (
          <MainLayout>
            <MarketingPage />
          </MainLayout>
        )}
      </Route>

      <Route path="/services/support">
        {() => (
          <MainLayout>
            <SupportPage />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/how-it-works">
        {() => (
          <MainLayout>
            <HowItWorks />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/about">
        {() => (
          <MainLayout>
            <About />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/blog">
        {() => (
          <MainLayout>
            <Blog />
          </MainLayout>
        )}
      </Route>

      {/* Blog post routes */}
      <Route path="/blog/farm-bill-updates">
        {() => (
          <MainLayout>
            <FarmBillUpdates />
          </MainLayout>
        )}
      </Route>

      <Route path="/blog/meta-ads-strategies">
        {() => (
          <MainLayout>
            <MetaAdsStrategies />
          </MainLayout>
        )}
      </Route>

      <Route path="/blog/llc-vs-corporation">
        {() => (
          <MainLayout>
            <LegalStructure />
          </MainLayout>
        )}
      </Route>

      <Route path="/blog/vetting-manufacturers">
        {() => (
          <MainLayout>
            <VettingManufacturers />
          </MainLayout>
        )}
      </Route>

      <Route path="/blog/brand-differentiation">
        {() => (
          <MainLayout>
            <BrandDifferentiation />
          </MainLayout>
        )}
      </Route>

      <Route path="/blog/payment-processing">
        {() => (
          <MainLayout>
            <PaymentProcessing />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/contact">
        {() => (
          <MainLayout>
            <Contact />
          </MainLayout>
        )}
      </Route>

      <Route path="/fb-landing">
        {() => <NewLandingPage />}
      </Route>
      
      <Route path="/landing">
        {() => <FBLandingPage />}
      </Route>
      
      <Route path="/apply">
        {() => (
          <MainLayout>
            <ApplicationPage />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/test-form">
        {() => (
          <MainLayout>
            <TestApplicationForm />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/test-form-old">
        {() => (
          <MainLayout>
            <TestForm />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/thank-you-booking">
        {() => (
          <ThankYouBooking />
        )}
      </Route>
      
      <Route path="/loading-demo">
        {() => (
          <MainLayout>
            <LoadingDemo />
          </MainLayout>
        )}
      </Route>
      
      <Route>
        {() => (
          <MainLayout>
            <NotFound />
          </MainLayout>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <MetaPixelTracker /> {/* Add Meta Pixel tracker to handle route changes */}
        <GoogleAnalyticsTracker /> {/* Add Google Analytics tracker to handle route changes */}
        <MicrosoftClarityTracker projectId="r9scftonwm" /> {/* Add Microsoft Clarity tracker */}
        <Toaster />
        <SpeedInsights />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

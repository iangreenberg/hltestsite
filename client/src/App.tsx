import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import OptimizedLanding from "./pages/OptimizedLanding";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AuthPage from "./pages/auth-page";
import AuthTest from "./pages/auth-test";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

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
      {/* Admin routes - place these first for higher priority */}
      {/* Use explicit route to avoid path confusion */}
      <Route path="/admin/login" component={() => (
        <AdminLayout>
          <AdminLogin />
        </AdminLayout>
      )} />
      
      <Route path="/admin/dashboard" component={() => (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      )} />
      
      {/* Redirect /admin to dashboard for convenience */}
      <Route path="/admin" component={() => (
        <Redirect to="/admin/dashboard" />
      )} />
      
      <Route path="/auth" component={() => (
        <AdminLayout>
          <AuthPage />
        </AdminLayout>
      )} />
      
      <Route path="/auth-test" component={() => (
        <AdminLayout>
          <AuthTest />
        </AdminLayout>
      )} />
      
      {/* Main site routes */}
      <Route path="/" component={() => (
        <MainLayout>
          <OptimizedLanding />
        </MainLayout>
      )} />
      
      <Route path="/home" component={() => (
        <MainLayout>
          <Home />
        </MainLayout>
      )} />
      
      <Route path="/services" component={() => (
        <MainLayout>
          <Services />
        </MainLayout>
      )} />
      
      <Route path="/how-it-works" component={() => (
        <MainLayout>
          <HowItWorks />
        </MainLayout>
      )} />
      
      <Route path="/about" component={() => (
        <MainLayout>
          <About />
        </MainLayout>
      )} />
      
      <Route path="/blog" component={() => (
        <MainLayout>
          <Blog />
        </MainLayout>
      )} />
      
      <Route path="/contact" component={() => (
        <MainLayout>
          <Contact />
        </MainLayout>
      )} />

      <Route path="/fb-landing" component={() => <LandingPage />} />
      
      <Route component={() => (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

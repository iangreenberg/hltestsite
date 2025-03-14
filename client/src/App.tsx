import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import OptimizedLanding from "@/pages/OptimizedLanding";
import Services from "@/pages/Services";
import HowItWorks from "@/pages/HowItWorks";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

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
      {/* Admin routes */}
      <Route path="/admin/login">
        <AdminLayout>
          <AdminLogin />
        </AdminLayout>
      </Route>
      
      <Route path="/auth">
        <AdminLayout>
          <AuthPage />
        </AdminLayout>
      </Route>
      
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      
      {/* Main site routes */}
      <Route path="/">
        <MainLayout>
          <OptimizedLanding />
        </MainLayout>
      </Route>
      
      <Route path="/home">
        <MainLayout>
          <Home />
        </MainLayout>
      </Route>
      
      <Route path="/services">
        <MainLayout>
          <Services />
        </MainLayout>
      </Route>
      
      <Route path="/how-it-works">
        <MainLayout>
          <HowItWorks />
        </MainLayout>
      </Route>
      
      <Route path="/about">
        <MainLayout>
          <About />
        </MainLayout>
      </Route>
      
      <Route path="/blog">
        <MainLayout>
          <Blog />
        </MainLayout>
      </Route>
      
      <Route path="/contact">
        <MainLayout>
          <Contact />
        </MainLayout>
      </Route>
      
      <Route>
        <MainLayout>
          <NotFound />
        </MainLayout>
      </Route>
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

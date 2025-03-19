import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import OptimizedLanding from "./pages/OptimizedLanding";
import NewLandingPage from "./pages/NewLandingPage";
import ApplicationPage from "./pages/ApplicationPage";
import TestApplicationForm from "./pages/TestApplicationForm";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ApplicationData from "./pages/admin/ApplicationData";
import AdminNav from "./pages/AdminNav";
import AuthPage from "./pages/auth-page";
import AuthTest from "./pages/auth-test";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

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
      
      <Route path="/services">
        {() => (
          <MainLayout>
            <Services />
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
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

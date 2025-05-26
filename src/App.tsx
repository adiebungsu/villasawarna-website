import 'leaflet/dist/leaflet.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/ui/loading-spinner";
import FontLoader from "./components/ui/font-loader";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useServiceWorker } from "./hooks/useServiceWorker";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoader } from '@/components/PageLoader';
import { AnimatePresence } from 'framer-motion';
import { UpdateNotification } from './components/UpdateNotification';
import { queryClient } from './lib/queryClient';
import { performanceMonitor } from './lib/performance-monitor';
import { cacheManager } from './lib/cache';
import { initSentry } from './lib/sentry';
import { Layout } from '@/components/Layout';
import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/AuthGuard';

// Lazy load pages dengan chunk naming
const Index = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Index"));
const Villas = lazy(() => import(/* webpackChunkName: "villas" */ "./pages/Villas"));
const Homestays = lazy(() => import(/* webpackChunkName: "homestays" */ "./pages/Homestays"));
const PropertyDetail = lazy(() => import(/* webpackChunkName: "property" */ "./pages/PropertyDetail"));
const Articles = lazy(() => import(/* webpackChunkName: "articles" */ "./pages/Articles"));
const ArticleDetail = lazy(() => import(/* webpackChunkName: "article" */ "./pages/ArticleDetail"));
const About = lazy(() => import(/* webpackChunkName: "about" */ "./pages/About"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "./pages/Contact"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ "./pages/NotFound"));
const Search = lazy(() => import(/* webpackChunkName: "search" */ "./pages/Search"));
const ArticleList = lazy(() => import(/* webpackChunkName: "admin-articles" */ '@/pages/admin/ArticleList'));
const ArticleEditor = lazy(() => import(/* webpackChunkName: "admin-editor" */ '@/pages/admin/ArticleEditor'));
const Destinations = lazy(() => import(/* webpackChunkName: "destinations" */ './pages/Destinations'));
const DestinationDetail = lazy(() => import(/* webpackChunkName: "destination" */ './pages/DestinationDetail'));
const TermsAndConditions = lazy(() => import(/* webpackChunkName: "terms" */ './pages/TermsAndConditions'));
const Dashboard = lazy(() => import(/* webpackChunkName: "admin-dashboard" */ '@/pages/admin/Dashboard'));
const PropertyList = lazy(() => import(/* webpackChunkName: "admin-properties" */ '@/pages/admin/PropertyList'));
const PropertyEditor = lazy(() => import(/* webpackChunkName: "admin-property-editor" */ '@/pages/admin/PropertyEditor'));
const DestinationList = lazy(() => import(/* webpackChunkName: "admin-destinations" */ '@/pages/admin/DestinationList'));
const BookingList = lazy(() => import(/* webpackChunkName: "admin-bookings" */ '@/pages/admin/BookingList'));

// Preload komponen yang sering diakses
const preloadComponents = () => {
  const preload = (importFn: () => Promise<{ default: React.ComponentType }>) => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = importFn.toString().match(/webpackChunkName: "([^"]+)"/)?.[1] || '';
    document.head.appendChild(link);
  };

  // Preload halaman utama dan yang sering diakses
  preload(() => import('./pages/Index'));
  preload(() => import('./pages/Villas'));
  preload(() => import('./pages/Homestays'));
  preload(() => import('./pages/PropertyDetail'));
  preload(() => import('./pages/Destinations'));
  preload(() => import('./pages/Articles'));
};

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "933733800266-pbjh3uf15g3sap2rclnfvs8r08ahmnq9.apps.googleusercontent.com";

const App = () => {
  const { updateAvailable, update, isInstalled } = useServiceWorker();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.initialize();

    // Initialize Sentry
    initSentry();

    // Register service worker
    if ('serviceWorker' in navigator && !isInstalled) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
          performanceMonitor.handleError(error, {
            context: 'Service Worker Registration',
            isInstalled
          });
        });
      });
    }

    // Preload komponen
    preloadComponents();

    // Prefetch critical data
    cacheManager.prefetchBatch([
      {
        key: 'destinations',
        fetchFn: () => fetch('/api/destinations').then(res => res.json())
      },
      {
        key: 'featured-villas',
        fetchFn: () => fetch('/api/villas/featured').then(res => res.json())
      }
    ]);

    // Set up error tracking
    window.addEventListener('error', (event) => {
      performanceMonitor.handleError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      performanceMonitor.handleError(event.reason, {
        type: 'unhandledrejection',
      });
    });

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 detik loading time

    return () => {
      window.removeEventListener('error', () => {});
      window.removeEventListener('unhandledrejection', () => {});
      clearTimeout(timer);
    };
  }, [isInstalled]);

  useEffect(() => {
    if (!isLoading) {
      preloadComponents();
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isLoading ? 'hidden' : ''}`}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <HelmetProvider>
                <TooltipProvider>
                  <Router>
                    <FontLoader 
                      fonts={[
                        { family: 'Inter', weight: [400, 500, 600, 700] },
                        { family: 'Poppins', weight: [400, 500, 600, 700] }
                      ]} 
                    />
                    <Toaster />
                    <Sonner />
                    <ScrollToTop />
                    <ErrorBoundary>
                      <Suspense fallback={<PageLoader />}>
                        <AnimatePresence mode="wait">
                          <Layout>
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/villas" element={<Villas />} />
                              <Route path="/homestays" element={<Homestays />} />
                              <Route path="/villas/:id" element={<PropertyDetail />} />
                              <Route path="/homestays/:id" element={<PropertyDetail />} />
                              <Route path="/articles" element={<Articles />} />
                              <Route path="/article/:id" element={<ArticleDetail />} />
                              <Route path="/about" element={<About />} />
                              <Route path="/contact" element={<Contact />} />
                              <Route path="/search" element={<Search />} />
                              <Route path="/admin/articles" element={<ArticleList />} />
                              <Route path="/admin/articles/new" element={<ArticleEditor />} />
                              <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
                              <Route path="/destinations" element={<Destinations />} />
                              <Route path="/destination/:id" element={<DestinationDetail />} />
                              <Route path="/terms" element={<TermsAndConditions />} />
                              <Route path="/admin" element={<AuthGuard><Dashboard /></AuthGuard>} />
                              <Route path="/admin/properties" element={<AuthGuard><PropertyList /></AuthGuard>} />
                              <Route path="/admin/properties/new" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                              <Route path="/admin/properties/edit/:id" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                              <Route path="/admin/destinations" element={<AuthGuard><DestinationList /></AuthGuard>} />
                              <Route path="/admin/bookings" element={<AuthGuard><BookingList /></AuthGuard>} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </Layout>
                        </AnimatePresence>
                      </Suspense>
                    </ErrorBoundary>
                    {updateAvailable && <UpdateNotification onUpdate={update} />}
                  </Router>
                </TooltipProvider>
              </HelmetProvider>
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;

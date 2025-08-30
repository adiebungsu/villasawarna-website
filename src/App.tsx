import "leaflet/dist/leaflet.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/wishlist-provider';
import { UserDataProvider } from '@/context/user-data-provider';
import GoogleAnalytics from './components/GoogleAnalytics';
import { useLocaleFromPath } from '@/hooks/useLocaleFromPath';

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
const PartnershipPage = lazy(() => import(/* webpackChunkName: "partnership" */ './pages/PartnershipPage'));
const MapPage = lazy(() => import(/* webpackChunkName: "map" */ "./pages/Map"));
const PenginapanSawarna = lazy(() => import(/* webpackChunkName: "penginapan-sawarna" */ './pages/PenginapanSawarna'));
const UserDashboardPage = lazy(() => import(/* webpackChunkName: "user-dashboard" */ './pages/UserDashboardPage'));
const NavbarTest = lazy(() => import(/* webpackChunkName: "navbar-test" */ './components/NavbarTest'));
const ReviewDemoPage = lazy(() => import(/* webpackChunkName: "review-demo" */ './pages/ReviewDemoPage'));
const TransportPage = lazy(() => import(/* webpackChunkName: "transport" */ './pages/Transport'));
const TransportDetail = lazy(() => import(/* webpackChunkName: "transport-detail" */ './pages/TransportDetail'));
const FleetDetail = lazy(() => import(/* webpackChunkName: "fleet-detail" */ './pages/FleetDetail'));
const AreaDetail = lazy(() => import(/* webpackChunkName: "area-detail" */ './pages/AreaDetail'));
const AccommodationPackages = lazy(() => import(/* webpackChunkName: "accommodation-packages" */ './pages/AccommodationPackages'));
const PackageDetail = lazy(() => import(/* webpackChunkName: "package-detail" */ './pages/PackageDetail'));
const LoginPage = lazy(() => import(/* webpackChunkName: "login" */ './pages/LoginPage'));
const LogoutPage = lazy(() => import(/* webpackChunkName: "logout" */ './pages/LogoutPage'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "register" */ './pages/RegisterPage'));
const HelpPage = lazy(() => import(/* webpackChunkName: "help" */ './pages/HelpPage'));

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

import { getGoogleClientId } from './config/environment';

// Get Google Client ID from environment configuration
const GOOGLE_CLIENT_ID = getGoogleClientId();

const AppLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const App = () => {
  const { updateAvailable, update, isInstalled } = useServiceWorker();
  const [isLoading, setIsLoading] = useState(true);
  const LocaleSync = () => { useLocaleFromPath(); return null; };

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
                                      <ThemeProvider>
                      <AuthProvider>
                        <WishlistProvider>
                          <UserDataProvider>
                            <Router>
                        <LocaleSync />
                        <GoogleAnalytics />
                        <ScrollToTop />
                        <FontLoader 
                          fonts={[
                            { family: 'Inter', weight: [400, 500, 600, 700] },
                            { family: 'Poppins', weight: [400, 500, 600, 700] }
                          ]} 
                        />
                        <Toaster />
                        <Sonner />
                        <ErrorBoundary>
                          <Suspense fallback={<PageLoader />}>
                            <AnimatePresence mode="wait">
                              <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/logout" element={<LogoutPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                {/* Base routes with shared children */}
                                <Route path="/" element={<AppLayout />}>
                                  <Route index element={<Index />} />
                                  <Route path="villas" element={<Villas />} />
                                  <Route path="homestays" element={<Homestays />} />
                                  <Route path="villas/:id" element={<PropertyDetail key={window.location.pathname} />} />
                                  <Route path="homestays/:id" element={<PropertyDetail key={window.location.pathname} />} />
                                  <Route path="articles" element={<Articles />} />
                                  <Route path="article/:id" element={<ArticleDetail />} />
                                  <Route path="about" element={<About />} />
                                  <Route path="penginapan-sawarna" element={<PenginapanSawarna />} />
                                  <Route path="contact" element={<Contact />} />
                                  <Route path="partnership" element={<PartnershipPage />} />
                                  <Route path="search" element={<Search />} />
                                  <Route path="admin/articles" element={<ArticleList />} />
                                  <Route path="admin/articles/new" element={<ArticleEditor />} />
                                  <Route path="admin/articles/edit/:id" element={<ArticleEditor />} />
                                  <Route path="destinations" element={<Destinations />} />
                                  <Route path="destination/:id" element={<DestinationDetail />} />
                                  <Route path="terms" element={<TermsAndConditions />} />
                                  <Route path="admin" element={<AuthGuard><Dashboard /></AuthGuard>} />
                                  <Route path="admin/properties" element={<AuthGuard><PropertyList /></AuthGuard>} />
                                  <Route path="admin/properties/new" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                                  <Route path="admin/properties/edit/:id" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                                  <Route path="admin/destinations" element={<AuthGuard><DestinationList /></AuthGuard>} />
                                  <Route path="admin/bookings" element={<AuthGuard><BookingList /></AuthGuard>} />
                                  <Route path="map" element={<MapPage />} />
                                  <Route path="help" element={<HelpPage />} />
                                  <Route path="transport" element={<TransportPage />} />
                                  <Route path="transport/:type" element={<TransportDetail />} />
                                  <Route path="transport/fleet/:slug" element={<FleetDetail />} />
                                  <Route path="transport/area/:city" element={<AreaDetail />} />
                                  <Route path="accommodation-packages" element={<AccommodationPackages />} />
                                  <Route path="accommodation-packages/:id" element={<PackageDetail />} />
                                  <Route path="dashboard" element={<UserDashboardPage />} />
                                  <Route path="test-navbar" element={<NavbarTest />} />
                                  <Route path="review-demo" element={<ReviewDemoPage />} />
                                  <Route path="*" element={<NotFound />} />
                                </Route>
                                {/* Locale-prefixed routes reuse the same children */}
                                <Route path="/en" element={<AppLayout />}>
                                  <Route index element={<Index />} />
                                  <Route path="villas" element={<Villas />} />
                                  <Route path="homestays" element={<Homestays />} />
                                  <Route path="villas/:id" element={<PropertyDetail key={window.location.pathname} />} />
                                  <Route path="homestays/:id" element={<PropertyDetail key={window.location.pathname} />} />
                                  <Route path="articles" element={<Articles />} />
                                  <Route path="article/:id" element={<ArticleDetail />} />
                                  <Route path="about" element={<About />} />
                                  <Route path="penginapan-sawarna" element={<PenginapanSawarna />} />
                                  <Route path="contact" element={<Contact />} />
                                  <Route path="partnership" element={<PartnershipPage />} />
                                  <Route path="search" element={<Search />} />
                                  <Route path="admin/articles" element={<ArticleList />} />
                                  <Route path="admin/articles/new" element={<ArticleEditor />} />
                                  <Route path="admin/articles/edit/:id" element={<ArticleEditor />} />
                                  <Route path="destinations" element={<Destinations />} />
                                  <Route path="destination/:id" element={<DestinationDetail />} />
                                  <Route path="terms" element={<TermsAndConditions />} />
                                  <Route path="admin" element={<AuthGuard><Dashboard /></AuthGuard>} />
                                  <Route path="admin/properties" element={<AuthGuard><PropertyList /></AuthGuard>} />
                                  <Route path="admin/properties/new" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                                  <Route path="admin/properties/edit/:id" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                                  <Route path="admin/destinations" element={<AuthGuard><DestinationList /></AuthGuard>} />
                                  <Route path="admin/bookings" element={<AuthGuard><BookingList /></AuthGuard>} />
                                  <Route path="map" element={<MapPage />} />
                                  <Route path="help" element={<HelpPage />} />
                                  <Route path="transport" element={<TransportPage />} />
                                  <Route path="transport/:type" element={<TransportDetail />} />
                                  <Route path="accommodation-packages" element={<AccommodationPackages />} />
                                  <Route path="accommodation-packages/:id" element={<PackageDetail />} />
                                  <Route path="dashboard" element={<UserDashboardPage />} />
                                  <Route path="review-demo" element={<ReviewDemoPage />} />
                                  <Route path="*" element={<NotFound />} />
                                </Route>
                                <Route path="/id" element={<AppLayout />}>
                                  <Route index element={<Index />} />
                                  <Route path="villas" element={<Villas />} />
                                  <Route path="homestays" element={<Homestays />} />
                                  <Route path="villas/:id" element={<PropertyDetail key={window.location.pathname} />} />
                                  <Route path="homestays/:id" element={<PropertyDetail key={window.location.pathname} />} />
                                  <Route path="articles" element={<Articles />} />
                                  <Route path="article/:id" element={<ArticleDetail />} />
                                  <Route path="about" element={<About />} />
                                  <Route path="penginapan-sawarna" element={<PenginapanSawarna />} />
                                  <Route path="contact" element={<Contact />} />
                                  <Route path="partnership" element={<PartnershipPage />} />
                                  <Route path="search" element={<Search />} />
                                  <Route path="admin/articles" element={<ArticleList />} />
                                  <Route path="admin/articles/new" element={<ArticleEditor />} />
                                  <Route path="admin/articles/edit/:id" element={<ArticleEditor />} />
                                  <Route path="destinations" element={<Destinations />} />
                                  <Route path="destination/:id" element={<DestinationDetail />} />
                                  <Route path="terms" element={<TermsAndConditions />} />
                                  <Route path="admin" element={<AuthGuard><Dashboard /></AuthGuard>} />
                                  <Route path="admin/properties" element={<AuthGuard><PropertyList /></AuthGuard>} />
                                  <Route path="admin/properties/new" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                                  <Route path="admin/properties/edit/:id" element={<AuthGuard><PropertyEditor /></AuthGuard>} />
                                  <Route path="admin/destinations" element={<AuthGuard><DestinationList /></AuthGuard>} />
                                  <Route path="admin/bookings" element={<AuthGuard><BookingList /></AuthGuard>} />
                                  <Route path="map" element={<MapPage />} />
                                  <Route path="help" element={<HelpPage />} />
                                  <Route path="transport" element={<TransportPage />} />
                                  <Route path="transport/:type" element={<TransportDetail />} />
                                  <Route path="accommodation-packages" element={<AccommodationPackages />} />
                                  <Route path="accommodation-packages/:id" element={<PackageDetail />} />
                                  <Route path="dashboard" element={<UserDashboardPage />} />
                                  <Route path="review-demo" element={<ReviewDemoPage />} />
                                  <Route path="*" element={<NotFound />} />
                                </Route>
                              </Routes>
                          </AnimatePresence>
                        </Suspense>
                      </ErrorBoundary>
                      {updateAvailable && <UpdateNotification onUpdate={update} />}
                                            </Router>
                            </UserDataProvider>
                        </WishlistProvider>
                      </AuthProvider>
                    </ThemeProvider>
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

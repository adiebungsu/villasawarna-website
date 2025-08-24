import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getGAId, isGAEnabled } from '@/config/analytics';

// Fungsi untuk menginisialisasi Google Analytics
const initializeGA = () => {
  // Cek apakah GA dienable
  if (!isGAEnabled()) {
    return;
  }

  if (typeof window !== 'undefined' && !window.gtag) {
    const gaId = getGAId();
    
    // Validasi GA ID
    if (!gaId || gaId === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics ID belum dikonfigurasi. Silakan set VITE_GA_MEASUREMENT_ID di .env');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Set default config
    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Fungsi untuk track page view
const trackPageView = (url: string) => {
  if (!isGAEnabled()) {
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    const gaId = getGAId();
    window.gtag('config', gaId, {
      page_path: url,
      page_title: document.title,
    });
  }
};

// Fungsi untuk track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isGAEnabled()) {
    return;
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Fungsi untuk track villa views
export const trackVillaView = (villaId: string, villaName: string) => {
  trackEvent('view_item', 'villa', villaName);
};

// Fungsi untuk track search
export const trackSearch = (searchQuery: string) => {
  trackEvent('search', 'search', searchQuery);
};

// Fungsi untuk track contact form
export const trackContactForm = () => {
  trackEvent('generate_lead', 'contact');
};

// Fungsi untuk track booking interest
export const trackBookingInterest = (villaId: string, villaName: string) => {
  trackEvent('add_to_cart', 'booking', villaName);
};

// Komponen utama Google Analytics
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on component mount
    initializeGA();
  }, []);

  useEffect(() => {
    // Track page views when route changes
    if (typeof window !== 'undefined' && window.gtag) {
      trackPageView(location.pathname);
    }
  }, [location]);

  // Component ini tidak render apapun
  return null;
};

export default GoogleAnalytics;

// Type declarations untuk global gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Konfigurasi Google Analytics
export const ANALYTICS_CONFIG = {
  // Google Analytics Measurement ID
  // Ganti dengan ID Google Analytics Anda
  GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',
  
  // Enable/disable Google Analytics
  ENABLE_GOOGLE_ANALYTICS: true,
  
  // Enable/disable debug mode
  DEBUG_MODE: false,
  
  // Custom dimensions (opsional)
  CUSTOM_DIMENSIONS: {
    USER_TYPE: 'dimension1',
    VILLA_CATEGORY: 'dimension2',
    LOCATION: 'dimension3',
  },
  
  // Event categories
  EVENT_CATEGORIES: {
    VILLA: 'villa',
    SEARCH: 'search',
    CONTACT: 'contact',
    BOOKING: 'booking',
    NAVIGATION: 'navigation',
    USER_ENGAGEMENT: 'user_engagement',
  },
  
  // Event actions
  EVENT_ACTIONS: {
    VIEW: 'view',
    CLICK: 'click',
    SEARCH: 'search',
    SUBMIT: 'submit',
    ADD_TO_CART: 'add_to_cart',
    BEGIN_CHECKOUT: 'begin_checkout',
    PURCHASE: 'purchase',
  },
};

// Fungsi untuk mendapatkan GA ID dari environment variable
export const getGAId = (): string => {
  // Cek environment variable terlebih dahulu
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    return import.meta.env.VITE_GA_MEASUREMENT_ID;
  }
  
  // Fallback ke config default
  return ANALYTICS_CONFIG.GA_MEASUREMENT_ID;
};

// Fungsi untuk mengecek apakah GA dienable
export const isGAEnabled = (): boolean => {
  // Cek environment variable
  if (import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS !== undefined) {
    return import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === 'true';
  }
  
  // Fallback ke config default
  return ANALYTICS_CONFIG.ENABLE_GOOGLE_ANALYTICS;
};

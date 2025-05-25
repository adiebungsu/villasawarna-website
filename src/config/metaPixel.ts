// Meta Pixel Configuration
// Ganti YOUR_PIXEL_ID dengan ID Meta Pixel Anda
export const META_PIXEL_ID = 'YOUR_PIXEL_ID';

interface FBQ {
  (event: string, ...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
}

declare global {
  interface Window {
    fbq: FBQ;
    _fbq: FBQ;
  }
}

export const pageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Event yang akan di-track
export const EVENTS = {
  VIEW_CONTENT: 'ViewContent',
  SEARCH: 'Search',
  ADD_TO_WISHLIST: 'AddToWishlist',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  PURCHASE: 'Purchase',
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration'
} as const;

// Fungsi helper untuk tracking
export const trackEvent = (eventName: keyof typeof EVENTS, data?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
}; 
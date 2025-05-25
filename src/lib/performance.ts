import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

type Metric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
};

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
  const nav = navigator as Navigator & {
    connection?: {
      effectiveType: string;
    };
  };
  return nav.connection?.effectiveType || '';
}

export function sendToAnalytics(metric: Metric) {
  const body = {
    dsn: process.env.REACT_APP_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
}

export function reportWebVitals() {
  onCLS((metric) => sendToAnalytics(metric));
  onINP((metric) => sendToAnalytics(metric));
  onLCP((metric) => sendToAnalytics(metric));
  onFCP((metric) => sendToAnalytics(metric));
  onTTFB((metric) => sendToAnalytics(metric));
}

// Performance monitoring
export function measurePerformance() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
      // Navigation timing
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnection: navigation.connectEnd - navigation.connectStart,
      serverResponse: navigation.responseEnd - navigation.requestStart,
      domLoad: navigation.domContentLoadedEventEnd - navigation.startTime,
      windowLoad: navigation.loadEventEnd - navigation.startTime,
      
      // Paint timing
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
      
      // Resource timing
      resourceCount: performance.getEntriesByType('resource').length,
    };

    // Log metrics to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);
    }

    return metrics;
  }
  return null;
}

// Error tracking
export function trackError(error: Error, context?: Record<string, unknown>) {
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    context,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorData);
  }

  // Send to error tracking service
  if (process.env.REACT_APP_ERROR_TRACKING_URL) {
    fetch(process.env.REACT_APP_ERROR_TRACKING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData),
    }).catch(console.error);
  }
}

// User behavior tracking
export function trackUserBehavior(action: string, data?: Record<string, unknown>) {
  const eventData = {
    action,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    data,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('User Action:', eventData);
  }

  // Send to analytics service
  if (process.env.REACT_APP_ANALYTICS_URL) {
    fetch(process.env.REACT_APP_ANALYTICS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    }).catch(console.error);
  }
} 
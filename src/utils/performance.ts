import React from 'react';

// Utility untuk code splitting dan optimasi bundle

// Lazy load component dengan loading state
export const lazyLoad = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  const Component = React.lazy(importFn);
  
  return (props: Record<string, unknown>) => (
    <React.Suspense fallback={<div className="animate-pulse bg-gray-200 h-full w-full" />}>
      <Component {...props} />
    </React.Suspense>
  );
};

// Debounce function untuk optimasi event handler
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function untuk optimasi event handler
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Intersection Observer untuk lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  }
) => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(callback, options);
};

// Preload image
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = reject;
  });
};

// Preload multiple images
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

// Cache API response
export const cacheApiResponse = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): Promise<T> => {
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttl) {
      return data;
    }
  }
  
  const data = await fetchFn();
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
  
  return data;
};

// Measure performance metrics
export const measurePerformance = () => {
  if (typeof window === 'undefined') return null;
  
  const metrics: Record<string, number> = {};
  
  // First Contentful Paint
  const fcp = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcp) metrics.fcp = fcp.startTime;
  
  // Largest Contentful Paint
  const lcp = performance.getEntriesByName('largest-contentful-paint')[0];
  if (lcp) metrics.lcp = lcp.startTime;
  
  // First Input Delay
  const fid = performance.getEntriesByName('first-input-delay')[0];
  if (fid) metrics.fid = fid.duration;
  
  // Cumulative Layout Shift
  const cls = performance.getEntriesByName('cumulative-layout-shift')[0];
  if (cls) metrics.cls = cls.value;
  
  return metrics;
}; 
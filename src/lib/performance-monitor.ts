import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';
import * as Sentry from '@sentry/react';

interface PerformanceMetrics {
  cls: number;
  inp: number;
  lcp: number;
  fcp: number;
  ttfb: number;
  si: number;
}

interface ResourceTiming {
  name: string;
  duration: number;
  size: number;
}

interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    cls: 0,
    inp: 0,
    lcp: 0,
    fcp: 0,
    ttfb: 0,
    si: 0
  };

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  initialize() {
    this.trackCriticalMetrics();
    this.trackResourceTiming();
    this.trackMemoryUsage();
    this.trackLongTasks();
    this.trackLayoutShifts();
    this.trackSpeedIndex();
  }

  private trackCriticalMetrics() {
    // Track LCP (Largest Contentful Paint)
    onLCP(metric => {
      this.handleMetric('lcp', metric.value);
      const rating = this.getLCPRating(metric.value);
      console.log(`LCP: ${metric.value}ms (${rating})`);
      
      if (rating === 'poor') {
        Sentry.captureMessage('Poor LCP detected', {
          level: 'warning',
          tags: {
            value: metric.value.toString(),
            rating,
            url: window.location.href
          }
        });
      }
    });

    // Track FCP (First Contentful Paint)
    onFCP(metric => {
      this.handleMetric('fcp', metric.value);
      const rating = this.getFCPRating(metric.value);
      console.log(`FCP: ${metric.value}ms (${rating})`);
      
      if (rating === 'poor') {
        Sentry.captureMessage('Poor FCP detected', {
          level: 'warning',
          tags: {
            value: metric.value.toString(),
            rating,
            url: window.location.href
          }
        });
      }
    });

    // Track CLS (Cumulative Layout Shift)
    onCLS(metric => {
      this.handleMetric('cls', metric.value);
      if (metric.value > 0.1) {
        Sentry.captureMessage('High CLS detected', {
          level: 'warning',
          tags: {
            value: metric.value.toString(),
            url: window.location.href
          }
        });
      }
    });

    // Track INP (Interaction to Next Paint)
    onINP(metric => {
      this.handleMetric('inp', metric.value);
      if (metric.value > 100) {
        Sentry.captureMessage('Slow INP detected', {
          level: 'warning',
          tags: {
            value: metric.value.toString(),
            url: window.location.href
          }
        });
      }
    });
  }

  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  private trackWebVitals() {
    onCLS(metric => this.handleMetric('cls', metric.value));
    onINP(metric => this.handleMetric('inp', metric.value));
    onLCP(metric => this.handleMetric('lcp', metric.value));
    onFCP(metric => this.handleMetric('fcp', metric.value));
    onTTFB(metric => this.handleMetric('ttfb', metric.value));
  }

  private handleMetric(name: keyof PerformanceMetrics, value: number) {
    this.metrics[name] = value;
    this.reportToAnalytics(name, value);
  }

  private reportToAnalytics(name: string, value: number) {
    // Send to your analytics service
    console.log(`Metric ${name}: ${value}`);
    
    // Report to Sentry if performance is poor
    if (this.isPoorPerformance(name, value)) {
      Sentry.captureMessage(`Poor performance detected: ${name} = ${value}`, {
        level: 'warning',
        tags: {
          metric: name,
          value: value.toString()
        }
      });
    }
  }

  private isPoorPerformance(name: string, value: number): boolean {
    const thresholds = {
      cls: 0.25,
      inp: 100,
      lcp: 2500,
      fcp: 1800,
      ttfb: 800
    };
    return value > thresholds[name as keyof typeof thresholds];
  }

  private trackResourceTiming() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const timing: ResourceTiming = {
          name: entry.name,
          duration: entry.duration,
          size: (entry as PerformanceResourceTiming).transferSize || 0
        };
        this.reportResourceTiming(timing);
      }
    });

    observer.observe({ entryTypes: ['resource'] });
  }

  private reportResourceTiming(timing: ResourceTiming) {
    if (timing.duration > 1000) {
      Sentry.captureMessage(`Slow resource load: ${timing.name}`, {
        level: 'warning',
        tags: {
          duration: timing.duration.toString(),
          size: timing.size.toString()
        }
      });
    }
  }

  private trackMemoryUsage() {
    const perf = performance as ExtendedPerformance;
    if (perf.memory) {
      if (perf.memory.usedJSHeapSize > perf.memory.jsHeapSizeLimit * 0.9) {
        Sentry.captureMessage('High memory usage detected', {
          level: 'warning',
          tags: {
            used: perf.memory.usedJSHeapSize.toString(),
            limit: perf.memory.jsHeapSizeLimit.toString()
          }
        });
      }
    }
  }

  private trackLongTasks() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          Sentry.captureMessage('Long task detected', {
            level: 'warning',
            tags: {
              duration: entry.duration.toString(),
              name: entry.name
            }
          });
        }
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  }

  private trackLayoutShifts() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as LayoutShiftEntry;
        if (!layoutShift.hadRecentInput && layoutShift.value > 0.1) {
          Sentry.captureMessage('Unexpected layout shift detected', {
            level: 'warning',
            tags: {
              value: layoutShift.value.toString()
            }
          });
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  private trackSpeedIndex() {
    // Speed Index dihitung berdasarkan visual completeness
    const calculateSpeedIndex = () => {
      const timing = performance.timing;
      const start = timing.navigationStart;
      const end = timing.loadEventEnd;
      const duration = end - start;

      // Ambil screenshot visual completeness setiap 100ms
      const intervals = Math.ceil(duration / 100);
      let totalProgress = 0;

      for (let i = 0; i < intervals; i++) {
        const time = start + (i * 100);
        const progress = this.calculateVisualProgress(time);
        totalProgress += progress;
      }

      const speedIndex = duration - (totalProgress * duration / intervals);
      this.handleMetric('si', speedIndex);
      
      const rating = this.getSpeedIndexRating(speedIndex);
      console.log(`Speed Index: ${speedIndex}ms (${rating})`);

      if (rating === 'poor') {
        Sentry.captureMessage('Poor Speed Index detected', {
          level: 'warning',
          tags: {
            value: speedIndex.toString(),
            rating,
            url: window.location.href
          }
        });
      }
    };

    // Tunggu sampai halaman selesai dimuat
    window.addEventListener('load', () => {
      setTimeout(calculateSpeedIndex, 0);
    });
  }

  private calculateVisualProgress(time: number): number {
    // Implementasi sederhana untuk menghitung visual progress
    // Dalam implementasi nyata, ini akan menggunakan API seperti Performance Timeline
    const resources = performance.getEntriesByType('resource');
    const loadedResources = resources.filter(r => r.startTime <= time);
    return loadedResources.length / resources.length;
  }

  private getSpeedIndexRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 3400) return 'good';
    if (value <= 5800) return 'needs-improvement';
    return 'poor';
  }

  handleError(error: Error, context?: Record<string, unknown>) {
    // Log error to console
    console.error('Error:', error, context);

    // Report to Sentry
    Sentry.captureException(error, {
      extra: context
    });

    // Track error in metrics
    this.reportToAnalytics('error', 1);
  }

  getPerformanceScore(): number {
    const weights = {
      cls: 0.15,
      inp: 0.15,
      lcp: 0.25,
      fcp: 0.25,
      ttfb: 0.20
    };

    const normalizedMetrics = {
      cls: Math.max(0, 1 - this.metrics.cls / 0.25),
      inp: Math.max(0, 1 - this.metrics.inp / 100),
      lcp: Math.max(0, 1 - this.metrics.lcp / 2500),
      fcp: Math.max(0, 1 - this.metrics.fcp / 1800),
      ttfb: Math.max(0, 1 - this.metrics.ttfb / 800)
    };

    return Object.entries(weights).reduce((score, [metric, weight]) => {
      return score + normalizedMetrics[metric as keyof typeof normalizedMetrics] * weight;
    }, 0) * 100;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance(); 
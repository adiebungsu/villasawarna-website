import { QueryClient, useQuery } from '@tanstack/react-query';

interface CacheConfig {
  staleTime: number;
  gcTime: number;
  retry: number;
  retryDelay: number;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  etag?: string;
}

interface CacheEntry<T> {
  data: T;
  expires: number;
}

// Default cache configuration
const defaultConfig: CacheConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  retry: 3,
  retryDelay: 1000,
};

// Create a custom cache manager
export class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheItem<unknown>>;
  private config: CacheConfig;
  private queryClient: QueryClient;

  private constructor(config: Partial<CacheConfig> = {}) {
    this.cache = new Map();
    this.config = { ...defaultConfig, ...config };
    this.queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: this.config.staleTime,
          gcTime: this.config.gcTime,
          retry: this.config.retry,
          retryDelay: this.config.retryDelay,
        },
      },
    });
  }

  public static getInstance(config?: Partial<CacheConfig>): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager(config);
    }
    return CacheManager.instance;
  }

  // Get data from cache
  public async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key) as CacheItem<T> | undefined;
    
    if (!item) return null;

    // Check if data is stale
    if (Date.now() - item.timestamp > this.config.staleTime) {
      // Return stale data but trigger background refresh
      this.refreshInBackground(key);
      return item.data;
    }

    return item.data;
  }

  // Set data in cache
  public set<T>(key: string, data: T, etag?: string): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      etag,
    });
  }

  // Remove data from cache
  public remove(key: string): void {
    this.cache.delete(key);
  }

  // Clear all cache
  public clear(): void {
    this.cache.clear();
  }

  // Refresh data in background
  private async refreshInBackground(key: string): Promise<void> {
    const item = this.cache.get(key);
    if (!item) return;

    try {
      // Implement your refresh logic here
      // This could be a fetch request with etag validation
      const response = await fetch(key, {
        headers: item.etag ? { 'If-None-Match': item.etag } : {},
      });

      if (response.status === 304) {
        // Data hasn't changed, update timestamp
        this.set(key, item.data, item.etag);
      } else if (response.ok) {
        // New data available
        const data = await response.json();
        const etag = response.headers.get('etag');
        this.set(key, data, etag || undefined);
      }
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  }

  // Get query client instance
  public getQueryClient(): QueryClient {
    return this.queryClient;
  }

  // Prefetch data
  public async prefetch<T>(key: string, fetchFn: () => Promise<T>): Promise<void> {
    try {
      const data = await fetchFn();
      this.set(key, data);
    } catch (error) {
      console.error('Prefetch failed:', error);
    }
  }

  // Batch prefetch multiple items
  public async prefetchBatch<T>(
    items: Array<{ key: string; fetchFn: () => Promise<T> }>
  ): Promise<void> {
    await Promise.all(items.map(item => this.prefetch(item.key, item.fetchFn)));
  }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance();

// Export hook for using cache
export const useCache = <T>(key: string, fetchFn: () => Promise<T>) => {
  return useQuery({
    queryKey: [key],
    queryFn: fetchFn,
    staleTime: defaultConfig.staleTime,
    gcTime: defaultConfig.gcTime,
  });
};

export const cache = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      const { data, expires } = JSON.parse(item) as CacheEntry<T>;
      if (Date.now() > expires) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },
  set<T>(key: string, data: T, ttl: number) {
    if (typeof window === 'undefined') return;
    const expires = Date.now() + ttl;
    localStorage.setItem(key, JSON.stringify({ data, expires }));
  },
  remove(key: string) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
}; 
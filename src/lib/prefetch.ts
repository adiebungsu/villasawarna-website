import { cache } from './cache';

const CACHE_KEY_PREFIX = 'prefetch:';

export async function prefetch<T>(key: string, fetchFn: () => Promise<T>, ttl: number = 3600 * 1000 /* 1 jam */): Promise<T> {
  const cacheKey = CACHE_KEY_PREFIX + key;
  const cached = cache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }
  const data = await fetchFn();
  cache.set(cacheKey, data, ttl);
  return data;
}

// Contoh penggunaan:
// const data = await prefetch('destinations', () => fetch('/api/destinations').then(res => res.json())); 
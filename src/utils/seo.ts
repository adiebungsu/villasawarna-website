export type HreflangAlternate = { hrefLang: string; href: string };

const DEFAULT_ORIGIN = 'https://villasawarna.com';

function resolveOrigin(): string {
  try {
    if (typeof window !== 'undefined' && window.location?.origin) {
      return window.location.origin;
    }
  } catch {}
  return DEFAULT_ORIGIN;
}

function normalizePath(input: string): string {
  if (!input) return '/';
  // If already absolute URL, return as-is
  if (/^https?:\/\//i.test(input)) return input;
  // Ensure it starts with '/'
  return input.startsWith('/') ? input : `/${input}`;
}

/**
 * Build standard hreflang alternates for a given path (or absolute URL).
 * Returns id-ID, en-US and x-default variants.
 */
export function buildHreflangAlternates(pathOrUrl: string): HreflangAlternate[] {
  const origin = resolveOrigin();
  const normalized = normalizePath(pathOrUrl);

  if (/^https?:\/\//i.test(normalized)) {
    // Absolute URL provided; derive base path from it
    try {
      const url = new URL(normalized);
      const cleanPath = url.pathname.replace(/^\/(en|id)(\/|$)/i, '/');
      const query = url.search || '';
      const idHref = `${origin}${cleanPath}${query}`;
      const enHref = `${origin}/en${cleanPath}${query}`.replace(/\/+/, '/').replace(':/', '://');
      return [
        { hrefLang: 'id-ID', href: idHref },
        { hrefLang: 'en-US', href: enHref },
        { hrefLang: 'x-default', href: idHref },
      ];
    } catch {
      // Fallback: treat as path
    }
  }

  const cleanPath = normalized.replace(/^\/(en|id)(\/|$)/i, '/');
  const idHref = `${origin}${cleanPath}`;
  const enHref = `${origin}/en${cleanPath}`.replace(/\/+/, '/').replace(':/', '://');
  return [
    { hrefLang: 'id-ID', href: idHref },
    { hrefLang: 'en-US', href: enHref },
    { hrefLang: 'x-default', href: idHref },
  ];
}








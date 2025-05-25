import { useEffect } from 'react';
import { META_PIXEL_ID, pageView } from '@/config/metaPixel';

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

export default function MetaPixel() {
  useEffect(() => {
    // Inisialisasi Meta Pixel
    if (typeof window !== 'undefined') {
      // Load Meta Pixel script
      const initFBQ = (f: Window, b: Document, e: string, v: string, n: FBQ, t: HTMLScriptElement, s: HTMLElement) => {
        if (f.fbq) return;
        n = f.fbq = function(...args: unknown[]) {
          if (n.callMethod) {
            n.callMethod(...args);
          } else {
            n.queue?.push(args);
          }
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e) as HTMLScriptElement;
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0] as HTMLElement;
        s.parentNode?.insertBefore(t, s);
      };

      initFBQ(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
        window.fbq,
        {} as HTMLScriptElement,
        {} as HTMLElement
      );
      
      window.fbq('init', META_PIXEL_ID);
      pageView();
    }
  }, []);

  return null;
} 
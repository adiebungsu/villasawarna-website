import { useEffect } from 'react';

interface PreloadOptions {
  priority?: boolean;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

export const usePreloadImages = (urls: string[], options: PreloadOptions = {}) => {
  useEffect(() => {
    const preloadImages = async () => {
      const { priority = false, quality = 80, format = 'webp' } = options;

      // Preload untuk priority images
      if (priority) {
        urls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = url;
          document.head.appendChild(link);
        });
      }

      // Preload untuk semua gambar
      urls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages();
  }, [urls, options.priority, options.quality, options.format]);
}; 
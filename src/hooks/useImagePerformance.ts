import { useState, useEffect } from 'react';

interface ImagePerformanceMetrics {
  loadTime: number;
  size: number;
  format: string;
  dimensions: {
    width: number;
    height: number;
  };
}

export const useImagePerformance = (src: string) => {
  const [metrics, setMetrics] = useState<ImagePerformanceMetrics | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const measurePerformance = async () => {
      try {
        const startTime = performance.now();
        
        // Fetch image untuk mendapatkan ukuran
        const response = await fetch(src);
        const blob = await response.blob();
        const size = blob.size;
        
        // Get image format
        const format = blob.type.split('/')[1];
        
        // Get image dimensions
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
        
        const loadTime = performance.now() - startTime;
        
        setMetrics({
          loadTime,
          size,
          format,
          dimensions: {
            width: img.width,
            height: img.height
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to measure image performance'));
      }
    };

    measurePerformance();
  }, [src]);

  return { metrics, error };
}; 
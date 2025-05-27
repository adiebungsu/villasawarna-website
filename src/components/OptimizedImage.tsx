import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/utils';
import { optimizeImageUrl, generateBlurPlaceholder, getResponsiveSrcSet } from '@/utils/image';
import { useConnectionStatus } from '@/hooks/useConnectionStatus';
import { useImagePerformance } from '@/hooks/useImagePerformance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  style?: React.CSSProperties;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  style,
  sizes = '100vw',
  loading = priority ? 'eager' : 'lazy',
  placeholder = 'blur',
  blurDataURL,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string>(blurDataURL || '');
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');
  const [srcsetString, setSrcsetString] = useState<string>('');
  const { isSlowConnection, isMediumConnection } = useConnectionStatus();
  const { metrics } = useImagePerformance(src);

  // Optimize quality based on connection
  const optimizedQuality = isSlowConnection ? 50 : isMediumConnection ? 65 : quality;
  
  // Optimize size based on connection
  const optimizedWidth = isSlowConnection ? Math.round((width || 800) * 0.7) : width;
  const optimizedHeight = isSlowConnection ? Math.round((height || 600) * 0.7) : height;

  // Generate srcset sizes
  const srcsetSizes = [320, 640, 960, 1280, 1920].filter(size => size <= (width || 1920));

  // Preload dan optimasi gambar
  useEffect(() => {
    const optimizeAndPreload = async () => {
      try {
        // Optimasi URL gambar
        const optimized = await optimizeImageUrl(src, {
          width: optimizedWidth,
          height: optimizedHeight,
          quality: optimizedQuality,
          format: 'webp'
        });
        setOptimizedSrc(optimized);

        // Generate srcset
        const srcset = await getResponsiveSrcSet(src, srcsetSizes, {
          quality: optimizedQuality,
          format: 'webp'
        });
        setSrcsetString(srcset);

        // Generate blur placeholder untuk non-priority images
        if (!priority && placeholder === 'blur') {
          const blur = await generateBlurPlaceholder(src);
          setBlurDataUrl(blur);
        }

        // Preload untuk priority images
        if (priority) {
          const img = new Image();
          img.src = optimized;
          img.onload = () => {
            setIsLoaded(true);
            onLoad?.();
          };
          img.onerror = () => {
            setError(true);
            setIsLoaded(true);
          };
        }
      } catch (err) {
        console.error('Error optimizing image:', err);
        setOptimizedSrc(src);
      }
    };

    optimizeAndPreload();
  }, [src, width, height, quality, priority, placeholder, onLoad, srcsetSizes, optimizedQuality]);

  // Log performa gambar jika metrics tersedia
  useEffect(() => {
    if (metrics) {
      console.log(`Image Performance - ${src}:`, {
        loadTime: `${metrics.loadTime.toFixed(2)}ms`,
        size: `${(metrics.size / 1024).toFixed(2)}KB`,
        format: metrics.format,
        dimensions: metrics.dimensions
      });
    }
  }, [metrics, src]);

  if (error) {
    return (
      <div className={cn('bg-gray-100 flex items-center justify-center', className)} style={style}>
        <span className="text-gray-400">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)} style={style}>
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: blurDataUrl ? `url(${blurDataUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      <img
        src={optimizedSrc || src}
        srcSet={srcsetString}
        sizes={sizes}
        alt={alt}
        width={optimizedWidth}
        height={optimizedHeight}
        loading={loading}
        decoding={priority ? 'sync' : 'async'}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{
          ...style,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

export default OptimizedImage; 
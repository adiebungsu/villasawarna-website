import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/utils';
import { optimizeImageUrl, generateBlurPlaceholder } from '@/utils/image';

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
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string>('');
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');

  // Preload dan optimasi gambar
  useEffect(() => {
    const optimizeAndPreload = async () => {
      try {
        // Optimasi URL gambar
        const optimized = await optimizeImageUrl(src, {
          width,
          height,
          quality,
          format: 'webp'
        });
        setOptimizedSrc(optimized);

        // Generate blur placeholder untuk non-priority images
        if (!priority) {
          const blur = await generateBlurPlaceholder(src);
          setBlurDataUrl(blur);
        }

        // Preload untuk priority images
        if (priority) {
          const img = new Image();
          img.src = optimized;
          img.onload = () => setIsLoaded(true);
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
  }, [src, width, height, quality, priority]);

  // Tambahkan preload link untuk priority images
  useEffect(() => {
    if (priority && optimizedSrc) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = optimizedSrc;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, optimizedSrc]);

  if (error) {
    return (
      <div 
        className={cn('bg-gray-100 flex items-center justify-center', className)}
        style={{ width, height, ...style }}
      >
        <span className="text-gray-400">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden ${className}`}
    >
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
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
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
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setError(true);
          setIsLoaded(true);
          const target = e.target as HTMLImageElement;
          target.src = '/images/placeholder.jpg';
        }}
      />
    </motion.div>
  );
};

export default OptimizedImage; 
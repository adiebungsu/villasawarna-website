import { useState, useEffect } from 'react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import { motion, AnimatePresence } from 'framer-motion';

interface ConnectionAwareImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function ConnectionAwareImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL
}: ConnectionAwareImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { isSlowConnection, isMediumConnection } = useConnectionStatus();

  // Optimize image quality based on connection
  const optimizedQuality = isSlowConnection ? 50 : isMediumConnection ? 65 : quality;
  
  // Optimize image size based on connection
  const optimizedWidth = isSlowConnection ? Math.round((width || 800) * 0.7) : width;
  const optimizedHeight = isSlowConnection ? Math.round((height || 600) * 0.7) : height;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: optimizedWidth, height: optimizedHeight }}
      >
        <span className="text-gray-500">Gagal memuat gambar</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-200 animate-pulse"
            style={{ width: optimizedWidth, height: optimizedHeight }}
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        width={optimizedWidth}
        height={optimizedHeight}
        loading={priority ? 'eager' : 'lazy'}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: optimizedWidth,
          height: optimizedHeight,
          objectFit: 'cover'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
} 
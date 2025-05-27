import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { optimizeImageUrl, generateBlurPlaceholder } from '@/utils/image';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  quality?: number;
  priority?: boolean;
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export function OptimizedImage({
  src,
  alt,
  className,
  quality = 75,
  priority = false,
  width,
  height,
  format = 'webp',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [blurDataUrl, setBlurDataUrl] = useState<string>('');

  useEffect(() => {
    const optimizeImage = async () => {
      try {
        const optimized = await optimizeImageUrl(src, {
          width,
          height,
          quality,
          format
        });
        setOptimizedSrc(optimized);

        if (!priority) {
          const blur = await generateBlurPlaceholder(src);
          setBlurDataUrl(blur);
        }
      } catch (err) {
        console.error('Error optimizing image:', err);
        setOptimizedSrc(src);
      }
    };

    optimizeImage();
  }, [src, width, height, quality, format, priority]);

  if (error) {
    return (
      <div className={cn('bg-gray-100 flex items-center justify-center', className)}>
        <span className="text-gray-400">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
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
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true);
          setIsLoaded(true);
        }}
        crossOrigin="anonymous"
        {...props}
      />
    </div>
  );
} 
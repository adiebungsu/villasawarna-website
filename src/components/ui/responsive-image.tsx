import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  blurDataURL?: string;
  className?: string;
  onLoad?: () => void;
}

export const ResponsiveImage = ({
  src,
  alt,
  sizes = '100vw',
  quality = 75,
  priority = false,
  blurDataURL,
  className,
  onLoad,
}: ResponsiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Preload image jika priority true
  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        onLoad?.();
      };
      img.onerror = () => {
        setIsError(true);
        setIsLoading(false);
      };
    } else {
      setImageSrc(src);
    }
  }, [src, priority, onLoad]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setIsError(true);
    setIsLoading(false);
  }, []);

  // Generate blur placeholder jika tidak disediakan
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2YwZjBmMCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjBmMGYwIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+';

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {(isLoading || blurDataURL) && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${blurDataURL || defaultBlurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Actual image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            isError ? 'hidden' : 'block'
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Gagal memuat gambar</p>
          </div>
        </div>
      )}
    </div>
  );
}; 
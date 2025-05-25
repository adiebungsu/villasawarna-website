import { useState } from 'react';
import { cn } from '@/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: number;
}

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  quality = 75,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Optimize image URL
  const optimizedSrc = src.startsWith('http') 
    ? src 
    : `${src}?w=${width}&q=${quality}`;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={error ? '/images/placeholder.jpg' : optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
      />
    </div>
  );
};

export default Image; 
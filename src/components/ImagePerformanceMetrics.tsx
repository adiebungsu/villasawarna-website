import React from 'react';
import { useImagePerformance } from '@/hooks/useImagePerformance';

interface ImagePerformanceMetricsProps {
  src: string;
  className?: string;
}

export const ImagePerformanceMetrics: React.FC<ImagePerformanceMetricsProps> = ({
  src,
  className
}) => {
  const metrics = useImagePerformance(src);

  if (!metrics) return null;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className={`text-xs text-gray-500 space-y-1 ${className}`}>
      <div>Load Time: {formatTime(metrics.loadTime)}</div>
      <div>Size: {formatSize(metrics.size)}</div>
      <div>Format: {metrics.format}</div>
      <div>Dimensions: {metrics.dimensions.width}x{metrics.dimensions.height}</div>
    </div>
  );
}; 
import React, { lazy, ComponentType, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface DynamicImportOptions {
  loadingComponent?: ComponentType;
  fallback?: React.ReactNode;
}

const defaultLoadingComponent = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Skeleton className="w-full h-full" />
  </div>
);

export function dynamicImport<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
) {
  const Component = lazy(importFn);
  const LoadingComponent = options.loadingComponent || defaultLoadingComponent;

  return function DynamicComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={options.fallback || <LoadingComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// Predefined dynamic imports untuk komponen yang sering digunakan
export const DynamicImageGallery = dynamicImport(
  () => import('@/components/ImageGallery'),
  {
    loadingComponent: () => (
      <div className="w-full aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
    ),
  }
);

export const DynamicMap = dynamicImport(
  () => import('@/components/Map'),
  {
    loadingComponent: () => (
      <div className="w-full h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    ),
  }
);

export const DynamicCalendar = dynamicImport(
  () => import('@/components/Calendar'),
  {
    loadingComponent: () => (
      <div className="w-full h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    ),
  }
); 
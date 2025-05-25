import { Suspense, lazy, ComponentType } from 'react';

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<Record<string, unknown>> }>;
  fallback?: React.ReactNode;
}

export function LazyLoad({ component, fallback }: LazyLoadProps) {
  const Component = lazy(component);

  return (
    <Suspense fallback={fallback || <div className="w-full h-full bg-gray-100 animate-pulse" />}>
      <Component />
    </Suspense>
  );
} 
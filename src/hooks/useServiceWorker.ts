import { useState, useEffect } from 'react';

interface ServiceWorkerState {
  updateAvailable: boolean;
  update: () => Promise<void>;
  isInstalled: boolean;
  isUpdating: boolean;
  isWaiting: boolean;
  error: Error | null;
}

export function useServiceWorker(): ServiceWorkerState {
  const [state, setState] = useState<ServiceWorkerState>({
    updateAvailable: false,
    update: async () => {},
    isInstalled: false,
    isUpdating: false,
    isWaiting: false,
    error: null,
  });

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        setState((prev) => ({
          ...prev,
          isInstalled: true,
          updateAvailable: registration.waiting !== null,
          update: async () => {
            if (registration.waiting) {
              setState((prev) => ({ ...prev, isUpdating: true }));
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
          },
        }));
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          window.location.reload();
        }
      });
    }
  }, []);

  return state;
} 
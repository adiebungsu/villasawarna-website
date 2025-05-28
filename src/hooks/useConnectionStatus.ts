import { useState, useEffect } from 'react';

interface ConnectionStatus {
  isSlowConnection: boolean;
  isMediumConnection: boolean;
  effectiveConnectionType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
}

interface NetworkInformation extends EventTarget {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  saveData: boolean;
  downlink: number;
  rtt: number;
}

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }
}

export const useConnectionStatus = (): ConnectionStatus => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isSlowConnection: false,
    isMediumConnection: false,
    effectiveConnectionType: 'unknown'
  });

  useEffect(() => {
    const updateConnectionStatus = () => {
      // Cek dukungan Network Information API
      if ('connection' in navigator) {
        const connection = navigator.connection;
        const effectiveType = connection?.effectiveType || 'unknown';
        
        setStatus({
          isSlowConnection: effectiveType === 'slow-2g' || effectiveType === '2g',
          isMediumConnection: effectiveType === '3g',
          effectiveConnectionType: effectiveType
        });
      } else {
        // Fallback: Gunakan navigator.onLine dan timing
        const isSlow = !navigator.onLine || performance.getEntriesByType('resource').some(
          entry => entry.duration > 3000 // Lebih dari 3 detik dianggap lambat
        );
        
        setStatus({
          isSlowConnection: isSlow,
          isMediumConnection: !isSlow && performance.getEntriesByType('resource').some(
            entry => entry.duration > 1000 // Lebih dari 1 detik dianggap sedang
          ),
          effectiveConnectionType: 'unknown'
        });
      }
    };

    // Update status saat koneksi berubah
    if ('connection' in navigator) {
      const connection = navigator.connection;
      connection?.addEventListener('change', updateConnectionStatus);
    }

    // Update status awal
    updateConnectionStatus();

    // Cleanup
    return () => {
      if ('connection' in navigator) {
        const connection = navigator.connection;
        connection?.removeEventListener('change', updateConnectionStatus);
      }
    };
  }, []);

  return status;
}; 
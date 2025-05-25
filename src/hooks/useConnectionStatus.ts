import { useState, useEffect } from 'react';

interface ConnectionInfo {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  saveData: boolean;
  downlink: number;
  rtt: number;
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

export function useConnectionStatus() {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    effectiveType: '4g',
    saveData: false,
    downlink: 10,
    rtt: 50
  });

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      const updateConnectionStatus = () => {
        if (connection) {
          setConnectionInfo({
            effectiveType: connection.effectiveType,
            saveData: connection.saveData,
            downlink: connection.downlink,
            rtt: connection.rtt
          });
        }
      };

      connection?.addEventListener('change', updateConnectionStatus);
      updateConnectionStatus();

      return () => {
        connection?.removeEventListener('change', updateConnectionStatus);
      };
    }
  }, []);

  const isSlowConnection = 
    connectionInfo.effectiveType === 'slow-2g' || 
    connectionInfo.effectiveType === '2g' ||
    connectionInfo.saveData;

  const isMediumConnection = 
    connectionInfo.effectiveType === '3g' ||
    connectionInfo.downlink < 2 ||
    connectionInfo.rtt > 100;

  return {
    isSlowConnection,
    isMediumConnection,
    connectionInfo
  };
} 
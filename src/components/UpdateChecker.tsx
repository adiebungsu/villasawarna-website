import React, { useState, useEffect } from 'react';
import { RefreshCw, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { checkForUpdates, getUpdateStatus, getCurrentVersion, skipWaiting } from '@/utils/registerServiceWorker';

interface UpdateStatus {
  available: boolean;
  installed: boolean;
}

const UpdateChecker: React.FC = () => {
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({ available: false, installed: false });
  const [currentVersion, setCurrentVersion] = useState<string>('1.0.0');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    // Get initial status
    setUpdateStatus(getUpdateStatus());
    setCurrentVersion(getCurrentVersion());

    // Check for updates every 30 seconds
    const interval = setInterval(() => {
      const status = getUpdateStatus();
      setUpdateStatus(status);
      
      // Auto-check for updates every 5 minutes
      if (new Date().getTime() - lastChecked.getTime() > 5 * 60 * 1000) {
        handleCheckUpdates();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [lastChecked]);

  const handleCheckUpdates = async () => {
    setIsChecking(true);
    try {
      // Force cache clear and update check
      await checkForUpdates();
      
      // Additional manual check with delay
      setTimeout(async () => {
        try {
          // Force reload manifest to trigger cache invalidation
          await fetch('/manifest.json?t=' + Date.now(), {
            cache: 'no-cache',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
          });
          
          // Check status again
          setUpdateStatus(getUpdateStatus());
          setLastChecked(new Date());
          
          console.log('🔄 Manual update check completed');
        } catch (fetchError) {
          console.log('⚠️ Manual check fetch failed');
        } finally {
          setIsChecking(false);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Failed to check updates:', error);
      setIsChecking(false);
    }
  };

  const handleUpdateNow = async () => {
    try {
      await skipWaiting();
      // Page will reload automatically
    } catch (error) {
      console.error('Failed to update:', error);
      // Fallback: manual reload
      window.location.reload();
    }
  };

  const getStatusColor = () => {
    if (updateStatus.installed) return 'bg-green-500';
    if (updateStatus.available) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  const getStatusText = () => {
    if (updateStatus.installed) return 'Update Siap';
    if (updateStatus.available) return 'Auto-Update';
    return 'Up to Date';
  };

  const getStatusIcon = () => {
    if (updateStatus.installed) return <CheckCircle className="w-4 h-4" />;
    if (updateStatus.available) return <Download className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
          <RefreshCw className="w-5 h-5" />
          Update Checker
        </CardTitle>
        <CardDescription className="text-blue-700 dark:text-blue-300">
          Update otomatis untuk memastikan harga dan informasi terbaru
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
            <Badge className={`${getStatusColor()} text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2`}>
              <div className="flex items-center gap-1">
                {getStatusIcon()}
                <span className="hidden sm:inline">{getStatusText()}</span>
                <span className="sm:hidden">{getStatusText().split(' ')[0]}</span>
              </div>
            </Badge>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Version</div>
            <div className="text-sm font-mono text-gray-700 dark:text-gray-300">{currentVersion}</div>
          </div>
        </div>

        {/* Last Checked */}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Terakhir dicek: {lastChecked.toLocaleTimeString()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleCheckUpdates}
            disabled={isChecking}
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base py-2 sm:py-2"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isChecking ? 'Checking...' : 'Check Updates'}</span>
            <span className="sm:hidden">{isChecking ? 'Checking...' : 'Check'}</span>
          </Button>
          
          {(updateStatus.available || updateStatus.installed) && (
            <Button
              onClick={handleUpdateNow}
              className="w-full sm:flex-1 bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base py-2 sm:py-2"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Update Sekarang</span>
              <span className="sm:hidden">Update</span>
            </Button>
          )}
        </div>

        {/* Update Info */}
        {updateStatus.available && (
          <div className="p-3 sm:p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm sm:text-base text-blue-800 dark:text-blue-200 min-w-0">
                <p className="font-medium mb-1">Update Baru Tersedia!</p>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Versi terbaru telah siap untuk diinstall. Klik "Update Sekarang" untuk menggunakan versi baru.
                </p>
              </div>
            </div>
          </div>
        )}

        {updateStatus.installed && (
          <div className="p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm sm:text-base text-green-800 dark:text-green-200 min-w-0">
                <p className="font-medium mb-1">Update Siap Diaktifkan!</p>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  Update telah diinstall dan siap digunakan. Halaman akan reload otomatis.
                </p>
              </div>
            </div>
          </div>
        )}

                 {/* Debug Info */}
         <details className="text-xs">
           <summary className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
             🔍 Debug Info
           </summary>
           <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono space-y-1 overflow-x-auto">
             <div className="break-all">Status: {JSON.stringify(updateStatus)}</div>
             <div>Version: {currentVersion}</div>
             <div className="break-all">Last Check: {lastChecked.toISOString()}</div>
             <div className="break-all">User Agent: {navigator.userAgent.substring(0, 50)}...</div>
             <div>Online: {navigator.onLine ? 'Yes' : 'No'}</div>
             <div>Service Worker: {navigator.serviceWorker ? 'Supported' : 'Not Supported'}</div>
             <div>Cache Storage: {'caches' in window ? 'Supported' : 'Not Supported'}</div>
             <div>Page Visibility: {document.hidden ? 'Hidden' : 'Visible'}</div>
           </div>
         </details>
      </CardContent>
    </Card>
  );
};

export default UpdateChecker;


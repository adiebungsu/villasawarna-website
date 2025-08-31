// Service Worker Registration dengan Update Detection yang Lebih Baik
// Version: 1.0.1

interface UpdateInfo {
  type: 'UPDATE_AVAILABLE' | 'UPDATE_INSTALLED' | 'UPDATE_ACTIVATED';
  version: string;
  timestamp: number;
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private updateAvailable = false;
  private updateInstalled = false;
  private updateCheckInterval: NodeJS.Timeout | null = null;
  private versionCheckInterval: NodeJS.Timeout | null = null;
  private currentVersion = '1.0.0';

  constructor() {
    this.init();
  }

  private async init() {
  if ('serviceWorker' in navigator) {
    try {
        await this.register();
        this.setupEventListeners();
        this.startPeriodicChecks();
        console.log('✅ Service Worker Manager initialized successfully');
      } catch (error) {
        console.error('❌ Service Worker Manager initialization failed:', error);
      }
    } else {
      console.warn('⚠️ Service Worker not supported in this browser');
    }
  }

  private async register(): Promise<void> {
    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Always check for updates
      });

      console.log('🔄 Service Worker registered:', this.registration.scope);
      
      // Check for immediate updates
      await this.checkForUpdates();
      
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
      throw error;
    }
  }

  private setupEventListeners(): void {
    if (!this.registration) return;

    // Listen for service worker updates
    this.registration.addEventListener('updatefound', () => {
      console.log('🔄 Service Worker update found');
      
      const newWorker = this.registration!.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
          console.log('🔄 New worker state:', newWorker.state);
          
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateInstalled = true;
            this.showUpdateNotification('installed');
              }
          
          if (newWorker.state === 'activated') {
            this.updateInstalled = false;
            this.updateAvailable = false;
            this.showUpdateNotification('activated');
            }
          });
        }
      });

    // Listen for service worker messages
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('📨 Received message from Service Worker:', event.data);
      
      if (event.data.type === 'SW_ACTIVATED') {
        this.handleServiceWorkerActivated(event.data);
      }
      
      if (event.data.type === 'FORCE_UPDATE') {
        this.forceUpdate();
      }
    });

    // Listen for controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker controller changed');
      this.updateAvailable = false;
      this.updateInstalled = false;
      
      // Reload page to use new service worker
      setTimeout(() => {
        if (this.updateAvailable || this.updateInstalled) {
          window.location.reload();
        }
      }, 1000);
    });
  }

  private startPeriodicChecks(): void {
    // Completely disable all checks in development mode
    if (import.meta.env.DEV) {
      console.log('🛠️ Development mode detected, disabling all update checks');
      return;
    }

    // Check for updates every 10 minutes (much less frequent)
    this.updateCheckInterval = setInterval(() => {
      this.checkForUpdates();
    }, 10 * 60 * 1000);

    // Check version every 5 minutes (much less aggressive)
    this.versionCheckInterval = setInterval(() => {
      this.checkVersion();
    }, 5 * 60 * 1000);
    
    // Only check on page focus if not in development
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !import.meta.env.DEV) {
        console.log('🔄 Page became visible, checking for updates...');
        this.checkForUpdates();
      }
    });
    
    // Only check on network status change if not in development
    window.addEventListener('online', () => {
      if (!import.meta.env.DEV) {
        console.log('🔄 Network online, checking for updates...');
        this.checkForUpdates();
      }
    });
  }

  private async checkForUpdates(): Promise<void> {
    if (!this.registration) return;
    
    // Skip update checks in development mode
    if (import.meta.env.DEV) {
      console.log('🛠️ Development mode: skipping update check');
      return;
    }

    try {
      console.log('🔍 Checking for Service Worker updates...');
      
      // Force update check with cache busting
      await this.registration.update();
      
      // Additional check: fetch a version file to trigger cache invalidation
      try {
        const response = await fetch('/manifest.json?t=' + Date.now(), {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (response.ok) {
          console.log('🔄 Cache busting successful');
        }
      } catch (fetchError) {
        console.log('⚠️ Cache busting failed, continuing with normal update check');
      }
      
      // Check if there's a waiting worker
      if (this.registration.waiting) {
        console.log('🔄 Update available, waiting worker detected');
        this.updateAvailable = true;
        this.showUpdateNotification('available');
      } else {
        console.log('✅ No updates available');
      }
      
    } catch (error) {
      console.error('❌ Update check failed:', error);
    }
  }

  private async checkVersion(): Promise<void> {
    if (!this.registration || !this.registration.active) return;
    
    // Skip version checks in development mode
    if (import.meta.env.DEV) {
      console.log('🛠️ Development mode: skipping version check');
      return;
    }

    try {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'VERSION_INFO') {
          const newVersion = event.data.version;
          if (newVersion !== this.currentVersion) {
            console.log('🔄 New version detected:', newVersion, 'vs', this.currentVersion);
            this.currentVersion = newVersion;
            this.updateAvailable = true;
            this.showUpdateNotification('available');
          }
        }
      };

      this.registration.active.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      );
      
      // Fallback: Check version via fetch if service worker doesn't respond
      setTimeout(async () => {
        try {
          const response = await fetch('/version.json?t=' + Date.now(), {
            cache: 'no-cache'
          });
          
          if (response.ok) {
            const versionData = await response.json();
            if (versionData.version && versionData.version !== this.currentVersion) {
              console.log('🔄 New version detected via fetch:', versionData.version);
              this.currentVersion = versionData.version;
              this.updateAvailable = true;
              this.showUpdateNotification('available');
            }
          }
        } catch (fetchError) {
          console.log('⚠️ Version fetch failed, using service worker version');
        }
      }, 2000); // Wait 2 seconds for service worker response
      
    } catch (error) {
      console.error('❌ Version check failed:', error);
    }
  }

  private showUpdateNotification(type: 'available' | 'installed' | 'activated'): void {
    const messages = {
      available: 'Update otomatis dalam 3 detik...',
      installed: 'Update telah diinstall. Reload halaman untuk menggunakan versi baru.',
      activated: 'Update telah diaktifkan! Halaman akan reload otomatis.'
    };

    const message = messages[type];
    
    // For available updates, auto-update without showing pop-up
    if (type === 'available') {
      console.log('🔄 Auto-updating to new version...');
      
      // Show subtle loading indicator
      this.showSubtleLoadingIndicator();
      
      // Auto-reload after 3 seconds without user interaction
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return; // Don't show any notifications
    }
    
    // For other types, show minimal notification (only in console)
    console.log(`🔄 Update Status: ${message}`);
    
    // Only show browser notification for installed/activated (not available)
    if (type !== 'available') {
      this.showBrowserNotification(message);
    }
  }

  private showToast(message: string, type: string): void {
    // Create custom toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl transition-all duration-300 transform translate-x-full`;
    
    toast.innerHTML = `
      <div class="p-6">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 ${type === 'available' ? 'bg-gradient-to-br from-blue-500 to-blue-600' : type === 'installed' ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-gray-500 to-gray-600'} rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              ${type === 'available' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>' : type === 'installed' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${type === 'available' ? 'Update Tersedia' : type === 'installed' ? 'Update Siap' : 'Status Update'}</h3>
              <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">${message}</p>
            ${type === 'available' ? `
              <div class="mt-4 flex gap-3">
                <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105" onclick="window.location.reload()">
                  Update Sekarang
                </button>
                <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
                  Nanti
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full');
    });
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
          if (toast.parentElement) {
            toast.remove();
          }
        }, 300);
      }
    }, 15000);
  }

  private async showBrowserNotification(message: string): Promise<void> {
    if (!('Notification' in window)) return;
    
    if (Notification.permission === 'granted') {
      new Notification('Villa Sawarna Update', {
        body: message,
        icon: '/images/logo-villasawarna2.png',
        tag: 'villa-update',
        requireInteraction: true
      });
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.showBrowserNotification(message);
      }
    }
  }

  private showSubtleLoadingIndicator(): void {
    // Create a subtle loading indicator in the top-right corner
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'auto-update-indicator';
    loadingIndicator.className = 'fixed top-4 right-4 z-40 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg opacity-90';
    loadingIndicator.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
        <span>Memperbarui...</span>
      </div>
    `;
    
    document.body.appendChild(loadingIndicator);
    
    // Auto-remove after 3 seconds (when page reloads)
    setTimeout(() => {
      if (loadingIndicator.parentElement) {
        loadingIndicator.remove();
      }
    }, 3000);
  }

  private handleServiceWorkerActivated(data: any): void {
    console.log('🚀 Service Worker activated:', data.version);
    this.currentVersion = data.version;
    
    // Show activation notification
    this.showUpdateNotification('activated');
    
    // Reload page after short delay
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  private forceUpdate(): void {
    console.log('🔄 Force update requested');
    
    // Clear all caches first
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('🗑️ Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('✅ All caches cleared, reloading page...');
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }

  public async skipWaiting(): Promise<void> {
    if (!this.registration || !this.registration.waiting) return;
    
    try {
      console.log('🔄 Skipping waiting...');
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } catch (error) {
      console.error('❌ Skip waiting failed:', error);
    }
  }

  public getUpdateStatus(): { available: boolean; installed: boolean } {
    return {
      available: this.updateAvailable,
      installed: this.updateInstalled
    };
  }

  public getCurrentVersion(): string {
    return this.currentVersion;
  }

  public destroy(): void {
    if (this.updateCheckInterval) {
      clearInterval(this.updateCheckInterval);
    }
    if (this.versionCheckInterval) {
      clearInterval(this.versionCheckInterval);
    }
  }
}

// Create global instance
const swManager = new ServiceWorkerManager();

// Export functions for external use
export const registerServiceWorker = async (): Promise<void> => {
  // Manager is already initialized in constructor
  console.log('🔄 Service Worker registration initiated');
};

export const checkForUpdates = async (): Promise<void> => {
  await swManager.checkForUpdates();
};

export const skipWaiting = async (): Promise<void> => {
  await swManager.skipWaiting();
};

export const getUpdateStatus = (): { available: boolean; installed: boolean } => {
  return swManager.getUpdateStatus();
};

export const getCurrentVersion = (): string => {
  return swManager.getCurrentVersion();
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  swManager.destroy();
});

// Make manager available globally for debugging
(window as any).swManager = swManager; 
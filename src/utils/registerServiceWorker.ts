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
    // Check for updates every 5 minutes
    this.updateCheckInterval = setInterval(() => {
      this.checkForUpdates();
    }, 5 * 60 * 1000);

    // Check version every 30 seconds
    this.versionCheckInterval = setInterval(() => {
      this.checkVersion();
    }, 30 * 1000);
  }

  private async checkForUpdates(): Promise<void> {
    if (!this.registration) return;

    try {
      console.log('🔍 Checking for Service Worker updates...');
      await this.registration.update();
      
      // Check if there's a waiting worker
      if (this.registration.waiting) {
        this.updateAvailable = true;
        this.showUpdateNotification('available');
      }
      
    } catch (error) {
      console.error('❌ Update check failed:', error);
    }
  }

  private async checkVersion(): Promise<void> {
    if (!this.registration || !this.registration.active) return;

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
      
    } catch (error) {
      console.error('❌ Version check failed:', error);
    }
  }

  private showUpdateNotification(type: 'available' | 'installed' | 'activated'): void {
    const messages = {
      available: 'Ada update baru tersedia! Klik untuk update.',
      installed: 'Update telah diinstall. Reload halaman untuk menggunakan versi baru.',
      activated: 'Update telah diaktifkan! Halaman akan reload otomatis.'
    };

    const message = messages[type];
    
    // Show toast notification
    this.showToast(message, type);
    
    // Show browser notification if permitted
    this.showBrowserNotification(message);
    
    // Log update status
    console.log(`🔄 Update Status: ${message}`);
  }

  private showToast(message: string, type: string): void {
    // Create custom toast notification
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
      type === 'available' ? 'bg-blue-500 text-white' :
      type === 'installed' ? 'bg-green-500 text-white' :
      'bg-gray-500 text-white'
    }`;
    
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-lg">🔄</span>
        <div>
          <p class="font-medium">Update Tersedia</p>
          <p class="text-sm opacity-90">${message}</p>
        </div>
        <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
          ✕
        </button>
      </div>
      ${type === 'available' ? `
        <div class="mt-3 flex gap-2">
          <button class="px-3 py-1 bg-white text-blue-500 rounded text-sm font-medium hover:bg-gray-100" onclick="window.location.reload()">
            Update Sekarang
          </button>
          <button class="px-3 py-1 bg-transparent border border-white text-white rounded text-sm font-medium hover:bg-white hover:text-blue-500" onclick="this.parentElement.parentElement.parentElement.remove()">
            Nanti
          </button>
        </div>
      ` : ''}
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 10000);
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
    window.location.reload();
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
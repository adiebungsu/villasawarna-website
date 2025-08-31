// Service Worker untuk Villa Sawarna
// Version: 1.0.1 - Update Detection & Cache Management

const CACHE_VERSION = 'v1.0.1';
const CACHE_NAME = `villa-sawarna-${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `villa-images-${CACHE_VERSION}`;

// Check if we're in development mode
const isDevelopment = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// Daftar URL yang harus di-cache saat instalasi
const urlsToCache = [
  '/',
  '/images/placeholder.jpg',
  '/images/logo-villasawarna2.png',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker installing...', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME),
      caches.open(IMAGE_CACHE_NAME)
    ]).then(([cache, imageCache]) => {
      console.log('📦 Caching app resources...');
      return Promise.all([
        cache.addAll(urlsToCache),
        imageCache.addAll(urlsToCache.filter(url => url.startsWith('/images/')))
      ]);
    }).then(() => {
      console.log('✅ Service Worker installed successfully');
      // Skip waiting to activate immediately
      return self.skipWaiting();
    })
  );
});

// Activate event - bersihkan cache lama dan take control
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => 
              (name.startsWith('villa-sawarna-') && name !== CACHE_NAME) ||
              (name.startsWith('villa-images-') && name !== IMAGE_CACHE_NAME)
            )
            .map((name) => {
              console.log('🗑️ Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker activated and controlling clients');
      
      // Send message to all clients about update
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SW_ACTIVATED',
            version: CACHE_VERSION,
            timestamp: Date.now()
          });
        });
      });
    })
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // In development mode, bypass cache for better debugging
  if (isDevelopment) {
    // Only cache images in development
    if (event.request.destination === 'image') {
      event.respondWith(
        caches.open(IMAGE_CACHE_NAME).then((cache) => {
          return cache.match(event.request).then((response) => {
            if (response) {
              return response;
            }
            return fetch(event.request).then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          });
        })
      );
    } else {
      // For non-images, always fetch from network in development
      event.respondWith(fetch(event.request));
    }
    return;
  }
  
  // Production mode - full caching strategy
  // Handle image requests with cache strategy
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            // Return cached image and update in background
            fetch(event.request).then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse.clone());
              }
            }).catch(() => {
              // Network failed, keep using cached version
            });
            return response;
          }
          
          // Not in cache, fetch and cache
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }
  
  // Handle HTML and other resources
  if (event.request.destination === 'document' || 
      event.request.destination === 'script' ||
      event.request.destination === 'style') {
    
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(event.request).then((response) => {
            if (response) {
              return response;
            }
            // Return offline page if nothing in cache
            return caches.match('/offline.html');
          });
        })
    );
    return;
  }
  
  // Default: network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Message event - handle communication with main thread
self.addEventListener('message', (event) => {
  console.log('📨 Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION_INFO',
      version: CACHE_VERSION,
      timestamp: Date.now()
    });
  }
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Ada update baru tersedia!',
    icon: '/images/logo-villasawarna2.png',
    badge: '/images/logo-villasawarna2.png',
    tag: 'villa-update',
    requireInteraction: true,
    actions: [
      {
        action: 'update',
        title: 'Update Sekarang',
        icon: '/images/logo-villasawarna2.png'
      },
      {
        action: 'dismiss',
        title: 'Nanti',
        icon: '/images/logo-villasawarna2.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Villa Sawarna Update', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'update') {
    // Force reload all clients
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'FORCE_UPDATE',
            version: CACHE_VERSION
          });
        });
      })
    );
  }
});

// Background sync for offline support
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background tasks
      Promise.resolve()
    );
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('❌ Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Service Worker unhandled rejection:', event.reason);
});

// Log service worker lifecycle
console.log('🔄 Service Worker script loaded:', CACHE_VERSION); 
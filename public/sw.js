const CACHE_NAME = 'image-cache-v1';
const IMAGE_CACHE_NAME = 'images-v1';

// Daftar URL yang harus di-cache saat instalasi
const urlsToCache = [
  '/',
  '/images/placeholder.jpg',
  '/images/logo-villasawarna2.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME),
      caches.open(IMAGE_CACHE_NAME)
    ]).then(([cache, imageCache]) => {
      return Promise.all([
        cache.addAll(urlsToCache),
        imageCache.addAll(urlsToCache.filter(url => url.startsWith('/images/')))
      ]);
    })
  );
});

// Activate event - bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('image-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Hanya handle request gambar
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            // Update cache di background
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
            });
            return response;
          }

          return fetch(event.request).then((networkResponse) => {
            // Cache response baru
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

// Cache expiration
const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 hari

// Bersihkan cache yang sudah expired
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      return cache.keys().then((requests) => {
        return Promise.all(
          requests.map((request) => {
            return cache.match(request).then((response) => {
              if (!response) return Promise.resolve();

              const cacheDate = new Date(response.headers.get('date'));
              const now = new Date();

              if (now - cacheDate > CACHE_EXPIRATION) {
                return cache.delete(request);
              }
              return Promise.resolve();
            });
          })
        );
      });
    })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Lihat Detail',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Tutup',
        icon: '/icons/close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Villa Sawarna', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 
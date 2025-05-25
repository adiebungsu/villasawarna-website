import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.2, // aktifkan performance monitoring
      replaysSessionSampleRate: 0.1, // 10% dari sesi
      replaysOnErrorSampleRate: 1.0, // 100% dari error
      beforeSend(event) {
        // Jangan kirim event jika tidak ada DSN
        if (!import.meta.env.VITE_SENTRY_DSN) {
          console.warn('Sentry DSN tidak ditemukan');
          return null;
        }
        return event;
      },
    });

    // Set user context jika ada
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        Sentry.setUser({
          id: userData.id,
          email: userData.email,
          username: userData.username,
        });
      } catch (error) {
        console.error('Error parsing user data for Sentry:', error);
      }
    }
  }
}; 
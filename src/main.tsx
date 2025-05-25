import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

// Environment Configuration
export const ENV_CONFIG = {
  // Google OAuth Configuration
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || "933733800266-pbjh3uf15g3sap2rclnfvs8r08ahmnq9.apps.googleusercontent.com",
  
  // Google Analytics Configuration
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
  ENABLE_GOOGLE_ANALYTICS: import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS === 'true',
  
  // Sentry Configuration
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.villasawarna.com',
  
  // Environment
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
  
  // Current domain for OAuth
  CURRENT_DOMAIN: typeof window !== 'undefined' ? window.location.origin : '',
  
  // Allowed domains for OAuth - Updated for production
  ALLOWED_OAUTH_DOMAINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://villasawarna.com',
    'https://www.villasawarna.com',
    'https://villasawarna.vercel.app',
    'https://villasawarna.netlify.app'
  ]
};

// Validate OAuth configuration
export const validateOAuthConfig = () => {
  if (typeof window === 'undefined') return true; // SSR check
  
  const currentDomain = ENV_CONFIG.CURRENT_DOMAIN;
  const isAllowed = ENV_CONFIG.ALLOWED_OAUTH_DOMAINS.includes(currentDomain);
  
  if (!isAllowed) {
    console.warn(`🚨 OAuth Warning: Current domain ${currentDomain} is not in allowed OAuth domains.`);
    console.warn('📋 Allowed domains:', ENV_CONFIG.ALLOWED_OAUTH_DOMAINS);
    console.warn('🔧 Please add this domain to Google Cloud Console OAuth configuration');
  }
  
  return isAllowed;
};

// Get Google Client ID based on environment
export const getGoogleClientId = () => {
  const clientId = ENV_CONFIG.GOOGLE_CLIENT_ID;
  
  // Log configuration for debugging
  if (ENV_CONFIG.IS_PRODUCTION) {
    console.log('🔧 Production OAuth Configuration:');
    console.log('  - Client ID:', clientId);
    console.log('  - Current Domain:', ENV_CONFIG.CURRENT_DOMAIN);
    console.log('  - Environment:', import.meta.env.MODE);
  }
  
  // In development, always use the configured client ID
  if (ENV_CONFIG.IS_DEVELOPMENT) {
    return clientId;
  }
  
  // In production, validate domain first
  if (validateOAuthConfig()) {
    return clientId;
  }
  
  // Fallback for production with domain mismatch
  console.error('❌ OAuth domain mismatch detected. Please update Google Cloud Console configuration.');
  console.error('🌐 Current domain:', ENV_CONFIG.CURRENT_DOMAIN);
  console.error('✅ Allowed domains:', ENV_CONFIG.ALLOWED_OAUTH_DOMAINS);
  
  return clientId;
};

// Production deployment helper
export const getProductionConfig = () => {
  return {
    clientId: getGoogleClientId(),
    currentDomain: ENV_CONFIG.CURRENT_DOMAIN,
    isProduction: ENV_CONFIG.IS_PRODUCTION,
    allowedDomains: ENV_CONFIG.ALLOWED_OAUTH_DOMAINS
  };
};

const isDevelopment = import.meta.env.DEV;

const developmentCSP = `
  default-src 'self' http://localhost:* http://192.168.43.151:*;
  img-src 'self' * data: blob: https: https://i.imgur.com https://imgur.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com http://localhost:* http://192.168.43.151:* https://*.googleapis.com https://*.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:* http://192.168.43.151:* https://*.googleapis.com https://unpkg.com https://accounts.google.com;
  font-src 'self' http://localhost:* http://192.168.43.151:* https://fonts.gstatic.com data:;
  connect-src 'self' https://accounts.google.com http://localhost:* http://192.168.43.151:* ws://localhost:* ws://192.168.43.151:* https://*.googleapis.com https://*.firebaseio.com;
  media-src 'self' blob: https://*.firebasestorage.googleapis.com;
  object-src 'none';
  frame-src 'self' https://accounts.google.com;
`;

const productionCSP = `
  default-src 'self' https://villasawarna.com https://www.villasawarna.com https://*.vercel.app https://*.netlify.app;
  img-src 'self' https://villasawarna.com https://www.villasawarna.com https://*.vercel.app https://*.netlify.app * data: blob: https: https://i.imgur.com https://imgur.com;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://villasawarna.com https://www.villasawarna.com https://*.vercel.app https://*.netlify.app https://*.googleapis.com https://*.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://villasawarna.com https://www.villasawarna.com https://*.vercel.app https://*.netlify.app https://*.googleapis.com https://unpkg.com https://accounts.google.com;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://accounts.google.com https://villasawarna.com https://www.villasawarna.com https://*.vercel.app https://*.netlify.app https://*.googleapis.com https://*.firebasestorage.googleapis.com https://api.villasawarna.com https://*.firebaseio.com;
  media-src 'self' blob: https://*.firebasestorage.googleapis.com;
  object-src 'none';
  frame-src 'self' https://accounts.google.com;
`;

export const cspContent = isDevelopment ? developmentCSP : productionCSP; 
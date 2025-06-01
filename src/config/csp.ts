const isDevelopment = import.meta.env.DEV;

const developmentCSP = `
  default-src 'self' http://localhost:* http://192.168.43.151:*;
  img-src 'self' http://localhost:* http://192.168.43.151:* data: blob: https://*.unsplash.com https://*.cloudinary.com https://*.googleusercontent.com https://*.googleapis.com https://*.google.com https://*.gstatic.com https://*.firebasestorage.googleapis.com https://i.imgur.com https://*.imagekit.io;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com http://localhost:* http://192.168.43.151:* https://*.googleapis.com https://*.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:* http://192.168.43.151:* https://*.googleapis.com;
  font-src 'self' http://localhost:* http://192.168.43.151:* https://fonts.gstatic.com data:;
  connect-src 'self' https://accounts.google.com http://localhost:* http://192.168.43.151:* ws://localhost:* ws://192.168.43.151:* https://*.googleapis.com https://*.firebasestorage.googleapis.com http://localhost:3001;
  media-src 'self' blob: https://*.firebasestorage.googleapis.com;
  object-src 'none';
  frame-src 'self' https://accounts.google.com;
`;

const productionCSP = `
  default-src 'self' https://villasawarna.com;
  img-src 'self' https://villasawarna.com data: blob: https://*.unsplash.com https://*.cloudinary.com https://*.googleusercontent.com https://*.googleapis.com https://*.google.com https://*.gstatic.com https://*.firebasestorage.googleapis.com https://i.imgur.com https://*.imagekit.io;
  script-src 'self' https://accounts.google.com https://villasawarna.com https://*.googleapis.com https://*.gstatic.com;
  style-src 'self' https://fonts.googleapis.com https://villasawarna.com https://*.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://accounts.google.com https://villasawarna.com https://*.googleapis.com https://*.firebasestorage.googleapis.com https://api.villasawarna.com;
  media-src 'self' blob: https://*.firebasestorage.googleapis.com;
  object-src 'none';
  frame-src 'self' https://accounts.google.com;
`;

export const cspContent = isDevelopment ? developmentCSP : productionCSP; 
const isDevelopment = import.meta.env.DEV;

const developmentCSP = `
  default-src 'self' http://localhost:*;
  img-src 'self' http://localhost:* data:;
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com http://localhost:*;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com http://localhost:*;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://accounts.google.com http://localhost:* ws://localhost:*;
`;

const productionCSP = `
  default-src 'self' https://villasawarna.com;
  img-src 'self' https://villasawarna.com data:;
  script-src 'self' https://accounts.google.com https://villasawarna.com;
  style-src 'self' https://fonts.googleapis.com https://villasawarna.com;
  font-src 'self' https://fonts.gstatic.com data:;
  connect-src 'self' https://accounts.google.com https://villasawarna.com;
`;

export const cspContent = isDevelopment ? developmentCSP : productionCSP; 
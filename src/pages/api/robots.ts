import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://villasawarna.com/sitemap.xml

# Crawl-delay
Crawl-delay: 10

# Disallow admin and api routes
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /villas/
Allow: /homestays/
Allow: /about/
Allow: /contact/
Allow: /blog/
`;

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();
} 
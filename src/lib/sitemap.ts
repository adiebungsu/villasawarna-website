import { SitemapStream, streamToPromise } from 'sitemap';
import { getAllProperties } from '@/data/properties';
import { articleData } from '@/data/articles';

export async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: 'https://villasawarna.com' });
  
  // Add static pages
  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/villas', changefreq: 'daily', priority: 0.9 });
  smStream.write({ url: '/homestays', changefreq: 'daily', priority: 0.9 });
  smStream.write({ url: '/articles', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
  smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.7 });
  
  // Add dynamic property pages
  const properties = getAllProperties();
  properties.forEach(property => {
    smStream.write({
      url: `/${property.type}s/${property.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    });
  });
  
  // Add article pages
  articleData.forEach(article => {
    smStream.write({
      url: `/article/${article.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: article.updatedAt || article.createdAt
    });
  });
  
  smStream.end();
  
  const sitemap = await streamToPromise(smStream);
  return sitemap.toString();
} 
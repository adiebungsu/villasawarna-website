const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

// Import article data
const { articleData } = require('../dist-sitemap/src/data/articles/index.js');

const baseUrl = 'https://villasawarna.com';

// Define static pages
const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/villas', changefreq: 'daily', priority: 0.9 },
  { url: '/homestays', changefreq: 'daily', priority: 0.9 },
  { url: '/destinations', changefreq: 'daily', priority: 0.9 },
  { url: '/articles', changefreq: 'weekly', priority: 0.7 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
  { url: '/penginapan-sawarna', changefreq: 'daily', priority: 0.9 },
  { url: '/transport', changefreq: 'weekly', priority: 0.6 },
  { url: '/accommodation-packages', changefreq: 'weekly', priority: 0.7 },
  { url: '/map', changefreq: 'weekly', priority: 0.6 },
  { url: '/help', changefreq: 'monthly', priority: 0.5 },
  { url: '/partnership', changefreq: 'monthly', priority: 0.4 },
];

// Generate article URLs
const articleUrls = articleData.map(article => ({
  url: `/article/${article.slug}`,
  changefreq: 'monthly',
  priority: 0.6,
  lastmod: article.date ? new Date(article.date).toISOString() : new Date().toISOString()
}));

// Combine all URLs
const allUrls = [...staticPages, ...articleUrls];

// Create sitemap
const sitemap = new SitemapStream({ hostname: baseUrl });

// Write sitemap to file
const writeStream = createWriteStream(resolve(__dirname, '../public/sitemap.xml'));

sitemap.pipe(writeStream);

// Add URLs to sitemap
allUrls.forEach(url => {
  sitemap.write(url);
});

sitemap.end();

console.log(`Generated sitemap with ${allUrls.length} URLs`);
console.log(`Static pages: ${staticPages.length}`);
console.log(`Articles: ${articleUrls.length}`);


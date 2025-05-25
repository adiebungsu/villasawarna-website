"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sitemap_1 = require("sitemap");
const fs_1 = require("fs");
const stream_1 = require("stream");
// Import data
const properties_1 = require("../src/data/properties");
const destinations_1 = require("../src/data/destinations");
// Asumsikan data artikel ada di sini, sesuaikan path jika perlu
const articles_1 = require("../src/data/articles");
// Base URL website
const SITE_URL = 'https://villasawarna.com';
// Daftar halaman statis
const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/villas', changefreq: 'daily', priority: 0.9 },
    { url: '/homestays', changefreq: 'daily', priority: 0.9 },
    { url: '/destinations', changefreq: 'daily', priority: 0.9 },
    { url: '/articles', changefreq: 'weekly', priority: 0.7 },
    { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.3 },
];
// Fungsi untuk generate sitemap
async function generateSitemap() {
    try {
        // Buat stream sitemap
        const stream = new sitemap_1.SitemapStream({ hostname: SITE_URL });
        // Ambil data dinamis
        const villas = (0, properties_1.getVillasData)();
        const destinations = (0, destinations_1.getAllDestinations)();
        const articles = articles_1.articleData; // Atau panggil fungsi jika ada
        // Buat daftar URL dinamis
        const dynamicPages = [
            ...villas.map(villa => ({ url: `/villas/${villa.id}`, changefreq: 'daily', priority: 0.8 })),
            ...destinations.map(dest => ({ url: `/destinations/${dest.id}`, changefreq: 'daily', priority: 0.8 })),
            ...articles.map(article => ({ url: `/articles/${article.id}`, changefreq: 'weekly', priority: 0.6 })),
            // Tambahkan homestay jika data tersedia secara terpisah
            // ...homestays.map(homestay => ({ url: `/homestays/${homestay.id}`, changefreq: 'daily', priority: 0.8 })),
        ];
        // Gabungkan halaman statis dan dinamis
        const links = [...staticPages, ...dynamicPages];
        // Buat readable stream dari array links
        const readableStream = stream_1.Readable.from(links);
        // Pipe ke sitemap stream
        readableStream.pipe(stream);
        // Generate XML
        const data = await (0, sitemap_1.streamToPromise)(stream);
        // Tulis ke file
        const writeStream = (0, fs_1.createWriteStream)('./public/sitemap.xml');
        writeStream.write(data.toString());
        writeStream.end();
        console.log('Sitemap generated successfully!');
    }
    catch (error) {
        console.error('Error generating sitemap:', error);
    }
}
// Jalankan generate sitemap
generateSitemap();

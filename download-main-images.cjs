const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Fungsi untuk mengunduh gambar
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Hapus file yang gagal
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Fungsi untuk membuat folder jika belum ada
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Fungsi untuk mengunduh gambar dengan delay
async function downloadWithDelay(url, filepath, delay = 200) {
  await downloadImage(url, filepath);
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Fungsi untuk mendownload semua main images
async function downloadAllMainImages() {
  try {
    console.log('🚀 Starting main images download for all villas...\n');
    
    const propertiesPath = path.join(__dirname, 'src', 'data', 'properties.ts');
    const propertiesContent = fs.readFileSync(propertiesPath, 'utf8');
    
    // Parse data villa dengan regex yang lebih spesifik
    const villaRegex = /id:\s*"([^"]+)"[\s\S]*?mainImages:\s*\[([\s\S]*?)\]/g;
    let villaMatch;
    let totalImages = 0;
    let downloadedImages = 0;
    let processedVillas = 0;
    
    while ((villaMatch = villaRegex.exec(propertiesContent)) !== null) {
      const villaId = villaMatch[1];
      const mainImagesContent = villaMatch[2];
      
      // Extract URLs dari mainImages
      const imageUrls = mainImagesContent.match(/https:\/\/[^,\s]+/g) || [];
      
      if (imageUrls.length > 0) {
        processedVillas++;
        console.log(`🏠 Processing Villa: ${villaId} (${processedVillas})`);
        console.log(`  📸 Found ${imageUrls.length} main images`);
        
        // Create villa directory
        const villaDir = path.join(__dirname, 'public', 'images', 'villas', villaId);
        const mainImagesDir = path.join(villaDir, 'main-images');
        ensureDirectoryExists(mainImagesDir);
        
        // Download setiap gambar
        for (let i = 0; i < imageUrls.length; i++) {
          const url = imageUrls[i];
          const filename = `main-${i + 1}.jpg`;
          const filepath = path.join(mainImagesDir, filename);
          
          totalImages++;
          try {
            await downloadWithDelay(url, filepath, 300);
            downloadedImages++;
          } catch (error) {
            console.log(`  ❌ Failed to download main image ${i + 1}: ${error.message}`);
          }
        }
        
        console.log(`  ✅ Completed: ${villaId}\n`);
      }
    }
    
    console.log(`🎉 Main images download completed!`);
    console.log(`📊 Total villas processed: ${processedVillas}`);
    console.log(`📊 Total images processed: ${totalImages}`);
    console.log(`✅ Successfully downloaded: ${downloadedImages}`);
    console.log(`❌ Failed downloads: ${totalImages - downloadedImages}`);
    
  } catch (error) {
    console.error('❌ Error during download:', error);
  }
}

// Jalankan script
downloadAllMainImages();

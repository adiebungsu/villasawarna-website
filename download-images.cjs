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
async function downloadWithDelay(url, filepath, delay = 100) {
  await downloadImage(url, filepath);
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Fungsi utama untuk mengunduh semua gambar villa
async function downloadAllVillaImages() {
  try {
    console.log('🚀 Starting villa image download...\n');
    
    // Baca data properties
    const propertiesPath = path.join(__dirname, 'src', 'data', 'properties.ts');
    const propertiesContent = fs.readFileSync(propertiesPath, 'utf8');
    
    // Parse data villa (sederhana, mencari mainImages dan roomTypes)
    const villaMatches = propertiesContent.match(/id:\s*"([^"]+)"[\s\S]*?mainImages:\s*\[([\s\S]*?)\][\s\S]*?roomTypes:\s*\[([\s\S]*?)\]/g);
    
    if (!villaMatches) {
      console.log('❌ No villa data found');
      return;
    }
    
    let totalImages = 0;
    let downloadedImages = 0;
    
    for (const match of villaMatches) {
      // Extract villa ID
      const idMatch = match.match(/id:\s*"([^"]+)"/);
      if (!idMatch) continue;
      
      const villaId = idMatch[1];
      console.log(`\n🏠 Processing Villa: ${villaId}`);
      
      // Create villa directory
      const villaDir = path.join(__dirname, 'public', 'images', 'villas', villaId);
      ensureDirectoryExists(villaDir);
      
      // Create subdirectories
      const mainImagesDir = path.join(villaDir, 'main-images');
      const roomTypesDir = path.join(villaDir, 'room-types');
      ensureDirectoryExists(mainImagesDir);
      ensureDirectoryExists(roomTypesDir);
      
      // Extract main images
      const mainImagesMatch = match.match(/mainImages:\s*\[([\s\S]*?)\]/);
      if (mainImagesMatch) {
        const mainImagesUrls = mainImagesMatch[1]
          .match(/https:\/\/[^,\s]+/g) || [];
        
        console.log(`  📸 Downloading ${mainImagesUrls.length} main images...`);
        
        for (let i = 0; i < mainImagesUrls.length; i++) {
          const url = mainImagesUrls[i];
          const filename = `main-${i + 1}.jpg`;
          const filepath = path.join(mainImagesDir, filename);
          
          totalImages++;
          try {
            await downloadWithDelay(url, filepath, 200);
            downloadedImages++;
          } catch (error) {
            console.log(`  ❌ Failed to download main image ${i + 1}: ${error.message}`);
          }
        }
      }
      
      // Extract room types and their images
      const roomTypesMatch = match.match(/roomTypes:\s*\[([\s\S]*?)\]/);
      if (roomTypesMatch) {
        const roomTypesContent = roomTypesMatch[1];
        const roomTypeMatches = roomTypesContent.match(/id:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g);
        
        if (roomTypeMatches) {
          for (const roomMatch of roomTypeMatches) {
            const roomIdMatch = roomMatch.match(/id:\s*"([^"]+)"/);
            const imagesMatch = roomMatch.match(/images:\s*\[([\s\S]*?)\]/);
            
            if (roomIdMatch && imagesMatch) {
              const roomId = roomIdMatch[1];
              const roomImagesUrls = imagesMatch[1].match(/https:\/\/[^,\s]+/g) || [];
              
              if (roomImagesUrls.length > 0) {
                const roomDir = path.join(roomTypesDir, roomId);
                ensureDirectoryExists(roomDir);
                
                console.log(`    🛏️  Downloading ${roomImagesUrls.length} images for room type: ${roomId}`);
                
                for (let i = 0; i < roomImagesUrls.length; i++) {
                  const url = roomImagesUrls[i];
                  const filename = `room-${i + 1}.jpg`;
                  const filepath = path.join(roomDir, filename);
                  
                  totalImages++;
                  try {
                    await downloadWithDelay(url, filepath, 200);
                    downloadedImages++;
                  } catch (error) {
                    console.log(`    ❌ Failed to download room image ${i + 1}: ${error.message}`);
                  }
                }
              }
            }
          }
        }
      }
    }
    
    console.log(`\n🎉 Download completed!`);
    console.log(`📊 Total images processed: ${totalImages}`);
    console.log(`✅ Successfully downloaded: ${downloadedImages}`);
    console.log(`❌ Failed downloads: ${totalImages - downloadedImages}`);
    
  } catch (error) {
    console.error('❌ Error during download:', error);
  }
}

// Jalankan script
downloadAllVillaImages();

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
async function downloadWithDelay(url, filepath, delay = 300) {
  await downloadImage(url, filepath);
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Fungsi untuk mendownload semua gambar room types
async function downloadAllRoomTypeImages() {
  try {
    console.log('🚀 Starting comprehensive room type images download...\n');
    
    const propertiesPath = path.join(__dirname, 'src', 'data', 'properties.ts');
    const propertiesContent = fs.readFileSync(propertiesPath, 'utf8');
    
    // Split content menjadi villa blocks
    const villaBlocks = propertiesContent.split('},');
    let totalRoomImages = 0;
    let downloadedRoomImages = 0;
    let processedVillas = 0;
    
    for (const block of villaBlocks) {
      // Cari villa ID
      const idMatch = block.match(/id:\s*"([^"]+)"/);
      if (!idMatch) continue;
      
      const villaId = idMatch[1];
      
      // Cari roomTypes dalam block ini
      const roomTypesMatch = block.match(/roomTypes:\s*\[([\s\S]*?)\]/);
      if (!roomTypesMatch) continue;
      
      const roomTypesContent = roomTypesMatch[1];
      
      // Parse setiap room type
      const roomTypeRegex = /{\s*id:\s*"([^"]+)"[^}]*images:\s*\[([\s\S]*?)\]/g;
      let roomMatch;
      let hasRoomImages = false;
      
      // Check if this villa has room images
      while ((roomMatch = roomTypeRegex.exec(roomTypesContent)) !== null) {
        const imagesUrls = roomMatch[2].match(/https:\/\/[^,\s]+/g) || [];
        if (imagesUrls.length > 0) {
          hasRoomImages = true;
          break;
        }
      }
      
      if (hasRoomImages) {
        processedVillas++;
        console.log(`🏠 Processing Villa: ${villaId} (${processedVillas})`);
        
        // Create villa directory
        const villaDir = path.join(__dirname, 'public', 'images', 'villas', villaId);
        const roomTypesDir = path.join(villaDir, 'room-types');
        ensureDirectoryExists(roomTypesDir);
        
        // Reset regex untuk parsing ulang
        roomTypeRegex.lastIndex = 0;
        
        while ((roomMatch = roomTypeRegex.exec(roomTypesContent)) !== null) {
          const roomId = roomMatch[1];
          const imagesUrls = roomMatch[2].match(/https:\/\/[^,\s]+/g) || [];
          
          if (imagesUrls.length > 0) {
            const roomDir = path.join(roomTypesDir, roomId);
            ensureDirectoryExists(roomDir);
            
            console.log(`  🛏️  Downloading ${imagesUrls.length} images for room type: ${roomId}`);
            
            for (let i = 0; i < imagesUrls.length; i++) {
              const url = imagesUrls[i];
              const filename = `room-${i + 1}.jpg`;
              const filepath = path.join(roomDir, filename);
              
              totalRoomImages++;
              try {
                await downloadWithDelay(url, filepath, 500);
                downloadedRoomImages++;
              } catch (error) {
                console.log(`    ❌ Failed to download room image ${i + 1}: ${error.message}`);
              }
            }
          }
        }
        
        console.log('');
      }
    }
    
    console.log(`🎉 All room type images download completed!`);
    console.log(`📊 Total villas processed: ${processedVillas}`);
    console.log(`📊 Total room images processed: ${totalRoomImages}`);
    console.log(`✅ Successfully downloaded: ${downloadedRoomImages}`);
    console.log(`❌ Failed downloads: ${totalRoomImages - downloadedRoomImages}`);
    
  } catch (error) {
    console.error('❌ Error during download:', error);
  }
}

// Jalankan script
downloadAllRoomTypeImages();

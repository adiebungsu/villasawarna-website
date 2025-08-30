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

// Fungsi untuk memeriksa status download
function checkDownloadStatus() {
  const villasDir = path.join(__dirname, 'public', 'images', 'villas');
  const propertiesPath = path.join(__dirname, 'src', 'data', 'properties.ts');
  
  if (!fs.existsSync(villasDir)) {
    console.log('❌ Folder villas belum ada');
    return [];
  }
  
  const propertiesContent = fs.readFileSync(propertiesPath, 'utf8');
  const villaMatches = propertiesContent.match(/id:\s*"([^"]+)"[\s\S]*?mainImages:\s*\[([\s\S]*?)\][\s\S]*?roomTypes:\s*\[([\s\S]*?)\]/g);
  
  const status = [];
  
  for (const match of villaMatches) {
    const idMatch = match.match(/id:\s*"([^"]+)"/);
    if (!idMatch) continue;
    
    const villaId = idMatch[1];
    const villaDir = path.join(villasDir, villaId);
    const mainImagesDir = path.join(villaDir, 'main-images');
    const roomTypesDir = path.join(villaDir, 'room-types');
    
    // Check main images
    const mainImagesMatch = match.match(/mainImages:\s*\[([\s\S]*?)\]/);
    const expectedMainImages = mainImagesMatch ? mainImagesMatch[1].match(/https:\/\/[^,\s]+/g)?.length || 0 : 0;
    const actualMainImages = fs.existsSync(mainImagesDir) ? fs.readdirSync(mainImagesDir).filter(f => f.endsWith('.jpg')).length : 0;
    
    // Check room types
    const roomTypesMatch = match.match(/roomTypes:\s*\[([\s\S]*?)\]/);
    let expectedRoomImages = 0;
    let actualRoomImages = 0;
    
    if (roomTypesMatch) {
      const roomTypeMatches = roomTypesMatch[1].match(/id:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g);
      if (roomTypeMatches) {
        for (const roomMatch of roomTypeMatches) {
          const imagesMatch = roomMatch.match(/images:\s*\[([\s\S]*?)\]/);
          if (imagesMatch) {
            expectedRoomImages += imagesMatch[1].match(/https:\/\/[^,\s]+/g)?.length || 0;
          }
        }
      }
    }
    
    if (fs.existsSync(roomTypesDir)) {
      const roomDirs = fs.readdirSync(roomTypesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      for (const roomDir of roomDirs) {
        const roomPath = path.join(roomTypesDir, roomDir);
        actualRoomImages += fs.readdirSync(roomPath).filter(f => f.endsWith('.jpg')).length;
      }
    }
    
    status.push({
      id: villaId,
      mainImages: { expected: expectedMainImages, actual: actualMainImages },
      roomImages: { expected: expectedRoomImages, actual: actualRoomImages },
      mainImagesDir: mainImagesDir,
      roomTypesDir: roomTypesDir,
      mainImagesUrls: mainImagesMatch ? mainImagesMatch[1].match(/https:\/\/[^,\s]+/g) || [] : [],
      roomTypesData: roomTypesMatch ? roomTypesMatch[1] : ''
    });
  }
  
  return status;
}

// Fungsi untuk melanjutkan download yang gagal
async function continueFailedDownloads() {
  console.log('🔍 Checking download status...\n');
  
  const status = checkDownloadStatus();
  let totalToDownload = 0;
  let downloaded = 0;
  
  for (const villa of status) {
    console.log(`🏠 Villa: ${villa.id}`);
    console.log(`  📸 Main Images: ${villa.mainImages.actual}/${villa.mainImages.expected}`);
    console.log(`  🛏️  Room Images: ${villa.roomImages.actual}/${villa.roomImages.expected}`);
    
    // Download missing main images
    if (villa.mainImages.actual < villa.mainImages.expected) {
      ensureDirectoryExists(villa.mainImagesDir);
      
      for (let i = villa.mainImages.actual; i < villa.mainImages.expected; i++) {
        const url = villa.mainImagesUrls[i];
        const filename = `main-${i + 1}.jpg`;
        const filepath = path.join(villa.mainImagesDir, filename);
        
        if (url) {
          totalToDownload++;
          try {
            await downloadWithDelay(url, filepath, 300);
            downloaded++;
          } catch (error) {
            console.log(`  ❌ Failed to download main image ${i + 1}: ${error.message}`);
          }
        }
      }
    }
    
    // Download missing room images
    if (villa.roomImages.actual < villa.roomImages.expected && villa.roomTypesData) {
      ensureDirectoryExists(villa.roomTypesDir);
      
      const roomTypeMatches = villa.roomTypesData.match(/id:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g);
      if (roomTypeMatches) {
        for (const roomMatch of roomTypeMatches) {
          const roomIdMatch = roomMatch.match(/id:\s*"([^"]+)"/);
          const imagesMatch = roomMatch.match(/images:\s*\[([\s\S]*?)\]/);
          
          if (roomIdMatch && imagesMatch) {
            const roomId = roomIdMatch[1];
            const roomImagesUrls = imagesMatch[1].match(/https:\/\/[^,\s]+/g) || [];
            const roomDir = path.join(villa.roomTypesDir, roomId);
            
            ensureDirectoryExists(roomDir);
            
            const existingImages = fs.existsSync(roomDir) ? 
              fs.readdirSync(roomDir).filter(f => f.endsWith('.jpg')).length : 0;
            
            if (existingImages < roomImagesUrls.length) {
              for (let i = existingImages; i < roomImagesUrls.length; i++) {
                const url = roomImagesUrls[i];
                const filename = `room-${i + 1}.jpg`;
                const filepath = path.join(roomDir, filename);
                
                if (url) {
                  totalToDownload++;
                  try {
                    await downloadWithDelay(url, filepath, 300);
                    downloaded++;
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
    
    console.log('');
  }
  
  console.log(`🎉 Download summary:`);
  console.log(`📊 Total images to download: ${totalToDownload}`);
  console.log(`✅ Successfully downloaded: ${downloaded}`);
  console.log(`❌ Failed downloads: ${totalToDownload - downloaded}`);
}

// Jalankan script
continueFailedDownloads();

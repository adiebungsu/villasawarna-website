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

// Data villa yang sudah diketahui memiliki room types
const villaRoomData = [
  {
    villaId: "villa-aliya-sawarna",
    rooms: [
      {
        id: "standard-room",
        images: [
          "https://i.imgur.com/gM2wgbk.jpeg",
          "https://i.imgur.com/bpEpwhv.jpeg",
          "https://i.imgur.com/KRwPJYw.jpeg",
          "https://i.imgur.com/2Cx5cww.jpeg",
          "https://i.imgur.com/xTsMb8F.jpeg"
        ]
      },
      {
        id: "deluxe-room",
        images: [
          "https://i.imgur.com/aPXXgXY.jpeg",
          "https://i.imgur.com/D1kETYY.jpeg",
          "https://i.imgur.com/Ka1EzdS.jpeg",
          "https://i.imgur.com/BISJx6R.jpeg",
          "https://i.imgur.com/aTlRKm2.jpeg"
        ]
      },
      {
        id: "family-room",
        images: [
          "https://i.imgur.com/tvjzciT.jpeg",
          "https://i.imgur.com/6QudI8p.jpeg",
          "https://i.imgur.com/s0ZPnEX.jpeg",
          "https://i.imgur.com/A3LxarN.jpeg",
          "https://i.imgur.com/iflDism.jpeg"
        ]
      }
    ]
  }
];

// Fungsi untuk mendownload gambar room types
async function downloadRoomTypeImages() {
  try {
    console.log('🚀 Starting room type images download...\n');
    
    let totalRoomImages = 0;
    let downloadedRoomImages = 0;
    
    for (const villa of villaRoomData) {
      console.log(`🏠 Processing Villa: ${villa.villaId}`);
      
      // Create villa directory
      const villaDir = path.join(__dirname, 'public', 'images', 'villas', villa.villaId);
      const roomTypesDir = path.join(villaDir, 'room-types');
      ensureDirectoryExists(roomTypesDir);
      
      for (const room of villa.rooms) {
        const roomDir = path.join(roomTypesDir, room.id);
        ensureDirectoryExists(roomDir);
        
        console.log(`  🛏️  Downloading ${room.images.length} images for room type: ${room.id}`);
        
        for (let i = 0; i < room.images.length; i++) {
          const url = room.images[i];
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
      
      console.log('');
    }
    
    console.log(`🎉 Room type images download completed!`);
    console.log(`📊 Total room images processed: ${totalRoomImages}`);
    console.log(`✅ Successfully downloaded: ${downloadedRoomImages}`);
    console.log(`❌ Failed downloads: ${totalRoomImages - downloadedRoomImages}`);
    
  } catch (error) {
    console.error('❌ Error during download:', error);
  }
}

// Jalankan script
downloadRoomTypeImages();

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Daftar gambar villa dari data yang sebenarnya
const villaImages = {
  'villa-aliya-sawarna': [
    'https://i.imgur.com/KNZs2rS.jpeg',
    'https://i.imgur.com/DG7UVVn.jpeg',
    'https://i.imgur.com/n8PRWNu.jpeg',
    'https://i.imgur.com/3SBy64G.jpeg',
    'https://i.imgur.com/nNqsgI4.jpeg',
    'https://i.imgur.com/CjJZEtZ.jpeg',
    'https://i.imgur.com/PURTpP0.jpeg',
    'https://i.imgur.com/poKtaOU.jpeg',
    'https://i.imgur.com/B3uAtlT.jpeg',
    'https://i.imgur.com/tvjzciT.jpeg',
    'https://i.imgur.com/6QudI8p.jpeg'
  ],
  'villa-dua-putri': [
    'https://i.imgur.com/qnFfn4w.jpeg',
    'https://i.imgur.com/p7w6VtY.jpeg',
    'https://i.imgur.com/J6o5y5J.jpeg',
    'https://i.imgur.com/6vuQ236.jpeg',
    'https://i.imgur.com/QkxlhNy.jpeg',
    'https://i.imgur.com/uV1MnlL.jpeg',
    'https://i.imgur.com/5NvmKLM.jpeg',
    'https://i.imgur.com/sHs8K3b.jpeg'
  ],
  'villa-deka-sawarna': [
    'https://i.imgur.com/iajE3el.jpeg',
    'https://i.imgur.com/t6f04pL.jpeg',
    'https://i.imgur.com/l7lZFRl.jpeg',
    'https://i.imgur.com/yIDV3Tq.jpeg',
    'https://i.imgur.com/K5AisLi.jpeg',
    'https://i.imgur.com/WbCYgzI.jpeg',
    'https://i.imgur.com/mRJ6Skv.jpeg',
    'https://i.imgur.com/owY4d5q.jpeg'
  ]
};

// Fungsi untuk download gambar
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete file if exists
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Fungsi untuk convert ke WebP menggunakan ImageMagick
function convertToWebP(inputPath, outputPath) {
  try {
    execSync(`magick convert "${inputPath}" -quality 85 "${outputPath}"`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.log(`⚠️  ImageMagick tidak tersedia, menggunakan file asli: ${inputPath}`);
    return false;
  }
}

// Main function
async function downloadAllImages() {
  console.log('🖼️  MENGUNDUH GAMBAR VILLA DARI IMGUR');
  console.log('=====================================\n');
  
  const baseDir = path.join(__dirname, '../public/images/villas');
  
  for (const [villaName, imageUrls] of Object.entries(villaImages)) {
    console.log(`📁 Villa: ${villaName}`);
    
    const villaDir = path.join(baseDir, villaName);
    
    // Buat folder jika belum ada
    if (!fs.existsSync(villaDir)) {
      fs.mkdirSync(villaDir, { recursive: true });
    }
    
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filename = `image-${i + 1}.jpeg`;
      const filepath = path.join(villaDir, filename);
      const webpPath = path.join(villaDir, `image-${i + 1}.webp`);
      
      try {
        console.log(`  📥 Downloading: ${filename}`);
        await downloadImage(url, filepath);
        
        // Convert ke WebP
        console.log(`  🔄 Converting to WebP: ${filename}`);
        const converted = convertToWebP(filepath, webpPath);
        
        if (converted) {
          // Hapus file JPEG asli
          fs.unlinkSync(filepath);
          console.log(`  ✅ Saved as WebP: image-${i + 1}.webp`);
        } else {
          console.log(`  ✅ Saved as JPEG: ${filename}`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error downloading ${filename}: ${error.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log('🎉 SELESAI! Semua gambar telah diunduh dan dikonversi.');
}

// Jalankan script
downloadAllImages().catch(console.error);

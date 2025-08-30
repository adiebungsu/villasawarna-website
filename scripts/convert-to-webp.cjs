const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Fungsi untuk convert ke WebP menggunakan Sharp
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    return true;
  } catch (error) {
    console.log(`⚠️  Sharp tidak tersedia, menggunakan file asli: ${inputPath}`);
    return false;
  }
}

// Main function
async function convertAllImages() {
  console.log('🔄 MENGKONVERSI GAMBAR KE WEBP');
  console.log('===============================\n');
  
  const baseDir = path.join(__dirname, '../public/images/villas');
  
  // Daftar folder villa
  const villaFolders = [
    'villa-aliya-sawarna',
    'villa-dua-putri', 
    'villa-deka-sawarna'
  ];
  
  for (const villaName of villaFolders) {
    console.log(`📁 Villa: ${villaName}`);
    
    const villaDir = path.join(baseDir, villaName);
    
    if (!fs.existsSync(villaDir)) {
      console.log(`  ❌ Folder tidak ditemukan: ${villaName}`);
      continue;
    }
    
    const files = fs.readdirSync(villaDir);
    const jpegFiles = files.filter(file => file.endsWith('.jpeg'));
    
    for (const jpegFile of jpegFiles) {
      const jpegPath = path.join(villaDir, jpegFile);
      const webpFile = jpegFile.replace('.jpeg', '.webp');
      const webpPath = path.join(villaDir, webpFile);
      
      try {
        console.log(`  🔄 Converting: ${jpegFile} → ${webpFile}`);
        const converted = await convertToWebP(jpegPath, webpPath);
        
        if (converted) {
          // Hapus file JPEG asli
          fs.unlinkSync(jpegPath);
          console.log(`  ✅ Converted: ${webpFile}`);
        } else {
          console.log(`  ⚠️  Keeping original: ${jpegFile}`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error converting ${jpegFile}: ${error.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log('🎉 SELESAI! Semua gambar telah dikonversi ke WebP.');
}

// Jalankan script
convertAllImages().catch(console.error);


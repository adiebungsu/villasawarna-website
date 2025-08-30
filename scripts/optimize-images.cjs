const fs = require('fs');
const path = require('path');

// Fungsi untuk mendapatkan ukuran file dalam format yang mudah dibaca
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Main function
function analyzeImages() {
  console.log('📊 ANALISIS GAMBAR VILLA');
  console.log('=========================\n');
  
  const baseDir = path.join(__dirname, '../public/images/villas');
  
  // Daftar folder villa
  const villaFolders = [
    'villa-aliya-sawarna',
    'villa-dua-putri', 
    'villa-deka-sawarna'
  ];
  
  let totalFiles = 0;
  let totalSize = 0;
  
  for (const villaName of villaFolders) {
    console.log(`📁 Villa: ${villaName}`);
    
    const villaDir = path.join(baseDir, villaName);
    
    if (!fs.existsSync(villaDir)) {
      console.log(`  ❌ Folder tidak ditemukan: ${villaName}`);
      continue;
    }
    
    const files = fs.readdirSync(villaDir);
    const imageFiles = files.filter(file => 
      file.endsWith('.jpeg') || 
      file.endsWith('.jpg') || 
      file.endsWith('.png') ||
      file.endsWith('.webp')
    );
    
    let villaTotalSize = 0;
    
    for (const imageFile of imageFiles) {
      const imagePath = path.join(villaDir, imageFile);
      const stats = fs.statSync(imagePath);
      const fileSize = stats.size;
      
      console.log(`  📸 ${imageFile}: ${formatFileSize(fileSize)}`);
      villaTotalSize += fileSize;
      totalFiles++;
      totalSize += fileSize;
    }
    
    console.log(`  📊 Total ${villaName}: ${formatFileSize(villaTotalSize)} (${imageFiles.length} files)`);
    console.log('');
  }
  
  console.log('📈 RINGKASAN:');
  console.log('=============');
  console.log(`Total Files: ${totalFiles}`);
  console.log(`Total Size: ${formatFileSize(totalSize)}`);
  console.log(`Average Size: ${formatFileSize(totalSize / totalFiles)}`);
  
  console.log('\n💡 REKOMENDASI:');
  console.log('===============');
  console.log('1. ✅ Gambar sudah berhasil diunduh dari Imgur');
  console.log('2. 🔄 Untuk konversi ke WebP, Anda bisa:');
  console.log('   - Install ImageMagick: https://imagemagick.org/');
  console.log('   - Atau gunakan online converter seperti:');
  console.log('     * https://convertio.co/jpeg-webp/');
  console.log('     * https://cloudconvert.com/jpeg-to-webp');
  console.log('3. 📱 Setelah konversi, ganti URL di kode dari Imgur ke local path');
  console.log('4. 🚀 Ini akan meningkatkan performa website secara signifikan');
}

// Jalankan script
analyzeImages();


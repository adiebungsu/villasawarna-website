const fs = require('fs');
const path = require('path');

// Mapping URL Imgur ke path lokal
const imageMapping = {
  // Villa Aliya Sawarna
  'https://i.imgur.com/KNZs2rS.jpeg': '/images/villas/villa-aliya-sawarna/image-1.jpeg',
  'https://i.imgur.com/DG7UVVn.jpeg': '/images/villas/villa-aliya-sawarna/image-2.jpeg',
  'https://i.imgur.com/n8PRWNu.jpeg': '/images/villas/villa-aliya-sawarna/image-3.jpeg',
  'https://i.imgur.com/3SBy64G.jpeg': '/images/villas/villa-aliya-sawarna/image-4.jpeg',
  'https://i.imgur.com/nNqsgI4.jpeg': '/images/villas/villa-aliya-sawarna/image-5.jpeg',
  'https://i.imgur.com/CjJZEtZ.jpeg': '/images/villas/villa-aliya-sawarna/image-6.jpeg',
  'https://i.imgur.com/PURTpP0.jpeg': '/images/villas/villa-aliya-sawarna/image-7.jpeg',
  'https://i.imgur.com/poKtaOU.jpeg': '/images/villas/villa-aliya-sawarna/image-8.jpeg',
  'https://i.imgur.com/B3uAtlT.jpeg': '/images/villas/villa-aliya-sawarna/image-9.jpeg',
  'https://i.imgur.com/tvjzciT.jpeg': '/images/villas/villa-aliya-sawarna/image-10.jpeg',
  'https://i.imgur.com/6QudI8p.jpeg': '/images/villas/villa-aliya-sawarna/image-11.jpeg',
  
  // Villa Dua Putri
  'https://i.imgur.com/qnFfn4w.jpeg': '/images/villas/villa-dua-putri/image-1.jpeg',
  'https://i.imgur.com/p7w6VtY.jpeg': '/images/villas/villa-dua-putri/image-2.jpeg',
  'https://i.imgur.com/J6o5y5J.jpeg': '/images/villas/villa-dua-putri/image-3.jpeg',
  'https://i.imgur.com/6vuQ236.jpeg': '/images/villas/villa-dua-putri/image-4.jpeg',
  'https://i.imgur.com/QkxlhNy.jpeg': '/images/villas/villa-dua-putri/image-5.jpeg',
  'https://i.imgur.com/uV1MnlL.jpeg': '/images/villas/villa-dua-putri/image-6.jpeg',
  'https://i.imgur.com/5NvmKLM.jpeg': '/images/villas/villa-dua-putri/image-7.jpeg',
  'https://i.imgur.com/sHs8K3b.jpeg': '/images/villas/villa-dua-putri/image-8.jpeg',
  
  // Villa Deka Sawarna
  'https://i.imgur.com/iajE3el.jpeg': '/images/villas/villa-deka-sawarna/image-1.jpeg',
  'https://i.imgur.com/t6f04pL.jpeg': '/images/villas/villa-deka-sawarna/image-2.jpeg',
  'https://i.imgur.com/l7lZFRl.jpeg': '/images/villas/villa-deka-sawarna/image-3.jpeg',
  'https://i.imgur.com/yIDV3Tq.jpeg': '/images/villas/villa-deka-sawarna/image-4.jpeg',
  'https://i.imgur.com/K5AisLi.jpeg': '/images/villas/villa-deka-sawarna/image-5.jpeg',
  'https://i.imgur.com/WbCYgzI.jpeg': '/images/villas/villa-deka-sawarna/image-6.jpeg',
  'https://i.imgur.com/mRJ6Skv.jpeg': '/images/villas/villa-deka-sawarna/image-7.jpeg',
  'https://i.imgur.com/owY4d5q.jpeg': '/images/villas/villa-deka-sawarna/image-8.jpeg'
};

// Fungsi untuk mengganti URL di file
function updateImagePaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    let replacements = 0;
    
    for (const [imgurUrl, localPath] of Object.entries(imageMapping)) {
      if (content.includes(imgurUrl)) {
        content = content.replace(new RegExp(imgurUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), localPath);
        updated = true;
        replacements++;
        console.log(`  🔄 ${imgurUrl} → ${localPath}`);
      }
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated ${filePath} (${replacements} replacements)`);
    } else {
      console.log(`  ⚠️  No changes needed in ${filePath}`);
    }
    
    return replacements;
  } catch (error) {
    console.log(`  ❌ Error updating ${filePath}: ${error.message}`);
    return 0;
  }
}

// Main function
function updateAllFiles() {
  console.log('🔄 MENGUPDATE PATH GAMBAR DARI IMGUR KE LOKAL');
  console.log('==============================================\n');
  
  const filesToUpdate = [
    '../src/data/properties.ts',
    '../src/data/articles/10-villa-murah-sawarna.ts',
    '../src/data/articles/cerita-nelayan.ts',
    '../src/data/articles/etika-wisata.ts',
    '../src/data/articles/festival-tahunan.ts',
    '../src/data/articles/cuaca-terbaik.ts',
    '../src/data/articles/fauna-sawarna.ts',
    '../src/data/articles/fotografi-pantai.ts',
    '../src/data/articles/homestay-backpacker-sawarna.ts',
    '../src/data/articles/goa-langir.ts',
    '../src/data/articles/homestay-budget.ts',
    '../src/data/articles/fotografi-malam.ts',
    '../src/data/articles/goa-langir-vs-tanjung-layar.ts',
    '../src/data/articles/legenda-sawarna.ts',
    '../src/data/articles/kuliner-seafood.ts',
    '../src/data/articles/olahraga-air.ts',
    '../src/data/articles/medis-darurat.ts',
    '../src/data/articles/makanan-vegetarian.ts',
    '../src/data/articles/pantai-sawarna.ts',
    '../src/data/articles/pantai-tersembunyi.ts',
    '../src/data/articles/panduan-persiapan.ts'
  ];
  
  let totalReplacements = 0;
  
  for (const filePath of filesToUpdate) {
    const fullPath = path.join(__dirname, filePath);
    
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Processing: ${filePath}`);
      const replacements = updateImagePaths(fullPath);
      totalReplacements += replacements;
    } else {
      console.log(`❌ File not found: ${filePath}`);
    }
  }
  
  console.log('\n📊 RINGKASAN:');
  console.log('=============');
  console.log(`Total replacements: ${totalReplacements}`);
  console.log(`Files processed: ${filesToUpdate.length}`);
  
  console.log('\n💡 LANGKAH SELANJUTNYA:');
  console.log('======================');
  console.log('1. ✅ URL Imgur sudah diganti dengan path lokal');
  console.log('2. 🔄 Build ulang website: npm run build');
  console.log('3. 🚀 Deploy ke hosting');
  console.log('4. 📈 Website akan lebih cepat karena gambar lokal');
  console.log('5. 💰 Hemat bandwidth karena tidak load dari Imgur');
}

// Jalankan script
updateAllFiles();


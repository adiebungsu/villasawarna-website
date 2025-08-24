# Villa Sawarna Website

Website resmi Villa Sawarna yang menampilkan berbagai pilihan penginapan di kawasan Pantai Sawarna, Banten.

## Fitur Utama

### 🏠 Penginapan Sawarna
- Daftar lengkap villa dan homestay di Sawarna
- Filter berdasarkan kategori (budget, premium, keluarga, rombongan)
- Sorting berdasarkan popularitas dan harga
- **Quick View** - Lihat detail villa tanpa meninggalkan halaman

### 🎯 Quick View Feature
Fitur Quick View memungkinkan pengguna untuk melihat detail villa dengan cepat:
- **Klik gambar villa** - Hover effect dengan label "Quick View"
- **Klik tombol "Quick View"** pada setiap villa card
- Modal popup dengan informasi lengkap villa
- Responsive design untuk desktop dan mobile
- Informasi yang ditampilkan:
  - Gambar villa
  - Rating dan ulasan
  - Lokasi dan harga
  - Kapasitas, kamar tidur, kamar mandi
  - Fasilitas utama
  - Tombol untuk melihat detail lengkap

### 📱 Responsive Design
- Optimized untuk desktop dan mobile
- Quick View yang berbeda untuk desktop dan mobile
- UI yang konsisten dengan design system

## Teknologi

- React + TypeScript
- Tailwind CSS
- Radix UI Components
- Vite

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:5173/penginapan-sawarna untuk melihat halaman dengan fitur Quick View.

## Struktur Komponen

- `PenginapanSawarna.tsx` - Halaman utama penginapan
- `QuickView.tsx` - Komponen utama Quick View
- `QuickViewDesktop.tsx` - Quick View untuk desktop
- `QuickViewMobile.tsx` - Quick View untuk mobile

## Penggunaan Quick View

1. Buka halaman `/penginapan-sawarna`
2. Scroll ke bagian "Rekomendasi Penginapan"
3. **Klik gambar villa** atau **klik tombol "Quick View"** pada villa yang ingin dilihat
4. Modal akan muncul dengan informasi lengkap villa
5. Klik "Lihat Detail" untuk membuka halaman detail lengkap
6. Klik "Tutup" atau klik di luar modal untuk menutup Quick View

### 💡 Tips Penggunaan:
- **Hover pada gambar** - Akan muncul label "Quick View" dengan efek transparansi
- **Klik gambar** - Langsung membuka Quick View modal
- **Klik tombol Quick View** - Alternatif untuk membuka Quick View
- **Klik Lihat Detail** - Untuk melihat halaman detail lengkap villa

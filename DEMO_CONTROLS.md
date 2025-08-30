# Demo Controls - Dashboard Villa Sawarna

## Overview

Demo Controls adalah fitur yang ditambahkan di dashboard untuk memudahkan testing dan development. Fitur ini memungkinkan pengguna untuk dengan mudah menginisialisasi data demo dan menghapus data yang ada.

## Lokasi Tombol Demo

### 1. Header Dashboard (Global Access)
Tombol demo tersedia di header dashboard untuk akses cepat:
- **Tombol Demo** (Hijau) - Menginisialisasi data demo
- **Tombol Hapus Demo** (Oranye) - Menghapus semua data

### 2. Tab Overview
Section "Demo Controls" dengan 3 tombol utama:
- **Load Demo Data** - Menginisialisasi data demo
- **Clear All Data** - Menghapus semua data
- **Info Demo Data** - Menampilkan informasi tentang data demo

### 3. Tab Settings
Section "Demo Controls" yang lebih lengkap dengan informasi detail:
- **Load Demo Data** - Menginisialisasi data demo
- **Clear All Data** - Menghapus semua data  
- **Info Demo Data** - Informasi tentang data demo
- **Info Box** - Detail data demo yang tersedia

## Fungsi Tombol

### 🟢 Load Demo Data
```typescript
onClick={() => {
  localStorage.setItem('initializeDemoData', '1');
  toast({
    title: "Demo Data",
    description: "Data demo akan diinisialisasi setelah refresh halaman",
  });
  setTimeout(() => window.location.reload(), 1500);
}}
```

**Fungsi:**
- Set flag `initializeDemoData` di localStorage
- Tampilkan notifikasi sukses
- Auto-refresh halaman setelah 1.5 detik
- Trigger inisialisasi demo data di `user-data-provider.tsx`

### 🟠 Clear All Data
```typescript
onClick={() => {
  if (confirm('Apakah Anda yakin ingin menghapus semua data demo? Data yang sudah ada akan dihapus.')) {
    localStorage.clear();
    toast({
      title: "Data Dihapus",
      description: "Semua data demo telah dihapus",
    });
    setTimeout(() => window.location.reload(), 1500);
  }
}}
```

**Fungsi:**
- Konfirmasi penghapusan data
- Hapus semua data dari localStorage
- Tampilkan notifikasi sukses
- Auto-refresh halaman setelah 1.5 detik

### 🔵 Info Demo Data
```typescript
onClick={() => {
  toast({
    title: "Info Demo",
    description: "Data demo menggunakan villa real: Sinar Pelangi, Arizky Sawarna, dan Aliya Sawarna",
  });
}}
```

**Fungsi:**
- Tampilkan informasi tentang data demo yang tersedia
- Memberikan konteks tentang villa yang digunakan

## Data Demo yang Tersedia

### 📊 Booking Data
- **Villa Sinar Pelangi**: 2 malam, 8 tamu, Rp 400.000
- **Villa Arizky Sawarna**: 2 malam, 6 tamu, Rp 760.000  
- **Villa Aliya Sawarna**: 2 malam, 10 tamu, Rp 500.000

### ⭐ Review Data
- **Villa Arizky Sawarna**: 5 bintang, komentar positif
- **Villa Sinar Pelangi**: 4 bintang, komentar konstruktif

### 🔔 Notification Data
- Booking konfirmasi
- Promo spesial
- Reminder check-in

### 💬 Conversation Data
- Chat dengan Villa Sinar Pelangi
- Chat dengan Villa Arizky Sawarna
- Support ticket

### 🗺️ Travel Plan Data
- Trip ke Villa Sinar Pelangi (3 hari)
- Weekend getaway ke Villa Arizky Sawarna

## Cara Kerja

### 1. Inisialisasi Demo Data
```typescript
// Di user-data-provider.tsx
useEffect(() => {
  if (user) {
    loadUserData();
    // Check if demo data should be initialized
    const shouldInitializeDemo = localStorage.getItem('initializeDemoData');
    if (shouldInitializeDemo === '1') {
      localStorage.removeItem('initializeDemoData');
      initializeDemoData();
    }
  } else {
    clearAllData();
  }
}, [user]);
```

### 2. Flow Demo Data
1. User klik "Load Demo Data"
2. Set flag `initializeDemoData = '1'`
3. Halaman refresh
4. `useEffect` detect flag
5. Panggil `initializeDemoData()`
6. Data demo tersedia di dashboard

### 3. Data Integration
Semua data demo menggunakan data real villa dari `getVillasData()`:
- Nama villa sesuai database
- Gambar villa sesuai database
- Harga sesuai database
- Fallback data default jika data real tidak tersedia

## Styling dan UI

### Color Scheme
- **Background**: Gradient amber-orange dengan opacity
- **Border**: Amber dengan opacity
- **Text**: Amber dark untuk kontras
- **Buttons**: 
  - Load Demo: Green (success)
  - Clear Data: Orange (warning)
  - Info: Blue (information)

### Responsive Design
- Grid layout untuk tombol di Settings tab
- Full width buttons di Overview tab
- Responsive text dan spacing
- Dark mode support

### Visual Indicators
- Icon yang sesuai untuk setiap tombol
- Hover effects
- Toast notifications untuk feedback
- Confirmation dialog untuk aksi destruktif

## Use Cases

### 1. Development & Testing
- Test fitur dashboard dengan data yang konsisten
- Reset data untuk testing yang bersih
- Demo fitur untuk stakeholder

### 2. User Experience
- User baru dapat melihat contoh data
- Demo fitur sebelum menggunakan data real
- Testing fitur tanpa input manual

### 3. Quality Assurance
- Test semua tab dashboard
- Verifikasi data integration
- Test error handling

## Keamanan

### Confirmation Dialog
- Semua aksi destruktif memerlukan konfirmasi
- Clear warning tentang data yang akan dihapus

### Data Isolation
- Demo data terpisah dari data production
- Tidak ada akses ke data user real

### Local Storage Only
- Data demo hanya tersimpan di browser
- Tidak ada data yang dikirim ke server

## Troubleshooting

### Demo Data Tidak Muncul
1. Pastikan user sudah login
2. Cek console browser untuk error
3. Verifikasi flag `initializeDemoData` di localStorage
4. Refresh halaman manual

### Error Saat Clear Data
1. Pastikan tidak ada proses lain yang berjalan
2. Cek permission localStorage
3. Refresh halaman manual jika diperlukan

### Data Tidak Konsisten
1. Clear semua data dan load ulang
2. Verifikasi data villa di `properties.ts`
3. Cek integration di `user-data-provider.tsx`

## Future Enhancements

### 1. Data Export/Import
- Export data demo ke file
- Import data demo dari file
- Backup/restore data demo

### 2. Custom Demo Data
- User dapat custom data demo
- Template data demo yang berbeda
- Random data generator

### 3. Demo Mode Toggle
- Toggle demo mode on/off
- Persistent demo mode setting
- Auto-demo untuk user baru

## Dependencies

- `src/context/user-data-provider.tsx` - Logic demo data
- `src/data/properties.ts` - Data villa real
- `src/pages/UserDashboardPage.tsx` - UI demo controls
- `@/components/ui/*` - UI components
- `lucide-react` - Icons



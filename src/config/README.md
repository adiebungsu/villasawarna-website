# Konfigurasi Google Analytics

## Setup Google Analytics

### 1. Dapatkan Google Analytics ID
1. Buka [Google Analytics](https://analytics.google.com/)
2. Buat property baru atau gunakan yang sudah ada
3. Salin Measurement ID (format: G-XXXXXXXXXX)

### 2. Konfigurasi Environment Variables
Buat file `.env` di root project dan tambahkan:

```bash
# Google Analytics Configuration
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GOOGLE_ANALYTICS=true
```

### 3. Update Konfigurasi
Jika tidak menggunakan environment variables, edit `src/config/analytics.ts`:

```typescript
export const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Ganti dengan ID Anda
  ENABLE_GOOGLE_ANALYTICS: true,
  // ... konfigurasi lainnya
};
```

## Fitur yang Tersedia

### ✅ Page View Tracking
- Otomatis track setiap perubahan route
- Track page title dan URL

### ✅ Custom Event Tracking
- Villa views
- Search queries
- Contact form submissions
- Booking interest
- User engagement

### ✅ Error Handling
- Validasi GA ID
- Fallback jika GA tidak tersedia
- Console warnings untuk debugging

## Penggunaan

### Import Functions
```typescript
import { 
  trackEvent, 
  trackVillaView, 
  trackSearch, 
  trackContactForm,
  trackBookingInterest 
} from '@/components/GoogleAnalytics';
```

### Track Villa View
```typescript
trackVillaView('villa-001', 'Villa Sawarna Indah');
```

### Track Search
```typescript
trackSearch('villa pantai');
```

### Track Contact Form
```typescript
trackContactForm();
```

### Track Booking Interest
```typescript
trackBookingInterest('villa-001', 'Villa Sawarna Indah');
```

## Troubleshooting

### GA Tidak Muncul di Console
1. Cek apakah `VITE_GA_MEASUREMENT_ID` sudah diset
2. Cek apakah `VITE_ENABLE_GOOGLE_ANALYTICS=true`
3. Buka browser console untuk melihat warnings

### GA ID Belum Dikonfigurasi
```
Google Analytics ID belum dikonfigurasi. 
Silakan set VITE_GA_MEASUREMENT_ID di .env
```

### Disable Google Analytics
Set `VITE_ENABLE_GOOGLE_ANALYTICS=false` di `.env`

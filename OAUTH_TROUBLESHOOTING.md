# Google OAuth Troubleshooting Guide

## Error 400: origin_mismatch

### Penyebab Error
Error ini terjadi ketika domain aplikasi yang di-deploy tidak terdaftar di **Authorized JavaScript origins** di Google Cloud Console.

### Solusi Lengkap

#### 1. Update Google Cloud Console

1. **Buka Google Cloud Console**
   - Kunjungi: https://console.cloud.google.com/
   - Pilih project Anda

2. **Navigasi ke OAuth Configuration**
   - Buka **APIs & Services** → **Credentials**
   - Cari OAuth 2.0 Client ID yang digunakan
   - Klik **Edit** (ikon pensil)

3. **Update Authorized JavaScript origins**
   Tambahkan domain berikut:
   ```
   http://localhost:5173
   http://localhost:3000
   https://villasawarna.com
   https://www.villasawarna.com
   ```

4. **Update Authorized redirect URIs** (jika diperlukan)
   ```
   https://villasawarna.com
   https://www.villasawarna.com
   ```

5. **Simpan perubahan**
   - Klik **Save**
   - Tunggu beberapa menit untuk perubahan berlaku

#### 2. Verifikasi Konfigurasi

**Cek di Browser Console:**
```javascript
console.log('Current domain:', window.location.origin);
console.log('Google script loaded:', !!document.querySelector('script[src*="accounts.google.com/gsi/client"]'));
```

**Expected Output:**
```
Current domain: https://villasawarna.com
Google script loaded: true
```

#### 3. Environment Variables (Opsional)

Buat file `.env` di root project:
```bash
VITE_GOOGLE_CLIENT_ID=933733800266-pbjh3uf15g3sap2rclnfvs8r08ahmnq9.apps.googleusercontent.com
VITE_ENABLE_GOOGLE_ANALYTICS=true
```

#### 4. Content Security Policy

Pastikan CSP mengizinkan Google domains:
```javascript
script-src 'self' 'unsafe-inline' https://accounts.google.com https://*.googleapis.com https://*.gstatic.com;
connect-src 'self' https://accounts.google.com https://*.googleapis.com;
frame-src 'self' https://accounts.google.com;
```

### Testing Checklist

- [ ] Domain terdaftar di Google Cloud Console
- [ ] Google script berhasil dimuat
- [ ] Tidak ada error CSP di console
- [ ] OAuth popup muncul saat klik login
- [ ] Login berhasil tanpa error

### Common Issues

#### 1. **Script tidak dimuat**
- Cek koneksi internet
- Cek CSP configuration
- Cek apakah domain diizinkan

#### 2. **Popup diblokir**
- Izinkan popup untuk domain
- Cek browser settings

#### 3. **CORS Error**
- Pastikan domain terdaftar di Authorized origins
- Cek CSP connect-src directive

### Debug Commands

```javascript
// Cek OAuth configuration
console.log('OAuth Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
console.log('Current Domain:', window.location.origin);
console.log('Environment:', import.meta.env.MODE);

// Cek Google script
const googleScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
console.log('Google Script:', googleScript?.src);

// Cek CSP
const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
console.log('CSP:', meta?.content);
```

### Support

Jika masalah masih berlanjut:
1. Cek browser console untuk error details
2. Verifikasi domain di Google Cloud Console
3. Test di browser incognito
4. Cek network tab untuk failed requests

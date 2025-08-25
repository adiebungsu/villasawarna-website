# Production Deployment Configuration

## OAuth Configuration untuk Production

### 1. Environment Variables untuk Production

**Vercel:**
```bash
VITE_GOOGLE_CLIENT_ID=933733800266-pbjh3uf15g3sap2rclnfvs8r08ahmnq9.apps.googleusercontent.com
VITE_ENABLE_GOOGLE_ANALYTICS=true
VITE_API_BASE_URL=https://api.villasawarna.com
NODE_ENV=production
```

**Netlify:**
```bash
VITE_GOOGLE_CLIENT_ID=933733800266-pbjh3uf15g3sap2rclnfvs8r08ahmnq9.apps.googleusercontent.com
VITE_ENABLE_GOOGLE_ANALYTICS=true
VITE_API_BASE_URL=https://api.villasawarna.com
NODE_ENV=production
```

### 2. Google Cloud Console Configuration

**Authorized JavaScript origins:**
```
http://localhost:5173
http://localhost:3000
https://villasawarna.com
https://www.villasawarna.com
https://villasawarna.vercel.app
https://villasawarna.netlify.app
```

**Authorized redirect URIs:**
```
https://villasawarna.com
https://www.villasawarna.com
https://villasawarna.vercel.app
https://villasawarna.netlify.app
```

### 3. Build Command

```bash
npm run build
```

### 4. Deploy Directory

```
dist/
```

### 5. Post-Deploy Verification

1. **Cek Console Browser:**
   ```javascript
   console.log('Production OAuth Config:', {
     clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
     domain: window.location.origin,
     environment: import.meta.env.MODE
   });
   ```

2. **Test Google Login:**
   - Buka website production
   - Coba login dengan Google
   - Cek apakah popup muncul
   - Verifikasi tidak ada error OAuth

### 6. Troubleshooting Production

**Jika masih error OAuth:**

1. **Cek Domain di Console:**
   ```javascript
   console.log('Current domain:', window.location.origin);
   console.log('Allowed domains:', [
     'https://villasawarna.com',
     'https://www.villasawarna.com',
     'https://villasawarna.vercel.app',
     'https://villasawarna.netlify.app'
   ]);
   ```

2. **Update Google Cloud Console:**
   - Tambahkan domain yang muncul di console
   - Tunggu 5-10 menit untuk perubahan berlaku

3. **Cek Environment Variables:**
   - Pastikan `VITE_GOOGLE_CLIENT_ID` terset di hosting
   - Restart deployment jika perlu

### 7. Hosting-Specific Configuration

**Vercel:**
- Environment variables di Project Settings
- Build command: `npm run build`
- Output directory: `dist`

**Netlify:**
- Environment variables di Site Settings
- Build command: `npm run build`
- Publish directory: `dist`

**Firebase Hosting:**
- Environment variables di Functions config
- Build command: `npm run build`
- Public directory: `dist`

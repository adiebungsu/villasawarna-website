"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsiveSrcSet = exports.getOptimalImageSize = exports.generateBlurPlaceholder = exports.preloadImages = exports.preloadImage = exports.optimizeImageUrl = void 0;
const SUPPORTED_FORMATS = {
    webp: 'image/webp',
    avif: 'image/avif',
    jpeg: 'image/jpeg',
    png: 'image/png'
};
// Cek dukungan format gambar di browser
const checkFormatSupport = async (format) => {
    if (format === 'jpeg' || format === 'png')
        return true;
    const img = new Image();
    return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = `data:${SUPPORTED_FORMATS[format]};base64,${btoa('test')}`;
    });
};
/**
 * Mengoptimasi URL gambar dengan parameter yang sesuai
 */
const optimizeImageUrl = async (url, options = {}) => {
    const { width, height, quality = 80, format = 'webp' } = options;
    // Jika URL sudah dioptimasi, kembalikan as is
    if (url.includes('?') || url.includes('&')) {
        return url;
    }
    // Optimasi untuk berbagai provider gambar
    if (url.includes('unsplash.com')) {
        const params = new URLSearchParams();
        params.append('fm', format);
        params.append('q', quality.toString());
        if (width)
            params.append('w', width.toString());
        if (height)
            params.append('h', height.toString());
        return `${url}?${params.toString()}`;
    }
    if (url.includes('cloudinary.com')) {
        const transformations = [];
        if (width)
            transformations.push(`w_${width}`);
        if (height)
            transformations.push(`h_${height}`);
        transformations.push(`q_${quality}`);
        transformations.push(`f_${format}`);
        return url.replace('/upload/', `/upload/${transformations.join(',')}/`);
    }
    if (url.includes('imgur.com')) {
        return url.replace(/\.(jpg|jpeg|png)$/, `.${format}`);
    }
    // Untuk gambar lokal, gunakan Next.js Image Optimization
    if (url.startsWith('/')) {
        const params = new URLSearchParams();
        if (width)
            params.append('w', width.toString());
        if (height)
            params.append('h', height.toString());
        params.append('q', quality.toString());
        params.append('fm', format);
        return `${url}?${params.toString()}`;
    }
    return url;
};
exports.optimizeImageUrl = optimizeImageUrl;
// Preload gambar
const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = reject;
    });
};
exports.preloadImage = preloadImage;
// Preload multiple images
const preloadImages = (urls) => {
    return Promise.all(urls.map(exports.preloadImage));
};
exports.preloadImages = preloadImages;
/**
 * Generate blur placeholder untuk gambar
 */
const generateBlurPlaceholder = async (url) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                // Konversi ke format yang lebih kecil untuk placeholder
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Could not get canvas context'));
                        return;
                    }
                    // Set ukuran canvas ke ukuran kecil (20px)
                    const maxSize = 20;
                    const ratio = Math.min(maxSize / img.width, maxSize / img.height);
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    // Gambar dengan blur
                    ctx.filter = 'blur(2px)';
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Konversi ke base64 dengan kualitas rendah
                    resolve(canvas.toDataURL('image/jpeg', 0.1));
                };
                img.onerror = reject;
                img.src = base64;
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
    catch (err) {
        console.error('Error generating blur placeholder:', err);
        // Return placeholder gradient sebagai fallback
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzIDIiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmMWYxZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlMWUxZTEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNIDAgMCBMIDMgMCBMIDMgMiBMIDAgMiBaIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+';
    }
};
exports.generateBlurPlaceholder = generateBlurPlaceholder;
/**
 * Mendapatkan ukuran gambar yang optimal berdasarkan viewport
 */
const getOptimalImageSize = (originalWidth, originalHeight, maxWidth, maxHeight) => {
    const ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
    return {
        width: Math.round(originalWidth * ratio),
        height: Math.round(originalHeight * ratio)
    };
};
exports.getOptimalImageSize = getOptimalImageSize;
/**
 * Mendapatkan srcset untuk responsive images
 */
const getResponsiveSrcSet = (url, sizes, options = {}) => {
    return sizes
        .map(size => {
        const optimizedUrl = (0, exports.optimizeImageUrl)(url, { ...options, width: size });
        return `${optimizedUrl} ${size}w`;
    })
        .join(', ');
};
exports.getResponsiveSrcSet = getResponsiveSrcSet;

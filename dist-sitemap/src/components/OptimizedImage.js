"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const utils_1 = require("@/utils");
const image_1 = require("@/utils/image");
const OptimizedImage = ({ src, alt, className, width, height, priority = false, quality = 80, style, sizes = '100vw' }) => {
    const [isLoaded, setIsLoaded] = (0, react_2.useState)(false);
    const [error, setError] = (0, react_2.useState)(false);
    const [blurDataUrl, setBlurDataUrl] = (0, react_2.useState)('');
    const [optimizedSrc, setOptimizedSrc] = (0, react_2.useState)('');
    // Preload dan optimasi gambar
    (0, react_2.useEffect)(() => {
        const optimizeAndPreload = async () => {
            try {
                // Optimasi URL gambar
                const optimized = await (0, image_1.optimizeImageUrl)(src, {
                    width,
                    height,
                    quality,
                    format: 'webp'
                });
                setOptimizedSrc(optimized);
                // Generate blur placeholder untuk non-priority images
                if (!priority) {
                    const blur = await (0, image_1.generateBlurPlaceholder)(src);
                    setBlurDataUrl(blur);
                }
                // Preload untuk priority images
                if (priority) {
                    const img = new Image();
                    img.src = optimized;
                    img.onload = () => setIsLoaded(true);
                    img.onerror = () => {
                        setError(true);
                        setIsLoaded(true);
                    };
                }
            }
            catch (err) {
                console.error('Error optimizing image:', err);
                setOptimizedSrc(src);
            }
        };
        optimizeAndPreload();
    }, [src, width, height, quality, priority]);
    // Tambahkan preload link untuk priority images
    (0, react_2.useEffect)(() => {
        if (priority && optimizedSrc) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = optimizedSrc;
            document.head.appendChild(link);
            return () => {
                document.head.removeChild(link);
            };
        }
    }, [priority, optimizedSrc]);
    if (error) {
        return (react_1.default.createElement("div", { className: (0, utils_1.cn)('bg-gray-100 flex items-center justify-center', className), style: { width, height, ...style } },
            react_1.default.createElement("span", { className: "text-gray-400" }, "Gambar tidak tersedia")));
    }
    return (react_1.default.createElement("div", { className: (0, utils_1.cn)('relative overflow-hidden', className), style: style },
        !isLoaded && !error && (react_1.default.createElement("div", { className: "absolute inset-0 bg-gray-200 animate-pulse", style: {
                backgroundImage: blurDataUrl ? `url(${blurDataUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                transform: 'scale(1.1)'
            } })),
        react_1.default.createElement("img", { src: optimizedSrc || src, alt: alt, width: width, height: height, loading: priority ? 'eager' : 'lazy', decoding: priority ? 'sync' : 'async', sizes: sizes, className: (0, utils_1.cn)('transition-opacity duration-300', isLoaded ? 'opacity-100' : 'opacity-0', className), style: {
                ...style,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }, onLoad: () => setIsLoaded(true), onError: () => {
                setError(true);
                setIsLoaded(true);
            } })));
};
exports.default = OptimizedImage;

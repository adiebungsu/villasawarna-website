import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerSize = isMobile ? 'w-28 h-28' : 'w-36 h-36';

  // Path untuk segitiga dengan posisi sedikit lebih tinggi
  const trianglePath = "M 50,75 L 20,25 L 80,25 Z";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
      style={{
        // Prevent scrolling on mobile
        position: 'fixed',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
      }}
    >
      <div className="relative px-4 w-full max-w-[90vw] sm:max-w-md">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          className={`relative mx-auto ${containerSize}`}
        >
          {/* Logo Image */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <img
              src="/images/logo.png"
              alt="Villa Sawarna Logo"
              className="w-2/3 h-2/3 object-contain"
              style={{
                // Prevent image distortion on mobile
                maxWidth: '100%',
                height: 'auto',
                WebkitUserSelect: 'none', // Prevent selection on mobile
                userSelect: 'none'
              }}
            />
          </div>
          
          {/* Loading Triangle SVG */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            {/* Coral Triangle */}
            <motion.path
              d={trianglePath}
              fill="none"
              className="stroke-[#FF6B6B] dark:stroke-[#FF8585]"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              style={{
                transformOrigin: 'center',
                willChange: 'transform'
              }}
            />
            
            {/* Ocean Triangle */}
            <motion.path
              d={trianglePath}
              fill="none"
              className="stroke-[#0891B2] dark:stroke-[#06B6D4]"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.75
                }
              }}
              style={{
                transformOrigin: 'center',
                willChange: 'transform'
              }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
} 
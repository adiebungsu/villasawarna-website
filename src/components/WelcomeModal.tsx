import React, { useState, useRef, useEffect } from 'react';
import { X, Star, MapPin, Waves } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Set focus on the close button when the modal opens
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md bg-gradient-to-br from-white via-blue-50/80 to-white dark:from-gray-900 dark:via-blue-950/30 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-700/50 rounded-xl md:rounded-2xl shadow-2xl text-center transform transition-all duration-300 ease-out overflow-hidden">
        
        {/* Background Image dengan Gradasi */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-10 z-0">
          <OptimizedImage
            src="/images/karang-bereum-sawarna-2.webp"
            alt="Karang Bereum Sawarna Background"
            className="w-full h-full object-cover"
            quality={70}
            sizes="(max-width: 768px) 100vw, 400px"
            width={400}
            height={600}
          />
        </div>
        
        {/* Overlay Gradasi */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/85 to-white/90 dark:from-gray-900/90 dark:via-blue-950/85 dark:to-gray-900/90 z-10"></div>
        
        {/* Background decorative elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full opacity-50 z-20"></div>
        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-50 dark:bg-blue-800/20 rounded-full opacity-40 z-20"></div>
        
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="absolute top-6 right-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-full p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 shadow-lg z-[60]"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image Section - Sekarang di dalam modal */}
        <div className="relative w-full h-32 md:h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 overflow-hidden z-30">
          <OptimizedImage
            src="/images/karang-bereum-sawarna-2.webp"
            alt="Karang Bereum Sawarna 2"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            quality={90}
            sizes="(max-width: 768px) 100vw, 400px"
            width={400}
            height={192}
          />
          {/* Decorative elements around image */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-lg z-40">
            <Star className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
          <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-4 h-4 md:w-6 md:h-6 bg-blue-400 rounded-full flex items-center justify-center animate-pulse shadow-lg z-40">
            <Waves className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
        </div>

        {/* Modal Content */}
        <div className="px-4 py-4 md:px-6 md:py-6 relative z-30">
          {/* Header dengan Logo */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4 pb-2 md:pb-3 border-b-2 border-blue-100 dark:border-blue-800/50 relative">
            <div className="relative">
              <OptimizedImage
                src="/images/vislogo.png"
                alt="Villa Sawarna Logo"
                className="h-8 md:h-12 w-auto drop-shadow-sm"
                quality={90}
                height={48}
                width={120}
              />
            </div>
            <div className="text-left">
              <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                VillaSawarna
              </h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                Official Website
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-4 md:mb-6">
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 flex items-center justify-center gap-2">
              <span className="text-2xl md:text-3xl">🌟</span>
              Selamat Datang!
            </h4>
            <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-3 md:mb-4 rounded-full"></div>
            <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base leading-relaxed mb-3 md:mb-4">
              Terima kasih telah berkunjung. Temukan penginapan impian Anda di Sawarna dengan pemandangan menakjubkan dan fasilitas terbaik!
            </p>

            {/* Features List */}
            <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6 p-2 md:p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-400 rounded-full"></div>
                <span className="text-xs">Pemandangan pantai yang menakjubkan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-xs">Fasilitas modern dan nyaman</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full"></div>
                <span className="text-xs">Lokasi strategis di Sawarna</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/villas" className="w-full block">
            <button className="w-full bg-gradient-to-r from-coral to-orange-500 hover:from-coral-dark hover:to-orange-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-200 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              Jelajahi Sekarang
              <Star className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </Link>

          {/* Footer */}
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-blue-100 dark:border-blue-800/50">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>© 2024 VillaSawarna</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Welcome to Paradise
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import OptimizedImage from './OptimizedImage'; // Pastikan path import benar jika OptimizedImage ada di folder lain
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
    <div className={cn("fixed inset-0 z-[150] bg-black/70 flex items-center justify-center p-4 group", isOpen ? 'is-open' : '')}>
      {/* Modal Container */}
      <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md bg-gradient-to-br from-white to-gray-200 dark:from-[#d9d0d0] dark:to-gray-900 rounded-xl shadow-xl text-center transform transition-all duration-300 ease-out scale-95 opacity-0 group-[.is-open]:scale-100 group-[.is-open]:opacity-100">
        
        {/* Image that pops out */}
        <div className="absolute w-32 h-32 md:w-40 md:h-40 -top-16 md:-top-20 left-1/2 transform -translate-x-1/2 overflow-hidden">
           {/* Adjusted positioning and size */}
          <OptimizedImage
            src="/images/tanjunglogo.png"
            alt="Tanjung Logo"
            className="w-full h-full object-cover"
            quality={90}
            sizes="(max-width: 768px) 128px, 160px"
            width={160}
            height={160}
          />
        </div>

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        <div className="mt-16 md:mt-20">
          {/* Inner Card */}
          <div className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gradient-to-t from-gray-100 via-blue-100 to-white dark:from-gray-900 dark:via-blue-800 dark:to-gray-700 max-w-xs mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-coral mb-3">
              Selamat Datang!
            </h3>
            {/* Separator Line */}
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-white text-sm md:text-base leading-relaxed mb-4">
              Terima kasih telah berkunjung. Temukan penginapan impian Anda di Sawarna!
            </p>
            {/* Logo di bawah teks */}
            <div className="mt-2 mb-6 flex justify-center">
              <OptimizedImage
                src="/images/vislogo.png"
                alt="Villa Sawarna Logo"
                className="h-[62px] w-auto"
                quality={90}
                height={62}
                width={155}
              />
            </div>
            {/* CTA Button */}
            <Link to="/villas" className="w-full">
              <button className="w-full bg-coral dark:bg-red-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-coral-dark dark:hover:bg-red-800 transition-colors text-base shadow-md">
                Jelajahi Sekarang
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal; 
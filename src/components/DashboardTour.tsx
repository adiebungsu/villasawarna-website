import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  SkipForward, 
  SkipBack, 
  X, 
  HelpCircle, 
  Users, 
  Building2, 
  Calendar, 
  Newspaper, 
  MapPin, 
  Settings,
  TrendingUp,
  DollarSign,
  Star,
  MessageSquare,
  Eye,
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Info,
  Search,
  Heart,
  Phone,
  Mail,
  Globe,
  BarChart3,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TourStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  features?: string[];
  tips?: string[];
  actions?: {
    label: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

interface DashboardTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onTabChange?: (tabId: string) => void;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    target: '[data-tour="welcome"]',
    title: 'Selamat Datang di Dashboard',
    content: 'Selamat datang di dashboard Villa Sawarna! Mari kita jelajahi fitur-fitur yang akan membantu Anda mengelola akun dan aktivitas booking.',
    position: 'bottom',
    features: [
      'Kelola booking dan riwayat',
      'Lihat statistik aktivitas',
      'Atur preferensi akun',
      'Akses fitur bantuan'
    ],
    tips: [
      'Gunakan tab untuk navigasi cepat',
      'Cek notifikasi untuk update terbaru',
      'Gunakan fitur bantuan jika butuh panduan'
    ]
  },
  {
    id: 'stats-overview',
    target: '[data-tour="stats-cards"]',
    title: 'Statistik Aktivitas',
    content: 'Lihat ringkasan aktivitas dan statistik booking Anda dalam satu tampilan.',
    position: 'bottom',
    features: [
      'Total booking yang dilakukan',
      'Jumlah review yang diberikan',
      'Total pengeluaran',
      'Status loyalty points'
    ],
    tips: [
      'Cek statistik untuk track aktivitas',
      'Lihat progress loyalty program',
      'Monitor pengeluaran booking'
    ],
    actions: [
      {
        label: 'Lihat Detail',
        description: 'Cek statistik lengkap',
        icon: <BarChart3 className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'quick-actions',
    target: '[data-tour="quick-actions"]',
    title: 'Akses Cepat',
    content: 'Akses cepat ke fitur-fitur yang paling sering digunakan untuk memudahkan navigasi dashboard.',
    position: 'right',
    features: [
      'Booking villa baru',
      'Cari villa yang tersedia',
      'Hubungi customer support',
      'Lihat invoice booking'
    ],
    tips: [
      'Gunakan untuk akses cepat ke fitur utama',
      'Hubungi support jika ada pertanyaan',
      'Cek invoice untuk pembayaran'
    ]
  },
  {
    id: 'overview-tab',
    target: '[data-tour="tab-overview"]',
    title: 'Tab Overview',
    content: 'Ringkasan lengkap aktivitas dan informasi penting dalam satu tampilan.',
    position: 'bottom',
    features: [
      'Ringkasan booking terbaru',
      'Statistik aktivitas',
      'Notifikasi penting',
      'Quick actions'
    ],
    tips: [
      'Cek overview untuk informasi terbaru',
      'Lihat notifikasi untuk update penting',
      'Gunakan quick actions untuk akses cepat'
    ]
  },
  {
    id: 'bookings-tab',
    target: '[data-tour="tab-bookings"]',
    title: 'Tab Booking',
    content: 'Kelola semua booking dan riwayat reservasi Anda dalam satu tempat.',
    position: 'bottom',
    features: [
      'Riwayat booking lengkap',
      'Status booking real-time',
      'Detail pembayaran',
      'Download invoice'
    ],
    tips: [
      'Cek status booking secara berkala',
      'Simpan invoice untuk keperluan',
      'Hubungi support jika ada masalah'
    ],
    actions: [
      {
        label: 'Lihat Booking',
        description: 'Cek riwayat booking',
        icon: <Calendar className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'reviews-tab',
    target: '[data-tour="tab-reviews"]',
    title: 'Tab Ulasan',
    content: 'Kelola ulasan dan review yang telah Anda berikan untuk villa yang pernah dikunjungi.',
    position: 'bottom',
    features: [
      'Riwayat ulasan',
      'Rating yang diberikan',
      'Foto review',
      'Edit ulasan'
    ],
    tips: [
      'Beri ulasan untuk membantu traveler lain',
      'Upload foto untuk review yang lebih informatif',
      'Edit ulasan jika ada kesalahan'
    ],
    actions: [
      {
        label: 'Lihat Ulasan',
        description: 'Cek riwayat ulasan',
        icon: <Star className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'wishlist-tab',
    target: '[data-tour="tab-wishlist"]',
    title: 'Tab Wishlist',
    content: 'Kelola villa favorit yang telah Anda simpan untuk booking di masa depan.',
    position: 'bottom',
    features: [
      'Villa favorit tersimpan',
      'Notifikasi promo villa',
      'Hapus dari wishlist',
      'Booking langsung'
    ],
    tips: [
      'Simpan villa favorit untuk nanti',
      'Aktifkan notifikasi untuk promo',
      'Booking langsung dari wishlist'
    ],
    actions: [
      {
        label: 'Lihat Wishlist',
        description: 'Cek villa favorit',
        icon: <Heart className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'loyalty-tab',
    target: '[data-tour="tab-loyalty"]',
    title: 'Tab Loyalty',
    content: 'Program loyalty untuk member setia dengan berbagai benefit dan reward.',
    position: 'bottom',
    features: [
      'Loyalty points',
      'Tier membership',
      'Reward dan benefit',
      'Progress ke tier berikutnya'
    ],
    tips: [
      'Kumpulkan points untuk naik tier',
      'Manfaatkan benefit sesuai tier',
      'Cek progress ke tier berikutnya'
    ],
    actions: [
      {
        label: 'Lihat Loyalty',
        description: 'Cek program loyalty',
        icon: <Award className="w-4 h-4" />
      }
    ]
  },
  {
    id: 'settings-tab',
    target: '[data-tour="tab-settings"]',
    title: 'Tab Pengaturan',
    content: 'Atur preferensi akun, notifikasi, dan pengaturan keamanan.',
    position: 'bottom',
    features: [
      'Informasi pribadi',
      'Pengaturan notifikasi',
      'Keamanan akun',
      'Preferensi bahasa'
    ],
    tips: [
      'Update informasi pribadi secara berkala',
      'Atur notifikasi sesuai preferensi',
      'Jaga keamanan akun'
    ],
    actions: [
      {
        label: 'Pengaturan',
        description: 'Atur preferensi akun',
        icon: <Settings className="w-4 h-4" />
      }
    ]
  }
];

const DashboardTour: React.FC<DashboardTourProps> = ({ isOpen, onClose, onComplete, onTabChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setCurrentStep(0);
      document.body.style.overflow = 'hidden';
      
      // Prevent zoom on mobile
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      
      // Restore viewport
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, [isOpen]);

  // Effect untuk mengganti tab berdasarkan step yang aktif
  useEffect(() => {
    if (onTabChange && isVisible) {
      const currentStepData = tourSteps[currentStep];
      const tabMapping: { [key: string]: string } = {
        'welcome': 'overview',
        'stats-overview': 'overview',
        'quick-actions': 'overview',
        'overview-tab': 'overview',
        'bookings-tab': 'bookings',
        'reviews-tab': 'reviews',
        'wishlist-tab': 'wishlist',
        'loyalty-tab': 'loyalty',
        'settings-tab': 'settings'
      };
      
      const targetTab = tabMapping[currentStepData.id];
      if (targetTab) {
        onTabChange(targetTab);
        // Tambahkan delay kecil untuk memastikan tab berubah sebelum tooltip diposisikan
        setTimeout(() => {
          // Trigger re-render untuk memastikan tooltip diposisikan dengan benar
        }, 100);
      }
    }
  }, [currentStep, isVisible, onTabChange]);

  useEffect(() => {
    if (!isVisible) return;

    const currentStepData = tourSteps[currentStep];
    const targetElement = document.querySelector(currentStepData.target);



    if (!targetElement) {
      // Fallback positioning if target element is not found
      
      if (tooltipRef.current) {
        const { topNavbarHeight, bottomNavbarHeight } = detectNavbarHeights();
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          // Position in center of screen for mobile
          const centerY = topNavbarHeight + (window.innerHeight - topNavbarHeight - bottomNavbarHeight) / 2;
          tooltipRef.current.style.top = `${centerY}px`;
          tooltipRef.current.style.left = '20px';
          tooltipRef.current.style.width = 'calc(100vw - 40px)';
          tooltipRef.current.style.maxWidth = 'calc(100vw - 40px)';
        } else {
          // Position in center of screen for desktop
          tooltipRef.current.style.top = '50%';
          tooltipRef.current.style.left = '50%';
          tooltipRef.current.style.transform = 'translate(-50%, -50%)';
        }
      }
      return;
    }

    if (tooltipRef.current) {
      const targetRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Check if mobile viewport
      const isMobile = window.innerWidth < 768;
      
      // Position tooltip based on step position
      let top = 0;
      let left = 0;

      if (isMobile) {
        // Mobile positioning - completely separate logic from desktop
        const { topNavbarHeight, bottomNavbarHeight } = detectNavbarHeights();
        
        // Special handling for quick-actions step
        if (currentStepData.id === 'quick-actions') {
          // For quick-actions, use fixed positioning in the center-top area
          if (tooltipRef.current) {
            // Set fixed positioning styles directly
            tooltipRef.current.style.position = 'fixed';
            tooltipRef.current.style.top = '80px';
            tooltipRef.current.style.left = '50%';
            tooltipRef.current.style.transform = 'translateX(-50%)';
            tooltipRef.current.style.width = 'calc(100vw - 40px)';
            tooltipRef.current.style.maxWidth = 'calc(100vw - 40px)';
            tooltipRef.current.style.maxHeight = 'calc(100vh - 160px)';
            tooltipRef.current.style.zIndex = '10000';
            tooltipRef.current.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
            tooltipRef.current.style.border = '2px solid #3b82f6';
            tooltipRef.current.style.overflowY = 'auto';
            
            // Don't set top and left variables, let CSS handle positioning
            return;
          }
                } else {
          // For other steps, use fixed positioning in center-top area like quick-actions
            if (tooltipRef.current) {
            // Set fixed positioning styles directly for all mobile steps
            tooltipRef.current.style.position = 'fixed';
            tooltipRef.current.style.top = '80px';
            tooltipRef.current.style.left = '50%';
            tooltipRef.current.style.transform = 'translateX(-50%)';
            tooltipRef.current.style.width = 'calc(100vw - 40px)';
            tooltipRef.current.style.maxWidth = 'calc(100vw - 40px)';
            tooltipRef.current.style.maxHeight = 'calc(100vh - 160px)';
            tooltipRef.current.style.zIndex = '10000';
            tooltipRef.current.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
            tooltipRef.current.style.border = '2px solid #3b82f6';
              tooltipRef.current.style.overflowY = 'auto';
            
            // Don't set top and left variables, let CSS handle positioning
            return;
          }
        }
      } else {
        // Desktop positioning
        switch (currentStepData.position) {
          case 'top':
            top = targetRect.top - tooltipRect.height - 20;
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            break;
          case 'bottom':
            top = targetRect.bottom + 20;
            left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
            break;
          case 'left':
            top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
            left = targetRect.left - tooltipRect.width - 20;
            break;
          case 'right':
            top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
            left = targetRect.right + 20;
            break;
          case 'top-left':
            top = targetRect.top - tooltipRect.height - 20;
            left = targetRect.left;
            break;
          case 'top-right':
            top = targetRect.top - tooltipRect.height - 20;
            left = targetRect.right - tooltipRect.width;
            break;
          case 'bottom-left':
            top = targetRect.bottom + 20;
            left = targetRect.left;
            break;
          case 'bottom-right':
            top = targetRect.bottom + 20;
            left = targetRect.right - tooltipRect.width;
            break;
        }
      }

      // Ensure tooltip stays within viewport
      if (top < 20) top = 20;
      if (left < 20) left = 20;
      
      // Check for bottom navbar and other fixed elements
      const { topNavbarHeight, bottomNavbarHeight } = detectNavbarHeights();
      
      // Prevent tooltip from being hidden by bottom navbar
      if (top + tooltipRect.height > window.innerHeight - bottomNavbarHeight - 40) {
        // Try to position above the target element
        const newTop = targetRect.top - tooltipRect.height - 20;
        if (newTop > topNavbarHeight + 20) {
          top = newTop;
        } else {
          // If can't fit above, position at the top with some margin
          top = topNavbarHeight + 30;
        }
      }
      
      // Prevent tooltip from being hidden by top navbar
      if (top < topNavbarHeight + 20) {
        top = topNavbarHeight + 20;
      }
      
      if (left + tooltipRect.width > window.innerWidth - 20) {
        left = window.innerWidth - tooltipRect.width - 20;
      }

      tooltipRef.current.style.top = `${top}px`;
      tooltipRef.current.style.left = `${left}px`;
      
      // Check for overlapping elements and adjust position if needed
      setTimeout(() => {
        if (tooltipRef.current) {
          const currentTooltipRect = tooltipRef.current.getBoundingClientRect();
          const overlappingElements = detectOverlappingElements(currentTooltipRect);
          
          // Filter out the tooltip itself and its children
          const filteredOverlapping = overlappingElements.filter(element => 
            !tooltipRef.current?.contains(element) && 
            element !== tooltipRef.current
          );
          
          if (filteredOverlapping.length > 0) {
            // Find the most problematic overlapping element (usually the largest)
            const problematicElement = filteredOverlapping.reduce((largest, current) => {
              const largestRect = largest.getBoundingClientRect();
              const currentRect = current.getBoundingClientRect();
              return (currentRect.width * currentRect.height) > (largestRect.width * largestRect.height) ? current : largest;
            });
            
            const problematicRect = problematicElement.getBoundingClientRect();
            
            // Adjust position to avoid overlap
            let adjustedTop = top;
            let adjustedLeft = left;
            
            // If tooltip is below and overlapping, move it above
            if (currentTooltipRect.top > problematicRect.top) {
              adjustedTop = problematicRect.top - currentTooltipRect.height - 20;
            }
            // If tooltip is above and overlapping, move it below
            else if (currentTooltipRect.bottom < problematicRect.bottom) {
              adjustedTop = problematicRect.bottom + 20;
            }
            
            // If tooltip is to the right and overlapping, move it to the left
            if (currentTooltipRect.left > problematicRect.left) {
              adjustedLeft = problematicRect.left - currentTooltipRect.width - 20;
            }
            // If tooltip is to the left and overlapping, move it to the right
            else if (currentTooltipRect.right < problematicRect.right) {
              adjustedLeft = problematicRect.right + 20;
            }
            
            // Ensure adjusted position is still within viewport
            if (adjustedTop >= 20 && adjustedTop + currentTooltipRect.height <= window.innerHeight - 20) {
              tooltipRef.current.style.top = `${adjustedTop}px`;
            }
            if (adjustedLeft >= 20 && adjustedLeft + currentTooltipRect.width <= window.innerWidth - 20) {
              tooltipRef.current.style.left = `${adjustedLeft}px`;
            }
          }
        }
      }, 50);
      
      // Scroll to target element on mobile
      if (isMobile && targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }, 100);
      }
    }
  }, [currentStep, isVisible]);

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onComplete();
  };

  // Function to detect navbar heights dynamically
  const detectNavbarHeights = () => {
    let topNavbarHeight = 60;
    let bottomNavbarHeight = 80;
    
    // Detect top navbar
    const topNavSelectors = ['nav', '.navbar', '.header', '.top-nav'];
    topNavSelectors.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        if (style.position === 'fixed' && rect.top === 0) {
          topNavbarHeight = Math.max(topNavbarHeight, rect.height);
        }
      }
    });
    
    // Detect bottom navbar - improved detection for mobile navbar
    const bottomNavSelectors = [
      '.bottom-nav', 
      '.footer', 
      '.mobile-nav',
      'nav[class*="bottom"]',
      'div[class*="bottom"]',
      'div[class*="fixed"][class*="bottom"]'
    ];
    
    // Also check for elements with specific classes that indicate bottom navigation
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const className = element.className || '';
      
      // Check if element is fixed positioned at bottom
      if (style.position === 'fixed' && 
          rect.bottom >= window.innerHeight - 5 && 
          rect.bottom <= window.innerHeight + 5) {
        
        // Check if it looks like a bottom navbar (has navigation-like content)
        const hasNavContent = element.querySelector('nav, a, button, [role="navigation"]');
        const hasBottomClasses = className.includes('bottom') || 
                                className.includes('nav') || 
                                className.includes('footer');
        
        if (hasNavContent || hasBottomClasses) {
          bottomNavbarHeight = Math.max(bottomNavbarHeight, rect.height);
        }
      }
    });
    
    // For mobile devices, ensure minimum bottom navbar height
    if (window.innerWidth < 768) {
      bottomNavbarHeight = Math.max(bottomNavbarHeight, 80);
      
      // Additional check for common mobile navbar patterns
      const mobileNavSelectors = [
        'div[class*="fixed"][class*="bottom"]',
        'nav[class*="fixed"][class*="bottom"]',
        '.mobile-nav',
        '.bottom-nav'
      ];
      
      mobileNavSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          if (style.position === 'fixed' && rect.bottom >= window.innerHeight - 10) {
            bottomNavbarHeight = Math.max(bottomNavbarHeight, rect.height + 20); // Add extra margin
          }
        }
      });
    }
    
    return { topNavbarHeight, bottomNavbarHeight };
  };

  // Function to detect overlapping elements
  const detectOverlappingElements = (tooltipRect: DOMRect) => {
    const overlappingElements: Element[] = [];
    
    // Common selectors for fixed elements that might overlap
    const fixedSelectors = [
      'nav',
      '[role="navigation"]',
      '.navbar',
      '.nav',
      '.header',
      '.footer',
      '.bottom-nav',
      '.top-nav',
      '.fixed',
      '.sticky',
      '[data-tour]' // Exclude other tour elements
    ];
    
    // Check fixed elements first
    fixedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const elementRect = element.getBoundingClientRect();
        
        // Check if element overlaps with tooltip
        if (
          elementRect.left < tooltipRect.right &&
          elementRect.right > tooltipRect.left &&
          elementRect.top < tooltipRect.bottom &&
          elementRect.bottom > tooltipRect.top
        ) {
          const computedStyle = window.getComputedStyle(element);
          if (
            computedStyle.display !== 'none' &&
            computedStyle.visibility !== 'hidden' &&
            computedStyle.opacity !== '0' &&
            elementRect.width > 0 &&
            elementRect.height > 0
          ) {
            overlappingElements.push(element);
          }
        }
      });
    });
    
    return overlappingElements;
  };

  // Handle swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start detected');
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    
    const handleTouchEnd = (e: TouchEvent) => {
      console.log('Touch end detected');
      const touch = e.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Minimum swipe distance
      const minSwipeDistance = 50;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        console.log('Swipe detected, deltaX:', deltaX);
        if (deltaX > 0) {
          // Swipe right - previous step
          console.log('Swipe right - previous step');
          prevStep();
        } else {
          // Swipe left - next step
          console.log('Swipe left - next step');
          nextStep();
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd, { once: true });
  };

  if (!isOpen) return null;

  const currentStepData = tourSteps[currentStep];
  


  return (
    <>
      <style>
        {`
          @keyframes tooltipSlideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div 
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-50 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50" 
          onClick={onClose}
        />
        
        {/* Mobile Progress Indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
          <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-lg">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {currentStep + 1} / {tourSteps.length}
            </span>
          </div>
        </div>
        
        {/* Mobile Swipe Hint - positioned above bottom navbar */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
          <div className="bg-black/70 text-white rounded-full px-3 py-1 text-xs">
            <span>Swipe kiri/kanan untuk navigasi</span>
          </div>
        </div>
        
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className={`absolute z-10 w-[calc(100vw-2rem)] max-w-sm md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 mx-4 md:mx-0 ${
            window.innerWidth < 768 ? 'quick-actions-tooltip' : ''
          }`}
          onTouchStart={handleTouchStart}
          style={{
            // Mobile-specific styling
            ...(window.innerWidth < 768 && {
              width: 'calc(100vw - 40px)',
              maxWidth: 'calc(100vw - 40px)',
              left: '20px',
              right: '20px'
            }),
            // Add a subtle animation when repositioning
            animation: 'tooltipSlideIn 0.3s ease-out',
            // Ensure tooltip doesn't exceed screen height on mobile with extra margin for bottom navbar
            maxHeight: window.innerWidth < 768 ? 'calc(100vh - 140px)' : 'none',

          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base truncate">
                {currentStepData.title}
                {window.innerWidth < 768 && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-bold">
                    📱 Mobile View
                  </span>
                )}
              </h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                {currentStep + 1} / {tourSteps.length}
              </Badge>
                                                                                                                                                                                                                       <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div 
            className="p-3 md:p-4 overflow-y-auto" 
            style={{ 
              maxHeight: window.innerWidth < 768 ? 'calc(100vh - 220px)' : 'none'
            }}
          >
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {currentStepData.content}
              {window.innerWidth < 768 && (
                <div className="space-y-2 mt-3">
                  <span className="block text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    💡 Tip: Tooltip ini diposisikan khusus untuk mobile agar tidak tertutup bottom navbar
                  </span>
                  <span className="block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    📱 Tampilan mobile yang disederhanakan. Lihat versi desktop untuk informasi lengkap.
                  </span>
                </div>
              )}
            </p>

            {/* Features - Hidden on mobile */}
            {currentStepData.features && window.innerWidth >= 768 && (
              <div className="mb-4">
                <h4 className="text-xs md:text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Fitur Utama:
                </h4>
                <ul className="space-y-1">
                  {currentStepData.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips - Hidden on mobile */}
            {currentStepData.tips && window.innerWidth >= 768 && (
              <div className="mb-4">
                <h4 className="text-xs md:text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Tips & Trik:
                </h4>
                <ul className="space-y-1">
                  {currentStepData.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Info className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions - Hidden on mobile */}
            {currentStepData.actions && window.innerWidth >= 768 && (
              <div className="mb-4">
                <h4 className="text-xs md:text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Aksi Cepat:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {currentStepData.actions.map((action, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div className="flex-shrink-0">
                        {action.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                          {action.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 md:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={skipTour}
                className="text-xs h-8 px-2 md:px-3"
              >
                <span className="hidden sm:inline">Skip Tour</span>
                <span className="sm:hidden">Skip</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              {currentStep === tourSteps.length - 1 ? (
                <Button
                  size="sm"
                  onClick={onComplete}
                  className="text-xs h-8 px-2 md:px-4 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Selesai</span>
                  <span className="sm:hidden">Done</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="text-xs h-8 px-2 md:px-4"
                >
                  <span className="hidden sm:inline">
                    {currentStep === 0 ? 'Mulai Tour' : 'Selanjutnya'}
                  </span>
                  <span className="sm:hidden">
                    {currentStep === 0 ? 'Mulai' : 'Next'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1 md:ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTour;

// Add CSS animation for tooltip slide in
const style = document.createElement('style');
style.textContent = `
  @keyframes tooltipSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes quickActionsSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .quick-actions-tooltip {
    animation: quickActionsSlideIn 0.4s ease-out !important;
  }
`;
if (!document.head.querySelector('style[data-tooltip-animation]')) {
  style.setAttribute('data-tooltip-animation', 'true');
  document.head.appendChild(style);
}

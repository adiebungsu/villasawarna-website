import React, { useState, useEffect } from 'react';
import Hero from "@/components/Hero";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import { Hotel, MapPin, Umbrella, Wifi, Star, TreePalm, Utensils, Clock, Pizza, MapPinHouse, Truck, Calendar, User, Shield, MessageSquare, Percent, Icon, Building2, Home, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import SearchBar from "@/components/SearchBar";
import { Link } from 'react-router-dom';
import { articleData } from '../data/articles';
import { Badge } from "@/components/ui/badge";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getVillasData } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { PromoSection } from "@/components/PromoSection";
import { FloatingThemeToggle } from '@/components/FloatingThemeToggle';
import { Article } from '@/types/article';
import { cn } from '@/lib/utils';
import WelcomeModal from '@/components/WelcomeModal';
import ArticlesSection from '@/components/ArticlesSection';
import { getLowestRoomPrice } from '@/utils/price';

// Data testimonial
const testimonialData = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta",
    rating: 5,
    comment: "Pengalaman menginap yang luar biasa! Villa-nya bersih, nyaman, dan lokasinya strategis. Staff sangat ramah dan membantu.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    date: "15 Maret 2024"
  },
  {
    id: 2,
    name: "Siti Rahayu",
    location: "Bandung",
    rating: 5,
    comment: "Pantai Sawarna sangat indah dan villa-nya nyaman sekali. Cocok untuk liburan keluarga. Pasti akan kembali lagi!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    date: "12 Maret 2024"
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    location: "Surabaya",
    rating: 4,
    comment: "Fasilitas lengkap, view pantai yang memukau, dan harga yang terjangkau. Sangat direkomendasikan!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    date: "10 Maret 2024"
  },
  {
    id: 4,
    name: "Dewi Lestari",
    location: "Yogyakarta",
    rating: 5,
    comment: "Pelayanan sangat memuaskan, villa bersih dan nyaman. Lokasi strategis dekat dengan pantai dan tempat wisata.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    date: "8 Maret 2024"
  }
];

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Villa Sawarna",
    "description": "Temukan villa dan homestay terbaik di Pantai Sawarna, Goa Langir, dan Legon Pari. Penginapan terbaik dengan harga terjangkau untuk liburan pantai impian Anda.",
    "url": "https://villasawarna.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sawarna",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-6.9876",
      "longitude": "106.1234"
    },
    "priceRange": "Rp 300.000 - Rp 1.000.000",
    "openingHours": "Mo-Su 00:00-23:59",
    "telephone": "+62-123-4567-890",
    "email": "layanan@villasawarna.com"
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const [filter, setFilter] = useState('all');
  const villasData = getVillasData();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  // Handle resize untuk mendeteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll untuk search bar
  useEffect(() => {
    const handleScroll = () => {
      const searchBarElement = document.querySelector('.search-bar-container');
      if (searchBarElement) {
        const searchBarPosition = searchBarElement.getBoundingClientRect().top;
        setIsSearchVisible(searchBarPosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeCategory, setActiveCategory] = useState('semua');
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [quickViewImages, setQuickViewImages] = useState<string[]>([]);
  const [quickViewTitle, setQuickViewTitle] = useState<string>('');
  const [quickViewIdx, setQuickViewIdx] = useState(0);
  const [quickViewSlide, setQuickViewSlide] = useState(0);
  const [quickViewEmblaRef, quickViewEmblaApi] = useEmblaCarousel({ align: 'start' });

  useEffect(() => {
    if (quickViewEmblaApi) {
      quickViewEmblaApi.scrollTo(quickViewSlide);
    }
  }, [quickViewOpen, quickViewEmblaApi, quickViewSlide]);

  useEffect(() => {
    if (quickViewEmblaApi) {
      const onSelect = () => {
        setQuickViewSlide(quickViewEmblaApi.selectedScrollSnap());
      };
      quickViewEmblaApi.on('select', onSelect);
      return () => {
        quickViewEmblaApi.off('select', onSelect);
      };
    }
  }, [quickViewEmblaApi]);

  // Effect untuk menampilkan WelcomeModal saat halaman dimuat
  useEffect(() => {
    console.log('useEffect di Index.tsx berjalan');
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    console.log('Nilai sessionStorage "hasSeenModal":', hasSeenModal);

    if (!hasSeenModal) {
      console.log('hasSeenModal tidak ditemukan di sessionStorage, menampilkan modal');
      setIsWelcomeModalOpen(true);
      sessionStorage.setItem('hasSeenWelcomeModal', 'true');
    } else {
      console.log('hasSeenModal ditemukan di sessionStorage, tidak menampilkan modal');
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
  };

  return (
    <>
      <SEO 
        title="Beranda"
        description="Temukan villa dan homestay terbaik di Pantai Sawarna, Goa Langir, dan Legon Pari. Penginapan terbaik dengan harga terjangkau untuk liburan pantai impian Anda."
        keywords="villa sawarna, homestay sawarna, penginapan sawarna, wisata sawarna, liburan sawarna, pantai sawarna"
        structuredData={structuredData}
      />
      <div className="hero-section">
        <Hero />
      </div>

      {/* SearchBar Container - untuk menentukan posisi awal */}
      <div className="search-bar-container relative -mt-5 z-10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto shadow-xl border border-gray-200/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Floating SearchBar */}
      <div
        className={cn(
          "fixed z-40 px-4 transition-all duration-300",
          isMobile ? "top-4" : "top-20",
          "left-0 right-0",
          isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container-custom">
          <div className={cn(
            "max-w-3xl mx-auto shadow-xl border border-gray-200/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl",
                "transition-all duration-300 transform",
                isSearchVisible ? "scale-100" : "scale-95"
          )}>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Quick Links Section */}
        <section className="py-8 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Link to="/villas">
                <div className="group bg-gradient-to-br from-ocean/5 to-ocean/10 dark:from-ocean-dark/20 dark:to-ocean-dark/30 rounded-xl p-3 text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <img src="/images/villa mewah.png" alt="Villa Icon" className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Villa</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Penginapan Premium</p>
                </div>
              </Link>
              <Link to="/homestays">
                <div className="group bg-gradient-to-br from-coral/5 to-coral/10 dark:from-coral-dark/20 dark:to-coral-dark/30 rounded-xl p-3 text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <img src="/images/homestay.png" alt="Homestay Icon" className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Homestay</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Penginapan Lokal</p>
                </div>
              </Link>
              <Link to="/destinations">
                <div className="group bg-gradient-to-br from-purple-500/5 to-purple-500/10 dark:from-purple-500/20 dark:to-purple-500/30 rounded-xl p-3 text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <img src="/images/lokasi.png" alt="Destinasi Icon" className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Destinasi</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tempat Wisata</p>
                </div>
              </Link>
              <Link to="/articles">
                <div className="group bg-gradient-to-br from-green-500/5 to-green-500/10 dark:from-green-500/20 dark:to-green-500/30 rounded-xl p-3 text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <img src="/images/artikel.png" alt="Artikel Icon" className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Artikel</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tips & Info</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <div className="container-custom"><hr className="my-8 border-gray-200 dark:border-gray-700" /></div>

        <div className={cn("pt-2", isMobile && "pb-16")}>
          <FeaturedProperties />
          {/* Custom Villa Promo Cards */}
          <div className="flex flex-col gap-4 mt-8 md:flex-row md:gap-4">
            {[0,1,2,3].map((idx) => {
              const villa = idx === 3 ? {
                id: "villa-sinar-matahari-resort",
                name: "Villa Sinar Matahari Resort",
                image: "https://i.imgur.com/nalEe4n.jpeg",
                rating: 4.8,
                reviews: 189,
                location: "Pantai Sawarna",
                price: getLowestRoomPrice("villa-sinar-matahari-resort", 200000),
                originalPrice: 450000,
                discount: 56,
                mainImages: [
                  "https://i.imgur.com/nalEe4n.jpeg",
                  "https://i.imgur.com/dJPXB3o.jpeg",
                  "https://i.imgur.com/buvZnBO.jpeg",
                  "https://i.imgur.com/HTv5TtH.jpeg",
                  "https://i.imgur.com/t2e07FS.jpeg",
                  "https://i.imgur.com/SrriRYF.jpeg",
                  "https://i.imgur.com/zXqlpvv.jpeg",
                  "https://i.imgur.com/Zenhfsh.jpeg",
                  "https://i.imgur.com/0fBZA9U.jpeg",
                  "https://i.imgur.com/nj62x2B.jpeg",
                  "https://i.imgur.com/zLTr5LZ.jpeg",
                  "https://i.imgur.com/gHYvnGu.jpeg",
                  "https://i.imgur.com/Ndo0XAD.jpeg",
                  "https://i.imgur.com/xSIQsbI.jpeg",
                  "https://i.imgur.com/jAylpLL.jpeg"
                ],
                facilities: ["18 Kamar Tidur Mewah", "6 Kamar Mandi Dalam", "AC di Semua Kamar", "TV LED 43 inch"],
                capacity: 100,
                bedrooms: 18,
                bathrooms: 6
              } : idx === 0 ? {
                id: "villa-cempaka",
                name: "Villa Cempaka",
                image: "https://i.imgur.com/MBymqfS.jpeg",
                rating: 4.5,
                reviews: 80,
                location: "Pantai Sawarna",
                price: getLowestRoomPrice("villa-cempaka", 350000),
                originalPrice: 400000,
                discount: 12,
                mainImages: [
                  "https://i.imgur.com/MBymqfS.jpeg",
                  "https://i.imgur.com/ZWM1vUu.jpeg",
                  "https://i.imgur.com/UYjw1CE.jpeg",
                  "https://i.imgur.com/R0HR9FM.jpeg",
                  "https://i.imgur.com/qKALLdC.jpeg"
                ],
                facilities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "View Pantai", "Pemandangan Sawah"],
                capacity: 2,
                bedrooms: 1,
                bathrooms: 1
              } : idx === 1 ? {
                id: "villa-aki-nini",
                name: "Villa Aki Nini",
                image: "https://i.imgur.com/SHPK4Qf.jpeg",
                rating: 4.6,
                reviews: 95,
                location: "Pantai Sawarna",
                price: getLowestRoomPrice("villa-aki-nini", 350000),
                originalPrice: 400000,
                discount: 12,
                mainImages: [
                  "https://i.imgur.com/SHPK4Qf.jpeg",
                  "https://i.imgur.com/YzOw7h5.jpeg",
                  "https://i.imgur.com/xLoaHAa.jpeg",
                  "https://i.imgur.com/DasIbsh.jpeg",
                  "https://i.imgur.com/5dKSBLs.jpeg",
                  "https://i.imgur.com/fKygTJY.jpeg",
                  "https://i.imgur.com/WZgMdyW.jpeg",
                  "https://i.imgur.com/wYR0Uzv.jpeg",
                  "https://i.imgur.com/VhVkW9P.jpeg"
                ],
                facilities: ["AC", "TV", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Ruang Tamu"],
                capacity: 60,
                bedrooms: 8,
                bathrooms: 8
              } : idx === 2 ? { // Ganti index 2 (sebelumnya Sinar Pelangi) dengan Villa Sawarna Resort
                id: "villa-sawarna-resort",
                name: "Villa Sawarna Resort",
                image: "https://i.imgur.com/KP2ncPi.jpeg", // Gambar Utama Sawarna Resort
                rating: 4.7,
                reviews: 120,
                location: "Pantai Sawarna",
                price: getLowestRoomPrice("villa-sawarna-resort", 450000),
                originalPrice: 500000,
                discount: 10,
                mainImages: [
                  "https://i.imgur.com/KP2ncPi.jpeg",
                  "https://i.imgur.com/d22kux8.jpeg",
                  "https://i.imgur.com/BtWp6Yr.jpeg",
                  "https://i.imgur.com/YjosayP.jpeg",
                  "https://i.imgur.com/SOKaH8H.jpeg",
                  "https://i.imgur.com/7Djvl8E.jpeg"
                ],
                facilities: ["AC", "WiFi", "Restoran", "Tepi Pantai"],
                capacity: 6,
                bedrooms: 3,
                bathrooms: 3
              } : villasData[idx];
              if (!villa) return null;
              return (
                <div key={villa.id} className={cn(
                  "bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden relative flex flex-col hover:shadow-xl transition-shadow duration-300",
                  "w-full",
                  "md:w-1/3",
                  "max-w-xs mx-auto md:max-w-none"
                )}>
                  {/* Badge Rekomendasi hanya di card pertama */}
                  {idx === 0 && (
                    <div className="absolute left-0 top-0 z-10 px-3 py-0.5 sm:px-4 sm:py-1 rounded-tl-2xl rounded-br-2xl bg-red-600 text-white text-xs font-semibold flex items-center gap-1 sm:gap-2">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="sm:w-4 sm:h-4"><path fill="currentColor" d="M12 2c.41 0 .8.25.95.64l2.36 5.7 6.2.54c.41.04.75.36.8.77.05.41-.19.8-.57.95l-4.8 2.1 1.5 6.1c.1.4-.1.82-.48 1-.38.18-.82.07-1.08-.27L12 17.27l-4.88 3.21c-.36.24-.85.15-1.1-.21a.82.82 0 01-.1-.79l1.5-6.1-4.8-2.1a.8.8 0 01-.57-.95c.05-.41.39-.73.8-.77l6.2-.54 2.36-5.7A1 1 0 0112 2z"/></svg>
                      Rekomendasi spesial
                    </div>
                  )}
                  {/* Gambar utama */}
                  <div className="h-40 sm:h-44 md:h-48 lg:h-52 w-full relative overflow-hidden">
                    <img 
                      src={villa.image} 
                      alt={villa.name} 
                      className="h-full w-full object-cover rounded-t-2xl cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={() => {
                        const cempakaBuildingImage = "https://i.imgur.com/MBymqfS.jpeg";
                        const otherCempakaImages = (villa.mainImages || [villa.image]).filter(img => img !== cempakaBuildingImage);
                        setQuickViewImages(villa.mainImages || (villa.image ? [villa.image] : []));
                        setQuickViewTitle(villa.name);
                        setQuickViewIdx(idx);
                        setQuickViewSlide(0);
                        setQuickViewOpen(true);
                      }}
                    />
                    <button
                      className="absolute top-[-10vh] right-2 bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold shadow hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        const cempakaBuildingImage = "https://i.imgur.com/MBymqfS.jpeg";
                        const otherCempakaImages = (villa.mainImages || [villa.image]).filter(img => img !== cempakaBuildingImage);
                        setQuickViewImages(villa.mainImages || (villa.image ? [villa.image] : []));
                        setQuickViewTitle(villa.name);
                        setQuickViewIdx(idx);
                        setQuickViewSlide(0);
                        setQuickViewOpen(true);
                      }}
                      type="button"
                    >
                      Lihat Galeri
                    </button>
                  </div>
                  {/* Konten */}
                  <div className="flex-1 flex flex-col p-2 sm:p-4 pt-2">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                      <span className="text-yellow-500 text-xs sm:text-base font-bold">★</span>
                      <span className="font-semibold text-xs sm:text-base text-gray-900 dark:text-white">{villa.rating.toFixed(1)}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-[10px] sm:text-sm">Luar biasa</span>
                      <span className="text-gray-500 dark:text-gray-300 text-[10px]">({villa.reviews} ulasan)</span>
                    </div>
                    <div className="font-bold text-sm sm:text-lg leading-tight mb-1 line-clamp-2 text-gray-900 dark:text-white">{villa.name}</div>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-[10px] sm:text-sm mb-2">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" className="sm:w-4 sm:h-4"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z"/></svg>
                      <span className="line-clamp-1">{villa.location}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 flex-wrap">
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1 py-0.5 sm:px-2 sm:py-1 rounded">
                        Promo Spesial Hari Ini
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-[10px] font-semibold px-1 py-0.5 sm:px-2 sm:py-1 rounded flex items-center gap-1">
                        <span className="bg-green-600 dark:bg-green-700 text-white rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center text-[9px] sm:text-xs font-bold">1</span>
                        {idx === 0 && 'Rp 38.943 digunakan'}
                        {idx === 1 && 'Rp 21.570 digunakan'}
                        {idx === 2 && 'Rp 15.200 digunakan'}
                        {idx === 3 && 'Rp 44.000 digunakan'}
                      </span>
                    </div>
                    <div className="flex items-end gap-1 sm:gap-2 mb-1">
                      <span className="line-through text-gray-400 dark:text-gray-500 text-[10px] sm:text-sm">Rp {villa.originalPrice?.toLocaleString('id-ID') ?? '-'}</span>
                      <span className="text-red-600 dark:text-red-400 text-base sm:text-xl md:text-2xl font-bold">Rp {villa.price?.toLocaleString('id-ID') ?? '-'}</span>
                    </div>
                    <div className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-300">Per malam sudah pajak dan biaya lainnya</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-8 bg-gradient-to-br from-ocean/10 via-white to-coral/10 dark:from-ocean-dark/20 dark:via-gray-900 dark:to-coral-dark/20">
          <div className="container-custom">
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 min-w-max w-full">
                <div className="flex-1 min-w-[120px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="bg-gradient-to-br from-ocean/10 to-ocean/20 dark:from-ocean-dark/20 dark:to-ocean-dark/30 p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                    <Building2 className="w-4 h-4 text-ocean dark:text-ocean-light" />
                  </div>
                  <div className="text-xl font-bold text-ocean dark:text-ocean-light mb-0.5">50+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Villa & Homestay</div>
                </div>
                <div className="flex-1 min-w-[120px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="bg-gradient-to-br from-coral/10 to-coral/20 dark:from-coral-dark/20 dark:to-coral-dark/30 p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                    <User className="w-4 h-4 text-coral dark:text-coral-light" />
                  </div>
                  <div className="text-xl font-bold text-coral dark:text-coral-light mb-0.5">500+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Pengalaman Liburan</div>
                </div>
                <div className="flex-1 min-w-[120px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/20 dark:from-purple-500/20 dark:to-purple-500/30 p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-0.5">10+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Destinasi Wisata</div>
                </div>
                <div className="flex-1 min-w-[120px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-100 dark:border-gray-700">
                  <div className="bg-gradient-to-br from-green-500/10 to-green-500/20 dark:from-green-500/20 dark:to-green-500/30 p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                    <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-0.5">24/7</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Layanan Pelanggan</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PromoSection />
        <FeaturedDestinations />

        {/* Popular Articles Section */}
        <section className="py-10 bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">Artikel Populer</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm">
                Temukan informasi terbaru dan tips menarik seputar liburan di Sawarna
              </p>
            </div>

            {/* Kategori Tab */}
            <div className="flex justify-start mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl min-w-max">
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'semua' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('semua')}
                >
                  Semua
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'penginapan' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('penginapan')}
                >
                  Penginapan
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'wisata' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('wisata')}
                >
                  Wisata
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'kuliner' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('kuliner')}
                >
                  Kuliner
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'tips' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('tips')}
                >
                  Tips & Info
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'budaya' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('budaya')}
                >
                  Budaya
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'sejarah' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('sejarah')}
                >
                  Sejarah
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'fotografi' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('fotografi')}
                >
                  Fotografi
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'petualangan' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('petualangan')}
                >
                  Petualangan
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'keluarga' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('keluarga')}
                >
                  Keluarga
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'akomodasi' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('akomodasi')}
                >
                  Akomodasi
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'transportasi' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('transportasi')}
                >
                  Transportasi
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'aktivitas' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('aktivitas')}
                >
                  Aktivitas
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === 'event' 
                      ? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow-md' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setActiveCategory('event')}
                >
                  Event
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articleData
                .filter(article => activeCategory === 'semua' || article.category.toLowerCase() === activeCategory)
                .slice(0, 3)
                .map((article) => (
                <Link 
                  key={article.id} 
                  to={`/article/${article.id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="relative aspect-[16/9] overflow-hidden">
                            <OptimizedImage
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        quality={80}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            />
                          </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar size={14} />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-ocean dark:group-hover:text-ocean-light transition-colors">
                              {article.title}
                            </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                size="lg" 
                variant="outline"
                className="border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white"
                asChild
              >
                <Link to="/articles">Lihat Semua Artikel</Link>
              </Button>
            </div>
          </div>
        </section>

        <WhyChooseUs />

        {/* Partnership Call to Action Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Bermitra dengan Kami</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Apakah Anda pemilik villa, homestay, atau penginapan di Sawarna? Bergabunglah dengan jaringan kami dan jangkau lebih banyak wisatawan!
            </p>
            <Link to="/partnership">
              <Button size="lg">
                Pelajari Lebih Lanjut tentang Kemitraan
              </Button>
            </Link>
          </div>
        </section>

        {/* About Sawarna Section */}
        <AboutSawarna />
      </div>
      {/* QuickView Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setQuickViewOpen(false)}>
          <div className="relative w-full max-w-sm md:max-w-3xl h-auto md:h-[420px] overflow-hidden rounded-2xl flex flex-col md:flex-row bg-white dark:bg-gray-900 shadow-xl" onClick={e => e.stopPropagation()}>
            {/* Tombol Tutup */}
            <button 
              className="absolute top-3 right-3 z-10 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setQuickViewOpen(false)}
              aria-label="Tutup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Bagian Gambar */}
            <div className="md:w-1/2 w-full h-48 md:h-auto relative flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              {/* Badge kategori */}
              <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Villa</span>
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full">
                  <div className="overflow-hidden w-full h-full" ref={quickViewEmblaRef}>
                    <div className="flex h-full items-center">
                      {quickViewImages.map((image, index) => (
                        <div className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center" key={index}>
                          <OptimizedImage
                            src={image}
                            alt={`${quickViewTitle} Image ${index + 1}`}
                            className="block w-full h-full object-contain"
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 800px"
                            width={800}
                            height={600}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Navigasi gambar jika lebih dari 1 */}
              {quickViewImages.length > 1 && (
                <>
                  <button
                    onClick={() => quickViewEmblaApi && quickViewEmblaApi.scrollPrev()}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full p-1.5 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Sebelumnya"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => quickViewEmblaApi && quickViewEmblaApi.scrollNext()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full p-1.5 shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Berikutnya"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                    {quickViewEmblaApi ? `${quickViewEmblaApi.selectedScrollSnap() + 1} / ${quickViewImages.length}` : ''}
                  </div>
                </>
              )}
            </div>
            {/* Bagian Detail */}
            <div className="md:w-1/2 w-full flex flex-col justify-between p-4 md:p-7">
              {(() => {
                const villa = quickViewIdx === 3 ? {
                  id: "villa-sinar-matahari-resort",
                  name: "Villa Sinar Matahari Resort",
                  image: "https://i.imgur.com/nalEe4n.jpeg",
                  rating: 4.8,
                  reviews: 189,
                  location: "Pantai Sawarna",
                  price: getLowestRoomPrice("villa-sinar-matahari-resort", 200000),
                  originalPrice: 450000,
                  discount: 56,
                  mainImages: [
                    "https://i.imgur.com/nalEe4n.jpeg",
                    "https://i.imgur.com/dJPXB3o.jpeg",
                    "https://i.imgur.com/buvZnBO.jpeg",
                    "https://i.imgur.com/HTv5TtH.jpeg",
                    "https://i.imgur.com/t2e07FS.jpeg",
                    "https://i.imgur.com/SrriRYF.jpeg",
                    "https://i.imgur.com/zXqlpvv.jpeg",
                    "https://i.imgur.com/Zenhfsh.jpeg",
                    "https://i.imgur.com/0fBZA9U.jpeg",
                    "https://i.imgur.com/nj62x2B.jpeg",
                    "https://i.imgur.com/zLTr5LZ.jpeg",
                    "https://i.imgur.com/gHYvnGu.jpeg",
                    "https://i.imgur.com/Ndo0XAD.jpeg",
                    "https://i.imgur.com/xSIQsbI.jpeg",
                    "https://i.imgur.com/jAylpLL.jpeg"
                  ],
                  facilities: ["18 Kamar Tidur Mewah", "6 Kamar Mandi Dalam", "AC di Semua Kamar", "TV LED 43 inch"],
                  capacity: 100,
                  bedrooms: 18,
                  bathrooms: 6
                } : quickViewIdx === 0 ? {
                  id: "villa-cempaka",
                  name: "Villa Cempaka",
                  image: "https://i.imgur.com/MBymqfS.jpeg",
                  rating: 4.5,
                  reviews: 80,
                  location: "Pantai Sawarna",
                  price: getLowestRoomPrice("villa-cempaka", 350000),
                  originalPrice: 400000,
                  discount: 12,
                  mainImages: [
                    "https://i.imgur.com/MBymqfS.jpeg",
                    "https://i.imgur.com/ZWM1vUu.jpeg",
                    "https://i.imgur.com/UYjw1CE.jpeg",
                    "https://i.imgur.com/R0HR9FM.jpeg",
                    "https://i.imgur.com/qKALLdC.jpeg"
                  ],
                  facilities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "View Pantai", "Pemandangan Sawah"],
                  capacity: 2,
                  bedrooms: 1,
                  bathrooms: 1
                } : quickViewIdx === 1 ? {
                  id: "villa-aki-nini",
                  name: "Villa Aki Nini",
                  image: "https://i.imgur.com/SHPK4Qf.jpeg",
                  rating: 4.6,
                  reviews: 95,
                  location: "Pantai Sawarna",
                  price: getLowestRoomPrice("villa-aki-nini", 350000),
                  originalPrice: 400000,
                  discount: 12,
                  mainImages: [
                    "https://i.imgur.com/SHPK4Qf.jpeg",
                    "https://i.imgur.com/YzOw7h5.jpeg",
                    "https://i.imgur.com/xLoaHAa.jpeg",
                    "https://i.imgur.com/DasIbsh.jpeg",
                    "https://i.imgur.com/5dKSBLs.jpeg",
                    "https://i.imgur.com/fKygTJY.jpeg",
                    "https://i.imgur.com/WZgMdyW.jpeg",
                    "https://i.imgur.com/wYR0Uzv.jpeg",
                    "https://i.imgur.com/VhVkW9P.jpeg"
                  ],
                  facilities: ["AC", "TV", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Ruang Tamu"],
                  capacity: 60,
                  bedrooms: 8,
                  bathrooms: 8
                } : quickViewIdx === 2 ? { // Data Quickview untuk Villa Sawarna Resort
                  id: "villa-sawarna-resort",
                  name: "Villa Sawarna Resort",
                  image: "https://i.imgur.com/KP2ncPi.jpeg", // Gambar Utama Sawarna Resort
                  rating: 4.7,
                  reviews: 120,
                  location: "Pantai Sawarna",
                  price: getLowestRoomPrice("villa-sawarna-resort", 450000),
                  originalPrice: 500000,
                  discount: 10,
                  mainImages: [
                    "https://i.imgur.com/KP2ncPi.jpeg",
                    "https://i.imgur.com/d22kux8.jpeg",
                    "https://i.imgur.com/BtWp6Yr.jpeg",
                    "https://i.imgur.com/YjosayP.jpeg",
                    "https://i.imgur.com/SOKaH8H.jpeg",
                    "https://i.imgur.com/7Djvl8E.jpeg"
                  ],
                  facilities: ["AC", "WiFi", "Restoran", "Tepi Pantai"],
                  capacity: 6,
                  bedrooms: 3,
                  bathrooms: 3
                } : villasData[quickViewIdx];
                if (!villa) return null;
                return (
                  <React.Fragment>
                    {/* Badge Promo Spesial */}
                    <div className="mb-2 flex justify-between items-center">
                      <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Promo Spesial Hari Ini</span>
                      {/* Harga di Quick View Mobile */}
                      <div className="text-right">
                        <div className="flex items-end gap-1 justify-end">
                          {villa.originalPrice && (
                            <span className="line-through text-gray-400 dark:text-gray-500 text-xs sm:text-sm">Rp {villa.originalPrice.toLocaleString('id-ID')}</span>
                          )}
                          <div className="text-base sm:text-lg md:text-xl font-bold text-red-600 dark:text-red-400">Rp {villa.price?.toLocaleString('id-ID') ?? '-'}</div>
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-300">per malam</div>
                      </div>
                    </div>
                    <div>
                      {/* Nama Villa */}
                      <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">{villa.name}</div>
                      {/* Rating dan Review */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500 font-bold">★</span>
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">{villa.rating?.toFixed(1) ?? '-'}</span>
                        <span className="text-gray-500 dark:text-gray-300 text-xs">{villa.reviews ?? '-'} ulasan</span>
                      </div>
                      {/* Lokasi dan Detail Kamar (Tata Ulang untuk Mobile) */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-3 text-sm sm:text-base">
                        {/* Lokasi - tetap di kiri */}
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="line-clamp-1">{villa.location ?? '-'}</span>
                        </div>
                        {/* Detail Kamar - Tampil di kanan Lokasi di Mobile */}
                        <div className="flex gap-3 sm:gap-4 flex-wrap text-gray-700 dark:text-gray-200 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-semibold">{villa.capacity ?? '-'} tamu</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-semibold">{villa.bedrooms ?? '-'} kamar</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-semibold">{villa.bathrooms ?? '-'} kamar</span>
                            </div>
                        </div>
                      </div>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      {/* Fasilitas */}
                      <div className="mb-3">
                        <div className="font-semibold text-sm mb-1">Fasilitas Utama</div>
                        <div className="flex flex-wrap gap-2">
                          {(villa.facilities && villa.facilities.length > 0 ? villa.facilities : ['-']).map((fasilitas: string, i: number) => (
                            <span key={i} className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">{fasilitas}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Tombol Aksi */}
                    <div className="flex gap-2 mt-4 text-sm font-semibold">
                      <a href={`/villas/${villa.id}`} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition-colors">Lihat Detail</a>
                      <button onClick={() => setQuickViewOpen(false)} className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-2 rounded-lg transition-colors">Tutup</button>
                    </div>
                  </React.Fragment>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
      />
    </>
  );
};

const WhyChooseUs = () => {
  const [whyChooseUsRef, whyChooseUsApi] = useEmblaCarousel({ align: 'start', loop: true });
  const scrollPrev = () => whyChooseUsApi && whyChooseUsApi.scrollPrev();
  const scrollNext = () => whyChooseUsApi && whyChooseUsApi.scrollNext();

  const features = [
    {
      icon: <Hotel className="h-10 w-10 text-ocean dark:text-ocean-light" />,
      title: "Properti Terverifikasi",
      description: "Semua listing telah kami verifikasi secara pribadi untuk memastikan kualitas dan pengalaman terbaik bagi tamu kami."
    },
    {
      icon: <MapPin className="h-10 w-10 text-ocean dark:text-ocean-light" />,
      title: "Lokasi Strategis",
      description: "Temukan akomodasi di lokasi terbaik Pantai Sawarna, mulai dari tepi pantai hingga pemandangan tebing."
    },
    {
      icon: <Umbrella className="h-10 w-10 text-ocean dark:text-ocean-light" />,
      title: "Harga Terjangkau",
      description: "Nikmati harga kompetitif dan penawaran spesial untuk liburan pantai yang hemat biaya."
    },
    {
      icon: <Wifi className="h-10 w-10 text-ocean dark:text-ocean-light" />,
      title: "Fasilitas Modern",
      description: "Sebagian besar properti dilengkapi fasilitas penting termasuk WiFi, AC, dan lainnya."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <OptimizedImage 
            src="/images/logo-villasawarna.png" 
            alt="Logo VillaSawarna" 
            className="mx-auto mb-6 transform hover:scale-105 transition-transform duration-300" 
            style={{maxWidth: '200px', height: 'auto'}}
            priority={true}
            quality={90}
            sizes="200px"
            width={200}
            height={67}
          />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Mengapa Memilih <span className="text-[#33C3F0] dark:text-[#33C3F0] font-bold">Vi</span>lla<span className="text-[#FF7B00] dark:text-[#FF7B00] font-bold">S</span>awarna
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Kami menyediakan pengalaman pemesanan yang mudah untuk membantu Anda menemukan akomodasi yang sempurna untuk liburan pantai Anda.
          </p>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden relative px-4">
          <div className="overflow-hidden" ref={whyChooseUsRef}>
            <div className="flex gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_85%] min-w-0"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="mx-auto flex justify-center items-center mb-6 bg-ocean/5 dark:bg-ocean/10 p-4 rounded-full w-20 h-20">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 z-10 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 dark:border-gray-700"
            title="Previous"
            aria-label="Previous slide"
            disabled={!whyChooseUsApi}
          >
            <ChevronLeft className="h-6 w-6 text-coral dark:text-coral-light" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 z-10 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100 dark:border-gray-700"
            title="Next"
            aria-label="Next slide"
            disabled={!whyChooseUsApi}
          >
            <ChevronRight className="h-6 w-6 text-coral dark:text-coral-light" />
          </button>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="mx-auto flex justify-center items-center mb-6 bg-ocean/5 dark:bg-ocean/10 p-4 rounded-full w-20 h-20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSawarna = () => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const sawarnaImages = [
    'https://i.imgur.com/9TxCUfm.jpeg',
    'https://i.imgur.com/D543MC0.jpeg',
    'https://i.imgur.com/iC3XmMQ.png',
    'https://i.imgur.com/NoH7f2k.jpeg',
    'https://i.imgur.com/phPdgJ8.jpeg',
  ];

  return (
    <section className="py-12 bg-ocean-light dark:bg-gray-900" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">Temukan Pantai Sawarna</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
              Terletak di pesisir selatan Provinsi Banten, Pantai Sawarna adalah salah satu permata tersembunyi Indonesia. 
              Dengan pasir putih murni, tebing kapur dramatis, dan air yang jernih, ini adalah tempat pelarian sempurna dari kehidupan kota.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
              Kawasan ini terkenal dengan kondisi surfing yang luar biasa, goa-goa alami, dan matahari terbenam yang memukau. 
              Pengunjung dapat menikmati berbagai aktivitas mulai dari selancar dan berenang hingga menjelajahi sawah dan desa tradisional.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-coral dark:text-coral-light mr-2" />
                <span className="dark:text-gray-200 text-sm">Pantai yang Indah</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-coral dark:text-coral-light mr-2" />
                <span className="dark:text-gray-200 text-sm">Surga Selancar</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-coral dark:text-coral-light mr-2" />
                <span className="dark:text-gray-200 text-sm">Goa Alami</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-coral dark:text-coral-light mr-2" />
                <span className="dark:text-gray-200 text-sm">Budaya Lokal</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div 
              className="relative rounded-lg overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <OptimizedImage 
                src={sawarnaImages[0]}
                alt="Pantai Sawarna" 
                className="w-full h-[250px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
                width={500}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-lg font-bold mb-0.5">Keindahan Alam yang Memukau</h3>
                <p className="text-xs text-white/90">Nikmati keindahan alam Sawarna yang masih asri dan terjaga</p>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white px-2 py-0.5 rounded-full text-xs font-medium">
                Lihat Galeri
              </div>
            </div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-ocean/20 dark:bg-ocean/10 rounded-full -z-10"></div>
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-ocean/10 dark:bg-ocean/5 rounded-full -z-10"></div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setIsQuickViewOpen(false)}>
          <div className="relative w-full max-w-2xl h-[60vh] overflow-hidden rounded-lg flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 z-10 bg-white/30 text-white rounded-full p-1.5 hover:bg-white/40 transition-colors"
              onClick={() => setIsQuickViewOpen(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image Carousel */}
            <div className="w-full h-full">
               <div className="overflow-hidden w-full h-full" ref={emblaRef}>
                 <div className="flex h-full items-center">
                  {sawarnaImages.map((image, index) => (
                    <div className="flex-[0_0_100%] min-w-0 h-full flex items-center justify-center" key={index}>
                        <OptimizedImage
                        src={image}
                        alt={`Sawarna Image ${index + 1}`}
                        className="block w-full h-full object-contain"
                        quality={90}
                        sizes="(max-width: 768px) 100vw, 800px"
                        width={800}
                        height={600}
                      />
                </div>
              ))}
            </div>
          </div>
            </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 text-white rounded-full p-1.5 z-10 hover:bg-white/40 transition-colors"
                  aria-label="Previous image"
                >
              <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 text-white rounded-full p-1.5 z-10 hover:bg-white/40 transition-colors"
                  aria-label="Next image"
                >
              <ChevronRight className="h-4 w-4" />
          </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-0.5 rounded-full text-xs">
              {emblaApi ? `${emblaApi.selectedScrollSnap() + 1} / ${sawarnaImages.length}` : ''}
        </div>
      </div>
        </div>
      )}
    </section>
  );
};

export default Index;

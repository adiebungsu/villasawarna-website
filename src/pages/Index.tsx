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
    "email": "info@villasawarna.com"
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' });
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const [filter, setFilter] = useState('all');
  const villasData = getVillasData();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
          <div className="max-w-3xl mx-auto">
            <SearchBar className="shadow-xl border border-gray-200/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl" />
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
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              className={cn(
                "shadow-xl border border-gray-200/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl",
                "transition-all duration-300 transform",
                isSearchVisible ? "scale-100" : "scale-95"
              )} 
            />
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
                  <img src="/images/villa mewah.png" alt="Villa Mewah Icon" className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Villa Mewah</h3>
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
        </div>

        {/* Penginapan Murah Section */}
        <section className="py-8 bg-gradient-to-br from-coral/5 via-white to-coral/5">
          <div className="container-custom">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold bg-coral/10 text-coral rounded-full shadow-sm">
                Pilihan Terbaik
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Penginapan Murah di Sawarna</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm">
                Temukan villa dan homestay dengan harga terjangkau di Sawarna tanpa mengorbankan kenyamanan dan fasilitas penting untuk liburan Anda.
              </p>
            </div>

            {/* Properties Carousel */}
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                  {villasData
                    .filter(villa => villa.price <= 1000000)
                    .map((villa) => (
                      <div key={villa.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0">
                        <PropertyCard
                          id={villa.id}
                          name={villa.name}
                          type={villa.type}
                          image={villa.mainImages?.[0] || villa.image}
                          price={villa.price}
                          rating={villa.rating}
                          location={villa.location}
                          capacity={villa.capacity}
                          reviews={villa.reviews}
                          bedrooms={villa.bedrooms}
                          bathrooms={villa.bathrooms}
                          amenities={villa.amenities}
                          description={villa.description}
                          tags={villa.tags || []}
                          mainImages={villa.mainImages || []}
                          roomTypes={villa.roomTypes || []}
                          nearbyAttractions={villa.nearbyAttractions || []}
                          ratingSummary={villa.ratingSummary}
                          propertyReviews={villa.propertyReviews || []}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous property"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Next property"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="text-center mt-6">
              <Link to="/villas">
                <Button 
                  className="bg-coral hover:bg-coral/90 text-white px-5 py-3 text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Lihat Semua Penginapan Murah
                </Button>
              </Link>
            </div>
          </div>
        </section>

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
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
        <GoFoodSawarna />
        <AboutSawarna />
      </div>
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

const GoFoodSawarna = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full shadow-sm">
                Layanan Pengantaran Makanan
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">GoFoodSawarna</h2>
              <div className="w-20 h-1 bg-purple-600 dark:bg-purple-500 mb-6 rounded-full"></div>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                Nikmati kemudahan memesan makanan lezat dari lokal yang diantarkan langsung ke lokasi Anda di area Sawarna.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <Utensils className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Pilihan Beragam</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Berbagai menu makanan lokal dan internasional</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Cepat & Tepat</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Pengantaran cepat ke lokasi anda</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <MapPinHouse className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Di Mana Saja</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Melayani semua lokasi wisata di Sawarna</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <Truck className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Tanpa Minimum</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Tidak ada pesanan minimum</p>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild className="bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <a href="https://gofood.villasawarna.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Pizza className="h-6 w-6" />
                Pesan Makanan Sekarang
              </a>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="relative mx-auto w-full h-80 md:h-96 overflow-hidden rounded-xl mb-6">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=1000" 
                  alt="Makanan Lezat" 
                  className="w-full h-full object-cover"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={800}
                  height={600}
                />
                <div className="absolute top-4 left-4 bg-purple-700 dark:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  GoFoodSawarna
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Layanan pengantaran makanan terbaik di Sawarna</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Nikmati berbagai pilihan makanan lezat dari restoran dan warung lokal favorit yang diantarkan langsung ke lokasi anda!</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-200 dark:bg-purple-900/30 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 dark:bg-purple-900/20 rounded-full -z-10"></div>
          </div>
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

import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, ChevronLeft, ChevronRight, X, ArrowUp, Info, Image, Activity, Lightbulb, Wrench, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmblaCarousel from 'embla-carousel-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import SEO from '@/components/SEO';
import { useDestination } from '@/hooks/useDestinations';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { DestinationStructuredData } from '@/types/destination';
import { Helmet } from 'react-helmet-async';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: destination, isLoading, error } = useDestination(id);

  useEffect(() => {
    if (error) {
      navigate('/destinations');
    }
  }, [error, navigate]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Tampilkan tombol ketika scroll lebih dari 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  emblaApi?.on('select', onSelect);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container-custom py-8">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-96 w-full rounded-2xl mb-8" />
                <Skeleton className="h-64 w-full rounded-2xl mb-8" />
                <Skeleton className="h-64 w-full rounded-2xl mb-8" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-96 w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!destination) {
    return null;
  }

  const images = [
    {
      original: destination.mainImage,
      thumbnail: destination.mainImage,
      description: destination.name
    },
    ...destination.images.map((image, index) => ({
      original: image,
      thumbnail: image,
      description: `${destination.name} - Foto ${index + 1}`
    }))
  ];

  const structuredData: DestinationStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      "name": destination.name,
      "description": destination.description.split('\n\n')[0],
      "image": [destination.mainImage, ...destination.images],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sawarna",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.9036",
        "longitude": "105.8456"
      },
      "openingHours": destination.openingHours || "Mo-Su 00:00-23:59",
      "priceRange": destination.price ? `Rp ${destination.price}` : "Gratis",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": destination.rating,
        "reviewCount": destination.reviews
      },
      "amenityFeature": destination.facilities?.map(facility => ({
        "@type": "LocationFeatureSpecification",
        "name": facility
      })),
      "touristType": destination.activities.map(activity => ({
        "@type": "Thing",
        "name": activity
      })),
      "publicAccess": true,
      "suitableForChildren": true
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://villasawarna.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Destinasi",
          "item": "https://villasawarna.com/destinations"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": destination.name,
          "item": `https://villasawarna.com/destinations/${destination.id}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Apa saja aktivitas yang bisa dilakukan di ${destination.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": destination.activities.join(', ')
          }
        },
        {
          "@type": "Question",
          "name": `Apa saja fasilitas yang tersedia di ${destination.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": destination.facilities?.join(', ') || 'Tidak ada informasi fasilitas'
          }
        },
        {
          "@type": "Question",
          "name": `Berapa harga tiket masuk ${destination.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": destination.price ? `Rp ${destination.price.toLocaleString('id-ID')}` : 'Gratis'
          }
        }
      ]
    }
  ] as DestinationStructuredData;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${destination.name} - Destinasi Wisata di Sawarna | Villa Sawarna`}
        description={destination.description}
        keywords={`${destination.name}, ${destination.types.join(', ')}, wisata sawarna, destinasi sawarna, ${destination.location}`}
        url={`https://villasawarna.com/destination/${destination.id}`}
        type="article"
        structuredData={structuredData}
        openGraph={{
          type: 'article',
          article: {
            section: 'destinations',
            tags: [...destination.types, 'wisata sawarna', destination.location]
          }
        }}
      />
      
      {/* Main Content */}
      <div className="flex-grow">
        {/* Adjust padding for mobile sticky nav */}
        <div className="container-custom py-8 lg:pt-8">
          {/* Hero Section */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0">
              <OptimizedImage
                src={destination.mainImage}
                alt={destination.name}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowGallery(true)}
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                quality={85}
                width={1920}
                height={1080}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-coral/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {destination.types[0] === 'beach' ? 'Pantai' :
                   destination.types[0] === 'waterfall' ? 'Air Terjun' :
                   destination.types[0] === 'cave' ? 'Gua' :
                   destination.types[0] === 'rock' ? 'Batu' : destination.types[0]}
                </span>
                <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {destination.location}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{destination.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-white">{destination.rating}</span>
                  <span className="text-white/80 text-sm ml-1">({destination.reviews} ulasan)</span>
                </div>
                {destination.price && (
                  <div className="text-white">
                    Mulai dari Rp {destination.price.toLocaleString('id-ID')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 pb-20 lg:pb-0">
              {/* Description */}
              <div id="deskripsi" className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Deskripsi</h2>
                <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                  {destination.description.split('\n\n').map((paragraph, index) => {
                    // Jika paragraf dimulai dengan angka dan titik (untuk daftar bernomor)
                    if (/^\d+\./.test(paragraph)) {
                      return (
                        <div key={index} className="mb-4">
                          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{paragraph.split('\n')[0]}</h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{paragraph.split('\n').slice(1).join('\n')}</p>
                        </div>
                      );
                    }
                    // Jika paragraf dimulai dengan bullet point
                    else if (paragraph.startsWith('•')) {
                      return (
                        <ul key={index} className="list-disc pl-6 mb-4">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                              {item.replace('•', '').trim()}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    // Jika paragraf adalah judul (semua huruf kapital)
                    else if (paragraph === paragraph.toUpperCase() && paragraph.length > 0) {
                      return <h3 key={index} className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{paragraph}</h3>;
                    }
                    // Paragraf normal
                    else {
                      return <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{paragraph}</p>;
                    }
                  })}
                </div>
              </div>

              {/* Image Gallery */}
              <div id="galeri" className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Galeri Foto</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {destination.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => {
                        setShowGallery(true);
                      }}
                    >
                      <img
                        src={image}
                        alt={`${destination.name} - Foto ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div id="aktifitas" className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Aktivitas yang Bisa Dilakukan</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 bg-sand-light/50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <span className="text-coral">•</span>
                      <span className="text-gray-700 dark:text-gray-200">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div id="tips" className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Tips Berkunjung</h2>
                <div className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-coral/10 dark:bg-coral/30 text-coral p-2 rounded-full">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-200">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div id="fasilitas" className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {destination.facilities?.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 bg-sand-light/50 dark:bg-gray-700/50 p-3 rounded-lg">
                      <span className="text-coral">•</span>
                      <span className="text-gray-700 dark:text-gray-200">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Kembali ke Halaman Destinasi */}
              <div className="mt-8 flex justify-center">
                <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <Link to="/destinations">
                    <Button className="bg-coral hover:bg-coral-dark dark:bg-coral-light dark:hover:bg-coral text-white text-base font-bold px-8 py-3 rounded-xl shadow-lg transition-colors duration-300">
                      ← Kembali ke Daftar Destinasi
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Summary - Sticky */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-[120px] bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Navigasi Cepat</h3>
                <nav className="space-y-2">
                  <a 
                    href="#deskripsi" 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral transition-colors p-2 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                    Deskripsi
                  </a>
                  <a 
                    href="#galeri" 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral transition-colors p-2 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                    Galeri
                  </a>
                  <a 
                    href="#aktifitas" 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral transition-colors p-2 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                    Aktivitas
                  </a>
                  <a 
                    href="#tips" 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral transition-colors p-2 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                    Tips
                  </a>
                  <a 
                    href="#fasilitas" 
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral transition-colors p-2 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                    Fasilitas
                  </a>
                </nav>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Informasi</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-coral" />
                      <span>{destination.location}</span>
                    </div>
                    {destination.openingHours && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-coral" />
                        <span>{destination.openingHours}</span>
                      </div>
                    )}
                    {destination.price && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="text-coral">Rp</span>
                        <span>{destination.price.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-coral">★</span>
                      <span>{destination.rating} ({destination.reviews} ulasan)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {showGallery && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowGallery(false);
            }
          }}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
            onClick={() => setShowGallery(false)}
            title="Tutup galeri"
            aria-label="Tutup galeri"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-6xl mx-4">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              showNav={true}
              showIndex={true}
              startIndex={0}
              onClose={() => setShowGallery(false)}
              additionalClass="image-gallery-custom"
            />
          </div>
        </div>
      )}

      {/* Floating Home Button for Mobile */}
      <Link 
        to="/"
        className="lg:hidden fixed bottom-24 right-4 bg-white dark:bg-gray-800 text-coral dark:text-coral-light p-2 rounded-full shadow-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50 transition-colors z-40"
        aria-label="Kembali ke Beranda"
        title="Beranda"
      >
        <Home size={20} className="text-coral dark:text-coral-light" />
      </Link>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30">
        <div className="container-custom">
          <nav className="flex justify-between py-2">
            <a 
              href="#deskripsi" 
              className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
            >
              <Info size={20} className="text-coral dark:text-coral-light" />
              <span className="text-[10px] font-medium">Deskripsi</span>
            </a>
            <a 
              href="#galeri" 
              className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
            >
              <Image size={20} className="text-coral dark:text-coral-light" />
              <span className="text-[10px] font-medium">Galeri</span>
            </a>
            <a 
              href="#aktifitas" 
              className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
            >
              <Activity size={20} className="text-coral dark:text-coral-light" />
              <span className="text-[10px] font-medium">Aktivitas</span>
            </a>
            <a 
              href="#tips" 
              className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
            >
              <Lightbulb size={20} className="text-coral dark:text-coral-light" />
              <span className="text-[10px] font-medium">Tips</span>
            </a>
            <a 
              href="#fasilitas" 
              className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-200 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-700/50"
            >
              <Wrench size={20} className="text-coral dark:text-coral-light" />
              <span className="text-[10px] font-medium">Fasilitas</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail; 
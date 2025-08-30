import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Car, Bus, Shield, Clock, MapPin, Phone, Star, Users, CheckCircle2, CreditCard, BadgeCheck, Navigation, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Transport = () => {
  const { t, i18n } = useTranslation('common');
  const isId = (i18n.language || '').toLowerCase().startsWith('id');
  const L = (idText: string, enText: string) => (isId ? idText : enText);

  // Rating helper functions
  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return 'text-green-600';
    if (rating >= 4.5) return 'text-blue-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getRatingBadge = (rating: number) => {
    if (rating >= 4.8) return { text: 'Excellent', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
    if (rating >= 4.5) return { text: 'Great', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' };
    if (rating >= 4.0) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' };
    return { text: 'Fair', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' };
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
            <div className="absolute inset-0 w-1.5 md:w-2 overflow-hidden">
              <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-3 h-3 md:w-4 md:h-4 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  const metaTitle = L('Jasa Transport Sawarna - Antar Jemput & City Tour', 'Sawarna Transportation Services - Airport Transfers & Day Tours');
  const metaDescription = L('Transport profesional ke Pantai Sawarna: antar/jemput bandara/stasiun dari Jakarta, Bogor, Bandung, Tangerang, Bekasi, Depok & Serang. Charter harian, tur destinasi, sewa mobil & bus. Armada nyaman, driver berpengalaman, harga transparan.', 'Professional transportation to Sawarna Beach: airport/station transfers from Jakarta, Bogor, Bandung, Tangerang, Bekasi, Depok & Serang. Daily charter, destination tours, car & bus rental. Comfortable fleet, experienced drivers, transparent pricing.');
  
  // SEO keywords yang lebih lengkap
  const seoKeywords = [
    'sawarna transport',
    'sawarna airport transfer',
    'car rental sawarna with driver',
    'sawarna day charter',
    'sawarna tour',
    'transport service sawarna',
    'rent a car sawarna',
    'bus rental sawarna',
    'airport pickup drop',
    'jakarta to sawarna transport',
    'bogor to sawarna transport',
    'bandung to sawarna transport',
    'tangerang to sawarna transport',
    'bekasi to sawarna transport',
    'depok to sawarna transport',
    'serang to sawarna transport',
    'hire car with driver sawarna',
    'cheap car rental sawarna',
    'soekarno hatta to sawarna transfer',
    'daily charter sawarna',
    'sawarna sightseeing tour',
    'group bus sawarna',
    'reliable sawarna transportation'
  ].join(', ');

  const packages = [
    {
      icon: <Car className="w-6 h-6" />,
      title: L('Antar/Jemput Bandara/Stasiun','Airport/Station Transfers'),
      desc: L('Jemput tepat waktu dari Soekarno–Hatta, Halim, Bogor, atau Rangkasbitung ke Sawarna.','On-time pickup from Soekarno–Hatta, Halim, Bogor, or Rangkasbitung to Sawarna.'),
      highlights: [L('Meet & greet','Meet & greet'), L('Termasuk tol & parkir (opsional)','Toll & parking included (optional)'), L('Air mineral','Mineral water')],
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: L('Charter Harian (City Tour)','Daily Charter (City Tour)'),
      desc: L('Sewa mobil + driver untuk menjelajah Goa Langir, Tanjung Layar, Legon Pari, dan spot terbaik.','Hire a car with driver to explore Goa Langir, Tanjung Layar, Legon Pari, and top spots.'),
      highlights: [L('Rute fleksibel','Flexible routes'), L('Driver lokal berpengalaman','Experienced local driver'), L('Bisa banyak pemberhentian','Multiple stops possible')],
    },
    {
      icon: <Bus className="w-6 h-6" />,
      title: L('Rombongan & Event','Groups & Events'),
      desc: L('Bus/elf untuk company trip, family gathering, atau komunitas dengan itinerary custom.','Bus/elf for company trips, family gatherings, or communities with custom itineraries.'),
      highlights: [L('Paket hemat','Budget packages'), L('Tour leader (opsional)','Tour leader (optional)'), L('Dokumentasi (opsional)','Documentation (optional)')],
    },
  ];

  const fleets = [
    { name: 'Avanza/Xenia', capacity: L('4-6 penumpang','4-6 passengers'), features: [L('AC Dingin','Cold AC'), 'Audio', L('Kursi nyaman','Comfortable seats')], price: L('Mulai Rp 750.000/hari','From Rp 750.000/day') },
    { name: 'Innova/Reborn', capacity: L('4-6 penumpang','4-6 passengers'), features: [L('AC Dingin','Cold AC'), L('Legroom luas','Spacious legroom'), L('Captain seat (opsional)','Captain seat (optional)')], price: L('Mulai Rp 1.100.000/hari','From Rp 1.100.000/day') },
    { name: 'Hiace/Elf', capacity: L('9-15 penumpang','9-15 passengers'), features: [L('AC Dingin','Cold AC'), L('Bagasi besar','Large luggage space'), L('Kursi reclining','Reclining seats')], price: L('Mulai Rp 1.700.000/hari','From Rp 1.700.000/day') },
    { name: 'Medium/Big Bus', capacity: L('25-45 penumpang','25-45 passengers'), features: [L('AC Dingin','Cold AC'), 'Mic + Audio', L('Bagasi besar','Large luggage')], price: L('Hubungi Kami','Contact Us') },
  ];

  const usp = [
    { icon: <Shield className="w-5 h-5 text-green-600" />, title: L('Legal & Terlindungi','Licensed & Insured'), desc: L('Armada terawat, driver berlisensi, opsi asuransi perjalanan.','Well-maintained fleet, licensed drivers, travel insurance options.') },
    { icon: <Clock className="w-5 h-5 text-blue-600" />, title: L('Tepat Waktu','On-Time Pickup'), desc: L('Jemput tepat waktu dengan tracking dan konfirmasi H-1.','Punctual pickup with tracking and T-1 confirmation.') },
    { icon: <Star className="w-5 h-5 text-yellow-500" />, title: L('Rating 4.8/5','Rated 4.8/5'), desc: L('Ratusan tamu puas. Layanan ramah dan aman.','Hundreds of happy guests. Friendly and safe service.') },
    { icon: <CreditCard className="w-5 h-5 text-purple-600" />, title: L('Pembayaran Fleksibel','Flexible Payments'), desc: L('Transfer bank, e-wallet, atau QRIS. Tersedia faktur.','Bank transfer, e-wallet, or QRIS. Invoice available.') },
  ];

  // Area layanan utama dengan rating dan informasi lengkap
  const serviceAreas = [
    { 
      city: 'Jakarta', 
      desc: 'Pickup from all Jakarta areas (Central, West, East, North, South).', 
      image: '/images/jakarta-sawarna.webp', 
      fallbackImage: '/images/sawarna-beach-3.jpeg',
      distanceKm: '≈ 230 km', 
      duration: '≈ 6–7 hours', 
      priceFrom: 'From Rp 1.200.000', 
      gmaps: 'https://www.google.com/maps/dir/Jakarta/Sawarna',
      rating: 4.9,
      reviewCount: 234,
      lastReview: '2 days ago',
      pickupPoints: ['CGK Airport', 'Halim', 'Gambir Station', 'Kelapa Gading Mall'],
      features: ['Door-to-door', 'Experienced driver', 'Toll included', 'Mineral water'],
      bestTime: '06:00 - 22:00',
      availability: 'Every day'
    },
    { 
      city: 'Bogor', 
      desc: 'Service from Bogor City/Regency, Sentul, and surrounding areas.', 
      image: '/images/bogor-sawarna.webp', 
      fallbackImage: '/images/sawarna-beach-3.jpeg',
      distanceKm: '≈ 180 km', 
      duration: '≈ 5–6 hours', 
      priceFrom: 'From Rp 1.100.000', 
      gmaps: 'https://www.google.com/maps/dir/Bogor/Sawarna',
      rating: 4.8,
      reviewCount: 189,
      lastReview: '1 day ago',
      pickupPoints: ['Bogor Station', 'Sentul City', 'Botani Square', 'Puncak'],
      features: ['On-time pickup', 'Local driver', 'Best routes', 'Comfortable'],
      bestTime: '06:00 - 21:00',
      availability: 'Every day'
    },
    { 
      city: 'Bandung', 
      desc: 'Pickup from Greater Bandung (City/Regency, Cimahi, Sumedang).', 
      image: '/images/bandung-sawarna.webp', 
      distanceKm: '≈ 260 km', 
      duration: '≈ 7–8 hours', 
      priceFrom: 'From Rp 1.300.000', 
      gmaps: 'https://www.google.com/maps/dir/Bandung/Sawarna',
      rating: 4.9,
      reviewCount: 167,
      lastReview: '3 days ago',
      pickupPoints: ['Bandung Station', 'Husein Airport', 'Paris Van Java Mall', 'Cimahi'],
      features: ['Premium service', 'Experienced driver', 'Well-maintained fleet', 'GPS tracking'],
      bestTime: '05:00 - 20:00',
      availability: 'Every day'
    },

    { 
      city: 'Bekasi', 
      desc: 'Bekasi City, Bekasi Regency, and Cikarang.', 
      image: '/images/bekasi-sawarna.webp', 
      distanceKm: '≈ 240 km', 
      duration: '≈ 6–7 hours', 
      priceFrom: 'From Rp 1.250.000', 
      gmaps: 'https://www.google.com/maps/dir/Bekasi/Sawarna',
      rating: 4.8,
      reviewCount: 123,
      lastReview: '2 days ago',
      pickupPoints: ['Bekasi Station', 'Bekasi Mall', 'Cikarang', 'Tambun'],
      features: ['24-hour service', 'Professional driver', 'Comfortable fleet', 'Transparent pricing'],
      bestTime: '06:00 - 23:00',
      availability: 'Every day'
    },
    { 
      city: 'Tangerang', 
      desc: 'Tangerang City/Regency & South Tangerang areas.', 
      image: '/images/tanggerang-sawarnaku.webp', 
      fallbackImage: '/images/sawarna-beach-3.jpeg',
      distanceKm: '≈ 200 km', 
      duration: '≈ 6–7 hours', 
      priceFrom: 'From Rp 1.150.000', 
      gmaps: 'https://www.google.com/maps/dir/Tangerang/Sawarna',
      rating: 4.7,
      reviewCount: 145,
      lastReview: '1 week ago',
      pickupPoints: ['CGK Airport', 'Tangerang Mall', 'Serpong', 'BSD City'],
      features: ['Fast pickup', 'Competitive price', 'Friendly driver', 'Parking included'],
      bestTime: '06:00 - 22:00',
      availability: 'Every day'
    },
    { 
      city: 'Depok', 
      desc: 'Depok City and surrounding areas (Cimanggis, Sawangan, Limo, Cinere).', 
      image: '/images/depok-sawarna.webp', 
      distanceKm: '≈ 220 km', 
      duration: '≈ 6–7 hours', 
      priceFrom: 'From Rp 1.200.000', 
      gmaps: 'https://www.google.com/maps/dir/Depok/Sawarna',
      rating: 4.7,
      reviewCount: 156,
      lastReview: '3 days ago',
      pickupPoints: ['Depok Station', 'Depok Mall', 'Cimanggis', 'Sawangan'],
      features: ['Strategic routes', 'Experienced driver', 'Competitive price', 'Flexible schedule'],
      bestTime: '06:00 - 22:00',
      availability: 'Every day'
    },
    { 
      city: 'Serang', 
      desc: 'Serang City/Regency and Cilegon.', 
      image: '/images/serang-sawarna.webp', 
      distanceKm: '≈ 150 km', 
      duration: '≈ 4–5 hours', 
      priceFrom: 'From Rp 1.000.000', 
      gmaps: 'https://www.google.com/maps/dir/Serang/Sawarna',
      rating: 4.6,
      reviewCount: 98,
      lastReview: '1 week ago',
      pickupPoints: ['Serang Station', 'Merak Port', 'Cilegon', 'Anyer'],
      features: ['Nearest distance', 'Short travel time', 'Economic price', 'Favorite route'],
      bestTime: '07:00 - 20:00',
      availability: 'Every day'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={seoKeywords}
        url="https://villasawarna.com/transport"
        type="website"
        hreflangAlternates={buildHreflangAlternates('/transport')}
        image="/images/sawarna-beach-3.jpeg"
        openGraph={{
          type: 'website',
          article: {
            publishedTime: '2024-01-01T00:00:00Z',
            modifiedTime: new Date().toISOString()
          }
        }}
      />

      {/* Preload critical images */}
      <link rel="preload" as="image" href="/images/tanggerang-sawarnaku.webp" />
      <link rel="preload" as="image" href="/images/sawarna-beach-3.jpeg" />
      
      {/* Structured Data for Transport Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Jasa Transportasi Sawarna",
            "description": metaDescription,
            "provider": {
              "@type": "Organization",
              "name": "VillaSawarna",
              "url": "https://villasawarna.com",
              "telephone": "+6283877080088"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Jakarta"
              },
              {
                "@type": "City", 
                "name": "Bogor"
              },
              {
                "@type": "City",
                "name": "Bandung"
              },
              {
                "@type": "City",
                "name": "Tangerang"
              },
              {
                "@type": "City",
                "name": "Bekasi"
              },
              {
                "@type": "City",
                "name": "Depok"
              },
              {
                "@type": "City",
                "name": "Serang"
              }
            ],
            "serviceType": "Transportation Service",
            "offers": {
              "@type": "Offer",
              "priceCurrency": "IDR",
              "priceRange": "Rp 1.000.000 - Rp 4.000.000"
            }
          })
        }}
      />

      {/* Breadcrumb Navigation */}
      <section className="py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <a href="/" className="hover:text-ocean dark:hover:text-ocean-light transition-colors">{L('Beranda','Home')}</a>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{L('Transport','Transport')}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/gasken-sawarna.webp')] bg-cover bg-center opacity-80 dark:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 container-custom py-20 md:py-28 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{L('Jasa Transportasi Sawarna','Sawarna Transportation Services')}</h1>
            <p className="text-white/90 text-lg md:text-xl mb-6">
              {L('Antar/jemput bandara/stasiun, charter harian, dan tur destinasi. Driver lokal berpengalaman, armada nyaman, harga transparan.','Airport/station transfers, daily charter, and destination tours. Local experienced drivers, comfortable fleet, transparent pricing.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/6283877080088?text=Halo%20VillaSawarna%2C%20saya%20ingin%20pesan%20transportasi%20ke%20Sawarna" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700">{L('Booking via WhatsApp','Book via WhatsApp')}</Button>
              </a>
              <a href="#packages">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">{L('Lihat Paket','View Packages')}</Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
              <div className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4" /> {L('Driver Ramah & Berpengalaman','Friendly & Experienced Drivers')}</div>
              <div className="inline-flex items-center gap-2"><Waves className="w-4 h-4" /> {L('Rute Favorit Sawarna','Favorite Sawarna Routes')}</div>
              <div className="inline-flex items-center gap-2"><Users className="w-4 h-4" /> {L('Cocok untuk Keluarga & Rombongan','Great for Families & Groups')}</div>
            </div>
          </div>
        </div>
      </section>



      {/* USP */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {usp.map((u, i) => (
              <Card key={i} className="border border-gray-100 dark:border-gray-800">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {u.icon}
                    <div className="font-semibold text-gray-900 dark:text-white">{u.title}</div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{u.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-12 bg-gradient-to-br from-ocean/5 to-coral/5 dark:from-ocean/10 dark:to-coral/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-12 items-center">
            {/* Image - Left side */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
                <img 
                  src="/images/travel-pantai-sawarna.webp" 
                  alt="Trip to Sawarna Beach - VillaSawarna Transport" 
                  className="w-full h-32 md:h-40 lg:h-72 object-contain mx-auto"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/sawarna-beach-3.jpeg';
                  }}
                />
              </div>
            </div>

            {/* Content - Right side */}
            <div className="text-center lg:text-left">
              <h2 className="text-lg md:text-xl lg:text-4xl font-bold dark:text-white mb-2 md:mb-4">
                {L('Menuju Sawarna','Getting to Sawarna')}
              </h2>
              <p className="text-xs md:text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-3 md:mb-6 leading-relaxed">
                {L('Nikmati perjalanan aman dan nyaman ke destinasi terbaik di sekitar Pantai Sawarna dengan layanan transport profesional kami.','Enjoy a safe and comfortable trip to the best attractions around Sawarna Beach with our professional transport services.')}
              </p>
              
              {/* Key Features */}
              <div className="space-y-2 md:space-y-3 mb-3 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-ocean rounded-full"></div>
                  <span className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300">{L('Driver berpengalaman & berlisensi','Experienced & licensed drivers')}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-ocean rounded-full"></div>
                  <span className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300">{L('Armada terawat & nyaman','Well-maintained & comfortable fleet')}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-ocean rounded-full"></div>
                  <span className="text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300">{L('Harga transparan & kompetitif','Transparent & competitive pricing')}</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center lg:justify-start">
                <a href="#areas">
                  <Button className="w-full sm:w-auto bg-ocean hover:bg-ocean/90">
                    {L('Lihat Area Layanan','View Service Areas')}
                  </Button>
                </a>
                <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {L('Konsultasi via WhatsApp','Consult via WhatsApp')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="areas" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">{L('Area Layanan Transport','Transportation Service Areas')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {L('Layanan transfer profesional dari berbagai kota di Jawa Barat ke Pantai Sawarna. Driver berpengalaman, armada terawat, dan harga transparan.','Professional transfer service from various cities in West Java to Sawarna Beach. Experienced drivers, well-maintained fleet, and transparent pricing.')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceAreas.map((area) => (
              <Card key={area.city} className="group border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 hover:scale-[1.02]">
                {/* Image with overlay */}
                <div className="relative w-full h-48 md:h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={`Transportation service from ${area.city} to Sawarna Beach - VillaSawarna`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.log(`Image failed to load: ${area.image}, falling back to: ${area.fallbackImage || '/images/sawarna-beach-3.jpeg'}`);
                      // Use specific fallback image for each area
                      target.src = area.fallbackImage || '/images/sawarna-beach-3.jpeg';
                    }}
                    onLoad={() => {
                      console.log(`Image loaded successfully: ${area.image}`);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getRatingBadge(area.rating).color}`}>
                      ⭐ {area.rating}
                    </span>
                  </div>
                  
                  {/* City Name Overlay */}
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">{area.city}</h3>
                  </div>
                </div>

                <CardContent className="p-5 md:p-6">
                  {/* Rating Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(area.rating)}
                      <span className={`text-sm font-semibold ${getRatingColor(area.rating)}`}>
                        {area.rating}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRatingBadge(area.rating).color}`}>
                      {getRatingBadge(area.rating).text}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span>{area.reviewCount} {L('ulasan','reviews')}</span>
                    <span>{area.lastReview}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{area.desc}</p>

                  {/* Key Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {area.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pickup Points */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-2 uppercase tracking-wide">{L('Titik Jemput:','Pickup Points:')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {area.pickupPoints.slice(0, 3).map((point, index) => (
                        <span key={index} className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
                          {point}
                        </span>
                      ))}
                      {area.pickupPoints.length > 3 && (
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded">
                          +{area.pickupPoints.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{L('Jarak','Distance')}</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{area.distanceKm}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{L('Durasi','Duration')}</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{area.duration}</div>
                    </div>
                  </div>

                  {/* Price & Availability */}
                  <div className="bg-gradient-to-r from-ocean/10 to-coral/10 dark:from-ocean/20 dark:to-coral/20 p-3 rounded-lg mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-ocean dark:text-ocean-light mb-1">{area.priceFrom}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {L('Ketersediaan','Availability')}: {area.availability} • {L('Waktu','Time')}: {area.bestTime}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <a href={`/transport/area/${area.city.toLowerCase()}`}>
                      <Button className="w-full bg-ocean hover:bg-ocean/90 text-white">
                        {L('Lihat Detail Lengkap','View Full Details')}
                      </Button>
                    </a>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={area.gmaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button variant="outline" className="w-full text-xs h-9">
                          📍 {L('Peta','Maps')}
                        </Button>
                      </a>
                      <a
                        href={`https://wa.me/6283877080088?text=${encodeURIComponent(
                          `Hello VillaSawarna, I would like to rent a vehicle from ${area.city} to Sawarna. Please share availability & estimated cost.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-xs h-9">
                          💬 {L('Chat','Chat')}
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-ocean/20">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {L('Kotamu belum ada di daftar?','Your City Not Listed?')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {L('Kami juga melayani area lain di Jawa Barat dan sekitarnya. Hubungi kami untuk konsultasi rute dan estimasi biaya yang akurat.','We also serve other areas across West Java and beyond. Contact us for route consultation and accurate cost estimates.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/6283877080088?text=Hello%20VillaSawarna%2C%20I%20want%20to%20consult%20transport%20routes%20to%20Sawarna%20from%20an%20area%20not%20listed." target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">
                    💬 {L('Konsultasi WhatsApp','WhatsApp Consultation')}
                  </Button>
                </a>
                <a href="tel:+6283877080088">
                  <Button variant="outline">
                    📞 {L('Telepon Sekarang','Call Now')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-6 md:py-10 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{L('Paket Layanan','Service Packages')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{L('Pilih paket yang sesuai kebutuhan perjalanan Anda','Choose a package that suits your travel needs')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((p, i) => (
              <Card key={i} className="shadow-sm border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ocean/10 text-ocean dark:bg-ocean/20 dark:text-ocean-light mb-2">
                    {p.icon}
                  </div>
                  <CardTitle className="text-xl dark:text-white">{p.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{p.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-200 space-y-1">
                    {p.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2">
                    <a href={`/transport/${p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                      <Button className="w-full">{L('Lihat Detail','View Details')}</Button>
                    </a>
                    <a href="https://wa.me/6283877080088?text=Hello%20VillaSawarna%2C%20I%20would%20like%20information%20about%20the%20Transport%20Package%3A%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">{L('Tanyakan Harga','Ask for Price')}</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{L('Armada Kami','Our Fleet')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{L('Pilihan kendaraan untuk perjalanan pribadi hingga rombongan besar','Vehicle options for personal trips to large groups')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fleets.map((f) => (
              <Card key={f.name} className="border border-gray-100 dark:border-gray-700">
                <CardContent className="p-5">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{f.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{f.capacity}</div>
                  <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1 mb-3">
                    {f.features.map((ft, idx) => (
                      <li key={idx} className="inline-flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> {ft}</li>
                    ))}
                  </ul>
                  <div className="text-sm font-semibold text-ocean dark:text-ocean-light">{f.price}</div>
                  <div className="mt-3">
                    <a href={`/transport/fleet/${f.name.toLowerCase().replace(/\s+\//g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}>
                      <Button variant="outline" className="w-full">View Fleet Details</Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">Transportation FAQs</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to frequently asked questions about transportation to Sawarna
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How long is the trip from Jakarta to Sawarna?</h3>
              <p className="text-gray-600 dark:text-gray-300">A typical journey takes 6-7 hours depending on traffic and pickup location in Jakarta.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Are tolls and parking included?</h3>
              <p className="text-gray-600 dark:text-gray-300">Base price excludes tolls and parking. They can be included upon request with additional cost.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Do you offer late-night pickups?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes, we provide 24-hour pickup service. Extra fee applies for late-night service (22:00-06:00).</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Is travel insurance available?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes, we offer optional travel insurance for peace of mind during your trip to Sawarna.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-ocean/10 via-white to-coral/10 dark:from-ocean/20 dark:via-gray-900 dark:to-coral/20">
        <div className="container-custom">
          <Card className="border border-ocean/20 dark:border-ocean/30">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Ready to Head to Sawarna?</div>
                <div className="text-gray-600 dark:text-gray-300">Contact us for route consultation and the best cost estimate.</div>
              </div>
              <div className="flex gap-3">
                <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer"><Button className="bg-green-600 hover:bg-green-700">Chat WhatsApp</Button></a>
                <a href="tel:+6283877080088"><Button variant="outline">Call</Button></a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Transport;



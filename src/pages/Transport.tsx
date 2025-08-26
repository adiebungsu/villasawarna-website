import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Car, Bus, Shield, Clock, MapPin, Phone, Star, Users, CheckCircle2, CreditCard, BadgeCheck, Navigation, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Transport = () => {
  const { t } = useTranslation('common');

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

  const metaTitle = 'Jasa Transportasi Sawarna - Antar Jemput & Wisata Harian';
  const metaDescription = 'Layanan transportasi profesional ke Pantai Sawarna: antar-jemput dari Jakarta, Bogor, Bandung, Tangerang, Bekasi, Depok & Serang. Charter harian, tour destinasi, sewa mobil & bus. Armada nyaman, sopir berpengalaman, harga transparan.';
  
  // SEO keywords yang lebih lengkap
  const seoKeywords = [
    'transportasi sawarna',
    'antar jemput sawarna', 
    'sewa mobil sawarna',
    'charter sawarna',
    'tour sawarna',
    'jasa transport sawarna',
    'rental mobil sawarna',
    'sewa bus sawarna',
    'antar jemput bandara',
    'transport jakarta sawarna',
    'transport bogor sawarna',
    'transport bandung sawarna',
    'transport tangerang sawarna',
    'transport bekasi sawarna',
    'transport depok sawarna',
    'transport serang sawarna',
    'sewa mobil dengan sopir sawarna',
    'rental mobil sawarna murah',
    'antar jemput bandara soekarno hatta sawarna',
    'charter harian sawarna',
    'tour wisata sawarna',
    'sewa bus sawarna rombongan',
    'transportasi sawarna terpercaya'
  ].join(', ');

  const packages = [
    {
      icon: <Car className="w-6 h-6" />,
      title: 'Antar-Jemput Bandara/Stasiun',
      desc: 'Penjemputan tepat waktu dari Soekarno-Hatta, Halim, Bogor, atau Rangkasbitung menuju Sawarna.',
      highlights: ['Meet & greet', 'Termasuk tol & parkir (opsional)', 'Air mineral'],
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: 'Charter Harian (City Tour)',
      desc: 'Sewa mobil dengan sopir untuk jelajah Goa Langir, Tanjung Layar, Legon Pari, dan spot terbaik.',
      highlights: ['Rute fleksibel', 'Sopir lokal berpengalaman', 'Bisa multiple stop'],
    },
    {
      icon: <Bus className="w-6 h-6" />,
      title: 'Group & Rombongan',
      desc: 'Bus/elf untuk rombongan kantor, keluarga besar, atau komunitas dengan itinerary kustom.',
      highlights: ['Paket hemat', 'Tour leader (opsional)', 'Dokumentasi (opsional)'],
    },
  ];

  const fleets = [
    { name: 'Avanza/Xenia', capacity: '4-6 penumpang', features: ['AC Dingin', 'Audio', 'Kursi Nyaman'], price: 'Mulai Rp 750.000/hari' },
    { name: 'Innova/Reborn', capacity: '4-6 penumpang', features: ['AC Dingin', 'Legroom Luas', 'Captain Seat (opsional)'], price: 'Mulai Rp 1.100.000/hari' },
    { name: 'Hiace/Elf', capacity: '9-15 penumpang', features: ['AC Dingin', 'Bagasi Luas', 'Reclining Seat'], price: 'Mulai Rp 1.700.000/hari' },
    { name: 'Medium/Big Bus', capacity: '25-45 penumpang', features: ['AC Dingin', 'Mic + Audio', 'Bagasi Besar'], price: 'Hubungi Kami' },
  ];

  const usp = [
    { icon: <Shield className="w-5 h-5 text-green-600" />, title: 'Legal & Asuransi', desc: 'Armada terawat, supir berlisensi, dan opsi asuransi perjalanan.' },
    { icon: <Clock className="w-5 h-5 text-blue-600" />, title: 'Tepat Waktu', desc: 'Penjemputan on-time dengan tracking dan konfirmasi H-1.' },
    { icon: <Star className="w-5 h-5 text-yellow-500" />, title: 'Rating 4.8/5', desc: 'Ratusan tamu puas. Komitmen pada pelayanan ramah & aman.' },
    { icon: <CreditCard className="w-5 h-5 text-purple-600" />, title: 'Pembayaran Fleksibel', desc: 'Transfer bank, e-wallet, atau QRIS. Invoice tersedia.' },
  ];

  // Area layanan utama dengan rating dan informasi lengkap
  const serviceAreas = [
    { 
      city: 'Jakarta', 
      desc: 'Penjemputan dari seluruh Jakarta (Pusat, Barat, Timur, Utara, Selatan).', 
      image: '/images/jakarta-sawarna.webp', 
      distanceKm: '≈ 230 km', 
      duration: '≈ 6–7 jam', 
      priceFrom: 'Mulai Rp 1.200.000', 
      gmaps: 'https://www.google.com/maps/dir/Jakarta/Sawarna',
      rating: 4.9,
      reviewCount: 234,
      lastReview: '2 hari lalu',
      pickupPoints: ['Bandara CGK', 'Halim', 'Stasiun Gambir', 'Mall Kelapa Gading'],
      features: ['Door-to-door', 'Driver berpengalaman', 'Termasuk tol', 'Air mineral'],
      bestTime: '06:00 - 22:00',
      availability: 'Setiap hari'
    },
    { 
      city: 'Bogor', 
      desc: 'Layanan dari Kota/Kabupaten Bogor, Sentul, dan sekitarnya.', 
      image: '/images/bogor-sawarna.webp', 
      distanceKm: '≈ 180 km', 
      duration: '≈ 5–6 jam', 
      priceFrom: 'Mulai Rp 1.100.000', 
      gmaps: 'https://www.google.com/maps/dir/Bogor/Sawarna',
      rating: 4.8,
      reviewCount: 189,
      lastReview: '1 hari lalu',
      pickupPoints: ['Stasiun Bogor', 'Sentul City', 'Botani Square', 'Puncak'],
      features: ['Penjemputan tepat waktu', 'Sopir lokal', 'Rute terbaik', 'Nyaman'],
      bestTime: '06:00 - 21:00',
      availability: 'Setiap hari'
    },
    { 
      city: 'Bandung', 
      desc: 'Antar-jemput dari Bandung Raya (Kota/Kabupaten, Cimahi, Sumedang).', 
      image: '/images/bandung-sawarna.webp', 
      distanceKm: '≈ 260 km', 
      duration: '≈ 7–8 jam', 
      priceFrom: 'Mulai Rp 1.300.000', 
      gmaps: 'https://www.google.com/maps/dir/Bandung/Sawarna',
      rating: 4.9,
      reviewCount: 167,
      lastReview: '3 hari lalu',
      pickupPoints: ['Stasiun Bandung', 'Bandara Husein', 'Mall Paris Van Java', 'Cimahi'],
      features: ['Layanan premium', 'Sopir berpengalaman', 'Armada terawat', 'GPS tracking'],
      bestTime: '05:00 - 20:00',
      availability: 'Setiap hari'
    },

    { 
      city: 'Bekasi', 
      desc: 'Bekasi Kota, Kabupaten Bekasi, dan Cikarang.', 
      image: '/images/bekasi-sawarna.webp', 
      distanceKm: '≈ 240 km', 
      duration: '≈ 6–7 jam', 
      priceFrom: 'Mulai Rp 1.250.000', 
      gmaps: 'https://www.google.com/maps/dir/Bekasi/Sawarna',
      rating: 4.8,
      reviewCount: 123,
      lastReview: '2 hari lalu',
      pickupPoints: ['Stasiun Bekasi', 'Mall Bekasi', 'Cikarang', 'Tambun'],
      features: ['Layanan 24 jam', 'Sopir profesional', 'Armada nyaman', 'Harga transparan'],
      bestTime: '06:00 - 23:00',
      availability: 'Setiap hari'
    },
    { 
      city: 'Tangerang', 
      desc: 'Area Kota/Kabupaten Tangerang & Tangerang Selatan.', 
      image: '/images/tanggerang-sawarnaku.webp', 
      distanceKm: '≈ 200 km', 
      duration: '≈ 6–7 jam', 
      priceFrom: 'Mulai Rp 1.150.000', 
      gmaps: 'https://www.google.com/maps/dir/Tangerang/Sawarna',
      rating: 4.7,
      reviewCount: 145,
      lastReview: '1 minggu lalu',
      pickupPoints: ['Bandara CGK', 'Mall Tangerang', 'Serpong', 'BSD City'],
      features: ['Penjemputan cepat', 'Harga kompetitif', 'Driver ramah', 'Termasuk parkir'],
      bestTime: '06:00 - 22:00',
      availability: 'Setiap hari'
    },
    { 
      city: 'Depok', 
      desc: 'Kota Depok dan sekitarnya (Cimanggis, Sawangan, Limo, Cinere).', 
      image: '/images/depok-sawarna.webp', 
      distanceKm: '≈ 220 km', 
      duration: '≈ 6–7 jam', 
      priceFrom: 'Mulai Rp 1.200.000', 
      gmaps: 'https://www.google.com/maps/dir/Depok/Sawarna',
      rating: 4.7,
      reviewCount: 156,
      lastReview: '3 hari lalu',
      pickupPoints: ['Stasiun Depok', 'Mall Depok', 'Cimanggis', 'Sawangan'],
      features: ['Rute strategis', 'Driver berpengalaman', 'Harga kompetitif', 'Fleksibel jadwal'],
      bestTime: '06:00 - 22:00',
      availability: 'Setiap hari'
    },
    { 
      city: 'Serang', 
      desc: 'Kota/Kabupaten Serang dan Cilegon.', 
      image: '/images/serang-sawarna.webp', 
      distanceKm: '≈ 150 km', 
      duration: '≈ 4–5 jam', 
      priceFrom: 'Mulai Rp 1.000.000', 
      gmaps: 'https://www.google.com/maps/dir/Serang/Sawarna',
      rating: 4.6,
      reviewCount: 98,
      lastReview: '1 minggu lalu',
      pickupPoints: ['Stasiun Serang', 'Pelabuhan Merak', 'Cilegon', 'Anyer'],
      features: ['Jarak terdekat', 'Waktu singkat', 'Harga ekonomis', 'Rute favorit'],
      bestTime: '07:00 - 20:00',
      availability: 'Setiap hari'
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
        imageAlt="Layanan transportasi ke Pantai Sawarna - VillaSawarna"
        author="VillaSawarna"
        publishedTime="2024-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
      />

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
            <a href="/" className="hover:text-ocean dark:hover:text-ocean-light transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">Transportasi</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/sawarna-beach-3.jpeg')] bg-cover bg-center opacity-80 dark:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 container-custom py-20 md:py-28 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">Jasa Transportasi Sawarna</h1>
            <p className="text-white/90 text-lg md:text-xl mb-6">
              Antar-jemput, charter harian, dan paket tour destinasi. Sopir lokal berpengalaman, armada nyaman, harga transparan.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/6283877080088?text=Halo%20VillaSawarna%2C%20saya%20ingin%20pesan%20transportasi%20ke%20Sawarna" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700">Pesan via WhatsApp</Button>
              </a>
              <a href="#packages">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">Lihat Paket</Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
              <div className="inline-flex items-center gap-2"><BadgeCheck className="w-4 h-4" /> Driver Ramah & Berpengalaman</div>
              <div className="inline-flex items-center gap-2"><Waves className="w-4 h-4" /> Rute Favorit Wisata Sawarna</div>
              <div className="inline-flex items-center gap-2"><Users className="w-4 h-4" /> Cocok Keluarga & Rombongan</div>
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

      {/* Service Areas */}
      <section id="areas" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">Area Layanan Transportasi</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Layanan antar-jemput profesional dari berbagai kota di Jawa Barat menuju Pantai Sawarna. 
              Sopir berpengalaman, armada terawat, dan harga transparan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {serviceAreas.map((area) => (
              <Card key={area.city} className="group border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 hover:scale-[1.02]">
                {/* Image with overlay */}
                <div className="relative w-full h-48 md:h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={`Layanan transportasi dari ${area.city} ke Pantai Sawarna - VillaSawarna`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/sawarna-beach-3.jpeg'; // Fallback image
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
                    <span>{area.reviewCount} review</span>
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
                    <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-2 uppercase tracking-wide">Titik Penjemputan:</h4>
                    <div className="flex flex-wrap gap-1">
                      {area.pickupPoints.slice(0, 3).map((point, index) => (
                        <span key={index} className="inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
                          {point}
                        </span>
                      ))}
                      {area.pickupPoints.length > 3 && (
                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded">
                          +{area.pickupPoints.length - 3} lagi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Jarak</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{area.distanceKm}</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Durasi</div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">{area.duration}</div>
                    </div>
                  </div>

                  {/* Price & Availability */}
                  <div className="bg-gradient-to-r from-ocean/10 to-coral/10 dark:from-ocean/20 dark:to-coral/20 p-3 rounded-lg mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-ocean dark:text-ocean-light mb-1">{area.priceFrom}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Tersedia: {area.availability} • Waktu: {area.bestTime}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <a href={`/transport/area/${area.city.toLowerCase()}`}>
                      <Button className="w-full bg-ocean hover:bg-ocean/90 text-white">
                        Lihat Detail Lengkap
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
                          📍 Maps
                        </Button>
                      </a>
                      <a
                        href={`https://wa.me/6283877080088?text=${encodeURIComponent(
                          `Halo VillaSawarna, saya ingin sewa kendaraan dari ${area.city} ke Sawarna. Mohon info ketersediaan & estimasi biaya.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-xs h-9">
                          💬 Pesan
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
                Tidak Ada Kota Anda di Daftar?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Kami melayani area lain di Jawa Barat dan sekitarnya. Hubungi kami untuk konsultasi rute dan estimasi biaya yang tepat.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/6283877080088?text=Halo%20VillaSawarna%2C%20saya%20ingin%20konsultasi%20rute%20transportasi%20ke%20Sawarna%20dari%20area%20yang%20belum%20ada%20di%20daftar." target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">
                    💬 Konsultasi WhatsApp
                  </Button>
                </a>
                <a href="tel:+6283877080088">
                  <Button variant="outline">
                    📞 Telepon Langsung
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
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Paket Layanan</h2>
            <p className="text-gray-600 dark:text-gray-300">Pilih paket sesuai kebutuhan perjalanan Anda</p>
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
                      <Button className="w-full">Lihat Detail</Button>
                    </a>
                    <a href="https://wa.me/6283877080088?text=Halo%20VillaSawarna%2C%20saya%20ingin%20informasi%20Paket%20Transport%3A%20${encodeURIComponent(p.title)}" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">Tanya Harga</Button>
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
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Armada Kami</h2>
            <p className="text-gray-600 dark:text-gray-300">Pilihan kendaraan untuk kebutuhan personal hingga rombongan</p>
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
                      <Button variant="outline" className="w-full">Lihat Detail Armada</Button>
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
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">Pertanyaan Umum Transportasi</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan transportasi ke Sawarna
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Berapa lama perjalanan dari Jakarta ke Sawarna?</h3>
              <p className="text-gray-600 dark:text-gray-300">Perjalanan normal memakan waktu 6-7 jam tergantung kondisi lalu lintas dan lokasi penjemputan di Jakarta.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Apakah harga sudah termasuk tol dan parkir?</h3>
              <p className="text-gray-600 dark:text-gray-300">Harga dasar belum termasuk tol dan parkir. Namun bisa ditambahkan sesuai permintaan dengan biaya tambahan.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Bisakah penjemputan di malam hari?</h3>
              <p className="text-gray-600 dark:text-gray-300">Ya, kami melayani penjemputan 24 jam. Namun ada biaya tambahan untuk layanan malam hari (22:00-06:00).</p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Apakah ada asuransi perjalanan?</h3>
              <p className="text-gray-600 dark:text-gray-300">Ya, kami menyediakan opsi asuransi perjalanan untuk memberikan ketenangan pikiran selama perjalanan ke Sawarna.</p>
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
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Siap Berangkat ke Sawarna?</div>
                <div className="text-gray-600 dark:text-gray-300">Hubungi kami untuk konsultasi rute dan estimasi biaya terbaik.</div>
              </div>
              <div className="flex gap-3">
                <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer"><Button className="bg-green-600 hover:bg-green-700">Chat WhatsApp</Button></a>
                <a href="tel:+6283877080088"><Button variant="outline">Telepon</Button></a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Transport;



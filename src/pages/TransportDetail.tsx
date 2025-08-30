import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Bus, Shield, Clock, MapPin, Phone, Star, Users, CheckCircle2, CreditCard, BadgeCheck, Navigation, Waves, Calendar, User, Mail, ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

const TransportDetail = () => {
  const { t, i18n } = useTranslation('common');
  const isId = (i18n.language || '').toLowerCase().startsWith('id');
  const loc = (idText: string, enText: string) => (isId ? idText : enText);
  const tr = loc;
  const { type } = useParams<{ type: string }>();

  // Transport services data by type (localized)
  const transportServices = {
    'antar-jemput': {
      title: loc('Antar/Jemput Bandara/Stasiun', 'Airport/Station Transfers'),
      description: loc('Jemput tepat waktu dari Soekarno–Hatta, Halim, Bogor, atau Rangkasbitung ke Sawarna.', 'On-time pickup from Soekarno–Hatta, Halim, Bogor, or Rangkasbitung to Sawarna.'),
      icon: <Car className="w-8 h-8" />,
      features: [
        loc('Meet & greet di bandara/stasiun', 'Meet & greet at airport/station'),
        loc('Tol & parkir termasuk (opsional)', 'Toll & parking included (optional)'),
        loc('Air mineral gratis', 'Free mineral water'),
        loc('Driver berpengalaman', 'Experienced driver'),
        loc('Armada nyaman & terawat', 'Well-maintained & comfortable fleet')
      ],
      pricing: {
        'Jakarta': 'Rp 1.200.000',
        'Bogor': 'Rp 1.100.000',
        'Bandung': 'Rp 1.300.000',
        'Tangerang': 'Rp 1.150.000',
        'Bekasi': 'Rp 1.250.000',
        'Serang': 'Rp 1.000.000'
      }
    },
    'charter-harian': {
      title: loc('Charter Harian (City Tour)', 'Daily Charter (City Tour)'),
      description: loc('Sewa mobil + driver untuk jelajah Goa Langir, Tanjung Layar, Legon Pari, dan spot terbaik di Sawarna.', 'Hire a car with driver to explore Goa Langir, Tanjung Layar, Legon Pari, and top Sawarna spots.'),
      icon: <Navigation className="w-8 h-8" />,
      features: [
        loc('Rute fleksibel', 'Flexible routes'),
        loc('Driver lokal berpengalaman', 'Experienced local driver'),
        loc('Bisa banyak pemberhentian', 'Multiple stops possible'),
        loc('Termasuk bensin & driver', 'Fuel & driver included'),
        loc('Dokumentasi foto (opsional)', 'Photo documentation (optional)')
      ],
      pricing: {
        'Avanza/Xenia': 'Rp 750.000/day',
        'Innova/Reborn': 'Rp 1.100.000/day',
        'Hiace/Elf': 'Rp 1.700.000/day'
      }
    },
    'group-rombongan': {
      title: loc('Rombongan & Event', 'Groups & Events'),
      description: loc('Bus/elf untuk company trip, family gathering, atau komunitas dengan itinerary custom.', 'Bus/elf for company trips, family gatherings, or communities with custom itineraries.'),
      icon: <Bus className="w-8 h-8" />,
      features: [
        loc('Hemat untuk rombongan', 'Budget-friendly for groups'),
        loc('Tour leader (opsional)', 'Tour leader (optional)'),
        loc('Dokumentasi (opsional)', 'Documentation (optional)'),
        loc('Itinerary custom', 'Custom itinerary'),
        loc('Konsumsi/catering (opsional)', 'Catering (optional)')
      ],
      pricing: {
        'Hiace (up to 15 pax)': 'Rp 1.700.000/day',
        'Medium Bus (up to 25 pax)': 'Contact Us',
        'Big Bus (up to 45 pax)': 'Contact Us'
      }
    },
    'sewa-bus': {
      title: loc('Sewa Bus', 'Bus Rental'),
      description: loc('Sewa bus untuk rombongan besar, event perusahaan, dan perjalanan grup.', 'Bus rental for large groups, company events, and group trips.'),
      icon: <Bus className="w-8 h-8" />,
      features: [
        loc('Pilihan ukuran bus (Medium, Big, SHD)', 'Various bus sizes (Medium, Big, SHD)'),
        loc('Elf Short & Long untuk grup kecil', 'Elf Short & Long for small groups'),
        loc('Hiace Commuter & Premio', 'Hiace Commuter & Premio'),
        loc('Driver berpengalaman', 'Experienced drivers'),
        loc('AC dingin & fasilitas lengkap', 'Cold AC & complete amenities')
      ],
      pricing: {
        'Elf Short (12-15 pax)': 'Rp 1.700.000/day',
        'Elf Long (15-18 pax)': 'Rp 2.000.000/day',
        'Hiace Commuter (9-12 pax)': 'Rp 1.500.000/day',
        'Hiace Premio (9-12 pax)': 'Rp 1.800.000/day',
        'SHD Bus (20-25 pax)': 'Contact Us',
        'Medium Bus (25-30 pax)': 'Contact Us',
        'Big Bus (35-45 pax)': 'Contact Us'
      }
    },
    'sewa-mobil': {
      title: loc('Sewa Mobil', 'Car Rental'),
      description: loc('Sewa mobil untuk keluarga, perjalanan pribadi, dan kebutuhan transportasi lainnya.', 'Car rental for families, personal trips, and any personal transport needs.'),
      icon: <Car className="w-8 h-8" />,
      features: [
        loc('Beragam tipe mobil (MPV, SUV, City Car)', 'Various car types (MPV, SUV, City Car)'),
        loc('Driver profesional & berpengalaman', 'Professional & experienced drivers'),
        loc('AC dingin & fasilitas lengkap', 'Cold AC & full amenities'),
        loc('BBM penuh & perawatan rutin', 'Full fuel & regular maintenance'),
        loc('Asuransi perjalanan', 'Travel insurance')
      ],
      pricing: {
        'Honda Brio (4-5 pax)': 'Rp 600.000/day',
        'Honda Jazz (4-5 pax)': 'Rp 700.000/day',
        'Honda Mobilio (5-7 pax)': 'Rp 800.000/day',
        'Avanza (4-6 pax)': 'Rp 750.000/day',
        'Grand New Innova (4-6 pax)': 'Rp 1.100.000/day',
        'Grand Fortuner (4-6 pax)': 'Rp 1.500.000/day'
      }
    },
    'sewa-motor': {
      title: loc('Sewa Motor', 'Motorbike Rental'),
      description: loc('Sewa motor untuk eksplorasi Sawarna yang fleksibel dan ekonomis.', 'Motorbike rental for flexible and economical exploration around Sawarna.'),
      icon: <Navigation className="w-8 h-8" />,
      features: [
        loc('Beragam tipe (Skuter, Trail, Bebek)', 'Various types (Scooter, Trail, Cub)'),
        loc('BBM penuh & helm standar', 'Full fuel & standard helmet'),
        loc('Parkir & manuver mudah', 'Easy parking & maneuvering'),
        loc('Cocok untuk eksplorasi', 'Great for exploration'),
        loc('Harga terjangkau', 'Affordable price')
      ],
      pricing: {
        'Honda Supra X (1-2 pax)': 'Rp 150.000/day',
        'Honda Vario CBS (1-2 pax)': 'Rp 180.000/day',
        'Honda Scoopy (1-2 pax)': 'Rp 200.000/day',
        'Yamaha Nmax (1-2 pax)': 'Rp 250.000/day',
        'Kawasaki KLX (1-2 pax)': 'Rp 300.000/day'
      }
    }
  };

  const currentService = transportServices[type as keyof typeof transportServices];

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{L('Layanan Tidak Ditemukan','Service Not Found')}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{L('Layanan transport yang Anda cari tidak tersedia.','The transport service you are looking for is not available.')}</p>
          <Link to="/transport">
            <Button>{L('Kembali ke Halaman Transport','Back to Transport Page')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const metaTitle = `${currentService.title} - VillaSawarna`;
  const metaDescription = `${currentService.description} ${loc('Layanan transportasi profesional ke Sawarna dengan harga terjangkau.','Professional transportation service to Sawarna at affordable prices.')}`;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={`${currentService.title.toLowerCase()}, transportasi sawarna, sewa mobil sawarna, charter sawarna`}
        url={`https://villasawarna.com/transport/${type}`}
        type="website"
        hreflangAlternates={buildHreflangAlternates(`/transport/${type}`)}
      />

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link to="/" className="flex items-center hover:text-ocean dark:hover:text-ocean-light">
              <Home className="w-4 h-4 mr-1" />
              {L('Beranda','Home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/transport" className="hover:text-ocean dark:hover:text-ocean-light">
              {L('Transport','Transport')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">{currentService.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/sawarna-beach-3.jpeg')] bg-cover bg-center opacity-80 dark:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 container-custom py-20 md:py-28 text-white">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-ocean/20 text-ocean-light">
                {currentService.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{currentService.title}</h1>
                <p className="text-white/90 text-lg md:text-xl mt-2">{currentService.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/6283877080088?text=Hello%20VillaSawarna%2C%20I%20would%20like%20to%20book%20this%20transport%20service" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700">{L('Booking via WhatsApp','Book via WhatsApp')}</Button>
              </a>
              <a href="#booking">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">{L('Form Pemesanan','Booking Form')}</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary/Routes Section - Only for Charter Harian */}
      {type === 'charter-harian' && (
        <section className="py-12 bg-gradient-to-br from-ocean/5 to-coral/5 dark:from-ocean/10 dark:to-coral/10">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{L('Rute Wisata Populer','Popular Sightseeing Routes')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{L('Destinasi terbaik di sekitar Sawarna yang bisa dikunjungi','Top destinations around Sawarna you can visit')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: loc('Pantai Sawarna','Sawarna Beach'),
                  desc: loc('Pantai utama dengan ombak cocok untuk surfing','Main beach with waves suitable for surfing'),
                  duration: loc('2-3 jam','2-3 hours'),
                  image: '/images/sawarna-beach-3.jpeg'
                },
                {
                  name: 'Tanjung Layar',
                  desc: loc('Spot foto instagramable dengan pemandangan laut menakjubkan','Instagrammable photo spot with stunning sea views'),
                  duration: loc('1-2 jam','1-2 hours'),
                  image: '/images/sawarna-beach-4.jpeg'
                },
                {
                  name: 'Goa Langir',
                  desc: loc('Goa alami unik dengan stalaktit dan stalagmit','Unique natural cave with stalactites and stalagmites'),
                  duration: loc('1-2 jam','1-2 hours'),
                  image: '/images/karang-taraje-sawarna.webp'
                },
                {
                  name: 'Legon Pari',
                  desc: loc('Pantai tersembunyi berpasir putih dan air jernih','Hidden beach with clear water and white sand'),
                  duration: loc('2-3 jam','2-3 hours'),
                  image: '/images/penginapan-sawarna.webp'
                },
                {
                  name: 'Karang Taraje',
                  desc: loc('Fenomena ombak bertingkat seperti air terjun di karang','Snorkeling spot with beautiful coral reefs'),
                  duration: loc('2-3 jam','2-3 hours'),
                  image: '/images/hero-sawarna.jpg'
                },
                {
                  name: 'Bukit Cinta',
                  desc: loc('Spot sunset terbaik dengan pemandangan 360°','Best sunset spot with 360° views'),
                  duration: loc('1-2 jam','1-2 hours'),
                  image: '/images/sawarna-beach-2.jpeg'
                }
              ].map((spot, index) => (
                <Card key={index} className="border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden">
                  <div className="w-full h-40 bg-gray-200 dark:bg-gray-800">
                    <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{spot.name}</h3>
                      <span className="text-xs bg-ocean/10 text-ocean dark:bg-ocean/20 dark:text-ocean-light px-2 py-1 rounded">
                        {spot.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{spot.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>{L('Fleksibel!','Flexible!')}</strong> {L('Rute bisa disesuaikan dengan preferensi Anda. Konsultasikan dengan driver kami untuk itinerary terbaik.','Routes can be adjusted to your preferences. Consult with our driver for the best itinerary.')}
              </p>
              <a href="https://wa.me/6283877080088?text=Hello%20VillaSawarna%2C%20I%20would%20like%20to%20consult%20Sawarna%20sightseeing%20routes" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">{L('Konsultasi Rute','Consult Routes')}</Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials & FAQ */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">{L('Testimoni Pelanggan','Customer Testimonials')}</CardTitle>
                <CardDescription>{L('Pengalaman tamu menggunakan layanan ini','Guest experiences using this service')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-800 dark:text-gray-200">{L('"Driver ramah, tepat waktu, dan mobil bersih. Perjalanan Jakarta–Sawarna lancar."','"Friendly driver, on time, and clean car. Smooth trip from Jakarta to Sawarna."')}</p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">— {L('Rina, Jakarta','Rina, Jakarta')}</div>
                </blockquote>
                <blockquote className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-800 dark:text-gray-200">{L('"Harga sesuai, armada nyaman. Rekomendasi untuk rombongan."','"Fair pricing, comfortable fleet. Highly recommended for groups."')}</p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">— {L('Dimas, Bogor','Dimas, Bogor')}</div>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">FAQ</CardTitle>
                <CardDescription>{L('Pertanyaan yang sering diajukan','Frequently asked questions')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{L('Apakah tol dan parkir termasuk?','Are tolls and parking included?')}</div>
                  <div className="text-gray-700 dark:text-gray-300">{L('Opsional. Bisa termasuk sesuai permintaan.','Optional. Can be included upon request.')}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{L('Bisakah minta itinerary khusus?','Can I request a custom itinerary?')}</div>
                  <div className="text-gray-700 dark:text-gray-300">{L('Bisa. Kami fleksibel dengan kebutuhan Anda.','Yes. We are flexible to your needs.')}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{L('Metode pembayaran apa saja?','What payment methods are available?')}</div>
                  <div className="text-gray-700 dark:text-gray-300">{L('Transfer bank, e-wallet, dan QRIS.','Bank transfer, e-wallet, and QRIS.')}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Driver & Fleet Info */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{L('Driver & Armada Kami','Our Drivers & Fleet')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{L('Tim profesional siap melayani perjalanan Anda','A professional team ready to serve your journey')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-ocean" />
                  {L('Driver Profesional','Professional Drivers')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-green-600" />
                    <span>{L('Pengalaman 5+ tahun','5+ years experience')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>{L('Bersertifikat resmi','Officially licensed')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{L('Rating 4.8/5','4.8/5 Rating')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{L('Lokal Sawarna','Local to Sawarna')}</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>{L('Kelebihan:','Strengths:')}</strong> {L('Driver ramah, sabar, dan sangat paham rute Sawarna.','Our drivers are friendly, patient, and know Sawarna’s routes very well.')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-ocean" />
                  {L('Armada Terawat','Well-Maintained Fleet')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{L('AC Dingin','Cold AC')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{L('Audio System','Audio System')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{L('Kursi Nyaman','Comfortable Seats')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{L('Bagasi Luas','Large Luggage Space')}</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>{L('Perawatan:','Maintenance:')}</strong> {L('Armada dirawat rutin demi kenyamanan dan keamanan.','Our fleet is regularly serviced for comfort and safety.')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features & Pricing */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">{L('Fitur Layanan','Service Features')}</CardTitle>
                <CardDescription>{L('Keunggulan layanan transport kami','What makes our transport service great')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentService.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">{L('Harga Layanan','Service Pricing')}</CardTitle>
                <CardDescription>{L('Perkiraan biaya sesuai kebutuhan Anda','Estimated costs based on your needs')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(currentService.pricing).map(([key, price]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{key}</span>
                      <span className="font-semibold text-ocean dark:text-ocean-light">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>{L('Catatan:','Note:')}</strong> {L('Harga dapat berubah tergantung jarak, durasi, dan kebutuhan khusus. Hubungi kami untuk estimasi lebih akurat.','Prices may vary based on distance, duration, and special requirements. Contact us for a more accurate estimate.')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section className="py-6">
        <div className="container-custom">
          <Card className="border border-gray-100 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl dark:text-white">{L('Kalkulator Harga','Price Calculator')}</CardTitle>
              <CardDescription>{L('Estimasi cepat untuk layanan ini','Quick estimate for this service')}</CardDescription>
            </CardHeader>
            <CardContent>
              <PriceCalculator pricing={currentService.pricing} serviceType={type as string} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{L('Form Pemesanan','Booking Form')}</h2>
              <p className="text-gray-600 dark:text-gray-300">{L('Isi formulir berikut untuk memesan layanan ini','Fill out the form below to book this transport service')}</p>
            </div>
            
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{L('Nama Lengkap','Full Name')}</Label>
                      <Input id="name" placeholder={L('Masukkan nama lengkap','Enter full name')} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">{L('Nomor WhatsApp','WhatsApp Number')}</Label>
                      <Input id="phone" placeholder="08xxxxxxxxxx" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup">{L('Lokasi Penjemputan','Pickup Location')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={L('Pilih lokasi','Select location')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jakarta">Jakarta</SelectItem>
                          <SelectItem value="bogor">Bogor</SelectItem>
                          <SelectItem value="bandung">Bandung</SelectItem>
                          <SelectItem value="tangerang">Tangerang</SelectItem>
                          <SelectItem value="bekasi">Bekasi</SelectItem>
                          <SelectItem value="serang">Serang</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">{L('Tanggal Keberangkatan','Departure Date')}</Label>
                      <Input id="date" type="date" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="passengers">{L('Jumlah Penumpang','Number of Passengers')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={L('Pilih jumlah penumpang','Select number of passengers')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-4">1-4 pax</SelectItem>
                        <SelectItem value="5-6">5-6 pax</SelectItem>
                        <SelectItem value="7-15">7-15 pax</SelectItem>
                        <SelectItem value="16+">16+ pax</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">{L('Catatan Tambahan','Additional Notes')}</Label>
                    <Textarea id="message" placeholder={L('Permintaan khusus, alamat detail, dll.','Special requests, detailed address, etc.')} rows={3} />
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    {L('Kirim Permintaan','Submit Request')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <Card className="border border-gray-100 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl dark:text-white">Terms & Conditions</CardTitle>
              <CardDescription>Our transport service terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Payment</h4>
                  <ul className="space-y-1">
                    <li>• 50% deposit upon booking</li>
                    <li>• Full payment 1 day before departure</li>
                    <li>• Bank transfer or e-wallet</li>
                    <li>• Invoice available</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cancellation</h4>
                  <ul className="space-y-1">
                    <li>• D-3: 100% deposit refund</li>
                    <li>• D-2: 50% deposit refund</li>
                    <li>• D-1: deposit forfeited</li>
                    <li>• Force majeure: 100% refund</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Service</h4>
                  <ul className="space-y-1">
                    <li>• Driver + fuel</li>
                    <li>• Tolls & parking (optional)</li>
                    <li>• Free mineral water</li>
                    <li>• Travel insurance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Our Commitment</h4>
                  <ul className="space-y-1">
                    <li>• On-time according to schedule</li>
                    <li>• Clean & well-maintained fleet</li>
                    <li>• Friendly & professional drivers</li>
                    <li>• Passenger safety</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container-custom">
          <Card className="border border-ocean/20 dark:border-ocean/30">
            <CardContent className="p-6 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {L('Butuh Bantuan Tambahan?','Need More Help?')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {L('Tim CS kami siap 24/7 menjawab pertanyaan Anda.','Our customer service team is ready 24/7 to answer your questions.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">{L('Chat WhatsApp','Chat WhatsApp')}</Button>
                </a>
                <a href="tel:+6283877080088">
                  <Button variant="outline">{L('Telepon Sekarang','Call Now')}</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TransportDetail;

type CalculatorProps = {
  pricing: Record<string, string>;
  serviceType: string;
};

const PriceCalculator = ({ pricing, serviceType }: CalculatorProps) => {
  const options = useMemo(() => Object.keys(pricing), [pricing]);
  const [optionKey, setOptionKey] = useState(options[0] || '');
  const [tripType, setTripType] = useState<'sekali' | 'pp'>('sekali');

  const parsePrice = (value: string): number | null => {
    const digits = value.replace(/[^0-9]/g, '');
    if (!digits) return null;
    return Number(digits);
  };

  const basePrice = useMemo(() => parsePrice(pricing[optionKey] || ''), [pricing, optionKey]);
  const total = useMemo(() => {
    if (basePrice == null) return null;
    const multiplier = tripType === 'pp' ? 1.5 : 1;
    return Math.round(basePrice * multiplier);
  }, [basePrice, tripType]);

  const formatIdr = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>{tr('Pilihan','Option')}</Label>
          <Select value={optionKey} onValueChange={setOptionKey}>
            <SelectTrigger>
              <SelectValue placeholder={tr('Pilih opsi','Select option')} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>{tr('Jenis Perjalanan','Trip Type')}</Label>
          <Select value={tripType} onValueChange={(v) => setTripType(v as 'sekali' | 'pp')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sekali">{tr('Sekali Jalan','One Way')}</SelectItem>
              <SelectItem value="pp">{tr('Pulang-Pergi (+50%)','Round Trip (+50%)')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">{tr('Estimasi','Estimate')}</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {total != null ? formatIdr(total) : tr('Hubungi Kami','Contact Us')}
            </div>
          </div>
        </div>
      </div>
      {basePrice == null && (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Harga untuk opsi ini bersifat custom. Silakan klik tombol Chat WhatsApp untuk konsultasi.
        </div>
      )}
    </div>
  );
};

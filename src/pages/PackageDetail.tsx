import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bed, 
  Users, 
  Wifi, 
  Car, 
  Utensils, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Home,
  ChevronRight,
  Clock,
  Calendar,
  Heart,
  Share2,
  ArrowRight,
  Car as CarIcon,
  Bus,
  Plane
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

const PackageDetail = () => {
  const { id } = useParams();
  const [selectedMealPlan, setSelectedMealPlan] = useState('2x');
  const [selectedDuration, setSelectedDuration] = useState('2');

  // Data lengkap paket menginap
  const packageData = {
    'budget-1': {
      name: 'Paket Backpacker',
      category: 'budget',
      basePrice: 150000,
      originalPrice: 200000,
      discount: '25%',
      image: '/images/homestay.png',
      location: 'Desa Sawarna',
      rating: 4.5,
      reviewCount: 127,
      description: 'Paket ekonomis untuk backpacker dengan fasilitas lengkap dan lokasi strategis dekat pantai.',
      features: [
        'Kamar AC dengan kamar mandi dalam',
        'WiFi gratis',
        'Sarapan pagi',
        'Parkir motor gratis',
        'Dekat pantai (5 menit jalan kaki)',
        'Resepsionis 24 jam'
      ],
      mealPlans: {
        '2x': { price: 180000, description: 'Sarapan + Makan Siang' },
        '3x': { price: 220000, description: 'Sarapan + Makan Siang + Makan Malam' }
      },
      duration: {
        '1': { price: 150000, discount: '0%' },
        '2': { price: 280000, discount: '7%' },
        '3': { price: 400000, discount: '11%' }
      },
      itinerary: [
        {
          day: 1,
          title: 'Check-in & Pantai Sawarna',
          activities: [
            '14:00 - Check-in dan istirahat',
            '15:00 - Jalan-jalan ke Pantai Sawarna',
            '17:00 - Sunset di Tanjung Layar',
            '19:00 - Makan malam di warung lokal'
          ]
        },
        {
          day: 2,
          title: 'Eksplorasi Wisata',
          activities: [
            '07:00 - Sarapan pagi',
            '08:00 - Goa Langir adventure',
            '12:00 - Makan siang',
            '14:00 - Snorkeling di Karang Taraje',
            '17:00 - Sunset di Bukit Cinta'
          ]
        },
        {
          day: 3,
          title: 'Check-out & Souvenir',
          activities: [
            '07:00 - Sarapan pagi',
            '08:00 - Beli souvenir dan oleh-oleh',
            '11:00 - Check-out'
          ]
        }
      ],
      terms: [
        'Check-in: 14:00 WIB',
        'Check-out: 11:00 WIB',
        'Pembayaran di muka 50%',
        'Free cancellation 24 jam sebelum check-in'
      ]
    },
    'budget-2': {
      name: 'Paket Keluarga Hemat',
      category: 'budget',
      basePrice: 400000,
      originalPrice: 600000,
      discount: '33%',
      image: '/images/penginapan-sawarna.webp',
      location: 'Kawasan Wisata Sawarna',
      rating: 4.6,
      reviewCount: 89,
      description: 'Paket hemat untuk keluarga dengan fasilitas lengkap dan area bermain anak.',
      features: [
        'Kamar keluarga 2 tempat tidur',
        'Kamar mandi dalam dengan air panas',
        'WiFi gratis',
        'Sarapan untuk 2 orang',
        'Parkir mobil gratis',
        'Area bermain anak'
      ],
      mealPlans: {
        '2x': { price: 480000, description: 'Sarapan + Makan Siang untuk 2 orang' },
        '3x': { price: 560000, description: 'Sarapan + Makan Siang + Makan Malam untuk 2 orang' }
      },
      duration: {
        '2': { price: 400000, discount: '0%' },
        '3': { price: 580000, discount: '3%' },
        '4': { price: 750000, discount: '6%' }
      },
      itinerary: [
        {
          day: 1,
          title: 'Kedatangan & Aklimatisasi',
          activities: [
            '14:00 - Check-in dan istirahat',
            '16:00 - Jalan-jalan santai di sekitar penginapan',
            '18:00 - Makan malam keluarga'
          ]
        },
        {
          day: 2,
          title: 'Wisata Keluarga',
          activities: [
            '08:00 - Sarapan keluarga',
            '09:00 - Pantai Sawarna (aman untuk anak)',
            '12:00 - Makan siang',
            '14:00 - Goa Langir (dengan guide)',
            '16:00 - Area bermain anak',
            '18:00 - Makan malam'
          ]
        },
        {
          day: 3,
          title: 'Aktivitas Air',
          activities: [
            '08:00 - Sarapan',
            '09:00 - Snorkeling di Karang Taraje',
            '12:00 - Makan siang',
            '14:00 - Pantai Legon Pari',
            '17:00 - Sunset family time'
          ]
        }
      ],
      terms: [
        'Check-in: 14:00 WIB',
        'Check-out: 11:00 WIB',
        'Pembayaran di muka 50%',
        'Free cancellation 24 jam sebelum check-in'
      ]
    },
    'standard-1': {
      name: 'Paket Comfort Stay',
      category: 'standard',
      basePrice: 800000,
      originalPrice: 1200000,
      discount: '33%',
      image: '/images/villa mewah.png',
      location: 'Villa Sawarna Premium',
      rating: 4.7,
      reviewCount: 156,
      description: 'Paket comfort dengan fasilitas premium dan view pantai yang menakjubkan.',
      features: [
        'Kamar premium dengan view pantai',
        'Kamar mandi dalam dengan shower',
        'WiFi high-speed',
        'Sarapan buffet',
        'Kolam renang',
        'Restaurant on-site',
        'Room service'
      ],
      mealPlans: {
        '2x': { price: 950000, description: 'Sarapan buffet + Makan siang premium' },
        '3x': { price: 1100000, description: 'Sarapan buffet + Makan siang + Makan malam premium' }
      },
      duration: {
        '2': { price: 800000, discount: '0%' },
        '3': { price: 1150000, discount: '4%' },
        '4': { price: 1500000, discount: '6%' }
      },
      itinerary: [
        {
          day: 1,
          title: 'Luxury Check-in',
          activities: [
            '15:00 - Welcome drink dan check-in',
            '16:00 - Relaksasi di kolam renang',
            '18:00 - Sunset dinner di restaurant',
            '20:00 - Spa treatment (opsional)'
          ]
        },
        {
          day: 2,
          title: 'Premium Experience',
          activities: [
            '07:00 - Sarapan buffet',
            '09:00 - Private tour ke destinasi premium',
            '12:00 - Makan siang di restaurant',
            '14:00 - Aktivitas water sports',
            '17:00 - Sunset cocktail',
            '19:00 - Fine dining experience'
          ]
        },
        {
          day: 3,
          title: 'Wellness & Relaxation',
          activities: [
            '08:00 - Sarapan sehat',
            '09:00 - Yoga session di pantai',
            '11:00 - Spa treatment',
            '13:00 - Makan siang sehat',
            '15:00 - Meditation garden',
            '17:00 - Sunset beach walk'
          ]
        }
      ],
      terms: [
        'Check-in: 15:00 WIB',
        'Check-out: 12:00 WIB',
        'Pembayaran di muka 50%',
        'Free cancellation 48 jam sebelum check-in'
      ]
    }
  };

  const currentPackage = packageData[id as keyof typeof packageData];

  if (!currentPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paket Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Paket yang Anda cari tidak tersedia.</p>
          <Link to="/accommodation-packages">
            <Button>Kembali ke Paket Menginap</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
    );
  };

  const calculateTotalPrice = () => {
    const mealPrice = currentPackage.mealPlans[selectedMealPlan as keyof typeof currentPackage.mealPlans].price;
    const durationPrice = currentPackage.duration[selectedDuration as keyof typeof currentPackage.duration].price;
    return mealPrice + durationPrice;
  };

  const metaTitle = `${currentPackage.name} - Detail Paket Menginap Sawarna`;
  const metaDescription = `${currentPackage.description} Harga terbaik dengan fasilitas lengkap.`;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={`${currentPackage.name.toLowerCase()}, paket menginap sawarna, ${currentPackage.category} sawarna`}
        url={`https://villasawarna.com/accommodation-packages/${id}`}
        type="website"
        hreflangAlternates={buildHreflangAlternates(`/accommodation-packages/${id}`)}
      />

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link to="/" className="flex items-center hover:text-ocean dark:hover:text-ocean-light">
              <Home className="w-4 h-4 mr-1" />
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/accommodation-packages" className="hover:text-ocean dark:hover:text-ocean-light">
              Paket Menginap
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">{currentPackage.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={currentPackage.image} 
                alt={currentPackage.name} 
                className="w-full h-80 object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/sawarna-beach-3.jpeg';
                }}
              />
              {currentPackage.discount && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white text-lg font-bold px-4 py-2">
                    -{currentPackage.discount}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {currentPackage.category.charAt(0).toUpperCase() + currentPackage.category.slice(1)}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentPackage.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  {renderStars(currentPackage.rating)}
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentPackage.rating}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({currentPackage.reviewCount} review)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{currentPackage.location}</span>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentPackage.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Fitur Utama</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentPackage.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
              Pilih Paket Anda
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Sesuaikan dengan kebutuhan dan budget Anda
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Meal Plans */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  Paket Makan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(currentPackage.mealPlans).map(([plan, details]) => (
                  <div 
                    key={plan}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMealPlan === plan 
                        ? 'border-ocean bg-ocean/5' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50'
                    }`}
                    onClick={() => setSelectedMealPlan(plan)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {plan === '2x' ? '2x Makan' : '3x Makan'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {details.description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-ocean dark:text-ocean-light">
                          Rp {details.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Duration */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Durasi Menginap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(currentPackage.duration).map(([days, details]) => (
                  <div 
                    key={days}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedDuration === days 
                        ? 'border-ocean bg-ocean/5' 
                        : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50'
                    }`}
                    onClick={() => setSelectedDuration(days)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {days} {days === '1' ? 'Hari' : 'Hari'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Diskon {details.discount}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-ocean dark:text-ocean-light">
                          Rp {details.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Total Price */}
          <div className="mt-8 text-center">
            <Card className="border border-ocean/20 bg-gradient-to-r from-ocean/5 to-blue-50 dark:from-ocean/10 dark:to-blue-900/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Total Harga Paket
                </h3>
                <div className="text-3xl font-bold text-ocean dark:text-ocean-light mb-4">
                  Rp {calculateTotalPrice().toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Termasuk {selectedMealPlan} makan dan {selectedDuration} hari menginap
                </div>
                <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya tertarik dengan ${currentPackage.name} dengan paket ${selectedMealPlan} makan untuk ${selectedDuration} hari. Total harga Rp ${calculateTotalPrice().toLocaleString('id-ID')}. Mohon info ketersediaan.`)}`} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                    <Phone className="w-5 h-5 mr-2" />
                    Pesan Sekarang via WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
              Itinerary Perjalanan
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Rencana aktivitas harian yang sudah disusun untuk Anda
            </p>
          </div>

          <div className="space-y-6">
            {currentPackage.itinerary.map((day) => (
              <Card key={day.day} className="border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-ocean text-white flex items-center justify-center font-bold">
                      {day.day}
                    </div>
                    <span className="text-xl">{day.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & CTA */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Terms */}
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white">Syarat & Ketentuan</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentPackage.terms.map((term, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{term}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="border border-ocean/20 bg-gradient-to-r from-ocean/5 to-blue-50 dark:from-ocean/10 dark:to-blue-900/20">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Butuh Bantuan Lebih Lanjut?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Tim customer service kami siap membantu Anda
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Phone className="w-4 h-4 mr-2" />
                      Chat WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+6283877080088">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Telepon Sekarang
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageDetail;

import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AccommodationPackages = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Data paket menginap
  const packages = [
    {
      id: 'budget-1',
      name: 'Paket Backpacker',
      category: 'budget',
      price: 'Rp 150.000',
      originalPrice: 'Rp 200.000',
      discount: '25%',
      image: '/images/homestay.png',
      location: 'Desa Sawarna',
      rating: 4.5,
      features: ['Kamar AC', 'WiFi gratis', 'Sarapan', 'Parkir motor', 'Dekat pantai'],
      description: 'Paket ekonomis untuk backpacker dengan fasilitas lengkap.'
    },
    {
      id: 'budget-2',
      name: 'Paket Keluarga Hemat',
      category: 'budget',
      price: 'Rp 400.000',
      originalPrice: 'Rp 600.000',
      discount: '33%',
      image: '/images/penginapan-sawarna.webp',
      location: 'Kawasan Wisata',
      rating: 4.6,
      features: ['Kamar keluarga', 'Kamar mandi dalam', 'WiFi', 'Sarapan 2 orang', 'Parkir mobil'],
      description: 'Paket hemat untuk keluarga dengan fasilitas lengkap.'
    },
    {
      id: 'standard-1',
      name: 'Paket Comfort Stay',
      category: 'standard',
      price: 'Rp 800.000',
      originalPrice: 'Rp 1.200.000',
      discount: '33%',
      image: '/images/villa mewah.png',
      location: 'Villa Premium',
      rating: 4.7,
      features: ['Kamar premium', 'View pantai', 'WiFi high-speed', 'Sarapan buffet', 'Kolam renang'],
      description: 'Paket comfort dengan fasilitas premium dan view pantai.'
    },
    {
      id: 'premium-1',
      name: 'Paket Luxury Villa',
      category: 'premium',
      price: 'Rp 3.500.000',
      originalPrice: 'Rp 5.250.000',
      discount: '33%',
      image: '/images/villas/villa-cempaka-4.webp',
      location: 'Villa Cempaka',
      rating: 4.9,
      features: ['Villa private', 'Kolam renang', '3 kamar tidur', 'Chef private', 'Butler service'],
      description: 'Paket luxury villa dengan fasilitas premium dan service eksklusif.'
    },
    {
      id: 'special-1',
      name: 'Paket Adventure Camp',
      category: 'special',
      price: 'Rp 300.000',
      originalPrice: 'Rp 450.000',
      discount: '33%',
      image: '/images/hero-sawarna.jpg',
      location: 'Adventure Camp',
      rating: 4.4,
      features: ['Tenda camping', 'Makan 3x', 'Aktivitas adventure', 'Guide lokal', 'Equipment'],
      description: 'Paket adventure camping dengan aktivitas outdoor yang seru.'
    }
  ];

  const filteredPackages = selectedCategory === 'all' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

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

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <SEO 
        title="Paket Menginap Sawarna - Villa, Homestay & Resort Terbaik"
        description="Pilihan lengkap paket menginap di Sawarna: budget backpacker, comfort stay, luxury villa, dan adventure camp. Harga terbaik dengan fasilitas lengkap."
        keywords="paket menginap sawarna, villa sawarna, homestay sawarna, resort sawarna"
        url="https://villasawarna.com/accommodation-packages"
        type="website"
        hreflangAlternates={buildHreflangAlternates('/accommodation-packages')}
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
            <span className="text-gray-900 dark:text-white font-medium">Paket Menginap</span>
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
                <Bed className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Paket Menginap Sawarna</h1>
                <p className="text-white/90 text-lg md:text-xl mt-2">
                  Pilihan lengkap akomodasi dari budget backpacker hingga luxury villa
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#packages">
                <Button className="bg-ocean hover:bg-ocean/90">Lihat Paket</Button>
              </a>
              <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">Konsultasi</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              Semua Kategori
            </Button>
            <Button
              variant={selectedCategory === 'budget' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('budget')}
            >
              Budget
            </Button>
            <Button
              variant={selectedCategory === 'standard' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('standard')}
            >
              Standard
            </Button>
            <Button
              variant={selectedCategory === 'premium' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('premium')}
            >
              Premium
            </Button>
            <Button
              variant={selectedCategory === 'special' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('special')}
            >
              Special
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">
              Pilihan Paket Menginap
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Temukan paket menginap yang sesuai dengan budget dan kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="group border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 hover:scale-[1.02]">
                {/* Image with overlay */}
                <div className="relative w-full h-48 md:h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={`${pkg.name} - Paket Menginap Sawarna`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/sawarna-beach-3.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Discount Badge */}
                  {pkg.discount && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white text-xs font-bold">
                        -{pkg.discount}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-xs">
                      {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                    </Badge>
                  </div>
                  
                  {/* Package Name Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">{pkg.name}</h3>
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5 md:p-6">
                  {/* Rating Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(pkg.rating)}
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {pkg.rating}
                      </span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-ocean dark:text-ocean-light">
                        {pkg.price}
                      </span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {pkg.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 mb-4">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <Link to={`/accommodation-packages/${pkg.id}`}>
                      <Button variant="outline" className="w-full">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Lihat Detail Lengkap
                      </Button>
                    </Link>
                    <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya tertarik dengan ${pkg.name}. Mohon info detail dan ketersediaan.`)}`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Pesan via WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container-custom">
          <Card className="border border-ocean/20 dark:border-ocean/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Butuh Bantuan Memilih Paket?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Tim customer service kami siap membantu Anda memilih paket menginap yang paling sesuai.
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
      </section>
    </div>
  );
};

export default AccommodationPackages;

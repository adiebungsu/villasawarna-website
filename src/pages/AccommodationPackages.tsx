import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bed, 
  CheckCircle2, 
  Phone, 
  Home,
  ChevronRight,
  Calendar,
  Plus,
  Building2,
  Hotel,
  Tent,
  Package,
  Star,
  MapPin,
  Users,
  Clock,
  Info,
  Shield,
  CreditCard,
  Clock3,
  HelpCircle,
  Mail,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AccommodationPackages = () => {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  // Data paket menginap yang tersedia
  const packages = {
    'budget-1': {
      id: 'budget-1',
      name: 'Paket Backpacker',
      category: 'budget',
      image: '/images/paket-backpaker.webp',
      location: 'Desa Sawarna',
      rating: 4.5,
      reviewCount: 127,
      description: 'Paket ekonomis untuk backpacker dengan fasilitas sederhana dan lokasi strategis dekat pantai.',
      features: [
        'Kamar dengan kipas angin dan kamar mandi dalam',
        'WiFi',
        'Parkir motor gratis',
        'Dekat pantai (5 menit jalan kaki)',
        'Resepsionis 24 jam'
      ],
      capacity: '1-100 orang',
      bestFor: 'Backpacker, budget traveler, solo traveler',
      amenities: ['Kipas angin', 'Kamar mandi dalam', 'Lokasi strategis'],
      duration: ['1 hari', '2 hari', '3 hari'],
      mealPlans: ['2x makan', '3x makan'],
      icon: Tent
    },
    'budget-2': {
      id: 'budget-2',
      name: 'Paket Keluarga Hemat',
      category: 'budget',
      image: '/images/paket-keluarga-hemat.webp',
      location: 'Kawasan Wisata Sawarna',
      rating: 4.6,
      reviewCount: 89,
      description: 'Paket hemat untuk keluarga dengan fasilitas lengkap dan area bermain anak.',
      features: [
        'Kamar keluarga 2 tempat tidur',
        'Kamar mandi dalam dengan air panas',
        'WiFi',
        'Sarapan untuk 2 orang',
        'Parkir mobil gratis',
        'Area bermain anak'
      ],
      capacity: '1-100 orang',
      bestFor: 'Keluarga kecil, pasangan, group kecil',
      amenities: ['Resepsionis 24 jam', 'Area parkir', 'Area bermain'],
      duration: ['1 hari', '2 hari', '3 hari'],
      mealPlans: ['2x makan', '3x makan'],
      icon: Hotel
    },
    'standard-1': {
      id: 'standard-1',
      name: 'Paket Lengkap',
      category: 'standard',
      image: '/images/paket-lengkap.webp',
      location: 'Villa Premium Sawarna',
      rating: 4.8,
      reviewCount: 156,
      description: 'Paket lengkap dengan villa premium, AC dan fasilitas lengkap untuk pengalaman menginap terbaik.',
      features: [
        'Villa private dengan AC',
        'Kamar mandi dalam dengan air panas',
        'WiFi',
        'Parkir mobil gratis'
      ],
      capacity: '1-100 orang',
      bestFor: 'Keluarga besar, group travel, honeymoon',
      amenities: ['Room service', 'Private terrace', 'AC'],
      duration: ['1 hari', '2 hari', '3 hari'],
      mealPlans: ['2x makan', '3x makan'],
      icon: Building2
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {rating}
        </span>
      </div>
    );
  };

  const faqData = [
    {
      id: 'pricing',
      question: 'Bagaimana cara kalkulasi harga paket?',
      answer: 'Harga dihitung berdasarkan: (Harga Villa × Diskon Durasi × Multiplier Season) + (Harga Makan × Jumlah Hari). Diskon durasi mulai dari 5% untuk 2 hari hingga 15% untuk 5 hari. Multiplier season: Regular (1.0x), Weekend (1.15x), Peak Season (1.4x).'
    },
    {
      id: 'booking',
      question: 'Bagaimana cara memesan paket custom?',
      answer: 'Setelah memilih komponen paket, klik tombol "Pesan Paket Custom" yang akan mengarahkan ke WhatsApp dengan detail lengkap paket Anda. Atau hubungi langsung via telepon untuk konsultasi lebih lanjut.'
    },
    {
      id: 'cancellation',
      question: 'Apa kebijakan pembatalan?',
      answer: 'Pembatalan gratis hingga 24 jam sebelum check-in. Pembatalan dalam 24 jam akan dikenakan biaya 50% dari total paket. Pembayaran di muka 50% saat booking, sisanya saat check-in.'
    },
    {
      id: 'modification',
      question: 'Bisakah paket dimodifikasi setelah booking?',
      answer: 'Ya, modifikasi dapat dilakukan hingga 48 jam sebelum check-in dengan syarat ketersediaan. Perubahan durasi atau tipe villa mungkin mempengaruhi harga paket.'
    },
    {
      id: 'season',
      question: 'Kapan peak season di Sawarna?',
      answer: 'Peak season berlangsung Juni-Agustus dengan multiplier harga 1.4x. Weekend (Jumat-Minggu) multiplier 1.15x. Regular season (Januari-Mei, September-Desember) multiplier 1.0x.'
    },
    {
      id: 'facilities',
      question: 'Apa fasilitas yang tersedia di semua tipe akomodasi?',
      answer: 'Semua tipe akomodasi dilengkapi AC, WiFi, kamar mandi dalam, dan sarapan. Fasilitas tambahan bervariasi sesuai tipe: Standard+ memiliki kolam renang, Premium+ memiliki view pantai, Luxury+ memiliki butler service.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SEO 
        title="Paket Menginap Sawarna - Pilihan Akomodasi Terlengkap"
        description="Pilih paket menginap yang sesuai dengan kebutuhan Anda di Sawarna. Dari budget backpacker hingga villa premium, semua dilengkapi dengan kalkulator harga yang transparan."
        keywords="paket menginap sawarna, akomodasi sawarna, villa sawarna, homestay sawarna, booking sawarna, wisata sawarna"
        url="https://villasawarna.com/accommodation-packages"
        type="website"
        hreflangAlternates={buildHreflangAlternates('/accommodation-packages')}
        image="/images/sawarna-beach-3.jpeg"
      />

      {/* Breadcrumb */}
      <section className="py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link to="/" className="flex items-center hover:text-ocean dark:hover:text-ocean-light transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white font-medium">Paket Menginap</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/sawarna-beach-3.jpeg')] bg-cover bg-center opacity-90 dark:opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/30" />
        <div className="relative z-10 container-custom py-16 md:py-24 lg:py-32 text-white px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-ocean/30 text-ocean-light mb-6 md:mb-8 backdrop-blur-sm">
              <Package className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6">
              Paket Menginap
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ocean-light to-coral-light">
                Sawarna
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Pilih paket menginap yang sesuai dengan kebutuhan Anda. Setiap paket dilengkapi dengan fasilitas lengkap dan kalkulator harga yang transparan.
            </p>
            <div className="flex flex-col gap-3 md:gap-4 justify-center max-w-sm md:max-w-none mx-auto">
              <a href="#packages" className="w-full md:w-auto">
                <Button size="lg" className="w-full md:w-auto bg-ocean hover:bg-ocean/90 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Package className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Lihat Paket
                </Button>
              </a>
              <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button variant="outline" size="lg" className="w-full md:w-auto text-white border-white/30 hover:bg-white/10 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm">
                  Konsultasi
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-12 md:py-16">
        <div className="container-custom max-w-7xl px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
              Pilih Paket Menginap
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
              Kami menyediakan berbagai paket menginap yang dapat disesuaikan dengan kebutuhan dan budget Anda. 
              Setiap paket dilengkapi dengan kalkulator harga yang transparan.
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(packages).map(([key, pkg]) => {
              const IconComponent = pkg.icon;
              return (
                <Card key={key} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/sawarna-beach-3.jpeg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                        pkg.category === 'budget' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-ocean text-white'
                      }`}>
                        {pkg.category === 'budget' ? 'Budget' : 'Standard'}
                      </Badge>
              </div>
                    <div className="absolute top-4 right-4">
                      {renderStars(pkg.rating)}
                   </div>
                 </div>
                 
                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <IconComponent className="w-5 h-5 text-ocean" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {pkg.name}
                             </h3>
                             </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.location}</span>
                 </div>
                 
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {pkg.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Kapasitas: {pkg.capacity}
                             </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Cocok untuk: {pkg.bestFor}
                               </div>
                             </div>

                    {/* Key Features */}
                    <div className="space-y-2 mb-6">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fasilitas Utama:
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {pkg.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                                 </div>
                               ))}
                             </div>
                           </div>

                    {/* CTA */}
                    <Link to={`/accommodation-packages/${pkg.id}`}>
                      <Button className="w-full bg-ocean hover:bg-ocean/90 text-white">
                        Lihat Detail & Kalkulasi Harga
                      </Button>
                    </Link>
                         </CardContent>
                       </Card>
                      );
                    })}
                  </div>
        </div>
      </section>

      {/* FAQ & Help Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-ocean/5 to-coral/5">
        <div className="container-custom max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* FAQ Section */}
            <div>
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Pertanyaan Umum
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                  Temukan jawaban untuk pertanyaan yang sering diajukan
                </p>
              </div>
              
              <div className="space-y-3 md:space-y-4 max-h-[600px] md:max-h-none overflow-y-auto md:overflow-visible">
                {faqData.map((faq) => (
                  <Card key={faq.id} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors p-4 md:p-6"
                      onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-ocean" />
                          {faq.question}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                        >
                          <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${
                            activeFAQ === faq.id ? 'rotate-90' : ''
                          }`} />
                        </Button>
                      </div>
                    </CardHeader>
                    {activeFAQ === faq.id && (
                      <CardContent className="pt-0 px-4 md:px-6 pb-4 md:pb-6">
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                           {faq.answer}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div>
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Butuh Bantuan?
                </h2>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                  Tim kami siap membantu membuat paket yang sempurna
                </p>
              </div>
              
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                <CardContent className="p-6 md:p-8 text-center h-full flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-ocean to-coral text-white mb-4 md:mb-6">
                    <Phone className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                    Konsultasi Gratis
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                    Tim customer service kami siap membantu Anda membuat paket menginap yang sempurna sesuai kebutuhan dan budget Anda.
                  </p>
                  <div className="space-y-3 md:space-y-4">
                    <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl transition-all duration-300">
                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        Chat WhatsApp
                      </Button>
                    </a>
                    <a href="tel:+6283877080088">
                      <Button variant="outline" size="lg" className="w-full text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-2 hover:bg-ocean hover:text-white transition-all duration-300">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        Telepon Sekarang
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccommodationPackages;

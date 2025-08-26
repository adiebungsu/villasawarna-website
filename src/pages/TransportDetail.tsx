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
import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';

const TransportDetail = () => {
  const { t } = useTranslation('common');
  const { type } = useParams<{ type: string }>();

  // Data layanan transport berdasarkan type
  const transportServices = {
    'antar-jemput': {
      title: 'Antar-Jemput Bandara/Stasiun',
      description: 'Penjemputan tepat waktu dari Soekarno-Hatta, Halim, Bogor, atau Rangkasbitung menuju Sawarna.',
      icon: <Car className="w-8 h-8" />,
      features: [
        'Meet & greet di bandara/stasiun',
        'Termasuk tol & parkir (opsional)',
        'Air mineral gratis',
        'Driver berpengalaman',
        'Armada terawat & nyaman'
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
      title: 'Charter Harian (City Tour)',
      description: 'Sewa mobil dengan sopir untuk jelajah Goa Langir, Tanjung Layar, Legon Pari, dan spot terbaik Sawarna.',
      icon: <Navigation className="w-8 h-8" />,
      features: [
        'Rute fleksibel sesuai keinginan',
        'Sopir lokal berpengalaman',
        'Bisa multiple stop',
        'Termasuk bensin & driver',
        'Dokumentasi foto (opsional)'
      ],
      pricing: {
        'Avanza/Xenia': 'Rp 750.000/hari',
        'Innova/Reborn': 'Rp 1.100.000/hari',
        'Hiace/Elf': 'Rp 1.700.000/hari'
      }
    },
    'group-rombongan': {
      title: 'Group & Rombongan',
      description: 'Bus/elf untuk rombongan kantor, keluarga besar, atau komunitas dengan itinerary kustom.',
      icon: <Bus className="w-8 h-8" />,
      features: [
        'Paket hemat untuk rombongan',
        'Tour leader (opsional)',
        'Dokumentasi (opsional)',
        'Itinerary kustom',
        'Catering (opsional)'
      ],
      pricing: {
        'Hiace (15 orang)': 'Rp 1.700.000/hari',
        'Medium Bus (25 orang)': 'Hubungi Kami',
        'Big Bus (45 orang)': 'Hubungi Kami'
      }
    },
    'sewa-bus': {
      title: 'Sewa Bus',
      description: 'Layanan sewa bus untuk rombongan besar, acara perusahaan, dan perjalanan kelompok.',
      icon: <Bus className="w-8 h-8" />,
      features: [
        'Bus berbagai ukuran (Medium, Big, SHD)',
        'Elf Short & Long untuk rombongan kecil',
        'Hiace Commuter & Premio',
        'Driver berpengalaman',
        'AC dingin & fasilitas lengkap'
      ],
      pricing: {
        'Elf Short (12-15 orang)': 'Rp 1.700.000/hari',
        'Elf Long (15-18 orang)': 'Rp 2.000.000/hari',
        'Hiace Commuter (9-12 orang)': 'Rp 1.500.000/hari',
        'Hiace Premio (9-12 orang)': 'Rp 1.800.000/hari',
        'Bus SHD (20-25 orang)': 'Hubungi Kami',
        'Medium Bus (25-30 orang)': 'Hubungi Kami',
        'Big Bus (35-45 orang)': 'Hubungi Kami'
      }
    },
    'sewa-mobil': {
      title: 'Sewa Mobil',
      description: 'Layanan sewa mobil untuk keluarga, perjalanan pribadi, dan kebutuhan transportasi personal.',
      icon: <Car className="w-8 h-8" />,
      features: [
        'Mobil berbagai jenis (MPV, SUV, City Car)',
        'Driver profesional & berpengalaman',
        'AC dingin & fasilitas lengkap',
        'Bensin penuh & maintenance rutin',
        'Asuransi perjalanan'
      ],
      pricing: {
        'Honda Brio (4-5 orang)': 'Rp 600.000/hari',
        'Honda Jazz (4-5 orang)': 'Rp 700.000/hari',
        'Honda Mobilio (5-7 orang)': 'Rp 800.000/hari',
        'Avanza (4-6 orang)': 'Rp 750.000/hari',
        'Grand New Innova (4-6 orang)': 'Rp 1.100.000/hari',
        'Grand Fortuner (4-6 orang)': 'Rp 1.500.000/hari'
      }
    },
    'sewa-motor': {
      title: 'Sewa Motor',
      description: 'Layanan sewa motor untuk eksplorasi Sawarna yang fleksibel dan ekonomis.',
      icon: <Navigation className="w-8 h-8" />,
      features: [
        'Motor berbagai jenis (Scooter, Trail, Bebek)',
        'Bensin penuh & helm standar',
        'Mudah parkir & manuver',
        'Cocok untuk eksplorasi',
        'Harga terjangkau'
      ],
      pricing: {
        'Honda Supra X (1-2 orang)': 'Rp 150.000/hari',
        'Honda Vario CBS (1-2 orang)': 'Rp 180.000/hari',
        'Honda Scoopy (1-2 orang)': 'Rp 200.000/hari',
        'Yamaha Nmax (1-2 orang)': 'Rp 250.000/hari',
        'Kawasaki KLX (1-2 orang)': 'Rp 300.000/hari'
      }
    }
  };

  const currentService = transportServices[type as keyof typeof transportServices];

  if (!currentService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Layanan Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Layanan transport yang Anda cari tidak tersedia.</p>
          <a href="/transport">
            <Button>Kembali ke Halaman Transport</Button>
          </a>
        </div>
      </div>
    );
  }

  const metaTitle = `${currentService.title} - VillaSawarna`;
  const metaDescription = `${currentService.description} Layanan transportasi profesional ke Sawarna dengan harga terjangkau.`;

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
              Beranda
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/transport" className="hover:text-ocean dark:hover:text-ocean-light">
              Transport
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
              <a href="https://wa.me/6283877080088?text=Halo%20VillaSawarna%2C%20saya%20ingin%20pesan%20layanan%20transport%20ini" target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700">Pesan via WhatsApp</Button>
              </a>
              <a href="#booking">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">Form Booking</Button>
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
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Rute Wisata Favorit</h2>
              <p className="text-gray-600 dark:text-gray-300">Destinasi wisata Sawarna yang bisa Anda kunjungi</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Pantai Sawarna',
                  desc: 'Pantai utama dengan ombak yang cocok untuk surfing',
                  duration: '2-3 jam',
                  image: '/images/sawarna-beach-3.jpeg'
                },
                {
                  name: 'Tanjung Layar',
                  desc: 'Spot foto instagramable dengan pemandangan laut yang menakjubkan',
                  duration: '1-2 jam',
                  image: '/images/sawarna-beach-4.jpeg'
                },
                {
                  name: 'Goa Langir',
                  desc: 'Goa alam yang unik dengan stalaktit dan stalagmit',
                  duration: '1-2 jam',
                  image: '/images/karang-taraje-sawarna.webp'
                },
                {
                  name: 'Legon Pari',
                  desc: 'Pantai tersembunyi dengan air jernih dan pasir putih',
                  duration: '2-3 jam',
                  image: '/images/penginapan-sawarna.webp'
                },
                {
                  name: 'Karang Taraje',
                  desc: 'Spot snorkeling dengan terumbu karang yang indah',
                  duration: '2-3 jam',
                  image: '/images/hero-sawarna.jpg'
                },
                {
                  name: 'Bukit Cinta',
                  desc: 'Spot sunset terbaik dengan pemandangan 360°',
                  duration: '1-2 jam',
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
                <strong>Fleksibel!</strong> Rute bisa disesuaikan dengan keinginan Anda. 
                Konsultasikan dengan driver kami untuk itinerary terbaik.
              </p>
              <a href="https://wa.me/6283877080088?text=Halo%20VillaSawarna%2C%20saya%20ingin%20konsultasi%20rute%20wisata%20Sawarna" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Konsultasi Rute</Button>
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
                <CardTitle className="text-2xl dark:text-white">Testimoni Pelanggan</CardTitle>
                <CardDescription>Pengalaman tamu yang sudah menggunakan layanan ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <blockquote className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-800 dark:text-gray-200">“Driver ramah, on-time, dan mobil bersih. Perjalanan dari Jakarta ke Sawarna lancar.”</p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">— Rina, Jakarta</div>
                </blockquote>
                <blockquote className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-800 dark:text-gray-200">“Harga sesuai, armada nyaman. Sangat direkomendasikan untuk rombongan.”</p>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">— Dimas, Bogor</div>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl dark:text-white">FAQ</CardTitle>
                <CardDescription>Pertanyaan yang sering ditanyakan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Apakah harga sudah termasuk tol dan parkir?</div>
                  <div className="text-gray-700 dark:text-gray-300">Opsional. Bisa termasuk atau tidak, sesuai permintaan.</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Apakah bisa request itinerary khusus?</div>
                  <div className="text-gray-700 dark:text-gray-300">Bisa. Kami fleksibel menyesuaikan kebutuhan Anda.</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Metode pembayaran apa yang tersedia?</div>
                  <div className="text-gray-700 dark:text-gray-300">Transfer bank, e-wallet, dan QRIS.</div>
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
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Driver & Armada Kami</h2>
            <p className="text-gray-600 dark:text-gray-300">Tim profesional yang siap melayani perjalanan Anda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-ocean" />
                  Driver Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-green-600" />
                    <span>Berpengalaman 5+ tahun</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Berlisensi resmi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Rating 4.8/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Lokal Sawarna</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Keunggulan:</strong> Driver kami ramah, sabar, dan menguasai rute wisata Sawarna dengan baik.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl dark:text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-ocean" />
                  Armada Terawat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>AC Dingin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Audio System</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Kursi Nyaman</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Bagasi Luas</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Maintenance:</strong> Armada kami rutin diservis untuk kenyamanan dan keamanan perjalanan.
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
                 <CardTitle className="text-2xl dark:text-white">Fitur Layanan</CardTitle>
                 <CardDescription>Keunggulan layanan transportasi kami</CardDescription>
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
                 <CardTitle className="text-2xl dark:text-white">Harga Layanan</CardTitle>
                 <CardDescription>Estimasi biaya sesuai kebutuhan Anda</CardDescription>
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
                     <strong>Catatan:</strong> Harga dapat berubah sesuai jarak, durasi, dan kebutuhan khusus. 
                     Hubungi kami untuk estimasi yang lebih akurat.
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
              <CardTitle className="text-2xl dark:text-white">Kalkulator Harga</CardTitle>
              <CardDescription>Estimasi cepat biaya layanan ini</CardDescription>
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
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Form Pemesanan</h2>
              <p className="text-gray-600 dark:text-gray-300">Isi form di bawah ini untuk memesan layanan transportasi</p>
            </div>
            
            <Card className="border border-gray-100 dark:border-gray-700">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" placeholder="Masukkan nama lengkap" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor WhatsApp</Label>
                      <Input id="phone" placeholder="08xxxxxxxxxx" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickup">Lokasi Penjemputan</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih lokasi" />
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
                      <Label htmlFor="date">Tanggal Keberangkatan</Label>
                      <Input id="date" type="date" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="passengers">Jumlah Penumpang</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jumlah penumpang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-4">1-4 orang</SelectItem>
                        <SelectItem value="5-6">5-6 orang</SelectItem>
                        <SelectItem value="7-15">7-15 orang</SelectItem>
                        <SelectItem value="16+">16+ orang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Pesan Tambahan</Label>
                    <Textarea id="message" placeholder="Kebutuhan khusus, alamat detail, dll." rows={3} />
                  </div>
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Kirim Permintaan
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
              <CardTitle className="text-xl dark:text-white">Syarat & Ketentuan</CardTitle>
              <CardDescription>Ketentuan layanan transportasi kami</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pembayaran</h4>
                  <ul className="space-y-1">
                    <li>• DP 50% saat booking</li>
                    <li>• Pelunasan H-1 keberangkatan</li>
                    <li>• Transfer bank atau e-wallet</li>
                    <li>• Invoice tersedia</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pembatalan</h4>
                  <ul className="space-y-1">
                    <li>• H-3: DP dikembalikan 100%</li>
                    <li>• H-2: DP dikembalikan 50%</li>
                    <li>• H-1: DP hangus</li>
                    <li>• Force majeure: 100% refund</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Layanan</h4>
                  <ul className="space-y-1">
                    <li>• Driver + bensin</li>
                    <li>• Tol & parkir (opsional)</li>
                    <li>• Air mineral gratis</li>
                    <li>• Asuransi perjalanan</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Kewajiban</h4>
                  <ul className="space-y-1">
                    <li>• Tepat waktu sesuai jadwal</li>
                    <li>• Armada bersih & terawat</li>
                    <li>• Driver ramah & profesional</li>
                    <li>• Keamanan penumpang</li>
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
                Butuh Bantuan Lebih Lanjut?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Tim customer service kami siap membantu 24/7 untuk menjawab pertanyaan Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">Chat WhatsApp</Button>
                </a>
                <a href="tel:+6283877080088">
                  <Button variant="outline">Telepon Sekarang</Button>
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
          <Label>Pilihan</Label>
          <Select value={optionKey} onValueChange={setOptionKey}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih opsi" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Jenis Perjalanan</Label>
          <Select value={tripType} onValueChange={(v) => setTripType(v as 'sekali' | 'pp')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sekali">Sekali Jalan</SelectItem>
              <SelectItem value="pp">Pulang-Pergi (+50%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <div className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">Estimasi</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {total != null ? formatIdr(total) : 'Hubungi Kami'}
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

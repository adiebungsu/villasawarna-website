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
  Plane,
  Plus
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PackageDetail = () => {
  const { id } = useParams();
  const [selectedMealPlan, setSelectedMealPlan] = useState('2x');
  const [selectedDuration, setSelectedDuration] = useState('2');
  const [selectedSeason, setSelectedSeason] = useState('regular');
  const [guestCount, setGuestCount] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  
  // Kapasitas maksimal per kamar dan total tamu untuk setiap paket
  const maxGuestsPerRoom = 4; // Maksimal 4 orang per kamar
  const maxTotalGuests = 100; // Total maksimal tamu yang bisa ditampung

  // Auto-detect season based on date
  useEffect(() => {
    if (checkInDate) {
      const date = new Date(checkInDate);
      const month = date.getMonth() + 1;
      const day = date.getDay();
      
      // Peak season: June-August (6-8)
      if (month >= 6 && month <= 8) {
        setSelectedSeason('peak');
      }
      // Weekend
      else if (day === 0 || day === 6) {
        setSelectedSeason('weekend');
      }
      // Regular season
      else {
        setSelectedSeason('regular');
      }
    }
  }, [checkInDate]);

  // Data lengkap paket menginap
  const packageData = {
    'budget-1': {
      name: 'Paket Backpacker',
      category: 'budget',
      basePrice: 350000,
      originalPrice: 400000,
      discount: '12.5%',
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
             mealPlans: {
         '2x': { price: 60000, description: 'Sarapan + Makan Siang' },
         '3x': { price: 80000, description: 'Sarapan + Makan Siang + Makan Malam' }
       },
      duration: {
        '1': { price: 350000, discount: '0%' },
        '2': { price: 650000, discount: '7%' },
        '3': { price: 900000, discount: '11%' },
        '4': { price: 1100000, discount: '15%' }
      },
                           itinerary: {
          '1': [
            {
              day: 1,
              title: 'Petualangan Sehari di Sawarna',
              activities: [
                '08:00 - Sarapan pagi di homestay • 09:00 - Check-in dan istirahat sebentar • 10:00 - Jalan-jalan ke Pantai Sawarna',
                '11:00 - Berenang dan bermain di pantai • 12:00 - Makan siang di warung pantai • 14:00 - Eksplorasi Tanjung Layar',
                '16:00 - Snorkeling di Karang Taraje • 17:30 - Sunset di Bukit Cinta • 19:00 - Makan malam • 20:00 - Istirahat'
              ]
            }
          ],
          '2': [
            {
              day: 1,
            title: 'Kedatangan & Eksplorasi Pantai',
              activities: [
              '14:00 - Check-in di homestay • 15:00 - Istirahat dan persiapan • 16:00 - Jalan-jalan ke Pantai Sawarna',
                '17:00 - Sunset di Tanjung Layar • 18:30 - Makan malam di warung lokal • 20:00 - Istirahat malam'
              ]
            },
            {
              day: 2,
            title: 'Petualangan Goa & Snorkeling',
              activities: [
                '07:00 - Sarapan pagi • 08:00 - Goa Langir adventure dengan guide lokal • 10:00 - Snorkeling di Karang Taraje',
                '12:00 - Makan siang di warung pantai • 14:00 - Eksplorasi Pantai Legon Pari • 16:00 - Sunset di Bukit Cinta',
                '18:00 - Makan malam dan beli souvenir • 20:00 - Istirahat dan persiapan check-out'
              ]
            }
          ],
          '3': [
          {
            day: 1,
            title: 'Kedatangan & Eksplorasi Pantai',
            activities: [
              '14:00 - Check-in di homestay • 15:00 - Istirahat dan persiapan • 16:00 - Jalan-jalan ke Pantai Sawarna',
              '17:00 - Sunset di Tanjung Layar • 18:30 - Makan malam di warung lokal • 20:00 - Istirahat malam'
            ]
          },
          {
            day: 2,
            title: 'Petualangan Goa & Snorkeling',
            activities: [
              '07:00 - Sarapan pagi • 08:00 - Goa Langir adventure dengan guide lokal • 10:00 - Snorkeling di Karang Taraje',
              '12:00 - Makan siang di warung pantai • 14:00 - Eksplorasi Pantai Legon Pari • 16:00 - Sunset di Bukit Cinta',
              '18:00 - Makan malam • 20:00 - Istirahat malam'
            ]
          },
          {
            day: 3,
            title: 'Eksplorasi Pantai & Wisata Lokal',
            activities: [
              '07:00 - Sarapan pagi • 08:00 - Eksplorasi Pantai Ciantir • 10:00 - Wisata ke desa lokal',
              '12:00 - Makan siang di warung lokal • 14:00 - Beli souvenir dan oleh-oleh • 16:00 - Sunset di Bukit Cinta',
              '18:00 - Makan malam • 20:00 - Istirahat malam'
            ]
          }
        ],
          '4': [
            {
              day: 1,
              title: 'Kedatangan & Aklimatisasi',
              activities: [
                '14:00 - Check-in di homestay • 15:00 - Istirahat dan persiapan • 16:00 - Jalan-jalan santai ke Pantai Sawarna',
                '17:00 - Sunset di Tanjung Layar • 18:30 - Makan malam di warung lokal • 20:00 - Istirahat malam'
              ]
            },
            {
              day: 2,
              title: 'Petualangan Goa & Snorkeling',
              activities: [
                '07:00 - Sarapan pagi • 08:00 - Goa Langir adventure dengan guide lokal • 10:00 - Snorkeling di Karang Taraje',
                '12:00 - Makan siang di warung pantai • 14:00 - Eksplorasi Pantai Legon Pari • 16:00 - Sunset di Bukit Cinta',
                '18:00 - Makan malam • 20:00 - Istirahat malam'
              ]
            },
            {
              day: 3,
              title: 'Eksplorasi Pantai & Wisata Lokal',
              activities: [
                '07:00 - Sarapan pagi • 08:00 - Eksplorasi Pantai Ciantir • 10:00 - Wisata ke desa lokal',
                '12:00 - Makan siang di warung lokal • 14:00 - Beli souvenir dan oleh-oleh • 16:00 - Sunset di Bukit Cinta',
                '18:00 - Makan malam • 20:00 - Istirahat malam'
              ]
            },
            {
              day: 4,
              title: 'Petualangan Terakhir & Check-out',
              activities: [
                '07:00 - Sarapan pagi • 08:00 - Eksplorasi Karang Bokor • 10:00 - Snorkeling di Pasir Putih',
                '12:00 - Makan siang di warung pantai • 14:00 - Check-out dan beli oleh-oleh • 16:00 - Perjalanan pulang'
              ]
            }
          ]
        },
      terms: [
        'Check-in: 14:00 WIB',
        'Check-out: 11:00 WIB',
        'Pembayaran di muka 50%',
        'Free cancellation 24 jam sebelum check-in'
      ],
      seasonalPricing: {
        regular: { multiplier: 1.0, description: 'Harga Normal' },
        weekend: { multiplier: 1.1, description: 'Harga Weekend' },
        peak: { multiplier: 1.3, description: 'Harga Peak Season (Juni-Agustus)' }
      },
      
      addOns: {
        'extra-bed': { name: 'Tempat Tidur Tambahan', price: 50000, description: 'Untuk tamu tambahan' },
        'guided-tour': { name: 'Tour Guide', price: 150000, description: 'Pemandu wisata lokal' },
        'campfire': { name: 'Api Unggun', price: 150000, description: 'Api unggun di pantai' },
        'live-music': { name: 'Organ + 2 Singer', price: 1200000, description: 'Hiburan musik live dengan organ dan 2 penyanyi' },
        'barbaque-standard': { name: 'Barbaque Standar', price: 120000, description: 'Paket barbaque standar' },
        'barbaque-medium': { name: 'Barbaque Medium', price: 300000, description: 'Paket barbaque medium' },
        'kambing-guling': { name: 'Kambing Guling', price: 1250000, description: 'Kambing guling utuh' }
      }
    },
    'budget-2': {
      name: 'Paket Keluarga Hemat',
      category: 'budget',
      basePrice: 400000,
      originalPrice: 600000,
      discount: '33%',
      image: '/images/paket-keluarga-hemat.webp',
      location: 'Kawasan Wisata Sawarna',
      rating: 4.6,
      reviewCount: 89,
      description: 'Paket hemat untuk keluarga dengan fasilitas lengkap dan area bermain anak.',
      features: [
        'Kamar keluarga 2 tempat tidur',
        'Kamar mandi dalam dengan air panas',
        'WiFi',
        'Parkir mobil gratis',
        'Area bermain anak'
      ],
             mealPlans: {
         '2x': { price: 60000, description: 'Sarapan + Makan Siang' },
         '3x': { price: 80000, description: 'Sarapan + Makan Siang + Makan Malam' }
       },
      duration: {
        '1': { price: 400000, discount: '0%' },
        '2': { price: 400000, discount: '0%' },
        '3': { price: 580000, discount: '3%' },
        '4': { price: 750000, discount: '6%' }
      },
      itinerary: {
        '1': [
        {
          day: 1,
            title: 'Petualangan Sehari di Sawarna',
          activities: [
            '14:00 - Check-in dan istirahat',
            '16:00 - Jalan-jalan santai di sekitar penginapan',
            '18:00 - Makan malam keluarga'
          ]
          }
        ],
        '2': [
          {
            day: 1,
            title: 'Kedatangan & Eksplorasi Pantai',
            activities: [
              '14:00 - Check-in dan istirahat',
              '16:00 - Jalan-jalan ke Pantai Sawarna (aman untuk anak)',
            '18:00 - Makan malam keluarga'
          ]
        },
        {
          day: 2,
            title: 'Petualangan Goa & Snorkeling',
          activities: [
            '08:00 - Sarapan keluarga',
              '09:00 - Goa Langir adventure (dengan guide)',
            '12:00 - Makan siang',
              '14:00 - Snorkeling di Karang Taraje',
              '16:00 - Area bermain anak di pantai',
              '18:00 - Makan malam'
            ]
          }
        ],
                '3': [
          {
            day: 1,
            title: 'Kedatangan & Eksplorasi Pantai',
            activities: [
              '14:00 - Check-in dan istirahat',
              '16:00 - Jalan-jalan ke Pantai Sawarna (aman untuk anak)',
              '18:00 - Makan malam keluarga'
            ]
          },
          {
            day: 2,
            title: 'Petualangan Goa & Snorkeling',
            activities: [
              '08:00 - Sarapan keluarga',
              '09:00 - Goa Langir adventure (dengan guide)',
              '12:00 - Makan siang',
              '14:00 - Snorkeling di Karang Taraje',
              '16:00 - Area bermain anak di pantai',
            '18:00 - Makan malam'
          ]
        },
        {
          day: 3,
            title: 'Eksplorasi Pantai & Aktivitas Air',
          activities: [
              '08:00 - Sarapan keluarga',
              '09:00 - Eksplorasi Pantai Legon Pari',
            '12:00 - Makan siang',
              '14:00 - Snorkeling di Karang Bokor',
              '17:00 - Sunset family time di Tanjung Layar'
            ]
          }
        ],
        '4': [
          {
            day: 1,
            title: 'Kedatangan & Eksplorasi Pantai',
            activities: [
              '14:00 - Check-in dan istirahat',
              '16:00 - Jalan-jalan ke Pantai Sawarna (aman untuk anak)',
              '18:00 - Makan malam keluarga'
            ]
          },
          {
            day: 2,
            title: 'Petualangan Goa & Snorkeling',
            activities: [
              '08:00 - Sarapan keluarga',
              '09:00 - Goa Langir adventure (dengan guide)',
              '12:00 - Makan siang',
              '14:00 - Snorkeling di Karang Taraje',
              '16:00 - Area bermain anak di pantai',
              '18:00 - Makan malam'
            ]
          },
          {
            day: 3,
            title: 'Eksplorasi Pantai & Aktivitas Air',
            activities: [
              '08:00 - Sarapan keluarga',
              '09:00 - Eksplorasi Pantai Legon Pari',
              '12:00 - Makan siang',
              '14:00 - Snorkeling di Karang Bokor',
              '17:00 - Sunset family time di Tanjung Layar'
            ]
          },
          {
            day: 4,
            title: 'Petualangan Terakhir & Check-out',
            activities: [
              '08:00 - Sarapan keluarga',
              '09:00 - Eksplorasi Pasir Putih',
              '10:00 - Snorkeling di Karang Taraje',
              '12:00 - Makan siang di warung pantai',
              '14:00 - Check-out dan beli oleh-oleh',
              '16:00 - Perjalanan pulang'
            ]
          }
        ]
      },
      terms: [
        'Check-in: 14:00 WIB',
        'Check-out: 11:00 WIB',
        'Pembayaran di muka 50%',
        'Free cancellation 24 jam sebelum check-in'
      ],
      seasonalPricing: {
        regular: { multiplier: 1.0, description: 'Harga Normal' },
        weekend: { multiplier: 1.1, description: 'Harga Weekend' },
        peak: { multiplier: 1.3, description: 'Harga Peak Season (Juni-Agustus)' }
      },
      
      addOns: {
        'extra-bed': { name: 'Tempat Tidur Tambahan', price: 50000, description: 'Untuk tamu tambahan' },
        'guided-tour': { name: 'Tour Guide', price: 150000, description: 'Pemandu wisata lokal' },
        'campfire': { name: 'Api Unggun', price: 150000, description: 'Api unggun di pantai' },
        'live-music': { name: 'Organ + 2 Singer', price: 1200000, description: 'Hiburan musik live dengan organ dan 2 penyanyi' },
        'barbaque-standard': { name: 'Barbaque Standar', price: 120000, description: 'Paket barbaque standar' },
        'barbaque-medium': { name: 'Barbaque Medium', price: 300000, description: 'Paket barbaque medium' },
        'kambing-guling': { name: 'Kambing Guling', price: 1250000, description: 'Kambing guling utuh' }
      }
    },
    'standard-1': {
      name: 'Paket Lengkap',
      category: 'standard',
      basePrice: 400000,
      originalPrice: 600000,
      discount: '33%',
      image: '/images/paket-lengkap.webp',
      location: 'Villa Sawarna Premium',
      rating: 4.7,
      reviewCount: 156,
      description: 'Paket lengkap dengan fasilitas premium dan view pantai yang menakjubkan.',
      features: [
        'Kamar AC',
        'Kamar mandi dalam dengan shower',
        'WiFi',
        'Room service'
      ],
             mealPlans: {
         '2x': { price: 85000, description: 'Sarapan + Makan siang/malam + Snack' },
         '3x': { price: 115000, description: 'Sarapan + Makan siang + Makan malam + Snack' }
       },
      duration: {
        '1': { price: 400000, discount: '0%' },
        '2': { price: 750000, discount: '6%' },
        '3': { price: 1100000, discount: '8%' },
        '4': { price: 1400000, discount: '12%' }
      },
      itinerary: {
        '1': [
        {
          day: 1,
            title: 'Luxury Experience Sehari',
          activities: [
            '15:00 - Welcome drink dan check-in',
              '16:00 - Jalan-jalan ke Pantai Sawarna',
              '18:00 - Sunset dinner di Tanjung Layar',
              '20:00 - Istirahat malam'
            ]
          }
        ],
                '2': [
          {
            day: 1,
            title: 'Luxury Check-in & Eksplorasi Pantai',
            activities: [
              '15:00 - Welcome drink dan check-in',
              '16:00 - Jalan-jalan ke Pantai Sawarna',
              '18:00 - Sunset dinner di Tanjung Layar',
              '20:00 - Istirahat malam'
          ]
        },
        {
          day: 2,
            title: 'Petualangan Premium',
          activities: [
            '07:00 - Sarapan buffet',
              '09:00 - Private tour ke Goa Langir',
              '12:00 - Makan siang premium',
              '14:00 - Snorkeling di Karang Taraje',
              '17:00 - Sunset cocktail di Bukit Cinta',
              '19:00 - Makan malam premium di warung lokal'
            ]
          }
        ],
                '3': [
          {
            day: 1,
            title: 'Luxury Check-in & Eksplorasi Pantai',
            activities: [
              '15:00 - Welcome drink dan check-in',
              '16:00 - Jalan-jalan ke Pantai Sawarna',
              '18:00 - Sunset dinner di Tanjung Layar',
              '20:00 - Istirahat malam'
            ]
          },
          {
            day: 2,
            title: 'Petualangan Premium',
            activities: [
              '07:00 - Sarapan buffet',
              '09:00 - Private tour ke Goa Langir',
              '12:00 - Makan siang premium',
              '14:00 - Snorkeling di Karang Taraje',
              '17:00 - Sunset cocktail di Bukit Cinta',
            '19:00 - Fine dining experience'
          ]
        },
        {
          day: 3,
            title: 'Eksplorasi Pantai Premium',
          activities: [
            '08:00 - Sarapan sehat',
              '09:00 - Eksplorasi Pantai Legon Pari',
              '11:00 - Snorkeling di Karang Bokor',
            '13:00 - Makan siang sehat',
              '15:00 - Sunset di Bukit Cinta',
              '17:00 - Makan malam premium'
            ]
          }
        ],
        '4': [
          {
            day: 1,
            title: 'Luxury Check-in & Eksplorasi Pantai',
            activities: [
              '15:00 - Welcome drink dan check-in',
              '16:00 - Jalan-jalan ke Pantai Sawarna',
              '18:00 - Sunset dinner di Tanjung Layar',
              '20:00 - Istirahat malam'
            ]
          },
          {
            day: 2,
            title: 'Petualangan Premium',
            activities: [
              '07:00 - Sarapan buffet',
              '09:00 - Private tour ke Goa Langir',
              '12:00 - Makan siang premium',
              '14:00 - Snorkeling di Karang Taraje',
              '17:00 - Sunset cocktail di Bukit Cinta',
              '19:00 - Fine dining experience'
            ]
          },
          {
            day: 3,
            title: 'Eksplorasi Pantai Premium',
            activities: [
              '08:00 - Sarapan sehat',
              '09:00 - Eksplorasi Pantai Legon Pari',
              '11:00 - Snorkeling di Karang Bokor',
              '13:00 - Makan siang sehat',
              '15:00 - Sunset di Bukit Cinta',
              '17:00 - Makan malam premium'
            ]
          },
          {
            day: 4,
            title: 'Petualangan Terakhir Premium',
            activities: [
              '08:00 - Sarapan premium',
              '09:00 - Eksplorasi Pasir Putih',
              '10:00 - Snorkeling di Karang Taraje',
              '12:00 - Makan siang premium di warung lokal',
              '14:00 - Check-out dan transfer',
              '15:00 - Perjalanan pulang dengan kenangan indah'
            ]
          }
        ]
      },
      terms: [
        'Check-in: 15:00 WIB',
        'Check-out: 12:00 WIB',
        'Pembayaran di muka 50%',
        'Free cancellation 48 jam sebelum check-in'
      ],
      seasonalPricing: {
        regular: { multiplier: 1.0, description: 'Harga Normal' },
        weekend: { multiplier: 1.1, description: 'Harga Weekend' },
        peak: { multiplier: 1.3, description: 'Harga Peak Season (Juni-Agustus)' }
      },
      
      addOns: {
        'extra-bed': { name: 'Tempat Tidur Tambahan', price: 50000, description: 'Untuk tamu tambahan' },
        'guided-tour': { name: 'Tour Guide', price: 150000, description: 'Pemandu wisata lokal' },
        'campfire': { name: 'Api Unggun', price: 150000, description: 'Api unggun di pantai' },
        'live-music': { name: 'Organ + 2 Singer', price: 1200000, description: 'Hiburan musik live dengan organ dan 2 penyanyi' },
        'barbaque-standard': { name: 'Barbaque Standar', price: 120000, description: 'Paket barbaque standar' },
        'barbaque-medium': { name: 'Barbaque Medium', price: 300000, description: 'Paket barbaque medium' },
        'kambing-guling': { name: 'Kambing Guling', price: 1250000, description: 'Kambing guling utuh' }
      }
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
     let total = 0;
     
     // Paket makan - HARUS dikalikan jumlah tamu DAN durasi menginap
     const mealPrice = currentPackage.mealPlans[selectedMealPlan as keyof typeof currentPackage.mealPlans].price;
     const duration = parseInt(selectedDuration);
     total += mealPrice * guestCount * duration;
     
     // Durasi menginap - Harga kamar tetap, tidak dikalikan jumlah tamu
     const durationPrice = getTotalDurationPrice(selectedDuration, guestCount);
     total += durationPrice;
     
     // Multiplier musim
     if (currentPackage.seasonalPricing && selectedSeason !== 'regular') {
       const multiplier = currentPackage.seasonalPricing[selectedSeason as keyof typeof currentPackage.seasonalPricing].multiplier;
       total = total * multiplier;
     }
     
     // Add-ons
     if (currentPackage.addOns) {
       selectedAddOns.forEach(addonKey => {
         const addon = currentPackage.addOns[addonKey as keyof typeof currentPackage.addOns] as { name: string; price: number; description: string };
         total += addon.price;
       });
     }
     
     return Math.round(total);
   };

  // Fungsi untuk menghitung jumlah kamar yang diperlukan
  const getRequiredRooms = () => {
    return Math.ceil(guestCount / maxGuestsPerRoom);
  };

  // Fungsi untuk mendapatkan kapasitas kamar saat ini
  const getCurrentRoomCapacity = () => {
    return maxGuestsPerRoom;
  };

  // Fungsi untuk menghitung harga durasi berdasarkan jumlah tamu
  const getDurationPriceByGuests = (duration: string, guestCount: number) => {
    const basePrice = currentPackage.duration[duration as keyof typeof currentPackage.duration].price;
    
    // Harga kamar tetap per kamar, tidak dibagi per tamu
    // 1-4 orang = 1 kamar, 5+ orang = 2 kamar atau lebih
    if (guestCount <= maxGuestsPerRoom) {
      // Harga per orang = harga kamar / jumlah tamu (semakin banyak tamu, semakin murah per orang)
      return Math.round(basePrice / guestCount);
    } else {
      // Jika lebih dari kapasitas kamar, perlu kamar tambahan
      const requiredRooms = Math.ceil(guestCount / maxGuestsPerRoom);
      const totalPrice = basePrice * requiredRooms;
      return Math.round(totalPrice / guestCount);
    }
  };

  // Fungsi untuk menghitung total harga durasi
  const getTotalDurationPrice = (duration: string, guestCount: number) => {
    const basePrice = currentPackage.duration[duration as keyof typeof currentPackage.duration].price;
    
    if (guestCount <= maxGuestsPerRoom) {
      // 1 kamar untuk semua tamu (1-4 orang)
      return basePrice;
    } else {
      // Perlu kamar tambahan (5+ orang)
      const requiredRooms = Math.ceil(guestCount / maxGuestsPerRoom);
      return basePrice * requiredRooms;
    }
  };

  // Fungsi untuk mendapatkan detail perhitungan harga
  const getPriceBreakdown = () => {
    const basePrice = currentPackage.duration[selectedDuration as keyof typeof currentPackage.duration].price;
    const mealPrice = currentPackage.mealPlans[selectedMealPlan as keyof typeof currentPackage.mealPlans].price;
    const requiredRooms = Math.ceil(guestCount / maxGuestsPerRoom);
    
    return {
      accommodation: {
        basePrice: basePrice,
        requiredRooms: requiredRooms,
        totalPrice: basePrice * requiredRooms,
        pricePerPerson: Math.round((basePrice * requiredRooms) / guestCount),
        explanation: guestCount <= maxGuestsPerRoom 
          ? `${guestCount} orang dalam 1 kamar (kapasitas maksimal ${maxGuestsPerRoom} orang)`
          : `${guestCount} orang memerlukan ${requiredRooms} kamar (${maxGuestsPerRoom} orang per kamar)`
      },
      meals: {
        pricePerPerson: mealPrice,
        totalPrice: mealPrice * guestCount * parseInt(selectedDuration),
        explanation: `Paket makan ${selectedMealPlan} untuk ${guestCount} orang × ${selectedDuration} hari = ${mealPrice * guestCount * parseInt(selectedDuration)}`
      },
      season: currentPackage.seasonalPricing && selectedSeason !== 'regular' 
        ? {
            multiplier: currentPackage.seasonalPricing[selectedSeason as keyof typeof currentPackage.seasonalPricing].multiplier,
            description: currentPackage.seasonalPricing[selectedSeason as keyof typeof currentPackage.seasonalPricing].description
          }
        : null,
      addOns: selectedAddOns.map(addonKey => {
        const addon = currentPackage.addOns[addonKey as keyof typeof currentPackage.addOns] as { name: string; price: number; description: string };
        return {
          name: addon.name,
          price: addon.price,
          description: addon.description
        };
      })
    };
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

      {/* Kalkulator Harga Lengkap */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
                     <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-4">
               Kalkulator Harga Paket
             </h2>
             <p className="text-gray-600 dark:text-gray-300 mb-2">
               Hitung total biaya dengan detail lengkap sesuai kebutuhan Anda
             </p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 max-w-3xl mx-auto">
                 <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                   <div className="font-bold text-base mb-2">📋 Cara Perhitungan Harga:</div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <div>
                       <div className="font-semibold">🏨 Akomodasi (Harga Kamar Tetap):</div>
                       <div className="text-xs mt-1">
                         • 1-{maxGuestsPerRoom} orang = 1 kamar (harga sama)<br/>
                         • {maxGuestsPerRoom + 1}-{maxGuestsPerRoom * 2} orang = 2 kamar (harga 2x lipat/2hari)<br/>
                         • {maxGuestsPerRoom * 2 + 1}-{maxGuestsPerRoom * 3} orang = 3 kamar (harga 3x lipat/3hari)<br/>
                         • Semakin banyak tamu per kamar, semakin murah per orang
                       </div>
                     </div>
                     <div>
                       <div className="font-semibold">🍽️ Paket Makan:</div>
                       <div className="text-xs mt-1">
                         • Dikalikan jumlah tamu<br/>
                         • Setiap orang mendapat paket makan lengkap<br/>
                         • Harga per orang tetap sama
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
           </div>

                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
             {/* Panel Konfigurasi */}
             <div className="lg:col-span-2 space-y-4 lg:space-y-6">
               {/* Paket Makan */}
               <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <CardHeader className="pb-3">
                   <CardTitle className="flex items-center gap-2 text-lg">
                     <Utensils className="w-5 h-5 text-orange-500" />
                     Paket Makan
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                   {Object.entries(currentPackage.mealPlans).map(([plan, details]) => (
                     <div 
                       key={plan}
                       className={`p-3 lg:p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                         selectedMealPlan === plan 
                           ? 'border-ocean bg-ocean/5 shadow-md' 
                           : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50'
                       }`}
                       onClick={() => setSelectedMealPlan(plan)}
                     >
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                         <div className="flex-1">
                           <div className="font-semibold text-gray-900 dark:text-white text-base lg:text-lg">
                             {plan === '2x' ? '2x Makan' : '3x Makan'}
                           </div>
                           <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                             {details.description}
                           </div>
                         </div>
                         <div className="text-right sm:text-left sm:min-w-[120px]">
                           <div className="text-lg lg:text-xl font-bold text-ocean dark:text-ocean-light">
                             Rp {details.price.toLocaleString('id-ID')}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </CardContent>
               </Card>

                             {/* Durasi Menginap */}
               <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <CardHeader className="pb-3">
                   <CardTitle className="flex items-center gap-2 text-lg">
                     <Calendar className="w-5 h-5 text-blue-500" />
                     Durasi Menginap
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                   {Object.entries(currentPackage.duration).map(([days, details]) => (
                     <div 
                       key={days}
                       className={`p-3 lg:p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                         selectedDuration === days 
                           ? 'border-ocean bg-ocean/5 shadow-md' 
                           : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50'
                       }`}
                       onClick={() => setSelectedDuration(days)}
                     >
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                         <div className="flex-1">
                           <div className="font-semibold text-gray-900 dark:text-white text-base lg:text-lg">
                             {days} {days === '1' ? 'Hari' : 'Hari'}
                           </div>
                           <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                             Diskon {details.discount}
                           </div>
                           <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                             Harga per orang: Rp {getDurationPriceByGuests(days, guestCount).toLocaleString('id-ID')}
                           </div>
                           <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                             Total: Rp {getTotalDurationPrice(days, guestCount).toLocaleString('id-ID')} ({getRequiredRooms()} kamar)
                           </div>
                           <div className="text-xs text-coral dark:text-coral-light mt-1 font-medium">
                             Total per orang: Rp {Math.round((getTotalDurationPrice(days, guestCount) + (currentPackage.mealPlans[selectedMealPlan as keyof typeof currentPackage.mealPlans].price * guestCount * parseInt(days))) / guestCount).toLocaleString('id-ID')}
                           </div>
                         </div>
                         <div className="text-right sm:text-left sm:min-w-[120px]">
                           <div className="text-lg lg:text-xl font-bold text-ocean dark:text-ocean-light">
                             Rp {details.price.toLocaleString('id-ID')}
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </CardContent>
               </Card>

                                                           {/* Jumlah Tamu */}
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-green-500" />
                      Jumlah Tamu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center justify-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          disabled={guestCount <= 1}
                          className="w-10 h-10 rounded-full p-0 text-lg font-bold hover:bg-ocean hover:text-white transition-colors"
                        >
                          -
                        </Button>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white min-w-[4rem] text-center">
                          {guestCount}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestCount(guestCount + 1)}
                          disabled={guestCount >= maxTotalGuests} // Maksimal 100 tamu
                          className="w-10 h-10 rounded-full p-0 text-lg font-bold hover:bg-ocean hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </Button>
                      </div>
                      <div className="text-center sm:text-left">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {guestCount} tamu
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Paket makan × {guestCount} orang
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          Kamar: {getRequiredRooms()} × {getCurrentRoomCapacity()} orang
                        </div>
                        <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Harga per orang: Rp {getDurationPriceByGuests(selectedDuration, guestCount).toLocaleString('id-ID')}
                        </div>
                        <div className="text-xs text-coral dark:text-coral-light mt-1 font-medium">
                          Total per orang: Rp {Math.round(calculateTotalPrice() / guestCount).toLocaleString('id-ID')}
                        </div>
                        {(() => {
                          const breakdown = getPriceBreakdown();
                          return (
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="font-medium mb-1">Detail Perhitungan:</div>
                              <div>• {breakdown.accommodation.explanation}</div>
                              <div>• Harga kamar: Rp {breakdown.accommodation.basePrice.toLocaleString('id-ID')}</div>
                        {getRequiredRooms() > 1 && (
                                <div className="text-orange-600 font-medium mt-1">
                                  ⚠️ Memerlukan {getRequiredRooms()} kamar (harga {getRequiredRooms()}x lipat/{selectedDuration}hari)
                          </div>
                        )}
                            </div>
                          );
                        })()}
                        {guestCount >= maxTotalGuests && (
                          <div className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                            🚫 Maksimal {maxTotalGuests} tamu
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                             {/* Musim & Tanggal */}
               {currentPackage.seasonalPricing && (
                 <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                   <CardHeader className="pb-3">
                     <CardTitle className="flex items-center gap-2 text-lg">
                       <Clock className="w-5 h-5 text-purple-500" />
                       Musim & Tanggal
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                         Tanggal Check-in
                       </label>
                       <input
                         type="date"
                         value={checkInDate}
                         onChange={(e) => setCheckInDate(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-ocean focus:border-transparent transition-colors"
                         title="Pilih tanggal check-in"
                         placeholder="Pilih tanggal"
                       />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                       {Object.entries(currentPackage.seasonalPricing).map(([season, details]) => (
                         <div 
                           key={season}
                           className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center hover:scale-[1.02] ${
                             selectedSeason === season 
                               ? 'border-ocean bg-ocean/5 shadow-md' 
                               : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50'
                           }`}
                           onClick={() => setSelectedSeason(season)}
                         >
                           <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                             {season === 'regular' ? 'Normal' : season === 'weekend' ? 'Weekend' : 'Peak Season'}
                           </div>
                           <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                             {details.description}
                           </div>
                           <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                             details.multiplier === 1 
                               ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                               : 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                           }`}>
                             {details.multiplier === 1 ? 'Harga Normal' : `${Math.round((details.multiplier - 1) * 100)}% lebih tinggi`}
                           </div>
                         </div>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               )}

                             {/* Add-ons */}
               {currentPackage.addOns && (
                 <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                   <CardHeader className="pb-3">
                     <CardTitle className="flex items-center gap-2 text-lg">
                       <Plus className="w-5 h-5 text-indigo-500" />
                       Layanan Tambahan
                     </CardTitle>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {Object.entries(currentPackage.addOns).map(([key, addon]: [string, { name: string; price: number; description: string }]) => (
                         <div 
                           key={key}
                           className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                             selectedAddOns.includes(key)
                               ? 'border-ocean bg-ocean/5 shadow-md' 
                               : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50'
                           }`}
                           onClick={() => {
                             if (selectedAddOns.includes(key)) {
                               setSelectedAddOns(selectedAddOns.filter(item => item !== key));
                             } else {
                               setSelectedAddOns([...selectedAddOns, key]);
                             }
                           }}
                         >
                           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                             <div className="flex-1">
                               <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                 {addon.name}
                               </div>
                               <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                 {addon.description}
                               </div>
                             </div>
                             <div className="text-center sm:text-right sm:min-w-[100px]">
                               <div className="text-sm font-bold text-ocean dark:text-ocean-light">
                                 Rp {addon.price.toLocaleString('id-ID')}
                               </div>
                               <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                                 selectedAddOns.includes(key) 
                                   ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                                   : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                               }`}>
                                 {selectedAddOns.includes(key) ? '✓ Dipilih' : 'Klik untuk pilih'}
                               </div>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               )}
            </div>

                         {/* Panel Total Harga */}
             <div className="lg:col-span-1">
               <Card className="border border-ocean/20 bg-gradient-to-r from-ocean/5 to-blue-50 dark:from-ocean/10 dark:to-blue-900/20 shadow-lg sticky top-4">
                 <CardHeader className="pb-3">
                   <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                     <div className="w-2 h-2 bg-ocean rounded-full"></div>
                     Total Biaya Paket
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                                       {/* Breakdown Harga */}
                    <div className="space-y-3 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                      {(() => {
                        const breakdown = getPriceBreakdown();
                        return (
                          <>
                            {/* Akomodasi */}
                            <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                  Akomodasi ({selectedDuration} hari)
                        </span>
                        <span className="font-medium">
                                  Rp {breakdown.accommodation.totalPrice.toLocaleString('id-ID')}
                        </span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                {breakdown.accommodation.explanation}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                Rp {breakdown.accommodation.pricePerPerson.toLocaleString('id-ID')} per orang
                              </div>
                      </div>
                      
                            {/* Paket Makan */}
                            <div className="space-y-2">
                                             <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                  Paket Makan ({selectedMealPlan})
                         </span>
                         <span className="font-medium">
                                  Rp {breakdown.meals.totalPrice.toLocaleString('id-ID')}
                         </span>
                       </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 pl-2">
                                {breakdown.meals.explanation}
                              </div>
                            </div>
                          </>
                        );
                      })()}

                      

                     {currentPackage.seasonalPricing && selectedSeason !== 'regular' && (
                       <div className="flex justify-between text-sm">
                         <span className="text-gray-600 dark:text-gray-400">
                           {selectedSeason === 'weekend' ? 'Weekend' : 'Peak Season'} multiplier
                         </span>
                         <span className="font-medium text-orange-600">
                           +{Math.round((currentPackage.seasonalPricing[selectedSeason as keyof typeof currentPackage.seasonalPricing].multiplier - 1) * 100)}%
                         </span>
                       </div>
                     )}

                     {selectedAddOns.length > 0 && (
                       <>
                         <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                           <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Layanan Tambahan:</div>
                           {selectedAddOns.map((addonKey) => {
                             const addon = currentPackage.addOns[addonKey as keyof typeof currentPackage.addOns] as { name: string; price: number; description: string };
                             return (
                               <div key={addonKey} className="flex justify-between text-sm">
                                 <span className="text-gray-600 dark:text-gray-400">{addon.name}</span>
                                 <span className="font-medium text-green-600">+Rp {addon.price.toLocaleString('id-ID')}</span>
                               </div>
                             );
                           })}
                         </div>
                       </>
                     )}
                   </div>

                   {/* Total */}
                   <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                     <div className="flex justify-between items-center">
                       <span className="text-lg font-bold text-gray-900 dark:text-white">Total Biaya</span>
                       <div className="text-right">
                         <div className="text-2xl lg:text-3xl font-bold text-ocean dark:text-ocean-light">
                           Rp {calculateTotalPrice().toLocaleString('id-ID')}
                         </div>
                         <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                           Harga per orang: Rp {Math.round(calculateTotalPrice() / guestCount).toLocaleString('id-ID')}
                         </div>
                         <div className="text-xs text-gray-500 mt-1">
                           *Harga sudah termasuk semua biaya dan layanan
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* CTA Buttons */}
                   <div className="space-y-3 pt-4">
                     <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya tertarik dengan ${currentPackage.name} dengan konfigurasi:

📋 Detail Paket:
• Paket makan: ${selectedMealPlan}
• Durasi: ${selectedDuration} hari
• Jumlah tamu: ${guestCount} orang
• Musim: ${selectedSeason === 'regular' ? 'Normal' : selectedSeason === 'weekend' ? 'Weekend' : 'Peak Season'}

🏨 Detail Akomodasi:
• ${guestCount} orang memerlukan ${getRequiredRooms()} kamar
• Harga per orang: Rp ${getDurationPriceByGuests(selectedDuration, guestCount).toLocaleString('id-ID')}
• Total akomodasi: Rp ${getTotalDurationPrice(selectedDuration, guestCount).toLocaleString('id-ID')}

🍽️ Detail Makan:
• Paket makan ${selectedMealPlan} untuk ${guestCount} orang × ${selectedDuration} hari
• Total makan: Rp ${(currentPackage.mealPlans[selectedMealPlan as keyof typeof currentPackage.mealPlans].price * guestCount * parseInt(selectedDuration)).toLocaleString('id-ID')}

${selectedAddOns.length > 0 ? `🔧 Layanan Tambahan: ${selectedAddOns.map(key => (currentPackage.addOns[key as keyof typeof currentPackage.addOns] as { name: string; price: number; description: string }).name).join(', ')}` : ''}

💰 Total Biaya: Rp ${calculateTotalPrice().toLocaleString('id-ID')}
💵 Harga per orang: Rp ${Math.round(calculateTotalPrice() / guestCount).toLocaleString('id-ID')}

Mohon info ketersediaan dan proses pemesanan.`)}`} target="_blank" rel="noopener noreferrer">
                       <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                         <Phone className="w-5 h-5 mr-2" />
                         Pesan via WhatsApp
                       </Button>
                     </a>
                     
                     <Button 
                       variant="outline" 
                       className="w-full hover:bg-ocean hover:text-white hover:border-ocean transition-all duration-300"
                       onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                     >
                       {showPriceBreakdown ? 'Sembunyikan' : 'Lihat'} Detail Perhitungan
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             </div>
          </div>

          {/* Detail Perhitungan */}
          {showPriceBreakdown && (
            <div className="mt-8">
              <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-ocean rounded-full"></div>
                    Detail Perhitungan Harga
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          <th className="text-left py-2 sm:py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Komponen</th>
                          <th className="text-right py-2 sm:py-3 px-1 font-medium text-gray-700 dark:text-gray-300">Harga</th>
                          <th className="text-right py-2 sm:py-3 px-1 font-medium text-gray-700 dark:text-gray-300">Mult</th>
                          <th className="text-right py-2 sm:py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {(() => {
                          const breakdown = getPriceBreakdown();
                          return (
                            <>
                              {/* Akomodasi */}
                              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="py-2 sm:py-3 px-2 text-gray-700 dark:text-gray-300">
                                  <div>
                                    <div className="font-medium text-xs sm:text-sm">Akomodasi ({selectedDuration}h)</div>
                                    <div className="text-xs text-gray-500 mt-1 leading-tight">
                                      {breakdown.accommodation.explanation}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right px-1 text-xs sm:text-sm">Rp {breakdown.accommodation.basePrice.toLocaleString('id-ID')}</td>
                                <td className="text-right px-1 text-xs sm:text-sm">{breakdown.accommodation.requiredRooms}.0x</td>
                                <td className="text-right px-2 font-medium text-xs sm:text-sm">Rp {breakdown.accommodation.totalPrice.toLocaleString('id-ID')}</td>
                              </tr>
                              
                              {/* Paket Makan */}
                              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="py-2 sm:py-3 px-2 text-gray-700 dark:text-gray-300">
                                  <div>
                                    <div className="font-medium text-xs sm:text-sm">Makan ({selectedMealPlan})</div>
                                    <div className="text-xs text-gray-500 mt-1 leading-tight">
                                      {breakdown.meals.explanation}
                                    </div>
                                  </div>
                                </td>
                                <td className="text-right px-1 text-xs sm:text-sm">Rp {breakdown.meals.pricePerPerson.toLocaleString('id-ID')}</td>
                                <td className="text-right px-1 text-xs sm:text-sm">{guestCount}×{selectedDuration}</td>
                                <td className="text-right px-2 font-medium text-xs sm:text-sm">Rp {breakdown.meals.totalPrice.toLocaleString('id-ID')}</td>
                              </tr>
                            </>
                          );
                        })()}
                        
                        {currentPackage.seasonalPricing && selectedSeason !== 'regular' && (
                          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="py-2 sm:py-3 px-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">Multiplier Musim</td>
                            <td className="text-right px-1 text-xs sm:text-sm">-</td>
                            <td className="text-right px-1 text-xs sm:text-sm">{currentPackage.seasonalPricing[selectedSeason as keyof typeof currentPackage.seasonalPricing].multiplier.toFixed(1)}x</td>
                            <td className="text-right px-2 font-medium text-xs sm:text-sm text-orange-600">
                              +{Math.round((currentPackage.seasonalPricing[selectedSeason as keyof typeof currentPackage.seasonalPricing].multiplier - 1) * 100)}%
                            </td>
                          </tr>
                        )}
                        {selectedAddOns.length > 0 && (
                          <>
                            {selectedAddOns.map((addonKey) => {
                              const addon = currentPackage.addOns[addonKey as keyof typeof currentPackage.addOns] as { name: string; price: number; description: string };
                              return (
                                <tr key={addonKey} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                  <td className="py-2 sm:py-3 px-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{addon.name}</td>
                                  <td className="text-right px-1 text-xs sm:text-sm">Rp {addon.price.toLocaleString('id-ID')}</td>
                                  <td className="text-right px-1 text-xs sm:text-sm">1.0x</td>
                                  <td className="text-right px-2 font-medium text-xs sm:text-sm text-green-600">+Rp {addon.price.toLocaleString('id-ID')}</td>
                                </tr>
                              );
                            })}
                          </>
                        )}
                        <tr className="border-t-2 border-ocean dark:border-ocean-light font-bold bg-ocean/5 dark:bg-ocean/10">
                          <td className="py-3 sm:py-4 px-2 text-base sm:text-lg text-gray-900 dark:text-white">Total Biaya</td>
                          <td className="text-right px-1"></td>
                          <td className="text-right px-1"></td>
                          <td className="text-right px-2 text-base sm:text-lg text-ocean dark:text-ocean-light">
                            Rp {calculateTotalPrice().toLocaleString('id-ID')}
                          </td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800/50">
                          <td className="py-2 sm:py-3 px-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">Harga per Orang</td>
                          <td className="text-right px-1"></td>
                          <td className="text-right px-1"></td>
                          <td className="text-right px-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                            Rp {Math.round(calculateTotalPrice() / guestCount).toLocaleString('id-ID')}
                          </td>
                        </tr>
                        <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                          <td className="py-3 sm:py-4"></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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

             {(() => {
               // Handle different itinerary structures
               let itineraryData: Array<{day: number; title: string; activities: string[]}> = [];
               
               try {
                 if (typeof currentPackage.itinerary === 'object' && currentPackage.itinerary !== null) {
                // For packages with nested structure
                   if (currentPackage.itinerary[selectedDuration] && Array.isArray(currentPackage.itinerary[selectedDuration])) {
                     itineraryData = currentPackage.itinerary[selectedDuration];
                   } else if (Array.isArray(currentPackage.itinerary)) {
                  // For packages with direct array structure
                     itineraryData = currentPackage.itinerary;
                   }
                 }
               } catch (error) {
                 console.error('Error processing itinerary:', error);
                 itineraryData = [];
               }
               
               // Ensure itineraryData is always an array
               if (!Array.isArray(itineraryData)) {
                 itineraryData = [];
               }
               
            return (
              <Tabs defaultValue="day-1" className="w-full">
                <TabsList className={`grid w-full mb-8 ${itineraryData.length === 1 ? 'grid-cols-1' : itineraryData.length === 2 ? 'grid-cols-2' : itineraryData.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                  {itineraryData.map((day) => (
                    <TabsTrigger 
                      key={day.day} 
                      value={`day-${day.day}`}
                      className="flex items-center gap-2"
                    >
                      <div className="w-6 h-6 rounded-full bg-ocean text-white flex items-center justify-center text-xs font-bold">
                        {day.day}
                      </div>
                      <span className="hidden sm:inline">Hari {day.day}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {itineraryData.map((day) => (
                  <TabsContent key={day.day} value={`day-${day.day}`}>
                    <Card className="border border-gray-200 dark:border-gray-700">
                   <CardHeader>
                     <CardTitle className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-ocean text-white flex items-center justify-center font-bold text-lg">
                         {day.day}
                       </div>
                          <div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{day.title}</span>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Hari ke-{day.day} dari {selectedDuration} hari perjalanan
                            </p>
                          </div>
                     </CardTitle>
                   </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {day.activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                              <Clock className="w-5 h-5 text-ocean mt-1 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                 </Card>
                  </TabsContent>
                ))}
              </Tabs>
            );
             })()}
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

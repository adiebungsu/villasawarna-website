import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Car, Users, CheckCircle2, Navigation, Phone, Star, Shield, Calendar, User, Mail, Camera, Wifi, Coffee, Utensils, CreditCard, AlertCircle, Info, ChevronDown, ChevronUp, Fuel, Settings, Luggage, Baby, Wifi as WifiIcon, Snowflake, Bus } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const AREA_DATA: Record<string, {
  city: string;
  description: string;
  image: string;
  distanceKm: string;
  duration: string;
  priceFrom: string;
  pickupPoints: string[];
  popularRoutes: { from: string; to: string; duration: string }[];
  features: string[];
  gallery: string[];
  testimonials: { name: string; location: string; rating: number; comment: string; date: string }[];
  faq: { question: string; answer: string }[];
  additionalInfo: {
    bestTime: string;
    weather: string;
    roadCondition: string;
    tips: string[];
  };
  pricing: {
    base: string;
    peak: string;
    weekend: string;
    includes: string[];
  };
}> = {
  'jakarta': {
    city: 'Jakarta',
    description: 'Penjemputan dari seluruh Jakarta (Pusat, Barat, Timur, Utara, Selatan).',
    image: '/images/jakarta-sawarna.webp',
    distanceKm: '≈ 230 km',
    duration: '≈ 6–7 jam',
    priceFrom: 'Mulai Rp 1.200.000',
    pickupPoints: [
      'Bandara Soekarno-Hatta (CGK)',
      'Bandara Halim Perdanakusuma (HLP)',
      'Stasiun Gambir',
      'Stasiun Jakarta Kota',
      'Mall Kelapa Gading',
      'Plaza Senayan'
    ],
    popularRoutes: [
      { from: 'Jakarta Pusat', to: 'Sawarna', duration: '6 jam' },
      { from: 'Jakarta Selatan', to: 'Sawarna', duration: '6.5 jam' },
      { from: 'Jakarta Utara', to: 'Sawarna', duration: '7 jam' }
    ],
    features: [
      'Penjemputan door-to-door',
      'Driver berpengalaman rute Jakarta',
      'Armada nyaman & terawat',
      'Termasuk tol & parkir (opsional)',
      'Air mineral gratis'
    ],
    gallery: [
      '/images/jakarta-sawarna.webp',
      '/images/sawarna-beach-3.jpeg',
      '/images/sawarna-beach-2.jpeg',
      '/images/hero-sawarna.jpg'
    ],
    testimonials: [
      {
        name: 'Rina Sari',
        location: 'Jakarta Selatan',
        rating: 5,
        comment: 'Driver sangat ramah dan on-time. Perjalanan dari Jakarta ke Sawarna lancar tanpa hambatan. Armada bersih dan nyaman.',
        date: '2 minggu lalu'
      },
      {
        name: 'Budi Santoso',
        location: 'Jakarta Pusat',
        rating: 5,
        comment: 'Harga sesuai, pelayanan excellent. Driver berpengalaman dan tahu rute terbaik. Highly recommended!',
        date: '1 bulan lalu'
      }
    ],
    faq: [
      {
        question: 'Berapa lama perjalanan dari Jakarta ke Sawarna?',
        answer: 'Perjalanan normal memakan waktu 6-7 jam tergantung kondisi lalu lintas dan lokasi penjemputan di Jakarta.'
      },
      {
        question: 'Apakah harga sudah termasuk tol dan parkir?',
        answer: 'Harga dasar belum termasuk tol dan parkir. Namun bisa ditambahkan sesuai permintaan dengan biaya tambahan.'
      },
      {
        question: 'Bisakah penjemputan di malam hari?',
        answer: 'Ya, kami melayani penjemputan 24 jam. Namun ada biaya tambahan untuk layanan malam hari (22:00-06:00).'
      }
    ],
    additionalInfo: {
      bestTime: 'Pagi hari (06:00-08:00) untuk menghindari macet',
      weather: 'Cuaca tropis, siapkan payung dan jaket ringan',
      roadCondition: 'Jalan tol dan nasional dalam kondisi baik',
      tips: [
        'Berangkat pagi untuk menghindari macet',
        'Bawa bekal makanan ringan',
        'Siapkan charger HP dan powerbank',
        'Bawa obat-obatan pribadi jika diperlukan'
      ]
    },
    pricing: {
      base: 'Rp 1.200.000',
      peak: 'Rp 1.400.000 (libur nasional)',
      weekend: 'Rp 1.300.000 (Sabtu-Minggu)',
      includes: ['Driver', 'Bensin', 'Air mineral', 'Tol (opsional)', 'Parkir (opsional)']
    }
  },
  'bogor': {
    city: 'Bogor',
    description: 'Layanan dari Kota/Kabupaten Bogor, Sentul, dan sekitarnya.',
    image: '/images/bogor-sawarna.webp',
    distanceKm: '≈ 180 km',
    duration: '≈ 5–6 jam',
    priceFrom: 'Mulai Rp 1.100.000',
    pickupPoints: [
      'Stasiun Bogor',
      'Sentul City',
      'Bogor Trade Mall',
      'Botani Square',
      'IPB Dramaga',
      'Cibinong'
    ],
    popularRoutes: [
      { from: 'Bogor Kota', to: 'Sawarna', duration: '5 jam' },
      { from: 'Sentul', to: 'Sawarna', duration: '5.5 jam' },
      { from: 'Cibinong', to: 'Sawarna', duration: '6 jam' }
    ],
    features: [
      'Rute tercepat ke Sawarna',
      'Driver lokal berpengalaman',
      'Harga lebih ekonomis',
      'Fleksibel jadwal penjemputan',
      'Termasuk bensin & tol'
    ],
    gallery: [
      '/images/bogor-sawarna.webp',
      '/images/sawarna-beach-2.jpeg',
      '/images/hero-sawarna.jpg',
      '/images/penginapan-sawarna.webp'
    ],
    testimonials: [
      {
        name: 'Sari Dewi',
        location: 'Bogor',
        rating: 5,
        comment: 'Dari Bogor ke Sawarna sangat cepat dan nyaman. Driver tahu jalan pintas yang aman.',
        date: '1 minggu lalu'
      }
    ],
    faq: [
      {
        question: 'Mengapa dari Bogor lebih cepat ke Sawarna?',
        answer: 'Bogor memiliki akses langsung ke jalur selatan yang lebih dekat ke Sawarna dibandingkan dari Jakarta.'
      },
      {
        question: 'Berapa lama perjalanan dari Bogor ke Sawarna?',
        answer: 'The typical journey takes 5–6 hours depending on traffic conditions and your pickup location in Bogor.'
      },
      {
        question: 'Apakah harga sudah termasuk tol dan parkir?',
        answer: 'The base price includes tolls and parking. No additional fees for these components.'
      }
    ],
    additionalInfo: {
      bestTime: 'Pagi hari untuk menghindari hujan',
      weather: 'Cenderung hujan, siapkan payung',
      roadCondition: 'Jalan nasional dalam kondisi baik',
      tips: ['Bawa payung', 'Berangkat pagi', 'Siapkan makanan ringan']
    },
    pricing: {
      base: 'Rp 1.100.000',
      peak: 'Rp 1.250.000',
      weekend: 'Rp 1.200.000',
      includes: ['Driver', 'Bensin', 'Tol', 'Air mineral']
    }
  },
  'bandung': {
    city: 'Bandung',
    description: 'Antar-jemput dari Bandung Raya (Kota/Kabupaten, Cimahi, Sumedang).',
    image: '/images/bandung-sawarna.webp',
    distanceKm: '≈ 260 km',
    duration: '≈ 7–8 jam',
    priceFrom: 'Mulai Rp 1.300.000',
    pickupPoints: [
      'Bandara Husein Sastranegara (BDO)',
      'Stasiun Bandung',
      'Cihampelas Walk',
      'Paris Van Java',
      'Trans Studio Mall',
      'Cimahi'
    ],
    popularRoutes: [
      { from: 'Bandung Kota', to: 'Sawarna', duration: '7 jam' },
      { from: 'Cimahi', to: 'Sawarna', duration: '7.5 jam' },
      { from: 'Sumedang', to: 'Sawarna', duration: '8 jam' }
    ],
    features: [
      'Perjalanan via jalur selatan',
      'Pemandangan alam menawan',
      'Stop over di destinasi wisata',
      'Driver berpengalaman rute Bandung',
      'Armada nyaman untuk perjalanan jauh'
    ],
    gallery: [
      '/images/bandung-sawarna.webp',
      '/images/sawarna-beach-2.jpeg',
      '/images/hero-sawarna.jpg',
      '/images/karang-taraje-sawarna.webp'
    ],
    testimonials: [
      {
        name: 'Ahmad Rizki',
        location: 'Bandung',
        rating: 5,
        comment: 'Perjalanan dari Bandung sangat menyenangkan dengan pemandangan yang indah. Driver sangat profesional.',
        date: '3 hari lalu'
      }
    ],
    faq: [
      {
        question: 'Apakah bisa stop over di destinasi wisata?',
        answer: 'Yes, we are flexible for stopovers at tourist destinations with an additional fee based on duration.'
      },
      {
        question: 'Berapa lama perjalanan dari Bandung ke Sawarna?',
        answer: 'The typical journey takes 7–8 hours depending on traffic conditions and your pickup location in Bandung.'
      },
      {
        question: 'Apakah ada penjemputan dari bandara?',
        answer: 'Yes, we provide direct pickup from Husein Sastranegara Airport (BDO) with additional airport parking fees.'
      }
    ],
    additionalInfo: {
      bestTime: 'Pagi hari untuk menikmati pemandangan',
      weather: 'Sejuk di pagi hari, hangat di siang',
      roadCondition: 'Jalan nasional dengan pemandangan indah',
      tips: ['Bawa kamera', 'Siapkan jaket', 'Stop over di destinasi wisata']
    },
    pricing: {
      base: 'Rp 1.300.000',
      peak: 'Rp 1.500.000',
      weekend: 'Rp 1.400.000',
      includes: ['Driver', 'Bensin', 'Tol', 'Air mineral', 'Stop over (opsional)']
    }
  },
  'tangerang': {
    city: 'Tangerang',
    description: 'Area Kota/Kabupaten Tangerang & Tangerang Selatan.',
    image: '/images/transport/tangerang-sawarna.webp',
    distanceKm: '≈ 200 km',
    duration: '≈ 6–7 jam',
    priceFrom: 'Mulai Rp 1.150.000',
    pickupPoints: [
      'Bandara Soekarno-Hatta (CGK)',
      'BSD City',
      'Alam Sutera',
      'Gading Serpong',
      'Tangerang Kota',
      'Cikupa'
    ],
    popularRoutes: [
      { from: 'Tangerang Selatan', to: 'Sawarna', duration: '6 jam' },
      { from: 'Tangerang Kota', to: 'Sawarna', duration: '6.5 jam' },
      { from: 'Cikupa', to: 'Sawarna', duration: '7 jam' }
    ],
    features: [
      'Akses mudah dari bandara',
      'Rute strategis ke Sawarna',
      'Driver berpengalaman',
      'Harga kompetitif',
      'Fleksibel penjemputan'
    ],
    gallery: [
      '/images/transport/tangerang-sawarna.webp',
      '/images/sawarna-beach-4.jpeg',
      '/images/sawarna-beach-3.jpeg',
      '/images/penginapan-sawarna.webp'
    ],
    testimonials: [
      {
        name: 'Dewi Lestari',
        location: 'Tangerang Selatan',
        rating: 5,
        comment: 'Sangat nyaman dari Tangerang. Driver tepat waktu dan armada bersih.',
        date: '5 hari lalu'
      }
    ],
    faq: [
      {
        question: 'Apakah bisa penjemputan dari bandara?',
        answer: 'Yes, we provide direct pickup from Soekarno–Hatta Airport with additional airport parking fees.'
      },
      {
        question: 'Berapa lama perjalanan dari Tangerang ke Sawarna?',
        answer: 'The typical journey takes 6–7 hours depending on traffic conditions and your pickup location in Tangerang.'
      },
      {
        question: 'Apakah harga sudah termasuk tol dan parkir?',
        answer: 'The base price includes tolls and airport parking. No additional fees for these components.'
      }
    ],
    additionalInfo: {
      bestTime: 'Pagi hari untuk menghindari macet',
      weather: 'Cuaca tropis, siapkan payung',
      roadCondition: 'Jalan tol dan nasional dalam kondisi baik',
      tips: ['Berangkat pagi', 'Bawa bekal', 'Siapkan charger HP']
    },
    pricing: {
      base: 'Rp 1.150.000',
      peak: 'Rp 1.350.000',
      weekend: 'Rp 1.250.000',
      includes: ['Driver', 'Bensin', 'Tol', 'Air mineral', 'Parkir bandara (opsional)']
    }
  },
  'bekasi': {
    city: 'Bekasi',
    description: 'Bekasi Kota, Kabupaten Bekasi, dan Cikarang.',
    image: '/images/penginapan-sawarna.webp',
    distanceKm: '≈ 240 km',
    duration: '≈ 6–7 jam',
    priceFrom: 'Mulai Rp 1.250.000',
    pickupPoints: [
      'Bekasi Kota',
      'Cikarang',
      'Grand Galaxy Park',
      'Mall Metropolitan',
      'Summarecon Bekasi',
      'Lippo Cikarang'
    ],
    popularRoutes: [
      { from: 'Bekasi Kota', to: 'Sawarna', duration: '6 jam' },
      { from: 'Cikarang', to: 'Sawarna', duration: '6.5 jam' },
      { from: 'Tambun', to: 'Sawarna', duration: '7 jam' }
    ],
    features: [
      'Rute via jalur timur',
      'Driver berpengalaman',
      'Armada nyaman',
      'Harga transparan',
      'Layanan 24/7'
    ],
    gallery: [
      '/images/penginapan-sawarna.webp',
      '/images/sawarna-beach-2.jpeg',
      '/images/hero-sawarna.jpg',
      '/images/karang-taraje-sawarna.webp'
    ],
    testimonials: [
      {
        name: 'Siti Nurhaliza',
        location: 'Bekasi',
        rating: 5,
        comment: 'Layanan 24 jam sangat membantu. Driver profesional dan armada nyaman.',
        date: '1 minggu lalu'
      }
    ],
    faq: [
      {
        question: 'Apakah benar melayani 24 jam?',
        answer: 'Yes, we operate 24/7 with additional fees for night service (22:00–06:00).'
      },
      {
        question: 'Berapa lama perjalanan dari Bekasi ke Sawarna?',
        answer: 'The typical journey takes 6–7 hours depending on traffic conditions and your pickup location in Bekasi.'
      },
      {
        question: 'Apakah ada penjemputan dari Cikarang area?',
        answer: 'Yes, we provide pickup from all Bekasi areas including Cikarang, Tambun, and surrounding areas.'
      }
    ],
    additionalInfo: {
      bestTime: 'Pagi hari untuk perjalanan optimal',
      weather: 'Cuaca tropis, siapkan payung',
      roadCondition: 'Jalan nasional dalam kondisi baik',
      tips: ['Layanan 24 jam tersedia', 'Bawa bekal', 'Siapkan obat pribadi']
    },
    pricing: {
      base: 'Rp 1.250.000',
      peak: 'Rp 1.450.000',
      weekend: 'Rp 1.350.000',
      includes: ['Driver', 'Bensin', 'Tol', 'Air mineral', 'Layanan 24 jam']
    }
  },
  'serang': {
    city: 'Serang',
    description: 'Kota/Kabupaten Serang dan Cilegon.',
    image: '/images/karang-taraje-sawarna.webp',
    distanceKm: '≈ 150 km',
    duration: '≈ 4–5 jam',
    priceFrom: 'Mulai Rp 1.000.000',
    pickupPoints: [
      'Serang Kota',
      'Cilegon',
      'Merak',
      'Pelabuhan Merak',
      'Krakatau Steel',
      'Banten Lama'
    ],
    popularRoutes: [
      { from: 'Serang Kota', to: 'Sawarna', duration: '4 jam' },
      { from: 'Cilegon', to: 'Sawarna', duration: '4.5 jam' },
      { from: 'Merak', to: 'Sawarna', duration: '5 jam' }
    ],
    features: [
      'Jarak terdekat ke Sawarna',
      'Perjalanan tercepat',
      'Harga paling ekonomis',
      'Driver lokal berpengalaman',
      'Rute langsung tanpa macet'
    ],
    gallery: [
      '/images/karang-taraje-sawarna.webp',
      '/images/sawarna-beach-4.jpeg',
      '/images/sawarna-beach-3.jpeg',
      '/images/hero-sawarna.jpg'
    ],
    testimonials: [
      {
        name: 'Rudi Hartono',
        location: 'Serang',
        rating: 5,
        comment: 'Dari Serang paling cepat ke Sawarna. Harga juga paling murah. Recommended!',
        date: '2 hari lalu'
      }
    ],
    faq: [
      {
        question: 'Mengapa dari Serang paling cepat?',
        answer: 'Serang has the shortest distance to Sawarna with a direct route without going through Jakarta.'
      },
      {
        question: 'Berapa lama perjalanan dari Serang ke Sawarna?',
        answer: 'The typical journey takes 4–5 hours depending on traffic conditions and your pickup location in Serang.'
      },
      {
        question: 'Apakah harga sudah termasuk tol dan parkir?',
        answer: 'The base price includes tolls and parking. No additional fees for these components.'
      }
    ],
    additionalInfo: {
      bestTime: 'Kapan saja karena jarak dekat',
      weather: 'Cuaca tropis, siapkan payung',
      roadCondition: 'Jalan nasional dalam kondisi baik',
      tips: ['Jarak terdekat', 'Harga paling murah', 'Perjalanan tercepat']
    },
    pricing: {
      base: 'Rp 1.000.000',
      peak: 'Rp 1.200.000',
      weekend: 'Rp 1.100.000',
      includes: ['Driver', 'Bensin', 'Tol', 'Air mineral', 'Perjalanan tercepat']
    }
  },
  'depok': {
    city: 'Depok',
    description: 'Kota Depok dan sekitarnya (Cimanggis, Sawangan, Limo, Cinere).',
    image: '/images/depok-sawarna.webp',
    distanceKm: '≈ 220 km',
    duration: '≈ 6–7 jam',
    priceFrom: 'Mulai Rp 1.200.000',
    pickupPoints: [
      'Stasiun Depok',
      'Mall Depok',
      'Cimanggis',
      'Sawangan',
      'Limo',
      'Cinere'
    ],
    popularRoutes: [
      { from: 'Depok Kota', to: 'Sawarna', duration: '6 jam' },
      { from: 'Cimanggis', to: 'Sawarna', duration: '6.5 jam' },
      { from: 'Sawangan', to: 'Sawarna', duration: '7 jam' }
    ],
    features: [
      'Rute strategis via jalur selatan',
      'Driver berpengalaman rute Depok',
      'Armada nyaman untuk perjalanan jauh',
      'Harga kompetitif',
      'Fleksibel jadwal penjemputan'
    ],
    gallery: [
      '/images/depok-sawarna.webp',
      '/images/sawarna-beach-3.jpeg',
      '/images/sawarna-beach-2.jpeg',
      '/images/hero-sawarna.jpg'
    ],
    testimonials: [
      {
        name: 'Diana Putri',
        location: 'Depok',
        rating: 5,
        comment: 'Layanan dari Depok sangat memuaskan. Driver tepat waktu dan armada bersih. Harga juga sesuai.',
        date: '3 hari lalu'
      },
      {
        name: 'Ahmad Fauzi',
        location: 'Cimanggis',
        rating: 5,
        comment: 'Perjalanan dari Cimanggis lancar. Driver ramah dan tahu rute terbaik. Highly recommended!',
        date: '1 minggu lalu'
      }
    ],
    faq: [
      {
        question: 'Berapa lama perjalanan dari Depok ke Sawarna?',
        answer: 'The typical journey takes 6–7 hours depending on traffic conditions and your pickup location in Depok.'
      },
      {
        question: 'Is pickup available from Cimanggis area?',
        answer: 'Yes, we provide pickup from all Depok areas including Cimanggis, Sawangan, Limo, and Cinere.'
      },
      {
        question: 'Apakah ada penjemputan di pagi buta?',
        answer: 'Yes, we provide early morning pickup to avoid traffic. Additional fees apply for early morning service.'
      }
    ],
    additionalInfo: {
      bestTime: 'Pagi hari untuk menghindari macet',
      weather: 'Cuaca tropis, siapkan payung',
      roadCondition: 'Jalan nasional dengan pemandangan indah',
      tips: ['Berangkat pagi', 'Bawa bekal', 'Siapkan charger HP', 'Rute strategis']
    },
    pricing: {
      base: 'Rp 1.200.000',
      peak: 'Rp 1.400.000',
      weekend: 'Rp 1.300.000',
      includes: ['Driver', 'Bensin', 'Tol', 'Air mineral', 'Fleksibel jadwal']
    }
  }
};

// Data kendaraan yang tersedia
const VEHICLE_DATA = {
  'scoopy': {
    name: 'Honda Scoopy / Yamaha Nmax',
    type: 'Scooter Premium',
    capacity: '2 Penumpang',
    price: 'Rp 200.000',
    image: '/images/transport/sewa motor/sewa-motor-scoopy-768x474.png',
    features: [
      { icon: Users, text: '2 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 20L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 110-155cc', color: 'text-yellow-600' },
      { icon: Settings, text: 'Automatic', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '110-155cc',
      fuel: 'Bensin',
      transmission: 'Automatic',
      ac: 'Tidak ada',
      entertainment: 'Tidak ada',
      safety: 'Helm Standar'
    },
    suitable: ['Perjalanan pasangan', 'Backpacker', 'Budget travel'],
    description: 'Kendaraan ekonomis dan fleksibel untuk eksplorasi Sawarna. Cocok untuk pasangan yang ingin perjalanan romantis dengan budget terbatas.'
  },
  'vario': {
    name: 'Honda Vario / Yamaha XSR',
    type: 'Scooter Sport',
    capacity: '2 Penumpang',
    price: 'Rp 250.000',
    image: '/images/transport/sewa motor/sewa-motor-vario-cbs-768x474.png',
    features: [
      { icon: Users, text: '2 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 25L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 125-160cc', color: 'text-yellow-600' },
      { icon: Settings, text: 'Automatic', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '125-160cc',
      fuel: 'Bensin',
      transmission: 'Automatic',
      ac: 'Tidak ada',
      entertainment: 'Tidak ada',
      safety: 'Helm Standar'
    },
    suitable: ['Perjalanan pasangan', 'Sport touring', 'City exploration'],
    description: 'Scooter sport dengan performa lebih tinggi. Cocok untuk perjalanan yang membutuhkan kecepatan dan kenyamanan.'
  },
  'pcx': {
    name: 'Honda PCX / Yamaha NMAX',
    type: 'Scooter Premium',
    capacity: '2 Penumpang',
    price: 'Rp 300.000',
    image: '/images/transport/sewa motor/sewa-motor-klx-768x474.png',
    features: [
      { icon: Users, text: '2 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 30L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 150-160cc', color: 'text-yellow-600' },
      { icon: Settings, text: 'Automatic', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '150-160cc',
      fuel: 'Bensin',
      transmission: 'Automatic',
      ac: 'Tidak ada',
      entertainment: 'Tidak ada',
      safety: 'Helm Standar + ABS'
    },
    suitable: ['Perjalanan premium', 'Long distance', 'Comfort travel'],
    description: 'Scooter premium dengan kenyamanan tinggi dan performa maksimal. Ideal untuk perjalanan jauh yang nyaman.'
  },
  'adv': {
    name: 'Honda ADV / Yamaha XMAX',
    type: 'Adventure Scooter',
    capacity: '2 Penumpang',
    price: 'Rp 350.000',
     image: '/images/transport/sewa motor/sewa-motor-supra-x-768x474.png',
    features: [
      { icon: Users, text: '2 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 40L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 150-300cc', color: 'text-yellow-600' },
      { icon: Settings, text: 'Automatic', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '150-300cc',
      fuel: 'Bensin',
      transmission: 'Automatic',
      ac: 'Tidak ada',
      entertainment: 'Tidak ada',
      safety: 'Helm Standar + ABS + Traction Control'
    },
    suitable: ['Adventure touring', 'Off-road', 'Premium travel'],
    description: 'Adventure scooter dengan kapasitas bagasi besar dan performa tinggi. Cocok untuk eksplorasi medan yang menantang.'
  },
  'cb150r': {
    name: 'Honda CB150R / Yamaha MT-15',
    type: 'Sport Bike',
    capacity: '2 Penumpang',
    price: 'Rp 400.000',
     image: '/images/transport/sewa motor/sewa-motor-nmx-768x474.png',
    features: [
      { icon: Users, text: '2 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 15L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 150-160cc', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '150-160cc',
      fuel: 'Bensin',
      transmission: 'Manual',
      ac: 'Tidak ada',
      entertainment: 'Tidak ada',
      safety: 'Helm Standar + ABS'
    },
    suitable: ['Sport touring', 'Performance', 'Enthusiast'],
    description: 'Sport bike dengan performa tinggi dan handling yang responsif. Cocok untuk pengendara yang menyukai sensasi berkendara sporty.'
  },
  'avanza': {
    name: 'Toyota Avanza',
    type: 'MPV Kecil',
     capacity: '6 Seat',
    price: 'Rp 1.200.000',
    image: '/images/transport/sewa mobil/Rental-Avanza.webp',
    features: [
      { icon: Users, text: '6 Kursi (2+2+2)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 200L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 1.3L', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual/AT', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '1.3L VVT-i',
      fuel: 'Bensin',
      transmission: 'Manual/AT',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB',
      safety: 'ABS, Airbag, Seatbelt'
    },
    suitable: ['Keluarga kecil', 'Backpacker', 'Budget travel'],
    description: 'Kendaraan ekonomis dengan kapasitas 6 penumpang. Cocok untuk keluarga kecil atau grup backpacker dengan budget terbatas.'
  },
  'xenia': {
    name: 'Mitsubishi Xpander',
    type: 'MPV Premium',
     capacity: '7 Seat',
    price: 'Rp 1.300.000',
    image: '/images/transport/sewa mobil/Rental-Xpander.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 300L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 1.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT Modern', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '1.5L MIVEC',
      fuel: 'Bensin',
      transmission: 'AT Modern',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth + Touchscreen',
      safety: 'ABS, Airbag, Seatbelt, EBD, Brake Assist'
    },
    suitable: ['Keluarga modern', 'Group travel', 'City exploration'],
    description: 'MPV modern dengan desain stylish dan teknologi terkini. Cocok untuk keluarga yang menginginkan kendaraan modern dan nyaman.'
  },
  'innova': {
    name: 'Toyota Innova / Kijang Innova Reborn',
    type: 'MPV Besar',
     capacity: '8 Seat',
    price: 'Rp 1.400.000',
    image: '/images/transport/sewa mobil/Rental-Innova.webp',
    features: [
      { icon: Users, text: '8 Kursi (2+3+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 300L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 2.0L', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual/AT', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.0L VVT-i',
      fuel: 'Bensin',
      transmission: 'Manual/AT',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth',
      safety: 'ABS, Airbag, Seatbelt, EBD'
    },
    suitable: ['Keluarga besar', 'Group travel', 'Perjalanan jauh'],
    description: 'Kendaraan premium dengan kenyamanan tinggi. Cocok untuk keluarga besar atau perjalanan jauh dengan kenyamanan maksimal.'
  },
  'ertiga': {
    name: 'Suzuki Ertiga / XL7',
    type: 'MPV Kecil',
     capacity: '7 Seat',
    price: 'Rp 1.300.000',
    image: '/images/transport/sewa mobil/Rental-Innova-Zenix.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 250L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 1.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual/AT', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '1.5L VVT',
      fuel: 'Bensin',
      transmission: 'Manual/AT',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB',
      safety: 'ABS, Airbag, Seatbelt'
    },
    suitable: ['Keluarga kecil', 'Group travel', 'Budget travel'],
    description: 'MPV ekonomis dengan kenyamanan yang baik. Cocok untuk keluarga atau grup kecil dengan budget terbatas.'
  },
  'rush': {
    name: 'Mitsubishi Pajero Sport',
    type: 'SUV Premium',
     capacity: '7 Seat',
    price: 'Rp 1.700.000',
     image: '/images/transport/sewa mobil/Rental-Pajero.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 450L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.4L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT 4WD', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.4L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'AT 4WD',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth + GPS',
      safety: 'ABS, Airbag, Seatbelt, EBD, VSC, HAC, Traction Control'
    },
    suitable: ['Perjalanan mewah', 'Off-road', 'Executive travel'],
    description: 'SUV premium dengan performa off-road yang handal. Cocok untuk perjalanan executive atau adventure yang menantang.'
  },
  'hiace': {
    name: 'Bus Besar / Large Bus',
    type: 'Bus Besar',
     capacity: '45 Seat',
    price: 'Rp 3.500.000',
     image: '/images/transport/sewa bus/sewa-big-bus-768x474.png',
    features: [
      { icon: Bus, text: '45 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 1200L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 6.0L', color: 'text-yellow-600' },
      { icon: Coffee, text: 'Toilet + Karaoke', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '6.0L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Central + Individual + Toilet',
      entertainment: 'Radio + USB + TV + WiFi + Karaoke',
      safety: 'ABS, Airbag, Seatbelt, Emergency Exit, Fire Extinguisher'
    },
    suitable: ['Group sangat besar', 'Company outing', 'Event transport', 'Wisata massal'],
    description: 'Bus besar dengan kapasitas 45 penumpang. Dilengkapi toilet, karaoke, dan fasilitas premium untuk perjalanan grup sangat besar.'
  },
  'fortuner': {
    name: 'Toyota Fortuner',
    type: 'SUV Premium',
     capacity: '7 Seat',
    price: 'Rp 1.600.000',
     image: '/images/transport/sewa mobil/Rental-Fortuner.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 400L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.4L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT 4WD', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.4L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'AT 4WD',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth + GPS',
      safety: 'ABS, Airbag, Seatbelt, EBD, VSC, HAC'
    },
    suitable: ['Perjalanan mewah', 'Off-road', 'Executive travel'],
    description: 'SUV premium dengan performa tinggi dan kenyamanan maksimal. Cocok untuk perjalanan executive atau off-road adventure.'
  },
  'pajero': {
    name: 'Mitsubishi Pajero Sport',
    type: 'SUV Premium',
     capacity: '7 Seat',
    price: 'Rp 1.700.000',
     image: '/images/transport/sewa mobil/Rental-Pajero.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 450L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.4L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT 4WD', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.4L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'AT 4WD',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth + GPS',
      safety: 'ABS, Airbag, Seatbelt, EBD, VSC, HAC, Traction Control'
    },
    suitable: ['Perjalanan mewah', 'Off-road', 'Executive travel'],
    description: 'SUV premium dengan performa off-road yang handal. Cocok untuk perjalanan executive atau adventure yang menantang.'
  },
  'alphard': {
    name: 'Mitsubishi Pajero Sport',
    type: 'SUV Premium',
     capacity: '7 Seat',
    price: 'Rp 1.700.000',
     image: '/images/transport/sewa mobil/Rental-Pajero.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 450L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.4L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT 4WD', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.4L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'AT 4WD',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth + GPS',
      safety: 'ABS, Airbag, Seatbelt, EBD, VSC, HAC, Traction Control'
    },
    suitable: ['Perjalanan mewah', 'Off-road', 'Executive travel'],
    description: 'SUV premium dengan performa off-road yang handal. Cocok untuk perjalanan executive atau adventure yang menantang.'
  },
  'bus-sedang': {
    name: 'Bus Sedang / Medium Bus',
    type: 'Bus Sedang',
     capacity: '25 Seat',
    price: 'Rp 2.500.000',
    image: '/images/transport/sewa bus/sewa-medium-bus-768x474.png',
    features: [
      { icon: Bus, text: '25 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 800L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 4.0L', color: 'text-yellow-600' },
      { icon: WifiIcon, text: 'WiFi + TV', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '4.0L Diesel',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Central + Individual',
      entertainment: 'Radio + USB + TV + WiFi',
      safety: 'ABS, Airbag, Seatbelt, Emergency Exit'
    },
    suitable: ['Group besar', 'Company outing', 'Event transport', 'Wisata grup'],
    description: 'Bus sedang dengan kapasitas 25 penumpang. Cocok untuk grup besar dengan kenyamanan tinggi dan fasilitas lengkap.'
  },
  'bus-besar': {
    name: 'Bus Sedang / Medium Bus',
    type: 'Bus Sedang',
     capacity: '25 Seat',
    price: 'Rp 2.500.000',
     image: '/images/transport/sewa bus/sewa-medium-bus-768x474.png',
    features: [
      { icon: Bus, text: '25 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 800L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 4.0L', color: 'text-yellow-600' },
      { icon: WifiIcon, text: 'WiFi + TV', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '4.0L Diesel',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Central + Individual',
      entertainment: 'Radio + USB + TV + WiFi',
      safety: 'ABS, Airbag, Seatbelt, Emergency Exit'
    },
    suitable: ['Group besar', 'Company outing', 'Event transport', 'Wisata grup'],
    description: 'Bus sedang dengan kapasitas 25 penumpang. Cocok untuk grup besar dengan kenyamanan tinggi dan fasilitas lengkap.'
  },
  'bus-super': {
    name: 'Bus Super / Big Bus',
    type: 'Bus Super',
     capacity: '48 Seat',
    price: 'Rp 4.000.000',
    image: '/images/transport/sewa bus/sewa-big-bus-768x474.png',
    features: [
      { icon: Bus, text: '48 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 1500L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 7.0L', color: 'text-yellow-600' },
      { icon: Coffee, text: 'Toilet + Karaoke + WiFi', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '7.0L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Central + Individual + Toilet + WiFi',
      entertainment: 'Radio + USB + TV + WiFi + Karaoke + DVD',
      safety: 'ABS, Airbag, Seatbelt, Emergency Exit, Fire Extinguisher, GPS'
    },
    suitable: ['Group super besar', 'Company outing', 'Event transport', 'Wisata massal'],
    description: 'Bus super dengan kapasitas 48 penumpang. Fasilitas premium lengkap untuk perjalanan grup super besar.'
  },
  'bus-shd': {
    name: 'Bus SHD / Executive Bus',
    type: 'Bus Executive',
     capacity: '52 Seat',
    price: 'Rp 4.500.000',
     image: '/images/transport/sewa bus/sewa-big-bus-768x474.png',
    features: [
      { icon: Bus, text: '52 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 1800L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 8.0L', color: 'text-yellow-600' },
      { icon: Coffee, text: 'Toilet + Karaoke + WiFi + Reclining', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '8.0L Diesel Turbo',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Central + Individual + Toilet + WiFi + Reclining Seats',
      entertainment: 'Radio + USB + TV + WiFi + Karaoke + DVD + Individual Screens',
      safety: 'ABS, Airbag, Seatbelt, Emergency Exit, Fire Extinguisher, GPS, CCTV'
    },
    suitable: ['Group executive', 'Company outing', 'Event transport', 'Wisata premium'],
    description: 'Bus executive SHD dengan kapasitas maksimal 52 penumpang. Fasilitas super premium dengan kursi reclining dan entertainment individual.'
  },
  'camry': {
    name: 'Toyota Camry',
    type: 'Sedan Premium',
    capacity: '5 Seat',
    price: 'Rp 2.000.000',
    image: '/images/transport/sewa mobil/Rental-Camry.webp',
    features: [
      { icon: Users, text: '5 Kursi (2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 400L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 2.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT Premium', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.5L VVT-i',
      fuel: 'Bensin',
      transmission: 'AT Premium',
      ac: 'AC Dual Zone',
      entertainment: 'Radio + USB + Bluetooth + GPS',
      safety: 'ABS, Airbag, Seatbelt, EBD, VSC, HAC, Lane Departure'
    },
    suitable: ['Executive travel', 'Business trip', 'Premium transport'],
    description: 'Sedan premium dengan kenyamanan tinggi dan performa yang handal. Cocok untuk perjalanan executive atau business trip.'
  },
  'xpander': {
    name: 'Mitsubishi Xpander',
    type: 'MPV Modern',
    capacity: '7 Seat',
    price: 'Rp 1.350.000',
    image: '/images/transport/sewa mobil/Rental-Xpander.webp',
    features: [
      { icon: Users, text: '7 Kursi (2+2+3)', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 280L', color: 'text-green-600' },
      { icon: Fuel, text: 'Bensin 1.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'AT Modern', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '1.5L MIVEC',
      fuel: 'Bensin',
      transmission: 'AT Modern',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB + Bluetooth + Touchscreen',
      safety: 'ABS, Airbag, Seatbelt, EBD, Brake Assist'
    },
    suitable: ['Keluarga modern', 'Group travel', 'City exploration'],
    description: 'MPV modern dengan desain stylish dan teknologi terkini. Cocok untuk keluarga yang menginginkan kendaraan modern dan nyaman.'
  },
  'hiace-commuter': {
    name: 'Toyota Hiace Commuter',
    type: 'Minibus Commuter',
    capacity: '12 Seat',
    price: 'Rp 1.600.000',
    image: '/images/transport/sewa bus/sewa-hiace-commuter-768x474.png',
    features: [
      { icon: Users, text: '12 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 400L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.5L Diesel',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB',
      safety: 'ABS, Airbag, Seatbelt'
    },
    suitable: ['Group medium', 'Company outing', 'Event transport'],
    description: 'Minibus commuter dengan kapasitas 12 penumpang. Cocok untuk grup medium dengan kenyamanan yang baik.'
  },
  'hiace-premio': {
    name: 'Toyota Hiace Commuter',
    type: 'Minibus Commuter',
    capacity: '12 Seat',
    price: 'Rp 1.600.000',
    image: '/images/transport/sewa bus/sewa-hiace-commuter-768x474.png',
    features: [
      { icon: Users, text: '12 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 400L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.5L Diesel',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB',
      safety: 'ABS, Airbag, Seatbelt'
    },
    suitable: ['Group medium', 'Company outing', 'Event transport'],
    description: 'Minibus commuter dengan kapasitas 12 penumpang. Cocok untuk grup medium dengan kenyamanan yang baik.'
  },
  'elf-long': {
    name: 'Isuzu Elf Short',
    type: 'Minibus Short',
    capacity: '15 Seat',
    price: 'Rp 1.800.000',
    image: '/images/transport/sewa bus/elf-short-768x474.webp',
    features: [
      { icon: Users, text: '15 Kursi', color: 'text-blue-600' },
      { icon: Luggage, text: 'Bagasi 500L', color: 'text-green-600' },
      { icon: Fuel, text: 'Diesel 2.5L', color: 'text-yellow-600' },
      { icon: Settings, text: 'Manual', color: 'text-purple-600' }
    ],
    specifications: {
      engine: '2.5L Diesel',
      fuel: 'Diesel',
      transmission: 'Manual',
      ac: 'AC Front & Rear',
      entertainment: 'Radio + USB',
      safety: 'ABS, Airbag, Seatbelt'
    },
    suitable: ['Group medium', 'Company outing', 'Event transport'],
    description: 'Minibus short dengan kapasitas 15 penumpang. Cocok untuk grup medium dengan kenyamanan yang baik.'
  }
};

// Data kebutuhan berdasarkan jumlah penumpang dan tujuan
const NEEDS_RECOMMENDATION = {
  '1-2': {
    title: 'Perjalanan Pasangan/Romantic',
    description: 'Cocok untuk pasangan yang ingin perjalanan romantis ke Sawarna',
    recommended: ['scoopy', 'vario', 'pcx', 'adv', 'cb150r'],
    reason: 'Pilihan motor ekonomis hingga premium untuk eksplorasi Sawarna yang fleksibel dan ekonomis'
  },
  '3-4': {
    title: 'Keluarga Kecil',
    description: 'Ideal untuk keluarga kecil dengan 1-2 anak',
    recommended: ['avanza', 'xenia', 'ertiga', 'innova'],
    reason: 'Pilihan MPV ekonomis hingga premium untuk kenyamanan keluarga'
  },
  '5-6': {
    title: 'Keluarga Besar',
    description: 'Cocok untuk keluarga besar atau grup kecil',
    recommended: ['innova', 'ertiga', 'rush', 'fortuner', 'pajero', 'xpander'],
    reason: 'MPV dan SUV dengan kapasitas 7-8 penumpang untuk kenyamanan maksimal'
  },
  '7-8': {
    title: 'Group Travel',
    description: 'Ideal untuk grup travel atau keluarga extended',
    recommended: ['innova', 'alphard', 'hiace', 'camry'],
    reason: 'MPV luxury, sedan premium, dan minibus untuk kapasitas maksimal dengan kenyamanan tinggi'
  },
  '9-15': {
    title: 'Group Besar',
    description: 'Cocok untuk company outing atau grup besar',
    recommended: ['hiace', 'hiace-commuter', 'hiace-premio'],
    reason: 'Hiace dan variannya memberikan kapasitas maksimal dengan harga per orang yang ekonomis'
  },
  '16-25': {
    title: 'Group Sangat Besar',
    description: 'Ideal untuk company outing atau event transport',
    recommended: ['hiace-premio', 'elf-long', 'bus-sedang'],
    reason: 'Minibus premium dan bus sedang memberikan kenyamanan tinggi dengan fasilitas lengkap untuk grup besar'
  },
  '26-45': {
    title: 'Group Massal',
    description: 'Cocok untuk wisata massal atau event besar',
    recommended: ['bus-besar', 'bus-super'],
    reason: 'Bus besar dan super dengan fasilitas premium untuk perjalanan grup massal'
  },
  '46-52': {
    title: 'Group Super Besar',
    description: 'Cocok untuk event besar atau wisata massal',
    recommended: ['bus-super', 'bus-shd'],
    reason: 'Bus super dan SHD dengan kapasitas maksimal 48-52 penumpang dan fasilitas executive'
  }
};

const AreaDetail = () => {
  const { city } = useParams<{ city: string }>();
  const { i18n } = useTranslation('common');
  const isId = (i18n.language || '').toLowerCase().startsWith('id');
  let data = city ? AREA_DATA[city] : undefined;
  const ui = (idText: string, enText: string) => (isId ? idText : enText);

  const toEn = (val: string): string => {
    if (!val) return val;
    return val
      .replace(/Mulai\s/gi, 'From ')
      .replace(/jam\b/gi, 'hours')
      .replace(/menit\b/gi, 'minutes')
      .replace(/≈\s*(\d+)([.,]?\d*)\s*km/gi, '≈ $1$2 km')
      .replace(/Penjemputan/gi, 'Pickup')
      .replace(/door-to-door/gi, 'door-to-door')
      .replace(/Driver/gi, 'Driver')
      .replace(/berpengalaman/gi, 'experienced')
      .replace(/rute/gi, 'routes')
      .replace(/Armada/gi, 'Fleet')
      .replace(/nyaman/gi, 'comfortable')
      .replace(/terawat/gi, 'well-maintained')
      .replace(/Termasuk/gi, 'Includes')
      .replace(/tol/gi, 'toll')
      .replace(/parkir/gi, 'parking')
      .replace(/Air mineral gratis/gi, 'Free mineral water')
      .replace(/Bandara/gi, 'Airport')
      .replace(/Stasiun/gi, 'Station')
      .replace(/Mall/gi, 'Mall')
      .replace(/Jakarta Pusat/gi, 'Central Jakarta')
      .replace(/Jakarta Selatan/gi, 'South Jakarta')
      .replace(/Jakarta Utara/gi, 'North Jakarta')
      .replace(/Jakarta Barat/gi, 'West Jakarta')
      .replace(/Jakarta Timur/gi, 'East Jakarta')
      .replace(/Kota/gi, 'City')
      .replace(/Kabupaten/gi, 'Regency')
      .replace(/Layanan/gi, 'Service')
      .replace(/Lebih/gi, 'More')
      .replace(/Harga/gi, 'Price');
  };

  const localizeArea = (area?: typeof AREA_DATA[string]) => {
    if (!area) return area;
    return {
      ...area,
      description: toEn(area.description),
      distanceKm: area.distanceKm,
      duration: toEn(area.duration),
      priceFrom: toEn(area.priceFrom),
      pickupPoints: area.pickupPoints.map(toEn),
      popularRoutes: area.popularRoutes.map(r => ({ from: toEn(r.from), to: toEn(r.to), duration: toEn(r.duration) })),
      features: area.features.map(toEn),
      testimonials: area.testimonials.map(t => ({ ...t, location: toEn(t.location), comment: toEn(t.comment), date: toEn(t.date) })),
      faq: area.faq.map(f => ({ question: toEn(f.question), answer: toEn(f.answer) })),
      additionalInfo: {
        bestTime: toEn(area.additionalInfo.bestTime),
        weather: toEn(area.additionalInfo.weather),
        roadCondition: toEn(area.additionalInfo.roadCondition),
        tips: area.additionalInfo.tips.map(toEn)
      },
      pricing: {
        base: area.pricing.base,
        peak: area.pricing.peak,
        weekend: area.pricing.weekend,
        includes: area.pricing.includes.map(toEn)
      }
    };
  };

  if (!isId) {
    data = localizeArea(data);
  }

  // Minimal English translation for Jakarta; fallback to Indonesian for others
  if (!isId && city === 'jakarta' && data) {
    data = {
      ...data,
      description: 'Pickup from all Jakarta areas (Central, West, East, North, South).',
      duration: '≈ 6–7 hours',
      priceFrom: 'From Rp 1.200.000',
      pickupPoints: [
        'Soekarno–Hatta Airport (CGK)',
        'Halim Perdanakusuma Airport (HLP)',
        'Gambir Station',
        'Jakarta Kota Station',
        'Kelapa Gading Mall',
        'Plaza Senayan'
      ],
      popularRoutes: [
        { from: 'Central Jakarta', to: 'Sawarna', duration: '6 hours' },
        { from: 'South Jakarta', to: 'Sawarna', duration: '6.5 hours' },
        { from: 'North Jakarta', to: 'Sawarna', duration: '7 hours' }
      ],
      features: [
        'Door-to-door pickup',
        'Experienced drivers for Jakarta routes',
        'Comfortable & well-maintained fleet',
        'Includes toll & parking (optional)',
        'Free mineral water'
      ]
    };
  }

  // English overrides for other areas' FAQs
  if (!isId && data) {
    if (city === 'bogor') {
      data = {
        ...data,
        faq: [
          {
            question: 'Why is Bogor faster to Sawarna?',
            answer: 'Bogor has direct access to the southern route which is closer to Sawarna compared to Jakarta.'
          },
          {
            question: 'How long is the trip from Bogor to Sawarna?',
            answer: 'The typical journey takes 5–6 hours depending on traffic conditions and your pickup location in Bogor.'
          },
          {
            question: 'Does the price include tolls and parking?',
            answer: 'The base price includes tolls and parking. No additional fees for these components.'
          }
        ]
      };
    }
    if (city === 'bandung') {
      data = {
        ...data,
        faq: [
          {
            question: 'Can we stop over at tourist spots?',
            answer: 'Yes, we are flexible for stopovers at tourist destinations with an additional fee based on duration.'
          },
          {
            question: 'How long is the trip from Bandung to Sawarna?',
            answer: 'The typical journey takes 7–8 hours depending on traffic conditions and your pickup location in Bandung.'
          },
          {
            question: 'Is airport pickup available from Bandung?',
            answer: 'Yes, we provide direct pickup from Husein Sastranegara Airport (BDO) with additional airport parking fees.'
          }
        ]
      };
    }
    if (city === 'tangerang') {
      data = {
        ...data,
        faq: [
          {
            question: 'Is airport pickup available?',
            answer: 'Yes, we provide direct pickup from Soekarno–Hatta Airport with additional airport parking fees.'
          },
          {
            question: 'How long is the trip from Tangerang to Sawarna?',
            answer: 'The typical journey takes 6–7 hours depending on traffic conditions and your pickup location in Tangerang.'
          },
          {
            question: 'Does the price include tolls and parking?',
            answer: 'The base price includes tolls and airport parking. No additional fees for these components.'
          }
        ]
      };
    }
    if (city === 'bekasi') {
      data = {
        ...data,
        faq: [
          {
            question: 'Do you really operate 24/7?',
            answer: 'Yes, we operate 24/7 with additional fees for night service (22:00–06:00).'
          },
          {
            question: 'How long is the trip from Bekasi to Sawarna?',
            answer: 'The typical journey takes 6–7 hours depending on traffic conditions and your pickup location in Bekasi.'
          },
          {
            question: 'Is pickup available from Cikarang area?',
            answer: 'Yes, we provide pickup from all Bekasi areas including Cikarang, Tambun, and surrounding areas.'
          }
        ]
      };
    }
    if (city === 'serang') {
      data = {
        ...data,
        faq: [
          {
            question: 'Why is Serang the fastest to Sawarna?',
            answer: 'Serang has the shortest distance to Sawarna with a direct route without going through Jakarta.'
          },
          {
            question: 'How long is the trip from Serang to Sawarna?',
            answer: 'The typical journey takes 4–5 hours depending on traffic conditions and your pickup location in Serang.'
          },
          {
            question: 'Does the price include tolls and parking?',
            answer: 'The base price includes tolls and parking. No additional fees for these components.'
          }
        ]
      };
    }
    if (city === 'depok') {
      data = {
        ...data,
        faq: [
          {
            question: 'How long is the trip from Depok to Sawarna?',
            answer: 'The typical journey takes 6–7 hours depending on traffic conditions and your pickup location in Depok.'
          },
          {
            question: 'Is pickup available from Cimanggis area?',
            answer: 'Yes, we provide pickup from all Depok areas including Cimanggis, Sawangan, Limo, and Cinere.'
          },
          {
            question: 'Is early morning pickup available?',
            answer: 'Yes, we provide early morning pickup to avoid traffic. Additional fees apply for early morning service.'
          }
        ]
      };
    }
  }

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPassengers, setSelectedPassengers] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [showVehicleDetails, setShowVehicleDetails] = useState<string | null>(null);
  const [tripType, setTripType] = useState<string>('one-way');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const [isPeakSeason, setIsPeakSeason] = useState<boolean>(false);
  // Detail kalkulator
  const [distanceKm, setDistanceKm] = useState<number>(() => {
    const m = (data?.distanceKm)?.match(/\d+(?:[.,]\d+)?/);
    return m ? parseFloat(m[0].replace(',', '.')) : 0;
  });
  const [estimatedHours, setEstimatedHours] = useState<number>(() => {
    const m = (data?.duration)?.match(/\d+/);
    return m ? parseInt(m[0]) : 0;
  });
  const [perKmRate, setPerKmRate] = useState<number>(0);
  const [perHourRate, setPerHourRate] = useState<number>(0);
  const [tollCost, setTollCost] = useState<number>(0);
  const [parkingCost, setParkingCost] = useState<number>(0);
  const [extraStopCost, setExtraStopCost] = useState<number>(0);
  const [includeToll, setIncludeToll] = useState<boolean>(false);
  const [includeParking, setIncludeParking] = useState<boolean>(false);
  const [favoriteVehicles, setFavoriteVehicles] = useState<string[]>([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [vehicleRatings, setVehicleRatings] = useState<Record<string, { rating: number; reviewCount: number; lastReview: string }>>({
    'avanza': { rating: 4.8, reviewCount: 127, lastReview: '2 hari lalu' },
    'xenia': { rating: 4.6, reviewCount: 89, lastReview: '1 minggu lalu' },
    'innova': { rating: 4.9, reviewCount: 156, lastReview: '3 hari lalu' },
    'ertiga': { rating: 4.7, reviewCount: 73, lastReview: '5 hari lalu' },
    'rush': { rating: 4.8, reviewCount: 94, lastReview: '1 hari lalu' },
    'hiace': { rating: 4.9, reviewCount: 203, lastReview: '4 hari lalu' },
    'fortuner': { rating: 4.9, reviewCount: 178, lastReview: '2 hari lalu' },
    'pajero': { rating: 4.8, reviewCount: 145, lastReview: '1 minggu lalu' },
    'alphard': { rating: 4.9, reviewCount: 234, lastReview: '3 hari lalu' },
    'hiace-commuter': { rating: 4.7, reviewCount: 167, lastReview: '2 hari lalu' },
    'hiace-premio': { rating: 4.9, reviewCount: 189, lastReview: '1 hari lalu' },
    'elf-long': { rating: 4.8, reviewCount: 156, lastReview: '4 hari lalu' },
    'bus-sedang': { rating: 4.6, reviewCount: 89, lastReview: '1 minggu lalu' },
    'bus-besar': { rating: 4.7, reviewCount: 134, lastReview: '3 hari lalu' },
    'bus-super': { rating: 4.8, reviewCount: 178, lastReview: '2 hari lalu' },
    'bus-shd': { rating: 4.9, reviewCount: 245, lastReview: '1 hari lalu' }
  });

  // Auto-scroll to selected vehicle summary when vehicle is selected
  useEffect(() => {
    if (selectedVehicle) {
      console.log('Vehicle selected:', selectedVehicle, 'Scrolling to summary section...');
      // Use a longer timeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const element = document.getElementById('selected-vehicle-summary');
        if (element) {
          console.log('Found element, scrolling...');
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          console.log('Element not found');
        }
      }, 300); // Increased timeout to 300ms

      return () => clearTimeout(timer);
    }
  }, [selectedVehicle]);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback UI localization: replace remaining Indonesian UI strings with English on the client when EN is active
  useEffect(() => {
    if (isId) return;
    const replacements: Record<string, string> = {
      'Pilih Kendaraan Sesuai Kebutuhan': 'Choose Vehicles That Fit Your Needs',
      'Penawaran Khusus': 'Special Offers',
      'Keunggulan Layanan': 'Service Advantages',
      'Rute Populer': 'Popular Routes',
      'Titik Penjemputan': 'Pickup Points',
      'Info Cepat': 'Quick Info',
      'Siap Berangkat dari Jakarta?': 'Ready to Depart from Jakarta?',
      'Galeri Perjalanan': 'Trip Gallery',
      'Testimoni Pelanggan': 'Customer Testimonials',
      'Pertanyaan yang Sering Diajukan': 'Frequently Asked Questions',
      'Informasi Tambahan': 'Additional Information',
      'Detail Harga': 'Price Details',
      'Berapa Jumlah Penumpang?': 'How Many Passengers?',
      'Kendaraan Favorit Anda': 'Your Favorite Vehicles',
      'Mengapa rekomendasi ini?': 'Why these recommendations?',
      'Kapasitas': 'Capacity',
      'Harga': 'Price',
      'Lihat Detail': 'View Details',
      'Sembunyikan Detail': 'Hide Details',
      'Pilih Kendaraan': 'Choose Vehicle',
      '✓ Dipilih': '✓ Selected',
      'Lihat Titik Penjemputan': 'View Pickup Points',
      'Pesan dari': 'Book from',
      'Baru': 'New',
      'ulasan': 'reviews'
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    let n = walker.nextNode();
    while (n) {
      nodes.push(n as Text);
      n = walker.nextNode();
    }
    nodes.forEach((textNode) => {
      let txt = textNode.nodeValue || '';
      let changed = false;
      for (const [idText, enText] of Object.entries(replacements)) {
        if (txt.includes(idText)) {
          const parts = txt.split(idText);
          txt = parts.join(enText);
          changed = true;
        }
      }
      if (changed) textNode.nodeValue = txt;
    });
  }, [isId, city]);

  // Toggle favorite vehicle
  const toggleFavorite = useCallback((vehicleKey: string) => {
    setFavoriteVehicles(prev => 
      prev.includes(vehicleKey) 
        ? prev.filter(v => v !== vehicleKey)
        : [...prev, vehicleKey]
    );
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className="w-4 h-4 text-yellow-400" />
            <div className="absolute inset-0 w-2 overflow-hidden">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
        ))}
      </div>
    );
  };

  // Helper untuk memastikan angka valid
  const asSafeNumber = (value: unknown) => {
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };

  // Fungsi kalkulator harga
  const calculatePrice = () => {
    if (!selectedVehicle || !data) return 0;

    const vehicle = VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA];
    const basePrice = parseInt(vehicle.price.replace(/[^\d]/g, '')) || 0;

    const safeDistanceKm = asSafeNumber(distanceKm);
    const safePerKm = asSafeNumber(perKmRate);
    const safeHours = asSafeNumber(estimatedHours);
    const safePerHour = asSafeNumber(perHourRate);
    const safeToll = includeToll ? asSafeNumber(tollCost) : 0;
    const safeParking = includeParking ? asSafeNumber(parkingCost) : 0;
    const safeExtraStop = asSafeNumber(extraStopCost);

    const distanceCharge = safeDistanceKm * safePerKm;
    const timeCharge = safeHours * safePerHour;

    // Terapkan multiplier hanya ke komponen dasar (tanpa extras)
    let subtotal = basePrice + distanceCharge + timeCharge;
    if (isWeekend) subtotal *= 1.1; // 10% tambahan
    if (isPeakSeason) subtotal *= 1.2; // 20% tambahan
    if (tripType === 'round-trip') subtotal *= 1.8; // 80% tambahan

    const extras = safeToll + safeParking + safeExtraStop;
    const finalPrice = subtotal + extras;

    return Math.round(finalPrice);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Area Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Area layanan yang Anda cari tidak tersedia.</p>
          <Link to="/transport"><Button>Kembali ke Transport</Button></Link>
        </div>
      </div>
    );
  }

  const metaTitle = `Transport dari ${data.city} ke Sawarna - VillaSawarna`;
  const metaDescription = `Layanan transportasi dari ${data.city} ke Sawarna. ${data.distanceKm}, ${data.duration}. ${data.priceFrom}.`;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={`transport ${data.city.toLowerCase()} sawarna, antar jemput ${data.city.toLowerCase()}, sewa mobil ${data.city.toLowerCase()}`}
        url={`https://villasawarna.com/transport/area/${city}`}
        type="website"
        hreflangAlternates={buildHreflangAlternates(`/transport/area/${city}`)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/gasken-sawarna.webp')] bg-cover bg-center opacity-80 dark:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20" />
         <div className="relative z-10 container-custom py-16 md:py-28 text-white">
          <div className="max-w-4xl">
             <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
               <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-ocean/20 text-ocean-light flex-shrink-0">
                 <MapPin className="w-6 h-6 md:w-8 md:h-8" />
              </div>
               <div className="flex-1 min-w-0">
                 <h1 className="text-2xl md:text-5xl font-extrabold leading-tight mb-2 md:mb-0">Transport dari {data.city}</h1>
                 <p className="text-white/90 text-base md:text-xl">{data.description}</p>
              </div>
            </div>
             <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
               <div className="flex flex-col items-center text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                 <Navigation className="w-5 h-5 mb-1" />
                 <span className="text-sm md:text-base font-medium">{data.distanceKm}</span>
              </div>
               <div className="flex flex-col items-center text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                 <Clock className="w-5 h-5 mb-1" />
                 <span className="text-sm md:text-base font-medium">{data.duration}</span>
              </div>
               <div className="flex flex-col items-center text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                 <Car className="w-5 h-5 mb-1" />
                 <span className="text-sm md:text-base font-medium">{data.priceFrom}</span>
              </div>
            </div>
             <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya ingin sewa kendaraan dari ${data.city} ke Sawarna. Mohon info ketersediaan & estimasi biaya.`)}`} target="_blank" rel="noopener noreferrer">
                 <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-base py-3 px-6" title={ui(`Pesan transport dari ${data.city}`, `Book transport from ${data.city}`)}>{ui(`Pesan dari ${data.city}`, `Book from ${data.city}`)}</Button>
              </a>
              <a href="#pickup-points">
                 <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10 text-base py-3 px-6" title={ui('Lihat titik penjemputan','See pickup points')}>{ui('Lihat Titik Penjemputan','View Pickup Points')}</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Selection Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{ui('Pilih Kendaraan Sesuai Kebutuhan','Choose Vehicles That Fit Your Needs')}</h2>
            <p className="text-gray-600 dark:text-gray-300">{ui('Sistem rekomendasi otomatis berdasarkan jumlah penumpang dan kebutuhan Anda','Automatic recommendations based on passengers and your needs')}</p>
          </div>

          {/* Passenger Selection */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="border border-gray-100 dark:border-gray-700">
               <CardHeader className="text-center">
                 <CardTitle className="text-xl md:text-2xl dark:text-white">{ui('Berapa Jumlah Penumpang?','How Many Passengers?')}</CardTitle>
                 <CardDescription className="text-sm md:text-base">{ui('Silahkan ','Please ')}<span className="text-ocean dark:text-ocean-light font-semibold">{ui('klik','click')}</span>{ui(' Pilih jumlah penumpang untuk untuk melihat pilihan kendaraan dan mendapatkan rekomendasi kendaraan terbaik',' Select number of passengers to see vehicle options and get best recommendations')}</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                   {Object.entries(NEEDS_RECOMMENDATION).map(([range, info]) => (
                     <button
                       key={range}
                       onClick={() => {
                         setSelectedPassengers(range);
                         // Scroll ke section kendaraan di mobile
                         setTimeout(() => {
                           const vehicleSection = document.getElementById('vehicle-recommendations');
                           if (vehicleSection) {
                             vehicleSection.scrollIntoView({ 
                               behavior: 'smooth',
                               block: 'start'
                             });
                           }
                         }, 100);
                       }}
                       className={`p-4 md:p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                         selectedPassengers === range
                           ? 'border-ocean bg-ocean/10 dark:bg-ocean/20 shadow-lg'
                           : 'border-gray-200 dark:border-gray-600 hover:border-ocean/50 bg-white dark:bg-gray-800'
                       }`}
                       title={ui(`Pilih untuk ${range} penumpang`, `Choose for ${range} passengers`)}
                     >
                       <div className="text-center">
                         <div className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{ui(`${range} orang`, `${range} pax`)}</div>
                         <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-tight">{info.title}</div>
                       </div>
                     </button>
                   ))}
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Favorite Vehicles Section */}
          {favoriteVehicles.length > 0 && (
            <div className="max-w-6xl mx-auto mb-6 md:mb-8">
              <Card className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {ui('Kendaraan Favorit Anda','Your Favorite Vehicles')}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {ui(`${favoriteVehicles.length} kendaraan yang Anda tandai sebagai favorit`, `${favoriteVehicles.length} vehicles marked as favorite`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {favoriteVehicles.map((vehicleKey) => {
                      const vehicle = VEHICLE_DATA[vehicleKey as keyof typeof VEHICLE_DATA];
                      return (
                        <div key={vehicleKey} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-700">
                          <img src={vehicle.image} alt={vehicle.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white text-xs md:text-sm">{vehicle.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mb-0.5 md:mb-1">{vehicle.capacity}</div>
                            <div className="text-xs md:text-sm font-bold text-ocean dark:text-ocean-light mb-0.5 md:mb-1">{vehicle.price}</div>
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-2 h-2 md:w-2.5 md:h-2.5 ${i < Math.floor(vehicleRatings[vehicleKey]?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({vehicleRatings[vehicleKey]?.reviewCount || 0})
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleFavorite(vehicleKey)}
                            className="p-1 md:p-1.5 text-red-500 hover:text-red-700 transition-colors"
                            title={ui('Hapus dari favorit','Remove from favorites')}
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Vehicle Recommendations */}
          {selectedPassengers && (
            <div id="vehicle-recommendations" className="max-w-6xl mx-auto">
              <Card className="border border-gray-100 dark:border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">
                    {ui('Rekomendasi untuk','Recommendations for')} {NEEDS_RECOMMENDATION[selectedPassengers as keyof typeof NEEDS_RECOMMENDATION].title}
                  </CardTitle>
                  <CardDescription>
                    {NEEDS_RECOMMENDATION[selectedPassengers as keyof typeof NEEDS_RECOMMENDATION].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800 dark:text-blue-200">{ui('Mengapa rekomendasi ini?','Why these recommendations?')}</span>
                    </div>
                    <p className="text-blue-700 dark:text-blue-300">
                      {NEEDS_RECOMMENDATION[selectedPassengers as keyof typeof NEEDS_RECOMMENDATION].reason}
                    </p>
                  </div>
                </CardContent>
              </Card>

                                                           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                 {NEEDS_RECOMMENDATION[selectedPassengers as keyof typeof NEEDS_RECOMMENDATION].recommended.map((vehicleKey) => {
                   const vehicle = VEHICLE_DATA[vehicleKey as keyof typeof VEHICLE_DATA];
                   return (
                      <Card key={vehicleKey} className="border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <div className="w-full h-32 md:h-40 lg:h-48 bg-gray-200 dark:bg-gray-800 relative">
                         <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" loading="lazy" />
                          <div className="absolute top-2 md:top-3 right-2 md:right-3 flex items-center gap-1 md:gap-2">
                            <span className="text-xs bg-ocean/90 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-medium">
                             {vehicle.type}
                           </span>
                           <button
                             onClick={(e) => {
                               e.stopPropagation();
                               toggleFavorite(vehicleKey);
                             }}
                             className={`p-1 md:p-1.5 rounded-full transition-all duration-200 ${
                               favoriteVehicles.includes(vehicleKey)
                                 ? 'bg-red-500 text-white'
                                 : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                             }`}
                             title={favoriteVehicles.includes(vehicleKey) ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                           >
                             <svg className="w-3 h-3 md:w-4 md:h-4" fill={favoriteVehicles.includes(vehicleKey) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={favoriteVehicles.includes(vehicleKey) ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364 4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                             </svg>
                           </button>
                         </div>
                        </div>
                        <CardHeader className="p-3 md:p-4 lg:p-6">
                          <CardTitle className="text-base md:text-lg dark:text-white leading-tight mb-2">{vehicle.name}</CardTitle>
                          <CardDescription className="text-sm md:text-base line-clamp-2 mb-3">{vehicle.description}</CardDescription>
                          
                          {/* Rating Section */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-3 h-3 ${i < Math.floor(vehicleRatings[vehicleKey]?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                                    />
                                  ))}
                                </div>
                                <span className={`text-xs font-semibold ${getRatingColor(vehicleRatings[vehicleKey]?.rating || 0)}`}>
                                  {vehicleRatings[vehicleKey]?.rating || 0}
                                </span>
                              </div>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${getRatingBadge(vehicleRatings[vehicleKey]?.rating || 0).color}`}>
                                {getRatingBadge(vehicleRatings[vehicleKey]?.rating || 0).text}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span className="text-xs">{vehicleRatings[vehicleKey]?.reviewCount || 0} review</span>
                              <span className="text-xs">{vehicleRatings[vehicleKey]?.lastReview || 'Baru'}</span>
                            </div>
                          </div>
                       </CardHeader>
                        <CardContent className="p-3 md:p-4 lg:p-6 pt-0">
                          <div className="space-y-3 md:space-y-4">
                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                              <div className="text-center p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{ui('Kapasitas','Capacity')}</div>
                                <div className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">{vehicle.capacity}</div>
                           </div>
                              <div className="text-center p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{ui('Harga','Price')}</div>
                                <div className="font-bold text-xs md:text-sm text-ocean dark:text-ocean-light">{vehicle.price}</div>
                              </div>
                           </div>
                           
                            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                             {vehicle.features.slice(0, 2).map((feature, index) => (
                                <div key={index} className="flex items-center gap-1.5 text-xs">
                                  <feature.icon className={`w-3 h-3 md:w-4 md:h-4 ${feature.color} flex-shrink-0`} />
                                 <span className="text-gray-600 dark:text-gray-300 truncate text-xs">{feature.text}</span>
                               </div>
                             ))}
                           </div>

                           <div className="space-y-1.5 md:space-y-2">
                               <button
                                 onClick={() => setShowVehicleDetails(showVehicleDetails === vehicleKey ? null : vehicleKey)}
                                className="w-full text-xs md:text-sm text-ocean dark:text-ocean-light hover:underline py-1.5 md:py-2 px-2 md:px-3 rounded-lg border border-ocean/20 hover:bg-ocean/5 transition-colors"
                                title={ui('Lihat detail kendaraan','View vehicle details')}
                               >
                                {showVehicleDetails === vehicleKey ? ui('Sembunyikan Detail','Hide Details') : ui('Lihat Detail','View Details')}
                               </button>
                               
                               <button
                                 onClick={() => setSelectedVehicle(vehicleKey)}
                                className={`w-full py-2 md:py-3 px-3 md:px-4 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                                   selectedVehicle === vehicleKey
                                    ? 'bg-ocean text-white shadow-lg'
                                     : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                                 }`}
                                title={selectedVehicle === vehicleKey ? ui('Kendaraan sudah dipilih','Vehicle already selected') : ui('Pilih kendaraan ini','Choose this vehicle')}
                               >
                                {selectedVehicle === vehicleKey ? ui('✓ Dipilih','✓ Selected') : ui('Pilih Kendaraan','Choose Vehicle')}
                               </button>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   );
                 })}
               </div>
            </div>
          )}

                     {/* Vehicle Details Modal */}
           {showVehicleDetails && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6 pb-24 md:pb-8">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-11/12 max-w-md md:max-w-4xl lg:max-w-5xl max-h-[85vh] md:max-h-[80vh] overflow-hidden">
                 {/* Header */}
                  <div className="flex items-center justify-between p-4 md:p-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white break-words">
                       {VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].name}
                     </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 break-words">
                       {VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].type}
                     </p>
                     
                     {/* Rating in Modal Header */}
                     <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3">
                       <div className="flex items-center gap-1.5">
                         <div className="flex items-center gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <Star 
                               key={i} 
                               className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(vehicleRatings[showVehicleDetails]?.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                             />
                           ))}
                         </div>
                         <span className={`text-xs md:text-sm font-semibold ${getRatingColor(vehicleRatings[showVehicleDetails]?.rating || 0)}`}>
                           {vehicleRatings[showVehicleDetails]?.rating || 0}
                         </span>
                       </div>
                       <span className={`text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full ${getRatingBadge(vehicleRatings[showVehicleDetails]?.rating || 0).color}`}>
                         {getRatingBadge(vehicleRatings[showVehicleDetails]?.rating || 0).text}
                       </span>
                       <span className="text-xs text-gray-500 dark:text-gray-400">
                         {vehicleRatings[showVehicleDetails]?.reviewCount || 0} review
                       </span>
                     </div>
                   </div>
                   <button
                     onClick={() => setShowVehicleDetails(null)}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ml-3"
                      title="Tutup detail kendaraan"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>

                                   <div className="overflow-y-auto max-h-[calc(85vh-80px)] md:max-h-[calc(80vh-80px)]">
                   <div className="p-4 md:p-6 pb-12 md:pb-16">
                     {/* Image Section */}
                      <div className="w-full h-56 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-6 md:mb-8">
                       <img 
                         src={VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].image} 
                         alt={VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].name}
                         className="w-full h-full object-cover"
                       />
                     </div>

                     {/* Quick Info Cards */}
                      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                       <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                         <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                         <div className="text-sm text-blue-600 dark:text-blue-300">Kapasitas</div>
                          <div className="font-bold text-sm text-blue-800 dark:text-blue-200 break-words">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].capacity}</div>
                       </div>
                       <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                         <Luggage className="w-6 h-6 text-green-600 mx-auto mb-2" />
                         <div className="text-sm text-green-600 dark:text-green-300">Bagasi</div>
                          <div className="font-bold text-sm text-green-800 dark:text-green-200">Luas</div>
                       </div>
                       <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                         <Fuel className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                         <div className="text-sm text-yellow-600 dark:text-yellow-300">BBM</div>
                          <div className="font-bold text-sm text-yellow-800 dark:text-yellow-200">Irit</div>
                       </div>
                       <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                         <Settings className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                         <div className="text-sm text-purple-600 dark:text-purple-300">Transmisi</div>
                          <div className="font-bold text-sm text-purple-800 dark:text-purple-200">Smooth</div>
                       </div>
                     </div>

                     {/* Description */}
                      <div className="mb-6 md:mb-8">
                        <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">Deskripsi</h4>
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                         {VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].description}
                       </p>
                     </div>

                     {/* Specifications */}
                      <div className="mb-6 md:mb-8">
                        <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Spesifikasi Teknis</h4>
                        <div className="space-y-4 md:space-y-5">
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-5 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                              <div className="flex flex-col">
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Mesin</span>
                                <span className="text-xs md:text-sm text-gray-900 dark:text-white font-semibold">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].specifications.engine}</span>
                           </div>
                              <div className="flex flex-col">
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Bahan Bakar</span>
                                <span className="text-xs md:text-sm text-gray-900 dark:text-white font-semibold">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].specifications.fuel}</span>
                           </div>
                              <div className="flex flex-col">
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Transmisi</span>
                                <span className="text-xs md:text-sm text-gray-900 dark:text-white font-semibold">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].specifications.transmission}</span>
                           </div>
                         </div>
                           </div>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-5 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                              <div className="flex flex-col">
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">AC</span>
                                <span className="text-xs md:text-sm text-gray-900 dark:text-white font-semibold break-words">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].specifications.ac}</span>
                           </div>
                              <div className="flex flex-col md:col-span-2">
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Entertainment</span>
                                <span className="text-xs md:text-sm text-gray-900 dark:text-white font-semibold break-words">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].specifications.entertainment}</span>
                              </div>
                            </div>
                            <div className="mt-4 md:mt-5">
                              <div className="flex flex-col">
                                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Safety</span>
                                <span className="text-xs md:text-sm text-gray-900 dark:text-white font-semibold break-words">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].specifications.safety}</span>
                              </div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Features */}
                      <div className="mb-6 md:mb-8">
                        <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Fitur Utama</h4>
                        <div className="grid grid-cols-1 gap-3 md:gap-4">
                         {VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${feature.color} flex-shrink-0`} />
                              <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 break-words">{feature.text}</span>
                           </div>
                         ))}
                       </div>
                     </div>

                     {/* Suitable For */}
                      <div className="mb-6 md:mb-8">
                        <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Cocok Untuk</h4>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                         {VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].suitable.map((item, index) => (
                            <span key={index} className="bg-ocean/10 text-ocean dark:text-ocean-light px-4 py-3 md:px-5 md:py-3 rounded-full text-sm md:text-base font-medium border border-ocean/20 break-words">
                             {item}
                           </span>
                         ))}
                       </div>
                     </div>

                     {/* Price and Action */}
                      <div className="bg-gradient-to-r from-ocean/5 to-blue-50 dark:from-ocean/10 dark:to-blue-900/20 p-4 md:p-6 rounded-xl border border-ocean/20">
                        <div className="flex flex-col gap-3 md:gap-0 mb-6">
                          <div className="text-center md:text-left">
                            <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">Harga Sewa</h4>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Termasuk driver & bensin</p>
                         </div>
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-ocean dark:text-ocean-light">
                             {VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].price}
                           </div>
                            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">per perjalanan</div>
                         </div>
                       </div>

                        {/* Rental Duration Pricing */}
                        <div className="mb-6">
                          <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Pilihan Durasi Sewa</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">1 Hari</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].price}</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center relative">
                              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">PROMO</div>
                              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">2 Hari</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
                              <div className="text-xs text-red-600 font-medium">-10%</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center relative">
                              <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">HOT</div>
                              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">3 Hari</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
                              <div className="text-xs text-orange-600 font-medium">-15%</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center relative">
                              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">BEST</div>
                              <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">1 Minggu</div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">{VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</div>
                              <div className="text-xs text-green-600 font-medium">-25%</div>
                            </div>
                          </div>
                        </div>

                        {/* Promotional Offers */}
                        <div className="mb-6">
                          <h5 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Penawaran Spesial</h5>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-green-700 dark:text-green-300">Gratis antar jemput area Jakarta</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-blue-700 dark:text-blue-300">Free cancellation 24 jam sebelum keberangkatan</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-sm text-purple-700 dark:text-purple-300">Bonus air mineral & snack untuk perjalanan lebih dari 2 hari</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 mb-6">
                         <button
                           onClick={() => {
                              // Close modal first, then set selected vehicle
                             setShowVehicleDetails(null);
                              // Small delay to ensure modal is closed before updating state
                              setTimeout(() => {
                                setSelectedVehicle(showVehicleDetails);
                              }, 100);
                           }}
                            className="w-full md:w-auto bg-ocean hover:bg-ocean/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-base"
                         >
                           Pilih Kendaraan Ini
                         </button>
                         <a 
                           href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya tertarik dengan ${VEHICLE_DATA[showVehicleDetails as keyof typeof VEHICLE_DATA].name}. Mohon info detail dan ketersediaan.`)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors text-center text-base"
                         >
                           Tanya via WhatsApp
                         </a>
                       </div>
                     </div>
                   </div>
                 </div>
                                      {/* Additional bottom padding to ensure buttons are fully visible */}
                 <div className="h-6 md:h-8"></div>
                 
                 {/* Additional padding for mobile to prevent content cutoff */}
                 <div className="h-16 md:h-8"></div>
               </div>
             </div>
           )}

          {/* Selected Vehicle Summary */}
          {selectedVehicle && (
             <div id="selected-vehicle-summary" className="max-w-4xl mx-auto mt-8">
               <Card className="border border-ocean/20 dark:border-ocean/30 bg-gradient-to-r from-ocean/5 to-blue-50 dark:from-ocean/10 dark:to-blue-900/20">
                <CardContent className="p-6">
                   {/* Vehicle Image */}
                   <div className="mb-6 text-center">
                     <div className="relative inline-block">
                       <img
                         src={VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].image}
                         alt={VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].name}
                         className="w-48 h-32 md:w-64 md:h-40 object-cover rounded-lg shadow-md"
                       />
                       <div className="absolute -top-2 -right-2 bg-ocean text-white text-xs px-2 py-1 rounded-full font-medium">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].type}
                       </div>
                     </div>
                   </div>
                   
                   {/* Quick Info Cards */}
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                     <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                       <div className="text-2xl font-bold text-ocean dark:text-ocean-light">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].capacity.split(' ')[0]}
                       </div>
                       <div className="text-xs text-gray-600 dark:text-gray-400">Seat</div>
                     </div>
                     <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                       <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].type === 'Motor' ? '2' : '4'}
                       </div>
                       <div className="text-xs text-gray-600 dark:text-gray-400">Bagasi</div>
                     </div>
                     <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                       <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].type === 'Motor' ? '150' : '500'}
                       </div>
                       <div className="text-xs text-gray-600 dark:text-gray-400">CC</div>
                     </div>
                     <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                       <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].type === 'Motor' ? 'Manual' : 'Auto'}
                       </div>
                       <div className="text-xs text-gray-600 dark:text-gray-400">Transmisi</div>
                     </div>
                   </div>

                   {/* Estimated Pricing Section */}
                   <div className="mb-6">
                     <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">Estimasi Harga Sewa:</h4>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                         <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">1 Hari</div>
                         <div className="text-sm font-semibold text-gray-900 dark:text-white">
                           {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price}
                         </div>
                         <div className="text-xs text-gray-500">Regular</div>
                       </div>
                       <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center relative">
                         <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">PROMO</div>
                         <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">2 Hari</div>
                         <div className="text-sm font-semibold text-gray-900 dark:text-white">
                           {(() => {
                             const basePrice = parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, ''));
                             const discountedPrice = Math.round(basePrice * 1.8); // 2 days with 10% discount
                             return `Rp ${discountedPrice.toLocaleString('id-ID')}`;
                           })()}
                         </div>
                         <div className="text-xs text-red-600 font-medium">-10%</div>
                       </div>
                       <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center relative">
                         <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">HOT</div>
                         <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">3 Hari</div>
                         <div className="text-sm font-semibold text-gray-900 dark:text-white">
                           {(() => {
                             const basePrice = parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, ''));
                             const discountedPrice = Math.round(basePrice * 2.55); // 3 days with 15% discount
                             return `Rp ${discountedPrice.toLocaleString('id-ID')}`;
                           })()}
                         </div>
                         <div className="text-xs text-orange-600 font-medium">-15%</div>
                       </div>
                       <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-center relative">
                         <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">BEST</div>
                         <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">1 Minggu</div>
                         <div className="text-sm font-semibold text-gray-900 dark:text-white">
                           {(() => {
                             const basePrice = parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, ''));
                             const discountedPrice = Math.round(basePrice * 5.25); // 7 days with 25% discount
                             return `Rp ${discountedPrice.toLocaleString('id-ID')}`;
                           })()}
                         </div>
                         <div className="text-xs text-green-600 font-medium">-25%</div>
                       </div>
                     </div>
                   </div>
                   
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div className="flex-1">
                       <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                         ✓ Kendaraan Terpilih
                      </h3>
                       <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].name}
                       </p>
                       <p className="text-sm text-gray-600 dark:text-gray-300">
                         {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].capacity} • {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].type}
                      </p>
                    </div>
                     <div className="text-center md:text-right">
                       <div className="text-2xl md:text-3xl font-bold text-ocean dark:text-ocean-light mb-1">
                        {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Harga dari {data.city}</div>
                    </div>
                  </div>
                                                          {/* Vehicle Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Fitur Unggulan:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].features.slice(0, 6).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 bg-ocean rounded-full mr-2 flex-shrink-0"></div>
                            {feature.text}
                          </div>
                        ))}
                      </div>
                    </div>
                   
                   {/* Action Buttons */}
                   <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya ingin sewa ${VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].name} dari ${data.city} ke Sawarna untuk ${selectedPassengers} orang. Mohon info ketersediaan & estimasi biaya.`)}`} target="_blank" rel="noopener noreferrer">
                       <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-base py-3 px-6" title="Pesan kendaraan via WhatsApp">
                         <Phone className="w-4 h-4 mr-2" />
                         Pesan Sekarang
                       </Button>
                     </a>
                     <Button variant="outline" onClick={() => {
                       const element = document.getElementById('price-calculator');
                       if (element) {
                         element.scrollIntoView({
                           behavior: 'smooth',
                           block: 'start'
                         });
                       }
                     }} className="w-full sm:w-auto text-base py-3 px-6" title="Isi form booking">
                       <Mail className="w-4 h-4 mr-2" />
                      Isi Form Booking
                    </Button>
                  </div>
                   
                   {/* Additional Info */}
                   <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                     <div className="flex items-start">
                       <div className="w-5 h-5 bg-blue-500 rounded-full mr-3 mt-0.5 flex-shrink-0"></div>
                       <div className="text-sm text-blue-800 dark:text-blue-200">
                         <p className="font-medium mb-1">💡 Tips Booking:</p>
                         <p>• Pesan minimal 3 hari sebelum keberangkatan</p>
                         <p>• Gratis antar jemput area {data.city}</p>
                         <p>• Free cancellation 24 jam sebelum keberangkatan</p>
                       </div>
                     </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Price Calculator */}
          {selectedVehicle && (
            <div id="price-calculator" className="max-w-4xl mx-auto mt-8">
              <Card className="border border-gray-100 dark:border-gray-700">
                 <CardHeader className="text-center">
                   <CardTitle className="text-xl md:text-2xl dark:text-white">Kalkulator Harga</CardTitle>
                   <CardDescription className="text-sm md:text-base">Hitung estimasi biaya perjalanan Anda</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Options */}
                     <div className="space-y-6">
                      <div>
                         <Label htmlFor="trip-type" className="text-sm font-medium">Tipe Perjalanan</Label>
                        <Select value={tripType} onValueChange={setTripType}>
                           <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Pilih tipe perjalanan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="one-way">Sekali Jalan</SelectItem>
                            <SelectItem value="round-trip">Pulang Pergi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                         <Label htmlFor="date" className="text-sm font-medium">Tanggal Keberangkatan</Label>
                        <Input 
                          id="date" 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value);
                            const date = new Date(e.target.value);
                            const day = date.getDay();
                            setIsWeekend(day === 0 || day === 6); // Sunday or Saturday
                          }}
                           className="mt-2"
                        />
                      </div>

                       <div className="space-y-4">
                         <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <input
                            type="checkbox"
                            id="weekend"
                            title="Weekend surcharge"
                            checked={isWeekend}
                            onChange={(e) => setIsWeekend(e.target.checked)}
                             className="rounded border-gray-300 w-4 h-4"
                          />
                           <Label htmlFor="weekend" className="text-sm flex-1">
                             <span className="font-medium">Weekend (Sabtu/Minggu)</span>
                             <span className="block text-xs text-gray-500">+10% tambahan</span>
                          </Label>
                        </div>

                         <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <input
                            type="checkbox"
                            id="peak-season"
                            title="Peak season surcharge"
                            checked={isPeakSeason}
                            onChange={(e) => setIsPeakSeason(e.target.checked)}
                             className="rounded border-gray-300 w-4 h-4"
                          />
                           <Label htmlFor="peak-season" className="text-sm flex-1">
                             <span className="font-medium">Musim Puncak (Libur Nasional)</span>
                             <span className="block text-xs text-gray-500">+20% tambahan</span>
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Price Display */}
                    <div className="space-y-4">
                       <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                         <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">Estimasi Harga</h4>
                         <div className="space-y-3 text-sm">
                           <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                            <span className="text-gray-600 dark:text-gray-300">Harga Dasar:</span>
                             <span className="font-semibold text-gray-900 dark:text-white">
                              {formatPrice(parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '')))}
                            </span>
                          </div>
                          {isWeekend && (
                             <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                               <span className="text-orange-600">Weekend (+10%):</span>
                               <span className="font-semibold text-orange-600">+{formatPrice(parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '')) * 0.1)}</span>
                            </div>
                          )}
                          {isPeakSeason && (
                             <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                               <span className="text-red-600">Musim Puncak (+20%):</span>
                               <span className="font-semibold text-red-600">+{formatPrice(parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '')) * 0.2)}</span>
                            </div>
                          )}
                          {tripType === 'round-trip' && (
                             <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                               <span className="text-blue-600">Pulang Pergi (+80%):</span>
                               <span className="font-semibold text-blue-600">+{formatPrice(parseInt(VEHICLE_DATA[selectedVehicle as keyof typeof VEHICLE_DATA].price.replace(/[^\d]/g, '')) * 0.8)}</span>
                            </div>
                          )}
                           <div className="flex justify-between items-center pt-3">
                             <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                             <span className="text-2xl font-bold text-ocean dark:text-ocean-light">
                              {formatPrice(calculatePrice())}
                            </span>
                          </div>
                        </div>
                      </div>

                       <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
                         <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                           <span className="font-bold text-green-800 dark:text-green-200">Yang Termasuk:</span>
                        </div>
                         <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                           <li className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                             Driver berpengalaman
                           </li>
                           <li className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                             Bensin penuh
                           </li>
                           <li className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                             Air mineral gratis
                           </li>
                           <li className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                             Tol dan parkir
                           </li>
                           <li className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                             Asuransi kendaraan
                           </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-gradient-to-r from-ocean/5 to-blue-50 dark:from-ocean/10 dark:to-blue-900/20">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Penawaran Khusus</h2>
            <p className="text-gray-600 dark:text-gray-300">Promo menarik untuk perjalanan Anda ke Sawarna</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Early Bird Promo */}
            <Card className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 dark:text-orange-200">Early Bird</h3>
                    <p className="text-sm text-orange-600 dark:text-orange-300">Booking 7 hari sebelumnya</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-orange-800 dark:text-orange-200">Diskon 15%</div>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Hemat hingga Rp 500.000 untuk booking minimal 7 hari sebelumnya
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Group Discount */}
            <Card className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800 dark:text-green-200">Group Discount</h3>
                    <p className="text-sm text-green-600 dark:text-green-300">Minimal 10 orang</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-800 dark:text-green-200">Diskon 20%</div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Semakin banyak orang, semakin hemat! Berlaku untuk grup minimal 10 orang
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Round Trip Promo */}
            <Card className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 dark:text-blue-200">Pulang Pergi</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-300">Paket lengkap</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">Hemat 20%</div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Paket pulang pergi dengan diskon khusus, bukan 2x harga
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                🎉 Promo Terbatas!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Dapatkan <span className="font-bold text-ocean dark:text-ocean-light">gratis 1 malam menginap</span> di VillaSawarna 
                untuk setiap booking transport minimal Rp 2.000.000
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya tertarik dengan promo transport + gratis menginap dari ${data.city}. Mohon info detail dan syarat ketentuan.`)}`} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700">Klaim Promo Sekarang</Button>
                </a>
                <Button variant="outline">Lihat Syarat & Ketentuan</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="w-full h-64 md:h-80 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img src={data.image} alt={`Transport dari ${data.city}`} className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Features */}
              <Card className="border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl dark:text-white">Keunggulan Layanan</CardTitle>
                  <CardDescription>Mengapa memilih transportasi dari {data.city}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {data.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Popular Routes */}
              <Card className="border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl dark:text-white">Rute Populer</CardTitle>
                  <CardDescription>Jalur perjalanan yang sering dipilih</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.popularRoutes.map((route, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{route.from} → {route.to}</div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{route.duration}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Pickup Points */}
              <Card id="pickup-points" className="border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">Titik Penjemputan</CardTitle>
                  <CardDescription>Lokasi yang bisa kami jemput</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {data.pickupPoints.map((point, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">Info Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-300">Jarak</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.distanceKm}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-300">Durasi</span>
                    <span className="font-medium text-gray-900 dark:text-white">{data.duration}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-gray-600 dark:text-gray-300">Harga</span>
                    <span className="font-semibold text-ocean dark:text-ocean-light">{data.priceFrom}</span>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border border-ocean/20 dark:border-ocean/30">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    Siap Berangkat dari {data.city}?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Hubungi kami untuk booking dan konsultasi rute terbaik.
                  </p>
                  <div className="space-y-2">
                    <a href={`https://wa.me/6283877080088?text=${encodeURIComponent(`Halo VillaSawarna, saya ingin sewa kendaraan dari ${data.city} ke Sawarna. Mohon info ketersediaan & estimasi biaya.`)}`} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-green-600 hover:bg-green-700">Chat WhatsApp</Button>
                    </a>
                    <a href="tel:+6283877080088">
                      <Button variant="outline" className="w-full">Telepon Sekarang</Button>
                    </a>
                    
                    {/* Share Buttons */}
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Bagikan ke:</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Transport dari ${data.city} ke Sawarna - VillaSawarna`;
                            if (navigator.share) {
                              navigator.share({
                                title: text,
                                text: text,
                                url: url
                              });
                            } else {
                              navigator.clipboard.writeText(url);
                              alert('Link berhasil disalin!');
                            }
                          }}
                          className="flex-1 py-2 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                          title="Bagikan"
                        >
                          📤 Bagikan
                        </button>
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Transport dari ${data.city} ke Sawarna - VillaSawarna`;
                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
                          }}
                          className="flex-1 py-2 px-3 text-xs bg-blue-800 hover:bg-blue-900 text-white rounded transition-colors"
                          title="Share ke Facebook"
                        >
                          📘 Facebook
                        </button>
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = `Transport dari ${data.city} ke Sawarna - VillaSawarna`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                          }}
                          className="flex-1 py-2 px-3 text-xs bg-sky-500 hover:bg-sky-600 text-white rounded transition-colors"
                          title="Share ke Twitter"
                        >
                          🐦 Twitter
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                         </div>
           </div>
         </div>
       </section>

       {/* Gallery Section */}
       <section className="py-12 bg-gray-50 dark:bg-gray-800">
         <div className="container-custom">
           <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Galeri Perjalanan</h2>
             <p className="text-gray-600 dark:text-gray-300">Momen-momen perjalanan dari {data.city} ke Sawarna</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {data.gallery.map((image, index) => (
               <div 
                 key={index} 
                 className={`cursor-pointer rounded-lg overflow-hidden transition-transform hover:scale-105 ${selectedImage === index ? 'ring-2 ring-ocean' : ''}`}
                 onClick={() => setSelectedImage(index)}
               >
                 <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover" loading="lazy" />
               </div>
             ))}
           </div>
           <div className="mt-6">
             <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
               <img src={data.gallery[selectedImage]} alt="Selected gallery image" className="w-full h-full object-cover" />
             </div>
           </div>
         </div>
       </section>

       {/* Testimonials Section */}
       <section className="py-12">
         <div className="container-custom">
           <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Testimoni Pelanggan</h2>
             <p className="text-gray-600 dark:text-gray-300">Pengalaman nyata dari pelanggan yang sudah menggunakan layanan kami</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {data.testimonials.map((testimonial, index) => (
               <Card key={index} className="border border-gray-100 dark:border-gray-700">
                 <CardContent className="p-6">
                   <div className="flex items-center gap-1 mb-3">
                     {[...Array(testimonial.rating)].map((_, i) => (
                       <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                     ))}
                   </div>
                   <blockquote className="text-gray-700 dark:text-gray-200 mb-4">
                     "{testimonial.comment}"
                   </blockquote>
                   <div className="flex items-center justify-between">
                     <div>
                       <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                       <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.location}</div>
                     </div>
                     <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</div>
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
           <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Pertanyaan yang Sering Diajukan</h2>
             <p className="text-gray-600 dark:text-gray-300">Jawaban untuk pertanyaan umum tentang perjalanan dari {data.city}</p>
           </div>
           <div className="max-w-3xl mx-auto space-y-4">
             {data.faq.map((item, index) => (
               <Card key={index} className="border border-gray-100 dark:border-gray-700">
                 <CardContent className="p-0">
                   <button
                     className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                     onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                   >
                     <span className="font-semibold text-gray-900 dark:text-white">{item.question}</span>
                     {expandedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                   </button>
                   {expandedFaq === index && (
                     <div className="px-6 pb-6">
                       <p className="text-gray-700 dark:text-gray-200">{item.answer}</p>
                     </div>
                   )}
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
       </section>

       {/* Additional Info Section */}
       <section className="py-12">
         <div className="container-custom">
           <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Informasi Tambahan</h2>
             <p className="text-gray-600 dark:text-gray-300">Tips dan informasi penting untuk perjalanan Anda</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <Card className="border border-gray-100 dark:border-gray-700">
               <CardContent className="p-6 text-center">
                 <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                 <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Waktu Terbaik</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-300">{data.additionalInfo.bestTime}</p>
               </CardContent>
             </Card>
             <Card className="border border-gray-100 dark:border-gray-700">
               <CardContent className="p-6 text-center">
                 <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                 <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Kondisi Jalan</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-300">{data.additionalInfo.roadCondition}</p>
               </CardContent>
             </Card>
             <Card className="border border-gray-100 dark:border-gray-700">
               <CardContent className="p-6 text-center">
                 <Info className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                 <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cuaca</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-300">{data.additionalInfo.weather}</p>
               </CardContent>
             </Card>
             <Card className="border border-gray-100 dark:border-gray-700">
               <CardContent className="p-6 text-center">
                 <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                 <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tips Perjalanan</h3>
                 <ul className="text-sm text-gray-600 dark:text-gray-300 text-left">
                   {data.additionalInfo.tips.map((tip, index) => (
                     <li key={index} className="mb-1">• {tip}</li>
                   ))}
                 </ul>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

       {/* Pricing Details Section */}
       <section className="py-12 bg-gray-50 dark:bg-gray-800">
         <div className="container-custom">
           <div className="text-center mb-8">
             <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Detail Harga</h2>
             <p className="text-gray-600 dark:text-gray-300">Transparansi harga untuk perjalanan dari {data.city}</p>
           </div>
           <div className="max-w-4xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <Card className="border border-gray-100 dark:border-gray-700">
                 <CardContent className="p-6 text-center">
                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Harga Normal</h3>
                   <div className="text-2xl font-bold text-ocean dark:text-ocean-light mb-2">{data.pricing.base}</div>
                   <p className="text-sm text-gray-600 dark:text-gray-300">Hari kerja</p>
                 </CardContent>
               </Card>
               <Card className="border border-gray-100 dark:border-gray-700">
                 <CardContent className="p-6 text-center">
                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Weekend</h3>
                   <div className="text-2xl font-bold text-ocean dark:text-ocean-light mb-2">{data.pricing.weekend}</div>
                   <p className="text-sm text-gray-600 dark:text-gray-300">Sabtu & Minggu</p>
                 </CardContent>
               </Card>
               <Card className="border border-gray-100 dark:border-gray-700">
                 <CardContent className="p-6 text-center">
                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Libur Nasional</h3>
                   <div className="text-2xl font-bold text-ocean dark:text-ocean-light mb-2">{data.pricing.peak}</div>
                   <p className="text-sm text-gray-600 dark:text-gray-300">Hari libur</p>
                 </CardContent>
               </Card>
             </div>
             <Card className="border border-gray-100 dark:border-gray-700">
               <CardHeader>
                 <CardTitle className="text-xl dark:text-white">Yang Termasuk dalam Harga</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {data.pricing.includes.map((item, index) => (
                     <div key={index} className="flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                       <span className="text-gray-700 dark:text-gray-200">{item}</span>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>
               </section>

        {/* Booking Form Section */}
       <section className="py-12">
         <div className="container-custom">
           <div className="max-w-2xl mx-auto">
             <div className="text-center mb-8">
               <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Form Pemesanan</h2>
               <p className="text-gray-600 dark:text-gray-300">Isi form di bawah ini untuk memesan transportasi dari {data.city}</p>
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
                       <Label htmlFor="pickup">Lokasi Penjemputan Detail</Label>
                       <Input id="pickup" placeholder={`Alamat lengkap di ${data.city}`} required />
                     </div>
                     <div>
                       <Label htmlFor="date">Tanggal Keberangkatan</Label>
                       <Input id="date" type="date" required />
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <Label htmlFor="time">Waktu Penjemputan</Label>
                       <Input id="time" type="time" required />
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
                   </div>
                   
                   <div>
                     <Label htmlFor="vehicle">Tipe Kendaraan</Label>
                     <Select>
                       <SelectTrigger>
                         <SelectValue placeholder="Pilih tipe kendaraan" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="avanza">Avanza/Xenia</SelectItem>
                         <SelectItem value="innova">Innova/Reborn</SelectItem>
                         <SelectItem value="hiace">Hiace/Elf</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   
                   <div>
                     <Label htmlFor="message">Pesan Tambahan</Label>
                     <Textarea id="message" placeholder="Kebutuhan khusus, alamat detail, dll." rows={3} />
                   </div>
                   
                   <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                     Kirim Permintaan Booking
                   </Button>
                 </form>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

       {/* Back to Top Button */}
       {showBackToTop && (
         <button
           onClick={scrollToTop}
           className="fixed bottom-6 right-6 z-50 p-3 bg-ocean hover:bg-ocean/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
           title="Kembali ke atas"
         >
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
           </svg>
         </button>
       )}
     </div>
   );
 };

export default AreaDetail;

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Car, Wifi, Camera, Sunrise, Sunset, Waves, Mountain, Coffee } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useTranslation } from 'react-i18next';

interface LocationCard {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  distance: string;
  rating: number;
  reviews: number;
  bestTime: string;
  activities: string[];
  highlights: string[];
  route: string;
  icon: React.ReactNode;
  color: string;
}

const FavoriteLocations: React.FC = () => {
  const { t } = useTranslation('common');
  const favoriteLocations: LocationCard[] = [
    {
      id: 'pantai-sawarna',
      name: 'Pantai Sawarna',
      subtitle: 'Pantai Indah dengan Ombak Terbaik',
      description: 'Pantai utama Sawarna dengan pasir putih, ombak yang cocok untuk surfing, dan sunset yang memukau.',
      image: '/images/sawarna-beach-1.jpeg',
      distance: '0.5 km dari pusat',
      rating: 4.8,
      reviews: 1250,
      bestTime: 'Mei - September',
      activities: ['Surfing', 'Sunset', 'Foto', 'Berjalan-jalan'],
      highlights: ['Ombak terbaik', 'Pasir putih', 'View sunset', 'Akses mudah'],
      route: '/destinations',
      icon: <Waves className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tanjung-layar',
      name: 'Tanjung Layar',
      subtitle: 'Spot Sunrise & Fenomena Ombak',
      description: 'Tanjung yang menjorok ke laut dengan view sunrise spektakuler dan ombak yang menantang.',
      image: '/images/sawarna-beach-2.jpeg',
      distance: '2 km dari pusat',
      rating: 4.9,
      reviews: 890,
      bestTime: 'Juni - Agustus',
      activities: ['Sunrise', 'Surfing', 'Foto', 'Camping'],
      highlights: ['Sunrise terbaik', 'Ombak besar', 'View spektakuler', 'Spot foto'],
      route: '/destinations',
      icon: <Sunrise className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'goa-langir',
      name: 'Goa Langir',
      subtitle: 'Gua Alam dengan Stalaktit Indah',
      description: 'Gua alam yang menakjubkan dengan stalaktit dan stalagmit yang terbentuk ribuan tahun.',
      image: '/images/sawarna-beach-3.jpeg',
      distance: '3 km dari pusat',
      rating: 4.6,
      reviews: 567,
      bestTime: 'Sepanjang tahun',
      activities: ['Caving', 'Foto', 'Edukasi', 'Petualangan'],
      highlights: ['Stalaktit indah', 'Suhu sejuk', 'Petualangan', 'Edukasi alam'],
      route: '/destinations',
      icon: <Mountain className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'legon-pari',
      name: 'Legon Pari',
      subtitle: 'Pantai Secluded & Sunset Golden',
      description: 'Pantai yang lebih sepi dengan sunset golden hour yang sempurna untuk foto dan relaksasi.',
      image: '/images/sawarna-beach-4.jpeg',
      distance: '1.5 km dari pusat',
      rating: 4.7,
      reviews: 432,
      bestTime: 'April - Oktober',
      activities: ['Sunset', 'Foto', 'Relaksasi', 'Snorkeling'],
      highlights: ['Sunset golden', 'Lebih sepi', 'Air jernih', 'Spot foto'],
      route: '/destinations',
      icon: <Sunset className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm mb-4">
            <MapPin className="w-5 h-5 text-coral" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('home.favoriteLocations.badge', 'Destinasi Favorit')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.favoriteLocations.title', 'Jelajahi Lokasi Terbaik di Sawarna')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.favoriteLocations.subtitle', 'Temukan spot-spot menarik yang wajib dikunjungi saat liburan di Sawarna. Dari pantai indah hingga gua alam yang menakjubkan.')}
          </p>
        </div>

        {/* Location Cards Grid - Mobile 2x2, Desktop lebih lega */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
          {favoriteLocations.map((location) => (
            <div
              key={location.id}
              className="group bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-1 md:hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-32 md:h-48 overflow-hidden">
                <OptimizedImage
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  quality={85}
                />
                {/* Overlay with Icon */}
                <div className={`absolute top-2 right-2 md:top-3 md:right-3 bg-gradient-to-r ${location.color} p-1.5 md:p-2 rounded-full text-white shadow-lg`}>
                  {location.icon}
                </div>
                {/* Distance Badge */}
                <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-black/70 text-white px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium">
                  {location.distance}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-3 md:p-5">
                {/* Title & Rating */}
                <div className="mb-2 md:mb-3">
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 group-hover:text-coral transition-colors line-clamp-1">
                    {location.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 md:mb-2 line-clamp-1">
                    {location.subtitle}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < Math.floor(location.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {location.rating} ({location.reviews} {t('home.favoriteLocations.reviews', 'ulasan')})
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-4 line-clamp-2">
                  {location.description}
                </p>

                {/* Best Time */}
                <div className="flex items-center gap-2 mb-2 md:mb-3 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{t('home.favoriteLocations.bestTime', 'Waktu terbaik')}: {location.bestTime}</span>
                </div>

                {/* Activities */}
                <div className="mb-4">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    {t('home.favoriteLocations.popularActivities', 'Aktivitas Populer:')}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {location.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-3 md:mb-4">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                    {t('home.favoriteLocations.highlights', 'Keunggulan:')}
                  </h4>
                  <div className="space-y-1">
                    {location.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-coral rounded-full"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={location.route}
                  className="block w-full bg-gradient-to-r from-coral to-coral-dark hover:from-coral-dark hover:to-coral text-white text-center py-2 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-sm"
                >
                  {t('home.favoriteLocations.exploreNow', 'Jelajahi Sekarang')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t('home.favoriteLocations.ctaTitle', 'Ingin Jelajahi Semua Destinasi?')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('home.favoriteLocations.ctaSubtitle', 'Dapatkan panduan lengkap, tips terbaik, dan rekomendasi lokasi favorit lainnya.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/destinations"
                className="bg-gradient-to-r from-ocean to-ocean-dark hover:from-ocean-dark hover:to-ocean text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                {t('home.favoriteLocations.viewAll', 'Lihat Semua Destinasi')}
              </Link>
              <Link
                to="/map"
                className="bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light border-2 border-ocean dark:border-ocean-light px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-ocean hover:text-white dark:hover:bg-ocean"
              >
                {t('home.favoriteLocations.openMap', 'Buka Peta Interaktif')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavoriteLocations;

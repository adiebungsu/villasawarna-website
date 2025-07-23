import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { getAllDestinations } from '@/data/destinations';
import SEO from '@/components/SEO';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FeaturedProperties from '@/components/FeaturedProperties';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import OptimizedImage from '@/components/OptimizedImage';
import { destinationsData } from '@/data/destinations';
import { getVillasData } from '@/data/properties';

const Home = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'beach' | 'waterfall' | 'cave'>('all');
  const [filter, setFilter] = useState<'all' | 'pantai-sawarna' | 'goa-langir' | 'legon-pari'>('all');
  const destinations = getAllDestinations();
  const navigate = useNavigate();
  const villasData = getVillasData();

  const filteredDestinations = destinationsData.filter(destination => {
    if (activeTab === 'all') return true;
    return destination.types.includes(activeTab);
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <SEO 
          title="VillaSawarna - Tempat Menginap Terbaik di Sawarna"
          description="Nikmati pengalaman menginap terbaik di Sawarna dengan VillaSawarna. Villa mewah dengan pemandangan pantai yang menakjubkan."
          keywords="villa sawarna, penginapan sawarna, hotel sawarna, pantai sawarna"
        />
        
        {/* Main Content */}
        <div className="flex-grow">
          <Hero />

          {/* Destinations Section */}
          <section className="container-custom py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Destinasi Wisata Sawarna</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Temukan berbagai destinasi wisata menarik di Sawarna, dari pantai yang indah hingga air terjun yang menakjubkan.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={activeTab === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveTab('all')}
              >
                Semua
              </Button>
              <Button
                variant={activeTab === 'beach' ? 'default' : 'outline'}
                onClick={() => setActiveTab('beach')}
              >
                Pantai
              </Button>
              <Button
                variant={activeTab === 'waterfall' ? 'default' : 'outline'}
                onClick={() => setActiveTab('waterfall')}
              >
                Air Terjun
              </Button>
              <Button
                variant={activeTab === 'cave' ? 'default' : 'outline'}
                onClick={() => setActiveTab('cave')}
              >
                Gua
              </Button>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  to={`/destinations/${destination.id}`}
                  className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={destination.mainImage}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {destination.types.map((type) => (
                          <span key={type} className="bg-coral/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {type === 'beach' ? 'Pantai' :
                             type === 'waterfall' ? 'Air Terjun' :
                             type === 'cave' ? 'Gua' :
                             type === 'rock' ? 'Karang' : type}
                          </span>
                        ))}
                        <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {destination.location}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-white">{destination.rating}</span>
                          <span className="text-white/80 text-sm ml-1">({destination.reviews} ulasan)</span>
                        </div>
                        {destination.price && (
                          <div className="text-white">
                            Mulai dari Rp {destination.price.toLocaleString('id-ID')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/destinations">
                <Button variant="outline" size="lg">
                  Lihat Semua Destinasi
                </Button>
              </Link>
            </div>
          </section>

          <FeaturedProperties />
          
          <FeaturedDestinations />

          {/* Akomodasi Pilihan */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Akomodasi Pilihan</h2>
              <Link to="/villas" className="text-ocean hover:text-ocean-dark text-sm font-medium">
                Lihat Semua
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {villasData.slice(0, 6).map((villa) => (
                <PropertyCard key={villa.id} {...villa} propertyReviews={[]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home; 
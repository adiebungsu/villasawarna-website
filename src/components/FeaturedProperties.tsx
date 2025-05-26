import { useState, useMemo } from "react";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getAllProperties, getPropertiesByLocation, extractMainLocation } from "@/data/properties";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from './OptimizedImage';
import useEmblaCarousel from 'embla-carousel-react';

const FeaturedProperties = () => {
  const [filter, setFilter] = useState<'all' | 'goa-langir' | 'pulo-manuk' | 'legon-pari' | 'pantai-sawarna'>('all');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1
  });
  
  // Use all properties instead of just featured ones to show more properties per location
  const properties = useMemo(() => {
    const allProperties = getAllProperties();
    // Limit to top rated properties first (up to 8 per location)
    return allProperties
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 24); // Get a good sample size
  }, []);
  
  const filteredProperties = useMemo(() => {
    if (filter === 'all') {
      return properties.slice(0, 8); // Show top 8 for "all" filter
    }
    
    return properties.filter(property => {
      const locationLower = property.location.toLowerCase();
      switch (filter) {
        case 'goa-langir':
          return locationLower.includes('goa langir') || locationLower.includes('goa');
        case 'pulo-manuk':
          return locationLower.includes('pulo manuk');
        case 'pantai-sawarna':
          return locationLower.includes('pantai sawarna') || locationLower.includes('tepi pantai');
        case 'legon-pari':
          return locationLower.includes('legon pari') || locationLower.includes('legon');
        default:
          return true;
      }
    }).slice(0, 8); // Limit to 8 properties per category
  }, [properties, filter]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 bg-sand-light dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Akomodasi Pilihan</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Temukan penginapan terbaik di Sawarna dengan pemandangan menakjubkan dan fasilitas modern untuk liburan sempurna Anda.
          </p>
        </div>

        {/* Location Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-coral dark:bg-coral-dark' : 'border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white'}
            onClick={() => setFilter('all')}
          >
            Semua Lokasi
          </Button>
          <Button
            variant={filter === 'pantai-sawarna' ? 'default' : 'outline'}
            className={filter === 'pantai-sawarna' ? 'bg-coral dark:bg-coral-dark' : 'border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white'}
            onClick={() => setFilter('pantai-sawarna')}
          >
            Pantai Sawarna
          </Button>
          <Button
            variant={filter === 'goa-langir' ? 'default' : 'outline'}
            className={filter === 'goa-langir' ? 'bg-coral dark:bg-coral-dark' : 'border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white'}
            onClick={() => setFilter('goa-langir')}
          >
            Goa Langir
          </Button>
          <Button
            variant={filter === 'legon-pari' ? 'default' : 'outline'}
            className={filter === 'legon-pari' ? 'bg-coral dark:bg-coral-dark' : 'border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white'}
            onClick={() => setFilter('legon-pari')}
          >
            Legon Pari
          </Button>
          <Button
            variant={filter === 'pulo-manuk' ? 'default' : 'outline'}
            className={filter === 'pulo-manuk' ? 'bg-coral dark:bg-coral-dark' : 'border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white'}
            onClick={() => setFilter('pulo-manuk')}
          >
            Pulo Manuk
          </Button>
        </div>

        {/* Property Grid */}
        <div className="relative">
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Geser untuk melihat lebih banyak akomodasi pilihan di Sawarna
            </p>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {filteredProperties.map((property) => (
                <div key={property.id} className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0">
                  <PropertyCard
                    id={property.id}
                    name={property.name}
                    type={property.type}
                    image={property.mainImages?.[0] || property.image}
                    price={property.price}
                    rating={property.rating}
                    location={property.location}
                    capacity={property.capacity}
                    reviews={property.reviews}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    amenities={property.amenities}
                    description={property.description || ''}
                    ratingSummary={property.ratingSummary}
                    mainImages={property.mainImages || []}
                    tags={property.tags || []}
                    propertyReviews={property.propertyReviews || []}
                    roomTypes={property.roomTypes || []}
                    nearbyAttractions={property.nearbyAttractions || []}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
            title="Previous slide"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
            title="Next slide"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              size="lg" 
              variant="outline"
              className="border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white m-1"
              asChild
            >
              <Link to="/villas">Lihat Semua Villa</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-ocean text-ocean hover:bg-ocean hover:text-white dark:border-ocean-light dark:text-ocean-light dark:hover:bg-ocean-dark dark:hover:text-white m-1"
              asChild
            >
              <Link to="/homestays">Lihat Semua Homestay</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

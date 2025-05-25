import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getFeaturedDestinations } from "@/data/destinations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

const DestinationCard = ({ destination }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-sand-light dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={imageError ? "/images/placeholder.jpg" : destination.mainImage}
          alt={destination.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-2 right-2 bg-coral/90 dark:bg-coral-dark/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          {destination.type === 'beach' ? 'Pantai' :
           destination.type === 'waterfall' ? 'Air Terjun' :
           destination.type === 'cave' ? 'Gua' :
           destination.type === 'rock' ? 'Batu' : destination.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-ocean dark:text-ocean-light">{destination.name}</h3>
        
        {/* Separator line */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-2"></div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{destination.description}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm dark:text-gray-200">{destination.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">({destination.reviews})</span>
          </div>
          <Link to={`/destination/${destination.id}`}>
            <Button variant="outline" size="sm" className="border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white whitespace-nowrap px-3 w-full">
              Lihat Detail
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedDestinations = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });
  const destinations = getFeaturedDestinations();

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Destinasi Wisata</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Jelajahi keindahan alam Sawarna dengan berbagai destinasi wisata yang menakjubkan.
          </p>
        </div>

        {/* Destinations Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {destinations.map((destination) => (
                <div key={destination.id} className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0">
                  <DestinationCard destination={destination} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
            title="Previous"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-coral dark:text-coral-light" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
            title="Next"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-coral dark:text-coral-light" />
          </button>
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <Button 
            size="lg" 
            variant="outline"
            className="border-coral text-coral hover:bg-coral hover:text-white dark:border-coral-light dark:text-coral-light dark:hover:bg-coral-dark dark:hover:text-white"
            asChild
          >
            <Link to="/destinations">Lihat Semua Destinasi</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations; 
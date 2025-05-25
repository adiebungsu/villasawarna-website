import { useState } from "react";
import { Star, MapPin, Users, BedDouble, Bath, Snowflake, Fan, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { propertyRoomTypes } from "../data/roomTypes";
import { getLowestRoomPrice } from '@/utils/price';
import OptimizedImage from './OptimizedImage';
import QuickView from './QuickView';
import { Button } from "@/components/ui/button";

// Import types from @/types
import { PropertyCardProps, Review, NearbyAttraction, RatingBreakdown, RatingSummary, StarRatingBreakdown, RoomType } from '@/types';

const PropertyCard = ({
  id,
  name,
  type,
  image,
  price,
  rating,
  location,
  capacity,
  reviews,
  bedrooms,
  bathrooms,
  amenities
}: PropertyCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const displayPrice = getLowestRoomPrice(id, price);

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 h-full flex flex-col group">
        {/* Property Image */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <div 
            onClick={handleImageClick}
            className="cursor-pointer w-full h-full"
          >
            <OptimizedImage 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
              quality={85}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              width={800}
              height={450}
            />
            <div className="absolute top-2 left-2 bg-ocean dark:bg-ocean-dark text-white text-[10px] md:text-xs font-medium px-2 py-0.5 rounded">
              {type === 'villa' ? 'Villa' : 
               type === 'homestay' ? 'Homestay' :
               type === 'hotel' ? 'Hotel' : 'Apartemen'}
            </div>
          </div>
          
          {/* Quick View Button */}
          <Button
            onClick={handleImageClick}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 
              bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm
              text-ocean dark:text-ocean-light border border-ocean/20 dark:border-ocean-light/20
              shadow-sm hover:shadow-md transition-all duration-200
              h-6 sm:h-9 px-1.5 sm:px-3
              text-[10px] sm:text-sm font-medium
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100
              z-10"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">Quick View</span>
            <span className="sm:hidden">Lihat</span>
          </Button>
        </div>
        
        {/* Property Information */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-white line-clamp-2">{name}</h3>
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} className="text-ocean dark:text-ocean-light flex-shrink-0" />
            <span className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-ocean dark:text-ocean-light flex-shrink-0" />
            <span className="text-[10px] md:text-xs text-gray-600 dark:text-gray-300">{capacity} tamu</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="flex items-center text-ocean dark:text-ocean-light">
              <Snowflake size={14} className="mr-1 flex-shrink-0" />
              <span className="text-[10px] md:text-xs">AC</span>
            </div>
            <div className="flex items-center text-ocean dark:text-ocean-light">
              <Fan size={14} className="mr-1 flex-shrink-0" />
              <span className="text-[10px] md:text-xs">Kipas</span>
            </div>
            <div className="flex items-center text-ocean dark:text-ocean-light">
              <Bath size={14} className="mr-1 flex-shrink-0" />
              <span className="text-[10px] md:text-xs line-clamp-1">Kamar Mandi</span>
            </div>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 mb-2"></div>
          
          {/* Price and CTA */}
          <div className="flex justify-between items-end mt-auto">
            <div>
              <p className="text-base md:text-lg font-bold text-coral dark:text-coral-light">
                Rp {displayPrice.toLocaleString('id-ID')}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">per malam</p>
            </div>
            <Button
              variant="link"
              className="text-xs md:text-sm font-medium text-ocean hover:text-ocean-dark dark:text-ocean-light dark:hover:text-ocean hover:underline p-0 h-auto"
              asChild
            >
              <Link to={`/${type}s/${id}`}>
                Lihat detail
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickView
          id={id}
          name={name}
          type={type}
          image={image}
          price={displayPrice}
          rating={rating}
          location={location}
          capacity={capacity}
          reviews={reviews}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          amenities={amenities}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;

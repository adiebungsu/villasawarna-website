import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, BedDouble, Bath, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from './OptimizedImage';

interface QuickViewMobileProps {
  id: string;
  name: string;
  type: 'villa' | 'homestay' | 'hotel' | 'apartment';
  image: string;
  price: number;
  rating: number;
  location: string;
  capacity: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewMobile(props: QuickViewMobileProps) {
  const {
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
    amenities,
    isOpen,
    onClose
  } = props;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:hidden p-0 gap-0 max-w-[80vw] w-[80vw] max-h-[80vh] h-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border-0"
        style={{
          position: 'fixed',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
            <Loader2 className="w-8 h-8 text-ocean animate-spin" />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-50 p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
            hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
          title="Tutup Quick View"
          aria-label="Tutup Quick View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Main Container */}
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="relative w-full h-[25vh] bg-gray-100 dark:bg-gray-800 rounded-t-lg">
            <OptimizedImage
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-t-lg"
              priority={true}
              sizes="(max-width: 640px) 80vw"
            />
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-ocean dark:bg-ocean-dark text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                {type === 'villa' ? 'Villa' : 
                 type === 'homestay' ? 'Homestay' :
                 type === 'hotel' ? 'Hotel' : 'Apartemen'}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 w-full bg-white dark:bg-gray-800 p-3 rounded-b-lg">
            <div className="flex flex-col h-full">
              {/* Title and Rating */}
              <div className="mb-2">
                <h2 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">{name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {reviews} ulasan
                  </span>
                </div>
              </div>

              {/* Location and Price */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-start gap-1.5">
                  <MapPin size={14} className="text-ocean dark:text-ocean-light flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{location}</span>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-coral dark:text-coral-light">
                    Rp {price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">per malam</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-200 dark:border-gray-700 mb-2">
                <div className="flex flex-col items-center text-center gap-0.5">
                  <Users size={16} className="text-ocean dark:text-ocean-light" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Kapasitas</p>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{capacity} tamu</p>
                </div>
                <div className="flex flex-col items-center text-center gap-0.5">
                  <BedDouble size={16} className="text-ocean dark:text-ocean-light" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Kamar Tidur</p>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{bedrooms} kamar</p>
                </div>
                <div className="flex flex-col items-center text-center gap-0.5">
                  <Bath size={16} className="text-ocean dark:text-ocean-light" />
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">Kamar Mandi</p>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{bathrooms} kamar</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-2">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">Fasilitas Utama</h3>
                <div className="flex flex-wrap gap-1">
                  {amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-[10px] shadow-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col gap-1.5">
                  <Button
                    className="w-full bg-ocean hover:bg-ocean-dark text-white shadow-sm hover:shadow transition-all duration-200
                      h-8 text-xs"
                    asChild
                  >
                    <Link to={`/${type}s/${id}`}>
                      Lihat Detail
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-ocean text-ocean hover:bg-ocean hover:text-white shadow-sm hover:shadow transition-all duration-200
                      h-8 text-xs"
                    onClick={onClose}
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
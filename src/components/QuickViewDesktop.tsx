import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, BedDouble, Bath, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from './OptimizedImage';

interface QuickViewDesktopProps {
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

export default function QuickViewDesktop(props: QuickViewDesktopProps) {
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

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="fixed inset-auto top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          h-auto max-h-[90vh] w-[90vw] max-w-4xl 
          p-0 bg-white dark:bg-gray-800 rounded-lg
          grid grid-cols-2
          border
          overflow-hidden"
        style={{
          position: 'fixed',
          zIndex: 9999
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-[10000] flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-ocean animate-spin" />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10001] p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm 
            hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
          title="Tutup Quick View"
          aria-label="Tutup Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
          <OptimizedImage
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            priority={true}
            sizes="50vw"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-ocean dark:bg-ocean-dark text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
              {type === 'villa' ? 'Villa' : 
               type === 'homestay' ? 'Homestay' :
               type === 'hotel' ? 'Hotel' : 'Apartemen'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {/* Title and Rating */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {reviews} ulasan
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-ocean dark:text-ocean-light flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-300">{location}</span>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center gap-1">
                <Users size={20} className="text-ocean dark:text-ocean-light" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Kapasitas</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{capacity} tamu</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <BedDouble size={20} className="text-ocean dark:text-ocean-light" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Kamar Tidur</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{bedrooms} kamar</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Bath size={20} className="text-ocean dark:text-ocean-light" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Kamar Mandi</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{bathrooms} kamar</p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Fasilitas Utama</h3>
              <div className="flex flex-wrap gap-2">
                {amenities.slice(0, 6).map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs shadow-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-lg font-bold text-coral dark:text-coral-light">
                    Rp {price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">per malam</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-ocean hover:bg-ocean-dark text-white shadow-sm hover:shadow transition-all duration-200
                    h-10 text-sm"
                  asChild
                >
                  <Link to={`/${type}s/${id}`}>
                    Lihat Detail
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-ocean text-ocean hover:bg-ocean hover:text-white shadow-sm hover:shadow transition-all duration-200
                    h-10 text-sm"
                  onClick={onClose}
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
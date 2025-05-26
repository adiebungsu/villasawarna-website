import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, BedDouble, Bath, X, Loader2, Percent, Home } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from './OptimizedImage';
import axios from 'axios';

interface PromoData {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  capacity: number;
  bedrooms: number;
  amenities: string[];
  validUntil: string;
  roomType: string;
}

interface QuickViewPromoProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewPromo({ id, isOpen, onClose }: QuickViewPromoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [promoData, setPromoData] = useState<PromoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPromoData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`http://192.168.43.151:5173/promos/${id}`);
        
        if (isMounted) {
          setPromoData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Gagal memuat data promo. Silakan coba lagi nanti.');
          console.error('Error fetching promo data:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isOpen) {
      fetchPromoData();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:hidden p-0 gap-0 max-w-[95vw] w-[95vw] max-h-[90vh] h-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border-0"
      >
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={onClose} variant="outline" className="w-full">
              Tutup
            </Button>
          </div>
        ) : promoData ? (
          <>
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
                  src={promoData.image}
                  alt={promoData.title}
                  className="w-full h-full object-cover rounded-t-lg"
                  priority={true}
                  sizes="(max-width: 640px) 80vw"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-600 dark:bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    {promoData.discount}% OFF
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 w-full bg-white dark:bg-gray-800 p-4 rounded-b-lg">
                <div className="flex flex-col h-full">
                  {/* Title and Rating */}
                  <div className="mb-2">
                    <div className="flex justify-between items-start gap-2">
                      <h2 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 flex-1">{promoData.title}</h2>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-through">{formatPrice(promoData.originalPrice)}</p>
                        <p className="text-base font-bold text-red-600 dark:text-red-500">
                          {formatPrice(promoData.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium text-gray-900 dark:text-white">{promoData.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {promoData.reviews} ulasan
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-1.5 mb-2">
                    <MapPin size={14} className="text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{promoData.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{promoData.description}</p>

                  {/* Quick Info */}
                  <div className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{promoData.capacity} Orang</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{promoData.bedrooms} Kamar</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Home className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{promoData.roomType}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-2">
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">Fasilitas Utama</h3>
                    <div className="flex flex-wrap gap-1">
                      {promoData.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full text-[10px] shadow-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Berlaku hingga: {promoData.validUntil}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-1.5">
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white shadow-sm hover:shadow transition-all duration-200
                          h-8 text-xs"
                        asChild
                      >
                        <Link to={`/promo/${promoData.id}`}>
                          Pesan Sekarang
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow transition-all duration-200
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
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
} 
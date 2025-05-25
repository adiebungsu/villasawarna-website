import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, Bed } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PromoCardProps {
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
}

export function PromoCard({
  id,
  title,
  description,
  price,
  originalPrice,
  discount,
  image,
  location,
  rating,
  reviews,
  capacity,
  bedrooms,
  amenities
}: PromoCardProps) {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/villas/${id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col bg-white dark:bg-gray-800">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-4 right-4 bg-red-600 dark:bg-red-500 text-white px-3 py-1 text-sm font-semibold">
          {discount}% OFF
        </Badge>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium dark:text-gray-200">{rating}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">({reviews} ulasan)</span>
        </div>

        {/* Separator line */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-2"></div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-1 dark:text-white">{title}</h3>

        {/* Separator line after title */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>
        
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Kapasitas dan Kamar */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-ocean dark:text-ocean-light" />
            <span>{capacity} tamu</span>
          </div>
          {bedrooms !== undefined && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-ocean dark:text-ocean-light" />
              <span>{bedrooms} kamar</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {amenities.slice(0, 3).map((amenity, index) => (
            <Badge key={index} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-200">
              {amenity}
            </Badge>
          ))}
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{formatPrice(originalPrice)}</span>
          <span className="text-xl font-bold text-coral dark:text-coral-light block">{formatPrice(price)}</span>
        </div>

        <Button 
          onClick={handleBookNow}
          className="w-full bg-coral hover:bg-coral/90 dark:bg-coral-dark dark:hover:bg-coral text-white mt-4"
        >
          Pesan Sekarang
        </Button>
      </div>
    </Card>
  );
} 
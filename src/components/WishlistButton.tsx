import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/use-wishlist';
import { useAuth } from '@/context/use-auth';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  propertyType: 'villa' | 'homestay' | 'hotel' | 'apartment';
  location: string;
  price: number;
  rating: number;
  reviews: number;
  capacity: number;
  bedrooms: number;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showText?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  propertyId,
  propertyName,
  propertyImage,
  propertyType,
  location,
  price,
  rating,
  reviews,
  capacity,
  bedrooms,
  variant = 'outline',
  size = 'sm',
  className,
  showText = false
}) => {
  const { user } = useAuth();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const isInWishlistState = isInWishlist(propertyId);

  const handleWishlistToggle = () => {
    if (!user) {
      return; // Will show toast from addToWishlist
    }

    if (isInWishlistState) {
      removeFromWishlist(propertyId);
    } else {
      addToWishlist(propertyId, {
        propertyId,
        propertyName,
        propertyImage,
        propertyType,
        location,
        price,
        rating,
        reviews,
        capacity,
        bedrooms
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleWishlistToggle}
      className={cn(
        'transition-all duration-200',
        isInWishlistState 
          ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700' 
          : 'hover:bg-red-50 hover:text-red-600 hover:border-red-200',
        className
      )}
      title={isInWishlistState ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
    >
      <Heart 
        className={cn(
          'transition-all duration-200',
          isInWishlistState ? 'fill-red-600' : 'fill-transparent'
        )}
        size={size === 'sm' ? 16 : size === 'default' ? 18 : size === 'lg' ? 20 : 18}
      />
      {showText && (
        <span className="ml-2">
          {isInWishlistState ? 'Hapus' : 'Wishlist'}
        </span>
      )}
    </Button>
  );
};

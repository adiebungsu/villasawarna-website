import { createContext } from 'react';

export interface WishlistItem {
  id: string;
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
  addedAt: string;
  notes?: string;
}

export interface WishlistFolder {
  id: string;
  name: string;
  description: string;
  items: WishlistItem[];
  isPublic: boolean;
  createdAt: string;
}

export interface WishlistContextType {
  wishlistFolders: WishlistFolder[];
  setWishlistFolders: (folders: WishlistFolder[]) => void;
  addToWishlist: (propertyId: string, propertyData: Omit<WishlistItem, 'id' | 'addedAt'>) => void;
  removeFromWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
  getWishlistItem: (propertyId: string) => WishlistItem | null;
}

export const WishlistContext = createContext<WishlistContextType>({
  wishlistFolders: [],
  setWishlistFolders: () => {},
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  getWishlistItem: () => null
});

export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  location: string;
  category: 'villa' | 'hotel' | 'homestay';
  images: string[];
  amenities: string[];
  rating: number;
  reviews: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
} 
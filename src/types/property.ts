export interface Property {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceRange: {
    min: number;
    max: number;
  };
  address: string;
  location: string;
  category: 'villa' | 'hotel' | 'homestay';
  images: string[];
  amenities: string[];
  rating: number;
  reviews: number;
  coordinates: [number, number];
  availability?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
} 
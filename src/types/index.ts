export interface RoomType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  beds: string;
  bathrooms: number;
  amenities: string[];
  images: string[];
  price: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RatingBreakdown {
  label: string;
  value: number;
}

export interface StarRatingBreakdown {
  star: number;
  count: number;
}

export interface RatingSummary {
  score: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  starBreakdown?: StarRatingBreakdown[];
}

export interface Property {
  id: string;
  name: string;
  type: "villa" | "hotel" | "apartment" | "homestay";
  location: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  tags: string[];
  amenities: string[];
  mainImages: string[];
  roomTypes: RoomType[];
  nearbyAttractions: { name: string; distance: string; }[];
  ratingSummary: RatingSummary;
  propertyReviews?: Review[];
}

export type PropertyCardProps = Omit<Property, 'propertyReviews'> & {
  propertyReviews: Review[];
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export interface NearbyAttraction {
  name: string;
  distance: string;
} 
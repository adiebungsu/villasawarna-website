export interface TouristAttractionSchema extends Record<string, unknown> {
  "@context": string;
  "@type": "TouristAttraction";
  name: string;
  description: string;
  image: string[];
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: string;
    longitude: string;
  };
  openingHours: string;
  priceRange: string;
  aggregateRating: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
  amenityFeature?: {
    "@type": "LocationFeatureSpecification";
    name: string;
  }[];
  touristType: {
    "@type": "Thing";
    name: string;
  }[];
  publicAccess: boolean;
  suitableForChildren: boolean;
}

export interface BreadcrumbListSchema extends Record<string, unknown> {
  "@context": string;
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface FAQPageSchema extends Record<string, unknown> {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export type DestinationStructuredData = [
  TouristAttractionSchema,
  BreadcrumbListSchema,
  FAQPageSchema
] & Record<string, unknown>[];

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours?: string;
  price?: string;
  rating: number;
  reviews: number;
  facilities: string[];
  address: string;
  createdAt: string;
  updatedAt: string;
} 
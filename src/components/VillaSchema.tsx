interface VillaSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  address: string;
  amenities: string[];
  roomTypes: {
    name: string;
    price: number;
    capacity: number;
  }[];
}

export default function VillaSchema({
  name,
  description,
  image,
  price,
  rating,
  reviewCount,
  address,
  amenities,
  roomTypes
}: VillaSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": name,
    "description": description,
    "image": image,
    "priceRange": `Rp ${price.toLocaleString('id-ID')}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address
    },
    "amenityFeature": amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "makesOffer": roomTypes.map(room => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": room.name,
        "description": `${room.name} dengan kapasitas ${room.capacity} orang`
      },
      "price": room.price,
      "priceCurrency": "IDR"
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 
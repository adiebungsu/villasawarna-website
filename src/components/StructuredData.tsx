import { Property } from '@/types';

interface StructuredDataProps {
  type: 'website' | 'article' | 'property' | 'organization';
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const generateStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Villa Sawarna",
          "description": "Temukan villa dan homestay terbaik di Pantai Sawarna, Goa Langir, dan Legon Pari. Penginapan terbaik dengan harga terjangkau untuk liburan pantai impian Anda.",
          "url": "https://villasawarna.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://villasawarna.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };

      case 'property':
        const property = data as Property;
        return {
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          "name": property.name,
          "description": property.description,
          "url": `https://villasawarna.com/villas/${property.id}`,
          "telephone": property.contact?.phone,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sawarna",
            "addressRegion": "Banten",
            "addressCountry": "ID"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": property.coordinates?.[0] || -6.9876,
            "longitude": property.coordinates?.[1] || 106.1234
          },
          "priceRange": `Rp ${property.price?.toLocaleString('id-ID')}`,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": property.rating,
            "reviewCount": property.reviews
          },
          "amenityFeature": property.amenities?.map(amenity => ({
            "@type": "LocationFeatureSpecification",
            "name": amenity
          }))
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "Villa Sawarna"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Villa Sawarna",
            "logo": {
              "@type": "ImageObject",
              "url": "https://villasawarna.com/logo.png"
            }
          },
          "datePublished": data.publishedAt,
          "dateModified": data.updatedAt
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Villa Sawarna",
          "description": "Temukan villa dan homestay terbaik di Pantai Sawarna, Goa Langir, dan Legon Pari.",
          "url": "https://villasawarna.com",
          "logo": "https://villasawarna.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-123-4567-890",
            "contactType": "customer service",
            "email": "layanan@villasawarna.com"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sawarna",
            "addressRegion": "Banten",
            "addressCountry": "ID"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -6.9876,
            "longitude": 106.1234
          }
        };

      default:
        return null;
    }
  };

  const structuredData = generateStructuredData();

  if (!structuredData) return null;

    return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData; 
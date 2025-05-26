import { Helmet } from 'react-helmet-async';
import { Property } from '@/types/property';
import { Destination } from '@/types/destination';
import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type: 'property' | 'destination';
  data: Property | Destination;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://myvilla.id';

  const validateData = (data: Property | Destination) => {
    if (!data.name || !data.description) {
      console.warn('Missing required fields in structured data');
      return false;
    }
    return true;
  };

  const getPropertySchema = (property: Property) => {
    if (!validateData(property)) return null;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: property.name,
      description: property.description,
      image: property.images,
      url: `${baseUrl}${location.pathname}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.address,
        addressLocality: 'Sawarna',
        addressRegion: 'Banten',
        postalCode: '42393',
        addressCountry: 'ID'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: property.coordinates.lat,
        longitude: property.coordinates.lng
      },
      priceRange: `${property.priceRange.min} - ${property.priceRange.max}`,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: property.rating,
        reviewCount: property.reviews
      },
      amenityFeature: property.amenities.map(amenity => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity
      })),
      availability: property.availability ? {
        '@type': 'ItemAvailability',
        availability: property.availability
      } : undefined,
      review: property.reviews > 0 ? {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: property.rating
        },
        author: {
          '@type': 'Organization',
          name: 'MyVilla'
        }
      } : undefined
    };

    return schema;
  };

  const getDestinationSchema = (destination: Destination) => {
    if (!validateData(destination)) return null;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: destination.name,
      description: destination.description,
      image: destination.images,
      url: `${baseUrl}${location.pathname}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sawarna',
        addressRegion: 'Banten',
        postalCode: '42393',
        addressCountry: 'ID'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: destination.coordinates.lat,
        longitude: destination.coordinates.lng
      },
      openingHours: destination.openingHours,
      priceRange: destination.price || 'Free',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: destination.rating,
        reviewCount: destination.reviews
      },
      amenityFeature: destination.facilities.map(facility => ({
        '@type': 'LocationFeatureSpecification',
        name: facility
      })),
      review: destination.reviews > 0 ? {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: destination.rating
        },
        author: {
          '@type': 'Organization',
          name: 'MyVilla'
        }
      } : undefined
    };

    return schema;
  };

  try {
    const schema = type === 'property' 
      ? getPropertySchema(data as Property)
      : getDestinationSchema(data as Destination);

    if (!schema) return null;

    return (
      <Helmet>
        <link rel="canonical" href={`${baseUrl}${location.pathname}`} />
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
    );
  } catch (error) {
    console.error('Error generating structured data:', error);
    return null;
  }
}; 
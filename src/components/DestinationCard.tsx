import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Destination } from '../data/destinations';
import { ConnectionAwareImage } from './ConnectionAwareImage';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link to={`/destination/${destination.id}`}>
        <div className="relative h-48">
          <ConnectionAwareImage
            src={destination.mainImage}
            alt={destination.name}
            className="w-full h-full object-cover"
            width={400}
            height={300}
            quality={75}
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
            <div className="flex items-center text-sm">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-medium">{destination.rating}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({destination.reviews} ulasan)
            </span>
          </div>
          <p className="text-gray-600 line-clamp-2">{destination.description}</p>
        </div>
      </Link>
    </motion.div>
  );
} 
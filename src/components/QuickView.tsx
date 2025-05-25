import { useEffect, useState } from 'react';
import QuickViewMobile from './QuickViewMobile';
import QuickViewDesktop from './QuickViewDesktop';

interface QuickViewProps {
  id: string;
  name: string;
  type: 'villa' | 'homestay' | 'hotel' | 'apartment';
  image: string;
  price: number;
  rating: number;
  location: string;
  capacity: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView(props: QuickViewProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <QuickViewMobile {...props} />;
  }

  return <QuickViewDesktop {...props} />;
} 
import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Users, Wifi, Utensils, Car, Bath, BedDouble, Star, Heart, Share2, ArrowLeft, Home, Phone, Waves, Footprints, Bike, Tv, CheckCircle, Mail, Clock, Info, MessageCircle, ChevronDown, HelpCircle, Plus, Minus, CreditCard } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger, RoomTabsList, RoomTabsTrigger, SimpleRoomTabsList, SimpleRoomTabsTrigger } from "@/components/ui/tabs";
import { getAllProperties, getPropertiesByLocation, extractMainLocation } from "@/data/properties";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { propertyRoomTypes, RoomType } from "@/data/roomTypes";
import { motion, AnimatePresence } from "framer-motion";
import CardRatingSummary from "@/components/CardRatingSummary";
import { propertyReviews } from "@/data/reviews";
import OptimizedImage from '@/components/OptimizedImage';
import SEO from '@/components/SEO';
import QuickNavigation from '@/components/QuickNavigation';

// Ganti dynamic import dengan React.lazy
const MapComponent = lazy(() => import('../components/MapComponent'));

// Define review interfaces for type safety
interface PropertyReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

// Define main property interface
interface Property {
  id: string;
  name: string;
  type: 'villa' | 'homestay' | 'hotel';
  location: string;
  price: number;
  image: string;
  capacity: number;
  bedrooms: number;
  rating: number;
  reviews: number;
  description: string;
  mainImages?: string[];
  amenities?: string[];
  contact?: {
    phone: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  ratingSummary?: {
    score: number;
    totalReviews: number;
    breakdown: {
      label: string;
      value: number;
    }[];
  };
  nearbyAttractions?: {
    name: string;
    distance: string;
  }[];
}

// Define main property images for specific properties
const propertyMainImages: Record<string, { url: string; description: string }[]> = {
  "villa-little-hula-hula": [
    {
      url: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-aea2b07141382e5e96f88bfe59f5efe0.jpeg",
      description: "Tampilan Depan Villa - Arsitektur modern dengan taman yang rindang"
    }
  ]
};

// Data jarak ke pantai berdasarkan lokasi
const pantaiDistances = {
  "Legon Pari": [
    { name: "Pantai Legon Pari", time: "2 menit", mode: "jalan kaki", icon: "Footprints" },
    // ... rest of the distances ...
  ],
  // ... rest of the locations ...
};

const pantaiDistancesById: Record<string, { name: string; time: string; color: string }[]> = {
  // Data akan diisi secara otomatis dari nearbyAttractions
};

// Fungsi untuk mendapatkan warna berdasarkan nama pantai
const getPantaiColor = (name: string): string => {
  const colors = {
    'Pantai Sawarna': 'bg-green-50 border-green-100 text-sky-600',
    'Tanjung Layar': 'bg-blue-50 border-blue-100 text-sky-600',
    'Goa Langir': 'bg-white border-blue-100 text-sky-600',
    'Legon Pari': 'bg-yellow-50 border-yellow-100 text-sky-600',
    'Pantai Legon Pari': 'bg-yellow-50 border-yellow-100 text-sky-600',
    'Pantai Karang Taraje': 'bg-purple-50 border-purple-100 text-sky-600',
    'default': 'bg-gray-50 border-gray-100 text-sky-600'
  };
  return colors[name as keyof typeof colors] || colors.default;
};

// Fungsi untuk menginisialisasi data jarak ke pantai
const initializePantaiDistances = () => {
  const allProperties = getAllProperties();
  allProperties.forEach(property => {
    if (property.nearbyAttractions) {
      pantaiDistancesById[property.id] = property.nearbyAttractions.map(attraction => ({
        name: attraction.name,
        time: attraction.distance,
        color: getPantaiColor(attraction.name)
      }));
    }
  });
};

// Inisialisasi data saat komponen dimuat
initializePantaiDistances();

// Types
interface BookingWidgetProps {
  property: Property;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  adults: number;
  setAdults: (num: number) => void;
  children: number;
  setChildren: (num: number) => void;
  numberOfNights: number;
  onBooking: () => void;
}

interface RatingBreakdown {
  label: string;
  value: number;
}

interface RatingSummary {
  score: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  starBreakdown?: {
    star: number;
    count: number;
  }[];
}

interface RatingWidgetProps {
  ratingSummary: RatingSummary;
}

interface Amenity {
  icon: string;
  description: string;
}

interface FacilitiesWidgetProps {
  amenities: Amenity[];
}

// Widget Components
const BookingWidget: React.FC<BookingWidgetProps> = (props) => {
  const { property } = props;

  // Fungsi untuk generate pesan WhatsApp
  const generateBookingMessage = (): string => {
    if (!property) return "";

    let message = `Halo, saya tertarik untuk booking ${property.name} di Pantai Sawarna lengkap dengan paket makan,`;
    message += `\nJumlah tamu: ${property.capacity} orang`;
    message += "\nApakah masih tersedia?";

    return encodeURIComponent(message);
  };

  // Generate URL WhatsApp
  const whatsappUrl = `https://wa.me/83877080088?text=${generateBookingMessage()}`;

  return (
    <div id="booking" className="sticky top-6 space-y-6">
      {/* Card Catatan */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center">
            <svg width="20" height="20" fill="none" stroke="#D97706" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            </div>
            <div>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-400">Catatan</div>
            <div className="text-gray-600 dark:text-gray-200 text-sm mt-1">
              Harga sewaktu-waktu dapat berubah, menyesuaikan dengan hari libur dan kondisi lainnya, untuk dapat harga terbaik hari ini silahkan bisa ditanyakan langsung via WhatsApp.
            </div>
              </div>
            </div>
          </div>

      {/* Card Booking Sekarang */}
      <div id="booking-whatsapp" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 p-6">
        <h2 className="text-xl font-bold mb-4 text-ocean dark:text-ocean-light">Booking Sekarang</h2>
        <div className="space-y-4">
          {/* Info WhatsApp */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/30">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center">
                <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.431-.148-.61.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-green-700 dark:text-green-400">Booking via WhatsApp</div>
                <div className="text-gray-600 dark:text-gray-200 text-sm">Pesan langsung dan dapatkan penawaran terbaik</div>
              </div>
            </div>
            <ul className="text-green-700 dark:text-green-400 text-sm mt-3 space-y-1">
              <li className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                <span>Respon cepat dalam 1x24 jam</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                <span>Konfirmasi booking instan</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                <span>Layanan pelanggan 24/7</span>
              </li>
            </ul>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.431-.148-.61.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Booking via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const RatingWidget: React.FC<RatingWidgetProps> = (props) => {
  const { ratingSummary } = props;
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 p-6">
      <CardRatingSummary {...ratingSummary} />
    </div>
  );
};

const FacilitiesWidget: React.FC<FacilitiesWidgetProps> = (props) => {
  const { amenities } = props;
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 p-6">
      <h3 className="text-lg font-bold mb-4 text-ocean dark:text-ocean-light">Fasilitas</h3>
      <div className="grid grid-cols-2 gap-3">
        {amenities.map((amenity, idx) => (
          <div key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="text-sm">• {amenity.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tambahkan interface untuk FAQ item
interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  icon: React.ReactNode;
}

// Tambahkan komponen FAQ Accordion
const FAQAccordion: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-ocean/10 dark:bg-ocean-dark/20 flex items-center justify-center text-ocean dark:text-ocean-light">
                {item.icon}
              </div>
              <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 text-gray-400"
            >
              {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  // Effect untuk mendeteksi Android
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAndroidDevice = /Android/i.test(userAgent);
    console.log('User Agent:', userAgent);
    console.log('Is Android:', isAndroidDevice);
    setIsAndroid(isAndroidDevice);
  }, []);

  const sections = useMemo(() => [
    { id: 'info', label: 'Info', icon: <Info size={20} /> },
    { id: 'kamar', label: 'Kamar', icon: <BedDouble size={20} /> },
    { id: 'booking-whatsapp', label: 'Booking', icon: <Phone size={20} /> },
    { id: 'review', label: 'Review', icon: <Star size={20} /> },
    { id: 'lokasi', label: 'Maps', icon: <MapPin size={20} /> },
  ], []);

  const [activeSection, setActiveSection] = useState('');

  // Effect for scroll detection to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          // Adding an offset for better active section detection when scrolling down
          if (pageYOffset >= sectionTop - 200) { 
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  // Declare all hooks at the top level
  const [selectedRoomType, setSelectedRoomType] = useState<string>("");
  const [selectedMainImage, setSelectedMainImage] = useState(0);
  const [selectedRoomImage, setSelectedRoomImage] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const allProperties = useMemo(() => getAllProperties(), []);
  const property = useMemo(() => allProperties.find((p) => p.id === id), [allProperties, id]);
  const roomTypes = useMemo(() => propertyRoomTypes[id || ''] || [], [id]);
  const activeRoomType = useMemo(() => roomTypes.find(room => room.id === selectedRoomType) || roomTypes[0], [roomTypes, selectedRoomType]);
  const mainLocation = useMemo(() => property ? extractMainLocation(property.id === 'villa-little-hula-hula' ? 'Goa Langir, Sawarna' : property.location) : "", [property]);
  const recommendedProperties = useMemo(() => {
    if (!property || !mainLocation) return [];
    return getPropertiesByLocation(mainLocation)
      .filter(p => p.id !== id)
      .slice(0, 4);
  }, [property, mainLocation, id]);
  const reviews = useMemo(() => propertyReviews[id || ''] || [], [id]);
  const displayedReviews = useMemo(() => showAllReviews ? reviews : reviews.slice(0, 5), [reviews, showAllReviews]);

  // Set initial room type when roomTypes changes
  useEffect(() => {
    if (roomTypes.length > 0) {
      setSelectedRoomType(roomTypes[0].id);
    }
  }, [roomTypes]);

  const totalGuests = adults + children;
  const numberOfNights = 1; // Placeholder

  // Helper functions for guest count and booking message
  const incrementAdults = () => {
    if (adults + children < (property?.capacity || 8)) {
      setAdults(adults + 1);
    } else {
      toast({
        title: "Melebihi kapasitas",
        description: `Jumlah tamu maksimal adalah ${property?.capacity || 8} orang`,
        variant: "destructive",
      });
    }
  };

  const decrementAdults = () => {
    if (adults > 1) {
      setAdults(adults - 1);
    }
  };

  const incrementChildren = () => {
    if (adults + children < (property?.capacity || 8)) {
      setChildren(children + 1);
    } else {
      toast({
        title: "Melebihi kapasitas",
        description: `Jumlah tamu maksimal adalah ${property?.capacity || 8} orang`,
        variant: "destructive",
      });
    }
  };

  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const generateBookingMessage = () => {
    if (!property) return "";

    let message = `Halo, saya tertarik untuk booking ${property?.name} di Pantai Sawarna lengkap dengan paket makan,`;

    // Placeholder logic for dates and nights
    if (checkInDate && checkOutDate) {
      message += `\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}`;
      const numberOfNights = 1; // Use placeholder or calculate if dates are valid
      if (numberOfNights > 0) {
        message += `\nJumlah malam: ${numberOfNights}`;
      }
    }

    message += `\nJumlah tamu: ${totalGuests} (${adults} dewasa${children > 0 ? `, ${children} anak-anak` : ''})`;
    message += "\nApakah masih tersedia?";

    return encodeURIComponent(message);
  };

  const handleBooking = () => {
    // ... existing booking logic ...
  };

  const getPropertyImages = () => {
    if (property?.mainImages && property.mainImages.length > 0) {
      return property.mainImages;
    } else if (property?.image) {
      return [property.image];
    } else if (property?.id === "villa-little-hula-hula") { // Villa Little Hula Hula
      return [
        "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-aea2b07141382e5e96f88bfe59f5efe0.jpeg",
        // ... rest of the images ...
      ];
    } else if (property?.id === "villa-deka-sawarna") { // Villa Deka Sawarna
      return [
        property.image,
        "/lovable-uploads/e50f994d-274e-445b-9055-77f8e64b6e97.png",
        "/lovable-uploads/4087feae-fbfe-4434-83b7-c97aa8312d50.png",
        "/lovable-uploads/7fda71e9-087f-408f-9635-f37e3c00b55b.png",
        "/lovable-uploads/4ea6aa45-8255-4e97-8618-69f08293e6b5.png"
      ];
    } else {
      return property ? [
        property.image,
        "https://i.imgur.com/8yhD4dp.jpeg",
        "https://i.imgur.com/qKALLdC.jpeg", 
        "https://i.imgur.com/R0HR9FM.jpeg",
        "https://i.imgur.com/iAmVH4D.jpeg"
      ] : [];
    }
  };

  const mainImages = getPropertyImages();
  
  // Get amenities based on property type
  const amenities = useMemo(() => {
    if (property?.type === 'homestay') {
      return [
        { icon: "🏠", description: "Penginapan Lokal - Tinggal bersama keluarga lokal yang ramah" },
        // ... rest of the amenities ...
      ];
    }
    return [
      { icon: "🏊‍♂️", description: "Kolam Renang Pribadi - Berenang dengan pemandangan pantai" },
      { icon: "🍳", description: "Dapur Modern - Lengkap dengan peralatan memasak" },
      { icon: "🛋️", description: "Ruang Tamu Luas - Dengan sofa nyaman dan TV LED" },
      { icon: "🌴", description: "Taman Pribadi - Area bersantai dengan gazebo" },
      { icon: "🚗", description: "Parkir Luas - Untuk 4-6 kendaraan" },
      { icon: "🏖️", description: "Dekat Pantai - Akses mudah ke pantai favorit" }
    ];
  }, [property?.type]);

  const metaDescription = property ? 
    `${property.name} adalah villa ${property.type === 'villa' ? 'mewah' : 'homestay'} di ${property.location}, Pantai Sawarna. ${property.description.substring(0, 150)}... Harga mulai Rp ${property.price.toLocaleString('id-ID')}. Rating ${property.rating} dari ${property.reviews} review.` :
    'Detail villa dan homestay di Pantai Sawarna';

  const metaTitle = property ? 
    `${property.name} - ${property.type === 'villa' ? 'Villa' : 'Homestay'} di ${property.location} | Villa Sawarna` : 
    'Detail Properti - Villa Sawarna';

  const ogDescription = property ? 
    `Sewa ${property.name} di ${property.location}. ${property.type === 'villa' ? 'Villa' : 'Homestay'} dengan pemandangan pantai dan fasilitas lengkap.` : 
    'Detail properti di Pantai Sawarna';

  const ratingSummary = useMemo(() => {
    // Ambil data rating dari properti jika ada, jika tidak gunakan struktur dasar
    const rawRating = property?.ratingSummary || {
        score: property?.rating || 8.3,
        totalReviews: property?.reviews || 100,
        breakdown: [
          { label: "Kebersihan", value: 8.3 },
          { label: "Kenyamanan Kamar", value: 8.1 },
          { label: "Makanan", value: 7.8 },
          { label: "Lokasi", value: 8.5 },
          { label: "Pelayanan dan Fasilitas", value: 8.2 },
        ],
    };

    // Kembalikan objek finalRatingSummary agar hanya berisi score, totalReviews, dan breakdown dari rawRating
    const finalRatingSummary: RatingSummary = {
        score: rawRating.score,
        totalReviews: rawRating.totalReviews,
        breakdown: rawRating.breakdown,
    };

    return finalRatingSummary;
  }, [property]);

  // Effect untuk mendeteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Sesuaikan breakpoint dengan TailwindCSS lg
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle case where property is not found
  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <p>Property not found.</p>
      </div>
    );
  }

  // Generate structured data
  const structuredData = property ? {
    "@context": "https://schema.org",
    "@type": property.type === 'villa' ? "LodgingBusiness" : "Hotel",
    "name": property.name,
    "description": property.description,
    "image": property.image,
    "url": `https://villasawarna.com/property/${id}`,
    "telephone": property.contact?.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.location,
      "addressLocality": "Sawarna",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.coordinates?.lat,
      "longitude": property.coordinates?.lng
    },
    "priceRange": `Rp${property.price.toLocaleString('id-ID')}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": property.rating,
      "reviewCount": property.reviews
    },
    "amenityFeature": property.amenities?.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })),
    "numberOfRooms": property.bedrooms,
    "maximumAttendeeCapacity": property.capacity
  } : null;

  // Tambahkan koordinat default jika tidak ada
  const propertyCoordinates = property?.coordinates || { lat: -6.9875, lng: 106.3206 }; // Koordinat Sawarna

  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={`${property?.type} sawarna, ${property?.location}, pantai sawarna, sewa ${property?.type}, ${property?.name?.toLowerCase()}, penginapan sawarna, wisata sawarna`}
        url={`https://villasawarna.com/property/${id}`}
        image={property?.image}
        type="website"
        structuredData={structuredData}
        openGraph={{
          type: 'website',
          article: {
            section: property?.type || 'property',
            tags: [property?.type, 'sawarna', 'wisata sawarna']
          }
        }}
      />
      
      <Navbar />
      
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
        {/* Quick Navigation */}
        <QuickNavigation 
          sections={[
            { id: 'info', label: 'Info', icon: <Info size={20} /> },
            { id: 'kamar', label: 'Kamar', icon: <BedDouble size={20} /> },
            { id: 'booking-whatsapp', label: 'Booking', icon: <Phone size={20} /> },
            { id: 'review', label: 'Review', icon: <Star size={20} /> },
            { id: 'lokasi', label: 'Maps', icon: <MapPin size={20} /> }
          ]} 
          onSectionClick={(sectionId) => {
            if (sectionId === 'booking-whatsapp') {
              // Untuk Android, scroll ke bagian booking di aside
              const bookingSection = document.querySelector('aside .bg-white\\/90');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              const element = document.getElementById(sectionId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
        />

        {/* Floating Home Button */}
        <div className="fixed bottom-32 right-4 z-[9999]">
          <Link to="/">
            <button 
              className="w-10 h-10 bg-ocean text-white rounded-full shadow-lg flex items-center justify-center hover:bg-ocean-dark transition-colors duration-200" 
              aria-label="Beranda"
            >
              <Home size={20} />
            </button>
          </Link>
        </div>

        <div className="container-custom py-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center mb-6 text-sm">
            <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">Beranda</Link>
            <span className="mx-2 text-gray-400 dark:text-gray-600" aria-hidden="true">/</span>
            <Link 
              to={property.type === 'villa' ? '/villas' : '/homestays'} 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
            >
              {property.type === 'villa' ? 'Villa' : 'Homestay'}
            </Link>
            <span className="mx-2 text-gray-400 dark:text-gray-600" aria-hidden="true">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{property.name}</span>
          </nav>

          {/* Grid Layout untuk Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Kolom Kiri - Konten Utama (2/3 lebar di desktop) */}
            <main className="lg:col-span-2 space-y-8">
              {/* Galeri Gambar Utama */}
              {mainImages && mainImages.length > 0 ? (
                <div className="mb-8">
                  <div className="mb-2 overflow-hidden rounded-xl shadow-xl aspect-[16/9] relative dark:shadow-gray-800/50">
                    <OptimizedImage 
                      src={mainImages[selectedMainImage]} 
                      alt={`${property?.name} - tampilan utama`}
                      className="w-full h-full object-cover object-center"
                      quality={90}
                      priority={true}
                      sizes="(min-width: 1024px) 66vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-nowrap overflow-x-auto gap-2 mt-4 pb-2">
                    {mainImages.map((img, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedMainImage(idx)}
                        className={`cursor-pointer flex-shrink-0 aspect-[4/3] overflow-hidden rounded-lg transition duration-200 border-2 ${
                          selectedMainImage === idx 
                            ? 'border-ocean scale-105 opacity-100 dark:border-ocean-light' 
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        style={{ width: 80, height: 60 }}
                      >
                        <OptimizedImage 
                          src={img} 
                          alt={`${property?.name} - tampilan ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          quality={70}
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-8 text-center text-gray-400 dark:text-gray-600">Tidak ada gambar</div>
              )}

              {/* Card Info Properti */}
              <div className="mb-8 grid grid-cols-4 gap-2">
                <div className="rounded-lg bg-white dark:bg-gray-800 shadow border border-blue-100 dark:border-gray-700 p-1.5 flex flex-col items-center">
                  <svg width="18" height="18" fill="none" stroke="#1da1f2" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  <div className="font-semibold text-[11px] mt-1 mb-0.5 text-gray-800 dark:text-white">Kapasitas</div>
                  <div className="text-gray-500 dark:text-gray-300 text-[11px] truncate">{property.capacity} orang</div>
                </div>
                <div className="rounded-lg bg-white dark:bg-gray-800 shadow border border-blue-100 dark:border-gray-700 p-1.5 flex flex-col items-center">
                  <svg width="18" height="18" fill="none" stroke="#1da1f2" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9.75V19a2 2 0 0 0 2 2h3.5a.5.5 0 0 0 .5-.5V17a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3.5a.5.5 0 0 0 .5.5H19a2 2 0 0 0 2-2V9.75a2 2 0 0 0-.8-1.6l-7-5.25a2 2 0 0 0-2.4 0l-7 5.25a2 2 0 0 0-.8 1.6z"/></svg>
                  <div className="font-semibold text-[11px] mt-1 mb-0.5 text-gray-800 dark:text-white">Kategori</div>
                  <div className="text-gray-500 dark:text-gray-300 text-[11px] truncate">
                    {property.type === 'villa' ? 'Villa' : property.type === 'hotel' ? 'Hotel' : 'Homestay'}
                  </div>
                </div>
                <div className="rounded-lg bg-white dark:bg-gray-800 shadow border border-blue-100 dark:border-gray-700 p-1.5 flex flex-col items-center">
                  <svg width="18" height="18" fill="none" stroke="#1da1f2" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2v2m0 16v2m8-8h2M2 12H4m15.07 7.07l1.42 1.42M4.93 4.93L3.51 3.51m15.56 0l-1.42 1.42M4.93 19.07l-1.42 1.42"/></svg>
                  <div className="font-semibold text-[11px] mt-1 mb-0.5 text-gray-800 dark:text-white">Lokasi</div>
                  <div className="text-gray-500 dark:text-gray-300 text-[11px] text-center truncate">{extractMainLocation(property.location)}</div>
                </div>
                <div className="rounded-lg bg-white dark:bg-gray-800 shadow border border-blue-100 dark:border-gray-700 p-1.5 flex flex-col items-center">
                  <svg width="18" height="18" fill="none" stroke="#1da1f2" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 7v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/><path d="M16 3v4H8V3"/><rect x="8" y="11" width="8" height="6" rx="1"/></svg>
                  <div className="font-semibold text-[11px] mt-1 mb-0.5 text-gray-800 dark:text-white">Kamar</div>
                  <div className="text-gray-500 dark:text-gray-300 text-[11px] truncate">{property.bedrooms} kamar tidur</div>
                </div>
              </div>

              {/* Keterangan villa & deskripsi singkat */}
              <div id="info" className="mb-8 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-800/50 p-8 border border-ocean/10 dark:border-ocean-dark/30">
                <h2 className="text-2xl md:text-3xl font-extrabold text-ocean dark:text-ocean-light mb-2 flex items-center gap-2">
                  {property.name}
                  <span className="text-coral dark:text-coral-light text-lg font-semibold">| Liburan Tropis Eksklusif</span>
                </h2>
                <div className="border-b border-gray-200 dark:border-gray-700/50 mb-4"></div>
                <div className="text-lg text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
                  Temukan kenyamanan dan ketenangan di <span className="font-bold text-ocean dark:text-ocean-light">{property.name}</span>, destinasi eksklusif di kawasan {property.location}. Dirancang untuk keluarga maupun rombongan yang menginginkan suasana privat, modern, dan penuh kehangatan.
                </div>
                <ul className="mb-4 space-y-2 text-gray-700 dark:text-gray-200">
                  <li className="flex items-center gap-2">
                    <span className="text-coral dark:text-coral-light text-lg">•</span>
                    <span className="text-base">AC & WiFi super cepat di setiap kamar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-coral dark:text-coral-light text-lg">•</span>
                    <span className="text-base">Kamar mandi dalam & ruang tamu luas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-coral dark:text-coral-light text-lg">•</span>
                    <span className="text-base">Dapur modern & area bersantai asri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-coral dark:text-coral-light text-lg">•</span>
                    <span className="text-base">Dekat pantai-pantai favorit Sawarna</span>
                  </li>
                </ul>
                <div className="text-gray-800 dark:text-gray-100 leading-relaxed">
                  Lokasi strategis memudahkan Anda menjelajah Pantai Legon Pari, Goa Langir, hingga Tanjung Layar. Suasana tropis, pelayanan ramah, dan fasilitas lengkap siap memberikan pengalaman liburan yang tak terlupakan.<br />
                  <span className="font-semibold text-ocean dark:text-ocean-light mt-2 block">Segera rencanakan liburan Anda di {property.name}!</span>
                </div>
              </div>

              {/* Card Jarak ke Pantai */}
              {pantaiDistancesById[property.id] && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-3 text-coral dark:text-coral-light">Jarak ke Pantai:</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pantaiDistancesById[property.id].map((pantai, idx) => (
                      <div key={idx} className="rounded-xl bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 p-4 shadow-sm flex flex-col">
                        <div className="font-bold text-base mb-1 text-sky-600 dark:text-sky-400">{pantai.name}</div>
                        <div className="text-gray-700 dark:text-gray-200 text-sm border-t border-gray-100 dark:border-gray-700/50 pt-2">{pantai.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tipe Kamar */}
              <div id="kamar" className="mb-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Tipe Kamar</h2>
                <Tabs value={selectedRoomType} onValueChange={setSelectedRoomType} className="mb-6">
                  <SimpleRoomTabsList className="flex w-full gap-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
                    {roomTypes.slice(0, 4).map((room) => (
                      <SimpleRoomTabsTrigger
                        key={room.id}
                        value={room.id}
                        className="flex-1 w-full text-[10px] md:text-sm px-1 py-1 md:px-2 md:py-2 text-center flex flex-col items-center justify-center gap-0.5 border-b-2 border-transparent data-[state=active]:border-ocean dark:data-[state=active]:border-ocean-light text-gray-700 dark:text-sky-400 bg-white dark:bg-gray-800 rounded-lg data-[state=active]:bg-ocean/5 dark:data-[state=active]:bg-ocean-dark/20 data-[state=active]:text-ocean dark:data-[state=active]:text-ocean-light transition-colors duration-300"
                      >
                        <BedDouble size={12} className="mb-0 text-gray-700 dark:text-gray-400" />
                        <span className="line-clamp-1">{room.name}</span>
                      </SimpleRoomTabsTrigger>
                    ))}
                  </SimpleRoomTabsList>
                  {roomTypes.map((room) => (
                    <TabsContent key={room.id} value={room.id}>
                      <div className="mb-8">
                        <div className="mb-2 overflow-hidden rounded-xl aspect-[16/9] relative dark:shadow-gray-800/50">
                          <OptimizedImage 
                            src={room.images[selectedRoomImage]} 
                            alt={`${room.name} - tampilan utama`}
                            className="w-full h-full object-cover"
                            quality={90}
                            priority={true}
                            sizes="(min-width: 1024px) 66vw, 100vw"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {room.images.map((img, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedRoomImage(idx)}
                              className={`cursor-pointer aspect-[4/3] overflow-hidden rounded-lg transition duration-200 ${
                                selectedRoomImage === idx 
                                  ? 'ring-2 ring-ocean scale-[0.98] opacity-100 dark:ring-ocean-light' 
                                  : 'opacity-70 hover:opacity-100'
                              }`}
                            >
                              <OptimizedImage 
                                src={img} 
                                alt={`${room.name} - tampilan ${idx + 1}`} 
                                className="w-full h-full object-cover"
                                quality={70}
                                sizes="(min-width: 1024px) 13vw, 20vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-md border border-ocean/10 dark:border-ocean-dark/20 p-5 mb-6 dark:shadow-gray-800/50 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-1 w-full">
                          <h3 className="text-base md:text-lg font-bold text-ocean dark:text-ocean-light text-left truncate flex items-center gap-2">
                            <BedDouble size={16} className="text-coral dark:text-coral-light" />
                            {room.name}
                          </h3>
                          <div className="flex flex-col items-end">
                            <span className="text-coral dark:text-coral-light text-base md:text-xl font-bold">
                              Rp {room.price.toLocaleString()} <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-normal">/malam</span>
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Kapasitas: {room.capacity} tamu</span>
                          </div>
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>
                        <ul className="flex flex-wrap gap-2 mb-2">
                          {room.amenities.map((amenity, idx) => (
                            <li key={idx} className="bg-ocean/10 dark:bg-ocean-dark/20 text-ocean dark:text-ocean-light px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              {amenity.toLowerCase().includes('wifi') && <Wifi size={14} className="dark:text-ocean-light" />}
                              {amenity.toLowerCase().includes('mandi') && <Bath size={14} className="dark:text-ocean-light" />}
                              {amenity.toLowerCase().includes('bed') && <BedDouble size={14} className="dark:text-ocean-light" />}
                              {amenity.toLowerCase().includes('tv') && <Tv size={14} className="dark:text-ocean-light" />}
                              {!['wifi','mandi','bed','tv'].some(k=>amenity.toLowerCase().includes(k)) && <CheckCircle size={14} className="dark:text-ocean-light" />}
                              {amenity}
                            </li>
                          ))}
                        </ul>
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{room.description}</p>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* Card Catatan dipindahkan ke sini */}
              <div id="booking" className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center">
                    <svg width="20" height="20" fill="none" stroke="#D97706" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-amber-700 dark:text-amber-400">Catatan</div>
                    <div className="text-gray-600 dark:text-gray-200 text-sm mt-1">
                      Harga sewaktu-waktu dapat berubah, menyesuaikan dengan hari libur dan kondisi lainnya, untuk dapat harga terbaik hari ini silahkan bisa ditanyakan langsung via WhatsApp.
                    </div>
                  </div>
                </div>
              </div>

              {/* Rekomendasi Lainnya */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Rekomendasi Lainnya di {mainLocation}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recommendedProperties.map((property) => (
                    <div key={property.id} className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0">
                      <PropertyCard
                        id={property.id}
                        name={property.name}
                        type={property.type}
                        image={property.mainImages?.[0] || property.image}
                        price={property.price}
                        rating={property.rating}
                        location={property.location}
                        capacity={property.capacity}
                        reviews={property.reviews}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        amenities={property.amenities}
                        description={property.description}
                        tags={property.tags || []}
                        mainImages={property.mainImages || []}
                        roomTypes={property.roomTypes || []}
                        nearbyAttractions={property.nearbyAttractions || []}
                        ratingSummary={property.ratingSummary}
                        propertyReviews={property.propertyReviews || []}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Ulasan Tamu */}
              <div id="review" className="mb-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Ulasan Tamu</h2>
                <div className="flex items-center mb-4">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium dark:text-white">{property.rating.toFixed(1)}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">({property.reviews} ulasan)</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {displayedReviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="dark:bg-gray-800 dark:border-gray-700">
                          <CardContent className="p-4">
                            <div className="flex justify-between mb-2 dark:text-white">
                              <div className="font-medium dark:text-white">{review.author}</div>
                              <div className="text-gray-500 dark:text-gray-400 text-sm">{review.date}</div>
                            </div>
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  size={14}
                                  className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lokasi */}
              <div id="lokasi" className="mb-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Lokasi</h2>
                <div className="rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800/50">
                  <Suspense fallback={
                    <div className="h-[250px] rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">Memuat peta...</span>
                    </div>
                  }>
                    <MapComponent 
                      center={property.coordinates}
                      propertyName={property.name}
                      propertyLocation={property.location}
                      height="400px"
                    />
                  </Suspense>
                </div>
              </div>
            </main>

            {/* Kolom Kanan - Widget (1/3 lebar di desktop) */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Card Booking WhatsApp */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 p-6">
                  <h2 className="text-xl font-bold mb-4 text-ocean dark:text-ocean-light">Booking Sekarang</h2>
                  <div className="space-y-4">
                    {/* Info WhatsApp */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/30">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center">
                        <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.431-.148-.61.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-700 dark:text-green-400">Booking via WhatsApp</div>
                          <div className="text-gray-600 dark:text-gray-200 text-sm">Pesan langsung dan dapatkan penawaran terbaik</div>
                        </div>
                      </div>
                      <ul className="text-green-700 dark:text-green-400 text-sm mt-3 space-y-1">
                        <li className="flex items-center gap-2">
                          <svg width="16" height="16" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                          <span>Respon cepat dalam 1x24 jam</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg width="16" height="16" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                          <span>Konfirmasi booking instan</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <svg width="16" height="16" fill="none" stroke="#25D366" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 13l4 4L19 7"/>
                          </svg>
                          <span>Layanan pelanggan 24/7</span>
                        </li>
                      </ul>
                      <a
                      href={`https://wa.me/83877080088?text=${generateBookingMessage()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                      >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.431-.148-.61.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Booking via WhatsApp
                      </a>
                    </div>
                  </div>
                  </div>

              <RatingWidget ratingSummary={ratingSummary} />
              
              {/* Card Pertanyaan Umum & Kebijakan */}
              <div className="bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-ocean/10 dark:bg-ocean-dark/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-ocean dark:text-ocean-light" />
                  </div>
                  <h2 className="text-xl font-bold text-ocean dark:text-ocean-light">Pertanyaan Umum & Kebijakan</h2>
                </div>

                <FAQAccordion
                  items={[
                    {
                      question: "Kapan waktu check-in dan check-out?",
                      answer: (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <Clock size={16} />
                            <span>Check-in: 14:00 WIB</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <Clock size={16} />
                            <span>Check-out: 12:00 WIB</span>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                            Untuk early check-in (masuk sebelum 14:00) atau late check-out (keluar setelah 12:00), mohon informasikan ke pihak pengelola villa jauh-jauh hari. Ketersediaan tergantung kondisi di lapangan dan mungkin dikenakan biaya tambahan.
                          </p>
                        </div>
                      ),
                      icon: <Clock size={16} />
                    },
                    {
                      question: "Bagaimana kebijakan pembatalan reservasi?",
                      answer: (
                        <div className="space-y-2 text-sm">
                          <p>Kebijakan pembatalan kami adalah sebagai berikut:</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Pembatalan 7 hari atau lebih sebelum tanggal check-in: Refund 100%.</li>
                            <li>Pembatalan antara 3 hingga 6 hari sebelum tanggal check-in: Refund 50%.</li>
                            <li>Pembatalan kurang dari 3 hari sebelum tanggal check-in: Tidak ada refund.</li>
                          </ul>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Untuk kasus force majeure (bencana alam, dll.), kebijakan khusus mungkin berlaku. Mohon hubungi kami untuk diskusi lebih lanjut.
                          </p>
                        </div>
                      ),
                      icon: <Info size={16} />
                    },
                    {
                      question: "Berapa maksimal jumlah tamu per villa?",
                      answer: (
                        <div className="space-y-2 text-sm">
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ocean/10 dark:bg-ocean-dark/20 rounded-full text-ocean dark:text-ocean-light">
                            <Users size={16} />
                            <span>Maksimal {property?.capacity} tamu</span>
                          </div>
                          <p className="text-gray-500 dark:text-gray-400">
                            Jumlah tamu yang menginap tidak boleh melebihi kapasitas maksimal yang tertera. Jika Anda berencana membawa tamu tambahan, mohon konfirmasi terlebih dahulu kepada pihak pengelola. Tamu tambahan di atas kapasitas maksimal yang disepakati mungkin dikenakan biaya tambahan per orang per malam.
                          </p>
                        </div>
                      ),
                      icon: <Users size={16} />
                    },
                    {
                      question: "Apakah sarapan termasuk dalam harga?",
                      answer: (
                        <div className="space-y-2 text-sm">
                           <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle size={16} />
                             <span>Ya, paket menginap kami sudah termasuk sarapan prasmanan.</span>
                           </div>
                           <p className="text-gray-500 dark:text-gray-400">
                            Sarapan disajikan setiap hari pukul 07:00 - 10:00 WIB dengan menu bervariasi antara hidangan lokal dan kontinental.
                           </p>
                        </div>
                       ),
                      icon: <Utensils size={16} />
                    },
                    {
                      question: "Fasilitas utama apa saja yang tersedia di villa?",
                      answer: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                           {[
                            { icon: <Wifi size={14} />, text: "WiFi Gratis & Cepat" },
                            { icon: <Car size={14} />, text: "Parkir Luas & Aman" },
                            { icon: <Clock size={14} />, text: "Resepsionis 24 Jam" },
                            { icon: <Tv size={14} />, text: "Ruang Tamu dengan TV" },
                            { icon: <Utensils size={14} />, text: "Akses Dapur Umum" },
                            { icon: <Info size={14} />, text: "Area Bersantai Outdoor" },
                           ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                {item.icon}
                                {item.text}
                            </div>
                           ))}
                        </div>
                      ),
                      icon: <Info size={16} />
                    },
                     {
                      question: "Layanan tambahan apa saja yang bisa dipesan?",
                      answer: (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                           {[
                            { icon: <CheckCircle size={14} />, text: "Layanan Kebersihan Harian" },
                            { icon: <CheckCircle size={14} />, text: "Early/Late Check-out (Biaya Tambahan)" },
                            { icon: <CheckCircle size={14} />, text: "Antar-Jemput Bandara (Berbayar)" },
                            { icon: <CheckCircle size={14} />, text: "Rental Kendaraan (Motor/Mobil)" },
                            { icon: <CheckCircle size={14} />, text: "Laundry (Berbayar)" },
                           ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                {item.icon}
                                {item.text}
                            </div>
                           ))}
                        </div>
                      ),
                      icon: <Plus size={16} />
                    },
                    {
                      question: "Metode pembayaran apa saja yang diterima?",
                      answer: (
                        <div className="space-y-3 text-sm">
                          <p>Kami menerima beberapa metode pembayaran:</p>
                          <div className="flex flex-wrap gap-2">
                            {["Transfer Bank (BCA, Mandiri, BNI)", "E-wallet (GoPay, OVO, DANA)", "QRIS"].map((method) => (
                              <span key={method} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                                {method}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Pembayaran dengan Kartu Kredit juga tersedia dengan biaya tambahan.
                          </p>
                        </div>
                      ),
                      icon: <CreditCard size={16} />
                    },
                     {
                      question: "Apakah boleh merokok di area villa?",
                      answer: (
                         <div className="space-y-2 text-sm">
                           <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                             <CheckCircle size={16} />
                             <span>Ya, area merokok khusus tersedia di luar ruangan.</span>
                           </div>
                            <p className="text-gray-500 dark:text-gray-400">
                             Mohon hormati tamu lain dan gunakan area yang telah ditentukan untuk merokok.
                            </p>
                         </div>
                      ),
                      icon: <Info size={16} />
                    },
                    {
                      question: "Apakah boleh membawa hewan peliharaan?",
                      answer: (
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <Info size={16} />
                            <span>Maaf, untuk kenyamanan dan kebersihan bersama, kami tidak mengizinkan hewan peliharaan di area villa.</span>
                          </div>
                        </div>
                      ),
                      icon: <Info size={16} />
                    },
                     {
                      question: "Aturan atau kebijakan lain yang perlu diketahui?",
                      answer: (
                        <div className="space-y-2 text-sm">
                           <ul className="list-disc list-inside space-y-1">
                             <li>Dilarang membuat kebisingan berlebihan setelah pukul 22:00 WIB.</li>
                             <li>Tamu bertanggung jawab atas kerusakan fasilitas villa akibat kelalaian. Biaya penggantian akan dikenakan.</li>
                             <li>Mohon menjaga kebersihan lingkungan villa.</li>
                           </ul>
                           <p className="text-gray-500 dark:text-gray-400 mt-2">
                             Informasi lebih lengkap bisa ditanyakan saat proses booking.
                           </p>
                        </div>
                      ),
                      icon: <Info size={16} />
                    },
                  ]}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
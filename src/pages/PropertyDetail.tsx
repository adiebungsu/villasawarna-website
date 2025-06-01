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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  type: 'villa' | 'homestay' | 'hotel' | 'apartment'; // Added 'apartment'
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
  coordinates?: [number, number];
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
  roomTypes?: RoomType[];
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
  isQrisExpanded: boolean;
  setIsQrisExpanded: React.Dispatch<React.SetStateAction<boolean>>;
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
  const whatsappUrl = `https://wa.me/+6283877080088?text=${generateBookingMessage()}`;

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
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  
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
  const [isQrisExpanded, setIsQrisExpanded] = useState(false);

  const allProperties = useMemo(() => getAllProperties(), []);
  const property = useMemo(() => allProperties.find((p) => p.id === id), [allProperties, id]);
  // Ganti inisialisasi roomTypes agar mengambil dari property.roomTypes jika ada
  const roomTypes = useMemo(() => property?.roomTypes || propertyRoomTypes[id || ''] || [], [property, id]);
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
    `${property.name} adalah ${property.type === 'villa' ? 'villa nyaman' : 'penginapan homestay'} di ${property.location}, Pantai Sawarna. ${property.description.substring(0, 150)}... Harga mulai Rp ${property.price.toLocaleString('id-ID')}. Rating ${property.rating} dari ${property.reviews} review. Fasilitas lengkap termasuk ${property.amenities?.slice(0, 3).join(', ')}. Cocok untuk liburan keluarga dan rombongan.` :
    'Detail villa dan penginapan di Pantai Sawarna';

  const metaTitle = property ? 
    `${property.name} - ${property.type === 'villa' ? 'Villa' : 'Penginapan Homestay'} di ${property.location} | Villa Sawarna` : 
    'Detail Properti - Villa Sawarna';

  const ogDescription = property ? 
    `Sewa ${property.name} di ${property.location}. ${property.type === 'villa' ? 'Villa' : 'Penginapan homestay'} dengan pemandangan pantai dan fasilitas lengkap. Harga mulai Rp ${property.price.toLocaleString('id-ID')}. Rating ${property.rating} dari ${property.reviews} review.` : 
    'Detail properti dan penginapan di Pantai Sawarna';

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
  const structuredData = property ? [
    {
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
        "latitude": property.coordinates?.[0],
        "longitude": property.coordinates?.[1]
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://villasawarna.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": property.type === 'villa' ? "Villa" : "Homestay",
          "item": `https://villasawarna.com/${property.type === 'villa' ? 'villas' : 'homestays'}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": property.name,
          "item": `https://villasawarna.com/property/${id}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Apa saja fasilitas yang tersedia di ${property.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": property.amenities?.join(', ') || 'Tidak ada informasi fasilitas'
          }
        },
        {
          "@type": "Question",
          "name": `Berapa harga sewa ${property.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Harga mulai Rp ${property.price.toLocaleString('id-ID')} per malam`
          }
        },
        {
          "@type": "Question",
          "name": `Berapa kapasitas maksimal ${property.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Kapasitas maksimal ${property.capacity} orang`
          }
        },
        {
          "@type": "Question",
          "name": `Dimana lokasi ${property.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${property.name} berlokasi di ${property.location}, Sawarna, Banten`
          }
        }
      ]
    }
  ] : null;

  // Tambahkan koordinat default jika tidak ada
  const propertyCoordinates = property?.coordinates || [ -6.9875, 106.3206 ]; // Koordinat Sawarna

  const handleDownloadQRIS = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowDownloadDialog(true);
  };

  const downloadQRIS = async () => {
    try {
      const response = await fetch('/images/QRIS.jpg');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QRIS_Pembayaran_Sawarna_Creative.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setShowDownloadDialog(false);
    } catch (error) {
      console.error('Error downloading QRIS:', error);
      toast({
        title: "Gagal Mengunduh QRIS",
        description: "Silakan coba lagi nanti",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={`${property?.type} sawarna, ${property?.location}, pantai sawarna, sewa ${property?.type}, ${property?.name?.toLowerCase()}, penginapan sawarna, wisata sawarna, villa sawarna, homestay sawarna, penginapan murah sawarna, sewa villa sawarna, sewa homestay sawarna, penginapan dekat pantai sawarna, villa dekat pantai sawarna, homestay dekat pantai sawarna, penginapan keluarga sawarna, villa keluarga sawarna, homestay keluarga sawarna`}
        url={`https://villasawarna.com/property/${id}`}
        image={property?.image}
        type="website"
        structuredData={structuredData}
        openGraph={{
          type: 'website',
          article: {
            section: property?.type || 'property',
            tags: [property?.type, 'sawarna', 'wisata sawarna', 'penginapan sawarna', 'villa sawarna', 'homestay sawarna']
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
                  <div className="h-1.5 bg-coral dark:bg-coral-light mt-4 rounded-full"></div>
                </div>
              ) : (
                <div className="mb-8 text-center text-gray-400 dark:text-gray-600">Tidak ada gambar</div>
              )}

              {/* Card Info Properti */}
              <div className="mb-8 grid grid-cols-4 gap-1 -mt-6">
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
                  <span className="text-coral dark:text-coral-light text-lg font-semibold">| {property.type === 'villa' ? 'Villa Eksklusif' : 'Penginapan Homestay'} Tropis</span>
                </h2>
                <div className="border-b border-gray-200 dark:border-gray-700/50 mb-4"></div>
                <div className="text-lg text-gray-800 dark:text-gray-100 mb-2 leading-relaxed">
                  Temukan kenyamanan dan ketenangan di penginapan <span className="font-bold text-ocean dark:text-ocean-light">{property.name}</span>, {property.type === 'villa' ? 'villa eksklusif' : 'penginapan homestay'} di kawasan {property.location}. Dirancang untuk keluarga maupun rombongan yang menginginkan suasana privat, modern, dan penuh kehangatan.
                </div>
                <ul className="mb-3 space-y-1 text-gray-700 dark:text-gray-200">
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

              {/* Lokasi */}
              <div id="lokasi" className="mb-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Lokasi</h2>
                {/* Layout vertikal: Info di atas, Peta di bawah */}
                <div className="space-y-4 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800/50 p-4 bg-white dark:bg-gray-900">
                  {/* Info Lokasi & Jarak */}
                  <div>
                    <div className="font-semibold text-lg mb-1">Jarak ke Pantai</div>
                    <ul className="mb-3 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-1">🚗 <span>Parkir</span></span>
                        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-xs">GRATIS</span>
                      </li>
                      {/* Tampilkan daftar destinasi secara langsung */}
                      {property.nearbyAttractions && property.nearbyAttractions.length > 0 ? (
                        property.nearbyAttractions.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 whitespace-nowrap"
                          >
                            <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">🌊 <span>{item.name}</span></span>
                            <span className="bg-ocean/10 dark:bg-ocean-dark/20 text-ocean dark:text-ocean-light font-semibold px-2 py-0.5 rounded text-xs sm:text-xs text-[11px] whitespace-nowrap">{item.distance}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex items-center justify-between py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">🌊 <span>Jarak ke Pantai</span></span>
                            <span className="bg-ocean/10 dark:bg-ocean-dark/20 text-ocean dark:text-ocean-light font-semibold px-2 py-0.5 rounded text-xs sm:text-xs text-[11px] whitespace-nowrap">7,57 km</span>
                          </li>
                          <li className="flex items-center justify-between py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">🌊 <span>Pantai Kuta</span></span>
                            <span className="bg-ocean/10 dark:bg-ocean-dark/20 text-ocean dark:text-ocean-light font-semibold px-2 py-0.5 rounded text-xs sm:text-xs text-[11px] whitespace-nowrap">9,02 km</span>
                          </li>
                          <li className="flex items-center justify-between py-1 px-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-gray-700 dark:text-gray-300">🌊 <span>Pantai Sanur</span></span>
                            <span className="bg-ocean/10 dark:bg-ocean-dark/20 text-ocean dark:text-ocean-light font-semibold px-2 py-0.5 rounded text-xs sm:text-xs text-[11px] whitespace-nowrap">9,19 km</span>
                          </li>
                        </>
                      )}
                    </ul>
                    <a href="#" className="text-blue-600 text-sm underline mt-2">Lihat sekitar</a>
                  </div>

                  {/* Peta */}
                  <div className="w-full h-[150px] md:h-[250px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
                    <MapComponent
                      key={showDownloadDialog ? 'map-dialog-open' : 'map-dialog-closed'}
                      center={property.coordinates}
                      propertyName={property.name}
                      propertyLocation={property.location}
                      height="100%"
                    />
                  </div>
                </div>

                {/* Card Kontak Villa */}
                {property?.contact?.phone && (
                  <div id="kontak" className="mt-4 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-800/50 p-8 border border-ocean/10 dark:border-ocean-dark/30">
                    <h2 className="text-xl font-bold mb-4 text-ocean dark:text-ocean-light">Kontak : {property.name}</h2>
                    <div className="flex items-center gap-4">
                      <Phone size={24} className="text-green-600 dark:text-green-400" />
                      <a
                        href={`https://wa.me/+62${property.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Halo, saya dapat informasi ${property.name} dari villasawarna.com, apakah penginapannya masih tersedia?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-green-600 dark:text-green-400 hover:underline"
                      >
                        +62 {property.contact.phone}
                      </a>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Klik nomor di atas untuk langsung chat via WhatsApp.</p>
                  </div>
                )}

              </div>

              {/* Card Bayar dengan QRIS */}
              <div id="qris-payment" className="mb-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-xl text-ocean dark:text-ocean-light hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => setIsQrisExpanded(!isQrisExpanded)}
                >
                  Bayar dengan QRIS
                  <motion.div
                    animate={{ rotate: isQrisExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isQrisExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden px-6 pb-6"
                    >
                      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex flex-col items-center">
                        <img src="/images/QRIS.jpg" alt="QRIS Pembayaran" className="w-full max-w-xs mx-auto rounded-md" />
                        <p className="text-center text-gray-700 dark:text-gray-300 text-sm mt-3">Scan QRIS di atas untuk melakukan pembayaran.</p>
                        <p className="text-center text-gray-700 dark:text-gray-300 text-sm mt-1 font-semibold">Nama Merchant: Sawarna Creative</p>
                        <button
                          onClick={handleDownloadQRIS}
                          className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-ocean text-white rounded-lg hover:bg-ocean-dark transition-colors duration-200"
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          Download QRIS
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Fasilitas Utama */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2 text-coral dark:text-coral-light">Fasilitas Utama:</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                  {property.amenities?.slice(0, 8).map((amenity, idx) => (
                    <div key={idx} className="rounded-lg bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 p-2 shadow-sm flex flex-col items-center text-center">
                      <div className="w-6 h-6 mb-1 flex items-center justify-center text-ocean dark:text-ocean-light">
                        {amenity.toLowerCase().includes('wifi') && <Wifi size={16} />}
                        {amenity.toLowerCase().includes('ac') && <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m8-8h2M2 12H4m15.07 7.07l1.42 1.42M4.93 4.93L3.51 3.51m15.56 0l-1.42 1.42M4.93 19.07l-1.42 1.42"/></svg>}
                        {amenity.toLowerCase().includes('tv') && <Tv size={16} />}
                        {amenity.toLowerCase().includes('mandi') && <Bath size={16} />}
                        {amenity.toLowerCase().includes('bed') && <BedDouble size={16} />}
                        {amenity.toLowerCase().includes('parkir') && <Car size={16} />}
                        {amenity.toLowerCase().includes('dapur') && <Utensils size={16} />}
                        {amenity.toLowerCase().includes('taman') && <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
                        {amenity.toLowerCase().includes('pantai') && <Waves size={16} />}
                        {!['wifi', 'ac', 'tv', 'mandi', 'bed', 'parkir', 'dapur', 'taman', 'pantai'].some(k => amenity.toLowerCase().includes(k)) && <CheckCircle size={16} />}
                      </div>
                      <div className="font-medium text-xs text-gray-900 dark:text-gray-100">{amenity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tipe Kamar */}
              <div id="kamar" className="mb-8">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Tipe Kamar</h2>
                <Tabs value={selectedRoomType} onValueChange={setSelectedRoomType} className="mb-6">
                  <SimpleRoomTabsList className="flex w-full gap-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl">
                    {roomTypes.map((room) => (
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
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{ 
                    clickable: true,
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-ocean dark:!bg-ocean-light',
                    bulletClass: 'swiper-pagination-bullet !bg-gray-300 dark:!bg-gray-600',
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="w-full relative group"
                >
                  {displayedReviews.map((review) => {
                    // Fungsi untuk mendapatkan inisial dari nama
                    const getInitials = (name: string) => {
                      return name
                        .split(' ')
                        .map(word => word[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2);
                    };

                    return (
                      <SwiperSlide key={review.id}>
                        <Card className="dark:bg-gray-800 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-ocean/30 dark:hover:border-ocean-dark/30">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean to-ocean-dark dark:from-ocean-dark dark:to-ocean flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {getInitials(review.author)}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-lg dark:text-white">{review.author}</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                                  <Clock size={14} />
                                  {review.date}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold text-yellow-600 dark:text-yellow-400">{review.rating}.0</span>
                              </div>
                            </div>
                            <div className="relative">
                              <div className="absolute -left-2 top-0 text-4xl text-gray-200 dark:text-gray-700">"</div>
                              <p className="text-gray-600 dark:text-gray-300 pl-4 italic">{review.comment}</p>
                              <div className="absolute -right-2 bottom-0 text-4xl text-gray-200 dark:text-gray-700">"</div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <CheckCircle size={14} className="text-green-500" />
                                <span>Verified Stay</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button 
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                  title="Suka review ini"
                                  aria-label="Suka review ini"
                                >
                                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                                </button>
                                <button 
                                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                  title="Bagikan review ini"
                                  aria-label="Bagikan review ini"
                                >
                                  <Share2 size={16} className="text-gray-400 hover:text-blue-500" />
                                </button>
                            </div>
                            </div>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    );
                  })}
                  <div className="swiper-button-prev !w-8 !h-8 !bg-white/80 dark:!bg-gray-800/80 !rounded-full !shadow-lg !border !border-gray-200 dark:!border-gray-700 after:!text-base after:!text-ocean dark:after:!text-ocean-light opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="swiper-button-next !w-8 !h-8 !bg-white/80 dark:!bg-gray-800/80 !rounded-full !shadow-lg !border !border-gray-200 dark:!border-gray-700 after:!text-base after:!text-ocean dark:after:!text-ocean-light opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="swiper-pagination !bottom-0"></div>
                </Swiper>
              </div>
            </main>

            {/* Kolom Kanan - Widget (1/3 lebar di desktop) */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Card Booking WhatsApp */}
              <BookingWidget 
                property={property}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                numberOfNights={numberOfNights}
                onBooking={handleBooking} // Assuming handleBooking exists or replace with correct handler
                isQrisExpanded={isQrisExpanded} // Pass the state
                setIsQrisExpanded={setIsQrisExpanded} // Pass the state setter
              />

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

      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-800/95 dark:to-gray-800/90 backdrop-blur-sm border border-ocean/20 dark:border-ocean-dark/20 shadow-xl dark:shadow-gray-800/50">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ocean/10 dark:bg-ocean-dark/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-ocean dark:text-ocean-light" />
              </div>
              <DialogTitle className="text-xl font-bold text-ocean dark:text-ocean-light">Konfirmasi Download QRIS</DialogTitle>
            </div>
            <DialogDescription asChild>
              <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-lg text-gray-800 dark:text-gray-100 text-base leading-relaxed shadow-inner">
                Silahkan lakukan booking atau pelunasan, pastikan menyertakan data lengkap seperti nama <span className="font-bold">villa/homestay/penginapan</span> dan <span className="font-bold">tanggal menginap</span>.<br />
                Setelah pembayaran tolong konfirmasikan.
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowDownloadDialog(false)}
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Batal
            </Button>
            <Button
              onClick={downloadQRIS}
              className="bg-gradient-to-r from-ocean to-ocean-dark hover:from-ocean-dark hover:to-ocean text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download QRIS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyDetail;
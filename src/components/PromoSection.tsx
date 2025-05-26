import { PromoCard } from "./PromoCard";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Star, Users, Bed } from "lucide-react";

const promos = [
  {
    id: "villa-little-hula-hula",
    title: "Villa Little Hula Hula",
    description: "Villa mewah premium dengan 10 kamar tidur, pemandangan sawah yang menenangkan, dan area outdoor yang luas. Dilengkapi dapur modern dan area BBQ.",
    price: 320000,
    originalPrice: 370000,
    discount: 13,
    image: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-aea2b07141382e5e96f88bfe59f5efe0.jpeg",
    location: "Goa Langir, Sawarna",
    rating: 4.8,
    reviews: 178,
    capacity: 50,
    bedrooms: 10,
    amenities: ["View Pesawahan", "WiFi", "Parkir Luas", "Area BBQ"],
    validUntil: "31 Agustus 2024"
  },
  {
    id: "villa-sinar-pelangi",
    title: "Villa Sinar Pelangi",
    description: "Villa yang sangat nyaman dengan lokasi strategis di semua lokasi wisata, 10 kamar tidur mewah, dan area outdoor yang luas. Cocok untuk acara keluarga besar.",
    price: 194000,
    originalPrice: 200000,
    discount: 3,
    image: "https://i.imgur.com/lNcydX5.jpeg",
    location: "Pantai Sawarna",
    rating: 4.7,
    reviews: 239,
    capacity: 50,
    bedrooms: 10,
    amenities: ["View Pantai", "WiFi", "Area BBQ"],
    validUntil: "31 Agustus 2024"
  },
  {
    id: "villa-arizky-sawarna",
    title: "Villa Arizky Sawarna",
    description: "Villa modern dengan 8 kamar tidur, pemandangan sawah yang menenangkan, dan area outdoor yang luas. Dilengkapi dapur modern dan area BBQ.",
    price: 315000,
    originalPrice: 350000,
    discount: 10,
    image: "https://i.imgur.com/wBoC7ZA.jpeg",
    location: "Legon Pari",
    rating: 4.8,
    reviews: 285,
    capacity: 40,
    bedrooms: 8,
    amenities: ["View Pantai", "WiFi", "Area BBQ"],
    validUntil: "31 Agustus 2024"
  },
  {
    id: "villa-muara-legon-pari",
    title: "Villa Muara Legon Pari",
    description: "Villa premium dengan pemandangan pantai langsung, 4 kamar tidur mewah, dan area outdoor yang luas. Dilengkapi WiFi dan area BBQ.",
    price: 340000,
    originalPrice: 400000,
    discount: 15,
    image: "https://i.imgur.com/113iLqC.jpeg",
    location: "Pantai Legon Pari",
    rating: 4.6,
    reviews: 185,
    capacity: 12,
    bedrooms: 4,
    amenities: ["View Pantai", "WiFi", "Area BBQ"],
    validUntil: "31 Agustus 2024"
  }
];

export function PromoSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-coral/5 via-white to-coral/5 dark:from-coral/10 dark:via-gray-900 dark:to-coral/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-3 text-sm font-semibold bg-coral/10 dark:bg-coral-dark/20 text-coral dark:text-coral-light rounded-full shadow-sm">
            Penawaran Spesial
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Promo Spesial</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dapatkan penawaran terbaik untuk menginap di villa mewah kami dengan diskon spesial 15%. 
            Berlaku hingga 31 Agustus 2024.
          </p>
        </div>

        {/* Promo List Tanpa Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {promos.map((promo) => (
            <div key={promo.id} className="w-full">
              <PromoCard {...promo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
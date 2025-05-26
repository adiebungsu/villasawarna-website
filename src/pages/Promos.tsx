import { PromoCard } from "@/components/PromoCard";

const promos = [
  {
    id: "sinar-pelangi",
    title: "Villa Sinar Pelangi",
    description: "Villa mewah dengan pemandangan matahari terbit yang menakjubkan. Dilengkapi dengan 10 kamar tidur mewah, kolam renang infinity, dan area BBQ yang luas.",
    price: 375000,
    originalPrice: 500000,
    discount: 25,
    image: "https://i.imgur.com/lNcydX5.jpeg",
    location: "Pantai Sawarna, Banten",
    rating: 4.4,
    reviews: 239,
    capacity: 50,
    bedrooms: 10,
    amenities: ["View Pantai", "WiFi", "Kolam Renang Infinity", "Area BBQ"],
    validUntil: "31 Desember 2024"
  },
  {
    id: "arizky",
    title: "Villa Arizky",
    description: "Villa mewah dengan pemandangan pantai dan kolam renang pribadi. Dilengkapi dengan 8 kamar tidur mewah, kolam renang infinity, dan area BBQ yang luas.",
    price: 375000,
    originalPrice: 500000,
    discount: 25,
    image: "https://i.imgur.com/lNcydX5.jpeg",
    location: "Pantai Sawarna, Banten",
    rating: 4.6,
    reviews: 189,
    capacity: 40,
    bedrooms: 8,
    amenities: ["View Pantai", "WiFi", "Kolam Renang Infinity", "Area BBQ"],
    validUntil: "31 Desember 2024"
  },
  {
    id: "muara-legon",
    title: "Villa Muara Legon Pari",
    description: "Villa mewah dengan pemandangan sawah dan gunung yang menakjubkan. Dilengkapi dengan 6 kamar tidur mewah, kolam renang, dan area BBQ.",
    price: 375000,
    originalPrice: 500000,
    discount: 25,
    image: "https://i.imgur.com/xjM7Pu6.jpeg",
    location: "Muara Legon, Banten",
    rating: 4.8,
    reviews: 156,
    capacity: 30,
    bedrooms: 6,
    amenities: ["View Sawah", "WiFi", "Kolam Renang", "Area BBQ"],
    validUntil: "31 Desember 2024"
  },
  {
    id: "putri-asih",
    title: "Villa Putri Asih",
    description: "Villa mewah dengan pemandangan pantai dan taman yang asri. Dilengkapi 5 kamar tidur mewah, kolam renang, dan area BBQ.",
    price: 375000,
    originalPrice: 500000,
    discount: 25,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    location: "Pantai Sawarna, Banten",
    rating: 4.3,
    reviews: 32,
    capacity: 5,
    bedrooms: 5,
    amenities: ["View Pantai", "WiFi", "Kolam Renang", "Area BBQ", "Taman"],
    validUntil: "31 Desember 2024"
  }
];

export default function Promos() {
  return (
    <div className="container mx-auto px-3 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Daftar Promo Spesial</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {promos.map(promo => (
          <PromoCard key={promo.id} {...promo} />
        ))}
      </div>
    </div>
  );
} 
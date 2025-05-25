import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { Bed, Wifi, Umbrella, MapPin, Users, Star, ListFilter } from "lucide-react";
import { getVillasData } from "@/data/properties";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SEO from '@/components/SEO';

interface Villa {
  id: string;
  name: string;
  price: number;
  capacity: number;
  rating: number;
  amenities: string[];
}

interface Amenity {
  name: string;
  count: number;
}

const amenities: Amenity[] = [
  { name: "Tepi Pantai", count: 8 },
  { name: "AC", count: 16 },
  { name: "WiFi Gratis", count: 16 },
  { name: "Dapur", count: 14 },
  { name: "Pemandangan Laut", count: 10 },
  { name: "Sarapan Gratis", count: 7 },
  { name: "Air Panas", count: 12 }
];

const Villas: React.FC = () => {
  // Data state
  const villasData = getVillasData();
  
  // Filter states
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<"recommended" | "price-low" | "price-high" | "rating">("recommended");
  
  // Filtered data
  const filteredVillas = useMemo(() => {
    let result = [...villasData];
    
    // Apply price filter
    if (priceMin && !isNaN(Number(priceMin))) {
      result = result.filter(villa => villa.price >= Number(priceMin));
    }
    
    if (priceMax && !isNaN(Number(priceMax))) {
      result = result.filter(villa => villa.price <= Number(priceMax));
    }
    
    // Apply capacity filter
    if (selectedCapacity) {
      result = result.filter(villa => villa.capacity >= selectedCapacity);
    }
    
    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(villa => villa.rating >= minRating);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // recommended - sort by rating first, then price
        result.sort((a, b) => b.rating - a.rating || a.price - b.price);
    }
    
    return result;
  }, [villasData, priceMin, priceMax, selectedCapacity, minRating, sortOption, selectedAmenities]);
  
  // Handle filter reset
  const handleResetFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setSelectedCapacity(null);
    setSelectedAmenities([]);
    setMinRating(0);
    setSortOption("recommended");
    toast.success("Filter berhasil direset");
  };
  
  // Handle capacity selection
  const handleCapacityClick = (capacity: number) => {
    setSelectedCapacity(selectedCapacity === capacity ? null : capacity);
  };
  
  // Handle amenity toggle
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => {
      if (prev.includes(amenity)) {
        return prev.filter(a => a !== amenity);
      } else {
        return [...prev, amenity];
      }
    });
  };
  
  // Handle rating selection
  const handleRatingSelect = (rating: number) => {
    setMinRating(rating);
  };
  
  return (
    <>
      <SEO 
        title="Vila Mewah di Pantai Sawarna"
        description="Nikmati pengalaman menginap yang luar biasa dengan koleksi vila mewah pilihan kami, menawarkan pemandangan spektakuler dan fasilitas modern."
        keywords="vila sawarna, villa pantai, penginapan sawarna, villa mewah"
      />
      <div className="min-h-screen flex flex-col">
        {/* Page Header */}
        <div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:via-gray-900 dark:to-blue-950 text-gray-900 dark:text-white py-12 pt-24 
                     relative overflow-hidden group"
        >
          {/* Background Image Layer (Mobile Only) */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              backgroundImage: 'url(https://i.imgur.com/pUdHFRO.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(4px)',
              transform: 'scale(1.05)',
            }}
          ></div>

          {/* Overlay with Gradient (Mobile Only) */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent dark:from-black/90 dark:via-black/60 sm:hidden"></div>

          <div className="container-custom relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Vila Mewah di Pantai Sawarna</h1>
            <p className="text-lg max-w-3xl text-gray-700 dark:text-gray-200">
              Nikmati pengalaman menginap yang luar biasa dengan koleksi vila mewah pilihan kami, menawarkan pemandangan spektakuler dan fasilitas modern.
            </p>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-1/4 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 rounded-lg shadow-md p-5 h-fit dark:text-gray-200 dark:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold dark:text-white">Filter</h2>
                <ListFilter size={20} className="text-ocean dark:text-coral" />
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2 dark:text-gray-300">Rentang Harga (per malam)</h3>
                <div className="flex justify-between items-center">
                  <div className="w-5/12">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      aria-label="Minimum price"
                    />
                  </div>
                  <div className="border-t-2 w-1/12 dark:border-gray-600"></div>
                  <div className="w-5/12">
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      aria-label="Maximum price"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2 dark:text-gray-300">Kapasitas Tamu</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 6, 8].map(num => (
                    <button 
                      key={num}
                      className={`p-2 border ${selectedCapacity === num ? 'bg-ocean text-white border-ocean' : 'border-gray-300 dark:border-gray-600 dark:text-gray-300'} rounded hover:bg-ocean hover:text-white hover:border-ocean transition-colors dark:hover:bg-ocean-dark`}
                      onClick={() => handleCapacityClick(num)}
                      aria-label={`Filter by capacity ${num}+`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3 dark:text-gray-300">Fasilitas</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`amenity-${index}`}
                        className="mr-2 dark:bg-gray-700 dark:border-gray-600 checked:dark:bg-ocean checked:dark:border-ocean"
                        checked={selectedAmenities.includes(amenity.name)}
                        onChange={() => handleAmenityToggle(amenity.name)}
                      />
                      <label htmlFor={`amenity-${index}`} className="text-sm dark:text-gray-300">
                        {amenity.name} <span className="text-gray-500 dark:text-gray-400">({amenity.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2 dark:text-gray-300">Rating</h3>
                <div className="flex items-center space-x-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      className={`${minRating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} hover:text-yellow-400`}
                      onClick={() => handleRatingSelect(star)}
                      aria-label={`Filter by rating ${star} stars`}
                    >
                      <Star size={20} className="fill-current" />
                    </button>
                  ))}
                  <span className="ml-2 dark:text-gray-300">&amp; Up</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="w-full bg-ocean dark:bg-ocean-dark dark:hover:bg-ocean">
                  Terapkan Filter
                </Button>
                <Button variant="outline" className="w-1/3 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                  Reset
                </Button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <div className="flex flex-wrap justify-between items-center mb-6">
                <p className="text-gray-500 mb-4 md:mb-0">Menampilkan {filteredVillas.length} vila mewah</p>
                <div className="flex gap-2">
                  <select 
                    className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as "recommended" | "price-low" | "price-high" | "rating")}
                    aria-label="Sort by"
                  >
                    <option value="recommended">Urutkan: Direkomendasikan</option>
                    <option value="price-low">Harga: Rendah ke Tinggi</option>
                    <option value="price-high">Harga: Tinggi ke Rendah</option>
                    <option value="rating">Rating: Tinggi ke Rendah</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredVillas.map((villa) => (
                  <PropertyCard key={villa.id} {...villa} />
                ))}
              </div>
              
              {/* Villa Features Section */}
              <div className="mt-16 bg-sand-light dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 p-6 rounded-lg dark:text-gray-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Mengapa Memilih Villa Kami?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  <div className="flex items-start">
                    <div className="bg-ocean rounded-full p-3 mr-4 dark:bg-coral-light">
                      <Umbrella className="h-6 w-6 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Akses Pantai</h3>
                      <p className="text-gray-600 dark:text-gray-300">Sebagian besar vila kami menawarkan akses langsung ke pantai atau dalam jarak berjalan kaki dari pantai.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-ocean rounded-full p-3 mr-4 dark:bg-coral-light">
                      <Bed className="h-6 w-6 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Fasilitas Mewah</h3>
                      <p className="text-gray-600 dark:text-gray-300">Nikmati tempat tidur premium dan dapur lengkap di vila kami.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-ocean rounded-full p-3 mr-4 dark:bg-coral-light">
                      <Wifi className="h-6 w-6 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Konektivitas Modern</h3>
                      <p className="text-gray-600 dark:text-gray-300">Tetap terhubung dengan WiFi berkecepatan tinggi sambil menikmati liburan pantai Anda.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-ocean rounded-full p-3 mr-4 dark:bg-coral-light">
                      <MapPin className="h-6 w-6 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Lokasi Strategis</h3>
                      <p className="text-gray-600 dark:text-gray-300">Vila kami terletak di bagian paling indah dari Pantai Sawarna.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-ocean rounded-full p-3 mr-4 dark:bg-coral-light">
                      <Users className="h-6 w-6 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Sempurna untuk Grup</h3>
                      <p className="text-gray-600 dark:text-gray-300">Vila luas yang dapat menampung keluarga dan rombongan besar dengan nyaman.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-ocean rounded-full p-3 mr-4 dark:bg-coral-light">
                      <Star className="h-6 w-6 text-white dark:text-gray-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Layanan Premium</h3>
                      <p className="text-gray-600 dark:text-gray-300">Nikmati layanan concierge dan staf berdedikasi selama Anda menginap.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Villas;

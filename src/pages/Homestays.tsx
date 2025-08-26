import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Coffee, Home, Utensils, MapPin, Users, Star, ListFilter } from "lucide-react";
import { getHomestaysData } from "@/data/properties";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';

const amenities = [
  { name: "Sarapan Gratis", count: 10 },
  { name: "WiFi", count: 14 },
  { name: "Pemandu Lokal", count: 8 },
  { name: "Layanan Cuci", count: 7 },
  { name: "Dapur Bersama", count: 12 },
  { name: "Air Panas", count: 9 },
  { name: "Tempat Parkir", count: 15 },
  { name: "Sewa Motor", count: 5 }
];

const Homestays = () => {
  // Data state
  const homestaysData = getHomestaysData();
  
  // Filter states
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("recommended");
  
  // Filtered data
  const filteredHomestays = useMemo(() => {
    let result = [...homestaysData];
    
    // Apply price filter
    if (priceMin && !isNaN(Number(priceMin))) {
      result = result.filter(homestay => homestay.price >= Number(priceMin));
    }
    
    if (priceMax && !isNaN(Number(priceMax))) {
      result = result.filter(homestay => homestay.price <= Number(priceMax));
    }
    
    // Apply capacity filter
    if (selectedCapacity) {
      result = result.filter(homestay => homestay.capacity >= selectedCapacity);
    }
    
    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(homestay => homestay.rating >= minRating);
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
  }, [homestaysData, priceMin, priceMax, selectedCapacity, minRating, sortOption]);
  
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

  const metaTitle = 'Homestay di Sawarna - Penginapan Otentik & Nyaman';
  const metaDescription = 'Temukan homestay otentik di Sawarna: dekat pantai, ramah keluarga, harga terjangkau, pengalaman lokal.';

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords="homestay sawarna, penginapan sawarna, homestay dekat pantai, homestay keluarga, homestay murah sawarna"
        url="https://villasawarna.com/homestays"
        type="website"
        hreflangAlternates={buildHreflangAlternates('/homestays')}
      />
      {/* Page Header */}
      <div 
        className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white py-12 pt-24 
                   relative overflow-hidden group"
      >
        {/* Background Image Layer (Mobile Only) */}
        <div
          className="absolute inset-0 sm:hidden bg-[url('https://i.imgur.com/bXNDcYr.png')] bg-cover bg-center bg-no-repeat blur-sm transform scale-105"
        ></div>

        {/* Overlay with Gradient (Mobile Only) */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent dark:from-black/90 dark:via-black/60 sm:hidden"></div>

        <div className="container-custom relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Homestay Otentik di Pantai Sawarna</h1>
          <p className="text-lg max-w-3xl text-gray-700 dark:text-gray-200">
            Rasakan kehidupan lokal dan budaya dengan homestay otentik kami yang dikelola oleh keluarga ramah di VillaSawarna, menawarkan kenyamanan dan pengalaman budaya yang unik.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg shadow-md p-5 h-fit dark:text-gray-200 dark:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Filter</h2>
              <ListFilter size={20} className="text-coral dark:text-coral" />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-300">Rentang Harga (per malam)</h3>
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
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-300">Kapasitas Tamu</h3>
              <div className="grid grid-cols-4 gap-2">
                {[2, 4, 6, 8].map(num => (
                  <button 
                    key={num}
                    className={`p-2 border ${selectedCapacity === num ? 'bg-coral text-white border-coral dark:bg-coral-dark dark:border-coral-dark' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'} rounded hover:bg-coral hover:text-white hover:border-coral transition-colors dark:hover:bg-coral-dark dark:hover:text-white`}
                    onClick={() => handleCapacityClick(num)}
                    aria-label={`Filter by capacity ${num}+`}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3 text-gray-800 dark:text-gray-300">Fasilitas</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${index}`}
                      className="mr-2 dark:bg-gray-700 dark:border-gray-600 checked:dark:bg-coral checked:dark:border-coral"
                      checked={selectedAmenities.includes(amenity.name)}
                      onChange={() => handleAmenityToggle(amenity.name)}
                    />
                    <label htmlFor={`amenity-${index}`} className="text-sm text-gray-700 dark:text-gray-300">
                      {amenity.name} <span className="text-gray-500 dark:text-gray-400">({amenity.count})</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-300">Rating</h3>
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
              <p className="text-gray-500 mb-4 md:mb-0">Menampilkan {filteredHomestays.length} homestay otentik</p>
              <div className="flex gap-2">
                <select 
                  className="border border-gray-300 rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
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
              {filteredHomestays.map((homestay) => (
                <PropertyCard key={homestay.id} {...homestay} />
              ))}
            </div>
            
            {/* Homestay Features Section */}
            <div className="mt-16 bg-sand-light dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-gray-900 p-6 rounded-lg dark:text-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Mengapa Memilih Homestay Kami?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="flex items-start">
                  <div className="bg-coral rounded-full p-3 mr-4 dark:bg-ocean">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Pengalaman Lokal</h3>
                    <p className="text-gray-600 dark:text-gray-300">Tinggal bersama keluarga lokal dan rasakan budaya Pantai Sawarna.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-coral rounded-full p-3 mr-4 dark:bg-ocean">
                    <Utensils className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Makanan Rumahan</h3>
                    <p className="text-gray-600 dark:text-gray-300">Nikmati hidangan lezat yang disiapkan oleh tuan rumah Anda.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-coral rounded-full p-3 mr-4 dark:bg-ocean">
                    <Coffee className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Kopi dan Teh Gratis</h3>
                    <p className="text-gray-600 dark:text-gray-300">Nikmati secangkir kopi atau teh hangat kapan saja.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-coral rounded-full p-3 mr-4 dark:bg-ocean">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Lokasi Strategis</h3>
                    <p className="text-gray-600 dark:text-gray-300">Homestay kami terletak di lokasi yang mudah dijangkau ke pantai dan atraksi lainnya.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-coral rounded-full p-3 mr-4 dark:bg-ocean">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Cocok untuk Pelancong Solo & Keluarga</h3>
                    <p className="text-gray-600 dark:text-gray-300">Pilihan akomodasi yang ramah dan nyaman untuk semua jenis pelancong.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-coral rounded-full p-3 mr-4 dark:bg-ocean">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Pengalaman Otentik</h3>
                    <p className="text-gray-600 dark:text-gray-300">Jauh dari keramaian, rasakan kehidupan sehari-hari masyarakat lokal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homestays;

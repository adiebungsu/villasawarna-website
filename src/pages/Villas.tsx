import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Waves } from "lucide-react";
import { getAllProperties, getFeaturedProperties, getPopularVillas, getCheapestVillas, incrementPropertyVisit, extractMainLocation } from "@/data/properties";
import SEO from '@/components/SEO';

const Villas = () => {
  const [selectedLocation, setSelectedLocation] = useState("sawarna");
  const [popularVillas, setPopularVillas] = useState(getPopularVillas());
  const [cheapestVillas, setCheapestVillas] = useState(getCheapestVillas());
  const allProperties = getAllProperties();
  const villaProperties = allProperties.filter(property => property.type === 'villa');

  // Update popular villas setiap kali halaman dimuat
  useEffect(() => {
    setPopularVillas(getPopularVillas());
    setCheapestVillas(getCheapestVillas());
  }, []);

  // Kelompokkan villa berdasarkan lokasi
  const propertiesByLocation = {
    sawarna: villaProperties.filter(villa => extractMainLocation(villa.location).toLowerCase() === 'pantai sawarna'),
    'goa-langir': villaProperties.filter(villa => extractMainLocation(villa.location).toLowerCase() === 'goa langir'),
    'legon-pari': villaProperties.filter(villa => extractMainLocation(villa.location).toLowerCase() === 'legon pari'),
    'tanjung-layar': villaProperties.filter(villa => extractMainLocation(villa.location).toLowerCase() === 'tanjung layar'),
    'karang-bokor': villaProperties.filter(villa => extractMainLocation(villa.location).toLowerCase() === 'karang bokor'),
    'pulo-manuk': villaProperties.filter(villa => extractMainLocation(villa.location).toLowerCase() === 'pulo manuk')
  };

  // Fungsi untuk menangani klik pada villa
  const handleVillaClick = (propertyId: string) => {
    incrementPropertyVisit(propertyId);
    setPopularVillas(getPopularVillas());
  };

  const metaDescription = "Temukan villa eksklusif di berbagai lokasi Sawarna. Dari Pantai Sawarna hingga Tanjung Layar, kami menyediakan villa dengan pemandangan pantai yang menakjubkan dan fasilitas lengkap untuk liburan Anda.";
  const metaTitle = "Villa di Sawarna - Sewa Villa Eksklusif dengan Pemandangan Pantai";
  
  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords="villa sawarna, sewa villa sawarna, villa pantai sawarna, villa eksklusif sawarna, villa goa langir, villa tanjung layar, villa legon pari, villa karang bokor, villa pulo manuk"
        url="https://villasawarna.com/villas"
        type="website"
      />
      
      <Navbar />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container-custom py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-ocean dark:text-ocean-light mb-4">
              Villa Eksklusif di Sawarna
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Temukan villa impian Anda di berbagai lokasi Sawarna. Setiap villa menawarkan pemandangan pantai yang menakjubkan dan fasilitas lengkap untuk liburan yang tak terlupakan.
            </p>
        </div>
        
          {/* Tab Lokasi */}
          <div className="mb-8">
            <div className="flex flex-col space-y-4">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between">
                <div className="relative flex-1 overflow-hidden">
                  <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                    {Object.keys(propertiesByLocation).map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          selectedLocation === location
                            ? 'bg-ocean text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Waves size={16} className="flex-shrink-0" />
                        <span>
                          {location === 'sawarna' && 'Pantai Sawarna'}
                          {location === 'goa-langir' && 'Goa Langir'}
                          {location === 'karang-bokor' && 'Karang Bokor'}
                          {location === 'legon-pari' && 'Legon Pari'}
                          {location === 'tanjung-layar' && 'Tanjung Layar'}
                          {location === 'pulo-manuk' && 'Pulo Manuk'}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Tab Content */}
              {Object.entries(propertiesByLocation).map(([location, properties]) => (
                <div key={location} className={location === selectedLocation ? 'block' : 'hidden'}>
                  {/* Keterangan Lokasi */}
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-6 shadow-lg dark:shadow-gray-800/50 border border-ocean/20 dark:border-ocean-dark/20 mb-8">
                    {location === 'sawarna' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Pantai Sawarna</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Pantai Sawarna adalah pantai utama yang terkenal dengan pasir putihnya yang lembut dan ombak yang cocok untuk berselancar. Lokasi ini menjadi pusat aktivitas wisata di Sawarna dengan berbagai fasilitas dan villa eksklusif yang menawarkan pemandangan pantai yang menakjubkan.
                        </p>
                      </>
                    )}
                    {location === 'goa-langir' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Goa Langir</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Goa Langir menawarkan pemandangan pantai yang tenang dan sepi, cocok untuk mereka yang mencari ketenangan dan keindahan alam yang masih alami. Villa-villa di sini memberikan pengalaman menginap yang lebih privat dan eksklusif.
                        </p>
                      </>
                    )}
                    {location === 'karang-bokor' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Karang Bokor</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Karang Bokor terkenal dengan formasi karangnya yang unik dan pemandangan matahari terbit yang menakjubkan. Selain itu dimanjakan pemandangan laut dari ketinggian tebing yang sangat mempesona. Villa-villa di area ini menawarkan akses mudah untuk berlama-lama menikmati indahnya pemandangan area sekitar dari ketinggian, mari temukan penginapan, villa terbaik di Karang Bokor Sawarna.
                        </p>
                      </>
                    )}
                    {location === 'legon-pari' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Legon Pari</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Legon Pari adalah pantai yang tenang dengan pasir putih dan air jernih, ideal untuk berenang dan snorkeling. Villa-villa di sini memberikan suasana yang santai dan nyaman untuk liburan keluarga.
                        </p>
                      </>
                    )}
                    {location === 'tanjung-layar' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Tanjung Layar</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Tanjung Layar terkenal dengan karang sejoli berdiri kokoh, sebagai ikon utama wisata desa sawarna. Temukan villa-villa di sini menawarkan pemandangan sunset terbaik di Sawarna.
                        </p>
                      </>
                    )}
                    {location === 'pulo-manuk' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Pulo Manuk</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Pulo Manuk adalah pulau kecil yang menawarkan pantai berpasir putih dan air jernih, cocok untuk snorkeling dan diving. Villa-villa di sini memberikan pengalaman menginap yang unik dengan pemandangan laut yang memukau.
                        </p>
                      </>
                    )}
              </div>
              
                  {/* Daftar Villa */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {properties.length > 0 ? (
                      properties.map((property) => (
                        <div key={property.id} onClick={() => handleVillaClick(property.id)}>
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
                      ))
                    ) : (
                      <div className="col-span-2 text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                          Belum ada villa yang tersedia di lokasi ini.
                        </p>
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Villa Populer */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-ocean dark:text-ocean-light mb-4">
                Villa Populer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Villa-villa yang sering dipilih oleh tamu kami untuk pengalaman menginap yang tak terlupakan
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {popularVillas.map((property) => (
                <div key={property.id} onClick={() => handleVillaClick(property.id)}>
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

          {/* Villa Termurah */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-ocean dark:text-ocean-light mb-4">
                Villa Termurah
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Temukan villa dengan harga terbaik untuk liburan Anda di Sawarna
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {cheapestVillas
                .map(property => {
                  const minPrice = property.roomTypes?.length 
                    ? Math.min(...property.roomTypes.map(room => room.price))
                    : property.price;
                  return { ...property, minPrice };
                })
                .sort((a, b) => a.minPrice - b.minPrice)
                .map((property) => (
                  <div key={property.id} onClick={() => handleVillaClick(property.id)}>
                    <PropertyCard
                      id={property.id}
                      name={property.name}
                      type={property.type}
                      image={property.mainImages?.[0] || property.image}
                      price={property.minPrice}
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Villas;

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
  const [selectedLocation, setSelectedLocation] = useState("all");
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
    all: villaProperties,
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

  const metaDescription = "Temukan penginapan villa eksklusif di berbagai lokasi Sawarna. Dari Pantai Sawarna hingga Tanjung Layar, kami menyediakan villa dengan pemandangan pantai yang menakjubkan dan fasilitas lengkap untuk liburan Anda. Sewa villa murah, villa keluarga, villa pantai, dan penginapan terbaik di Sawarna. Penginapan dekat pantai, penginapan murah, penginapan keluarga, dan penginapan dengan pemandangan indah. Homestay, resort, cottage, dan berbagai pilihan akomodasi terbaik untuk liburan Anda. Cocok untuk liburan keluarga, honeymoon, gathering, atau staycation.";
  const metaTitle = "Villa di Sawarna - Sewa Villa Eksklusif dengan Pemandangan Pantai";
  
  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords="villa sawarna, sewa villa sawarna, villa pantai sawarna, villa eksklusif sawarna, villa goa langir, villa tanjung layar, villa legon pari, villa karang bokor, villa pulo manuk, penginapan sawarna, sewa penginapan sawarna, villa murah sawarna, villa keluarga sawarna, villa pantai sawarna, penginapan murah sawarna, sewa villa murah sawarna, villa dengan kolam renang sawarna, villa dengan pemandangan pantai sawarna, villa untuk keluarga besar sawarna, villa untuk rombongan sawarna, villa dengan dapur sawarna, villa dengan wifi sawarna, villa dengan ac sawarna, villa dengan parkir luas sawarna, villa dekat pantai sawarna, villa dekat goa langir sawarna, villa dekat tanjung layar sawarna, villa dekat legon pari sawarna, villa dekat karang bokor sawarna, villa dekat pulo manuk sawarna, villa dengan fasilitas lengkap sawarna, villa dengan pemandangan sunset sawarna, villa dengan pemandangan sunrise sawarna, villa dengan pemandangan sawah sawarna, villa dengan pemandangan tebing sawarna, villa dengan pemandangan laut sawarna, villa dengan pemandangan gunung sawarna, villa dengan pemandangan hutan sawarna, villa dengan pemandangan bukit sawarna, villa dengan pemandangan sungai sawarna, villa dengan pemandangan danau sawarna, villa dengan pemandangan taman sawarna, villa dengan pemandangan kolam sawarna, villa dengan pemandangan kebun sawarna, penginapan dekat pantai sawarna, penginapan dekat goa langir sawarna, penginapan dekat tanjung layar sawarna, penginapan dekat legon pari sawarna, penginapan dekat karang bokor sawarna, penginapan dekat pulo manuk sawarna, penginapan dengan kolam renang sawarna, penginapan dengan pemandangan pantai sawarna, penginapan untuk keluarga besar sawarna, penginapan untuk rombongan sawarna, penginapan dengan dapur sawarna, penginapan dengan wifi sawarna, penginapan dengan ac sawarna, penginapan dengan parkir luas sawarna, penginapan dengan fasilitas lengkap sawarna, penginapan dengan pemandangan sunset sawarna, penginapan dengan pemandangan sunrise sawarna, penginapan dengan pemandangan sawah sawarna, penginapan dengan pemandangan tebing sawarna, penginapan dengan pemandangan laut sawarna, penginapan dengan pemandangan gunung sawarna, penginapan dengan pemandangan hutan sawarna, penginapan dengan pemandangan bukit sawarna, penginapan dengan pemandangan sungai sawarna, penginapan dengan pemandangan danau sawarna, penginapan dengan pemandangan taman sawarna, penginapan dengan pemandangan kolam sawarna, penginapan dengan pemandangan kebun sawarna, penginapan keluarga sawarna, penginapan rombongan sawarna, penginapan murah sawarna, penginapan eksklusif sawarna, penginapan mewah sawarna, penginapan nyaman sawarna, penginapan bersih sawarna, penginapan aman sawarna, penginapan strategis sawarna, penginapan terbaik sawarna, penginapan favorit sawarna, penginapan populer sawarna, penginapan rekomendasi sawarna, penginapan terlaris sawarna, penginapan terbaru sawarna, penginapan promo sawarna, penginapan diskon sawarna, penginapan hemat sawarna, penginapan ekonomis sawarna, penginapan terjangkau sawarna, penginapan bintang sawarna, penginapan premium sawarna, penginapan luxury sawarna, penginapan modern sawarna, penginapan tradisional sawarna, penginapan lokal sawarna, penginapan asli sawarna, penginapan otentik sawarna, penginapan unik sawarna, penginapan khas sawarna, penginapan istimewa sawarna, penginapan spesial sawarna, penginapan terpercaya sawarna, penginapan terjamin sawarna, homestay sawarna, sewa homestay sawarna, homestay murah sawarna, homestay keluarga sawarna, homestay dekat pantai sawarna, homestay dengan pemandangan sawarna, homestay tradisional sawarna, homestay lokal sawarna, homestay otentik sawarna, resort sawarna, sewa resort sawarna, resort murah sawarna, resort keluarga sawarna, resort dekat pantai sawarna, resort dengan pemandangan sawarna, resort mewah sawarna, resort eksklusif sawarna, resort premium sawarna, cottage sawarna, sewa cottage sawarna, cottage murah sawarna, cottage keluarga sawarna, cottage dekat pantai sawarna, cottage dengan pemandangan sawarna, cottage romantis sawarna, cottage nyaman sawarna, guesthouse sawarna, sewa guesthouse sawarna, guesthouse murah sawarna, guesthouse keluarga sawarna, guesthouse dekat pantai sawarna, guesthouse dengan pemandangan sawarna, guesthouse nyaman sawarna, guesthouse bersih sawarna, bungalow sawarna, sewa bungalow sawarna, bungalow murah sawarna, bungalow keluarga sawarna, bungalow dekat pantai sawarna, bungalow dengan pemandangan sawarna, bungalow nyaman sawarna, bungalow tradisional sawarna, akomodasi sawarna, sewa akomodasi sawarna, akomodasi murah sawarna, akomodasi keluarga sawarna, akomodasi dekat pantai sawarna, akomodasi dengan pemandangan sawarna, akomodasi nyaman sawarna, akomodasi terbaik sawarna, tempat menginap sawarna, sewa tempat menginap sawarna, tempat menginap murah sawarna, tempat menginap keluarga sawarna, tempat menginap dekat pantai sawarna, tempat menginap dengan pemandangan sawarna, tempat menginap nyaman sawarna, tempat menginap terbaik sawarna, tempat istirahat sawarna, sewa tempat istirahat sawarna, tempat istirahat murah sawarna, tempat istirahat keluarga sawarna, tempat istirahat dekat pantai sawarna, tempat istirahat dengan pemandangan sawarna, tempat istirahat nyaman sawarna, tempat istirahat terbaik sawarna, liburan sawarna, wisata sawarna, staycation sawarna, honeymoon sawarna, gathering sawarna, meeting sawarna, retreat sawarna, camping sawarna, backpacker sawarna, backpacking sawarna, solo traveler sawarna, couple sawarna, keluarga sawarna, rombongan sawarna, grup sawarna, musim liburan sawarna, liburan sekolah sawarna, liburan lebaran sawarna, liburan natal sawarna, liburan tahun baru sawarna, liburan akhir pekan sawarna, liburan panjang sawarna, liburan pendek sawarna, liburan murah sawarna, liburan hemat sawarna, liburan ekonomis sawarna, liburan terjangkau sawarna, liburan mewah sawarna, liburan eksklusif sawarna, liburan premium sawarna, liburan luxury sawarna, liburan modern sawarna, liburan tradisional sawarna, liburan lokal sawarna, liburan asli sawarna, liburan otentik sawarna, liburan unik sawarna, liburan khas sawarna, liburan istimewa sawarna, liburan spesial sawarna, liburan terpercaya sawarna, liburan terjamin sawarna"
        url="https://villasawarna.com/villas"
        type="website"
      />
      
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-sand-light via-white to-ocean-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom py-8">
          {/* Header */}
          <div className="relative mb-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/90 to-white/80 dark:from-gray-800/80 dark:via-gray-800/90 dark:to-gray-800/80 rounded-2xl shadow-lg"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center p-8 md:p-12">
              <div className="inline-block mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 rounded-lg shadow-md transform -rotate-1"></div>
                  <h1 className="relative text-3xl md:text-5xl font-bold text-ocean dark:text-ocean-light px-6 py-2">
                    Villa Eksklusif di Sawarna
                  </h1>
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                  Temukan villa impian Anda di berbagai lokasi Sawarna. Setiap villa menawarkan pemandangan pantai yang menakjubkan dan fasilitas lengkap untuk liburan yang tak terlupakan.
                </p>
              </div>
            </div>
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
                        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          selectedLocation === location
                            ? 'bg-ocean text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Waves size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                        <span>
                          {location === 'all' && 'Semua Lokasi'}
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
                    {location === 'all' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">Semua Lokasi di Sawarna</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Temukan penginapan villa eksklusif di berbagai lokasi Sawarna. Dari Pantai Sawarna hingga Tanjung Layar, setiap lokasi menawarkan pengalaman unik dengan pemandangan pantai yang menakjubkan dan fasilitas lengkap untuk liburan Anda.
                        </p>
                      </>
                    )}
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

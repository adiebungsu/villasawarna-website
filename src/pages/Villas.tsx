import React from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Waves } from "lucide-react";
import { getAllProperties, getPopularVillas, getCheapestVillas, incrementPropertyVisit, extractMainLocation } from "@/data/properties";
import SEO from "@/components/SEO";
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Villas = () => {
  const { t } = useTranslation('common');
  const [selectedLocation, setSelectedLocation] = React.useState("all");
  const [popularVillas, setPopularVillas] = React.useState(getPopularVillas());
  const [cheapestVillas, setCheapestVillas] = React.useState(getCheapestVillas());
  const allProperties = getAllProperties();
  const villaProperties = allProperties.filter(property => property.type === 'villa');
  const { search } = useLocation();

  // Sync selectedLocation with URL parameter `location`
  React.useEffect(() => {
    const params = new URLSearchParams(search);
    const loc = (params.get('location') || '').toLowerCase();
    const allowed = ['all', 'sawarna', 'goa-langir', 'legon-pari', 'tanjung-layar', 'karang-bokor', 'pulo-manuk'];
    if (loc && allowed.includes(loc)) {
      setSelectedLocation(loc);
    }
  }, [search]);

  // Update popular villas setiap kali halaman dimuat
  React.useEffect(() => {
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

  const metaDescription = t('villasPage.seo.description', "Discover exclusive villas across Sawarna. From Sawarna Beach to Tanjung Layar, we provide villas with stunning beachfront views and complete facilities for your holiday. Rent affordable villas, family villas, beach villas, and the best stays in Sawarna.");
  const metaTitle = t('villasPage.seo.title', "Villas in Sawarna - Rent Exclusive Beachfront Villas");
  
  return (
    <>
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={t('villasPage.seo.keywords', 'villa sawarna, rent villa sawarna, beachfront villa sawarna, exclusive villas, goa langir, tanjung layar, legon pari, karang bokor, pulo manuk')}
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
                    {t('villasPage.header.title', 'Exclusive Villas in Sawarna')}
                  </h1>
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
                  {t('villasPage.header.subtitle', 'Find your dream villa across Sawarna. Each villa offers stunning beach views and complete facilities for an unforgettable holiday.')}
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
                          {location === 'all' && t('villasPage.tabs.all', 'All Locations')}
                          {location === 'sawarna' && t('villasPage.tabs.sawarna', 'Sawarna Beach')}
                          {location === 'goa-langir' && t('villasPage.tabs.goaLangir', 'Goa Langir')}
                          {location === 'karang-bokor' && t('villasPage.tabs.karangBokor', 'Karang Bokor')}
                          {location === 'legon-pari' && t('villasPage.tabs.legonPari', 'Legon Pari')}
                          {location === 'tanjung-layar' && t('villasPage.tabs.tanjungLayar', 'Tanjung Layar')}
                          {location === 'pulo-manuk' && t('villasPage.tabs.puloManuk', 'Pulo Manuk')}
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
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.all.title', 'All Locations in Sawarna')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.all.desc', 'Discover exclusive villas across Sawarna. From Sawarna Beach to Tanjung Layar, each location offers a unique experience with stunning beach views and complete facilities for your holiday.')}
                        </p>
                      </>
                    )}
                    {location === 'sawarna' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.sawarna.title', 'Sawarna Beach')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.sawarna.desc', 'The main beach known for its soft white sand and surf-friendly waves. This is the tourism hub with facilities and exclusive villas offering stunning views.')}
                        </p>
                      </>
                    )}
                    {location === 'goa-langir' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.goaLangir.title', 'Goa Langir')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.goaLangir.desc', 'A tranquil coastal area ideal for those seeking peace and pristine nature. Villas here provide a more private and exclusive stay.')}
                        </p>
                      </>
                    )}
                    {location === 'karang-bokor' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.karangBokor.title', 'Karang Bokor')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.karangBokor.desc', 'Famous for unique rock formations and breathtaking sunrise views from cliffs. Villas in this area offer easy access to enjoy the scenery from above.')}
                        </p>
                      </>
                    )}
                    {location === 'legon-pari' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.legonPari.title', 'Legon Pari')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.legonPari.desc', 'A calm beach with white sand and clear water, ideal for swimming and snorkeling. Villas here provide a relaxed family-friendly atmosphere.')}
                        </p>
                      </>
                    )}
                    {location === 'tanjung-layar' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.tanjungLayar.title', 'Tanjung Layar')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.tanjungLayar.desc', 'Home to the iconic twin rocks. Villas here offer the best sunset views in Sawarna.')}
                        </p>
                      </>
                    )}
                    {location === 'pulo-manuk' && (
                      <>
                        <h3 className="text-xl font-bold mb-3 text-ocean dark:text-ocean-light">{t('villasPage.location.puloManuk.title', 'Pulo Manuk')}</h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {t('villasPage.location.puloManuk.desc', 'A small island with white sandy beaches and clear waters, great for snorkeling and diving. Villas provide unique stays with ocean views.')}
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
                          {t('villasPage.noVillas', 'No villas found in this location.')}
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
                {t('villasPage.popular.title', 'Popular Villas')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('villasPage.popular.subtitle', 'Frequently chosen by our guests for unforgettable stays')}
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
                {t('villasPage.cheapest.title', 'Most Affordable Villas')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('villasPage.cheapest.subtitle', 'Find the best-priced villas for your holiday in Sawarna')}
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

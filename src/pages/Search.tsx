import { useLocation } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { getVillasData, getHomestaysData } from "@/data/properties";
import type { PropertyCardProps } from "@/components/PropertyCard";
import { articleData } from "@/data/articles";
import { destinationsData } from "@/data/destinations";
import type { Destination } from "@/data/destinations";
import SEO from '@/components/SEO';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Hotel, Home, Newspaper, Landmark } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Import FILTERS dari SearchBar
import { FILTERS } from "@/components/SearchBar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Tentukan tipe Article menggunakan typeof dari elemen array articleData
type Article = typeof articleData[number];

const Search = () => {
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const searchType = query.get('type') || 'accommodation';
  const filters = query.get('filters')?.split(',') || [];
  const accommodationType = query.get('accommodation') || 'villa';
  const checkIn = query.get('checkIn');
  const checkOut = query.get('checkOut');

  const searchLower = searchQuery.toLowerCase();

  const navigate = useNavigate();

  // Fungsi untuk menghitung skor relevansi
  const calculateScore = useCallback((item: PropertyCardProps | Article | Destination): number => {
    let score = 0;
    if (!searchLower) return 1; // Beri skor minimal jika query kosong

    // Penilaian untuk Properti (Villa/Penginapan) - menggunakan PropertyCardProps
    if ('name' in item && typeof item.name === 'string' && item.name.toLowerCase().includes(searchLower)) score += 10;
    if ('location' in item && typeof item.location === 'string' && item.location.toLowerCase().includes(searchLower)) score += 8;
    // Memeriksa tags hanya jika property tersebut ada dan array string
    if ('tags' in item && Array.isArray(item.tags) && item.tags.some((tag: string) => typeof tag === 'string' && tag.toLowerCase().includes(searchLower))) score += 5;
    if ('description' in item && typeof item.description === 'string' && item.description.toLowerCase().includes(searchLower)) score += 2;

    // Penilaian untuk Artikel - menggunakan tipe Article
    if ('title' in item && typeof item.title === 'string' && item.title.toLowerCase().includes(searchLower)) score += 10;
    if ('category' in item && typeof item.category === 'string' && item.category.toLowerCase().includes(searchLower)) score += 8;
    if ('excerpt' in item && typeof item.excerpt === 'string' && item.excerpt.toLowerCase().includes(searchLower)) score += 4;
    if ('content' in item && typeof item.content === 'string' && item.content.toLowerCase().includes(searchLower)) score += 2;

    // Penilaian untuk Destinasi - menggunakan tipe Destination
    // Name dan Description sudah dicek di bagian properti
    // Tags dicek di bagian properti (dengan pengecekan keberadaan) - Asumsi Destination punya tags

    return score;
  }, [searchLower]);

  // Fungsi untuk memeriksa apakah properti memenuhi kriteria filter
  const matchesFilters = (property: PropertyCardProps) => {
    // Filter berdasarkan tipe akomodasi
    if (accommodationType !== 'all' && property.type !== accommodationType) {
      return false;
    }

    // Filter berdasarkan kapasitas
    const capacityFilter = filters.find(f => FILTERS.kapasitas.includes(f));
    if (capacityFilter) {
      const [min, max] = capacityFilter.split('-').map(n => parseInt(n));
      if (max) {
        if (property.capacity < min || property.capacity > max) return false;
      } else {
        if (property.capacity < min) return false;
      }
    }

    // Filter berdasarkan jarak
    const distanceFilter = filters.find(f => FILTERS.jarak.includes(f));
    if (distanceFilter && property.distanceToBeach) {
      const distance = parseFloat(distanceFilter.match(/\d+/)?.[0] || '0');
      if (property.distanceToBeach > distance) return false;
    }

    // Filter berdasarkan harga
    const priceFilter = filters.find(f => FILTERS.harga.includes(f));
    if (priceFilter) {
      const price = property.price;
      if (priceFilter.includes('< 500rb') && price >= 500000) return false;
      if (priceFilter.includes('500rb - 1jt') && (price < 500000 || price > 1000000)) return false;
      if (priceFilter.includes('1jt - 2jt') && (price < 1000000 || price > 2000000)) return false;
      if (priceFilter.includes('> 2jt') && price <= 2000000) return false;
    }

    // Filter berdasarkan fasilitas
    const facilityFilters = filters.filter(f => FILTERS.fasilitas.includes(f));
    if (facilityFilters.length > 0) {
      if (!facilityFilters.every(f => property.amenities.includes(f))) {
        return false;
      }
    }

    // Filter berdasarkan lokasi
    const locationFilters = filters.filter(f => FILTERS.lokasi.includes(f));
    if (locationFilters.length > 0) {
      if (!locationFilters.some(f => property.location.includes(f))) {
        return false;
      }
    }

    // Filter berdasarkan rating
    const ratingFilter = filters.find(f => FILTERS.rating.includes(f));
    if (ratingFilter) {
      const minRating = parseInt(ratingFilter);
      if (property.rating < minRating) return false;
    }

    return true;
  };

  // Fungsi untuk memeriksa ketersediaan tanggal
  const isAvailable = (property: PropertyCardProps) => {
    if (!checkIn || !checkOut) return true;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Periksa apakah properti tersedia pada tanggal yang dipilih
    return !property.bookedDates?.some(booking => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      return (
        (checkInDate >= bookingStart && checkInDate < bookingEnd) ||
        (checkOutDate > bookingStart && checkOutDate <= bookingEnd) ||
        (checkInDate <= bookingStart && checkOutDate >= bookingEnd)
      );
    });
  };

  // Filter dan skor hasil pencarian
  const filteredResults = useMemo(() => {
    const results = [...getVillasData(), ...getHomestaysData()]
      .filter(property => matchesFilters(property) && isAvailable(property))
      .map(property => ({
        ...property,
        score: calculateScore(property)
      }))
      .sort((a, b) => b.score - a.score);

    return results;
  }, [searchQuery, searchType, filters, accommodationType, checkIn, checkOut]);

  const scoredArticles = articleData
     .map(article => ({ ...article, score: calculateScore(article) }));

  const scoredDestinations = destinationsData
    .map(destination => ({ ...destination, score: calculateScore(destination) }));

  // Gabungkan dan urutkan semua hasil dengan filter score > 0 di sini
  const allResults: ( (PropertyCardProps | Article | Destination) & { score: number } )[] = [
    ...filteredResults,
    ...scoredArticles,
    ...scoredDestinations
  ].filter(item => item.score > 0)
   .sort((a, b) => b.score - a.score);

  // Pisahkan hasil berdasarkan tipe
  const villasResults = filteredResults.filter((item): item is PropertyCardProps & { score: number } => 
    getVillasData().some(v => 'id' in item && v.id === item.id)
  ) as (PropertyCardProps & { score: number })[];

  const penginapanResults = filteredResults.filter((item): item is PropertyCardProps & { score: number } => 
    getHomestaysData().some(h => 'id' in item && h.id === item.id)
  ) as (PropertyCardProps & { score: number })[];

  const articlesAndDestinationsResults = allResults.filter(item => {
    const isVilla = getVillasData().some(v => 'id' in item && v.id === item.id);
    const isHomestay = getHomestaysData().some(h => 'id' in item && h.id === item.id);
    return !isVilla && !isHomestay; // Ambil yang BUKAN akomodasi
  });

  // Menggunakan tipe Article dari typeof dan Destination dari import type
  const articlesResults = articlesAndDestinationsResults.filter((item): item is Article & { score: number } => scoredArticles.some(a => 'id' in item && a.id === item.id)) as (Article & { score: number })[];
  const destinationsResults = articlesAndDestinationsResults.filter((item): item is Destination & { score: number } => scoredDestinations.some(d => 'id' in item && d.id === item.id)) as (Destination & { score: number })[];

  const metaDescription = `Hasil pencarian untuk "${searchQuery}" di Sawarna. Temukan villa, penginapan, destinasi wisata, dan artikel terkait.`;

  // Render section berdasarkan tipe pencarian (ini perlu disesuaikan lagi dengan scoring)
  // Kita bisa membagi allResults berdasarkan tipe untuk ditampilkan di section terpisah
  
  const renderRankedResults = () => {
    // Tentukan apakah ada hasil total sebelum render section
    // const hasResults = destinationsResults.length > 0 || villasResults.length > 0 || homestaysResults.length > 0 || articlesResults.length > 0; // Cek ini dilakukan di luar

    // Selalu tampilkan seksi Destinasi, Akomodasi, dan Artikel
    return (
      <>
        {/* Destinasi Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="h-5 w-5 text-ocean" />
            <h2 className="text-xl font-semibold">Destinasi Wisata</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {destinationsResults.length > 0 ? (
              destinationsResults.map((destination) => (
                <Card
                  key={destination.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/destinations/${destination.id}`)}
                >
                  {/* Tambahkan pengecekan yang lebih aman untuk images */}
                  {Array.isArray(destination.images) && destination.images.length > 0 ? (
                    <img
                      src={destination.images[0]}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                      <div className="w-full h-48 object-cover bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          Tidak ada gambar
                      </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{destination.name}</h3>
                    {'description' in destination && destination.description && (
                       <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {destination.description}
                        </p>
                    )}

                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400">Tidak ada hasil destinasi.</div>
            )}
          </div>
        </section>

        {/* Akomodasi Section (Villa & Penginapan) */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Hotel className="h-5 w-5 text-ocean" />
            <h2 className="text-xl font-semibold">Akomodasi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {(villasResults.length > 0 || penginapanResults.length > 0) ? (
              <>
                {villasResults.map((villa) => (
                  <PropertyCard key={villa.id} {...villa} />
                ))}
                {penginapanResults.map((penginapan) => (
                  <PropertyCard key={penginapan.id} {...penginapan} />
                ))}
              </>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">Tidak ada hasil akomodasi.</div>
            )}
          </div>
        </section>

        {/* Artikel Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="h-5 w-5 text-ocean" />
            <h2 className="text-xl font-semibold">Artikel Terkait</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {articlesResults.length > 0 ? (
              articlesResults.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    {'excerpt' in article && article.excerpt && (
                       <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {article.excerpt}
                        </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400">Tidak ada hasil artikel.</div>
            )}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`Hasil Pencarian: ${searchQuery} | Villa Sawarna`}
        description={metaDescription}
        keywords={`${searchQuery}, villa sawarna, penginapan sawarna, destinasi sawarna, artikel sawarna`}
      />
      
      <div className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Hasil Pencarian: {searchQuery}</h1>
        
        {/* Tampilkan pesan 'Tidak ada hasil' keseluruhan jika memang tidak ada hasil sama sekali */}
        {allResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Tidak ada hasil yang ditemukan untuk "{searchQuery}".
            </p>
          </div>
        ) : (
          renderRankedResults() // Tampilkan seksi-seksi jika ada hasil total
        )}
      </div>
    </div>
  );
};

export default Search; 
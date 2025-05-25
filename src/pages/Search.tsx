import { useLocation } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { getVillasData, getHomestaysData } from "@/data/properties";
import type { ExtendedPropertyCardProps } from "@/data/properties";
import { articleData } from "@/data/articles";
import { destinationsData } from "@/data/destinations";
import type { Destination } from "@/data/destinations";
import SEO from '@/components/SEO';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Hotel, Home, Newspaper, Landmark } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Tentukan tipe Article menggunakan typeof dari elemen array articleData
type Article = typeof articleData[number];

const Search = () => {
  const query = useQuery();
  const searchQuery = query.get("query") || "";
  const type = query.get("type") || "all";
  const accommodationFilter = query.get("accommodation") || "all";

  const searchLower = searchQuery.toLowerCase();

  const navigate = useNavigate();

  // Fungsi untuk menghitung skor relevansi
  const calculateScore = useCallback((item: ExtendedPropertyCardProps | Article | Destination): number => {
    let score = 0;
    if (!searchLower) return 1; // Beri skor minimal jika query kosong

    // Penilaian untuk Properti (Villa/Homestay) - menggunakan ExtendedPropertyCardProps
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

  // Filter dan beri skor data
  const scoredVillas = getVillasData()
    .map(villa => ({ ...villa, score: calculateScore(villa) }));

  const scoredHomestays = getHomestaysData()
    .map(homestay => ({ ...homestay, score: calculateScore(homestay) }));

  const scoredArticles = articleData
     .map(article => ({ ...article, score: calculateScore(article) }));

  const scoredDestinations = destinationsData
    .map(destination => ({ ...destination, score: calculateScore(destination) }));

  // Gabungkan dan urutkan semua hasil dengan filter score > 0 di sini
  const allResults: ( (ExtendedPropertyCardProps | Article | Destination) & { score: number } )[] = [
    ...scoredVillas,
    ...scoredHomestays,
    ...scoredArticles,
    ...scoredDestinations
  ].filter(item => item.score > 0);

  allResults.sort((a, b) => b.score - a.score); // Urutkan dari skor tertinggi

  // Tambahkan filter akomodasi (villa/homestay) setelah scoring jika diperlukan
  const filteredAccommodationResults = allResults.filter(item => {
    if (accommodationFilter === 'all') return true;
    
    const isVilla = scoredVillas.some(v => 'id' in item && v.id === item.id);
    const isHomestay = scoredHomestays.some(h => 'id' in item && h.id === item.id);
    
    if (accommodationFilter === 'villa' && isVilla) return true;
    if (accommodationFilter === 'homestay' && isHomestay) return true;
    
    // Item lain (artikel/destinasi) selalu ditampilkan terlepas dari filter akomodasi
    const isAccommodation = isVilla || isHomestay;
    return !isAccommodation;
  });

  // Kita pisahkan kembali hasil untuk rendering berdasarkan tipe aslinya
  const villasResults = filteredAccommodationResults.filter((item): item is ExtendedPropertyCardProps & { score: number } => scoredVillas.some(v => 'id' in item && v.id === item.id)) as (ExtendedPropertyCardProps & { score: number })[];
  const homestaysResults = filteredAccommodationResults.filter((item): item is ExtendedPropertyCardProps & { score: number } => scoredHomestays.some(h => 'id' in item && h.id === item.id)) as (ExtendedPropertyCardProps & { score: number })[];
  const articlesAndDestinationsResults = filteredAccommodationResults.filter(item => {
      const isVilla = scoredVillas.some(v => 'id' in item && v.id === item.id);
      const isHomestay = scoredHomestays.some(h => 'id' in item && h.id === item.id);
      return !isVilla && !isHomestay; // Ambil yang BUKAN akomodasi
  });

  // Menggunakan tipe Article dari typeof dan Destination dari import type
  const articlesResults = articlesAndDestinationsResults.filter((item): item is Article & { score: number } => scoredArticles.some(a => 'id' in item && a.id === item.id)) as (Article & { score: number })[];
  const destinationsResults = articlesAndDestinationsResults.filter((item): item is Destination & { score: number } => scoredDestinations.some(d => 'id' in item && d.id === item.id)) as (Destination & { score: number })[];

  const metaDescription = `Hasil pencarian untuk "${searchQuery}" di Sawarna. Temukan villa, homestay, destinasi wisata, dan artikel terkait.`;

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

        {/* Akomodasi Section (Villa & Homestay) */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Hotel className="h-5 w-5 text-ocean" />
            <h2 className="text-xl font-semibold">Akomodasi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {(villasResults.length > 0 || homestaysResults.length > 0) ? (
              <>
                {villasResults.map((villa) => (
                  <PropertyCard key={villa.id} {...villa} />
                ))}
                {homestaysResults.map((homestay) => (
                  <PropertyCard key={homestay.id} {...homestay} />
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
        keywords={`${searchQuery}, villa sawarna, homestay sawarna, destinasi sawarna, artikel sawarna`}
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
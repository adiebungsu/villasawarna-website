import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDestinations, useDestinationsByType } from '@/hooks/useDestinations';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import { Destination } from '@/data/destinations';
import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';

interface PaginatedResponse {
  items: Destination[];
  nextPage: number | null;
  total: number;
}

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const { 
    data: allDestinationsData,
    isLoading: isLoadingAll,
    fetchNextPage: fetchNextAll,
    hasNextPage: hasNextAll,
    isFetchingNextPage: isFetchingNextAll
  } = useDestinations();

  const {
    data: filteredDestinationsData,
    isLoading: isLoadingFiltered,
    fetchNextPage: fetchNextFiltered,
    hasNextPage: hasNextFiltered,
    isFetchingNextPage: isFetchingNextFiltered
  } = useDestinationsByType(selectedType || undefined);

  const destinationsData = selectedType ? filteredDestinationsData : allDestinationsData;
  const isLoading = selectedType ? isLoadingFiltered : isLoadingAll;
  const isFetchingNext = selectedType ? isFetchingNextFiltered : isFetchingNextAll;
  const hasNextPage = selectedType ? hasNextFiltered : hasNextAll;
  const fetchNextPage = selectedType ? fetchNextFiltered : fetchNextAll;

  const allDestinations = destinationsData?.pages?.flatMap((page: PaginatedResponse) => page.items) || [];
  
  const filteredResults = allDestinations.filter(destination => 
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasNextPage, fetchNextPage]);

  const renderDestinationCard = (destination: Destination) => (
    <Link 
      to={`/destination/${destination.id}`}
      key={destination.id}
      className="group h-full block"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img
            src={destination.mainImage}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm truncate">{destination.location}</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold line-clamp-1">{destination.name}</h3>
          </div>
        </div>
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-wrap gap-1">
              {destination.types.map((type) => (
                <span key={type} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {type === 'beach' && 'Pantai'}
                  {type === 'waterfall' && 'Air Terjun'}
                  {type === 'cave' && 'Gua'}
                  {type === 'rock' && 'Karang'}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white">{destination.rating}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-1">{destination.description}</p>
        </div>
      </div>
    </Link>
  );

  const renderSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <Skeleton className="h-48 w-full dark:bg-gray-700" />
      <div className="p-4">
        <Skeleton className="h-4 w-24 mb-2 dark:bg-gray-700" />
        <Skeleton className="h-6 w-full mb-2 dark:bg-gray-700" />
        <Skeleton className="h-4 w-full dark:bg-gray-700" />
      </div>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Destinasi Wisata di Sawarna | Villa Sawarna"
        description="Jelajahi destinasi wisata terbaik di Sawarna, dari pantai berpasir putih hingga air terjun tersembunyi. Temukan pengalaman liburan yang tak terlupakan."
        keywords="destinasi sawarna, wisata sawarna, pantai sawarna, air terjun sawarna, goa sawarna, tempat wisata sawarna"
        url="https://villasawarna.com/destinations"
        type="website"
      />
      
      {/* Main Content */}
      <div className="flex-grow">
        <PageTransition>
          <div className="min-h-screen flex flex-col relative bg-white dark:bg-gray-900">
            {/* Background Pattern */}
            {/* Hapus atau ganti pattern SVG jika tidak cocok dark mode */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-sand-light via-white to-ocean-light opacity-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"></div> */}
            {/* <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div> */}
            <div className="relative z-10">
              <div className="container mx-auto px-4 py-8">
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Destinasi Wisata Sawarna
                </motion.h1>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Temukan berbagai destinasi wisata menarik di Sawarna, mulai dari pantai yang indah hingga gua yang menakjubkan.
                </motion.p>
                
                {/* Search and Filter */}
                <motion.div 
                  className="max-w-4xl mx-auto flex flex-col gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Cari destinasi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full h-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-ocean dark:focus-visible:ring-ocean-light"
                    />
                  </div>
                  <div className="w-full overflow-x-auto pb-2">
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="flex w-full gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <TabsTrigger 
                          value="all"
                          onClick={() => setSelectedType(null)}
                          className="whitespace-nowrap text-sm px-4 py-2 flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-800 dark:data-[state=active]:text-white transition-colors"
                        >
                          Semua
                        </TabsTrigger>
                        <TabsTrigger 
                          value="beach"
                          onClick={() => setSelectedType('beach')}
                          className="whitespace-nowrap text-sm px-4 py-2 flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-800 dark:data-[state=active]:text-white transition-colors"
                        >
                          Pantai
                        </TabsTrigger>
                        <TabsTrigger 
                          value="waterfall"
                          onClick={() => setSelectedType('waterfall')}
                          className="whitespace-nowrap text-sm px-4 py-2 flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-800 dark:data-[state=active]:text-white transition-colors"
                        >
                          Air Terjun
                        </TabsTrigger>
                        <TabsTrigger 
                          value="cave"
                          onClick={() => setSelectedType('cave')}
                          className="whitespace-nowrap text-sm px-4 py-2 flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-800 dark:data-[state=active]:text-white transition-colors"
                        >
                          Gua
                        </TabsTrigger>
                        <TabsTrigger 
                          value="rock"
                          onClick={() => setSelectedType('rock')}
                          className="whitespace-nowrap text-sm px-4 py-2 flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-gray-800 dark:data-[state=active]:text-white transition-colors"
                        >
                          Karang
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-4 pb-12">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {Array(8).fill(0).map((_, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        {renderSkeleton()}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredResults.map((destination, index) => (
                      <motion.div
                        key={destination.id}
                        ref={index === filteredResults.length - 1 ? lastElementRef : undefined}
                        variants={itemVariants}
                      >
                        {renderDestinationCard(destination)}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {filteredResults.length === 0 && !isLoading && (
                <motion.div 
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Tidak ada destinasi ditemukan</h3>
                  <p className="text-gray-600 dark:text-gray-300">Coba ubah filter atau kata kunci pencarian Anda</p>
                </motion.div>
              )}

              {isFetchingNext && (
                <div className="flex justify-center mt-8">
                  <Loader2 className="w-6 h-6 animate-spin text-ocean-dark dark:text-ocean-light" />
                </div>
              )}
            </div>
          </div>
        </PageTransition>
      </div>
    </div>
  );
};

export default Destinations; 
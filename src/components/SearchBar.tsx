import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FilterList from './FilterList';

const LOCATIONS = [
  'Sawarna',
  'Ciantir',
  'Cikulur',
  'Cikotok',
  'Bayah',
  'Malingping',
  'Cihara',
  'Ciparay',
  'Cibareno',
  'Cikate'
];

// Tambahkan array untuk autosugesti
const SUGGESTIONS = [
  // Penginapan
  'Penginapan di Sawarna',
  'Hotel di Sawarna',
  'Homestay di Sawarna',
  'Villa di Sawarna',
  'Penginapan murah di Sawarna',
  'Penginapan dekat pantai',
  'Penginapan untuk keluarga',
  'Penginapan untuk rombongan',
  
  // Destinasi Wisata
  'Pantai Sawarna',
  'Pantai Ciantir',
  'Pantai Tanjung Layar',
  'Goa Langir',
  'Legon Pari',
  'Pulo Manuk',
  'Tempat wisata di Sawarna',
  'Spot foto di Sawarna',
  'Sunset di Sawarna',
  'Sunrise di Sawarna',
  
  // Aktivitas
  'Surfing di Sawarna',
  'Snorkeling di Sawarna',
  'Fishing di Sawarna',
  'Camping di Sawarna',
  'Hiking di Sawarna',
  'Bersepeda di Sawarna',
  
  // Fasilitas
  'Penginapan dengan kolam renang',
  'Penginapan dengan view pantai',
  'Penginapan dengan WiFi',
  'Penginapan dengan AC',
  'Penginapan dengan dapur',
  'Penginapan dengan BBQ',
  
  // Kategori Khusus
  'Penginapan untuk honeymoon',
  'Penginapan untuk staycation',
  'Penginapan untuk liburan keluarga',
  'Penginapan untuk rombongan besar',
  'Penginapan untuk backpacker',
  
  // Lokasi Spesifik
  'Penginapan di Pantai Sawarna',
  'Penginapan di Ciantir',
  'Penginapan di Tanjung Layar',
  'Penginapan di Goa Langir',
  'Penginapan di Legon Pari',
  
  // Harga
  'Penginapan murah di Sawarna',
  'Penginapan mid-range di Sawarna',
  'Penginapan mewah di Sawarna',
  
  // Musim
  'Penginapan high season',
  'Penginapan low season',
  'Penginapan weekend',
  
  // Transportasi
  'Penginapan dekat terminal',
  'Penginapan dengan shuttle',
  'Penginapan dengan parkir',
  
  // Makanan
  'Penginapan dengan sarapan',
  'Penginapan dengan restoran',
  'Penginapan dekat warung makan',
  
  // Lainnya
  'Tour guide di Sawarna',
  'Rental motor di Sawarna',
  'Rental mobil di Sawarna',
  'Paket wisata Sawarna',
  'Event di Sawarna'
];

export const FILTERS = {
  fasilitas: [
    'Area Parkir',
    'View Pantai',
    'Akses Pantai',
    'WiFi',
    'AC',
    'Kipas Angin',
    'BBQ',
    'Kamar Mandi Dalam',
    'Dapur',
    'Makan'
  ],
  lokasi: ['Pantai Sawarna', 'Goa Langir', 'Legon Pari', 'Pulo Manuk'],
  rating: ['4+ Bintang', '3+ Bintang', '2+ Bintang'],
  tipe: ['Villa', 'Homestay'],
  kapasitas: ['1-2 Orang', '3-4 Orang', '5-6 Orang', '7+ Orang'],
  jarak: ['< 1 km', '1-2 km', '2-5 km', '> 5 km'],
  harga: ['< 500rb', '500rb - 1jt', '1jt - 2jt', '> 2jt']
};

interface AccordionSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  hint?: string;
}

const AccordionSection = memo(({ 
    title, 
    isExpanded, 
    onToggle, 
    children,
    hint 
}: AccordionSectionProps) => (
    <motion.div 
      initial={false}
      className="border-b border-gray-200 dark:border-gray-700 last:border-0"
    >
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-2">
          <motion.span 
            className="text-sm font-medium text-gray-900 dark:text-white"
            animate={{ color: isExpanded ? 'var(--ocean)' : '' }}
          >
            {title}
          </motion.span>
          {hint && (
            <motion.span 
              className="text-xs text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              ({hint})
            </motion.span>
          )}
    </div>
        <motion.div
          initial={false}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-5 h-5"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="minus"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Minus className="w-5 h-5 text-ocean" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Plus className="w-5 h-5 text-gray-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.2
                },
                opacity: {
                  duration: 0.2,
                  delay: 0.1
                }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: {
                  duration: 0.2
                },
                opacity: {
                  duration: 0.1
                }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div 
              className="px-4 pb-3"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
));

AccordionSection.displayName = 'AccordionSection';

const SearchBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [tipeAkomodasi, setTipeAkomodasi] = useState<'villa' | 'homestay'>('villa');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<{
    tipe: boolean;
    fasilitas: boolean;
    lokasi: boolean;
    rating: boolean;
    kapasitas: boolean;
    jarak: boolean;
    harga: boolean;
    tanggal: boolean;
  }>({
    tipe: true,
    fasilitas: false,
    lokasi: false,
    rating: false,
    kapasitas: false,
    jarak: false,
    harga: false,
    tanggal: false
  });
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSection = useCallback((section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setLocation(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (value) {
        // Filter lokasi
        const filtered = LOCATIONS.filter(loc =>
          loc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocations(filtered);
        setShowLocations(true);

        // Filter suggestions
        const filteredSugs = SUGGESTIONS.filter(sug =>
          sug.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filteredSugs);
        setShowSuggestions(true);
      } else {
        setFilteredLocations([]);
        setFilteredSuggestions([]);
        setShowLocations(false);
        setShowSuggestions(false);
      }
    }, 300);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  }, []);

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    const lowerLocation = location.toLowerCase();
    
    // Cek apakah input mengandung kata kunci destinasi
    const isDestination = lowerLocation.includes('pantai') || 
                         lowerLocation.includes('goa') || 
                         lowerLocation.includes('legon') ||
                         lowerLocation.includes('pulo') ||
                         lowerLocation.includes('wisata') ||
                         lowerLocation.includes('spot') ||
                         lowerLocation.includes('sunset') ||
                         lowerLocation.includes('sunrise');

    // Cek apakah input mengandung kata kunci aktivitas
    const isActivity = lowerLocation.includes('surfing') || 
                      lowerLocation.includes('snorkeling') || 
                      lowerLocation.includes('fishing') ||
                      lowerLocation.includes('camping') ||
                      lowerLocation.includes('hiking') ||
                      lowerLocation.includes('bersepeda');

    // Cek apakah input mengandung kata kunci fasilitas
    const isFacility = lowerLocation.includes('kolam') || 
                      lowerLocation.includes('wifi') || 
                      lowerLocation.includes('ac') ||
                      lowerLocation.includes('dapur') ||
                      lowerLocation.includes('bbq');

    // Tentukan tipe pencarian
    let searchType = 'accommodation'; // default
    if (isDestination) searchType = 'destination';
    else if (isActivity) searchType = 'activity';
    else if (isFacility) searchType = 'facility';

    // Tambahkan parameter pencarian
    params.append('type', searchType);
    params.append('query', location);
    if (activeFilters.length) params.append('filters', activeFilters.join(','));
    params.append('accommodation', tipeAkomodasi);
    
    // Tambahkan parameter tanggal jika ada
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);

    // Navigasi ke halaman search
    navigate(`/search?${params.toString()}`);
  }, [location, activeFilters, tipeAkomodasi, checkIn, checkOut, navigate]);

  // Tambahkan useEffect untuk menangani klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSuggestions(false);
        setShowLocations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`w-full max-w-3xl mx-auto px-2 sm:px-4 ${className || ''}`} role="search">
      {/* SearchBar */}
      <div className="relative bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden search-container">
        <div className="flex items-center">
          {/* Input Lokasi */}
          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="Cari villa atau homestay di Sawarna..."
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
              onFocus={() => {
                if (location) {
                  setShowLocations(true);
                  setShowSuggestions(true);
                }
              }}
              className="w-full h-9 sm:h-10 px-4 pl-10 bg-transparent border-none focus:ring-0 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 appearance-none"
              style={{ WebkitAppearance: 'none' }}
              aria-label="Cari lokasi"
              aria-autocomplete="list"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>

          {/* Tombol Filter */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            title="Filter pencarian"
            className={`h-9 sm:h-10 px-3 border-l border-gray-200 dark:border-gray-700 flex items-center justify-center ${
              activeFilters.length > 0 || tipeAkomodasi !== 'villa' ? 'text-ocean' : 'text-gray-400'
            } hover:text-ocean transition-colors`}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Filter pencarian</span>
          </button>

          {/* Tombol Cari */}
          <button
            onClick={handleSearch}
            className="h-9 sm:h-10 px-4 sm:px-6 bg-ocean hover:bg-ocean-dark text-white text-sm font-medium transition-colors flex items-center justify-center"
            aria-label="Cari akomodasi"
          >
            <span className="hidden sm:inline">Cari</span>
            <Search className="sm:hidden h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Dropdown Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div 
            className="fixed z-50 w-[calc(100%-2rem)] max-w-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-auto"
            style={{
              top: inputRef.current ? inputRef.current.getBoundingClientRect().bottom + 5 : 'auto',
              left: inputRef.current ? inputRef.current.getBoundingClientRect().left : 'auto'
            }}
          >
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Saran Pencarian</span>
            </div>
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 flex items-center gap-2"
              >
                <Search className="h-4 w-4 text-gray-400" />
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Dropdown Lokasi */}
        {showLocations && filteredLocations.length > 0 && (
          <div 
            className="fixed z-40 w-[calc(100%-2rem)] max-w-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-auto"
            style={{
              top: inputRef.current ? inputRef.current.getBoundingClientRect().bottom + 5 : 'auto',
              left: inputRef.current ? inputRef.current.getBoundingClientRect().left : 'auto'
            }}
          >
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Lokasi</span>
            </div>
            <FilterList
              items={filteredLocations}
              selectedItems={[location]}
              onToggle={(loc) => {
                setLocation(loc);
                setShowLocations(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div 
          id="filter-panel"
          role="dialog"
          aria-label="Panel filter"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          {/* Filter Aktif */}
          <AnimatePresence>
            {(activeFilters.length > 0 || tipeAkomodasi !== 'villa') && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Filter Aktif
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveFilters([]);
                        setTipeAkomodasi('villa');
                      }}
                      className="text-xs text-gray-500 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean transition-colors"
                    >
                      Hapus Semua
                    </motion.button>
                  </div>
                  <motion.div 
                    layout
                    className="flex flex-wrap gap-2"
                  >
                    {tipeAkomodasi !== 'villa' && (
                      <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setTipeAkomodasi('villa')}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-ocean/10 text-ocean hover:bg-ocean/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tipeAkomodasi === 'homestay' ? 'Homestay' : 'Villa'}
                        <X className="ml-1.5 h-3 w-3" />
                      </motion.button>
                    )}
                    {activeFilters.map(filter => (
                      <motion.button
                        key={filter}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => toggleFilter(filter)}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-ocean/10 text-ocean hover:bg-ocean/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {filter}
                        <X className="ml-1.5 h-3 w-3" />
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Accordion Filter Options */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <AccordionSection
              title="Tipe Akomodasi"
              isExpanded={expandedSections.tipe}
              onToggle={() => toggleSection('tipe')}
              hint="Pilih satu"
            >
              <div className="flex flex-wrap gap-2">
                {FILTERS.tipe.map(tipe => (
                  <button
                    key={tipe}
                    onClick={() => setTipeAkomodasi(tipe.toLowerCase() as 'villa' | 'homestay')}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      tipeAkomodasi === tipe.toLowerCase()
                        ? 'bg-ocean text-white border-ocean'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-ocean'
                    }`}
                  >
                    {tipe}
                  </button>
                ))}
              </div>
            </AccordionSection>

            <AccordionSection
              title="Fasilitas"
              isExpanded={expandedSections.fasilitas}
              onToggle={() => toggleSection('fasilitas')}
              hint="Pilih beberapa"
            >
              <FilterList
                items={FILTERS.fasilitas}
                selectedItems={activeFilters}
                onToggle={toggleFilter}
              />
            </AccordionSection>

            <AccordionSection
              title="Lokasi"
              isExpanded={expandedSections.lokasi}
              onToggle={() => toggleSection('lokasi')}
              hint="Pilih beberapa"
            >
              <FilterList
                items={FILTERS.lokasi}
                selectedItems={activeFilters}
                onToggle={toggleFilter}
              />
            </AccordionSection>

            <AccordionSection
              title="Rating"
              isExpanded={expandedSections.rating}
              onToggle={() => toggleSection('rating')}
              hint="Pilih satu"
            >
              <FilterList
                items={FILTERS.rating}
                selectedItems={activeFilters}
                onToggle={toggleFilter}
              />
            </AccordionSection>

            <AccordionSection
              title="Kapasitas"
              isExpanded={expandedSections.kapasitas}
              onToggle={() => toggleSection('kapasitas')}
              hint="Pilih satu"
            >
              <FilterList
                items={FILTERS.kapasitas}
                selectedItems={activeFilters}
                onToggle={toggleFilter}
              />
            </AccordionSection>

            <AccordionSection
              title="Jarak ke Destinasi"
              isExpanded={expandedSections.jarak}
              onToggle={() => toggleSection('jarak')}
              hint="Pilih satu"
            >
              <FilterList
                items={FILTERS.jarak}
                selectedItems={activeFilters}
                onToggle={toggleFilter}
              />
            </AccordionSection>

            <AccordionSection
              title="Rentang Harga"
              isExpanded={expandedSections.harga}
              onToggle={() => toggleSection('harga')}
              hint="Pilih satu"
            >
              <FilterList
                items={FILTERS.harga}
                selectedItems={activeFilters}
                onToggle={toggleFilter}
              />
            </AccordionSection>

            <AccordionSection
              title="Tanggal Check-in/Check-out"
              isExpanded={expandedSections.tanggal}
              onToggle={() => toggleSection('tanggal')}
              hint="Pilih tanggal"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
                    min={new Date().toISOString().split('T')[0]}
                    title="Tanggal Check-in"
                    placeholder="Pilih tanggal check-in"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    title="Tanggal Check-out"
                    placeholder="Pilih tanggal check-out"
                  />
                </div>
              </div>
            </AccordionSection>
          </div>
        </motion.div>
        )}
    </div>
  );
}

class SearchBarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Terjadi kesalahan
            </h3>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">
              Maaf, terjadi kesalahan saat memuat komponen pencarian. Silakan refresh halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-800/50 hover:bg-red-200 dark:hover:bg-red-800/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Refresh Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const SearchBarWithErrorBoundary = () => (
  <SearchBarErrorBoundary>
    <SearchBar />
  </SearchBarErrorBoundary>
);

export default SearchBarWithErrorBoundary;

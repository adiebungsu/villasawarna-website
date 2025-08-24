import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  Star, 
  Heart,
  Clock,
  X,
  Save,
  History,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/use-auth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyType: string[];
  priceRange: [number, number];
  amenities: string[];
  rating: number;
  instantBook: boolean;
  freeCancellation: boolean;
}

interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  createdAt: string;
  lastUsed: string;
}

interface SearchHistory {
  id: string;
  query: string;
  filters: Partial<SearchFilters>;
  timestamp: string;
}

interface EnhancedSearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
  showAdvancedFilters?: boolean;
  className?: string;
}

const propertyTypes = [
  { id: 'villa', label: 'Villa', icon: Building2 },
  { id: 'homestay', label: 'Homestay', icon: Users },
  { id: 'hotel', label: 'Hotel', icon: Building2 },
  { id: 'guesthouse', label: 'Guesthouse', icon: Building2 }
];

const amenities = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'pool', label: 'Kolam Renang' },
  { id: 'parking', label: 'Parkir Gratis' },
  { id: 'ac', label: 'AC' },
  { id: 'kitchen', label: 'Dapur' },
  { id: 'bbq', label: 'Area BBQ' },
  { id: 'garden', label: 'Taman' },
  { id: 'beach-view', label: 'View Pantai' },
  { id: 'mountain-view', label: 'View Gunung' },
  { id: 'river-view', label: 'View Sungai' }
];

const popularLocations = [
  'Pantai Sawarna',
  'Goa Langir',
  'Legon Pari',
  'Muara Legon',
  'Cibareno',
  'Bayah'
];

const EnhancedSearchFilter: React.FC<EnhancedSearchFilterProps> = ({
  onSearch,
  onFiltersChange,
  initialFilters,
  showAdvancedFilters = false,
  className
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    propertyType: [],
    priceRange: [0, 5000000],
    amenities: [],
    rating: 0,
    instantBook: false,
    freeCancellation: false,
    ...initialFilters
  });

  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    {
      id: '1',
      name: 'Liburan Keluarga',
      filters: {
        location: 'Pantai Sawarna',
        checkIn: '',
        checkOut: '',
        guests: 6,
        propertyType: ['villa'],
        priceRange: [1000000, 3000000],
        amenities: ['pool', 'wifi', 'parking'],
        rating: 4,
        instantBook: true,
        freeCancellation: true
      },
      createdAt: '2024-01-01',
      lastUsed: '2024-03-10'
    }
  ]);

  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(showAdvancedFilters);
  const [isSavedSearchesOpen, setIsSavedSearchesOpen] = useState(false);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
  const [isSaveSearchOpen, setIsSaveSearchOpen] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    if (!filters.location.trim()) {
      toast({
        title: "Lokasi Diperlukan",
        description: "Silakan pilih lokasi destinasi.",
        variant: "destructive",
      });
      return;
    }

    // Add to search history
    const historyItem: SearchHistory = {
      id: Date.now().toString(),
      query: filters.location,
      filters: { ...filters },
      timestamp: new Date().toISOString()
    };
    setSearchHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10

    onSearch(filters);
    
    toast({
      title: "Pencarian Dimulai",
      description: `Mencari properti di ${filters.location}`,
    });
  };

  const handleSaveSearch = () => {
    if (!newSearchName.trim()) {
      toast({
        title: "Nama Pencarian Diperlukan",
        description: "Silakan berikan nama untuk pencarian ini.",
        variant: "destructive",
      });
      return;
    }

    const savedSearch: SavedSearch = {
      id: Date.now().toString(),
      name: newSearchName.trim(),
      filters: { ...filters },
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };

    setSavedSearches(prev => [savedSearch, ...prev]);
    setNewSearchName('');
    setIsSaveSearchOpen(false);

    toast({
      title: "Pencarian Disimpan",
      description: `"${savedSearch.name}" telah disimpan ke daftar pencarian Anda.`,
    });
  };

  const handleLoadSavedSearch = (savedSearch: SavedSearch) => {
    setFilters(savedSearch.filters);
    
    // Update last used
    setSavedSearches(prev => 
      prev.map(s => 
        s.id === savedSearch.id 
          ? { ...s, lastUsed: new Date().toISOString() }
          : s
      )
    );

    setIsSavedSearchesOpen(false);
    
    toast({
      title: "Pencarian Dimuat",
      description: `Pencarian "${savedSearch.name}" telah dimuat.`,
    });
  };

  const handleLoadSearchHistory = (historyItem: SearchHistory) => {
    setFilters(prev => ({ ...prev, ...historyItem.filters }));
    setIsSearchHistoryOpen(false);
    
    toast({
      title: "Riwayat Dimuat",
      description: "Filter pencarian telah dimuat dari riwayat.",
    });
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      propertyType: [],
      priceRange: [0, 5000000],
      amenities: [],
      rating: 0,
      instantBook: false,
      freeCancellation: false
    });
    
    toast({
      title: "Filter Dihapus",
      description: "Semua filter telah dihapus.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.propertyType.length > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.instantBook) count++;
    if (filters.freeCancellation) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000) count++;
    return count;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Search Bar */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location */}
            <div className="relative">
              <Label htmlFor="location" className="text-sm font-medium mb-2 block">
                Lokasi
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  id="location"
                  placeholder="Mau kemana?"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
              {/* Popular locations suggestions */}
              {filters.location && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg">
                  {popularLocations
                    .filter(loc => loc.toLowerCase().includes(filters.location.toLowerCase()))
                    .map((location) => (
                      <button
                        key={location}
                        onClick={() => handleFilterChange('location', location)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        {location}
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Check-in */}
            <div>
              <Label htmlFor="checkin" className="text-sm font-medium mb-2 block">
                Check-in
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="checkin"
                  type="date"
                  value={filters.checkIn}
                  onChange={(e) => handleFilterChange('checkIn', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <Label htmlFor="checkout" className="text-sm font-medium mb-2 block">
                Check-out
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="checkout"
                  type="date"
                  value={filters.checkOut}
                  onChange={(e) => handleFilterChange('checkOut', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <Label htmlFor="guests" className="text-sm font-medium mb-2 block">
                Tamu
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="20"
                  value={filters.guests}
                  onChange={(e) => handleFilterChange('guests', parseInt(e.target.value))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Search Button and Advanced Filters Toggle */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <Button onClick={handleSearch} size="lg" className="px-8">
                <Search className="w-4 h-4 mr-2" />
                Cari Properti
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter Lanjutan
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
                {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {user && (
                <>
                  <Dialog open={isSavedSearchesOpen} onOpenChange={setIsSavedSearchesOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        Pencarian Tersimpan
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Pencarian Tersimpan</DialogTitle>
                        <DialogDescription>
                          Pilih pencarian yang telah Anda simpan sebelumnya
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-3">
                        {savedSearches.length === 0 ? (
                          <p className="text-center text-gray-500 py-4">
                            Belum ada pencarian tersimpan
                          </p>
                        ) : (
                          savedSearches.map((savedSearch) => (
                            <div key={savedSearch.id} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{savedSearch.name}</h4>
                                <span className="text-xs text-gray-500">
                                  {formatDate(savedSearch.lastUsed)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {savedSearch.filters.location} • {savedSearch.filters.guests} tamu
                              </p>
                              <Button
                                size="sm"
                                onClick={() => handleLoadSavedSearch(savedSearch)}
                                className="w-full"
                              >
                                Muat Pencarian
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isSearchHistoryOpen} onOpenChange={setIsSearchHistoryOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <History className="w-4 h-4 mr-1" />
                        Riwayat
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Riwayat Pencarian</DialogTitle>
                        <DialogDescription>
                          Pencarian terbaru Anda
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-3">
                        {searchHistory.length === 0 ? (
                          <p className="text-center text-gray-500 py-4">
                            Belum ada riwayat pencarian
                          </p>
                        ) : (
                          searchHistory.map((historyItem) => (
                            <div key={historyItem.id} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{historyItem.query}</h4>
                                <span className="text-xs text-gray-500">
                                  {formatDate(historyItem.timestamp)}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleLoadSearchHistory(historyItem)}
                                className="w-full"
                              >
                                Gunakan Pencarian Ini
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              {getActiveFiltersCount() > 0 && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Hapus Filter
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Filter Lanjutan</CardTitle>
                <CardDescription>
                  Sesuaikan pencarian dengan preferensi Anda
                </CardDescription>
              </div>
              
              {user && (
                <Dialog open={isSaveSearchOpen} onOpenChange={setIsSaveSearchOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Pencarian
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Simpan Pencarian</DialogTitle>
                      <DialogDescription>
                        Simpan filter pencarian ini untuk digunakan nanti
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="search-name">Nama Pencarian</Label>
                        <Input
                          id="search-name"
                          placeholder="Contoh: Liburan Keluarga"
                          value={newSearchName}
                          onChange={(e) => setNewSearchName(e.target.value)}
                        />
                      </div>
                      
                      <Button onClick={handleSaveSearch} className="w-full">
                        Simpan
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Types */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Jenis Properti</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {propertyTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={filters.propertyType.includes(type.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleFilterChange('propertyType', [...filters.propertyType, type.id]);
                        } else {
                          handleFilterChange('propertyType', filters.propertyType.filter(t => t !== type.id));
                        }
                      }}
                      aria-label={`Pilih ${type.label}`}
                    />
                    <Label htmlFor={type.id} className="text-sm flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Rentang Harga: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
                max={5000000}
                min={0}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Rp 0</span>
                <span>Rp 5.000.000</span>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Fasilitas</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity.id}
                      checked={filters.amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleFilterChange('amenities', [...filters.amenities, amenity.id]);
                        } else {
                          handleFilterChange('amenities', filters.amenities.filter(a => a !== amenity.id));
                        }
                      }}
                      aria-label={`Pilih fasilitas ${amenity.label}`}
                    />
                    <Label htmlFor={amenity.id} className="text-sm">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Rating */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Rating Minimum: {filters.rating > 0 ? `${filters.rating}+` : 'Semua'}
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', filters.rating === rating ? 0 : rating)}
                    className={cn(
                      "p-2 rounded-lg border transition-colors",
                      filters.rating >= rating
                        ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                        : "bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100"
                    )}
                  >
                    {rating}+
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="instant-book"
                  checked={filters.instantBook}
                  onCheckedChange={(checked) => handleFilterChange('instantBook', checked)}
                  aria-label="Hanya properti yang bisa booking instan"
                />
                <Label htmlFor="instant-book" className="text-sm">
                  Hanya properti yang bisa booking instan
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="free-cancellation"
                  checked={filters.freeCancellation}
                  onCheckedChange={(checked) => handleFilterChange('freeCancellation', checked)}
                  aria-label="Hanya properti dengan pembatalan gratis"
                />
                <Label htmlFor="free-cancellation" className="text-sm">
                  Hanya properti dengan pembatalan gratis
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSearchFilter;

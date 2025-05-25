import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getVillasData } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import { cn } from '@/lib/utils';
import SEO from '@/components/SEO';

const Properties = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const villasData = getVillasData();

  // Handle resize untuk mendeteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll untuk search bar
  useEffect(() => {
    const handleScroll = () => {
      const searchBarElement = document.querySelector('.search-bar-container');
      if (searchBarElement) {
        const searchBarPosition = searchBarElement.getBoundingClientRect().top;
        setIsSearchVisible(searchBarPosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter properti berdasarkan pencarian dan kategori
  const filteredProperties = villasData.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="Properti"
        description="Temukan villa, hotel, dan homestay terbaik di Sawarna dengan harga terjangkau. Pilihan akomodasi nyaman untuk liburan pantai Anda."
        keywords="villa sawarna, hotel sawarna, homestay sawarna, penginapan sawarna, akomodasi sawarna"
      />
      
      {/* SearchBar Container - untuk menentukan posisi awal */}
      <div className="search-bar-container">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SearchBar className="shadow-xl border border-gray-200/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl" />
          </div>
        </div>
      </div>

      {/* Floating SearchBar */}
      <div
        className={cn(
          "fixed z-40 px-4 transition-all duration-300",
          isMobile ? "top-4" : "top-20",
          "left-0 right-0",
          isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              className={cn(
                "shadow-xl border border-gray-200/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl",
                "transition-all duration-300 transform",
                isSearchVisible ? "scale-100" : "scale-95"
              )} 
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Properti di Sawarna</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Temukan villa, hotel, dan homestay terbaik untuk liburan Anda di Sawarna
          </p>
          
          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            className="mb-6"
          />
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Tidak ada properti yang ditemukan untuk kriteria pencarian ini.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Properties; 
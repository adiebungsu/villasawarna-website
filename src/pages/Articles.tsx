import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articleData } from '@/data/articles';
import ArticleSidebar from '@/components/ArticleSidebar';
import SEO from '@/components/SEO';
import { 
  Pagination, 
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext
} from '@/components/ui/pagination';
import Breadcrumbs from '@/components/Breadcrumbs';
import OptimizedImage from '@/components/OptimizedImage';

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [visibleArticles, setVisibleArticles] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category');
  
  // Force scroll to top on first mount and on pathname change
  useEffect(() => {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch {}
    // Scroll immediately and also after paint to prevent preserved scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const raf = requestAnimationFrame(() => window.scrollTo(0, 0));
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [location.pathname]);

  // Set category from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setIsLoading(true);
      setSelectedCategory(categoryParam);
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      };

      // Scroll segera
      scrollToTop();

      // Scroll lagi setelah state berubah
      const timeoutId = setTimeout(() => {
        scrollToTop();
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [categoryParam]);

  // Reset visible articles when filters change
  useEffect(() => {
    setVisibleArticles(10);
  }, [selectedCategory, searchTerm]);
  
  const metaDescription = `Artikel dan informasi terbaru tentang Villa Sawarna, wisata Pantai Sawarna, dan tips liburan di Banten. Temukan panduan lengkap untuk liburan Anda di Sawarna.`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Villa Sawarna",
    "description": metaDescription,
    "url": "https://villasawarna.com/articles",
    "publisher": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "url": "https://villasawarna.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://villasawarna.com/logo.png"
      }
    },
    "blogPost": articleData.slice(0, 10).map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "image": article.image,
      "datePublished": article.date,
      "dateModified": article.date,
      "author": {
        "@type": "Organization",
        "name": "Villa Sawarna"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Villa Sawarna",
        "logo": {
          "@type": "ImageObject",
          "url": "https://villasawarna.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://villasawarna.com/articles/${article.slug}`
      }
    }))
  };

  const filteredArticles = articleData.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === undefined || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort articles: pinned articles first, then by date
  const sortedArticles = filteredArticles.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleLoadMore = () => {
    setVisibleArticles(prev => Math.min(prev + 10, sortedArticles.length));
  };

  const displayedArticles = sortedArticles.slice(0, visibleArticles);
  const hasMoreArticles = visibleArticles < sortedArticles.length;

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Artikel & Informasi Wisata Sawarna | Villa Sawarna"
        description={metaDescription}
        keywords="artikel sawarna, wisata sawarna, pantai sawarna, tips liburan sawarna, informasi villa sawarna, blog sawarna, panduan wisata sawarna"
        url="https://villasawarna.com/articles"
        type="website"
        structuredData={structuredData}
        openGraph={{
          type: 'website',
          article: {
            section: 'blog',
            tags: ['artikel', 'wisata', 'sawarna', 'tips']
          }
        }}
      />
      <div className="flex-grow">
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: "Artikel", href: "/articles" }
            ]} 
          />
          <h1 className="text-3xl md:text-4xl font-bold text-ocean dark:text-ocean-light mb-2">Artikel & Informasi</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Temukan informasi terbaru seputar Pantai Sawarna dan tips liburan</p>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Articles List */}
            <div className="w-full md:w-2/3">
              {/* Filter info */}
              {(searchTerm || selectedCategory) && (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      {searchTerm && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Menampilkan hasil pencarian untuk: <span className="font-semibold text-gray-800 dark:text-white">"{searchTerm}"</span>
                        </span>
                      )}
                      {selectedCategory && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {searchTerm ? ' dalam ' : 'Menampilkan artikel kategori: '}
                          <span className="font-semibold text-gray-800 dark:text-white">{selectedCategory}</span>
                        </span>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        setSelectedCategory(undefined);
                        window.history.replaceState({}, '', '/articles');
                      }}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    >
                      Hapus Filter
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  <div className="text-center py-10 col-span-1 md:col-span-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral dark:border-coral-light mx-auto"></div>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Memuat artikel...</p>
                  </div>
                ) : displayedArticles.length > 0 ? (
                  displayedArticles.map((article) => (
                    <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                      {/* Article Image */}
                      <Link to={`/article/${article.slug}`} className="block flex-shrink-0">
                        <OptimizedImage
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 md:h-56 object-cover hover:opacity-90 transition-opacity"
                          quality={85}
                        />
                      </Link>
                      
                      {/* Article Content */}
                      <div className="p-4 md:p-5 flex-grow flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <Calendar size={14} className="mr-1" />
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span className="text-ocean dark:text-ocean-light">{article.category}</span>
                        </div>
                        <Link to={`/article/${article.slug}`} className="block group">
                          <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-coral dark:group-hover:text-coral-light transition-colors line-clamp-2">{article.title}</h3>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>
                        <Link to={`/article/${article.slug}`} className="text-coral dark:text-coral-light font-medium hover:text-coral-dark dark:hover:text-coral flex items-center mt-auto">
                          Baca Selengkapnya
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 col-span-1 md:col-span-2">
                    <p className="text-gray-500 dark:text-gray-400">Tidak ada artikel yang ditemukan.</p>
                  </div>
                )}
                
                {/* Load More Button */}
                {hasMoreArticles && !isLoading && (
                  <div className="flex justify-center pt-6 col-span-1 md:col-span-2">
                    <Button 
                      onClick={handleLoadMore} 
                      variant="outline"
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                    >
                      Lihat Artikel Lainnya
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <ArticleSidebar 
                selectedCategory={selectedCategory}
                onCategorySelect={(category) => setSelectedCategory(category)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;

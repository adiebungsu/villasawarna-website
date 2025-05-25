import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';
import { articleData } from '@/data/articles';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface ArticleSidebarProps {
  currentArticleId?: string;
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

const ArticleSidebar = ({ currentArticleId, onCategorySelect, selectedCategory }: ArticleSidebarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);
  const [lastClickedCategory, setLastClickedCategory] = useState<string | null>(null);
  
  // Effect untuk menangani scroll setelah navigasi
  useEffect(() => {
    if (lastClickedCategory) {
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      };

      // Scroll segera
      scrollToTop();

      // Scroll lagi setelah navigasi selesai
      const timeoutId = setTimeout(scrollToTop, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [lastClickedCategory]);

  // Filter out the current article from popular articles list
  const popularArticles = currentArticleId 
    ? articleData.filter(article => article.id !== currentArticleId).slice(0, 5) 
    : articleData.slice(0, 5);

  // Extract unique categories from articles
  const categories = Array.from(new Set(articleData.map(article => article.category)));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/articles?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    setLastClickedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      navigate(`/articles?category=${encodeURIComponent(category)}`);
    }
  };

  // Format tanggal ke format Indonesia
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <>
      <div ref={topRef} />
      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Pencarian</h3>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          <Input
            type="text"
            placeholder="Cari artikel..."
            className="pl-10 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
      
      {/* Popular Articles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">Artikel Populer</h3>
        <div className="space-y-4">
          {popularArticles.map((article) => (
            <Link to={`/article/${article.slug}`} key={article.id} className="block group">
              <div className="flex items-start gap-3">
                <div className="relative w-24 h-24 overflow-hidden rounded-lg flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    quality={70}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-coral dark:group-hover:text-coral-light transition-colors line-clamp-2 text-sm">
                    {article.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar size={12} className="mr-1" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6">
        <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">Kategori</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"} 
              className={`w-full justify-start ${selectedCategory === category ? "dark:bg-coral-dark dark:text-white dark:hover:bg-coral" : "dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Subscription */}
      <div className="bg-ocean dark:bg-ocean-dark text-white rounded-lg shadow-sm p-5 mb-6">
        <h3 className="text-lg font-bold mb-2">Berlangganan Update</h3>
        <p className="text-white/90 mb-4 text-sm">
          Dapatkan artikel dan penawaran terbaru langsung ke email Anda.
        </p>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email Anda"
            className="bg-white dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <Button variant="secondary" className="w-full bg-coral hover:bg-coral-dark dark:bg-coral-light dark:hover:bg-coral">
            Berlangganan
          </Button>
        </div>
      </div>
    </>
  );
};

export default ArticleSidebar;

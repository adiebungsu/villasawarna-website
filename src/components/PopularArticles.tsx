import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { articleData } from '../data/articles';
import { OptimizedImage } from '@/components/ui/optimized-image';

const PopularArticles = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Artikel Populer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan tips dan informasi menarik seputar liburan di Sawarna
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articleData.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/9]">
                <Link to={`/article/${article.slug}`}>
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    quality={85}
                    priority={false}
                  />
                </Link>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                </div>
                <Link to={`/article/${article.slug}`}>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-coral dark:hover:text-coral-light transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link to={`/article/${article.slug}`}>
                  <Button variant="link" className="text-coral p-0">
                    Baca selengkapnya
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/articles">
            <Button variant="outline" size="lg">
              Lihat Semua Artikel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularArticles; 
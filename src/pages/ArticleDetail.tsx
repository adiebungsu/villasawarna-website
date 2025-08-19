import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, Tag, ChevronLeft, Share2, Facebook, Twitter, MessageCircle, ArrowUp } from 'lucide-react';
import { articleData } from '@/data/articles';
import ArticleSidebar from '@/components/ArticleSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the article based on its slug (id from URL params)
  const article = articleData.find(article => article.slug === id);
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Find related articles (same category) - will work once category is in data
  const relatedArticles = article && article.category
    ? articleData
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3) 
    : [];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/articles?category=${encodeURIComponent(category)}`);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const metaDescription = article ? 
    `${article.excerpt} Baca artikel lengkap tentang ${article.title} di Villa Sawarna.` :
    'Artikel tidak ditemukan';

  const structuredData = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "url": "https://villasawarna.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "url": "https://villasawarna.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://villasawarna.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://villasawarna.com/articles/${article.slug}`
    },
    "keywords": article.category,
    "articleSection": article.category || 'Blog',
    "inLanguage": "id-ID"
  } : null;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title="Artikel Tidak Ditemukan | Villa Sawarna"
          description="Artikel yang Anda cari tidak ditemukan. Silakan kunjungi halaman artikel kami untuk informasi terbaru tentang Villa Sawarna."
          keywords="artikel sawarna, wisata sawarna, pantai sawarna, blog sawarna"
          url="https://villasawarna.com/articles/not-found"
          type="website"
        />
        <div className="container-custom py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
          <p className="mb-4">Artikel yang Anda cari tidak ditemukan.</p>
          <Link to="/articles" className="text-primary hover:underline">
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  // Ensure article has content and category fields before rendering
  if (!article.content || !article.category) {
     console.error('Article data missing content or category:', article);
     return (
       <>
         <SEO 
           title="Data Artikel Tidak Lengkap"
           description="Data untuk artikel ini tidak lengkap."
           noindex={true}
         />
         <div className="container-custom py-16">
           <div className="text-center">
             <h2 className="text-2xl font-bold mb-4">Data Artikel Tidak Lengkap</h2>
             <p className="mb-6">Maaf, data untuk artikel ini tidak lengkap.</p>
             <Link 
               to="/articles"
               className="inline-flex items-center text-ocean hover:underline"
             >
               <ChevronLeft className="mr-1" size={16} />
               Kembali ke daftar artikel
             </Link>
           </div>
         </div>
       </>
     );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${article.title} | Villa Sawarna`}
        description={metaDescription}
        keywords={`${article.category}, artikel sawarna, wisata sawarna, pantai sawarna, ${article.title.toLowerCase()}`}
        url={`https://villasawarna.com/articles/${article.slug}`}
        image={article.image}
        type="article"
        structuredData={structuredData}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: article.date,
            modifiedTime: article.date,
            section: article.category || 'Blog',
            tags: [article.category]
          }
        }}
      />
      
      <div className="min-h-screen bg-sky-50 dark:bg-gray-900 flex flex-col">
        <div className="container-custom py-12 flex-grow">
          <Breadcrumbs 
            items={[
              { label: "Artikel", href: "/articles" },
              { label: article.category, href: `/articles?category=${encodeURIComponent(article.category)}` },
              { label: article.title }
            ]} 
          />
          {/* Back to articles link */}
          <Link to="/articles" className="inline-flex items-center text-ocean dark:text-ocean-light hover:underline mb-6">
            <ChevronLeft size={16} className="mr-1" />
            Kembali ke daftar artikel
          </Link>

          {/* Optional Hero for guide-style article */}
          {article.slug === 'panduan-legon-pari-karang-taraje' && (
            <section className="mb-8 rounded-2xl p-6 md:p-8" style={{background: 'linear-gradient(180deg, #e0f2fe, #ffffff)'}}>
              <div className="grid gap-6 md:grid-cols-[1.3fr,1fr] items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900">
                    {article.title}
                  </h1>
                  <p className="text-slate-600 mb-4 max-w-2xl">{article.excerpt}</p>
                  <Link to="/kontak" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-4 rounded-xl">Cek Ketersediaan Villa</Link>
                </div>
                <figure className="bg-white border border-slate-200 rounded-2xl p-3">
                  <OptimizedImage 
                    src={article.image || '/images/hero-sawarna.jpg'} 
                    alt={article.title} 
                    className="w-full h-auto rounded-xl"
                    width={1200}
                    height={800}
                    quality={85}
                  />
                  <figcaption className="text-sm text-slate-500 mt-2">Sunrise Legon Pari & ombak Karang Taraje – dua rasa dalam satu perjalanan.</figcaption>
                </figure>
              </div>
            </section>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                {/* Featured image */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl mb-8">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                    width={1200}
                    height={514}
                    priority={true}
                  />
                  {article.category && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleCategoryClick(article.category)}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Article content */}
                <div className="p-6 md:p-8">
                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">{article.title}</h1>

                  {/* Date and Author */}
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                    <Calendar size={16} className="mr-2" />
                    <span>{article.date}</span>
                    <User size={16} className="ml-4 mr-2" />
                    <span>{article.author}</span>
                  </div>

                  {/* Article Content */}
                  <div 
                    className="prose dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-ocean dark:prose-a:text-ocean-light prose-strong:text-gray-800 dark:prose-strong:text-white prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700 prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-ol:text-gray-600 dark:prose-ol:text-gray-300 prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-table:text-gray-600 dark:prose-table:text-gray-300 prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-800 dark:prose-pre:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
               <ArticleSidebar />
            </div>
          </div>
        </div>
        
        {/* Share buttons and Scroll to top */}
        <div className="fixed bottom-24 right-4 flex flex-col items-center gap-3 z-40">
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={18} />
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-full bg-sky-500 dark:bg-sky-600 text-white shadow-md hover:bg-sky-600 dark:hover:bg-sky-700 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={18} />
            </button>
            <button 
              onClick={() => handleShare('whatsapp')}
              className="p-2 rounded-full bg-green-500 dark:bg-green-600 text-white shadow-md hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle size={18} />
            </button>
          </div>

          {showScrollTop && (
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-full bg-gray-800 dark:bg-gray-700 text-white shadow-md hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors lg:bottom-8 lg:right-8"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ArticleDetail;

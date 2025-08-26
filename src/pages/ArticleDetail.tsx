import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, Tag, ChevronLeft, Share2, Facebook, Twitter, MessageCircle, ArrowUp } from 'lucide-react';
import { articleData } from '@/data/articles';
import ArticleSidebar from '@/components/ArticleSidebar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { useTranslation } from 'react-i18next';

const ArticleDetail = () => {
  const { t, i18n } = useTranslation('common');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the article based on its slug (id from URL params)
  const article = articleData.find(article => article.slug === id);
  
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sections, setSections] = useState<{ id: string; title: string; children?: { id: string; title: string }[] }[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  
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

  // Build heading IDs and sections from rendered HTML content
  useEffect(() => {
    if (!contentRef.current) return;
    const container = contentRef.current;
    const headingNodes = Array.from(container.querySelectorAll('h2, h3')) as HTMLElement[];
    const toSlug = (text: string) => text
      .toLowerCase()
      .replace(/[^a-z0-9\u00C0-\u024F\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .substring(0, 80);
    const seen = new Map<string, number>();
    const flatBuilt: { id: string; title: string; level: number }[] = [];
    headingNodes.forEach((el) => {
      const title = el.textContent?.trim() || '';
      if (!title) return;
      let idAttr = el.getAttribute('id') || toSlug(title);
      // ensure uniqueness
      const count = seen.get(idAttr) || 0;
      if (count > 0) {
        idAttr = `${idAttr}-${count + 1}`;
      }
      seen.set(idAttr, count + 1);
      el.setAttribute('id', idAttr);
      flatBuilt.push({ id: idAttr, title, level: el.tagName === 'H2' ? 2 : 3 });
    });
    // Build hierarchical sections: H2 as parents, H3 as children under nearest H2
    const parents: { id: string; title: string; children: { id: string; title: string }[] }[] = [];
    let currentParent: { id: string; title: string; children: { id: string; title: string }[] } | null = null;
    flatBuilt.forEach(h => {
      if (h.level === 2) {
        currentParent = { id: h.id, title: h.title, children: [] };
        parents.push(currentParent);
      } else if (h.level === 3) {
        if (!currentParent) {
          // If H3 appears before any H2, promote a synthetic parent
          currentParent = { id: h.id + '-section', title: 'Bagian', children: [] };
          parents.push(currentParent);
        }
        currentParent.children.push({ id: h.id, title: h.title });
      }
    });
    setSections(parents.length > 0 ? parents : flatBuilt.map(h => ({ id: h.id, title: h.title })));

    // Scrollspy via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId((entry.target as HTMLElement).id);
        }
      });
    }, { root: null, rootMargin: '0px 0px -65% 0px', threshold: 0.1 });

    const observed: HTMLElement[] = [];
    headingNodes.forEach((el) => {
      observer.observe(el);
      observed.push(el as HTMLElement);
    });
    return () => {
      observed.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, [article?.content]);

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
    `${(i18n.language.startsWith('en') ? (article.translations?.en?.excerpt || article.excerpt) : article.excerpt)} ${t('article.readFull', 'Baca artikel lengkap tentang')} ${(i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title)} ${t('article.at', 'di')} Villa Sawarna.` :
    t('article.notFoundDesc', 'Artikel tidak ditemukan');

  const structuredData = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": (i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title),
    "description": (i18n.language.startsWith('en') ? (article.translations?.en?.excerpt || article.excerpt) : article.excerpt),
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
    "inLanguage": i18n.language.startsWith('en') ? 'en-US' : 'id-ID'
  } : null;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title={t('article.notFoundTitle', 'Artikel Tidak Ditemukan | Villa Sawarna')}
          description={t('article.notFoundSeoDesc', 'Artikel yang Anda cari tidak ditemukan. Silakan kunjungi halaman artikel kami untuk informasi terbaru tentang Villa Sawarna.')}
          keywords="artikel sawarna, wisata sawarna, pantai sawarna, blog sawarna"
          url="https://villasawarna.com/articles/not-found"
          type="website"
        />
        <div className="container-custom py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('article.notFoundHeading', 'Artikel Tidak Ditemukan')}</h1>
          <p className="mb-4">{t('article.notFoundText', 'Artikel yang Anda cari tidak ditemukan.')}</p>
          <Link to="/articles" className="text-primary hover:underline">
            {t('article.backToList', 'Kembali ke Daftar Artikel')}
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
           title={t('article.dataIncompleteTitle', 'Data Artikel Tidak Lengkap')}
           description={t('article.dataIncompleteDesc', 'Data untuk artikel ini tidak lengkap.')}
           noindex={true}
         />
         <div className="container-custom py-16">
           <div className="text-center">
             <h2 className="text-2xl font-bold mb-4">{t('article.dataIncompleteHeading', 'Data Artikel Tidak Lengkap')}</h2>
             <p className="mb-6">{t('article.dataIncompleteText', 'Maaf, data untuk artikel ini tidak lengkap.')}</p>
             <Link 
               to="/articles"
               className="inline-flex items-center text-ocean hover:underline"
             >
               <ChevronLeft className="mr-1" size={16} />
               {t('article.backToList', 'Kembali ke daftar artikel')}
             </Link>
           </div>
         </div>
       </>
     );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${(i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title)} | Villa Sawarna`}
        description={metaDescription}
        keywords={`${(i18n.language.startsWith('en') ? (article.translations?.en?.category || article.category) : article.category)}, artikel sawarna, wisata sawarna, pantai sawarna, ${(i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title).toLowerCase()}`}
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
        hreflangAlternates={[
          { hrefLang: 'id-ID', href: `https://villasawarna.com/articles/${article.slug}` },
          { hrefLang: 'en-US', href: `https://villasawarna.com/en/articles/${article.slug}` },
          { hrefLang: 'x-default', href: `https://villasawarna.com/articles/${article.slug}` }
        ]}
      />
      
      <div className="min-h-screen bg-sky-50 dark:bg-gray-900 flex flex-col">
        <div className="container-custom py-12 flex-grow">
          <Breadcrumbs 
            items={[
              { label: t('articles.breadcrumb', 'Artikel'), href: "/articles" },
              { label: (i18n.language.startsWith('en') ? (article.translations?.en?.category || article.category) : article.category), href: `/articles?category=${encodeURIComponent((i18n.language.startsWith('en') ? (article.translations?.en?.category || article.category) : article.category))}` },
              { label: (i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title) }
            ]} 
          />
          {/* Back to articles link */}
          <Link to="/articles" className="inline-flex items-center text-ocean dark:text-ocean-light hover:underline mb-6">
            <ChevronLeft size={16} className="mr-1" />
            {t('article.backToList', 'Kembali ke daftar artikel')}
          </Link>

          {/* Optional Hero for guide-style article */}
          {article.slug === 'panduan-legon-pari-karang-taraje' && (
            <section className="mb-8 rounded-2xl p-6 md:p-8 bg-gradient-to-b from-sky-100 to-white">
              <div className="grid gap-6 md:grid-cols-[1.3fr,1fr] items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-slate-900">
                    {(i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title)}
                  </h1>
                  <p className="text-slate-600 mb-4 max-w-2xl">{(i18n.language.startsWith('en') ? (article.translations?.en?.excerpt || article.excerpt) : article.excerpt)}</p>
                  <Link to="/kontak" className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-4 rounded-xl">{t('article.checkAvailability', 'Cek Ketersediaan Villa')}</Link>
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
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">{(i18n.language.startsWith('en') ? (article.translations?.en?.title || article.title) : article.title)}</h1>

                  {/* Date and Author */}
                  <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                    <Calendar size={16} className="mr-2" />
                    <span>{article.date}</span>
                    <User size={16} className="ml-4 mr-2" />
                    <span>{article.author}</span>
                  </div>

                  {/* Article Content */}
                  <div 
                    ref={contentRef}
                    className="prose dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-ocean dark:prose-a:text-ocean-light prose-strong:text-gray-800 dark:prose-strong:text-white prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700 prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-ol:text-gray-600 dark:prose-ol:text-gray-300 prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-table:text-gray-600 dark:prose-table:text-gray-300 prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-800 dark:prose-pre:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: (i18n.language.startsWith('en') ? (article.translations?.en?.content || article.content) : article.content) }}
                  />

                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              {/* Quick Navigation */}
              {sections.length > 0 && (
                <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6 sticky top-24 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">Navigasi Cepat</h3>
                  <ul className="space-y-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className={`block text-sm transition-colors ${activeSectionId === s.id ? 'text-cyan-600 dark:text-cyan-300 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-300'}`}
                        >
                          {s.title}
                        </a>
                        {s.children && s.children.length > 0 && (
                          <ul className="mt-1 ml-3 border-l border-gray-200 dark:border-gray-700 pl-3 space-y-1">
                            {s.children.map((c) => (
                              <li key={c.id}>
                                <a
                                  href={`#${c.id}`}
                                  className={`block text-[13px] transition-colors ${activeSectionId === c.id ? 'text-cyan-600 dark:text-cyan-300 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-300'}`}
                                >
                                  {c.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
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

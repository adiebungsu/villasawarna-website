import { Link } from 'react-router-dom';
import { useState } from 'react';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { Button } from '@/components/ui/button';
import { getVillasData } from '@/data/properties';
import QuickView from '@/components/QuickView';
import { useTranslation } from 'react-i18next';

// CSS untuk line-clamp dan optimasi mobile
const mobileStyles = `
  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  @media (max-width: 768px) {
    .villa-card-mobile {
      min-height: auto;
    }
    .villa-card-mobile .aspect-ratio {
      aspect-ratio: 16/9;
    }
  }
`;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Penginapan Sawarna – Villa Nyaman & Murah Dekat Pantai',
    description:
      'Temukan penginapan Sawarna terbaik, villa murah dekat pantai, cocok untuk keluarga maupun rombongan.',
    url: 'https://www.villasawarna.com/penginapan-sawarna',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.villasawarna.com' },
        { '@type': 'ListItem', position: 2, name: 'Penginapan Sawarna', item: 'https://www.villasawarna.com/penginapan-sawarna' }
      ]
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Berapa harga villa di Sawarna per malam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Mulai sekitar Rp300.000 untuk tipe budget hingga di atas Rp600.000 per malam untuk kapasitas keluarga besar dan fasilitas lebih lengkap (musiman).'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah ada penginapan dekat pantai (jalan kaki)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Ada. Beberapa unit berada sangat dekat jalur menuju pantai seperti area Legon Pari/Tanjung Layar. Hubungi kami untuk rekomendasi unit terdekat.'
        }
      },
      {
        '@type': 'Question',
        name: 'Pilihan penginapan untuk rombongan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Tersedia villa kapasitas besar dengan banyak kamar, area parkir luas, serta dapur/area BBQ. Cocok untuk 15–30 orang atau lebih.'
        }
      }
    ]
  }
];

const PenginapanSawarna = () => {
  const { t } = useTranslation('common');
  const allVillas = getVillasData();
  const [activeFilter, setActiveFilter] = useState<'semua' | 'dekat-pantai' | 'keluarga' | 'rombongan' | 'budget' | 'premium'>('semua');
  const [sortBy, setSortBy] = useState<'populer' | 'harga-asc' | 'harga-desc'>('populer');
  const [visible, setVisible] = useState(9);
  const [quickViewVilla, setQuickViewVilla] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const getCapacity = (v: any) => v?.capacity ?? 0;
  const getBedrooms = (v: any) => v?.bedrooms ?? 0;
  const getPrice = (v: any) => v?.price ?? v?.originalPrice ?? 0;

  const handleQuickView = (villa: any) => {
    setQuickViewVilla(villa);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewVilla(null);
  };

  const filtered = allVillas.filter((v: any) => {
    if (activeFilter === 'semua') return true;
    const price = getPrice(v);
    const capacity = getCapacity(v);
    const bedrooms = getBedrooms(v);
    if (activeFilter === 'budget') return price > 0 && price <= 350000;
    if (activeFilter === 'premium') return price >= 600000;
    if (activeFilter === 'keluarga') return bedrooms >= 2 || capacity >= 6;
    if (activeFilter === 'rombongan') return capacity >= 12;
    if (activeFilter === 'dekat-pantai') return true; // placeholder: tampilkan semua (tanpa data jarak)
    return true;
  });

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sortBy === 'harga-asc') return getPrice(a) - getPrice(b);
    if (sortBy === 'harga-desc') return getPrice(b) - getPrice(a);
    // populer: rating desc, reviews desc, lalu harga asc
    const ar = (a.rating ?? 0) - (b.rating ?? 0);
    if (ar !== 0) return -ar;
    const rv = (a.reviews ?? 0) - (b.reviews ?? 0);
    if (rv !== 0) return -rv;
    return getPrice(a) - getPrice(b);
  });

  const villas = sorted.slice(0, visible);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={t('staysPage.seo.title', 'Stays in Sawarna – Comfortable Villas Near the Beach')}
        description={t('staysPage.seo.description', 'Find the best stays in Sawarna, affordable beachside villas perfect for families and groups.')}
        keywords={t('staysPage.seo.keywords', 'stays sawarna, villa sawarna, homestay sawarna, beachside villa sawarna, affordable stays sawarna, group stays sawarna, sawarna villa prices, legon pari, tanjung layar, karang taraje')}
        image="https://i.imgur.com/pAI45l7.jpeg"
        url="https://www.villasawarna.com/penginapan-sawarna"
        structuredData={structuredData}
      />
      <style dangerouslySetInnerHTML={{ __html: mobileStyles }} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/hero-sawarna.jpg"
            alt={t('staysPage.hero.alt', 'Stays in Sawarna near the beach')}
            className="w-full h-full object-cover"
            quality={85}
            sizes="100vw"
            width={1920}
            height={960}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
              {t('staysPage.hero.title', 'Stays and Villas in Sawarna for a Comfortable Holiday')}
            </h1>
            <p className="text-white/90 md:text-lg mb-6">
              {t('staysPage.hero.subtitle', 'Selections of beachside villas and homestays—ideal for families, couples, and groups. Check availability & latest prices.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-coral hover:bg-coral-dark">
                <Link to="/villas">{t('staysPage.hero.viewAllVillas', 'View All Villas')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white/80 hover:bg-white/10">
                <Link to="/contact">{t('staysPage.hero.contactUs', 'Contact Us')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rekomendasi */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container-custom">
          {/* Paragraf deskriptif untuk membantu SEO "penginapan sawarna" */}
          <div className="max-w-3xl text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
            <p className="mb-3">
              {t('staysPage.intro.p1', 'Looking for comfortable stays in Sawarna near the beach? On this page we curated the best villas and homestays around Legon Pari, Tanjung Layar, Karang Taraje, up to Ciantir Beach. Choose units that fit your needs—from budget for couples, family units with 2–3 bedrooms, to group-capacity villas with many rooms and wide parking areas.')}
            </p>
            <p>
              {t('staysPage.intro.p2', 'For the best experience, consider distance to the beach, road access, and facilities like kitchen/BBQ and WiFi. Our team can recommend the best options based on your dates and number of guests. Use the filters below to speed up your search.')}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">{t('staysPage.recommendations.title', 'Recommended Stays')}</h2>
            <div className="flex flex-wrap gap-2">
              <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 mb-2 md:mb-0">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex gap-1 min-w-max">
                  {(['semua','dekat-pantai','keluarga','rombongan','budget','premium'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => { setVisible(9); setActiveFilter(f); window.scrollTo(0,0); }}
                      className={`px-4 py-2 md:px-3 md:py-1 rounded-lg text-sm font-medium whitespace-nowrap ${activeFilter===f? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow':'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                    >
                      {t(`staysPage.filters.${f}`, f.replace('-', ' '))}
                    </button>
                  ))}
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e)=>setSortBy(e.target.value as any)}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-label={t('staysPage.sort.aria', 'Sort')}
              >
                <option value="populer">{t('staysPage.sort.popular', 'Most Popular')}</option>
                <option value="harga-asc">{t('staysPage.sort.priceLow', 'Lowest Price')}</option>
                <option value="harga-desc">{t('staysPage.sort.priceHigh', 'Highest Price')}</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {villas.map((villa) => (
              <div key={villa.id} className="villa-card-mobile bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                <div 
                  className="relative aspect-[16/9] cursor-pointer group"
                  onClick={() => handleQuickView(villa)}
                >
                  <OptimizedImage
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      {t('staysPage.quickView', 'Quick View')}
                    </div>
                  </div>
                </div>
                <div className="p-2 md:p-4">
                  <h3 className="text-sm md:text-lg font-bold mb-1 dark:text-white line-clamp-2">{villa.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-1">{villa.location}</p>
                  <div className="flex items-end gap-1 md:gap-2 mb-2 md:mb-3">
                    {villa.originalPrice && (
                      <span className="line-through text-gray-400 text-xs md:text-sm">Rp {villa.originalPrice.toLocaleString('id-ID')}</span>
                    )}
                    <span className="text-red-600 dark:text-red-400 text-base md:text-xl font-bold">Rp {villa.price?.toLocaleString('id-ID') ?? '-'}</span>
                    <span className="text-xs text-gray-500">{t('staysPage.perNight', '/ night')}</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <Link to={`/villas/${villa.id}`} className="text-coral dark:text-coral-light font-semibold text-xs md:text-sm">{t('staysPage.viewDetail', 'View Detail')}</Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickView(villa);
                      }}
                      className="text-xs px-2 md:px-3 py-1 h-auto"
                    >
                      {t('staysPage.quickView', 'Quick View')}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center hidden md:block">{t('staysPage.hintClickImage', 'Tip: Click image for Quick View')}</p>
                </div>
              </div>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={()=>setVisible(v=>Math.min(v+9, filtered.length))}>{t('staysPage.loadMore', 'Load More')}</Button>
            </div>
          )}
        </div>
      </section>

      {/* Harga & Paket Ringkas */}
      <section className="py-8 bg-sky-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">{t('staysPage.priceRange.title', 'Price Range')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.priceRange.budget', 'Budget')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('staysPage.priceRange.budgetDesc', 'From ±Rp300.000/night')}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.priceRange.family', 'Family')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('staysPage.priceRange.familyDesc', '±Rp400.000–Rp600.000/night')}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.priceRange.group', 'Group')}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t('staysPage.priceRange.groupDesc', 'Large-room villas & wide parking available')}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{t('staysPage.priceRange.note', 'Note: prices may change based on season/weekend.')}</p>
        </div>
      </section>

      {/* Area Populer */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">{t('staysPage.popularAreas.title', 'Popular Areas')}</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li><Link to="/article/panduan-legon-pari-karang-taraje" className="underline text-ocean dark:text-ocean-light">{t('staysPage.popularAreas.legonPari', 'Legon Pari & Karang Taraje')}</Link> – {t('staysPage.popularAreas.legonPariDesc', 'sunrise & wave phenomena.')}</li>
            <li><Link to="/article/panduan-liburan-pantai-sawarna" className="underline text-ocean dark:text-ocean-light">{t('staysPage.popularAreas.guide', 'Sawarna Travel Guide')}</Link> – {t('staysPage.popularAreas.guideDesc', 'routes, itinerary, tips.')}</li>
            <li><Link to="/article/villa-dekat-pantai-sawarna" className="underline text-ocean dark:text-ocean-light">{t('staysPage.popularAreas.beachVillas', 'Beachfront Villas')}</Link> – {t('staysPage.popularAreas.beachVillasDesc', 'quick access to the beach.')}</li>
          </ul>
        </div>
      </section>

      {/* Artikel Rekomendasi untuk Anda */}
      <section className="py-8 bg-sky-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">{t('staysPage.recommendedArticles.title', 'Recommended Articles for You')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/article/penginapan-sawarna-murah-dekat-pantai" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.recommendedArticles.a1Title', 'Affordable Beachside Stays in Sawarna')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('staysPage.recommendedArticles.a1Desc', 'Economical options that remain comfortable and close to the beach.')}</p>
            </Link>
            <Link to="/article/villa-sawarna-untuk-keluarga-dan-rombongan" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.recommendedArticles.a2Title', 'Sawarna Villas for Families & Groups')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('staysPage.recommendedArticles.a2Desc', 'Guide to choosing capacity, bedrooms, and favorite areas.')}</p>
            </Link>
            <Link to="/article/rekomendasi-villa-sawarna-dengan-view-pantai" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.recommendedArticles.a3Title', 'Recommended Villas with Sea Views')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('staysPage.recommendedArticles.a3Desc', 'Units facing the sea in Legon Pari, Tanjung Layar, Ciantir.')}</p>
            </Link>
            <Link to="/article/villa-sawarna" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">{t('staysPage.recommendedArticles.a4Title', 'Sawarna Villas – Comfortable Beachside Stays')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('staysPage.recommendedArticles.a4Desc', 'Area info, prices, and tips for choosing villas.')}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Tips & FAQ */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">{t('staysPage.tips.title', 'Tips for Choosing Stays')}</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>{t('staysPage.tips.t1', 'Consider distance to the beach and road/parking access.')}</li>
              <li>{t('staysPage.tips.t2', 'Match bedroom capacity & extra bed options.')}</li>
              <li>{t('staysPage.tips.t3', 'Ensure kitchen/BBQ facilities if needed.')}</li>
              <li>{t('staysPage.tips.t4', 'Check WiFi and family/children needs.')}</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">FAQ</h2>
            <div className="space-y-2">
              <details className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer">{t('staysPage.faq.q1', 'Best time to stay?')}</summary>
                <div className="mt-2 text-gray-700 dark:text-gray-300">{t('staysPage.faq.a1', 'Dry season (May–September) offers better chance of sunny weather; weekends are busier.')}</div>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer">{t('staysPage.faq.q2', 'Is late check-in possible?')}</summary>
                <div className="mt-2 text-gray-700 dark:text-gray-300">{t('staysPage.faq.a2', 'It can be arranged based on availability. Contact us before arrival.')}</div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-sky-50 dark:bg-gray-900">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">{t('staysPage.cta.title', 'Ready to Stay in Sawarna?')}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5">{t('staysPage.cta.subtitle', 'We’ll recommend the best units matching your needs.')}</p>
          <Button asChild size="lg">
            <Link to="/contact">{t('staysPage.cta.button', 'Check Availability & Prices')}</Link>
          </Button>
        </div>
      </section>

      {/* Quick View Modal */}
      {isQuickViewOpen && quickViewVilla && (
        <QuickView
          id={quickViewVilla.id}
          name={quickViewVilla.name}
          type={quickViewVilla.type || 'villa'}
          image={quickViewVilla.image}
          price={quickViewVilla.price || 0}
          rating={quickViewVilla.rating || 0}
          location={quickViewVilla.location}
          capacity={quickViewVilla.capacity || 0}
          reviews={quickViewVilla.reviews || 0}
          bedrooms={quickViewVilla.bedrooms || 0}
          bathrooms={quickViewVilla.bathrooms || 0}
          amenities={quickViewVilla.amenities || []}
          isOpen={isQuickViewOpen}
          onClose={closeQuickView}
        />
      )}
    </div>
  );
};

export default PenginapanSawarna;



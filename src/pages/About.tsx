import SEO from '@/components/SEO';
import { Award, Clock, Heart, MapPin, Target, TrendingUp, Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { useTranslation } from 'react-i18next';
import { buildHreflangAlternates } from '@/utils/seo';

const About = () => {
  const { t, i18n } = useTranslation('common');
  // Structured data untuk halaman about
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t('aboutPage.seoName', 'About Villa Sawarna'),
    "description": t('aboutPage.seoDescription', 'VillaSawarna is the leading accommodation provider in Sawarna Beach. Learn about our story, vision and mission, and our commitment to providing the best beach holiday experience.'),
    "url": "https://villasawarna.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "description": t('aboutPage.orgDescription', 'Leading accommodation provider in Sawarna Beach'),
      "url": "https://villasawarna.com",
      "logo": "https://villasawarna.com/logo.png",
      "sameAs": [
        "https://facebook.com/villasawarna",
        "https://instagram.com/villasawarna",
        "https://twitter.com/villasawarna"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sawarna",
        "addressLocality": "Sawarna",
        "addressRegion": "Banten",
        "addressCountry": i18n.language.startsWith('en') ? 'US' : 'ID'
      }
    }
  };

  return (
    <>
      <SEO 
        title={t('aboutPage.seoTitle', 'About Us | Villa Sawarna')}
        description={t('aboutPage.seoMetaDescription', 'Discover the story behind Villa Sawarna and our commitment to delivering the best stay experience in Sawarna Beach with luxury villas and authentic homestays.')}
        keywords={t('aboutPage.seoKeywords', 'villa sawarna, about us, sawarna history, stays in sawarna, sawarna travel')}
        url="https://villasawarna.com/about"
        type="website"
        structuredData={structuredData}
        hreflangAlternates={buildHreflangAlternates('/about')}
      />
      
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div 
          className="relative h-[70vh] min-h-[500px] w-full 
                     flex items-center justify-center text-center text-white 
                     overflow-hidden group bg-[url('https://i.imgur.com/3yR0ery.jpeg')] bg-cover bg-center bg-no-repeat"
        >
          {/* Overlay normal untuk mode terang */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Overlay dengan gradasi hanya untuk dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 opacity-90 dark:opacity-100 hidden dark:block"></div>

          {/* Content */}
          <div className="relative z-10 container-custom flex flex-col items-center justify-center">
            <div className="max-w-2xl p-8 rounded-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutPage.hero.title', 'About VillaSawarna')}</h1>
              <div className="w-24 h-1 bg-white mb-6 mx-auto"></div> {/* Center the line */} 
              <p className="text-lg leading-relaxed">
                {t('aboutPage.hero.subtitle', 'Providing the finest accommodations in Sawarna Beach for an unforgettable beach holiday experience.')}
              </p>
            </div>
          </div>

          {/* Removed previous mobile-only background div and desktop OptimizedImage */}

        </div>
        
        {/* Our Story */}
        <div className="bg-white dark:bg-gray-900 py-20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-ocean/10 dark:bg-ocean-light/20 rounded-2xl transform rotate-3"></div>
                  <video 
                    src="/videos/villasawarna.mp4"
                    autoPlay
                    loop
                    playsInline
                    controls
                    className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">{t('aboutPage.story.title', 'Our Story')}</h2>
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('aboutPage.story.p1', 'VillaSawarna was founded in 2015 by beach and nature enthusiasts inspired by the beauty of Sawarna Beach. Starting from a small private villa, we saw the potential to help travelers enjoy this beach with the best comfort.')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('aboutPage.story.p2', 'Over the years, we have grown from a single villa into the most complete accommodation network in the Sawarna Beach area. We work with local communities to provide authentic homestays and build private villas that offer privacy and luxury amid natural beauty.')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('aboutPage.story.p3', 'Our mission is simple: help travelers enjoy the beauty of Sawarna Beach with maximum comfort, while preserving nature and empowering local communities.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-gradient-to-b from-gray-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 py-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">{t('aboutPage.vision.title', 'Vision & Mission')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('aboutPage.vision.subtitle', 'Our commitment to deliver the best experience for every guest staying with VillaSawarna.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('aboutPage.vision.visionTitle', 'Vision')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutPage.vision.visionText', 'To be the leading accommodation provider in Sawarna Beach known for service quality, comfort, and commitment to environmental sustainability.')}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{t('aboutPage.vision.missionTitle', 'Mission')}</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>{t('aboutPage.vision.m1', 'Provide high-quality accommodations to international standards')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>{t('aboutPage.vision.m2', 'Deliver unforgettable holiday experiences')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>{t('aboutPage.vision.m3', 'Preserve the natural beauty of Sawarna Beach')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>{t('aboutPage.vision.m4', 'Empower local communities')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>{t('aboutPage.vision.m5', 'Develop sustainable tourism destinations')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">{t('aboutPage.why.title', 'Why Choose Us')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('aboutPage.why.subtitle', 'We are committed to delivering the best holiday experience with quality service and comfortable stays in the best locations of Sawarna Beach.')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('aboutPage.why.locTitle', 'Strategic Locations')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutPage.why.locText', 'All our stays are located in strategic areas with easy access to the beach and stunning sea views.')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('aboutPage.why.qualityTitle', 'Assured Quality')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutPage.why.qualityText', 'We ensure high quality standards for all accommodations, with regular maintenance and modern facilities.')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('aboutPage.why.localExpTitle', 'Local Experiences')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutPage.why.localExpText', 'Enjoy authentic experiences with local guides and culinary delights that make your holiday memorable.')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{t('aboutPage.why.serviceTitle', '24/7 Service')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('aboutPage.why.serviceText', 'Our support team is ready to assist you 24 hours a day, 7 days a week to ensure comfort during your stay.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">8+</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t('aboutPage.stats.years', 'Years of Experience')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">1000+</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t('aboutPage.stats.guests', 'Happy Guests')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">4.8</div>
                <div className="flex justify-center items-center gap-1 mb-4">
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t('aboutPage.stats.rating', 'Guest Rating')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">20+</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{t('aboutPage.stats.stays', 'Accommodations')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-ocean text-white py-20">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('aboutPage.cta.title', 'Ready for Your Dream Beach Holiday?')}</h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                {t('aboutPage.cta.subtitle', 'Explore our collection of villas and homestays to find the perfect accommodation for your Sawarna Beach holiday.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/villas" className="bg-white dark:bg-gray-800 text-ocean dark:text-ocean-light hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all">
                  {t('aboutPage.cta.viewVillas', 'View Villas')}
                </a>
                <a href="/homestays" className="bg-coral hover:bg-coral-dark text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all">
                  {t('aboutPage.cta.viewHomestays', 'View Homestays')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

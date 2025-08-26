import { Facebook, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-ocean dark:text-ocean-light">Villa</span>
              <span className="text-2xl font-bold text-coral dark:text-coral-light">Sawarna</span>
            </Link>
            <p className="mt-4 text-gray-300 dark:text-gray-400">
              {t('footer.tagline', 'Temukan akomodasi sempurna untuk liburan impian Anda di Pantai Sawarna, dari villa mewah hingga homestay yang nyaman.')}
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white dark:text-gray-100">{t('footer.quickLinks', 'Tautan Cepat')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/villas" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('nav.villas')}</Link>
              </li>
              <li>
                <Link to="/penginapan-sawarna" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('nav.stays')}</Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('footer.articles', 'Artikel')}</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('nav.contact')}</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light transition-colors">{t('footer.terms', 'Syarat & Ketentuan')}</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white dark:text-gray-100">{t('footer.contactUs', 'Hubungi Kami')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-ocean dark:text-ocean-light" />
                <span className="text-gray-300 dark:text-gray-400">{t('footer.address', 'Jl. Pantai Sawarna, Desa Sawarna, Kecamatan Bayah, Kabupaten Lebak, Banten, Indonesia')}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0 text-ocean dark:text-ocean-light">
                  <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                </svg>
                <a href="https://wa.me/6283877080088" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light">+62 838 7708 0088</a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-ocean dark:text-ocean-light" />
                <a href="mailto:layanan@villasawarna.com" className="text-gray-300 hover:text-ocean dark:text-gray-400 dark:hover:text-ocean-light">layanan@villasawarna.com</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white dark:text-gray-100">{t('footer.subscribe', 'Berlangganan')}</h4>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              {t('footer.subscribeText', 'Berlangganan newsletter kami untuk mendapatkan penawaran spesial.')}
            </p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder', 'Email Anda')}
                  className="px-4 py-2 w-full focus:outline-none text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:placeholder-gray-500 rounded-l border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="submit"
                  className="bg-coral hover:bg-coral-dark dark:bg-coral-dark dark:hover:bg-coral px-4 py-2 rounded-r text-white transition-colors"
                >
                  {t('footer.subscribeCta', 'Langganan')}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} VillaSawarna. {t('footer.copyright', 'Hak cipta dilindungi.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

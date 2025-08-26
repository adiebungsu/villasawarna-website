import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import i18n from '@/i18n';

/**
 * Sync i18n language with URL prefix: `/en/...` -> en, otherwise -> id
 */
export const useLocaleFromPath = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || '/';
    const isEnglish = /^\/en(\/|$)/i.test(pathname);
    const targetLang = isEnglish ? 'en' : 'id';
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
      // Update <html lang="..."> for accessibility/SEO
      if (typeof document !== 'undefined') {
        document.documentElement.lang = targetLang;
      }
    }
  }, [location.pathname]);
};








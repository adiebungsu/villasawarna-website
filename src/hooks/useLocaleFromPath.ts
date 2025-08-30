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
    const search = location.search || '';
    const hasEnPrefix = /^\/en(\/|$)/i.test(pathname);
    const hasIdPrefix = /^\/id(\/|$)/i.test(pathname);

    // Allow explicit query override: ?lang=en or ?lang=id
    const params = new URLSearchParams(search);
    const queryLang = params.get('lang');

    let targetLang = i18n.language;
    if (queryLang === 'en' || queryLang === 'id') {
      targetLang = queryLang;
    } else if (hasEnPrefix) {
      targetLang = 'en';
    } else if (hasIdPrefix) {
      targetLang = 'id';
    }

    if (targetLang && i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = targetLang;
      }
    }
  }, [location.pathname, location.search]);
};















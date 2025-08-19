import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch {}

    const scrollTo = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Hard fallback for some browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Run now, after paint, and micro-delay to defeat layout shifts
    scrollTo();
    const raf = requestAnimationFrame(scrollTo);
    const t = setTimeout(scrollTo, 0);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollToTop;

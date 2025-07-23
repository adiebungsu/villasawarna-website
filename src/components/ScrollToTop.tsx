import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    console.log('ScrollToTop triggered', pathname, window.scrollY);
    // Coba scroll dengan behavior berbeda
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // window.scrollTo(0, 0); // fallback
  }, [pathname]);

  return null;
};

export default ScrollToTop;

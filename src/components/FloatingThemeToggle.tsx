import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Cek apakah kita berada di halaman detail
  const isDetailPage = location.pathname.includes('/villas/') || 
                      location.pathname.includes('/hotels/') ||
                      location.pathname.includes('/homestays/') ||
                      location.pathname.includes('/article/') ||
                      location.pathname.includes('/destinations/') ||
                      location.pathname.includes('/destination/');

  // Efek untuk animasi fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Muncul setelah 1 detik

    return () => clearTimeout(timer);
  }, []);

  // Jika di halaman detail atau bukan mobile view, jangan tampilkan
  if (isDetailPage || window.innerWidth >= 768) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed bottom-28 right-4 z-[9999] pointer-events-auto",
        "transition-all duration-500 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "w-12 h-12 rounded-full shadow-xl",
          "bg-white dark:bg-gray-800",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "transition-all duration-300",
          "border-2 border-gray-200 dark:border-gray-700",
          "flex items-center justify-center",
          "transform hover:scale-110 active:scale-95",
          "!p-0",
          "animate-in fade-in slide-in-from-bottom-4 duration-500"
        )}
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
          // Tambahkan efek ripple
          const button = document.querySelector('.theme-toggle-button');
          if (button) {
            button.classList.add('ripple');
            setTimeout(() => button.classList.remove('ripple'), 600);
          }
        }}
        aria-label="Ubah tema"
      >
        <div className="relative w-6 h-6 theme-toggle-button">
          <Sun 
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-500",
              "rotate-0 scale-100 dark:-rotate-90 dark:scale-0",
              "text-gray-800 dark:text-gray-200"
            )} 
          />
          <Moon 
            className={cn(
              "absolute inset-0 w-full h-full transition-all duration-500",
              "rotate-90 scale-0 dark:rotate-0 dark:scale-100",
              "text-gray-800 dark:text-gray-200"
            )} 
          />
        </div>
      </Button>
    </div>
  );
} 
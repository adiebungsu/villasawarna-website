import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Building2, Hotel, Newspaper, Info, Phone, Settings, User, Shield, LogOut, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import GoogleAuth from './GoogleAuth';
import { useAuth } from "@/context/use-auth";
import OptimizedImage from '@/components/OptimizedImage';
import { ThemeToggle } from './ThemeToggle';

// Logo component
const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <OptimizedImage
        src="/images/logo-villasawarna2.png"
        alt="Villa Sawarna"
        className="h-8 w-auto"
        style={{maxHeight: '32px'}}
        quality={90}
        priority={true}
        sizes="32px"
        width={120}
        height={32}
      />
      <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-ocean to-coral bg-clip-text text-transparent align-middle">VillaSawarna</span>
    </Link>
  );
};

// Main Navbar component
const Navbar = () => {
  const { user, setUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const adminEmails = ["adiebungsu@gmail.com", "sawarnalagi@gmail.com"];
  const isAdmin = user && adminEmails.includes(user.email);

  // Perbaikan logika pengecekan halaman detail
  const isDetailPage = /^\/villas\/[^/]+$/.test(location.pathname) || 
                      /^\/property\/[^/]+$/.test(location.pathname) || 
                      /^\/destination\/[^/]+$/.test(location.pathname) ||
                      /^\/hotels\/[^/]+$/.test(location.pathname) ||
                      /^\/homestays\/[^/]+$/.test(location.pathname) ||
                      /^\/article\/[^/]+$/.test(location.pathname);



  // Navigation links with icons - untuk desktop navbar
  const navLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Villa', path: '/villas', icon: Building2 },
    { name: 'Penginapan', path: '/penginapan-sawarna', icon: Hotel },
    { name: 'Tentang', path: '/about', icon: Info },
    { name: 'Kontak', path: '/contact', icon: Phone },
    ...(user ? [{ name: 'Dashboard', path: '/dashboard', icon: User }] : []),
    ...(isAdmin ? [{ name: 'Admin', path: '/admin/articles', icon: Settings }] : [])
  ];

  // Check if current path matches link path
  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Navbar - Hidden on mobile */}
      <nav 
        className={cn(
          'fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 hidden md:block backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20',
          {
            'bg-background/95 shadow-sm dark:bg-gray-900/95': isScrolled || location.pathname !== '/',
            'bg-transparent': !isScrolled && location.pathname === '/'
          }
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap',
                    {
                      'text-ocean hover:bg-ocean/10 dark:text-ocean-light dark:hover:bg-ocean/20': !isActivePath(link.path) && (isScrolled || location.pathname !== '/'),
                      'text-white hover:bg-white/20': !isActivePath(link.path) && !isScrolled && location.pathname === '/',
                      'bg-ocean text-white dark:bg-ocean-dark': isActivePath(link.path) && (isScrolled || location.pathname !== '/'),
                      'bg-white/20 text-white': isActivePath(link.path) && !isScrolled && location.pathname === '/',
                    }
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {/* ThemeToggle hanya muncul di desktop dan bukan di halaman detail */}
              <div className={cn(
                "hidden md:block",
                {
                  "hidden": location.pathname.includes('/villas/') || 
                           location.pathname.includes('/hotels/') ||
                           location.pathname.includes('/homestays/') ||
                           location.pathname.includes('/article/') ||
                           location.pathname.includes('/destinations/') ||
                           location.pathname.includes('/destination/')
                }
              )}>
                <ThemeToggle />
              </div>
            </div>

            {/* Google Auth */}
            <div className="hidden md:flex">
              {user ? (
                <GoogleAuth />
              ) : (
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Selalu terlihat di mobile kecuali di halaman detail */}
      {!isDetailPage && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05)] z-[9999] border-t border-gray-200/20 dark:border-gray-800/20">
          <div className="container-custom">
            <nav className="flex justify-around py-2 overflow-x-auto">
              {/* Beranda */}
              <Link 
                to="/"
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/')
                  }
                )}
              >
                <Home size={18} className={cn(
                  {
                    'text-coral dark:text-coral-light': isActivePath('/'),
                    'text-gray-400 dark:text-gray-500': !isActivePath('/')
                  }
                )} />
                <span className="text-[9px] font-medium">Beranda</span>
              </Link>

              {/* Villa */}
              <Link 
                to="/villas"
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/villas')
                  }
                )}
              >
                <Building2 size={18} className={cn(
                  {
                    'text-coral dark:text-coral-light': isActivePath('/villas'),
                    'text-gray-400 dark:text-gray-500': !isActivePath('/villas')
                  }
                )} />
                <span className="text-[9px] font-medium">Villa</span>
              </Link>

              {/* Destinations */}
              <Link 
                to="/destinations"
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/destinations')
                  }
                )}
              >
                <MapPin size={18} className={cn(
                  {
                    'text-coral dark:text-coral-light': isActivePath('/destinations'),
                    'text-gray-400 dark:text-gray-500': !isActivePath('/destinations')
                  }
                )} />
                <span className="text-[9px] font-medium">Destinasi</span>
              </Link>

              {/* Dashboard - Profil Bulat di Tengah */}
              <Link 
                to={user ? "/dashboard" : "/login"}
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/dashboard') || isActivePath('/login')
                  }
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full overflow-hidden transition-all duration-200 shadow-lg border-2',
                  {
                    'border-coral scale-110': isActivePath('/dashboard') || isActivePath('/login'),
                    'border-gray-200 dark:border-gray-700': !isActivePath('/dashboard') && !isActivePath('/login')
                  }
                )}>
                  {user ? (
                    user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name || 'User'} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={cn(
                        'w-full h-full flex items-center justify-center text-white font-semibold text-sm',
                        {
                          'bg-coral': isActivePath('/dashboard'),
                          'bg-gradient-to-br from-ocean to-coral': !isActivePath('/dashboard')
                        }
                      )}>
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )
                  ) : (
                    // Ikon profil ketika logout
                    <div className={cn(
                      'w-full h-full flex items-center justify-center text-white',
                      {
                        'bg-coral': isActivePath('/login'),
                        'bg-gradient-to-br from-ocean to-coral': !isActivePath('/login')
                      }
                    )}>
                      <User size={16} />
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-medium">{user ? 'Profil' : 'Login'}</span>
              </Link>

              {/* Penginapan */}
              <Link 
                to="/penginapan-sawarna"
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/penginapan-sawarna')
                  }
                )}
              >
                <Hotel size={18} className={cn(
                  {
                    'text-coral dark:text-coral-light': isActivePath('/penginapan-sawarna'),
                    'text-gray-400 dark:text-gray-500': !isActivePath('/penginapan-sawarna')
                  }
                )} />
                <span className="text-[9px] font-medium">Penginapan</span>
              </Link>

              

              {/* About */}
              <Link 
                to="/about"
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/about')
                  }
                )}
              >
                <Info size={18} className={cn(
                  {
                    'text-coral dark:text-coral-light': isActivePath('/about'),
                    'text-gray-400 dark:text-gray-500': !isActivePath('/about')
                  }
                )} />
                <span className="text-[9px] font-medium">Tentang</span>
              </Link>

              {/* Contact */}
              <Link 
                to="/contact"
                className={cn(
                  'flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 min-w-0 flex-shrink-0',
                  {
                    'text-coral dark:text-coral-light': isActivePath('/contact')
                  }
                )}
              >
                <Phone size={18} className={cn(
                  {
                    'text-coral dark:text-coral-light': isActivePath('/contact'),
                    'text-gray-400 dark:text-gray-500': !isActivePath('/contact')
                  }
                )} />
                <span className="text-[9px] font-medium">Kontak</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Tambahkan padding top untuk konten agar tidak tertutup navbar */}
      <div className="md:block hidden h-20"></div>
    </>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Hotel, MapPin } from 'lucide-react';

const NavbarTest: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const mobileDashboardLinks = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Penginapan', path: '/penginapan-sawarna', icon: Hotel },
    { name: 'Transport', path: '/transport', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="font-bold text-xl text-blue-600">VillaSawarna</div>
            
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-gray-100 hover:bg-gray-200"
            >
              {isMobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/50">
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200/20 shadow-lg">
            <div className="px-4 py-4">
              <nav className="space-y-2">
                {mobileDashboardLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      console.log('Clicked:', link.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors w-full text-left text-gray-700 hover:bg-gray-100"
                  >
                    <link.icon size={20} />
                    {link.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold mb-4">Test Hamburger Menu</h1>
        <p className="text-gray-600">Ini adalah halaman test untuk hamburger menu.</p>
        <p className="text-gray-600 mt-2">Status menu: {isMobileMenuOpen ? 'Terbuka' : 'Tertutup'}</p>
      </div>
    </div>
  );
};

export default NavbarTest;




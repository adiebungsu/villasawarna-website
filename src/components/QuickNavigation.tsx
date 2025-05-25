import React, { useState, useEffect } from 'react';
import { BedDouble, Star, MapPin, Info, MessageCircle, Phone } from 'lucide-react';

interface QuickNavigationProps {
  sections: { id: string; label: string; icon?: React.ReactNode }[];
  onSectionClick?: (sectionId: string) => void;
}

const QuickNavigation: React.FC<QuickNavigationProps> = ({ sections, onSectionClick }) => {
  const [activeSection, setActiveSection] = useState('');

  const handleScrollToSection = (id: string) => {
    if (onSectionClick) {
      onSectionClick(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset;

      // Find the section that is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (pageYOffset >= sectionTop - 100) { // Add an offset
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  // Fungsi untuk mendapatkan ikon berdasarkan label
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'info':
        return <Info size={20} />;
      case 'kamar':
        return <BedDouble size={20} />;
      case 'booking':
        return <Phone size={20} />;
      case 'review':
        return <Star size={20} />;
      case 'maps':
        return <MapPin size={20} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05)] z-[9999] border-t border-gray-200/20 dark:border-gray-800/20 md:hidden">
        <div className="container-custom">
          <nav className="flex justify-around py-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScrollToSection(section.id)}
                className={`flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors px-2 py-1.5 rounded-lg hover:bg-sand-light/50 dark:hover:bg-gray-800 ${
                  activeSection === section.id ? 'text-coral dark:text-coral-light' : ''
                }`}
              >
                {section.icon || getIcon(section.label)}
                <span className="text-[10px] font-medium">{section.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-[9999]">
        <nav className="flex flex-col gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200/20 dark:border-gray-800/20">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScrollToSection(section.id)}
              className={`flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-coral dark:hover:text-coral-light transition-colors p-2 rounded-full hover:bg-sand-light/50 dark:hover:bg-gray-800 ${
                activeSection === section.id ? 'text-coral dark:text-coral-light bg-sand-light/50 dark:bg-gray-800' : ''
              }`}
              title={section.label}
            >
              {section.icon || getIcon(section.label)}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default QuickNavigation; 
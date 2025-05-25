import { useEffect } from 'react';

interface FontLoaderProps {
  fonts?: {
    family: string;
    weight?: number | number[];
    style?: 'normal' | 'italic';
  }[];
}

const FontLoader = ({ fonts = [] }: FontLoaderProps) => {
  useEffect(() => {
    // Preload fonts
    const preloadFonts = async () => {
      const fontPromises = fonts.map(async (font) => {
        const weights = Array.isArray(font.weight) ? font.weight : [font.weight || 400];
        const styles = font.style ? [font.style] : ['normal'];
        
        return Promise.all(
          weights.flatMap(weight =>
            styles.map(style => {
              const fontFace = new FontFace(
                font.family,
                `url(/fonts/${font.family.toLowerCase().replace(/\s+/g, '-')}-${weight}${style === 'italic' ? '-italic' : ''}.woff2)`,
                { weight: weight.toString(), style }
              );
              
              return fontFace.load().then(loadedFont => {
                document.fonts.add(loadedFont);
                return loadedFont;
              });
            })
          )
        );
      });

      try {
        await Promise.all(fontPromises);
        document.documentElement.classList.add('fonts-loaded');
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    preloadFonts();
  }, [fonts]);

  return null;
};

export default FontLoader; 
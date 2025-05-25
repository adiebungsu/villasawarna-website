import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";

const Hero = () => {
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="https://i.imgur.com/zQYXHHZ.jpeg"
          alt="Pantai Sawarna"
          className="w-full h-full object-cover"
          priority={true}
          quality={85}
          sizes="100vw"
          width={1920}
          height={1080}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent dark:from-black/70 dark:via-black/60 dark:to-black/50"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container-custom py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-slide-from-bottom">
            Temukan Surga di Pantai Sawarna
          </h1>
          <p className="text-base md:text-xl text-white/90 dark:text-white/95 mb-8 animate-fade-in-delay">
            Temukan villa atau homestay sempurna untuk liburan pantai impian Anda di salah satu destinasi pantai terindah di Indonesia
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-delay-2">
            <Button asChild size="lg" className="bg-coral hover:bg-coral-dark dark:bg-coral-dark dark:hover:bg-coral transition-transform hover:scale-105">
              <Link to="/villas" className="flex items-center gap-2">
                Jelajahi Villa <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 transition-transform hover:scale-105">
              <Link to="/homestays" className="flex items-center gap-2">
                Lihat Homestay <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-white hover:bg-white/10 dark:hover:bg-white/20 transition-transform hover:scale-105">
              <Link to="/about" className="flex items-center gap-2">
                Tentang Kami <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

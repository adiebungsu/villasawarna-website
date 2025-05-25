import SEO from '@/components/SEO';
import { Award, Clock, Heart, MapPin, Target, TrendingUp, Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const About = () => {
  // Structured data untuk halaman about
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Tentang Villa Sawarna",
    "description": "VillaSawarna adalah penyedia akomodasi terbaik di Pantai Sawarna. Temukan cerita kami, visi misi, dan komitmen kami dalam memberikan pengalaman liburan terbaik.",
    "url": "https://villasawarna.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "description": "Penyedia akomodasi terbaik di Pantai Sawarna",
      "url": "https://villasawarna.com",
      "logo": "https://villasawarna.com/logo.png",
      "sameAs": [
        "https://facebook.com/villasawarna",
        "https://instagram.com/villasawarna",
        "https://twitter.com/villasawarna"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sawarna", // Assuming Sawarna is the street address as well
        "addressLocality": "Sawarna",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Tentang Kami | Villa Sawarna"
        description="Temukan kisah di balik Villa Sawarna, komitmen kami untuk memberikan pengalaman menginap terbaik di Pantai Sawarna dengan villa mewah dan homestay otentik."
        keywords="villa sawarna, tentang kami, sejarah sawarna, penginapan sawarna, wisata sawarna"
        url="https://villasawarna.com/about"
        type="website"
        structuredData={structuredData}
      />
      
      {/* Main Content */}
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div 
          className="relative h-[70vh] min-h-[500px] w-full 
                     flex items-center justify-center text-center text-white 
                     overflow-hidden group"
          style={{
            backgroundImage: 'url(https://i.imgur.com/3yR0ery.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay normal untuk mode terang */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Overlay dengan gradasi hanya untuk dark mode */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 opacity-90 dark:opacity-100 hidden dark:block"></div>

          {/* Content */}
          <div className="relative z-10 container-custom flex flex-col items-center justify-center">
            <div className="max-w-2xl p-8 rounded-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang VillaSawarna</h1>
              <div className="w-24 h-1 bg-white mb-6 mx-auto"></div> {/* Center the line */} 
              <p className="text-lg leading-relaxed">
                Menyediakan akomodasi terbaik di Pantai Sawarna untuk pengalaman liburan pantai yang tak terlupakan
              </p>
            </div>
          </div>

          {/* Removed previous mobile-only background div and desktop OptimizedImage */}

        </div>
        
        {/* Our Story */}
        <div className="bg-white dark:bg-gray-900 py-20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-ocean/10 dark:bg-ocean-light/20 rounded-2xl transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Villa Sawarna Story"
                    className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Cerita Kami</h2>
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    VillaSawarna didirikan pada tahun 2015 oleh sekelompok pecinta pantai dan alam yang terpesona dengan keindahan Pantai Sawarna. Berawal dari sebuah villa kecil yang dibangun untuk akomodasi pribadi, kami melihat potensi besar untuk membantu wisatawan menikmati keindahan pantai ini dengan kenyamanan terbaik.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Selama bertahun-tahun, kami telah berkembang dari satu villa menjadi jaringan akomodasi terlengkap di kawasan Pantai Sawarna. Kami bekerja sama dengan penduduk lokal untuk menyediakan homestay yang otentik dan juga membangun villa-villa pribadi yang menawarkan privasi dan kemewahan di tengah keindahan alam.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Misi kami sederhana: membantu wisatawan menikmati keindahan Pantai Sawarna dengan kenyamanan maksimal, sambil tetap melestarikan alam dan memberdayakan masyarakat lokal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-gradient-to-b from-gray-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 py-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Visi & Misi</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Komitmen kami untuk memberikan pengalaman terbaik bagi setiap tamu yang menginap di VillaSawarna
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Visi</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Menjadi penyedia akomodasi terbaik di Pantai Sawarna yang dikenal dengan kualitas layanan, kenyamanan, dan komitmen terhadap kelestarian lingkungan.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Misi</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>Menyediakan akomodasi berkualitas dengan standar internasional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>Memberikan pengalaman liburan yang tak terlupakan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>Melestarikan keindahan alam Pantai Sawarna</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>Memberdayakan masyarakat lokal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-ocean dark:text-ocean-light mt-1">•</span>
                    <span>Mengembangkan destinasi wisata berkelanjutan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div className="bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white dark:drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">Mengapa Memilih Kami</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Kami berkomitmen untuk memberikan pengalaman liburan terbaik dengan layanan berkualitas dan akomodasi nyaman di lokasi terbaik Pantai Sawarna.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Lokasi Strategis</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Semua akomodasi kami terletak di lokasi strategis dengan akses mudah ke pantai dan pemandangan laut yang menakjubkan.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Award size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Kualitas Terjamin</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Kami menjamin standar kualitas tinggi untuk semua akomodasi, dengan perawatan rutin dan fasilitas modern.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Pengalaman Lokal</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nikmati pengalaman otentik dengan panduan lokal dan kuliner khas yang akan membuat liburan Anda berkesan.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ocean/10 dark:bg-ocean-light/20 text-ocean dark:text-ocean-light mb-6">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Layanan 24/7</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Tim dukungan kami siap membantu Anda 24 jam sehari, 7 hari seminggu untuk memastikan kenyamanan selama menginap.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="bg-gray-50 dark:bg-gray-800 py-20">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">8+</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Tahun Pengalaman</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">1000+</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Tamu Puas</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">4.8</div>
                <div className="flex justify-center items-center gap-1 mb-4">
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                  <Star className="text-yellow-400" size={20} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Rating Tamu</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl md:text-5xl font-bold text-ocean dark:text-ocean-light mb-4">20+</div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Akomodasi</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-ocean text-white py-20">
          <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Untuk Liburan Pantai Impian?</h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Jelajahi koleksi villa dan homestay kami untuk menemukan akomodasi sempurna untuk liburan Anda di Pantai Sawarna.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/villas" className="bg-white dark:bg-gray-800 text-ocean dark:text-ocean-light hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all">
                  Lihat Villa
                </a>
                <a href="/homestays" className="bg-coral hover:bg-coral-dark text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all">
                  Lihat Homestay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

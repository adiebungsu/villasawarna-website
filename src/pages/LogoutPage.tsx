import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, CheckCircle, Home, LogIn, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(false);

  // Auto redirect to home after 5 seconds
  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [navigate]);

  return (
    <>
      <SEO 
        title="Logout | Villa Sawarna"
        description="Anda telah berhasil logout dari Villa Sawarna"
        keywords="logout villa sawarna, keluar akun"
        url="https://villasawarna.com/logout"
        type="website"
      />
      
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{
            backgroundImage: `url('/images/karang-taraje-sawarna.webp')`
          }}
        />
        
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60 dark:from-black/70 dark:via-black/60 dark:to-black/80" />
        
        {/* Brand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-ocean/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-coral/10 via-transparent to-transparent" />
        
        {/* Subtle Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            >
              <div className="w-1.5 h-1.5 bg-white/10 rounded-full blur-sm" />
            </div>
          ))}
        </div>
        
        {/* Content Container */}
        <div className={`relative z-10 w-full max-w-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo Section */}
          <div className="text-center mb-6">
            <div className="mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-ocean/15 to-coral/15 rounded-full blur-lg animate-pulse" />
              <img 
                src="/images/logo-villasawarna.png" 
                alt="Villa Sawarna Logo" 
                className="h-20 mx-auto relative z-10 drop-shadow-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden relative z-10 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ocean/20 to-coral/20 rounded-2xl backdrop-blur-sm border border-white/20">
                <Shield className="w-10 h-10 text-ocean drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Villa Sawarna
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-ocean to-coral mx-auto rounded-full" />
          </div>

          {/* Main Card */}
          <Card className="shadow-2xl border-0 bg-white/85 dark:bg-gray-900/85 backdrop-blur-xl border-white/20 relative overflow-hidden">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-ocean/5 via-transparent to-coral/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-green-400/30">
                <CheckCircle className="w-8 h-8 text-green-400 drop-shadow-lg" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Logout Berhasil
              </CardTitle>
              <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full" />
            </CardHeader>
            
            <CardContent className="space-y-5 relative z-10">
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-200 mb-3 text-sm leading-relaxed">
                  Anda telah berhasil keluar dari akun Villa Sawarna. 
                  Terima kasih telah menggunakan layanan kami.
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-xs">
                    Redirect dalam <span className="font-semibold text-green-600">{countdown}</span> detik...
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-ocean to-ocean-dark hover:from-ocean-dark hover:to-ocean text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-0"
                >
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Kembali ke Beranda
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full bg-white/80 hover:bg-white/90 border-gray-300 text-gray-700 hover:text-gray-900 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300"
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login Kembali
                  </Link>
                </Button>
              </div>

              {/* Professional Info Section */}
              <div className="p-3 bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <h4 className="font-medium text-blue-800 text-xs">
                    Informasi Keamanan
                  </h4>
                </div>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Data Anda tetap aman dan tersimpan dengan enkripsi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Login kembali untuk mengakses dashboard lengkap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Wishlist dan preferensi tetap tersimpan</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Button 
              asChild 
              variant="ghost" 
              className="gap-2 text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-full px-4 transition-all duration-300"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/60 mt-4 p-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Shield className="w-3 h-3 text-green-400" />
            <span>Data Anda aman dan terenkripsi dengan standar tinggi</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.2;
            }
            50% {
              transform: translateY(-15px) rotate(90deg);
              opacity: 0.6;
            }
          }
          
          .animate-float {
            animation: float 7s ease-in-out infinite;
          }
        `
      }} />
    </>
  );
};

export default LogoutPage;


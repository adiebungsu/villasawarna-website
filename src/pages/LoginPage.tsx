import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Shield, Users, Star, Heart, CheckCircle, Globe, Lock, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import GoogleAuth from '@/components/GoogleAuth';
import { useAuth } from '@/context/use-auth';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect user yang sudah login ke dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
      <SEO 
        title="Login | Villa Sawarna"
        description="Login ke Villa Sawarna untuk mengakses dashboard, wishlist, dan fitur lainnya"
        keywords="login villa sawarna, google oauth, dashboard pengguna"
        url="https://villasawarna.com/login"
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-ocean/5 via-sand-light/10 to-coral/5 dark:from-ocean/10 dark:via-sand-light/5 dark:to-coral/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo & Back Button */}
          <div className="text-center mb-8">
            <div className="mb-6">
                             <img 
                 src="/images/logo-villasawarna.png" 
                 alt="Villa Sawarna Logo" 
                 className="h-24 mx-auto"
                 onError={(e) => {
                   // Fallback jika logo tidak ditemukan
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                 }}
               />
                             <div className="hidden inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-ocean/10 to-coral/10 dark:from-ocean/20 dark:to-coral/20 rounded-2xl">
                 <Shield className="w-12 h-12 text-ocean dark:text-ocean-light" />
               </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Villa Sawarna
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Login ke akun Anda
            </p>
          </div>

          {/* Login Card */}
          <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
            <CardContent className="p-6">
              {/* Google OAuth Login */}
              <div className="text-center mb-6">
                <GoogleAuth />
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full dark:bg-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400 font-medium">Atau gunakan metode lain</span>
                </div>
              </div>

              {/* Alternative Login Options */}
              <div className="space-y-3 mb-6">
                <Button variant="outline" className="w-full h-11 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800" disabled>
                  <Globe className="w-4 h-4 mr-2" />
                  Login dengan Email
                </Button>
                <Button variant="outline" className="w-full h-11 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800" disabled>
                  <Smartphone className="w-4 h-4 mr-2" />
                  Login dengan WhatsApp
                </Button>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
                  Belum punya akun?
                </p>
                <Button asChild variant="link" className="text-ocean hover:text-ocean-dark dark:text-ocean-light dark:hover:text-ocean font-medium">
                  <Link to="/register">
                    Daftar Sekarang
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Features */}
          <Card className="mt-6 shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                Fitur Setelah Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-ocean dark:text-ocean-light flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Dashboard pengguna lengkap</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Review & rating properti</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Wishlist pribadi</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-200">Notifikasi real-time</span>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Button asChild variant="ghost" className="gap-2 text-gray-600 dark:text-gray-300 hover:text-ocean dark:hover:text-ocean-light">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>

          {/* Security Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-4">
            <Lock className="w-3 h-3" />
            <span>Data Anda aman dan terenkripsi</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

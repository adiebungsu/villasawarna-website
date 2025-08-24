import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Shield, Users, Star, Heart, CheckCircle, Globe, Lock, Smartphone, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import GoogleAuth from '@/components/GoogleAuth';
import { useToast } from '@/components/ui/use-toast';

const RegisterPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validasi sederhana
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password tidak cocok",
        description: "Password dan konfirmasi password harus sama",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password terlalu pendek",
        description: "Password minimal 6 karakter",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulasi proses registrasi
    setTimeout(() => {
      toast({
        title: "Registrasi berhasil!",
        description: "Silakan login dengan akun yang baru dibuat",
      });
      setIsLoading(false);
      // Redirect ke login
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <>
      <SEO 
        title="Daftar | Villa Sawarna"
        description="Daftar akun baru di Villa Sawarna untuk mengakses semua fitur eksklusif"
        keywords="daftar villa sawarna, register, akun baru, google oauth"
        url="https://villasawarna.com/register"
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-ocean/5 via-sand-light/10 to-coral/5 dark:from-ocean/10 dark:via-sand-light/5 dark:to-coral/10">
        {/* Header Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="container mx-auto px-4 py-4">
            <Button asChild variant="ghost" className="gap-2 text-gray-600 dark:text-gray-300 hover:text-ocean dark:hover:text-ocean-light">
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Side - Register Form */}
              <div className="space-y-8">
                {/* Welcome Section */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ocean/10 to-coral/10 dark:from-ocean/20 dark:to-coral/20 rounded-2xl mb-6">
                    <Shield className="w-10 h-10 text-ocean dark:text-ocean-light" />
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Daftar Akun Baru
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md lg:max-w-none">
                    Buat akun untuk mengakses semua fitur eksklusif Villa Sawarna
                  </p>
                </div>

                {/* Register Options */}
                <div className="space-y-6">
                  {/* Google OAuth Register */}
                  <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        Daftar dengan Google
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Lebih cepat dan aman
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <GoogleAuth />
                    </CardContent>
                  </Card>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full dark:bg-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-gradient-to-br from-ocean/5 via-sand-light/10 to-coral/5 dark:from-ocean/10 dark:via-sand-light/5 dark:to-coral/10 px-4 text-gray-500 dark:text-gray-400 font-medium">Atau daftar dengan email</span>
                    </div>
                  </div>

                  {/* Email Register Form */}
                  <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                    <CardContent className="p-8">
                      <form onSubmit={handleEmailRegister} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nama Lengkap</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Masukkan nama lengkap"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="contoh@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Nomor Telepon</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="+62 812-3456-7890"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Konfirmasi Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Ulangi password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full h-12 text-base bg-ocean hover:bg-ocean-dark dark:bg-ocean-light dark:hover:bg-ocean"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Membuat Akun...
                            </>
                          ) : (
                            'Daftar Sekarang'
                          )}
                        </Button>
                      </form>

                      {/* Login Link */}
                      <div className="text-center mt-6">
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Sudah punya akun?
                        </p>
                        <Button asChild variant="link" className="text-ocean hover:text-ocean-dark dark:text-ocean-light dark:hover:text-ocean text-lg font-medium">
                          <Link to="/login">
                            Login Sekarang
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Security Info */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>Data Anda aman dan terenkripsi</span>
                </div>
              </div>

              {/* Right Side - Benefits */}
              <div className="space-y-8">
                {/* Benefits Card */}
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Keuntungan Daftar Akun
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                      Nikmati pengalaman yang lebih personal dan lengkap
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-ocean/5 to-ocean/10 dark:from-ocean/10 dark:to-ocean/20 border border-ocean/20 dark:border-ocean/30">
                        <div className="w-12 h-12 bg-ocean/20 dark:bg-ocean/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-ocean dark:text-ocean-light" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Akses Eksklusif</h4>
                          <p className="text-gray-600 dark:text-gray-300">Dapatkan akses ke konten dan fitur yang hanya tersedia untuk member</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-coral/5 to-coral/10 dark:from-coral/10 dark:to-coral/20 border border-coral/20 dark:border-coral/30">
                        <div className="w-12 h-12 bg-coral/20 dark:bg-coral/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Star className="w-6 h-6 text-coral dark:text-coral-light" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Booking Prioritas</h4>
                          <p className="text-gray-600 dark:text-gray-300">Booking properti dengan prioritas dan notifikasi real-time</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-sand/5 to-sand/10 dark:from-sand/10 dark:to-sand/20 border border-sand/20 dark:border-sand/30">
                        <div className="w-12 h-12 bg-sand/20 dark:bg-sand/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-sand dark:text-sand-light" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Personalized Experience</h4>
                          <p className="text-gray-600 dark:text-gray-300">Rekomendasi dan konten yang disesuaikan dengan preferensi Anda</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Features List */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-ocean/5 to-coral/5 dark:from-ocean/10 dark:to-coral/10 border border-ocean/20 dark:border-ocean/30">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      Fitur Member
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-ocean dark:text-ocean-light flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">Dashboard personal dengan statistik</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-ocean dark:text-ocean-light flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">Wishlist dan bookmark properti</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-ocean dark:text-ocean-light flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">Review dan rating properti</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-ocean dark:text-ocean-light flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">Notifikasi promo dan update</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-ocean dark:text-ocean-light flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-200">Support prioritas 24/7</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Help Section */}
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Butuh Bantuan?</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Tim support kami siap membantu proses pendaftaran
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button asChild variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link to="/contact">Hubungi Kami</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link to="/help">Pusat Bantuan</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

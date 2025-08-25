import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Users, Star, Heart, CheckCircle, Globe, Lock, Smartphone, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import GoogleAuth from '@/components/GoogleAuth';
import { useAuth } from '@/context/use-auth';
import { useToast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  // First-visit entrance animation
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  useEffect(() => {
    const isFirstVisit = typeof window !== 'undefined' && localStorage.getItem('visitedLogin') !== '1';
    if (isFirstVisit) {
      setShouldAnimate(true);
      const t = setTimeout(() => setMounted(true), 50);
      const t2 = setTimeout(() => localStorage.setItem('visitedLogin', '1'), 1200);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
    setMounted(true);
  }, []);
  
  // State untuk login email
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  
  // State untuk login WhatsApp
  const [showWhatsAppLogin, setShowWhatsAppLogin] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [maxOtpAttempts] = useState(3);

  // Redirect user yang sudah login ke dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Handle email login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email dan password harus diisi",
        variant: "destructive"
      });
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Format Email Salah",
        description: "Masukkan format email yang valid",
        variant: "destructive"
      });
      return;
    }

    // Validasi password minimal
    if (password.length < 6) {
      toast({
        title: "Password Terlalu Pendek",
        description: "Password minimal 6 karakter",
        variant: "destructive"
      });
      return;
    }

    setIsEmailLoading(true);
    try {
      // Simulasi proses login email
      toast({
        title: "Memverifikasi...",
        description: "Sedang memverifikasi email dan password",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Untuk demo, buat user object yang sesuai dengan struktur AuthUser
      const demoUser = {
        id: 'email-user-' + Date.now(),
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        profileImage: null,
        createdAt: new Date().toISOString(),
        loginMethod: 'email'
      };
      
      // Simpan ke localStorage dan update auth context
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      toast({
        title: "Login Berhasil",
        description: "Selamat datang kembali!",
      });
      
      // Trigger page reload untuk memuat user baru
      window.location.reload();
      
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: "Email atau password salah. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsEmailLoading(false);
    }
  };

  // Handle WhatsApp login - Step 1: Kirim OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber) {
      toast({
        title: "Error",
        description: "Nomor WhatsApp harus diisi",
        variant: "destructive"
      });
      return;
    }

    // Validasi format nomor WhatsApp
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(whatsappNumber.replace(/\s/g, ''))) {
      toast({
        title: "Format Nomor Salah",
        description: "Masukkan nomor WhatsApp yang valid (contoh: 08123456789)",
        variant: "destructive"
      });
      return;
    }

    setIsWhatsAppLoading(true);
    try {
      // Generate OTP baru setiap kali dikirim
      const newOtp = generateRandomOtp();
      setGeneratedOtp(newOtp);
      
      // Simulasi pengiriman OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "OTP Dikirim!",
        description: `Kode OTP telah dikirim ke ${whatsappNumber}. Cek WhatsApp Anda.`,
      });
      
      // Set state untuk menampilkan form OTP
      setOtpSent(true);
      setOtpTimer(30); // 30 detik countdown
      setCanResendOtp(false);
      setOtpAttempts(0); // Reset attempts
      
      // Log OTP untuk testing (hapus di production)
      console.log(`🧪 Demo OTP untuk ${whatsappNumber}: ${newOtp}`);
      
    } catch (error) {
      toast({
        title: "Gagal Kirim OTP",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsWhatsAppLoading(false);
    }
  };

  // Handle WhatsApp login - Step 2: Verifikasi OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      toast({
        title: "Error",
        description: "Masukkan kode OTP yang diterima",
        variant: "destructive"
      });
      return;
    }

    if (otpCode.length !== 6) {
      toast({
        title: "Format OTP Salah",
        description: "Kode OTP harus 6 digit",
        variant: "destructive"
      });
      return;
    }

    // Check if max attempts exceeded
    if (isMaxAttemptsExceeded()) {
      toast({
        title: "Terlalu Banyak Percobaan",
        description: "Anda telah melebihi batas maksimal percobaan. Silakan kirim OTP baru.",
        variant: "destructive"
      });
      return;
    }

    setIsWhatsAppLoading(true);
    try {
      // Increment attempts
      setOtpAttempts(prev => prev + 1);
      
      // Validate OTP
      if (!validateOtp(otpCode)) {
        const remainingAttempts = maxOtpAttempts - (otpAttempts + 1);
        
        if (remainingAttempts > 0) {
          toast({
            title: "OTP Salah!",
            description: `Kode OTP tidak valid. Sisa percobaan: ${remainingAttempts}`,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Terlalu Banyak Percobaan",
            description: "Anda telah melebihi batas maksimal percobaan. Silakan kirim OTP baru.",
            variant: "destructive"
          });
          // Reset form untuk kirim OTP baru
          setOtpSent(false);
          setOtpCode('');
          setOtpAttempts(0);
        }
        return;
      }

      // Simulasi verifikasi OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Untuk demo, buat user object yang sesuai dengan struktur AuthUser
      const demoUser = {
        id: 'whatsapp-user-' + Date.now(),
        email: `${whatsappNumber}@whatsapp.com`,
        name: `User ${whatsappNumber.slice(-4)}`, // Ambil 4 digit terakhir
        profileImage: null,
        createdAt: new Date().toISOString(),
        phoneNumber: whatsappNumber,
        loginMethod: 'whatsapp'
      };
      
      // Simpan ke localStorage dan update auth context
      localStorage.setItem('user', JSON.stringify(demoUser));
      
      toast({
        title: "Login Berhasil!",
        description: "Selamat datang kembali!",
      });
      
      // Trigger page reload untuk memuat user baru
      window.location.reload();
      
    } catch (error) {
      toast({
        title: "Verifikasi Gagal",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsWhatsAppLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResendOtp) return;
    
    setIsWhatsAppLoading(true);
    try {
      // Generate OTP baru setiap kali resend
      const newOtp = generateRandomOtp();
      setGeneratedOtp(newOtp);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "OTP Dikirim Ulang",
        description: `Kode OTP baru telah dikirim ke ${whatsappNumber}`,
      });
      
      setOtpTimer(30);
      setCanResendOtp(false);
      setOtpAttempts(0); // Reset attempts
      setOtpCode(''); // Clear previous input
      
      // Log OTP baru untuk testing (hapus di production)
      console.log(`🧪 Demo OTP Baru untuk ${whatsappNumber}: ${newOtp}`);
      
    } catch (error) {
      toast({
        title: "Gagal Kirim OTP",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsWhatsAppLoading(false);
    }
  };

  // Reset form states
  const resetForms = () => {
    setShowEmailLogin(false);
    setShowWhatsAppLogin(false);
    setEmail('');
    setPassword('');
    setWhatsappNumber('');
    setOtpSent(false);
    setOtpCode('');
    setOtpTimer(0);
    setCanResendOtp(false);
    setGeneratedOtp('');
    setOtpAttempts(0);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/logout');
  };

  // Timer untuk OTP countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Format timer untuk display
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate OTP random 6 digit
  const generateRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Validate OTP input
  const validateOtp = (inputOtp: string) => {
    return inputOtp === generatedOtp;
  };

  // Check if user exceeded max attempts
  const isMaxAttemptsExceeded = () => {
    return otpAttempts >= maxOtpAttempts;
  };

  return (
    <>
      <SEO 
        title="Login | Villa Sawarna"
        description="Login ke Villa Sawarna untuk mengakses dashboard, wishlist, dan fitur lainnya"
        keywords="login villa sawarna, google oauth, dashboard pengguna"
        url="https://villasawarna.com/login"
        type="website"
      />
      
      <div className="min-h-screen relative p-4 lg:p-0">
        {/* Full-page background image */}
        <div 
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/karang-taraje-sawarna.webp')` }}
        />
        {/* White gradient from bottom to middle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/95 via-white/70 to-transparent" />
         <div className="relative z-10 mx-auto grid w-full max-w-6xl lg:grid-cols-2 lg:min-h-screen">
           {/* Left Hero */}
          <div className={`relative hidden lg:flex min-h-screen ${shouldAnimate ? (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4') : ''} transition-all duration-700`}>
            <div className="relative z-10 flex h-full flex-col justify-between p-12">
              <div>
                
                <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white drop-shadow-xl">
                  Satu akun untuk pengalaman menginap yang lebih mudah
            </h1>
                <p className="mt-3 text-white text-lg max-w-xl">
                  Simpan wishlist, kelola booking, dan dapatkan promo eksklusif untuk liburan ke Sawarna.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 max-w-xl">
                <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-gray-900/90 p-4 shadow-sm">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-sm text-gray-900 dark:text-white">Wishlist & pengingat harga</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-gray-900/90 p-4 shadow-sm">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm text-gray-900 dark:text-white">Ulasan & rating terpercaya</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-gray-900/90 p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm text-gray-900 dark:text-white">Proses login cepat & aman</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-gray-900/90 p-4 shadow-sm">
                  <Globe className="w-5 h-5 text-blue-300" />
                  <span className="text-sm text-gray-900 dark:text-white">Akses dari perangkat apa pun</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-gray-900/90 p-4 shadow-sm">
                  <Shield className="w-5 h-5 text-white/80" />
                  <span className="text-sm text-gray-900 dark:text-white">Promo eksklusif untuk member</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/95 dark:bg-gray-900/90 p-4 shadow-sm">
                  <Users className="w-5 h-5 text-white/80" />
                  <span className="text-sm text-gray-900 dark:text-white">Dukungan pelanggan 24/7</span>
                </div>
              </div>
              <div className="text-white text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  Data Anda aman & terenkripsi
                </div>
              </div>
            </div>
          </div>

          {/* Right Form column */}
          <div className={`relative flex items-center justify-center py-10 lg:py-0 bg-gradient-to-b from-white to-white/70 dark:from-gray-950 dark:to-gray-900/80 ${shouldAnimate ? (mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4') : ''} transition-all duration-700`} style={shouldAnimate ? { transitionDelay: mounted ? '150ms' : undefined } : undefined}>
            <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-ocean/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-coral/10 blur-3xl" />

            <div className="relative z-10 w-full max-w-md px-4">
              <div className="mb-6 text-center lg:hidden">
                <img 
                  src="/images/logo-villasawarna.png" 
                  alt="Villa Sawarna Logo" 
                  className="h-14 mx-auto"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement | null)?.classList.remove('hidden');
                  }}
                />
                <h2 className="mt-4 text-2xl font-bold">Login ke akun Anda</h2>
                <p className="text-gray-600 dark:text-gray-400">Nikmati fitur lengkap Villa Sawarna</p>

                {/* Mobile benefits grid */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-left">
                  <div className="flex items-center gap-2 rounded-lg bg-white/95 dark:bg-gray-900/90 p-3 shadow-sm">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-gray-900 dark:text-white">Wishlist & pengingat harga</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/95 dark:bg-gray-900/90 p-3 shadow-sm">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="text-xs text-gray-900 dark:text-white">Ulasan & rating terpercaya</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/95 dark:bg-gray-900/90 p-3 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-xs text-gray-900 dark:text-white">Login cepat & aman</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/95 dark:bg-gray-900/90 p-3 shadow-sm">
                    <Globe className="w-4 h-4 text-blue-300" />
                    <span className="text-xs text-gray-900 dark:text-white">Akses dari perangkat apa pun</span>
                  </div>
                </div>
              </div>

              {/* Desktop-only logo above login card */}
              <div className="hidden lg:block text-center mb-6">
                <img 
                  src="/images/logo-villasawarna.png" 
                  alt="Villa Sawarna Logo" 
                  className="h-24 mx-auto"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Villa Sawarna</div>
              </div>
              {/* Desktop: centered login card */}
              <div className="lg:flex lg:items-center lg:justify-center">
          {/* Login Card */}
                <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md flex-1">
            <CardContent className="p-3">
              {/* Google OAuth Login */}
              <div className="text-center mb-3">
                <GoogleAuth />
              </div>

              <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full dark:bg-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400 font-medium">Atau gunakan metode lain</span>
                </div>
              </div>

              {/* Alternative Login Options */}
              <div className="space-y-2 mb-3">
                {/* Email Login Button */}
                {!showEmailLogin && !showWhatsAppLogin && (
                  <Button 
                    variant="outline" 
                    className="w-full h-11 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => {
                      resetForms();
                      setShowEmailLogin(true);
                    }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Login dengan Email
                  </Button>
                )}

                {/* WhatsApp Login Button */}
                {!showEmailLogin && !showWhatsAppLogin && (
                  <Button 
                    variant="outline" 
                    className="w-full h-11 text-sm dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => {
                      resetForms();
                      setShowWhatsAppLogin(true);
                    }}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Login dengan WhatsApp
                  </Button>
                )}

                {/* Email Login Form */}
                {showEmailLogin && (
                  <form onSubmit={handleEmailLogin} className="space-y-2 p-2 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg border backdrop-blur-sm">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password Anda"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-ocean hover:bg-ocean-dark text-white"
                        disabled={isEmailLoading}
                      >
                        {isEmailLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Login'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForms}
                        className="px-4"
                      >
                        Batal
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <Button asChild variant="link" className="text-sm text-gray-600 dark:text-gray-400 hover:text-ocean">
                        <Link to="/forgot-password">
                          Lupa Password?
                        </Link>
                      </Button>
                    </div>
                  </form>
                )}

                {/* WhatsApp Login Form */}
                {showWhatsAppLogin && !otpSent && (
                  <form onSubmit={handleSendOtp} className="space-y-3 p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg border backdrop-blur-sm">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nomor WhatsApp
                      </Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="Contoh: 08123456789"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Kami akan mengirimkan kode OTP ke nomor WhatsApp Anda
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        disabled={isWhatsAppLoading}
                      >
                        {isWhatsAppLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Kirim OTP...
                          </>
                        ) : (
                          'Kirim OTP'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForms}
                        className="px-4"
                      >
                        Batal
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Pastikan nomor WhatsApp aktif dan dapat menerima pesan
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                        <Smartphone className="w-3 h-3" />
                        <span>OTP akan dikirim dalam 30 detik</span>
                      </div>
                    </div>
                  </form>
                )}

                {/* OTP Verification Form */}
                {showWhatsAppLogin && otpSent && (
                  <form onSubmit={handleVerifyOtp} className="space-y-3 p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg border backdrop-blur-sm">
                    <div className="text-center mb-3">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        Verifikasi OTP
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Masukkan kode 6 digit yang dikirim ke {whatsappNumber}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Kode OTP
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className={`text-center text-lg font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          otpAttempts >= maxOtpAttempts - 1 ? 'border-red-500 focus:border-red-500' : ''
                        }`}
                        maxLength={6}
                        required
                      />
                      
                      {/* Warning when attempts are low */}
                      {otpAttempts >= maxOtpAttempts - 1 && otpAttempts > 0 && (
                        <div className="p-2 bg-red-50/80 dark:bg-red-900/30 border border-red-200/80 dark:border-red-800/80 rounded-lg backdrop-blur-sm">
                          <p className="text-xs text-red-700 dark:text-red-300 text-center">
                            ⚠️ Hati-hati! Hanya tersisa 1 percobaan lagi
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        disabled={isWhatsAppLoading || otpCode.length !== 6}
                      >
                        {isWhatsAppLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifikasi...
                          </>
                        ) : (
                          'Verifikasi OTP'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForms}
                        className="px-4"
                      >
                        Batal
                      </Button>
                    </div>

                    <div className="text-center space-y-2">
                      {otpTimer > 0 ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Kirim ulang dalam: <span className="font-mono text-blue-600">{formatTimer(otpTimer)}</span>
                        </p>
                      ) : (
                        <Button
                          type="button"
                          variant="link"
                          onClick={handleResendOtp}
                          disabled={!canResendOtp || isWhatsAppLoading}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Kirim Ulang OTP
                        </Button>
                      )}
                      
                      {/* Demo OTP Info */}
                      <div className="p-2 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/80 dark:border-blue-800/80 rounded-lg backdrop-blur-sm">
                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">
                          🧪 Demo Mode - Untuk Testing
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Kode OTP: <span className="font-mono font-bold">{generatedOtp}</span>
                        </p>
                        <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                          (Lihat di console browser untuk OTP yang baru)
                        </p>
                      </div>
                      
                      {/* Attempts Info */}
                      <div className="text-center">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Sisa percobaan: <span className={`font-semibold ${otpAttempts >= maxOtpAttempts - 1 ? 'text-red-600' : 'text-blue-600'}`}>
                            {Math.max(0, maxOtpAttempts - otpAttempts)}
                          </span>
                        </p>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Pastikan nomor WhatsApp aktif dan dapat menerima pesan
                      </p>
                    </div>
                  </form>
                )}
                  </div>
                  </CardContent>
                </Card>
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
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

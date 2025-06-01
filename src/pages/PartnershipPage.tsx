import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Building2, Users, Shield, CreditCard, MessageSquare, ArrowRight, Star, TrendingUp, Calendar, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import OptimizedImage from '@/components/OptimizedImage';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const PartnershipPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    propertyName: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validasi nama
    if (!formData.name.trim()) {
      newErrors.name = 'Nama tidak boleh kosong';
    }

    // Validasi nama properti
    if (!formData.propertyName.trim()) {
      newErrors.propertyName = 'Nama properti tidak boleh kosong';
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email tidak boleh kosong';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Validasi nomor telepon
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon tidak boleh kosong';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    // Validasi alamat
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat tidak boleh kosong';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon periksa kembali form Anda",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      const response = await fetch('http://192.168.43.151:3001/api/partnership/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyType: formData.propertyName,
          propertyLocation: formData.address,
          propertyDetails: formData.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Terjadi kesalahan saat mengirim formulir');
      }

      setSubmissionStatus('success');
      setFormData({
        name: '',
        propertyName: '',
        email: '',
        phone: '',
        address: '',
        message: ''
      });
      setErrors({});
      
      toast({
        title: "Pendaftaran Berhasil!",
        description: data.message || "Terima kasih, tim kami akan segera menghubungi Anda.",
      });
    } catch (error) {
      setSubmissionStatus('error');
      toast({
        title: "Gagal Mengirim Pendaftaran",
        description: error instanceof Error ? error.message : "Terjadi kesalahan jaringan atau server. Silakan coba lagi nanti.",
        variant: "destructive",
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Hapus error saat user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const benefits = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Peningkatan Visibilitas",
      description: "Tampilkan properti Anda di platform kami yang dikunjungi ribuan wisatawan setiap hari."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Jangkauan Luas",
      description: "Akses ke jaringan wisatawan lokal dan internasional yang mencari akomodasi di Sawarna."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Manajemen Terpercaya",
      description: "Sistem booking dan pembayaran yang aman dan terpercaya untuk setiap transaksi."
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Pembayaran Fleksibel",
      description: "Pembayaran langsung ke rekening Anda dengan berbagai metode pembayaran yang tersedia."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Dukungan 24/7",
      description: "Tim support kami siap membantu Anda kapan saja untuk memastikan pengalaman terbaik."
    }
  ];

  const stats = [
    { value: "50+", label: "Properti Aktif", icon: <Building2 className="w-5 h-5" /> },
    { value: "1000+", label: "Tamu Puas", icon: <Users className="w-5 h-5" /> },
    { value: "95%", label: "Tingkat Kepuasan", icon: <Star className="w-5 h-5" /> },
    { value: "24/7", label: "Dukungan", icon: <Clock className="w-5 h-5" /> }
  ];

  const scrollToForm = () => {
    const formSection = document.getElementById('registration-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section dengan Background Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-8 md:p-12 mb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Bergabung Bersama Kami
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Tingkatkan visibilitas dan pendapatan properti Anda dengan bergabung dalam jaringan akomodasi terpercaya di Sawarna
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={scrollToForm}>
            Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-center mb-3">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Benefits Section dengan Desain Baru */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mengapa Bermitra dengan Kami?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Kami menawarkan berbagai keuntungan eksklusif bagi pemilik villa, homestay, dan penginapan yang bergabung dalam jaringan kami.
            Fokus kami adalah membantu Anda meningkatkan okupansi dan memberikan pengalaman terbaik bagi tamu.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-primary">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section dengan Timeline */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bagaimana Cara Bergabung?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">1</div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3 text-center">Daftar</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Isi formulir pendaftaran di bawah ini dengan informasi lengkap tentang properti Anda
                </p>
              </div>
            </Card>
            <Card className="p-6 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">2</div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3 text-center">Verifikasi</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Tim kami akan memverifikasi informasi dan melakukan kunjungan ke properti Anda
                </p>
              </div>
            </Card>
            <Card className="p-6 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10">3</div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-3 text-center">Mulai</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Setelah disetujui, properti Anda akan langsung muncul di platform kami
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Apa Kata Mitra Kami?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
        </div>
        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                alt="Testimonial"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg italic mb-4">
                "Bergabung dengan VillaSawarna adalah keputusan terbaik untuk bisnis kami. Platform mereka membantu meningkatkan okupansi dan memberikan pengalaman booking yang mudah."
              </p>
              <div>
                <p className="font-semibold">Budi Santoso</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pemilik Villa Mutiara Sawarna</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Call to Action dengan Gradient */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Siap Bergabung?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Jangan lewatkan kesempatan untuk mengembangkan bisnis properti Anda. Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda!
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700" onClick={scrollToForm}>
            Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Registration Form dengan Validasi */}
      <Card id="registration-form-section" className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Formulir Pendaftaran</h2>
        
        {submissionStatus === 'success' && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Pendaftaran Berhasil!</AlertTitle>
            <AlertDescription className="text-green-700">
              Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda.
            </AlertDescription>
          </Alert>
        )}

        {submissionStatus === 'error' && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Gagal Mengirim Pendaftaran</AlertTitle>
            <AlertDescription className="text-red-700">
              Mohon maaf, terjadi kesalahan. Silakan coba lagi nanti.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className={`focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyName">Nama Properti</Label>
              <Input
                id="propertyName"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Masukkan nama villa/homestay"
                className={`focus:ring-2 focus:ring-primary ${errors.propertyName ? 'border-red-500' : ''}`}
              />
              {errors.propertyName && (
                <p className="text-sm text-red-500">{errors.propertyName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className={`focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Masukkan nomor telepon"
                className={`focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Alamat Lengkap</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap properti"
              className={`focus:ring-2 focus:ring-primary dark:text-gray-200 dark:bg-gray-700 ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Pesan Tambahan</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tambahkan informasi lain yang ingin Anda sampaikan"
              className="focus:ring-2 focus:ring-primary dark:text-gray-200 dark:bg-gray-700"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              'Kirim Pendaftaran'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default PartnershipPage; 
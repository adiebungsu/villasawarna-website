import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Shield, Users, Star, Heart, Globe, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useToast } from '@/components/ui/use-toast';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HelpPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqData: FAQItem[] = [
    {
      question: "Bagaimana cara login ke akun saya?",
      answer: "Anda dapat login menggunakan Google OAuth dengan mengklik tombol 'Login dengan Google' di halaman login. Pastikan Anda memiliki akun Google yang aktif.",
      category: "Akun"
    },
    {
      question: "Apakah saya bisa daftar tanpa Google?",
      answer: "Ya, Anda dapat mendaftar menggunakan email dan password. Form pendaftaran tersedia di halaman register dengan validasi yang aman.",
      category: "Akun"
    },
    {
      question: "Bagaimana cara memesan villa?",
      answer: "Pilih villa yang diinginkan, pilih tanggal check-in dan check-out, isi form pemesanan, dan lakukan pembayaran sesuai instruksi yang diberikan.",
      category: "Pemesanan"
    },
    {
      question: "Apakah ada biaya tambahan?",
      answer: "Biaya yang ditampilkan sudah termasuk semua pajak dan biaya layanan. Tidak ada biaya tersembunyi atau biaya tambahan.",
      category: "Pemesanan"
    },
    {
      question: "Bagaimana cara membatalkan pesanan?",
      answer: "Pembatalan dapat dilakukan melalui dashboard akun Anda atau menghubungi customer service. Kebijakan pembatalan mengikuti ketentuan yang berlaku.",
      category: "Pemesanan"
    },
    {
      question: "Apakah ada fitur wishlist?",
      answer: "Ya, setelah login Anda dapat menyimpan villa favorit dalam wishlist pribadi dan mengelompokkannya dalam folder custom.",
      category: "Fitur"
    },
    {
      question: "Bagaimana cara memberikan review?",
      answer: "Review dapat diberikan setelah Anda menginap di villa tersebut. Fitur review tersedia di dashboard akun Anda.",
      category: "Fitur"
    },
    {
      question: "Apakah data saya aman?",
      answer: "Ya, semua data pribadi Anda dienkripsi dan dilindungi sesuai standar keamanan internasional. Kami tidak akan membagikan data Anda kepada pihak ketiga.",
      category: "Keamanan"
    }
  ];

  const toggleFAQ = (index: number) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFAQs(newExpanded);
  };

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan terkirim!",
      description: "Tim kami akan segera menghubungi Anda dalam 24 jam.",
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const categories = ['Semua', 'Akun', 'Pemesanan', 'Fitur', 'Keamanan'];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredByCategory = selectedCategory === 'Semua' 
    ? filteredFAQs 
    : filteredFAQs.filter(faq => faq.category === selectedCategory);

  return (
    <>
      <SEO 
        title="Pusat Bantuan | Villa Sawarna"
        description="Pusat bantuan lengkap untuk semua pertanyaan tentang Villa Sawarna, FAQ, dan kontak support"
        keywords="bantuan villa sawarna, FAQ, support, kontak, troubleshooting"
        url="https://villasawarna.com/help"
        type="website"
        hreflangAlternates={[
          { hrefLang: 'id-ID', href: 'https://villasawarna.com/help' },
          { hrefLang: 'en-US', href: 'https://villasawarna.com/en/help' },
          { hrefLang: 'x-default', href: 'https://villasawarna.com/help' }
        ]}
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
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ocean/10 to-coral/10 dark:from-ocean/20 dark:to-coral/20 rounded-2xl mb-6">
                <HelpCircle className="w-10 h-10 text-ocean dark:text-ocean-light" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Pusat Bantuan
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami yang siap membantu 24/7
              </p>
            </div>

            {/* Search and Categories */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari pertanyaan atau kata kunci..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Side - FAQ */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      Pertanyaan yang Sering Diajukan
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {filteredByCategory.length} pertanyaan ditemukan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredByCategory.length > 0 ? (
                      filteredByCategory.map((faq, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                          >
                            <span className="font-medium text-gray-900 dark:text-white">
                              {faq.question}
                            </span>
                            {expandedFAQs.has(index) ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {expandedFAQs.has(index) && (
                            <div className="px-4 pb-4">
                              <p className="text-gray-600 dark:text-gray-300">
                                {faq.answer}
                              </p>
                              <div className="mt-2">
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-ocean/10 text-ocean dark:bg-ocean/20 dark:text-ocean-light rounded-full">
                                  {faq.category}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                          Tidak ada pertanyaan yang cocok dengan pencarian Anda.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      Aksi Cepat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link to="/login">
                          <Shield className="w-6 h-6" />
                          <span>Login ke Akun</span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link to="/register">
                          <Users className="w-6 h-6" />
                          <span>Daftar Akun Baru</span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link to="/dashboard">
                          <Star className="w-6 h-6" />
                          <span>Dashboard Pengguna</span>
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-auto p-4 flex-col gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link to="/contact">
                          <MessageCircle className="w-6 h-6" />
                          <span>Hubungi Kami</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side - Contact & Info */}
              <div className="space-y-6">
                {/* Contact Form */}
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      Kirim Pertanyaan
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Tim support kami akan segera merespons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nama Lengkap</Label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                          placeholder="contoh@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">Subjek</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                          required
                          placeholder="Subjek pertanyaan"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Pesan</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                          required
                          placeholder="Jelaskan pertanyaan Anda..."
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full bg-ocean hover:bg-ocean-dark dark:bg-ocean-light dark:hover:bg-ocean">
                        Kirim Pertanyaan
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-ocean/5 to-coral/5 dark:from-ocean/10 dark:to-coral/10 border border-ocean/20 dark:border-ocean/30">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      Informasi Kontak
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-ocean dark:text-ocean-light" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Telepon</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">+62 812-3456-7890</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-ocean dark:text-ocean-light" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">support@villasawarna.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-ocean dark:text-ocean-light" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Alamat</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Sawarna, Lebak, Banten</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-ocean dark:text-ocean-light" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Jam Operasional</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">24/7 Support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Time */}
                <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm dark:border-gray-700/50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Waktu Respons</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Email: 2-4 jam<br/>
                      WhatsApp: 15-30 menit<br/>
                      Telepon: Langsung
                    </p>
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

export default HelpPage;

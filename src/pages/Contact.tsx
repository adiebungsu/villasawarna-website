import { useState } from 'react';
import SEO from '@/components/SEO';
import { MapPin, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // Structured data untuk halaman kontak
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Kontak Villa Sawarna",
    "description": "Hubungi tim Villa Sawarna untuk informasi dan bantuan pemesanan akomodasi di Pantai Sawarna",
    "url": "https://villasawarna.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-812-3456-7890",
        "contactType": "customer service",
        "email": "layanan@villasawarna.com",
        "availableLanguage": ["Indonesian", "English"]
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Hubungi Kami | Villa Sawarna"
        description="Hubungi tim Villa Sawarna untuk informasi reservasi, pertanyaan, atau bantuan lainnya. Kami siap membantu Anda merencanakan liburan terbaik di Sawarna."
        keywords="kontak villa sawarna, hubungi villa sawarna, reservasi sawarna, booking sawarna, customer service sawarna"
        url="https://villasawarna.com/contact"
        type="website"
        structuredData={structuredData}
      />
      
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          {/* Mobile Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 lg:hidden"
            style={{
              backgroundImage: "url('https://i.imgur.com/iEOR4l5.jpeg')",
            }}
          ></div>
          {/* Desktop Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 hidden lg:block"
            style={{
              backgroundImage: "url('https://i.imgur.com/7a7zNZK.jpeg')",
            }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-0"></div>
          
          <div className="relative z-10 container-custom py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
              <p className="text-lg text-white/90 mb-4">
                Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda menemukan akomodasi sempurna di Pantai Sawarna.
              </p>
              <p className="text-lg text-white/90">
                Silakan isi formulir di samping atau hubungi kami melalui informasi di bawah ini.
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Info & Form */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Informasi Kontak</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <MapPin className="text-ocean dark:text-ocean-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">Alamat</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Jl. Pantai Sawarna, Desa Sawarna, Kecamatan Bayah,<br />
                        Kabupaten Lebak, Banten, Indonesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ocean dark:text-ocean-light">
                        <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">WhatsApp</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        <a href="https://wa.me/6283877080088" className="hover:text-ocean dark:hover:text-ocean-light">+62 838 7708 0088</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <Mail className="text-ocean dark:text-ocean-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">layanan@villasawarna.com</p>
                      <p className="text-gray-600 dark:text-gray-300">booking@villasawarna.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ocean/10 dark:bg-ocean-light/20 rounded-full p-3 mr-4">
                      <Clock className="text-ocean dark:text-ocean-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">Jam Operasional</h3>
                      <p className="text-gray-600 dark:text-gray-300">Senin - Jumat: 08:00 - 20:00</p>
                      <p className="text-gray-600 dark:text-gray-300">Sabtu - Minggu: 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                {/* Map */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Lokasi Kami</h3>
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15824.663487606448!2d106.33015521908977!3d-6.977660063241462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e428e6e3d2ef643%3A0xf74cc7bd3c9c12ee!2sSawarna%20Beach!5e0!3m2!1sen!2sus!4v1692596444339!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Peta Lokasi VillaSawarna"
                    ></iframe>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <div className="bg-sky-50 dark:bg-gray-800 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Kirim Pesan</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nama Lengkap
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Masukkan nama lengkap"
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Masukkan email"
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nomor Telepon
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Masukkan nomor telepon"
                            className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Subjek
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="Subjek pesan"
                          className="dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pesan
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          required
                          placeholder="Tuliskan pesan Anda"
                          className="resize-none dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-coral hover:bg-coral-dark w-full flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                        {!isSubmitting && <Send size={18} />}
                      </Button>
                    </div>
                  </form>
                </div>
                
                {/* FAQ */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Pertanyaan Umum</h3>
                  
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Bagaimana cara melakukan reservasi?</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Anda dapat melakukan reservasi melalui website kami dengan memilih properti yang diinginkan dan mengikuti langkah-langkah reservasi, atau menghubungi tim kami melalui WhatsApp atau email.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Apa perbedaan antara villa dan homestay?</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Villa menawarkan privasi dan kemewahan dengan fasilitas lengkap dan staf dedicated, sedangkan homestay menawarkan pengalaman tinggal bersama penduduk lokal dengan harga yang lebih terjangkau.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white mb-2">Apakah ada layanan antar-jemput dari stasiun atau bandara?</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Ya, kami menyediakan layanan antar-jemput dari stasiun kereta atau bandara terdekat dengan biaya tambahan. Silakan hubungi kami untuk informasi lebih lanjut.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-ocean text-white py-16">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Bergabunglah Dengan Newsletter Kami</h2>
              <p className="text-white/90 mb-8">
                Dapatkan info terbaru dan penawaran eksklusif untuk liburan di Pantai Sawarna langsung ke email Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input 
                  placeholder="Alamat email Anda" 
                  className="bg-white text-gray-800"
                />
                <Button className="bg-coral hover:bg-coral-dark whitespace-nowrap">
                  Berlangganan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Users, CreditCard, AlertCircle, Shield, FileText, Phone, Mail } from "lucide-react";
import SEO from '@/components/SEO';

const TermsAndConditions = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Syarat dan Ketentuan - Villa Sawarna",
    "description": "Syarat dan ketentuan penggunaan layanan Villa Sawarna, termasuk kebijakan pemesanan, pembatalan, dan privasi.",
    "url": "https://villasawarna.com/terms",
    "publisher": {
      "@type": "Organization",
      "name": "Villa Sawarna",
      "url": "https://villasawarna.com"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Syarat dan Ketentuan | Villa Sawarna"
        description="Syarat dan ketentuan penggunaan layanan Villa Sawarna, termasuk kebijakan pemesanan, pembatalan, dan privasi. Baca informasi lengkap tentang aturan dan ketentuan yang berlaku."
        keywords="syarat dan ketentuan villa sawarna, kebijakan pemesanan, kebijakan pembatalan, privasi villa sawarna, aturan penginapan sawarna"
        url="https://villasawarna.com/terms"
        type="website"
        structuredData={structuredData}
        openGraph={{
          type: 'website',
          article: {
            section: 'legal',
            tags: ['terms', 'kebijakan', 'aturan']
          }
        }}
      />
      <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm dark:text-gray-300">
          <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Beranda</Link>
          <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white font-medium">Syarat & Ketentuan</span>
        </div>

        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300" 
          asChild
        >
          <Link to="/">
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-ocean dark:text-coral">Syarat & Ketentuan</h1>
          
          {/* Terakhir Diperbarui */}
          <div className="bg-blue-50 dark:bg-gradient-to-r dark:from-blue-950 dark:via-blue-900 dark:to-blue-950 border-l-4 border-blue-500 dark:border-blue-400 p-4 mb-8">
            <p className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Clock size={16} />
              Terakhir diperbarui: 1 Maret 2024
            </p>
          </div>

          {/* Daftar Isi */}
          <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Daftar Isi</h2>
            <ul className="space-y-2">
              <li><a href="#pemesanan" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">1. Pemesanan & Pembayaran</a></li>
              <li><a href="#checkin" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">2. Check-in & Check-out</a></li>
              <li><a href="#pembatalan" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">3. Kebijakan Pembatalan</a></li>
              <li><a href="#fasilitas" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">4. Fasilitas & Layanan</a></li>
              <li><a href="#tamu" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">5. Aturan untuk Tamu</a></li>
              <li><a href="#keamanan" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">6. Keamanan & Tanggung Jawab</a></li>
              <li><a href="#privasi" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">7. Kebijakan Privasi</a></li>
              <li><a href="#perubahan" className="text-ocean hover:underline dark:text-coral dark:hover:text-coral-light">8. Perubahan Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* 1. Pemesanan & Pembayaran */}
          <section id="pemesanan" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <CreditCard size={24} />
              1. Pemesanan & Pembayaran
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>1.1. Proses Pemesanan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pemesanan dapat dilakukan melalui WhatsApp, telepon, atau website resmi</li>
                <li>Konfirmasi ketersediaan kamar akan diberikan dalam waktu 1x24 jam</li>
                <li>Pemesanan dianggap sah setelah pembayaran DP diterima</li>
              </ul>

              <p>1.2. Pembayaran:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Down Payment (DP) sebesar 50% dari total biaya</li>
                <li>Pembayaran DP harus dilakukan dalam waktu 24 jam setelah konfirmasi</li>
                <li>Pembayaran dapat dilakukan melalui transfer bank atau e-wallet</li>
                <li>Pelunasan dilakukan saat check-in</li>
              </ul>

              <p>1.3. Metode Pembayaran:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transfer Bank: BCA, Mandiri, BNI</li>
                <li>E-wallet: GoPay, OVO, DANA</li>
                <li>QRIS untuk pembayaran instan</li>
              </ul>
            </div>
          </section>

          {/* 2. Check-in & Check-out */}
          <section id="checkin" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <Clock size={24} />
              2. Check-in & Check-out
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>2.1. Waktu Check-in:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Check-in mulai pukul 14.00 WIB</li>
                <li>Check-in lebih awal dapat dilakukan jika kamar tersedia</li>
                <li>Check-in setelah pukul 20.00 WIB harus dikonfirmasi terlebih dahulu</li>
              </ul>

              <p>2.2. Waktu Check-out:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Check-out paling lambat pukul 12.00 WIB</li>
                <li>Check-out lebih awal tidak ada pengembalian dana</li>
                <li>Keterlambatan check-out akan dikenakan biaya tambahan</li>
              </ul>

              <p>2.3. Prosedur Check-in:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menyerahkan identitas (KTP/Paspor) untuk didata</li>
                <li>Melakukan pembayaran pelunasan</li>
                <li>Menerima kunci dan penjelasan fasilitas</li>
              </ul>
            </div>
          </section>

          {/* 3. Kebijakan Pembatalan */}
          <section id="pembatalan" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <AlertCircle size={24} />
              3. Kebijakan Pembatalan
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>3.1. Pembatalan oleh Tamu:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>7 hari sebelum check-in: DP dapat dikembalikan 100%</li>
                <li>3-6 hari sebelum check-in: DP dapat dikembalikan 50%</li>
                <li>Kurang dari 3 hari: DP tidak dapat dikembalikan</li>
                <li>DP dapat digunakan untuk booking ulang dalam 3 bulan</li>
              </ul>

              <p>3.2. Pembatalan oleh Villa:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Villa berhak membatalkan booking dalam kondisi force majeure</li>
                <li>DP akan dikembalikan 100% jika pembatalan dari pihak villa</li>
                <li>Villa akan memberikan alternatif penginapan jika memungkinkan</li>
              </ul>
            </div>
          </section>

          {/* 4. Fasilitas & Layanan */}
          <section id="fasilitas" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <FileText size={24} />
              4. Fasilitas & Layanan
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>4.1. Fasilitas Standar:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>AC di setiap kamar</li>
                <li>WiFi gratis</li>
                <li>Parkir luas</li>
                <li>Dapur lengkap</li>
                <li>TV LED</li>
                <li>Kamar mandi dalam</li>
              </ul>

              <p>4.2. Layanan Tambahan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Transfer bandara (berbayar)</li>
                <li>Sewa kendaraan</li>
                <li>Chef & catering</li>
                <li>Cleaning service</li>
                <li>Aktivitas pantai</li>
                <li>Fotografer</li>
              </ul>

              <p>4.3. Ketentuan Fasilitas:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fasilitas rusak karena kelalaian tamu akan dikenakan biaya perbaikan</li>
                <li>Penggunaan fasilitas tambahan harus dipesan minimal 1 hari sebelumnya</li>
                <li>Fasilitas dapat berubah sewaktu-waktu tanpa pemberitahuan</li>
              </ul>
            </div>
          </section>

          {/* 5. Aturan untuk Tamu */}
          <section id="tamu" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <Users size={24} />
              5. Aturan untuk Tamu
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>5.1. Jumlah Tamu:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Jumlah tamu harus sesuai dengan kapasitas kamar</li>
                <li>Tamu tambahan harus dikonfirmasi terlebih dahulu</li>
                <li>Biaya tambahan untuk tamu lebih dari kapasitas</li>
              </ul>

              <p>5.2. Aturan Umum:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dilarang membawa hewan peliharaan</li>
                <li>Dilarang merokok di dalam kamar</li>
                <li>Dilarang mengadakan pesta tanpa izin</li>
                <li>Menjaga ketenangan setelah pukul 22.00 WIB</li>
                <li>Menjaga kebersihan dan kerapian villa</li>
              </ul>

              <p>5.3. Keamanan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kunci harus dikembalikan saat check-out</li>
                <li>Barang berharga disimpan di tempat aman</li>
                <li>Melaporkan kerusakan fasilitas segera</li>
              </ul>
            </div>
          </section>

          {/* 6. Keamanan & Tanggung Jawab */}
          <section id="keamanan" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <Shield size={24} />
              6. Keamanan & Tanggung Jawab
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>6.1. Tanggung Jawab Villa:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menjaga keamanan dan kenyamanan tamu</li>
                <li>Memastikan fasilitas berfungsi dengan baik</li>
                <li>Memberikan bantuan darurat 24 jam</li>
              </ul>

              <p>6.2. Tanggung Jawab Tamu:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menjaga keamanan barang pribadi</li>
                <li>Mengikuti aturan dan ketentuan yang berlaku</li>
                <li>Melaporkan kerusakan atau masalah segera</li>
              </ul>

              <p>6.3. Kontak Darurat:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>WhatsApp: <a href="https://wa.me/6283877080088" className="hover:underline dark:hover:text-coral-light">0838-7708-0088</a></li>
                <li>Email: layanan@villasawarna.com</li>
              </ul>
            </div>
          </section>

          {/* 7. Kebijakan Privasi */}
          <section id="privasi" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <Shield size={24} />
              7. Kebijakan Privasi
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>7.1. Data Pribadi:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data tamu akan dijaga kerahasiaannya</li>
                <li>Data hanya digunakan untuk keperluan booking</li>
                <li>Tamu berhak meminta penghapusan data</li>
                <li>Data tidak akan dibagikan ke pihak ketiga tanpa izin</li>
              </ul>

              <p>7.2. Penggunaan Data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Untuk konfirmasi booking</li>
                <li>Untuk komunikasi terkait layanan</li>
                <li>Untuk peningkatan layanan</li>
                <li>Untuk keperluan hukum jika diperlukan</li>
              </ul>

              <p>7.3. Keamanan Data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Data disimpan dalam sistem yang aman</li>
                <li>Akses data dibatasi hanya untuk petugas yang berwenang</li>
                <li>Data dienkripsi untuk keamanan tambahan</li>
              </ul>
            </div>
          </section>

          {/* 8. Perubahan Syarat & Ketentuan */}
          <section id="perubahan" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-ocean dark:text-coral flex items-center gap-2">
              <AlertCircle size={24} />
              8. Perubahan Syarat & Ketentuan
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>8.1. Hak Perubahan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Villa berhak mengubah syarat dan ketentuan sewaktu-waktu</li>
                <li>Perubahan akan diumumkan melalui website dan media sosial</li>
                <li>Perubahan berlaku sejak tanggal diumumkan</li>
              </ul>

              <p>8.2. Pemberitahuan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perubahan penting akan diberitahukan melalui email</li>
                <li>Penggunaan layanan setelah perubahan berarti menyetujui syarat baru</li>
                <li>Jika tidak setuju, tamu dapat membatalkan booking</li>
              </ul>
            </div>
          </section>

          {/* Kontak */}
          <div className="bg-gray-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-lg p-6 mt-12">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Butuh Bantuan?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Jika Anda memiliki pertanyaan lebih lanjut tentang syarat dan ketentuan, silakan hubungi kami:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-ocean dark:text-coral">
                <Phone size={20} />
                <a href="https://wa.me/6283877080088" className="hover:underline dark:hover:text-coral-light">0838-7708-0088</a>
              </div>
              <div className="flex items-center gap-2 text-ocean dark:text-coral">
                <Mail size={20} />
                <a href="mailto:layanan@villasawarna.com" className="hover:underline dark:hover:text-coral-light">layanan@villasawarna.com</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions; 
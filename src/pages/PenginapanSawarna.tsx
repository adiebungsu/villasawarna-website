import { Link } from 'react-router-dom';
import { useState } from 'react';
import SEO from '@/components/SEO';
import OptimizedImage from '@/components/OptimizedImage';
import { Button } from '@/components/ui/button';
import { getVillasData } from '@/data/properties';

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Penginapan Sawarna – Villa Nyaman & Murah Dekat Pantai',
    description:
      'Temukan penginapan Sawarna terbaik, villa murah dekat pantai, cocok untuk keluarga maupun rombongan.',
    url: 'https://www.villasawarna.com/penginapan-sawarna',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.villasawarna.com' },
        { '@type': 'ListItem', position: 2, name: 'Penginapan Sawarna', item: 'https://www.villasawarna.com/penginapan-sawarna' }
      ]
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Berapa harga villa di Sawarna per malam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Mulai sekitar Rp300.000 untuk tipe budget hingga di atas Rp600.000 per malam untuk kapasitas keluarga besar dan fasilitas lebih lengkap (musiman).'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah ada penginapan dekat pantai (jalan kaki)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Ada. Beberapa unit berada sangat dekat jalur menuju pantai seperti area Legon Pari/Tanjung Layar. Hubungi kami untuk rekomendasi unit terdekat.'
        }
      },
      {
        '@type': 'Question',
        name: 'Pilihan penginapan untuk rombongan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Tersedia villa kapasitas besar dengan banyak kamar, area parkir luas, serta dapur/area BBQ. Cocok untuk 15–30 orang atau lebih.'
        }
      }
    ]
  }
];

const PenginapanSawarna = () => {
  const allVillas = getVillasData();
  const [activeFilter, setActiveFilter] = useState<'semua' | 'dekat-pantai' | 'keluarga' | 'rombongan' | 'budget' | 'premium'>('semua');
  const [sortBy, setSortBy] = useState<'populer' | 'harga-asc' | 'harga-desc'>('populer');
  const [visible, setVisible] = useState(9);

  const getCapacity = (v: any) => v?.capacity ?? 0;
  const getBedrooms = (v: any) => v?.bedrooms ?? 0;
  const getPrice = (v: any) => v?.price ?? v?.originalPrice ?? 0;

  const filtered = allVillas.filter((v: any) => {
    if (activeFilter === 'semua') return true;
    const price = getPrice(v);
    const capacity = getCapacity(v);
    const bedrooms = getBedrooms(v);
    if (activeFilter === 'budget') return price > 0 && price <= 350000;
    if (activeFilter === 'premium') return price >= 600000;
    if (activeFilter === 'keluarga') return bedrooms >= 2 || capacity >= 6;
    if (activeFilter === 'rombongan') return capacity >= 12;
    if (activeFilter === 'dekat-pantai') return true; // placeholder: tampilkan semua (tanpa data jarak)
    return true;
  });

  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sortBy === 'harga-asc') return getPrice(a) - getPrice(b);
    if (sortBy === 'harga-desc') return getPrice(b) - getPrice(a);
    // populer: rating desc, reviews desc, lalu harga asc
    const ar = (a.rating ?? 0) - (b.rating ?? 0);
    if (ar !== 0) return -ar;
    const rv = (a.reviews ?? 0) - (b.reviews ?? 0);
    if (rv !== 0) return -rv;
    return getPrice(a) - getPrice(b);
  });

  const villas = sorted.slice(0, visible);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Penginapan Sawarna – Villa Nyaman & Murah Dekat Pantai"
        description="Temukan penginapan Sawarna terbaik, villa murah dekat pantai, cocok untuk keluarga maupun rombongan."
        keywords="penginapan sawarna, villa sawarna, homestay sawarna, villa dekat pantai sawarna, penginapan sawarna murah, penginapan sawarna untuk rombongan, harga villa sawarna, legon pari, tanjung layar, karang taraje"
        image="https://i.imgur.com/pAI45l7.jpeg"
        url="https://www.villasawarna.com/penginapan-sawarna"
        structuredData={structuredData}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/hero-sawarna.jpg"
            alt="Penginapan Sawarna dekat pantai"
            className="w-full h-full object-cover"
            quality={85}
            sizes="100vw"
            width={1920}
            height={960}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
              Penginapan dan Villa di Sawarna untuk Liburan Nyaman
            </h1>
            <p className="text-white/90 md:text-lg mb-6">
              Pilihan villa dan homestay dekat pantai—cocok untuk keluarga, pasangan, hingga rombongan. Cek ketersediaan & harga terbaru.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-coral hover:bg-coral-dark">
                <Link to="/villas">Lihat Semua Villa</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white/80 hover:bg-white/10">
                <Link to="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rekomendasi */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container-custom">
          {/* Paragraf deskriptif untuk membantu SEO "penginapan sawarna" */}
          <div className="max-w-3xl text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
            <p className="mb-3">
              Mencari <strong>penginapan Sawarna</strong> yang nyaman dan dekat pantai? Di halaman ini kami kumpulkan pilihan villa dan homestay terbaik
              di sekitar Legon Pari, Tanjung Layar, Karang Taraje, hingga Pantai Ciantir. Anda bisa memilih unit yang sesuai kebutuhan—mulai dari
              tipe <em>budget</em> untuk pasangan, unit keluarga dengan 2–3 kamar, sampai villa kapasitas rombongan dengan banyak kamar dan area parkir luas.
            </p>
            <p>
              Untuk pengalaman maksimal, pertimbangkan jarak ke pantai, akses jalan, serta fasilitas seperti dapur/BBQ dan WiFi. Tim kami siap membantu
              rekomendasi terbaik sesuai tanggal dan jumlah tamu. Gunakan filter di bawah untuk mempercepat pencarian.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Rekomendasi Penginapan</h2>
            <div className="flex flex-wrap gap-2">
              <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 mb-2 md:mb-0">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-1 flex gap-1 min-w-max">
                  {(['semua','dekat-pantai','keluarga','rombongan','budget','premium'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => { setVisible(9); setActiveFilter(f); window.scrollTo(0,0); }}
                      className={`px-4 py-2 md:px-3 md:py-1 rounded-lg text-sm font-medium whitespace-nowrap ${activeFilter===f? 'bg-white dark:bg-gray-700 text-ocean dark:text-ocean-light shadow':'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                    >
                      {f.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <select
                value={sortBy}
                onChange={(e)=>setSortBy(e.target.value as any)}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-label="Urutkan"
              >
                <option value="populer">Terpopuler</option>
                <option value="harga-asc">Harga Termurah</option>
                <option value="harga-desc">Harga Termahal</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {villas.map((villa) => (
              <div key={villa.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                <Link to={`/villas/${villa.id}`} className="block">
                  <div className="relative aspect-[16/9]">
                    <OptimizedImage
                      src={villa.image}
                      alt={villa.name}
                      className="w-full h-full object-cover"
                      quality={85}
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 dark:text-white">{villa.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{villa.location}</p>
                  <div className="flex items-end gap-2 mb-3">
                    {villa.originalPrice && (
                      <span className="line-through text-gray-400 text-sm">Rp {villa.originalPrice.toLocaleString('id-ID')}</span>
                    )}
                    <span className="text-red-600 dark:text-red-400 text-xl font-bold">Rp {villa.price?.toLocaleString('id-ID') ?? '-'}</span>
                    <span className="text-xs text-gray-500">/ malam</span>
                  </div>
                  <Link to={`/villas/${villa.id}`} className="text-coral dark:text-coral-light font-semibold">Lihat Detail</Link>
                </div>
              </div>
            ))}
          </div>
          {visible < filtered.length && (
            <div className="text-center mt-8">
              <Button variant="outline" onClick={()=>setVisible(v=>Math.min(v+9, filtered.length))}>Lihat Lainnya</Button>
            </div>
          )}
        </div>
      </section>

      {/* Harga & Paket Ringkas */}
      <section className="py-8 bg-sky-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-xl md:text-2xl font-bold mb-4 dark:text-white">Kisaran Harga</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-1 dark:text-white">Budget</h3>
              <p className="text-gray-600 dark:text-gray-300">Mulai ±Rp300.000/malam</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-1 dark:text-white">Keluarga</h3>
              <p className="text-gray-600 dark:text-gray-300">±Rp400.000–Rp600.000/malam</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-1 dark:text-white">Rombongan</h3>
              <p className="text-gray-600 dark:text-gray-300">Tersedia villa banyak kamar & area parkir luas</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Catatan: harga dapat berubah berdasarkan musim/weekend.</p>
        </div>
      </section>

      {/* Area Populer */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Area Populer</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li><Link to="/article/panduan-legon-pari-karang-taraje" className="underline text-ocean dark:text-ocean-light">Legon Pari & Karang Taraje</Link> – sunrise & fenomena ombak.</li>
            <li><Link to="/article/panduan-liburan-pantai-sawarna" className="underline text-ocean dark:text-ocean-light">Panduan Liburan Sawarna</Link> – rute, itinerary, tips.</li>
            <li><Link to="/article/villa-dekat-pantai-sawarna" className="underline text-ocean dark:text-ocean-light">Villa Dekat Pantai</Link> – akses cepat ke pantai.</li>
          </ul>
        </div>
      </section>

      {/* Artikel Rekomendasi untuk Anda */}
      <section className="py-8 bg-sky-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Artikel Rekomendasi untuk Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/article/penginapan-sawarna-murah-dekat-pantai" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">Penginapan Sawarna Murah Dekat Pantai</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pilihan ekonomis yang tetap nyaman dan dekat pantai.</p>
            </Link>
            <Link to="/article/villa-sawarna-untuk-keluarga-dan-rombongan" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">Villa Sawarna untuk Keluarga & Rombongan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Panduan memilih kapasitas, kamar, dan area favorit.</p>
            </Link>
            <Link to="/article/rekomendasi-villa-sawarna-dengan-view-pantai" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">Rekomendasi Villa dengan View Pantai</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Unit menghadap laut di area Legon Pari, Tanjung Layar, Ciantir.</p>
            </Link>
            <Link to="/article/villa-sawarna" className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <h3 className="font-semibold mb-1 dark:text-white">Villa Sawarna – Akomodasi Nyaman Dekat Pantai</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Informasi area, harga, dan tips memilih villa.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Tips & FAQ */}
      <section className="py-10 bg-white dark:bg-gray-900">
        <div className="container-custom grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">Tips Memilih Penginapan</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Perhatikan jarak ke pantai dan akses jalan/parkir.</li>
              <li>Sesuaikan kapasitas kamar & opsi extra bed.</li>
              <li>Pastikan fasilitas dapur/BBQ bila diperlukan.</li>
              <li>Cek WiFi dan kebutuhan keluarga/anak.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-3 dark:text-white">FAQ</h2>
            <div className="space-y-2">
              <details className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer">Waktu terbaik menginap?</summary>
                <div className="mt-2 text-gray-700 dark:text-gray-300">Musim kemarau (Mei–September) untuk peluang cuaca cerah; akhir pekan lebih ramai.</div>
              </details>
              <details className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <summary className="font-semibold cursor-pointer">Apakah bisa check-in malam?</summary>
                <div className="mt-2 text-gray-700 dark:text-gray-300">Bisa diatur sesuai ketersediaan. Hubungi kami sebelum kedatangan.</div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-sky-50 dark:bg-gray-900">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">Siap Menginap di Sawarna?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-5">Kami bantu rekomendasikan unit terbaik sesuai kebutuhan Anda.</p>
          <Button asChild size="lg">
            <Link to="/contact">Cek Ketersediaan & Harga</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PenginapanSawarna;



import SEO from '@/components/SEO';
import { buildHreflangAlternates } from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Car, Users, Gauge, Luggage, Shield } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const FLEET_DATA: Record<string, {
  title: string;
  images: string[];
  specs: { label: string; value: string }[];
  features: string[];
  priceFrom: string;
}> = {
  'avanza-xenia': {
    title: 'Avanza / Xenia',
    images: ['/images/penginapan-sawarna.webp', '/images/hero-sawarna.jpg'],
    specs: [
      { label: 'Kapasitas', value: '4-6 penumpang' },
      { label: 'Bagasi', value: '2 koper sedang' },
      { label: 'Kenyamanan', value: 'AC, Audio' },
    ],
    features: ['AC dingin', 'Driver berpengalaman', 'Armada terawat'],
    priceFrom: 'Mulai Rp 750.000 / hari'
  },
  'innova-reborn': {
    title: 'Innova / Reborn',
    images: ['/images/sawarna-beach-2.jpeg', '/images/sawarna-beach-3.jpeg'],
    specs: [
      { label: 'Kapasitas', value: '4-6 penumpang' },
      { label: 'Bagasi', value: '2-3 koper' },
      { label: 'Kenyamanan', value: 'Legroom luas, Captain Seat (opsional)' },
    ],
    features: ['Nyaman untuk perjalanan jauh', 'AC dingin', 'Armada terawat'],
    priceFrom: 'Mulai Rp 1.100.000 / hari'
  },
  'hiace-elf': {
    title: 'Hiace / Elf',
    images: ['/images/sawarna-beach-4.jpeg', '/images/karang-taraje-sawarna.webp'],
    specs: [
      { label: 'Kapasitas', value: '9-15 penumpang' },
      { label: 'Bagasi', value: 'Besar' },
      { label: 'Kenyamanan', value: 'Reclining Seat' },
    ],
    features: ['Cocok rombongan', 'AC dingin', 'Bagasi luas'],
    priceFrom: 'Mulai Rp 1.700.000 / hari'
  }
};

const FleetDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? FLEET_DATA[slug] : undefined;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Armada Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Silakan kembali ke daftar armada.</p>
          <Link to="/transport"><Button>Kembali ke Transport</Button></Link>
        </div>
      </div>
    );
  }

  const metaTitle = `${data.title} - Detail Armada`;
  const metaDescription = `Detail armada ${data.title} untuk perjalanan ke Sawarna. ${data.priceFrom}.`;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <SEO 
        title={metaTitle}
        description={metaDescription}
        keywords={`sewa ${data.title.toLowerCase()}, transport sawarna, charter ${data.title.toLowerCase()}`}
        url={`https://villasawarna.com/transport/fleet/${slug}`}
        type="website"
        hreflangAlternates={buildHreflangAlternates(`/transport/fleet/${slug}`)}
      />

      <section className="py-10">
        <div className="container-custom">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{data.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{data.priceFrom}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.images.map((src) => (
                  <div key={src} className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded overflow-hidden">
                    <img src={src} alt={data.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>

              <Card className="border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">Fitur Armada</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {data.features.map((f) => (
                      <li key={f} className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200"><CheckCircle2 className="w-4 h-4 text-green-600" /> {f}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="border border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl dark:text-white">Spesifikasi</CardTitle>
                  <CardDescription>Ringkasan kapasitas & kenyamanan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.specs.map((s) => (
                    <div key={s.label} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-gray-600 dark:text-gray-300">{s.label}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{s.value}</span>
                    </div>
                  ))}
                  <a href="https://wa.me/6283877080088" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Pesan Armada Ini</Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FleetDetail;



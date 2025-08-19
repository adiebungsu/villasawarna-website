import { Article } from '@/types/article';

const article: Article = {
  id: 'panduan-liburan-pantai-sawarna',
  slug: 'panduan-liburan-pantai-sawarna',
  title: 'Panduan Lengkap Liburan ke Pantai Sawarna',
  excerpt: 'Semua yang perlu Anda tahu sebelum ke Sawarna: rute, waktu terbaik, itinerary 2H1M, biaya, dan tips keselamatan.',
  image: 'https://i.imgur.com/iyECWL0.jpeg',
  date: '18 Januari 2025',
  author: 'Villa Sawarna',
  category: 'panduan-wisata',
  tags: ['panduan', 'liburan', 'pantai sawarna', 'itinerary', 'tips'],
  content: `
    <div class="toc">
      <strong>Daftar Isi</strong>
      <ol>
        <li><a href="#waktu">Waktu Terbaik</a></li>
        <li><a href="#rute">Rute & Akses</a></li>
        <li><a href="#itinerary">Itinerary 2 Hari 1 Malam</a></li>
        <li><a href="#biaya">Estimasi Biaya</a></li>
        <li><a href="#tips">Tips & Keselamatan</a></li>
      </ol>
    </div>

    <h2 id="waktu">Waktu Terbaik</h2>
    <p>Musim kemarau (Mei–September) untuk cuaca cerah. Datang pagi untuk sunrise di Legon Pari, sore untuk golden hour di Tanjung Layar.</p>

    <h2 id="rute">Rute & Akses</h2>
    <div class="grid grid-3">
      <div class="card"><h3>Jakarta</h3><p>Tol Serang → Pandeglang → Malingping/Bayah → Sawarna (±6–7 jam).</p></div>
      <div class="card"><h3>Bandung</h3><p>Sukabumi → Pelabuhan Ratu → Cisolok → Sawarna (±7–8 jam).</p></div>
      <div class="card"><h3>Kendaraan</h3><p>Pribadi/travel lebih fleksibel. Isi BBM di kota terakhir.</p></div>
    </div>

    <h2 id="itinerary">Itinerary 2 Hari 1 Malam</h2>
    <ul>
      <li><strong>Hari 1:</strong> Check-in villa → Legon Pari (sunset) → Kuliner malam.</li>
      <li><strong>Hari 2:</strong> Sunrise Legon Pari → Tanjung Layar → Karang Taraje → Check-out.</li>
    </ul>

    <h2 id="biaya">Estimasi Biaya</h2>
    <div class="grid grid-2">
      <div class="card"><h3>Tiket</h3><p>Rp10.000–Rp15.000/orang/pantai.</p></div>
      <div class="card"><h3>Penginapan</h3><p>Mulai Rp300.000/malam (standar), >Rp600.000 (keluarga besar).</p></div>
    </div>

    <h2 id="tips">Tips & Keselamatan</h2>
    <ul>
      <li>Perhatikan <strong>pasang surut</strong> dan rambu keselamatan di pantai selatan.</li>
      <li>Bawa <strong>sunblock</strong>, minum cukup, dan pelindung gadget dari air.</li>
      <li>Pilih <a href="/articles/villa-dekat-pantai-sawarna">villa dekat pantai</a> agar efisien waktu.</li>
    </ul>

    <h2>Baca Juga</h2>
    <ul>
      <li><a href="/articles/panduan-legon-pari-karang-taraje">Legon Pari & Karang Taraje</a></li>
      <li><a href="/articles/kuliner-khas">Kuliner Khas Sawarna</a></li>
    </ul>
  `
};

export default article;



const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Data lokal website
const websiteData = {
  villas: [
    {
      name: "Villa Deka Sawarna",
      description: "Villa mewah dengan 8 kamar tidur dan pemandangan pantai yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ. Lokasi strategis dekat dengan pantai dan atraksi lokal.",
      facilities: ["WiFi", "Kipas Angin", "Kamar Mandi Dalam", "Dapur", "Area BBQ", "Parkir Luas", "Security 24 Jam", "View Pantai"],
      location: "Pantai Sawarna",
      price: "Rp 3.000.000/malam",
      capacity: "16-20 orang",
      rating: 4.4
    },
    {
      name: "Villa Sinar Pelangi",
      description: "Villa mewah dengan 10 kamar tidur, kolam renang infinity, dan pemandangan matahari terbit yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ yang luas.",
      facilities: ["10 Kamar Tidur Mewah", "4 Kamar Mandi Dalam", "AC di Semua Kamar", "TV LED 43 inch", "WiFi Fiber Optic", "Kolam Renang Infinity", "Dapur Modern Premium", "Area BBQ Luas", "Gazebo", "Taman", "Parkir Luas", "Ruang Meeting", "24/7 Security"],
      location: "Pantai Sawarna",
      price: "Rp 2.000.000/malam",
      capacity: "20-25 orang",
      rating: 4.4
    },
    {
      name: "Villa Aki Nini",
      description: "Villa mewah dengan 3 kamar tidur dan pemandangan sawah yang menenangkan. Dilengkapi dengan dapur modern, area BBQ, dan taman yang asri.",
      facilities: ["3 Kamar Tidur Mewah", "3 Kamar Mandi Dalam", "AC di Semua Kamar", "TV LED 43 inch", "WiFi Fiber Optic", "Dapur Modern Premium", "Area BBQ", "Gazebo", "Taman Asri", "Parkir Luas", "24/7 Security"],
      location: "Pantai Sawarna",
      price: "Rp 3.500.000/malam",
      capacity: "6-8 orang",
      rating: 4.3
    },
    {
      name: "Villa Mutiara Sawarna",
      description: "Villa mewah dengan 8 kamar tidur dan pemandangan pantai yang menakjubkan. Dilengkapi dengan kolam renang pribadi, dapur modern, dan area BBQ.",
      facilities: ["8 Kamar Tidur Mewah", "4 Kamar Mandi Dalam", "AC di Semua Kamar", "TV LED 43 inch", "WiFi Fiber Optic", "Kolam Renang Pribadi", "Dapur Modern Premium", "Area BBQ", "Gazebo", "Taman", "Parkir Luas", "24/7 Security"],
      location: "Pantai Sawarna",
      price: "Rp 3.500.000/malam",
      capacity: "16-20 orang",
      rating: 4.4
    },
    {
      name: "Villa Regin Sawarna",
      description: "Villa mewah dengan 12 kamar tidur dan pemandangan pantai yang menakjubkan. Dilengkapi dengan kolam renang infinity, dapur modern, dan area BBQ yang luas.",
      facilities: ["12 Kamar Tidur Mewah", "6 Kamar Mandi Dalam", "AC di Semua Kamar", "TV LED 43 inch", "WiFi Fiber Optic", "Kolam Renang Infinity", "Dapur Modern Premium", "Area BBQ Luas", "Gazebo", "Taman", "Parkir Luas", "Ruang Meeting", "24/7 Security"],
      location: "Pantai Sawarna",
      price: "Rp 4.500.000/malam",
      capacity: "24-30 orang",
      rating: 4.2
    }
  ],
  promos: [
    {
      title: "Paket Liburan Akhir Pekan",
      description: "Dapatkan diskon 20% untuk booking minimal 2 malam",
      validUntil: "2024-12-31",
      terms: ["Minimal booking 2 malam", "Tidak bisa digabung dengan promo lain", "Pembayaran penuh di muka"]
    },
    {
      title: "Paket Keluarga",
      description: "Dapatkan diskon 15% untuk booking minimal 3 malam",
      validUntil: "2024-12-31",
      terms: ["Minimal booking 3 malam", "Tidak bisa digabung dengan promo lain", "Pembayaran penuh di muka"]
    },
    {
      title: "Paket Honeymoon",
      description: "Dapatkan diskon 25% untuk pasangan yang baru menikah",
      validUntil: "2024-12-31",
      terms: ["Minimal booking 2 malam", "Harus menunjukkan buku nikah", "Tidak bisa digabung dengan promo lain"]
    },
    {
      title: "Paket Group",
      description: "Dapatkan diskon 30% untuk booking minimal 5 kamar",
      validUntil: "2024-12-31",
      terms: ["Minimal booking 5 kamar", "Tidak bisa digabung dengan promo lain", "Pembayaran penuh di muka"]
    }
  ],
  faq: [
    {
      question: "Apa saja fasilitas yang tersedia?",
      answer: "Fasilitas meliputi WiFi, AC, TV LED, kamar mandi dalam, dapur lengkap, area BBQ, gazebo, taman, parkir luas, dan security 24 jam. Beberapa villa juga dilengkapi dengan kolam renang infinity dan ruang meeting."
    },
    {
      question: "Dimana lokasi villanya?",
      answer: "Villa kami tersebar di beberapa lokasi strategis di Sawarna, seperti Pantai Sawarna, Goa Langir, dan Legon Pari. Setiap villa memiliki akses mudah ke pantai dan atraksi wisata populer."
    },
    {
      question: "Berapa kapasitas maksimal villa?",
      answer: "Kapasitas villa bervariasi, mulai dari 6-30 orang. Silakan pilih villa sesuai dengan kebutuhan Anda. Setiap villa memiliki jumlah kamar tidur yang berbeda-beda."
    },
    {
      question: "Bagaimana cara booking villa?",
      answer: "Anda dapat melakukan booking melalui website kami, WhatsApp, atau telepon. Pembayaran dapat dilakukan melalui transfer bank atau e-wallet. Konfirmasi booking akan dikirimkan setelah pembayaran diterima."
    },
    {
      question: "Apakah ada biaya tambahan?",
      answer: "Biaya tambahan meliputi biaya kebersihan dan biaya listrik jika melebihi kuota. Biaya ini akan diinformasikan saat booking. Tidak ada biaya tersembunyi lainnya."
    },
    {
      question: "Apakah bisa check-in lebih awal atau check-out lebih lambat?",
      answer: "Check-in lebih awal atau check-out lebih lambat dapat diatur dengan biaya tambahan, tergantung ketersediaan villa. Silakan hubungi kami untuk informasi lebih lanjut."
    },
    {
      question: "Apakah ada fasilitas untuk anak-anak?",
      answer: "Ya, beberapa villa dilengkapi dengan fasilitas anak-anak seperti kolam renang khusus anak, playground, dan high chair. Silakan tanyakan saat booking untuk informasi lebih detail."
    },
    {
      question: "Apakah ada layanan catering?",
      answer: "Ya, kami menyediakan layanan catering dengan berbagai pilihan menu. Anda dapat memesan saat booking atau menghubungi kami minimal 1 hari sebelum kedatangan."
    }
  ],
  attractions: [
    {
      name: "Pantai Sawarna",
      description: "Pantai dengan pasir putih dan ombak yang cocok untuk berselancar",
      distance: "5-10 menit dari villa"
    },
    {
      name: "Goa Langir",
      description: "Goa alam dengan stalaktit dan stalagmit yang menakjubkan",
      distance: "15 menit dari villa"
    },
    {
      name: "Legon Pari",
      description: "Pantai tersembunyi dengan pemandangan matahari terbit yang indah",
      distance: "20 menit dari villa"
    }
  ]
};

// Middleware untuk rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100 // limit setiap IP ke 100 request per windowMs
});
app.use('/api/', limiter);

app.post('/api/ai-chat', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });

  try {
    // Logika sederhana untuk menjawab berdasarkan data lokal
    let answer = "Maaf, saya tidak dapat menemukan informasi yang relevan.";
    const questionLower = question.toLowerCase();
    
    // Cek pertanyaan tentang villa
    if (questionLower.includes('villa')) {
      if (questionLower.includes('harga') || questionLower.includes('biaya')) {
        const villaPrices = websiteData.villas.map(v => 
          `${v.name}: ${v.price}`
        ).join('\n');
        answer = `Berikut daftar harga villa:\n\n${villaPrices}`;
      } else if (questionLower.includes('fasilitas')) {
        const villaFacilities = websiteData.villas.map(v => 
          `${v.name}:\n${v.facilities.join(', ')}`
        ).join('\n\n');
        answer = `Berikut fasilitas setiap villa:\n\n${villaFacilities}`;
      } else {
        const villaInfo = websiteData.villas.map(v => 
          `${v.name}:\nDeskripsi: ${v.description}\nKapasitas: ${v.capacity}\nHarga: ${v.price}\nRating: ${v.rating}/5\nFasilitas: ${v.facilities.join(', ')}\nLokasi: ${v.location}`
        ).join('\n\n');
        answer = `Berikut informasi villa yang tersedia:\n\n${villaInfo}`;
      }
    }
    
    // Cek pertanyaan tentang promo
    else if (questionLower.includes('promo') || questionLower.includes('diskon')) {
      const promoInfo = websiteData.promos.map(p => 
        `${p.title}:\n${p.description}\nSyarat & Ketentuan:\n${p.terms.map(t => `- ${t}`).join('\n')}\nBerlaku sampai: ${p.validUntil}`
      ).join('\n\n');
      answer = `Berikut promo yang sedang berlangsung:\n\n${promoInfo}`;
    }
    
    // Cek pertanyaan tentang lokasi
    else if (questionLower.includes('lokasi') || questionLower.includes('dimana')) {
      const attractionsInfo = websiteData.attractions.map(a =>
        `${a.name}:\n${a.description}\nJarak: ${a.distance}`
      ).join('\n\n');
      answer = `Villa kami berada di Sawarna, Banten. Berikut beberapa tempat menarik di sekitar villa:\n\n${attractionsInfo}`;
    }
    
    // Cek FAQ
    else {
      const matchingFAQ = websiteData.faq.find(f => 
        questionLower.includes(f.question.toLowerCase())
      );
      if (matchingFAQ) {
        answer = matchingFAQ.answer;
      }
    }

    res.json({ answer });
  } catch (err) {
    console.error('Chat Error:', err);
    res.status(500).json({ 
      answer: "Maaf, terjadi error pada server. Silakan coba lagi nanti atau hubungi admin." 
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`AI Chat server running on port ${PORT}`)); 
import type { Property, Review } from "@/types";

interface RatingBreakdown {
  label: string;
  value: number;
}

interface RatingSummary {
  score: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
}

export type ExtendedPropertyCardProps = Property;

const villasData: ExtendedPropertyCardProps[] = [
  {
    id: "villa-aliya-sawarna",
    name: "Villa Aliya Sawarna",
    type: "villa",
    location: "Pantai Sawarna",
    description: "Villa mewah dengan pemandangan pantai yang menakjubkan dan arsitektur modern. Menawarkan berbagai fasilitas dan tipe kamar untuk kenyamanan maksimal.",
    price: 250000,
    rating: 4.5,
    reviews: 178,
    capacity: 40,
    bedrooms: 8,
    bathrooms: 8,
    image: "https://i.imgur.com/KNZs2rS.jpeg",
    mainImages: [
      "https://i.imgur.com/KNZs2rS.jpeg",
      "https://i.imgur.com/DG7UVVn.jpeg",
      "https://i.imgur.com/n8PRWNu.jpeg",
      "https://i.imgur.com/3SBy64G.jpeg",
      "https://i.imgur.com/nNqsgI4.jpeg",
      "https://i.imgur.com/CjJZEtZ.jpeg",
      "https://i.imgur.com/PURTpP0.jpeg",
      "https://i.imgur.com/poKtaOU.jpeg",
      "https://i.imgur.com/B3uAtlT.jpeg",
      "https://i.imgur.com/tvjzciT.jpeg",
      "https://i.imgur.com/6QudI8p.jpeg"
    ],
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "AC",
      "Kipas Angin",
      "TV LED",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "View Sawah",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standard Room",
        description: "Kamar nyaman dengan single bed, ideal untuk 2-4 orang. Dilengkapi dengan kipas angin, TV LED, dan kamar mandi dalam.",
        price: 250000,
        capacity: 4,
        beds: "1 Single Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "TV LED", "Kamar Mandi Dalam", "WiFi"],
        images: [
          "https://i.imgur.com/gM2wgbk.jpeg",
          "https://i.imgur.com/bpEpwhv.jpeg",
          "https://i.imgur.com/KRwPJYw.jpeg",
          "https://i.imgur.com/2Cx5cww.jpeg",
          "https://i.imgur.com/xTsMb8F.jpeg"
        ]
      },
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar nyaman dengan double bed, ideal untuk 6-8 orang. Dilengkapi dengan AC, kipas angin, TV LED, dan kamar mandi dalam.",
        price: 350000,
        capacity: 8,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["AC", "Kipas Angin", "TV LED", "Kamar Mandi Dalam", "WiFi"],
        images: [
          "https://i.imgur.com/aPXXgXY.jpeg",
          "https://i.imgur.com/D1kETYY.jpeg",
          "https://i.imgur.com/Ka1EzdS.jpeg",
          "https://i.imgur.com/BISJx6R.jpeg",
          "https://i.imgur.com/aTlRKm2.jpeg"
        ]
      },
      {
        id: "family-room",
        name: "Family Room",
        description: "Kamar luas dengan double bed dan single bed, ideal untuk 10-12 orang. Dilengkapi dengan AC, kipas angin, TV LED, dan kamar mandi dalam.",
        price: 750000,
        capacity: 12,
        beds: "1 Double Bed + 1 Single Bed",
        bathrooms: 1,
        amenities: ["AC", "Kipas Angin", "TV LED", "Kamar Mandi Dalam", "WiFi"],
        images: [
          "https://i.imgur.com/tvjzciT.jpeg",
          "https://i.imgur.com/6QudI8p.jpeg",
          "https://i.imgur.com/s0ZPnEX.jpeg",
          "https://i.imgur.com/A3LxarN.jpeg",
          "https://i.imgur.com/iflDism.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 8.5,
      totalReviews: 178,
      breakdown: [
        { label: "Kebersihan", value: 8.7 },
        { label: "Kenyamanan Kamar", value: 8.6 },
        { label: "Makanan", value: 8.4 },
        { label: "Lokasi", value: 8.8 },
        { label: "Pelayanan dan Fasilitas", value: 8.5 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.983313138494551, 106.3100191399096],
    nearbyAttractions: []
  },
  {
    id: "villa-dua-putri",
    name: "Villa Dua Putri",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Dua Putri adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 7 kamar tidur nyaman yang masing-masing dilengkapi kipas angin, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (6 menit jalan kaki), Goa Langir (5 menit berkendara), Legon Pari (9 menit berkendara), dan Tanjung Layar (4 menit berkendara).`,
    price: 250000,
    rating: 4.5,
    reviews: 120,
    capacity: 40,
    bedrooms: 7,
    bathrooms: 7,
    image: "https://i.imgur.com/qnFfn4w.jpeg",
    mainImages: [
      "https://i.imgur.com/qnFfn4w.jpeg",
      "https://i.imgur.com/p7w6VtY.jpeg",
      "https://i.imgur.com/J6o5y5J.jpeg",
      "https://i.imgur.com/6vuQ236.jpeg",
      "https://i.imgur.com/QkxlhNy.jpeg",
      "https://i.imgur.com/uV1MnlL.jpeg",
      "https://i.imgur.com/5NvmKLM.jpeg",
      "https://i.imgur.com/sHs8K3b.jpeg"
    ],
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "7 Kamar Tidur Nyaman",
      "7 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "single-bed",
        name: "Single Bed Room",
        description: "Kamar nyaman dengan single bed, ideal untuk satu orang. Dilengkapi dengan kipas angin, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 250000,
        capacity: 1,
        beds: "1 Single Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/qnFfn4w.jpeg",
          "https://i.imgur.com/Xs0KloK.jpeg",
          "https://i.imgur.com/sHs8K3b.jpeg",
          "https://i.imgur.com/CjVUpDO.jpeg",
          "https://i.imgur.com/bwRXG1j.jpeg"
        ]
      },
      {
        id: "double-bed",
        name: "Double Bed Room",
        description: "Kamar nyaman dengan double bed, ideal untuk berdua. Dilengkapi dengan kipas angin, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 300000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/6vuQ236.jpeg",
          "https://i.imgur.com/liFf7E0.jpeg",
          "https://i.imgur.com/Xs0KloK.jpeg",
          "https://i.imgur.com/sHs8K3b.jpeg",
          "https://i.imgur.com/CjVUpDO.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 8.7,
      totalReviews: 120,
      breakdown: [
        { label: "Kebersihan", value: 8.5 },
        { label: "Kenyamanan Kamar", value: 8.8 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.981214793297297, 106.30974981409561],
    nearbyAttractions: []
  },
  {
    id: "villa-deka-sawarna",
    name: "Villa Deka Sawarna",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: "Villa nyaman dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ. Lokasi strategis dekat dengan pantai dan atraksi lokal.",
    price: 320000,
    rating: 4.4,
    reviews: 163,
    capacity: 40,
    bedrooms: 10,
    bathrooms: 4,
    image: "https://i.imgur.com/iajE3el.jpeg",
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "10 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ Luas",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas"
    ],
    mainImages: [
      "https://i.imgur.com/iajE3el.jpeg",
      "https://i.imgur.com/t6f04pL.jpeg",
      "https://i.imgur.com/l7lZFRl.jpeg",
      "https://i.imgur.com/yIDV3Tq.jpeg",
      "https://i.imgur.com/K5AisLi.jpeg",
      "https://i.imgur.com/WbCYgzI.jpeg",
      "https://i.imgur.com/mRJ6Skv.jpeg",
      "https://i.imgur.com/owY4d5q.jpeg"
    ],
    roomTypes: [
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar nyaman dengan double bed, ideal untuk berdua. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/XzlAVta.jpeg",
          "https://i.imgur.com/pMMiWd3.jpeg",
          "https://i.imgur.com/WGHhbBQ.jpeg",
          "https://i.imgur.com/owY4d5q.jpeg",
          "https://i.imgur.com/WJ0vTfp.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 8.7,
      totalReviews: 163,
      breakdown: [
        { label: "Kebersihan", value: 8.5 },
        { label: "Kenyamanan Kamar", value: 8.8 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.979094466326558, 106.30727668986445],
    nearbyAttractions: []
  },
  {
    id: "villa-sawarna-resort",
    name: "Villa Sawarna Resort",
    type: "villa" as const,
    location: "Goa Langir, Sawarna",
    description: "Villa nyaman dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ. Lokasi strategis dekat dengan pantai dan atraksi lokal.",
    price: 320000,
    rating: 4.4,
    reviews: 163,
    capacity: 40,
    bedrooms: 10,
    bathrooms: 4,
    image: "https://i.imgur.com/KP2ncPi.jpeg",
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "10 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ Luas",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas"
    ],
    mainImages: [
      "https://i.imgur.com/KP2ncPi.jpeg",
      "https://i.imgur.com/d22kux8.jpeg",
      "https://i.imgur.com/BtWp6Yr.jpeg",
      "https://i.imgur.com/YjosayP.jpeg",
      "https://i.imgur.com/SOKaH8H.jpeg",
      "https://i.imgur.com/7Djvl8E.jpeg",
      "https://i.imgur.com/g4cFUG6.jpeg",
      "https://i.imgur.com/nxHkeGn.jpeg",
      "https://i.imgur.com/SRCkcfv.jpeg",
      "https://i.imgur.com/5Kyzd6s.jpeg",
      "https://i.imgur.com/b610wqP.jpeg",
      "https://i.imgur.com/q4icl51.jpeg",
      "https://i.imgur.com/oRl7XdE.jpeg"
    ],
    roomTypes: [
      {
        id: "single-bed",
        name: "Single Bed Room",
        description: "Kamar nyaman dengan single bed, ideal untuk satu orang. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 320000,
        capacity: 1,
        beds: "1 Single Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/B28xTFD.jpeg",
          "https://i.imgur.com/MKYfcag.jpeg",
          "https://i.imgur.com/JYILIYe.jpeg",
          "https://i.imgur.com/gHHUxrK.jpeg",
          "https://i.imgur.com/oRl7XdE.jpeg"
        ]
      },
      {
        id: "twin-bed",
        name: "Twin Bed Room",
        description: "Kamar nyaman dengan twin bed, ideal untuk berdua. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 350000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/Fv9HJPe.jpeg",
          "https://i.imgur.com/l0QsGrb.jpeg",
          "https://i.imgur.com/AJ4MO1L.jpeg",
          "https://i.imgur.com/BtWp6Yr.jpeg",
          "https://i.imgur.com/lf3VX4d.jpeg"
        ]
      },
      {
        id: "superqueen-bed",
        name: "Super Queen Bed Room",
        description: "Kamar nyaman dengan super queen bed, ideal untuk berdua. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 400000,
        capacity: 2,
        beds: "1 Super Queen Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/eXSGFhd.jpeg",
          "https://i.imgur.com/nwKjG10.jpeg",
          "https://i.imgur.com/SOKaH8H.jpeg",
          "https://i.imgur.com/IYAvuag.jpeg",
          "https://i.imgur.com/YjosayP.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 8.7,
      totalReviews: 163,
      breakdown: [
        { label: "Kebersihan", value: 8.5 },
        { label: "Kenyamanan Kamar", value: 8.8 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.974810518892521, 106.29812614079675],
    nearbyAttractions: []
  },
  {
    id: "villa-sinar-pelangi",
    name: "Villa Sinar Pelangi",
    type: "villa",
    image: "https://i.imgur.com/lNcydX5.jpeg",
    mainImages: [
      "https://i.imgur.com/lNcydX5.jpeg",
      "https://i.imgur.com/GkCBWRe.jpeg",
      "https://i.imgur.com/KjL0Jpg.jpeg",
      "https://i.imgur.com/wZ0cSjQ.jpeg",
      "https://i.imgur.com/WhBRfqs.jpeg",
      "https://i.imgur.com/Nh6XLTg.jpeg",
      "https://i.imgur.com/7EnCW0d.jpeg",
      "https://i.imgur.com/DTBq7Dq.jpeg",
      "https://i.imgur.com/9cttGSs.jpeg",
      "https://i.imgur.com/0aMZ0iY.jpeg"
    ],
    price: 200000,
    rating: 4.8,
    location: "Pantai Sawarna",
    coordinates: [-6.97947898229436, 106.30604074263614],
    capacity: 40,
    reviews: 12,
    bedrooms: 10,
    bathrooms: 4,
    amenities: [
      "Kipas Angin",
      "10 Kamar Tidur",
      "24/7 Security",
      "Dapur",
      "Parkir",
      "Halaman Luas",
      "Teras",
      "Kamar Mandi Dalam"
    ],
    description: "Villa Sinar Pelangi adalah villa eksklusif dengan 10 kamar tidur yang menawarkan halaman luas. Terletak di Pantai Sawarna, villa ini dilengkapi dengan dapur lengkap, dan teras yang luas. Cocok untuk liburan keluarga atau rombongan besar.",
    tags: ["Pantai", "10 Kamar", "Eksklusif"],
    roomTypes: [
      {
        id: "standar-room",
        name: "Standar Room",
        description: "Kamar standar dengan fasilitas lengkap",
        price: 200000,
        capacity: 2,
        beds: "1 Queen Bed",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/xjM7Pu6.jpeg",
          "https://i.imgur.com/7EnCW0d.jpeg",
          "https://i.imgur.com/DTBq7Dq.jpeg",
          "https://i.imgur.com/9cttGSs.jpeg",
          "https://i.imgur.com/0aMZ0iY.jpeg"
        ],
        amenities: ["Kipas Angin", "10 Kamar Tidur", "24/7 Security", "Kamar Mandi Dalam"]
      }
    ],
    ratingSummary: {
      score: 4.8,
      totalReviews: 12,
      breakdown: [
        { label: "Kebersihan", value: 4.8 },
        { label: "Kenyamanan", value: 4.9 },
        { label: "Lokasi", value: 4.9 },
        { label: "Pelayanan", value: 4.7 },
        { label: "Nilai", value: 4.8 }
      ]
    },
    propertyReviews: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 5,
        comment: "Villa yang sangat nyaman dengan pemandangan pantai yang menakjubkan. Pelayanan staff sangat ramah dan profesional.",
        date: "2024-02-15"
      },
      {
        id: "2",
        author: "Ani Wijaya",
        rating: 4.5,
        comment: "Fasilitas lengkap dan bersih. Lokasi strategis dekat pantai. Hanya saja harga sedikit mahal.",
        date: "2024-02-10"
      }
    ],
    nearbyAttractions: []
  },
  {
    id: "villa-aki-nini",
    name: "Villa Aki Nini",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Aki Nini adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 8 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (6 menit jalan kaki), Goa Langir (5 menit berkendara), Legon Pari (9 menit berkendara), dan Tanjung Layar (4 menit berkendara).`,
    price: 450000,
    rating: 4.5,
    reviews: 120,
    capacity: 60,
    bedrooms: 8,
    bathrooms: 8,
    image: "https://i.imgur.com/SHPK4Qf.jpeg",
    mainImages: [
      "https://i.imgur.com/SHPK4Qf.jpeg",
      "https://i.imgur.com/YzOw7h5.jpeg",
      "https://i.imgur.com/xLoaHAa.jpeg",
      "https://i.imgur.com/DasIbsh.jpeg",
      "https://i.imgur.com/5dKSBLs.jpeg",
      "https://i.imgur.com/fKygTJY.jpeg",
      "https://i.imgur.com/WZgMdyW.jpeg",
      "https://i.imgur.com/wYR0Uzv.jpeg",
      "https://i.imgur.com/VhVkW9P.jpeg"
    ],
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "8 Kamar Tidur Nyaman",
      "8 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standard Room",
        description: "Kamar nyaman dengan single bed, ideal untuk 2-4 orang. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 350000,
        capacity: 4,
        beds: "1 Single Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/5dKSBLs.jpeg",
          "https://i.imgur.com/nlQzPaw.jpeg",
          "https://i.imgur.com/zvMobT5.jpeg",
          "https://i.imgur.com/OUyp83v.jpeg",
          "https://i.imgur.com/xLoaHAa.jpeg"
        ]
      },
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar nyaman dengan double bed, ideal untuk 6-8 orang. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 8,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/sxMTrVy.jpeg",
          "https://i.imgur.com/vgoLkcU.jpeg",
          "https://i.imgur.com/rYCBPT3.jpeg",
          "https://i.imgur.com/wYR0Uzv.jpeg",
          "https://i.imgur.com/fKygTJY.jpeg"
        ]
      },
      {
        id: "family-room",
        name: "Family Room",
        description: "Kamar nyaman dengan double bed dan single bed, ideal untuk 10-12 orang. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 550000,
        capacity: 12,
        beds: "1 Double Bed + 1 Single Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/DasIbsh.jpeg",
          "https://i.imgur.com/YzOw7h5.jpeg",
          "https://i.imgur.com/t5cKYO3.jpeg",
          "https://i.imgur.com/xU8djhC.jpeg",
          "https://i.imgur.com/zvMobT5.jpeg"
        ]
      }
    ],
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.8,
        comment: "Villa yang sangat nyaman. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.7,
        comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Ahmad Rizki",
        rating: 4.9,
        comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
        date: "2024-03-05"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.978853212418463, 106.30729082671174],
    nearbyAttractions: []
  },
  {
    id: "villa-mutiara-sawarna",
    name: "Villa Mutiara Sawarna",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Mutiara Sawarna adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi area BBQ yang luas, dan ruang meeting yang nyaman. Setiap kamar dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area outdoor yang luas menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Legon Pari (5 menit jalan kaki), Pantai Goa Langir (10 menit berkendara), Pantai Karang Taraje (7 menit berkendara), dan Tanjung Layar (15 menit berkendara).`,
    price: 350000,
    rating: 4.4,
    reviews: 269,
    capacity: 50,
    bedrooms: 8,
    bathrooms: 8,
    image: "https://i.imgur.com/9Hcp40U.jpeg",
    mainImages: [
      "https://i.imgur.com/9Hcp40U.jpeg",
      "https://i.imgur.com/JHASLtZ.jpeg",
      "https://i.imgur.com/Khg9u7S.jpeg",
      "https://i.imgur.com/yDZCZww.jpeg",
      "https://i.imgur.com/uh8FQep.jpeg"
    ],
    tags: ["villa", "pantai sawarna", "ruang meeting"],
    amenities: [
      "8 Kamar Tidur Nyaman",
      "8 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ Luas",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan pantai yang menakjubkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 350000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/9Hcp40U.jpeg",
          "https://i.imgur.com/JHASLtZ.jpeg",
          "https://i.imgur.com/Khg9u7S.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan pantai yang menakjubkan dan fasilitas modern untuk kenyamanan maksimal.",
        price: 450000,
        capacity: 3,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/yDZCZww.jpeg",
          "https://i.imgur.com/uh8FQep.jpeg",
          "https://i.imgur.com/5tWlccP.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar keluarga yang sangat luas dengan ruang tamu terpisah dan pemandangan pantai yang menakjubkan. Dilengkapi dengan fasilitas premium untuk kenyamanan keluarga.",
        price: 550000,
        capacity: 6,
        beds: "2 Queen Beds Premium",
        bathrooms: 2,
        images: [
          "https://i.imgur.com/jfOhuSi.jpeg",
          "https://i.imgur.com/oNmci0u.jpeg",
          "https://i.imgur.com/9Hcp40U.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "2 Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kitchen", "Ruang Tamu", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "honeymoon",
        name: "Honeymoon Suite",
        description: "Suite romantis dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan jacuzzi dan balkon pribadi. Cocok untuk pasangan yang ingin berbulan madu.",
        price: 750000,
        capacity: 2,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/uh8FQep.jpeg",
          "https://i.imgur.com/yDZCZww.jpeg",
          "https://i.imgur.com/5tWlccP.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Jacuzzi", "Balkon Pribadi", "Mini Bar", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.9,
        comment: "Villa yang sangat mewah. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.8,
        comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah dari.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Ahmad Rizki",
        rating: 4.9,
        comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
        date: "2024-03-05"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.978365247307664, 106.30587655192137],
    nearbyAttractions: []
  },
  {
    id: "villa-regin-sawarna",
    name: "Villa Regin Sawarna",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Regin Sawarna adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan area pesawahan yang menenangkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang unik dan nyaman.

Fasilitas utama villa ini meliputi 12 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan sawah yang hijau.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, layanan sewa kendaraan, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Legon Pari (9-10 menit berkendara), Pantai Goa Langir (5 menit berkendara), Pantai Sawarna (3 menit berkendara), dan Tanjung Layar (7 menit berkendara).`,
    price: 450000,
    rating: 4.2,
    reviews: 175,
    capacity: 74,
    bedrooms: 12,
    bathrooms: 12,
    image: "https://i.imgur.com/XG2ijrp.jpeg",
    tags: ["villa", "pantai sawarna", "sewa kendaraan", "view sawah"],
    amenities: [
      "12 Kamar Tidur Nyaman",
      "12 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "Sewa Kendaraan",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas"
    ],
    mainImages: [
      "https://i.imgur.com/XG2ijrp.jpeg",
      "https://i.imgur.com/aMC3EHU.jpeg",
      "https://i.imgur.com/l19FLfr.jpeg",
      "https://i.imgur.com/MsdVlnL.jpeg",
      "https://i.imgur.com/eOA7T0V.jpeg",
      "https://i.imgur.com/XG2ijrp.jpeg",
      "https://i.imgur.com/aMC3EHU.jpeg",
      "https://i.imgur.com/l19FLfr.jpeg"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan sawah yang menenangkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
      "https://i.imgur.com/XG2ijrp.jpeg",
      "https://i.imgur.com/aMC3EHU.jpeg",
      "https://i.imgur.com/l19FLfr.jpeg",
      "https://i.imgur.com/MsdVlnL.jpeg",
      "https://i.imgur.com/eOA7T0V.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pesawahan"]
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan sawah yang menenangkan dan fasilitas modern untuk kenyamanan maksimal.",
        price: 550000,
        capacity: 3,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/l19FLfr.jpeg",
          "https://i.imgur.com/MsdVlnL.jpeg",
          "https://i.imgur.com/eOA7T0V.jpeg",
          "https://i.imgur.com/XG2ijrp.jpeg",
          "https://i.imgur.com/aMC3EHU.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi"]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar keluarga yang sangat luas dengan ruang tamu terpisah dan pemandangan sawah yang menenangkan. Dilengkapi dengan fasilitas premium untuk kenyamanan keluarga.",
        price: 750000,
        capacity: 6,
        beds: "2 Queen Beds Premium",
        bathrooms: 2,
        images: [
          "https://i.imgur.com/MsdVlnL.jpeg",
          "https://i.imgur.com/eOA7T0V.jpeg",
          "https://i.imgur.com/XG2ijrp.jpeg",
          "https://i.imgur.com/aMC3EHU.jpeg",
          "https://i.imgur.com/l19FLfr.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "2 Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kitchen", "Ruang Tamu", "Setrika", "Perlengkapan Mandi"]
      },
      {
        id: "honeymoon",
        name: "Honeymoon Suite",
        description: "Suite romantis dengan pemandangan sawah yang menenangkan. Dilengkapi dengan jacuzzi dan balkon pribadi. Cocok untuk pasangan yang ingin berbulan madu.",
        price: 850000,
        capacity: 2,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/eOA7T0V.jpeg",
          "https://i.imgur.com/XG2ijrp.jpeg",
          "https://i.imgur.com/aMC3EHU.jpeg",
          "https://i.imgur.com/l19FLfr.jpeg",
          "https://i.imgur.com/MsdVlnL.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Jacuzzi", "Balkon Pribadi", "Mini Bar", "Setrika", "Perlengkapan Mandi", "View Pesawahan"]
      }
    ],
    ratingSummary: {
      score: 8.4,
      totalReviews: 175,
      breakdown: [
        { label: "Kebersihan", value: 8.3 },
        { label: "Kenyamanan Kamar", value: 8.2 },
        { label: "Makanan", value: 8.3 },
        { label: "Lokasi", value: 8.4 },
        { label: "Pelayanan dan Fasilitas", value: 8.2 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.6,
        comment: "Villa yang sangat nyaman dengan pemandangan sawah yang menenangkan. Fasilitas lengkap dan staff sangat ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.5,
        comment: "Lokasi strategis dan bersih. Pemandangan sawah yang indah membuat suasana sangat tenang dan nyaman.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Ahmad Rizki",
        rating: 4.4,
        comment: "Pengalaman menginap yang menyenangkan. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga besar.",
        date: "2024-03-05"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.978777224525033, 106.30637610022279],
    nearbyAttractions: []
  },
  {
    id: "villa-little-hula-hula",
    name: "Villa Little Hula Hula",
    type: "villa" as const,
    location: "Goa Langir, Sawarna",
    amenities: [
      "14 Kamar Tidur Nyaman",
      "14 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 55 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Ruang Meeting",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Sunset"
    ],
    description: `Villa Little Hula Hula adalah villa nyaman premium yang terletak di kawasan strategis Goa Langir, Sawarna. Dengan desain arsitektur modern yang mengadopsi konsep tropis, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 14 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 55 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbenam.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi,dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (4-5 menit), Goa Langir (2-3 menit), Legon Pari (10-12 menit), dan Tanjung Layar (7 menit).`,
    price: 320000,
    rating: 4.4,
    reviews: 259,
    capacity: 50,
    bedrooms: 14,
    bathrooms: 14,
    image: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-aea2b07141382e5e96f88bfe59f5efe0.jpeg",
    mainImages: [
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-aea2b07141382e5e96f88bfe59f5efe0.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-0db183ec3cca5b93438c55385855a91e.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-e5966fec054c219cd6b107026fe6d9eb.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-875177727d31c57de10a84766703d5a5.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-6597508a2db43a122832fd27725e8a66.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-342f3e22a4a85a464c05616ad17382da.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-bbcd75583c72e71b8cb5916f70a4d2da.jpeg",
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-cabd871a11a7062ab3b6c9c682b69a9d.jpeg",
      "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/d91b99ab_z.jpg",
      "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20036564-dcc2eec2553d85f7c8cab346dfa460a1.jpeg"
    ],
    tags: ["villa", "goa langir sawarna", "premium", "ruang meeting"],
    roomTypes: [
      {
        id: "laguna",
        name: "Laguna",
        description: "Kamar dengan view taman dan akses langsung ke area outdoor, cocok untuk keluarga.",
        price: 400000,
        capacity: 4,
        beds: "2 Queen Bed",
        bathrooms: 1,
        amenities: ["AC", "WiFi", "Kamar Mandi Dalam", "View Taman"],
        images: [
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/ca450ae7_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/b5ee7db5_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/4d94180e_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/0646121a_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/64fd4bca_z.jpg"
        ]
      },
      {
        id: "rimba",
        name: "Rimba",
        description: "Kamar dengan nuansa alam tropis, cocok untuk keluarga kecil yang ingin suasana asri dan sejuk.",
        price: 350000,
        capacity: 3,
        beds: "1 Queen Bed + 1 Single Bed",
        bathrooms: 1,
        amenities: ["AC", "WiFi", "Kamar Mandi Dalam", "Pemandangan Taman"],
        images: [
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/b13b101f_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/8b6de0ed_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/30d27d81_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/7ca3d3a5_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/7495a41b_z.jpg"
        ]
      },
      {
        id: "zamrud",
        name: "Zamrud",
        description: "Kamar dengan sentuhan warna hijau zamrud, memberikan ketenangan dan kenyamanan maksimal.",
        price: 350000,
        capacity: 3,
        beds: "1 Queen Bed + 1 Single Bed",
        bathrooms: 1,
        amenities: ["AC", "WiFi", "Kamar Mandi Dalam", "Pemandangan Taman"],
        images: [
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/d7110f07_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/e36c1b2d_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/42a43b5c_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/c0665c79_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/w647h440x0y0-faed2c0b_z.jpg"
        ]
      },
      {
        id: "paradiso",
        name: "Paradiso",
        description: "Kamar terbesar dengan fasilitas lengkap, cocok untuk rombongan atau keluarga besar.",
        price: 500000,
        capacity: 6,
        beds: "3 Queen Bed",
        bathrooms: 2,
        amenities: ["AC", "WiFi", "2 Kamar Mandi Dalam", "Ruang Keluarga",],
        images: [
          "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20036564-17620bb91ad4386e52d8e4ca140bf6b2.jpeg",
          "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20036564-c1cd6b0ca8a09d208dfd43e395505f89.jpeg",
          "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20036564-25b560e2523f813406448b9c3670da2c.jpeg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/30d27d81_z.jpg",
          "https://ik.imagekit.io/tvlk/generic-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53360000/53350100/53350031/8b6de0ed_z.jpg"
        ]
      }
    ],
    reviewDetails: [
      {
        id: "1",
        author: "Rizky Maulana",
        rating: 9.8,
        comment: "Villa yang sangat mewah dengan fasilitas lengkap. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Luna Maharani",
        rating: 9.6,
        comment: "Lokasi strategis dan bersih. Desain tropis yang modern membuat suasana sangat nyaman. Ruang meeting yang luas dan nyaman.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Yoga Ardiansyah",
        rating: 9.8,
        comment: "Pengalaman menginap yang luar biasa. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga besar.",
        date: "2024-03-05"
      }
    ],
    ratingSummary: {
      score: 8.9,
      totalReviews: 156,
      breakdown: [
        { label: "Kebersihan", value: 8.8 },
        { label: "Kenyamanan Kamar", value: 8.7 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.975719846392589, 106.30001354457787],
    nearbyAttractions: []
  },
  {
    id: "villa-arizky-sawarna",
    name: "Villa Arizky Sawarna",
    type: "villa" as const,
    location: "Legon Pari",
    description: "Villa Arizky Sawarna adalah villa eksklusif yang terletak di Legon Pari, menawarkan pemandangan pantai yang menakjubkan dan suasana yang tenang. Dilengkapi dengan fasilitas modern dan area outdoor yang luas, villa ini sangat cocok untuk liburan keluarga atau rombongan.",
    price: 380000,
    rating: 4.6,
    reviews: 145,
    capacity: 20,
    bedrooms: 5,
    bathrooms: 5,
    image: "https://i.imgur.com/wBoC7ZA.jpeg",
    tags: ["villa", "legon pari", "pantai", "keluarga"],
    amenities: [
      "5 Kamar Tidur Nyaman",
      "5 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "WiFi",
      "Dapur Modern",
      "Area BBQ",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    mainImages: [
      "https://i.imgur.com/wBoC7ZA.jpeg",
      "https://i.imgur.com/acr10CW.jpeg",
      "https://i.imgur.com/kgKwgF5.jpeg",
      "https://i.imgur.com/kJQHIep.jpeg",
      "https://i.imgur.com/foOva3S.jpeg",
      "https://i.imgur.com/XQKMbFZ.jpeg",
      "https://i.imgur.com/0NEMnoK.jpeg",
      "https://i.imgur.com/mokoWMJ.jpeg",
      "https://i.imgur.com/XjtxSUv.jpeg"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standard Room",
        description: "Kamar nyaman dengan double bed, kipas angin, dan kamar mandi dalam.",
        price: 380000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "Parkir Luas"],
        images: [
          "https://i.imgur.com/pExSpkd.jpeg",
          "https://i.imgur.com/DGHi30T.jpeg",
          "https://i.imgur.com/MbbD0cR.jpeg",
          "https://i.imgur.com/xEM5lSJ.jpeg",
          "https://i.imgur.com/c4tdv00.jpeg"
        ]
      },
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar luas untuk keluarga, dengan 2 double bed dan fasilitas lengkap.",
        price: 395000,
        capacity: 4,
        beds: "2 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "Parkir Luas"],
        images: [
          "https://i.imgur.com/XQKMbFZ.jpeg",
          "https://i.imgur.com/DabvprB.jpeg",
          "https://i.imgur.com/TASDEI8.jpeg",
          "https://i.imgur.com/zgtnDbS.jpeg",
          "https://i.imgur.com/acr10CW.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 8.8,
      totalReviews: 145,
      breakdown: [
        { label: "Kebersihan", value: 8.9 },
        { label: "Kenyamanan Kamar", value: 8.8 },
        { label: "Makanan", value: 8.7 },
        { label: "Lokasi", value: 9.0 },
        { label: "Pelayanan dan Fasilitas", value: 8.8 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.987974982122312, 106.32601831796161],
    reviewDetails: [
      {
        id: "1",
        author: "Ahmad Rizki",
        rating: 4.8,
        comment: "Villa sangat nyaman, view pantai luar biasa, cocok untuk keluarga.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Siti Nur",
        rating: 4.7,
        comment: "Fasilitas lengkap, bersih, dan pelayanan ramah.",
        date: "2024-03-10"
      }
    ],
    nearbyAttractions: []
  },
  {
    id: "villa-sinar-matahari-resort",
    name: "Villa Sinar Matahari Resort",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Sinar Matahari Resort adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan matahari terbit yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 18 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbit.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.`,
    price: 450000,
    rating: 4.7,
    reviews: 189,
    capacity: 100,
    bedrooms: 18,
    bathrooms: 6,
    image: "https://i.imgur.com/nalEe4n.jpeg",
    mainImages: [
      "https://i.imgur.com/nalEe4n.jpeg",
      "https://i.imgur.com/dJPXB3o.jpeg",
      "https://i.imgur.com/buvZnBO.jpeg",
      "https://i.imgur.com/HTv5TtH.jpeg",
      "https://i.imgur.com/t2e07FS.jpeg",
      "https://i.imgur.com/SrriRYF.jpeg",
      "https://i.imgur.com/zXqlpvv.jpeg",
      "https://i.imgur.com/Zenhfsh.jpeg",
      "https://i.imgur.com/0fBZA9U.jpeg",
      "https://i.imgur.com/nj62x2B.jpeg",
      "https://i.imgur.com/zLTr5LZ.jpeg",
      "https://i.imgur.com/gHYvnGu.jpeg",
      "https://i.imgur.com/Ndo0XAD.jpeg",
      "https://i.imgur.com/xSIQsbI.jpeg",
      "https://i.imgur.com/jAylpLL.jpeg"
    ],
    tags: ["villa", "pantai sawarna", "ruang meeting"],
    amenities: [
      "6 Kamar Tidur Nyaman",
      "6 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "single-non-ac",
        name: "Single Non AC",
        description: "Kamar single yang nyaman tanpa AC, cocok untuk penginapan ekonomis.",
        price: 255000,
        capacity: 1,
        beds: "1 Single Bed",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/zXqlpvv.jpeg",
          "https://i.imgur.com/HtPXyWd.jpeg",
          "https://i.imgur.com/yO8LxPP.jpeg",
          "https://i.imgur.com/4x3NTLV.jpeg",
          "https://i.imgur.com/SrriRYF.jpeg"
        ],
        amenities: ["Kipas Angin", "WiFi", "Kamar Mandi Dalam", "TV"]
      },
      {
        id: "single-ac",
        name: "Single AC",
        description: "Kamar single yang nyaman dengan AC, dilengkapi dengan fasilitas modern.",
        price: 365000,
        capacity: 1,
        beds: "1 Single Bed",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/nj62x2B.jpeg",
          "https://i.imgur.com/LPY2YGW.jpeg",
          "https://i.imgur.com/5fnhV3u.jpeg",
          "https://i.imgur.com/Ndo0XAD.jpeg",
          "https://i.imgur.com/4ifOJod.jpeg"
        ],
        amenities: ["AC", "WiFi", "Kamar Mandi Dalam", "TV", "Mini Kulkas"]
      },
      {
        id: "double-bedroom",
        name: "Double Bedroom",
        description: "Kamar double yang luas dengan dua tempat tidur, ideal untuk berdua.",
        price: 400000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/0iklgMM.jpeg",
          "https://i.imgur.com/s8tzrI6.jpeg",
          "https://i.imgur.com/fGtnEpN.jpeg",
          "https://i.imgur.com/mkX3Buk.jpeg",
          "https://i.imgur.com/O8RoiSG.jpeg"
        ],
        amenities: ["AC", "WiFi", "Kamar Mandi Dalam", "TV", "Mini Kulkas"]
      },
      {
        id: "family-room",
        name: "Family Room",
        description: "Kamar keluarga yang sangat luas dengan ruang tamu terpisah.",
        price: 600000,
        capacity: 4,
        beds: "2 Queen Beds",
        bathrooms: 2,
        images: [
          "https://i.imgur.com/Zenhfsh.jpeg",
          "https://i.imgur.com/WDG9ZjJ.jpeg",
          "https://i.imgur.com/UCWmfRU.jpeg",
          "https://i.imgur.com/Ra9a4iU.jpeg",
          "https://i.imgur.com/lEWj0go.jpeg"
        ],
        amenities: ["AC", "WiFi", "2 Kamar Mandi Dalam", "TV", "Mini Kulkas", "Ruang Tamu"]
      }
    ],
    ratingSummary: {
      score: 8.7,
      totalReviews: 189,
      breakdown: [
        { label: "Kebersihan", value: 8.8 },
        { label: "Kenyamanan Kamar", value: 8.6 },
        { label: "Makanan", value: 8.7 },
        { label: "Lokasi", value: 8.8 },
        { label: "Pelayanan dan Fasilitas", value: 8.6 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Hadi Rizwan",
        rating: 4.9,
        comment: "Villa yang sangat nyaman. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Malik Rashid",
        rating: 4.7,
        comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Faris Anwar",
        rating: 4.8,
        comment: "Fasilitas lengkap, bersih, dan pelayanan ramah.",
        date: "2024-03-05"
      },
      {
        id: "4",
        author: "Rafisqy Haikal",
        rating: 4.6,
        comment: "Pengalaman menginap yang luar biasa. Kamar bersih dan nyaman.",
        date: "2024-02-28"
      },
      {
        id: "5",
        author: "Mona Hasibuan",
        rating: 4.9,
        comment: "Cocok untuk liburan keluarga. Pemandangan pantai yang menakjubkan.",
        date: "2024-02-20"
      }
    ],
    nearbyAttractions: []
  },
  {
    id: "villa-putri-asih",
    name: "Villa Putri Asih",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Putri Asih adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang unik dan nyaman.

Fasilitas utama villa ini meliputi 4 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai yang indah.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (2 menit berjalan kaki), Goa Langir (5 menit berkendara), Legon Pari (8 menit berkendara), dan Tanjung Layar (10 menit berkendara).`,
    price: 400000,
    rating: 4.5,
    reviews: 178,
    capacity: 32,
    bedrooms: 4,
    bathrooms: 4,
    image: "https://i.imgur.com/ac6qcyq.jpeg",
    mainImages: [
      "https://i.imgur.com/ac6qcyq.jpeg",
      "https://i.imgur.com/bsoX9Sb.jpeg",
      "https://i.imgur.com/17cGCvg.jpeg",
      "https://i.imgur.com/ksFgVJL.jpeg",
      "https://i.imgur.com/0eAobNP.jpeg",
      "https://i.imgur.com/bsoX9Sb.jpeg",
      "https://i.imgur.com/jmiTW7d.jpeg",
      "https://i.imgur.com/xLSh7cH.jpeg",
      "https://i.imgur.com/0eAobNP.jpeg",
      "https://i.imgur.com/ac6qcyq.jpeg"
    ],
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "4 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan pantai yang menakjubkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 400000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/jmiTW7d.jpeg",
          "https://i.imgur.com/UL37iEs.jpeg",
          "https://i.imgur.com/0eAobNP.jpeg",
          "https://i.imgur.com/xLSh7cH.jpeg",
          "https://i.imgur.com/bsoX9Sb.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan pantai yang menakjubkan dan fasilitas modern untuk kenyamanan maksimal.",
        price: 500000,
        capacity: 3,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/KwB90iV.jpeg",
          "https://i.imgur.com/EhGmbu2.jpeg",
          "https://i.imgur.com/111ocDI.jpeg",
          "https://i.imgur.com/0eAobNP.jpeg",
          "https://i.imgur.com/ac6qcyq.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    ratingSummary: {
      score: 8.8,
      totalReviews: 178,
      breakdown: [
        { label: "Kebersihan", value: 8.7 },
        { label: "Kenyamanan Kamar", value: 8.6 },
        { label: "Makanan", value: 8.5 },
        { label: "Lokasi", value: 8.8 },
        { label: "Pelayanan dan Fasilitas", value: 8.6 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.9,
        comment: "Villa yang sangat nyaman. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.8,
        comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Ahmad Rizki",
        rating: 4.9,
        comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
        date: "2024-03-05"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.982508012805922, 106.30846527931784],
    nearbyAttractions: []
  },
  {
    id: "villa-widi",
    name: "Villa Widi",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Widi adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 4 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.`,
    price: 380000,
    rating: 4.2,
    reviews: 25,
    capacity: 4,
    bedrooms: 4,
    bathrooms: 4,
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
    tags: ["villa", "pantai sawarna", "view pantai"],
    amenities: [
      "4 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    mainImages: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan pantai yang menakjubkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 380000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    ratingSummary: {
      score: 8.5,
      totalReviews: 25,
      breakdown: [
        { label: "Kebersihan", value: 8.4 },
        { label: "Kenyamanan Kamar", value: 8.3 },
        { label: "Makanan", value: 8.4 },
        { label: "Lokasi", value: 8.5 },
        { label: "Pelayanan dan Fasilitas", value: 8.3 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.5,
        comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.4,
        comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
        date: "2024-03-10"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.983433239060691, 106.30965162602301],
    nearbyAttractions: []
  },
  {
    id: "villa-batara",
    name: "Villa Batara II Sawarna",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Batara adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang eksklusif dan nyaman.

Fasilitas utama villa ini meliputi 6 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 55 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan jacuzzi menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai yang indah.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (1 menit berjalan kaki), Goa Langir (4 menit berkendara), Legon Pari (7 menit berkendara), dan Tanjung Layar (9 menit berkendara).`,
    price: 375000,
    rating: 4.8,
    reviews: 245,
    capacity: 30,
    bedrooms: 6,
    bathrooms: 6,
    image: "https://i.imgur.com/uttvn6n.jpeg",
    mainImages: [
      "https://i.imgur.com/uttvn6n.jpeg",
      "https://i.imgur.com/T7Ygrxg.jpeg",
      "https://i.imgur.com/uWfd0oX.jpeg",
      "https://i.imgur.com/MsFqSlH.jpeg",
      "https://i.imgur.com/JUl0NNU.jpeg",
      "https://i.imgur.com/UMSaknJ.jpeg",
      "https://i.imgur.com/NVXagNT.jpeg",
      "https://i.imgur.com/agy9av5.jpeg"
    ],
    tags: ["villa", "pantai sawarna", "dekat pantai", "jacuzzi"],
    amenities: [
      "6 Kamar Tidur Mewah",
      "6 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Jacuzzi",
      "Ruang Meeting",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "dekat Pantai"
    ],
    roomTypes: [
      {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan pantai yang menakjubkan dan fasilitas modern untuk kenyamanan maksimal.",
        price: 375000,
        capacity: 4,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/nsx2JLR.jpeg",
          "https://i.imgur.com/lldZEVy.jpeg",
          "https://i.imgur.com/PMg49CZ.jpeg",
          "https://i.imgur.com/agy9av5.jpeg",
          "https://i.imgur.com/NVXagNT.jpeg"
        ],
        amenities: ["AC", "TV", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Setrika", "Perlengkapan Mandi", "dekat Pantai"]
      }
    ],
    ratingSummary: {
      score: 9.0,
      totalReviews: 245,
      breakdown: [
        { label: "Kebersihan", value: 9.1 },
        { label: "Kenyamanan Kamar", value: 9.0 },
        { label: "Makanan", value: 8.9 },
        { label: "Lokasi", value: 9.2 },
        { label: "Pelayanan dan Fasilitas", value: 8.8 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.8,
        comment: "Villa yang sangat nyaman. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.7,
        comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Ahmad Rizki",
        rating: 4.9,
        comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
        date: "2024-03-05"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.983534406852092, 106.30965564933643]
  },
  {
    id: "villa-andrew-pasput",
    name: "Villa Andrew Pasput",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Andrew Pasput adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 5 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.`,
    price: 420000,
    rating: 4.6,
    reviews: 32,
    capacity: 5,
    bedrooms: 5,
    bathrooms: 5,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    tags: ["villa", "pantai sawarna", "view pantai"],
    amenities: [
      "5 Kamar Tidur Nyaman",
      "5 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman Asri",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    mainImages: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan pantai yang menakjubkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 420000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
          "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
          "https://images.unsplash.com/photo-1505693314120-0d443867891c"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.6,
      totalReviews: 32,
      breakdown: [
        { label: "Kebersihan", value: 8.7 },
        { label: "Kenyamanan Kamar", value: 8.5 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.7 },
        { label: "Pelayanan dan Fasilitas", value: 8.5 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.6,
        comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.5,
        comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
        date: "2024-03-10"
      }
    ],
    contact: { phone: "087820952251" },
    coordinates: [-6.982214529616017, 106.3096083872957]
  },
  {
    id: "villa-cempaka",
    name: "Villa Cempaka",
    type: "villa" as const,
    location: "Legon Pari",
    description: "Villa nyaman dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ. Lokasi strategis dekat dengan pantai dan atraksi lokal.",
    price: 320000,
    rating: 4.4,
    reviews: 163,
    capacity: 40,
    bedrooms: 10,
    bathrooms: 4,
    image: "https://i.imgur.com/MBymqfS.jpeg",
    tags: ["villa", "legon pari"],
    amenities: [
      "10 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ Luas",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas"
    ],
    mainImages: [
      "https://i.imgur.com/MBymqfS.jpeg",
      "https://i.imgur.com/UYjw1CE.jpeg",
      "https://i.imgur.com/R0HR9FM.jpeg",
      "https://i.imgur.com/AthrjXv.jpeg",
      "https://i.imgur.com/sFQwfll.jpeg",
      "https://i.imgur.com/yX0potM.jpeg",
      "https://i.imgur.com/qKALLdC.jpeg",
      "https://i.imgur.com/iAmVH4D.jpeg",
      "https://i.imgur.com/ZWM1vUu.jpeg"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standard Room",
        description: "Kamar nyaman dengan twin bed, ideal untuk berdua. Dilengkapi dengan kipas angin dan kamar mandi dalam dengan air panas.",
        price: 320000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Parkir Luas"],
        images: [
          "https://i.imgur.com/iAmVH4D.jpeg",
          "https://i.imgur.com/ZWM1vUu.jpeg",
          "https://i.imgur.com/UYjw1CE.jpeg",
          "https://i.imgur.com/R0HR9FM.jpeg",
          "https://i.imgur.com/qKALLdC.jpeg"
        ]
      },
      {
        id: "extrabed-room",
        name: "Extra Bed Room",
        description: "Kamar nyaman dengan extra bed, ideal untuk keluarga kecil. Dilengkapi dengan kipas angin dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 3,
        beds: "2 Single Beds + 1 Extra Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Parkir Luas"],
        images: [
          "https://i.imgur.com/iAmVH4D.jpeg",
          "https://i.imgur.com/ZWM1vUu.jpeg",
          "https://i.imgur.com/UYjw1CE.jpeg",
          "https://i.imgur.com/R0HR9FM.jpeg",
          "https://i.imgur.com/qKALLdC.jpeg",
          "https://i.imgur.com/A4khdow.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 8.7,
      totalReviews: 163,
      breakdown: [
        { label: "Kebersihan", value: 8.5 },
        { label: "Kenyamanan Kamar", value: 8.8 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.987281692878949, 106.32599122186257],
    nearbyAttractions: []
  },
  {
    id: "villa-family-sawarna",
    name: "Villa Family Sawarna",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Family Sawarna adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 6 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbit.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (depan pantai), Goa Langir (8 menit berkendara), Legon Pari (9-10 menit berkendara), dan Tanjung Layar (4 menit berkendara).`,
    price: 450000,
    rating: 4.8,
    reviews: 156,
    capacity: 30,
    bedrooms: 6,
    bathrooms: 6,
    image: "https://i.imgur.com/KP2ncPi.jpeg",
    tags: ["villa", "pantai sawarna", "ruang meeting", "family friendly"],
    amenities: [
      "6 Kamar Tidur Nyaman",
      "6 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    mainImages: [
      "https://i.imgur.com/KP2ncPi.jpeg",
      "https://i.imgur.com/d22kux8.jpeg",
      "https://i.imgur.com/BtWp6Yr.jpeg",
      "https://i.imgur.com/YjosayP.jpeg",
      "https://i.imgur.com/SOKaH8H.jpeg",
      "https://i.imgur.com/7Djvl8E.jpeg",
      "https://i.imgur.com/g4cFUG6.jpeg",
      "https://i.imgur.com/nxHkeGn.jpeg"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan pantai yang menakjubkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/9Hcp40U.jpeg",
          "https://i.imgur.com/JHASLtZ.jpeg",
          "https://i.imgur.com/Khg9u7S.jpeg",
          "https://i.imgur.com/yDZCZww.jpeg",
          "https://i.imgur.com/uh8FQep.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan pantai yang menakjubkan dan fasilitas modern untuk kenyamanan maksimal.",
        price: 600000,
        capacity: 3,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/nsx2JLR.jpeg",
          "https://i.imgur.com/lldZEVy.jpeg",
          "https://i.imgur.com/NVXagNT.jpeg",
          "https://i.imgur.com/PMg49CZ.jpeg",
          "https://i.imgur.com/agy9av5.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar luas ideal untuk keluarga. Dilengkapi dengan AC dan kamar mandi dalam yang nyaman.",
        price: 597000,
        capacity: 12,
        beds: "2 Double Beds",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam", "WiFi", "Mini Kulkas", "TV LED", "Sofa"],
        images: [
          "https://i.imgur.com/hwrTWry.jpeg",
          "https://i.imgur.com/H7cnL1E.jpeg",
          "https://i.imgur.com/KEdpRpf.jpeg",
          "https://i.imgur.com/chZSK1p.jpeg",
          "https://i.imgur.com/wIFDFF0.jpeg"
        ]
      }
    ],
    ratingSummary: {
      score: 9.0,
      totalReviews: 156,
      breakdown: [
        { label: "Kebersihan", value: 9.1 },
        { label: "Kenyamanan Kamar", value: 9.0 },
        { label: "Makanan", value: 8.9 },
        { label: "Lokasi", value: 9.2 },
        { label: "Pelayanan dan Fasilitas", value: 8.8 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.8,
        comment: "Villa yang sangat nyaman. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.7,
        comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Ahmad Rizki",
        rating: 4.9,
        comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
        date: "2024-03-05"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.984509398549827, 106.31045079908536],
    nearbyAttractions: []
  },
  {
    id: "villa-muara-legon-pari",
    name: "Villa Muara Legon Pari",
    type: "villa" as const,
    location: "Legon Pari",
    description: `Villa Muara Legon Pari adalah villa eksklusif yang terletak tepat di tepi Pantai Legon Pari. Menawarkan pemandangan laut yang menakjubkan, suasana tenang, dan fasilitas modern, villa ini sangat cocok untuk liburan keluarga maupun rombongan.`,
    price: 400000,
    rating: 4.7,
    reviews: 120,
    capacity: 16,
    bedrooms: 6,
    bathrooms: 6,
    image: "https://i.imgur.com/113iLqC.jpeg",
    mainImages: [
      "https://i.imgur.com/113iLqC.jpeg",
      "https://i.imgur.com/SL61Ddj.jpeg",
      "https://i.imgur.com/d1uiuL6.jpeg",
      "https://i.imgur.com/V1nNNWI.jpeg",
      "https://i.imgur.com/lp4y4lz.jpeg",
      "https://i.imgur.com/TyvQWkE.jpeg",
      "https://i.imgur.com/K0oZJhl.jpeg",
      "https://i.imgur.com/ep3rbbc.jpeg"
    ],
    tags: ["villa", "legon pari", "pantai", "keluarga"],
    amenities: [
      "6 Kamar Tidur Nyaman",
      "6 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "Parkir Luas",
      "WiFi",
      "Dapur Modern",
      "Area BBQ",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standard Room",
        description: "Kamar nyaman dengan double bed, kipas angin, TV, dan kamar mandi dalam.",
        price: 350000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Parkir Luas", "Kamar Mandi Dalam", "Air Panas", "WiFi"],
        images: [
          "https://i.imgur.com/NrQtZBp.jpeg",
          "https://i.imgur.com/NCmW3YT.jpeg",
          "https://i.imgur.com/NrQtZBp.jpeg",
          "https://i.imgur.com/XbUWjkF.jpeg",
          "https://i.imgur.com/ep3rbbc.jpeg"
        ]
      },
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar mewah dengan pemandangan pantai, dilengkapi fasilitas premium.",
        price: 375000,
        capacity: 2,
        beds: "1 King Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "View Pantai"],
        images: [
          "https://i.imgur.com/kk3uXA7.jpeg",
          "https://i.imgur.com/pngviek.jpeg",
          "https://i.imgur.com/rkMGwqt.jpeg",
          "https://i.imgur.com/6bRwedR.jpeg",
          "https://i.imgur.com/mzEJPe8.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 9.0,
      totalReviews: 120,
      breakdown: [
        { label: "Kebersihan", value: 9.1 },
        { label: "Kenyamanan Kamar", value: 9.2 },
        { label: "Makanan", value: 8.8 },
        { label: "Lokasi", value: 9.5 },
        { label: "Pelayanan dan Fasilitas", value: 9.0 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.987766614844215, 106.32177456451163],
    reviewDetails: [
      {
        id: "1",
        author: "Budi Santoso",
        rating: 4.8,
        comment: "Villa sangat nyaman, view pantai luar biasa, cocok untuk keluarga.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.7,
        comment: "Fasilitas lengkap, bersih, dan pelayanan ramah.",
        date: "2024-03-10"
      }
    ],
    nearbyAttractions: []
  },
  {
    id: "villa-sabumi-goa-langir",
    name: "Villa Sabumi Goa Langir",
    type: "villa" as const,
    location: "Goa Langir",
    description: `Villa Sabumi Goa Langir adalah villa nyaman yang terletak di kawasan Goa Langir. Dengan kapasitas hingga 30 tamu, villa ini menawarkan pengalaman menginap yang tak terlupakan dengan berbagai tipe kamar yang dapat dipilih sesuai kebutuhan.

Fasilitas utama villa ini meliputi kamar-kamar nyaman yang dilengkapi AC dan kipas angin, memastikan kenyamanan tamu dalam segala cuaca. Setiap kamar didesain dengan mempertimbangkan kenyamanan dan fungsionalitas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, termasuk Goa Langir yang berada di dekat villa.`,
    price: 300000,
    rating: 4.5,
    reviews: 201,
    capacity: 30,
    bedrooms: 10,
    bathrooms: 5,
    image: "https://i.imgur.com/HisfkFs.jpeg",
    mainImages: [
      "https://i.imgur.com/HisfkFs.jpeg",
      "https://i.imgur.com/ttlTfhR.jpeg",
      "https://i.imgur.com/yJZWSQ2.jpeg",
      "https://i.imgur.com/vAiJMMx.jpeg",
      "https://i.imgur.com/GJGvv8Z.jpeg",
      "https://i.imgur.com/2ItBE2B.jpeg",
      "https://i.imgur.com/VrcsToO.jpeg",
      "https://i.imgur.com/hwrTWry.jpeg",
      "https://i.imgur.com/jMPb2Kg.jpeg",
      "https://i.imgur.com/IF91kqD.jpeg",
      "https://i.imgur.com/Xv7HrPW.jpeg",
      "https://i.imgur.com/S9vUVGx.jpeg"
    ],
    tags: ["villa", "goa langir"],
    amenities: [
      "AC",
      "Kipas Angin",
      "WiFi",
      "Parkir Luas",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Dapur Bersama",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium"
    ],
    roomTypes: [
      {
        id: "single-bedroom",
        name: "Single Bedroom",
        description: "Kamar nyaman dengan single bed, ideal untuk satu orang. Dilengkapi dengan kipas angin dan kamar mandi dalam.",
        price: 250000,
        capacity: 2,
        beds: "1 Single Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/reGQLRF.jpeg",
          "https://i.imgur.com/XuAHgyi.jpeg",
          "https://i.imgur.com/bTzTWF8.jpeg",
          "https://i.imgur.com/WCVedML.jpeg",
          "https://i.imgur.com/OuzmnMz.jpeg"
        ]
      },
      {
        id: "non-ac-twinbed",
        name: "Non AC Twinbed",
        description: "Kamar nyaman dengan twin bed, ideal untuk berdua. Dilengkapi dengan kipas angin dan kamar mandi dalam.",
        price: 300000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/chUKixP.jpeg",
          "https://i.imgur.com/ystamnb.jpeg",
          "https://i.imgur.com/9uXMNeu.jpeg",
          "https://i.imgur.com/BGaNbOO.jpeg",
          "https://i.imgur.com/vAiJMMx.jpeg"
        ]
      },
      {
        id: "ac-twinbed",
        name: "AC Twinbed",
        description: "Kamar nyaman dengan twin bed dan AC, ideal untuk berdua. Dilengkapi dengan kamar mandi dalam.",
        price: 450000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/0tA6cIb.jpeg",
          "https://i.imgur.com/HEYe5UW.jpeg",
          "https://i.imgur.com/0tA6cIb.jpeg",
          "https://i.imgur.com/ffDlqHV.jpeg",
          "https://i.imgur.com/S9vUVGx.jpeg"
        ]
      },
      {
        id: "family-room",
        name: "Family Room",
        description: "Kamar luas ideal untuk keluarga. Dilengkapi dengan AC dan kamar mandi dalam yang nyaman.",
        price: 597000,
        capacity: 12,
        beds: "2 Double Beds",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam", "WiFi", "Mini Kulkas", "TV LED", "Sofa"],
        images: [
          "https://i.imgur.com/hwrTWry.jpeg",
          "https://i.imgur.com/H7cnL1E.jpeg",
          "https://i.imgur.com/KEdpRpf.jpeg",
          "https://i.imgur.com/chZSK1p.jpeg",
          "https://i.imgur.com/wIFDFF0.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.6,
      totalReviews: 201,
      breakdown: [
        { label: "Kebersihan", value: 8.7 },
        { label: "Kenyamanan Kamar", value: 8.6 },
        { label: "Makanan", value: 8.5 },
        { label: "Lokasi", value: 8.8 },
        { label: "Pelayanan dan Fasilitas", value: 8.4 }
      ]
    },
    contact: { phone: "0838-4134-8177" },
    coordinates: [-6.974516327669769, 106.29791816930964]
  },
  {
    id: "villa-cariang-resort",
    name: "Vila Cariang Resort",
    type: "villa",
    location: "Goa Langir, Sawarna",
    description: "Villa mewah dengan pemandangan yang menakjubkan dan arsitektur modern. Menawarkan berbagai fasilitas dan tipe kamar untuk kenyamanan maksimal.",
    price: 354000,
    rating: 4.8,
    reviews: 173,
    capacity: 60,
    bedrooms: 8,
    bathrooms: 8,
    image: "https://i.imgur.com/DZUDP0B.jpeg",
    mainImages: [
      "https://i.imgur.com/DZUDP0B.jpeg",
      "https://i.imgur.com/fcXMylc.jpeg",
      "https://i.imgur.com/j6DVFuR.jpeg",
      "https://i.imgur.com/ElZhSYF.jpeg",
      "https://i.imgur.com/tEHYq0T.jpeg",
      "https://i.imgur.com/kT0WXmy.jpeg",
      "https://i.imgur.com/9x03WMf.jpeg",
      "https://i.imgur.com/d3uH6hO.jpeg",
      "https://i.imgur.com/PJt26cy.jpeg",
      "https://i.imgur.com/swSUfVW.jpeg"
    ],
    tags: ["villa", "goa langir sawarna"],
    amenities: [
      "8 Kamar Tidur Nyaman",
      "8 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi",
      "Dapur Modern Premium",
      "Area BBQ",
      "Gazebo",
      "Taman",
      "Parkir Luas",
      "Ruang Meeting",
      "24/7 Security",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Mesin Cuci",
      "Setrika",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Premium",
      "Air Panas"
    ],
    roomTypes: [
      {
        id: "deluxe",
        name: "Deluxe Room",
        description: "Kamar deluxe yang nyaman dengan fasilitas AC, kamar mandi dalam, dan balkon pribadi.",
        price: 376000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam", "Balkon Pribadi"],
        images: [
          "https://i.imgur.com/ElZhSYF.jpeg",
          "https://i.imgur.com/nb3Fxcf.jpeg",
          "https://i.imgur.com/VcikUed.jpeg",
          "https://i.imgur.com/eIpU58u.jpeg",
          "https://i.imgur.com/3O7Gpww.jpeg"
        ]
      },
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan fasilitas AC dan kamar mandi dalam.",
        price: 354000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/d3uH6hO.jpeg",
          "https://i.imgur.com/XmAZJ8l.jpeg",
          "https://i.imgur.com/thRorLX.jpeg",
          "https://i.imgur.com/qBmhiTV.jpeg",
          "https://i.imgur.com/Qa2Grm5.jpeg"
        ]
      },
      {
        id: "twin",
        name: "Twin Bed Room",
        description: "Kamar dengan dua tempat tidur single yang nyaman, dilengkapi AC dan kamar mandi dalam.",
        price: 445000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/j6DVFuR.jpeg",
          "https://i.imgur.com/1GSrovx.jpeg",
          "https://i.imgur.com/SfJpzyz.jpeg",
          "https://i.imgur.com/c9jqfTs.jpeg",
          "https://i.imgur.com/kfq3Ovl.jpeg"
        ]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar luas dengan fasilitas AC, 2 kamar tidur, ruang tamu, dapur, dan kamar mandi dalam.",
        price: 750000,
        capacity: 6,
        beds: "2 Double Beds",
        bathrooms: 1,
        amenities: ["AC", "2 Kamar Tidur", "Ruang Tamu", "Dapur", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/kT0WXmy.jpeg",
          "https://i.imgur.com/9ZvRSD8.jpeg",
          "https://i.imgur.com/qBmhiTV.jpeg",
          "https://i.imgur.com/dK0peaP.jpeg",
          "https://i.imgur.com/5pcAm7v.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.9,
      totalReviews: 156,
      breakdown: [
        { label: "Kebersihan", value: 8.8 },
        { label: "Kenyamanan Kamar", value: 8.7 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.97445948392045, 106.29753739059582]
  },
  {
    id: "villa-mang-engkos-goa-langir",
    name: "Vila Mang Engkos Goa Langir",
    type: "villa",
    location: "Goa Langir",
    description: "Villa nyaman dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan fasilitas lengkap dan tipe kamar yang beragam untuk kenyamanan maksimal.",
    price: 356000,
    rating: 4.7,
    reviews: 183,
    capacity: 80,
    bedrooms: 12,
    bathrooms: 10,
    image: "https://i.imgur.com/r6953wc.jpeg",
    mainImages: [
      "https://i.imgur.com/r6953wc.jpeg",
      "https://i.imgur.com/ooxKkwj.jpeg",
      "https://i.imgur.com/SZQ72c4.jpeg",
      "https://i.imgur.com/Whd3LQg.jpeg",
      "https://i.imgur.com/wAh3bEo.jpeg",
      "https://i.imgur.com/BNzthL3.jpeg",
      "https://i.imgur.com/The9oct.jpeg",
      "https://i.imgur.com/aqjPwEF.jpeg",
      "https://i.imgur.com/dZFW7en.jpeg",
      "https://i.imgur.com/U5Bh1XI.jpeg"
    ],
    tags: ["villa", "goa langir"],
    amenities: [
      "12 Kamar Tidur Nyaman",
      "10 Kamar Mandi Dalam",
      "Semi AC",
      "24/7 Security",
      "WiFi",
      "Dapur Umum",
      "Area BBQ",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan fasilitas kipas angin dan kamar mandi dalam.",
        price: 356000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/eLftu5p.jpeg",
          "https://i.imgur.com/cZCBWWP.jpeg",
          "https://i.imgur.com/KWvn7pD.jpeg",
          "https://i.imgur.com/qjfb0FI.jpeg",
          "https://i.imgur.com/47HmoZt.jpeg"
        ]
      },
      {
        id: "semi-ac",
        name: "Semi AC Room",
        description: "Kamar nyaman dengan fasilitas kipas angin, semi AC, dan kamar mandi dalam.",
        price: 400000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Semi AC", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/4MQlbv2.jpeg",
          "https://i.imgur.com/bDZrWsF.jpeg",
          "https://i.imgur.com/RYXLkod.jpeg",
          "https://i.imgur.com/2asafYP.jpeg",
          "https://i.imgur.com/KWvn7pD.jpeg"
        ]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar luas ideal untuk keluarga dengan 2 kamar tidur, ruang tamu, dapur, dan kamar mandi dalam.",
        price: 850000,
        capacity: 6,
        beds: "2 Double Beds",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Semi AC", "2 Kamar Tidur", "Ruang Tamu", "Dapur", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/wAh3bEo.jpeg",
          "https://i.imgur.com/12fDKlN.jpeg",
          "https://i.imgur.com/WXKRncI.jpeg",
          "https://i.imgur.com/rJRJ8OB.jpeg",
          "https://i.imgur.com/The9oct.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.7,
      totalReviews: 183,
      breakdown: [
        { label: "Kebersihan", value: 8.8 },
        { label: "Kenyamanan Kamar", value: 8.7 },
        { label: "Makanan", value: 8.6 },
        { label: "Lokasi", value: 8.9 },
        { label: "Pelayanan dan Fasilitas", value: 8.7 }
      ]
    },
    reviewDetails: [
      {
        id: "1",
        author: "Robby",
        rating: 4.8,
        comment: "Villa yang sangat nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah. Lokasi strategis dekat dengan Goa Langir.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Nina Sari",
        rating: 4.7,
        comment: "Pengalaman menginap yang menyenangkan. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga atau rombongan.",
        date: "2024-03-10"
      },
      {
        id: "3",
        author: "Asep Saepulloh",
        rating: 4.6,
        comment: "Villa dengan lokasi yang strategis. Kamar nyaman dan bersih. Staff sangat ramah dan membantu. Pemandangan sekitar yang menenangkan.",
        date: "2024-03-05"
      },
      {
        id: "4",
        author: "Hakimi Fajar",
        rating: 4.8,
        comment: "Tempat yang sempurna untuk beristirahat. Fasilitas lengkap, kamar nyaman, dan pelayanan memuaskan. Pasti akan kembali lagi.",
        date: "2024-02-28"
      },
      {
        id: "5",
        author: "Minarti",
        rating: 4.7,
        comment: "Villa yang sangat direkomendasikan. Lokasi dekat dengan Goa Langir, fasilitas lengkap, dan staff yang sangat ramah. Pengalaman menginap yang menyenangkan.",
        date: "2024-02-20"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.975993908906087, 106.29566972542729]
  },
  {
    id: "villa-pondok-indah",
    name: "Villa Pondok Indah",
    type: "villa",
    location: "Goa Langir",
    description: "Villa Pondok Indah menawarkan penginapan nyaman dengan pemandangan pantai yang memukau. Terletak di kawasan Goa Langir, villa ini dilengkapi dengan fasilitas lengkap untuk kenyamanan tamu.",
    price: 350000,
    rating: 4.5,
    reviews: 45,
    capacity: 40,
    bedrooms: 12,
    bathrooms: 12,
    image: "https://i.imgur.com/UHkUCFQ.jpeg",
    mainImages: [
      "https://i.imgur.com/UHkUCFQ.jpeg",
      "https://i.imgur.com/xeJBJQa.jpeg",
      "https://i.imgur.com/FFbadDz.jpeg",
      "https://i.imgur.com/85XT8Ee.jpeg",
      "https://i.imgur.com/kJJniNL.jpeg",
      "https://i.imgur.com/pAubh8Z.jpeg",
      "https://i.imgur.com/Oz3HFDJ.jpeg",
      "https://i.imgur.com/UQsa2E5.jpeg",
      "https://i.imgur.com/EBDKaS8.jpeg",
      "https://i.imgur.com/XThP3fN.jpeg"
    ],
    tags: ["villa", "goa langir"],
    amenities: [
      "12 Kamar Tidur Nyaman",
      "12 Kamar Mandi Dalam",
      "Kipas Angin",
      "24/7 Security",
      "WiFi",
      "Dapur Umum",
      "Area BBQ",
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standar Room",
        description: "Kamar nyaman dengan fasilitas lengkap untuk kenyamanan tamu.",
        price: 350000,
        capacity: 4,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/kJJniNL.jpeg",
          "https://i.imgur.com/lwogTP2.jpeg",
          "https://i.imgur.com/9sPTMSn.jpeg",
          "https://i.imgur.com/9sPTMSn.jpeg",
          "https://i.imgur.com/1Ul5K84.jpeg"
        ]
      },
      {
        id: "juice-room",
        name: "Juice Room",
        description: "Kamar nyaman dengan fasilitas lengkap untuk kenyamanan tamu.",
        price: 365000,
        capacity: 4,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "Kamar Mandi Dalam"],
        images: [
          "https://i.imgur.com/pAubh8Z.jpeg",
          "https://i.imgur.com/amO94P7.jpeg",
          "https://i.imgur.com/acYSGfZ.jpeg",
          "https://i.imgur.com/1Ul5K84.jpeg",
          "https://i.imgur.com/cfUD1ug.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.5,
      totalReviews: 45,
      breakdown: [
        { label: "Kebersihan", value: 8.7 },
        { label: "Kenyamanan Kamar", value: 8.6 },
        { label: "Lokasi", value: 8.8 },
        { label: "Pelayanan dan Fasilitas", value: 8.5 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.975869538611312, 106.29469129667444]
  },
  {
    id: "villa-amira-sawana",
    name: "Villa Amira Sawarna",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Amira Sawana adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 5 kamar tidur nyaman yang masing-masing dilengkapi kipas angin dan kamar mandi dalam. Area outdoor yang luas dengan area BBQ menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur umum yang lengkap dengan peralatan memasak memungkinkan Anda untuk memasak sendiri, sementara area BBQ menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi dan keamanan 24/7.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (depan pantai), Goa Langir (8 menit berkendara), Legon Pari (9-10 menit berkendara), dan Tanjung Layar (4 menit berkendara).`,
    price: 375000,
    rating: 4.5,
    reviews: 0,
    capacity: 40,
    bedrooms: 5,
    bathrooms: 5,
    image: "https://i.imgur.com/74dBeW4.jpeg",
    mainImages: [
      "https://i.imgur.com/74dBeW4.jpeg",
      "https://i.imgur.com/SJGWPBK.jpeg",
      "https://i.imgur.com/o43oCkS.jpeg",
      "https://i.imgur.com/ai9PQ8Y.jpeg",
      "https://i.imgur.com/9BPqPK1.jpeg",
      "https://i.imgur.com/wBRZvCh.jpeg",
      "https://i.imgur.com/ooE1s3Y.jpeg",
      "https://i.imgur.com/H9q2pTd.jpeg",
      "https://i.imgur.com/5ll8Fr6.jpeg",
      "https://i.imgur.com/60c1VMQ.jpeg",
      "https://i.imgur.com/nPvazMy.jpeg"
    ],
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "5 Kamar Tidur Nyaman",
      "5 Kamar Mandi Dalam",
      "Kipas Angin",
      "24/7 Security",
      "WiFi",
      "Dapur Umum",
      "Area BBQ",
      "Dekat Pantai"
    ],
    roomTypes: [
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar nyaman dengan AC, kamar mandi dalam, WiFi, dan akses ke dapur umum.",
        price: 375000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["AC", "Kamar Mandi Dalam", "WiFi", "Dapur Umum"],
        images: [
          "https://i.imgur.com/u0SNRX7.jpeg",
          "https://i.imgur.com/TLgEOiR.jpeg",
          "https://i.imgur.com/60c1VMQ.jpeg",
          "https://i.imgur.com/nPvazMy.jpeg",
          "https://i.imgur.com/WblAz6v.jpeg"
        ]
      },
      {
        id: "family-room",
        name: "Family Room",
        description: "Kamar luas untuk keluarga dengan 3 king bed, kamar mandi dalam, dapur umum, dan WiFi.",
        price: 654000,
        capacity: 6,
        beds: "3 King Bed",
        bathrooms: 1,
        amenities: ["AC", "3 King Bed", "Kamar Mandi Dalam", "Dapur Umum", "WiFi"],
        images: [
          "https://i.imgur.com/SJGWPBK.jpeg",
          "https://i.imgur.com/YYNU69S.jpeg",
          "https://i.imgur.com/5ll8Fr6.jpeg",
          "https://i.imgur.com/ZEhEBEA.jpeg",
          "https://i.imgur.com/H9q2pTd.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 0,
      totalReviews: 0,
      breakdown: [
        { label: "Kebersihan", value: 0 },
        { label: "Kenyamanan Kamar", value: 0 },
        { label: "Makanan", value: 0 },
        { label: "Lokasi", value: 0 },
        { label: "Pelayanan dan Fasilitas", value: 0 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.983452322598835, 106.30962763855953]
  },
  {
    id: "villa-ablo-sawarna",
    name: "Villa Ablo Sawarna",
    type: "villa",
    location: "Pantai Sawarna",
    description: "Villa nyaman dengan pemandangan sawah yang menakjubkan. Menawarkan berbagai fasilitas untuk kenyamanan maksimal tamu.",
    price: 302000,
    rating: 4.5,
    reviews: 0,
    capacity: 35,
    bedrooms: 5,
    bathrooms: 5,
    image: "https://i.imgur.com/YPIK3qY.jpeg",
    mainImages: [
      "https://i.imgur.com/YPIK3qY.jpeg",
      "https://i.imgur.com/z3PxvX6.jpeg",
      "https://i.imgur.com/8Y6K1al.jpeg",
      "https://i.imgur.com/VFLW55i.jpeg",
      "https://i.imgur.com/L7FqHP5.jpeg",
      "https://i.imgur.com/YAz8Xiz.jpeg",
      "https://i.imgur.com/BOSz0fW.jpeg",
      "https://i.imgur.com/M3nQjw1.jpeg"
    ],
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "5 Kamar Tidur Nyaman",
      "5 Kamar Mandi Dalam",
      "Kipas Angin",
      "24/7 Security",
      "WiFi",
      "Dapur Umum",
      "Area BBQ",
      "Dekat Pantai"
    ],
    roomTypes: [
      {
        id: "standard-room",
        name: "Standard Room",
        description: "Kamar nyaman dengan kipas angin dan kamar mandi dalam. Ideal untuk 4-6 orang per kamar.",
        price: 302000,
        capacity: 6,
        beds: "Multiple Beds",
        bathrooms: 1,
        amenities: [
          "Kipas Angin",
          "Kamar Mandi Dalam",
          "WiFi",
          "Dapur Umum",
          "View Sawah"
        ],
        images: [
          "https://i.imgur.com/YAz8Xiz.jpeg",
          "https://i.imgur.com/L7FqHP5.jpeg",
          "https://i.imgur.com/q3ilivO.jpeg",
          "https://i.imgur.com/0ZzqdTA.jpeg",
          "https://i.imgur.com/q4R8LuS.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 0,
      totalReviews: 0,
      breakdown: [
        { label: "Kebersihan", value: 0 },
        { label: "Kenyamanan Kamar", value: 0 },
        { label: "Makanan", value: 0 },
        { label: "Lokasi", value: 0 },
        { label: "Pelayanan dan Fasilitas", value: 0 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.983452322598835, 106.30962763855953]
  }
];

const homestaysData: ExtendedPropertyCardProps[] = [
  {
    id: "homestay-melati",
    name: "Homestay Melati",
    type: "homestay" as const,
    location: "Pantai Sawarna",
    description: `Homestay Melati adalah penginapan nyaman yang terletak di kawasan Pantai Sawarna. Dengan suasana yang tenang dan pelayanan yang ramah, homestay ini menawarkan pengalaman menginap yang menyenangkan dengan harga terjangkau.

Fasilitas utama homestay ini meliputi kamar tidur nyaman yang dilengkapi kipas angin, TV LED, dan kamar mandi dalam. Area outdoor yang luas dengan taman yang asri menjadi tempat yang sempurna untuk bersantai sambil menikmati suasana Sawarna.

Lokasi strategis homestay ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (3 menit jalan kaki), Goa Langir (5 menit berkendara), Legon Pari (10 menit berkendara), dan Tanjung Layar (5 menit berkendara).`,
    price: 850000,
    rating: 4.3,
    reviews: 85,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: "https://i.imgur.com/eedYhN9.jpeg",
    mainImages: [
      "https://i.imgur.com/eedYhN9.jpeg",
      "https://i.imgur.com/zXEfak2.jpeg",
      "https://i.imgur.com/JdfQh6h.jpeg",
      "https://i.imgur.com/sRgqsw0.jpeg",
      "https://i.imgur.com/bCiJWDo.jpeg",
      "https://i.imgur.com/TpHYgUp.jpeg",
      "https://i.imgur.com/bWC6mya.jpeg"
    ],
    tags: ["homestay", "pantai sawarna"],
    amenities: [
      "2 Kamar Tidur Nyaman",
      "2 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "TV LED",
      "WiFi",
      "Dapur Bersama",
      "Taman",
      "Parkir",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Nyaman"
    ],
    roomTypes: [
      {
        id: "kamar-tidur",
        name: "Kamar Tidur",
        description: "Kamar nyaman dengan double bed, ideal untuk berdua. Dilengkapi dengan kipas angin, TV LED, dan kamar mandi dalam.",
        price: 850000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "TV LED", "Kamar Mandi Dalam", "WiFi"],
        images: [
          "https://i.imgur.com/31AqeR8.jpeg",
          "https://i.imgur.com/e5yAvhB.jpeg",
          "https://i.imgur.com/NSAiOxi.jpeg",
          "https://i.imgur.com/CaN7JWH.jpeg",
          "https://i.imgur.com/cQIjQd3.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.5,
      totalReviews: 85,
      breakdown: [
        { label: "Kebersihan", value: 8.4 },
        { label: "Kenyamanan Kamar", value: 8.6 },
        { label: "Makanan", value: 8.3 },
        { label: "Lokasi", value: 8.7 },
        { label: "Pelayanan dan Fasilitas", value: 8.5 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.98115695793151, 106.31023098316602]
  },
  {
    id: "homestay-putri-asih",
    name: "Homestay Putri Asih",
    type: "homestay" as const,
    location: "Pantai Sawarna",
    description: `Homestay Putri Asih adalah penginapan nyaman yang terletak di kawasan Pantai Sawarna. Dengan suasana yang tenang dan pelayanan yang ramah, homestay ini menawarkan pengalaman menginap yang menyenangkan dengan harga terjangkau.

Fasilitas utama homestay ini meliputi kamar tidur nyaman yang dilengkapi kipas angin, TV LED, dan kamar mandi dalam. Area outdoor yang luas dengan taman yang asri menjadi tempat yang sempurna untuk bersantai sambil menikmati suasana Sawarna.

Lokasi strategis homestay ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (2 menit jalan kaki), Goa Langir (4 menit berkendara), Legon Pari (9 menit berkendara), dan Tanjung Layar (4 menit berkendara).`,
    price: 750000,
    rating: 4.2,
    reviews: 75,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: "https://i.imgur.com/QHDaRpW.jpeg",
    mainImages: [
      "https://i.imgur.com/QHDaRpW.jpeg",
      "https://i.imgur.com/fwiWCyM.jpeg",
      "https://i.imgur.com/y8RvyOk.jpeg",
      "https://i.imgur.com/a2SPfMy.jpeg",
      "https://i.imgur.com/BWZt1WQ.jpeg",
      "https://i.imgur.com/HmFcOU2.jpeg",
      "https://i.imgur.com/7hkFTaM.jpeg",
      "https://i.imgur.com/Akw8oc2.jpeg"
    ],
    tags: ["homestay", "pantai sawarna"],
    amenities: [
      "2 Kamar Tidur Nyaman",
      "2 Kamar Mandi Dalam",
      "Kipas Angin di Semua Kamar",
      "TV LED",
      "WiFi",
      "Dapur Bersama",
      "Taman",
      "Parkir",
      "Ruang Tamu",
      "Ruang Makan",
      "Kulkas",
      "Perlengkapan Mandi",
      "Handuk",
      "Kasur Nyaman"
    ],
    roomTypes: [
      {
        id: "room",
        name: "Room",
        description: "Kamar nyaman dengan double bed, ideal untuk berdua. Dilengkapi dengan kipas angin, TV LED, dan kamar mandi dalam.",
        price: 750000,
        capacity: 2,
        beds: "1 Double Bed",
        bathrooms: 1,
        amenities: ["Kipas Angin", "TV LED", "Kamar Mandi Dalam", "WiFi"],
        images: [
          "https://i.imgur.com/joKLqJb.jpeg",
          "https://i.imgur.com/xjSAfqs.jpeg",
          "https://i.imgur.com/4fusIDs.jpeg",
          "https://i.imgur.com/9yq1fwN.jpeg",
          "https://i.imgur.com/p7Mcs6t.jpeg"
        ]
      }
    ],
    nearbyAttractions: [],
    ratingSummary: {
      score: 8.4,
      totalReviews: 75,
      breakdown: [
        { label: "Kebersihan", value: 8.3 },
        { label: "Kenyamanan Kamar", value: 8.5 },
        { label: "Makanan", value: 8.2 },
        { label: "Lokasi", value: 8.6 },
        { label: "Pelayanan dan Fasilitas", value: 8.4 }
      ]
    },
    contact: { phone: "083877080088" },
    coordinates: [-6.982424222247813, 106.30858813014812]
  }
];

// Function to get all properties combined
export const getAllProperties = (): Property[] => {
  return [...villasData, ...homestaysData];
};

export const getVillasData = (): Property[] => {
  return villasData;
};

export const getHomestaysData = (): Property[] => {
  return homestaysData;
};

export const getFeaturedProperties = (): Property[] => {
  return villasData.filter(property => property.rating >= 4.5);
};

// Helper function to get properties by location
export const getPropertiesByLocation = (location: string): Property[] => {
  const mainLocation = extractMainLocation(location).toLowerCase();
  return villasData
    .filter(property => {
      // Tampilkan properti yang lokasinya sesuai dengan mainLocation
      const propertyLocation = extractMainLocation(property.location).toLowerCase();
      return propertyLocation === mainLocation;
    })
    .sort((a, b) => b.rating - a.rating) // Urutkan berdasarkan rating tertinggi
    .slice(0, 6); // Tampilkan 6 rekomendasi
};

// Helper function to extract location from full location string
export const extractMainLocation = (fullLocation: string): string => {
  const parts = fullLocation.split(",");
  return parts[0].trim();
}; 

// Tambahkan interface untuk tracking kunjungan
interface PropertyVisit {
  propertyId: string;
  visitCount: number;
  lastVisited: string;
}

// Simpan data kunjungan di localStorage
const VISIT_STORAGE_KEY = 'property_visits';

// Fungsi untuk mendapatkan data kunjungan
const getPropertyVisits = (): PropertyVisit[] => {
  if (typeof window === 'undefined') return [];
  const visits = localStorage.getItem(VISIT_STORAGE_KEY);
  return visits ? JSON.parse(visits) : [];
};

// Fungsi untuk menambah kunjungan
export const incrementPropertyVisit = (propertyId: string) => {
  if (typeof window === 'undefined') return;
  
  const visits = getPropertyVisits();
  const existingVisit = visits.find(v => v.propertyId === propertyId);
  
  if (existingVisit) {
    existingVisit.visitCount += 1;
    existingVisit.lastVisited = new Date().toISOString();
  } else {
    visits.push({
      propertyId,
      visitCount: 1,
      lastVisited: new Date().toISOString()
    });
  }
  
  localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(visits));
};

// Fungsi untuk mendapatkan villa populer berdasarkan kunjungan
export const getPopularVillas = (): Property[] => {
  const visits = getPropertyVisits();
  const allVillas = getAllProperties().filter(property => property.type === 'villa');
  
  // Tambahkan data kunjungan ke setiap villa
  const villasWithVisits = allVillas.map(villa => ({
    ...villa,
    visitCount: visits.find(v => v.propertyId === villa.id)?.visitCount || 0,
    lastVisited: visits.find(v => v.propertyId === villa.id)?.lastVisited || null
  }));
  
  // Urutkan berdasarkan jumlah kunjungan (descending)
  return villasWithVisits
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, 8); // Ambil 8 villa teratas
};

// Fungsi untuk mendapatkan villa termurah
export const getCheapestVillas = (): Property[] => {
  const allVillas = getAllProperties().filter(property => property.type === 'villa');
  
  // Hitung harga termurah untuk setiap villa (berdasarkan roomTypes)
  const villasWithMinPrice = allVillas.map(villa => {
    // Jika ada roomTypes, ambil harga termurah dari roomTypes
    if (villa.roomTypes && villa.roomTypes.length > 0) {
      const minRoomPrice = Math.min(...villa.roomTypes.map(room => room.price));
      return { ...villa, minPrice: minRoomPrice };
    }
    // Jika tidak ada roomTypes, gunakan harga default
    return { ...villa, minPrice: villa.price };
  });
  
  // Urutkan berdasarkan harga termurah (ascending)
  return villasWithMinPrice
    .sort((a, b) => a.minPrice - b.minPrice)
    .slice(0, 8); // Ambil 8 villa termurah
}; 

// Data wisata sekitar terbaru dengan koordinat
export const nearbyAttractionsData = [
  { name: 'Tanjung Layar', coordinates: [-6.99370748590788, 106.30716527698226] },
  { name: 'Pantai Sawarna', coordinates: [-6.985187179644954, 106.30819408276759] },
  { name: 'Pantai Karang Beurem', coordinates: [-6.991218423760266, 106.31957524695663] },
  { name: 'Pantai Legon Pari', coordinates: [-6.987546019364885, 106.32349562922836] },
  { name: 'Pantai Karang Taraje', coordinates: [-6.9899738877176505, 106.32635893528031] },
  { name: 'Pantai Goa Langir', coordinates: [-6.97519875756555, 106.29202254149106] },
  { name: 'Pantai Ciantir', coordinates: [-6.986112613568672, 106.3086441853749] },
  { name: 'Pantai Karang Bokor', coordinates: [-6.978932473733607, 106.27983762274829] },
  { name: 'Pantai Karang Urug', coordinates: [-6.9759008261138336, 106.28144513178788] },
  { name: 'Pantai Pulo Manuk', coordinates: [-6.969486433223623, 106.26511283946034] },
  { name: 'Pantai Pulo Manuk 2', coordinates: [-6.966710027020968, 106.26257297517778] },
  { name: 'Pantai Sedong Abu', coordinates: [-6.990857404280575, 106.33029786381513] },
  { name: 'Pantai Seupang', coordinates: [-6.986738314811417, 106.33815120018642] },
  { name: 'Wisata Goa Arca', coordinates: [-6.977559713156136, 106.32666254467904] },
  { name: 'Curug Tujuh', coordinates: [-6.974240977757274, 106.33563874128828] },
];
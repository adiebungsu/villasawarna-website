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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "6 menit jalan kaki" },
      { name: "Goa Langir", distance: "4 menit jalan kaki" },
      { name: "Legon Pari", distance: "10 menit berkendara" },
      { name: "Tanjung Layar", distance: "5 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Goa Langir", distance: "4 menit jalan kaki" },
      { name: "Pantai Sawarna", distance: "2 menit berkendara" },
      { name: "Legon Pari", distance: "10 menit berkendara" },
      { name: "Tanjung Layar", distance: "5 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Goa Langir", distance: "4 menit jalan kaki" },
      { name: "Pantai Sawarna", distance: "2 menit berkendara" },
      { name: "Legon Pari", distance: "10 menit berkendara" },
      { name: "Tanjung Layar", distance: "5 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
    capacity: 8,
    reviews: 12,
    bedrooms: 4,
    bathrooms: 4,
    amenities: [
      "AC",
      "WiFi",
      "TV",
      "Dapur",
      "Parkir",
      "Pemandangan Pantai",
      "Teras",
      "Ruang Tamu",
      "Kamar Mandi Dalam"
    ],
    description: "Villa Sinar Pelangi adalah villa eksklusif dengan 4 kamar tidur yang menawarkan pemandangan pantai yang menakjubkan. Terletak di Pantai Sawarna, villa ini dilengkapi dengan  dapur lengkap, dan teras yang luas. Cocok untuk liburan keluarga atau rombongan besar.",
    tags: ["Pantai", "4 Kamar", "Eksklusif"],
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
        amenities: ["AC", "TV", "Kamar Mandi Dalam", "WiFi"]
      },
      {
        id: "deluxe-room",
        name: "Deluxe Room",
        description: "Kamar deluxe dengan pemandangan pantai",
        price: 200000,
        capacity: 2,
        beds: "1 King Bed",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/lNcydX5.jpeg",
          "https://i.imgur.com/wZ0cSjQ.jpeg",
          "https://i.imgur.com/WhBRfqs.jpeg",
          "https://i.imgur.com/Nh6XLTg.jpeg",
          "https://i.imgur.com/7EnCW0d.jpeg"
        ],
        amenities: ["AC", "TV", "Kamar Mandi Dalam", "WiFi", "Balkon", "Pemandangan Pantai"]
      }
    ],
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "100m" },
      { name: "Tanjung Layar", distance: "2km" },
      { name: "Goa Langir", distance: "3km" },
      { name: "Karang Bokor", distance: "4km" }
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
    ]
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
      "WiFi Fiber Optic",
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
        description: "Kamar nyaman dengan single bed, ideal untuk satu orang. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 350000,
        capacity: 1,
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
        description: "Kamar nyaman dengan double bed, ideal untuk berdua. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 2,
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
        description: "Kamar nyaman dengan double bed dan single bed, ideal untuk keluarga. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 550000,
        capacity: 3,
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "6 menit jalan kaki" },
      { name: "Goa Langir", distance: "5 menit berkendara" },
      { name: "Legon Pari", distance: "9 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
    ],
    ratingSummary: {
      score: 8.7,
      totalReviews: 120,
      breakdown: [
        { label: "Kebersihan", value: 8.6 },
        { label: "Kenyamanan Kamar", value: 8.5 },
        { label: "Makanan", value: 8.4 },
        { label: "Lokasi", value: 8.7 },
        { label: "Pelayanan dan Fasilitas", value: 8.5 }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Legon Pari", distance: "5 menit jalan kaki" },
      { name: "Pantai Goa Langir", distance: "10 menit berkendara" },
      { name: "Pantai Karang Taraje", distance: "7 menit berkendara" },
      { name: "Tanjung Layar", distance: "15 menit berkendara" }
    ],
    ratingSummary: {
      score: 8.8,
      totalReviews: 269,
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
    coordinates: [-6.978249058445284, 106.30597263278183]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Legon Pari", distance: "9-10 menit berkendara" },
      { name: "Pantai Goa Langir", distance: "5 menit berkendara" },
      { name: "Pantai Sawarna", distance: "3 menit berkendara" },
      { name: "Tanjung Layar", distance: "7 menit berkendara" }
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
    coordinates: [-6.978786683942936, 106.30640702985548]
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
      "WiFi Fiber Optic",
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

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi Fiber Optic berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.

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
      "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-6597508a2db43a122832fd27725e8a66.jpeg"
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "5 menit jalan kaki" },
      { name: "Goa Langir", distance: "7 menit berkendara" },
      { name: "Legon Pari", distance: "12 menit berkendara" },
      { name: "Tanjung Layar", distance: "6 menit berkendara" }
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
    coordinates: [-6.975702407092274, 106.30000198769226]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Legon Pari", distance: "Depan villa" },
      { name: "Goa Langir", distance: "10 menit berkendara" },
      { name: "Pantai Sawarna", distance: "15 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511],
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
    ]
  },
  {
    id: "villa-sinar-matahari-resort",
    name: "Villa Sinar Matahari Resort",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Sinar Matahari Resort adalah villa nyaman yang terletak di kawasan Pantai Sawarna. Dengan pemandangan matahari terbit yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 6 kamar tidur nyaman yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbit.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.`,
    price: 450000,
    rating: 4.3,
    reviews: 189,
    capacity: 50,
    bedrooms: 6,
    bathrooms: 6,
    image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
    tags: ["villa", "pantai sawarna", "ruang meeting"],
    amenities: [
      "6 Kamar Tidur Nyaman",
      "6 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi Fiber Optic",
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
      "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
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
        price: 500000,
        capacity: 3,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/5tWlccP.jpeg",
          "https://i.imgur.com/jfOhuSi.jpeg",
          "https://i.imgur.com/oNmci0u.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "depan pantai" },
      { name: "Goa Langir", distance: "8 menit berkendara" },
      { name: "Legon Pari", distance: "9-10 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
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
        author: "Budi Santoso",
        rating: 4.7,
        comment: "Villa yang sangat nyaman. Staff sangat profesional dan ramah.",
        date: "2024-03-15"
      },
      {
        id: "2",
        author: "Dewi Lestari",
        rating: 4.6,
        comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah.",
        date: "2024-03-10"
      }
    ],
    contact: { phone: "083877080088" },
    coordinates: [-6.98382227227367, 106.31032309995304]
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
    capacity: 12,
    bedrooms: 4,
    bathrooms: 4,
    image: "https://i.imgur.com/ac6qcyq.jpeg",
    mainImages: [
      "https://i.imgur.com/ac6qcyq.jpeg",
      "https://i.imgur.com/bsoX9Sb.jpeg",
      "https://i.imgur.com/17cGCvg.jpeg",
      "https://i.imgur.com/ksFgVJL.jpeg",
      "https://i.imgur.com/0eAobNP.jpeg"
    ],
    tags: ["villa", "pantai sawarna", "view pantai"],
    amenities: [
      "4 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "6 menit jalan kaki" },
      { name: "Goa Langir", distance: "5 menit berkendara" },
      { name: "Legon Pari", distance: "9 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
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
    coordinates: [-6.98382227227367, 106.31032309995304]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "3 menit jalan kaki" },
      { name: "Goa Langir", distance: "8 menit berkendara" },
      { name: "Legon Pari", distance: "9-10 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
  },
  {
    id: "villa-batara",
    name: "Villa Batara",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: `Villa Batara adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang eksklusif dan nyaman.

Fasilitas utama villa ini meliputi 6 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 55 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan jacuzzi menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai yang indah.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (1 menit berjalan kaki), Goa Langir (4 menit berkendara), Legon Pari (7 menit berkendara), dan Tanjung Layar (9 menit berkendara).`,
    price: 500000,
    rating: 4.8,
    reviews: 245,
    capacity: 15,
    bedrooms: 6,
    bathrooms: 6,
    image: "https://i.imgur.com/KP2ncPi.jpeg",
    mainImages: [
      "https://i.imgur.com/KP2ncPi.jpeg",
      "https://i.imgur.com/d22kux8.jpeg",
      "https://i.imgur.com/BtWp6Yr.jpeg",
      "https://i.imgur.com/YjosayP.jpeg",
      "https://i.imgur.com/SOKaH8H.jpeg"
    ],
    tags: ["villa", "pantai sawarna", "view pantai", "jacuzzi"],
    amenities: [
      "6 Kamar Tidur Mewah",
      "6 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 55 inch",
      "WiFi Fiber Optic",
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
      "View Pantai"
    ],
    roomTypes: [
      {
        id: "standard",
        name: "Standard Room",
        description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan pantai yang menakjubkan. Dilengkapi dengan AC, TV LED 55 inch, dan kamar mandi dalam dengan air panas.",
        price: 500000,
        capacity: 2,
        beds: "1 Queen Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/KP2ncPi.jpeg",
          "https://i.imgur.com/d22kux8.jpeg",
          "https://i.imgur.com/BtWp6Yr.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
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
          "https://i.imgur.com/YjosayP.jpeg",
          "https://i.imgur.com/SOKaH8H.jpeg",
          "https://i.imgur.com/7Djvl8E.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar keluarga yang sangat luas dengan ruang tamu terpisah dan pemandangan pantai yang menakjubkan. Dilengkapi dengan fasilitas premium untuk kenyamanan keluarga.",
        price: 700000,
        capacity: 4,
        beds: "2 Queen Beds Premium",
        bathrooms: 2,
        images: [
          "https://i.imgur.com/KP2ncPi.jpeg",
          "https://i.imgur.com/d22kux8.jpeg",
          "https://i.imgur.com/BtWp6Yr.jpeg"
        ],
        amenities: ["AC", "TV LED 65 inch", "2 Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kitchen", "Ruang Tamu", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "1 menit berjalan kaki" },
      { name: "Goa Langir", distance: "4 menit berkendara" },
      { name: "Legon Pari", distance: "7 menit berkendara" },
      { name: "Tanjung Layar", distance: "9 menit berkendara" }
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
    coordinates: [-6.98382227227367, 106.31032309995304]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "3 menit jalan kaki" },
      { name: "Goa Langir", distance: "8 menit berkendara" },
      { name: "Legon Pari", distance: "9-10 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
    ],
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
    coordinates: [-6.982431685908441, 106.30955879500338]
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
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi Fiber Optic",
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
        description: "Kamar nyaman dengan twin bed, ideal untuk berdua. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 320000,
        capacity: 2,
        beds: "2 Single Beds",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
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
        description: "Kamar nyaman dengan extra bed, ideal untuk keluarga kecil. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 450000,
        capacity: 3,
        beds: "2 Single Beds + 1 Extra Bed",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "5 menit jalan kaki" },
      { name: "Goa Langir", distance: "10 menit berkendara" },
      { name: "Legon Pari", distance: "15 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
      "WiFi Fiber Optic",
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
        price: 550000,
        capacity: 3,
        beds: "1 King Bed Premium",
        bathrooms: 1,
        images: [
          "https://i.imgur.com/5tWlccP.jpeg",
          "https://i.imgur.com/jfOhuSi.jpeg",
          "https://i.imgur.com/oNmci0u.jpeg",
          "https://i.imgur.com/9Hcp40U.jpeg",
          "https://i.imgur.com/JHASLtZ.jpeg"
        ],
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      },
      {
        id: "family",
        name: "Family Room",
        description: "Kamar keluarga yang sangat luas dengan ruang tamu terpisah dan pemandangan pantai yang menakjubkan. Dilengkapi dengan fasilitas premium untuk kenyamanan keluarga.",
        price: 650000,
        capacity: 6,
        beds: "2 Queen Beds Premium",
        bathrooms: 2,
        images: [
          "https://i.imgur.com/Khg9u7S.jpeg",
          "https://i.imgur.com/yDZCZww.jpeg",
          "https://i.imgur.com/uh8FQep.jpeg",
          "https://i.imgur.com/5tWlccP.jpeg",
          "https://i.imgur.com/jfOhuSi.jpeg"
        ],
        amenities: ["AC", "TV LED 55 inch", "2 Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kitchen", "Ruang Tamu", "Setrika", "Perlengkapan Mandi", "View Pantai"]
      }
    ],
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "depan pantai" },
      { name: "Goa Langir", distance: "8 menit berkendara" },
      { name: "Legon Pari", distance: "9-10 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
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
    coordinates: [-6.984472686767081, 106.31050607162815]
  },
  {
    id: "villa-regin",
    name: "Villa Regin",
    type: "villa" as const,
    location: "Pantai Sawarna",
    description: "Villa nyaman dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ. Lokasi strategis dekat dengan pantai dan atraksi lokal.",
    price: 320000,
    rating: 4.4,
    reviews: 163,
    capacity: 40,
    bedrooms: 10,
    bathrooms: 4,
    image: "https://i.imgur.com/XG2ijrp.jpeg",
    tags: ["villa", "pantai sawarna"],
    amenities: [
      "10 Kamar Tidur Nyaman",
      "4 Kamar Mandi Dalam",
      "AC di Semua Kamar",
      "TV LED 43 inch",
      "WiFi Fiber Optic",
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
      "https://i.imgur.com/XG2ijrp.jpeg",
      "https://i.imgur.com/aMC3EHU.jpeg",
      "https://i.imgur.com/l19FLfr.jpeg",
      "https://i.imgur.com/MsdVlnL.jpeg",
      "https://i.imgur.com/eOA7T0V.jpeg"
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
          "https://i.imgur.com/ChtRatA.jpeg",
          "https://i.imgur.com/cjihL8w.jpeg",
          "https://i.imgur.com/55sNE5Y.jpeg",
          "https://i.imgur.com/vZbdMVZ.jpeg",
          "https://i.imgur.com/eOA7T0V.jpeg"
        ]
      },
      {
        id: "family-room",
        name: "Family Room",
        description: "Kamar keluarga yang luas dengan 2 double bed, ideal untuk keluarga kecil. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
        price: 750000,
        capacity: 4,
        beds: "2 Double Beds",
        bathrooms: 1,
        amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
        images: [
          "https://i.imgur.com/Orlvd5N.jpeg",
          "https://i.imgur.com/XG2ijrp.jpeg",
          "https://i.imgur.com/NAy81RD.jpeg",
          "https://i.imgur.com/JWs3N0w.jpeg",
          "https://i.imgur.com/Lv5XWtE.jpeg"
        ]
      }
    ],
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "5 menit jalan kaki" },
      { name: "Goa Langir", distance: "10 menit berkendara" },
      { name: "Legon Pari", distance: "15 menit berkendara" }
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
      "WiFi Fiber Optic",
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
    nearbyAttractions: [
      { name: "Pantai Legon Pari", distance: "Depan villa" },
      { name: "Goa Langir", distance: "10 menit berkendara" },
      { name: "Pantai Sawarna", distance: "15 menit berkendara" }
    ],
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
    coordinates: [-6.983539105798058, 106.30959983031511],
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
    ]
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "3 menit jalan kaki" },
      { name: "Goa Langir", distance: "5 menit berkendara" },
      { name: "Legon Pari", distance: "10 menit berkendara" },
      { name: "Tanjung Layar", distance: "5 menit berkendara" }
    ],
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
    nearbyAttractions: [
      { name: "Pantai Sawarna", distance: "2 menit jalan kaki" },
      { name: "Goa Langir", distance: "4 menit berkendara" },
      { name: "Legon Pari", distance: "9 menit berkendara" },
      { name: "Tanjung Layar", distance: "4 menit berkendara" }
    ],
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
    coordinates: [-6.983539105798058, 106.30959983031511]
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
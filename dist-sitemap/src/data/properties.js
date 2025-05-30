"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMainLocation = exports.getPropertiesByLocation = exports.getFeaturedProperties = exports.getHomestaysData = exports.getVillasData = exports.getAllProperties = void 0;
const villasData = [
    {
        id: "villa-deka-sawarna",
        name: "Villa Deka Sawarna",
        type: "villa",
        location: "Pantai Sawarna",
        description: "Villa mewah dengan 8 kamar tidur dan pemandangan pantai yang menakjubkan. Dilengkapi dengan dapur modern, ruang meeting, dan area BBQ. Lokasi strategis dekat dengan pantai dan atraksi lokal.",
        price: 300000,
        rating: 4.7,
        reviews: 163,
        capacity: 40,
        bedrooms: 8,
        bathrooms: 8,
        image: "https://i.imgur.com/9Hcp40U.jpeg",
        tags: ["villa", "pantai sawarna", "premium", "ruang meeting", "luxury"],
        amenities: [
            "WiFi",
            "Kipas Angin",
            "Kamar Mandi Dalam",
            "Dapur",
            "Area BBQ",
            "Parkir Luas",
            "Security 24 Jam",
            "View Pantai"
        ],
        mainImages: [
            "https://i.imgur.com/9Hcp40U.jpeg",
            "https://i.imgur.com/JHASLtZ.jpeg",
            "https://i.imgur.com/Khg9u7S.jpeg",
            "https://i.imgur.com/yDZCZww.jpeg",
            "https://i.imgur.com/uh8FQep.jpeg",
            "https://i.imgur.com/5tWlccP.jpeg",
            "https://i.imgur.com/jfOhuSi.jpeg",
            "https://i.imgur.com/oNmci0u.jpeg"
        ],
        roomTypes: [
            {
                id: "standard-room",
                name: "Standard Room",
                description: "Kamar nyaman dengan twin bed, ideal untuk berdua. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
                price: 350000,
                capacity: 2,
                beds: "2 Single Beds",
                bathrooms: 1,
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas"],
                images: [
                    "https://i.imgur.com/9Hcp40U.jpeg",
                    "https://i.imgur.com/JHASLtZ.jpeg",
                    "https://i.imgur.com/Khg9u7S.jpeg"
                ]
            },
            {
                id: "deluxe-room",
                name: "Deluxe Room",
                description: "Kamar mewah dengan king size bed. Dilengkapi dengan fasilitas premium.",
                price: 400000,
                capacity: 3,
                beds: "1 King Bed + 1 Single Bed",
                bathrooms: 1,
                amenities: ["AC", "TV LED 55 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Bar", "Ruang Tamu Pribadi"],
                images: [
                    "https://i.imgur.com/5tWlccP.jpeg",
                    "https://i.imgur.com/jfOhuSi.jpeg",
                    "https://i.imgur.com/oNmci0u.jpeg"
                ]
            }
        ],
        nearbyAttractions: [
            {
                name: "Pantai Sawarna",
                distance: "4-5 menit berkendara"
            },
            {
                name: "Pantai Legon Pari",
                distance: "10 menit dengan motor"
            },
            {
                name: "Pantai Tanjung Layar",
                distance: "5 menit dengan motor"
            },
            {
                name: "Pantai Karang Taraje",
                distance: "12 menit dengan motor"
            }
        ],
        ratingSummary: {
            score: 8.7,
            totalReviews: 163,
            breakdown: [
                { label: "Kebersihan", value: 8.8 },
                { label: "Kenyamanan", value: 8.7 },
                { label: "Lokasi", value: 8.9 },
                { label: "Pelayanan", value: 8.6 },
                { label: "Nilai", value: 8.5 }
            ]
        }
    },
    {
        id: "villa-sawarna-resort",
        name: "Villa Sawarna Resort",
        type: "villa",
        location: "Goa Langir, Sawarna",
        description: `Villa Sawarna Resort adalah villa mewah premium yang terletak di kawasan strategis Goa Langir, Sawarna. Dengan pemandangan pantai yang memukau dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 10 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 55 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan kolam renang infinity dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbenam.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi Fiber Optic berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (4-5 menit), Goa Langir (2-3 menit), Legon Pari (10-12 menit), dan Tanjung Layar (7-8 menit).`,
        price: 450000,
        rating: 4.8,
        reviews: 178,
        capacity: 50,
        bedrooms: 10,
        bathrooms: 6,
        image: "https://i.imgur.com/KP2ncPi.jpeg",
        tags: ["villa", "goa langir sawarna", "premium", "kolam renang", "ruang meeting"],
        amenities: [
            "10 Kamar Tidur Mewah",
            "6 Kamar Mandi Dalam",
            "AC di Semua Kamar",
            "TV LED 55 inch",
            "WiFi Fiber Optic",
            "Kolam Renang Infinity",
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
                description: "Kamar nyaman dengan single bed premium, ideal untuk tamu tunggal atau pasangan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
                price: 450000,
                capacity: 2,
                beds: "1 Single Bed Premium",
                bathrooms: 1,
                images: [
                    "https://i.imgur.com/B28xTFD.jpeg",
                    "https://i.imgur.com/MKYfcag.jpeg",
                    "https://i.imgur.com/JYILIYe.jpeg",
                    "https://i.imgur.com/gHHUxrK.jpeg",
                    "https://i.imgur.com/oRl7XdE.jpeg"
                ],
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi"]
            },
            {
                id: "twin-bed",
                name: "Twin Bed Room",
                description: "Kamar luas dengan twin bed premium, cocok untuk berdua atau bertiga. Dilengkapi dengan balkon pribadi dan pemandangan taman yang menenangkan.",
                price: 650000,
                capacity: 3,
                beds: "2 Single Beds Premium",
                bathrooms: 1,
                images: [
                    "https://i.imgur.com/Fv9HJPe.jpeg",
                    "https://i.imgur.com/l0QsGrb.jpeg",
                    "https://i.imgur.com/AJ4MO1L.jpeg",
                    "https://i.imgur.com/BtWp6Yr.jpeg",
                    "https://i.imgur.com/lf3VX4d.jpeg"
                ],
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi"]
            },
            {
                id: "superqueen-bed",
                name: "Super Queen Room",
                description: "Kamar mewah dengan super queen bed premium, dilengkapi ruang tamu terpisah dan balkon pribadi dengan pemandangan kolam renang.",
                price: 950000,
                capacity: 4,
                beds: "1 Super Queen Bed Premium",
                bathrooms: 2,
                images: [
                    "https://i.imgur.com/eXSGFhd.jpeg",
                    "https://i.imgur.com/nwKjG10.jpeg",
                    "https://i.imgur.com/SOKaH8H.jpeg",
                    "https://i.imgur.com/IYAvuag.jpeg",
                    "https://i.imgur.com/YjosayP.jpeg"
                ],
                amenities: ["AC", "TV LED 55 inch", "2 Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kitchen", "Ruang Tamu", "Setrika", "Perlengkapan Mandi"]
            }
        ],
        nearbyAttractions: [
            { name: "Pantai Sawarna", distance: "4-5 menit berkendara" },
            { name: "Goa Langir", distance: "2 menit berkendara" },
            { name: "Legon Pari", distance: "10-12 menit berkendara" },
            { name: "Tanjung Layar", distance: "7-8 menit berkendara" }
        ],
        ratingSummary: {
            score: 9.2,
            totalReviews: 178,
            breakdown: [
                { label: "Kebersihan", value: 9.4 },
                { label: "Kenyamanan Kamar", value: 9.3 },
                { label: "Makanan", value: 9.0 },
                { label: "Lokasi", value: 9.5 },
                { label: "Pelayanan dan Fasilitas", value: 9.2 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.9,
                comment: "Villa yang sangat mewah dengan fasilitas lengkap. Staff sangat profesional dan ramah. Pemandangan pantai yang indah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.8,
                comment: "Kamar bersih dan nyaman, fasilitas lengkap. Lokasi strategis dekat dengan pantai dan destinasi wisata.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Ahmad Rizki",
                rating: 4.9,
                comment: "Pengalaman menginap yang luar biasa. Kolam renang infinity dengan pemandangan pantai yang memukau.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "villa-sinar-pelangi",
        name: "Villa Sinar Pelangi",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Sinar Pelangi adalah villa mewah yang terletak tepat di depan Pantai Sawarna. Dengan pemandangan matahari terbit yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 10 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan kolam renang infinity dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbit.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ yang luas di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (depan pantai), Goa Langir (8 menit berkendara), Legon Pari (9-10 menit berkendara), dan Tanjung Layar (4 menit berkendara).`,
        price: 200000,
        rating: 4.7,
        reviews: 239,
        capacity: 50,
        bedrooms: 10,
        bathrooms: 4,
        image: "https://i.imgur.com/lNcydX5.jpeg",
        tags: ["villa", "pantai sawarna"],
        amenities: [
            "10 Kamar Tidur Mewah",
            "4 Kamar Mandi Dalam",
            "AC di Semua Kamar",
            "TV LED 43 inch",
            "WiFi Fiber Optic",
            "Kolam Renang Infinity",
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
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Kamar standar yang nyaman dengan queen bed premium, ideal untuk pasangan atau keluarga kecil. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
                price: 450000,
                capacity: 2,
                beds: "1 Queen Bed Premium",
                bathrooms: 1,
                images: [
                    "https://i.imgur.com/xjM7Pu6.jpeg",
                    "https://i.imgur.com/7EnCW0d.jpeg",
                    "https://i.imgur.com/DTBq7Dq.jpeg",
                    "https://i.imgur.com/9cttGSs.jpeg",
                    "https://i.imgur.com/0aMZ0iY.jpeg"
                ],
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi"]
            },
            {
                id: "deluxe",
                name: "Deluxe Room",
                description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan pantai yang menakjubkan dan fasilitas modern untuk kenyamanan maksimal.",
                price: 550000,
                capacity: 2,
                beds: "1 King Bed Premium",
                bathrooms: 1,
                images: [
                    "https://i.imgur.com/lNcydX5.jpeg",
                    "https://i.imgur.com/wZ0cSjQ.jpeg",
                    "https://i.imgur.com/WhBRfqs.jpeg",
                    "https://i.imgur.com/Nh6XLTg.jpeg",
                    "https://i.imgur.com/7EnCW0d.jpeg"
                ],
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi"]
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
            totalReviews: 239,
            breakdown: [
                { label: "Kebersihan", value: 9.2 },
                { label: "Kenyamanan Kamar", value: 9.1 },
                { label: "Makanan", value: 8.9 },
                { label: "Lokasi", value: 9.3 },
                { label: "Pelayanan dan Fasilitas", value: 9.0 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Rizky Maulana",
                rating: 4.9,
                comment: "Villa yang sangat nyaman dengan fasilitas lengkap. Staff sangat ramah dan profesional. Pemandangan matahari terbit yang indah.",
                date: "2024-02-15"
            },
            {
                id: 2,
                name: "Luna Maharani",
                rating: 4.8,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah. Area BBQ yang luas sangat cocok untuk gathering.",
                date: "2024-02-10"
            },
            {
                id: 3,
                name: "Yoga Ardiansyah",
                rating: 4.9,
                comment: "Pengalaman menginap yang luar biasa. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga.",
                date: "2024-02-05"
            },
            {
                id: 4,
                name: "Cahya Nirmala",
                rating: 4.7,
                comment: "Desain modern dan nyaman untuk menginap bersama teman-teman. Kolam renang infinity dengan pemandangan pantai yang memukau.",
                date: "2024-01-28"
            },
            {
                id: 5,
                name: "Arga Saputra",
                rating: 4.8,
                comment: "Staff sangat membantu dan lokasi dekat dengan destinasi wisata. Area BBQ yang luas menjadi nilai plus.",
                date: "2024-01-20"
            }
        ]
    },
    {
        id: "villa-aki-nini",
        name: "Villa Aki Nini",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Aki Nini adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan sawah yang menenangkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang unik dan nyaman.

Fasilitas utama villa ini meliputi 3 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan sawah yang hijau.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (3 menit berkendara), Goa Langir (5 menit berkendara), Legon Pari (9-10 menit berkendara), dan Tanjung Layar (7 menit berkendara).`,
        price: 350000,
        rating: 4.6,
        reviews: 192,
        capacity: 10,
        bedrooms: 3,
        bathrooms: 3,
        image: "https://i.imgur.com/KP2ncPi.jpeg",
        tags: ["villa", "pantai sawarna", "view sawah", "keluarga kecil"],
        amenities: [
            "3 Kamar Tidur Mewah",
            "3 Kamar Mandi Dalam",
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
            "View Sawah"
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
                description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan sawah yang menakjubkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
                price: 350000,
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
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Sawah"]
            }
        ],
        nearbyAttractions: [
            { name: "Pantai Sawarna", distance: "3 menit berkendara" },
            { name: "Goa Langir", distance: "5 menit berkendara" },
            { name: "Legon Pari", distance: "9-10 menit berkendara" },
            { name: "Tanjung Layar", distance: "7 menit berkendara" }
        ],
        ratingSummary: {
            score: 8.8,
            totalReviews: 192,
            breakdown: [
                { label: "Kebersihan", value: 8.9 },
                { label: "Kenyamanan Kamar", value: 8.7 },
                { label: "Makanan", value: 8.8 },
                { label: "Lokasi", value: 8.9 },
                { label: "Pelayanan dan Fasilitas", value: 8.7 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.8,
                comment: "Villa yang sangat nyaman dengan pemandangan sawah yang menenangkan. Fasilitas lengkap dan staff sangat ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.7,
                comment: "Lokasi strategis dan bersih. Pemandangan sawah yang indah membuat suasana sangat tenang dan nyaman.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Ahmad Rizki",
                rating: 4.6,
                comment: "Pengalaman menginap yang menyenangkan. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga kecil.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "villa-mutiara-sawarna",
        name: "Villa Mutiara Sawarna",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Mutiara Sawarna adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi kolam renang infinity dengan pemandangan pantai yang memukau, area BBQ yang luas, dan ruang meeting yang nyaman. Setiap kamar dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area outdoor yang luas menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Legon Pari (5 menit jalan kaki), Pantai Goa Langir (10 menit berkendara), Pantai Karang Taraje (7 menit berkendara), dan Tanjung Layar (15 menit berkendara).`,
        price: 350000,
        rating: 4.8,
        reviews: 269,
        capacity: 50,
        bedrooms: 8,
        bathrooms: 8,
        image: "https://i.imgur.com/9Hcp40U.jpeg",
        tags: ["villa", "pantai sawarna", "kolam renang", "ruang meeting"],
        amenities: [
            "8 Kamar Tidur Mewah",
            "8 Kamar Mandi Dalam",
            "AC di Semua Kamar",
            "TV LED 43 inch",
            "WiFi Fiber Optic",
            "Kolam Renang Infinity",
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
        mainImages: [
            "https://i.imgur.com/9Hcp40U.jpeg",
            "https://i.imgur.com/JHASLtZ.jpeg",
            "https://i.imgur.com/Khg9u7S.jpeg",
            "https://i.imgur.com/yDZCZww.jpeg",
            "https://i.imgur.com/uh8FQep.jpeg",
            "https://i.imgur.com/5tWlccP.jpeg",
            "https://i.imgur.com/jfOhuSi.jpeg",
            "https://i.imgur.com/oNmci0u.jpeg"
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
                price: 450000,
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
            { name: "Pantai Legon Pari", distance: "5 menit jalan kaki" },
            { name: "Pantai Goa Langir", distance: "10 menit berkendara" },
            { name: "Pantai Karang Taraje", distance: "7 menit berkendara" },
            { name: "Tanjung Layar", distance: "15 menit berkendara" }
        ],
        ratingSummary: {
            score: 9.2,
            totalReviews: 269,
            breakdown: [
                { label: "Kebersihan", value: 9.3 },
                { label: "Kenyamanan Kamar", value: 9.2 },
                { label: "Makanan", value: 9.1 },
                { label: "Lokasi", value: 9.4 },
                { label: "Pelayanan dan Fasilitas", value: 9.0 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.9,
                comment: "Villa yang sangat mewah dengan kolam renang infinity yang memukau. Staff sangat profesional dan ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.8,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah dari kolam renang infinity.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Ahmad Rizki",
                rating: 4.9,
                comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "villa-regin-sawarna",
        name: "Villa Regin Sawarna",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Regin Sawarna adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan area pesawahan yang menenangkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang unik dan nyaman.

Fasilitas utama villa ini meliputi 12 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan sawah yang hijau.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, layanan sewa kendaraan, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Legon Pari (9-10 menit berkendara), Pantai Goa Langir (5 menit berkendara), Pantai Sawarna (3 menit berkendara), dan Tanjung Layar (7 menit berkendara).`,
        price: 450000,
        rating: 4.5,
        reviews: 175,
        capacity: 74,
        bedrooms: 12,
        bathrooms: 12,
        image: "https://i.imgur.com/XG2ijrp.jpeg",
        tags: ["villa", "pantai sawarna", "sewa kendaraan", "view sawah"],
        amenities: [
            "12 Kamar Tidur Mewah",
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
            }
        ],
        nearbyAttractions: [
            { name: "Pantai Legon Pari", distance: "9-10 menit berkendara" },
            { name: "Pantai Goa Langir", distance: "5 menit berkendara" },
            { name: "Pantai Sawarna", distance: "3 menit berkendara" },
            { name: "Tanjung Layar", distance: "7 menit berkendara" }
        ],
        ratingSummary: {
            score: 8.8,
            totalReviews: 175,
            breakdown: [
                { label: "Kebersihan", value: 8.9 },
                { label: "Kenyamanan Kamar", value: 8.7 },
                { label: "Makanan", value: 8.8 },
                { label: "Lokasi", value: 8.9 },
                { label: "Pelayanan dan Fasilitas", value: 8.7 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.6,
                comment: "Villa yang sangat nyaman dengan pemandangan sawah yang menenangkan. Fasilitas lengkap dan staff sangat ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.5,
                comment: "Lokasi strategis dan bersih. Pemandangan sawah yang indah membuat suasana sangat tenang dan nyaman.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Ahmad Rizki",
                rating: 4.4,
                comment: "Pengalaman menginap yang menyenangkan. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga besar.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "villa-little-hula-hula",
        name: "Villa Little Hula Hula",
        type: "villa",
        location: "Goa Langir, Sawarna",
        description: `Villa Little Hula Hula adalah villa mewah premium yang terletak di kawasan strategis Goa Langir, Sawarna. Dengan desain arsitektur modern yang mengadopsi konsep tropis, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 14 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 55 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan kolam renang infinity dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbenam.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi Fiber Optic berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (4-5 menit), Goa Langir (2-3 menit), Legon Pari (10-12 menit), dan Tanjung Layar (7 menit).`,
        price: 320000,
        rating: 4.9,
        reviews: 259,
        capacity: 50,
        bedrooms: 14,
        bathrooms: 14,
        image: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20036564-aea2b07141382e5e96f88bfe59f5efe0.jpeg",
        tags: ["villa", "goa langir sawarna", "premium", "kolam renang", "ruang meeting"],
        amenities: [
            "14 Kamar Tidur Mewah",
            "14 Kamar Mandi Dalam",
            "AC di Semua Kamar",
            "TV LED 55 inch",
            "WiFi Fiber Optic",
            "Kolam Renang Infinity",
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
        ratingSummary: {
            score: 9.0,
            totalReviews: 259,
            breakdown: [
                { label: "Kebersihan", value: 9.2 },
                { label: "Kenyamanan Kamar", value: 9.1 },
                { label: "Makanan", value: 8.9 },
                { label: "Lokasi", value: 9.3 },
                { label: "Pelayanan dan Fasilitas", value: 9.0 }
            ]
        },
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
        roomTypes: [
            {
                id: "master-suite",
                name: "Master Suite",
                description: "Kamar mewah dengan king size bed, ruang tamu pribadi, dan balkon dengan pemandangan kolam renang",
                price: 1200000,
                capacity: 4,
                beds: "1 King Bed + 1 Sofa Bed",
                bathrooms: 2,
                images: [
                    "https://ik.imagekit.io/villasawarna/villa-deka/master-suite-1.jpg",
                    "https://ik.imagekit.io/villasawarna/villa-deka/master-suite-2.jpg",
                    "https://ik.imagekit.io/villasawarna/villa-deka/master-suite-3.jpg"
                ],
                amenities: ["AC", "TV LED 55 inch", "2 Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Bar", "Ruang Tamu Pribadi"]
            },
            {
                id: "deluxe-room",
                name: "Deluxe Room",
                description: "Kamar nyaman dengan queen bed dan balkon pribadi",
                price: 850000,
                capacity: 3,
                beds: "1 Queen Bed + 1 Single Bed",
                bathrooms: 1,
                images: [
                    "https://ik.imagekit.io/villasawarna/villa-deka/deluxe-1.jpg",
                    "https://ik.imagekit.io/villasawarna/villa-deka/deluxe-2.jpg",
                    "https://ik.imagekit.io/villasawarna/villa-deka/deluxe-3.jpg"
                ],
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi"]
            },
            {
                id: "standard-room",
                name: "Standard Room",
                description: "Kamar nyaman dengan twin bed, ideal untuk berdua",
                price: 650000,
                capacity: 2,
                beds: "2 Single Beds",
                bathrooms: 1,
                images: [
                    "https://ik.imagekit.io/villasawarna/villa-deka/standard-1.jpg",
                    "https://ik.imagekit.io/villasawarna/villa-deka/standard-2.jpg",
                    "https://ik.imagekit.io/villasawarna/villa-deka/standard-3.jpg"
                ],
                amenities: ["AC", "TV LED 32 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi"]
            }
        ],
        nearbyAttractions: [
            { name: "Pantai Sawarna", distance: "4-5 menit berkendara" },
            { name: "Tanjung Layar", distance: "7 menit berkendara" },
            { name: "Goa Langir", distance: "2-3 menit berkendara" },
            { name: "Legon Pari", distance: "10-12 menit berkendara" }
        ],
        reviewDetails: [
            {
                id: 1,
                name: "Rizky Maulana",
                rating: 4.9,
                comment: "Villa yang sangat mewah dengan fasilitas lengkap. Staff sangat profesional dan ramah. Pemandangan kolam renang infinity yang memukau.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Luna Maharani",
                rating: 4.8,
                comment: "Lokasi strategis dan bersih. Desain tropis yang modern membuat suasana sangat nyaman. Ruang meeting yang luas dan nyaman.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Yoga Ardiansyah",
                rating: 4.9,
                comment: "Pengalaman menginap yang luar biasa. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga besar.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "villa-arizky-sawarna",
        name: "Villa Arizky Sawarna",
        type: "villa",
        location: "Legon Pari",
        description: `Villa Arizky Sawarna adalah villa mewah yang terletak di kawasan strategis Legon Pari. Dengan pemandangan area pesawahan yang menenangkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang unik dan nyaman.

Fasilitas utama villa ini meliputi 8 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan sawah yang hijau.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.

Lokasi strategis villa ini memudahkan akses ke berbagai destinasi wisata populer di Sawarna, seperti Pantai Sawarna (7 menit berkendara), Goa Langir (9-10 menit berkendara), Legon Pari (sudah depan pantai), dan Tanjung Layar (10 menit berkendara).`,
        price: 300000,
        rating: 4.8,
        reviews: 285,
        capacity: 40,
        bedrooms: 8,
        bathrooms: 8,
        image: "https://i.imgur.com/wBoC7ZA.jpeg",
        tags: ["villa", "legon pari"],
        amenities: [
            "8 Kamar Tidur Mewah",
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
            "View Pesawahan"
        ],
        mainImages: [
            "https://i.imgur.com/wBoC7ZA.jpeg",
            "https://i.imgur.com/acr10CW.jpeg",
            "https://i.imgur.com/kJQHIep.jpeg",
            "https://i.imgur.com/foOva3S.jpeg",
            "https://i.imgur.com/XQKMbFZ.jpeg",
            "https://i.imgur.com/0NEMnoK.jpeg",
            "https://i.imgur.com/mokoWMJ.jpeg",
            "https://i.imgur.com/XjtxSUv.jpeg"
        ],
        roomTypes: [
            {
                id: "standard",
                name: "Standard Room",
                description: "Kamar standar yang nyaman dengan queen bed premium dan pemandangan sawah yang menenangkan. Dilengkapi dengan AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas.",
                price: 300000,
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
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pesawahan"]
            },
            {
                id: "deluxe",
                name: "Deluxe Room",
                description: "Kamar deluxe yang luas dengan king bed premium dan balkon pribadi. Dilengkapi dengan pemandangan sawah yang menenangkan dan fasilitas modern untuk kenyamanan maksimal.",
                price: 350000,
                capacity: 2,
                beds: "1 King Bed Premium",
                bathrooms: 1,
                images: [
                    "https://i.imgur.com/XQKMbFZ.jpeg",
                    "https://i.imgur.com/DabvprB.jpeg",
                    "https://i.imgur.com/TASDEI8.jpeg",
                    "https://i.imgur.com/zgtnDbS.jpeg",
                    "https://i.imgur.com/acr10CW.jpeg"
                ],
                amenities: ["AC", "TV LED 43 inch", "Kamar Mandi Dalam", "Air Panas", "WiFi", "Balkon", "Mini Kulkas", "Setrika", "Perlengkapan Mandi", "View Pesawahan"]
            }
        ],
        nearbyAttractions: [
            { name: "Pantai Sawarna", distance: "7 menit berkendara" },
            { name: "Goa Langir", distance: "9-10 menit berkendara" },
            { name: "Legon Pari", distance: "sudah depan pantai" },
            { name: "Tanjung Layar", distance: "10 menit berkendara" }
        ],
        ratingSummary: {
            score: 8.8,
            totalReviews: 285,
            breakdown: [
                { label: "Kebersihan", value: 8.9 },
                { label: "Kenyamanan Kamar", value: 8.7 },
                { label: "Makanan", value: 8.8 },
                { label: "Lokasi", value: 8.9 },
                { label: "Pelayanan dan Fasilitas", value: 8.7 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.8,
                comment: "Villa yang sangat nyaman dengan pemandangan sawah yang menenangkan. Fasilitas lengkap dan staff sangat ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.7,
                comment: "Lokasi strategis dan bersih. Pemandangan sawah yang indah membuat suasana sangat tenang dan nyaman.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Ahmad Rizki",
                rating: 4.6,
                comment: "Pengalaman menginap yang menyenangkan. Kamar bersih dan nyaman, fasilitas lengkap. Cocok untuk liburan keluarga kecil.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "villa-andrew",
        name: "Villa Andrew",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Andrew adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 4 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.`,
        price: 400000,
        rating: 4.5,
        reviews: 28,
        capacity: 2,
        bedrooms: 4,
        bathrooms: 4,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
        tags: ["villa", "pantai sawarna", "view pantai"],
        amenities: [
            "4 Kamar Tidur Mewah",
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
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
            "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
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
                    "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
                    "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
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
            totalReviews: 28,
            breakdown: [
                { label: "Kebersihan", value: 8.6 },
                { label: "Kenyamanan Kamar", value: 8.4 },
                { label: "Makanan", value: 8.5 },
                { label: "Lokasi", value: 8.6 },
                { label: "Pelayanan dan Fasilitas", value: 8.4 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.5,
                comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.4,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: "villa-sinar-matahari-resort",
        name: "Villa Sinar Matahari Resort",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Sinar Matahari Resort adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan matahari terbit yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 6 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbit.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi, ruang meeting yang nyaman, dan area parkir yang luas.`,
        price: 450000,
        rating: 4.7,
        reviews: 189,
        capacity: 50,
        bedrooms: 6,
        bathrooms: 6,
        image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
        tags: ["villa", "pantai sawarna", "ruang meeting"],
        amenities: [
            "6 Kamar Tidur Mewah",
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
                id: 1,
                name: "Budi Santoso",
                rating: 4.7,
                comment: "Villa yang sangat nyaman dengan kolam renang infinity yang memukau. Staff sangat profesional dan ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.6,
                comment: "Lokasi strategis dan bersih. Pemandangan matahari terbit yang indah dari kolam renang infinity.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: "villa-putri-asih",
        name: "Villa Putri Asih",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Putri Asih adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 5 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.`,
        price: 420000,
        rating: 4.6,
        reviews: 32,
        capacity: 5,
        bedrooms: 5,
        bathrooms: 5,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        tags: ["villa", "pantai sawarna", "view pantai"],
        amenities: [
            "5 Kamar Tidur Mewah",
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
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            "https://images.unsplash.com/photo-1505843513577-22bb7d21e455"
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
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
                    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
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
                id: 1,
                name: "Budi Santoso",
                rating: 4.6,
                comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.5,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: "villa-widi",
        name: "Villa Widi",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Widi adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 4 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.`,
        price: 380000,
        rating: 4.5,
        reviews: 25,
        capacity: 4,
        bedrooms: 4,
        bathrooms: 4,
        image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
        tags: ["villa", "pantai sawarna", "view pantai"],
        amenities: [
            "4 Kamar Tidur Mewah",
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
                { label: "Kebersihan", value: 8.6 },
                { label: "Kenyamanan Kamar", value: 8.4 },
                { label: "Makanan", value: 8.5 },
                { label: "Lokasi", value: 8.6 },
                { label: "Pelayanan dan Fasilitas", value: 8.4 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.5,
                comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.4,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: "villa-batara",
        name: "Villa Batara",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Batara adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 3 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

Dapur modern yang lengkap dengan peralatan memasak premium memungkinkan Anda untuk memasak sendiri, sementara area BBQ di taman belakang menjadi tempat yang ideal untuk gathering keluarga atau teman. Villa ini juga dilengkapi dengan WiFi berkecepatan tinggi dan area parkir yang luas.`,
        price: 350000,
        rating: 4.4,
        reviews: 20,
        capacity: 3,
        bedrooms: 3,
        bathrooms: 3,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        tags: ["villa", "pantai sawarna", "view pantai"],
        amenities: [
            "3 Kamar Tidur Mewah",
            "3 Kamar Mandi Dalam",
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
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
            "https://images.unsplash.com/photo-1505693314120-0d443867891c",
            "https://images.unsplash.com/photo-1505843513577-22bb7d21e455"
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
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
                    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455"
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
            score: 8.4,
            totalReviews: 20,
            breakdown: [
                { label: "Kebersihan", value: 8.5 },
                { label: "Kenyamanan Kamar", value: 8.3 },
                { label: "Makanan", value: 8.4 },
                { label: "Lokasi", value: 8.5 },
                { label: "Pelayanan dan Fasilitas", value: 8.3 }
            ]
        },
        reviewDetails: [
            {
                id: 1,
                name: "Budi Santoso",
                rating: 4.4,
                comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.3,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: "villa-andrew-pasput",
        name: "Villa Andrew Pasput",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Andrew Pasput adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 5 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan taman yang asri dan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan pantai.

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
            "5 Kamar Tidur Mewah",
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
                id: 1,
                name: "Budi Santoso",
                rating: 4.6,
                comment: "Villa yang nyaman dengan pemandangan pantai yang indah. Fasilitas lengkap dan staff ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.5,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah membuat suasana sangat nyaman.",
                date: "2024-03-10"
            }
        ]
    },
    {
        id: "villa-muara-legon-pari",
        name: "Villa Muara Legon Pari",
        type: "villa",
        location: "Pantai Legon Pari",
        description: `Villa Muara Legon Pari adalah akomodasi mewah yang terletak di Pantai Legon Pari, menawarkan pemandangan pantai yang menakjubkan dan suasana yang tenang. Villa ini dilengkapi dengan fasilitas modern dan area outdoor yang luas, ideal untuk liburan keluarga atau rombongan. Dengan lokasi strategis, Anda dapat dengan mudah mengakses berbagai destinasi wisata populer di sekitar Sawarna.`,
        price: 350000,
        rating: 4.6,
        reviews: 185,
        capacity: 12,
        bedrooms: 4,
        bathrooms: 4,
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
        amenities: [
            "WiFi",
            "Kipas Angin",
            "TV LED 43 inch",
            "Kamar Mandi Dalam",
            "Air Panas",
            "Dapur",
            "Area BBQ",
            "Parkir Luas",
            "Security 24 Jam",
            "View Pantai"
        ],
        nearbyAttractions: [
            { name: "Pantai Legon Pari", distance: "Depan Pantai" },
            { name: "Goa Langir", distance: "8 menit berkendara" },
            { name: "Pantai Sawarna", distance: "10 menit berkendara" },
            { name: "Tanjung Layar", distance: "15 menit berkendara" }
        ],
        ratingSummary: {
            score: 8.9,
            totalReviews: 185,
            breakdown: [
                { label: "Kebersihan", value: 9.0 },
                { label: "Kenyamanan Kamar", value: 8.8 },
                { label: "Makanan", value: 8.7 },
                { label: "Lokasi", value: 9.2 },
                { label: "Pelayanan dan Fasilitas", value: 8.9 }
            ]
        }
    },
    {
        id: "villa-family-sawarna",
        name: "Villa Family Sawarna",
        type: "villa",
        location: "Pantai Sawarna",
        description: `Villa Family Sawarna adalah villa mewah yang terletak di kawasan Pantai Sawarna. Dengan pemandangan pantai yang menakjubkan dan desain arsitektur modern, villa ini menawarkan pengalaman menginap yang tak terlupakan.

Fasilitas utama villa ini meliputi 6 kamar tidur mewah yang masing-masing dilengkapi AC, TV LED 43 inch, dan kamar mandi dalam dengan air panas. Area outdoor yang luas dengan gazebo menjadi tempat yang sempurna untuk bersantai sambil menikmati pemandangan matahari terbit.

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
            "6 Kamar Tidur Mewah",
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
                id: 1,
                name: "Budi Santoso",
                rating: 4.8,
                comment: "Villa yang sangat nyaman dengan kolam renang infinity yang memukau. Staff sangat profesional dan ramah.",
                date: "2024-03-15"
            },
            {
                id: 2,
                name: "Dewi Lestari",
                rating: 4.7,
                comment: "Lokasi strategis dan bersih. Pemandangan pantai yang indah dari kolam renang infinity.",
                date: "2024-03-10"
            },
            {
                id: 3,
                name: "Ahmad Rizki",
                rating: 4.9,
                comment: "Pengalaman menginap yang luar biasa. Ruang meeting yang nyaman dan fasilitas lengkap.",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "v1",
        name: "Villa Cempaka",
        location: "Legon Pari, Sawarna",
        description: "Villa Cempaka adalah pilihan tepat untuk menginap di Pantai Sawarna. Terletak strategis, villa ini menawarkan kenyamanan dan akses mudah ke pantai Legon Pari.",
        price: 300000,
        rating: 4.5,
        reviews: 182,
        capacity: 6,
        bedrooms: 3,
        bathrooms: 2,
        image: "https://i.imgur.com/MBymqfS.jpeg", // Updated main image thumbnail
        mainImages: [
            "https://i.imgur.com/MBymqfS.jpeg",
            "https://i.imgur.com/UYjw1CE.jpeg",
            "https://i.imgur.com/R0HR9FM.jpeg",
            "https://i.imgur.com/AthrjXv.jpeg",
            "https://i.imgur.com/sFQwfll.jpeg",
            "https://i.imgur.com/yX0potM.jpeg",
            "https://i.imgur.com/qKALLdC.jpeg",
            "https://i.imgur.com/ZWM1vUu.jpeg"
        ],
        amenities: ["WiFi", "Kipas Angin", "TV", "Dapur", "Parkir", "Area Bermain Anak"],
        type: "villa",
        nearbyAttractions: [
            { name: "Pantai Legon Pari", distance: "2 menit jalan kaki" },
            { name: "Goa Langir", distance: "12 menit berkendara" },
            { name: "Tanjung Layar", distance: "12 menit berkendara" },
            { name: "Pantai Sawarna", distance: "10 menit berkendara" }
        ],
        ratingSummary: {
            score: 8.7,
            totalReviews: 182,
            breakdown: [
                { label: "Kebersihan", value: 8.5 },
                { label: "Lokasi", value: 9.0 },
                { label: "Fasilitas", value: 8.2 },
                { label: "Pelayanan", value: 8.7 },
                { label: "Nilai", value: 8.8 }
            ]
        }
    }
];
const homestaysData = [
    {
        id: "h2",
        name: "Homestay Andrew Batara",
        type: "homestay",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
        price: 400000,
        rating: 4.5,
        location: "Tepi Pantai, Pantai Sawarna",
        capacity: 2,
        reviews: 28
    },
    {
        id: "h3",
        name: "Penginapan Andrew Pasput",
        type: "homestay",
        image: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
        price: 420000,
        rating: 4.6,
        location: "Tepi Pantai, Pantai Sawarna",
        capacity: 5,
        reviews: 32
    }
];
// Function to get all properties combined
const getAllProperties = () => {
    return [...villasData, ...homestaysData].map((property) => ({
        ...property,
        image: property.image || (property.mainImages && property.mainImages[0]) || "",
    }));
};
exports.getAllProperties = getAllProperties;
const getVillasData = () => {
    return villasData;
};
exports.getVillasData = getVillasData;
const getHomestaysData = () => {
    return homestaysData;
};
exports.getHomestaysData = getHomestaysData;
const getFeaturedProperties = () => {
    return [villasData[0], villasData[1], homestaysData[0]];
};
exports.getFeaturedProperties = getFeaturedProperties;
// Helper function to get properties by location
const getPropertiesByLocation = (location) => {
    const allProperties = (0, exports.getAllProperties)();
    const locationLower = location.toLowerCase();
    return allProperties.filter(property => {
        const propLocationLower = property.location.toLowerCase();
        return propLocationLower.includes(locationLower);
    });
};
exports.getPropertiesByLocation = getPropertiesByLocation;
// Helper function to extract location from full location string
const extractMainLocation = (fullLocation) => {
    if (fullLocation.includes("Goa Langir"))
        return "Goa Langir";
    if (fullLocation.includes("Pantai Sawarna"))
        return "Pantai Sawarna";
    if (fullLocation.includes("Legon Pari"))
        return "Legon Pari";
    return "Pantai Sawarna"; // Default if not found
};
exports.extractMainLocation = extractMainLocation;

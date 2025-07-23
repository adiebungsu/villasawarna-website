"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { properties } from "../data/dummyData";
import { useSearchParams } from "next/navigation";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

// Data wisata sekitar Sawarna
const wisata = [
  {
    id: "tanjunglayar",
    name: "Tanjung Layar",
    type: "Jalan-jalan",
    lat: -6.99370748590788,
    lng: 106.30716527698226,
    image: "https://ik.imagekit.io/yourimg/tanjunglayar.jpg",
  },
  {
    id: "pantaisawarna",
    name: "Pantai Sawarna",
    type: "Jalan-jalan",
    lat: -6.985187179644954,
    lng: 106.30819408276759,
    image: "https://ik.imagekit.io/yourimg/pantaisawarna.jpg",
  },
  {
    id: "karangbeurem",
    name: "Pantai Karang Beurem",
    type: "Jalan-jalan",
    lat: -6.991218423760266,
    lng: 106.31957524695663,
    image: "https://ik.imagekit.io/yourimg/karangbeurem.jpg",
  },
  {
    id: "legonpari",
    name: "Pantai Legon Pari",
    type: "Jalan-jalan",
    lat: -6.987546019364885,
    lng: 106.32349562922836,
    image: "https://ik.imagekit.io/yourimg/legonpari.jpg",
  },
  {
    id: "karangtaraje",
    name: "Pantai Karang Taraje",
    type: "Jalan-jalan",
    lat: -6.9899738877176505,
    lng: 106.32635893528031,
    image: "https://ik.imagekit.io/yourimg/karangtaraje.jpg",
  },
  {
    id: "goalangir",
    name: "Pantai Goa Langir",
    type: "Jalan-jalan",
    lat: -6.97519875756555,
    lng: 106.29202254149106,
    image: "https://ik.imagekit.io/yourimg/goalangir.jpg",
  },
  {
    id: "ciantir",
    name: "Pantai Ciantir",
    type: "Jalan-jalan",
    lat: -6.986112613568672,
    lng: 106.3086441853749,
    image: "https://ik.imagekit.io/yourimg/ciantir.jpg",
  },
  {
    id: "karangbokor",
    name: "Pantai Karang Bokor",
    type: "Jalan-jalan",
    lat: -6.978932473733607,
    lng: 106.27983762274829,
    image: "https://ik.imagekit.io/yourimg/karangbokor.jpg",
  },
  {
    id: "karangurug",
    name: "Pantai Karang Urug",
    type: "Jalan-jalan",
    lat: -6.9759008261138336,
    lng: 106.28144513178788,
    image: "https://ik.imagekit.io/yourimg/karangurug.jpg",
  },
  {
    id: "pulomanuk",
    name: "Pantai Pulo Manuk",
    type: "Jalan-jalan",
    lat: -6.969486433223623,
    lng: 106.26511283946034,
    image: "https://ik.imagekit.io/yourimg/pulomanuk.jpg",
  },
  {
    id: "pulomanuk2",
    name: "Pantai Pulo Manuk 2",
    type: "Jalan-jalan",
    lat: -6.966710027020968,
    lng: 106.26257297517778,
    image: "https://ik.imagekit.io/yourimg/pulomanuk2.jpg",
  },
  {
    id: "sedongabu",
    name: "Pantai Sedong Abu",
    type: "Jalan-jalan",
    lat: -6.990857404280575,
    lng: 106.33029786381513,
    image: "https://ik.imagekit.io/yourimg/sedongabu.jpg",
  },
  {
    id: "seupang",
    name: "Pantai Seupang",
    type: "Jalan-jalan",
    lat: -6.986738314811417,
    lng: 106.33815120018642,
    image: "https://ik.imagekit.io/yourimg/seupang.jpg",
  },
  {
    id: "goaarca",
    name: "Wisata Goa Arca",
    type: "Jalan-jalan",
    lat: -6.977559713156136,
    lng: 106.32666254467904,
    image: "https://ik.imagekit.io/yourimg/goaarca.jpg",
  },
  {
    id: "curugtujuh",
    name: "Curug Tujuh",
    type: "Jalan-jalan",
    lat: -6.974240977757274,
    lng: 106.33563874128828,
    image: "https://ik.imagekit.io/yourimg/curugtujuh.jpg",
  },
];

// Ambil semua kategori unik dari data properties
const kategoriPenginapan = Array.from(new Set(properties.map((p) => p.kategori)));

export default function PetaPage() {
  const searchParams = useSearchParams();
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  // Ambil semua koordinat penginapan
  const markers = properties.map((p: any) => ({
    id: p.id,
    title: p.title,
    position: [p.coordinates.lat, p.coordinates.lng] as [number, number],
    slug: p.slug,
    imageUrl: p.imageUrl,
    location: p.location,
    type: "Penginapan",
  }));

  // Titik tengah peta: dari query string jika ada, jika tidak rata-rata semua marker penginapan
  const initCenter: [number, number] = latParam && lngParam
    ? [parseFloat(latParam), parseFloat(lngParam)]
    : (markers.length > 0
      ? ([
          markers.reduce((sum, m) => sum + m.position[0], 0) / markers.length,
          markers.reduce((sum, m) => sum + m.position[1], 0) / markers.length
        ] as [number, number])
      : [-6.989, 106.127]);
  const [center, setCenter] = useState<[number, number]>(initCenter);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const markerRefs = useRef<{ [key: string]: any }>({});

  // Filter wisata berdasarkan kategori
  const wisataFiltered = selectedCategory
    ? wisata.filter((w) => w.type === selectedCategory)
    : wisata;

  // Filter penginapan & wisata berdasarkan pencarian & kategori
  const filteredMarkers = markers.filter(
    (m) =>
      (!selectedCategory || properties.find((p) => p.id === m.id)?.kategori === selectedCategory) &&
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.location.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredWisata = wisataFiltered.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle klik item di sidebar
  const handleSidebarClick = (id: string, position: [number, number]) => {
    setActiveMarker(id);
    setCenter(position);
    setSidebarOpen(false);
    setTimeout(() => {
      if (markerRefs.current[id]) {
        markerRefs.current[id].openPopup();
      }
    }, 300);
  };

  // Dapatkan posisi marker aktif untuk flyTo
  const activePosition = (() => {
    const m = markers.find((m) => m.id === activeMarker);
    if (m) return m.position;
    const w = wisata.find((w) => w.id === activeMarker);
    if (w) return [w.lat, w.lng] as [number, number];
    return null;
  })();

  return (
    <div className="relative w-full min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar (drawer di mobile) */}
      <aside
        className={`fixed z-[100] top-0 left-0 mt-16 h-[calc(100vh-64px)] w-4/5 max-w-xs bg-white rounded-r-2xl shadow-2xl p-4 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:rounded-none md:shadow-none md:w-80 md:overflow-y-auto md:mt-0 md:h-auto md:translate-x-0 md:block`}
        style={{ maxHeight: '100vh' }}
      >
        <div className='mb-2 text-xs text-red-500'>Sidebar aktif</div>
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-blue-600">📍</span>
            <h2 className="text-lg md:text-xl font-bold">Peta Sawarna</h2>
          </div>
          <button
            className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-blue-600 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup sidebar"
          >
            &times;
          </button>
        </div>
        {/* Input search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari penginapan/wisata..."
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Kategori:</div>
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-3 py-1 rounded ${!selectedCategory ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedCategory(null)}
            >
              Semua
            </button>
            {/* Tombol kategori penginapan dinamis */}
            {kategoriPenginapan.map((kat) => (
              <button
                key={kat}
                className={`px-3 py-1 rounded ${selectedCategory === kat ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                onClick={() => setSelectedCategory(kat)}
              >
                {kat}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded ${selectedCategory === "Jalan-jalan" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedCategory("Jalan-jalan")}
            >
              Jalan-jalan
            </button>
          </div>
        </div>
        <div className="mb-6">
          <div className="font-semibold mb-2">Penginapan</div>
          <ul className="space-y-3">
            {filteredMarkers.map((m) => (
              <li key={m.id} className="flex gap-3 items-center cursor-pointer hover:bg-blue-50 rounded-lg p-2 shadow-sm border border-blue-100" onClick={() => handleSidebarClick(m.id, m.position)}>
                <img src={m.imageUrl} alt={m.title} className="w-12 h-12 object-cover rounded shadow" />
                <div>
                  <div className="font-semibold text-sm md:text-base">{m.title}</div>
                  <div className="text-xs text-gray-500">{m.location}</div>
                </div>
              </li>
            ))}
            {filteredMarkers.length === 0 && <li className="text-xs text-gray-400">Tidak ditemukan</li>}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Wisata Sekitar</div>
          <ul className="space-y-3">
            {filteredWisata.map((w) => (
              <li key={w.id} className="flex gap-3 items-center cursor-pointer hover:bg-yellow-50 rounded-lg p-2 shadow-sm border border-orange-100 overflow-hidden" onClick={() => handleSidebarClick(w.id, [w.lat, w.lng])}>
                <img src={w.image} alt={w.name} className="w-10 h-10 object-cover rounded shadow flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-semibold text-sm md:text-base break-words truncate" style={{maxWidth:'120px'}}>{w.name}</div>
                  <div className="text-xs text-gray-500 break-words truncate" style={{maxWidth:'120px'}}>{w.type}</div>
                </div>
              </li>
            ))}
            {filteredWisata.length === 0 && <li className="text-xs text-gray-400">Tidak ditemukan</li>}
          </ul>
        </div>
      </aside>
      {/* Tombol buka sidebar di mobile */}
      <button
        className="fixed z-[110] bottom-6 right-6 md:hidden bg-blue-600 text-white rounded-full p-3 shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Buka sidebar"
      >
        <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="25" y2="12" /><line x1="3" y1="6" x2="25" y2="6" /><line x1="3" y1="18" x2="25" y2="18" /></svg>
      </button>
      {/* Overlay untuk sidebar di mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 mt-16 h-[calc(100vh-64px)] md:mt-0 md:h-auto"
          style={{ top: '64px' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Peta */}
      <main className="flex-1 min-h-screen w-screen" style={{ minHeight: '100vh', width: '100vw' }}>
        <MapView
          key="main-map"
          center={center}
          filteredMarkers={filteredMarkers}
          filteredWisata={filteredWisata}
          activePosition={activePosition}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          markerRefs={markerRefs}
        />
      </main>
    </div>
  );
} 
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, Bed, Eye, Map } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MapComponent from "./MapComponent";

interface PromoCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  capacity: number;
  bedrooms: number;
  amenities: string[];
  validUntil: string;
  coordinates?: { lat: number; lng: number };
}

export function PromoCard({
  id,
  title,
  description,
  price,
  originalPrice,
  discount,
  image,
  location,
  rating,
  reviews,
  capacity,
  bedrooms,
  amenities,
  validUntil,
  coordinates
}: PromoCardProps) {
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'lokasi' | 'deskripsi'>('info');

  const handleBookNow = () => {
    navigate(`/villas/${id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden w-full max-w-2xl mx-auto min-h-[110px] relative">
        {/* Kiri: Gambar utama dan thumbnail */}
        <div className="relative w-28 min-w-[100px] flex flex-col items-center p-0">
        <img
          src={image}
          alt={title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowQuickView(true)}
          />
          {/* Tombol favorit */}
          <button className="absolute top-1 right-1 bg-white/80 dark:bg-gray-700/80 rounded-full p-0.5 shadow hover:bg-white dark:hover:bg-gray-600" title="Tambah ke favorit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-gray-400 dark:text-gray-300">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>
          {/* Tombol Quick View */}
          <button
            className="absolute top-1 left-1 bg-white/80 dark:bg-gray-700/80 rounded-full p-0.5 shadow hover:bg-white dark:hover:bg-gray-600"
            onClick={() => setShowQuickView(true)}
            title="Quick View"
          >
            <Eye className="w-4 h-4 text-gray-400 dark:text-gray-300" />
          </button>
          {/* Thumbnail gambar kecil (dummy) */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            <img src={image} alt="thumb" className="w-4 h-4 object-cover rounded" />
            <img src={image} alt="thumb" className="w-4 h-4 object-cover rounded" />
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[7px] rounded text-gray-600 dark:text-gray-300">Lihat<br />semua</div>
      </div>
        </div>
        {/* Kanan: Info properti */}
        <div className="flex-1 flex flex-col justify-between p-2 bg-white dark:bg-gray-800">
          {/* Tab */}
          <div className="flex gap-2 mb-2">
            <button onClick={() => setActiveTab('info')} className={`px-2 py-1 rounded text-xs font-semibold ${activeTab === 'info' ? 'bg-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>Info</button>
            <button onClick={() => setActiveTab('lokasi')} className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${activeTab === 'lokasi' ? 'bg-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}><Map className="w-3 h-3" /> Lokasi</button>
            <button onClick={() => setActiveTab('deskripsi')} className={`px-2 py-1 rounded text-xs font-semibold ${activeTab === 'deskripsi' ? 'bg-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>Deskripsi</button>
          </div>
          {/* Konten Tab */}
          {activeTab === 'info' ? (
            <>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[13px] font-semibold text-gray-900 dark:text-white leading-tight line-clamp-1">{title}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-gray-500 dark:text-gray-300 mb-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /></svg>
                  <span className="truncate max-w-[80px]">{location}</span>
                </div>
                <div className="flex gap-0.5 mb-0.5">
                  <span className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-[9px] px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-200">Sarapan</span>
                  <span className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-[9px] px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-200">Parkir</span>
                  <span className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-[9px] px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-200">WiFi Gratis</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end gap-0.5 mt-1">
                {/* Badge diskon di atas harga */}
                <span className="inline-block bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded mb-0.5">Diskon {discount}%</span>
            <div className="flex items-center gap-1">
                  <span className="text-gray-400 dark:text-gray-300 text-[11px] line-through">{formatPrice(originalPrice)}</span>
                  <span className="text-red-600 font-bold text-[13px]">Rp {formatPrice(price).replace('Rp', '').trim()}</span>
                </div>
              </div>
            </>
          ) : activeTab === 'lokasi' ? (
            <div className="flex flex-col gap-2 items-start p-2">
              <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-2">
                <MapComponent
                  center={typeof coordinates !== 'undefined' ? [coordinates.lat, coordinates.lng] : [-6.9875, 106.3206]}
                  propertyName={title}
                  propertyLocation={location}
                  height="180px"
                />
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>{location}</span>
              </div>
            </div>
          ) : (
            <div className="p-2 text-sm text-gray-700 dark:text-gray-200 line-clamp-5 min-h-[7rem] relative after:content-['...'] after:absolute after:bottom-2 after:right-2 after:text-gray-400 after:bg-white dark:after:bg-gray-900 after:px-1 pointer-events-none">
              {description}
            </div>
          )}
        </div>
      </div>
      {/* Modal Quick View */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-3xl w-full p-0 relative animate-fadeIn overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Kiri: Gambar */}
            <div className="relative md:min-h-[400px]">
              <img src={image} alt={title} className="w-full h-40 md:h-full object-cover" />
              <span className="absolute top-2 left-2 bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">Villa</span>
              {/* Badge Diskon */}
              <span className="absolute top-2 right-12 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">Diskon {discount}%</span>
              <button
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white text-xl"
                onClick={() => setShowQuickView(false)}
                aria-label="Tutup Quick View"
              >
                ×
              </button>
            </div>
            {/* Kanan: Info Utama */}
            <div className="p-4 pb-2 flex flex-col justify-between">
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">{title}</div>
                <div className="flex items-center gap-1 text-sm mb-1">
                  <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{rating}</span>
                  <span className="text-gray-500">{reviews} ulasan</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span>{location}</span>
                </div>
                {/* Fasilitas utama 3 kolom */}
                <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                  <div className="flex flex-col items-center flex-1">
                    <Users className="w-5 h-5 text-cyan-500 mb-0.5" />
                    <span className="text-xs text-gray-700 dark:text-gray-200 font-semibold">{capacity} tamu</span>
                    <span className="text-[10px] text-gray-500">Kapasitas</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <Bed className="w-5 h-5 text-cyan-500 mb-0.5" />
                    <span className="text-xs text-gray-700 dark:text-gray-200 font-semibold">{bedrooms} kamar</span>
                    <span className="text-[10px] text-gray-500">Kamar Tidur</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-cyan-500 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m9 2a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h3.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293h6.172a1 1 0 00.707-.293l1.414-1.414A1 1 0 0120.414 5H21a2 2 0 012 2v11z" /></svg>
                    <span className="text-xs text-gray-700 dark:text-gray-200 font-semibold">8 kamar</span>
                    <span className="text-[10px] text-gray-500">Kamar Mandi</span>
                  </div>
                </div>
                {/* Chips Fasilitas Utama */}
                <div className="mb-2">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Fasilitas Utama</div>
                  <div className="flex flex-wrap gap-1">
                    {amenities.slice(0, 5).map((item, idx) => (
                      <span key={idx} className="bg-gray-100 border border-gray-300 text-[11px] px-2 py-0.5 rounded text-gray-700 dark:bg-gray-800 dark:text-gray-200">{item}</span>
          ))}
        </div>
                </div>
              </div>
              {/* Harga & Tombol */}
              <div className="mt-2 mb-1">
                <span className="text-lg font-bold text-red-600">{formatPrice(price)}</span>
                <span className="text-xs text-gray-500 ml-1">per malam</span>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <Button size="sm" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" onClick={() => navigate(`/villas/${id}`)}>Lihat Detail</Button>
                <Button size="sm" variant="outline" className="w-full" onClick={() => setShowQuickView(false)}>Tutup</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 
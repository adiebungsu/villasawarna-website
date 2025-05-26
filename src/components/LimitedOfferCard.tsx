import React from 'react';

interface LimitedOfferProperty {
  name: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  imageUrl: string;
  thumbnails?: string[];
  promoLabel?: string;
  lastRoom?: boolean;
  preferred?: boolean;
  freeCancel?: boolean;
}

interface LimitedOfferCardProps {
  property: LimitedOfferProperty;
}

const fallbackThumb = 'https://placehold.co/100x64?text=No+Image';

const LimitedOfferCard: React.FC<LimitedOfferCardProps> = ({ property }) => {
  const thumbs = Array.isArray(property.thumbnails) && property.thumbnails.length > 0
    ? property.thumbnails.filter(Boolean)
    : [];

  return (
    <div className="flex flex-col border rounded-xl overflow-hidden shadow bg-white relative w-64 mx-2 transition hover:shadow-xl hover:-translate-y-1 min-h-[340px]">
      {/* Gambar Properti & Badge */}
      <div className="relative">
        <img src={property.imageUrl} alt={property.name} className="w-full h-32 object-cover" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackThumb; }} />
        {/* Badge Diskon & Kamar Terakhir */}
        <div className="absolute top-2 left-2 flex gap-1">
          {property.discount && (
            <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">{property.discount} OFF</span>
          )}
        </div>
        {property.lastRoom && (
          <span className="absolute top-2 right-2 bg-red-700 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">1 Kamar Terakhir</span>
        )}
      </div>
      {/* Thumbnail photo */}
      {thumbs.length > 0 && (
        <div className="flex gap-1 mt-1 px-2 pb-1">
          {thumbs.slice(0, 3).map((thumb, idx) => (
            <img key={idx} src={thumb} alt="thumb" className="w-11 h-8 object-cover rounded border" onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackThumb; }} />
          ))}
        </div>
      )}
      {/* Detail Properti */}
      <div className="flex flex-col flex-1 px-3 pt-2 pb-3 justify-between">
        {/* Header: Rating & Preferred */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <span className="text-blue-700 font-bold text-sm">{property.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">{property.reviews.toLocaleString('id-ID')} Ulasan</span>
          </div>
          {property.preferred && (
            <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded">Agoda Preferred</span>
          )}
        </div>
        {/* Nama Properti */}
        <h3 className="font-bold text-[15px] mb-0.5 line-clamp-2 leading-tight">{property.name}</h3>
        {/* Lokasi */}
        <div className="text-xs text-blue-700 mb-1">{property.location}</div>
        {/* Label Promo */}
        <div className="flex flex-wrap gap-1 mb-2 items-center">
          {property.promoLabel && (
            <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded">{property.promoLabel}</span>
          )}
          {property.freeCancel && (
            <span className="bg-green-50 text-green-600 text-[11px] px-2 py-0.5 rounded border border-green-200">PEMBATALAN GRATIS</span>
          )}
        </div>
        {/* Harga & Tombol */}
        <div className="flex flex-col items-end mt-auto">
          {property.originalPrice && (
            <span className="text-gray-400 line-through text-xs">Rp {property.originalPrice.toLocaleString('id-ID')}</span>
          )}
          <span className="text-lg font-bold text-red-600">Rp {property.price.toLocaleString('id-ID')}</span>
          <span className="text-xs text-gray-500 mb-1">Per malam sebelum pajak dan biaya lainnya</span>
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white text-xs px-3 py-1 rounded shadow font-semibold mt-1">Lihat detail</button>
        </div>
      </div>
    </div>
  );
};

export default LimitedOfferCard; 
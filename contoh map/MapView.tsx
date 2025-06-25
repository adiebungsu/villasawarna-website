"use client";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { properties } from "../data/dummyData";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import { useEffect } from "react";

function FlyToMarker({ position }: { position: [number, number] | null }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 16, { duration: 1 });
  }
  return null;
}

// Komponen untuk auto-zoom ke center jika berubah
function AutoZoomToCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 16, { animate: true });
    }
  }, [center, map]);
  return null;
}

const villaIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const wisataIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

// Fungsi untuk membuat custom icon foto penginapan
function createPhotoIcon(imageUrl: string) {
  return new L.Icon({
    iconUrl: imageUrl,
    iconSize: [48, 48], // Ukuran thumbnail
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
    className: 'rounded-full shadow-lg border-2 border-white',
  });
}

export default function MapView({
  center,
  filteredMarkers,
  filteredWisata,
  activePosition,
  activeMarker,
  setActiveMarker,
  markerRefs,
}: {
  center: [number, number],
  filteredMarkers: any[],
  filteredWisata: any[],
  activePosition: [number, number] | null,
  activeMarker: string | null,
  setActiveMarker: (id: string | null) => void,
  markerRefs: React.MutableRefObject<{ [key: string]: any }>,
}) {
  return (
    <MapContainer center={center} zoom={15} style={{ height: "100vh", width: "100%" }} key="main-map">
      <AutoZoomToCenter center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Fly to marker jika ada yang aktif */}
      <FlyToMarker position={activePosition} />
      {/* Marker penginapan */}
      <MarkerClusterGroup>
        {filteredMarkers.map((m) => {
          // Ambil data lengkap dari properties
          const prop = properties.find((p) => p.id === m.id);
          return (
            <Marker
              key={m.id}
              position={m.position as [number, number]}
              icon={createPhotoIcon(m.imageUrl)}
              ref={(ref) => { markerRefs.current[m.id] = ref; }}
              eventHandlers={{
                popupclose: () => setActiveMarker(null),
              }}
            >
              {/* Tidak ada tulisan/icon lain, hanya foto */}
              <Popup>
                <div className="w-56">
                  <img src={m.imageUrl} alt={m.title} className="w-full h-28 object-cover rounded-lg mb-2" />
                  <div className="font-bold text-lg mb-1">{m.title}</div>
                  <div className="text-sm text-gray-600 mb-1">{m.location}</div>
                  <div className="text-xs text-gray-500 mb-2">{m.description}</div>
                  <div className="text-xs text-blue-700 font-semibold">
                    Harga: Rp{(m.price ?? prop?.price ?? 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-yellow-600">
                    Rating: {(m.rating ?? prop?.rating ?? '-')} ({m.reviewCount ?? prop?.reviewCount ?? 0} review)
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${m.position[0]},${m.position[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg shadow-lg border-2 border-green-700 text-xs font-bold text-center transition whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ minWidth: 0 }}
                    >
                      Arahkan ke sini
                    </a>
                    <a
                      href={`/penginapan/${m.slug}`}
                      className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg shadow-lg border-2 border-blue-800 text-xs font-bold text-center transition whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ minWidth: 0 }}
                    >
                      Lihat Detail
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      {/* Marker wisata */}
      {filteredWisata.map((w) => (
        <Marker
          key={w.id}
          position={[w.lat, w.lng] as [number, number]}
          icon={wisataIcon}
          ref={(ref) => { markerRefs.current[w.id] = ref; }}
          eventHandlers={{
            popupclose: () => setActiveMarker(null),
          }}
        >
          {/* Tooltip hanya muncul saat hover di desktop, tidak permanent */}
          <Tooltip
            direction="top"
            offset={[0, -20]}
            interactive
            permanent={false}
            className="hidden md:block"
            opacity={1}
          >
            <div className="bg-yellow-100 border border-orange-400 text-orange-700 font-semibold px-2 py-1 rounded shadow text-xs flex flex-col gap-1 min-w-40">
              <div className="flex items-center gap-1">
                <span role="img" aria-label="wisata">🏝️</span>
                <span>{w.name}</span>
              </div>
              <div className="text-[10px] text-gray-500">{w.type}</div>
              {w.description && (
                <div className="text-[10px] text-gray-600 mt-1 line-clamp-2">{w.description}</div>
              )}
            </div>
          </Tooltip>
          <Popup>
            <div className="font-bold mb-1 text-base">{w.name}</div>
            <img src={w.image} alt={w.name} className="w-32 h-20 object-cover rounded mb-2" />
            <div className="text-xs text-gray-500 mt-1">{w.type}</div>
            {w.description && (
              <div className="text-xs text-gray-600 mt-1">{w.description}</div>
            )}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${w.lat},${w.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded shadow"
            >
              Arahkan ke sini
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 
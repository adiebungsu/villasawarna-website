import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getAllProperties, nearbyAttractionsData } from '../data/properties';
import type { Marker as LeafletMarker, Map as LeafletMap } from 'leaflet';
import type { MarkerClusterGroup as LeafletMarkerClusterGroup } from 'leaflet.markercluster';
import { useState as useReactState } from 'react';
import { Tooltip } from 'react-leaflet';
import { useLocation } from 'react-router-dom';

const properties = getAllProperties();

// Custom icon foto bulat untuk villa
function createPropertyIcon(imgUrl: string) {
  return L.divIcon({
    html: `<div style='width:48px;height:48px;border-radius:50%;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.15);border:2.5px solid #fff;background:#fff;'><img src='${imgUrl}' style='width:100%;height:100%;object-fit:cover;display:block;'/></div>`,
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
}
// Icon wisata
const wisataIcon = L.divIcon({
  html: `<img src='https://cdn-icons-png.flaticon.com/512/854/854878.png' style='width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.18));'/>`,
  className: '',
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const defaultCenter = [-6.983539105798058, 106.30959983031511];
const defaultZoom = 14;

// Tambahkan fungsi util untuk akses map internal
function getLeafletMap(marker: L.Marker): L.Map | undefined {
  return (marker as unknown as Record<string, unknown>)["_map"] as L.Map | undefined;
}

// Komponen untuk trigger invalidateSize pada map setelah render
function MapResizeFixer() {
  const map = useMap();
  useEffect(() => {
    let count = 0;
    const max = 10;
    const interval = setInterval(() => {
      map.invalidateSize();
      window.dispatchEvent(new Event('resize'));
      count++;
      if (count >= max) clearInterval(interval);
    }, 200);
    return () => clearInterval(interval);
  }, [map]);
  return null;
}

export default function MapPage() {
  const [search, setSearch] = useState('');
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [activeWisataIdx, setActiveWisataIdx] = useState<number | null>(null);
  const [selectedLatLng, setSelectedLatLng] = useState<[number, number] | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedWisataIdx, setSelectedWisataIdx] = useState<number | null>(null);
  const propertyMarkerRefs = useRef<{ [id: string]: L.Marker | null }>({});
  const wisataMarkerRefs = useRef<{ [idx: number]: L.Marker | null }>({});
  const markerClusterGroupRef = useRef<L.LayerGroup | null>(null);
  // Deteksi dark mode
  const [isDark, setIsDark] = useReactState(false);
  // Deteksi mobile
  const [isMobile, setIsMobile] = useReactState(false);
  const [sidebarOpen, setSidebarOpen] = useReactState(false);
  const location = useLocation();
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();
    window.addEventListener('DOMContentLoaded', checkDark);
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('DOMContentLoaded', checkDark);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    // Cek query param id
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      const prop = properties.find(p => p.id === id);
      if (prop && Array.isArray(prop.coordinates)) {
        setSelectedPropertyId(id);
        setSelectedLatLng(prop.coordinates);
        setActivePropertyId(id);
        setActiveWisataIdx(null);
      }
    }
  }, [location.search]);

  // Filter
  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );
  const filteredWisata = nearbyAttractionsData.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handler klik sidebar villa
  function handleSidebarPropertyClick(p) {
    setActivePropertyId(p.id);
    setActiveWisataIdx(null);
    setSelectedLatLng(p.coordinates);
    setSelectedPropertyId(p.id);
  }
  // Handler klik sidebar wisata
  function handleSidebarWisataClick(w, idx) {
    setActiveWisataIdx(idx);
    setActivePropertyId(null);
    setSelectedLatLng(w.coordinates);
    setSelectedWisataIdx(idx);
  }

  // Komponen imperative untuk flyTo dan buka popup
  function FlyToAndOpenPopup({ latlng, propertyId }) {
    const map = useMap();
    useEffect(() => {
      if (latlng && propertyId && propertyMarkerRefs.current[propertyId]) {
        const marker = propertyMarkerRefs.current[propertyId];
        const clusterGroup = markerClusterGroupRef.current;
        if (clusterGroup && typeof clusterGroup['zoomToShowLayer'] === 'function') {
          clusterGroup['zoomToShowLayer'](marker, () => {
            map.setView(latlng, 16, { animate: true });
            setTimeout(() => {
              marker.openPopup();
            }, 400);
          });
        } else {
          map.setView(latlng, 16, { animate: true });
    setTimeout(() => {
            marker.openPopup();
          }, 400);
        }
      }
    }, [latlng, propertyId, map]);
    return null;
  }

  // Komponen imperative untuk flyTo dan buka popup wisata
  function FlyToAndOpenPopupWisata({ latlng, wisataIdx }) {
    const map = useMap();
    useEffect(() => {
      if (latlng && wisataIdx != null && wisataMarkerRefs.current[wisataIdx]) {
        const marker = wisataMarkerRefs.current[wisataIdx];
        map.setView(latlng, 16, { animate: true });
        setTimeout(() => {
          marker.openPopup();
        }, 400);
      }
    }, [latlng, wisataIdx, map]);
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        background: isDark ? '#18181b' : '#f8fafc',
        minHeight: 0,
        minWidth: 0,
      }}
    >
      {/* Hamburger button for mobile */}
      {isMobile && (
        <button
          aria-label="Buka sidebar"
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'fixed',
            right: 16,
            top: 16,
            zIndex: 2001,
            background: isDark ? '#23232a' : '#fff',
            border: 'none',
            borderRadius: 8,
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            cursor: 'pointer',
          }}
        >
          <div style={{ width: 24, height: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
            <div style={{ height: 3, background: isDark ? '#fff' : '#222', borderRadius: 2 }} />
            <div style={{ height: 3, background: isDark ? '#fff' : '#222', borderRadius: 2 }} />
            <div style={{ height: 3, background: isDark ? '#fff' : '#222', borderRadius: 2 }} />
          </div>
        </button>
      )}
      {/* Sidebar */}
      {(!isMobile || sidebarOpen) && (
        <div
          className={`map-sidebar${isMobile ? ' mobile-drawer' : ''}${isMobile && sidebarOpen ? ' open' : ''}`}
          style={{
            width: isMobile ? '90vw' : 340,
            height: isMobile ? '45vh' : 'auto',
            background: isDark ? 'rgba(24,24,27,0.92)' : 'rgba(255,255,255,0.92)',
            color: isDark ? '#fff' : '#222',
            borderRight: !isMobile ? (isDark ? '1px solid #23232a' : '1px solid #eee') : 'none',
            borderTop: isMobile ? (isDark ? '1px solid #23232a' : '1px solid #eee') : 'none',
            borderTopLeftRadius: isMobile ? 24 : 0,
            borderTopRightRadius: isMobile ? 24 : 0,
            borderBottomLeftRadius: isMobile ? 16 : 0,
            borderBottomRightRadius: isMobile ? 16 : 0,
            boxShadow: isMobile ? '0 -8px 32px rgba(0,0,0,0.18)' : 'none',
            backdropFilter: isMobile ? 'blur(12px)' : undefined,
            WebkitBackdropFilter: isMobile ? 'blur(12px)' : undefined,
            padding: isMobile ? '16px 16px 80px 16px' : 16,
            overflowY: 'auto',
            position: isMobile ? 'fixed' : 'static',
            left: isMobile ? '50%' : undefined,
            bottom: isMobile ? 24 : undefined,
            top: isMobile ? 'unset' : undefined,
            transform: isMobile ? 'translateX(-50%)' : undefined,
            zIndex: isMobile ? 2000 : undefined,
            transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
            display: 'flex',
            flexDirection: 'column',
            minWidth: isMobile ? 0 : undefined,
            minHeight: isMobile ? 0 : undefined,
          }}
        >
          {isMobile && (
            <div style={{ width: 40, height: 5, background: isDark ? '#444' : '#bbb', borderRadius: 3, margin: '0 auto 12px auto' }} />
          )}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: isDark ? '#18181b' : '#fff',
              padding: '16px 12px 8px 12px',
              minHeight: 76,
              marginBottom: 24,
              boxShadow: isDark
                ? '0 2px 8px rgba(30,58,138,0.12)'
                : '0 2px 8px rgba(37,99,235,0.08)',
              borderBottom: isDark
                ? '1px solid #23232a'
                : '1px solid #eee'
            }}
          >
            {isMobile && (
              <button
                aria-label="Tutup sidebar"
                className="sidebar-close-btn"
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 8,
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? '#fff' : '#222',
                  fontSize: 28,
                  cursor: 'pointer',
                  zIndex: 2002,
                  lineHeight: 1
                }}
              >
                ×
              </button>
            )}
            <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12, marginRight: isMobile ? 36 : 0 }}><span role="img" aria-label="pin">📍</span> Peta Sawarna</h2>
        <input
          type="text"
          placeholder="Cari penginapan/wisata..."
          value={search}
          onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 8,
                border: isDark ? '1px solid #444' : '1px solid #ddd',
                marginBottom: 4,
                background: isDark ? '#23232a' : '#fff',
                color: isDark ? '#fff' : '#222',
                fontWeight: 500,
                caretColor: isDark ? '#fff' : '#222'
              }}
        />
          </div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Penginapan</div>
        <div style={{ marginBottom: 20 }}>
            {filteredProperties.map((p, idx) => (
            <div
              key={p.id}
                className="sidebar-property-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: isMobile && sidebarOpen ? 1 : !isMobile ? 1 : 0,
                  transform: isMobile && sidebarOpen ? 'translateY(0)' : isMobile ? 'translateY(20px)' : 'none',
                  transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)',
                  transitionDelay: isMobile && sidebarOpen ? `${idx * 60}ms` : '0ms'
                }}
              onClick={() => handleSidebarPropertyClick(p)}
            >
              <img src={p.image || p.mainImages?.[0]} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} loading="lazy" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                    <div
                      style={{
                        fontSize: isMobile ? 11 : 14,
                        color: isDark ? '#a5d8ff' : '#444',
                        marginBottom: 4,
                        fontWeight: 500,
                        letterSpacing: 0.2,
                        background: isDark ? 'rgba(30,58,138,0.18)' : 'transparent',
                        borderRadius: 4,
                        padding: isMobile ? '1px 4px' : '2px 6px',
                        display: 'inline-block'
                      }}
                    >
                      {p.location}
                    </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Wisata Sekitar</div>
        <div>
          {filteredWisata.map((w, idx) => (
            <div
              key={w.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 10,
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: isMobile && sidebarOpen ? 1 : !isMobile ? 1 : 0,
                  transform: isMobile && sidebarOpen ? 'translateY(0)' : isMobile ? 'translateY(20px)' : 'none',
                  transition: 'opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)',
                  transitionDelay: isMobile && sidebarOpen ? `${idx * 60}ms` : '0ms'
                }}
              onClick={() => handleSidebarWisataClick(w, idx)}
            >
              <img src='https://cdn-icons-png.flaticon.com/512/854/854878.png' alt={w.name} style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, background: '#f3f4f6', padding: 2 }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{w.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      {/* Overlay for mobile drawer */}
      {isMobile && (
        <div
          className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 1999,
            pointerEvents: sidebarOpen ? 'auto' : 'none'
          }}
        />
      )}
      {/* Map */}
      <div style={{ flex: 1, position: 'relative', height: 'calc(100vh - 80px)', minHeight: 0 }}>
        <MapContainer
          center={defaultCenter as [number, number]}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <MapResizeFixer />
          <FlyToAndOpenPopup latlng={selectedLatLng} propertyId={selectedPropertyId} />
          <FlyToAndOpenPopupWisata latlng={selectedLatLng} wisataIdx={selectedWisataIdx} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <MarkerClusterGroup
            ref={markerClusterGroupRef}
            onCreate={cluster => {
              markerClusterGroupRef.current = cluster.layer;
            }}
            disableClusteringAtZoom={16}
          >
            {filteredProperties.filter(p => Array.isArray(p.coordinates) && p.coordinates.length === 2).map((property) => (
              <Marker
                key={property.id}
                position={property.coordinates as [number, number]}
                icon={createPropertyIcon(property.image || property.mainImages?.[0])}
                ref={(ref) => {
                  if (ref && 'leafletElement' in ref) {
                    // @ts-expect-error: leafletElement is not typed in react-leaflet ref
                    propertyMarkerRefs.current[property.id] = ref.leafletElement;
                  } else if (ref && ref instanceof L.Marker) {
                    propertyMarkerRefs.current[property.id] = ref;
                  }
                }}
                eventHandlers={{ add: () => { console.log('MARKER RENDERED', property.id); } }}
              >
                <Popup minWidth={120} maxWidth={isMobile ? 150 : 340} autoPan={true}>
                  <div className="custom-popup-content">
                    <img
                      src={property.image || property.mainImages?.[0]}
                      alt={property.name}
                      style={{
                        width: '100%',
                        height: isMobile ? 80 : 140,
                        objectFit: 'cover',
                        display: 'block',
                        margin: 0,
                        padding: 0,
                        border: 'none',
                        borderRadius: 6
                      }}
                    />
                    <div style={{ padding: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: isMobile ? 13 : 18, marginBottom: 2 }}>{property.name}</div>
                      <div
                        style={{
                          fontSize: isMobile ? 11 : 14,
                          color: isDark ? '#a5d8ff' : '#444',
                          marginBottom: 4,
                          fontWeight: 500,
                          letterSpacing: 0.2,
                          background: isDark ? 'rgba(30,58,138,0.18)' : 'transparent',
                          borderRadius: 4,
                          padding: isMobile ? '1px 4px' : '2px 6px',
                          display: 'inline-block'
                        }}
                      >
                        {property.location}
                      </div>
                      <div style={{ fontSize: isMobile ? 12 : 14, color: '#2563eb', fontWeight: 600, marginBottom: 2 }}>
                        Harga: {property.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }) || '-'}
                      </div>
                      <div style={{ fontSize: isMobile ? 11 : 13, color: '#f59e42', fontWeight: 500, marginBottom: 6 }}>
                        Rating: {property.ratingSummary?.score || property.rating || 0} ({property.ratingSummary?.totalReviews || property.reviews || 0} review)
                      </div>
                      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${property.coordinates?.[0]},${property.coordinates?.[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            background: isDark
                              ? 'linear-gradient(90deg,#11998e 0,#38ef7d 100%)'
                              : 'linear-gradient(90deg,#43e97b 0,#38f9d7 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: 6,
                            padding: isMobile ? '4px 0' : '7px 0',
                            textAlign: 'center',
                            textDecoration: 'none',
                            fontSize: isMobile ? 12 : 15,
                            boxShadow: isDark
                              ? '0 1px 4px rgba(17,153,142,0.12)'
                              : '0 1px 4px rgba(67,233,123,0.12)'
                          }}
                        >Arahkan ke sini</a>
                        <a
                          href={property.type === 'villa' ? `/villas/${property.id}` : `/homestays/${property.id}`}
                          style={{
                            flex: 1,
                            background: isDark
                              ? 'linear-gradient(90deg,#1e3a8a 0,#2563eb 100%)'
                              : 'linear-gradient(90deg,#2563eb 0,#1e40af 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            borderRadius: 6,
                            padding: isMobile ? '4px 0' : '7px 0',
                            textAlign: 'center',
                            textDecoration: 'none',
                            fontSize: isMobile ? 12 : 15,
                            boxShadow: isDark
                              ? '0 1px 4px rgba(30,58,138,0.12)'
                              : '0 1px 4px rgba(37,99,235,0.12)'
                          }}
                        >Lihat Detail</a>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            {filteredWisata.map((w, idx) => (
              <Marker
                key={w.name + idx}
                position={w.coordinates as [number, number]}
                icon={wisataIcon}
                ref={(ref) => {
                  if (ref && 'leafletElement' in ref) {
                    // @ts-expect-error: leafletElement is not typed in react-leaflet ref
                    wisataMarkerRefs.current[idx] = ref.leafletElement;
                  } else if (ref && ref instanceof L.Marker) {
                    wisataMarkerRefs.current[idx] = ref;
                  }
                }}
              >
                <Tooltip direction="top" offset={[0, -10]}>{w.name}</Tooltip>
                <Popup minWidth={180} maxWidth={240}>
                  <div style={{fontWeight:700, fontSize:16, marginBottom:4}}>{w.name}</div>
                  <div style={{fontSize:13, color:'#555'}}>Wisata Sekitar Sawarna</div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .map-sidebar {
            display: none !important;
          }
          .map-sidebar.mobile-drawer {
            display: flex !important;
          }
        }
        .custom-popup-content {
          padding: 8px 8px 4px 8px;
          font-size: 13px;
          min-width: 0;
          background: #fff;
          color: #222;
          border-radius: 0;
        }
        .dark .custom-popup-content {
          background: #23232a;
          color: #fff;
        }
        .dark .leaflet-popup-content-wrapper,
        .dark .leaflet-popup-tip {
          background: #23232a !important;
          color: #fff !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25) !important;
        }
        @media (max-width: 640px) {
          .custom-popup-content {
            padding: 4px 4px 2px 4px;
            font-size: 12px;
          }
        }
        @media (min-width: 641px) {
          .sidebar-property-item {
            transition: background 0.18s, box-shadow 0.18s;
            cursor: pointer;
          }
          .sidebar-property-item:hover {
            background: #e0f2fe;
            box-shadow: 0 2px 8px rgba(37,99,235,0.08);
            border-radius: 10px;
          }
          .dark .sidebar-property-item:hover {
            background: #1e293b;
          }
        }
        .dark .sidebar-search-sticky input::placeholder {
          color: #bbb !important;
          opacity: 1;
        }
        @media (max-width: 640px) {
          .mobile-drawer {
            transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s;
            transform: translateY(100%);
            opacity: 0;
            will-change: transform, opacity;
          }
          .mobile-drawer.open {
            transform: translateY(0);
            opacity: 1;
          }
          .sidebar-overlay {
            transition: opacity 0.25s;
            opacity: 0;
          }
          .sidebar-overlay.open {
            opacity: 1;
          }
        }
        .sidebar-close-btn:active {
          transform: scale(1.18);
          transition: transform 0.12s;
        }
      `}</style>
    </div>
  );
} 
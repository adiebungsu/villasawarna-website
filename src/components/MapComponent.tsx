import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';

// Fix untuk marker icon Leaflet
interface IconDefault extends L.Icon.Default {
  _getIconUrl?: () => string;
}

delete (L.Icon.Default.prototype as IconDefault)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  center: [number, number];
  height: string;
  shouldUpdateSize?: boolean;
  children?: React.ReactNode;
}

// Tambahkan komponen child untuk invalidateSize
const InvalidateMapSize: FC = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      console.log('Map size invalidated (hook)');
    }, 0);
  }, [map]);
  return null;
};

const MapComponent: FC<MapComponentProps> = ({ center, height, shouldUpdateSize, children }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Cek validitas center
  const isValidCenter = Array.isArray(center) && center.length === 2 &&
    typeof center[0] === 'number' && typeof center[1] === 'number' &&
    !isNaN(center[0]) && !isNaN(center[1]);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
        console.log('Map size invalidated');
      }, 0);
    }
  }, [shouldUpdateSize]);

  if (!isValidCenter) {
    return <div className="text-red-500 p-4">Lokasi peta tidak valid</div>;
  }

  return (
    <div className="rounded-xl overflow-hidden" style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <InvalidateMapSize />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
};

export default MapComponent; 
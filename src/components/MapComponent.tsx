import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef, useEffect } from 'react';

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
  propertyName: string;
  propertyLocation: string;
  height: string;
  shouldUpdateSize?: boolean;
}

const MapComponent: FC<MapComponentProps> = ({ center, propertyName, propertyLocation, height, shouldUpdateSize }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
        console.log('Map size invalidated');
      }, 0);
    }
  }, [shouldUpdateSize]);

  return (
    <div className="rounded-xl overflow-hidden" style={{ height }}>
      <MapContainer 
        center={center} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        whenReady={(map) => { mapRef.current = map; }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            {propertyName}<br />
            {propertyLocation}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent; 
'use client';
// components/Map.tsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importamos los iconos predeterminados de Leaflet y corregimos el problema del ícono en Next.js.
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente para manejar el evento de clic en el mapa
const MapClickHandler = ({ setMarkerPosition }: { setMarkerPosition: (pos: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
};

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  // Nos aseguramos de que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relati" style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[36.7213, -4.4214]} // Coordenadas iniciales (Málaga, España)
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Manejador de clic en el mapa */}
        <MapClickHandler setMarkerPosition={setMarkerPosition} />

        {/* Mostrar el marcador si existe una posición */}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              Marcador en {markerPosition[0]}, {markerPosition[1]}.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;

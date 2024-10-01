'use client'

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Importamos los iconos predeterminados de Leaflet y corregimos el problema del ícono en Next.js.
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import MarkerForm from './Markerform';  // Importamos el componente de formulario

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapClickHandler = ({ onClick }: { onClick: (pos: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
};

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [formPosition, setFormPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<{ position: [number, number]; title: string; description: string; tag: string }[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMapClick = (position: [number, number]) => {
    setFormPosition(position); // Mostrar el formulario en la posición clicada
  };

  const handleFormSubmit = (data: { title: string; description: string; tag: string }) => {
    if (formPosition) {
      // Agregar el nuevo marcador
      setMarkers([...markers, { position: formPosition, title: data.title, description: data.description, tag: data.tag }]);
      setFormPosition(null); // Cerrar el formulario
    }
  };

  const handleFormCancel = () => {
    setFormPosition(null); // Cerrar el formulario sin hacer nada
  };

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
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
        <MapClickHandler onClick={handleMapClick} />

        {/* Mostrar los marcadores existentes */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>
              <strong>{marker.title}</strong>
              <p>{marker.description}</p>
              <small>{marker.tag}</small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Mostrar el formulario cuando formPosition no es null */}
      <MarkerForm
        position={formPosition}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    </div>
  );
};

export default Map;
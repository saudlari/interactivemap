import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerForm from './MarkerForm';
import ImageCarousel from './ImageCarousel'; // Importa el componente del carrusel

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
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

interface MarkerData {
  position: [number, number];
  title: string;
  description: string;
  tag: string;
  category: string;
  subcategory: string;
  imageFiles: string[]; // Almacenamos imágenes en base64
  link: string;
}

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [formPosition, setFormPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMapClick = (position: [number, number]) => {
    setFormPosition(position);
  };

  const handleFormSubmit = (data: Omit<MarkerData, 'position'>) => {
    if (formPosition) {
      setMarkers([...markers, { ...data, position: formPosition }]);
      setFormPosition(null);
    }
  };

  const handleFormCancel = () => {
    setFormPosition(null);
  };

  if (!isClient) return null;

  return (
    <div className="relative h-screen w-full">
      <MapContainer center={[36.7213, -4.4214]} zoom={13} className="w-full h-full rounded-lg shadow-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Manejador de clic en el mapa */}
        <MapClickHandler onClick={handleMapClick} />

        {/* Mostrar los marcadores existentes */}
        {markers.map((marker, idx) => (
  <Marker key={idx} position={marker.position}>
    <Popup minWidth={250} maxWidth={400}>
      <div className="popup-content">
        <h3 className="text-lg font-semibold mb-2">{marker.title}</h3>
        <p className="text-sm mb-3">{marker.description}</p>
        <small className="text-xs text-gray-400 italic">{marker.tag}</small>
        <p className="text-sm text-gray-500">{marker.category} - {marker.subcategory}</p>
        
        {/* Carrusel de imágenes */}
        {marker.imageFiles && marker.imageFiles.length > 0 ? (
          <ImageCarousel imageFiles={marker.imageFiles} />
        ) : (
          <p className="text-xs text-gray-400 italic">No hay imágenes disponibles</p>
        )}
      </div>
    </Popup>
  </Marker>
))}
      </MapContainer>

      {/* Mostrar el formulario cuando formPosition no es null */}
      {formPosition && (
        <MarkerForm
          position={formPosition}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Map;

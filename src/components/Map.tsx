import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerForm from './MarkerForm';
import MarkerPopup from './Popup';

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
  _id: string;
  coordinates: [number, number];
  title: string;
  description: string;
  tag: string;
  category: string;
  subcategory: string;
  imageFiles: string[];
  link: string;
}

const Map: React.FC<{ selectedCategory: string; selectedSubcategory: string }> = ({ selectedCategory, selectedSubcategory }) => {
  const [isClient, setIsClient] = useState(false);
  const [formPosition, setFormPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Cargar marcadores desde la base de datos al iniciar
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/marker');
        if (!response.ok) {
          throw new Error('Error al cargar los marcadores');
        }
        const data = await response.json();
        setMarkers(data); // Establecer los marcadores en el estado
      } catch (error) {
        console.error('Error al obtener los marcadores:', error);
      }
    };

    fetchMarkers();
  }, []);

  const filteredMarkers = markers.filter(marker =>
    (selectedCategory ? marker.category === selectedCategory : true) &&
    (selectedSubcategory ? marker.subcategory === selectedSubcategory : true)
  );

  const handleMapClick = (coordinates: [number, number]) => {
    setFormPosition(coordinates);
  };

  const handleFormSubmit = (data: Omit<MarkerData, 'coordinates'>) => {
    if (formPosition) {
      setMarkers([...markers, { ...data, coordinates: formPosition }]);
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
        
        <MapClickHandler onClick={handleMapClick} />
        
        {filteredMarkers.map((marker, idx) => (
          <MarkerPopup key={idx} marker={marker} />
        ))}
      </MapContainer>

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
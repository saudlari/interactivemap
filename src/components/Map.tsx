import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerForm from './MarkerForm';
import MarkerPopup from './Popup';
import LocationMarker from './LocationMarker';


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
  title: string;
  category: string;
  subcategory: string;
  coordinates: [number, number];
}

interface MapProps {
  selectedCategory: string;
  selectedSubcategory: string;
  userLocation: [number, number] | null;
}

const Map: React.FC<MapProps> = ({ 
  selectedCategory, 
  selectedSubcategory,
  userLocation 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [formPosition, setFormPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const mapRef = useRef<L.Map | null>(null);

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

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView(userLocation, 16);
    }
  }, [userLocation]);

  const filteredMarkers = markers.filter(marker => {
    const categoryArray = selectedCategory ? selectedCategory.split(',') : [];
    const subcategoryArray = selectedSubcategory ? selectedSubcategory.split(',') : [];
    
    // Si no hay filtros seleccionados, mostrar todos los marcadores
    if (categoryArray.length === 0 && subcategoryArray.length === 0) {
      return true;
    }

    // Mostrar marcadores que coincidan con CUALQUIERA de las categorías seleccionadas
    const matchesCategory = categoryArray.length === 0 || categoryArray.includes(marker.category);
    const matchesSubcategory = subcategoryArray.length === 0 || subcategoryArray.includes(marker.subcategory);

    return matchesCategory && matchesSubcategory;
  });

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

  // Obtener la referencia del mapa cuando se monta
  const handleMapMount = (map: L.Map) => {
    mapRef.current = map;
  };

  if (!isClient) return null;
  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={[36.7213, -4.4214]} 
        zoom={13} 
        className="w-full h-full rounded-lg shadow-lg"
        ref={handleMapMount}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <LocationMarker />
        <MapClickHandler onClick={handleMapClick} />
        
        {filteredMarkers.map((marker, idx) => (
          <MarkerPopup key={idx} marker={marker} />
        ))}
      </MapContainer>

      {formPosition && (
        <MarkerForm
          position={formPosition}
          onSubmit={(data: MarkerData) => handleFormSubmit(data)}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Map;
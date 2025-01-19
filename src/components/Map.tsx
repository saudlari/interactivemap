import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerForm from './MarkerForm';
import MarkerPopup from './Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { categoryColors, subcategoryIcons } from './MarkerForm';
import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';
import LocationMarker from './LocationMarker';

const createCustomIcon = (category: string, subcategory: string) => {
  const iconHtml = renderToString(
    <div className="custom-marker-icon">
      <FontAwesomeIcon
        icon={subcategoryIcons[subcategory]}
        style={{ 
          color: categoryColors[category],
          fontSize: '20px'
        }}
      />
    </div>
  );

  return divIcon({
    html: iconHtml,
    className: 'custom-div-icon',
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48]
  });
};

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

  if (!isClient) return null;
  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={[36.7213, -4.4214]} 
        zoom={13} 
        className="w-full h-full rounded-lg shadow-lg"
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
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Map;
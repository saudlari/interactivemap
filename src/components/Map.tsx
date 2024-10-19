import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerForm from './Markerform';
import VideoPreview from './VideoPreview'; // Importa el componente de vista previa de video

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapClickHandler = ({ onClick }: { onClick: (pos: [number, number]) => void }) => {
  const map = useMapEvents({
    click(e: L.LeafletMouseEvent) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
};

const Map = () => {
  const [isClient, setIsClient] = useState(false);
  const [formPosition, setFormPosition] = useState<[number, number] | null>(null);
  const [markers, setMarkers] = useState<{ 
    position: [number, number]; 
    title: string; 
    description: string; 
    tag: string; 
    category: string; 
    subcategory: string; 
    imageFiles?: File[]; 
    link?: string; 
    videoLink?: string; // Nuevo campo para el video
  }[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMapClick = (position: [number, number]) => {
    setFormPosition(position);
  };

  const handleFormSubmit = (data: { 
    title: string; 
    description: string; 
    tag: string; 
    category: string; 
    subcategory: string; 
    imageFiles: File[]; 
    link: string; 
    videoLink: string; // Recibe también el enlace de video
  }) => {
    if (formPosition) {
      setMarkers([...markers, { 
        position: formPosition, 
        title: data.title, 
        description: data.description, 
        tag: data.tag, 
        category: data.category, 
        subcategory: data.subcategory, 
        imageFiles: data.imageFiles, 
        link: data.link,
        videoLink: data.videoLink, // Guardar el video en el estado de marcadores
      }]);
      setFormPosition(null);
    }
  };

  const handleFormCancel = () => {
    setFormPosition(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={[36.7213, -4.4214]} // Coordenadas iniciales (Málaga, España)
        zoom={13}
        className="w-full h-full rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapClickHandler onClick={handleMapClick} />

        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>
              <div className="text-center">
                <strong className="text-lg font-bold">{marker.title}</strong>
                <p className="text-sm text-gray-600">{marker.description}</p>
                <small className="text-xs text-gray-400 italic">{marker.tag}</small>
                <p className="text-sm text-gray-500">{marker.category} - {marker.subcategory}</p>
                
                {/* Mostrar el enlace de la noticia si existe */}
                {marker.link && (
                  <p className="text-sm text-blue-500">
                    <a href={marker.link} target="_blank" rel="noopener noreferrer">{marker.link}</a>
                  </p>
                )}

                {/* Mostrar la vista previa del video si hay un enlace de video */}
                {marker.videoLink && (
                  <div className="video-preview mt-2">
                    <VideoPreview link={marker.videoLink} style={{ width: '100%', height: 'auto' }} />
                  </div>
                )}

                {/* Mostrar la galería de imágenes si existen */}
                {marker.imageFiles && marker.imageFiles.length > 0 && (
                  <div className="image-gallery mt-2 grid grid-cols-2 gap-2">
                    {marker.imageFiles.map((file, index) => (
                      <img 
                        key={index} 
                        src={URL.createObjectURL(file)} 
                        alt={`Uploaded ${index}`} 
                        className="w-full h-auto rounded-lg" 
                      />
                    ))}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
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

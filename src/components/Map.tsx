'use client'

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import VideoPreview from './VideoPreview';
import 'font-awesome/css/font-awesome.min.css';
import MarkerForm from './MarkerForm';
import Image from 'next/image';

// Mapear los iconos y colores para cada categoría y subcategoría
const categoryIcons = {
  Conflictos: 'fa-exclamation-triangle',
  Propuestas: 'fa-lightbulb',
  Iniciativas: 'fa-hands-helping'
};

const subcategoryColors = {
  'Medio Ambiente': 'bg-green-500',
  Feminismos: 'bg-pink-500',
  'Servicios Públicos': 'bg-blue-500',
  Vivienda: 'bg-yellow-500',
  Urbanismo: 'bg-gray-500',
  Movilidad: 'bg-purple-500',
  Cultura: 'bg-indigo-500',
  'Economia y empleo': 'bg-teal-500',
  Deporte: 'bg-red-500',
  'Memoria democrática': 'bg-orange-500'
};

const DefaultIcon = (category: keyof typeof categoryIcons, subcategory: keyof typeof subcategoryColors) => {
  const iconClass = categoryIcons[category] || 'fa-map-marker';
  const colorClass = subcategoryColors[subcategory] || 'bg-gray-300';

  return L.divIcon({
    html: `<div class="flex items-center justify-center ${colorClass} rounded-full w-10 h-10">
             <i class="fa ${iconClass} text-white"></i>
           </div>`,
    iconSize: [30, 30],
    className: ''
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
    images?: string[]; 
    link?: string;  
    videoLink?: string; // Añadimos el campo de videoLink aquí
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
    imageFiles: string[]; 
    link: string; 
    videoLink: string; // Aseguramos que el formulario tenga videoLink
  }) => {
    if (formPosition) {
      setMarkers([...markers, { 
        position: formPosition, 
        title: data.title, 
        description: data.description, 
        tag: data.tag, 
        category: data.category, 
        subcategory: data.subcategory, 
        images: data.imageFiles, 
        link: data.link,
        videoLink: data.videoLink // Guardamos el videoLink en el marcador
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
        center={[36.7213, -4.4214]}
        zoom={13}
        className="w-full h-full rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        <MapClickHandler onClick={handleMapClick} />

        {markers.map((marker, idx) => (
          <Marker 
            key={idx} 
            position={marker.position} 
            icon={DefaultIcon(
              marker.category as "Conflictos" | "Propuestas" | "Iniciativas", 
              marker.subcategory as "Medio Ambiente" | "Feminismos" | "Servicios Públicos" | "Vivienda" | "Urbanismo" | "Movilidad" | "Cultura" | "Economia y empleo" | "Deporte" | "Memoria democrática"
            )}
          >
            <Popup>
              <div className="text-center">
                <strong className="text-lg font-bold">{marker.title}</strong>
                <p className="text-sm text-gray-600">{marker.description}</p>
                <small className="text-xs text-gray-400 italic">{marker.tag}</small>
                <p className="text-sm text-gray-500">{marker.category} - {marker.subcategory}</p>
                
                {marker.images && marker.images.length > 0 && (
                  <ImageCarousel images={marker.images} />
                )}
                
                {marker.videoLink && (
                  <VideoPreview videoLink={marker.videoLink} style={{ marginTop: '1rem' }} />
                )}
                
                {marker.link && (
                  <p className="text-sm text-blue-500">
                    <a href={marker.link} target="_blank" rel="noopener noreferrer">{marker.link}</a>
                  </p>
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

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-h-40 mt-2 rounded-lg shadow-md">
      <div className="relative w-full h-40">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-r-lg"
        onClick={handlePrev}
      >
        ◀
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-l-lg"
        onClick={handleNext}
      >
        ▶
      </button>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

'use client'

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import 'font-awesome/css/font-awesome.min.css';

import MarkerForm from './Markerform';
import Image from 'next/image'; // Asegúrate de importar el componente Image

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
  }[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMapClick = (position: [number, number]) => {
    setFormPosition(position); // Muestra el formulario en la posición clicada
  };

  const handleFormSubmit = (data: { 
    title: string; 
    description: string; 
    tag: string; 
    category: string; 
    subcategory: string; 
    imageFiles: File[]; 
    link: string; 
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
        link: data.link 
      }]);
      setFormPosition(null); // Cierra el formulario
    }
  };

  const handleFormCancel = () => {
    setFormPosition(null); // Cierra el formulario sin hacer nada
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
        
        {/* Manejador de clic en el mapa */}
        <MapClickHandler onClick={handleMapClick} />

        {/* Mostrar los marcadores existentes */}
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>
              <div className="text-center">
                <strong className="text-lg font-bold">{marker.title}</strong>
                <p className="text-sm text-gray-600">{marker.description}</p>
                <small className="text-xs text-gray-400 italic">{marker.tag}</small>
                <p className="text-sm text-gray-500">{marker.category} - {marker.subcategory}</p>
                
                {/* Mostrar las imágenes en un carrusel */}
                {marker.imageFiles && marker.imageFiles.length > 0 && (
                  <ImageCarousel imageFiles={marker.imageFiles} />
                )}
                
                {/* Mostrar enlace si existe */}
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

interface ImageCarouselProps {
  imageFiles: File[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageFiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageFiles.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageFiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-h-40 mt-2 rounded-lg shadow-md">
      <Image
        src={URL.createObjectURL(imageFiles[currentIndex])}
        alt={`Image ${currentIndex}`}
        layout="fill" // Asegúrate de que la imagen cubra el contenedor
        objectFit="cover" // Asegura que la imagen no se distorsione
        className="rounded-lg"
      />
      
      {/* Botón anterior */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-r-lg"
        onClick={handlePrev}
      >
        ◀
      </button>

      {/* Botón siguiente */}
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-l-lg"
        onClick={handleNext}
      >
        ▶
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
        {imageFiles.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

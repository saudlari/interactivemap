import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faSearch } from '@fortawesome/free-solid-svg-icons';
import LocationAutocomplete from './LocationAutocomplete';

interface NavbarProps {
  toggleVerticalNav: () => void;
  setUserLocation: (coords: [number, number]) => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleVerticalNav, setUserLocation }) => {
  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert('La geolocalización no está soportada en tu navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(coords);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No se pudo obtener tu ubicación. Por favor, verifica que has dado los permisos necesarios.');
      }
    );
  };

  const handleLocationSelect = (location: { lat: number; lon: number }) => {
    setUserLocation([location.lat, location.lon]);
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-16 px-4 flex items-center bg-transparent z-50 space-x-4 justify-end">
      <div className="flex items-center space-x-4">
        {/* Buscador de ubicaciones */}
        <div className="flex items-center bg-white rounded-lg shadow-lg">
          <LocationAutocomplete onSelect={handleLocationSelect} />
          <button
            className="px-4 py-2 bg-[#004f59] text-white rounded-r-lg hover:bg-[#006d7a] transition-colors duration-300"
            onClick={() => {}} // Se activará automáticamente al seleccionar una ubicación
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Botón de Mi ubicación */}
        <button
          className="marker-form-button bg-[#004f59] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#006d7a] transition-colors duration-300 shadow-lg"
          onClick={handleLocationClick}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs} className="mr-2" />
          Mi ubicación
        </button>
        
        {/* Botón de búsqueda/filtros */}
        <button
          className="marker-form-button bg-[#f05454] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#f36161] transition-colors duration-300 shadow-lg flex items-center"
          onClick={toggleVerticalNav}
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          <span>Filtros</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
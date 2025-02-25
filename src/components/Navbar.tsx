import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs, faSearch, faQuestionCircle, faSliders } from '@fortawesome/free-solid-svg-icons';
import LocationAutocomplete from './LocationAutocomplete';
import logoImage from '@/public/images/otraMalaga.png';
import Image from 'next/image';


interface NavbarProps {
  toggleVerticalNav: () => void;
  setUserLocation: (location: [number, number] | null) => void;
  onOpenTutorial: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleVerticalNav, setUserLocation, onOpenTutorial }) => {
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
    <div className="fixed top-0 left-0 right-0 h-[60px] px-4 bg-white/95 backdrop-blur-sm shadow-lg z-50 flex items-center justify-between">
      {/* Logo en el lado izquierdo */}
      <div className="flex items-center">
        <Image
          alt="Otra Málaga"
          src={logoImage}
          width={200}
          height={120}
          className="mr-4"
        />
      </div>

      {/* Contenedor de botones en el lado derecho */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Botón de filtros */}
        <button
          className="marker-form-button bg-[#f05454] text-white font-bold rounded-lg px-2 md:px-4 py-2 hover:bg-[#f36161] transition-colors duration-300 shadow-lg flex items-center justify-center text-sm md:text-base"
          onClick={toggleVerticalNav}
        >
          <FontAwesomeIcon icon={faSliders} className="mr-0 md:mr-2" />
          <span className="hidden md:inline">Filtros</span>
        </button>

        {/* Buscador de ubicaciones */}
        <div className="flex items-center bg-white rounded-lg shadow-lg w-full md:w-auto">
          <LocationAutocomplete onSelect={handleLocationSelect} />
          <button
            className="px-2 md:px-4 py-2 bg-[#004f59] text-white rounded-r-lg hover:bg-[#006d7a] transition-colors duration-300"
            onClick={() => {}}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        
        {/* Botón de Mi ubicación */}
        <button
          className="flex-none marker-form-button bg-[#004f59] text-white font-bold rounded-lg px-2 md:px-4 py-2 hover:bg-[#006d7a] transition-colors duration-300 shadow-lg text-sm md:text-base"
          onClick={handleLocationClick}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs} className="mr-2" />
          <span className="hidden md:inline">Mi ubicación</span>
        </button>

        {/* Botón de Tour */}
        <button
          onClick={onOpenTutorial}
          className="flex-none bg-[#f05454] text-white font-bold rounded-lg px-2 md:px-4 py-2 hover:bg-[#f36161] transition-colors duration-300 shadow-lg text-sm md:text-base"
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          <span className="hidden md:inline">Tour</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
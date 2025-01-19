import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

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
        console.log('Ubicación obtenida:', coords);
        setUserLocation(coords);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No se pudo obtener tu ubicación. Por favor, verifica que has dado los permisos necesarios.');
      }
    );
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-16 px-4 flex items-center bg-transparent z-50 space-x-4 justify-end">
      <button
        className="marker-form-button bg-[#004f59] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#006d7a] transition-colors duration-300 shadow-lg mt-2"
        onClick={handleLocationClick}
      >
        <FontAwesomeIcon icon={faLocationCrosshairs} className="mr-2" />
        Mi ubicación
      </button>
      
      <button
        className="marker-form-button bg-[#f05454] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#f36161] transition-colors duration-300 shadow-lg mt-2 flex items-center"
        onClick={toggleVerticalNav}
      >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 2a9 9 0 100 18 9 9 0 000-18zm0 16a7 7 0 100-14 7 7 0 000 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.293 16.293l4.707 4.707" />
        </svg>
        <span>Buscar</span>
      </button>
    </div>
  );
};

export default Navbar;
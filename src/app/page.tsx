'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import VerticalNav from '../components/VerticalNav';
import Navbar from '../components/Navbar';

// Cargar el componente Map dinámicamente solo en el cliente
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [showVerticalNav, setShowVerticalNav] = useState(false);

  const toggleVerticalNav = () => {
    setShowVerticalNav(!showVerticalNav);  // Cambiar el estado de mostrar/ocultar VerticalNav
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Navbar fijo */}
      <Navbar toggleVerticalNav={toggleVerticalNav} />

      <div className="flex-1 relative pt-16"> {/* Asegura que el mapa no cubra el Navbar */}
        
        {/* VerticalNav sobre el mapa */}
        {showVerticalNav && (
          <div className="absolute top-0 left-0 z-40 w-64 h-full bg-gray-100 shadow-lg">
            <VerticalNav />
          </div>
        )}

        {/* Contenedor del mapa */}
        <div className="relative z-30">
          <Map />
        </div>
      </div>
    </div>
  );
}

'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import VerticalNav from '../components/VerticalNav';
import Navbar from '../components/Navbar';

// Cargar el componente Map dinámicamente solo en el cliente
const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const [filters, setFilters] = useState({ category: '', subcategory: '' });
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const toggleVerticalNav = () => {
    setShowVerticalNav(!showVerticalNav);
  };

  const handleFilterChange = (category: string, subcategory: string) => {
    setFilters({ category, subcategory });
  };

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar 
        toggleVerticalNav={toggleVerticalNav} 
        setUserLocation={setUserLocation} 
      />

      <div className="flex-1 relative pt-[60px]">
        {showVerticalNav && (
          <div className="fixed top-[60px] left-0 z-40 w-full md:w-64 h-[calc(100vh-60px)] bg-gray-100 shadow-lg overflow-y-auto">
            <VerticalNav 
              onFilterChange={handleFilterChange}
              toggleVerticalNav={toggleVerticalNav}
            />
          </div>
        )}

        <div className="relative z-30">
          <Map 
            selectedCategory={filters.category} 
            selectedSubcategory={filters.subcategory}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}
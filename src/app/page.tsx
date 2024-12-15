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

  const toggleVerticalNav = () => {
    setShowVerticalNav(!showVerticalNav);
  };

  const handleFilterChange = (category: string, subcategory: string) => {
    setFilters({ category, subcategory });
  };

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar toggleVerticalNav={toggleVerticalNav} />

      <div className="flex-1 relative">
        {showVerticalNav && (
          <div className="absolute top-0 left-0 z-40 w-64 h-full bg-gray-100 shadow-lg">
            <VerticalNav onFilterChange={handleFilterChange} />
          </div>
        )}

        <div className="relative z-30">
          <Map selectedCategory={filters.category} selectedSubcategory={filters.subcategory} />
        </div>
      </div>
    </div>
  );
}
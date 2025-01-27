import React, { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar el componente Image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface VerticalNavProps {
  onFilterChange: (category: string, subcategory: string) => void;  // Callback para manejar el filtro
  toggleVerticalNav: () => void;
}

const VerticalNav: React.FC<VerticalNavProps> = ({ onFilterChange, toggleVerticalNav }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
      
    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories.join(','), selectedSubcategories.join(','));
  };

  const handleSubcategoryClick = (subcategory: string) => {
    const updatedSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter(s => s !== subcategory)
      : [...selectedSubcategories, subcategory];
      
    setSelectedSubcategories(updatedSubcategories);
    onFilterChange(selectedCategories.join(','), updatedSubcategories.join(','));
  };

  return (
    <div className="vertical-nav flex flex-col h-full bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="flex justify-between items-center p-4">
        <span className="logo text-[#004f59] text-2xl font-bold">Logo</span>
        <button 
          onClick={toggleVerticalNav} 
          className="md:hidden text-[#004f59] p-2"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Categorías</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleCategoryClick('Conflictos')}
                className={`w-full text-left p-2 rounded transition duration-300 ease-in-out ${
                  selectedCategories.includes('Conflictos') ? 'bg-[#004f59] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Conflictos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('Propuestas')}
                className={`w-full text-left p-2 rounded transition duration-300 ease-in-out ${
                  selectedCategories.includes('Propuestas') ? 'bg-[#004f59] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Propuestas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick('Iniciativas')}
                className={`w-full text-left p-2 rounded transition duration-300 ease-in-out ${
                  selectedCategories.includes('Iniciativas') ? 'bg-[#004f59] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Iniciativas
              </button>
            </li>
          </ul>
        </div>

        {/* Subcategorías */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Subcategorías</h2>
          <ul className="space-y-2">
            {[
              'Medio Ambiente',
              'Feminismos',
              'Servicios Públicos',
              'Vivienda',
              'Urbanismo',
              'Movilidad',
              'Cultura',
              'Economia y empleo',
              'Deporte',
              'Memoria democrática'
            ].map((subcategory) => (
              <li key={subcategory}>
                <button
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className={`w-full text-left p-2 rounded transition duration-300 ease-in-out ${
                    selectedSubcategories.includes(subcategory) ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {subcategory}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer con botón fijo en la parte inferior */}
      <div className="sticky bottom-0 p-4 border-t border-gray-200 bg-white mt-auto">
        <button
          onClick={toggleVerticalNav}
          className="w-full bg-[#004f59] text-white font-bold rounded-lg px-4 py-3 hover:bg-[#006d7a] transition-colors duration-300 shadow-lg"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default VerticalNav;
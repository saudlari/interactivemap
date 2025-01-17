import React, { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar el componente Image

interface VerticalNavProps {
  onFilterChange: (category: string, subcategory: string) => void;  // Callback para manejar el filtro
}

const VerticalNav: React.FC<VerticalNavProps> = ({ onFilterChange }) => {
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
    <div className="vertical-nav flex flex-col h-full bg-gradient-to-b from-gray-100 to-gray-300"> {/* Degradado gris suave */}
      <div className="vertical-nav-header">
        <span className="logo text-[#004f59] text-2xl font-bold">Logo</span> {/* Color de texto verde azulado oscuro */}

        <ul className="mt-6 space-y-1">
          {/* Categorías */}
          <li className="text-lg font-bold ml-4 text-[#004f59]">Categorías</li>
          <li>
            <button
              onClick={() => handleCategoryClick('Conflictos')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedCategories.includes('Conflictos') ? 'bg-[#004f59] text-white' : 'text-gray-700 hover:bg-[#1e5f74] hover:text-white'
              }`}
            >
              Conflictos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('Propuestas')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedCategories.includes('Propuestas') ? 'bg-[#004f59] text-white' : 'text-gray-700 hover:bg-[#1e5f74] hover:text-white'
              }`}
            >
              Propuestas
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('Iniciativas')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedCategories.includes('Iniciativas') ? 'bg-[#004f59] text-white' : 'text-gray-700 hover:bg-[#1e5f74] hover:text-white'
              }`}
            >
              Iniciativas
            </button>
          </li>

          {/* Subcategorías */}
          <li className="text-lg font-bold ml-4 text-[#004f59]">Subcategorías</li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Medio Ambiente')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Medio Ambiente') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Medio Ambiente
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Feminismos')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Feminismos') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Feminismos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Servicios Públicos')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Servicios Públicos') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Servicios Públicos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Vivienda')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Vivienda') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Vivienda
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Urbanismo')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Urbanismo') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Urbanismo
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Movilidad')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Movilidad') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Movilidad
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Cultura')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Cultura') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Cultura
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Economia y empleo')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Economia y empleo') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Economía y empleo
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Deporte')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Deporte') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Deporte
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Memoria democrática')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out ${
                selectedSubcategories.includes('Memoria democrática') ? 'bg-[#f05454] text-white' : 'text-gray-700 hover:bg-[#f05454] hover:text-white'
              }`}
            >
              Memoria democrática
            </button>
          </li>
        </ul>
      </div>

      {/* Sección de usuario al final */}
      <div className="border-t border-gray-300 mt-auto"> {/* Borde gris claro */}
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          <Image
            alt="User"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            width={40} // Ajusta el tamaño según sea necesario
            height={40} // Ajusta el tamaño según sea necesario
            className="rounded-full object-cover"
          />
          <div>
            <p className="text-xs text-gray-500"> {/* Color de texto suave */}
              <strong className="block font-medium text-gray-800">Eric Frusciante</strong>
              <span>eric@frusciante.com</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default VerticalNav;
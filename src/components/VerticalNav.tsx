import React, { useState } from 'react';

interface VerticalNavProps {
  onFilterChange: (category: string, subcategory: string) => void;  // Callback para manejar el filtro
}

const VerticalNav: React.FC<VerticalNavProps> = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Resetear subcategoría al cambiar categoría
    onFilterChange(category, ""); // Llamar a la función para cambiar el filtro
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    onFilterChange(selectedCategory, subcategory); // Llamar a la función para cambiar el filtro
  };

  return (
    <div className="vertical-nav flex flex-col h-full"> {/* Usar flex y flex-col */}
      <div className="vertical-nav-header">
        <span className="logo">Logo</span>

        <ul className="mt-6 space-y-1">
          <li className="text-lg font-bold ml-4">Categorías</li>
          <li>
            <button
              onClick={() => handleCategoryClick('Conflictos')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedCategory === 'Conflictos' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Conflictos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('Propuestas')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedCategory === 'Propuestas' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Propuestas
            </button>
          </li>
          <li>
            <button
              onClick={() => handleCategoryClick('Iniciativas')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedCategory === 'Iniciativas' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Iniciativas
            </button>
          </li>

          <li className="text-lg font-bold ml-4">Subcategorías</li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Medio Ambiente')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Medio Ambiente' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Medio Ambiente
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Feminismos')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Feminismos' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Feminismos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Servicios Públicos')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Servicios Públicos' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Servicios Públicos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Vivienda')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Vivienda' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Vivienda
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Urbanismo')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Urbanismo' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Urbanismo
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Movilidad')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Movilidad' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Movilidad
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Cultura')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Cultura' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Cultura
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Economia y empleo')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Economia y empleo' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Economía y empleo
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Deporte')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Deporte' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Deporte
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSubcategoryClick('Memoria democrática')}
              className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                selectedSubcategory === 'Memoria democrática' ? 'bg-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              Memoria democrática
            </button>
          </li>
        </ul>
      </div>

      {/* Sección de usuario al final */}
      <div className="border-t border-gray-100 mt-auto"> {/* Usar mt-auto para empujar hacia abajo */}
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <img
            alt="User"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">Eric Frusciante</strong>
              <span>eric@frusciante.com</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default VerticalNav;
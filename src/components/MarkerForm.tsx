import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import Notification from './Notification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface MarkerFormProps {
  position: [number, number] | null;
  onSubmit: (data: MarkerFormData) => void;
  onCancel: () => void;
}

// Definir una interfaz para el estado formData
interface MarkerFormData {
  title: string;
  description: string;
  tag: string;
  imageFiles: string[]; // Asegura que TypeScript reconozca `imageFiles` como un array de strings
  link: string;
  category: string;
  subcategory: string;
  coordinates: [number, number] | null;
}

import {
  faLeaf,          // Medio Ambiente
  faVenusMars,     // Feminismos
  faBuilding,      // Servicios Públicos
  faHome,          // Vivienda
  faCity,          // Urbanismo
  faBus,           // Movilidad
  faPalette,       // Cultura
  faBriefcase,     // Economía y empleo
  faFutbol,        // Deporte
  faMonument       // Memoria democrática
} from '@fortawesome/free-solid-svg-icons';

// Exportar las constantes para poder usarlas en otros componentes
export const categoryColors = {
  'Conflictos': '#f05454',    // Rojo
  'Propuestas': '#004f59',    // Verde azulado
  'Iniciativas': '#ffd700'    // Dorado
};

export const subcategoryIcons = {
  'Medio Ambiente': faLeaf,
  'Feminismos': faVenusMars,
  'Servicios Públicos': faBuilding,
  'Vivienda': faHome,
  'Urbanismo': faCity,
  'Movilidad': faBus,
  'Cultura': faPalette,
  'Economía y empleo': faBriefcase,
  'Deporte': faFutbol,
  'Memoria democrática': faMonument
};

const MarkerForm: React.FC<MarkerFormProps> = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<MarkerFormData>({
    title: '',
    description: '',
    tag: '',
    imageFiles: [],
    link: '',
    category: 'Conflictos',
    subcategory: 'Medio Ambiente',
    coordinates: position,
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, coordinates: position }));
  }, [position]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (base64Images: string[]) => {
    setFormData((prevData) => ({ ...prevData, imageFiles: base64Images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/marker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al guardar el marcador:', errorData);
        alert(`Error: ${errorData.error || 'Error desconocido'}`);
        return;
      }

      const data = await response.json();
      setShowNotification(true);
      
      // Esperar un momento antes de cerrar el formulario
      setTimeout(() => {
        onSubmit(data);
        // Resetear el formulario
        setFormData({
          title: '',
          description: '',
          tag: '',
          imageFiles: [],
          link: '',
          category: 'Conflictos',
          subcategory: 'Medio Ambiente',
          coordinates: position,
        });
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el marcador. Por favor, intenta de nuevo.');
    }
  };
    
  return (
    <div className="marker-form-container">
      <h3 className="marker-form-title">Agregar Marcador</h3>
      
      {/* Añadir el icono debajo del título */}
      {formData.subcategory && formData.category && (
        <div className="flex justify-center items-center mt-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
            <FontAwesomeIcon
              icon={subcategoryIcons[formData.subcategory as keyof typeof subcategoryIcons]}
              className="text-2xl"
              style={{ 
                color: categoryColors[formData.category as keyof typeof categoryColors]
              }}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="marker-form space-y-4">
        {/* Campo para la categoría */}
        <div className="marker-form-group">
          <label htmlFor="category" className="marker-form-label text-[#004f59]">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          >
            <option value="Conflictos">Conflictos</option>
            <option value="Propuestas">Propuestas</option>
            <option value="Iniciativas">Iniciativas</option>
          </select>
        </div>

        {/* Campo para la subcategoría */}
        <div className="marker-form-group">
          <label htmlFor="subcategory" className="marker-form-label text-[#004f59]">Subcategoría:</label>
          <select
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          >
            <option value="Medio Ambiente">Medio Ambiente</option>
            <option value="Feminismos">Feminismos</option>
            <option value="Servicios Públicos">Servicios Públicos</option>
            <option value="Vivienda">Vivienda</option>
            <option value="Urbanismo">Urbanismo</option>
            <option value="Movilidad">Movilidad</option>
            <option value="Cultura">Cultura</option>
            <option value="Economía y empleo">Economía y empleo</option>
            <option value="Deporte">Deporte</option>
            <option value="Memoria democrática">Memoria democrática</option>
          </select>
        </div>

        {/* Campo para el título */}
        <div className="marker-form-group">
          <label htmlFor="title" className="marker-form-label text-[#004f59]">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          />
        </div>

        {/* Campo para la descripción */}
        <div className="marker-form-group">
          <label htmlFor="description" className="marker-form-label text-[#004f59]">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          />
        </div>

        {/* Campo para el tag */}
        <div className="marker-form-group">
          <label htmlFor="tag" className="marker-form-label text-[#004f59]">Tag:</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            required
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          />
        </div>

        {/* Cargador de imágenes */}
        <ImageUploader onChange={handleImageChange} />

        {/* Campo para el enlace */}
        <div className="marker-form-group">
          <label htmlFor="link" className="marker-form-label text-[#004f59]">Enlace:</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          />
        </div>

        {/* Botones de acción */}
        <div className="marker-form-actions flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="marker-form-button bg-[#004f59] text-white rounded-lg px-4 py-2 hover:bg-[#1e5f74] transition-colors duration-300 shadow-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="marker-form-button bg-[#f05454] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#f36161] transition-colors duration-300 shadow-lg"
          >
            Crear marcador
          </button>
        </div>
      </form>

      {showNotification && (
        <Notification
          message="¡Marcador creado con éxito!"
          type="success"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default MarkerForm;

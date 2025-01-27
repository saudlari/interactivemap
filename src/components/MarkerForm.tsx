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
  title: string;       // máx 50 caracteres
  description: string; // máx 200 caracteres
  tag: string;        // máx 30 caracteres
  imageFiles: string[];
  link: string;       // máx 150 caracteres
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
    <div className="marker-form-overlay">
      <div className="marker-form-container">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Agregar marcador
          </h2>
          <div className="coordinates-display inline-block">
            📍 Lat: {position?.[0].toFixed(6)}, Lng: {position?.[1].toFixed(6)}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
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

          {/* Campo para la categoría */}
          <div className="marker-form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría:
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded-lg focus:ring-[#004f59] focus:border-[#004f59]"
            >
              <option value="Conflictos">Conflictos</option>
              <option value="Propuestas">Propuestas</option>
              <option value="Iniciativas">Iniciativas</option>
            </select>
          </div>

          {/* Campo para la subcategoría */}
          <div className="marker-form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategoría:
            </label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border rounded-lg focus:ring-[#004f59] focus:border-[#004f59]"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={50}
              required
              className="w-full p-2 text-sm border rounded-lg focus:ring-[#004f59] focus:border-[#004f59]"
            />
          </div>

          {/* Campo para la descripción */}
          <div className="marker-form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={200}
              required
              rows={4}
              className="w-full p-2 text-sm border rounded-lg focus:ring-[#004f59] focus:border-[#004f59]"
            />
            <small className="text-gray-500 text-xs">{formData.description.length}/200</small>
          </div>

          {/* Campo para el tag */}
          <div className="marker-form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag:
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              maxLength={30}
              required
              className="w-full p-2 text-sm border rounded-lg focus:ring-[#004f59] focus:border-[#004f59]"
            />
          </div>

          {/* Cargador de imágenes */}
          <ImageUploader onChange={handleImageChange} />

          {/* Campo para el enlace */}
          <div className="marker-form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enlace:
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              maxLength={150}
              className="w-full p-2 text-sm border rounded-lg focus:ring-[#004f59] focus:border-[#004f59]"
            />
          </div>

          {/* Botones de acción */}
          <div className="form-buttons">
            <button
              type="button"
              onClick={onCancel}
              className="form-cancel-button"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="form-submit-button"
            >
              Crear marcador
            </button>
          </div>
        </form>
      </div>

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

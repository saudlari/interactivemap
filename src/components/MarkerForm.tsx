import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faFemale, faFaucet, faHome, faBuilding, faCar, faPalette, faBriefcase, faFutbol, faScroll, faMapPin, faHand } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import VideoPreview from './VideoPreview';
import { faHandFist } from '@fortawesome/free-solid-svg-icons/faHandFist';

interface MarkerFormProps {
  position: [number, number] | null;
  onSubmit: (data: { 
    title: string; 
    description: string; 
    tag: string; 
    imageFiles: string[]; 
    category: string; 
    subcategory: string; 
    link: string; 
    videoLink: string; 
  }) => void;
  onCancel: () => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    imageFiles: [] as string[], // Keep as base64 strings
    videoLink: '',
    link: '',
    category: 'Conflictos',
    subcategory: 'Medio Ambiente',
    coordinates: position,
  });

  React.useEffect(() => {
    setFormData((prevData) => ({ ...prevData, coordinates: position }));
  }, [position]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const base64Images = await Promise.all(files.map(convertFileToBase64));

      setFormData({ ...formData, imageFiles: base64Images });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      tag: '',
      imageFiles: [],
      videoLink: '',
      link: '',
      category: 'Conflictos',
      subcategory: 'Medio Ambiente',
      coordinates: position,
    });
  };

  // Función para obtener el icono de subcategoría
  const getIconBySubcategory = (subcategory: string) => {
    const icons: { [key: string]: any } = {
      'Medio Ambiente': faLeaf,
      'Feminismos': faHandFist,
      'Servicios Públicos': faFaucet,
      'Vivienda': faHome,
      'Urbanismo': faBuilding,
      'Movilidad': faCar,
      'Cultura': faPalette,
      'Economía y empleo': faBriefcase,
      'Deporte': faFutbol,
      'Memoria democrática': faScroll
    };
    return icons[subcategory] || faMapPin;
  };

  // Función para obtener el color de categoría
  const getIconColorByCategory = (category: string) => ({
    'Conflictos': 'text-red-500',
    'Propuestas': 'text-green-500',
    'Iniciativas': 'text-blue-500'
  }[category] || 'text-gray-500');

  if (!position) return null;

  return (
    <div className="marker-form-container bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="marker-form-title text-2xl font-bold mb-4 text-[#004f59]">Agregar Marcador</h3>
      <form onSubmit={handleSubmit} className="marker-form space-y-4">
        
        {/* Categoría */}
        <div className="marker-form-group">
          <div className="flex flex-col items-center mb-2">
            <FontAwesomeIcon 
              icon={getIconBySubcategory(formData.subcategory)} 
              className={`${getIconColorByCategory(formData.category)} text-4xl mb-2`} 
            />
          </div>
          <label htmlFor="category" className="marker-form-label text-[#004f59]">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59] w-full"
          >
            <option value="Conflictos">Conflictos</option>
            <option value="Propuestas">Propuestas</option>
            <option value="Iniciativas">Iniciativas</option>
          </select>
        </div>

        {/* Subcategoría */}
        <div className="marker-form-group">
          <label htmlFor="subcategory" className="marker-form-label text-[#004f59]">Subcategoría:</label>
          <select
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59] w-full"
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

        {/* Título */}
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

        {/* Descripción */}
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

        {/* Tag */}
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

        {/* Subir imágenes */}
        <div className="marker-form-group">
          <label htmlFor="imageFile" className="marker-form-label text-[#004f59]">Subir Imágenes:</label>
          <div className="relative">
            <input
              type="file"
              id="file"
              multiple // Allow multiple files
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="marker-form-button bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg px-4 py-2 w-full"
              onClick={() => document.getElementById('imageFile')?.click()}
            >
              {formData.imageFiles.length > 0 ? `${formData.imageFiles.length} imágenes seleccionadas` : 'Seleccionar imágenes'}
            </button>
          </div>
        </div>

        {/* Mostrar imágenes seleccionadas */}
        <div className="flex flex-wrap">
          {formData.imageFiles.map((base64Image, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <Image
                src={base64Image}
                alt={`Selected Image ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Enlace del video */}
        <div className="marker-form-group">
          <label htmlFor="videoLink" className="marker-form-label text-[#004f59]">Enlace de Video (YouTube/Vimeo):</label>
          <input
            type="url"
            id="videoLink"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          />
          {formData.videoLink && (
            <VideoPreview videoLink={formData.videoLink} />
          )}
        </div>

        {/* Enlace */}
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

        {/* Acciones */}
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
    </div>
  );
};

export default MarkerForm;

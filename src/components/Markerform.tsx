import React, { useState, useEffect } from 'react';
import VideoPreview from './VideoPreview'; // Importa el componente de vista previa de video

interface MarkerFormProps {
  position: [number, number] | null;
  onSubmit: (data: { 
    title: string; 
    description: string; 
    tag: string; 
    imageFiles: File[]; 
    category: string; 
    subcategory: string; 
    link: string; 
    videoLink: string; // Campo adicional para video
  }) => void;
  onCancel: () => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    imageFiles: [] as File[],
    link: '', // Enlace para noticias o sitios web externos
    videoLink: '', // Enlace para videos de YouTube o Vimeo
    category: 'Conflictos',
    subcategory: 'Medio Ambiente', // Subcategoría por defecto
    coordinates: position,
  });

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, coordinates: position }));
  }, [position]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, imageFiles: Array.from(e.target.files) });
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
      link: '',
      videoLink: '', // Limpiar el campo de video
      category: 'Conflictos',
      subcategory: 'Medio Ambiente', // Restablecer al valor predeterminado
      coordinates: position,
    });
  };

  if (!position) return null;

  return (
    <div className="marker-form-container bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="marker-form-title text-2xl font-bold mb-4 text-[#004f59]">Agregar Marcador</h3>
      <form onSubmit={handleSubmit} className="marker-form space-y-4">
        
        {/* Categoría */}
        <div className="marker-form-group">
          <label htmlFor="category" className="marker-form-label text-[#004f59]">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
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
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
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
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
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
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
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
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Subir imágenes */}
        <div className="marker-form-group">
          <label htmlFor="file" className="marker-form-label text-[#004f59]">Subir Imágenes o Archivos:</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={handleFileChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Enlace de noticias */}
        <div className="marker-form-group">
          <label htmlFor="link" className="marker-form-label text-[#004f59]">Enlace (noticia o sitio web):</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Enlace del video */}
        <div className="marker-form-group">
          <label htmlFor="videoLink" className="marker-form-label text-[#004f59]">Enlace del video (YouTube/Vimeo):</label>
          <input
            type="url"
            id="videoLink"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleInputChange}
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Renderizar la vista previa del video si hay un enlace válido */}
        {formData.videoLink && (
          <div className="video-preview">
            <VideoPreview link={formData.videoLink} />
          </div>
        )}

        <div className="marker-form-actions flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="marker-form-button bg-[#004f59] text-white rounded-lg px-4 py-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="marker-form-button bg-[#f05454] text-white rounded-lg px-4 py-2"
          >
            Crear marcador
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkerForm;

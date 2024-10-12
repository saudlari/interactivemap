import React, { useState, useEffect } from 'react';

interface MarkerFormProps {
  position: [number, number] | null;
  onSubmit: (data: { title: string; description: string; tag: string; imageFile: File | null; category: string; subcategory: string; link: string; }) => void; // Asegúrate de que 'link' esté aquí
  onCancel: () => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    imageFile: null as File | null,
    link: '', // Add link to formData
    category: 'Conflictos',
    subcategory: 'Medio Ambiente',
    coordinates: position, // Add coordinates to formData
  });

  // Update coordinates whenever position changes
  React.useEffect(() => {
    setFormData((prevData) => ({ ...prevData, coordinates: position }));
  }, [position]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Envia los datos incluyendo las coordenadas
    setFormData({ 
      title: '', 
      description: '', 
      tag: '', 
      imageFile: null, 
      link: '', // Reset link
      category: 'Conflictos', 
      subcategory: 'Medio Ambiente',
      coordinates: position, // Reset coordinates
    });
  };

  if (!position) return null;

  return (
    <div className="marker-form-container">
      <h3 className="marker-form-title">Agregar Marcador</h3>
      <form onSubmit={handleSubmit} className="marker-form">
      <div className="marker-form-group">
          <label htmlFor="category" className="marker-form-label">Categoría:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="marker-form-input"
          >
            <option value="Conflictos">Conflictos</option>
            <option value="Propuestas">Propuestas</option>
            <option value="Iniciativas">Iniciativas</option>
          </select>
        </div>
        <div className="marker-form-group">
          <label htmlFor="subcategory" className="marker-form-label">Subcategoría:</label>
          <select
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            className="marker-form-input"
          >
            <option value="Medio Ambiente">Medio Ambiente</option>
            <option value="Feminismos">Feminismos</option>
            <option value="Servicios Publicos">Servicios Públicos</option>
            <option value="Vivienda">Vivienda</option>
            <option value="Urbanismo">Urbanismo</option>
            <option value="Movilidad">Movilidad</option>
            <option value="Cultura">Cultura</option>
            <option value="Economia y empleo">Economía y empleo</option>
            <option value="Deporte">Deporte</option>
            <option value="Memoria democrática">Memoria democrática</option>
          </select>
        </div>
        <div className="marker-form-group">
          <label htmlFor="title" className="marker-form-label">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="marker-form-input"
          />
        </div>
        <div className="marker-form-group">
          <label htmlFor="description" className="marker-form-label">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="marker-form-input"
          />
        </div>
        <div className="marker-form-group">
          <label htmlFor="tag" className="marker-form-label">Tag:</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            required
            className="marker-form-input"
          />
        </div>
        <div className="marker-form-group">
          <label htmlFor="file" className="marker-form-label">Subir Imagen o Archivo:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="marker-form-input"
          />
        </div>
        <div className="marker-form-group">
          <label htmlFor="link" className="marker-form-label">Enlace:</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="marker-form-input"
          />
        </div>
        <div className="marker-form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="marker-form-button marker-form-button-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="marker-form-button marker-form-button-submit"
          >
            Crear marcador
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkerForm;

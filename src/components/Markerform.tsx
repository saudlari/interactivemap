import React, { useState } from 'react';
import Image from 'next/image'; // Asegúrate de importar el componente Image

interface MarkerFormProps {
  position: [number, number] | null;
  onSubmit: (data: { title: string; description: string; tag: string; imageFiles: File[]; category: string; subcategory: string; link: string; }) => void;
  onCancel: () => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: '',
    imageFiles: [] as File[], // Cambiado para manejar múltiples archivos
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
      imageFiles: [], // Limpiar el array de archivos
      link: '',
      category: 'Conflictos',
      subcategory: 'Medio Ambiente',
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
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
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
            className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 focus:border-[#004f59] focus:ring-1 focus:ring-[#004f59]"
          >
            <option value="Medio Ambiente">Medio Ambiente</option>
            <option value="Feminismos">Feminismos</option>
            <option value="Servicios Públicos">Servicios Públicos</option>
            <option value="Vivienda">Vivienda</option>
            <option value="Urbanismo">Urbanismo</option>
            <option value="Movilidad">Movilidad</option>
            <option value="Cultura">Cultura</option>
            <option value="Economia y empleo">Economía y empleo</option>
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
          <label htmlFor="file" className="marker-form-label text-[#004f59]">Subir Imágenes o Archivos:</label>
          <div className="relative">
            <input
              type="file"
              id="file"
              multiple // Permitir múltiples archivos
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <button
              type="button"
              className="marker-form-button bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg px-4 py-2 w-full"
              onClick={() => document.getElementById('file')?.click()}
            >
              {formData.imageFiles.length > 0 ? `${formData.imageFiles.length} archivos seleccionados` : 'Seleccionar archivos'}
            </button>
          </div>
        </div>

        {/* Mostrar imágenes seleccionadas */}
        <div className="flex flex-wrap">
          {formData.imageFiles.map((file, index) => (
            <div key={index} className="relative w-24 h-24 m-2">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Selected Image ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
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

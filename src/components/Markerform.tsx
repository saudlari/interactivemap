import React, { useState } from 'react';

interface MarkerFormProps {
  position: [number, number] | null;
  onSubmit: (data: { title: string; description: string; tag: string }) => void;
  onCancel: () => void;
}

const MarkerForm: React.FC<MarkerFormProps> = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ title: '', description: '', tag: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);  // Enviar los datos al componente de mapa
    setFormData({ title: '', description: '', tag: '' }); // Reiniciar el formulario
  };

  if (!position) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 100,
      left: 100,
      zIndex: 1000,
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    }}>
      <h3>Agregar Marcador</h3>
      <p>Coordenadas: {position[0]}, {position[1]}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <div>
          <label>Tag:</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>
          Crear marcador
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '0.5rem 1rem', backgroundColor: '#ccc', marginLeft: '1rem', borderRadius: '4px' }}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default MarkerForm;

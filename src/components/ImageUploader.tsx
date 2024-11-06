// components/ImageUploader.tsx

import React, { useState } from 'react';

interface ImageUploaderProps {
  onChange: (base64Images: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [imageFiles, setImageFiles] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const base64Promises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(base64Promises)
        .then(base64Images => {
          setImageFiles(base64Images); // Actualizamos el estado con las imágenes en base64
          onChange(base64Images); // Enviamos las imágenes en base64 a `MarkerForm`
        })
        .catch(error => {
          console.error("Error converting files to base64:", error);
        });
    }
  };

  return (
    <div className="marker-form-group">
      <label htmlFor="file" className="marker-form-label text-[#004f59]">Subir Imágenes o Archivos:</label>
      <input
        type="file"
        id="file"
        multiple
        onChange={handleFileChange}
        className="marker-form-input bg-[#f0f4f8] text-[#004f59] border border-gray-300 rounded-lg p-2 cursor-pointer"
      />
      {/* Vista previa de las imágenes en base64 */}
      <div className="flex flex-wrap mt-4">
        {imageFiles.map((file, index) => (
          <div key={index} className="relative w-24 h-24 m-2">
            <img src={file} alt={`Selected Image ${index}`} className="rounded-lg object-cover w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

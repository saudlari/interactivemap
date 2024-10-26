'use server'

import mongoose from 'mongoose';

// Definimos el esquema del marcador
const MarkerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'], // El título es requerido
  },
  description: {
    type: String, // Descripción opcional
  },
  tag: {
    type: String, // Etiqueta opcional
  },
  category: {
    type: String,
    required: true, // La categoría es obligatoria
  },
  subcategory: {
    type: String, // Subcategoría opcional
  },
  link: {
    type: String, // Enlace opcional
  },
  videoLink: {
    type: String, // Enlace a video opcional
  },
  coordinates: {
    type: [Number], // Almacenamos las coordenadas [latitud, longitud]
    required: true, // Las coordenadas son obligatorias
  },
  images: {
    type: [String], // Aquí almacenamos las imágenes en formato Base64 (array de strings)
  },
}, { timestamps: true }); // Mongoose creará automáticamente las marcas de tiempo (createdAt y updatedAt)

// Exportamos el modelo de Mongoose
export default mongoose.models.Marker || mongoose.model('Marker', MarkerSchema);

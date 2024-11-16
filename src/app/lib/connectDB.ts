import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in the environment variables');
}

const connectDB = async (): Promise<void> => {
  // Evita reconectar si ya existe una conexión establecida
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB connection already established');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Salir del proceso si la conexión falla
  }
};

export default connectDB;
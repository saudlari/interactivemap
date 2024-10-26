import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise(); // Ya está conectado
  }
  
  return mongoose.connect(process.env.MONGODB_URI as string);
};

export default connectMongo;

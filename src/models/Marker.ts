import mongoose from 'mongoose';

const MarkerSchema = new mongoose.Schema({
  title: String,
  description: String,
  tag: String,
  imageFiles: [String],
  link: String,
  category: String,
  subcategory: String,
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
});

const Marker = mongoose.model('Marker', MarkerSchema);

export default Marker;

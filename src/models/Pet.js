import mongoose from 'mongoose';

const Pet = new mongoose.Schema({
  name: { type: String, required: true },
  species: String,
  status: { type: String, default: 'Adoptable' },
  pictures: [String],
  height: String,
  weight: String,
  color: String,
  bio: String,
  tagline: String,
  hypoallergenic: Boolean,
  diet: String,
  breed: String,
  gender: String,
  dateOfBirth: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, default: null },
});

export default Pet;

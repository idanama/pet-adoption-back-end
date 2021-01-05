import mongoose from 'mongoose';
import validator from 'validator';
import { formatDistanceToNow } from 'date-fns';

const opts = { toJSON: { virtuals: true } };
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No pet name provided.'],
    validate: [validator.isAlpha, 'Pet name should be one word, only letters.'],
  },
  species: {
    type: String,
    enum: ['Cat', 'Dog', 'Other'],
    required: [true, 'Species required'],
  },
  status: {
    type: String,
    default: 'Adoptable',
    enum: ['Adoptable', 'Fostered', 'Adopted'],
  },
  pictures: {
    type: [String],
    validate: {
      validator(v) {
        v.reduce((prev, cur) => cur.startsWith('https://res.cloudinary.com/petadoption/') && prev, true);
      },
      message: 'Picture path is invalid',
    },
  },
  height: {
    type: Number,
    validate: {
      validator(v) {
        return !Number.isNaN(v);
      },
      message: 'Height should be a number (in cm)',
    },
  },
  weight: {
    type: Number,
    validate: {
      validator(v) {
        return !Number.isNaN(v);
      },
      message: 'Weight should be a number (in kg)',
    },
  },
  color: String,
  bio: String,
  tagline: {
    type: String,
    validate: {
      validator(v) { return validator.isLength(v, { max: 64 }); },
      message: 'Tagline should be up to 64 characters',
    },
  },
  hypoallergenic: Boolean,
  diet: String,
  breed: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'No date of birth provided'],
    validate: [validator.isDate, 'Invalid date'],
  },
  owner: { type: mongoose.Schema.Types.ObjectId },
}, opts);

PetSchema.virtual('age').get(function () {
  return `${formatDistanceToNow(new Date(this.dateOfBirth.toString()))} old`;
});

export default PetSchema;

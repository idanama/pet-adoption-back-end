import mongoose from 'mongoose';
import validator from 'validator';
import { formatDistanceToNow } from 'date-fns';

const opts = { toJSON: { virtuals: true } };
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name required'],
    validate: [validator.isAlpha, 'Pet name is invalid'],
  },
  species: {
    type: String,
    enum: ['Cat', 'Dog'],
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
        return v.reduce((acc, path) => acc && path.startsWith('/images/'), true);
      },
      message: 'Invalid image path',
    },
  },
  height: {
    type: Number,
    validate: [validator.isNumeric, 'Invalid height'],
  },
  weight: {
    type: Number,
    validate: [validator.isNumeric, 'Invalid weight'],
  },
  color: String,
  bio: String,
  tagline: {
    type: String,
    validate: {
      validator(v) { return validator.isLength(v, { max: 64 }); },
      message: 'Invalid tagline',
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
    validate: [validator.isDate, 'Invalid date'],
  },
  owner: { type: mongoose.Schema.Types.ObjectId, default: null },
}, opts);

PetSchema.virtual('age').get(function () {
  return `${formatDistanceToNow(new Date(this.dateOfBirth.toString()))} old`;
});

export default PetSchema;

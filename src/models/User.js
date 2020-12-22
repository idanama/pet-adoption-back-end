import mongoose from 'mongoose';
import validator from 'validator';

const User = new mongoose.Schema({
  fName: {
    type: String,
    required: [true, 'First Name is required'],
    validate: {
      validator(v) {
        return validator.isLength(v, { min: 2 }) && validator.isAlpha(v);
      },
      message: 'Invalid First Name',
    },
  },
  lName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator(v) {
        return validator.isLength(v, { min: 1 }) && validator.isAlpha(v);
      },
      message: 'Invalid Last Name',
    },
  },
  phone: {
    type: String,
    validate: {
      validator(v) {
        return validator.isLength(v, { min: 9, max: 16 }) && validator.isNumeric(v);
      },
      message: 'Invalid phone number',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    select: false,
  },
  bio: {
    type: String,
  },
  savedPets: {
    type: [mongoose.Schema.Types.ObjectId],
  },
});

export default User;

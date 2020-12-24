import mongoose from 'mongoose';
import petSchema from './Pet.js';
import userSchema from './User.js';

const Pet = mongoose.model('Pet', petSchema);
const User = mongoose.model('User', userSchema);

export default { Pet, User };

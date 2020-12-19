import mongoose from 'mongoose';
import petSchema from './Pet.js';
import userSchema from './User.js';

const PetModel = mongoose.model('Pet', petSchema);
const UserModel = mongoose.model('User', userSchema);

export default { PetModel, UserModel };

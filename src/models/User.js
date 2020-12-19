import mongoose from 'mongoose';

const User = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  phone: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bio: String,
  savedPets: [mongoose.Schema.Types.ObjectId],
});

export default User;

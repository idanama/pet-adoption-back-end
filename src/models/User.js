import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  savedPets: [mongoose.Schema.Types.ObjectId],
});

export default User;

import mongoose from 'mongoose';
import petSchema from './Pet.js';
import userSchema from './User.js';
import activitySchema from './Activity.js';

const Pet = mongoose.model('Pet', petSchema);
const User = mongoose.model('User', userSchema);
const Activity = mongoose.model('Activity', activitySchema);

export default { Pet, User, Activity };

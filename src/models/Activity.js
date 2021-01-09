import mongoose from 'mongoose';

const opts = { toJSON: { virtuals: true }, timestamps: true };
const ActivitySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['adopted', 'returned', 'fostered', 'saved', 'unsaved'],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, opts);

ActivitySchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

ActivitySchema.virtual('pet', {
  ref: 'Pet',
  localField: 'petId',
  foreignField: '_id',
  justOne: true,
});

// ActivitySchema.virtual('desc').get(function () {
//   return `${this.user.fName} ${this.action} ${this.pet.name}`;
// });

export default ActivitySchema;

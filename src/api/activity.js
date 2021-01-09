import Model from '../models/index.js';

const getRecentActivity = async (req, res) => {
  try {
    const allActivity = await Model.Activity
      .find()
      .sort('-updatedAt')
      .populate([{ path: 'pet' }, { path: 'user' }])
      .limit(10);
    return res.json(allActivity);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getLastAdoption = async (req, res) => {
  try {
    const lastAdoption = await Model.Activity
      .findOne({ action: 'adopted' }, 'petId pet userId user action', { sort: '-updatedAt' })
      .populate([{ path: 'pet' }, { path: 'user' }]);
    return res.json(lastAdoption);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const addActivity = async (userId, petId, action) => {
  try {
    const addedActivity = new Model.Activity({ userId, petId, action });
    await addedActivity.save();
  } catch (err) {
    console.log(err);
  }
};

export default { getRecentActivity, getLastAdoption };

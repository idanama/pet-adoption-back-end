import bcrypt from 'bcryptjs';
import Model from '../models/index.js';

const signup = async (req, res) => {
  try {
    const userValidation = new Model.UserModel({ ...req.body });
    await userValidation.validate();
  } catch (e) {
    res.status(400);
    return res.send('submitted data validation failed');
  }

  return bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS), (err, hash) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    const newUser = new Model.UserModel({ ...req.body, password: hash });
    return newUser.save((e, savedUser) => {
      if (e) {
        res.status(500);
        return res.send(e);
      }
      const { _id } = savedUser;
      return res.json(_id);
    });
  });
};

const login = async (req, res) => {
  const reqUser = await Model.UserModel.findOne({ email: req.body.email });
  bcrypt.compare(req.body.password, reqUser.password, (err, result) => {
    if (err || !result) {
      res.status(401);
      return res.send(err);
    }
    return res.send('OK');
  });
};

const savePet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(401);
    return res.send('no identification');
  }
  const options = { new: true, omitUndefined: true };
  try {
    const { savedPets } = await Model.UserModel
      .findByIdAndUpdate(userId, { $addToSet: { savedPets: [id] } }, options);
    return res.send({ savedPets });
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const deleteSavedPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(401);
    return res.send('no identification');
  }
  const options = { new: true, omitUndefined: true };
  try {
    const { savedPets } = await Model.UserModel
      .findByIdAndUpdate(userId, { $pull: { savedPets: id } }, options);
    return res.send({ savedPets });
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const getUserPets = async (req, res) => {
  const { id } = req.params;
  try {
    const savedPetsIds = (await Model.UserModel.findById(id)).savedPets;
    const savedPets = await Model.PetModel.find({ _id: { $in: savedPetsIds } });
    const ownedPets = await Model.PetModel.find({ owner: id });
    return res.json({ savedPets, ownedPets });
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

export default {
  signup, login, savePet, deleteSavedPet, getUserPets,
};

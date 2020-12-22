import bcrypt from 'bcryptjs';
import Model from '../models/index.js';

const signup = async (req, res) => {
  try {
    const userValidation = new Model.UserModel({ ...req.body });
    await userValidation.validate();
  } catch (err) {
    res.status(400);
    return res.send(err.message);
  }

  try {
    const hash = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));
    const newUser = new Model.UserModel({ ...req.body, password: hash });
    const { _id } = await newUser.save();
    return res.send(_id);
  } catch (err) {
    res.status(500);
    return res.send(err);
  }
};

const login = async (req, res) => {
  try {
    const { _id, password } = await Model.UserModel
      .findOne({ email: req.body.email }, 'id password');
    const isUser = await bcrypt.compare(req.body.password, password);
    if (isUser) {
      return res.send(_id);
    }
    throw new Error();
  } catch (e) {
    res.status(401);
    return res.send('wrong credentials');
  }
};

const savePet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(401);
    return res.send('unauthorized to make this request');
  }
  try {
    const options = { new: true, omitUndefined: true };
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
    return res.send('unauthorized to make this request');
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
    const savedPetsIds = (await Model.UserModel
      .findById(id)).savedPets;
    const allPets = await Model.PetModel
      .find({ $or: [{ _id: { $in: savedPetsIds } }, { owner: id }] });
    const savedPets = allPets.filter((pet) => savedPetsIds.includes(pet.id));
    const ownedPets = allPets.filter((pet) => String(pet.owner) === String(id));

    return res.json({ savedPets, ownedPets });
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      _id, fName, lName, bio,
    } = await Model.UserModel.findById(id);
    return res.json({
      _id, fName, lName, bio,
    });
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const getUserFull = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.UserModel.findById(id);
    return res.json(user);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const options = { new: true, omitUndefined: true, runValidators: true };
  try {
    const updatedUser = await Model.UserModel
      .findByIdAndUpdate(id, req.body, options).lean();
    delete updatedUser.password;
    return res.send(updatedUser);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const getUsers = async (req, res) => {
  const userQuery = req.query.get ? req.query.get.split(',') : '';
  if (userQuery.includes('password')) {
    res.status(401);
    return res.send('can not retrieve passwords');
  }
  const keys = ['_id', ...userQuery].join(' ');
  try {
    const users = await Model.UserModel.find({}, `${keys}`).lean();
    return res.send(users);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

export default {
  signup, login, savePet, deleteSavedPet, getUserPets, getUser, getUserFull, updateUser, getUsers,
};

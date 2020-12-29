import bcrypt from 'bcryptjs';
import validator from 'validator';
import dotenv from 'dotenv';
import Model from '../models/index.js';
import { validateJwt, signJwt } from './jwt.js';

dotenv.config();

const updateOptions = { new: true, omitUndefined: true, runValidators: true };

const signup = async (req, res) => {
  const sanitizedUser = {
    ...req.body,
    email: validator.normalizeEmail(req.body.email),
    bio: validator.escape(req.body.bio),
    role: 'user',
  };

  try {
    const userValidation = new Model.User(sanitizedUser);
    await userValidation.validate();
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }

  try {
    const hash = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));
    const newUser = new Model.User({ ...sanitizedUser, password: hash });
    const {
      _id, role, fName, lName,
    } = await newUser.save();
    const userId = _id;
    const token = signJwt(userId, role);
    return res.send({ user: { _id, fName, lName }, token });
  } catch (err) {
    res.status(500);
    return res.send({ error: { ...err } });
  }
};

const login = async (req, res) => {
  try {
    const {
      _id, fName, lName, password, role,
    } = await Model.User
      .findOne({ email: req.body.email }, 'id password role fName lName');
    const isUser = await bcrypt.compare(req.body.password, password);
    if (isUser) {
      const userId = _id;
      const token = signJwt(userId, role);
      return res.send({
        user: {
          _id, fName, lName, role,
        },
        token,
      });
    }
    throw new Error('no user found');
  } catch (err) {
    res.status(401);
    return res.send({ error: { ...err } });
  }
};

const savePet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    validateJwt(req.cookies.jwt, userId);
    const { savedPets } = await Model.User
      .findByIdAndUpdate(userId, { $addToSet: { savedPets: [id] } }, updateOptions);
    return res.send({ savedPets });
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

const deleteSavedPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    validateJwt(req.cookies.jwt, userId);
    const { savedPets } = await Model.User
      .findByIdAndUpdate(userId, { $pull: { savedPets: id } }, updateOptions);
    return res.send({ savedPets });
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

const getUserPets = async (req, res) => {
  const { id } = req.params;
  try {
    const savedPetsIds = (await Model.User
      .findById(id)).savedPets;
    const allPets = await Model.Pet
      .find({ $or: [{ _id: { $in: savedPetsIds } }, { owner: id }] });
    console.log(savedPetsIds);
    const savedPets = allPets.filter((pet) => savedPetsIds.includes(pet.id));
    const ownedPets = allPets.filter((pet) => String(pet.owner) === String(id));

    return res.json({ savedPets, ownedPets });
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      _id, fName, lName, bio,
    } = await Model.User.findById(id);
    return res.json({
      _id, fName, lName, bio,
    });
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

const hydrateUser = async (req, res) => {
  try {
    const { jwt } = req.cookies;
    const { userId } = validateJwt(jwt);
    const user = await Model.User.findOne({ _id: userId }, 'id role fName lName');
    return res.json(user);
  } catch (err) {
    res.status(401);
    return res.send({ error: { ...err } });
  }
};

const getUserFull = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Model.User.findById(id);
    return res.json(user);
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const sanitizedUser = { ...req.body, role: undefined };
  try {
    const updatedUser = await Model.User
      .findByIdAndUpdate(id, sanitizedUser, updateOptions).lean();
    return res.send(updatedUser);
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
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
    const users = await Model.User.find({}, `${keys}`).lean();
    return res.send(users);
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

export default {
  signup,
  login,
  savePet,
  deleteSavedPet,
  getUserPets,
  getUser,
  getUserFull,
  updateUser,
  getUsers,
  hydrateUser,
};

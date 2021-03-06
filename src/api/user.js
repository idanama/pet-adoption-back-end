import bcrypt from 'bcryptjs';
import validator from 'validator';
import dotenv from 'dotenv';
import Model from '../models/index.js';
import { validateJwt, signJwt, verifyUser } from './jwt.js';
import { addActivity } from './activity.js';

dotenv.config();

const updateOptions = { new: true, omitUndefined: true, runValidators: true };
const cookieOptions = { maxAge: 86400 * 21, sameSite: 'Strict', httpOnly: true };

const signup = async (req, res) => {
  const sanitizedUser = {
    ...req.body,
    email: validator.normalizeEmail(req.body.email),
    bio: validator.escape(req.body.bio || ''),
    role: 'user',
  };

  if (sanitizedUser.password !== sanitizedUser.passwordConfirm) {
    return res.status(400).send({ passwordConfirm: 'Passwords do not match' });
  }

  const emailExists = await Model.User.count({ email: sanitizedUser.email });
  if (emailExists) {
    return res.status(400).send({ email: 'Email address already being used' });
  }

  try {
    const userValidation = new Model.User(sanitizedUser);
    await userValidation.validate();
  } catch (err) {
    return res.status(400).send(err);
  }

  try {
    const hash = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS));
    const newUser = new Model.User({ ...sanitizedUser, password: hash });
    const {
      _id, role, fName, lName,
    } = await newUser.save();
    const userId = _id;
    const token = signJwt(userId, role);
    res.cookie('jwt', token, cookieOptions);
    return res.send({
      user: {
        _id, fName, lName, role,
      },
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const {
      _id, fName, lName, password, role,
    } = await Model.User
      .findOne({ email: req.body.email }, 'id password role fName lName savedPets');
    const isUser = await bcrypt.compare(req.body.password, password);
    if (isUser) {
      const userId = _id;
      const token = signJwt(userId, role);
      res.cookie('jwt', token, cookieOptions);
      return res.send({
        user: {
          _id, fName, lName, role,
        },
      });
    }
    throw new Error('could not verify credentials');
  } catch (err) {
    return res.status(401).send(err);
  }
};

const savePet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    validateJwt(req.cookies.jwt, userId);
    const { savedPets } = await Model.User
      .findByIdAndUpdate(userId, { $addToSet: { savedPets: [id] } }, updateOptions);
    addActivity(userId, id, 'saved');
    return res.send({ savedPets });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteSavedPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    validateJwt(req.cookies.jwt, userId);
    const { savedPets } = await Model.User
      .findByIdAndUpdate(userId, { $pull: { savedPets: id } }, updateOptions);
    addActivity(userId, id, 'unsaved');
    return res.send({ savedPets });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getUserPets = async (req, res) => {
  const { id } = req.params;
  try {
    const savedPetsIds = (await Model.User
      .findById(id)).savedPets;
    const allPets = await Model.Pet
      .find({ $or: [{ _id: { $in: savedPetsIds } }, { owner: id }] });
    const savedPets = allPets.filter((pet) => savedPetsIds.includes(pet.id));
    const ownedPets = allPets.filter((pet) => String(pet.owner) === String(id));

    return res.json({ savedPets, ownedPets });
  } catch (err) {
    return res.status(400).send(err);
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
    return res.status(400).send(err);
  }
};

const hydrateUser = async (req, res) => {
  try {
    const { jwt } = req.cookies;
    const validatedJwt = validateJwt(jwt);
    if (validatedJwt) {
      const user = await Model.User.findOne({ _id: validatedJwt.userId }, 'id role fName lName savedPets');
      return res.json(user);
    }
    return res.send();
  } catch (err) {
    console.log(err);
    return res.status(401).send(err);
  }
};

const getUserFull = async (req, res) => {
  const { id } = req.params;
  try {
    verifyUser(req.cookies.jwt, undefined, 'admin');
    const user = await Model.User.findById(id).populate(['ownedPets', 'savedPets']);
    return res.json(user);
  } catch (err) {
    res.status(400);
    return res.status(400).send(err);
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
    return res.send(err);
  }
};

const getUsers = async (req, res) => {
  try {
    verifyUser(req.cookies.jwt, undefined, 'admin');
  } catch (err) {
    return res.status(401).send(err);
  }

  const userQuery = req.query.get ? req.query.get.split(',') : '';
  if (userQuery.includes('password')) {
    return res.status(401).send('can not retrieve passwords');
  }
  const keys = ['_id', ...userQuery].join(' ');
  try {
    const users = await Model.User.find({}, `${keys}`).populate('ownedPets');
    return res.send(users);
  } catch (err) {
    return res.status(400).send(err);
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

import dotenv from 'dotenv';
import cloudinary from '../utils/cloudinary.js';
import Model from '../models/index.js';
import { validateJwt, verifyUser } from './jwt.js';

dotenv.config();

const updateOptions = { new: true, omitUndefined: true, runValidators: true };

const addPet = async (req, res) => {
  const pictures = [];
  try {
    verifyUser(req.cookies.jwt, undefined, 'admin');
    if (req.file) {
      const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);
      pictures.push(uploadedImage.secure_url);
    }
    const petValidation = new Model.Pet({ ...req.body, pictures });
    await petValidation.validate();
  } catch (err) {
    return res.status(400).send(err);
  }

  const newPet = new Model.Pet({ ...req.body, pictures });
  try {
    const savedPet = await newPet.save();
    return res.json(savedPet);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPets = async (req, res) => {
  try {
    const { animal, relationship } = req.query;
    const query = {};

    if (Object.keys(req.query).length !== 0) {
      query.status = relationship === 'foster' ? 'Adoptable' : { $in: ['Adoptable', 'Fostered'] };
      if (animal && animal !== 'any') {
        query.species = animal.charAt(0).toUpperCase() + animal.slice(1);
      }
    }

    const allPets = await Model.Pet.find(query);
    return res.json(allPets);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const idArray = id.split(',');
    let result;
    if (idArray.length > 1) {
      result = await Model.Pet.find({ _id: { $in: [...idArray] } });
    } else {
      result = await Model.Pet.findById(id);
    }
    return res.json(result);
  } catch (err) {
    return res.status(404).send(err);
  }
};

const editPet = async (req, res) => {
  let picture;
  try {
    verifyUser(req.cookies.jwt, undefined, 'admin');
    if (req.file) {
      const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);
      picture = uploadedImage.secure_url;
    }
    const petValidation = new Model.Pet({ ...req.body, pictures: [picture] });
    await petValidation.validate();
  } catch (err) {
    return res.status(400).send(err);
  }

  const { id } = req.params;
  try {
    verifyUser(req.cookies.jwt, undefined, 'admin');
    const updatedFields = picture ? { ...req.body, pictures: [picture] } : req.body;
    const updatedPet = await Model.Pet
      .findByIdAndUpdate(id, updatedFields, updateOptions);
    return res.send(updatedPet);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const adoptPet = async (req, res) => {
  const { id } = req.params;
  const { userId, action } = req.body;
  try {
    validateJwt(req.cookies.jwt, userId);
    const status = action === 'adopt' ? 'Adopted' : 'Fostered';
    const updatedPet = await Model.Pet
      .findByIdAndUpdate(id, { owner: userId, status }, updateOptions);
    return res.send(updatedPet);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const returnPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    validateJwt(req.cookies.jwt, userId);
    const updatedPet = await Model.Pet
      .findByIdAndUpdate(id, { owner: null, status: 'Adoptable' }, updateOptions);
    return res.send(updatedPet);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const getRandomPet = async (req, res) => {
  try {
    const count = await Model.Pet.count({ status: 'Adoptable' });
    const random = Math.floor(Math.random() * count);
    const randomPet = await Model.Pet.findOne({ status: 'Adoptable' }).skip(random);
    return res.send(randomPet);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getPetByName = async (req, res) => {
  const { name } = req.params;
  try {
    const petByName = await Model.Pet.findOne({ name: { $regex: new RegExp(name, 'i') } });
    return res.json(petByName);
  } catch (err) {
    return res.status(404).send(err);
  }
};

export default {
  getPet, getPets, addPet, editPet, adoptPet, returnPet, getRandomPet, getPetByName,
};

import dotenv from 'dotenv';
import Model from '../models/index.js';
import { validateJwt } from './jwt.js';

dotenv.config();

const updateOptions = { new: true, omitUndefined: true, runValidators: true };

const addPet = async (req, res) => {
  try {
    const petValidation = new Model.Pet({ ...req.body });
    await petValidation.validate();
  } catch (e) {
    res.status(400);
    return res.send({ error: { ...e } });
  }

  const newPet = new Model.Pet({ ...req.body });
  try {
    const savedPet = await newPet.save;
    return res.json(savedPet);
  } catch (err) {
    res.status(500);
    return res.send({ error: { ...err } });
  }
};

const getPets = async (req, res) => {
  try {
    const { animal, relationship } = req.query;
    const query = {};
    switch (relationship) {
      case 'foster':
        query.status = 'Adoptable';
        break;
      default:
        query.status = { $in: ['Adoptable', 'Fostered'] };
    }

    switch (animal) {
      case 'dog':
        query.species = 'Dog';
        break;
      case 'cat':
        query.species = 'Cat';
        break;
      default:
    }

    const allPets = await Model.Pet.find(query);
    return res.json(allPets);
  } catch (err) {
    res.status(500);
    return res.send({ error: { ...err } });
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
    res.status(404);
    return res.send({ error: { ...err } });
  }
};

const editPet = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPet = await Model.Pet
      .findByIdAndUpdate(id, req.body.updatedFields, updateOptions);
    return res.send(updatedPet);
  } catch (err) {
    res.status(400);
    return res.send({ error: { ...err } });
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
    res.status(400);
    return res.send({ error: { ...err } });
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
    res.status(400);
    return res.send({ error: { ...err } });
  }
};

const getRandomPet = async (req, res) => {
  try {
    const count = await Model.Pet.count({ status: 'Adoptable' });
    const random = Math.floor(Math.random() * count);
    const randomPet = await Model.Pet.findOne({ status: 'Adoptable' }).skip(random);
    return res.send(randomPet);
  } catch (err) {
    res.status(500);
    return res.send({ error: { ...err } });
  }
};

const getPetByName = async (req, res) => {
  const { name } = req.params;
  try {
    const petByName = await Model.Pet.findOne({ name: { $regex: new RegExp(name, 'i') } });
    return res.json(petByName);
  } catch (err) {
    res.status(404);
    return res.send(err);
  }
};

export default {
  getPet, getPets, addPet, editPet, adoptPet, returnPet, getRandomPet, getPetByName,
};

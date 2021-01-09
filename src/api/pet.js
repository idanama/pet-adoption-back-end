import cloudinary from '../utils/cloudinary.js';
import Model from '../models/index.js';
import { validateJwt, verifyUser } from './jwt.js';
import { addActivity } from './activity.js';

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
    const allPets = await Model.Pet.find();
    return res.json(allPets);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const search = async (req, res) => {
  try {
    const {
      animal, relationship, minh, maxh, minw, maxw, name, page,
    } = req.query;

    const searchQuery = {
      status: relationship === 'foster' ? 'Adoptable' : { $in: ['Adoptable', 'Fostered'] },
    };

    if (minh || maxh) {
      searchQuery.height = {};
      if (minh) {
        searchQuery.height.$gt = minh;
      }
      if (maxh) {
        searchQuery.height.$lt = maxh;
      }
    }
    if (minw || maxw) {
      searchQuery.weight = {};
      if (minw) {
        searchQuery.weight.$gt = minw;
      }
      if (maxw) {
        searchQuery.weight.$lt = maxw;
      }
    }
    if (name) {
      searchQuery.name = { $regex: new RegExp(name, 'i') };
    }
    if (animal !== 'any') {
      searchQuery.species = { $regex: new RegExp(animal, 'i') };
    }

    const allPets = await Model.Pet.paginate(searchQuery, { sort: '-dateOfBirth', limit: 10, page: page || 1 });
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
    const updatedFields = picture?.length > 0 ? { ...req.body, pictures: [picture] } : req.body;
    const petValidation = new Model.Pet(updatedFields);
    await petValidation.validate();
  } catch (err) {
    return res.status(400).send(err);
  }

  const { id } = req.params;
  try {
    verifyUser(req.cookies.jwt, undefined, 'admin');
    const updatedFields = picture?.length > 0 ? { ...req.body, pictures: [picture] } : req.body;
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
    addActivity(userId, id, action === 'adopt' ? 'adopted' : 'fostered');
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
    addActivity(userId, id, 'returned');
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

const getRecentPet = async (req, res) => {
  try {
    const recentPets = await Model.Pet.find().sort('-_id').limit(9);
    return res.send(recentPets);
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
  getPet,
  getPets,
  addPet,
  editPet,
  adoptPet,
  returnPet,
  getRandomPet,
  getRecentPet,
  getPetByName,
  search,
};

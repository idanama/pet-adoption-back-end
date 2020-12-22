import Model from '../models/index.js';

const updateOptions = { new: true, omitUndefined: true, runValidators: true };

const addPet = async (req, res) => {
  try {
    const petValidation = new Model.PetModel({ ...req.body });
    await petValidation.validate();
  } catch (err) {
    res.status(400);
    return res.send(err.message);
  }

  const newPet = new Model.PetModel({ ...req.body });
  try {
    const savedPet = await newPet.save;
    return res.json(savedPet);
  } catch (err) {
    res.status(500);
    return res.send(err);
  }
};

const getPets = async (req, res) => {
  try {
    const allPets = await Model.PetModel.find();
    return res.json(allPets);
  } catch (err) {
    res.status(500);
    return res.send(err);
  }
};

const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const petById = await Model.PetModel.findById(id);
    return res.json(petById);
  } catch (err) {
    res.status(404);
    return res.send(err);
  }
};

const editPet = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPet = await Model.PetModel
      .findByIdAndUpdate(id, req.body.updatedFields, updateOptions);
    return res.send(updatedPet);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const adoptPet = async (req, res) => {
  const { id } = req.params;
  const { userId, type } = req.body;
  if (!userId || !type) {
    res.status(400);
    return res.send('insufficient input');
  }
  const status = type === 'adopt' ? 'Adopted' : 'Fostered';
  try {
    const updatedPet = await Model.PetModel
      .findByIdAndUpdate(id, { owner: userId, status }, updateOptions);
    return res.send(updatedPet);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

const returnPet = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) {
    res.status(401);
    return res.send('no identification');
  }
  try {
    const updatedPet = await Model.PetModel
      .findByIdAndUpdate(id, { owner: null, status: 'Adoptable' }, updateOptions);
    return res.send(updatedPet);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

export default {
  getPet, getPets, addPet, editPet, adoptPet, returnPet,
};

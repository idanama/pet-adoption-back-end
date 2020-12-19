import Model from '../models/index.js';

const addPet = (req, res) => {
  const newPet = new Model.PetModel({ ...req.body });
  newPet.save((err, savedPet) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    return res.json(savedPet);
  });
};

const getPets = (req, res) => {
  Model.PetModel.find((err, allPets) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    return res.json(allPets);
  });
};

const getPet = (req, res) => {
  const { id } = req.params;
  Model.PetModel.findById(id, (err, petById) => {
    if (err) {
      res.status(404);
      return res.send(err);
    }
    return res.json(petById);
  });
};

const editPet = async (req, res) => {
  const { id } = req.params;
  const options = { new: true, omitUndefined: true };
  try {
    const updatedPet = await Model.PetModel.findByIdAndUpdate(id, req.body.updatedFields, options);
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
  const options = { new: true, omitUndefined: true };
  try {
    const updatedPet = await Model.PetModel
      .findByIdAndUpdate(id, { owner: userId, status }, options);
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
  const options = { new: true, omitUndefined: true };
  try {
    const updatedPet = await Model.PetModel
      .findByIdAndUpdate(id, { owner: null, status: 'Adoptable' }, options);
    return res.send(updatedPet);
  } catch (e) {
    res.status(400);
    return res.send(e);
  }
};

export default {
  getPet, getPets, addPet, editPet, adoptPet, returnPet,
};

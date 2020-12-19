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

export default { getPet, getPets, addPet };

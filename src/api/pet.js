import pets from '../db/pets.js';

const getPets = (req, res) => {
  res.json(pets);
};

const getPet = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const petById = pets.find((pet) => String(pet.id) === String(id));
  if (petById) {
    res.json(petById);
  } else {
    res.status(404);
    res.send('pet not found ⚠');
  }
};

export default { getPet, getPets };

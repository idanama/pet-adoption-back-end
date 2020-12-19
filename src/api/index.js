import pet from './pet.js';
import user from './user.js';

const apiWip = (req, res) => {
  res.status(501);
  res.send('api endpoint under construction 🚧');
};

const api = {
  signup: user.signup,
  login: user.login,

  addPet: pet.addPet,
  getPet: pet.getPet,
  editPet: pet.editPet,
  getPets: pet.getPets,

  adoptPet: pet.adoptPet,
  returnPet: pet.returnPet,
  savePet: user.savePet,
  deleteSavedPet: user.deleteSavedPet,
  getUserPets: user.getUserPets,
  getUser: apiWip,
  getUserFull: apiWip,
  updateUser: apiWip,
  getUsers: apiWip,
};

export default api;

import pet from './pet.js';
import user from './user.js';

const apiWip = (req, res) => {
  res.send('api endpoint under construction 🚧');
};

const api = {
  signup: user.signup,
  login: user.login,
  addPet: pet.addPet,
  getPet: pet.getPet,
  editPet: apiWip,
  getPets: pet.getPets,
  adoptPet: apiWip,
  returnPet: apiWip,
  savePet: apiWip,
  deleteSavedPet: apiWip,
  getUserPets: apiWip,
  getUser: apiWip,
  getUserFull: apiWip,
  updateUser: apiWip,
  getUsers: apiWip,
};

export default api;

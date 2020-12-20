import pet from './pet.js';
import user from './user.js';

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
  getUser: user.getUser,
  getUserFull: user.getUserFull,
  updateUser: user.updateUser,
  getUsers: user.getUsers,
};

export default api;

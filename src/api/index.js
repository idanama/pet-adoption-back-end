import { Router } from 'express';
import pet from './pet.js';
import user from './user.js';

const router = Router();

router.post('/signup', user.signup);
router.post('/login', user.login);

router.post('/pet', pet.addPet);
router.get('/pet/random', pet.getRandomPet);
router.get('/pet/name/:name', pet.getPetByName);
router.get('/pet/:id', pet.getPet);
router.put('/pet/:id', pet.editPet);
router.get('/pet', pet.getPets);

router.post('/pet/:id/adopt', pet.adoptPet);
router.post('/pet/:id/return', pet.returnPet);
router.post('/pet/:id/save', user.savePet);
router.delete('/pet/:id/save', user.deleteSavedPet);

router.get('/pet/user/:id', user.getUserPets);
router.get('/user/:id', user.getUser);
router.get('/user/:id/full', user.getUserFull);
router.put('/user/:id', user.updateUser);
router.get('/user', user.getUsers);

export default router;

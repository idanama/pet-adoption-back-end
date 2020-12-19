import express from 'express';
import dotenv from 'dotenv';

import api from './api/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('welcome to the pet-adoption-back-end'));

app.get('/signup', api.signup);
app.post('/login', api.login);

app.post('/pet/:id', api.addPet);
app.get('/pet/:id', api.getPet);
app.put('/pet/:id', api.editPet);
app.get('/pet', api.getPets);

app.post('/pet/:id/adopt', api.adoptPet);
app.post('/pet/:id/return', api.returnPet);
app.post('/pet/:id/save', api.savePet);
app.delete('/pet/:id/save', api.deleteSavedPet);

app.get('/pet/user/:id', api.getUserPets);
app.get('/user/:id', api.getUser);
app.get('/user/:id/full', api.getUserFull);
app.put('/user/:id', api.updateUser);
app.get('/user', api.getUsers);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} 🟢`);
});

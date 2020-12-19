import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import api from './api/index.js';

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongoDB Atlas 🌿');
});

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log('req:', req.path);
    next();
  });
}

app.get('/', (req, res) => res.send('welcome to the pet-adoption-back-end'));

app.get('/signup', api.signup);
app.post('/login', api.login);

app.post('/pet', api.addPet);
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

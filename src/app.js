import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiRouter from './api/index.js';

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongoDB Atlas 🌿');
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://spca.vercel.app',
  ],
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(req.method, req.path);
    if (Object.keys(req.body).length > 0) {
      console.log(req.body);
    }
    next();
  });
}

app.use('/', apiRouter);

app.get('/', (req, res) => res.send('welcome to the pet-adoption-back-end'));

app.use('*', (req, res) => {
  res.status(404);
  res.json({ error: { msg: 'url not found', url: req.path } });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} 🟢`);
});

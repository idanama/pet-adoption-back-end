import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Model from '../models/index.js';

dotenv.config();

export const validateJwt = (token, userId) => {
  if (!token) {
    throw new Error({ msg: 'no token provided' });
  }
  const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
  if (userId) {
    if (decodedJwt.userId !== userId && decodedJwt.role === 'user') {
      throw new Error({ msg: 'unauthorized' });
    }
  }
  return decodedJwt;
};

export const signJwt = (userId, role) => jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const verifyUser = async (token, userId, role) => {
  const decodedJwt = validateJwt(token, userId);
  if (role && decodedJwt.role !== role) {
    throw new Error({ msg: 'unauthorized' });
  }
  if (role) {
    const upToDateUser = await Model.User.findById(decodedJwt.userId, 'role');
    if (role !== upToDateUser.role) {
      throw new Error({ msg: 'unauthorized' });
    }
  }
  return decodedJwt;
};

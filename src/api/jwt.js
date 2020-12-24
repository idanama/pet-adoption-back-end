import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validateJwt = (token, userId) => {
  const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
  if (userId) {
    if (decodedJwt.userId !== userId && decodedJwt.role === 'user') {
      throw new Error({ msg: 'unauthorized' });
    }
  }
  return decodedJwt;
};

export const signJwt = (userId, role) => jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '30d' });

import bcrypt from 'bcryptjs';
import Model from '../models/index.js';

const signup = async (req, res) => {
  try {
    const userValidation = new Model.UserModel({ ...req.body });
    await userValidation.validate();
  } catch (e) {
    res.status(400);
    return res.send('submitted data validation failed');
  }

  bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS), (err, hash) => {
    if (err) {
      res.status(500);
      return res.send(err);
    }
    const newUser = new Model.UserModel({ ...req.body, password: hash });
    return newUser.save((e, savedUser) => {
      if (e) {
        res.status(500);
        return res.send(e);
      }
      const { _id } = savedUser;
      return res.json(_id);
    });
  });
};

const login = async (req, res) => {
  const reqUser = await Model.UserModel.findOne({ email: req.body.email });
  bcrypt.compare(req.body.password, reqUser.password, (err, result) => {
    if (err || !result) {
      res.status(401);
      return res.send(err);
    }
    return res.send('OK');
  });
};

export default { signup, login };

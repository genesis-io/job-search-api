import User from '../user/userController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from '../../lib/log';

export default class Auth {
  static async createTokenForUser(userEmail) {
    return await jwt.sign({ sub: userEmail, iat: Math.floor(Date.now() / 100), exp: 604800 }, process.env.JWT_SECRET);
  }
  static async signUp(req, res, next) {
    const { email, password } = req.body;
    const saltRounds = 10;
    try {
      if(!email || !password) {
        error('email and password must be provided')
        return res.status(422).send('email and password must be provided')
      }
      const user = await User.findUser(email)
      if (user.length) {
        error('email exists already')
        return res.status(422).send('email exists already');
      } else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.saveUser(email, hashedPassword);
        const token = await Auth.createTokenForUser(email);
        return res.status(200).append('authorization', token).json('succesfully created user');
      }
    } catch(e) {
      return next(e);
    }
  }
}
import { findUser, saveUser } from '../user/userController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from '../../lib/log';


  export const createTokenForUser = async userEmail => {
    return await jwt.sign({ sub: userEmail, iat: Math.floor(Date.now() / 100) }, process.env.JWT_SECRET, { expiresIn: '7d'} );
  }

  export const login = async (req, res, next) => {
    try {
      const token = await createTokenForUser(req.user[0].email)
      return res.status(200).append('authorization', token).send('successfully logged in')
    } catch(e) {
      return next(e)
    }
  }

  export const signUp = async (req, res, next) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    try {
      if(!email || !password) {
        error('email and password must be provided')
        return res.status(422).send('email and password must be provided')
      }
      const user = await findUser(email)
      if (user.length) {
        error('email exists already')
        return res.status(422).send('email exists already');
      } else {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await saveUser(email, hashedPassword);
        const token = await createTokenForUser(email);
        return res.status(200).append('authorization', token).json('successfully created user');
      }
    } catch(e) {
      return next(e);
    }
  }
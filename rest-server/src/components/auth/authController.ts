import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import db from '../../config/db';
import {
  getUserHelper,
  postUserHelper
} from '../user/userSQLHelpers';
import { error } from '../../lib/log';

export const createTokenForUser = async (userEmail: string) => {
  return await jwt.sign({ sub: userEmail, iat: Math.floor(Date.now() / 100) }, process.env.JWT_SECRET, { expiresIn: '7d'} );
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  try {
    const token = await createTokenForUser(email);
    return res.status(200).set('authorization', token).send(email);
  } catch(e) {
    return next(e);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  try {
    if(!email || !password) {
      error('email and password must be provided')
      return res.status(422).send('email and password must be provided')
    }
    const { rows } = await db.queryAsync(getUserHelper({ email }));
    if (rows.length) {
      error('email exists already')
      return res.status(422).send('email exists already');
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.queryAsync(postUserHelper({ email, password: hashedPassword }));
      console.log('email = ', email);
      const token = await createTokenForUser(email);
      console.log('0token= ', token)
      return res.status(200).set('authorization', token).send({ token });
    }
  } catch(e) {
    return next(e);
  }
};

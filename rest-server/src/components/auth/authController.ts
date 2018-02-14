import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import db from '../../config/db';
import {
  getUserHelper,
  getUserProfileHelper,
  postUserHelper,
} from '../user/userSQLHelpers';
import { error } from '../../lib/log';

export const createTokenForUser = async (userEmail: string) => {
  return await jwt.sign({ sub: userEmail, iat: Math.floor(Date.now() / 100) }, process.env.JWT_SECRET, { expiresIn: '7d'} );
};

export const login = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> => {
  const { email } = req.body;
  try {
    const { rows } = await db.queryAsync(getUserProfileHelper({ email }));
    console.log(rows);
    const token = await createTokenForUser(email);
    return res.status(200).send({ email, token });
  } catch(e) {
    error('error during login process', e);
    return next(e);
  }
};

export const signUp = async (req: Request, res: Response, next: NextFunction):Promise<Response|void> => {
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
      const salt: string = await bcrypt.genSalt(saltRounds);
      const hashedPassword: string = await bcrypt.hash(password, salt);
      await db.queryAsync(postUserHelper({ email, password: hashedPassword }));
      const token: string = await createTokenForUser(email);
      return res.status(200).send({ token });
    }
  } catch(e) {
    return next(e);
  }
};

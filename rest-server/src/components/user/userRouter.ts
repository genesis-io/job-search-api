import * as express from 'express';
import * as validate from 'express-validation';
import * as passport from 'passport';

import {
  getUser,
  postUser
} from './userController';
import joiValidation from '../../lib/request-validation';
import '../../lib/passport';

const router = express.Router();

router.route('/:email')
  .get(passport.authenticate('jwt', { session: false }), validate(joiValidation.findUser), getUser);

router.route('/')
  .post(postUser);

export default router;

import * as express from 'express';
import * as validate from 'express-validation';
import * as passport from 'passport';

import {
  getUser,
  postUser
} from './userController';
import joiValidation from '../../lib/validation/request-validation';
import '../../lib/validation/passport';

const router = express.Router();

router.route('/:email')
  .get(passport.authenticate('jwt', { session: false }), validate(joiValidation.findUser), getUser);

router.route('/')
  .post(postUser);

export default router;

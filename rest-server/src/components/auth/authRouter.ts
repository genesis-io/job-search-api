import * as express from 'express';
import * as validate from 'express-validation';
import * as passport from 'passport';

import {
  signUp,
  login
} from './authController';
import passportServices from '../../lib/validation/passport';
import joiValidation from '../../lib//validation/request-validation'


const router = express.Router();

router.route('/signup')
  .post(validate(joiValidation.signUp), signUp)

router.route('/github')
  .post(validate(joiValidation.signUp))

router.route('/login')
  .post(validate(joiValidation.login), passport.authenticate('local', { session: false }), login)

export default router;

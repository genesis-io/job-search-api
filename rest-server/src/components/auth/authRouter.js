import express from 'express';
import validate from 'express-validation';
import passportServices from '../../lib/passport';
import passport from 'passport';
import validation from '../../lib/request-validation'
import { signUp, login } from './authController';
const router = express.Router();


router.route('/signup')
  .post(validate(validation.signUp),signUp)

router.route('/github')
  .post(validate(validation.signUp))

router.route('/login')
  .post(validate(validation.login), passport.authenticate('local', { session: false }), login)


export default router;
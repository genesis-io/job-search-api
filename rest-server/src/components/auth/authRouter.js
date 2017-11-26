import express from 'express';
import validate from 'express-validation';
import passportServices from '../../lib/passport';
import passport from 'passport';
import validation from '../../lib/request-validation'
import auth from './authController';
const router = express.Router();


router.route('/signup')
  .post(validate(validation.signUp),auth.signUp)

router.route('/login')
  .post(validate(validation.login), passport.authenticate('local', { session: false }), auth.login)

export default router;
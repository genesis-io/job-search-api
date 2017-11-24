import express from 'express';
import validate from 'express-validation';
import validation from '../../lib/request-validation'
import Auth from './authController';
const router = express.Router();


router.route('/signup')
  .post(validate(validation.signUp),Auth.signUp)

export default router;
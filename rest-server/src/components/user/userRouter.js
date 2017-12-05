import express from 'express';
import validate from 'express-validation';
import validation from '../../lib/request-validation';
import passportServices from '../../lib/passport';
import passport from 'passport';
import { findUser } from './userController';
const router = express.Router();

router.route('/user/:email')
  .get(passport.authenticate('jwt', {session: false}), validate(validation.findUser), async (req, res, next) => {
    const { email } = req.params;
    try {
      const user = await findUser(email)
      res.status(200).send(user)
    } catch(e) {
      return next(e);
    }
  })

export default router;
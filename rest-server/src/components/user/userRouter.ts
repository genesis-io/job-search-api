import { Router }from 'express';
import * as validate from 'express-validation';
import * as passport from 'passport';

import { userController } from './userController';
import joiValidation from '../../lib/validation/request-validation';
import '../../lib/validation/passport';

const router: Router = Router();

router.route('/:email')
  .get(validate(joiValidation.findUser), passport.authenticate('jwt', { session: false }), userController);

router.route('/')
  .post(userController);

export default router;

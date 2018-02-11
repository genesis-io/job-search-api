import { Router } from 'express';
import * as validate from 'express-validation';
import * as passport from 'passport';

import { projectController } from './projectController';
import passportServices from '../../lib/validation/passport';
import joiValidation from '../../lib/validation/request-validation';

const router: Router = Router();

router.route('/:userId')
  .get(validate(joiValidation.findProjects), passport.authenticate('jwt', { session: false}), projectController);

router.route('/')
  .post(validate(joiValidation.saveProjects), passport.authenticate('jwt', { session: false }), projectController);

export default router;

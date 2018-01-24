import * as express from 'express';
import * as validate from 'express-validation';
// import * as passport from 'passport';

import {
  getProjects,
  postProject
} from './projectController';
import joiValidation from '../../lib/validation/request-validation';
// import '../../lib/passport';

const router = express.Router();

router.route('/:userId')
  .get(getProjects);

router.route('/')
  .post(validate(joiValidation.projects), postProject);


export default router;

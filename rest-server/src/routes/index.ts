import * as express from 'express';

import userRouter from '../components/user/userRouter';
import authRouter from '../components/auth/authRouter';
import projectRouter from '../components/project/projectRouter';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/projects', projectRouter);

export default router;

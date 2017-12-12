import * as express from 'express';

import userRouter from '../components/user/userRouter';
import authRouter from '../components/auth/authRouter';

const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;

import express from 'express';
import authRouter from '../components/auth/authRouter';
import userRouter from '../components/user/userRouter';
const router = express.Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);


export default router;
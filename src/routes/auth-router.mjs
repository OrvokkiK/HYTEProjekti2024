import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const authRouter = express.Router();

// user login
authRouter.post('/login', postLogin).get('/me', authenticateToken, getMe);

export default authRouter;

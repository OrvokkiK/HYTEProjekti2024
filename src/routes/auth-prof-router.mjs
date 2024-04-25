// auth-prof-router.mjs
import express from 'express';
import {body} from 'express-validator';
import { postLogin } from '../controllers/auth-controller.mjs';

const authProfRouter = express.Router();

authProfRouter.post('/login', postLogin);

export default authProfRouter
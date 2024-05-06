// auth-prof-router.mjs
import express from 'express';
// import {body} from 'express-validator';
import { postLogin } from '../controllers/auth-controller.mjs';
import {body} from 'express-validator';
import { validationErrorHandler } from '../middlewares/error-handler.mjs';

const authProfRouter = express.Router();

authProfRouter.post('/login', body('username').trim().isEmail().notEmpty(),
body('password').trim().notEmpty().isLength({min:8, max:undefined}), validationErrorHandler, 
postLogin, 
);

// authProfRouter.post('/login', postLogin);


export default authProfRouter
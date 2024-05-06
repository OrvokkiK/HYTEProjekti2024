// user-router.mjs
import express from 'express';
import { body, param } from "express-validator";
import {validationErrorHandler} from '../middlewares/error-handler.mjs';
import {getUserById, getUsers, postNewUser, putUserById, removeUser} from '../controllers/user-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// User endpoints
userRouter.route('/')
//Lists all users;
.get(authenticateToken, getUsers)
//user registration
.post(postNewUser);

userRouter.route('/:id')
//Lists a specific user
.get(authenticateToken, getUserById)
//remove user
.delete(authenticateToken, removeUser);

userRouter.put('/:id', 
  body('username').trim().isEmail().notEmpty(),
  body('password').trim().escape().notEmpty(),
  body('first_name').escape(),
  body('last_name').escape(),
  body('chat_permission').isIn(['Kyllä', 'Ei', 'kyllä', 'ei', 'KYLLÄ', 'EI', 'Yes', 'No', 'yes', 'no', 'YES', 'NO' ]),
  body('chat_permission_date').isISO8601(),
  validationErrorHandler,
  authenticateToken, putUserById
); 

/*
    "username": "",
    "password": "", 
    "first_name": "",
    "last_name": "",
    "chat_permission" : "",
    "chat_permission_date" : ""
*/

export default userRouter;

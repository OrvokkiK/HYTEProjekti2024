// user-router.mjs
import express from 'express';
import {getUserById, getUsers, postNewUser, putUserById, removeUser} from '../controllers/user-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const userRouter = express.Router();

// Add auth == kubios auth??
// User endpoints
userRouter.route('/')
//Lists all users;
.get(authenticateToken, getUsers)
//user registration
.post(postNewUser);

userRouter.route('/:id')
//Lists a specific user
.get(authenticateToken, getUserById)
//editing user's contact info
.put(authenticateToken, putUserById)
//remove user
.delete(authenticateToken, removeUser);

export default userRouter;

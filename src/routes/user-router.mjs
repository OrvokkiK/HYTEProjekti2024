// user-router.mjs
import express from 'express';
import {getUserById, getUsers, postNewUser, putUserById, removeUser} from '../controllers/user-controller.mjs';

const userRouter = express.Router();

// Add auth == kubios auth??
// User endpoints
userRouter.route('/')
//Lists all users;
.get(getUsers)
//user registration
.post(postNewUser);

userRouter.route('/:id')
//Lists a specific user
.get(getUserById)
//editing user's contact info
.put(putUserById)
//remove user
.delete(removeUser);

export default userRouter;

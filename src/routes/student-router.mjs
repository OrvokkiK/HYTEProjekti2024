// student-router.mjs
import express from 'express';
import { getAllStudents } from '../controllers/user-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const studentRouter = express.Router();

studentRouter.route('/').get(authenticateToken ,getAllStudents);

export default studentRouter;

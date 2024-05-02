// student-router.mjs
import express from 'express';
import { getAllStudents } from '../controllers/user-controller.mjs';

const studentRouter = express.Router();

studentRouter.route('/').get(getAllStudents);

export default studentRouter;

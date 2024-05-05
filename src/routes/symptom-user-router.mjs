import express from 'express';
import { getSymptomsByUserId } from '../controllers/symptom-controller.mjs';
import { authenticateToken } from '../middlewares/authentication.mjs';

const symptomUserRouter = express.Router();

symptomUserRouter.route('/:id').get(authenticateToken, getSymptomsByUserId);

export default symptomUserRouter; 
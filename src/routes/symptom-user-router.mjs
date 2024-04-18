import express from 'express';
import { getSymptomsByUserId } from '../controllers/symptom-controller.mjs';

const symptomUserRouter = express.Router();

symptomUserRouter.route('/:id').get(getSymptomsByUserId);

export default symptomUserRouter; 
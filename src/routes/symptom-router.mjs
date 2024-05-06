// symptom-router.mjs
import express from "express";
import { body, param } from "express-validator";
import { validationErrorHandler } from "../middlewares/error-handler.mjs";

import {
  getAllSymptoms,
  getSymptomsBySymptomId,
  getSymptomsByUserId,
  postNewEntry,
  putEntryById,
  removeSymptomById,
} from "../controllers/symptom-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const symptomRouter = express.Router();

// symptom/ endppoints
symptomRouter.route("/").get(authenticateToken, getAllSymptoms);

symptomRouter.post('/',
  body('anxiety').isBoolean(),
  body('back_issues').isBoolean(),
  body('changes_in_appetite').isBoolean(),
  body('difficulty_making_decisions').isBoolean(),
  body('disquiet').isBoolean(),
  body('entry_date').isDate(),
  body('frustration').isBoolean(),
  body('grumpiness').isBoolean(),
  body('headache').isBoolean(),
  body('nausea').isBoolean(),
  body('neck_pain').isBoolean(),
  body('palpitation').isBoolean(),
  body('recall_problems').isBoolean(),
  body('recurring_colds').isBoolean(),
  body('restlesness').isBoolean(),
  body('sleep_disturbances').isBoolean(),
  body('stress_level').isInt({min: 1, max: 5}),
  body('tiredness').isBoolean(),
  body('upset_stomach').isBoolean(),
  body('vertigo').isBoolean(), 
  validationErrorHandler,
  authenticateToken, postNewEntry
);

//symptom/:id endpoints
symptomRouter.route("/:id").get(authenticateToken, getSymptomsByUserId);
  
symptomRouter.put('/:id',
  body('anxiety').isBoolean(),
  body('back_issues').isBoolean(),
  body('changes_in_appetite').isBoolean(),
  body('difficulty_making_decisions').isBoolean(),
  body('disquiet').isBoolean(),
  body('entry_date').isDate(),
  body('frustration').isBoolean(),
  body('grumpiness').isBoolean(),
  body('headache').isBoolean(),
  body('nausea').isBoolean(),
  body('neck_pain').isBoolean(),
  body('palpitation').isBoolean(),
  body('recall_problems').isBoolean(),
  body('recurring_colds').isBoolean(),
  body('restlesness').isBoolean(),
  body('sleep_disturbances').isBoolean(),
  body('stress_level').isInt({min: 1, max: 5}),
  body('tiredness').isBoolean(),
  body('upset_stomach').isBoolean(),
  body('vertigo').isBoolean(), 
  body('user_id').isInt(),
  validationErrorHandler,
  authenticateToken, putEntryById
);

symptomRouter
  .route('/:id/user/:user_id/')
  .get(
    authenticateToken,
    getSymptomsBySymptomId
  ).delete(
    authenticateToken,
    removeSymptomById
);

export default symptomRouter;

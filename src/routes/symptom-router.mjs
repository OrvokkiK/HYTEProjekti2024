// symptom-router.mjs
import express from "express";
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

// Symptom endppoints
symptomRouter.route("/").get(authenticateToken, getAllSymptoms);

//symptom/:id endpoints
symptomRouter
  .route("/:id")
  .get(authenticateToken, getSymptomsByUserId)
  .post(authenticateToken, postNewEntry)
  .put(authenticateToken, putEntryById);

// Original
/* //symptom/:id endpoints
symptomRouter
  .route("/:id")
  .get(
    authenticateToken,
    getSymptomsByUserId)
  .post(authenticateToken, postNewEntry)
  .put(authenticateToken, putEntryById)
  .delete(authenticateToken, removeSymptomById
  );
*/ 

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
